"""
Functions relating to database (Knowledge Graph) access
"""


from uuid import UUID
from time import sleep
from fastapi import HTTPException, status
from fairgraph.openminds.core import Model, ModelVersion, SoftwareVersion
from fairgraph.openminds.computation import ValidationTest, ValidationTestVersion
from . import settings

RETRY_INTERVAL = 60  # seconds


def _check_service_status():
    if getattr(settings, "SERVICE_STATUS", "ok") != "ok":
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=settings.SERVICE_STATUS
        )


def _get_model_by_id_or_alias(model_id, kg_client, scope):
    try:
        model_id = UUID(model_id)
        get_model = Model.from_uuid
    except ValueError:
        get_model = Model.from_alias
    model_project = get_model(str(model_id), kg_client, scope=scope)
    if not model_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Model with ID or alias '{model_id}' not found.",
        )
    # todo: fairgraph should accept UUID object as well as str
    return model_project


def _get_model_instance_by_id(instance_id, kg_client, scope):
    model_instance = ModelVersion.from_uuid(str(instance_id), kg_client, scope=scope)
    if model_instance is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Model instance with ID '{instance_id}' not found.",
        )

    model_project = Model.list(kg_client, scope=scope, space=model_instance.space,
                               versions=model_instance)
    if not model_project:
        # we could get an empty response if the model_project has just been
        # updated and the KG is not consistent, so we wait and try again
        sleep(RETRY_INTERVAL)
        model_project = Model.list(kg_client, scope=scope, space=model_instance.space,
                                   versions=model_instance)
        if not model_project:
            # in case of a dangling model instance, where the parent model_project
            # has been deleted but the instance wasn't
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Model instance with ID '{instance_id}' no longer exists.",
            )
    model_project = model_project[0]
    return model_instance, model_project.uuid


def _get_test_by_id_or_alias(test_id, kg_client, scope):
    try:
        test_id = UUID(test_id)
        get_test = ValidationTest.from_uuid
    except ValueError:
        get_test = ValidationTest.from_alias
    test_definition = get_test(str(test_id), kg_client, scope=scope)
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


def _get_test_instance_by_id(instance_id, kg_client, scope):
    test_instance = ValidationTestVersion.from_uuid(str(instance_id), kg_client, scope=scope)
    if test_instance is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Test instance with ID '{instance_id}' not found.",
        )
    return test_instance
