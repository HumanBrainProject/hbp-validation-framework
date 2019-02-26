from datetime import datetime
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

                    Param_DataModalities,
                    Param_TestType,
                    Param_Species,
                    Param_BrainRegion,
                    Param_CellType,
                    Param_ModelScope,
                    Param_AbstractionLevel,
                    Param_ScoreType,
                    Param_organizations,
                    Persons
                    )

from rest_framework import serializers

from nar.brainsimulation import ModelInstance, ModelProject, ModelScript, MEModel, EModel, Morphology


class CollabParametersSerializer(serializers.HyperlinkedModelSerializer):
     class Meta:
        model = CollabParameters
        fields = ('id', 'data_modalities', 'test_type', 'species', 'brain_region',
                    'cell_type', 'model_scope','abstraction_level', 'organization', 'app_type','collab_id')

class CollabParametersReadOnlyForHomeSerializer(serializers.HyperlinkedModelSerializer):
     class Meta:
        model = CollabParameters
        fields = ('id','collab_id')



#############################
## ScientificModelInstance ##
#############################
class ScientificModelInstanceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelInstance
        fields = ('id', 'version', 'description', 'parameters', 'code_format', 'source', 'model_id', 'hash')


class ScientificModelInstanceKGSerializer(object):
    # need to update for PUT - where we have both an instance and data

    def __init__(self, instances, client, data=None, many=False, context=None):
        self.client = client
        if many:
            self.instances = instances
            if data:
                self.data = data
            else:
                self.data = [
                    self.serialize(instance) for instance in instances
                ]
        else:
            self.instance = instances
            if data:
                self.data = data
            else:
                self.data = self.serialize(self.instance)
        self.context = context

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
        if self.instance is None:  # create
            model_project = ModelProject.from_uuid(self.data["model_id"], self.client)
            script = ModelScript(name="ModelScript for {} @ {}".format(model_project.name, self.data["version"]),
                                 code_format=self.data["code_format"],
                                 code_location=self.data["source"],
                                 license=self.data["license"])
            script.save(self.client)

            minst = ModelInstance(name="ModelInstance for {} @ {}".format(model_project.name, self.data["version"]),
                                  description=self.data["description"],
                                  brain_region=model_project.brain_region,
                                  species=model_project.species,
                                  model_of=None,
                                  main_script=script,
                                  version=self.data["version"],
                                  parameters=self.data["parameters"],
                                  timestamp=datetime.now(),
                                  release=None)
            minst.save(self.client)
            self.instance = minst
            if model_project.instances:
                if not isinstance(model_project.instances, list):
                    model_project.instances = [model_project.instances]
                model_project.instances.append(minst)
            else:
                model_project.instances = [minst]
            model_project.save(self.client)

        else:                   # update
            if "name" in self.data:
                self.instance.name = self.data["name"]
            if "description" in self.data:
                self.instance.description = self.data["description"]
            if "version" in self.data:
                self.instance.version = self.data["version"]
            if "parameters" in self.data:
                self.instance.parameters = self.data["parameters"]
            if "code_format" in self.data:
                self.instance.main_script.code_format = self.data["code_format"]
            if "source" in self.data:
                self.instance.main_script.source = self.data["source"]
            if "license" in self.data:
                self.instance.main_script.license = self.data["license"]
            self.instance.save(self.client)

        return self.instance


class ScientificModelInstanceForModelReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelInstance
        fields = ('id', 'version', 'description', 'parameters', 'code_format', 'source', 'hash')


##########################
## ScientificModelImage ##
##########################
class ScientificModelImageForModelReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelImage
        fields = ('id', 'url', 'caption')

class ScientificModelImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelImage
        fields = ('id', 'url', 'caption' ,'model_id')


#####################
## ScientificModel ##
#####################
class ScientificModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModel
        fields = ('id', 'name','alias', 'author','owner','app_id','organization','project','private','license', 'cell_type', 'model_scope','abstraction_level', 'brain_region', 'species', 'description')


###########################
## ScientificModelResult ##
###########################



##############################
## ValidationTestDefinition ##
##############################
class ValidationTestDefinitionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ValidationTestDefinition
        fields = ('id', 'name', 'alias', 'status', 'species', 'brain_region',
                    'cell_type', 'age', 'data_location',
                    'data_type', 'data_modality', 'test_type',
                    'protocol', 'creation_date', 'author', 'publication', 'score_type')



########################
## ValidationTestCode ##
########################
class ValidationTestCodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ValidationTestCode
        fields = ('id', 'repository', 'version', 'description', 'parameters', 'path', 'timestamp', 'test_definition_id')



##########################
## ValidationTestResult ##
##########################
class ValidationTestResultSerializer (serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ValidationTestResult
        fields = ('id', 'model_version_id', 'test_code_id', 'results_storage', 'score', 'passed', 'timestamp', 'platform',   'project',  'normalized_score')



#############
## Tickets ##
#############
class CommentSerializer(serializers.HyperlinkedModelSerializer):
    # test = ValidationTestCodeSerializer(many=True , read_only=True)
    class Meta:
        model = Comments
        fields = ( 'id', 'author', 'text', 'creation_date', 'Ticket_id')


class TicketSerializer(serializers.HyperlinkedModelSerializer):
    # test = ValidationTestCodeSerializer(many=True , read_only=True)
    class Meta:
        model = Tickets
        fields = ( 'id', 'author', 'title', 'text', 'creation_date', 'test_id')



# class FollowModelSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = FollowModel
#         fields = ( 'id', 'model_id', 'user_id')

############
##  Param ##
############
class Param_DataModalitiesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_DataModalities
        fields = ('id', 'authorized_value')

class Param_TestTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_TestType
        fields = ('id', 'authorized_value')

class Param_SpeciesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_Species
        fields = ('id', 'authorized_value')

class Param_BrainRegionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_BrainRegion
        fields = ('id', 'authorized_value')

class Param_CellTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_CellType
        fields = ('id', 'authorized_value')

class Param_ModelScopeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_ModelScope
        fields = ('id', 'authorized_value')

class Param_AbstractionLevelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_AbstractionLevel
        fields = ('id', 'authorized_value')

class Param_ScoreTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_ScoreType
        fields = ('id', 'authorized_value')

class Param_OrganizationsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_organizations
        fields = ('id', 'authorized_value')

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Persons
        fields = ('id','pattern','first_name', 'last_name', 'email')