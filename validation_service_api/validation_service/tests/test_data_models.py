import sys
import json
from pydantic import parse_obj_as

sys.path.append(".")
from validation_service.data_models import (
    LivePaperDataItem,
    LivePaperSection,
    LivePaper,
    LivePaperSummary,
)
import validation_service.examples

EXAMPLES = validation_service.examples.EXAMPLES


ID_PREFIX = "https://kg.ebrains.eu/api/instances"


class MockKGResult:
    data = []


class MockKGClient:

    # def user_info(self):
    #     return {
    #         "http://schema.org/familyName": "Holmes",
    #         "http://schema.org/givenName": "Sherlock"
    #     }

    def uri_from_uuid(self, uuid):
        return f"{ID_PREFIX}/{uuid}"

    def uuid_from_uri(self, uri):
        return uri.split("/")[-1]

    def retrieve_query(self, query_label):
        return {"@id": "not_a_real_id", "query_label": query_label}

    def query(
        self, query, filter=None, space=None, from_index=0, size=100, scope="released"
    ):
        return MockKGResult()


class TestLivePapers:
    def test_conversion_to_kg_objects(self):
        pydantic_obj = parse_obj_as(LivePaper, EXAMPLES["LivePaper"])
        kg_client = MockKGClient()
        kg_objects = pydantic_obj.to_kg_objects(kg_client)

    # def test_conversion_from_kg_objects(self):

    # def test_roundtrip(self):
    #     pydantic_obj = parse_obj_as(LivePaper, EXAMPLES["LivePaper"])
    #     kg_client = MockKGClient()
    #     kg_objects = pydantic_obj.to_kg_objects(kg_client)

    #     new_pydantic_obj = LivePaper.from_kg_object(
    #         lpv=kg_objects["paper"][0],
    #         lp=kg_objects["paper"][0],  # temporary, to be fixed
    #         kg_client=kg_client)


class TestLivePaperSummary:
    def test_from_kg_query(self):
        test_data = {
            "@context": {"@vocab": "https://schema.hbp.eu/myQuery/"},
            "alias": "2020-mccauley-et-al",
            "versions": [
                {
                    "modified_date": "2021-08-05T09:07:05.443000+00:00",
                    "lp_doi": "https://doi.org/10.25493/5MAD-5WQ",
                    "related_publication": {
                        "doi": "https://doi.org/10.1016/j.celrep.2020.108255",
                        "citation_data": {
                            "title": "Circadian Modulation of Neurons and Astrocytes Controls Synaptic Plasticity in Hippocampal Area CA1",
                            "pagination": "108255",
                            "is_part_of": {
                                "volume_number": "33",
                                "is_part_of": {"journal": "Cell Reports"},
                            },
                            "authors": [
                                {"given_name": "John P.", "family_name": "McCauley"},
                                {
                                    "given_name": "Maurice A.",
                                    "family_name": "Petroccione",
                                },
                                {"given_name": "Annalisa", "family_name": "Scimemi"},
                            ],
                            "publication_date": "2020-10-01T00:00:00",
                        },
                    },
                    "name": "Circadian Modulation of Neurons and Astrocytes Controls Synaptic Plasticity in Hippocampal Area CA1",
                }
            ],
            "name": "Circadian Modulation of Neurons and Astrocytes Controls Synaptic Plasticity in Hippocampal Area CA1",
            "id": "https://kg.ebrains.eu/api/instances/203d1466-8792-4b05-b546-09ee178387c3",
            "space": "livepapers",
        }
        pydantic_obj = LivePaperSummary.from_kg_query(
            item=test_data, client=MockKGClient()
        )
        assert json.loads(pydantic_obj.json()) == {
            "alias": "2020-mccauley-et-al",
            "associated_paper_title": "Circadian Modulation of Neurons and Astrocytes Controls Synaptic Plasticity in Hippocampal Area CA1",
            "citation": "John P. McCauley, Maurice A. Petroccione & Annalisa Scimemi (2020). Circadian Modulation of Neurons and Astrocytes Controls Synaptic Plasticity in Hippocampal Area CA1. Cell Reports, 33: 108255.",
            "collab_id": "livepapers",
            "detail_path": "/livepapers/203d1466-8792-4b05-b546-09ee178387c3",
            "doi": "https://doi.org/10.25493/5MAD-5WQ",
            "id": "203d1466-8792-4b05-b546-09ee178387c3",
            "live_paper_title": "Circadian Modulation of Neurons and Astrocytes Controls "
            "Synaptic Plasticity in Hippocampal Area CA1",
            "modified_date": "2021-08-05T09:07:05.443000+00:00",
            "year": "2020-10-01",
        }
