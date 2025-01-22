from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.requests import Request
from httpx import HTTPStatusError
from ..auth import oauth, User, get_kg_client_for_user_account
from ..settings import BASE_URL
from ..data_models import Person


router = APIRouter()
auth = HTTPBearer(auto_error=False)

@router.get("/login")
async def login_via_ebrains(request: Request, state: str = None):
    redirect_uri = BASE_URL + "/auth"
    kwargs = {}
    if state:
        kwargs["state"] = state
    return await oauth.ebrains.authorize_redirect(request, redirect_uri, **kwargs)


@router.get("/auth")
async def auth_via_ebrains(request: Request):
    token = await oauth.ebrains.authorize_access_token(request)

    if request.query_params["state"] == "modelcatalog":
        return RedirectResponse("https://model-catalog-dev.brainsimulation.eu")
    else:
        #user = token["userinfo"]
        user = await oauth.ebrains.userinfo(token=token)
        #user.update(user2)
        response = {
            "access_token": token["access_token"],
            "token_expires": datetime.fromtimestamp(token["expires_at"]),
            "user": {
                "name": user["name"],
                "username": user["preferred_username"],
                "given_name": user["given_name"],
                "family_name": user["family_name"],
                "team": user["roles"].get("team", []),
                "group": user["roles"].get("group", []),
            },
            "state": request.query_params["state"],
            "scopes": token["scope"]
        }
        return response


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

@router.get("/me")
async def get_person(
    request: Request,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    kg_user_client = get_kg_client_for_user_account(token)
    user = User(token, allow_anonymous=False)
    kg_person = await user.get_person(kg_user_client)
    if kg_person:
        return Person.from_kg_object(kg_person, kg_user_client)
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="There is no Knowledge Graph entry for this user. Please contact support."
        )
