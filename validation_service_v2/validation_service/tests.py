import os
from datetime import datetime
from time import sleep
from urllib.parse import urlparse
import logging

from fastapi.testclient import TestClient

from .main import app
from .data_models import BrainRegion, Species

client = TestClient(app)
token = os.environ["VF_TEST_TOKEN"]
AUTH_HEADER = {"Authorization": f"Bearer {token}"}


def check_model(model):
    assert isinstance(model["name"], str)
    assert isinstance(model["description"], str)
    if model["alias"]:
        assert isinstance(model["alias"], str)
        assert " " not in model["alias"]
    for field in ("author", "owner"):
        assert isinstance(model[field], list)
        assert len(model[field]) > 0
        assert "family_name" in model[field][0]
    assert isinstance(model["private"], bool)
    if model["brain_region"]:
        assert model["brain_region"] in [item.value for item in BrainRegion]
    if model["species"]:
        assert model["species"] in [item.value for item in Species]
    if model["images"]:
        assert isinstance(model["images"], list)
        if len(model["images"]) > 0:
            assert "url" in model["images"][0]
            assert "caption" in model["images"][0]
    if model["instances"]:
        check_model_instance(model["instances"][0])


def check_model_instance(model_instance):
    datetime.fromisoformat(model_instance["timestamp"])
    assert isinstance(model_instance["version"], str)
    assert_is_valid_url(model_instance["source"])


def assert_is_valid_url(url):
    try:
        urlparse(url)
    except ValueError:
        raise AssertionError


def test_get_model_by_id_no_auth():
    test_ids = ("00422555-4bdf-49c6-98cc-26fc4f5cc54c",
                "21d03065-38e6-4720-bec6-dec4bdaff812")
    for model_uuid in test_ids:
        response = client.get(f"/models/{model_uuid}")
        assert response.status_code == 403
        assert response.json() == {
            "detail": "Not authenticated"
        }


def test_get_model_by_id(caplog):
    #caplog.set_level(logging.DEBUG)
    test_ids = (
        (True, "00422555-4bdf-49c6-98cc-26fc4f5cc54c"),
        (False, "21d03065-38e6-4720-bec6-dec4bdaff812")
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
    response = client.get(f"/models/")
    assert response.status_code == 403
    assert response.json() == {
        "detail": "Not authenticated"
    }


def test_list_models_nofilters():
    response = client.get(f"/models/?size=5", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)


def test_list_models_filter_by_brain_region():
    response = client.get(f"/models/?size=5&brain_region=hippocampus", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert model["brain_region"] == "hippocampus"


def test_list_models_filter_by_species():
    response = client.get(f"/models/?size=5&species=Rattus%20norvegicus", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert model["species"] == Species.rat  # "Rattus norvegicus"


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


def test_list_models_filter_by_org():
    response = client.get(f"/models/?size=5&organization=HBP-SP4", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert model["organization"] == "HBP-SP4"


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
    response = client.get(f"/models/?size=5&brain_region=hippocampus&author=Migliore", headers=AUTH_HEADER)
    assert response.status_code == 200
    models = response.json()
    assert len(models) == 5
    for model in models:
        check_model(model)
        assert len([author["family_name"] == "Migliore" for author in model["author"]]) > 0
        assert model["brain_region"] == "hippocampus"


def test_create_and_delete_network_model(caplog):
    caplog.set_level(logging.DEBUG)
    now = datetime.now()
    payload = {
        "name": f"TestModel API v2 {now.isoformat()}",
        "alias": f"TestModel-APIv2-{now.isoformat()}",
        "author": [
            {
            "given_name": "Frodo",
            "family_name": "Baggins"
            },
            {
            "given_name": "Tom",
            "family_name": "Bombadil"
            }
        ],
        "owner": [
            {
            "given_name": "Frodo",
            "family_name": "Baggins"
            }
        ],
        "project_id": 52468,
        "organization": "HBP-SGA3-WP5",
        "private": True,
        "species": "Ornithorhynchus anatinus",
        "brain_region": "hippocampus",
        "model_scope": "network",
        "abstraction_level": "spiking neurons: point neuron",
        "cell_type": None,
        "description": "description goes here",
        "images": [
            {
            "caption": "Figure 1",
            "url": "http://example.com/figure_1.png"
            }
        ],
        "instances": [
            {
            "version": "1.23",
            "description": "description of this version",
            "parameters": "{'meaning': 42}",
            "code_format": "Python",
            "source": "http://example.com/my_code.py",
            "license": "MIT"
            }
        ]
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

    # todo: check model no longer exists
    response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 404


def test_create_model_with_invalid_data():
    pass

def test_create_model_with_existing_alias():
    pass

def test_create_model_without_permissions():
    pass

def test_create_duplicate_model():
    pass
