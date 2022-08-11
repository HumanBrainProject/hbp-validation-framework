from uuid import UUID
from enum import Enum
from typing import List
from datetime import datetime
from urllib.parse import quote_plus, urlencode
import os
import logging
import itertools
from requests.exceptions import HTTPError

from fairgraph.client import KGClient, SCOPE_MAP
from fairgraph.base import KGQuery, KGProxy, as_list
from fairgraph.brainsimulation import ValidationResult as ValidationResultKG, ValidationActivity

from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import ValidationError

from ..auth import get_kg_client, is_admin
from ..data_models import ScoreType, ValidationResult, ValidationResultWithTestAndModel, ValidationResultSummary, ConsistencyError
from ..queries import build_result_filters
from .. import settings


logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()
kg_client = get_kg_client()
router = APIRouter()


@router.get("/results/", response_model=List[ValidationResult])
def query_results(
    passed: List[bool] = Query(None),
    project_id: List[int] = Query(None),
    model_instance_id: List[UUID] = Query(
        None
    ),  # todo: rename this 'model_instance_id' for consistency
    test_instance_id: List[UUID] = Query(None),
    model_id: List[UUID] = Query(None),
    test_id: List[UUID] = Query(None),
    model_alias: List[str] = Query(None),
    test_alias: List[str] = Query(None),
    score_type: List[ScoreType] = None,
    size: int = Query(100),
    from_index: int = Query(0),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    return _query_results(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
from_index, token)


def _query_results(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
from_index, token):
    filter_query, context = build_result_filters(
        model_instance_id,
        test_instance_id,
        model_id,
        test_id,
        model_alias,
        test_alias,
        score_type,
        passed,
        project_id,
        kg_client,
    )
    if len(filter_query["value"]) > 0:
        logger.info(f"Searching for ValidationResult with the following query: {filter_query}")
        # note that from_index is not currently supported by KGQuery.resolve
        query = KGQuery(ValidationResultKG, {"nexus": filter_query}, context)
        results = query.resolve(kg_client, api="nexus", size=size, scope="latest")
    else:
        results = ValidationResultKG.list(kg_client, api="nexus", size=size, from_index=from_index, scope="latest")
    response = []
    for result in results:
        try:
            obj = ValidationResult.from_kg_object(result, kg_client)
        except ConsistencyError as err:  # todo: count these and report them in the response
            logger.warning(str(err))
        else:
            response.append(obj)
    return response


def expand_combinations(D):
    keys, values = zip(*D.items())
    return [dict(zip(keys, v)) for v in itertools.product(*[as_list(v) for v in values])]


def _query_results2(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
from_index, token):
    # todo : more sophisticated handling of size and from_index
    path = "/modelvalidation/simulation/validationresult/v0.1.0"
    query_id = "test"  # "vf"
    scope = SCOPE_MAP["latest"]
    query_parameters = {
        "start": 0,   #from_index,
        "size": 100000,  #size,
        "vocab": "https://schema.hbp.eu/myQuery/",
        "scope": scope
    }
    for filter_name in ("passed", "project_id", "model_instance_id", "test_instance_id",
                        "model_id", "test_id", "model_alias", "test_alias", "score_type"):
        value = locals()[filter_name]
        if value is not None:
            query_parameters[filter_name] = value
    # if we search for multiple values of model_id (for example) we have to send each query separately
    # so we use expand_combinations to get the different queries
    query_parameters_list = expand_combinations(query_parameters)
    response = []
    for query_parameters in query_parameters_list:
        query_string = urlencode(query_parameters, doseq=True)
        url = f"{path}/{query_id}/instances?" + query_string
        print(url)
        try:
            kg_response = kg_client._kg_query_client.get(url)
        except HTTPError as err:
            if err.response.status_code == 403:
                kg_response = None
            else:
                raise
        if kg_response and "results" in kg_response:
            for result in kg_response["results"]:
                try:
                    obj = ValidationResult.from_kg_query(result)
                except ConsistencyError as err:  # todo: count these and report them in the response
                    logger.warning(str(err))
                else:
                    response.append(obj)
                if len(response) >= size + from_index:
                    break
            if len(response) >= size + from_index:
                break
    return response[from_index:from_index + size]


@router.get("/results/{result_id}", response_model=ValidationResult)
def get_result(result_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    result = ValidationResultKG.from_uuid(str(result_id), kg_client, api="nexus", scope="latest")
    if result:
        try:
            obj = ValidationResult.from_kg_object(result, kg_client)
        except ConsistencyError as err:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Validation result {result_id} not found.",
        )
    return obj


@router.get("/results-extended/", response_model=List[ValidationResultWithTestAndModel])
async def query_results_extended(
    passed: List[bool] = Query(None),
    project_id: List[int] = Query(None),
    model_instance_id: List[UUID] = Query(
        None
    ),  # todo: rename this 'model_instance_id' for consistency
    test_instance_id: List[UUID] = Query(None),
    model_id: List[UUID] = Query(None),
    test_id: List[UUID] = Query(None),
    model_alias: List[str] = Query(None),
    test_alias: List[str] = Query(None),
    score_type: List[ScoreType] = None,
    size: int = Query(100),
    from_index: int = Query(0),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    filter_query, context = build_result_filters(
        model_instance_id,
        test_instance_id,
        model_id,
        test_id,
        model_alias,
        test_alias,
        score_type,
        passed,
        project_id,
        kg_client,
    )
    if len(filter_query["value"]) > 0:
        logger.info(f"Searching for ValidationResult with the following query: {filter_query}")
        # note that from_index is not currently supported by KGQuery.resolve
        query = KGQuery(ValidationResultKG, {"nexus": filter_query}, context)
        results = query.resolve(kg_client, api="nexus", size=size, scope="latest")
    else:
        results = ValidationResultKG.list(kg_client, api="nexus", size=size, from_index=from_index, scope="latest")
    response = []
    for result in results:
        try:
            obj = await ValidationResultWithTestAndModel.from_kg_object(result, kg_client, token)
        except ConsistencyError as err:  # todo: count these and report them in the response
            logger.warning(str(err))
        else:
            response.append(obj)
    return response


@router.get("/results-extended/{result_id}", response_model=ValidationResultWithTestAndModel)
async def get_result_extended(result_id: UUID,
                     token: HTTPAuthorizationCredentials = Depends(auth)):
    result = ValidationResultKG.from_uuid(str(result_id), kg_client, api="nexus", scope="latest")
    if result:
        try:
            obj = await ValidationResultWithTestAndModel.from_kg_object(result, kg_client, token)
        except ConsistencyError as err:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Validation result {result_id} not found.",
        )
    return obj



@router.get("/results-summary/", response_model=List[ValidationResultSummary])
async def query_results_summary(
    passed: List[bool] = Query(None),
    project_id: List[int] = Query(None),
    model_instance_id: List[UUID] = Query(
        None
    ),  # todo: rename this 'model_instance_id' for consistency
    test_instance_id: List[UUID] = Query(None),
    model_id: List[UUID] = Query(None),
    test_id: List[UUID] = Query(None),
    model_alias: List[str] = Query(None),
    test_alias: List[str] = Query(None),
    score_type: List[ScoreType] = None,
    size: int = Query(100),
    from_index: int = Query(0),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):

    path = "/modelvalidation/simulation/validationresult/v0.1.0"
    query_id = "vf-summary"
    scope = SCOPE_MAP["latest"]
    query_parameters = {
        "start": 0,   #from_index,
        "size": 100000,  #size,
        "vocab": "https://schema.hbp.eu/myQuery/",
        "scope": scope
    }
    for filter_name in ("passed", "project_id", "model_instance_id", "test_instance_id",
                        "model_id", "test_id", "model_alias", "test_alias", "score_type"):
        value = locals()[filter_name]
        if value is not None:
            query_parameters[filter_name] = value
    # if we search for multiple values of model_id (for example) we have to send each query separately
    # so we use expand_combinations to get the different queries
    query_parameters_list = expand_combinations(query_parameters)
    response = []
    for query_parameters in query_parameters_list:
        query_string = urlencode(query_parameters, doseq=True)
        url = f"{path}/{query_id}/instances?" + query_string
        print(url)
        try:
            kg_response = kg_client._kg_query_client.get(url)
        except HTTPError as err:
            if err.response.status_code == 403:
                kg_response = None
            else:
                raise
        if kg_response and "results" in kg_response:
            for result in kg_response["results"]:
                try:
                    obj = ValidationResultSummary.from_kg_query(result)
                except ConsistencyError as err:  # todo: count these and report them in the response
                    logger.warning(str(err))
                else:
                    response.append(obj)
                if len(response) >= size + from_index:
                    break
            if len(response) >= size + from_index:
                break
    return response[from_index:from_index + size]


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
    result = ValidationResultKG.from_uuid(str(result_id), kg_client, api="nexus", scope="latest")
    if not await is_admin(token):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Deleting validation results is restricted to admins",
        )
    for item in as_list(result.additional_data):
        item.delete(kg_client)
        # todo: check whether the result has been used in further analysis
        #       if so, we should probably disallow deletion unless forced
    result.generated_by.delete(kg_client)
    result.delete(kg_client)
