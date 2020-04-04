import requests
import logging

from fastapi import HTTPException
from . import settings

logger = logging.getLogger("validation_service_v2")


def get_kg_token():
    data = {
        "grant_type": "refresh_token",
        "refresh_token": settings.KG_SERVICE_ACCOUNT_REFRESH_TOKEN,
        "client_id": settings.KG_SERVICE_ACCOUNT_CLIENT_ID,
        "client_secret": settings.KG_SERVICE_ACCOUNT_SECRET
    }
    response = requests.post(settings.OIDC_ENDPOINT, data=data)
    if response.status_code != 200:
        raise Exception("Unable to get access token for service account")  # this should result in a 500 error
    # todo: cache this in some persistent way on the server, only refresh when necessary,
    #       rather than on every request
    return response.json()["access_token"]


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
        #logger.debug(f"Problem with v1 token: {res1.content}")
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


def get_collab_permissions(collab_id, user_token):
    url = f"{settings.HBP_COLLAB_SERVICE_URL}collab/{collab_id}/permissions/"
    headers = {"Authorization": f"Bearer {user_token}"}
    res = requests.get(url, headers=headers)
    #if res.status_code != 200:
    #    return {"VIEW": False, "UPDATE": False}
    return res.json()


def is_collab_member(collab_id, user_token):
    permissions = get_collab_permissions(collab_id, user_token)
    return permissions.get("UPDATE", False)
