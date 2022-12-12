import requests
import logging
import json

from fairgraph import KGClient
import fairgraph.openminds.core as omcore

from fastapi import HTTPException, status
from authlib.integrations.starlette_client import OAuth

from . import settings

logger = logging.getLogger("validation_service_v2")

kg_client_for_service_account = None

oauth = OAuth()

oauth.register(
    name="ebrains",
    server_metadata_url=settings.EBRAINS_IAM_CONF_URL,
    client_id=settings.EBRAINS_IAM_CLIENT_ID,
    client_secret=settings.EBRAINS_IAM_SECRET,
    userinfo_endpoint=f"{settings.HBP_IDENTITY_SERVICE_URL_V2}/userinfo",
    client_kwargs={
        #"scope": "openid profile collab.drive clb.drive:read clb.drive:write group team web-origins roles email",
        "scope": "openid profile collab.drive group roles email",
        "trust_env": False,
    },
)


def get_kg_client_for_service_account():
    global kg_client_for_service_account
    if kg_client_for_service_account is None:
        kg_client_for_service_account = KGClient(
            client_id=settings.KG_SERVICE_ACCOUNT_CLIENT_ID,
            client_secret=settings.KG_SERVICE_ACCOUNT_SECRET,
            host=settings.KG_CORE_API_HOST,
        )
    return kg_client_for_service_account


def get_kg_client_for_user_account(token):
    return KGClient(token=token.credentials, host=settings.KG_CORE_API_HOST)


async def get_collab_info(collab_id, token):
    collab_info_url = f"{settings.HBP_COLLAB_SERVICE_URL_V2}collabs/{collab_id}"
    headers = {"Authorization": f"Bearer {token.credentials}"}
    res = requests.get(collab_info_url, headers=headers)
    try:
        response = res.json()
    except json.decoder.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid collab id"
        )
    return response


class User:

    def __init__(self, token, allow_anonymous=False):
        if token is None and not allow_anonymous:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You need to provide a bearer token to access this resource"
            )
        self.token = token
        self._user_info = None
        self._collab_info = {}
        self._connection_error = False

    @property
    def is_anonymous(self):
        return self.token is None or self.token.credentials == "undefined"

    async def get_user_info(self):
        if self._user_info is None:
            user_info = await oauth.ebrains.userinfo(
                token={"access_token": self.token.credentials, "token_type": "bearer"}
            )
            if "error" in user_info:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED, detail=user_info["error_description"]
                )
            logger.debug(user_info)
            # make this compatible with the v1 json
            user_info["id"] = user_info["sub"]
            user_info["username"] = user_info.get("preferred_username", "unknown")
            self._user_info = user_info
        return self._user_info

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

    async def get_person(self, kg_client):
        user_info = await self.get_user_info()
        family_name = user_info["family_name"]
        given_name = user_info["given_name"]
        person = omcore.Person.list(kg_client, family_name=family_name, given_name=given_name, api="nexus", scope="latest")
        if person:
            if isinstance(person, list):
                logger.error("Found more than one person with this name")
                return None
            else:
                return person
        else:
            return None

    async def get_collab_permissions(self, collab_id):
        user_info = await self.get_user_info()

        target_team_names = {role: f"collab-{collab_id}-{role}"
                            for role in ("viewer", "editor", "administrator")}

        highest_collab_role = None
        for role, team_name in target_team_names.items():
            if team_name in user_info["roles"]["team"]:
                highest_collab_role = role
        if highest_collab_role == "viewer":
            permissions = {"VIEW": True, "UPDATE": False}
        elif highest_collab_role in ("editor", "administrator"):
            permissions = {"VIEW": True, "UPDATE": True}
        else:
            assert highest_collab_role is None
            collab_info = await self.get_collab_info(collab_id)
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
        if permissions.get(permission_type, False):
            return True
        else:
            return self.is_admin()

    async def can_view_collab(self, collab_id):
        return self._have_collab_access(collab_id, "VIEW")

    async def can_edit_collab(self, collab_id):
        return self._have_collab_access(collab_id, "UPDATE")

    async def is_admin(self):
        return await self.can_edit_collab(settings.ADMIN_COLLAB_ID)
        # todo: replace this check with a group membership check

    async def get_editable_collabs(self):
        user_info = await self.get_user_info()
        editable_collab_ids = set()
        for team_name in user_info["roles"]["team"]:
            if team_name.endswith("-editor") or team_name.endswith("-administrator"):
                collab_id = "-".join(team_name.split("-")[1:-1])
                editable_collab_ids.add(collab_id)
        return sorted(editable_collab_ids)
