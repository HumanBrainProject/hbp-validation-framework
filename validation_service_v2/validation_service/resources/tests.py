from uuid import UUID
from typing import List
from datetime import datetime
import logging

from fairgraph.base_v3 import KGQuery, as_list
import fairgraph.openminds.computation as omcmp

from fastapi import APIRouter, Depends, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import ValidationError

from ..auth import get_kg_client_for_user_account, get_user_from_token, can_edit_collab, is_admin
from ..db import _get_test_by_id_or_alias, _get_test_instance_by_id
from ..data_models import (
    Person,
    Species,
    BrainRegion,
    CellType,
    RecordingModality,
    ValidationTestType,
    ScoreType,
    ValidationTest,
    ValidationTestSummary,
    ValidationTestInstance,
    ValidationTestPatch,
    ValidationTestInstancePatch,
)
from ..queries import build_validation_test_filters, test_alias_exists
from .. import settings


logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()
router = APIRouter()


@router.get("/tests-old/")
def query_tests(
    project_id: List[str] = Query(
        None, description="Find validation tests belonging to a specific project/projects"
    ),
    alias: List[str] = Query(None),
    id: List[UUID] = Query(None),
    name: List[str] = Query(None),
    implementation_status: str = Query(None),
    brain_region: List[BrainRegion] = Query(None),
    species: List[Species] = Query(None),
    cell_type: List[CellType] = Query(None),
    data_type: List[str] = Query(None),
    recording_modality: List[RecordingModality] = Query(None),
    test_type: List[ValidationTestType] = Query(None),
    score_type: List[ScoreType] = Query(None),
    author: List[str] = Query(None),
    size: int = Query(100),
    from_index: int = Query(0),
    summary: bool = Query(False, description="Return only summary information about each validation test"),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    # get the values of of the Enums
    if brain_region:
        brain_region = [item.value for item in brain_region]
    if species:
        species = [item.value for item in species]
    if cell_type:
        cell_type = [item.value for item in cell_type]
    if recording_modality:
        recording_modality = [item.value for item in recording_modality]
    if test_type:
        test_type = [item.value for item in test_type]
    if score_type:
        score_type = [item.value for item in score_type]

    filter_query = build_validation_test_filters(
        alias,
        id,
        name,
        implementation_status,
        brain_region,
        species,
        cell_type,
        data_type,
        recording_modality,
        test_type,
        score_type,
        author,
    )

    if project_id:
        spaces = [f"collab-{collab_id}" for collab_id in project_id]
    else:
        #spaces = ["computation"]
        spaces = ["collab-model-validation"]  # during development
    kg_client = get_kg_client_for_user_account(token)


    test_definitions = []
    for space in spaces:
        if len(filter_query) > 0:
            logger.info("Searching for ValidationTest with the following query: {}".format(filter_query))
            results = omcmp.ValidationTest.list(
                kg_client, size=size, from_index=from_index, api="query", scope="in progress",
                space=space, **filter_query)
        else:
            results = omcmp.ValidationTest.list(
                kg_client, size=size, from_index=from_index, api="core", scope="in progress",
                space=space)
        test_definitions.extend(as_list(results))
    if summary:
        cls = ValidationTestSummary
    else:
        cls = ValidationTest

    return [
        cls.from_kg_object(test_definition, kg_client)
        for test_definition in as_list(test_definitions)
    ]


@router.get("/tests/")
def query_tests2(
    project_id: List[str] = Query(
        None, description="Find validation tests belonging to a specific project/projects"
    ),
    alias: List[str] = Query(None),
    id: List[UUID] = Query(None),
    name: List[str] = Query(None),
    implementation_status: str = Query(None),
    brain_region: List[BrainRegion] = Query(None),
    species: List[Species] = Query(None),
    cell_type: List[CellType] = Query(None),
    data_type: List[str] = Query(None),
    recording_modality: List[RecordingModality] = Query(None),
    test_type: List[ValidationTestType] = Query(None),
    score_type: List[ScoreType] = Query(None),
    author: List[str] = Query(None),
    size: int = Query(100),
    from_index: int = Query(0),
    summary: bool = Query(False, description="Return only summary information about each validation test"),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    # get the values of of the Enums
    filter = {}
    if brain_region:
        filter["brain_region"] = [item.value for item in brain_region][0]
    if species:
        filter["species"] = [item.value for item in species][0]
    if cell_type:
        filter["cell_type"] = [item.value for item in cell_type][0]
    if recording_modality:
        filter["recording_modality"] = [item.value for item in recording_modality][0]
    if test_type:
        filter["test_type"] = [item.value for item in test_type][0]
    if data_type:
        filter["data_type"] = [item.value for item in data_type][0]
    if score_type:
        filter["score_type"] = [item.value for item in score_type][0]

    if author:
        filter["author"] = author[0]
    if name:
        filter["name"] = name[0]
    if alias:
        filter["alias"] = alias[0]

    # todo: handle implementation_status

    if project_id:
        spaces = [f"collab-{collab_id}" for collab_id in project_id]
    else:
        #spaces = ["computation"]
        spaces = ["collab-model-validation"]  # during development

    kg_client = get_kg_client_for_user_account(token)

    if summary:
        cls = ValidationTestSummary
        query = kg_client.retrieve_query("VF_ValidationTestSummary")
    else:
        cls = ValidationTest
        query = kg_client.retrieve_query("VF_ValidationTest")

    test_definitions = []
    for space in spaces:
        results = kg_client.query(filter, query["@id"], space=space,
            from_index=from_index, size=size, scope="in progress")
        test_definitions.extend(results.data)

    return [
        cls.from_kg_query(item, kg_client)
        for item in test_definitions
    ]


@router.get("/tests/{test_id}", response_model=ValidationTest)
def get_test(test_id: str, token: HTTPAuthorizationCredentials = Depends(auth)):
    kg_client = get_kg_client_for_user_account(token)
    test_definition = _get_test_by_id_or_alias(test_id, kg_client)
    return ValidationTest.from_kg_object(test_definition, kg_client)


@router.post("/tests/", response_model=ValidationTest, status_code=status.HTTP_201_CREATED)
def create_test(test: ValidationTest, token: HTTPAuthorizationCredentials = Depends(auth)):
    kg_user_client = get_kg_client_for_user_account(token)
    # check uniqueness of alias
    if test.alias and test_alias_exists(test.alias, kg_user_client):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another validation test with alias '{test.alias}' already exists.",
        )
    test_definition = test.to_kg_object()
    kg_space = "collab-model-validation"  # during development
    if test_definition.exists(kg_user_client):
        # see https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
        # for a discussion of the most appropriate status code to use here
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another validation test with the same name and timestamp already exists.",
        )
    test_definition.save(kg_user_client, recursive=True, space=kg_space)
    return ValidationTest.from_kg_object(test_definition, kg_user_client)


@router.put("/tests/{test_id}", response_model=ValidationTest, status_code=status.HTTP_200_OK)
def update_test(
    test_id: UUID,
    test_patch: ValidationTestPatch,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    # retrieve stored test
    kg_client = get_kg_client_for_user_account(token)
    test_definition = omcmp.ValidationTest.from_uuid(str(test_id), kg_client, scope="in progress")
    stored_test = ValidationTest.from_kg_object(test_definition, kg_client)
    # if alias changed, check uniqueness of new alias
    if (
        test_patch.alias
        and test_patch.alias != stored_test.alias
        and test_alias_exists(test_patch.alias, kg_client)
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another validation test with alias '{test_patch.alias}' already exists.",
        )
    # todo: if test id provided in payload, check it matches the test_id parameter
    # todo: if test uri provided in payload, check it matches the id

    # here we are updating the pydantic test `stored_test`, then recreating the kg objects
    # from this. It might be more efficient to directly update `test_definition`.
    # todo: profile both possible implementations
    update_data = test_patch.dict(exclude_unset=True)
    if "author" in update_data:
        update_data["author"] = [Person(**p) for p in update_data["author"]]
    updated_test = stored_test.copy(update=update_data)
    updated_test_definition = updated_test.to_kg_object()
    updated_test_definition.save(kg_client, recursive=True, space=test_definition.space)
    return ValidationTest.from_kg_object(updated_test_definition, kg_client)


@router.delete("/tests/{test_id}", status_code=status.HTTP_200_OK)
async def delete_test(test_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    # todo: handle non-existent UUID
    kg_client = get_kg_client_for_user_account(token)
    test_definition = omcmp.ValidationTest.from_uuid(str(test_id), kg_client, scope="in progress")
    if not await is_admin(token.credentials):
        # todo: replace this check with a group membership check for Collab v2
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Deleting tests is restricted to admins"
        )
    test_definition.delete(kg_client)
    for test_version in as_list(test_definition.versions):
        # todo: we should possibly also delete repositories,
        # but need to check they're not shared with other instances
        test_version.delete(kg_client)


@router.get("/tests/{test_id}/instances/", response_model=List[ValidationTestInstance])
def get_test_instances(
    test_id: str, version: str = Query(None), token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_client = get_kg_client_for_user_account(token)
    test_definition = _get_test_by_id_or_alias(test_id, kg_client)
    test_instances = [
        ValidationTestInstance.from_kg_object(inst, test_definition.uuid, kg_client)
        for inst in as_list(test_definition.versions)
    ]
    if version:
        test_instances = [inst for inst in test_instances if inst.version == version]
    return test_instances


@router.get("/tests/query/instances/{test_instance_id}", response_model=ValidationTestInstance)
def get_test_instance_from_instance_id(
    test_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_client = get_kg_client_for_user_account(token)
    inst = _get_test_instance_by_id(test_instance_id, kg_client)
    test_definition = omcmp.ValidationTest.list(kg_client, scope="in progress", space=inst.space, versions=inst)[0]
    return ValidationTestInstance.from_kg_object(inst, test_definition.uuid, kg_client)


@router.get("/tests/{test_id}/instances/in progress", response_model=ValidationTestInstance)
def get_latest_test_instance_given_test_id(
    test_id: str, token: HTTPAuthorizationCredentials = Depends(auth)
):
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )
    kg_client = get_kg_client_for_user_account(token)
    test_definition = _get_test_by_id_or_alias(test_id, token)
    test_instances = [
        ValidationTestInstance.from_kg_object(inst, test_definition.uuid, kg_client)
        for inst in as_list(test_definition.versions.resolve(kg_client, scope="in progress"))
    ]
    if len(test_instances) == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test definition {test_id} has no code associated with it",
        )
    latest = sorted(test_instances, key=lambda inst: inst.timestamp)[-1]
    return latest


@router.get("/tests/{test_id}/instances/{test_instance_id}", response_model=ValidationTestInstance)
def get_test_instance_given_test_id(
    test_id: str, test_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_client = get_kg_client_for_user_account(token)
    test_definition = _get_test_by_id_or_alias(test_id, kg_client)
    for inst in as_list(test_definition.versions):
        if UUID(inst.uuid) == test_instance_id:
            return ValidationTestInstance.from_kg_object(inst, test_definition.uuid, kg_client)
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Test ID and test instance ID are inconsistent",
    )


@router.get("/tests/query/instances/{test_instance_id}", response_model=ValidationTestInstance)
def get_test_instance_from_instance_id(
    test_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_client = get_kg_client_for_user_account(token)
    test_instance_kg = _get_test_instance_by_id(test_instance_id, kg_client)
    return ValidationTestInstance.from_kg_object(test_instance_kg, kg_client)


@router.post(
    "/tests/{test_id}/instances/",
    response_model=ValidationTestInstance,
    status_code=status.HTTP_201_CREATED,
)
def create_test_instance(
    test_id: str,
    test_instance: ValidationTestInstance,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    kg_client = get_kg_client_for_user_account(token)
    test_definition = _get_test_by_id_or_alias(test_id, kg_client)
    test_instance_kg = test_instance.to_kg_object(ValidationTest.from_kg_object(test_definition, kg_client))
    test_instance_kg.save(kg_client, recursive=True, space=test_definition.space)
    test_definition.versions = as_list(test_definition.versions) + [test_instance_kg]
    test_definition.save(kg_client, recursive=False)
    return ValidationTestInstance.from_kg_object(test_instance_kg, test_definition.uuid, kg_client)


@router.put(
    "/tests/query/instances/{test_instance_id}",
    response_model=ValidationTestInstance,
    status_code=status.HTTP_200_OK,
)
def update_test_instance_by_id(
    test_instance_id: str,
    test_instance_patch: ValidationTestInstancePatch,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    kg_client = get_kg_client_for_user_account(token)
    test_instance_kg = _get_test_instance_by_id(test_instance_id, kg_client)
    test_definition = omcmp.ValidationTest.list(
        kg_client, scope="in progress",
        space=test_instance_kg.space, versions=test_instance_kg)[0]
    return _update_test_instance(test_instance_kg, test_definition, test_instance_patch, token)


@router.put(
    "/tests/{test_id}/instances/{test_instance_id}",
    response_model=ValidationTestInstance,
    status_code=status.HTTP_200_OK,
)
def update_test_instance(
    test_id: str,
    test_instance_id: str,
    test_instance_patch: ValidationTestInstancePatch,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    kg_client = get_kg_client_for_user_account(token)
    test_instance_kg = _get_test_instance_by_id(test_instance_id, kg_client)
    test_definition_kg = _get_test_by_id_or_alias(test_id, kg_client)
    return _update_test_instance(test_instance_kg, test_definition_kg, test_instance_patch, kg_client)


def _update_test_instance(test_instance, test_definition_kg, test_instance_patch, kg_client):
    stored_test_instance = ValidationTestInstance.from_kg_object(test_instance, kg_client)
    update_data = test_instance_patch.dict(exclude_unset=True)
    updated_test_instance = stored_test_instance.copy(update=update_data)
    test_instance_kg = updated_test_instance.to_kg_object(test_definition_kg)
    assert test_instance_kg.id == test_instance.id
    assert stored_test_instance.space is not None
    test_instance_kg.save(kg_client, recursive=True, space=stored_test_instance.space)
    return ValidationTestInstance.from_kg_object(test_instance_kg, kg_client)


@router.delete("/tests/query/instances/{test_instance_id}", status_code=status.HTTP_200_OK)
async def delete_test_instance_by_id(
    test_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    # todo: handle non-existent UUID, inconsistent test_id and test_instance_id
    kg_client = get_kg_client_for_user_account(token)
    test_instance_kg = omcmp.ValidationTestVersion.from_uuid(str(test_instance_id), kg_client, scope="in progress")
    if not await is_admin(token.credentials):
        # todo: replace this check with a group membership check for Collab v2
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Deleting test instances is restricted to admins",
        )
    test_definition = omcmp.ValidationTest.list(
        kg_client, scope="in progress",
        space=test_instance_kg.space, versions=test_instance_kg)[0]
    test_definition.versions = [obj for obj in test_definition.versions if obj.uuid != test_instance_id]
    test_definition.save(kg_client, recursive=False)
    test_instance_kg.delete(kg_client)


@router.delete("/tests/{test_id}/instances/{test_instance_id}", status_code=status.HTTP_200_OK)
async def delete_test_instance(
    test_id: str, test_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    # todo: handle non-existent UUID, inconsistent test_id and test_instance_id
    kg_client = get_kg_client_for_user_account(token)
    test_instance_kg = omcmp.ValidationTestVersion.from_uuid(str(test_instance_id), kg_client, scope="in progress")
    if not await is_admin(token.credentials):
        # todo: replace this check with a group membership check for Collab v2
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Deleting test instances is restricted to admins",
        )
    test_definition = _get_test_by_id_or_alias(test_id, kg_client)
    test_definition.versions = [obj for obj in test_definition.versions if obj.uuid != test_instance_id]
    test_definition.save(kg_client, recursive=False)
    test_instance_kg.delete(kg_client)
