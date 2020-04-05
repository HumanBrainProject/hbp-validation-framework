from uuid import UUID
from enum import Enum
from typing import List
from datetime import datetime
import logging

from pydantic import BaseModel, HttpUrl

from fairgraph.base import KGQuery, KGProxy, as_list

logger = logging.getLogger("validation_service_v2")


class BrainRegion(str, Enum):
    hippocampus_ca1 = "hippocampus CA1"
    hippocampus = "hippocampus"
    basal_ganlia = "basal ganglia"
    cortex = "cerebral cortex"
    cerebellum = "cerebellum"
    whole_brain = "whole brain"


class Species(str, Enum):
    mouse = "Mus musculus"
    rat = "Rattus norvegicus"
    human = "Homo sapiens"
    macaque = "Macaca mulatta"
    marmoset = "Callithrix jacchus"
    rodent = "Rodentia"


class Person(BaseModel):
    given_name: str
    family_name: str

    @classmethod
    def from_kg_object(cls, p, client):
        if isinstance(p, KGProxy):
            pr = p.resolve(client, api="nexus")
        else:
            pr = p
        return cls(given_name= pr.given_name, family_name=pr.family_name)


class ModelInstance(BaseModel):
    id: UUID
    uri: HttpUrl
    version: str
    description: str = None
    parameters: str = None  # or dict?
    code_format: str = None
    source: HttpUrl = None  # should be required
    license: str = None  # use Enum
    hash: str = None
    timestamp: datetime
    morphology: HttpUrl = None

    @classmethod
    def from_kg_object(cls, instance, client):
        if isinstance(instance, KGProxy):
            instance = instance.resolve(client, api="nexus")
        main_script = instance.main_script.resolve(client, api="nexus")
        instance_data = {
            "id": instance.uuid,
            "uri": instance.id,
            "version": instance.version,
            "description": instance.description,
            "parameters":  instance.parameters,
            "timestamp": instance.timestamp
        }
        if main_script:
            instance_data.update({
                "code_format": main_script.code_format,
                "source": main_script.code_location,
                "license": main_script.license,
            })
        if hasattr(instance, "morphology"):
            morph = instance.morphology.resolve(client, api="nexus")
            instance_data["morphology"] = morph.morphology_file
        return cls(**instance_data)


class Image(BaseModel):
    caption: str = None
    url: HttpUrl


class ScientificModel(BaseModel):
    id: UUID
    uri: HttpUrl
    name: str
    alias: str = None
    author: List[Person]
    owner: List[Person]
    project_id: str = None
    organization: str = None
    private: bool = True
    #cell_type: CellType
    #model_scope: ModelScope
    #abstraction_level: AbstractionLevel
    brain_region: BrainRegion = None
    species: Species = None
    description: str
    images: List[Image] = None
    old_uuid: UUID = None
    instances: List[ModelInstance] = None

    @classmethod
    def from_kg_object(cls, model_project, client):
        return cls(
            id=model_project.uuid,
            uri=model_project.id,
            name=model_project.name,
            alias=model_project.alias,
            author=[Person.from_kg_object(p, client) for p in as_list(model_project.authors)],
            owner=[Person.from_kg_object(p, client) for p in as_list(model_project.owners)],
            project_id=model_project.collab_id,
            organization=model_project.organization.resolve(client, api="nexus").name
                         if model_project.organization else None,
            private=model_project.private,
            cell_type=model_project.celltype.label if model_project.celltype else None,
            model_scope=model_project.model_of.label if model_project.model_of else None,
            abstraction_level=model_project.abstraction_level.label
                              if model_project.abstraction_level else None,
            brain_region=model_project.brain_region.label if model_project.brain_region else None,
            species=model_project.species.label if model_project.species else None,
            description=model_project.description,
            images=as_list(model_project.images),
            old_uuid=model_project.old_uuid,
            instances=[ModelInstance.from_kg_object(inst, client)
                       for inst in as_list(model_project.instances)]
        )