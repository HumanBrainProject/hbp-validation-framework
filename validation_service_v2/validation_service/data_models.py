import os
from uuid import UUID, uuid5
from enum import Enum
from typing import List
from datetime import datetime, timezone, date
import logging
import json
import tempfile
import hashlib
from urllib.parse import urlparse, parse_qs, quote

from dateutil import parser as date_parser
import requests

from pydantic import BaseModel, HttpUrl, AnyUrl, validator, ValidationError, constr
from fastapi.encoders import jsonable_encoder
from fastapi import HTTPException, status

from fairgraph.base_v3 import KGProxy, as_list, IRI
import fairgraph
import fairgraph.openminds.core as omcore
import fairgraph.openminds.computation as omcmp
import fairgraph.openminds.controlledterms as omterms

from .examples import EXAMPLES
from .db import (_get_model_by_id_or_alias, _get_model_instance_by_id,
                 _get_test_by_id_or_alias, _get_test_instance_by_id)
from .auth import get_user_from_token, get_kg_client_for_service_account


kg_service_client = get_kg_client_for_service_account()
term_cache = {}

logger = logging.getLogger("validation_service_v2")

EBRAINS_DRIVE_API = "https://drive.ebrains.eu/api2/"


def uuid_from_uri(uri):
    return uri.split("/")[-1]


def ensure_has_timezone(timestamp):
    if timestamp is None:
        return timestamp
    elif timestamp.tzname() is None:
        return timestamp.astimezone(timezone.utc)
    else:
        return timestamp


def get_term_cache():
    if len(term_cache) == 0:
        for cls in (
            omterms.Species,  # todo: filter to give a smaller list
            omterms.UBERONParcellation,
            omterms.ModelScope,
            omterms.ModelAbstractionLevel,
            omterms.CellType,
            omterms.Technique,  # todo: filter to include only types relevant to model validation
            omcore.License,
            omcore.ContentType  # todo: filter to include only types relevant to modelling
        ):
            objects = cls.list(kg_service_client, api="core", scope="in progress", size=10000)
            term_cache[cls.__name__] = {
                "names": {obj.name: obj for obj in objects},
                "ids": {obj.id: obj for obj in objects}
            }
    return term_cache

get_term_cache()


def get_term(cls_name, attr):
    if attr:
        return term_cache[cls_name]["names"].get(attr.value, None)
    else:
        return None


Slug = constr(regex=r"^\w[\w\-]+$", to_lower=True, strip_whitespace=True)


# class Species(str, Enum):
#     mouse = "Mus musculus"
#     rat = "Rattus norvegicus"
#     human = "Homo sapiens"
#     macaque = "Macaca mulatta"
#     marmoset = "Callithrix jacchus"
#     rodent = "Rodentia"  # yes, not a species
#     opossum = "Monodelphis domestica"
#     platypus = "Ornithorhynchus anatinus"

Species = Enum(
    "Species",
    [
        (name.replace(" ", "_"), name)
        for name in term_cache["Species"]["names"]
    ]
)


BrainRegion = Enum(
    "BrainRegion",
    [
        (name.replace(" ", "_"), name)
        for name in term_cache["UBERONParcellation"]["names"]
    ]
)


ModelScope = Enum(
    "ModelScope",
    [
        (name.replace(" ", "_").replace(":", "__"), name)
        for name in term_cache["ModelScope"]["names"]
    ],
)


AbstractionLevel = Enum(
    "AbstractionLevel",
    [
        (name.replace(" ", "_").replace(":", "__"), name)
        for name in term_cache["ModelAbstractionLevel"]["names"]
    ],
)


CellType = Enum(
    "CellType",
    [
        (name.replace(" ", "_"), name)
        for name in term_cache["CellType"]["names"]
    ]
)


def get_identifier(iri, prefix):
    """Return a valid Python variable name based on a KG object UUID"""
    return prefix + "_" + iri.split("/")[-1].replace("-", "")


ContentType = Enum(
    "ContentType",
    [
        (get_identifier(obj.uuid, "ct"), obj.name)
        for obj in term_cache["ContentType"]["names"].values()
    ]
)



class ImplementationStatus(str, Enum):
    dev = "in development"
    proposal = "proposal"
    published = "published"


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


# class RecordingModality(str, Enum):
#     # todo: get this enum from KG
#     twophoton = "2-photon imaging"
#     em = "electron microscopy"
#     ephys = "electrophysiology"
#     fmri = "fMRI"
#     hist = "histology"
#     ophys = "optical microscopy"


RecordingModality = Enum(
    "RecordingModality",
    [
        (name.replace(" ", "_"), name)
        for name in term_cache["Technique"]["names"]
        # or could use ExperimentalApproach
        # ideally should filter techniques to include only those are recording techniques
    ]
)


class ValidationTestType(str, Enum):
    behaviour = "behaviour"
    network_activity = "network activity"
    network_structure = "network structure"
    single_cell_activity = "single cell activity"
    subcellular = "subcellular"


class ScoreType(str, Enum):
    other = "Other"
    rsquare = "Rsquare"
    pvalue = "p-value"
    zscore = "z-score"


License = Enum(
    "License",
    [
        (name.replace(" ", "_"), name)
        for name in term_cache["License"]["names"]
    ]
)


class Person(BaseModel):
    """A human person responsible for creating a model, running a simulation, etc."""

    given_name: str
    family_name: str
    orcid: str = None

    class Config:
        schema_extra = {
            "example": {
                "family_name": "Destexhe",
                "given_name": "Alain",
                "orcid": "https://orcid.org/0000-0001-7405-0455"
            }
        }

    @classmethod
    def from_kg_object(cls, person, client):
        person = person.resolve(client, scope="in progress")
        orcid = None
        if person.digital_identifiers:
            for digid in as_list(person.digital_identifiers):
                if isinstance(digid, omcore.ORCID):
                    orcid = digid.identifier
                    break
                elif isinstance(digid, KGProxy) and digid.cls == omcore.ORCID:
                    orcid = digid.resolve(client, scope="in progress").identifier
                    break
        return cls(given_name=person.given_name, family_name=person.family_name,
                   orcid=orcid)

    def to_kg_object(self):
        obj = omcore.Person(family_name=self.family_name, given_name=self.given_name)
        if self.orcid:
            obj.digital_identifiers = [omcore.ORCID(identifier=self.orcid)]
        return obj


class ModelInstance(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    version: str
    description: str = None
    parameters: str = None  # or dict?
    code_format: ContentType = None
    source: AnyUrl = None  # should be required
    license: License = None  # use Enum
    hash: str = None
    timestamp: date = None
    morphology: HttpUrl = None
    model_id: UUID = None  # id of parent model
    alternatives: List[HttpUrl] = None  # alternative representations, e.g. EBRAINS Search, ModelDB

    class Config:
        extra = "allow"  # we temporarily store the IDs of sub-objects (e.g. ModelScript)
        # during object updates

    @classmethod
    def from_kg_object(cls, instance, client, model_id):
        instance = instance.resolve(client, scope="in progress")
        alternatives = [
            mv.resolve(client, scope="in progress").homepage
            for mv in as_list(instance.is_alternative_version_of)
        ]
        repository = instance.repository.resolve(client, scope="in progress")
        licenses = [lic.resolve(client, scope="in progress") for lic in as_list(instance.licenses)]
        instance_data = {
            "id": instance.uuid,
            "uri": instance.id,
            "version": instance.version_identifier,
            "description": instance.description,
            "parameters": None,  # todo: get from instance.input_data
            "timestamp": instance.release_date,
            "model_id": model_id,
            "alternatives": [mv.homepage for mv in alternatives if mv.homepage],
            "code_format": ContentType(instance.format.resolve(client, scope="in progress").name) if instance.format else None,
            "source": str(repository.iri),
            "license": License(licenses[0].name) if licenses else None,
            "script_id": None,  # field no-longer used, but kept to maintain backwards-compatibility
            "hash": getattr(repository.hash, "digest", None)
        }
        # instance_data["morphology"] = ?
        # instance_data["morphology_id"] = ?
        try:
            obj = cls(**instance_data)
        except ValidationError as err:
            logger.error(f"Validation error for data: {instance_data}")
            raise
        return obj

    def to_kg_object(self, model_project):
        repository = omcore.FileRepository(
            iri=self.source,
            #hosted_by=
            #repository_type=
            hash=omcore.Hash(algorithm="SHA-1", digest=self.hash)  # are we sure we're using SHA-1
        )
        # todo: handle morphology
        minst = omcore.ModelVersion(
            name=f"ModelInstance for {model_project.name} @ {self.version}",
            description=self.description or "",
            version_identifier=self.version,
            #parameters=
            format=get_term("ContentType", self.code_format),
            repository=repository,
            licenses=get_term("License", self.license),
            release_date=self.timestamp if self.timestamp else date.today(),
        )
        if self.uri:
            minst.id = str(self.uri)
        return minst


class ModelInstancePatch(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    version: str = None
    description: str = None
    parameters: str = None
    code_format: str = None
    source: HttpUrl = None
    license: License = None
    hash: str = None
    timestamp: datetime = None
    morphology: HttpUrl = None

    class Config:
        extra = "allow"  # we temporarily store the IDs of sub-objects (e.g. ModelScript)
        # during object updates


class Image(BaseModel):
    caption: str = None
    url: HttpUrl


def is_private(space):
    return space == "myspace" or space.startswith("collab-")


def filter_study_targets(study_targets):
    cell_types = []
    brain_regions = []
    species = []
    for item in as_list(study_targets):
        item = item.resolve(kg_service_client, scope="in progress")
        if isinstance(item, omterms.CellType):
            cell_types.append(item.name)
        elif isinstance(item, omterms.UBERONParcellation):
            brain_regions.append(item.name)
        elif isinstance(item, omterms.Species):
            species.append(item.name)
    return cell_types, brain_regions, species



class ScientificModel(BaseModel):
    """

    """

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
    date_created: date = None
    images: List[Image] = None
    old_uuid: UUID = None
    instances: List[ModelInstance] = None

    class Config:
        schema_extra = {"example": EXAMPLES["ScientificModel"]}

    @classmethod
    def from_kg_object(cls, model_project, client):
        assert model_project.scope is not None
        instances = []
        for inst_obj in as_list(model_project.versions):
            #try:
                inst_obj = inst_obj.resolve(client, scope=model_project.scope)
                inst = ModelInstance.from_kg_object(inst_obj, client, model_id=model_project.uuid)
            #except Exception as err:
            #    logger.warning(f"Problem retrieving model instance {inst_obj.id}: {err}")
            #else:
                instances.append(inst)
        cell_types, brain_regions, species = filter_study_targets(model_project.study_targets)
        if instances:
            date_created = min(inst.timestamp for inst in instances)
        else:
            date_created = None
        custodians = [c.resolve(client, scope=model_project.scope) 
                      for c in as_list(model_project.custodians)]
        organizations = [org.name for org in custodians if isinstance(org, omcore.Organization)]
        try:
            data = dict(
                id=model_project.uuid,
                uri=model_project.id,
                name=model_project.name,
                alias=model_project.alias,
                author=[Person.from_kg_object(p, client)
                        for p in as_list(model_project.developers)],
                owner=[Person.from_kg_object(p, client)
                       for p in custodians
                       if isinstance(p, omcore.Person)],
                project_id=model_project.space,
                organization=organizations[0] if organizations else None,
                private=is_private(model_project.space),
                cell_type=cell_types[0] if cell_types else None,
                model_scope=term_cache["ModelScope"]["ids"][model_project.model_scope.id].name
                            if model_project.model_scope else None,
                abstraction_level=term_cache["ModelAbstractionLevel"]["ids"][model_project.abstraction_level.id].name
                                  if model_project.abstraction_level else None,
                brain_region=brain_regions[0] if brain_regions else None,
                species=species[0] if species else None,
                description=model_project.description,
                date_created=date_created,
                #images=,
                old_uuid=None,
                instances=instances,
            )
            obj = cls(**data)
        except ValidationError as err:
            logger.error(f"Validation error for data from model project: {model_project}\n{data}")
            raise
        return obj

    def to_kg_object(self):
        authors = [person.to_kg_object() for person in self.author]
        owners = [person.to_kg_object() for person in self.owner]
        if self.organization:
            owners.append(omcore.Organization(name=self.organization))

        study_targets = []
        if self.species:
            species = get_term("Species", self.species)
            if species:
                study_targets.append(species)
        if self.brain_region:
            brain_region = get_term("UBERONParcellation", self.brain_region)
            if brain_region:
                study_targets.append(brain_region)
        if self.cell_type:
            cell_type = get_term("CellType", self.cell_type)
            if cell_type:
                study_targets.append(cell_type)

        model_project = omcore.Model(
            name=self.name,
            alias=self.alias,
            description=self.description,
            abstraction_level=get_term("ModelAbstractionLevel", self.abstraction_level),
            model_scope=get_term("ModelScope", self.model_scope),
            custodians=owners,
            developers=authors,
            digital_identifier=None,
            homepage=None,
            how_to_cite=None,
            study_targets=study_targets
        )        
        if self.uri:
            model_project.id = str(self.uri)

        if self.instances:
            model_versions = []
            for instance in self.instances:
                model_versions = [
                    instance.to_kg_object(model_project)
                    for instance in self.instances
                ]
            model_project.versions = model_versions
        return model_project


class ScientificModelSummary(BaseModel):
    """

    """

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

    @classmethod
    def from_kg_object(cls, model_project, client):
        cell_types, brain_regions, species = filter_study_targets(model_project.study_targets)
        try:
            obj = cls(
                id=model_project.uuid,
                uri=model_project.id,
                name=model_project.name,
                alias=model_project.alias,
                author=[Person.from_kg_object(p, client)
                        for p in as_list(model_project.developers)],
                owner=[Person.from_kg_object(p, client)
                       for p in as_list(model_project.custodian)
                       if isinstance(p, omcore.Person)],
                project_id=model_project.space,
                organization=[org.name for org in as_list(model_project.custodian)
                              if isinstance(org, omcore.Organization)][0],
                private=is_private(model_project.space),
                cell_type=cell_types,
                model_scope=model_project.model_scope.name if model_project.model_scope else None,
                abstraction_level=model_project.abstraction_level.name if model_project.abstraction_level else None,
                brain_region=brain_regions,
                species=species,
                description=model_project.description,
                date_created=None,
            )
        except ValidationError as err:
            logger.error(f"Validation error for data from model project: {model_project}")
            raise
        return obj


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
    # instances: List[ModelInstance] = None

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
    test_id: UUID = None

    @classmethod
    def from_kg_object(cls, test_version, test_uuid, client):
        test_version = test_version.resolve(client, scope="in progress")
        if test_version.repository:
            repository = test_version.repository.resolve(client, scope="in progress").iri.value
        else:
            repository = None
        return cls(
            uri=test_version.id,
            id=test_version.uuid,
            description=test_version.version_innovation,
            path=test_version.entry_point,
            timestamp=test_version.release_date,
            repository=repository,
            version=test_version.version_identifier,
            test_id=test_uuid,
            #parameters=?
        )

    def to_kg_object(self, test_definition):
        reference_data = None
        if test_definition.data_location:
            reference_data = [
                omcore.URL(
                    url=IRI(url)
                )
                for url in test_definition.data_location
            ]
        if self.repository:
            repository = omcore.FileRepository(
                name=self.repository,
                iri=IRI(self.repository),
            )
        else:
            repository = None
        test_version = omcmp.ValidationTestVersion(
            name=f"Implementation of {test_definition.name}, version '{self.version}'",
            alias=f"{test_definition.alias}-{self.version}",
            custodians=None,   # inherits from parent
            description=None,  # inherits from parent
            developers=None,   # inherits from parent
            entry_point=self.path,
            reference_data=reference_data,
            release_date=None,
            repository=repository,
            version_identifier=self.version,
            version_innovation=self.description,
        )
        if self.uri:
            test_version.id = str(self.uri)
        return test_version


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
    test_id: UUID = None


class ValidationTest(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    name: str
    alias: str = None
    implementation_status: ImplementationStatus = ImplementationStatus.proposal
    author: List[Person]
    cell_type: CellType = None
    brain_region: BrainRegion = None
    species: Species = None
    description: str  # was 'protocol', renamed for consistency with models
    date_created: datetime = None
    old_uuid: UUID = None
    data_location: List[HttpUrl]
    data_type: str = None
    recording_modality: RecordingModality = None
    test_type: ValidationTestType = None
    score_type: ScoreType = None
    instances: List[ValidationTestInstance] = None
    # todo: add "publication" field

    @classmethod
    def from_kg_object(cls, test_definition, client):
        versions = [ver.resolve(client, scope="in progress") for ver in as_list(test_definition.versions)]
        instances = [
            ValidationTestInstance.from_kg_object(inst, test_definition.uuid, client) for inst in versions
        ]
        cell_types, brain_regions, species = filter_study_targets(test_definition.study_targets)
        if len(versions) > 0:
            latest_version = sorted(versions,
                                    key=lambda ver: ver.version_identifier)[-1]
            reference_data = [item.resolve(client, scope="in progress")
                             for item in as_list(latest_version.reference_data)]
            data_location = []
            data_type = set()
            for item in reference_data:
                if hasattr(item, "iri"):  # File
                    data_location.append(item.iri.value)
                    data_type.add(item.format)
                elif hasattr(item, "url"):  # URL
                    data_location.append(item.url.value)
            data_type = list(data_type)
            if len(data_type) == 1:
                data_type = data_type[0]
            elif len(data_type) == 0:
                data_type = None
        else:
            data_location = None
            data_type = None
        obj = cls(
            id=test_definition.uuid,
            uri=test_definition.id,
            name=test_definition.name,
            alias=test_definition.alias,
            #implementation_status=?  # get from release state and/or other metadata?
            #custodians=test_definition.custodians,
            description=test_definition.description,
            author=[Person.from_kg_object(p, client) for p in as_list(test_definition.developers)],
            cell_type=cell_types[0] if cell_types else None,
            brain_region=brain_regions[0] if brain_regions else None,
            species=species[0] if species else None,            
            date_created=None,
            data_location=data_location,
            data_type=data_type,
            #digital_identifier=test_definition.digital_identifier,
            recording_modality=RecordingModality(test_definition.experimental_technique.resolve(client).name) if test_definition.experimental_technique else None,
            instances=sorted(instances, key=lambda inst: inst.version),
            score_type=ScoreType(test_definition.score_type.resolve(client).name) if test_definition.score_type else None,
        )
        return obj

    def to_kg_object(self):
        developers = [person.to_kg_object() for person in self.author]
        #timestamp = ensure_has_timezone(self.date_created) or datetime.now(timezone.utc)
        timestamp = None
        data_files = [
            omcore.File(
                name="Reference data #{} for validation test '{}'".format(i + 1, self.name),
                iri=IRI(url),
            )
            for i, url in enumerate(self.data_location)
        ]
        study_targets = []
        if self.species:
            species = get_term("Species", self.species)
            if species:
                study_targets.append(species)
        if self.brain_region:
            brain_region = get_term("UBERONParcellation", self.brain_region)
            if brain_region:
                study_targets.append(brain_region)
        if self.cell_type:
            cell_type = get_term("CellType", self.cell_type)
            if cell_type:
                study_targets.append(cell_type)

        test_definition = omcmp.ValidationTest(
            name=self.name,
            alias=self.alias,
            custodians=developers,
            description=self.description,
            developers=developers,
            #digital_identifier=,
            experimental_technique=get_term("Technique", self.recording_modality),
            #homepage=,
            #how_to_cite=,
            #model_scope=None,   # re-curate by hand
            score_type=None,  # todo: add terms - get_term("MeasureType", self.score_type),
            study_targets=study_targets
        )
        if self.uri:
            test_definition.id = str(self.uri)

        if self.instances:
            test_versions = []
            for instance in self.instances:
                test_versions = [
                    instance.to_kg_object(self)
                    for instance in self.instances
                ]
            test_definition.versions = test_versions

        return test_definition


class ValidationTestSummary(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    name: str
    alias: str = None
    implementation_status: ImplementationStatus = ImplementationStatus.proposal
    author: List[Person]
    cell_type: CellType = None
    brain_region: BrainRegion = None
    species: Species = None
    description: str  # was 'protocol', renamed for consistency with models
    date_created: datetime = None
    data_type: str = None
    recording_modality: RecordingModality = None
    test_type: ValidationTestType = None
    score_type: ScoreType = None

    @classmethod
    def from_kg_object(cls, test_definition, client):
        obj = cls(
            id=test_definition.uuid,
            uri=test_definition.id,
            name=test_definition.name,
            alias=test_definition.alias,
            implementation_status=test_definition.status or ImplementationStatus.proposal.value,
            author=[Person.from_kg_object(p, client) for p in as_list(test_definition.authors)],
            cell_type=test_definition.celltype.label if test_definition.celltype else None,
            brain_region=test_definition.brain_region.label
            if test_definition.brain_region
            else None,
            species=test_definition.species.label if test_definition.species else None,
            description=test_definition.description,
            date_created=test_definition.date_created,
            data_type=test_definition.data_type,
            recording_modality=test_definition.recording_modality
            if test_definition.recording_modality
            else None,
            test_type=test_definition.test_type if test_definition.test_type else None,
            score_type=test_definition.score_type if test_definition.score_type else None
        )
        return obj


class ValidationTestPatch(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    name: str = None
    alias: str = None
    implementation_status: ImplementationStatus = None
    author: List[Person] = None
    cell_type: CellType = None
    brain_region: BrainRegion = None
    species: Species = None
    description: str = None
    date_created: datetime = None
    old_uuid: UUID = None
    data_location: List[HttpUrl] = None
    data_type: str = None
    recording_modality: RecordingModality = None
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

    @validator("implementation_status")
    def status_not_empty(cls, value):
        return cls._check_not_empty("implementation_status", value)


# note: the following function was essentially copied from resources/models.py
# todo: refactor to eliminate this duplication
def _get_model_instance_by_id_no_access_check(instance_id, kg_client):
    model_instance = fairgraph.brainsimulation.ModelInstance.from_uuid(
        str(instance_id), kg_client, api="nexus"
    )
    if model_instance is None:
        model_instance = fairgraph.brainsimulation.MEModel.from_uuid(
            str(instance_id), kg_client, api="nexus"
        )
    if model_instance is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Model instance with ID '{instance_id}' not found.",
        )
    return model_instance


class ConsistencyError(Exception):
    pass


class File(BaseModel):
    download_url: AnyUrl = None
    hash: str = None
    content_type: str = None
    file_store: str = None
    local_path: str = None
    size: int = None
    id: str = None

    @classmethod
    def from_kg_object(cls, file_obj):
        url = file_obj.location
        url_parts = urlparse(url)
        id = None
        local_path = file_obj.original_file_name
        if url_parts.netloc == "collab-storage-redirect.brainsimulation.eu":
            file_store = "collab-v1"
            local_path = url_parts.path
        elif url_parts.netloc == "seafile-proxy.brainsimulation.eu":
            file_store = "drive"
            local_path = url_parts.path
            id = parse_qs(url_parts.query).get("username", [None])[0]
        elif url_parts.netloc == "drive.ebrains.eu":
            file_store = "drive"
        elif url_parts.netloc == "object.cscs.ch":
            file_store = "swift"
        else:
            file_store = None
        return cls(
            download_url=file_obj.location,
            hash=file_obj.digest,
            size=file_obj.size,
            content_type=file_obj.content_type,
            local_path=local_path,
            file_store=file_store,
            id=id
        )

    @classmethod
    def from_kg_query(cls, result):
        url = result["http://schema.org/downloadURL"]["@id"]
        url_parts = urlparse(url)
        id = None
        local_path = result.get("original_file_name")
        if url_parts.netloc == "collab-storage-redirect.brainsimulation.eu":
            file_store = "collab-v1"
            local_path = url_parts.path
        elif url_parts.netloc == "seafile-proxy.brainsimulation.eu":
            file_store = "drive"
            local_path = url_parts.path
            id = parse_qs(url_parts.query).get("username", [None])[0]
        elif url_parts.netloc == "drive.ebrains.eu":
            file_store = "drive"
        elif url_parts.netloc == "object.cscs.ch":
            file_store = "swift"
        else:
            file_store = None
        return cls(
            download_url=url,
            hash=result.get("digest"),
            size=result.get("size"),
            content_type=result.get("content_type"),
            local_path=local_path,
            file_store=file_store,
            id=id
        )

    def to_kg_object(self, token=None):
        if self.download_url is None:
            if self.file_store == "drive":
                self.download_url = f"https://seafile-proxy.brainsimulation.eu{quote(self.local_path)}?username={self.id}"
                if token:
                    self.download_url = self.get_share_link(token) or self.download_url
            elif self.file_store == "swift":
                self.download_url = f"https://{self.file_store}-proxy.brainsimulation.eu{quote(self.local_path)}?username={self.id}"
            elif "gpfs" in self.file_store:
                self.download_url = f"https://{self.file_store}-proxy.brainsimulation.eu{quote(self.local_path)}?username={self.id}"
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Unsupported file store: {self.file_store}",
                )
        return Distribution(
            self.download_url,
            size=self.size,
            digest=self.hash,
            digest_method="SHA-1",
            content_type=self.content_type,
            original_file_name=self.local_path
        )

    def get_share_link(self, token):
        if self.local_path:
            home_dir = "/mnt/user/drive/My Libraries/My Library/"
            group_dir = "/mnt/user/drive/Shared with groups/"
            session = requests.Session()
            session.headers['Authorization'] = f"Bearer {token.credentials}"
            if self.local_path.startswith(home_dir):
                repo_id = session.get(f"{EBRAINS_DRIVE_API}default-repo").json()["repo_id"]
                relative_path = os.path.relpath(self.local_path, home_dir)
            elif self.local_path.startswith(group_dir):
                collab_name = self.local_path.split("/")[5]
                repo_list = session.get(f"{EBRAINS_DRIVE_API}repos/").json()
                repo_map = {r["name"]: r["id"] for r in repo_list}
                repo_id = session.get(f"{EBRAINS_DRIVE_API}repos/{repo_map[collab_name]}/").json()["id"]
                relative_path = os.path.relpath(self.local_path, f"{group_dir}{collab_name}/")
            else:
                repo_id = None
                relative_path = None
            if repo_id:
                response = session.put(f"{EBRAINS_DRIVE_API}repos/{repo_id}/file/shared-link/",
                                       json={"p": relative_path})
                if response.status_code == requests.codes.created:
                    return response.headers["Location"]
        return None


class ValidationResultSummary(BaseModel):
    id: UUID = None
    model_instance_id: UUID
    test_instance_id: UUID
    test_version: str
    score: float
    score_type: str = None
    data_type: str = None
    timestamp: datetime = None
    model_id: UUID
    model_name: str
    model_alias: str = None
    model_version: str = None
    test_id: UUID
    test_name: str
    test_alias: str = None

    @classmethod
    def from_kg_query(cls, result):
        return cls(
            id=uuid_from_uri(result["uri"]),
            model_instance_id=uuid_from_uri(result["model_instance"][0]["model_instance_id"]),
            test_instance_id=uuid_from_uri(result["test_instance"][0]["test_instance_id"]),
            test_version=result["test_instance"][0]["test_instance_version"],
            score=result["score"],
            score_type=result["test_instance"][0]["test"][0]["score_type"],
            data_type=result["test_instance"][0]["test"][0]["data_type"],
            timestamp=ensure_has_timezone(date_parser.parse(result["timestamp"])),
            model_id=uuid_from_uri(result["model_instance"][0]["model"][0]["model_id"]),  # beware possibility of multiple models with different schema versions here
            model_name=result["model_instance"][0]["model"][0]["model_name"],
            model_alias=result["model_instance"][0]["model"][0]["model_alias"],
            model_version=result["model_instance"][0]["model_instance_version"],
            test_id=uuid_from_uri(result["test_instance"][0]["test"][0]["test_id"]),
            test_name=result["test_instance"][0]["test"][0]["test_name"],
            test_alias=result["test_instance"][0]["test"][0]["test_alias"],
        )


class ValidationResult(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    old_uuid: UUID = None
    model_instance_id: UUID
    test_instance_id: UUID
    results_storage: List[File]  # for now at least, accept "collab:" and "swift:" URLs
    score: float
    passed: bool = None
    timestamp: datetime = None
    project_id: str = None
    normalized_score: float = None

    @classmethod
    def from_kg_object(cls, result, client):
        if result.generated_by:
            try:
                validation_activity = result.generated_by.resolve(client, api="nexus", scope="in progress")
            except Exception as err:
                raise ConsistencyError from err
        else:
            raise ConsistencyError("Missing ValidationActivity")
        if validation_activity is None:
            raise ConsistencyError("Missing ValidationActivity (may have been deleted)")
        model_instance_id = validation_activity.model_instance.uuid
        test_instance_id = validation_activity.test_script.uuid
        logger.debug("Serializing validation test result")
        logger.debug("Additional data for {}:\n{}".format(result.id, result.additional_data))
        additional_data = []
        for item in as_list(result.additional_data):
            item = item.resolve(client, api="nexus", scope="in progress")
            if item:
                additional_data.append(File.from_kg_object(item.result_file))
            else:
                logger.warning("Couldn't resolve {}".format(item))
        return cls(
            id=result.uuid,
            uri=result.id,
            old_uuid=result.old_uuid,
            model_instance_id=model_instance_id,
            test_instance_id=test_instance_id,
            results_storage=additional_data,  # todo: handle collab storage redirects
            score=result.score,
            passed=result.passed,
            timestamp=ensure_has_timezone(result.timestamp),
            project_id=result.collab_id,
            normalized_score=result.normalized_score,
        )

    @classmethod
    def from_kg_query(cls, result):
        additional_data = []
        for item in sorted(result["results_storage"], key=lambda item: item["http://schema.org/downloadURL"]["@id"] ):
            additional_data.append(
                File.from_kg_query(item)
            )
        return cls(
            id=uuid_from_uri(result["uri"]),
            uri=result["uri"],
            old_uuid=result["old_uuid"],
            model_instance_id=uuid_from_uri(result["model_instance"][0]["model_instance_id"]),
            test_instance_id=uuid_from_uri(result["test_instance"][0]["test_instance_id"]),
            results_storage=additional_data,  # todo: handle collab storage redirects
            score=result["score"],
            passed=result["passed"],
            timestamp=ensure_has_timezone(date_parser.parse(result["timestamp"])),
            project_id=result["project_id"],
            normalized_score=result["normalized_score"],
        )

    def to_kg_objects(self, kg_client):
        timestamp = ensure_has_timezone(self.timestamp) or datetime.now(timezone.utc)

        additional_data = [
            fairgraph.analysis.AnalysisResult(
                name=f"{file_obj.download_url} @ {timestamp.isoformat()}",
                result_file=file_obj.to_kg_object(),
                timestamp=timestamp,
            )
            for file_obj in self.results_storage
        ]
        kg_objects = additional_data[:]

        test_code = fairgraph.brainsimulation.ValidationScript.from_id(
            str(self.test_instance_id), kg_client, api="nexus"
        )
        test_definition = test_code.test_definition.resolve(kg_client, api="nexus", scope="in progress")
        model_instance = _get_model_instance_by_id_no_access_check(self.model_instance_id, kg_client)
        reference_data = fairgraph.core.Collection(
            f"Reference data for {test_definition.name}",
            members=as_list(test_definition.reference_data),
        )
        kg_objects.append(reference_data)

        result = fairgraph.brainsimulation.ValidationResult(
            name=f"Validation results for model {self.model_instance_id} and test {self.test_instance_id} with timestamp {timestamp.isoformat()}",
            generated_by=None,
            description=None,
            score=self.score,
            normalized_score=self.normalized_score,
            passed=self.passed,
            timestamp=timestamp,
            additional_data=additional_data,
            collab_id=self.project_id,
        )

        activity = fairgraph.brainsimulation.ValidationActivity(
            model_instance=model_instance,
            test_script=test_code,
            reference_data=reference_data,
            timestamp=timestamp,
            result=result,
        )
        kg_objects.append(result)
        kg_objects.append(activity)
        return kg_objects


class ValidationResultWithTestAndModel(ValidationResult):
    model_instance: ModelInstance
    test_instance: ValidationTestInstance
    model: ScientificModel
    test: ValidationTest

    @classmethod
    async def from_kg_object(cls, result, client, token):
        vr = ValidationResult.from_kg_object(result, client)

        model_instance_kg, model_id = await _get_model_instance_by_id(vr.model_instance_id, token)
        model_project = await _get_model_by_id_or_alias(model_id, token)

        model_instance = ModelInstance.from_kg_object(model_instance_kg, client, model_project.uuid)
        model = ScientificModel.from_kg_object(model_project, client)

        test_script = _get_test_instance_by_id(vr.test_instance_id, token)
        test_definition = _get_test_by_id_or_alias(test_script.test_definition.uuid, token)

        test_instance = ValidationTestInstance.from_kg_object(test_script, token)
        test = ValidationTest.from_kg_object(test_definition, client)

        return cls(
            id=vr.id,
            uri=vr.uri,
            old_uuid=vr.old_uuid,
            model_instance_id=vr.model_instance_id,
            test_instance_id=vr.test_instance_id,
            results_storage=vr.results_storage,
            score=vr.score,
            passed=vr.passed,
            timestamp=vr.timestamp,
            project_id=vr.project_id,
            normalized_score=vr.normalized_score,
            model_instance=model_instance,
            test_instance=test_instance,
            model=model,
            test=test
        )


class SoftwareDependency(BaseModel):
    name: str
    version: str = None


class ComputingEnvironment(BaseModel):
    name: str
    type: str = None   # todo: make this an Enum
    hardware: str = None
    dependencies: List[SoftwareDependency]

    @classmethod
    def from_kg_object(cls, env_obj, kg_client):
        hardware_obj = env_obj.hardware.resolve(kg_client, api="nexus", scope="in progress")
        dependencies = []
        for dep in as_list(env_obj.software):
            dep = dep.resolve(kg_client, api="nexus", scope="in progress")
            dependencies.append(
                SoftwareDependency(name=dep.name, version=dep.version)
            )
        return cls(
            name=hardware_obj.name,
            type=hardware_obj.description,
            hardware=env_obj.config,
            dependencies=dependencies
        )

    def to_kg_objects(self):
        kg_objects = {}
        dependencies = [fairgraph.software.Software(name=dep.name, version=dep.version)
                        for dep in self.dependencies]
        kg_objects['dependencies'] = dependencies

        hardware_obj = fairgraph.computing.HardwareSystem(name=self.name, description=self.type)
        kg_objects['hardware'] = hardware_obj

        identifier = hashlib.sha1(
            json.dumps({
                "hardware": self.hardware,
                "type": self.type,
                "name": self.name,
                "dependencies": [(dep.name, dep.version) for dep in self.dependencies]
            }).encode("utf-8")
        ).hexdigest()
        env_obj = fairgraph.computing.ComputingEnvironment(
            name=identifier,
            hardware=hardware_obj,
            config=self.hardware,
            software=dependencies
        )
        kg_objects['env'] = env_obj
        return kg_objects


class Simulation(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    description: str = None
    model_instance_id: UUID
    configuration: dict = None
    outputs: List[File]
    timestamp: datetime = None
    end_timestamp: datetime = None
    environment: ComputingEnvironment = None
    started_by: Person = None

    def _get_person(self, kg_client, token):
        if self.started_by is None:
            user_info = get_user_from_token(token.credentials)
            family_name = user_info["family_name"]
            given_name = user_info["given_name"]
        else:
            family_name = self.started_by.family_name
            given_name = self.started_by.given_name
        person = fairgraph.core.Person(family_name=family_name, given_name=given_name)
        return person

    @classmethod
    def from_kg_object(cls, sim_activity, kg_client):
        outputs = [output.resolve(kg_client, api="nexus", scope="in progress")
                   for output in as_list(sim_activity.result)]
        config_obj = sim_activity.config.resolve(kg_client, api="nexus", scope="in progress")
        if config_obj and config_obj.config_file:
            config = kg_client._nexus_client._http_client.get(config_obj.config_file.location)
        else:
            config = None
        if config is None:  # debugging
            config = {
                "error": {
                    "msg": f"Unable to retrieve config. config_obj={config_obj} config_file={config_obj.config_file.location}"
                }
            }
        env_obj = sim_activity.computing_environment.resolve(kg_client, api="nexus", scope="in progress")
        if env_obj:
            env = ComputingEnvironment.from_kg_object(env_obj, kg_client)
        else:
            env = None
        return cls(
            id=sim_activity.uuid,
            uri=sim_activity.id,
            description=sim_activity.description,
            model_instance_id=sim_activity.model_instance.uuid,
            configuration=config,
            outputs=[File.from_kg_object(output.result_file) for output in outputs],
            timestamp=sim_activity.timestamp,
            end_timestamp=sim_activity.end_timestamp,
            environment=env,
            started_by=Person.from_kg_object(sim_activity.started_by, kg_client)
        )

    def to_kg_objects(self, kg_client, token):
        kg_objects = {}

        # get person who launched this simulation
        person = self._get_person(kg_client, token)
        kg_objects['person'] = [person]

        # get timestamps
        start_timestamp = ensure_has_timezone(self.timestamp) or datetime.now(timezone.utc)
        end_timestamp = ensure_has_timezone(self.end_timestamp)

        # check if sim config already exists
        config_identifier = hashlib.sha1(json.dumps(self.configuration).encode("utf-8")).hexdigest()
        sim_config = fairgraph.brainsimulation.SimulationConfiguration.by_name(config_identifier, kg_client, api="nexus", scope="in progress")
        if not sim_config:
            tmp_config_file = tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", delete=False)
            json.dump(self.configuration, tmp_config_file)
            tmp_config_file.close()

            sim_config = fairgraph.brainsimulation.SimulationConfiguration(
                name=config_identifier,
                identifier=config_identifier,
                description=f"configuration for {self.description}",
                config_file=tmp_config_file.name
            )
        kg_objects['config'] = [sim_config]

        # get model instance
        model_instance = fairgraph.brainsimulation.ModelInstance.from_id(str(self.model_instance_id), kg_client, api="nexus", scope="in progress")

        sim_outputs = []
        n = len(self.outputs)
        for i, output_file in enumerate(self.outputs, start=1):
            output_identifier = hashlib.sha1(
                json.dumps({
                    "model_instance": model_instance.uuid,
                    "sim_config": sim_config.identifier,
                    "start_timestamp": start_timestamp.isoformat()
                }).encode("utf-8")).hexdigest()
            sim_output = fairgraph.brainsimulation.SimulationOutput(
                name=f"Output {i}/{n} from simulation of model instance {model_instance.uuid} with config {sim_config.name} at {start_timestamp}",
                identifier=output_identifier,
                result_file=output_file.to_kg_object(token),
                generated_by=None,  # to be added after saving
                derived_from=model_instance,
                #data_type=None,
                #variable=None,
                #target=None,
                description=f"Output from {self.description}",
                timestamp=end_timestamp or start_timestamp,
                #brain_region=None,
                #species=None,
                #celltype=None,
            )
            sim_outputs.append(sim_output)
        kg_objects['outputs'] = sim_outputs

        if self.environment:
            env_objs = self.environment.to_kg_objects()
        else:
            env_objs = None
        kg_objects.update(env_objs)

        sim_activity = fairgraph.brainsimulation.Simulation(
            #name=
            description=self.description,
            #identifier=
            model_instance=_get_model_instance_by_id_no_access_check(self.model_instance_id, kg_client),
            config=sim_config,
            timestamp=start_timestamp,
            result=sim_outputs,
            started_by=person,
            end_timestamp=end_timestamp,
            computing_environment=env_objs['env']
        )
        kg_objects['activity'] = sim_activity

        return kg_objects
        #os.remove(tmp_config_file.name)



class PersonWithAffiliation(BaseModel):
    firstname: str
    lastname: str
    affiliation: str = None

    @classmethod
    def from_kg_object(cls, p, client):
        if isinstance(p, KGProxy):
            pr = p.resolve(client, api="nexus", scope="in progress")
        else:
            pr = p
        if pr.affiliation:
            affiliation = pr.affiliation.resolve(client, api="nexus", scope="in progress").name
        else:
            affiliation = None
        return cls(firstname=pr.given_name, lastname=pr.family_name, affiliation=affiliation)

    def to_kg_object(self):
        p = fairgraph.core.Person(family_name=self.lastname, given_name=self.firstname)
        if self.affiliation and not (p.affiliation and p.affiliation.name == self.affiliation):
            org = fairgraph.core.Organization(name=self.affiliation)
            p.affiliation = org
        return p


class LivePaperDataItem(BaseModel):
    url: HttpUrl
    label: str
    view_url: HttpUrl = None
    type: str = None
    identifier: UUID = None

    @classmethod
    def from_kg_object(cls, data_item, kg_client):
        if isinstance(data_item, KGProxy):
            data_item = data_item.resolve(kg_client, api="nexus", scope="in progress")
        if data_item.resource_type in (None, "URL"):
            return cls(
                url=data_item.distribution.location,
                label=data_item.name,
                view_url=data_item.view_url,
                type=data_item.resource_type or "URL"
            )
        else:
            return cls(
                label=data_item.name,
                type=data_item.resource_type,
                identifier=UUID(data_item.identifier)
            )

    def to_kg_object(self, kg_live_paper_section, kg_live_paper):
        if self.identifier:
            identifier = self.identifier
        else:
            namespace = UUID('6669a40d-9afd-4ec6-aa23-7893c3b0ded1')
            identifier = uuid5(namespace,
                               (self.url + self.label + kg_live_paper_section.name
                                + kg_live_paper.name))
        distr = Distribution(self.url)
        return fairgraph.livepapers.LivePaperResourceItem(
            distribution=distr,
            name=self.label,
            view_url=self.view_url,
            identifier=str(identifier),
            resource_type=self.type,
            part_of=kg_live_paper_section
        )


class LivePaperSection(BaseModel):
    order: int
    type: str   # todo: make this an Enum
    title: str
    icon: str = None
    description: str = None
    data: List[LivePaperDataItem]

    @classmethod
    def from_kg_object(cls, section, kg_client):
        if isinstance(section, KGProxy):
            section = section.resolve(kg_client, api="nexus", scope="in progress")
        return cls(
            order=int(section.order),
            type=section.section_type,
            title=section.name,
            icon=section.icon,
            description=section.description,
            data=[LivePaperDataItem.from_kg_object(item, kg_client)
                  for item in as_list(section.data.resolve(kg_client, api="nexus", scope="in progress"))]
        )

    def to_kg_objects(self, kg_live_paper):
        section = fairgraph.livepapers.LivePaperResourceSection(
            order=self.order,
            section_type=self.type,
            name=self.title,
            icon=self.icon,
            description=self.description,
            part_of=kg_live_paper)
        data_items = [obj.to_kg_object(kg_live_paper_section=section,
                                       kg_live_paper=kg_live_paper)
                      for obj in self.data]
        return [section] + data_items


def inverse_license_lookup(iri):
    for key, value in fairgraph.commons.License.iri_map.items():
        if value == iri:
            return key


class LivePaper(BaseModel):
    lp_tool_version: str = "0.1"
    id: UUID = None
    alias: Slug = None
    modified_date: datetime
    version: str = None
    authors: List[PersonWithAffiliation]
    corresponding_author: List[PersonWithAffiliation]
    created_author: List[PersonWithAffiliation] = None
    approved_author: PersonWithAffiliation = None
    year: date
    live_paper_title: str
    associated_paper_title: str
    journal: str
    url: HttpUrl = None
    citation: str = None
    doi: HttpUrl = None
    associated_paper_doi: HttpUrl = None
    abstract: str = None
    license: str = None
    resources_description: str = None
    collab_id: str
    resources: List[LivePaperSection]

    @classmethod
    def from_kg_object(cls, lp, kg_client):
        def get_people(obj):
            if obj is None:
                return None
            return [PersonWithAffiliation.from_kg_object(p, kg_client) for p in as_list(obj)]

        def get_person(obj):
            if obj is None:
                return None
            return PersonWithAffiliation.from_kg_object(obj, kg_client)

        original_authors = get_people(lp.original_authors)
        ca_index = lp.corresponding_author_index
        if ca_index in (None, -1):
            ca_index = []
        return cls(
            modified_date=lp.date_modified or lp.date_created,
            alias=lp.alias,
            version=lp.version,
            authors=original_authors,
            corresponding_author=[original_authors[au] for au in as_list(ca_index)],
            created_author=get_people(lp.live_paper_authors),
            approved_author=get_person(lp.custodian),
            year=lp.date_published,
            associated_paper_title=lp.title,
            live_paper_title=lp.name,
            journal=lp.journal,
            url=getattr(lp.url, "location", None),
            citation=lp.citation,
            doi=lp.doi,
            associated_paper_doi=lp.associated_paper_doi,
            abstract=lp.abstract,
            license=getattr(lp.license, "label", None),
            collab_id=lp.collab_id,
            resources_description=lp.description,
            resources=[LivePaperSection.from_kg_object(sec, kg_client)
                       for sec in as_list(lp.resource_section.resolve(kg_client, api="nexus", scope="in progress"))],
            id=lp.uuid
        )

    def to_kg_objects(self, kg_client):
        original_authors = [p.to_kg_object() for p in self.authors]
        if self.corresponding_author:
            try:
                corresponding_author_index = [self.authors.index(au) for au in as_list(self.corresponding_author)]
            except ValueError as err:
                logger.error(str(err))
                corresponding_author_index = -1
        else:
            corresponding_author_index = -1
        if self.approved_author:
            custodian = self.approved_author.to_kg_object()
        else:
            custodian = None
        live_paper_authors = [p.to_kg_object() for p in as_list(self.created_author)]
        if self.url:
            url = Distribution(location=self.url)
        else:
            url = None
        lp = fairgraph.livepapers.LivePaper(
            name=self.live_paper_title,
            title=self.associated_paper_title,
            alias=self.alias,
            description=self.resources_description,
            date_modified=self.modified_date,
            version=self.version,
            original_authors=original_authors,
            corresponding_author_index=corresponding_author_index,
            custodian=custodian,
            live_paper_authors=live_paper_authors,
            collab_id=self.collab_id,
            date_published=self.year,
            journal=self.journal,
            url=url,
            citation=self.citation,
            doi=self.doi,
            associated_paper_doi=self.associated_paper_doi,
            abstract=self.abstract,
            license=fairgraph.commons.License(self.license)
        )
        if self.id:
            lp.id = lp.__class__.uri_from_uuid(self.id, kg_client)
        sections = sum([section.to_kg_objects(lp) for section in self.resources], [])
        authors = set(original_authors + live_paper_authors + [custodian])
        return {
            "people": authors,
            "sections": sections,
            "paper": [lp]
        }


class LivePaperSummary(BaseModel):
    id: UUID
    detail_path: str
    modified_date: datetime
    citation: str = None
    live_paper_title: str
    associated_paper_title: str
    year: date
    collab_id: str = None
    doi: str = None
    alias: str = None

    @classmethod
    def from_kg_object(cls, lp):
        return cls(
            modified_date=lp.date_modified or lp.date_created,
            live_paper_title=lp.name,
            associated_paper_title=lp.title,
            citation=lp.citation,
            year=lp.date_published,
            collab_id=lp.collab_id,
            doi=lp.doi,
            alias=lp.alias,
            id=lp.uuid,
            detail_path=f"/livepapers/{lp.uuid}"
        )


class AccessCode(BaseModel):
    value: str

    @validator('value')
    def min_length(cls, value):
        if len(value) < 6:
            raise ValueError("access code must contain at least six characters")
        return value
