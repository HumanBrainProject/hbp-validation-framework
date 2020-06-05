from fastapi import APIRouter
from starlette.requests import Request
from ..auth import oauth

router = APIRouter()


@router.get("/login")
async def login_via_ebrains(request: Request):
    redirect_uri = 'http://127.0.0.1:8000/auth'
    return await oauth.ebrains.authorize_redirect(request, redirect_uri)


@router.get("/auth")
async def auth_via_ebrains(request: Request):
    token = await oauth.ebrains.authorize_access_token(request)
    user = await oauth.ebrains.parse_id_token(request, token)
    response = {
        "access_token": token["access_token"],
        "user": {
            "name": user["name"],
            "user_id_v1": user["mitreid-sub"],
            "username": user["preferred_username"],
            "given_name": user["given_name"],
            "family_name": user["family_name"]
        }
    }
    full_response = {
        "token": token,
        "user": user
    }
    return full_response
