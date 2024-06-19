import sys
import json
from pydantic import parse_obj_as

sys.path.append(".")

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
