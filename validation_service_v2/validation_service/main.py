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

from fastapi import FastAPI, Depends, Header, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .auth import get_kg_token, get_user_from_token, is_collab_member
from .data_models import Person, Species, BrainRegion, ScientificModel, ModelInstance
from .queries import build_model_project_filters
from .settings import NEXUS_ENDPOINT


logger = logging.getLogger("validation_service_v2")

auth = HTTPBearer()

kg_client = KGClient(get_kg_token(), nexus_endpoint=NEXUS_ENDPOINT)

app = FastAPI(
    title="HBP Model Validation Service",
    description="description goes here",
    version="3.0")


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/brain-regions/")
def list_brain_regions():
    return [item.value for item in BrainRegion]


@app.get("/species/")
def list_species():
    return [item.value for item in Species]


@app.get("/models/")
def query_models(alias: List[str] = Query(None),
                 id: List[UUID] = Query(None),
                 name: List[str] = Query(None),
                 brain_region: List[BrainRegion] = Query(None),
                 species: List[Species] = Query(None),
                 author: List[str] = Query(None),
                 owner: List[str] = Query(None),
                 organization: List[str] = Query(None),
                 project_id: List[str] = Query(None),
                 private: bool = None,
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
                    raise HttpException(status_code=403,
                                        detail="You are not a member of project #{collab_id}")
        else:
            raise HTTPException(status_code=400,
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
        models = KGQuery(ModelProject, {"nexus": filter_query}, context).resolve(kg_client, api="nexus", size=10000)
    else:
        models = ModelProject.list(kg_client, api="nexus", size=10000)
    return models


@app.get("/models/{model_id}", response_model=ScientificModel)
def get_model(model_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    user = get_user_from_token(token.credentials)
    logging.info(f"user = {user}")
    model_project = ModelProject.from_uuid(str(model_id), kg_client, api="nexus")  # todo: fairgraph should accept UUID object as well as str
    if model_project.private:
        if not is_collab_member(model_project.collab_id, token.credentials):
            raise HTTPException(status_code=403,
                                detail=f"Access to this model is restricted to members of Collab #{model_project.collab_id}")
    return ScientificModel.from_kg_object(model_project, kg_client)


# POST
# /models/?app_id=(string: app_id)

# PUT
# /models/?app_id=(string: app_id)


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