from uuid import UUID
from enum import Enum
from typing import List
from datetime import datetime
from itertools import chain
import logging

from pydantic import BaseModel, HttpUrl
from fastapi.encoders import jsonable_encoder

from fairgraph.base import KGQuery, KGProxy, as_list
import fairgraph

fairgraph.core.use_namespace(fairgraph.brainsimulation.DEFAULT_NAMESPACE)
logger = logging.getLogger("validation_service_v2")


class Species(str, Enum):
    mouse = "Mus musculus"
    rat = "Rattus norvegicus"
    human = "Homo sapiens"
    macaque = "Macaca mulatta"
    marmoset = "Callithrix jacchus"
    rodent = "Rodentia"  # yes, not a species
    opossum = "Monodelphis domestica"
    platypus = "Ornithorhynchus anatinus"


BrainRegion = Enum(
    "BrainRegion",
    [(name.replace(" ", "_"), name) for name in fairgraph.commons.BrainRegion.iri_map.keys()])


ModelScope = Enum(
    "ModelScope",
    [(name.replace(" ", "_").replace(":", "__"), name)
     for name in fairgraph.commons.ModelScope.iri_map.keys()]
)


AbstractionLevel = Enum(
    "AbstractionLevel",
    [(name.replace(" ", "_").replace(":", "__"), name)
     for name in fairgraph.commons.AbstractionLevel.iri_map.keys()]
)


CellType = Enum(
    "CellType",
    [(name.replace(" ", "_"), name) for name in fairgraph.commons.CellType.iri_map.keys()]
)


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

    def to_kg_object(self):
        return fairgraph.core.Person(family_name=self.family_name, given_name=self.given_name)


class ModelInstance(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    version: str
    description: str = None
    parameters: str = None  # or dict?
    code_format: str = None
    source: HttpUrl = None  # should be required
    license: str = None  # use Enum
    hash: str = None
    timestamp: datetime = None
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


    def to_kg_objects(self, model_project):
        script = fairgraph.brainsimulation.ModelScript(
            name=f"ModelScript for {model_project.name} @ {self.version}",
            code_format=self.code_format,
            code_location=self.source,
            license=self.license)
        kg_objects = [script]

        if model_project.model_of and model_project.model_of.label == "single cell" and self.morphology:
            e_model = fairgraph.brainsimulation.EModel(
                name=f"EModel for {model_project.name} @ {self.version}",
                brain_region=model_project.brain_region,
                species=model_project.species,
                model_of=None, main_script=None, release=None)
            kg_objects.append(e_model)
            morph = fairgraph.brainsimulation.Morphology(
                name=f"Morphology for {model_project.name} @ {self.version}",
                cell_type=model_project.celltype,
                morphology_file=self.morphology)
            kg_objects.append(e_model)
            minst = fairgraph.brainsimulation.MEModel(
                name=f"ModelInstance for {model_project.name} @ {self.version}",
                description=self.description or "",
                brain_region=model_project.brain_region,
                species=model_project.species,
                model_of=None,
                main_script=script,
                e_model=e_model,
                morphology=morph,
                version=self.version,
                parameters=self.parameters,
                timestamp=datetime.now(),
                release=None)
        else:
            minst = fairgraph.brainsimulation.ModelInstance(
                name=f"ModelInstance for {model_project.name} @ {self.version}",
                description=self.description or "",
                brain_region=model_project.brain_region,
                species=model_project.species,
                model_of=None,
                main_script=script,
                version=self.version,
                parameters=self.parameters,
                timestamp=datetime.now(),
                release=None)
        kg_objects.append(minst)
        return kg_objects


class Image(BaseModel):
    caption: str = None
    url: HttpUrl


class ScientificModel(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    name: str
    alias: str = None
    author: List[Person]
    owner: List[Person]
    project_id: str = None
    organization: str = None
    private: bool = True
    cell_type: CellType = None
    model_scope: ModelScope = None
    abstraction_level: AbstractionLevel = None
    brain_region: BrainRegion = None
    species: Species = None
    description: str
    date_created: datetime = None
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
            date_created=model_project.date_created,
            images=as_list(model_project.images),
            old_uuid=model_project.old_uuid,
            instances=[ModelInstance.from_kg_object(inst, client)
                       for inst in as_list(model_project.instances)]
        )

    def to_kg_objects(self):
        authors = [person.to_kg_object() for person in self.author]
        owners = [person.to_kg_object() for person in self.owner]
        kg_objects = authors + owners
        if self.organization:
            org = fairgraph.core.Organization(name=self.organization)
            kg_objects.append(org)
        else:
            org = None

        def get_ontology_object(cls, value):
            return cls(value.value) if value else None

        model_project = fairgraph.brainsimulation.ModelProject(
            name=self.name,
            owners=owners,
            authors=authors,
            description=self.description,
            date_created=self.date_created or datetime.now(),
            private=self.private,
            collab_id=self.project_id,
            alias=self.alias,
            organization=org,
            brain_region=get_ontology_object(fairgraph.commons.BrainRegion, self.brain_region),
            species=get_ontology_object(fairgraph.commons.Species, self.species),
            celltype=get_ontology_object(fairgraph.commons.CellType, self.cell_type),
            abstraction_level=get_ontology_object(fairgraph.commons.AbstractionLevel,
                                                  self.abstraction_level),
            model_of=get_ontology_object(fairgraph.commons.ModelScope, self.model_scope),
            images=jsonable_encoder(self.images))

        for instance in self.instances:
            kg_objects.extend(instance.to_kg_objects(model_project))
        model_project.instances = [
            obj for obj in kg_objects
            if isinstance(obj, (fairgraph.brainsimulation.MEModel,
                                fairgraph.brainsimulation.ModelInstance))
        ]
        kg_objects.append(model_project)
        return kg_objects



class ScientificModelPatch(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    name: str = None
    alias: str = None
    author: List[Person] = None
    owner: List[Person] = None
    project_id: str = None
    organization: str = None
    private: bool = None
    cell_type: CellType = None
    model_scope: ModelScope = None
    abstraction_level: AbstractionLevel = None
    brain_region: BrainRegion = None
    species: Species = None
    description: str = None
    images: List[Image] = None
    old_uuid: UUID = None
    #instances: List[ModelInstance] = None