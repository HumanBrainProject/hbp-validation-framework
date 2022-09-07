
import logging
from uuid import UUID
from typing import List, Union
from datetime import datetime


from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..auth import (
    get_kg_client_for_user_account, get_kg_client_for_service_account,
    is_collab_member, is_admin, can_view_collab, get_editable_collabs
)
from ..data_models import LivePaper, LivePaperSummary, ConsistencyError, AccessCode, Slug
from ..db import _get_live_paper_by_id_or_alias
import fairgraph.openminds.core as omcore
import fairgraph.openminds.publications as ompub
from fairgraph.base_v3 import as_list

LIVEPAPERS_SPACE = "livepapers"
logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()
router = APIRouter()


# todo:
#  - handle KG objects as data items

@router.get("/livepapers/", response_model=List[LivePaperSummary])
async def query_live_papers(
    editable: bool = False,
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_client = get_kg_client_for_user_account(token)

    # get all live papers that the user has view access to

    # todo: change this to search for LivePapers, and then get the most recent LivePaperVersion for that LP

    lps = as_list(ompub.LivePaper.list(kg_client, scope="in progress", size=1000, space=None, api="core"))
    lps += as_list(ompub.LivePaper.list(kg_client, scope="released", size=1000, space=LIVEPAPERS_SPACE, api="core"))
    # todo: modify fairgraph so that space=None queries across all spaces
    # todo: remove duplicates from the combined list. Maybe start with released, and replace entries
    #       if a more up-to-date version appears under "in progress"
    #       maybe move this functionality to fairgraph, with a scope="latest" or "any"

    if editable:
        # include only those papers the user can edit
        # todo: check that space names match collab names, maybe an extra "collab-" in the former
        editable_collabs = await get_editable_collabs(token.credentials)
        accessible_lps = [
            lp for lp in lps if lp.space in editable_collabs
        ]
        # alternative implementation, profile these
        # accessible_lps = [
        #     lp for lp in lps if await can_edit_collab(lp.space, token.credentials)
        # ]
    else:
        accessible_lps = lps
    return [
        LivePaperSummary.from_kg_object(lp, kg_client)
        for lp in as_list(accessible_lps)
    ]


@router.get("/livepapers-published/", response_model=List[LivePaperSummary])
async def query_released_live_papers():
    kg_client = get_kg_client_for_service_account()
    lps = ompub.LivePaper.list(kg_client, scope="released", size=1000, space=LIVEPAPERS_SPACE)
    return [
        LivePaperSummary.from_kg_object(lp)
        for lp in as_list(lps)
    ]


@router.get("/livepapers/{lp_id}", response_model=LivePaper)
async def get_live_paper(
    lp_id: Union[UUID, Slug],
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_client = get_kg_client_for_user_account(token)
    lp = _get_live_paper_by_id_or_alias(lp_id, kg_client, scope="in progress")

    def get_access_code(lp):  # to implement
        return None

    if lp:
        if (
            token.credentials == get_access_code(lp)
            or await can_view_collab(lp.space, token.credentials)
            or await is_admin(token.credentials)
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
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )
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
        or await is_collab_member(live_paper.collab_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{live_paper.collab_id}",
        )

    kg_client = get_kg_client_for_user_account(token)

    kg_objects = live_paper.to_kg_objects(kg_client)
    assert isinstance(kg_objects["paper"][-1], ompub.LivePaper)

    if kg_objects["paper"][-1].exists(kg_client):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another live paper with the same name already exists.",
        )
    for category in ("people", "paper", "sections"):  # the order is important
        for obj in kg_objects[category]:
            obj.save(kg_client, space=live_paper.collab_id, recursive=True)
    logger.info("Saved objects")
    #breakpoint()
    return LivePaperSummary.from_kg_object(kg_objects["paper"][-1], kg_client)


@router.put("/livepapers/{lp_id}", status_code=status.HTTP_200_OK)
async def update_live_paper(
    lp_id: UUID,    #todo: handle Slug
    live_paper: LivePaper,
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    logger.info("Beginning put live paper")

    if not (
        live_paper.collab_id == "myspace"
        or await is_collab_member(live_paper.collab_id, token.credentials)
        or await is_admin(token.credentials)
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
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Live paper with id {lp_id} not found.",
        )
    assert UUID(kg_objects["paper"][-1].uuid) == lp_id

    for category in ("people", "paper", "sections"):  # the order is important
        for obj in kg_objects[category]:
            obj.save(kg_client, space=live_paper.collab_id, recursive=True)
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
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )

    logger.info("Beginning set access code")

    kg_client = get_kg_client_for_user_account(token)
    lp = _get_live_paper_by_id_or_alias(lp_id, kg_client, scope="in progress")

    if lp:
        if not (
            await is_collab_member(lp.collab_id, token.credentials)
            or await is_admin(token.credentials)
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
    if not (
        await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Deleting live papers is restricted to administrators - please contact EBRAIN support",
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
