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
        "project_id": "52468",
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
        "project_id": 52468,
        "normalized_score": 0.2468
    }


{
    'name': 'Validation results for model e11dfffe-aa30-4747-bee3-25caa2b9cad6 and test 12573fe1-c4a8-467f-89da-1c18eb07df71 with timestamp 2020-04-17T11:48:11.751521',
    'score': 0.1234,
    'normalizedScore': 0.2468,
    'passedValidation': True,
    'dateCreated': '2020-04-17T11:48:11.751521',
    'hadMember': [
        {
            '@id': 'https://nexus.humanbrainproject.org/v0/data/modelvalidation/simulation/analysisresult/v1.0.0/107363e1-c72f-478d-a2e4-08fef50cef6c',
            '@type': ['prov:Entity', 'nsg:Entity', 'nsg:AnalysisResult']
        },
        {
            '@id': 'https://nexus.humanbrainproject.org/v0/data/modelvalidation/core/collection/v0.1.0/2b9781fa-b240-47fb-b23d-3b10ad463286',
            '@type': ['nsg:Collection', 'prov:Entity']
        },
        {
            '@id': None,
            '@type': ['prov:Entity', 'nsg:ValidationResult']
        },
        {
            '@id': None,
            '@type': ['prov:Activity', 'nsg:ModelValidation']
        }
    ],
    'collabID': '52468'
}
