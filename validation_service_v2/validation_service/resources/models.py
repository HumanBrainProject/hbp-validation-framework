from uuid import UUID
from enum import Enum
from typing import List
from datetime import datetime
import os
import logging

import requests

from fairgraph.client import KGClient
from fairgraph.base import KGQuery, KGProxy, as_list
from fairgraph.brainsimulation import ModelProject, ModelInstance as ModelInstanceKG, MEModel

from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import ValidationError

from ..auth import get_kg_token, get_user_from_token, is_collab_member
from ..data_models import (Person, Species, BrainRegion, CellType, ModelScope, AbstractionLevel,
                          ScientificModel, ScientificModelPatch, ModelInstance)
from ..queries import build_model_project_filters, model_alias_exists
from ..settings import NEXUS_ENDPOINT


logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()
kg_client = KGClient(get_kg_token(), nexus_endpoint=NEXUS_ENDPOINT)
router = APIRouter()


@router.get("/")
def read_root():
    return {"Hello": "World"}


@router.get("/brain-regions/")
def list_brain_regions():
    return [item.value for item in BrainRegion]


@router.get("/species/")
def list_species():
    return [item.value for item in Species]


@router.get("/model-scopes/")
def list_model_scopes():
    return [item.value for item in ModelScope]


@router.get("/cell-types/")
def list_cell_types():
    return [item.value for item in CellType]


@router.get("/abstraction-levels/")
def list_abstraction_levels():
    return [item.value for item in AbstractionLevel]


@router.get("/models/")
def query_models(alias: List[str] = Query(None),
                 id: List[UUID] = Query(None),
                 name: List[str] = Query(None),
                 brain_region: List[BrainRegion] = Query(None),
                 species: List[Species] = Query(None),
                 cell_type: List[CellType] = Query(None),
                 model_scope: ModelScope = None,
                 abstraction_level: AbstractionLevel = None,
                 author: List[str] = Query(None),
                 owner: List[str] = Query(None),
                 organization: List[str] = Query(None),
                 project_id: List[int] = Query(None),  # revisit for Collab v2, where collabs will be named not numbered
                 private: bool = None,
                 size: int = Query(100),
                 from_index: int = Query(0),
                 # from header
                 token: HTTPAuthorizationCredentials = Depends(auth)
                 ):  #, cell_type, model_scope, abstraction_level, ...):
    """
    If project_id is provided:
        - private = None: both public and private models from that project (collab), if the user is a member
        - private = True: only private models from that project, if that user is a member
        - private = False: only public models from that project
    If project_id is not provided:
        - private = None: only public models, from all projects
        - private = True: 400? error "To see private models, you must specify the project/collab"
        - private = False: only public models, from all projects
    """
    if private:
        if project_id:
            for collab_id in project_id:
                if not is_collab_member(collab_id, token.credentials):
                    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                        detail="You are not a member of project #{collab_id}")
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="To see private models, you must specify the project/collab id")

    # temporary, until we add these back in
    cell_type = None
    model_scope = None
    abstraction_level = None
    # end temporary

    # get the values of of the Enums
    if brain_region:
        brain_region = [item.value for item in  brain_region]
    if species:
        species = [item.value for item in species]

    filter_query, context = build_model_project_filters(
        alias, id, name, brain_region, species, cell_type, model_scope, abstraction_level,
        author, owner, organization, project_id, private)
    if len(filter_query["value"]) > 0:
        logger.info("Searching for ModelProject with the following query: {}".format(filter_query))
        # note that from_index is not currently supported by KGQuery.resolve
        model_projects = KGQuery(ModelProject, {"nexus": filter_query}, context).resolve(kg_client, api="nexus", size=size)
    else:
        model_projects = ModelProject.list(kg_client, api="nexus", size=size, from_index=from_index)
    return [ScientificModel.from_kg_object(model_project, kg_client)
            for model_project in model_projects]


def _check_model_access(model_project, token):
    if model_project.private:
        if not is_collab_member(model_project.collab_id, token.credentials):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail=f"Access to this model is restricted to members of Collab #{model_project.collab_id}")


def _get_model_by_id_or_alias(model_id, token):
    try:
        model_id = UUID(model_id)
        model_project = ModelProject.from_uuid(str(model_id), kg_client, api="nexus")
    except ValueError:
        model_alias = model_id
        model_project = ModelProject.from_alias(model_alias, kg_client, api="nexus")
    if model_project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Model with ID or alias '{model_id}' not found.")
    # todo: fairgraph should accept UUID object as well as str
    _check_model_access(model_project, token)
    return model_project


def _get_model_instance_by_id(instance_id, token):
    model_instance = ModelInstanceKG.from_uuid(str(instance_id), kg_client, api="nexus")
    if model_instance is None:
        model_instance = MEModel.from_uuid(str(instance_id), kg_client, api="nexus")
    if model_instance is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Model instance with ID '{instance_id}' not found.")

    model_project = model_instance.project.resolve(kg_client, api="nexus")
    # todo: in case of a dangling model instance, where the parent model_project
    #       has been deleted but the instance wasn't, we could get a None here
    #       which we need to deal with
    _check_model_access(model_project, token)
    return model_instance


@router.get("/models/{model_id}", response_model=ScientificModel)
def get_model(model_id: str, token: HTTPAuthorizationCredentials = Depends(auth)):
    #user = get_user_from_token(token.credentials)
    #logging.info(f"user = {user}")
    # todo: handle non-existent UUID
    model_project = _get_model_by_id_or_alias(model_id, token)
    return ScientificModel.from_kg_object(model_project, kg_client)


@router.post("/models/", response_model=ScientificModel, status_code=status.HTTP_201_CREATED)
def create_model(model: ScientificModel, token: HTTPAuthorizationCredentials = Depends(auth)):
    # check permissions
    if not is_collab_member(model.project_id, token.credentials):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"This account is not a member of Collab #{model.project_id}")
    # check uniqueness of alias
    if model_alias_exists(model.alias, kg_client):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"Another model with alias '{model.alias}' already exists.")
    kg_objects = model.to_kg_objects()
    model_project = kg_objects[-1]
    assert isinstance(model_project, ModelProject)
    if model_project.exists(kg_client, api="any"):
        # see https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
        # for a discussion of the most appropriate status code to use here
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"Another model with the same name and timestamp already exists.")
    for obj in kg_objects:
        obj.save(kg_client)
    return ScientificModel.from_kg_object(model_project, kg_client)


@router.put("/models/{model_id}", response_model=ScientificModel, status_code=status.HTTP_200_OK)
def update_model(model_id: UUID, model_patch: ScientificModelPatch,
                 token: HTTPAuthorizationCredentials = Depends(auth)):
    # if payload contains a project_id, check permissions for that id
    if model_patch.project_id and not is_collab_member(model_patch.project_id, token.credentials):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"This account is not a member of Collab #{model_patch.project_id}")
    # retrieve stored model
    model_project = ModelProject.from_uuid(str(model_id), kg_client, api="nexus")
    stored_model = ScientificModel.from_kg_object(model_project, kg_client)
    # if retrieved project_id is different to payload id, check permissions for that id
    if (stored_model.project_id != model_patch.project_id
            and not is_collab_member(stored_model.project_id, token.credentials)):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"Access to this model is restricted to members of Collab #{stored_model.project_id}")
    # if alias changed, check uniqueness of new alias
    if (model_patch.alias
            and model_patch.alias != stored_model.alias
            and model_alias_exists(model_patch.alias, kg_client)):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"Another model with alias '{model_patch.alias}' already exists.")
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
    kg_objects = updated_model.to_kg_objects()
    for obj in kg_objects:
        obj.save(kg_client)
    model_project = kg_objects[-1]
    assert isinstance(model_project, ModelProject)
    return ScientificModel.from_kg_object(model_project, kg_client)


@router.delete("/models/{model_id}", status_code=status.HTTP_200_OK)
def delete_model(model_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    # todo: handle non-existent UUID
    model_project = ModelProject.from_uuid(str(model_id), kg_client, api="nexus")
    if not is_collab_member(model_project.collab_id, token.credentials):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"Access to this model is restricted to members of Collab #{model_project.collab_id}")
    model_project.delete(kg_client)
    for model_instance in as_list(model_project.instances):
        # todo: we should possibly also delete emodels, modelscripts, morphologies,
        # but need to check they're not shared with other instances
        model_instance.delete(kg_client)


@router.get("/models/{model_id}/instances/", response_model=List[ModelInstance])
def get_model_instances(model_id: str,
                        token: HTTPAuthorizationCredentials = Depends(auth)):
    model_project = _get_model_by_id_or_alias(model_id, token)
    model_instances = [ModelInstance.from_kg_object(inst, kg_client)
                       for inst in model_project.instances]
    return model_instances
    # todo: implement filter by version


@router.get("/models/query/instances/{model_instance_id}", response_model=ModelInstance)
def get_model_instance_from_instance_id(model_instance_id: UUID,
                                        token: HTTPAuthorizationCredentials = Depends(auth)):
     inst = _get_model_instance_by_id(model_instance_id, token)
     return ModelInstance.from_kg_object(inst, kg_client)


@router.get("/models/{model_id}/instances/latest", response_model=ModelInstance)
def get_latest_model_instance_given_model_id(model_id: str,
                                             token: HTTPAuthorizationCredentials = Depends(auth)):
    model_project = _get_model_by_id_or_alias(model_id, token)
    model_instances = [ModelInstance.from_kg_object(inst, kg_client)
                       for inst in model_project.instances]
    latest = sorted(model_instances, key=lambda inst: inst["timestamp"])[-1]
    return latest


@router.get("/models/{model_id}/instances/{model_instance_id}", response_model=ModelInstance)
def get_model_instance_given_model_id(model_id: str,
                                      model_instance_id: UUID,
                                      token: HTTPAuthorizationCredentials = Depends(auth)):
    model_project = _get_model_by_id_or_alias(model_id, token)
    for inst in model_project.instances:
        if UUID(inst.uuid) == model_instance_id:
            return ModelInstance.from_kg_object(inst, kg_client)
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Model ID/alias and model instance ID are inconsistent")


# GET
# /model-instances/?id=(string: model_instance_uuid)
# /model-instances/?model_id=(string: model_uuid)&version=(string: version)
# /model-instances/?model_alias=(string: model_alias)&version=(string: version)
# /model-instances/?model_id=(string: model_uuid)
# /model-instances/?model_alias=(string: model_alias)

@router.post("/models/{model_id}/instances/",
          response_model=ModelInstance, status_code=status.HTTP_201_CREATED)
def create_model_instance(model_id: str,
                          model_instance: ModelInstance,
                          token: HTTPAuthorizationCredentials = Depends(auth)):

    pass


@router.put("/models/{model_id}/instances/{model_instance_id}",
         response_model=ModelInstance, status_code=status.HTTP_201_CREATED)
def update_model_instance(model_id: str,
                          model_instance_id: str,
                          model_instance: ModelInstance,
                          token: HTTPAuthorizationCredentials = Depends(auth)):

    pass

# POST
# /model-instances/

# PUT
# /model-instances/