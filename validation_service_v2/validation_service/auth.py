import requests
import logging
import json

from fairgraph.client import KGClient
import fairgraph

from fastapi import HTTPException, status
from authlib.integrations.starlette_client import OAuth

from . import settings

logger = logging.getLogger("validation_service_v2")

kg_client = None

oauth = OAuth()

oauth.register(
    name="ebrains",
    server_metadata_url=settings.EBRAINS_IAM_CONF_URL,
    client_id=settings.EBRAINS_IAM_CLIENT_ID,
    client_secret=settings.EBRAINS_IAM_SECRET,
    userinfo_endpoint=f"{settings.HBP_IDENTITY_SERVICE_URL_V2}/userinfo",
    client_kwargs={
        "scope": "openid profile collab.drive clb.drive:read clb.drive:write group team web-origins roles email",
        "trust_env": False,
    },
)


def get_kg_client():
    global kg_client
    if kg_client is None:
        kg_client = KGClient(
            client_id=settings.KG_SERVICE_ACCOUNT_CLIENT_ID,
            client_secret=settings.KG_SERVICE_ACCOUNT_SECRET,
            oidc_host=settings.OIDC_HOST,
            nexus_endpoint=settings.NEXUS_ENDPOINT,
        )
    return kg_client


def get_user_from_token(token):
    """
    Get user id with token
    :param request: request
    :type request: str
    :returns: res._content
    :rtype: str
    """
    url_v2 = f"{settings.HBP_IDENTITY_SERVICE_URL_V2}/userinfo"
    headers = {"Authorization": f"Bearer {token.credentials}"}
    # logger.debug("Requesting user information for given access token")
    res = requests.get(url_v2, headers=headers)
    if res.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid token")
    else:
        user_info = res.json()
        logger.debug(user_info)
        # make this compatible with the v1 json
        user_info["id"] = user_info["sub"]
        user_info["username"] = user_info.get("preferred_username", "unknown")
        return user_info


def get_person_from_token(kg_client, token):
    user_info = get_user_from_token(token)
    family_name = user_info["family_name"]
    given_name = user_info["given_name"]
    person = fairgraph.core.Person.list(kg_client, family_name=family_name, given_name=given_name, api="nexus", scope="latest")
    if person:
        if isinstance(person, list):
            logger.error("Found more than one person with this name")
            return None
        else:
            return person
    else:
        return None


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


async def get_collab_permissions(collab_id, token):
    userinfo = await oauth.ebrains.userinfo(
        token={"access_token": token.credentials, "token_type": "bearer"}
    )
    if "error" in userinfo:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=userinfo["error_description"]
        )
    target_team_names = {role: f"collab-{collab_id}-{role}"
                         for role in ("viewer", "editor", "administrator")}

    highest_collab_role = None
    for role, team_name in target_team_names.items():
        if team_name in userinfo["roles"]["team"]:
            highest_collab_role = role
    if highest_collab_role == "viewer":
        permissions = {"VIEW": True, "UPDATE": False}
    elif highest_collab_role in ("editor", "administrator"):
        permissions = {"VIEW": True, "UPDATE": True}
    else:
        assert highest_collab_role is None
        collab_info = await get_collab_info(collab_id, token)
        if collab_info.get("isPublic", False):  # will be False if 404 collab not found
            permissions = {"VIEW": True, "UPDATE": False}
        else:
            permissions = {"VIEW": False, "UPDATE": False}
    return permissions


async def _have_collab_access(collab_id, token):
    if collab_id is None or token is None:
        return False
    try:
        int(collab_id)
    except ValueError:
        permissions = await get_collab_permissions(collab_id, token)
    else:
        permissions = {}
    if permissions.get("VIEW", False):
        return True
    else:
        return is_admin(token)


async def can_view_collab(collab_id, token):
    return _have_collab_access(collab_id, "VIEW", token)


async def can_edit_collab(collab_id, token):
    return _have_collab_access(collab_id, "UPDATE", token)


async def is_admin(token):
    return await can_edit_collab(settings.ADMIN_COLLAB_ID, token)
    # todo: replace this check with a group membership check


async def get_editable_collabs(token):
    userinfo = await oauth.ebrains.userinfo(
        token={"access_token": token.credentials, "token_type": "bearer"}
    )
    if "error" in userinfo:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=userinfo["error_description"]
        )
    editable_collab_ids = set()
    for team_name in userinfo["roles"]["team"]:
        if team_name.endswith("-editor") or team_name.endswith("-administrator"):
            collab_id = "-".join(team_name.split("-")[1:-1])
            editable_collab_ids.add(collab_id)
    return sorted(editable_collab_ids)
