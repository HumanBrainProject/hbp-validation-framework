from uuid import UUID
from typing import List
from datetime import datetime
import logging

from fairgraph.kgquery import KGQuery
from fairgraph.utility import as_list
from fairgraph.errors import AuthenticationError
import fairgraph.openminds.core as omcore
import fairgraph.openminds.computation as omcmp

from fastapi import APIRouter, Depends, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import ValidationError

from ..auth import get_kg_client_for_service_account, get_kg_client_for_user_account, User
from ..db import _get_test_by_id_or_alias, _get_test_instance_by_id
from ..db import _check_service_status
from ..data_models import (
    Person,
    Species,
    BrainRegion,
    CellType,
    RecordingModality,
    ScoreType,
    ModelScope,
    ValidationTest,
    ValidationTestSummary,
    ValidationTestInstance,
    ValidationTestPatch,
    ValidationTestInstancePatch,
    ImplementationStatus
)
from ..queries import build_validation_test_filters, test_alias_exists, expand_combinations
from .. import settings


logger = logging.getLogger("validation_service_api")

auth = HTTPBearer(auto_error=False)
router = APIRouter()


@router.get("/tests/")
def query_tests(
    project_id: List[str] = Query(
        None, description="Find validation tests belonging to a specific project/projects"
    ),
    alias: List[str] = Query(None),
    id: List[UUID] = Query(None),
    name: List[str] = Query(None),
    implementation_status: ImplementationStatus = Query(None),
    brain_region: List[BrainRegion] = Query(None),
    species: List[Species] = Query(None),
    cell_type: List[CellType] = Query(None),
    data_type: List[str] = Query(None),
    recording_modality: List[RecordingModality] = Query(None),
    test_type: List[ModelScope] = Query(None),
    score_type: List[ScoreType] = Query(None),
    author: List[str] = Query(None),
    size: int = Query(100),
    from_index: int = Query(0),
    summary: bool = Query(False, description="Return only summary information about each validation test"),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):

    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        if implementation_status:
            if implementation_status != ImplementationStatus.published.value:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=f"To view unpublished tests you need to authenticate.",
                )
        else:
            implementation_status = ImplementationStatus.published.value
        kg_user_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_user_client = get_kg_client_for_user_account(token)
        if implementation_status == ImplementationStatus.published.value:
            scope = "released"
        else:
            scope = "any"

    if id:
        # if specifying specific ids, we ignore any other search terms
        test_definitions = []
        for test_uuid in id:
            test_definition = omcmp.ValidationTest.from_uuid(test_uuid, kg_user_client, scope=scope)
            if test_definition:
                test_definitions.append(test_definition)
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Either a validation test definition with identifier {test_uuid} does not exist, or you do not have access to it.",
                )
    else:
        # get the values of of the Enums
        filters = {}
        if brain_region:
            filters["brain_region"] = [item.value for item in brain_region]
        if species:
            filters["species"] = [item.value for item in species]
        if cell_type:
            filters["cell_type"] = [item.value for item in cell_type]
        if recording_modality:
            filters["recording_modality"] = [item.value for item in recording_modality]
        if test_type:
            filters["test_type"] = [item.value for item in test_type]
        if data_type:
            filters["data_type"] = [item for item in data_type]
        if score_type:
            filters["score_type"] = [item.value for item in score_type]
        if author:
            filters["author"] = author
        if name:
            filters["name"] = name
        if alias:
            filters["alias"] = alias
        if implementation_status:
            # todo: this doesn't work, and requires checking release status,
            #       hence this filter needs to be applied to the results of the query
            filters["implementation_status"] = implementation_status
        if project_id:
            filters["space"] = [f"collab-{collab_id}" for collab_id in project_id]
        else:
            filters["space"] = ["computation"]

        filters = expand_combinations(filters)

        kg_service_client = get_kg_client_for_service_account()

        if summary:
            cls = ValidationTestSummary
            query_label = "VF_ValidationTestSummary"
        else:
            cls = ValidationTest
            query_label = "VF_ValidationTest"
        query = kg_service_client.retrieve_query(query_label)

        if query is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Query '{query_label}' could not be retrieved",
            )

        if len(filters) == 1:
            # common, simple case
            instances = kg_user_client.query(query, filters[0],
                                             from_index=from_index, size=size,
                                             scope=scope, id_key="uri", use_stored_query=True
                                             ).data

            return [
                cls.from_kg_query(instance, kg_user_client, kg_service_client)
                for instance in instances
            ]

        else:
            # more complex case for pagination
            # inefficient if from_index is not 0
            instances = {}
            for filter in filters:
                results = kg_user_client.query(query, filter,
                                               from_index=0, size=100000,
                                               scope=scope, id_key="uri", use_stored_query=True)
                for instance in results.data:
                    instances[instance["uri"]] = instance  # use dict to remove duplicates

            return [
                cls.from_kg_query(instance, kg_user_client, kg_service_client)
                for instance in list(instances.values())[from_index:from_index + size]
            ]


@router.get("/tests/{test_id}", response_model=ValidationTest)
def get_test(test_id: str, token: HTTPAuthorizationCredentials = Depends(auth)):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_client = get_kg_client_for_user_account(token)
        scope = "any"
    try:
        test_definition = _get_test_by_id_or_alias(test_id, kg_client, scope)
    except Exception as err:
        if "401" in str(err):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Unauthorized. If you think you should be able to access this test, perhaps your token has expired."
            )
        else:
            # todo: extract error code from exception
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid test_id: '{test_id}'"
            )

    return ValidationTest.from_kg_object(test_definition, kg_client)


@router.post("/tests/", response_model=ValidationTest, status_code=status.HTTP_201_CREATED)
async def create_test(test: ValidationTest, token: HTTPAuthorizationCredentials = Depends(auth)):
    _check_service_status()
    user = User(token, allow_anonymous=False)

    # check permissions
    if test.project_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"project_id must be provided"
        )
    if not (
        await user.can_edit_collab(test.project_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{test.project_id}",
        )

    kg_user_client = get_kg_client_for_user_account(token)
    kg_service_client = get_kg_client_for_service_account()

    # check uniqueness of alias, using service client to check in progress models in public spaces,
    # and user client to check in collab spaces
    if test.alias and (
        test_alias_exists(test.alias, kg_service_client) or test_alias_exists(test.alias, kg_user_client)
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another validation test with alias '{test.alias}' already exists.",
        )
    test_definition = test.to_kg_object(kg_user_client)
    kg_space = f"collab-{test.project_id}"

    # use both service client (for checking curated spaces) and user client (for checking private spaces)
    if test_definition.exists(kg_service_client) or test_definition.exists(kg_user_client):
        # see https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
        # for a discussion of the most appropriate status code to use here
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another validation test with the same name and timestamp already exists.",
        )

    # check if kg space already exists, if not create and configure it
    spaces = kg_user_client.spaces(permissions=["write"], names_only=True)
    if kg_space not in spaces:
        types = [omcore.Model, omcore.ModelVersion, omcore.FileRepository, omcore.File,
                 omcore.Person, omcore.Organization, omcmp.ValidationTest,
                 omcmp.ValidationTestVersion, omcmp.ModelValidation, omcore.PropertyValueList]
        try:
            space_name = kg_user_client.configure_space(kg_space, types)
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"You do not have permission to save models in the KG space for collab '{test.project_id}'. Try one of: {spaces}"
            )
        assert space_name == kg_space

    try:
        test_definition.save(kg_user_client, recursive=True, space=kg_space, ignore_duplicates=True)
    except AuthenticationError as err:
        user_info = await user.get_user_info()
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User {user_info['username']} cannot access space {kg_space}. Error message: {err}"
        )
    return ValidationTest.from_kg_object(test_definition, kg_user_client)


@router.put("/tests/{test_id}", response_model=ValidationTest, status_code=status.HTTP_200_OK)
def update_test(
    test_id: UUID,
    test_patch: ValidationTestPatch,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    _check_service_status()
    user = User(token, allow_anonymous=False)
    # retrieve stored test
    kg_user_client = get_kg_client_for_user_account(token)
    kg_service_client = get_kg_client_for_service_account()
    test_definition = omcmp.ValidationTest.from_uuid(str(test_id), kg_user_client, scope="any")
    stored_test = ValidationTest.from_kg_object(test_definition, kg_user_client)
    # if alias changed, check uniqueness of new alias.
    # we need to use the service client to check tests in "computation"
    # and the user client to check private spaces
    if (
        test_patch.alias
        and test_patch.alias != stored_test.alias
        and (test_alias_exists(test_patch.alias, kg_service_client)
             or test_alias_exists(test_patch.alias, kg_user_client))
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
    updated_test_definition = updated_test.to_kg_object(kg_user_client)
    updated_test_definition.save(kg_user_client, recursive=True, space=test_definition.space)
    return ValidationTest.from_kg_object(updated_test_definition, kg_user_client)


@router.delete("/tests/{test_id}", status_code=status.HTTP_200_OK)
async def delete_test(test_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    _check_service_status()
    user = User(token, allow_anonymous=False)
    # todo: handle non-existent UUID
    kg_client = get_kg_client_for_user_account(token)
    test_definition = omcmp.ValidationTest.from_uuid(str(test_id), kg_client, scope="in progress")
    test_definition.delete(kg_client)
    for test_version in as_list(test_definition.has_versions):
        # todo: we should possibly also delete repositories,
        # but need to check they're not shared with other instances
        test_version.delete(kg_client)


@router.get("/tests/{test_id}/instances/", response_model=List[ValidationTestInstance])
def get_test_instances(
    test_id: str, version: str = Query(None), token: HTTPAuthorizationCredentials = Depends(auth)
):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_client = get_kg_client_for_user_account(token)
        scope = "any"
    test_definition = _get_test_by_id_or_alias(test_id, kg_client, scope)
    test_instances = [
        ValidationTestInstance.from_kg_object(inst, test_definition.uuid, kg_client)
        for inst in as_list(test_definition.has_versions)
    ]
    if version:
        test_instances = [inst for inst in test_instances if inst.version == version]
    return test_instances


@router.get("/tests/query/instances/{test_instance_id}", response_model=ValidationTestInstance)
def get_test_instance_from_instance_id(
    test_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_client = get_kg_client_for_user_account(token)
        scope = "any"
    inst = _get_test_instance_by_id(test_instance_id, kg_client, scope)
    test_definition = omcmp.ValidationTest.list(kg_client, scope=scope, space=inst.space, has_versions=inst)[0]
    return ValidationTestInstance.from_kg_object(inst, test_definition.uuid, kg_client)


@router.get("/tests/{test_id}/instances/latest", response_model=ValidationTestInstance)
def get_latest_test_instance_given_test_id(
    test_id: str, token: HTTPAuthorizationCredentials = Depends(auth)
):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_client = get_kg_client_for_user_account(token)
        scope = "any"
    test_definition = _get_test_by_id_or_alias(test_id, kg_client, scope)
    test_instances = [
        ValidationTestInstance.from_kg_object(inst.resolve(kg_client, scope="in progress"), test_definition.uuid, kg_client)
        for inst in as_list(test_definition.has_versions)
    ]
    if len(test_instances) == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Test definition {test_id} has no code associated with it",
        )
    missing_timestamp = datetime(1, 1, 1)
    latest = sorted(test_instances, key=lambda inst: inst.timestamp or missing_timestamp)[-1]
    return latest


@router.get("/tests/{test_id}/instances/{test_instance_id}", response_model=ValidationTestInstance)
def get_test_instance_given_test_id(
    test_id: str, test_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_client = get_kg_client_for_user_account(token)
        scope = "any"
    test_definition = _get_test_by_id_or_alias(test_id, kg_client, scope)
    for inst in as_list(test_definition.has_versions):
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
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_client = get_kg_client_for_user_account(token)
        scope = "any"

    test_instance_kg = _get_test_instance_by_id(test_instance_id, kg_client, scope)
    # todo: if anonymous, get parent ValidationTestDefinition and check access level
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
    _check_service_status()
    user = User(token, allow_anonymous=False)
    kg_client = get_kg_client_for_user_account(token)
    test_definition = _get_test_by_id_or_alias(test_id, kg_client, scope="any")
    existing_versions = [obj.resolve(kg_client, scope="any") for obj in as_list(test_definition.has_versions)]
    if test_instance.version in (obj.version_identifier for obj in existing_versions):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Validation test {test_id} already has a version '{test_instance.version}"
        )
    test_instance_kg = test_instance.to_kg_object(ValidationTest.from_kg_object(test_definition, kg_client))
    test_instance_kg.save(kg_client, recursive=True, space=test_definition.space)
    test_definition.has_versions = as_list(test_definition.has_versions) + [test_instance_kg]
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
    _check_service_status()
    user = User(token, allow_anonymous=False)
    kg_client = get_kg_client_for_user_account(token)
    test_instance_kg = _get_test_instance_by_id(test_instance_id, kg_client, scope="any")
    test_definition_kg = omcmp.ValidationTest.list(
        kg_client, scope="any",
        space=test_instance_kg.space, has_versions=test_instance_kg)[0]
    test_definition = ValidationTest.from_kg_object(test_definition_kg, kg_client)
    return _update_test_instance(test_instance_kg, test_definition, test_instance_patch, kg_client)


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
    _check_service_status()
    user = User(token, allow_anonymous=False)
    kg_client = get_kg_client_for_user_account(token)
    test_instance_kg = _get_test_instance_by_id(test_instance_id, kg_client, scope="any")
    test_definition_kg = _get_test_by_id_or_alias(test_id, kg_client, scope="any")
    test_definition = ValidationTest.from_kg_object(test_definition_kg, kg_client)
    return _update_test_instance(test_instance_kg, test_definition, test_instance_patch, kg_client)


def _update_test_instance(test_instance, test_definition, test_instance_patch, kg_client):
    stored_test_instance = ValidationTestInstance.from_kg_object(test_instance, test_definition.id, kg_client)
    update_data = test_instance_patch.dict(exclude_unset=True)
    updated_test_instance = stored_test_instance.copy(update=update_data)
    test_instance_kg = updated_test_instance.to_kg_object(test_definition)
    assert test_instance_kg.id == test_instance.id
    assert test_instance.space is not None
    test_instance_kg.save(kg_client, recursive=True, space=test_instance.space)
    return ValidationTestInstance.from_kg_object(test_instance_kg, test_definition.id, kg_client)


@router.delete("/tests/query/instances/{test_instance_id}", status_code=status.HTTP_200_OK)
async def delete_test_instance_by_id(
    test_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    _check_service_status()
    # todo: handle non-existent UUID, inconsistent test_id and test_instance_id
    user = User(token, allow_anonymous=False)
    kg_client = get_kg_client_for_user_account(token)
    test_instance_kg = omcmp.ValidationTestVersion.from_uuid(str(test_instance_id), kg_client, scope="in progress")
    if not await user.is_admin():
        # todo: replace this check with a group membership check for Collab v2
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Deleting test instances is restricted to admins",
        )
    test_definition = omcmp.ValidationTest.list(
        kg_client, scope="in progress",
        space=test_instance_kg.space, has_versions=test_instance_kg)[0]
    test_definition.has_versions = [obj for obj in as_list(test_definition.has_versions) if obj.uuid != test_instance_id]
    test_definition.save(kg_client, recursive=False)
    test_instance_kg.delete(kg_client)


@router.delete("/tests/{test_id}/instances/{test_instance_id}", status_code=status.HTTP_200_OK)
async def delete_test_instance(
    test_id: str, test_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    _check_service_status()
    # todo: handle non-existent UUID, inconsistent test_id and test_instance_id
    user = User(token, allow_anonymous=False)
    kg_client = get_kg_client_for_user_account(token)
    test_instance_kg = omcmp.ValidationTestVersion.from_uuid(str(test_instance_id), kg_client, scope="in progress")
    if not await user.is_admin():
        # todo: replace this check with a group membership check for Collab v2
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Deleting test instances is restricted to admins",
        )
    test_definition = _get_test_by_id_or_alias(test_id, kg_client, scope="any")
    test_definition.has_versions = [obj for obj in test_definition.has_versions if obj.uuid != test_instance_id]
    test_definition.save(kg_client, recursive=False)
    test_instance_kg.delete(kg_client)
