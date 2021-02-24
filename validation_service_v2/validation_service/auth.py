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
            refresh_token=settings.KG_SERVICE_ACCOUNT_REFRESH_TOKEN,
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
    url_v1 = f"{settings.HBP_IDENTITY_SERVICE_URL_V1}/user/me"
    url_v2 = f"{settings.HBP_IDENTITY_SERVICE_URL_V2}/userinfo"
    headers = {"Authorization": f"Bearer {token}"}
    # logger.debug("Requesting user information for given access token")
    res1 = requests.get(url_v1, headers=headers)
    if res1.status_code != 200:
        # logger.debug(f"Problem with v1 token: {res1.content}")
        res2 = requests.get(url_v2, headers=headers)
        if res2.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid token")
        else:
            user_info = res2.json()
            logger.debug(user_info)
            # make this compatible with the v1 json
            user_info["id"] = user_info["sub"]
            user_info["username"] = user_info.get("preferred_username", "unknown")
            return user_info
    # logger.debug("User information retrieved")
    else:
        return res1.json()


def get_person_from_token(kg_client, token):
    user_info = get_user_from_token(token.credentials)
    family_name = user_info["family_name"]
    given_name = user_info["given_name"]
    person = fairgraph.core.Person.list(kg_client, family_name=family_name, given_name=given_name, api="nexus")
    if person:
        if isinstance(person, list):
            logger.error("Found more than one person with this name")
            return None
        else:
            return person
    else:
        return None


async def get_collab_permissions_v1(collab_id, user_token):
    url = f"{settings.HBP_COLLAB_SERVICE_URL}collab/{collab_id}/permissions/"
    headers = {"Authorization": f"Bearer {user_token}"}
    res = requests.get(url, headers=headers)
    # if res.status_code != 200:
    #    return {"VIEW": False, "UPDATE": False}
    try:
        response = res.json()
    except json.decoder.JSONDecodeError:
        raise Exception(
            f"Error in retrieving collab permissions from {url}. Response was: {res.content}"
        )
    return response


async def get_collab_info(collab_id, user_token):
    collab_info_url = f"{settings.HBP_COLLAB_SERVICE_URL_V2}collabs/{collab_id}"
    headers = {"Authorization": f"Bearer {user_token}"}
    res = requests.get(collab_info_url, headers=headers)
    try:
        response = res.json()
    except json.decoder.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid collab id"
        )
    return response


async def get_collab_permissions_v2(collab_id, user_token):
    userinfo = await oauth.ebrains.userinfo(
        token={"access_token": user_token, "token_type": "bearer"}
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
        collab_info = await get_collab_info(collab_id, user_token)
        if "isPublic" not in collab_info:
            raise Exception(f"collab_id={collab_id} err={collab_info}")
        if collab_info["isPublic"]:
            permissions = {"VIEW": True, "UPDATE": False}
        else:
            permissions = {"VIEW": False, "UPDATE": False}
    return permissions


async def is_collab_member(collab_id, user_token):
    if collab_id is None:
        return False
    try:
        int(collab_id)
        get_collab_permissions = get_collab_permissions_v1
    except ValueError:
        get_collab_permissions = get_collab_permissions_v2
    permissions = await get_collab_permissions(collab_id, user_token)
    return permissions.get("UPDATE", False)


async def is_admin(user_token):
    return await is_collab_member(settings.ADMIN_COLLAB_ID, user_token)
    # todo: replace this check with a group membership check for Collab v2


async def can_view_collab(collab_id, user_token):
    if collab_id is None:
        return False
    try:
        int(collab_id)
        get_collab_permissions = get_collab_permissions_v1
    except ValueError:
        get_collab_permissions = get_collab_permissions_v2
    permissions = await get_collab_permissions(collab_id, user_token)
    return permissions.get("VIEW", False)


async def get_editable_collabs(user_token):
    # collab v2 only
    userinfo = await oauth.ebrains.userinfo(
        token={"access_token": user_token, "token_type": "bearer"}
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
