import os
from datetime import datetime, timezone
from time import sleep
from urllib.parse import urlparse
import logging

from fastapi import status

import pytest

from ..data_models import BrainRegion, Species
from .fixtures import _build_sample_model, private_model, released_model, client, token, AUTH_HEADER


def check_model(model):
    assert isinstance(model["name"], str)
    assert isinstance(model["description"], str)
    if model["alias"]:
        assert isinstance(model["alias"], str)
    for field in ("author", "owner"):
        assert isinstance(model[field], list)
        assert len(model[field]) > 0
        assert "family_name" in model[field][0]
    assert isinstance(model["private"], bool)
    if model["brain_region"]:
        assert model["brain_region"] in [item.value for item in BrainRegion]
    if model["species"]:
        assert model["species"] in [item.value for item in Species]
    if "images" in model and model["images"]:
        assert isinstance(model["images"], list)
        if len(model["images"]) > 0:
            assert "url" in model["images"][0]
            assert "caption" in model["images"][0]
    if "instances" in model and model["instances"]:
        check_model_instance(model["instances"][0])


def check_model_instance(model_instance):
    if model_instance["timestamp"]:
        datetime.fromisoformat(model_instance["timestamp"])
    assert isinstance(model_instance["version"], str)
    assert_is_valid_url(model_instance["source"])


def assert_is_valid_url(url):
    try:
        urlparse(url)
    except ValueError:
        raise AssertionError


def test_get_private_model_by_id_no_auth(private_model):
    response = client.get(f"/models/{private_model.uuid}")
    assert response.status_code == 404
    assert response.json() == {"detail": f"Model with ID '{private_model.uuid}' not found."}


def test_get_released_model_by_id_no_auth(released_model):
    response = client.get(f"/models/{released_model.uuid}")
    assert response.status_code == 200
    model = response.json()
    check_model(model)


def test_get_model_by_id(private_model, released_model, caplog):
    # caplog.set_level(logging.DEBUG)
    test_ids = (
        (True, private_model.uuid),
        (False, released_model.uuid),
    )
    for expected_private, model_uuid in test_ids:
        # first is private (but test user has access), second is public
        # todo: test with a second user, who does not have access
        response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
        assert response.status_code == 200
        model = response.json()
        assert model["private"] == expected_private
        check_model(model)


def test_list_models_no_auth():
    response = client.get(f"/models/?size=5")
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert not model["private"]


def test_list_models_nofilters():
    response = client.get(f"/models/?size=5", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)


def test_list_models_filter_by_brain_region():
    response = client.get(f"/models/?size=5&brain_region=CA1%20field%20of%20hippocampus", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert model["brain_region"] == "CA1 field of hippocampus"
        #assert model["species"] is not None


def test_list_models_filter_by_species():
    response = client.get(f"/models/?size=5&species=Rattus%20norvegicus", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert model["species"] == "Rattus norvegicus"


def test_list_models_filter_by_author():
    response = client.get(f"/models/?size=5&author=Migliore", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert len([author["family_name"] == "Migliore" for author in model["author"]]) > 0


def test_list_models_filter_by_owner():
    response = client.get(f"/models/?size=5&author=Destexhe", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert len([owner["family_name"] == "Destexhe" for owner in model["owner"]]) > 0


# need to revisit the "organization" field
# def test_list_models_filter_by_org():
#     response = client.get(f"/models/?size=5&organization=HBP-SP4", headers=AUTH_HEADER)
#     assert response.status_code == 200
#     models = response.json()
#     assert len(models) == 5
#     for model in models:
#         check_model(model)
#         assert model["organization"] == "HBP-SP4"


# this fails because project_id (collab_id) can be either int or string within the KG,
# which makes queries tricky. Best approach would be to convert all int ids to str
# def test_list_models_filter_by_project_id(caplog):
#     caplog.set_level(logging.DEBUG)
#     response = client.get(f"/models/?size=5&project_id=9821", headers=AUTH_HEADER)
#     assert response.status_code == 200
#     models = response.json()
#     assert len(models) == 5
#     for model in models:
#         check_model(model)
#         assert model["project_id"] == "9821"


def test_list_models_filter_by_privacy_status():
    response = client.get(f"/models/?size=5&private=false", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert model["private"] is False


def test_list_models_filter_by_brain_region_and_authors():
    response = client.get(
        f"/models/?size=5&brain_region=CA1%20field%20of%20hippocampus&author=Migliore", headers=AUTH_HEADER
    )
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert len([author["family_name"] == "Migliore" for author in model["author"]]) > 0
        assert model["brain_region"] == "CA1 field of hippocampus"


def test_create_and_delete_network_model(caplog):
    caplog.set_level(logging.DEBUG)

    payload = _build_sample_model()
    # create
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)

    # check we can retrieve model
    sleep(15)  # need to wait a short time to allow Nexus to become consistent
    model_uuid = posted_model["id"]
    response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_model = response.json()
    assert retrieved_model == posted_model

    # delete again
    response = client.delete(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200

    # todo: check model no longer exists
    response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 404


def test_create_model_with_minimal_data(caplog):
    payload = {
        "name": f"TestModel API v3beta {datetime.now(timezone.utc).isoformat()}",
        "author": [{"given_name": "Frodo", "family_name": "Baggins"}],
        "owner": [{"given_name": "Frodo", "family_name": "Baggins"}],
        "project_id": "model-validation",
        "description": "description goes here",
    }
    # create
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)

    # check we can retrieve model
    model_uuid = posted_model["id"]
    response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_model = response.json()
    assert retrieved_model == posted_model

    # delete again
    response = client.delete(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_create_model_with_invalid_data():
    # missing required model project fields
    for required_field in ("name", "author", "owner", "description"):
        payload = _build_sample_model()
        del payload[required_field]
        response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert response.json() == {
            "detail": [
                {
                    "loc": ["body", required_field],
                    "msg": "field required",
                    "type": "value_error.missing",
                }
            ]
        }
    # missing required model instance fields
    for required_field in ("version",):
        payload = _build_sample_model()
        del payload["instances"][0][required_field]
        response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert response.json() == {
            "detail": [
                {
                    "loc": ["body", "instances", 0, required_field],
                    "msg": "field required",
                    "type": "value_error.missing",
                }
            ]
        }
    # invalid value for Enum field
    payload = _build_sample_model()
    payload["species"] = "klingon"
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    err_msg = response.json()["detail"]
    assert err_msg[0]["loc"] == ["body", "species"]
    assert err_msg[0]["msg"].startswith("value is not a valid enumeration member")
    assert err_msg[0]["type"] == "type_error.enum"
    # invalid URL
    payload = _build_sample_model()
    payload["instances"][0]["source"] = "/filesystem/path/to/doc.txt"
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "instances", 0, "source"],
                "msg": "invalid or missing URL scheme",
                "type": "value_error.url.scheme",
            }
        ]
    }
    # incorrectly formatted "owner" field
    payload = _build_sample_model()
    payload["owner"] = ["Thorin Oakenshield"]
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "owner", 0],
                "msg": "value is not a valid dict",
                "type": "type_error.dict",
            }
        ]
    }


def test_create_model_with_existing_alias():
    payload = _build_sample_model()
    payload["alias"] = "RatHippocampusCA1"
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_409_CONFLICT
    assert response.json() == {
        "detail": "Another model with alias 'RatHippocampusCA1' already exists."
    }


@pytest.mark.xfail  # need to test with non-admin user
def test_create_model_without_collab_membership():
    payload = _build_sample_model()
    payload["project_id"] = "636"
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.json() == {"detail": "This account is not a member of Collab #636"}


def test_create_duplicate_model(caplog):
    # Creating two models with the same alias field is not allowed
    # caplog.set_level(logging.INFO)
    payload = _build_sample_model()
    # create
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)

    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_409_CONFLICT
    assert "already exists" in response.json()["detail"]

    # delete first model
    response = client.delete(f"/models/{posted_model['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200

    # todo: now try to create same again - should now work (set deprecated from True to False)


def test_update_model(caplog):
    # caplog.set_level(logging.INFO)
    payload = _build_sample_model()
    # create
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)
    # make changes
    changes = {
        "alias": posted_model["alias"] + "-changed",
        "name": posted_model["name"]
        + " (changed)",  # as long as date_created is not changed, name can be
        "owner": [{"given_name": "Tom", "family_name": "Bombadil"}],
        "model_scope": "network: brain region",
        "description": "The previous description was too short",
    }
    # update
    response = client.put(f"/models/{posted_model['id']}", json=changes, headers=AUTH_HEADER)
    assert response.status_code == 200
    updated_model = response.json()
    check_model(updated_model)

    assert posted_model["id"] == updated_model["id"]
    assert posted_model["instances"] == updated_model["instances"]
    assert updated_model["model_scope"] != payload["model_scope"]
    assert updated_model["model_scope"] == changes["model_scope"] == "network: brain region"

    # delete model
    response = client.delete(f"/models/{posted_model['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_update_model_with_invalid_data():
    payload = _build_sample_model()
    # create
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)
    # mix valid and invalid changes
    # none of them should be applied
    changes = {
        "alias": posted_model["alias"] + "-changed",
        "name": posted_model["name"]
        + " (changed)",  # as long as date_created is not changed, name can be
        "owner": None,  # invalid
        "model_scope": "foo",  # invalid
        "description": None,  # invalid
    }
    response = client.put(f"/models/{posted_model['id']}", json=changes, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    errmsg = response.json()["detail"]
    assert set([part["loc"][-1] for part in errmsg]) == set(
        ["owner", "model_scope", "description"]
    )

    # delete model
    response = client.delete(f"/models/{posted_model['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200


@pytest.mark.xfail  # need to test with non-admin user
def test_changing_project_id():
    # if test user isn't a member of the new collab, returns 403
    payload = _build_sample_model()
    # create
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)

    changes = {"project_id": "636"}
    response = client.put(f"/models/{posted_model['id']}", json=changes, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.json()["detail"] == "This account is not a member of Collab #636"

    # delete model
    response = client.delete(f"/models/{posted_model['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_changing_to_invalid_alias():
    # expect 409
    payload = _build_sample_model()
    # create
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)

    changes = {"alias": "RatHippocampusCA1"}
    response = client.put(f"/models/{posted_model['id']}", json=changes, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_409_CONFLICT
    assert (
        response.json()["detail"] == "Another model with alias 'RatHippocampusCA1' already exists."
    )

    # delete model
    response = client.delete(f"/models/{posted_model['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_list_model_instances_by_model_id():
    model_uuid = "cb62b56e-bdfa-4016-81cd-c9dbc834cebc"
    response1 = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response1.status_code == 200
    model_project = response1.json()
    response2 = client.get(f"/models/{model_uuid}/instances/", headers=AUTH_HEADER)
    assert response2.status_code == 200
    model_instances = response2.json()
    assert len(model_instances) > 0

    assert model_project["instances"] == model_instances


def test_get_model_instance_by_id():
    instance_uuid = "ef213a1a-136e-4853-836b-15d151277b9f"
    response = client.get(f"/models/query/instances/{instance_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    model_instance = response.json()
    check_model_instance(model_instance)


def test_get_model_instance_by_project_and_id():
    model_uuid = "cb62b56e-bdfa-4016-81cd-c9dbc834cebc"
    instance_uuid = "ef213a1a-136e-4853-836b-15d151277b9f"
    response = client.get(f"/models/{model_uuid}/instances/{instance_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    model_instance = response.json()
    check_model_instance(model_instance)


def test_create_model_instance():
    # first create a model project
    payload1 = _build_sample_model()
    response = client.post(f"/models/", json=payload1, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)
    assert len(posted_model["instances"]) == 1
    model_uuid = posted_model["id"]

    # now add a new instance
    payload2 = {
        "version": "1.3",
        "description": "description of this version",
        "parameters": "http://example.com/my_modified_parameters.py",
        "code_format": "text/x-python",
        "source": "http://example.com/my_code.py",
        "license": "The MIT license",
    }
    response = client.post(f"/models/{model_uuid}/instances/", json=payload2, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_201_CREATED

    # now retrieve the model and check we have both instances
    response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_model = response.json()
    assert len(retrieved_model["instances"]) == 2
    assert retrieved_model["instances"][1]["version"] == payload2["version"]

    # delete again
    response = client.delete(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_update_model_instance():
    # first create a model project
    payload1 = _build_sample_model()
    response = client.post(f"/models/", json=payload1, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)
    assert len(posted_model["instances"]) == 1
    model_uuid = posted_model["id"]
    model_instance_uuid = posted_model["instances"][0]["id"]

    # now edit the instance
    payload2 = {
        "description": "a more detailed description of this version",
        "source": "http://example.com/my_code_in_a_new_location.py",
        "license": "The 3-Clause BSD License",
    }
    response = client.put(
        f"/models/{model_uuid}/instances/{model_instance_uuid}", json=payload2, headers=AUTH_HEADER
    )
    assert response.status_code == 200

    # now retrieve the model and check the instance has been updated
    response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_model = response.json()
    assert len(retrieved_model["instances"]) == 1
    assert (
        retrieved_model["instances"][0]["version"] == payload1["instances"][0]["version"]
    )  # should be unchanged
    assert retrieved_model["instances"][0]["license"] == payload2["license"]
    assert retrieved_model["instances"][0]["description"] == payload2["description"]

    # delete again
    response = client.delete(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_update_model_instance_without_model_id():
    # first create a model project
    payload1 = _build_sample_model()
    response = client.post(f"/models/", json=payload1, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)
    assert len(posted_model["instances"]) == 1
    model_uuid = posted_model["id"]
    model_instance_uuid = posted_model["instances"][0]["id"]

    # now edit the instance
    payload2 = {
        "description": "a more detailed description of this version",
        "source": "http://example.com/my_code_in_a_new_location.py",
        "license": "The 3-Clause BSD License",
    }
    response = client.put(
        f"/models/query/instances/{model_instance_uuid}", json=payload2, headers=AUTH_HEADER
    )
    assert response.status_code == 200

    # now retrieve the model and check the instance has been updated
    response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_model = response.json()
    assert len(retrieved_model["instances"]) == 1
    assert (
        retrieved_model["instances"][0]["version"] == payload1["instances"][0]["version"]
    )  # should be unchanged
    assert retrieved_model["instances"][0]["license"] == payload2["license"]
    assert retrieved_model["instances"][0]["description"] == payload2["description"]

    # delete again
    response = client.delete(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_create_duplicate_model_instance(caplog):
    # Creating two model instances with the same name and date_created fields is not allowed

    # first create a model project
    payload1 = _build_sample_model()
    response = client.post(f"/models/", json=payload1, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    check_model(posted_model)
    assert len(posted_model["instances"]) == 1
    model_uuid = posted_model["id"]

    # now try to add the same instance again
    sleep(20)
    payload2 = posted_model["instances"][0]
    response = client.post(f"/models/{model_uuid}/instances/", json=payload2, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_409_CONFLICT

    # delete model
    response = client.delete(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_delete_model_instance(caplog):

    # first create a model project
    payload = _build_sample_model()
    # add a second instance to the default payload
    payload["instances"].append(
        {
            "version": "1.3",
            "description": "description of this version",
            "parameters": "http://example.com/my_parameters_2.py",
            "code_format": "text/x-python",
            "source": "http://example.com/my_code_2.py",
            "license": "The MIT license",
        }
    )
    response = client.post(f"/models/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_model = response.json()
    model_uuid = posted_model["id"]

    # now delete one of the instances
    sleep(15)
    instance_uuids = [inst["id"] for inst in posted_model["instances"]]
    response = client.delete(
        f"/models/{model_uuid}/instances/{instance_uuids[0]}", headers=AUTH_HEADER
    )
    assert response.status_code == 200

    # now get the model again and check the deleted instance is not there
    sleep(15)
    response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_model = response.json()
    retrieved_uuids = [inst["id"] for inst in retrieved_model["instances"]]
    assert len(retrieved_uuids) == 1
    assert retrieved_uuids[0] == instance_uuids[1]

    # delete the model
    response = client.delete(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_hhnb_models(caplog):
    # list of models used by the HHNB app, to check
    hhnb_models = [
        '282ae93d-5310-4caa-9417-fe6ab343a551',
        'fde75d28-ac90-479d-9946-5130e5262941',
        'df83ff36-5182-497a-b94a-ff0f11fb32a8',
        'bced805e-2646-47f5-99d8-ca1567a39bf0',
        'ab570001-df66-466c-bc6f-1b44cd324222',
        '933b6b54-d458-40ce-bfb9-0d8236f9e837',
        'bb270779-ad04-4ec4-b04d-7b02b4a679c3',
        'f854ebcd-7ebc-48a6-b4ff-a4d63cebf0fe',
        'a8e7bfa3-d873-4e47-b70c-e529fc70eff5',
        'f9c2072c-c9fe-4b10-b565-a6955c1ff4f9',
        '4e701605-a0d5-4fe0-8faa-32f4709d67ec',
        'd249dc18-24a0-434f-8a3f-de5b5719904e',
        '2073be15-1354-493c-9d00-0097d4f19432',
        '7bbe8a2f-dfd3-4b2b-85f6-02e0d4d08c35',
        '746e5d32-499f-4374-b31c-10ad0883fa2e',
        '73460bbd-e902-476a-943e-f09c151a3b81',
        'f1e1e6f1-a55c-4a7e-aa25-6054b09d9001',
        '142fbe6f-b007-4049-a59e-433e09df8280',
        'e8e40e37-4ef0-426b-bc53-4f101fab9820',
        '26ca36cf-ae09-431f-9769-1a44a3e9a2e1',
        'a73f94cf-0ccb-42f8-94a2-ad95ecb5cba4',
        '1538e395-a6a4-4687-8cef-b1c35bb753f3',
        '3241346a-7656-46c8-8db7-9a902f157ef4',
        'b5ef2c2e-f0bf-4624-a579-7e1be74f8800',
        'c3e51ddc-3c5d-4d32-9bc8-0c9e9174c470',
        'a1d71c10-275f-40eb-84d1-4655abe97a13',
        '050e6a65-d4c7-46d6-83be-12de4a841427',
        '5a17a502-a07f-47ce-9d88-bbe99c3760b5',
        '9597a474-bd2d-4483-9937-b4aa4f71b46f',
        '5c99fef5-4279-4b81-a7a7-35aeb870d446',
        'ae831dff-1418-42d2-b843-48693178825a',
        'aa87e2b0-4df3-4ee4-8432-39f29af7ee11',
        'd46d20f5-5f74-48dd-a156-f487714d4d79',
        '0ea33005-c741-49b0-b96c-2c265e0401d6',
        '3c600230-3e20-4349-9959-733d1e48eb15',
        '7b54cd60-bda9-421d-9ae4-faa1509f6b8c',
        'bc860e5e-d6cc-4a59-b452-0652982fc45d',
        '54e67d53-85ae-4aab-9242-bb9e41118a3a',
        'c148813c-e865-4ee3-98f8-ef6ecab131eb',
        'd43c7f90-4414-42d0-a28c-d5b2ea6e1865',
        'b72cf1bc-e5d6-4b54-b26d-43be4128515b',
        'e0b06e4b-bb33-4194-82de-f257b29602da',
        '1b6e4e06-7a4f-4b8c-be64-937f98011e0d',
        '134f30cd-f5e1-4885-9b82-04db8c643e0f',
        '45806440-77dc-438a-96f1-02acb856c810',
        'b2fcb737-cfd8-49ae-b4be-16c2f3934d40',
        '7896b92a-62e1-41b0-b5ca-0faed66e5c7d',
        '90f116a7-84e0-4a51-97ea-a97c7595be95',
        '9316e917-278a-46ff-9481-109dfc0cf189',
        'dda2285d-042b-4ced-9035-b84c866ec2db',
        'b6574eba-7098-4572-a926-1f3c52d48b27',
        '4cfe7385-9b6a-495a-8817-9b824e4652b9',
        '20063d5c-6173-41f4-b779-16f3a2ec54bf',
        '839a7a2e-b2d1-492b-b0a0-c0d14485c7e2',
        '03d26f01-9197-4fae-97d7-09b33274b76f',
        '5d6831d9-d0a3-45f9-97a4-8005567a120f',
        '32d6d3ac-5142-433e-9d4c-d349f01d8da1',
        '5078e019-5047-417c-b91c-560a32624e1e',
        '1912605a-6d21-45bf-b2a2-b981297b9af0',
        'c17a3c77-ba1f-4265-b67b-1c887cec86fd',
        '913392e6-7714-4a75-988d-0f3251a42706',
        'f92aa627-0485-4745-a806-d6f8e1a244c5',
        '82b0efd7-39a6-4f13-a706-4f918a7be6b9',
        'cf951d59-22b0-44a3-b4b8-44a3d0717b87',
        '42236338-1280-4607-b45c-96b2eb574c70',
        'fd992a51-0efa-4439-a620-f4dbd7bcc6d0',
        'e6cb6107-542e-4c3b-a117-c06d64cf4725',
        '5c143f86-1f7a-4ea3-bba5-e11a879bae2c',
        '01006de7-e861-45fb-abf4-3c84e609d33b',
        'c45ae1c6-d06a-44b1-99a3-64be8290e414',
        '6fadc863-2307-4e8b-aead-c40dba08e53a',
        'f0f38dba-2fa5-4786-b642-3f97034004c3',
        'aa0911ad-abad-4bac-8b1d-28796bfb3df0',
        '9f39cd68-ed86-4eb3-ab51-5ab02e2e8ecb',
        'ca616c0c-f36d-464d-9cd7-be64cc93fe17',
        'e2c9ee0e-a35f-4fd0-b6b5-bf5f601ecead',
        '4d5963ac-6237-4375-9181-a7e27eed9b01',
        'fb2ca773-ade4-4efa-bc2a-398fbd521d69',
        'cb708ff2-c701-4f02-8873-8306c96edc35',
        '90228422-0a03-4101-ad1c-a0c316ef06f7',
        '579f94f0-9e84-42bb-a659-9bda95d0e01a',
        'a771e34a-fff9-4710-99cb-3d390a268880',
        '16df7702-2dae-41dd-8c6b-727efd252c41',
        '34432e96-b549-4372-8612-825ac740fcbd',
        '8121ecce-e588-45d6-ab8a-dd7313f64b3c',
        '5eaa9d3c-7f54-468c-8753-594402b3a1e0',
        'c46f8421-7efc-4fb3-9b1c-fa67b055dfb6',
        'eebc06b3-0b6d-4a88-9143-88bf5576eec1',
        '21b2d4ea-fa9f-4e9b-b30c-18a001785354',
        'c7423840-afa8-4c81-ac55-205f447b6239',
        '3de6b61d-7a8a-41c3-868e-dd476b755378',
        '7297b64d-8314-4751-a05d-829c255d3627',
        'a361b9b6-a763-47d9-b9ea-acef869f759a',
        'a11c69ee-6510-44e9-be13-0ad393e35661',
        '211c9e0e-f5bc-4f16-b2a8-dd13c6fb899c',
        '2d12562b-e8df-4734-8890-ea517b9878ed',
        'b43f998c-8af8-4809-9f99-57ab2ce91226',
        '5c4e20fa-c58f-44d9-8eca-f42beaa66c78',
        'b4c942da-75ab-49cc-b59a-d80b3ca46403',
        'fd12af39-a479-447e-a293-b013c7b57cda',
        '837699a3-33f1-40cf-9e62-4c0a449f0be4',
        '37e15415-1b06-4fd6-9fc2-48b8899e103a',
        'c37d084c-8a53-4686-bed9-a2c0d00eca6c',
        '7cdaefa8-abd2-4a73-aced-b659d4bcd99c',
        '92c8c288-4685-42e5-a6b4-917bc7bbca80',
        '51c0cd91-1d69-46e6-844c-45b00bfaa0f8',
        '3e892382-10cd-4c4f-a697-2fc1a226d792',
        '69ceab71-a633-4ae1-bfa6-3c7e2227411c',
        '5ebea063-65e6-4e3e-86cc-fd367555c134',
        'b4992827-22a4-49a7-acf1-409a4e1ada3d',
        '00f2e856-27a8-4b8d-9ec3-4e2581c546e4',
        '01da73a6-8715-431b-aaa7-efcd9358c786',
        '91cb3d67-c16b-41f7-99ab-0958c94816cc',
        '21e7142a-bfed-4227-9080-3fd2445c92d9',
        'f9c28959-3e98-4df7-b94c-a570d94e5807',
        'f4b45fdd-e314-440c-9839-da004fdc4f24',
        '0caddd5d-4cdb-460f-8862-7567ebc70420',
        '9d3e727c-d69b-4021-881b-b45e7ce51000',
        '3fb6752b-8438-49e5-b836-294fb8d6c432',
        'd5326edf-05e6-4239-a04f-4d55d928d818',
        '394528b6-0414-48e3-a9d9-882fb321cf0e',
        '03e67e24-6df5-405a-8299-7d797ecee58b',
        'f6821bf3-b65b-4701-879d-4bf1886b9aac',
        '4a3278f5-f74e-47e6-b785-492e85cceaf7',
        'a8101bf9-6f07-46d7-8fbd-7c30785ad6c7',
        '066e7c4c-2e67-449c-80c7-d6bcca2dc1dd',
        'fa18a8fe-5c89-49e2-9121-7cd8d27d9c1f',
        '78b677c8-f21c-4278-b49a-265e3222f4f7',
        '3515ec61-5053-48ff-8d39-39c99870a2f8',
        'dd371bcb-98b0-44b2-bc37-aa35f8f40616',
        'a1dbb6f8-769f-4f72-9e2b-09586f4cefb8',
        'e3afdf2b-1402-479a-9bf2-3c00b2114481',
        '81036bdb-5c5f-4bcf-9baa-24d62f9bdf45',
        '2224111c-348b-4fc3-b685-680898e57c5a',
        '6966e59a-a7ae-4b55-b8f9-c7ef290a2c5a',
        '1842d8a7-630c-4b42-a5b0-e359edd8bf37',
        'a3a600b5-9db0-49e7-b4fb-d577aeda6474',
        'b86f93c8-cd89-4e1d-863e-1604525bf376'
    ]
    for model_uuid in hhnb_models:
        failures = {}
        response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
        if response.status_code != 200:
            failures[model_uuid] = response.json()
        retrieved_model = response.json()
        # todo: add some QA checks here
    assert len(failures) == 0, failures
