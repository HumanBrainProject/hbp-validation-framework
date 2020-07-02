"""
Functions relating to database (Knowledge Graph) access
"""


from uuid import UUID
from time import sleep
from fastapi import HTTPException, status
from fairgraph.brainsimulation import (
    ModelProject, ModelInstance, MEModel,
    ValidationTestDefinition, ValidationScript)
from .auth import get_kg_client, get_user_from_token, is_collab_member, is_admin


RETRY_INTERVAL = 60  # seconds

kg_client = get_kg_client()


async def _check_model_access(model_project, token):
    if model_project.private:
        if not (
            await is_collab_member(model_project.collab_id, token.credentials)
            or await is_admin(token.credentials)
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access to this model is restricted to members of Collab #{model_project.collab_id}",
            )


async def _get_model_by_id_or_alias(model_id, token):
    try:
        model_id = UUID(model_id)
        model_project = ModelProject.from_uuid(str(model_id), kg_client, api="nexus")
    except ValueError:
        model_alias = str(model_id)
        model_project = ModelProject.from_alias(model_alias, kg_client, api="nexus")
    if not model_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Model with ID or alias '{model_id}' not found.",
        )
    # todo: fairgraph should accept UUID object as well as str
    await _check_model_access(model_project, token)
    return model_project


async def _get_model_instance_by_id(instance_id, token):
    model_instance = ModelInstance.from_uuid(str(instance_id), kg_client, api="nexus")
    if model_instance is None:
        model_instance = MEModel.from_uuid(str(instance_id), kg_client, api="nexus")
    if model_instance is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Model instance with ID '{instance_id}' not found.",
        )

    model_project = model_instance.project.resolve(kg_client, api="nexus")
    if not model_project:
        # we could get an empty response if the model_project has just been
        # updated and the KG is not consistent, so we wait and try again
        sleep(RETRY_INTERVAL)
        model_project = model_instance.project.resolve(kg_client, api="nexus")
        if not model_project:
            # in case of a dangling model instance, where the parent model_project
            # has been deleted but the instance wasn't
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Model instance with ID '{instance_id}' no longer exists.",
            )
    await _check_model_access(model_project, token)
    return model_instance, model_project.uuid


def _get_test_by_id_or_alias(test_id, token):
    try:
        test_id = UUID(test_id)
        test_definition = ValidationTestDefinition.from_uuid(str(test_id), kg_client, api="nexus")
    except ValueError:
        test_alias = test_id
        test_definition = ValidationTestDefinition.from_alias(test_alias, kg_client, api="nexus")
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


def _get_test_instance_by_id(instance_id, token):
    test_instance = ValidationScript.from_uuid(str(instance_id), kg_client, api="nexus")
    if test_instance is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Test instance with ID '{instance_id}' not found.",
        )

    test_definition = test_instance.test_definition.resolve(kg_client, api="nexus")
    # todo: in case of a dangling test instance, where the parent test_definition
    #       has been deleted but the instance wasn't, we could get a None here
    #       which we need to deal with
    return test_instance