from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.requests import Request
from httpx import HTTPStatusError
from ..auth import oauth, User
from ..settings import BASE_URL


router = APIRouter()
auth = HTTPBearer(auto_error=False)

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


@router.get("/projects")
async def list_projects(
    request: Request,
    only_editable: bool = False,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        return []
    else:
        try:
            user_info = await user.get_user_info()
        except HTTPStatusError as err:
            if "401" in str(err):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=str(err),
                )
            else:
                raise
        roles = user_info.get("roles", {}).get("team", [])
        projects = {}
        for role in roles:
            if role.startswith("collab-"):
                project_id = "-".join(role.split("-")[1:-1])
                if project_id not in projects:
                    projects[project_id] = {
                        "project_id": project_id,
                        "permissions": {"VIEW": False, "UPDATE": False}
                    }
                if role.endswith("viewer"):  # todo: what about public collabs?
                    projects[project_id]["permissions"]["VIEW"] = True
                elif role.endswith("editor") or role.endswith("administrator"):
                    projects[project_id]["permissions"] = {"VIEW": True, "UPDATE": True}

        projects = sorted(projects.values(), key=lambda p: p["project_id"])

        if only_editable:
            return [p for p in projects if p["permissions"]["UPDATE"]]
        else:
            return projects
