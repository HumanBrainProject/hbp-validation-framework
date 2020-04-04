import os
from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)
token = os.environ["VF_TEST_TOKEN"]
AUTH_HEADER = {"Authorization": f"Bearer {token}"}


def test_get_model_by_id_no_auth():
    model_uuid = "00422555-4bdf-49c6-98cc-26fc4f5cc54c"
    response = client.get(f"/models/{model_uuid}")
    assert response.status_code == 403
    assert response.json() == {
        "detail": "Not authenticated"
    }


def test_get_model_by_id():
    model_uuid = "00422555-4bdf-49c6-98cc-26fc4f5cc54c"
    response = client.get(f"/models/{model_uuid}", headers=AUTH_HEADER)
    assert response.status_code == 200
    # assert response.json() == {
    #     "detail": "Not authenticated"
    # }