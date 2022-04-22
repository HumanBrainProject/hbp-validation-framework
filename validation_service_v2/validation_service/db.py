"""
Functions relating to database (Knowledge Graph) access
"""


from uuid import UUID
from time import sleep
from fastapi import HTTPException, status
from fairgraph.openminds.core import Model, ModelVersion, SoftwareVersion
#from fairgraph.openminds.validation import ValidationTestDefinition
from fairgraph.openminds.publications import LivePaper
from .auth import get_user_from_token, is_collab_member, is_admin


RETRY_INTERVAL = 60  # seconds


def _get_model_by_id_or_alias(model_id, kg_client):
    try:
        model_id = UUID(model_id)
        get_model = Model.from_uuid
    except ValueError:
        get_model = Model.from_alias
    model_project = get_model(str(model_id), kg_client, scope="in progress")
    if not model_project:
        model_project = get_model(str(model_id), kg_client, scope="released")
    if not model_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Model with ID or alias '{model_id}' not found.",
        )
    # todo: fairgraph should accept UUID object as well as str
    return model_project


def _get_model_instance_by_id(instance_id, kg_client):
    model_instance = ModelVersion.from_uuid(str(instance_id), kg_client, scope="in progress")
    if model_instance is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Model instance with ID '{instance_id}' not found.",
        )

    model_project = Model.list(kg_client, scope="in progress", versions=model_instance)[0]
    if not model_project:
        # we could get an empty response if the model_project has just been
        # updated and the KG is not consistent, so we wait and try again
        sleep(RETRY_INTERVAL)
        model_project = Model.list(kg_client, scope="in progress", versions=model_instance)[0]
        if not model_project:
            # in case of a dangling model instance, where the parent model_project
            # has been deleted but the instance wasn't
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Model instance with ID '{instance_id}' no longer exists.",
            )
    return model_instance, model_project.uuid


def _get_test_by_id_or_alias(test_id, kg_client):
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )
#     try:
#         test_id = UUID(test_id)
#         test_definition = ValidationTestDefinition.from_uuid(str(test_id), kg_client, api="nexus", scope="latest")
#     except ValueError:
#         test_alias = test_id
#         test_definition = ValidationTestDefinition.from_alias(test_alias, kg_client, api="nexus", scope="latest")
#     if not test_definition:  # None or empty list
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"Test with ID or alias '{test_id}' not found.",
#         )
#     if isinstance(test_definition, list):
#         # this could happen if a duplicate alias has sneaked through
#         raise Exception(
#             f"Found multiple tests (n={len(test_definition)}) with id/alias '{test_id}'"
#         )
#     # todo: fairgraph should accept UUID object as well as str
#     return test_definition


def _get_test_instance_by_id(instance_id, kg_client):
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )
#     test_instance = ValidationScript.from_uuid(str(instance_id), kg_client, api="nexus", scope="latest")
#     if test_instance is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"Test instance with ID '{instance_id}' not found.",
#         )

#     test_definition = test_instance.test_definition.resolve(kg_client, api="nexus", scope="latest")
#     # todo: in case of a dangling test instance, where the parent test_definition
#     #       has been deleted but the instance wasn't, we could get a None here
#     #       which we need to deal with
#     return test_instance


def _get_live_paper_by_id_or_alias(lp_id, scope):
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Not yet migrated",
    )
    if isinstance(lp_id, UUID):
        identifier_type = "ID"
        live_paper = LivePaper.from_uuid(str(lp_id), kg_client, scope=scope)
    else:
        identifier_type = "alias"
        live_paper = LivePaper.from_alias(lp_id, kg_client, scope=scope)
    if not live_paper:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Live paper with {identifier_type} '{lp_id}' not found.",
        )
    return live_paper
