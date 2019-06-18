"""
Mirror people from neuroshapes core to uniminds
"""

import os
import hashlib
from fairgraph.client import KGClient
from fairgraph.core import Person as CorePerson
from fairgraph.uniminds import Person as uPerson

token = os.environ["HBP_token"]
#int_client = KGClient(token, nexus_endpoint="https://nexus-int.humanbrainproject.org/v0")
prod_client = KGClient(token, nexus_endpoint="https://nexus.humanbrainproject.org/v0")


people = CorePerson.list(prod_client, size=10000)


for person in people:
    if person.email is None or "example.com" in person.email:
        email = None
    else:
        email = person.email
    full_name = "{}, {}".format(person.family_name, person.given_name)
    identifier = hashlib.md5(full_name.encode('utf-8')).hexdigest()
    uperson = uPerson(familyName=person.family_name,
                      givenName=person.given_name,
                      email=email,
                      name=full_name,
                      identifier=identifier)
    if uperson.exists(prod_client):
        print("{} exists".format(uperson))
    else:
        response = input("Add {} to production KG? ".format(uperson))
        if response in ('y', 'Y', 'yes'):
            #uperson.save(prod_client)
            print("dryrun - would be Added")
