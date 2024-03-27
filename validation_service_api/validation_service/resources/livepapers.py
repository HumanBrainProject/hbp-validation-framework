
import logging
from uuid import UUID
from typing import List, Union
from datetime import datetime


from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..auth import (
    get_kg_client_for_user_account, get_kg_client_for_service_account,
    User
)
from ..data_models import LivePaper, LivePaperSummary, ConsistencyError, AccessCode, Slug
from ..db import _get_live_paper_by_id_or_alias, _check_service_status
import fairgraph.openminds.core as omcore
import fairgraph.openminds.publications as ompub
from fairgraph.utility import as_list

LIVEPAPERS_SPACE = "livepapers"
logger = logging.getLogger("validation_service_api")

auth = HTTPBearer()
router = APIRouter()


# todo:
#  - handle KG objects as data items


def collab_id_from_space(space):
    if space.startswith("collab-"):
        return space[7:]
    else:
        return None


@router.get("/livepapers/", response_model=List[LivePaperSummary])
async def query_live_papers(
    title: str = Query(None, description="Live paper title to search for"),
    editable: bool = False,
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    user = User(token, allow_anonymous=False)
    kg_user_client = get_kg_client_for_user_account(token)
    kg_service_client = get_kg_client_for_service_account()

    filters = {}
    if title:
        filters["name"] = title

    query_label = "LP_LivePapers_summary"
    query = kg_service_client.retrieve_query(query_label)
    if query is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Query '{query_label}' could not be retrieved",
        )

    lps = kg_user_client.query(query, filters, scope="any", id_key="id", use_stored_query=True).data

    if editable:
        # include only those papers the user can edit
        editable_collabs = await user.get_editable_collabs()

        accessible_lps = [
            lp for lp in lps
            if lp["space"] == "myspace" or collab_id_from_space(lp["space"]) in editable_collabs
        ]
        # alternative implementation, profile these
        # accessible_lps = [
        #     lp for lp in lps
        #     if lp["space"] == "myspace" or await can_edit_collab(collab_id_from_space(lp["space"])), token.credentials)
        # ]
    else:
        accessible_lps = lps
    # todo: think about sorting
    summaries = []
    for lp in accessible_lps:
        summary = LivePaperSummary.from_kg_query(lp, kg_user_client)
        if summary:
            summaries.append(summary)
    return sorted(summaries, key=lambda lp: lp.year or 1970)


@router.get("/livepapers-published/", response_model=List[LivePaperSummary])
async def query_released_live_papers():
    # check - do we need service account, or will any user account get released instances?
    kg_client = get_kg_client_for_service_account()
    lps = ompub.LivePaper.list(kg_client, scope="released", size=1000, space=LIVEPAPERS_SPACE)
    return sorted(
        [
            LivePaperSummary.from_kg_object(lp, kg_client)
            for lp in as_list(lps)
        ],
        key=lambda lp: lp.year
    )


@router.get("/livepapers/{lp_id}", response_model=LivePaper)
async def get_live_paper(
    lp_id: Union[UUID, Slug],
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    user = User(token, allow_anonymous=False)
    kg_client = get_kg_client_for_user_account(token)
    lp = _get_live_paper_by_id_or_alias(lp_id, kg_client, scope="any")

    def get_access_code(lp):  # to implement
        return None

    if lp:
        if (
            token.credentials == get_access_code(lp)
            or (lp.space.startswith("collab-")
                and await user.can_view_collab(collab_id_from_space(lp.space)))
            or await user.is_admin()
        ):
            try:
                obj = LivePaper.from_kg_object(lp, kg_client)
            except ConsistencyError as err:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
        else:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"This account cannot edit Collab #{lp.space}",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Live Paper {lp_id} not found, or you do not have access",
        )
    return obj


@router.get("/livepapers-published/{lp_id}", response_model=LivePaper)
async def get_live_paper(
    lp_id: Union[UUID, Slug]
):
    kg_client = get_kg_client_for_service_account()
    # check - do we need service account, or will any user account get released instances?
    lp = _get_live_paper_by_id_or_alias(lp_id, kg_client, scope="released")
    if lp:
        try:
            obj = LivePaper.from_kg_object(lp, kg_client)
        except ConsistencyError as err:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Live Paper {lp_id} not found.",
        )
    return obj


@router.post("/livepapers/", response_model=LivePaperSummary, status_code=status.HTTP_201_CREATED)
async def create_live_paper(
    live_paper: LivePaper,
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    _check_service_status()
    user = User(token, allow_anonymous=False)
    logger.info("Beginning post live paper")
    if live_paper.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot provide id when creating a live paper. Use PUT to update an existing paper.",
        )
    if not live_paper.collab_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Collab ID needs to be provided",
        )

    if not (
        live_paper.collab_id == "myspace"
        or await user.can_edit_collab(live_paper.collab_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{live_paper.collab_id}",
        )

    kg_user_client = get_kg_client_for_user_account(token)
    kg_service_client = get_kg_client_for_service_account()

    kg_objects = live_paper.to_kg_objects(kg_user_client)
    assert isinstance(kg_objects["paper"][-1], ompub.LivePaper)

    # use both service client (for checking curated spaces) and user client (for checking private spaces)
    if kg_objects["paper"][-1].exists(kg_service_client) or kg_objects["paper"][-1].exists(kg_user_client):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another live paper with the same name already exists.",
        )

    if live_paper.collab_id in ("myspace", "livepapers"):
        kg_space = live_paper.collab_id
    else:
        kg_space = f"collab-{live_paper.collab_id}"
    if kg_space not in kg_user_client.spaces(names_only=True):
        # configure space the first time it is used
        types = [omcore.DOI, omcore.ISBN, omcore.ISSN, omcore.WebResource, omcore.ServiceLink,
                 omcore.Person, omcore.Organization] + ompub.list_kg_classes()
        try:
            kg_user_client.configure_space(kg_space, types)
        except Exception as err:
            # todo: more fine-grained error reporting. Check content of Exception,
            #       403 may not be appropriate
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"There was an error when trying to configure KG space {kg_space}: {err}",
            )

    for category in ("people", "paper", "sections"):  # the order is important
        for obj in kg_objects[category]:
            obj.save(kg_user_client, space=kg_space, recursive=True, ignore_auth_errors=True)
    logger.info("Saved objects")
    return LivePaperSummary.from_kg_object(kg_objects["paper"][-1], kg_user_client)


@router.put("/livepapers/{lp_id}", status_code=status.HTTP_200_OK)
async def update_live_paper(
    lp_id: UUID,    #todo: handle Slug
    live_paper: LivePaper,
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    _check_service_status()
    logger.info("Beginning put live paper")
    user = User(token, allow_anonymous=False)
    if not (
        live_paper.collab_id == "myspace"
        or await user.can_edit_collab(live_paper.collab_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{live_paper.collab_id}",
        )
    # todo: in case collab id is changed, check if the user has edit permissions for the
    #       original collab as well

    if live_paper.id is None:
        live_paper.id = lp_id
    elif live_paper.id != lp_id:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Inconsistent ids: {lp_id} != {live_paper.id}",
        )

    kg_client = get_kg_client_for_user_account(token)

    kg_objects = live_paper.to_kg_objects(kg_client)
    logger.info("Created objects")

    if not kg_objects["paper"][-1].exists(kg_client):
        # here we use only the user client to check existence, since we have
        # to be able to write to it anyway
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Live paper with id {lp_id} not found.",
        )
    assert UUID(kg_objects["paper"][-1].uuid) == lp_id

    if live_paper.collab_id in ("myspace", "livepapers"):
        kg_space = live_paper.collab_id
    else:
        kg_space = f"collab-{live_paper.collab_id}"

    for category in ("people", "paper", "sections"):  # the order is important
        for obj in kg_objects[category]:
            obj.save(kg_client, space=kg_space, recursive=True)
    logger.info("Saved objects")

    return None
    #return LivePaper.from_kg_object(lp, kg_client)

# test lp_id: 5249159f-898c-4b60-80ef-95ddc6414557


@router.put("/livepapers/{lp_id}/access_code", status_code=status.HTTP_200_OK)
async def set_access_code(
    lp_id: Union[UUID, Slug],
    access_code: AccessCode,
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    _check_service_status()

    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )
    user = User(token, allow_anonymous=False)
    logger.info("Beginning set access code")

    kg_client = get_kg_client_for_user_account(token)
    lp = _get_live_paper_by_id_or_alias(lp_id, kg_client, scope="in progress")

    if lp:
        if not (
            await user.can_edit_collab(lp.collab_id)
            or await user.is_admin()
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"This account is not a member of Collab #{lp.collab_id}",
            )

        lp.access_code = access_code.value
        lp.save(kg_client)
        logger.info("Added/updated access code")
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Live Paper {lp_id} not found.",
        )
    return None



@router.delete("/livepapers/{lp_id}", status_code=status.HTTP_200_OK)
async def delete_live_paper(
    lp_id: UUID,    #todo: handle alias
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    _check_service_status()
    user = User(token, allow_anonymous=False)
    if not (
        await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Deleting live papers is restricted to administrators - please contact EBRAINS support",
        )

    kg_user_client = get_kg_client_for_user_account(token)
    live_paper = ompub.LivePaper.from_uuid(str(lp_id), kg_user_client, scope="in progress")
    # todo: handle live_paper is None with 404 error

    live_paper.delete(kg_user_client)
    # retrieve all versions
    for version in as_list(live_paper.versions):
        version = version.resolve(kg_user_client, scope="in progress")
        # for each version, retrieve all sections
        sections = ompub.LivePaperSection.list(kg_user_client, scope="in progress", is_part_of=version)
        version.delete(kg_user_client)
        # for each section, retrieve all resource items and any associated service links
        for section in as_list(sections):
            resource_items = ompub.LivePaperResourceItem.list(kg_user_client, scope="in progress", is_part_of=section, size=1000)
            section.delete(kg_user_client)
            for item in as_list(resource_items):
                service_link = omcore.ServiceLink.list(kg_user_client, scope="in progress", data_location=item)
                item.delete(kg_user_client)
                for sl in as_list(service_link):
                    sl.delete(kg_user_client)
