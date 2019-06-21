

import logging
from datetime import datetime
from itertools import chain

from fairgraph.base import as_list, KGProxy, Distribution
from fairgraph.core import Person, Organization, Collection
from fairgraph.commons import CellType, BrainRegion, AbstractionLevel, Species, ModelScope
from fairgraph.brainsimulation import (ModelProject, ValidationTestDefinition, ValidationScript,
                                 ValidationActivity, ValidationResult, AnalysisResult,
                                 ModelScript, ModelInstance, MEModel, EModel, Morphology)


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
        if "alias" in self.data and self.data["alias"]:
            if self.obj and self.obj.alias == self.data["alias"]:
                return True
            logger.debug("Checking for model with same alias")
            model_with_same_alias = ModelProject.from_alias(self.data["alias"], self.client)
            if bool(model_with_same_alias):
                self.errors.append("Another model with this alias already exists.")
                return False
        if "private" in self.data:
            if not isinstance(self.data["private"], bool):
                self.errors.append("'private' must be a boolean")
                return False
        if "author" not in self.data or not self.data["author"]:
            self.errors.append("This field may not be blank.")
            return False
        return True  # todo

    def save(self, allow_update=True):
        if self.obj is None:  # create
            for key in ("author", "owner"):
                if isinstance(self.data[key], dict):
                    self.data[key] = [self.data[key]]
            self.obj = ModelProject(
                self.data["name"],
                [Person(p["family_name"], p["given_name"], p.get("email", None))
                 for p in as_list(self.data["owner"])],
                [Person(p["family_name"], p["given_name"], p.get("email", None))
                 for p in as_list(self.data["author"])],  # need to update person representation in clients,
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
                                    for p in as_list(self.data["author"])]  # need to update person representation in clients
            if "owner" in self.data:
                self.obj.owners = [Person(p["family_name"], p["given_name"], p.get("email", None))
                                   for p in as_list(self.data["owner"])]  # need to update person representation in clients
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
            'id': model.uuid,  # extract uuid from uri?
            'uri': model.id,
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
                    "id": instance.uuid,
                    "uri": instance.id,
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

    def is_valid(self):
        return True  # todo

    def serialize(self, instance):
        # todo: rewrite all this using KG Query API, to avoid doing all the individual resolves.
        script = instance.main_script.resolve(self.client)
        proj = instance.project.resolve(self.client)
        data = {
                    "id": instance.uuid,
                    "uri": instance.id,
                    "model_uri": proj.id,
                    "model_id": proj.uuid,
                    #"old_uuid": instance.old_uuid
                    "version": instance.version,
                    "description": instance.description,
                    "parameters":  instance.parameters,
                    "code_format": script.code_format,
                    "source": script.code_location,
                    "license": script.license,
                    "hash": None
                }
        if hasattr(instance, "morphology"):
            morph = instance.morphology.resolve(self.client)
            data["morphology"] = morph.morphology_file
        return data

    def save(self):
        # todo: Create/update EModel, MEModel and Morphology where model_scope is "single cell"
        if self.obj is None:  # create
            logger.info("Saving ModelInstance")
            model_project = ModelProject.from_uuid(self.data["model_id"], self.client)
            logger.debug("ModelProject to which the instance belongs. {} Data:".format(model_project))
            logger.debug(str(model_project.instance.data))
            script = ModelScript(name="ModelScript for {} @ {}".format(model_project.name, self.data["version"]),
                                 code_format=self.data.get("code_format"),
                                 code_location=self.data["source"],
                                 license=self.data.get("license"))
            script.save(self.client)

            if model_project.model_of.label == "single cell" and "morphology" in self.data:
                e_model = EModel(name="EModel for {} @ {}".format(model_project.name, self.data["version"]),
                                 brain_region=model_project.brain_region,
                                 species=model_project.species,
                                 model_of=None,
                                 main_script=None,
                                 release=None)
                e_model.save(self.client)
                morph = Morphology(name="Morphology for {} @ {}".format(model_project.name, self.data["version"]),
                                   cell_type=model_project.celltype,
                                   morphology_file=self.data["morphology"])
                morph.save(self.client)
                minst = MEModel(name="ModelInstance for {} @ {}".format(model_project.name, self.data["version"]),
                                description=self.data.get("description", ""),
                                brain_region=model_project.brain_region,
                                species=model_project.species,
                                model_of=None,
                                main_script=script,
                                e_model=e_model,
                                morphology=morph,
                                version=self.data["version"],
                                parameters=self.data.get("parameters"),
                                timestamp=datetime.now(),
                                project=None,
                                release=None)
            else:
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
            instance_changed = False
            script_changed = False
            morphology_changed = False

            def resolve_obj(obj):
                if isinstance(obj, KGProxy):
                    return obj.resolve(self.client)
                else:
                    return obj

            if "name" in self.data:
                self.obj.name = self.data["name"]
                # todo: also update e_model and morphology
                instance_changed = True
            if "description" in self.data:
                self.obj.description = self.data.get("description", "")
                instance_changed = True
            if "version" in self.data:
                self.obj.version = self.data["version"]
                instance_changed = True
            if "parameters" in self.data:
                self.obj.parameters = self.data.get("parameters")
                instance_changed = True
            if "code_format" in self.data:
                self.obj.main_script = resolve_obj(self.obj.main_script)
                self.obj.main_script.code_format = self.data.get("code_format")
                script_changed = True
            if "source" in self.data:
                self.obj.main_script = resolve_obj(self.obj.main_script)
                self.obj.main_script.source = self.data["source"]
                script_changed = True
            if "license" in self.data:
                self.obj.main_script = resolve_obj(self.obj.main_script)
                self.obj.main_script.license = self.data.get("license")
                script_changed = True
            if "morphology" in self.data and self.data["morphology"] is not None:
                self.obj.morphology = resolve_obj(self.obj.morphology)
                self.obj.morphology.morphology_file = self.data["morphology"]
                morphology_changed = True
            if morphology_changed:
                self.obj.morphology.save(self.client)
            if script_changed:
                self.obj.main_script.save(self.client)
            if instance_changed:
                self.obj.save(self.client)

        return self.obj


class ValidationTestDefinitionKGSerializer(BaseKGSerializer):

    def is_valid(self):
        # check alias is unique
        if "alias" in self.data and self.data["alias"]:
            if self.obj and self.obj.alias == self.data["alias"]:
                return True
            logger.debug("Checking for tests with alias '{}'".format(self.data["alias"]))
            test_with_same_alias = ValidationTestDefinition.from_alias(self.data["alias"], self.client)
            logger.debug("Found {}".format(test_with_same_alias))
            if bool(test_with_same_alias):
                self.errors.append("validation test definition with this alias already exists.")
                return False
        if not self.data.get("author"):
            self.errors.append("Error in field 'author'. This field may not be blank.")
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
            'id': test.uuid,  # extract uuid from uri?
            'uri': test.id,
            'name': test.name,
            'alias': test.alias,
            'status': test.status,
            'species': test.species.label if test.species else None,
            'brain_region': test.brain_region.label if test.brain_region else None,
            'cell_type': test.celltype.label if test.celltype else 'Not applicable',
            #'age': # todo
            'data_location': [item.resolve(self.client).distribution.location
                              for item in as_list(test.reference_data)][0],  # to fix: reference_data should never really be a list
            'data_type': test.data_type,
            'data_modality': test.recording_modality,
            'test_type': test.test_type,
            'score_type': test.score_type or "Other",
            'protocol': test.description,
            'author': [serialize_person(au) for au in as_list(test.authors)],
            'creation_date': test.date_created,
            #'publication': test.publication,
            'old_uuid': test.old_uuid,
            'codes': [],   # unclear if this should be "codes" or "test_codes"
        }
        logger.debug("!!! {}".format(test.scripts))
        for script in as_list(test.scripts.resolve(self.client)):
            if isinstance(script.repository, dict):
                repo = script.repository["@id"]
            else:
                repo = script.repository
            data['codes'].append(
                {
                    "uri": script.id,
                    "id": script.uuid,
                    "old_uuid": script.old_uuid,
                    "repository": repo,
                    "version": script.version,
                    "description": script.description,
                    "parameters":  script.parameters,
                    "path": script.test_class,
                    "timestamp": script.date_created
                }
            )
        logger.debug("Serialized {} to {}".format(test, data))
        return data

    def save(self):
        if self.obj is None:  # create
            reference_data = [AnalysisResult(name="Reference data #{} for validation test '{}'".format(i, self.data["name"]),
                                             distribution=Distribution(url))
                              for i, url in enumerate(as_list(self.data["data_location"]))]
            for item in reference_data:
                try:
                    item.save(self.client)
                except Exception as err:
                    logger.error("error saving reference data. name = {}, urls={}".format(self.data["name"], self.data["data_location"]))
                    raise
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
                         for p in as_list(authors)],
                # note: authors are saved automatically
                date_created=datetime.now()
            )
        else:                 # update
            logger.debug("Updating test {} with data {}".format(self.obj.id, self.data))
            if "name" in self.data:
                self.obj.name = self.data["name"]
            if "alias" in self.data:
                self.obj.alias = self.data["alias"]

            if "status" in self.data:
                self.obj.status = self.data["status"]
            if "species" in self.data:
                self.obj.species = self._get_ontology_obj(Species, "species")
            if "brain_region" in self.data:
                self.obj.brain_region = self._get_ontology_obj(BrainRegion, "brain_region")
            if "cell_type" in self.data:
                self.obj.celltype = self._get_ontology_obj(CellType, "cell_type")
            if "data_type" in self.data:
                self.obj.data_type = self.data["data_type"]
            if "data_modality" in self.data:
                self.obj.recording_modality = self.data["data_modality"]
            if "test_type" in self.data:
                self.obj.test_type = self.data["test_type"]
            if "score_type" in self.data:
                self.obj.score_type = self.data["score_type"]
            if "description" in self.data:
                self.obj.description = self.data["description"]
            if "data_location" in self.data:
                self.obj.reference_data = [AnalysisResult(name="Reference data #{} for validation test '{}'".format(i, self.data["name"]),
                                                          distribution=Distribution(url))
                                           for i, url in enumerate(as_list(self.data["data_location"]))]
            if "author" in self.data:
                self.obj.authors = [Person(p["family_name"], p["given_name"], p.get("email", None))
                                      for p in as_list(self.data["author"])]

            # now save people, ref data, test. No easy way to make this atomic, I don't think.
            for person in as_list(self.obj.authors):
                if not isinstance(person, KGProxy):
                    # no need to save if we have a proxy object, as
                    # that means the person hasn't been updated
                    # although in fact the authors are saved when the test is saved
                    # need to make this consistent
                    person.save(self.client)
            for ref_data in as_list(self.obj.reference_data):
                if not isinstance(person, KGProxy):
                    ref_data.save(self.client)

        self.obj.save(self.client)
        return self.obj


class ValidationTestCodeKGSerializer(BaseKGSerializer):

    def is_valid(self):
        if not self.data.get("version"):
            self.errors.append("Test code implementation version missing")
            return False
        if not self.data.get("repository"):
            self.errors.append("Test code location / repository missing")
            return False
        return True  # to finish

    def serialize(self, obj):
        # todo: rewrite all this using KG Query API, to avoid doing all the individual resolves.

        data = {
            "uri": obj.id,
            "id": obj.uuid,
            "old_uuid": obj.old_uuid,
            "repository": obj.repository,
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
            if "repository" in self.data:
                self.obj.repository = self.data["repository"]
            if "version" in self.data:
                self.obj.version = self.data["version"]
            if "description" in self.data:
                self.obj.description = self.data["description"]
            if "parameters" in self.data:
                self.obj.parameters = self.data["parameters"]
            if "path" in self.data:
                self.obj.test_class = self.data["path"]
        self.obj.save(self.client)
        return self.obj


class ValidationTestResultKGSerializer(BaseKGSerializer):

    def is_valid(self):
        return True  # todo

    def serialize(self, obj):
        # todo: rewrite all this using KG Query API, to avoid doing all the individual resolves.
        validation_activity = obj.generated_by.resolve(self.client)
        model_version_id = validation_activity.model_instance.uuid
        test_code_id = validation_activity.test_script.uuid
        data = {
            "uri": obj.id,
            "id": obj.uuid,
            "old_uuid": obj.old_uuid,
            "model_version_id": model_version_id,
            "test_code_id": test_code_id,
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
            logger.debug("Saving result with data {}".format(self.data))
            timestamp = datetime.now()

            additional_data = [AnalysisResult(name="{} @ {}".format(uri, timestamp.isoformat()),
                                              distribution=Distribution(uri),
                                              timestamp=timestamp)
                               for uri in self.data["results_storage"]]
            for ad in additional_data:
                ad.save(self.client)

            self.obj = ValidationResult(
                name="Validation results for model {} and test {} with timestamp {}".format(
                    self.data["model_version_id"],
                    self.data["test_code_id"],
                    timestamp.isoformat()),
                generated_by=None,
                description=None,
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
                                        members=[item.resolve(self.client)
                                                 for item in as_list(test_definition.reference_data)])
            reference_data.save(self.client)

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