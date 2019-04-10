

import logging
from datetime import datetime
from itertools import chain

from nar.base import as_list, KGProxy, Distribution
from nar.core import Person, Organization
from nar.commons import CellType, BrainRegion, AbstractionLevel, Species, ModelScope
from nar.brainsimulation import (ModelProject, ValidationTestDefinition, ValidationScript,
                                 ValidationActivity, ValidationResult, AnalysisResult,
                                 ModelScript, ModelInstance, MEModel)


logger = logging.getLogger("model_validation_api")


class BaseKGSerializer(object):

    def __init__(self, objects, client, data=None, many=False, context=None):
        self.client = client
        if many:
            self.objects = objects
            if data:
                self.data = data
            else:
                self.data = [
                    self.serialize(obj) for obj in as_list(objects)
                ]
        else:
            self.obj = objects
            if data:
                self.data = data
            else:
                self.data = self.serialize(self.obj)
        self.context = context
        self.errors = []

    def _get_ontology_obj(self, cls, key):
        label = self.data.get(key)
        if label:
            try:
                return cls(label, strict=True)
            except ValueError as err:
                logger.warning(str(err))
                return None
        else:
            return None


class ScientificModelKGSerializer(BaseKGSerializer):

    def is_valid(self):
        # check alias is unique
        if "alias" in self.data:
            if self.obj and self.obj.alias == self.data["alias"]:
                return True
            model_with_same_alias = ModelProject.from_alias(self.data["alias"], self.client)
            if bool(model_with_same_alias):
                self.errors.append("Another model exists with this alias")
                return False
        # ...
        return True  # todo

    def save(self):
        if self.obj is None:  # create
            for key in ("author", "owner"):
                if isinstance(self.data[key], dict):
                    self.data[key] = [self.data[key]]
            self.obj = ModelProject(
                self.data["name"],
                [Person(p["family_name"], p["given_name"], p.get("email", None))
                                      for p in self.data["owner"]],
                [Person(p["family_name"], p["given_name"], p.get("email", None))
                 for p in self.data["author"]],  # need to update person representation in clients,
                self.data.get("description"),
                datetime.now(),
                self.data.get("private", True),
                self.context["collab_id"],
                self.data.get("alias"),
                Organization(self.data["organization"]) if "organization" in self.data else None,
                pla_components=None,
                brain_region=self._get_ontology_obj(BrainRegion, "brain_region"),
                species=self._get_ontology_obj(Species, "species"),
                celltype=self._get_ontology_obj(CellType, "cell_type"),
                abstraction_level=self._get_ontology_obj(AbstractionLevel, "abstraction_level"),
                model_of=self._get_ontology_obj(ModelScope, "model_scope"),
                old_uuid=self.data.get("old_uuid"),
                images=self.data.get("images")
            )
        else:                   # update
            if "name" in self.data:
                self.obj.name = self.data["name"]
            if "alias" in self.data:
                self.obj.alias = self.data["alias"]
            if "author" in self.data:
                self.obj.authors = [Person(p["family_name"], p["given_name"], p.get("email", None))
                                      for p in self.data["author"]]  # need to update person representation in clients
            if "owner" in self.data:
                self.obj.owners = [Person(p["family_name"], p["given_name"], p.get("email", None))
                                     for p in self.data["owner"]]  # need to update person representation in clients
            if "app" in self.data:
                self.obj.collab_id = self.data["app"]["collab_id"]
            if "organization" in self.data:
                self.obj.organization = Organization(self.data["organization"])
            if "private" in self.data:
                self.obj.private = self.data["private"]
            if "cell_type" in self.data:
                self.obj.celltype = self._get_ontology_obj(CellType, "cell_type")
            if "model_scope" in self.data:
                self.obj.model_of = self._get_ontology_obj(ModelScope, "model_scope")
            if "abstraction_level" in self.data:
                self.obj.abstraction_level = self._get_ontology_obj(AbstractionLevel, "abstraction_level")
            if "brain_region" in self.data:
                self.obj.brain_region = self._get_ontology_obj(BrainRegion, "brain_region")
            if "species" in self.data:
                self.obj.species = self._get_ontology_obj(Species, "species")
            if "description" in self.data:
                self.obj.description = self.data["description"]
            if "old_uuid" in self.data:
                self.obj.old_uuid = self.data["old_uuid"]
            if "images" in self.data:
                self.obj.images = self.data["images"]

        # now save people, organization, model. No easy way to make this atomic, I don't think.
        for person in chain(as_list(self.obj.authors), as_list(self.obj.owners)):
            if not isinstance(person, KGProxy):
                # no need to save if we have a proxy object, as
                # that means the person hasn't been updated
                person.save(self.client)
        if self.obj.organization and not isinstance(self.obj.organization, KGProxy):
            self.obj.organization.save(self.client)
        self.obj.save(self.client)
        return self.obj

    def serialize(self, model):
        # todo: rewrite all this using KG Query API, to avoid doing all the individual resolves.
        def serialize_person(p):
            if isinstance(p, KGProxy):
                pr = p.resolve(self.client)
            else:
                pr = p
            return {"given_name": pr.given_name, "family_name": pr.family_name}
        data = {
            'id': model.id,  # extract uuid from uri?
            'name': model.name,
            'alias': model.alias,
            'author': [serialize_person(au) for au in as_list(model.authors)],
            'owner': [serialize_person(ow) for ow in as_list(model.owners)],
            'app': {
                'collab_id': model.collab_id
            },
            'organization': model.organization.resolve(self.client).name if model.organization else None,
            'private': model.private,
            'cell_type': model.celltype.label if model.celltype else 'Not applicable',
            'model_scope': model.model_of.label if model.model_of else "other",  # to fix
            'abstraction_level': model.abstraction_level.label if model.abstraction_level else None,
            'brain_region': model.brain_region.label if model.brain_region else None,
            'species': model.species.label if model.species else None,  # 'Unknown' instead of None?
            'description': model.description,
            'images': model.images,
            'old_uuid': model.old_uuid,
            'instances': [],
            "raw_data": model.instance.data
        }
        for instance in as_list(model.instances):
            instance = instance.resolve(self.client)
            main_script = instance.main_script.resolve(self.client)
            data['instances'].append(
                {
                    "id": instance.id,
                    #"old_uuid": instance.old_uuid
                    "version": instance.version,
                    "description": instance.description,
                    "parameters":  instance.parameters,
                    "code_format": main_script.code_format,
                    "source": main_script.code_location,
                    "license": main_script.license,
                    "hash": None
                }
            )
        return data


class ScientificModelInstanceKGSerializer(BaseKGSerializer):
    # need to update for PUT - where we have both an instance and data

    def is_valid(self):
        return True  # todo

    def serialize(self, instance):
        # todo: rewrite all this using KG Query API, to avoid doing all the individual resolves.
        script = instance.main_script.resolve(self.client)
        proj = instance.project.resolve(self.client)
        data = {
                    "id": instance.id,
                    "model_id": proj.id,
                    #"old_uuid": instance.old_uuid
                    "version": instance.version,
                    "description": instance.description,
                    "parameters":  instance.parameters,
                    "code_format": script.code_format,
                    "source": script.code_location,
                    "license": script.license,
                    "hash": None
                }
        return data

    def save(self):
        # todo: Create/update EModel, MEModel and Morphology where model_scope is "single cell"
        if self.obj is None:  # create
            model_project = ModelProject.from_uuid(self.data["model_id"], self.client)
            script = ModelScript(name="ModelScript for {} @ {}".format(model_project.name, self.data["version"]),
                                 code_format=self.data.get("code_format"),
                                 code_location=self.data["source"],
                                 license=self.data.get("license"))
            script.save(self.client)

            minst = ModelInstance(name="ModelInstance for {} @ {}".format(model_project.name, self.data["version"]),
                                  description=self.data.get("description", ""),
                                  brain_region=model_project.brain_region,
                                  species=model_project.species,
                                  model_of=None,
                                  main_script=script,
                                  version=self.data["version"],
                                  parameters=self.data.get("parameters"),
                                  timestamp=datetime.now(),
                                  release=None)
            minst.save(self.client)
            self.obj = minst
            if model_project.instances:
                if not isinstance(model_project.instances, list):
                    model_project.instances = [model_project.instances]
                model_project.instances.append(minst)
            else:
                model_project.instances = [minst]
            model_project.save(self.client)

        else:                   # update
            if "name" in self.data:
                self.obj.name = self.data["name"]
            if "description" in self.data:
                self.obj.description = self.data.get("description", "")
            if "version" in self.data:
                self.obj.version = self.data["version"]
            if "parameters" in self.data:
                self.obj.parameters = self.data.get("parameters")
            if "code_format" in self.data:
                self.obj.main_script.code_format = self.data.get("code_format")
            if "source" in self.data:
                self.obj.main_script.source = self.data["source"]
            if "license" in self.data:
                self.obj.main_script.license = self.data.get("license")
            self.obj.save(self.client)

        return self.obj


class ValidationTestDefinitionKGSerializer(BaseKGSerializer):

    def is_valid(self):
        # check alias is unique
        if "alias" in self.data:
            if self.obj and self.obj.alias == self.data["alias"]:
                return True
            test_with_same_alias = ValidationTestDefinition.from_alias(self.data["alias"], self.client)
            if bool(test_with_same_alias):
                self.errors.append("Another test exists with this alias")
                return False
        # ...
        return True  # todo

    def serialize(self, test):
        # todo: rewrite all this using KG Query API, to avoid doing all the individual resolves.
        def serialize_person(p):
            if isinstance(p, KGProxy):
                pr = p.resolve(self.client)
            else:
                pr = p
            return {"given_name": pr.given_name, "family_name": pr.family_name}

        data = {
            'id': test.id,  # extract uuid from uri?
            'name': test.name,
            'alias': test.alias,
            'status': test.status,
            'species': test.species.label if test.species else None,
            'brain_region': test.brain_region.label if test.brain_region else None,
            'cell_type': test.celltype.label if test.celltype else 'Not applicable',
            #'age': # todo
            'data_location': [item.resolve(self.client).distribution.location
                              for item in as_list(test.reference_data)],
            'data_type': test.data_type,
            'data_modality': test.recording_modality,
            'test_type': test.test_type,
            'score_type': test.score_type or "Other",
            'protocol': test.description,
            'author': [serialize_person(au) for au in as_list(test.authors)],
            'creation_date': test.date_created,
            #'publication': test.publication,
            'old_uuid': test.old_uuid,
            'codes': [],
        }
        for script in as_list(test.scripts.resolve(self.client)):
            if isinstance(script.repository, dict):
                repo = script.repository["@id"]
            else:
                repo = script.repository
            data['codes'].append(
                {
                    "id": script.id,
                    "old_uuid": script.old_uuid,
                    "repository": repo,
                    "version": script.version,
                    "description": script.description,
                    "parameters":  script.parameters,
                    "path": script.test_class,
                    "timestamp": script.date_created
                }
            )
        return data

    def save(self):
        if self.obj is None:  # create
            reference_data = [AnalysisResult(name="Reference data for validation test '{}'".format(self.data["name"]),
                                             distribution=Distribution(url))
                              for url in self.data["data_location"]]
            for item in reference_data:
                item.save(self.client)
            authors = self.data["author"]
            if not isinstance(authors, list):
                authors = [authors]
            self.obj = ValidationTestDefinition(
                name=self.data["name"],
                alias=self.data["alias"],
                status=self.data.get("status", "proposal"),
                species=self._get_ontology_obj(Species, "species"),
                brain_region=self._get_ontology_obj(BrainRegion, "brain_region"),
                celltype=self._get_ontology_obj(CellType, "cell_type"),
                reference_data=reference_data,
                data_type=self.data["data_type"],
                recording_modality=self.data["data_modality"],
                test_type=self.data["test_type"],
                score_type=self.data["score_type"],
                description=self.data["protocol"],
                authors=[Person(p["family_name"], p["given_name"], p.get("email", None))
                         for p in authors],
                # todo: check if authors are saved automatically
                date_created=datetime.now()
            )
        else:                 # update
            raise NotImplementedError()
        self.obj.save(self.client)
        return self.obj


class ValidationTestCodeKGSerializer(BaseKGSerializer):

    def is_valid(self):
        return True  # todo

    def serialize(self, obj):
        # todo: rewrite all this using KG Query API, to avoid doing all the individual resolves.

        data = {
            "id": obj.id,
            "old_uuid": obj.old_uuid,
            "repository": obj.repository["@id"],
            "version": obj.version,
            "description": obj.description,
            "parameters":  obj.parameters,
            "path": obj.test_class,
            "timestamp": obj.date_created,
            'test_definition_id': obj.test_definition.resolve(self.client).uuid
        }
        return data

    def save(self):
        if self.obj is None:  # create
            #test_definition = ValidationTestDefinition.from_uri(self.data["test_definition"], self.client)
            test_definition = self.data["test_definition"]
            self.obj = ValidationScript(
                name="Implementation of {}, version '{}'".format(test_definition.name, self.data["version"]),
                date_created=datetime.now(),
                repository=self.data["repository"],
                version=self.data["version"],
                description=self.data.get("description", ""),
                parameters=self.data.get("parameters", None),
                test_class=self.data["path"],
                test_definition=test_definition
            )
        else:                 # update
            raise NotImplementedError()
        self.obj.save(self.client)
        return self.obj


class ValidationTestResultKGSerializer(BaseKGSerializer):

    def is_valid(self):
        return True  # todo

    def serialize(self, obj):
        # todo: rewrite all this using KG Query API, to avoid doing all the individual resolves.

        data = {
            "id": obj.uuid,
            "old_uuid": obj.old_uuid,
            "model_version_id": obj.model_version_id,
            "test_code_id": obj.test_code_id,
            "results_storage": [item.resolve(self.client).distribution.location
                                for item in as_list(obj.additional_data)],
            "score": obj.score,
            "passed": obj.passed,
            "timestamp": obj.timestamp,
            "project": obj.collab_id,
            "normalized_score": obj.normalized_score
        }
        return data

    def save(self):
        if self.obj is None:  # create
            timestamp = datetime.now()

            additional_data = [AnalysisResult(name="{} @ {}".format(uri, timestamp.isoformat()),
                                              distribution=Distribution(uri),
                                              timestamp=timestamp)
                               for uri in self.data["additional_data"]]
            for ad in additional_data:
                ad.save(self.client)

            self.obj = ValidationResult(
                name=self.data["name"],
                generated_by=None,
                description=self.data["description"],
                score=self.data["score"],
                normalized_score=self.data["normalized_score"],
                passed=self.data["passed"],
                timestamp=timestamp,
                additional_data=additional_data,
                collab_id=self.data["project"]
            )
            self.obj.save(self.client)

            test_definition = self.data["test_script"].test_definition.resolve(self.client)
            reference_data = Collection("Reference data for {}".format(test_definition.name),
                                        members=test_definition.reference_data.resolve(self.client))
            reference_data.save(NAR_client)

            activity = ValidationActivity(
                model_instance=self.data["model_instance"],
                test_script=self.data["test_script"],
                reference_data=reference_data,
                timestamp=timestamp,
                result=self.obj
            )
            activity.save(self.client)
            self.obj.generated_by = activity
            self.obj.save(self.client)
        else:                 # update
            raise NotImplementedError()

        return self.obj