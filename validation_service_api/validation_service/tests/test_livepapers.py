from time import sleep
import requests
import logging

from .fixtures import client, token, AUTH_HEADER, _build_sample_live_paper


def check_live_paper(output, input, mode="summmary"):
    keys = [
        "alias",
        "associated_paper_title",
        "collab_id",
        "doi",
        "id",
        "live_paper_title",
        "modified_date",
        "year",
    ]  # "citation" <-- to fix
    if mode == "full":
        keys += [
            "abstract",
            "associated_paper_doi",
            "journal",
            "license",
            "name",
            "resources_description",
            "url",
            "version",
        ]
    for key in keys:
        if key in input:
            assert output[key] == input[key]
    if mode == "full":
        # check authors
        for key in ("authors", "corresponding_author", "created_author"):
            assert len(output[key]) == len(input[key])
            for person_out, person_in in zip(output[key], input[key]):
                assert person_out["lastname"] == person_in["lastname"]
                assert person_out["firstname"] == person_in["firstname"]
                if "affiliation" in person_in:
                    assert person_out["affiliation"] == person_in["affiliation"]
        # check resources
        assert len(output["resources"]) == len(input["resources"])
        for section_out, section_in in zip(
            sorted(output["resources"], key=lambda sec: sec["order"]),
            sorted(input["resources"], key=lambda sec: sec["order"]),
        ):
            for key in ("description", "title", "type"):  # , "icon"): <-- todo
                assert section_out[key] == section_in[key]
            assert len(section_out["data"]) == len(section_in["data"])
            for data_item_in, data_item_out in zip(
                sorted(section_out["data"], key=lambda item: item["label"]),
                sorted(section_in["data"], key=lambda item: item["label"]),
            ):
                for key in ("label", "type", "url", "view_url"):
                    assert data_item_out[key] == data_item_in[key]


def test_create_and_delete_live_paper(caplog):
    caplog.set_level(logging.DEBUG)

    payload = _build_sample_live_paper()
    # create
    response = client.post(f"/livepapers/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_lp = response.json()
    check_live_paper(posted_lp, payload, mode="summary")

    # check we can retrieve live paper
    sleep(10)  # need to wait a short time to allow KG to become consistent
    lp_uuid = posted_lp["id"]
    response = client.get(f"/livepapers/{lp_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    retrieved_lp = response.json()
    check_live_paper(retrieved_lp, payload, mode="full")

    # delete again
    response = client.delete(f"/livepapers/{lp_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200

    # todo: check lp no longer exists
    response = client.get(f"/livepapers/{lp_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 404


def test_update_live_paper(caplog):
    # caplog.set_level(logging.INFO)
    payload = _build_sample_live_paper()
    # create
    response = client.post(f"/livepapers/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_lp = response.json()
    check_live_paper(posted_lp, payload, mode="summary")

    # make changes
    changes = {
        "alias": payload["alias"] + "-changed",
        "live_paper_title": payload["live_paper_title"] + " (changed)",
        "corresponding_author": [{"firstname": "Frodo", "lastname": "Baggins"}],
        "abstract": "The previous description was too short",
    }
    # update
    updated_payload = payload.copy()
    updated_payload.update(changes)
    response = client.put(
        f"/livepapers/{posted_lp['id']}", json=updated_payload, headers=AUTH_HEADER
    )
    assert response.status_code == 200

    # get updated
    response = client.get(f"/livepapers/{posted_lp['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200
    updated_lp = response.json()
    check_live_paper(updated_lp, updated_payload, mode="full")

    # delete everything
    response = client.delete(f"/livepapers/{posted_lp['id']}", headers=AUTH_HEADER)
    assert response.status_code == 200


def test_minimal_with_existing_author(caplog):
    payload = {
        "id": None,
        "lp_tool_version": "0.2",
        "standalone": True,
        "modified_date": "2023-01-26T08:15:19.132000+00:00",
        "authors": [
            {"firstname": "Andrew", "lastname": "Davison", "affiliation": "NeuroPSI"}
        ],
        "corresponding_author": [
            {"firstname": "Andrew", "lastname": "Davison", "affiliation": "NeuroPSI"}
        ],
        "created_author": [
            {"firstname": "Andrew", "lastname": "Davison", "affiliation": "NeuroPSI"}
        ],
        "approved_author": {
            "firstname": "Andrew",
            "lastname": "Davison",
            "affiliation": "NeuroPSI",
        },
        "year": None,
        "associated_paper_title": None,  # todo: test with empty string "",
        "live_paper_title": "Minimal example of a live paper for testing",
        "doi": None,
        "paper_published": True,
        "journal": None,
        "url": None,
        "citation": None,
        "associated_paper_doi": None,
        "abstract": None,
        "license": "Creative Commons Attribution 4.0 International",
        "collab_id": "model-validation",
        "resources_description": "In this article we demonstrate ...",
        "resources": [],
    }
    response = client.post(f"/livepapers/", json=payload, headers=AUTH_HEADER)
    assert response.status_code == 201
    posted_lp = response.json()
    payload["id"] = posted_lp["id"]
    check_live_paper(posted_lp, payload, mode="summary")
    # delete again
    response = client.delete(f"/livepapers/{posted_lp['id']}", headers=AUTH_HEADER)
