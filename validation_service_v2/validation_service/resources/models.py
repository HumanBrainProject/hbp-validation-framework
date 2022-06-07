from uuid import UUID
from typing import List
import logging

from fairgraph.base_v3 import as_list
import fairgraph.openminds.core as omcore

from fastapi import APIRouter, Depends, Query, Path, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from ..auth import is_collab_member, is_admin, get_kg_client_for_user_account, get_kg_client_for_service_account
from ..db import _get_model_instance_by_id, _get_model_by_id_or_alias
from ..data_models import (
    Person,
    Species,
    BrainRegion,
    CellType,
    ModelScope,
    AbstractionLevel,
    ScientificModel,
    ScientificModelSummary,
    ScientificModelPatch,
    ModelInstance,
    ModelInstancePatch,
)
from ..queries import build_model_project_filters, model_alias_exists


logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()
router = APIRouter()


@router.get("/")
def about_this_api():
    return {
        "about": "This is the EBRAINS Model Validation API",
        "links": {
            "documentation": "/docs"
        }
    }


@router.get("/models/", response_model=List[ScientificModel])
async def query_models(
    alias: List[str] = Query(
        None, description="A list of model aliases (short names) to search for"
    ),
    id: List[UUID] = Query(None, description="A list of specific model IDs to search for"),
    name: List[str] = Query(None, description="Model name(s) to search for"),
    brain_region: List[BrainRegion] = Query(
        None, description="Find models intended to represent this/these brain region(s)"
    ),
    species: List[Species] = Query(
        None, description="Find models intended to represent this/these species"
    ),
    cell_type: List[CellType] = Query(None, description="Find models of this/these cell type(s)"),
    model_scope: ModelScope = Query(None, description="Find models with a certain scope"),
    abstraction_level: AbstractionLevel = Query(
        None, description="Find models with a certain abstraction level"
    ),
    author: List[str] = Query(None, description="Find models by author (family name)"),
    owner: List[str] = Query(None, description="Find models by owner (family name)"),
    organization: List[str] = Query(None, description="Find models by organization"),
    project_id: List[str] = Query(
        None, description="Find models belonging to a specific project/projects"
    ),
    private: bool = Query(None, description="Limit the search to public or private models"),
    summary: bool = Query(False, description="Return only summary information about each model"),
    size: int = Query(100, description="Maximum number of responses"),
    from_index: int = Query(0, description="Index of the first response returned"),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    """
    Search the model catalog for specific models (identitified by their unique ID or by a short name / alias),
    and/or search by attributes of the models (e.g. the cell types being modelled, the type of model, the model author).
    """

    # If project_id is provided:
    #     - private = None: both public and private models from that project (collab), if the user is a member
    #     - private = True: only private models from that project, if that user is a member
    #     - private = False: only public models from that project
    # If project_id is not provided:
    #     - private = None: only public models, from all projects
    #     - private = True: 400? error "To see private models, you must specify the project/collab"
    #     - private = False: only public models, from all projects

    if private:
        if project_id:
            for collab_id in project_id:
                if not await is_collab_member(collab_id, token.credentials):
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail="You are not a member of project #{collab_id}",
                    )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="To see private models, you must specify the project/collab id",
            )

    # get the values of of the Enums
    if brain_region:
        brain_region = [item.value for item in brain_region]
    if species:
        species = [item.value for item in species]
    if cell_type:
        cell_type = [item.value for item in cell_type]
    if model_scope:
        model_scope = model_scope.value
    if abstraction_level:
        abstraction_level = abstraction_level.value

    filter_query = build_model_project_filters(
        alias,
        id,
        name,
        brain_region,
        species,
        cell_type,
        model_scope,
        abstraction_level,
        author,
        owner,
        organization
    )

    if project_id:
        spaces = [f"collab-{collab_id}" for collab in project_id]
    else:
        spaces = ["model"]
    kg_client = get_kg_client_for_user_account(token.credentials)

    model_projects = []
    for space in spaces:
        if len(filter_query) > 0:
            logger.info("Searching for ModelProject with the following query: {}".format(filter_query))
            # note that from_index is not currently supported by KGQuery.resolve
            results = omcore.Model.list(
                kg_client, size=size, from_index=from_index, api="query", scope="in progress",
                space=space, **filter_query)
        else:
            results = omcore.Model.list(
                kg_client, size=size, from_index=from_index, api="core", scope="in progress")
        model_projects.extend(as_list(results))
    if summary:
        cls = ScientificModelSummary
    else:
        cls = ScientificModel
    return [
        cls.from_kg_object(model_project, kg_client)
        for model_project in as_list(model_projects)
    ]


@router.get("/models/{model_id}", response_model=ScientificModel)
async def get_model(
    model_id: str = Path(..., title="Model ID", description="ID of the model to be retrieved"),
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    """Retrieve information about a specific model identified by a UUID"""
    kg_client = get_kg_client_for_user_account(token.credentials)
    model_project = _get_model_by_id_or_alias(model_id, kg_client)
    if not model_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Model with ID '{model_id}' not found."
        )
    return ScientificModel.from_kg_object(model_project, kg_client)


@router.post("/models/", response_model=ScientificModel, status_code=status.HTTP_201_CREATED)
async def create_model(
    model: ScientificModel, token: HTTPAuthorizationCredentials = Depends(auth)
):
    # check permissions
    if model.project_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"project_id must be provided"
        )
    if not (
        await is_collab_member(model.project_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{model.project_id}",
        )

    kg_user_client = get_kg_client_for_user_account(token.credentials)
    kg_service_client = get_kg_client_for_service_account()
    # check uniqueness of alias, using service client we can check against aliases of all models
    if model.alias and model_alias_exists(model.alias, kg_service_client):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another model with alias '{model.alias}' already exists.",
        )
    model_project = model.to_kg_object()
    kg_space = f"collab-{model.project_id}"
    #if model.description == "RAISE EXCEPTION":
    #    raise Exception()
    if model_project.exists(kg_user_client) or model_project.exists(kg_user_client, space=kg_space):
        # see https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
        # for a discussion of the most appropriate status code to use here
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another model with the same name already exists.",
        )
    model_project.save(kg_user_client, space=kg_space, recursive=True)
    model_project.scope = "in progress"
    return ScientificModel.from_kg_object(model_project, kg_user_client)


@router.put("/models/{model_id}", response_model=ScientificModel, status_code=status.HTTP_200_OK)
async def update_model(
    model_id: UUID,
    model_patch: ScientificModelPatch,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    # if payload contains a project_id, check permissions for that id
    if model_patch.project_id and not (
        await is_collab_member(model_patch.project_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{model_patch.project_id}",
        )

    kg_user_client = get_kg_client_for_user_account(token.credentials)
    kg_service_client = get_kg_client_for_service_account()

    # retrieve stored model
    model_project = omcore.Model.from_uuid(str(model_id), kg_user_client, scope="in progress")
    stored_model = ScientificModel.from_kg_object(model_project, kg_user_client)
    # if retrieved project_id is different to payload id, check permissions for that id
    if stored_model.project_id != model_patch.project_id and not (
        await is_collab_member(stored_model.project_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access to this model is restricted to members of Collab #{stored_model.project_id}",
        )
    # if alias changed, check uniqueness of new alias
    if (
        model_patch.alias
        and model_patch.alias != stored_model.alias
        and model_alias_exists(model_patch.alias, kg_service_client)
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another model with alias '{model_patch.alias}' already exists.",
        )
    # todo: if model id provided in payload, check it matches the model_id parameter
    # todo: if model uri provided in payload, check it matches the id

    # here we are updating the pydantic model `stored_model`, then recreating the kg objects
    # from this. It might be more efficient to directly update `model_project`.
    # todo: profile both possible implementations
    update_data = model_patch.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field in ("author", "owner"):
            update_data[field] = [Person(**p) for p in update_data[field]]
    updated_model = stored_model.copy(update=update_data)
    updated_model_project = updated_model.to_kg_object()
    updated_model_project.save(kg_user_client, space=model_project.space, recursive=True)
    updated_model_project.scope = "in progress"
    return ScientificModel.from_kg_object(updated_model_project, kg_user_client)


@router.delete("/models/{model_id}", status_code=status.HTTP_200_OK)
async def delete_model(model_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    # todo: handle non-existent UUID
    kg_client = get_kg_client_for_user_account(token.credentials)
    model_project = omcore.Model.from_uuid(str(model_id), kg_client, scope="in progress")
    collab_id = model_project.space[len("collab-"):]
    if not (
        await is_collab_member(collab_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access to this model is restricted to members of Collab #{collab_id}",
        )
    model_project.delete(kg_client)
    for model_instance in as_list(model_project.versions):
        # todo: we should possibly also delete repositories,
        # but need to check they're not shared with other instances
        model_instance.delete(kg_client)


@router.get("/models/{model_id}/instances/", response_model=List[ModelInstance])
async def get_model_instances(
    model_id: str, version: str = None, token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_client = get_kg_client_for_user_account(token.credentials)
    model_project = _get_model_by_id_or_alias(model_id, kg_client)
    model_instances = [
        ModelInstance.from_kg_object(inst, kg_client, model_project.uuid)
        for inst in as_list(model_project.versions)
    ]
    if version is not None:
        model_instances = [inst for inst in model_instances if inst.version == version]
    return model_instances


@router.get("/models/query/instances/{model_instance_id}", response_model=ModelInstance)
async def get_model_instance_from_instance_id(
    model_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_client = get_kg_client_for_user_account(token.credentials)
    inst, model_id = _get_model_instance_by_id(model_instance_id, kg_client)
    return ModelInstance.from_kg_object(inst, kg_client, model_id)


@router.get("/models/{model_id}/instances/in progress", response_model=ModelInstance)
async def get_latest_model_instance_given_model_id(
    model_id: str, token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_client = get_kg_client_for_user_account(token.credentials)
    model_project = _get_model_by_id_or_alias(model_id, kg_client)
    model_instances = [
        ModelInstance.from_kg_object(inst, kg_client, model_project.uuid)
        for inst in as_list(model_project.versions)
    ]
    latest = sorted(model_instances, key=lambda inst: inst["timestamp"])[-1]
    return latest


@router.get("/models/{model_id}/instances/{model_instance_id}", response_model=ModelInstance)
async def get_model_instance_given_model_id(
    model_id: str, model_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_client = get_kg_client_for_user_account(token.credentials)
    model_project = _get_model_by_id_or_alias(model_id, kg_client)
    for inst in as_list(model_project.versions):
        if UUID(inst.uuid) == model_instance_id:
            return ModelInstance.from_kg_object(inst, kg_client, model_project.uuid)
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Model ID/alias and model instance ID are inconsistent",
    )


@router.post(
    "/models/{model_id}/instances/",
    response_model=ModelInstance,
    status_code=status.HTTP_201_CREATED,
)
async def create_model_instance(
    model_id: str,
    model_instance: ModelInstance,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    kg_user_client = get_kg_client_for_user_account(token.credentials)
    model_project = _get_model_by_id_or_alias(model_id, kg_user_client)
    # check permissions for this model
    if model_project.space is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Unable to determine access permissions - please contact EBRAINS support"
        )
    collab_id = model_project.space[len("collab-"):]
    if not (
        await is_collab_member(collab_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{model_project.project_id}",
        )
    model_instance_kg = model_instance.to_kg_object(model_project)
    # check if an identical model instance already exists, raise an error if so
    if model_instance_kg.exists(kg_user_client, space=model_project.space):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another model instance with the same name already exists.",
        )
    # otherwise save to KG
    model_instance_kg.save(kg_user_client, space=model_project.space, recursive=True)
    model_project.versions = as_list(model_project.versions) + [model_instance_kg]
    model_project.save(kg_user_client, recursive=False)
    return ModelInstance.from_kg_object(model_instance_kg, kg_user_client, model_project.uuid)


@router.put("/models/query/instances/{model_instance_id}", response_model=ModelInstance)
async def update_model_instance_by_id(
    model_instance_id: str,
    model_instance_patch: ModelInstancePatch,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    kg_user_client = get_kg_client_for_user_account(token.credentials)
    model_instance_kg, model_id = _get_model_instance_by_id(model_instance_id, kg_user_client)
    model_project = _get_model_by_id_or_alias(model_id, kg_user_client)
    return await _update_model_instance(
        model_instance_kg, model_project, model_instance_patch, token
    )


@router.put(
    "/models/{model_id}/instances/{model_instance_id}",
    response_model=ModelInstance,
    status_code=status.HTTP_200_OK,
)
async def update_model_instance(
    model_id: str,
    model_instance_id: str,
    model_instance_patch: ModelInstancePatch,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    kg_user_client = get_kg_client_for_user_account(token.credentials)
    model_instance_kg, retrieved_model_id = _get_model_instance_by_id(model_instance_id, kg_user_client)
    assert model_id == retrieved_model_id
    model_project = _get_model_by_id_or_alias(model_id, kg_user_client)
    return await _update_model_instance(
        model_instance_kg, model_project, model_instance_patch, token
    )


async def _update_model_instance(model_instance_kg, model_project, model_instance_patch, token):
    # check permissions for this model
    if model_project.space is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Unable to determine access permissions - please contact EBRAINS support"
        )
    collab_id = model_project.space[len("collab-"):]
    if not (
        await is_collab_member(collab_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{model_project.project_id}",
        )

    kg_user_client = get_kg_client_for_user_account(token.credentials)
    stored_model_instance = ModelInstance.from_kg_object(
        model_instance_kg, kg_user_client, model_project.uuid
    )
    update_data = model_instance_patch.dict(exclude_unset=True)
    updated_model_instance = stored_model_instance.copy(update=update_data)
    model_instance_kg = updated_model_instance.to_kg_object(model_project)
    model_instance_kg.save(kg_user_client, space=model_project.space, recursive=True)
    return ModelInstance.from_kg_object(model_instance_kg, kg_user_client, model_project.uuid)


@router.delete("/models/query/instances/{model_instance_id}", status_code=status.HTTP_200_OK)
async def delete_model_instance_by_id(
    model_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    kg_user_client = get_kg_client_for_user_account(token.credentials)
    model_instance_kg, model_id = _get_model_instance_by_id(model_instance_id, kg_user_client)
    model_project = _get_model_by_id_or_alias(model_id, kg_user_client)
    collab_id = model_project.space[len("collab-"):]
    if not (
        await is_collab_member(collab_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access to this model is restricted to members of Collab #{model_project.collab_id}",
        )
    await _delete_model_instance(model_instance_id, model_project, kg_user_client)


@router.delete("/models/{model_id}/instances/{model_instance_id}", status_code=status.HTTP_200_OK)
async def delete_model_instance(
    model_id: UUID, model_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    # todo: handle non-existent UUID
    kg_user_client = get_kg_client_for_user_account(token.credentials)
    model_instance_kg, model_id = _get_model_instance_by_id(model_instance_id, kg_user_client)
    model_project = _get_model_by_id_or_alias(model_id, kg_user_client)
    collab_id = model_project.space[len("collab-"):]
    if not (
        await is_collab_member(collab_id, token.credentials)
        or await is_admin(token.credentials)
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access to this model is restricted to members of Collab #{model_project.collab_id}",
        )
    await _delete_model_instance(model_instance_id, model_project, kg_user_client)


async def _delete_model_instance(model_instance_id, model_project, kg_user_client):
    model_instances = as_list(model_project.versions)
    n_start = len(model_instances)
    for model_instance in model_instances[:]:
        # todo: we should possibly also delete child objects (repository, etc.),
        # but need to check they're not shared with other instances
        if model_instance.uuid == str(model_instance_id):
            model_instance.delete(kg_user_client, ignore_not_found=False)
            model_instances.remove(model_instance)
            break
    if n_start > 0:
        assert len(model_instances) == n_start - 1
    model_project.versions = model_instances
    model_project.save(kg_user_client, recursive=False)
