from uuid import UUID
from enum import Enum
from typing import List
from datetime import datetime
import os
import logging

import requests

from fairgraph.client import KGClient
from fairgraph.base import KGQuery, KGProxy, as_list
from fairgraph.brainsimulation import ModelProject

from fastapi import FastAPI, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .auth import get_kg_token, get_user_from_token, is_collab_member
from .data_models import (Person, Species, BrainRegion, CellType, ModelScope, AbstractionLevel,
                          ScientificModel, ScientificModelPatch, ModelInstance)
from .queries import build_model_project_filters, model_alias_exists
from .settings import NEXUS_ENDPOINT


logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()

kg_client = KGClient(get_kg_token(), nexus_endpoint=NEXUS_ENDPOINT)

app = FastAPI(
    title="HBP Model Validation Service",
    description="description goes here",
    version="2.0")


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/brain-regions/")
def list_brain_regions():
    return [item.value for item in BrainRegion]


@app.get("/species/")
def list_species():
    return [item.value for item in Species]


@app.get("/model-scopes/")
def list_model_scopes():
    return [item.value for item in ModelScope]


@app.get("/cell-types/")
def list_cell_types():
    return [item.value for item in CellType]


@app.get("/abstraction-levels/")
def list_abstraction_levels():
    return [item.value for item in AbstractionLevel]


@app.get("/models/")
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


@app.get("/models/{model_id}", response_model=ScientificModel)
def get_model(model_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    #user = get_user_from_token(token.credentials)
    #logging.info(f"user = {user}")
    # todo: handle non-existent UUID
    model_project = ModelProject.from_uuid(str(model_id), kg_client, api="nexus")
    if model_project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Model with ID {model_id} not found.")
    # todo: fairgraph should accept UUID object as well as str
    if model_project.private:
        if not is_collab_member(model_project.collab_id, token.credentials):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail=f"Access to this model is restricted to members of Collab #{model_project.collab_id}")
    return ScientificModel.from_kg_object(model_project, kg_client)


@app.post("/models/", response_model=ScientificModel, status_code=status.HTTP_201_CREATED)
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
    if model_project.exists(kg_client):
        # see https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
        # for a discussion of the most appropriate status code to use here
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail=f"Another model with the same name and timestamp already exists.")
    for obj in kg_objects:
        obj.save(kg_client)
    return ScientificModel.from_kg_object(model_project, kg_client)

# PUT
# /models/?app_id=(string: app_id)


@app.delete("/models/{model_id}", status_code=status.HTTP_200_OK)
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

# GET
# /model-instances/?id=(string: model_instance_uuid)
# /model-instances/?model_id=(string: model_uuid)&version=(string: version)
# /model-instances/?model_alias=(string: model_alias)&version=(string: version)
# /model-instances/?model_id=(string: model_uuid)
# /model-instances/?model_alias=(string: model_alias)


# POST
# /model-instances/

# PUT
# /model-instances/