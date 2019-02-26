import logging
from datetime import datetime
from itertools import chain
from django.core.serializers.json import DjangoJSONEncoder

from ..models import (ValidationTestDefinition,
                    ValidationTestCode,
                    ValidationTestResult,
                    ScientificModel,
                    ScientificModelInstance,
                    ScientificModelImage,
                    Comments,
                    Tickets,
                    CollabParameters,
                    # FollowModel,
                    Param_DataModalities,
                    Param_TestType,
                    Param_Species,
                    Param_BrainRegion,
                    Param_CellType,
                    Param_ModelScope,
                    Param_AbstractionLevel,
                    Param_ScoreType,
                    Param_organizations
                    )

from rest_framework import serializers

from .simple_serializer import (
    CollabParametersSerializer,
    CollabParametersReadOnlyForHomeSerializer,
    ScientificModelInstanceSerializer,
    ScientificModelInstanceForModelReadOnlySerializer,
    ScientificModelImageForModelReadOnlySerializer,
    ScientificModelImageSerializer,
    ScientificModelSerializer,
    ValidationTestDefinitionSerializer,
    ValidationTestCodeSerializer,
    ValidationTestResultSerializer,
    CommentSerializer,
    TicketSerializer,
    Param_DataModalitiesSerializer,
    Param_TestTypeSerializer,
    Param_SpeciesSerializer,
    Param_BrainRegionSerializer,
    Param_CellTypeSerializer,
    Param_ModelScopeSerializer,
    Param_AbstractionLevelSerializer,
    Param_ScoreTypeSerializer,
    Param_OrganizationsSerializer,
    ScientificModelInstanceKGSerializer
)

from nar.base import as_list, KGProxy
from nar.core import Person, Organization
from nar.commons import CellType, BrainRegion, AbstractionLevel, Species
from nar.brainsimulation import ModelProject

#### rest framework serializers ####
logger = logging.getLogger("model_validation_api")


class ScientificModelReadOnlySerializer2(serializers.HyperlinkedModelSerializer):
    app = CollabParametersSerializer (read_only = True)
    class Meta:
        model = ScientificModel
        fields = ('id', 'name', 'description', 'species', 'brain_region', 'cell_type', 'author','owner', 'model_scope','abstraction_level','private','organization','app','alias','license', 'project')


#############################
## ScientificModelInstance ##
#############################
class ScientificModelInstanceReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    model = ScientificModelReadOnlySerializer2(read_only=True)
    class Meta:
        model = ScientificModelInstance
        fields = ('id', 'version','description', 'parameters', 'code_format', 'source', 'model', 'hash')


##########################
## ScientificModelImage ##
##########################


#####################
## ScientificModel ##
#####################
class ScientificModelReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    instances = ScientificModelInstanceForModelReadOnlySerializer (read_only=True, many=True )
    images = ScientificModelImageForModelReadOnlySerializer (read_only=True , many=True )
    app = CollabParametersReadOnlyForHomeSerializer(read_only=True)
    class Meta:
        model = ScientificModel
        fields = ('id', 'name', 'alias', 'author','owner', 'app','organization','project','private','license', 'cell_type', 'model_scope','abstraction_level', 'brain_region', 'species','description', 'instances', 'images')


class ScientificModelKGSerializer(object):

    def __init__(self, models, client, data=None, many=False, context=None):
        self.client = client
        if many:
            self.models = models
            if data:
                self.data = data
            else:
                self.data = [
                    self.serialize(model) for model in models
                ]
        else:
            self.model = models
            if data:
                self.data = data
            else:
                self.data = self.serialize(self.model)
        self.context = context
        self.errors = []

    def is_valid(self):
        # check alias is unique
        if "alias" in self.data:
            model_with_same_alias = ModelProject.from_alias(self.data["alias"])
            if model_with_same_alias is not None:
                self.errors.append("Another model exists with this alias")
                return False
        # ...
        return True  # todo

    def _get_ontology_obj(self, cls, key):
        label = self.data.get(key)
        if label and label not in ("Not applicable"):
            return cls(label)
        else:
            return None

    def save(self):
        if self.model is None:  # create
            for key in ("author", "owner"):
                if isinstance(self.data[key], dict):
                    self.data[key] = [self.data[key]]
            self.model = ModelProject(
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
                model_of=self.data.get("model_scope"),
                old_uuid=self.data.get("old_uuid"),
                images=self.data.get("images")
            )
        else:                   # update
            if "name" in self.data:
                self.model.name = self.data["name"]
            if "alias" in self.data:
                self.model.alias = self.data["alias"]
            if "author" in self.data:
                self.model.authors = [Person(p["family_name"], p["given_name"], p.get("email", None))
                                      for p in self.data["author"]]  # need to update person representation in clients
            if "owner" in self.data:
                self.model.owners = [Person(p["family_name"], p["given_name"], p.get("email", None))
                                     for p in self.data["owner"]]  # need to update person representation in clients
            if "app" in self.data:
                self.model.collab_id = self.data["app"]["collab_id"]
            if "organization" in self.data:
                self.model.organization = Organization(self.data["organization"])
            if "private" in self.data:
                self.model.private = self.data["private"]
            if "cell_type" in self.data:
                if self.data["cell_type"] == "Not applicable":
                    self.model.celltype = None
                else:
                    self.model.celltype = CellType(self.data["cell_type"])  # todo, handle KeyError from iri_map
            if "model_scope" in self.data:
                self.model.model_of = self.data["model_scope"]
            if "abstraction_level" in self.data:
                self.model.abstraction_level = AbstractionLevel(self.data["abstraction_level"])
            if "brain_region" in self.data:
                self.model.brain_region = BrainRegion(self.data["brain_region"])
            if "species" in self.data:
                self.model.species = Species(self.data["species"])
            if "description" in self.data:
                self.model.description = self.data["description"]
            if "old_uuid" in self.data:
                self.model.old_uuid = self.data["old_uuid"]
            if "images" in self.data:
                self.model.images = self.data["images"]

        # now save people, organization, model. No easy way to make this atomic, I don't think.
        for person in chain(as_list(self.model.authors), as_list(self.model.owners)):
            if not isinstance(person, KGProxy):
                # no need to save if we have a proxy object, as
                # that means the person hasn't been updated
                person.save(self.client)
        if self.model.organization and not isinstance(self.model.organization, KGProxy):
            self.model.organization.save(self.client)
        self.model.save(self.client)
        return self.model

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
            'instances': []
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


class ScientificModelFullReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    app = CollabParametersSerializer( read_only=True)
    instances = ScientificModelInstanceSerializer (read_only=True, many=True )
    images = ScientificModelImageSerializer (read_only=True , many=True )
    class Meta:
        model = ScientificModel
        fields = ('id', 'name', 'alias', 'author','owner', 'app','organization','project','private','license', 'cell_type', 'model_scope','abstraction_level', 'brain_region', 'species','description', 'instances', 'images')

class ScientificModelReadOnlyForHomeSerializer(serializers.HyperlinkedModelSerializer):
    app = CollabParametersReadOnlyForHomeSerializer (read_only = True)
    class Meta:
        model = ScientificModel
        fields = ('id', 'name', 'species', 'creation_date',  'brain_region', 'cell_type', 'author', 'model_scope','abstraction_level','private','app','organization','alias')


###########################
## ScientificModelResult ##
###########################
class ValidationModelResultReadOnlySerializer (serializers.HyperlinkedModelSerializer):
    model_version = ScientificModelInstanceSerializer(read_only=True)
    test_code = ValidationTestCodeSerializer(read_only=True)
    class Meta:
        model = ValidationTestResult
        fields = ('id',  'results_storage', 'score', 'passed', 'timestamp', 'platform',   'project', 'model_version', 'test_code', 'normalized_score')





##############################
## ValidationTestDefinition ##
##############################
class ValidationTestDefinitionFullSerializer(serializers.HyperlinkedModelSerializer):
    codes = ValidationTestCodeSerializer(many=True , read_only=True)
    class Meta:
        model = ValidationTestDefinition
        fields = ('id', 'name', 'alias', 'status', 'species', 'brain_region',
                    'cell_type', 'age', 'data_location',
                    'data_type', 'data_modality', 'test_type', 'score_type',
                    'protocol', 'author', 'creation_date', 'publication', 'codes')



########################
## ValidationTestCode ##
########################
class ValidationTestCodeReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    test_definition = ValidationTestDefinitionSerializer (read_only = True)
    class Meta:
        model = ValidationTestCode
        fields = ('id', 'repository', 'version', 'description', 'parameters', 'path', 'timestamp', 'test_definition')



##########################
## ValidationTestResult ##
##########################
class ValidationTestResultReadOnlySerializer (serializers.HyperlinkedModelSerializer):
    model_version = ScientificModelInstanceReadOnlySerializer(read_only=True)
    test_code = ValidationTestCodeReadOnlySerializer(read_only=True)
    class Meta:
        model = ValidationTestResult
        fields = ('id', 'model_version',  'test_code', 'results_storage', 'score', 'passed', 'timestamp', 'platform',   'project',  'normalized_score')



#############
## Tickets ##
#############

class TicketReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    # test = ValidationTestCodeSerializer(many=True , read_only=True)
    comments = CommentSerializer (many=True, read_only=True)
    class Meta:
        model = Tickets
        fields = ( 'id', 'author', 'title', 'text', 'creation_date', 'test_id', 'comments')


# class CollabParametersSerializer(serializers.HyperlinkedModelSerializer):
#     param = serializers.PrimaryKeyRelatedField(many = True, read_only=True)
#     # data_modalities = Param_DataModalitiesSerializer(many=True , read_only=True)
#     # test_type = Param_TestTypeSerializer(many=True , read_only=True)
#     # species = Param_SpeciesSerializer(many=True , read_only=True)
#     # brain_region = Param_BrainRegionSerializer(many=True , read_only=True)
#     # cell_type = Param_CellTypeSerializer(many=True , read_only=True)
#     # model_type = Param_ModelTypeSerializer(many=True , read_only=True)

#     class Meta:
#         model = CollabParameters
#         # fields = ('id', 'data_modalities', 'test_type', 'species', 'brain_region',
#         #             'cell_type', 'model_type')

#         fields = ('id', 'param')


#class configviewSerializer(object):

#    @staticmethod
#    def _to_dict(model):
#        data = {
#            "species": model.species,
#            "brain_region": model.brain_region,
#            "cell_type": model.cell_type,
#            "model_type": model.model_type
#        }
#        return data

#    @classmethod
#    def serialize(cls, models):
#        if isinstance(models, configview):
#            data = cls._to_dict(models)
#        else:
#            data = [cls._to_dict(model) for model in models]
#        encoder = DjangoJSONEncoder(ensure_ascii=False, indent=4)
#        return encoder.encode(data)


#class configviewSerializer(serializers.HyperlinkedModelSerializer):
#    class Meta:
#        model = configview
#        fields = ('species', 'brain_region', 'cell_type', 'model_type')
