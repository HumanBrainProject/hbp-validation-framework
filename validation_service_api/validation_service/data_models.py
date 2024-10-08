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

from fairgraph import KGProxy, IRI
from fairgraph.utility import as_list
from fairgraph.errors import ResolutionFailure, AuthenticationError, AuthorizationError
import fairgraph
import fairgraph.openminds.core as omcore
import fairgraph.openminds.computation as omcmp
import fairgraph.openminds.controlled_terms as omterms
import fairgraph.openminds.publications as ompub

from .examples import EXAMPLES
from .db import (_get_model_by_id_or_alias, _get_model_instance_by_id,
                 _get_test_by_id_or_alias, _get_test_instance_by_id)
from .auth import get_kg_client_for_service_account


kg_service_client = get_kg_client_for_service_account()
term_cache = {}

logger = logging.getLogger("validation_service_api")

EBRAINS_DRIVE_API = "https://drive.ebrains.eu/api2/"


special_spaces = ("common", "computation", "controlled", "dataset", "files", "in-depth",
                  "livepapers", "metadatamodel", "metric", "model", "myspace", "restricted",
                  "software", "spatial", "tutorial", "webservice"
                  )

def uuid_from_uri(uri):
    return uri.split("/")[-1]


def space_from_project_id(project_id):
    if project_id in special_spaces:
        return project_id
    else:
        return f"collab-{project_id}"

def project_id_from_space(space):
    if space in special_spaces:
        return space
    elif space.startswith("private-"):
        return "myspace"
    else:
        assert space.startswith("collab-")
        return space[len("collab-"):]


def is_private(space):
    return space == "myspace" or space.startswith("collab-") or space.startswith("private")


def filter_study_targets(study_targets):
    cell_types = []
    brain_regions = []
    species = []
    for item in as_list(study_targets):
        item = item.resolve(kg_service_client, scope="any")
        if isinstance(item, omterms.CellType):
            cell_types.append(item.name)
        elif isinstance(item, omterms.UBERONParcellation):
            brain_regions.append(item.name)
        elif isinstance(item, omterms.Species):
            species.append(item.name)
    return cell_types, brain_regions, species


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
            omterms.DifferenceMeasure,
            omcore.License,
            omcore.ContentType,  # todo: filter to include only types relevant to modelling
            omcore.Organization,
            omterms.Service,
            omterms.ActionStatusType
        ):
            objects = cls.list(kg_service_client, api="core", scope="any", size=10000)
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


def get_term_name_from_id(cls_name, attr):
    if attr:
        term = term_cache[cls_name]["ids"].get(attr.id, None)
        if term:
            return term.name
    return None


Slug = constr(regex=r"^\w[\w\-]+$", to_lower=True, strip_whitespace=True)


Species = Enum(
    "Species",
    [
        (name.replace(" ", "_"), name)
        for name in sorted(term_cache["Species"]["names"])
    ]
)


BrainRegion = Enum(
    "BrainRegion",
    [
        (name.replace(" ", "_"), name)
        for name in sorted(term_cache["UBERONParcellation"]["names"])
    ]
)


ModelScope = Enum(
    "ModelScope",
    [
        (name.replace(" ", "_").replace(":", "__"), name)
        for name in sorted(term_cache["ModelScope"]["names"])
    ],
)


AbstractionLevel = Enum(
    "AbstractionLevel",
    [
        (name.replace(" ", "_").replace(":", "__"), name)
        for name in sorted(term_cache["ModelAbstractionLevel"]["names"])
    ],
)


CellType = Enum(
    "CellType",
    [
        (name.replace(" ", "_"), name)
        for name in sorted(term_cache["CellType"]["names"])
    ]
)


def get_identifier(iri, prefix):
    """Return a valid Python variable name based on a KG object UUID"""
    return prefix + "_" + iri.split("/")[-1].replace("-", "")


ContentType = Enum(
    "ContentType",
    [
        (get_identifier(obj.uuid, "ct"), obj.name)
        for obj in sorted(term_cache["ContentType"]["names"].values(), key=lambda obj: obj.name)
    ]
)



class ImplementationStatus(str, Enum):
    dev = "in development"
    proposal = "proposal"
    published = "published"


RecordingModality = Enum(  # rename to something like DataType or ExperimentalTechnique
    "RecordingModality",
    [
        (name.replace(" ", "_"), name)
        for name in sorted(term_cache["Technique"]["names"])
        # or could use ExperimentalApproach
        # ideally should filter techniques to include only those are recording techniques
    ]
)


# class ValidationTestType(str, Enum):
#     # deprecated, largely redundant with RecordingModality
#     behaviour = "behaviour"
#     network_activity = "network activity"
#     network_structure = "network structure"
#     single_cell_activity = "single cell activity"
#     subcellular = "subcellular"


ScoreType = Enum(
    "ScoreType",
    [
        (name.replace(" ", "_"), name)
        for name in sorted(term_cache["DifferenceMeasure"]["names"])
    ]
)


License = Enum(
    "License",
    [
        (name.replace(" ", "_"), name)
        for name in sorted(term_cache["License"]["names"])
    ]
)


ActionStatusType = Enum(
    "ActionStatusType",
    [
        (name.replace(" ", "_"), name)
        for name in sorted(term_cache["ActionStatusType"]["names"])
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
        try:
            person = person.resolve(client, scope="any")
        except ResolutionFailure as err:
            logger.warn(str(err))
            return None
        orcid = None
        if person.digital_identifiers:
            for digid in as_list(person.digital_identifiers):
                if isinstance(digid, omcore.ORCID):
                    orcid = digid.identifier
                    break
                elif isinstance(digid, KGProxy) and digid.cls == omcore.ORCID:
                    try:
                        orcid = digid.resolve(client, scope="any").identifier
                    except ResolutionFailure:
                        pass
                    else:
                        break
        return cls(given_name=person.given_name, family_name=person.family_name,
                   orcid=orcid)

    def to_kg_object(self, client):
        candidates = omcore.Person.list(client, scope="any", family_name=self.family_name, given_name=self.given_name)
        if candidates:
            obj = as_list(candidates)[0]  # could perhaps look through for closest match if there are more than one
        else:
            obj = omcore.Person(family_name=self.family_name, given_name=self.given_name)
            if self.orcid:
                obj.digital_identifiers = [omcore.ORCID(identifier=self.orcid)]

        # allow creating missing authors (e.g. in private space) but not modifying existing ones
        # (because often the user will not have the required permissions)
        obj.allow_update = False

        return obj


class ModelInstance(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    version: str
    description: str = None
    parameters: HttpUrl = None
    code_format: ContentType = None
    source: AnyUrl = None  # should be required
    license: License = None  # use Enum
    hash: str = None
    timestamp: date = None
    morphology: HttpUrl = None
    model_id: UUID = None  # id of parent model
    alternatives: List[HttpUrl] = None  # alternative representations, e.g. EBRAINS Search, ModelDB

    class Config:  # can probably remove this
        extra = "allow"

    @classmethod
    def from_kg_query(cls, item, client):
        item["id"] = client.uuid_from_uri(item["uri"])
        item["model_id"] = client.uuid_from_uri(item["model_id"])
        if item["timestamp"]:
            item["timestamp"] = datetime.fromisoformat(item["timestamp"]).date()
        item.pop("repository", None)
        if item["version"] is None:
            item["version"] = "unknown"
        try:
            if client.is_released(item["uri"]):
                item["alternatives"].append(f"https://search.kg.ebrains.eu/instances/{item['id']}")
        except (AuthenticationError, AuthorizationError):
            # user clients generally cannot access unreleased data
            # so if we get this error, the item has almost certainly been released
            item["alternatives"].append(f"https://search.kg.ebrains.eu/instances/{item['id']}")
        if item["source"] and "modeldb" in item["source"].lower():
            item["alternatives"].append(item["source"])

        # provide download zip link if source is a container folder
        if item["source"] and "object.cscs.ch" in item["source"] and "?prefix" in item["source"] and item["source"][-1] == "/":
            if "hippocampus_optimization" in item["source"]:
                # Special case for BlueNaaS - link directly to the zip file within the container.
                # We'd like to do this in a cleaner way.
                # As a start, probably base it on content type rather than URL
                container, prefix = item["source"].split("?prefix=")
                model_name = prefix.split("/")[-2]
                item["source"] = f"{container}/{prefix}{model_name}.zip"
            else:
                item["source"] = f"https://data.kg.ebrains.eu/zip?container={item['source']}"
        if item.get("inputData", None):
            for input_url in item["inputData"]:
                _, extension = os.path.splitext(urlparse(input_url).path)
                if extension.lower() == ".asc":
                    item["morphology"] = input_url
                elif extension.lower() in (".json", ".yml", ".yaml", ".cfg", ".config", ".toml"):
                    item["parameters"] = input_url
        item.pop("inputData", None)
        return cls(**item)

    @classmethod
    def from_kg_object(cls, instance, client, model_id, scope):
        instance = instance.resolve(
            client,
            scope=scope,
            follow_links={
                "is_alternative_version_of": {},
                "repository": {},
                "licenses": {},
                "formats": {},
                "input_data": {}
            }
        )
        alternatives = [
            mv.homepage
            for mv in as_list(instance.is_alternative_version_of) if mv.homepage
        ]
        if instance.is_released(client):
            alternatives.append(f"https://search.kg.ebrains.eu/instances/{instance.uuid}")
        if instance.repository:
            repository = instance.repository
            source = str(repository.iri)
            if not source.startswith("http"):
                logger.error(f"Invalid URL: {source}")
                source = None
            elif "modeldb" in source.lower():
                alternatives.append(source)
            elif "object.cscs.ch" in source and "?prefix" in source and source[-1] == "/":
                if "hippocampus_optimization" in source:
                    # Special case for BlueNaaS - link directly to the zip file within the container.
                    # We'd like to do this in a cleaner way.
                    # As a start, probably base it on content type rather than URL
                    container, prefix = source.split("?prefix=")
                    model_name = prefix.split("/")[-2]
                    source = f"{container}/{prefix}{model_name}.zip"
                else:
                    source = f"https://data.kg.ebrains.eu/zip?container={source}"
            hash = getattr(repository.hash, "digest", None)
        else:
            source = None
            hash = None
        licenses = as_list(instance.licenses)
        content_types = as_list(instance.formats)
        instance_data = {
            "id": instance.uuid,
            "uri": instance.id,
            "version": instance.version_identifier or "unknown",
            "description": instance.version_innovation,
            "parameters": None,  # todo: get from instance.input_data
            "timestamp": instance.release_date,
            "model_id": model_id,
            "alternatives": alternatives,
            "code_format": ContentType(content_types[0].name) if content_types else None,
            "source": source,
            "license": License(licenses[0].name) if licenses else None,
            "hash": hash
        }
        if instance.input_data:
            for input_url in as_list(instance.input_data):
                if isinstance(input_url, KGProxy):  # this should not be needed, should have been resolved already
                    input_url = input_url.resolve(client, scope=scope)
                _, extension = os.path.splitext(urlparse(input_url.iri.value).path)
                if extension.lower() == ".asc":
                    instance_data["morphology"] = input_url.iri.value
                elif extension.lower() in (".json", ".yml", ".yaml", ".cfg", ".config", ".toml"):
                    instance_data["parameters"] = input_url.iri.value
        try:
            obj = cls(**instance_data)
        except ValidationError as err:
            logger.error(f"Validation error for data: {instance_data}")
            raise
        return obj

    def to_kg_object(self, model_project):
        repository = omcore.FileRepository(
            name=str(self.source),
            iri=IRI(str(self.source)),
            #hosted_by=
            #repository_type=
            hash=omcore.Hash(algorithm="SHA-1", digest=self.hash)  # are we sure we're using SHA-1?
        )
        input_data = []
        if self.morphology:
            input_data.append(omcore.WebResource(iri=IRI(str(self.morphology))))
        if self.parameters:
            input_data.append(omcore.WebResource(iri=IRI(str(self.parameters))))
        minst = omcore.ModelVersion(
            name=model_project.name,
            version_innovation=self.description or "",
            version_identifier=self.version,
            input_data=input_data,
            formats=get_term("ContentType", self.code_format),
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
    parameters: HttpUrl = None
    code_format: ContentType = None
    source: HttpUrl = None
    license: License = None
    hash: str = None
    timestamp: date = None
    morphology: HttpUrl = None

    class Config:  # can probably remove this
        extra = "allow"


class Image(BaseModel):
    caption: str = None
    url: HttpUrl


class ScientificModel(BaseModel):
    """

    """

    id: UUID = None
    uri: HttpUrl = None
    name: str
    alias: str = None
    author: List[Person]
    owner: List[Person]
    project_id: str = None  # make this required?
    organization: str = None
    private: bool = True
    cell_type: CellType = None
    model_scope: ModelScope = None
    abstraction_level: AbstractionLevel = None
    brain_region: BrainRegion = None
    species: Species = None
    description: str
    date_created: date = None
    format: List[str] = None
    images: List[Image] = None
    old_uuid: UUID = None
    instances: List[ModelInstance] = None

    class Config:
        schema_extra = {"example": EXAMPLES["ScientificModel"]}

    @classmethod
    def from_kg_query(cls, item, client):
        item.pop("@context", None)
        item["id"] = client.uuid_from_uri(item["uri"])
        item["instances"] = [
            ModelInstance.from_kg_query(instance, client)
            for instance in item.get("instances", [])
        ]
        space = item["project_id"]  # what the query calls "project_id" is really the space
        item["private"] = is_private(space)
        item["project_id"] = project_id_from_space(space)
        timestamps = [inst.timestamp
                      for inst in item["instances"]
                      if inst.timestamp is not None]
        if timestamps:
            item["date_created"] = min(timestamps)

        return cls(**item)

    @classmethod
    def from_kg_object(cls, model_project, client):
        assert model_project.scope is not None
        instances = []
        for inst_obj in as_list(model_project.has_versions):
            try:
                inst_obj = inst_obj.resolve(client, scope=model_project.scope)
                assert isinstance(inst_obj, omcore.ModelVersion)
                inst = ModelInstance.from_kg_object(inst_obj, client,
                                                    model_id=model_project.uuid,
                                                    scope=model_project.scope)
            except ResolutionFailure as err:
                logger.warning(f"Problem retrieving model instance {inst_obj.id}: {err}")
            else:
                instances.append(inst)
        cell_types, brain_regions, species = filter_study_targets(model_project.study_targets)
        if instances:
            timestamps = [inst.timestamp for inst in instances if inst.timestamp is not None]
            if timestamps:
                date_created = min(timestamps)
            else:
                date_created = None
        else:
            date_created = None
        custodians = [c.resolve(client, scope=model_project.scope)
                      for c in as_list(model_project.custodians)]
        organizations = [org.name for org in custodians if isinstance(org, omcore.Organization)]
        try:
            data = dict(
                id=model_project.uuid,
                uri=model_project.id,
                name=model_project.full_name,
                alias=model_project.short_name,
                author=[Person.from_kg_object(p, client)
                        for p in as_list(model_project.developers)],
                owner=[Person.from_kg_object(p, client)
                       for p in custodians
                       if isinstance(p, omcore.Person)],
                project_id=project_id_from_space(model_project.space),
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

    def to_kg_object(self, client):
        authors = [person.to_kg_object(client) for person in self.author]
        owners = [person.to_kg_object(client) for person in self.owner]
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
            full_name=self.name,
            short_name=self.alias,
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
            model_project.has_versions = model_versions
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
    format: List[str] = None

    @classmethod
    def from_kg_query(cls, item, client):
        item.pop("@context")
        item["id"] = client.uuid_from_uri(item["uri"])
        return cls(**item)

    @classmethod
    def from_kg_object(cls, model_project, client):
        logger.info(model_project.custodians)
        cell_types, brain_regions, species = filter_study_targets(model_project.study_targets)
        organizations = [org.name for org in as_list(model_project.custodians)
                         if isinstance(org, omcore.Organization)]
        if organizations:
            organization = organizations[0]
        else:
            organization = None
        try:
            obj = cls(
                id=model_project.uuid,
                uri=model_project.id,
                name=model_project.full_name,
                alias=model_project.short_name,
                author=[Person.from_kg_object(p, client)
                        for p in as_list(model_project.developers)],
                owner=[Person.from_kg_object(p, client)
                       for p in as_list(model_project.custodians)
                       #if isinstance(p, omcore.Person)],
                       if p.classes[0] == omcore.Person],
                project_id=project_id_from_space(model_project.space),
                organization=organization,
                private=is_private(model_project.space),
                cell_type=cell_types[0] if cell_types else None,
                model_scope=get_term_name_from_id("ModelScope", model_project.model_scope),
                abstraction_level=get_term_name_from_id("ModelAbstractionLevel", model_project.abstraction_level),
                brain_region=brain_regions[0] if brain_regions else None,
                species=species[0] if species else None,
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
    repository: HttpUrl = None
    version: str
    description: str = None
    parameters: HttpUrl = None
    path: str
    timestamp: datetime = None
    test_id: UUID = None

    @classmethod
    def from_kg_query(cls, item, client):
        item["id"] = client.uuid_from_uri(item["uri"])
        item["test_id"] = client.uuid_from_uri(item["test_id"])
        if item["timestamp"]:
            item["timestamp"] = datetime.fromisoformat(item["timestamp"])
        return cls(**item)

    @classmethod
    def from_kg_object(cls, test_version, test_uuid, client):
        test_version = test_version.resolve(client, scope="any")
        if test_version.repository:
            repository = test_version.repository.resolve(client, scope="any").iri.value
        else:
            repository = None
        if test_version.configuration:
            parameters = test_version.configuration.resolve(client, scope="any").iri.value
        else:
            parameters = None
        return cls(
            uri=test_version.id,
            id=test_version.uuid,
            description=test_version.version_innovation,
            path=test_version.entry_point,
            timestamp=test_version.release_date,
            repository=repository,
            version=test_version.version_identifier,
            test_id=test_uuid,
            parameters=parameters
        )

    def to_kg_object(self, test_definition):
        if self.repository:
            repository = omcore.FileRepository(
                name=self.repository,
                iri=IRI(self.repository),
            )
        else:
            repository = None
        reference_data = [
            omcore.WebResource(iri=IRI(url))
            for url in test_definition.data_location
            # mismatch with openMINDS - all instances have same test data, to be fixed in API v3
        ]
        if self.parameters:
            configuration = omcore.WebResource(iri=IRI(self.parameters))
        else:
            configuration = None
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
            configuration=configuration
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
    parameters: HttpUrl = None
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
    project_id: str = None  # make this required?
    private: bool = True
    cell_type: CellType = None
    brain_region: BrainRegion = None
    species: Species = None
    description: str  # was 'protocol', renamed for consistency with models
    date_created: datetime = None
    old_uuid: UUID = None
    data_location: List[HttpUrl]
    data_type: str = None
    recording_modality: RecordingModality = None
    test_type: ModelScope = None
    score_type: ScoreType = None
    instances: List[ValidationTestInstance] = None
    # todo: add "publication" field

    @classmethod
    def from_kg_query(cls, item, user_client, service_client):
        item.pop("@context", None)
        item["id"] = user_client.uuid_from_uri(item["uri"])
        space = item["project_id"]  # what the query calls "project_id" is really the space
        item["private"] = is_private(space)
        item["project_id"] = project_id_from_space(space)
        item["instances"] = [
            ValidationTestInstance.from_kg_query(instance, user_client)
            for instance in item.get("instances", [])
        ]
        if len(item["instances"]) == 0:
            item["implementation_status"] = ImplementationStatus.proposal
        elif service_client.is_released(item["uri"]):
            item["implementation_status"] = ImplementationStatus.published
        else:
            item["implementation_status"] = ImplementationStatus.dev
        data_locations = []
        for loc in item["data_location"]:
            for field in ("IRI", "URL", "name"):
                if loc[field] and loc[field].startswith("http"):
                    data_locations.append(loc[field])
                    break
        item["data_location"] = data_locations
        return cls(**item)

    @classmethod
    def from_kg_object(cls, test_definition, client):
        versions = [ver.resolve(client, scope="any") for ver in as_list(test_definition.has_versions)]
        instances = [
            ValidationTestInstance.from_kg_object(inst, test_definition.uuid, client) for inst in versions
        ]
        cell_types, brain_regions, species = filter_study_targets(test_definition.study_targets)
        if len(versions) > 0:
            latest_version = sorted(versions,
                                    key=lambda ver: ver.version_identifier)[-1]
            reference_data = []
            for item in as_list(latest_version.reference_data):
                try:
                    rdi = item.resolve(client, scope="any")
                except ResolutionFailure as err:
                    logger.warning(str(err))
                else:
                    reference_data.append(rdi)
            data_location = []
            data_type = set()
            for item in reference_data:
                if hasattr(item, "iri"):  # File or WebResource
                    data_location.append(item.iri.value)
                    data_type.add(item.format)
            data_type = list(data_type)
            if len(data_type) == 1:
                data_type = data_type[0]
            elif len(data_type) == 0:
                data_type = None
        else:
            data_location = None
            data_type = None
        if len(instances) == 0:
            implementation_status = ImplementationStatus.proposal
        elif test_definition.is_released(client):
            implementation_status = ImplementationStatus.published
        else:
            implementation_status = ImplementationStatus.dev
        date_created = None
        timestamps = [inst.timestamp for inst in instances if inst.timestamp is not None]
        if timestamps:
            date_created = min(timestamps)
        authors = []
        for p in as_list(test_definition.developers):
            person = Person.from_kg_object(p, client)
            if person:
                authors.append(person)
        obj = cls(
            id=test_definition.uuid,
            uri=test_definition.id,
            name=test_definition.full_name,
            alias=test_definition.short_name,
            implementation_status=implementation_status,
            private=is_private(test_definition.space),
            #custodians=test_definition.custodians,
            description=test_definition.description,
            author=authors,
            project_id=project_id_from_space(test_definition.space),
            cell_type=cell_types[0] if cell_types else None,
            brain_region=brain_regions[0] if brain_regions else None,
            species=species[0] if species else None,
            date_created=date_created,
            data_location=data_location,
            data_type=data_type,
            test_type=ModelScope(test_definition.model_scope.resolve(client).name) if test_definition.model_scope else None,
            #digital_identifier=test_definition.digital_identifier,
            recording_modality=RecordingModality(test_definition.reference_data_acquisitions.resolve(client).name) if test_definition.reference_data_acquisitions else None,
            instances=sorted(instances, key=lambda inst: inst.version),
            score_type=ScoreType(test_definition.score_type.resolve(client).name) if test_definition.score_type else None,
        )
        return obj

    def to_kg_object(self, client):
        developers = [person.to_kg_object(client) for person in self.author]
        #timestamp = ensure_has_timezone(self.date_created) or datetime.now(timezone.utc)
        timestamp = None
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

        if self.alias is None:
            self.alias = slugify(self.name)
        test_definition = omcmp.ValidationTest(
            full_name=self.name,
            short_name=self.alias,
            custodians=developers,
            description=self.description,
            developers=developers,
            #digital_identifier=,
            reference_data_acquisitions=get_term("Technique", self.recording_modality),
            #homepage=,
            #how_to_cite=,
            model_scope=get_term("ModelScope", self.test_type),
            score_type=get_term("DifferenceMeasure", self.score_type),
            study_targets=study_targets
        )
        if self.uri:
            test_definition.id = str(self.uri)

        if self.instances:
            test_versions = [
                instance.to_kg_object(test_definition=self)
                for instance in self.instances
            ]
            test_definition.has_versions = test_versions

        return test_definition


class ValidationTestSummary(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    name: str
    alias: str = None
    implementation_status: ImplementationStatus = ImplementationStatus.proposal
    private: bool = True
    project_id: str = None  # make this required?
    author: List[Person]
    cell_type: CellType = None
    brain_region: BrainRegion = None
    species: Species = None
    description: str  # was 'protocol', renamed for consistency with models
    date_created: datetime = None
    data_type: str = None
    recording_modality: RecordingModality = None
    test_type: ModelScope = None
    score_type: ScoreType = None

    @classmethod
    def from_kg_query(cls, item, client):
        item.pop("@context")
        item["id"] = client.uuid_from_uri(item["uri"])
        space = item.get("project_id", None)  # what the query calls "project_id" is really the space
        if space:
            item["project_id"] = project_id_from_space(space)
        return cls(**item)

    @classmethod
    def from_kg_object(cls, test_definition, client):
        obj = cls(
            id=test_definition.uuid,
            uri=test_definition.id,
            name=test_definition.full_name,
            alias=test_definition.short_name,
            implementation_status=None,  # to fix (test_definition.status or ImplementationStatus.proposal.value),
            private=is_private(test_definition),
            author=[Person.from_kg_object(p, client) for p in as_list(test_definition.developers)],
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
    test_type: ModelScope = None
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
    def from_kg_object(cls, file_obj, client):
        file_obj = file_obj.resolve(client, scope="any")
        url = file_obj.iri.value
        url_parts = urlparse(url)
        id = None
        local_path = file_obj.iri.value.split("/")[-1]
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
            download_url=file_obj.iri.value,
            hash=file_obj.hash.digest if file_obj.hash else None,
            size=file_obj.storage_size,
            content_type=file_obj.format.name if file_obj.format else None,
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

    def to_kg_object(self, client):
        if self.download_url is None:
            if self.file_store == "drive":
                self.download_url = f"https://seafile-proxy.brainsimulation.eu{quote(self.local_path)}?username={self.id}"
                if client:
                    token = client._kg_client.instances._kg_config.token_handler.get_token()
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
        return omcore.File(
            id=client.uri_from_uuid(self.id) if self.id else None,
            name=self.local_path,
            iri=IRI(str(self.download_url)),
            format=get_term("ContentType", self.content_type),
            hash=omcore.Hash(algorithm="SHA-1", digest=self.hash),  # are we sure we're using SHA-1?
            storage_size=self.size,
            content_description=self.local_path
        )

    def get_share_link(self, token):
        if self.local_path:
            home_dir = "/mnt/user/drive/My Libraries/My Library/"
            group_dir = "/mnt/user/drive/Shared with groups/"
            session = requests.Session()
            session.headers['Authorization'] = f"Bearer {token}"
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
    def from_kg_query(cls, item, client, service_client=None):
        item.pop("@context")
        item["id"] = client.uuid_from_uri(item["uri"])
        item["model_instance_id"] = client.uuid_from_uri(item["model_instance_id"])
        item["test_instance_id"] = client.uuid_from_uri(item["test_instance_id"])
        item["model_id"] = client.uuid_from_uri(item["model_id"])
        item["test_id"] = client.uuid_from_uri(item["test_id"])
        return cls(**item)

    @classmethod
    def from_kg_object(cls, validation_activity, client):
        logger.info(validation_activity.inputs)
        inputs = [obj.resolve(client, scope="any") for obj in validation_activity.inputs]
        model_instance = [obj for obj in inputs if isinstance(obj, omcore.ModelVersion)][0]
        model_instance_id = model_instance.uuid
        model = model_instance.is_version_of(client)
        test_instance = [obj for obj in inputs if isinstance(obj, omcmp.ValidationTestVersion)][0]
        test_instance_id = test_instance.uuid
        test = test_instance.is_version_of(client)
        # data_type = set()
        # for item in as_list(test_instance.reference_data):
        #     item = item.resolve(client, scope="any")
        #     if hasattr(item, "iri"):  # File
        #         data_type.add(item.format)
        # data_type = list(data_type)
        # if len(data_type) == 1:
        #     data_type = data_type[0]
        # elif len(data_type) == 0:
        #     data_type = None
        data_type = None
        return cls(
            id=validation_activity.uuid,
            model_instance_id=model_instance_id,
            test_instance_id=test_instance_id,
            test_version=test_instance.version_identifier,
            score=validation_activity.score,
            score_type=ScoreType(test.score_type.resolve(client).name) if test.score_type else None,
            data_type=data_type,
            timestamp=ensure_has_timezone(validation_activity.start_time),
            model_id=model.uuid,
            model_name=model.full_name,
            model_alias=model.short_name,
            model_version=model_instance.version_identifier,
            test_id=test.uuid,
            test_name=test.full_name,
            test_alias=test.short_name
        )


class ValidationResult(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    old_uuid: UUID = None
    model_instance_id: UUID
    test_instance_id: UUID
    results_storage: List[File]
    score: float
    passed: bool = None
    timestamp: datetime = None
    project_id: str = None
    normalized_score: float = None

    @classmethod
    def from_kg_object(cls, validation_activity, client):
        inputs = [obj.resolve(client, scope="any") for obj in validation_activity.inputs]
        model_instance = [obj for obj in inputs if isinstance(obj, omcore.ModelVersion)][0]
        model_instance_id = model_instance.uuid
        test_instance = [obj for obj in inputs if isinstance(obj, omcmp.ValidationTestVersion)][0]
        test_instance_id = test_instance.uuid
        additional_data = []
        for item in as_list(validation_activity.outputs):
            additional_data.append(File.from_kg_object(item, client))
        return cls(
            id=validation_activity.uuid,
            uri=validation_activity.id,
            old_uuid=None,
            model_instance_id=model_instance_id,
            test_instance_id=test_instance_id,
            results_storage=additional_data,
            score=validation_activity.score,
            passed=None,
            timestamp=ensure_has_timezone(validation_activity.start_time),
            project_id=project_id_from_space(validation_activity.space),
            normalized_score=None,
        )

    @classmethod
    def from_kg_query(cls, item, client, service_client=None):
        item.pop("@context")
        item["id"] = client.uuid_from_uri(item["uri"])
        item["model_instance_id"] = client.uuid_from_uri(item["model_instance_id"])
        item["test_instance_id"] = client.uuid_from_uri(item["test_instance_id"])
        item["project_id"] = project_id_from_space(item["project_id"])
        return cls(**item)

    def to_kg_objects(self, client):
        timestamp = ensure_has_timezone(self.timestamp) or datetime.now(timezone.utc)

        additional_data = [
            File.to_kg_object(file_obj, client)
            for file_obj in self.results_storage
        ]

        model_version = omcore.ModelVersion.from_id(str(self.model_instance_id), client, scope="any")
        if model_version is None:
            raise HTTPException(
               status_code=status.HTTP_400_BAD_REQUEST,
               detail=f"There is no model instance with id {self.model_instance_id}",
            )
        test_version = omcmp.ValidationTestVersion.from_id(str(self.test_instance_id), client, scope="any")
        if test_version is None:
            raise HTTPException(
               status_code=status.HTTP_400_BAD_REQUEST,
               detail=f"There is no validation test instance with id {self.test_instance_id}",
            )

        user = omcore.Person.me(client)
        additional_metadata = None
        lookup_label=f"Validation results for model {self.model_instance_id} and test {self.test_instance_id} with timestamp {timestamp.isoformat()}",
        if self.passed or self.normalized_score:
            additional_metadata = omcore.CustomPropertySet(
                data_location=omcore.PropertyValueList(
                    lookup_label=lookup_label,
                    property_value_pairs=[
                        omcore.NumericalProperty(name="passed", values=self.passed),
                        omcore.NumericalProperty(name="normalized_score", values=self.normalized_score)
                    ]
                )
            )
        validation_activity = omcmp.ModelValidation(
            lookup_label=lookup_label,
            description=None,
            end_time=None,
            environment=None,
            inputs=[model_version, test_version],
            launch_configuration=None,
            outputs=additional_data,
            custom_property_sets=additional_metadata,
            recipe=None,
            resource_usages=None,
            start_time=self.timestamp,
            started_by=user,
            status=get_term("ActionStatusType", ActionStatusType.completed),
            #study_targets=list(set(model.study_targets + test.study_targets)),
            tags=None,
            was_informed_by=None,
            score=self.score
        )
        if self.id:
            validation_activity.id = client.uri_from_uuid(self.id)
        if test_version.reference_data:
            validation_activity.inputs.extend(as_list(test_version.reference_data))

        return validation_activity


class ValidationResultWithTestAndModel(ValidationResult):
    model_instance: ModelInstance
    test_instance: ValidationTestInstance
    model: ScientificModel
    test: ValidationTest

    @classmethod
    def from_kg_query(cls, item, client, service_client=None):
        item.pop("@context")
        item["id"] = client.uuid_from_uri(item["uri"])
        item["model_instance_id"] = client.uuid_from_uri(item["model_instance_id"])
        item["test_instance_id"] = client.uuid_from_uri(item["test_instance_id"])
        item["model_instance"]["id"] = client.uuid_from_uri(item["model_instance"]["uri"])
        item["test_instance"]["id"] = client.uuid_from_uri(item["test_instance"]["uri"])
        item["model"]["id"] = client.uuid_from_uri(item["model"]["uri"])
        item["test"]["id"] = client.uuid_from_uri(item["test"]["uri"])
        item["model_instance"] = ModelInstance.from_kg_query(item["model_instance"], client)
        item["test_instance"] = ValidationTestInstance.from_kg_query(item["test_instance"], client)
        item["model"] = ScientificModel.from_kg_query(item["model"], client)
        item["test"] = ValidationTest.from_kg_query(item["test"], client, service_client)

        return cls(**item)

    @classmethod
    def from_kg_object(cls, validation_activity, client):
        vr = ValidationResult.from_kg_object(validation_activity, client)

        model_instance_kg, model_id = _get_model_instance_by_id(vr.model_instance_id, client, scope="any")
        model_project = _get_model_by_id_or_alias(model_id, client, scope="any")

        model_instance = ModelInstance.from_kg_object(model_instance_kg, client, model_project.uuid, scope="any")
        model = ScientificModel.from_kg_object(model_project, client)

        test_script = _get_test_instance_by_id(vr.test_instance_id, client, scope="any")
        test_definition = test_script.is_version_of.resolve(client, scope="any")

        test_instance = ValidationTestInstance.from_kg_object(test_script, test_definition.uuid, client)
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
    def from_kg_object(cls, p, client, reference_date=None):
        if isinstance(p, KGProxy):
            pr = p.resolve(client, scope="any")
        else:
            pr = p
        if pr.affiliations:
            affiliations = [
                affil.resolve(client, scope="any", follow_links={"member_of": {}})
                for affil in as_list(pr.affiliations)
            ]
            affiliation_strs = []
            for affil in affiliations:
                if affil.member_of and hasattr(affil.member_of, "name"):
                    if reference_date:
                        start_date = affil.start_date and affil.start_date or datetime(1, 1, 1)
                        end_date = affil.end_date and affil.end_date or datetime(9999, 12, 31)
                        if start_date <= reference_date <= end_date:
                            affiliation_strs.append(affil.member_of.name)
                    else:
                        affiliation_strs.append(affil.member_of.name)
            if affiliation_strs:
                affiliation = "; ".join(affiliation_strs)
            else:
                affiliation = None
            # todo: need a better way to handle affiliations for publications than the start and end dates
            #       as publications often reflect work done in a previous institution.
        else:
            affiliation = None
        return cls(firstname=pr.given_name, lastname=pr.family_name, affiliation=affiliation)

    def to_kg_object(self, client):
        candidates = omcore.Person.list(client, scope="any", family_name=self.lastname, given_name=self.firstname)
        if candidates:
            p = as_list(candidates)[0]  # could perhaps look through for closest match if there are more than one
        else:
            p = omcore.Person(family_name=self.lastname, given_name=self.firstname)
            if self.affiliation and not (p.affiliations and p.affiliations[0].member_of.name == self.affiliation):
                org = omcore.Organization(name=self.affiliation)
                p.affiliations = omcore.Affiliation(member_of=org)
        p.allow_update = False
        return p

    def __eq__(self, other):
        return self.firstname == other.firstname and self.lastname == other.lastname

    def __hash__(self):
        return hash(f"{self.lastname}, {self.firstname}")


def slugify(name):
    slug = ""
    for char in name.replace(" ", "-"):
        if char.isalnum() or char in "-_":
            slug += char
    return slug.lower()




def get_citation_string(citation_data):
    authors = citation_data["authors"]
    if len(authors) == 1:
        author_str = f"{authors[0]['given_name']} {authors[0]['family_name']}"
    elif len(authors) > 1:
        author_str = ", ".join(f"{au['given_name']} {au['family_name']}" for au in authors[:-1])
        author_str += " & " + f"{authors[-1]['given_name']} {authors[-1]['family_name']}"
    else:
        author_str = ""
    title = citation_data["title"]
    if title and title[-1] != ".":
        title += "."
    journal_name, volume_number, issue_number = None, None, None
    if citation_data["is_part_of"]:
        volume_number = citation_data["is_part_of"]["volume_number"]
        if citation_data["is_part_of"]["is_part_of"]:
            journal_name = citation_data["is_part_of"]["is_part_of"]["journal"]
    pagination = citation_data["pagination"]
    date_published = datetime.fromisoformat(citation_data["publication_date"])
    return f"{author_str} ({date_published.year}). {title} {journal_name}, {volume_number}: {pagination}."
