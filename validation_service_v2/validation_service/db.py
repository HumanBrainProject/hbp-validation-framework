"""
Functions relating to database (Knowledge Graph) access
"""


from uuid import UUID
from time import sleep
from fastapi import HTTPException, status
from fairgraph.brainsimulation import (
    ModelProject, ModelInstance, MEModel,
    ValidationTestDefinition, ValidationScript)
from fairgraph.livepapers import LivePaper
from .auth import get_kg_client
from . import settings

RETRY_INTERVAL = 60  # seconds

kg_client = get_kg_client()


def _check_service_status():
    if getattr(settings, "SERVICE_STATUS", "ok") != "ok":
        raise HTTPException(
                            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                            detail=settings.SERVICE_STATUS
                            )


async def _check_model_access(model_project, user):
    if model_project.private:
        if not await user.can_view_collab(model_project.collab_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access to this model is restricted to members of Collab #{model_project.collab_id}",
            )


def _check_service_status():
    if getattr(settings, "SERVICE_STATUS", "ok") != "ok":
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=settings.SERVICE_STATUS
        )


async def _get_model_by_id_or_alias(model_id, user):
    try:
        model_id = UUID(model_id)
        model_project = ModelProject.from_uuid(str(model_id), kg_client, api="nexus", scope="latest")
    except ValueError:
        model_alias = str(model_id)
        model_project = ModelProject.from_alias(model_alias, kg_client, api="nexus", scope="latest")
    if not model_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Model with ID or alias '{model_id}' not found.",
        )
    # todo: fairgraph should accept UUID object as well as str
    await _check_model_access(model_project, user)
    return model_project


async def _get_model_instance_by_id(instance_id, user):
    model_instance = ModelInstance.from_uuid(str(instance_id), kg_client, api="nexus", scope="latest")
    if model_instance is None:
        model_instance = MEModel.from_uuid(str(instance_id), kg_client, api="nexus", scope="latest")
    if model_instance is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Model instance with ID '{instance_id}' not found.",
        )

    model_project = model_instance.project.resolve(kg_client, api="nexus", scope="latest")
    if not model_project:
        # we could get an empty response if the model_project has just been
        # updated and the KG is not consistent, so we wait and try again
        sleep(RETRY_INTERVAL)
        model_project = model_instance.project.resolve(kg_client, api="nexus", scope="latest")
        if not model_project:
            # in case of a dangling model instance, where the parent model_project
            # has been deleted but the instance wasn't
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Model instance with ID '{instance_id}' no longer exists.",
            )
    await _check_model_access(model_project, user)
    return model_instance, model_project.uuid


def _get_test_by_id_or_alias(test_id, user):
    try:
        test_id = UUID(test_id)
        test_definition = ValidationTestDefinition.from_uuid(str(test_id), kg_client, api="nexus", scope="latest")
    except ValueError:
        test_alias = test_id
        test_definition = ValidationTestDefinition.from_alias(test_alias, kg_client, api="nexus", scope="latest")
    if not test_definition:  # None or empty list
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Test with ID or alias '{test_id}' not found.",
        )
    if isinstance(test_definition, list):
        # this could happen if a duplicate alias has sneaked through
        raise Exception(
            f"Found multiple tests (n={len(test_definition)}) with id/alias '{test_id}'"
        )
    # todo: fairgraph should accept UUID object as well as str
    return test_definition


def _get_test_instance_by_id(instance_id, user):
    test_instance = ValidationScript.from_uuid(str(instance_id), kg_client, api="nexus", scope="latest")
    if test_instance is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Test instance with ID '{instance_id}' not found.",
        )

    test_definition = test_instance.test_definition.resolve(kg_client, api="nexus", scope="latest")
    # todo: in case of a dangling test instance, where the parent test_definition
    #       has been deleted but the instance wasn't, we could get a None here
    #       which we need to deal with
    return test_instance


def _get_live_paper_by_id_or_alias(lp_id, scope):
    if scope in ("latest", "in progress"):
        kwargs = {
            "api": "nexus",
            "scope": "latest"
        }
    elif scope == "released":
        kwargs = {
            "api": "query",
            "scope": "released"
        }
    if isinstance(lp_id, UUID):
        identifier_type = "ID"
        live_paper = LivePaper.from_uuid(str(lp_id), kg_client, **kwargs)
    else:
        identifier_type = "alias"
        live_paper = LivePaper.from_alias(lp_id, kg_client, **kwargs)
    if not live_paper:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Live paper with {identifier_type} '{lp_id}' not found.",
        )
    return live_paper
