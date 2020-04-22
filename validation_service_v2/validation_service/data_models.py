from uuid import UUID
from enum import Enum
from typing import List
from datetime import datetime
from itertools import chain
import logging

from pydantic import BaseModel, HttpUrl, AnyUrl, validator
from fastapi.encoders import jsonable_encoder
from fastapi import HTTPException, status

from fairgraph.base import KGQuery, KGProxy, as_list, IRI, Distribution
import fairgraph
import fairgraph.core
import fairgraph.brainsimulation

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


class ImplementationStatus(str, Enum):
    dev = "in development"
    proposal  = "proposal"
    complete = "complete"


# class DataType(str, Enum):
#     {'Frequency of occurence, probability',
#     'LFP',
#     'Mean, SD',
#     'Mean, STD',
#     'Morphology',
#     'NWB:N HDF5',
#     'Vector of values',
#     'application/json',
#     'json'}


class RecordingModality(str, Enum):
    # todo: get this enum from KG
    twophoton = "2-photon imaging"
    em = "electron microscopy"
    ephys = "electrophysiology"
    fmri = "fMRI"
    hist = "histology"
    ophys = "optical microscopy"


class ValidationTestType(str, Enum):
    behaviour = "behaviour"
    network_activity = "network activity"
    network_structure = "network structure"
    single_cell_activity = "single cell activity"
    subcellular =  "subcellular"


class ScoreType(str, Enum):
    other = "Other"
    rsquare = "Rsquare"
    pvalue = "p-value"
    zscore = "z-score"


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
    # should probably add "project" or "instance_of" field containing parent model uuid

    class Config:
        extra = "allow"  # we temporarily store the IDs of sub-objects (e.g. ModelScript)
                         # during object updates

    @classmethod
    def from_kg_object(cls, instance, client):
        if isinstance(instance, KGProxy):
            instance = instance.resolve(client, api="nexus")
        instance_data = {
            "id": instance.uuid,
            "uri": instance.id,
            "version": instance.version,
            "description": instance.description,
            "parameters":  instance.parameters,
            "timestamp": instance.timestamp
        }
        main_script = instance.main_script.resolve(client, api="nexus")
        if main_script:
            instance_data.update({
                "code_format": main_script.code_format,
                "source": main_script.code_location,
                "license": main_script.license,
                "script_id": main_script.id  # internal use only
            })
        if hasattr(instance, "morphology"):
            morph = instance.morphology.resolve(client, api="nexus")
            instance_data["morphology"] = morph.morphology_file
            instance_data["morphology_id"] = morph.id  # internal
        if hasattr(instance, "e_model"):
            instance_data["e_model_id"] = instance.e_model.id
        return cls(**instance_data)

    def to_kg_objects(self, model_project):
        script = fairgraph.brainsimulation.ModelScript(
            name=f"ModelScript for {model_project.name} @ {self.version}",
            code_format=self.code_format,
            code_location=self.source,
            license=self.license)
        if hasattr(self, "script_id"):
            script.id = self.script_id
        kg_objects = [script]

        if model_project.model_of and model_project.model_of.label == "single cell" and self.morphology:
            e_model = fairgraph.brainsimulation.EModel(
                name=f"EModel for {model_project.name} @ {self.version}",
                brain_region=model_project.brain_region,
                species=model_project.species,
                model_of=None, main_script=None, release=None)
            if hasattr(self, "e_model_id"):
                e_model.id = self.e_model_id
            kg_objects.append(e_model)
            morph = fairgraph.brainsimulation.Morphology(
                name=f"Morphology for {model_project.name} @ {self.version}",
                cell_type=model_project.celltype,
                morphology_file=self.morphology)
            if hasattr(self, "morphology_id"):
                morph.id = self.morphology_id
            kg_objects.append(morph)
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
                timestamp=self.timestamp or datetime.now(),
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
                timestamp=self.timestamp or datetime.now(),
                release=None)
        if self.uri:
            minst.id = str(self.uri)
        kg_objects.append(minst)
        return kg_objects


class ModelInstancePatch(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    version: str = None
    description: str = None
    parameters: str = None
    code_format: str = None
    source: HttpUrl = None
    license: str = None
    hash: str = None
    timestamp: datetime = None
    morphology: HttpUrl = None

    class Config:
        extra = "allow"  # we temporarily store the IDs of sub-objects (e.g. ModelScript)
                         # during object updates


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
        if self.uri:
            model_project.id = str(self.uri)

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

    @classmethod
    def _check_not_empty(cls, field_name, value):
        if value is None:
            raise ValueError(f"{field_name} cannot be set to None")
        if len(value) == 0:
            raise ValueError(f"{field_name} cannot be empty")
        return value

    @validator("name")
    def name_not_empty(cls, value):
        return cls._check_not_empty("name", value)

    @validator("description")
    def description_not_empty(cls, value):
        return cls._check_not_empty("description", value)

    @validator("author")
    def author_not_empty(cls, value):
        return cls._check_not_empty("author", value)

    @validator("owner")
    def owner_not_empty(cls, value):
        return cls._check_not_empty("owner", value)


class ValidationTestInstance(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    old_uuid: UUID = None
    repository: HttpUrl
    version: str
    description: str = None
    parameters: str = None  # or dict?
    path: str
    timestamp: datetime = None
    test_definition_id: UUID = None

    @classmethod
    def from_kg_object(cls, test_script, client):
        return cls(
            uri=test_script.id,
            id=test_script.uuid,
            old_uuid=test_script.old_uuid,
            repository=test_script.repository.value,
            version=test_script.version,
            description=test_script.description,
            parameters= test_script.parameters,
            path=test_script.test_class,
            timestamp=test_script.date_created,
            test_definition_id=test_script.test_definition.uuid
        )

    def to_kg_objects(self, test_definition):
        return [
            fairgraph.brainsimulation.ValidationScript(
                name=f"Implementation of {test_definition.name}, version '{self.version}'",
                date_created=self.timestamp or datetime.now(),
                repository=IRI(self.repository),
                version=self.version,
                description=self.description,
                parameters=self.parameters,
                test_class=self.path,
                test_definition=test_definition
            )
        ]


class ValidationTestInstancePatch(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    old_uuid: UUID = None
    repository: HttpUrl = None
    version: str = None
    description: str = None
    parameters: str = None
    path: str = None
    timestamp: datetime = None
    test_definition_id: UUID = None


class ValidationTest(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    name: str
    alias: str = None
    status: ImplementationStatus = ImplementationStatus.proposal
    author: List[Person]
    cell_type: CellType = None
    brain_region: BrainRegion = None
    species: Species = None
    description: str  # was 'protocol', renamed for consistency with models
    date_created: datetime = None
    old_uuid: UUID = None
    data_location: List[HttpUrl]
    data_type: str =  None
    data_modality: RecordingModality = None
    test_type: ValidationTestType = None
    score_type: ScoreType = None
    instances: List[ValidationTestInstance] = None

    @classmethod
    def from_kg_object(cls, test_definition, client, recently_saved_scripts=[]):
        # due to the time it takes for Nexus to become consistent, we add newly saved scripts
        # to the result of the KG query in case they are not yet included
        scripts = {scr.id: scr
                   for scr in as_list(test_definition.scripts.resolve(client, api="nexus"))}
        for script in recently_saved_scripts:
            scripts[id] = script
        instances = [ValidationTestInstance.from_kg_object(inst, client)
                     for inst in scripts.values()]
        obj = cls(
            id=test_definition.uuid,
            uri=test_definition.id,
            name=test_definition.name,
            alias=test_definition.alias,
            status=test_definition.status,
            author=[Person.from_kg_object(p, client) for p in as_list(test_definition.authors)],
            cell_type=test_definition.celltype.label if test_definition.celltype else None,
            brain_region=test_definition.brain_region.label if test_definition.brain_region else None,
            species=test_definition.species.label if test_definition.species else None,
            description=test_definition.description,
            date_created=test_definition.date_created,
            old_uuid=test_definition.old_uuid,
            data_location=[item.resolve(client, api="nexus").result_file.location
                           for item in as_list(test_definition.reference_data)],
            data_type=test_definition.data_type,
            data_modality=test_definition.recording_modality  if test_definition.recording_modality else None,
            test_type=test_definition.test_type if test_definition.test_type else None,
            score_type=test_definition.score_type if test_definition.score_type else None,
            instances=sorted(instances, key=lambda inst: inst.timestamp)
        )
        return obj

    def to_kg_objects(self):
        authors = [person.to_kg_object() for person in self.author]
        timestamp = self.date_created or datetime.now()
        data_files = [
            fairgraph.brainsimulation.AnalysisResult(
                name="Reference data #{} for validation test '{}'".format(i + 1, self.name),
                result_file=url,
                timestamp=timestamp
            ) for i, url in enumerate(self.data_location)
        ]
        kg_objects = authors + data_files

        def get_ontology_object(cls, value):
            return cls(value.value) if value else None

        test_definition = fairgraph.brainsimulation.ValidationTestDefinition(
            name=self.name,
            alias=self.alias,
            status=self.status,
            brain_region=get_ontology_object(fairgraph.commons.BrainRegion, self.brain_region),
            species=get_ontology_object(fairgraph.commons.Species, self.species),
            celltype=get_ontology_object(fairgraph.commons.CellType, self.cell_type),
            reference_data=data_files,
            data_type=self.data_type,
            recording_modality=self.data_modality,
            test_type=self.test_type,
            score_type=self.score_type,
            description=self.description,
            authors=authors,
            date_created=timestamp
        )
        if self.uri:
            test_definition.id = str(self.uri)
        kg_objects.append(test_definition)

        for instance in self.instances:
            kg_objects.extend(instance.to_kg_objects(test_definition))

        return kg_objects


class ValidationTestPatch(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    name: str = None
    alias: str = None
    status: ImplementationStatus = None
    author: List[Person] = None
    cell_type: CellType = None
    brain_region: BrainRegion = None
    species: Species = None
    description: str = None
    date_created: datetime = None
    old_uuid: UUID = None
    data_location: List[HttpUrl] = None
    data_type: str =  None
    data_modality: RecordingModality = None
    test_type: ValidationTestType = None
    score_type: ScoreType = None

    @classmethod
    def _check_not_empty(cls, field_name, value):
        if value is None:
            raise ValueError(f"{field_name} cannot be set to None")
        if len(value) == 0:
            raise ValueError(f"{field_name} cannot be empty")
        return value

    @validator("name")
    def name_not_empty(cls, value):
        return cls._check_not_empty("name", value)

    @validator("description")
    def description_not_empty(cls, value):
        return cls._check_not_empty("description", value)

    @validator("author")
    def author_not_empty(cls, value):
        return cls._check_not_empty("author", value)

    @validator("status")
    def status_not_empty(cls, value):
        return cls._check_not_empty("status", value)


# note: this is essentially copied from resources/models.py
# todo: refactor to eliminate this duplicatin
def _get_model_instance_by_id(instance_id, kg_client):
    model_instance = fairgraph.brainsimulation.ModelInstance.from_uuid(
        str(instance_id), kg_client, api="nexus")
    if model_instance is None:
        model_instance = fairgraph.brainsimulation.MEModel.from_uuid(
            str(instance_id), kg_client, api="nexus")
    if model_instance is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Model instance with ID '{instance_id}' not found.")
    return model_instance



class ValidationResult(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    old_uuid: UUID = None
    model_version_id: UUID
    test_code_id: UUID
    results_storage: List[AnyUrl]  # for now at least, accept "collab:" and "swift:" URLs
    score: float
    passed: bool = None
    timestamp: datetime = None
    project_id: str = None
    normalized_score: float = None

    @classmethod
    def from_kg_object(cls, result, client):
        validation_activity = result.generated_by.resolve(client, api="nexus")
        model_version_id = validation_activity.model_instance.uuid
        test_code_id = validation_activity.test_script.uuid
        logger.debug("Serializing validation test result")
        logger.debug("Additional data for {}:\n{}".format(result.id, result.additional_data))
        additional_data_urls = []
        for item in as_list(result.additional_data):
            item = item.resolve(client, api="nexus")
            if item:
                additional_data_urls.append(item.result_file.location)
            else:
                logger.warning("Couldn't resolve {}".format(item))
        return cls(
            id=result.uuid,
            uri=result.id,
            old_uuid=result.old_uuid,
            model_version_id=model_version_id,
            test_code_id=test_code_id,
            results_storage=additional_data_urls,  # todo: handle collab storage redirects
            score=result.score,
            passed=result.passed,
            timestamp=result.timestamp,
            project_id=result.collab_id,
            normalized_score=result.normalized_score
        )

    def to_kg_objects(self, kg_client):
        timestamp = self.timestamp or datetime.now()

        additional_data = [
            fairgraph.brainsimulation.AnalysisResult(
                name=f"{uri} @ {timestamp.isoformat()}",
                result_file=Distribution(uri),
                timestamp=timestamp
            ) for uri in self.results_storage]
        kg_objects = additional_data[:]

        test_code = fairgraph.brainsimulation.ValidationScript.from_id(str(self.test_code_id),
                                                                       kg_client, api="nexus")
        test_definition = test_code.test_definition.resolve(kg_client, api="nexus")
        model_instance = _get_model_instance_by_id(self.model_version_id, kg_client)
        reference_data = fairgraph.core.Collection(
            f"Reference data for {test_definition.name}",
            members=as_list(test_definition.reference_data)
        )
        kg_objects.append(reference_data)

        result = fairgraph.brainsimulation.ValidationResult(
            name=f"Validation results for model {self.model_version_id} and test {self.test_code_id} with timestamp {timestamp.isoformat()}",
            generated_by=None,
            description=None,
            score=self.score,
            normalized_score=self.normalized_score,
            passed=self.passed,
            timestamp=timestamp,
            additional_data=additional_data,
            collab_id=self.project_id
        )

        activity = fairgraph.brainsimulation.ValidationActivity(
            model_instance=model_instance,
            test_script=test_code,
            reference_data=reference_data,
            timestamp=timestamp,
            result=result
        )
        kg_objects.append(result)
        kg_objects.append(activity)
        return kg_objects
