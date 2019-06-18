


import os
from fairgraph.client import KGClient
from fairgraph.base import as_list
from fairgraph.brainsimulation import ModelProject

token = os.environ["HBP_token"]
client = KGClient(token, nexus_endpoint="https://nexus.humanbrainproject.org/v0")

for i, project in enumerate(ModelProject.list(client, size=10000)):
    owner = as_list(project.owners)[0]
    if project.model_of:
        scope = project.model_of.label
    else:
        scope = "unknown"
    print("\n{:3} {:100} {:30} {:25} {}".format(i, project.name, owner.resolve(client).full_name, scope, project.uuid))
    for instance_proxy in as_list(project.instances):
        instance = instance_proxy.resolve(client)
        print("      - {}".format(instance.name))
        print("        {}".format(instance.main_script.resolve(client).code_location))
