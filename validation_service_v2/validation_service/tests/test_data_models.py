import sys
from pydantic import parse_obj_as

sys.path.append(".")
from validation_service.data_models import LivePaperDataItem, LivePaperSection, LivePaper, LivePaperSummary
import validation_service.examples

EXAMPLES = validation_service.examples.EXAMPLES



ID_PREFIX = "https://kg.ebrains.eu/api/instances"


class MockKGClient:

    # def user_info(self):
    #     return {
    #         "http://schema.org/familyName": "Holmes",
    #         "http://schema.org/givenName": "Sherlock"
    #     }

    def uri_from_uuid(self, uuid):
        return f"{ID_PREFIX}/{uuid}"

    # def uuid_from_uri(self, uri):
    #     return uri.split("/")[-1]



class TestLivePapers:

    def test_conversion_to_kg_objects(self):
        pydantic_obj = parse_obj_as(LivePaper, EXAMPLES["LivePaper"])
        kg_client = MockKGClient()
        kg_objects = pydantic_obj.to_kg_objects(kg_client)

    #def test_conversion_from_kg_objects(self):

    # def test_roundtrip(self):
    #     pydantic_obj = parse_obj_as(LivePaper, EXAMPLES["LivePaper"])
    #     kg_client = MockKGClient()
    #     kg_objects = pydantic_obj.to_kg_objects(kg_client)

    #     new_pydantic_obj = LivePaper.from_kg_object(
    #         lpv=kg_objects["paper"][0],
    #         lp=kg_objects["paper"][0],  # temporary, to be fixed
    #         kg_client=kg_client)