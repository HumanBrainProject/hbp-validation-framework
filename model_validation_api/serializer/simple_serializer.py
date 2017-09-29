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
                    Param_ModelType,
                    Param_ScoreType
                    )

from rest_framework import serializers




class CollabParametersSerializer(serializers.HyperlinkedModelSerializer):
     class Meta:
        model = CollabParameters
        fields = ('id', 'data_modalities', 'test_type', 'species', 'brain_region', 
                    'cell_type', 'model_type', 'app_type','collab_id')

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
        fields = ('id', 'version', 'parameters', 'source', 'model_id')

class ScientificModelInstanceForModelReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelInstance
        fields = ('id', 'version', 'parameters', 'source')


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
        fields = ('id', 'url', 'caption','model_id')


#####################
## ScientificModel ##
#####################
class ScientificModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModel
        fields = ('id', 'name','alias', 'author','app_id','private', 'cell_type', 'model_type', 'brain_region', 'species', 'description')


###########################
## ScientificModelResult ##
###########################



##############################
## ValidationTestDefinition ##
##############################
class ValidationTestDefinitionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ValidationTestDefinition
        fields = ('id', 'name', 'alias', 'species', 'brain_region', 
                    'cell_type', 'age', 'data_location', 
                    'data_type', 'data_modality', 'test_type', 
                    'protocol', 'author', 'publication', 'score_type')



########################
## ValidationTestCode ##
########################
class ValidationTestCodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ValidationTestCode
        fields = ('id', 'repository', 'version', 'path', 'timestamp', 'test_definition_id')



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

class Param_ModelTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_ModelType
        fields = ('id', 'authorized_value')

class Param_ScoreTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Param_ScoreType
        fields = ('id', 'authorized_value')
    

