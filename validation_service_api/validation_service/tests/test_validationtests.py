import os
from datetime import datetime
from time import sleep
from urllib.parse import urlparse
import logging

from fastapi import status
import pytest

from ..data_models import (
    BrainRegion,
    Species,
    ImplementationStatus,
    ModelScope,
    ScoreType,
    RecordingModality
)
from .fixtures import _build_sample_validation_test, client, token, AUTH_HEADER


def check_validation_test(test_definition, expected_instances=0):
    assert isinstance(test_definition["name"], str)
    assert isinstance(test_definition["project_id"], str)
    assert isinstance(test_definition["description"], str)
    if test_definition["alias"]:
        assert isinstance(test_definition["alias"], str)
        assert " " not in test_definition["alias"]
    assert isinstance(test_definition["author"], list)
    assert len(test_definition["author"]) > 0
    assert "family_name" in test_definition["author"][0]
    if test_definition["brain_region"]:
        assert test_definition["brain_region"] in [item.value for item in BrainRegion]
    if test_definition["species"]:
        assert test_definition["species"] in [item.value for item in Species]
    assert test_definition["implementation_status"] in [item.value for item in ImplementationStatus]
    if test_definition["score_type"]:
        assert test_definition["score_type"] in [item.value for item in ScoreType]
    if test_definition["test_type"]:
        assert test_definition["test_type"] in [item.value for item in ModelScope]
    if test_definition["recording_modality"]:
        assert test_definition["recording_modality"] in [item.value for item in RecordingModality]
    if test_definition["data_location"]:
        for url in test_definition["data_location"]:
            assert_is_valid_url(url)
    if expected_instances:
        assert len(test_definition["instances"]) == expected_instances
    if test_definition["instances"]:
        check_validation_test_instance(test_definition["instances"][0])


def check_validation_test_instance(test_instance):
    if test_instance["timestamp"]:
        datetime.fromisoformat(test_instance["timestamp"])
    assert isinstance(test_instance["version"], str)
    assert_is_valid_url(test_instance["repository"])


def assert_is_valid_url(url):
    try:
        urlparse(url)
    except ValueError:
        raise AssertionError


def test_get_validation_test_by_id_no_auth():
    test_ids = ("90ae68fa-a9e6-49dd-947a-908ab9a6dee2",)
    for validation_test_uuid in test_ids:
        response = client.get(f"/tests/{validation_test_uuid}")
        assert response.status_code == 200
        validation_test = response.json()
        check_validation_test(validation_test)
        assert validation_test["implementation_status"] == "published"


def test_get_validation_test_by_id(caplog):
    # caplog.set_level(logging.DEBUG)
    test_ids = {
        "public": ["100abccb-6d30-4c1e-a960-bc0489e0d82d"],
        "private": ["01c68387-fcc4-4fd3-85f0-6eb8ce4467a1"]
    }
    for validation_test_uuid in test_ids["public"]:
        # first is public, second is private
        # todo: test with a second user, who does have access to the private test
        response = client.get(f"/tests/{validation_test_uuid}", headers=AUTH_HEADER)
        assert response.status_code == 200
        validation_test = response.json()
        check_validation_test(validation_test)
    for validation_test_uuid in test_ids["private"]:
        # first is public, second is private
        # todo: test with a second user, who does have access to the private test
        response = client.get(f"/tests/{validation_test_uuid}", headers=AUTH_HEADER)
        assert response.status_code == 400


def test_list_validation_tests_no_auth():
    response = client.get(f"/tests/")
    assert response.status_code == 200
    validation_tests = response.json()
    for validation_test in validation_tests:
        check_validation_test(validation_test)
        assert validation_test["implementation_status"] == "published"


def test_list_validation_tests_nofilters():
    response = client.get(f"/tests/?size=5", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_tests = response.json()
    assert len(validation_tests) == 5
    for validation_test in validation_tests:
        check_validation_test(validation_test)


def test_list_validation_tests_filter_by_brain_region():
    response = client.get(f"/tests/?size=5&brain_region=CA1%20field%20of%20hippocampus", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_tests = response.json()
    assert len(validation_tests) > 0
    for validation_test in validation_tests:
        check_validation_test(validation_test)
        assert validation_test["brain_region"] == "CA1 field of hippocampus"


def test_list_validation_tests_filter_by_species():
    response = client.get(f"/tests/?size=5&species=Rattus%20norvegicus", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_tests = response.json()
    assert len(validation_tests) == 5
    for validation_test in validation_tests:
        check_validation_test(validation_test)
        assert validation_test["species"] == "Rattus norvegicus"


def test_list_validation_tests_filter_by_cell_type():
    response = client.get(f"/tests/?size=5&cell_type=hippocampus%20CA1%20pyramidal%20neuron", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_tests = response.json()
    assert len(validation_tests) == 5
    for validation_test in validation_tests:
        check_validation_test(validation_test)
        assert validation_test["cell_type"] == "hippocampus CA1 pyramidal neuron"


def test_list_validation_tests_filter_by_author():
    response = client.get(f"/tests/?size=5&author=Appukuttan", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_tests = response.json()
    assert len(validation_tests) == 5
    for validation_test in validation_tests:
        check_validation_test(validation_test)
        assert (
            len([author["family_name"] == "Appukuttan" for author in validation_test["author"]])
            > 0
        )


def test_list_validation_tests_filter_by_brain_region_and_authors():
    response = client.get(
        f"/tests/?size=5&brain_region=CA1%20field%20of%20hippocampus&author=Appukuttan", headers=AUTH_HEADER
    )
    assert response.status_code == 200
    validation_tests = response.json()
    assert len(validation_tests) > 0
    for validation_test in validation_tests:
        check_validation_test(validation_test)
        assert (
            len([author["family_name"] == "Appukuttan" for author in validation_test["author"]])
            > 0
        )
        assert validation_test["brain_region"] == "CA1 field of hippocampus"


def test_create_and_delete_validation_test_definition(caplog):
    caplog.set_level(logging.DEBUG)

    payload = _build_sample_validation_test()
    # create
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_validation_test = response.json()
    check_validation_test(posted_validation_test, expected_instances=len(payload["instances"]))


    # check we can retrieve validation_test
    sleep(15)  # need to wait a short time to allow Nexus to become consistent
    validation_test_uuid = posted_validation_test["id"]
    response = client.get(f"/tests/{validation_test_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_validation_test = response.json()
    assert retrieved_validation_test == posted_validation_test
    assert retrieved_validation_test["data_location"] == payload["data_location"]

    # delete again
    response = client.delete(f"/tests/{validation_test_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200

    # todo: check validation_test no longer exists
    response = client.get(f"/tests/{validation_test_uuid}", headers=AUTH_HEADER)
    assert response.status_code in (400, 404)


def test_create_validation_test_with_invalid_data():
    # missing required validation_test project fields
    for required_field in ("name", "author", "description"):
        payload = _build_sample_validation_test()
        del payload[required_field]
        response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
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
    # missing required validation_test instance fields
    for required_field in ("version",):
        payload = _build_sample_validation_test()
        del payload["instances"][0][required_field]
        response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
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
    payload = _build_sample_validation_test()
    payload["species"] = "klingon"
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    err_msg = response.json()["detail"]
    assert err_msg[0]["loc"] == ["body", "species"]
    assert err_msg[0]["msg"].startswith("value is not a valid enumeration member")
    assert err_msg[0]["type"] == "type_error.enum"
    # invalid URL
    payload = _build_sample_validation_test()
    payload["instances"][0]["repository"] = "/filesystem/path/to/doc.txt"
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "instances", 0, "repository"],
                "msg": "invalid or missing URL scheme",
                "type": "value_error.url.scheme",
            }
        ]
    }
    # incorrectly formatted "author" field
    payload = _build_sample_validation_test()
    payload["author"] = ["Thorin Oakenshield"]
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert response.json() == {
        "detail": [
            {
                "loc": ["body", "author", 0],
                "msg": "value is not a valid dict",
                "type": "type_error.dict",
            }
        ]
    }


def test_create_validation_test_with_existing_alias():
    payload = _build_sample_validation_test()
    payload["alias"] = "bpo_efel"
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_409_CONFLICT
    assert response.json() == {
        "detail": "Another validation test with alias 'bpo_efel' already exists."
    }


def test_create_validation_test_no_alias(caplog):
    payload = _build_sample_validation_test()
    payload.pop("alias")
    # create
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_validation_test = response.json()
    check_validation_test(posted_validation_test)

    # delete validation_test
    response = client.delete(f"/tests/{posted_validation_test['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200


@pytest.mark.skip  # this needs some more thought - maybe change openMINDS schema to add creation date?
def test_create_duplicate_validation_test(caplog):
    # Creating two validation_tests with the same name and date_created fields is not allowed
    # caplog.set_level(logging.INFO)
    payload = _build_sample_validation_test()
    payload["alias"] = None  # otherwise we'll get an error message about the alias instead
    # create
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_validation_test = response.json()
    check_validation_test(posted_validation_test)

    # try to create the same again, copying the date_created from the original
    payload["date_created"] = posted_validation_test["date_created"]
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == status.HTTP_409_CONFLICT
    assert response.json() == {
        "detail": "Another validation test with the same name and timestamp already exists."
    }

    # delete first validation_test
    response = client.delete(f"/tests/{posted_validation_test['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200

    # todo: now try to create same again - should now work (set deprecated from True to False)


def test_update_validation_test(caplog):
    # caplog.set_level(logging.INFO)
    payload = _build_sample_validation_test()
    # create
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_validation_test = response.json()
    check_validation_test(posted_validation_test)
    # make changes
    sleep(15)  # need to wait a short time to allow Nexus to become consistent
    changes = {
        "alias": posted_validation_test["alias"] + "-changed",
        "name": posted_validation_test["name"]
        + " (changed)",  # as long as date_created is not changed, name can be
        "author": [{"given_name": "Tom", "family_name": "Bombadil"}],
        "recording_modality": "functional magnetic resonance imaging",
        "description": "The previous description was too short",
        #"implementation_status": "published"
    }
    # update
    response = client.put(
        f"/tests/{posted_validation_test['id']}", json=changes, headers=AUTH_HEADER
    )
    assert response.status_code == 200
    updated_validation_test = response.json()
    check_validation_test(updated_validation_test)

    assert posted_validation_test["id"] == updated_validation_test["id"]
    assert posted_validation_test["instances"] == updated_validation_test["instances"]
    assert updated_validation_test["recording_modality"] != payload["recording_modality"]
    assert updated_validation_test["recording_modality"] == changes["recording_modality"] == "functional magnetic resonance imaging"
    #assert updated_validation_test["implementation_status"] == changes["implementation_status"] == "published"

    # delete validation_test
    response = client.delete(f"/tests/{posted_validation_test['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_update_validation_test_with_invalid_data():
    payload = _build_sample_validation_test()
    # create
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_validation_test = response.json()
    check_validation_test(posted_validation_test)
    # mix valid and invalid changes
    # none of them should be applied
    changes = {
        "alias": posted_validation_test["alias"] + "-changed",
        "name": posted_validation_test["name"]
        + " (changed)",  # as long as date_created is not changed, name can be
        "author": None,  # invalid
        "recording_modality": "foo",  # invalid
        "description": None,  # invalid
    }
    response = client.put(
        f"/tests/{posted_validation_test['id']}", json=changes, headers=AUTH_HEADER
    )
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    errmsg = response.json()["detail"]
    assert set([part["loc"][-1] for part in errmsg]) == set(
        ["author", "recording_modality", "description"]
    )

    # delete validation_test
    response = client.delete(f"/tests/{posted_validation_test['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_changing_to_invalid_alias():
    # expect 409
    payload = _build_sample_validation_test()
    # create
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_validation_test = response.json()
    check_validation_test(posted_validation_test)

    changes = {"alias": "bpo_efel"}
    response = client.put(
        f"/tests/{posted_validation_test['id']}", json=changes, headers=AUTH_HEADER
    )
    assert response.status_code == status.HTTP_409_CONFLICT
    assert (
        response.json()["detail"]
        == "Another validation test with alias 'bpo_efel' already exists."
    )

    # delete validation_test
    response = client.delete(f"/tests/{posted_validation_test['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_list_validation_test_instances_by_validation_test_id():
    #validation_test_uuid = "01c68387-fcc4-4fd3-85f0-6eb8ce4467a1"  # private
    validation_test_uuid = "100abccb-6d30-4c1e-a960-bc0489e0d82d"  # public
    response1 = client.get(f"/tests/{validation_test_uuid}", headers=AUTH_HEADER)
    assert response1.status_code == 200
    test_definition = response1.json()
    response2 = client.get(f"/tests/{validation_test_uuid}/instances/", headers=AUTH_HEADER)
    assert response2.status_code == 200
    validation_test_instances = response2.json()
    assert len(validation_test_instances) > 0

    assert test_definition["instances"] == validation_test_instances


def test_get_validation_test_instance_by_id():
    #instance_uuid = "46e376a8-8c46-44ce-aa76-020d35114703"  # private
    instance_uuid = "1d22e1c0-5a74-49b4-b114-41d233d3250a"   # public
    response = client.get(f"/tests/query/instances/{instance_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_test_instance = response.json()
    check_validation_test_instance(validation_test_instance)


def test_get_validation_test_instance_by_test_id_and_id():
    #validation_test_uuid = "01c68387-fcc4-4fd3-85f0-6eb8ce4467a1"  # private
    #instance_uuid = "46e376a8-8c46-44ce-aa76-020d35114703"         # private
    validation_test_uuid = "100abccb-6d30-4c1e-a960-bc0489e0d82d"   # public
    instance_uuid = "1d22e1c0-5a74-49b4-b114-41d233d3250a"          # public
    response = client.get(
        f"/tests/{validation_test_uuid}/instances/{instance_uuid}", headers=AUTH_HEADER
    )
    assert response.status_code == 200
    validation_test_instance = response.json()
    check_validation_test_instance(validation_test_instance)


def test_get_validation_test_instance_by_test_id_and_version():
    validation_test_uuid = "100abccb-6d30-4c1e-a960-bc0489e0d82d"
    expected_instances = [
        {"instance_uuid": "1d22e1c0-5a74-49b4-b114-41d233d3250a", "version": "1.0"},
        {"instance_uuid": "b645536f-fd2c-4a84-9e3e-9372018fbe5d", "version": "1.3.5"},
    ]
    for test_case in expected_instances:
        response = client.get(
            f"/tests/{validation_test_uuid}/instances/?version={test_case['version']}",
            headers=AUTH_HEADER,
        )
        assert response.status_code == 200
        validation_test_instances = response.json()
        assert len(validation_test_instances) == 1
        validation_test_instance = validation_test_instances[0]
        check_validation_test_instance(validation_test_instance)
        assert validation_test_instance["id"] == test_case["instance_uuid"]


# def test_get_validation_test_instance_latest_by_test_id():
#     validation_test_uuid = "100abccb-6d30-4c1e-a960-bc0489e0d82d"
#     expected_instance_uuid = "b645536f-fd2c-4a84-9e3e-9372018fbe5d"

#     response = client.get(f"/tests/{validation_test_uuid}/instances/latest", headers=AUTH_HEADER)
#     assert response.status_code == 200
#     validation_test_instance = response.json()
#     check_validation_test_instance(validation_test_instance)
#     assert validation_test_instance["id"] == expected_instance_uuid


def test_create_validation_test_instance():
    payload = _build_sample_validation_test()
    # create
    response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_validation_test = response.json()
    check_validation_test(posted_validation_test, expected_instances=len(payload["instances"]))
    validation_test_uuid = posted_validation_test["id"]

    # now add a new instance
    payload2 = {
        "version": "1.24",
        "description": "description of this version",
        "parameters": "http://example.com/my_parameters.py",
        "path": "mylib.tests.MeaningOfLifeTest",
        "repository": "http://example.com/my_code.py",
    }
    response = client.post(
        f"/tests/{validation_test_uuid}/instances/", json=payload2, headers=AUTH_HEADER
    )
    assert response.status_code == status.HTTP_201_CREATED

    # now retrieve the test and check we have both instances
    sleep(15)  # need to wait a short time to allow Nexus to become consistent
    response = client.get(f"/tests/{validation_test_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_test = response.json()
    assert len(retrieved_test["instances"]) == 2
    assert retrieved_test["instances"][1]["version"] == payload2["version"]

    # delete again
    response = client.delete(f"/tests/{validation_test_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200


# def test_create_validation_test_instance_with_duplicate_version_and_parameters():
#     payload = _build_sample_validation_test()
#     # create
#     response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
#     assert response.status_code == 201
#     posted_validation_test = response.json()
#     check_validation_test(posted_validation_test, expected_instances=len(payload["instances"]))
#     validation_test_uuid = posted_validation_test["id"]

#     # now try to add a duplicate instance
#     sleep(30)
#     payload2 = payload["instances"][0]
#     response = client.post(
#         f"/tests/{validation_test_uuid}/instances/", json=payload2, headers=AUTH_HEADER
#     )
#     assert response.status_code == status.HTTP_409_CONFLICT

#     # delete test
#     response = client.delete(f"/tests/{validation_test_uuid}", headers=AUTH_HEADER)
#     assert response.status_code == 200


# def test_create_validation_test_instance_with_duplicate_version_different_parameters():
#     payload = _build_sample_validation_test()
#     # create
#     response = client.post(f"/tests/", json=payload, headers=AUTH_HEADER)
#     assert response.status_code == 201
#     posted_validation_test = response.json()
#     check_validation_test(posted_validation_test, expected_instances=len(payload["instances"]))
#     validation_test_uuid = posted_validation_test["id"]

#     # now add a new instance with same version but changed parameters
#     sleep(20)
#     payload2 = payload["instances"][0]
#     payload2["parameters"] = "http://example.com/my_changed_parameters.py",
#     response = client.post(
#         f"/tests/{validation_test_uuid}/instances/", json=payload2, headers=AUTH_HEADER
#     )
#     assert response.status_code == status.HTTP_201_CREATED

#     # delete test
#     response = client.delete(f"/tests/{validation_test_uuid}", headers=AUTH_HEADER)
#     assert response.status_code == 200


def test_update_test_instance():
    # first create a test project
    payload1 = _build_sample_validation_test()
    response = client.post(f"/tests/", json=payload1, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_test = response.json()
    check_validation_test(posted_test)
    assert len(posted_test["instances"]) == 1
    test_uuid = posted_test["id"]
    test_instance_uuid = posted_test["instances"][0]["id"]

    # now edit the instance
    payload2 = {
        "description": "a more detailed description of this version",
        "repository": "http://example.com/my_code_in_a_new_location.py",
    }
    response = client.put(
        f"/tests/{test_uuid}/instances/{test_instance_uuid}", json=payload2, headers=AUTH_HEADER
    )
    assert response.status_code == 200

    # now retrieve the test and check the instance has been updated
    sleep(15)  # need to wait a short time to allow Nexus to become consistent
    response = client.get(f"/tests/{test_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_test = response.json()
    assert len(retrieved_test["instances"]) == 1
    assert (
        retrieved_test["instances"][0]["version"] == payload1["instances"][0]["version"]
    )  # should be unchanged
    assert retrieved_test["instances"][0]["repository"] == payload2["repository"]
    assert retrieved_test["instances"][0]["description"] == payload2["description"]

    # delete again
    response = client.delete(f"/tests/{test_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200


# def test_update_test_instance_version():
#     # first create a test project
#     payload1 = _build_sample_validation_test()
#     response = client.post(f"/tests/", json=payload1, headers=AUTH_HEADER)
#     assert response.status_code == 201
#     posted_test = response.json()
#     check_validation_test(posted_test)
#     assert len(posted_test["instances"]) == 1
#     test_uuid = posted_test["id"]
#     test_instance_uuid = posted_test["instances"][0]["id"]

#     # now edit the instance
#     payload2 = {"version": "1.24"}
#     response = client.put(
#         f"/tests/{test_uuid}/instances/{test_instance_uuid}", json=payload2, headers=AUTH_HEADER
#     )
#     assert response.status_code == 200

#     # now retrieve the test and check the instance has been updated
#     sleep(15)  # need to wait a short time to allow Nexus to become consistent
#     response = client.get(f"/tests/{test_uuid}", headers=AUTH_HEADER)
#     assert response.status_code == 200
#     retrieved_test = response.json()
#     assert len(retrieved_test["instances"]) == 1
#     assert retrieved_test["instances"][0]["version"] == "1.24"

#     # delete again
#     response = client.delete(f"/tests/{test_uuid}", headers=AUTH_HEADER)
#     assert response.status_code == 200
