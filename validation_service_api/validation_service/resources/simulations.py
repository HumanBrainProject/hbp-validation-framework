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
from fairgraph.utility import as_list
import fairgraph.brainsimulation
import fairgraph.openminds.core as omcore

from fastapi import APIRouter, Depends, Header, Query, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import ValidationError

from ..auth import get_kg_client_for_user_account
from ..data_models import Simulation, ConsistencyError
from .. import settings


logger = logging.getLogger("validation_service_api")

auth = HTTPBearer()
router = APIRouter()



@router.get("/simulations/", response_model=List[Simulation])
def query_simulations(
    model_id: UUID = None,
    model_instance_id: UUID = None,
    size: int = Query(100),
    from_index: int = Query(0),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )

    user = omcore.Person.me(kg_client)
    kwargs = {
        "size": size,
        "from_index": from_index,
        "api": "nexus"
    }
    if user:
        kwargs["started_by"] = user
    else:
        return []

    model_instances = []
    if model_instance_id:
        model_instance = fairgraph.brainsimulation.ModelInstance.from_uuid(str(model_instance_id), kg_client, api="nexus", scope="in progress")
        # todo: handle MEModel, not just ModelInstance
        # todo: if model_id is given, check if it is consistent and return an error if not
        if model_instance:
            model_instances.append(model_instance)
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Model instance with id {model_instance_id} not found.",
            )
    elif model_id:
        model_project = fairgraph.brainsimulation.ModelProject.from_uuid(str(model_id), kg_client, api="nexus", scope="in progress")
        model_instances = as_list(model_project.instances)
    if len(model_instances) > 0:
        simulations = []
        for model_instance in model_instances:
            kwargs["model_instance_id"] = model_instance.id
            simulations.extend(as_list(fairgraph.brainsimulation.Simulation.list(kg_client, **kwargs)))
    else:
        simulations = fairgraph.brainsimulation.Simulation.list(kg_client, **kwargs)
    return [Simulation.from_kg_object(sim, kg_client) for sim in simulations]


@router.get("/simulations/{simulation_id}", response_model=Simulation)
def get_simulation(simulation_id: UUID, token: HTTPAuthorizationCredentials = Depends(auth)):
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )

    simulation_activity = fairgraph.brainsimulation.Simulation.from_uuid(str(simulation_id), kg_client, api="nexus", scope="in progress")
    if simulation_activity:
        try:
            obj = Simulation.from_kg_object(simulation_activity, kg_client)
        except ConsistencyError as err:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(err))
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Simulation {simulation_id} not found.",
        )
    return obj


@router.post("/simulations/", response_model=Simulation, status_code=status.HTTP_201_CREATED)
def create_simulation(simulation: Simulation, token: HTTPAuthorizationCredentials = Depends(auth)):
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )

    logger.info("Beginning post simulation")
    kg_objects = simulation.to_kg_objects(kg_client, token)
    logger.info("Created objects")
    for label in ('person', 'config', 'outputs', 'hardware', 'dependencies', 'env', 'activity'):
        for obj in as_list(kg_objects[label]):
            obj.save(kg_client)
    for obj in as_list(kg_objects['outputs']):
        obj.generated_by = kg_objects['activity']
        obj.save(kg_client)
    logger.info("Saved objects")

    return Simulation.from_kg_object(kg_objects['activity'], kg_client)
