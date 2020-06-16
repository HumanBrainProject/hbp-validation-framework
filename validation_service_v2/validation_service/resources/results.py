from uuid import UUID
from enum import Enum
from typing import List
from datetime import datetime
import os
import logging

import requests

from fairgraph.client import KGClient
from fairgraph.base import KGQuery, KGProxy, as_list
from fairgraph.brainsimulation import (
    ValidationResult as ValidationResultKG,
    ValidationActivity)

from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import ValidationError

from ..auth import get_kg_client, get_user_from_token, is_collab_member
from ..data_models import ScoreType, ValidationResult, ConsistencyError
from ..queries import build_result_filters
from .. import settings


logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()
kg_client = get_kg_client()
router = APIRouter()


@router.get("/results/", response_model=List[ValidationResult])
def query_results(passed: List[bool]=Query(None),
                  project_id: List[int] = Query(None),
                  model_version_id: List[UUID] = Query(None),  # todo: rename this 'model_instance_id' for consistency
                  test_code_id: List[UUID] = Query(None),
                  model_id: List[UUID] = Query(None),
                  test_id: List[UUID] = Query(None),
                  model_alias: List[str] = Query(None),
                  test_alias: List[str] = Query(None),
                  score_type: List[ScoreType] = None,
                  size: int = Query(100),
                  from_index: int = Query(0),
                  # from header
                  token: HTTPAuthorizationCredentials = Depends(auth)
            ):
    filter_query, context = build_result_filters(
        model_version_id, test_code_id, model_id, test_id,
        model_alias, test_alias, score_type, passed, project_id,
        kg_client)
    if len(filter_query["value"]) > 0:
        logger.info(f"Searching for ValidationResult with the following query: {filter_query}")
        # note that from_index is not currently supported by KGQuery.resolve
        query = KGQuery(ValidationResultKG, {"nexus": filter_query}, context)
        results = query.resolve(kg_client, api="nexus", size=size)
    else:
        results = ValidationResultKG.list(kg_client, api="nexus", size=size, from_index=from_index)
    response = []
    for result in results:
        try:
            obj = ValidationResult.from_kg_object(result, kg_client)
        except ConsistencyError as err:  # todo: count these and report them in the response
            logger.warning(str(err))
        else:
            response.append(obj)
    return response


@router.get("/results/{result_id}", response_model=ValidationResult)
def get_result(result_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    result = ValidationResultKG.from_uuid(str(result_id), kg_client, api="nexus")
    try:
        obj = ValidationResult.from_kg_object(result, kg_client)
    except ConsistencyError as err:
        raise HTTPException(status_code=status.HTTP_404_NOTFOUND,
                            detail=str(err))
    return obj


@router.post("/results/", response_model=ValidationResult, status_code=status.HTTP_201_CREATED)
def create_result(result: ValidationResult, token: HTTPAuthorizationCredentials = Depends(auth)):
    logger.info("Beginning post result")
    kg_objects = result.to_kg_objects(kg_client)
    logger.info("Created objects")
    for obj in kg_objects:
        obj.save(kg_client)
    logger.info("Saved objects")
    result_kg = kg_objects[-2]
    activity_kg = kg_objects[-1]
    assert isinstance(result_kg, ValidationResultKG)
    assert isinstance(activity_kg, ValidationActivity)
    result_kg.generated_by = activity_kg
    result_kg.save(kg_client)
    return ValidationResult.from_kg_object(result_kg, kg_client)


@router.delete("/results/{result_id}", status_code=status.HTTP_200_OK)
async def delete_result(result_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    # todo: handle non-existent UUID
    result = ValidationResultKG.from_uuid(str(result_id), kg_client, api="nexus")
    if not await is_collab_member(settings.ADMIN_COLLAB_ID, token.credentials):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Deleting validation results is restricted to admins")
    for item in as_list(result.additional_data):
        item.delete(kg_client)
        # todo: check whether the result has been used in further analysis
        #       if so, we should probably disallow deletion unless forced
    result.generated_by.delete(kg_client)
    result.delete(kg_client)
