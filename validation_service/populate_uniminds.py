"""


"""


import requests
import os
import logging
from logging.config import dictConfig
import hashlib

from fairgraph.client import KGClient
from fairgraph.base import KGQuery, as_list
from fairgraph.uniminds import ModelRelease, FileBundle, Person as uPerson
from fairgraph.brainsimulation import ModelProject, ModelInstance


logging_config = dict(
    version = 1,
    formatters = {
        'f': {'format':
              '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'}
    },
    handlers = {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'fairgraph.log',
            'formatter': 'f'
        }
    },
    loggers = {
        'openid_http_client.http_client': {
            'handlers': ['file'],
            'level': 'DEBUG',
        },
        'kg_migration': {
            'handlers': ['file'],
            'level': 'DEBUG',
        },
        'fairgraph': {
            'handlers': ['file'],
            'level': 'DEBUG',
        }
    }
)

dictConfig(logging_config)


token = os.environ["HBP_token"]
prefix = "https://kg.humanbrainproject.org/query/uniminds/options/"
suffix = "/instances?vocab=https://schema.hbp.eu/myQuery/"
headers = {"Authorization": "Bearer {}".format(token)}

res = requests.get(prefix + "abstractionlevel/v1.0.0/abstractionLevel" + suffix,
                   headers=headers)
uniminds_abstraction_level_lookup = {entry["name"]: entry["@id"]
                                     for entry in res.json()["results"]}
res = requests.get(prefix + "species/v1.0.0/species" + suffix,
                   headers=headers)
uniminds_species_lookup = {entry["name"]: entry["@id"]
                           for entry in res.json()["results"]}
res = requests.get(prefix + "brainstructure/v1.0.0/brainStructure" + suffix,
                   headers=headers)
uniminds_brain_structure_lookup = {entry["name"]: entry["@id"]
                                   for entry in res.json()["results"]}
uniminds_brain_structure_lookup["whole brain"] = uniminds_brain_structure_lookup["Whole brain"]
res = requests.get(prefix + "modelscope/v1.0.0/modelScope" + suffix,
                   headers=headers)
uniminds_model_scope_lookup = {entry["name"]: entry["@id"]
                               for entry in res.json()["results"]}




# Neuron
# Nexus ID: uniminds/options/cellulartarget/v1.0.0/a666e526-7752-47d1-a761-69addcec2f0e
#https://nexus.humanbrainproject.org/v0/data/uniminds/options/cellulartarget/v1.0.0/50532acb-1102-4406-a396-bce22316cf29

def get_uniminds_person_list(neuroshapes_person_list, client):
    people = []
    for ns_person in as_list(neuroshapes_person_list):
        ns_person = ns_person.resolve(client)
        filter = {
            "op": "and",
            "value": [
                {
                    "path": "schema:familyName",
                    "op": "eq",
                    "value": ns_person.family_name
                },
                {
                    "path": "schema:givenName",
                    "op": "eq",
                    "value": ns_person.given_name
                }
            ]
        }
        context = {"schema": "http://schema.org/"}
        u_person = KGQuery(uPerson, filter, context).resolve(client)
        if u_person:
            people.append(u_person)
        else:
            #raise Exception("cannot find {}".format(ns_person))
            print("Warning: cannot find {}".format(ns_person))
            people = []
    return people


def create_or_update_model_release(model_project, model_instance, contributors, custodians, script):
    """
    """

    release = ModelRelease(identifier=hashlib.md5("{} @ {}".format(model_project.name, model_instance.version).encode('utf-8')).hexdigest(),
                           name=model_project.name,
                           description=model_project.description,
                           version=model_instance.version,
                           abstractionLevel={"@id": model_project.abstraction_level.label} if model_project.abstraction_level else None,
                           brainStructure={"@id": uniminds_brain_structure_lookup[model_project.brain_region.label]} if model_project.brain_region else None,
                           #cellularTarget,
                           contributor=contributors,
                           custodian=custodians,
                           mainContact=custodians[0] if custodians else None,
                           #modelFormat,
                           modelScope={"@id": uniminds_model_scope_lookup[model_project.model_of.label]} if model_project.model_of else None,
                           #publication,
                           #studyTarget=
                           #license=script.license  # todo: this should be an entity or ontology term
                           )
    print(" ")
    print(release)
    release.save(client)
    return release


def create_or_update_file_bundle(model_project, model_instance, script, model_release):
    """
    """

    # if script.code_location and script.code_location.startswith("https://object.cscs.ch"):
    #     parts = script.code_location.split("/")
    #     if parts[-1]:
    #         name = parts[-1]
    #     else:
    #         name = parts[-2]
    # elif script.code_location.startswith("https://collab.humanbrainproject.eu"):
    #     name = script.code_location.split("#")[-1]
    # else:
    if script.code_location:
        name = "code for {} @ {}".format(model_project.name, model_instance.version)

        assert len(name) > 6

        bundle = FileBundle(identifier=hashlib.md5(script.code_location.encode('utf-8')).hexdigest(),
                            name=name,
                            description=model_instance.description,
                            url=script.code_location,
                            #usageNotes,
                            modelInstance=release)  # check this is showing in KG editor
        print(bundle)
        bundle.save(client)


if __name__ == "__main__":
    client = KGClient(token, nexus_endpoint="https://nexus.humanbrainproject.org/v0")

    projects = ModelProject.list(client, size=10000)
    single_cell_projects = [p for p in projects if p.model_of and p.model_of.label == "single cell" and "emodel" not in p.name]
    single_cell_no_memodel = [p for p in single_cell_projects if "CA1_pyr" not in p.name and "CA1_int" not in p.name]

    #for model_project in ModelProject.list(client, size=10000):
    for model_project in single_cell_no_memodel:
        #if model_project.model_of and "network" in model_project.model_of.label:
        #if model_project.model_of and "single cell" not in model_project.model_of.label:
        if True:
            contributors = get_uniminds_person_list(model_project.authors, client)
            custodians = get_uniminds_person_list(model_project.owners, client)

            for model_instance in as_list(model_project.instances):
                model_instance = model_instance.resolve(client)
                script = model_instance.main_script.resolve(client)
                release = create_or_update_model_release(model_project, model_instance, contributors, custodians, script)
                create_or_update_file_bundle(model_project, model_instance, script, release)