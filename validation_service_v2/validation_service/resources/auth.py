from fastapi import APIRouter
from starlette.requests import Request
from ..auth import oauth
from ..settings import BASE_URL

router = APIRouter()


@router.get("/login")
async def login_via_ebrains(request: Request):
    redirect_uri = BASE_URL + "/auth"
    return await oauth.ebrains.authorize_redirect(request, redirect_uri)


@router.get("/auth")
async def auth_via_ebrains(request: Request):
    token = await oauth.ebrains.authorize_access_token(request)
    user = await oauth.ebrains.parse_id_token(request, token)
    user2 = await oauth.ebrains.userinfo(token=token)
    user.update(user2)
    response = {
        "access_token": token["access_token"],
        "user": {
            "name": user["name"],
            "user_id_v1": user.get("mitreid-sub"),
            "username": user["preferred_username"],
            "given_name": user["given_name"],
            "family_name": user["family_name"]
            # todo: add group info
        },
    }
    full_response = {"token": token, "user": user}
    return full_response
