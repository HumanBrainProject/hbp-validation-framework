from uuid import UUID
from enum import Enum
from typing import List
from datetime import datetime
from urllib.parse import quote_plus, urlencode
import os
import logging
import itertools
from requests.exceptions import HTTPError

from fairgraph.client import STAGE_MAP
from fairgraph.kgquery import KGQuery
from fairgraph.utility import as_list
from fairgraph.errors import ResolutionFailure
import fairgraph.openminds.core as omcore
import fairgraph.openminds.computation as omcmp

from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import ValidationError

from ..auth import get_kg_client_for_service_account, get_kg_client_for_user_account, User
from ..data_models import ScoreType, ValidationResult, ValidationResultWithTestAndModel, ValidationResultSummary, ConsistencyError, space_from_project_id
from ..queries import build_result_filters, expand_combinations, model_is_public, test_is_public
from ..db import _check_service_status
from .. import settings


logger = logging.getLogger("validation_service_api")

auth = HTTPBearer()
router = APIRouter()


# @router.get("/results-old/", response_model=List[ValidationResult])
# def query_results_old(
#     #passed: List[bool] = Query(None),
#     project_id: List[int] = Query(None),
#     model_instance_id: List[UUID] = Query(
#         None
#     ),
#     test_instance_id: List[UUID] = Query(None),
#     #model_id: List[UUID] = Query(None),
#     #test_id: List[UUID] = Query(None),
#     #model_alias: List[str] = Query(None),
#     #test_alias: List[str] = Query(None),
#     score_type: List[ScoreType] = None,
#     size: int = Query(100),
#     from_index: int = Query(0),
#     # from header
#     token: HTTPAuthorizationCredentials = Depends(auth),
# ):
#     passed = None
#     model_id = None
#     test_id = None
#     model_alias = None
#     test_alias = None
#     return _query_results_old(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
# from_index, token, response_model=ValidationResult)


# def _query_results_old(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
# from_index, token, response_model):
#     kg_client = get_kg_client_for_user_account(token)
#     filter_query = build_result_filters(
#         model_instance_id,
#         test_instance_id,
#         model_id,
#         test_id,
#         model_alias,
#         test_alias,
#         score_type,
#         passed,
#         kg_client,
#     )
#     if project_id:
#         spaces = [f"collab-{collab_id}" for collab_id in project_id]
#     else:
#         spaces = ["collab-model-validation"]

#     validation_results = []
#     for space in spaces:
#         if len(filter_query) > 0:
#             logger.info("Searching for ModelValidations with the following query: {}".format(filter_query))
#             results = omcmp.ModelValidation.list(
#                 kg_client, size=size, from_index=from_index, api="query", scope="in progress",
#                 space=space, **filter_query)
#         else:
#             results = omcmp.ModelValidation.list(
#                 kg_client, size=size, from_index=from_index, api="core", scope="in progress",
#                 space=space)
#         validation_results.extend(as_list(results))
#     return [
#         response_model.from_kg_object(validation_result, kg_client)
#         for validation_result in as_list(validation_results)
#     ]


def _query_results(filters, kg_user_client, data_model, query_label, from_index, size, user):
    filters = expand_combinations(filters)

    kg_service_client = get_kg_client_for_service_account()

    query = kg_service_client.retrieve_query(query_label)
    if query is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Query '{query_label}' could not be retrieved",
        )

    if len(filters) == 1:
        # common, simple case
        response = kg_user_client.query(query, filters[0],
                                        from_index=from_index, size=size, scope="any",
                                        id_key="uri", use_stored_query=True)
        test_results = [
            data_model.from_kg_query(item, kg_user_client)
            for item in response.data
        ]
    else:
        # more complex case for pagination
        items = []
        for filter in filters:
            response = kg_user_client.query(query, filter,
                                            from_index=0, size=100000, scope="any",
                                            use_stored_query=True)
            items.extend(response.data)
            if len(items) >= size + from_index:
                break

        test_results = [
            data_model.from_kg_query(item, kg_user_client)
            for item in items[from_index:from_index + size]
        ]

    if user.is_anonymous:
        test_results = [
            test_result for test_result in test_results
            if (model_is_public(test_result.model_id, kg_service_client)
                and test_is_public(test_result.test_id, kg_service_client))
        ]
    return test_results


@router.get("/results/", response_model=List[ValidationResult])
def query_results(
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
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        if not (model_instance_id or model_id or model_alias or test_instance_id or test_id or test_alias):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="For anonymous access you must specify a model and/or test",
            )
        kg_client = get_kg_client_for_service_account()
    else:
        kg_client = get_kg_client_for_user_account(token)

    # if we search for multiple values of model_id (for example) we have to send each query separately
    # so we use expand_combinations to get the different queries

    filters = {}
    if model_instance_id:
        filters["model_instance_id"] = [kg_client.uri_from_uuid(id) for id in model_instance_id]
    if test_instance_id:
        filters["test_instance_id"] = [kg_client.uri_from_uuid(id) for id in test_instance_id]
    if model_id:
        filters["model_id"] = [kg_client.uri_from_uuid(id) for id in model_id]
    if test_id:
        filters["test_id"] = [kg_client.uri_from_uuid(id) for id in test_id]
    if model_alias:
        filters["model_alias"] = model_alias
    if test_alias:
        filters["test_alias"] = test_alias
    if score_type:
        filters["score_type"] = [item.value for item in score_type]
    if project_id:
        filters["space"] = [f"collab-{collab_id}" for collab_id in project_id]

    return _query_results(filters, kg_client, ValidationResult,
                           "VF_ValidationResult", from_index, size, user)


@router.get("/results/{result_id}", response_model=ValidationResult)
def get_result(result_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
    else:
        kg_client = get_kg_client_for_user_account(token)
    validation_activity = omcmp.ModelValidation.from_uuid(str(result_id), kg_client, scope="any")
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
    # todo: add check for anonymous access
    return obj


# @router.get("/results-extended-old/", response_model=List[ValidationResultWithTestAndModel])
# async def query_results_extended_old(
#     #passed: List[bool] = Query(None),
#     project_id: List[int] = Query(None),
#     model_instance_id: List[UUID] = Query(
#         None
#     ),  # todo: rename this 'model_instance_id' for consistency
#     test_instance_id: List[UUID] = Query(None),
#     #model_id: List[UUID] = Query(None),
#     #test_id: List[UUID] = Query(None),
#     #model_alias: List[str] = Query(None),
#     #test_alias: List[str] = Query(None),
#     score_type: List[ScoreType] = None,
#     size: int = Query(100),
#     from_index: int = Query(0),
#     # from header
#     token: HTTPAuthorizationCredentials = Depends(auth),
# ):
#     passed = None
#     model_id = None
#     test_id = None
#     model_alias = None
#     test_alias = None
#     return _query_results_old(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
# from_index, token, response_model=ValidationResultWithTestAndModel)


@router.get("/results-extended/", response_model=List[ValidationResultWithTestAndModel])
async def query_results_extended(
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
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
    else:
        kg_client = get_kg_client_for_user_account(token)

    # if we search for multiple values of model_id (for example) we have to send each query separately
    # so we use expand_combinations to get the different queries

    filters = {}
    if model_instance_id:
        filters["model_instance_id"] = [kg_client.uri_from_uuid(id) for id in model_instance_id]
    if test_instance_id:
        filters["test_instance_id"] = [kg_client.uri_from_uuid(id) for id in test_instance_id]
    if model_id:
        filters["model_id"] = [kg_client.uri_from_uuid(id) for id in model_id]
    if test_id:
        filters["test_id"] = [kg_client.uri_from_uuid(id) for id in test_id]
    if model_alias:
        filters["model_alias"] = model_alias
    if test_alias:
        filters["test_alias"] = test_alias
    if score_type:
        filters["score_type"] = [item.value for item in score_type]
    if project_id:
        filters["space"] = [f"collab-{collab_id}" for collab_id in project_id]


    return _query_results(filters, kg_client, ValidationResultWithTestAndModel,
                          "VF_ValidationResultWithTestAndModel", from_index, size, user)


@router.get("/results-extended/{result_id}", response_model=ValidationResultWithTestAndModel)
async def get_result_extended(result_id: UUID,
                     token: HTTPAuthorizationCredentials = Depends(auth)):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
    else:
        kg_client = get_kg_client_for_user_account(token)
    validation_activity = omcmp.ModelValidation.from_uuid(str(result_id), kg_client, scope="any")
    if validation_activity:
        try:
            obj = ValidationResultWithTestAndModel.from_kg_object(validation_activity, kg_client)
        except (ConsistencyError, ResolutionFailure) as err:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Validation result {result_id} not found.",
        )
    return obj


# @router.get("/results-summary-old/", response_model=List[ValidationResultSummary])
# async def query_results_summary_old(
#     passed: List[bool] = Query(None),
#     project_id: List[int] = Query(None),
#     model_instance_id: List[UUID] = Query(None),
#     test_instance_id: List[UUID] = Query(None),
#     model_id: List[UUID] = Query(None),
#     test_id: List[UUID] = Query(None),
#     model_alias: List[str] = Query(None),
#     test_alias: List[str] = Query(None),
#     score_type: List[ScoreType] = Query(None),
#     size: int = Query(100),
#     from_index: int = Query(0),
#     # from header
#     token: HTTPAuthorizationCredentials = Depends(auth),
# ):
#     return _query_results_old(passed, project_id, model_instance_id, test_instance_id, model_id, test_id, model_alias, test_alias, score_type,  size,
# from_index, token, response_model=ValidationResultSummary)


@router.get("/results-summary/", response_model=List[ValidationResultSummary])
def query_results_summary(
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

    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
    else:
        kg_client = get_kg_client_for_user_account(token)

    # if we search for multiple values of model_id (for example) we have to send each query separately
    # so we use expand_combinations to get the different queries

    filters = {}
    if model_instance_id:
        filters["model_instance_id"] = [kg_client.uri_from_uuid(id) for id in model_instance_id]
    if test_instance_id:
        filters["test_instance_id"] = [kg_client.uri_from_uuid(id) for id in test_instance_id]
    if model_id:
        filters["model_id"] = [kg_client.uri_from_uuid(id) for id in model_id]
    if test_id:
        filters["test_id"] = [kg_client.uri_from_uuid(id) for id in test_id]
    if model_alias:
        filters["model_alias"] = model_alias
    if test_alias:
        filters["test_alias"] = test_alias
    if score_type:
        filters["score_type"] = [item.value for item in score_type]
    if project_id:
        filters["space"] = [f"collab-{collab_id}" for collab_id in project_id]


    return _query_results(filters, kg_client, ValidationResultSummary,
                          "VF_ValidationResultSummary", from_index, size, user)


@router.post("/results/", response_model=ValidationResult, status_code=status.HTTP_201_CREATED)
def create_result(result: ValidationResult, token: HTTPAuthorizationCredentials = Depends(auth)):
    _check_service_status()
    logger.info("Beginning post result")
    user = User(token, allow_anonymous=False)
    kg_client = get_kg_client_for_user_account(token)

    validation_activity = result.to_kg_objects(kg_client)
    space = space_from_project_id(result.project_id)
    activity_log = None

    for output in as_list(validation_activity.outputs):
        output.save(kg_client, recursive=False, activity_log=activity_log, space=space)
    if validation_activity.custom_property_sets:
        validation_activity.custom_property_sets.data_location.save(kg_client, recursive=True, activity_log=activity_log, space=space)
    validation_activity.save(kg_client, recursive=False, activity_log=activity_log, space=space)

    return ValidationResult.from_kg_object(validation_activity, kg_client)


@router.delete("/results/{result_id}", status_code=status.HTTP_200_OK)
async def delete_result(result_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    _check_service_status()
    user = User(token, allow_anonymous=False)
    kg_client = get_kg_client_for_user_account(token)
    # todo: handle non-existent UUID
    if not await user.is_admin():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Deleting validation results is restricted to admins",
        )
    result = omcmp.ModelValidation.from_uuid(str(result_id), kg_client, scope="any")
    for item in as_list(result.outputs):
        item.delete(kg_client)
        # todo: check whether the result has been used in further analysis
        #       if so, we should probably disallow deletion unless forced
    result.delete(kg_client)
