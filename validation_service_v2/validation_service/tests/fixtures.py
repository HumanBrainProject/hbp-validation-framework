import os
from datetime import datetime, timezone
from fastapi.testclient import TestClient

from ..main import app

client = TestClient(app)
token = os.environ["VF_TEST_TOKEN"]
AUTH_HEADER = {"Authorization": f"Bearer {token}"}


def _build_sample_model():
    now = datetime.now(timezone.utc)
    return {
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
        "project_id": "model-validation",
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


def _build_sample_validation_test():
    now = datetime.now(timezone.utc)
    return {
        "name": f"TestValidationTestDefinition API v2 {now.isoformat()}",
        "alias": f"TestValidationTestDefinition-APIv2-{now.isoformat()}",
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
        "status": "proposal",
        "species": "Mus musculus",
        "brain_region": "hippocampus",
        "cell_type": "hippocampus CA1 pyramidal cell",
        "description": "description goes here",
        "data_location": ["http://example.com/my_data.csv"],
        "data_type": "csv",
        "data_modality": "electrophysiology",
        "test_type": "single cell activity",
        "score_type": "z-score",
        "instances": [
            {
            "version": "1.23",
            "description": "description of this version",
            "parameters": "{'meaning': 42}",
            "path": "mylib.tests.MeaningOfLifeTest",
            "repository": "http://example.com/my_code.py"
            }
        ]
    }


def _build_sample_result(model_instance_id, test_instance_id):
    now = datetime.now(timezone.utc)
    return {
        "model_version_id": model_instance_id,
        "test_code_id": test_instance_id,
        "results_storage": [f"http://example.com/validation_result_{now.strftime('%Y%m%d-%H%M%S')}"],
        "score": 0.1234,
        "passed": True,
        "project_id": "model-validation",
        "normalized_score": 0.2468
    }
