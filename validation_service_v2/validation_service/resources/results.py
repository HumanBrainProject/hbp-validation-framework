from uuid import UUID
from enum import Enum
from typing import List
from datetime import datetime
from urllib.parse import quote_plus, urlencode
import os
import logging
import itertools
from requests.exceptions import HTTPError

from fairgraph.client_v3 import STAGE_MAP
from fairgraph.base_v3 import KGQuery, as_list
import fairgraph.openminds.core as omcore
import fairgraph.openminds.computation as omcmp

from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import ValidationError

from ..auth import get_kg_client_for_user_account, get_user_from_token, can_edit_collab, is_admin
from ..data_models import ScoreType, ValidationResult, ValidationResultWithTestAndModel, ValidationResultSummary, ConsistencyError
from ..queries import build_result_filters
from .. import settings


logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()
router = APIRouter()


@router.get("/results-old/", response_model=List[ValidationResult])
def query_results(
    #passed: List[bool] = Query(None),
    project_id: List[int] = Query(None),
    model_instance_id: List[UUID] = Query(
        None
    ),
    test_instance_id: List[UUID] = Query(None),
    #model_id: List[UUID] = Query(None),
    #test_id: List[UUID] = Query(None),
    #model_alias: List[str] = Query(None),
    #test_alias: List[str] = Query(None),
    score_type: List[ScoreType] = None,
    size: int = Query(100),
    from_index: int = Query(0),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    passed = None
    model_id = None
    test_id = None
    model_alias = None
    test_alias = None
    return _query_results(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
from_index, token, response_model=ValidationResult)


def _query_results(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
from_index, token, response_model):
    kg_client = get_kg_client_for_user_account(token)
    filter_query = build_result_filters(
        model_instance_id,
        test_instance_id,
        model_id,
        test_id,
        model_alias,
        test_alias,
        score_type,
        passed,
        kg_client,
    )
    if project_id:
        spaces = [f"collab-{collab_id}" for collab_id in project_id]
    else:
        spaces = ["collab-model-validation"]

    validation_results = []
    for space in spaces:
        if len(filter_query) > 0:
            logger.info("Searching for ModelValidations with the following query: {}".format(filter_query))
            results = omcmp.ModelValidation.list(
                kg_client, size=size, from_index=from_index, api="query", scope="in progress",
                space=space, **filter_query)
        else:
            results = omcmp.ModelValidation.list(
                kg_client, size=size, from_index=from_index, api="core", scope="in progress",
                space=space)
        validation_results.extend(as_list(results))
    return [
        response_model.from_kg_object(validation_result, kg_client)
        for validation_result in as_list(validation_results)
    ]


def expand_combinations(D):
    keys, values = zip(*D.items())
    return [dict(zip(keys, v)) for v in itertools.product(*[as_list(v) for v in values])]


def _query_results2(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
from_index, token):
    # todo : more sophisticated handling of size and from_index
    path = "/modelvalidation/simulation/validationresult/v0.1.0"
    query_id = "test"  # "vf"
    scope = STAGE_MAP["in progress"]
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


@router.get("/results/", response_model=List[ValidationResult])
def query_results2(
    #passed: List[bool] = Query(None),
    project_id: List[int] = Query(None),
    model_instance_id: List[UUID] = Query(None),
    test_instance_id: List[UUID] = Query(None),
    model_id: List[UUID] = Query(None),
    test_id: List[UUID] = Query(None),
    model_alias: List[str] = Query(None),
    test_alias: List[str] = Query(None),
    score_type: List[ScoreType] = Query(None),
    size: int = Query(100),
    from_index: int = Query(0),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    filter = {}
    if model_instance_id:
        filter["model_instance_id"] = [item.value for item in model_instance_id][0]
    if test_instance_id:
        filter["test_instance_id"] = [item.value for item in test_instance_id][0]
    if model_id:
        filter["model_id"] = [item.value for item in model_id][0]
    if test_id:
        filter["test_id"] = [item.value for item in test_id][0]
    if model_alias:
        filter["model_alias"] = [item.value for item in model_alias][0]
    if test_alias:
        filter["test_alias"] = [item.value for item in test_alias][0]
    if score_type:
        filter["score_type"] = [item.value for item in score_type][0]

    if project_id:
        spaces = [f"collab-{collab_id}" for collab_id in project_id]
    else:
        #spaces = ["computation"]
        spaces = ["collab-model-validation"]  # during development

    kg_client = get_kg_client_for_user_account(token)

    query = kg_client.retrieve_query("VF_ValidationResult")

    test_results = []
    for space in spaces:
        results = kg_client.query(filter, query["@id"], space=space,
            from_index=from_index, size=size, scope="in progress")
        test_results.extend(results.data)

    return [
        ValidationResult.from_kg_query(item, kg_client)
        for item in test_results
    ]


@router.get("/results/{result_id}", response_model=ValidationResult)
def get_result(result_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    kg_client = get_kg_client_for_user_account(token)
    validation_activity = omcmp.ModelValidation.from_uuid(str(result_id), kg_client, scope="in progress")
    if validation_activity:
        try:
            obj = ValidationResult.from_kg_object(validation_activity, kg_client)
        except ConsistencyError as err:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Validation result {result_id} not found.",
        )
    return obj


@router.get("/results-extended-old/", response_model=List[ValidationResultWithTestAndModel])
async def query_results_extended(
    #passed: List[bool] = Query(None),
    project_id: List[int] = Query(None),
    model_instance_id: List[UUID] = Query(
        None
    ),  # todo: rename this 'model_instance_id' for consistency
    test_instance_id: List[UUID] = Query(None),
    #model_id: List[UUID] = Query(None),
    #test_id: List[UUID] = Query(None),
    #model_alias: List[str] = Query(None),
    #test_alias: List[str] = Query(None),
    score_type: List[ScoreType] = None,
    size: int = Query(100),
    from_index: int = Query(0),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    passed = None
    model_id = None
    test_id = None
    model_alias = None
    test_alias = None
    return _query_results(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
from_index, token, response_model=ValidationResultWithTestAndModel)


@router.get("/results-extended/", response_model=List[ValidationResultWithTestAndModel])
async def query_results_extended2(
    #passed: List[bool] = Query(None),
    project_id: List[int] = Query(None),
    model_instance_id: List[UUID] = Query(None),
    test_instance_id: List[UUID] = Query(None),
    model_id: List[UUID] = Query(None),
    test_id: List[UUID] = Query(None),
    model_alias: List[str] = Query(None),
    test_alias: List[str] = Query(None),
    score_type: List[ScoreType] = Query(None),
    size: int = Query(100),
    from_index: int = Query(0),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):

    kg_client = get_kg_client_for_user_account(token)

    filter = {}
    # todo: implement combinations where lists have more than one element
    if model_instance_id:
        filter["model_instance_id"] = kg_client.uri_from_uuid(model_instance_id[0])
    if test_instance_id:
        filter["test_instance_id"] = kg_client.uri_from_uuid(test_instance_id[0])
    if model_id:
        filter["model_id"] = kg_client.uri_from_uuid(model_id[0])
    if test_id:
        filter["test_id"] = kg_client.uri_from_uuid(test_id[0])
    if model_alias:
        filter["model_alias"] = model_alias[0]
    if test_alias:
        filter["test_alias"] = test_alias[0]
    if score_type:
        filter["score_type"] = [item.value for item in score_type][0]

    if project_id:
        spaces = [f"collab-{collab_id}" for collab_id in project_id]
    else:
        #spaces = ["computation"]
        spaces = ["collab-model-validation"]  # during development

    query = kg_client.retrieve_query("VF_ValidationResultWithTestAndModel")

    test_results = []
    for space in spaces:
        try:
            results = kg_client.query(filter, query["@id"], space=space,
                from_index=from_index, size=size, scope="in progress")
        except Exception as err:
            breakpoint()
        test_results.extend(results.data)

    return [
        ValidationResultWithTestAndModel.from_kg_query(item, kg_client)
        for item in test_results
    ]


@router.get("/results-extended/{result_id}", response_model=ValidationResultWithTestAndModel)
async def get_result_extended(result_id: UUID,
                     token: HTTPAuthorizationCredentials = Depends(auth)):
    kg_client = get_kg_client_for_user_account(token)
    validation_activity = omcmp.ModelValidation.from_uuid(str(result_id), kg_client, scope="in progress")
    if validation_activity:
        try:
            obj = ValidationResultWithTestAndModel.from_kg_object(validation_activity, kg_client)
        except ConsistencyError as err:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Validation result {result_id} not found.",
        )
    return obj


@router.get("/results-summary-old/", response_model=List[ValidationResultSummary])
async def query_results_summary(
    passed: List[bool] = Query(None),
    project_id: List[int] = Query(None),
    model_instance_id: List[UUID] = Query(None),
    test_instance_id: List[UUID] = Query(None),
    model_id: List[UUID] = Query(None),
    test_id: List[UUID] = Query(None),
    model_alias: List[str] = Query(None),
    test_alias: List[str] = Query(None),
    score_type: List[ScoreType] = Query(None),
    size: int = Query(100),
    from_index: int = Query(0),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    return _query_results(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
from_index, token, response_model=ValidationResultSummary)


@router.get("/results-summary/", response_model=List[ValidationResultSummary])
def query_results_summary2(
    #passed: List[bool] = Query(None),
    project_id: List[int] = Query(None),
    model_instance_id: List[UUID] = Query(None),
    test_instance_id: List[UUID] = Query(None),
    model_id: List[UUID] = Query(None),
    test_id: List[UUID] = Query(None),
    model_alias: List[str] = Query(None),
    test_alias: List[str] = Query(None),
    score_type: List[ScoreType] = Query(None),
    size: int = Query(100),
    from_index: int = Query(0),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):

    kg_client = get_kg_client_for_user_account(token)

    filter = {}
    # todo: implement combinations where lists have more than one element
    if model_instance_id:
        filter["model_instance_id"] = kg_client.uri_from_uuid(model_instance_id[0])
    if test_instance_id:
        filter["test_instance_id"] = kg_client.uri_from_uuid(test_instance_id[0])
    if model_id:
        filter["model_id"] = kg_client.uri_from_uuid(model_id[0])
    if test_id:
        filter["test_id"] = kg_client.uri_from_uuid(test_id[0])
    if model_alias:
        filter["model_alias"] = model_alias[0]
    if test_alias:
        filter["test_alias"] = test_alias[0]
    if score_type:
        filter["score_type"] = [item.value for item in score_type][0]

    if project_id:
        spaces = [f"collab-{collab_id}" for collab_id in project_id]
    else:
        #spaces = ["computation"]
        spaces = ["collab-model-validation"]  # during development

    query = kg_client.retrieve_query("VF_ValidationResultSummary")

    test_results = []
    for space in spaces:
        try:
            results = kg_client.query(filter, query["@id"], space=space,
                from_index=from_index, size=size, scope="in progress")
        except Exception as err:
            breakpoint()
        test_results.extend(results.data)

    return [
        ValidationResultSummary.from_kg_query(item, kg_client)
        for item in test_results
    ]


@router.post("/results/", response_model=ValidationResult, status_code=status.HTTP_201_CREATED)
def create_result(result: ValidationResult, token: HTTPAuthorizationCredentials = Depends(auth)):
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )

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
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )

    # todo: handle non-existent UUID
    result = ValidationResultKG.from_uuid(str(result_id), kg_client, api="nexus", scope="in progress")
    if not await is_admin(token.credentials):
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
