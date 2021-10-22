
import logging
from uuid import UUID
from typing import List, Union
from datetime import datetime


from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..auth import (
    get_kg_client, get_person_from_token, is_collab_member, is_admin,
    can_view_collab, get_editable_collabs
)
from ..data_models import LivePaper, LivePaperSummary, ConsistencyError, AccessCode, Slug
from ..db import _get_live_paper_by_id_or_alias
import fairgraph.livepapers
from fairgraph.base import KGQuery, as_list


logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()
kg_client = get_kg_client()
router = APIRouter()


# todo:
#  - handle KG objects as data items

@router.get("/livepapers/", response_model=List[LivePaperSummary])
async def query_live_papers(
    editable: bool = False,
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    lps = fairgraph.livepapers.LivePaper.list(kg_client, api="nexus", size=1000)
    if editable:
        # include only those papers the user can edit
        editable_collabs = await get_editable_collabs(token.credentials)
        accessible_lps = [
            lp for lp in lps if lp.collab_id in editable_collabs
        ]
    else:
        # include all papers the user can view
        accessible_lps = []
        for lp in lps:
            if await can_view_collab(lp.collab_id, token.credentials):
                accessible_lps.append(lp)
    return [
        LivePaperSummary.from_kg_object(lp)
        for lp in as_list(accessible_lps)
    ]


@router.get("/livepapers-published/", response_model=List[LivePaperSummary])
async def query_released_live_papers():
    lps = fairgraph.livepapers.LivePaper.list(kg_client, api="query", scope="released", size=1000)
    return [
        LivePaperSummary.from_kg_object(lp)
        for lp in as_list(lps)
    ]


@router.get("/livepapers/{lp_id}", response_model=LivePaper)
async def get_live_paper(
    lp_id: Union[UUID, Slug],
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    lp = _get_live_paper_by_id_or_alias(lp_id, scope="in progress")

    if lp:
        if (
            token.credentials == lp.access_code
            or await can_view_collab(lp.collab_id, token.credentials)
            or await is_admin(token.credentials)
        ):
            try:
                obj = LivePaper.from_kg_object(lp, kg_client)
            except ConsistencyError as err:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
        else:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"This account cannot view Collab #{lp.collab_id}",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Live Paper {lp_id} not found.",
        )
    return obj


@router.get("/livepapers-published/{lp_id}", response_model=LivePaper)
async def get_live_paper(
    lp_id: Union[UUID, Slug]
):
    lp = _get_live_paper_by_id_or_alias(lp_id, scope="released")
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
        await is_collab_member(live_paper.collab_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{live_paper.collab_id}",
        )

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
    logger.info("Beginning set access code")

    lp = _get_live_paper_by_id_or_alias(lp_id, scope="in progress")

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
