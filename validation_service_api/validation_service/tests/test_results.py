import os
from uuid import UUID
from datetime import datetime
from urllib.parse import urlparse
import logging
from time import sleep

from fastapi import status

from .fixtures import (
    _build_sample_model,
    _build_sample_validation_test,
    _build_sample_result,
    client,
    token,
    AUTH_HEADER,
)


logger = logging.getLogger("validation_service_api")


def assert_is_valid_url(url):
    try:
        urlparse(url)
    except ValueError:
        raise AssertionError


def check_validation_result(result):
    datetime.fromisoformat(result["timestamp"])
    UUID(result["model_instance_id"])
    UUID(result["test_instance_id"])
    for item in result["results_storage"]:
        assert_is_valid_url(item["download_url"])
    assert isinstance(result["score"], float)
    if result["passed"]:
        assert isinstance(result["passed"], bool)
    if result["normalized_score"]:
        assert isinstance(result["normalized_score"], float)


def check_validation_result_summary(result):
    datetime.fromisoformat(result["timestamp"])
    UUID(result["model_instance_id"])
    UUID(result["test_instance_id"])
    UUID(result["id"])
    UUID(result["model_id"])
    UUID(result["test_id"])
    assert isinstance(result["model_name"], str)
    assert isinstance(result["test_name"], str)
    assert isinstance(result["score"], float)
    if result["score_type"]:
        assert isinstance(result["score_type"], str)



def test_list_results_no_auth():
    response = client.get(f"/results/")
    assert response.status_code == 403
    assert response.json() == {"detail": "Not authenticated"}


def test_list_results_summary_no_auth():
    response = client.get(f"/results-summary/")
    assert response.status_code == 403
    assert response.json() == {"detail": "Not authenticated"}


def test_list_results_nofilters():
    response = client.get(f"/results/?size=10", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 10
    for result in validation_results:
        check_validation_result(result)


def test_list_results_nofilters():
    response = client.get(f"/results-summary/?size=10", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 10
    for result in validation_results:
        check_validation_result_summary(result)


def test_list_results_filter_by_model_id():
    model_uuid = "528ec0e6-2f21-413c-9abd-d131f7150882"
    response = client.get(f"/results/?size=5&model_id={model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 5
    response2 = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    model_project = response2.json()
    model_instance_ids = [inst["id"] for inst in model_project["instances"]]
    for validation_result in validation_results:
        check_validation_result(validation_result)
        assert validation_result["model_instance_id"] in model_instance_ids


def test_list_results_filter_by_model_alias():
    model_alias = "bianchi_2012"
    response = client.get(f"/results/?size=5&model_alias={model_alias}", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 5
    response2 = client.get(f"/models/{model_alias}", headers=AUTH_HEADER)
    model_project = response2.json()
    model_instance_ids = [inst["id"] for inst in model_project["instances"]]
    for validation_result in validation_results:
        check_validation_result(validation_result)
        assert validation_result["model_instance_id"] in model_instance_ids


def test_list_results_filter_by_model_instance_id():
    model_instance_uuid = "403d865e-417c-45fe-97cf-83a9613ae664"
    response = client.get(
        f"/results/?size=5&model_instance_id={model_instance_uuid}", headers=AUTH_HEADER
    )
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 5
    for validation_result in validation_results:
        check_validation_result(validation_result)
        assert validation_result["model_instance_id"] == model_instance_uuid


def test_list_results_summary_filter_by_model_instance_id():
    model_instance_uuid = "403d865e-417c-45fe-97cf-83a9613ae664"
    response = client.get(
        f"/results-summary/?size=5&model_instance_id={model_instance_uuid}", headers=AUTH_HEADER
    )
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 5
    for validation_result in validation_results:
        check_validation_result_summary(validation_result)
        assert validation_result["model_instance_id"] == model_instance_uuid


def test_list_results_filter_by_test_id():
    test_uuid = "100abccb-6d30-4c1e-a960-bc0489e0d82d"
    response = client.get(f"/results/?size=5&test_id={test_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 5
    response2 = client.get(f"/tests/{test_uuid}", headers=AUTH_HEADER)
    test_definition = response2.json()
    test_instance_ids = [inst["id"] for inst in test_definition["instances"]]
    for validation_result in validation_results:
        check_validation_result(validation_result)
        assert validation_result["test_instance_id"] in test_instance_ids


def test_list_results_filter_by_test_instance_id():
    test_code_uuid = "1d22e1c0-5a74-49b4-b114-41d233d3250a"
    response = client.get(
        f"/results/?size=5&test_instance_id={test_code_uuid}", headers=AUTH_HEADER
    )
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 5
    for validation_result in validation_results:
        check_validation_result(validation_result)
        assert validation_result["test_instance_id"] == test_code_uuid


def test_list_results_summary_filter_by_test_instance_id():
    test_code_uuid = "1d22e1c0-5a74-49b4-b114-41d233d3250a"
    response = client.get(
        f"/results-summary/?size=5&test_instance_id={test_code_uuid}", headers=AUTH_HEADER
    )
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 5
    for validation_result in validation_results:
        check_validation_result_summary(validation_result)
        assert validation_result["test_instance_id"] == test_code_uuid


def test_list_results_filter_by_test_alias():
    test_alias = "hippo_somafeat_CA1_pyr_cACpyr"
    response = client.get(f"/results/?size=5&test_alias={test_alias}", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 5
    response2 = client.get(f"/tests/{test_alias}", headers=AUTH_HEADER)
    test_definition = response2.json()
    test_instance_ids = [inst["id"] for inst in test_definition["instances"]]
    for validation_result in validation_results:
        check_validation_result(validation_result)
        assert validation_result["test_instance_id"] in test_instance_ids


def test_get_result_by_id_no_auth():
    test_ids = ("2cd2576e-a72f-4c30-a600-a5ae79bdd20b", "2b8a9066-a2f2-4e48-8bad-7c7aab19af41")
    for result_uuid in test_ids:
        response = client.get(f"/results/{result_uuid}")
        assert response.status_code == 403
        assert response.json() == {"detail": "Not authenticated"}


def test_get_result_by_id(caplog):
    # caplog.set_level(logging.DEBUG)
    #test_ids = ("2cd2576e-a72f-4c30-a600-a5ae79bdd20b", "2b8a9066-a2f2-4e48-8bad-7c7aab19af41")
    test_ids = ("2f44a1b5-ae88-45ff-be0a-c7e37c199eb1", "568eea1f-03c3-49fc-9b81-8267a103f199")
    for result_uuid in test_ids:
        response = client.get(f"/results/{result_uuid}", headers=AUTH_HEADER)
        assert response.status_code == 200
        result = response.json()
        assert result["id"] == result_uuid
        check_validation_result(result)


def test_list_results_with_test_and_model():
    response = client.get(f"/results-extended/?size=10", headers=AUTH_HEADER)
    assert response.status_code == 200
    validation_results = response.json()
    assert len(validation_results) == 10
    for result in validation_results:
        check_validation_result(result)
        assert "model" in result
        assert "model_instance" in result
        assert "test" in result
        assert "test_instance" in result


def test_get_result_with_test_and_model_by_id(caplog):
    # caplog.set_level(logging.DEBUG)
    #test_ids = ("2cd2576e-a72f-4c30-a600-a5ae79bdd20b", "2b8a9066-a2f2-4e48-8bad-7c7aab19af41")
    test_ids = ("2f44a1b5-ae88-45ff-be0a-c7e37c199eb1", "568eea1f-03c3-49fc-9b81-8267a103f199")
    for result_uuid in test_ids:
        response = client.get(f"/results-extended/{result_uuid}", headers=AUTH_HEADER)
        assert response.status_code == 200
        result = response.json()
        assert result["id"] == result_uuid
        check_validation_result(result)
        assert "model" in result
        assert "model_instance" in result
        assert "test" in result
        assert "test_instance" in result


def test_create_and_delete_validation_result(caplog):
    caplog.set_level(logging.INFO)
    # create model and test
    response = client.post("/models/", json=_build_sample_model(), headers=AUTH_HEADER)
    assert response.status_code == 201
    model = response.json()
    response = client.post("/tests/", json=_build_sample_validation_test(), headers=AUTH_HEADER)
    assert response.status_code == 201
    validation_test = response.json()

    # create result
    logger.info("Creating sample result")
    payload = _build_sample_result(
        model["instances"][0]["id"], validation_test["instances"][0]["id"]
    )
    logger.info(f"Payload = {payload}")
    response = client.post("/results/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_result = response.json()
    check_validation_result(posted_result)

    sleep(30)

    # retrieve result
    response = client.get(f"/results/{posted_result['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_result = response.json()
    assert retrieved_result == posted_result

    # delete everything
    response = client.delete(f"/models/{model['id']}", headers=AUTH_HEADER)
    response = client.delete(f"/tests/{validation_test['id']}", headers=AUTH_HEADER)
    response = client.delete(f"/results/{posted_result['id']}", headers=AUTH_HEADER)
