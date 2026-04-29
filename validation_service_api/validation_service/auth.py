import asyncio
import base64
import requests
import logging
import json

from fairgraph import KGClient
import fairgraph.openminds.core as omcore

from fastapi import HTTPException, status
from authlib.integrations.starlette_client import OAuth
from httpx import AsyncClient, Timeout

from . import settings

logger = logging.getLogger("validation_service_api")

kg_client_for_service_account = None

oauth = OAuth()

oauth.register(
    name="ebrains",
    server_metadata_url=settings.EBRAINS_IAM_CONF_URL,
    client_id=settings.EBRAINS_IAM_CLIENT_ID,
    client_secret=settings.EBRAINS_IAM_SECRET,
    userinfo_endpoint=f"{settings.HBP_IDENTITY_SERVICE_URL}/userinfo",
    client_kwargs={
        #"scope": "openid profile collab.drive clb.drive:read clb.drive:write group team web-origins roles email",
        "scope": "openid profile collab.drive group team roles",
        "trust_env": False,
        "timeout": Timeout(timeout=settings.AUTHENTICATION_TIMEOUT)
    },
)


def _decode_jwt_payload(token_str: str) -> dict:
    try:
        payload_b64 = token_str.split(".")[1]
        payload_b64 += "=" * (4 - len(payload_b64) % 4)
        return json.loads(base64.urlsafe_b64decode(payload_b64))
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not decode token: {err}"
        )


def get_kg_client_for_service_account():
    global kg_client_for_service_account
    if kg_client_for_service_account is None:
        kg_client_for_service_account = KGClient(
            client_id=settings.KG_SERVICE_ACCOUNT_CLIENT_ID,
            client_secret=settings.KG_SERVICE_ACCOUNT_SECRET,
            host=settings.KG_CORE_API_HOST,
            allow_interactive=False,
        )
    return kg_client_for_service_account


def get_kg_client_for_user_account(token):
    return KGClient(token=token.credentials, host=settings.KG_CORE_API_HOST, allow_interactive=False)


async def get_collab_info(collab_id, token):
    assert len(collab_id) > 0
    collab_info_url = f"{settings.HBP_COLLAB_SERVICE_URL}collabs/{collab_id}"
    headers = {"Authorization": f"Bearer {token.credentials}"}
    res = requests.get(collab_info_url, headers=headers)
    try:
        response = res.json()
    except json.decoder.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid collab id"
        )
    assert isinstance(response, dict), collab_info_url
    return response


class User:

    def __init__(self, token, allow_anonymous=False):
        if token is None and not allow_anonymous:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You need to provide a bearer token to access this resource"
            )
        self.token = token
        self._identity = None
        self._teams = None
        self._collab_info = {}
        self._connection_error = False
        self.username = None

    @property
    def is_anonymous(self):
        return self.token is None or self.token.credentials == "undefined"

    def get_identity(self):
        if self._identity is None:
            payload = _decode_jwt_payload(self.token.credentials)
            username = payload.get("preferred_username", None)
            self._identity = {
                "sub": payload["sub"],
                "id": payload["sub"],
                "preferred_username": username,
                "username": username,
                "given_name": payload.get("given_name", ""),
                "family_name": payload.get("family_name", ""),
            }
            self.username = username
        return self._identity

    async def _has_role(self, role, collab_name, client):
        roles_url = f"{settings.EBRAINS_IDM_API_URL}/teams/{collab_name}/{role}/users"
        headers = {"Authorization": f"Bearer {self.token.credentials}"}
        res = await client.get(roles_url, headers=headers,
                               timeout=settings.AUTHENTICATION_TIMEOUT)
        res.raise_for_status()  # do we want to raise an exception, or just log an error?
                                 # for robustness, perhaps just log
        for user in res.json():
            if self.username == user["username"]:
                return True
        return False

    async def get_teams(self):
        if self._teams is None:
            identity = self.get_identity()
            url = f"{settings.EBRAINS_IDM_API_URL}/teams"
            headers = {"Authorization": f"Bearer {self.token.credentials}"}
            params = {"username": identity["username"]}
            async with AsyncClient() as client:
                res = await client.get(url, headers=headers, params=params,
                                       timeout=settings.AUTHENTICATION_TIMEOUT)
            res.raise_for_status()
            self._teams = []
            collab_names = set(
                item["name"] for item in res.json()
                if not (
                    item["name"].startswith("d-")  # ignore dataset collabs
                    or item["name"].startswith("m-")  # ignore model collabs
                    or item["name"].startswith("nmc-test")  # ignore NMC test collabs
                    or item["name"].startswith("nmc-gd2022-guest")
                )
            )
            for role in ("administrator", "editor"):
                    # todo: get groups as well and check for group membership
                    async with AsyncClient() as client:
                        found = await asyncio.gather(*[self._has_role(role, collab_name, client) for collab_name in collab_names])
                        for include, collab_name in zip(found, collab_names.copy()):
                            if include:
                                self._teams.append(f"collab-{collab_name}-{role}")
                                collab_names.discard(collab_name)

            # we assume user must have viewer permissions for any collab still in collab_names
            for collab_name in collab_names:
                self._teams.append(f"collab-{collab_name}-viewer")
        return self._teams

    async def get_collab_info(self, collab_id):
        if collab_id not in self._collab_info:
            if not self._connection_error:
                # if the Collab API is not responding, we set an error flag to avoid further
                # requests and treat all collabs as private
                try:
                    self._collab_info[collab_id] = await get_collab_info(collab_id, self.token)
                except requests.exceptions.ConnectionError as err:
                    self._connection_error = True
                    self._collab_info[collab_id] = {}
            else:
                self._collab_info[collab_id] = {}
        return self._collab_info[collab_id]

    def get_person(self, kg_client):
        identity = self.get_identity()
        family_name = identity["family_name"]
        given_name = identity["given_name"]
        person = omcore.Person.list(
            kg_client,
            family_name=family_name,
            given_name=given_name,
            release_status="any",
            space="common"
        )
        if person:
            if isinstance(person, list):
                if len(person) > 1:
                    logger.error("Found more than one person with this name")
                    return None
                else:
                    return person[0]
            else:
                return person
        else:
            return None

    async def get_collab_permissions(self, collab_id):
        teams = await self.get_teams()

        target_team_names = {role: f"collab-{collab_id}-{role}"
                            for role in ("viewer", "editor", "administrator")}

        highest_collab_role = None
        for role, team_name in target_team_names.items():
            if team_name in teams:
                highest_collab_role = role
        if highest_collab_role == "viewer":
            permissions = {"VIEW": True, "UPDATE": False}
        elif highest_collab_role in ("editor", "administrator"):
            permissions = {"VIEW": True, "UPDATE": True}
        else:
            assert highest_collab_role is None
            collab_info = await self.get_collab_info(collab_id)
            assert isinstance(collab_info, dict), f"{collab_id}: {collab_info}"
            if collab_info.get("isPublic", False):  # will be False if 404 collab not found
                permissions = {"VIEW": True, "UPDATE": False}
            else:
                permissions = {"VIEW": False, "UPDATE": False}
        return permissions

    async def _have_collab_access(self, collab_id, permission_type):
        if collab_id is None or self.token is None:
            return False
        try:
            int(collab_id)
        except ValueError:
            permissions = await self.get_collab_permissions(collab_id)
        else:
            permissions = {}
        return permissions.get(permission_type, False)

    async def can_view_collab(self, collab_id):
        return await self._have_collab_access(collab_id, "VIEW")

    async def can_edit_collab(self, collab_id):
        return await self._have_collab_access(collab_id, "UPDATE")

    async def is_admin(self):
        return await self.can_edit_collab(settings.ADMIN_COLLAB_ID)
        # todo: replace this check with a group membership check
