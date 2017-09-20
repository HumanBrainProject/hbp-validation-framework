
from django.core.serializers.json import DjangoJSONEncoder

from .models import (ValidationTestDefinition, 
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



#### rest framework serializers ####


class CollabParametersSerializer(serializers.HyperlinkedModelSerializer):
     class Meta:
        model = CollabParameters
        fields = ('id', 'data_modalities', 'test_type', 'species', 'brain_region', 
                    'cell_type', 'model_type', 'app_type','collab_id')

class CollabParametersReadOnlyForHomeSerializer(serializers.HyperlinkedModelSerializer):
     class Meta:
        model = CollabParameters
        fields = ('id','collab_id')

class ValidationTestResultSerializer (serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ValidationTestResult
        fields = ('id',  'results_storage', 'score', 'passed', 'timestamp', 'platform',   'project', 'model_instance_id', 'test_code_id', 'normalized_score')



class ScientificModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModel
        fields = ('id', 'name','alias', 'author','app_id','private', 'cell_type', 'model_type', 'brain_region', 'species', 'description')

class ScientificModelReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    app = CollabParametersSerializer (read_only = True)
    class Meta:
        model = ScientificModel
        fields = ('id', 'name', 'description', 'species', 'brain_region', 'cell_type', 'author', 'model_type','private','app','alias')

class ScientificModelReadOnlyForHomeSerializer(serializers.HyperlinkedModelSerializer):
    app = CollabParametersReadOnlyForHomeSerializer (read_only = True)
    class Meta:
        model = ScientificModel
        fields = ('id', 'name', 'species', 'brain_region', 'cell_type', 'author', 'model_type','private','app','alias')


class ScientificModelInstanceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelInstance
        fields = ('id', 'version', 'parameters', 'source', 'model_id')


class ScientificModelInstanceReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    model = ScientificModelReadOnlySerializer(read_only=True)
    class Meta:
        model = ScientificModelInstance
        fields = ('id', 'version', 'parameters', 'source', 'model')




class ScientificModelImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelImage
        fields = ('id', 'url', 'caption','model_id')


class ScientificModelInstanceForModelReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelInstance
        fields = ('id', 'version', 'parameters', 'source')

class ScientificModelImageForModelReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelImage
        fields = ('id', 'url', 'caption')

class ScientificModelReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    instances = ScientificModelInstanceForModelReadOnlySerializer (read_only=True, many=True )
    images = ScientificModelImageForModelReadOnlySerializer (read_only=True , many=True )

    class Meta:
        model = ScientificModel
        fields = ('id', 'name', 'alias', 'author', 'app_id','private', 'cell_type', 'model_type', 'brain_region', 'species','description', 'instances', 'images')


class ScientificModelFullReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    app = CollabParametersSerializer( read_only=True)
    instances = ScientificModelInstanceSerializer (read_only=True, many=True )
    images = ScientificModelImageSerializer (read_only=True , many=True )
    class Meta:
        model = ScientificModel
        fields = ('id', 'name', 'alias', 'author', 'app','private', 'cell_type', 'model_type', 'brain_region', 'species','description', 'instances', 'images')


class ValidationTestCodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ValidationTestCode
        fields = ('id', 'repository', 'version', 'path', 'timestamp', 'test_definition_id')

class ValidationTestDefinitionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ValidationTestDefinition
        fields = ('id', 'name', 'alias', 'species', 'brain_region', 
                    'cell_type', 'age', 'data_location', 
                    'data_type', 'data_modality', 'test_type', 
                    'protocol', 'author', 'publication', 'score_type')

class ValidationTestCodeReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    test_definition = ValidationTestDefinitionSerializer (read_only = True)
    class Meta:
        model = ValidationTestCode
        fields = ('id', 'repository', 'version', 'path', 'timestamp', 'test_definition')

class ValidationTestResultReadOnlySerializer (serializers.HyperlinkedModelSerializer):
    model_version = ScientificModelInstanceReadOnlySerializer(read_only=True)
    test_code = ValidationTestCodeReadOnlySerializer(read_only=True)
    class Meta:
        model = ValidationTestResult
        fields = ('id',  'results_storage', 'score', 'passed', 'timestamp', 'platform',   'project', 'model_version', 'test_code', 'normalized_score')



class ValidationModelResultReadOnlySerializer (serializers.HyperlinkedModelSerializer):
    model_version = ScientificModelInstanceSerializer(read_only=True)
    test_code = ValidationTestCodeSerializer(read_only=True)
    class Meta:
        model = ValidationTestResult
        fields = ('id',  'results_storage', 'score', 'passed', 'timestamp', 'platform',   'project', 'model_version', 'test_code', 'normalized_score')


 
class ValidationTestDefinitionWithCodesReadSerializer(serializers.HyperlinkedModelSerializer):
    codes = ValidationTestCodeSerializer(many=True , read_only=True)
    class Meta:
        model = ValidationTestDefinition
        fields = ('id', 'name', 'species', 'brain_region', 
                    'cell_type', 'age', 'data_location', 
                    'data_type', 'alias', 'data_modality', 'test_type', 
                    'protocol', 'author', 'publication', 'codes')



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



class CommentSerializer(serializers.HyperlinkedModelSerializer):
    # test = ValidationTestCodeSerializer(many=True , read_only=True)
    class Meta:
        model = Comments
        fields = ( 'id', 'author', 'text', 'creation_date', 'Ticket_id')

class TicketReadOnlySerializer(serializers.HyperlinkedModelSerializer):
    # test = ValidationTestCodeSerializer(many=True , read_only=True)
    comments = CommentSerializer (many=True, read_only=True)
    class Meta:
        model = Tickets
        fields = ( 'id', 'author', 'title', 'text', 'creation_date', 'test_id', 'comments')

class TicketSerializer(serializers.HyperlinkedModelSerializer):
    # test = ValidationTestCodeSerializer(many=True , read_only=True)
    class Meta:
        model = Tickets
        fields = ( 'id', 'author', 'title', 'text', 'creation_date', 'test_id')
