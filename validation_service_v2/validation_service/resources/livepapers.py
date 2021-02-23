
import logging
from uuid import UUID
from typing import List
from datetime import datetime


from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from ..auth import get_kg_client, get_person_from_token
from ..data_models import LivePaper, LivePaperSummary, ConsistencyError
import fairgraph.livepapers
from fairgraph.base import as_list


logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()
kg_client = get_kg_client()
router = APIRouter()


# todo:
#  - auth
#  - handle KG objects as data items

@router.get("/livepapers/", response_model=List[LivePaperSummary])
def query_live_papers(token: HTTPAuthorizationCredentials = Depends(auth)):
    lps = fairgraph.livepapers.LivePaper.list(kg_client, api="nexus", size=1000)
    return [
        LivePaperSummary.from_kg_object(lp)
        for lp in as_list(lps)
    ]


@router.get("/livepapers/{lp_id}", response_model=LivePaper)
def get_live_paper(lp_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    lp = fairgraph.livepapers.LivePaper.from_uuid(str(lp_id), kg_client, api="nexus")
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
def create_live_paper(
    live_paper: LivePaper,
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    logger.info("Beginning post live paper")
    kg_objects = live_paper.to_kg_objects()
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
def update_live_paper(
    lp_id: UUID,
    live_paper: LivePaper,
    token: HTTPAuthorizationCredentials = Depends(auth)
):
    logger.info("Beginning put live paper")
    kg_objects = live_paper.to_kg_objects()
    logger.info("Created objects")

    for category in ("people", "paper", "sections"):  # the order is important
        for obj in kg_objects[category]:
            if hasattr(obj, "affiliation") and obj.affiliation:
                obj.affiliation.save(kg_client)
            obj.save(kg_client)
    logger.info("Saved objects")

    return None
    #return LivePaper.from_kg_object(lp, kg_client)

# test lp_id: 5249159f-898c-4b60-80ef-95ddc6414557