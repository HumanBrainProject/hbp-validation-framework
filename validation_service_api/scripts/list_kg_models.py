


import sys
import os
from fairgraph.client import KGClient
from fairgraph.base import as_list, KGQuery
from fairgraph.brainsimulation import ModelProject


def lookup_by_old_uuid(old_uuid, client):
    query_filter = {"path": "nsg:providerId", "op": "eq", "value": old_uuid}
    context = {"nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/"}
    query = KGQuery(ModelProject, query_filter, context)
    return query.resolve(client)



def print_model_project(project, index):
    owner = as_list(project.owners)[0]
    if project.model_of:
        scope = project.model_of.label
    else:
        scope = "unknown"
    print("\n{:3} {:100} {:30} {:25} {} {}".format(index, project.name, owner.resolve(client).full_name, scope, project.uuid, project.old_uuid))
    for instance_proxy in as_list(project.instances):
        instance = instance_proxy.resolve(client)
        print("      - {}".format(instance.name))
        print("        {}".format(instance.main_script.resolve(client).code_location))


if __name__ == "__main__":
    token = os.environ["HBP_token"]
    client = KGClient(token, nexus_endpoint="https://nexus.humanbrainproject.org/v0")

    if len(sys.argv) > 1:
        old_uuids = sys.argv[1:]
        for i, uuid in enumerate(old_uuids, 1):
            project = lookup_by_old_uuid(uuid, client)
            if project is None:
                print("\n{:3 } WARNING: project with old UUID {} not found".format(i, uuid))
            else:
                print_model_project(project, i)
    else:
        projects = ModelProject.list(client, size=10000)
        projects.sort(key=lambda prj: prj.name)
        for i, project in enumerate(projects):
            print_model_project(project, i)
