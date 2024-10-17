from uuid import UUID
from typing import List, Union
import logging

from fairgraph.utility import as_list
import fairgraph.openminds.core as omcore
import fairgraph.openminds.computation as omcmp
from fairgraph.errors import ResolutionFailure, AuthorizationError, ResourceExistsError

from fastapi import APIRouter, Depends, Query, Path, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from ..auth import User, get_kg_client_for_user_account, get_kg_client_for_service_account
from ..db import _get_model_instance_by_id, _get_model_by_id_or_alias, _check_service_status
from .. import settings
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
    project_id_from_space,
    space_from_project_id,
    special_spaces
)
from ..queries import build_model_project_filters, model_alias_exists, expand_combinations


logger = logging.getLogger("validation_service_api")

auth = HTTPBearer(auto_error=False)
router = APIRouter()


@router.get("/")
async def api_status(token: HTTPAuthorizationCredentials = Depends(auth)):
    service_status = getattr(settings, "SERVICE_STATUS", "ok")
    info = {
        "about": "This is the EBRAINS Model Validation API",
        "version": "3beta",
        "status": service_status,
        "datastore": settings.KG_CORE_API_HOST,
        "build": settings.BUILD_INFO,
        "links": {
            "documentation": "/docs"
        }
    }
    if token:
        user_info = await User(token).get_user_info()
        info["user"] = user_info["preferred_username"]
    service_status = getattr(settings, "SERVICE_STATUS", "ok")
    return info


@router.get("/about")
async def about_this_api():
    service_metadata = {
        "@context": "https://servicemeta.apps.tc.humanbrainproject.eu/context/servicemeta.jsonld",
        "type": "WebApplication",
        "name": "Model Validation Service API",
        "alternateName": "model-validation-api",
        "author": [
            {
                "id": "https://orcid.org/0000-0002-4793-7541",
                "type": "Person",
                "familyName": "Davison",
                "givenName": "Andrew P.",
            },
            {"type": "Person", "familyName": "Appukuttan", "givenName": "Shailesh"},
        ],
        "copyrightYear": "2022",
        "dateModified": "2023-10-01",
        "documentation": "https://model-validation-api.apps.ebrains.eu/docs",
        "funding": [{
            "awardNumber": "945539",
            "awardName": "Human Brain Project Specific Grant Agreement 3 (HBP SGA3)",
            "acknowledgement": "This project/research has received funding from the European Union’s Horizon 2020 Framework Programme for Research and Innovation under the Specific Grant Agreement No. 945539 (Human Brain Project SGA3)."
        }],
        "inputFormat": ["json"],
        "outputFormat": ["json"],
        "releaseNotes": "Uses KG v3 and openMINDS schemas",
        "url": "https://model-validation-api.apps.ebrains.eu/",
        "version": "v3beta",
    }
    return service_metadata


@router.get("/models/", response_model=List[Union[ScientificModel, ScientificModelSummary]])
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
    format: str = Query(None, description="Model format expressed as a content type"),
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

    If specifying specific ids, all other search terms except "private" are ignored.

    If project_id is provided, we only return models from that project (collab).

    If private is:

      - None: both public (released) and private models
      - True: only private models
      - False: only public models

    In all cases, for private models the user must be a member of the collab the model is associated with.
    """

    user = User(token, allow_anonymous=True)

    if user.is_anonymous:
        if private:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Anonymous users may not view private models",
            )
        scope = "released"
        kg_user_client = get_kg_client_for_service_account()
    else:
        scope = "any"
        if private is False:
            scope = "released"
        if private is True:
            scope = "in progress"  # or do we need a "never released" scope?

        if private:
            if project_id:
                for collab_id in project_id:
                    if not await user.can_view_collab(collab_id):
                        raise HTTPException(
                            status_code=status.HTTP_403_FORBIDDEN,
                            detail="You are not a member of project #{collab_id}",
                        )
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="To see private models, you must specify the project/collab id",
                )

        kg_user_client = get_kg_client_for_user_account(token)

    if id:
        # if specifying specific ids, we ignore any other search terms
        models = []
        for model_uuid in id:
            model = omcore.Model.from_uuid(str(model_uuid), kg_user_client, scope=scope)
            if model:
                models.append(model)
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Either a model with identifier {model_uuid} does not exist, or you do not have access to it.",
                )
    else:

        # get the values of the Enums
        filters = {}
        if brain_region:
            filters["brain_region"] = [item.value for item in brain_region]
        if species:
            filters["species"] = [item.value for item in species]
        if cell_type:
            filters["cell_type"] = [item.value for item in cell_type]
        if model_scope:
            filters["model_scope"] = model_scope.value
        if abstraction_level:
            filters["abstraction_level"] = abstraction_level.value
        if author:
            filters["author"] = author
        if owner:
            filters["owner"] = owner
        if organization:
            filters["organization"] = organization
        if name:
            filters["name"] = name
        if alias:
            filters["alias"] = alias
        if format:
            filters["format"] = format
        if project_id:
            filters["space"] = [f"collab-{collab_id}" for collab_id in project_id]
        else:
            filters["space"] = ["model"]

        filters = expand_combinations(filters)

        kg_service_client = get_kg_client_for_service_account()

        if summary:
            cls = ScientificModelSummary
            query_label = "VF_ScientificModelSummary"
        else:
            cls = ScientificModel
            query_label = "VF_ScientificModel"

        query = kg_service_client.retrieve_query(query_label)

        if query is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Query '{query_label}' could not be retrieved",
            )

        if len(filters) == 1:
            # common, simple case
            try:
                instances = kg_user_client.query(query, filters[0],
                                                 from_index=from_index, size=size,
                                                 scope=scope, id_key="uri",
                                                 use_stored_query=True).data
            except Exception as err:
                if "401" in str(err):
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail=f"Unauthorized for project_id {project_id}. "
                               "If you think you should be able to access this project_id, perhaps your token has expired."
                    )
                else:
                    raise

            return [
                cls.from_kg_query(instance, kg_user_client)
                for instance in instances
            ]

        else:
            # more complex case for pagination
            # inefficient if from_index is not 0
            instances = {}
            for filter in filters:
                results = kg_user_client.query(query, filter,
                                               from_index=0, size=100000,
                                               scope=scope, id_key="uri",
                                               use_stored_query=True)
                for instance in results.data:
                    instances[instance["uri"]] = instance  # use dict to remove duplicates

            return [
                cls.from_kg_query(instance, kg_user_client)
                for instance in list(instances.values())[from_index:from_index + size]
            ]


@router.get("/models/{model_id}", response_model=ScientificModel)
async def get_model(
    model_id: str = Path(..., title="Model ID", description="ID of the model to be retrieved"),
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    """Retrieve information about a specific model identified by a UUID"""
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_user_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_user_client = get_kg_client_for_user_account(token)
        scope = "any"

    kg_service_client = get_kg_client_for_service_account()

    query = kg_service_client.retrieve_query("VF_ScientificModel")
    if query is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Query 'VF_ScientificModel' could not be retrieved",
        )
    try:
        UUID(model_id)
    except ValueError:
        filter = {
            "alias": model_id
        }
        instance_id = None
    else:
        # model_id is a UUID
        filter = None
        instance_id = model_id

    if filter:
        try:
            results = kg_user_client.query(query, filter, instance_id=instance_id,
                                           size=1, scope=scope, id_key="uri",
                                           use_stored_query=True)
        except Exception as err:
            # todo: extract status code from err
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{err} filter='{filter}' query_id='{query['@id']}' instance_id='{instance_id}', scope='{scope}'"
            )

        if results.total == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Model with ID '{model_id}' not found."
            )
        return ScientificModel.from_kg_query(results.data[0], kg_user_client)

    else:
        obj = omcore.Model.from_id(instance_id, kg_user_client, scope=scope)
        if obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Model with ID '{instance_id}' not found."
            )
        return ScientificModel.from_kg_object(obj, kg_user_client)


@router.post("/models/", response_model=ScientificModel, status_code=status.HTTP_201_CREATED)
async def create_model(
    model: ScientificModel, token: HTTPAuthorizationCredentials = Depends(auth)
):
    _check_service_status()
    user = User(token, allow_anonymous=False)

    # check permissions
    if model.project_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"project_id must be provided"
        )
    if not (
        await user.can_edit_collab(model.project_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{model.project_id}",
        )

    kg_user_client = get_kg_client_for_user_account(token)
    kg_service_client = get_kg_client_for_service_account()
    # check uniqueness of alias, using service client to check in progress models in public spaces,
    # and user client to check in collab spaces
    if model.alias and (
        model_alias_exists(model.alias, kg_service_client) or model_alias_exists(model.alias, kg_user_client)
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another model with alias '{model.alias}' already exists.",
        )
    model_project = model.to_kg_object(kg_user_client)
    kg_space = f"collab-{model.project_id}"
    # use both service client (for checking curated spaces) and user client (for checking private spaces)
    if model_project.exists(kg_service_client) or model_project.exists(kg_user_client):
        # see https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
        # for a discussion of the most appropriate status code to use here
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another model with the same name already exists.",
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
                detail=f"You do not have permission to save models in the KG space for collab '{model.project_id}'. Try one of: {spaces}"
            )
        assert space_name == kg_space

    # todo: we might want to save the tree explicitly rather than recursively,
    #       to have more control over when we ignore duplicates
    model_project.save(kg_user_client, space=kg_space, recursive=True, ignore_duplicates=True)
    model_project.scope = "in progress"
    return ScientificModel.from_kg_object(model_project, kg_user_client)


@router.put("/models/{model_id}", response_model=ScientificModel, status_code=status.HTTP_200_OK)
async def update_model(
    model_id: UUID,
    model_patch: ScientificModelPatch,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    _check_service_status()
    user = User(token, allow_anonymous=False)

    # if payload contains a project_id, check permissions for that id
    if model_patch.project_id and not (
        await user.can_edit_collab(model_patch.project_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{model_patch.project_id}",
        )

    kg_user_client = get_kg_client_for_user_account(token)
    kg_service_client = get_kg_client_for_service_account()

    # retrieve stored model
    model_project = omcore.Model.from_uuid(str(model_id), kg_user_client, scope="any")
    if model_project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Either a model with identifier {model_id} does not exist, or you do not have access to it.",
        )

    stored_model = ScientificModel.from_kg_object(model_project, kg_user_client)
    # if retrieved project_id is different to payload id, check permissions for that id
    if stored_model.project_id != model_patch.project_id and not (
        await user.can_edit_collab(stored_model.project_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access to this model is restricted to members of Collab #{stored_model.project_id}",
        )
    # if alias changed, check uniqueness of new alias
    #   Note: we need to check with both the service client (can check "model" space for in_progress models)
    #         and the user client (can check collab spaces it has access to)
    if (
        model_patch.alias
        and model_patch.alias != stored_model.alias
        and (model_alias_exists(model_patch.alias, kg_service_client)
             or model_alias_exists(model_patch.alias, kg_user_client))
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
    updated_model_project = updated_model.to_kg_object(kg_user_client)
    updated_model_project.save(kg_user_client, space=model_project.space, recursive=True)
    updated_model_project.scope = "in progress"
    return ScientificModel.from_kg_object(updated_model_project, kg_user_client)


@router.delete("/models/{model_id}", status_code=status.HTTP_200_OK)
async def delete_model(model_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    # todo: handle non-existent UUID
    _check_service_status()

    user = User(token, allow_anonymous=False)

    kg_client = get_kg_client_for_user_account(token)
    model_project = omcore.Model.from_uuid(str(model_id), kg_client, scope="in progress")
    if model_project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Either a model with identifier {model_id} does not exist, or you do not have access to it.",
        )

    collab_id = model_project.space[len("collab-"):]
    if not (
        await user.can_edit_collab(collab_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access to this model is restricted to members of Collab #{collab_id}",
        )
    model_project.delete(kg_client)
    for model_instance in as_list(model_project.has_versions):
        # todo: we should possibly also delete repositories,
        # but need to check they're not shared with other instances
        model_instance.delete(kg_client)


@router.get("/models/{model_id}/instances/", response_model=List[ModelInstance])
async def get_model_instances(
    model_id: str, version: str = None, token: HTTPAuthorizationCredentials = Depends(auth)
):

    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_client = get_kg_client_for_user_account(token)
        scope = "any"
    model_project = _get_model_by_id_or_alias(model_id, kg_client, scope)
    model_instances = []
    for inst in as_list(model_project.has_versions):
        try:
            model_instance = ModelInstance.from_kg_object(inst, kg_client, model_project.uuid, scope)
        except ResolutionFailure:
            pass
        else:
            model_instances.append(model_instance)

    if version is not None:
        model_instances = [inst for inst in model_instances if inst.version == version]
    return model_instances


@router.get("/models/query/instances/{model_instance_id}", response_model=ModelInstance)
async def get_model_instance_from_instance_id(
    model_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_client = get_kg_client_for_user_account(token)
        scope = "any"
    inst, model_id = _get_model_instance_by_id(model_instance_id, kg_client, scope)
    return ModelInstance.from_kg_object(inst, kg_client, model_id, scope)


@router.get("/models/{model_id}/instances/in progress", response_model=ModelInstance)
async def get_latest_model_instance_given_model_id(
    model_id: str, token: HTTPAuthorizationCredentials = Depends(auth)
):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_client = get_kg_client_for_user_account(token)
        scope = "any"
    model_project = _get_model_by_id_or_alias(model_id, kg_client, scope)
    model_instances = [
        ModelInstance.from_kg_object(inst, kg_client, model_project.uuid, scope)
        for inst in as_list(model_project.has_versions)
    ]
    latest = sorted(model_instances, key=lambda inst: inst["timestamp"])[-1]
    return latest


@router.get("/models/{model_id}/instances/{model_instance_id}", response_model=ModelInstance)
async def get_model_instance_given_model_id(
    model_id: str, model_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    user = User(token, allow_anonymous=True)
    if user.is_anonymous:
        kg_client = get_kg_client_for_service_account()
        scope = "released"
    else:
        kg_client = get_kg_client_for_user_account(token)
        scope = "any"
    model_project = _get_model_by_id_or_alias(model_id, kg_client, scope)
    for inst in as_list(model_project.has_versions):
        if UUID(inst.uuid) == model_instance_id:
            return ModelInstance.from_kg_object(inst, kg_client, model_project.uuid, scope)
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
    _check_service_status()
    user = User(token, allow_anonymous=False)
    kg_user_client = get_kg_client_for_user_account(token)
    kg_service_client = get_kg_client_for_service_account()
    model_project = _get_model_by_id_or_alias(model_id, kg_user_client, scope="any")
    # check permissions for this model
    collab_id = model_instance.project_id
    if collab_id is None:
        if model_project.space is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unable to determine access permissions - please contact EBRAINS support"
            )
        else:
            collab_id = project_id_from_space(model_project.space)
    if collab_id in special_spaces:
        if collab_id != "myspace":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Cannot create new model instances in space {collab_id}, please use a private or collab space",
            )
    elif not (
        await user.can_edit_collab(collab_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{model_project.project_id}",
        )
    model_instance_kg = model_instance.to_kg_object(model_project)
    # check if an identical model instance already exists, raise an error if so
    # use both service client (for checking curated spaces) and user client (for checking private spaces)
    if model_instance_kg.exists(kg_service_client) or model_instance_kg.exists(kg_user_client):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Another model instance with the same name already exists.",
        )
    # otherwise save to KG
    target_space = space_from_project_id(collab_id)
    model_instance_kg.save(kg_user_client, space=target_space, recursive=True)
    model_project.has_versions = as_list(model_project.has_versions) + [model_instance_kg]
    try:
        model_project.save(kg_user_client, recursive=False)
    except AuthorizationError:
        # if the model project has already been published we may not be able
        # to save with user client, so use service client
        model_project.save(kg_service_client, recursive=False)
    return ModelInstance.from_kg_object(model_instance_kg, kg_user_client, model_project.uuid, scope="any")


@router.put("/models/query/instances/{model_instance_id}", response_model=ModelInstance)
async def update_model_instance_by_id(
    model_instance_id: str,
    model_instance_patch: ModelInstancePatch,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    _check_service_status()
    user = User(token, allow_anonymous=False)
    kg_user_client = get_kg_client_for_user_account(token)
    model_instance_kg, model_id = _get_model_instance_by_id(model_instance_id, kg_user_client, scope="any")
    model_project = _get_model_by_id_or_alias(model_id, kg_user_client, scope="any")
    return await _update_model_instance(
        model_instance_kg, model_project, model_instance_patch, user
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
    _check_service_status()
    user = User(token, allow_anonymous=False)
    kg_user_client = get_kg_client_for_user_account(token)
    model_instance_kg, retrieved_model_id = _get_model_instance_by_id(model_instance_id, kg_user_client, scope="any")
    model_project = _get_model_by_id_or_alias(model_id, kg_user_client, scope="any")
    assert model_id == retrieved_model_id or model_id == model_project.short_name
    return await _update_model_instance(
        model_instance_kg, model_project, model_instance_patch, user
    )


async def _update_model_instance(model_instance_kg, model_project, model_instance_patch, user):
    # check permissions for this model
    if model_project.space is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unable to determine access permissions - please contact EBRAINS support"
        )
    collab_id = model_project.space[len("collab-"):]
    if not (
        await user.can_edit_collab(collab_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is not a member of Collab #{model_project.project_id}",
        )

    kg_user_client = get_kg_client_for_user_account(user.token)
    stored_model_instance = ModelInstance.from_kg_object(
        model_instance_kg, kg_user_client, model_project.uuid, scope="any"
    )
    update_data = model_instance_patch.dict(exclude_unset=True)
    updated_model_instance = stored_model_instance.copy(update=update_data)
    model_instance_kg = updated_model_instance.to_kg_object(model_project)
    model_instance_kg.save(kg_user_client, space=model_project.space, recursive=True)
    return ModelInstance.from_kg_object(model_instance_kg, kg_user_client, model_project.uuid, scope="any")


@router.delete("/models/query/instances/{model_instance_id}", status_code=status.HTTP_200_OK)
async def delete_model_instance_by_id(
    model_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    _check_service_status()
    user = User(token, allow_anonymous=False)
    kg_user_client = get_kg_client_for_user_account(token)
    kg_service_client = get_kg_client_for_service_account()
    model_instance_kg, model_id = _get_model_instance_by_id(model_instance_id, kg_user_client, scope="any")
    collab_id = project_id_from_space(model_instance_kg.space)
    if not (
        await user.can_edit_collab(collab_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access to this model is restricted to members of Collab #{model_instance_kg.space}",
        )
    await _delete_model_instance(model_instance_id, model_id, kg_user_client, kg_service_client)


@router.delete("/models/{model_id}/instances/{model_instance_id}", status_code=status.HTTP_200_OK)
async def delete_model_instance(
    model_id: UUID, model_instance_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)
):
    _check_service_status()
    # todo: handle non-existent UUID
    user = User(token, allow_anonymous=False)
    kg_user_client = get_kg_client_for_user_account(token)
    kg_service_client = get_kg_client_for_service_account()
    model_instance_kg, model_id = _get_model_instance_by_id(model_instance_id, kg_user_client, scope="any")
    collab_id = project_id_from_space(model_instance_kg.space)
    if not (
        await user.can_edit_collab(collab_id)
        or await user.is_admin()
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access to this model is restricted to members of Collab #{model_instance_kg.space}",
        )
    await _delete_model_instance(model_instance_id, model_id, kg_user_client, kg_service_client)


async def _delete_model_instance(model_instance_id, model_id, kg_user_client, kg_service_client):
    try:
        model_project = _get_model_by_id_or_alias(model_id, kg_user_client, scope="in progress", use_cache=False)
        kg_client_for_model = kg_user_client
    except HTTPException:
        model_project = _get_model_by_id_or_alias(model_id, kg_service_client, scope="in progress", use_cache=False)
        kg_client_for_model = kg_service_client
    model_instances = as_list(model_project.has_versions)
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
    model_project.has_versions = model_instances
    model_project.save(kg_client_for_model, recursive=False)
