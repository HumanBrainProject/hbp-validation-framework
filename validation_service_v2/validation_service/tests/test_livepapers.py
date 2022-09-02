import os
from datetime import datetime, timezone
from time import sleep
from urllib.parse import urlparse
import requests
import logging

from fastapi import status

import pytest

from .fixtures import client, token, AUTH_HEADER



def test_migration():
    alias = "2016-eyal-et-al"
    new = client.get(f"/livepapers/{alias}", headers=AUTH_HEADER)
    old = requests.get(f"https://validation-v2.brainsimulation.eu/livepapers/{alias}", headers=AUTH_HEADER)
    assert new.json() == old.json()
