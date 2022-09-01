
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

    lpvs = as_list(ompub.LivePaperVersion.list(kg_client, scope="in progress", size=1000, space=None, api="core"))
    lpvs += as_list(ompub.LivePaperVersion.list(kg_client, scope="released", size=1000, space=LIVEPAPERS_SPACE, api="core"))
    # todo: modify fairgraph so that space=None queries across all spaces
    # todo: remove duplicates from the combined list. Maybe start with released, and replace entries
    #       if a more up-to-date version appears under "in progress"
    #       maybe move this functionality to fairgraph, with a scope="latest" or "any"

    if editable:
        # include only those papers the user can edit
        # todo: check that space names match collab names, maybe an extra "collab-" in the former
        editable_collabs = await get_editable_collabs(token.credentials)
        accessible_lpvs = [
            lpv for lpv in lpvs if lpv.space in editable_collabs
        ]
        # alternative implementation, profile these
        # accessible_lps = [
        #     lp for lp in lps if await can_edit_collab(lp.space, token.credentials)
        # ]
    else:
        accessible_lpvs = lpvs
    return [
        LivePaperSummary.from_kg_object(lpv, kg_client)
        for lpv in as_list(accessible_lpvs)
    ]


@router.get("/livepapers-published/", response_model=List[LivePaperSummary])
async def query_released_live_papers():
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )
    kg_client = get_kg_client_for_service_account()
    lps = ompub.LivePaperVersion.list(kg_client, scope="released", size=1000, space=LIVEPAPERS_SPACE)
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
    lpv = _get_live_paper_by_id_or_alias(lp_id, kg_client, scope="in progress")

    def get_access_code(lpv):  # to implement
        return None

    if lpv:
        if (
            token.credentials == get_access_code(lpv)
            or await can_view_collab(lpv.collab_id, token.credentials)
            or await is_admin(token.credentials)
        ):
            try:
                obj = LivePaper.from_kg_object(lpv, kg_client)
            except ConsistencyError as err:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
        else:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"This account cannot edit Collab #{lpv.collab_id}",
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
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )

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
        await is_collab_member(live_paper.collab_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{live_paper.collab_id}",
        )

    kg_client = get_kg_client_for_user_account(token)

    kg_objects = live_paper.to_kg_objects(kg_client)
    if kg_objects["paper"][0].exists(kg_client):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another live paper with the same name already exists.",
        )
    kg_objects["paper"][0].date_created = datetime.now()
    for category in ("people", "paper", "sections"):  # the order is important
        for obj in kg_objects[category]:
            if hasattr(obj, "affiliation") and obj.affiliation:
                obj.affiliation.save(kg_client)
            obj.save(kg_client)
    logger.info("Saved objects")

    return LivePaperSummary.from_kg_object(kg_objects["paper"][0])


@router.put("/livepapers/{lp_id}", status_code=status.HTTP_200_OK)
async def update_live_paper(
    lp_id: UUID,    #todo: handle Slug
    live_paper: LivePaper,
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )

    logger.info("Beginning put live paper")

    if not (
        await is_collab_member(live_paper.collab_id, token.credentials)
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

    if not kg_objects["paper"][0].exists(kg_client):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Live paper with id {lp_id} not found.",
        )
    assert UUID(kg_objects["paper"][0].uuid) == lp_id

    for category in ("people", "paper", "sections"):  # the order is important
        for obj in kg_objects[category]:
            if hasattr(obj, "affiliation") and obj.affiliation:
                obj.affiliation.save(kg_client)
            obj.save(kg_client)
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
