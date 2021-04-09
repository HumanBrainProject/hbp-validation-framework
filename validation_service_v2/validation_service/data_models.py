import os
from os.path import join, dirname
from uuid import UUID
from enum import Enum
from typing import List
from datetime import datetime, timezone, date
from itertools import chain
import logging
import json
import tempfile
import hashlib
from urllib.parse import urlparse, parse_qs, quote

from dateutil import parser as date_parser
from pydantic.errors import ColorError
from pyld.jsonld import _compare_shortest_least
import requests

from pydantic import BaseModel, HttpUrl, AnyUrl, validator, ValidationError
from fastapi.encoders import jsonable_encoder
from fastapi import HTTPException, status

from fairgraph.base import KGQuery, KGProxy, as_list, IRI, Distribution
import fairgraph
import fairgraph.core
import fairgraph.brainsimulation

from .examples import EXAMPLES
from .db import (_get_model_by_id_or_alias, _get_model_instance_by_id,
                 _get_test_by_id_or_alias, _get_test_instance_by_id)
from .auth import get_user_from_token


fairgraph.core.use_namespace(fairgraph.brainsimulation.DEFAULT_NAMESPACE)
fairgraph.software.use_namespace(fairgraph.brainsimulation.DEFAULT_NAMESPACE)
fairgraph.computing.use_namespace(fairgraph.brainsimulation.DEFAULT_NAMESPACE)
fairgraph.commons.License.initialize(join(dirname(__file__), "spdx_licences.json"))
fairgraph.uniminds.ModelInstance.set_strict_mode(False, "abstraction_level")
fairgraph.brainsimulation.MEModel.set_strict_mode(False, "model_of")
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
    [(name.replace(" ", "_"), name) for name in fairgraph.commons.BrainRegion.iri_map.keys()],
)


ModelScope = Enum(
    "ModelScope",
    [
        (name.replace(" ", "_").replace(":", "__"), name)
        for name in fairgraph.commons.ModelScope.iri_map.keys()
    ],
)


AbstractionLevel = Enum(
    "AbstractionLevel",
    [
        (name.replace(" ", "_").replace(":", "__"), name)
        for name in fairgraph.commons.AbstractionLevel.iri_map.keys()
    ],
)


CellType = Enum(
    "CellType",
    [(name.replace(" ", "_"), name) for name in fairgraph.commons.CellType.iri_map.keys()],
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
    subcellular = "subcellular"


class ScoreType(str, Enum):
    other = "Other"
    rsquare = "Rsquare"
    pvalue = "p-value"
    zscore = "z-score"


License = Enum(
    "License",
    [(name.replace(" ", "_"), name) for name in fairgraph.commons.License.iri_map.keys()],
)


class Person(BaseModel):
    given_name: str
    family_name: str
    orcid: str = None   # todo: add this to KG model

    @classmethod
    def from_kg_object(cls, p, client):
        if isinstance(p, KGProxy):
            pr = p.resolve(client, api="nexus")
        else:
            pr = p
        return cls(given_name=pr.given_name, family_name=pr.family_name)

    def to_kg_object(self):
        return fairgraph.core.Person(family_name=self.family_name, given_name=self.given_name)


class ModelInstance(BaseModel):
    id: UUID = None
    uri: HttpUrl = None
    version: str
    description: str = None
    parameters: str = None  # or dict?
    code_format: str = None
    source: AnyUrl = None  # should be required
    license: str = None  # use Enum
    hash: str = None
    timestamp: datetime = None
    morphology: HttpUrl = None
    model_id: UUID = None  # id of parent model
    alternatives: List[HttpUrl] = None  # alternative representations, e.g. EBRAINS Search, ModelDB

    class Config:
        extra = "allow"  # we temporarily store the IDs of sub-objects (e.g. ModelScript)
        # during object updates

    @classmethod
    def from_kg_object(cls, instance, client, model_id):
        if isinstance(instance, KGProxy):
            instance = instance.resolve(client, api="nexus")
            if instance is None:
                raise Exception(f"Instance not found.")
        instance_data = {
            "id": instance.uuid,
            "uri": instance.id,
            "version": instance.version,
            "description": instance.description,
            "parameters": instance.parameters,
            "timestamp": ensure_has_timezone(instance.timestamp),
            "model_id": model_id,
            "alternatives": []
        }
        if instance.main_script:
            main_script = instance.main_script.resolve(client, api="nexus")
        else:
            raise Exception(f"main_script unexpectedly not present.\ninstance: {instance}")
        if main_script:
            instance_data.update(
                {
                    "code_format": main_script.code_format,
                    "source": main_script.code_location,
                    "license": main_script.license,
                    "script_id": main_script.id,  # internal use only
                    "hash": getattr(main_script.distribution, "digest", None)
                }
            )
        if instance.alternate_of:
            for alt in as_list(instance.alternate_of):
                alt_obj = alt.resolve(client, api="nexus")
                if alt_obj and alt_obj.identifier:
                    url = f"https://kg.ebrains.eu/search/instances/Model/{alt_obj.identifier}"
                    instance_data["alternatives"].append(url)
        if hasattr(instance, "morphology"):
            morph = instance.morphology.resolve(client, api="nexus")
            instance_data["morphology"] = morph.morphology_file
            instance_data["morphology_id"] = morph.id  # internal
        if hasattr(instance, "e_model"):
            instance_data["e_model_id"] = instance.e_model.id
        try:
            obj = cls(**instance_data)
        except ValidationError as err:
            logger.error(f"Validation error for data: {instance_data}")
            raise
        return obj

    def to_kg_objects(self, model_project):
        script = fairgraph.brainsimulation.ModelScript(
            name=f"ModelScript for {model_project.name} @ {self.version}",
            code_format=self.code_format,
            code_location=self.source,
            license=self.license,
        )
        if hasattr(self, "script_id"):
            script.id = self.script_id
        kg_objects = [script]

        if (
            model_project.model_of
            and model_project.model_of.label == "single cell"
            and self.morphology
        ):
            e_model = fairgraph.brainsimulation.EModel(
                name=f"EModel for {model_project.name} @ {self.version}",
                brain_region=model_project.brain_region,
                species=model_project.species,
                model_of=None,
                main_script=None,
                release=None,
            )
            if hasattr(self, "e_model_id"):
                e_model.id = self.e_model_id
            kg_objects.append(e_model)
            morph = fairgraph.brainsimulation.Morphology(
                name=f"Morphology for {model_project.name} @ {self.version}",
                cell_type=model_project.celltype,
                morphology_file=self.morphology,
            )
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
                timestamp=ensure_has_timezone(self.timestamp) or datetime.now(timezone.utc),
                release=None,
            )
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
                timestamp=ensure_has_timezone(self.timestamp) or datetime.now(timezone.utc),
                release=None,
            )
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
    images: List[Image] = None
    old_uuid: UUID = None
    instances: List[ModelInstance] = None

    class Config:
        schema_extra = {"example": EXAMPLES["ScientificModel"]}

    @classmethod
    def from_kg_object(cls, model_project, client):
        instances = []
        for inst_obj in as_list(model_project.instances):
            try:
                inst = ModelInstance.from_kg_object(inst_obj, client, model_id=model_project.uuid)
            except Exception as err:
                logger.warning(f"Problem retrieving model instance {inst_obj.id}: {err}")
            else:
                instances.append(inst)
        try:
            obj = cls(
                id=model_project.uuid,
                uri=model_project.id,
                name=model_project.name,
                alias=model_project.alias,
                author=[Person.from_kg_object(p, client) for p in as_list(model_project.authors)],
                owner=[Person.from_kg_object(p, client) for p in as_list(model_project.owners)],
                project_id=model_project.collab_id,
                organization=model_project.organization.resolve(client, api="nexus").name
                if model_project.organization
                else None,
                private=model_project.private,
                cell_type=model_project.celltype.label if model_project.celltype else None,
                model_scope=model_project.model_of.label if model_project.model_of else None,
                abstraction_level=model_project.abstraction_level.label
                if model_project.abstraction_level
                else None,
                brain_region=model_project.brain_region.label
                if model_project.brain_region
                else None,
                species=model_project.species.label if model_project.species else None,
                description=model_project.description,
                date_created=model_project.date_created,
                images=as_list(model_project.images),
                old_uuid=model_project.old_uuid,
                instances=instances,
            )
        except ValidationError as err:
            logger.error(f"Validation error for data from model project: {model_project}")
            raise
        return obj

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
            date_created=self.date_created or datetime.now(timezone.utc),
            private=self.private,
            collab_id=self.project_id,
            alias=self.alias,
            organization=org,
            brain_region=get_ontology_object(fairgraph.commons.BrainRegion, self.brain_region),
            species=get_ontology_object(fairgraph.commons.Species, self.species),
            celltype=get_ontology_object(fairgraph.commons.CellType, self.cell_type),
            abstraction_level=get_ontology_object(
                fairgraph.commons.AbstractionLevel, self.abstraction_level
            ),
            model_of=get_ontology_object(fairgraph.commons.ModelScope, self.model_scope),
            images=jsonable_encoder(self.images),
        )
        if self.uri:
            model_project.id = str(self.uri)

        if self.instances:
            for instance in self.instances:
                kg_objects.extend(instance.to_kg_objects(model_project))
            model_project.instances = [
                obj
                for obj in kg_objects
                if (
                    isinstance(obj, fairgraph.brainsimulation.ModelInstance)
                    and not isinstance(obj, fairgraph.brainsimulation.EModel)
                )
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
    def from_kg_object(cls, test_script, client):
        return cls(
            uri=test_script.id,
            id=test_script.uuid,
            old_uuid=test_script.old_uuid,
            repository=test_script.repository.value,
            version=test_script.version,
            description=test_script.description,
            parameters=test_script.parameters,
            path=test_script.test_class,
            timestamp=ensure_has_timezone(test_script.date_created),
            test_id=test_script.test_definition.uuid,
        )

    def to_kg_objects(self, test_definition):
        script = fairgraph.brainsimulation.ValidationScript(
            name=f"Implementation of {test_definition.name}, version '{self.version}'",
            date_created=ensure_has_timezone(self.timestamp) or datetime.now(timezone.utc),
            repository=IRI(self.repository),
            version=self.version,
            description=self.description,
            parameters=self.parameters,
            test_class=self.path,
            test_definition=test_definition,
            id=self.uri,
        )
        if self.uri:
            script.id = str(self.uri)
        return [script]


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
    def from_kg_object(cls, test_definition, client, recently_saved_scripts=[]):
        # due to the time it takes for Nexus to become consistent, we add newly saved scripts
        # to the result of the KG query in case they are not yet included
        scripts = {
            scr.id: scr for scr in as_list(test_definition.scripts.resolve(client, api="nexus"))
        }
        for script in recently_saved_scripts:
            scripts[id] = script
        instances = [
            ValidationTestInstance.from_kg_object(inst, client) for inst in scripts.values()
        ]
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
            old_uuid=test_definition.old_uuid,
            data_location=[
                item.resolve(client, api="nexus").result_file.location
                for item in as_list(test_definition.reference_data)
            ],
            data_type=test_definition.data_type,
            recording_modality=test_definition.recording_modality
            if test_definition.recording_modality
            else None,
            test_type=test_definition.test_type if test_definition.test_type else None,
            score_type=test_definition.score_type if test_definition.score_type else None,
            instances=sorted(instances, key=lambda inst: inst.timestamp),
        )
        return obj

    def to_kg_objects(self):
        authors = [person.to_kg_object() for person in self.author]
        timestamp = ensure_has_timezone(self.date_created) or datetime.now(timezone.utc)
        data_files = [
            fairgraph.analysis.AnalysisResult(
                name="Reference data #{} for validation test '{}'".format(i + 1, self.name),
                result_file=url,
                timestamp=ensure_has_timezone(timestamp),
            )
            for i, url in enumerate(self.data_location)
        ]
        kg_objects = authors + data_files

        def get_ontology_object(cls, value):
            return cls(value.value) if value else None

        test_definition = fairgraph.brainsimulation.ValidationTestDefinition(
            name=self.name,
            alias=self.alias,
            status=self.implementation_status,
            brain_region=get_ontology_object(fairgraph.commons.BrainRegion, self.brain_region),
            species=get_ontology_object(fairgraph.commons.Species, self.species),
            celltype=get_ontology_object(fairgraph.commons.CellType, self.cell_type),
            reference_data=data_files,
            data_type=self.data_type,
            recording_modality=self.recording_modality,
            test_type=self.test_type,
            score_type=self.score_type,
            description=self.description,
            authors=authors,
            date_created=ensure_has_timezone(timestamp),
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
            validation_activity = result.generated_by.resolve(client, api="nexus")
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
            item = item.resolve(client, api="nexus")
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
        test_definition = test_code.test_definition.resolve(kg_client, api="nexus")
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
        hardware_obj = env_obj.hardware.resolve(kg_client, api="nexus")
        dependencies = []
        for dep in as_list(env_obj.software):
            dep = dep.resolve(kg_client, api="nexus")
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
        outputs = [output.resolve(kg_client, api="nexus")
                   for output in as_list(sim_activity.result)]
        config_obj = sim_activity.config.resolve(kg_client, api="nexus")
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
        env_obj = sim_activity.computing_environment.resolve(kg_client, api="nexus")
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
        sim_config = fairgraph.brainsimulation.SimulationConfiguration.by_name(config_identifier, kg_client, api="nexus")
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
        model_instance = fairgraph.brainsimulation.ModelInstance.from_id(str(self.model_instance_id), kg_client, api="nexus")

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
            pr = p.resolve(client, api="nexus")
        else:
            pr = p
        if pr.affiliation:
            affiliation = pr.affiliation.resolve(client, api="nexus").name
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
    url: HttpUrl = None
    label: str = None
    view_url: HttpUrl = None
    type: str = None
    identifier: UUID = None

    @classmethod
    def from_kg_object(cls, data_item, kg_client):
        if isinstance(data_item, KGProxy):
            data_item = data_item.resolve(kg_client, api="nexus")
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
                identifier=data_item.identifier
            )

    def to_kg_object(self):
        if self.identifier:
            identifier = self.identifier
        else:
            identifier=hashlib.sha1(self.url.encode("utf-8")).hexdigest()
        if self.url:
            distr = Distribution(self.url)
        else:
            distr = None
        return fairgraph.livepapers.LivePaperResourceItem(
            distribution=distr,
            name=self.label,
            view_url=self.view_url,
            identifier=identifier,
            resource_type=self.type
        )


class LivePaperSection(BaseModel):
    order: int
    type: str   # todo: make this an Enum
    title: str
    icon: str = None
    description: str = None
    data: str
    dataFormatted: List[LivePaperDataItem]

    @classmethod
    def from_kg_object(cls, section, kg_client):
        if isinstance(section, KGProxy):
            section = section.resolve(kg_client, api="nexus")
        return cls(
            order=int(section.order),
            type=section.section_type,
            title=section.name,
            icon=section.icon,
            description=section.description,
            data=section.data_raw,
            dataFormatted=[LivePaperDataItem.from_kg_object(item, kg_client)
                           for item in as_list(section.data)]
        )

    def to_kg_objects(self, kg_live_paper):
        data_items = [obj.to_kg_object() for obj in self.dataFormatted]
        section = fairgraph.livepapers.LivePaperResourceSection(
            order=self.order,
            section_type=self.type,
            name=self.title,
            icon=self.icon,
            description=self.description,
            data=data_items,
            data_raw=self.data,
            part_of=kg_live_paper)
        return data_items + [section]


def inverse_license_lookup(iri):
    for key, value in fairgraph.commons.License.iri_map.items():
        if value == iri:
            return key


class LivePaper(BaseModel):
    lp_tool_version: str = "0.1"
    id: UUID = None
    modified_date: datetime
    version: str = None
    authors: List[PersonWithAffiliation]
    corresponding_author: PersonWithAffiliation
    created_author: List[PersonWithAffiliation] = None
    approved_author: PersonWithAffiliation = None
    year: date
    live_paper_title: str
    associated_paper_title: str
    journal: str
    url: HttpUrl = None
    citation: str = None
    doi: HttpUrl = None
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
        if ca_index is None:
            ca_index = -1
        return cls(
            modified_date=lp.date_modified or lp.date_created,
            version=lp.version,
            authors=original_authors,
            corresponding_author=original_authors[ca_index],
            created_author=get_people(lp.live_paper_authors),
            approved_author=get_person(lp.custodian),
            year=lp.date_published,
            associated_paper_title=lp.title,
            live_paper_title=lp.name,
            journal=lp.journal,
            url=getattr(lp.url, "location", None),
            citation=lp.citation,
            doi=lp.doi,
            abstract=lp.abstract,
            license=getattr(lp.license, "label", None),
            collab_id=lp.collab_id,
            resources_description=lp.description,
            resources=[LivePaperSection.from_kg_object(sec, kg_client)
                       for sec in as_list(lp.resource_section.resolve(kg_client, api="nexus"))],
            id=lp.uuid
        )

    def to_kg_objects(self, kg_client):
        original_authors = [p.to_kg_object() for p in self.authors]
        if self.corresponding_author:
            try:
                corresponding_author_index = self.authors.index(self.corresponding_author)
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
    title: str
    collab_id: str = None

    @classmethod
    def from_kg_object(cls, lp):
        return cls(
            modified_date=lp.date_modified or lp.date_created,
            title=lp.name,
            collab_id=lp.collab_id,
            id=lp.uuid,
            detail_path=f"/livepapers/{lp.uuid}"
        )