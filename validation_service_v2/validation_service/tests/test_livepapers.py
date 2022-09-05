from operator import iconcat
import os
from datetime import datetime, timezone
from time import sleep
from urllib.parse import urlparse
from matplotlib.pyplot import title
import requests
import logging

from fastapi import status

import pytest

from .fixtures import client, token, AUTH_HEADER


def test_migration():
    alias = "2016-eyal-et-al"
    new = client.get(f"/livepapers/{alias}", headers=AUTH_HEADER).json()
    old = requests.get(f"https://validation-v2.brainsimulation.eu/livepapers/{alias}",
                       headers=AUTH_HEADER).json()
    for key in ("abstract", "alias", "associated_paper_doi", "associated_paper_title", "doi", "id",
                "journal", "live_paper_title", "modified_date", "resources_description", "url",
                "year"):
        assert new[key] == old[key]
    for key in ("created_author", "corresponding_author", "authors"):
        assert len(new[key]) == len(old[key])
        assert new[key][0]["lastname"] == old[key][0]["lastname"]
        assert new[key][0]["firstname"] == old[key][0]["firstname"]

    assert new["license"] is not None
    assert new["citation"] is not None
    # iterate over sections
    for new_section, old_section in zip(
        sorted(new["resources"], key=lambda sec: sec["order"]),
        sorted(old["resources"], key=lambda sec: sec["order"])
    ):
        for key in ("description", "icon", "title", "type"):
            assert new_section["description"] == old_section["description"]
        # iterate over data items
        for new_item, old_item in zip(
            sorted(new_section["data"], key=lambda item: item["label"]),
            sorted(old_section["data"], key=lambda item: item["label"]),
        ):
            for key in ("type", "url", "view_url"):
                assert new_item[key] == old_item[key]
