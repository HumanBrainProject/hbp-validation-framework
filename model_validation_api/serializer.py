
from django.core.serializers.json import DjangoJSONEncoder

from .models import (ValidationTestDefinition, 
                    ValidationTestCode,
                    ScientificModel,

#                    configview,

                    ScientificModelInstance,

                    ScientificModelImage,
                    Comment,

                    CollabParameters,

                    Param_DataModalities,
                    Param_TestType,
                    Param_Species,
                    Param_BrainRegion,
                    Param_CellType,
                    Param_ModelType,
                    ValidationTestResult

                    )

from rest_framework import serializers



# class ValidationTestResultSerializer(object):
    
#     @staticmethod
#     def _to_dict(result):
#         data = {
#             "model_instance": {
#                 "model_id": result.model_instance.model.pk,
#                 "version": result.model_instance.version,
#                 "parameters": result.model_instance.parameters,
#                 "resource_uri": "/models/{}?instance={}".format(result.model_instance.model.pk,
#                                                                 result.model_instance.pk)
#             },
#             "test_definition": "/tests/{}?version={}".format(result.test_definition.test_definition.pk,
#                                                              result.test_definition.pk),
#             "results_storage": result.results_storage,
#             "result": result.result,
#             "passed": result.passed,
#             "platform": result.get_platform_as_dict(),
#             "timestamp": result.timestamp,
#             "project": result.project,
#             "resource_uri": "/results/{}".format(result.pk)
#         }
#         return data

#     @classmethod
#     def serialize(cls, results):
#         if isinstance(results, ValidationTestResult):
#             data = cls._to_dict(results)
#         else:
#             data = [cls._to_dict(result) for result in results]
#         encoder = DjangoJSONEncoder(ensure_ascii=False, indent=4)
#         return encoder.encode(data)


#### rest freamework serializers ####




class ValidationTestResultSerializer (serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ValidationTestResult
        fields = ('id',  'results_storage', 'result', 'passed', 'timestamp', 'platform',   'project', 'model_instance_id', 'test_definition_id')


class ScientificModelInstanceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelInstance
        fields = ('id', 'version', 'parameters', 'source', 'model_id')

class ScientificModelImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModelImage
        fields = ('id', 'url', 'caption','model_id')

class ScientificModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScientificModel
        fields = ('id', 'name', 'description', 'species', 'brain_region', 'cell_type', 'author', 'model_type','private','access_control','collab_id')


#may be need to create one read version
class ValidationTestCodeSerializer(serializers.HyperlinkedModelSerializer):
    # test_definition_id = serializers.SlugRelatedField(slug_field='id', read_only=True)#queryset=test.objects.all())
    # test_definition_id = serializers.RelatedField(source='test.id', read_only=True)

    class Meta:
        model = ValidationTestCode
        fields = ('id', 'repository', 'version', 'path', 'timestamp', 'test_definition_id')
        # read_only_fields = ('test_definition_id')


class ValidationTestDefinitionSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ValidationTestDefinition
        fields = ('id', 'name', 'species', 'brain_region', 
                    'cell_type', 'age', 'data_location', 
                    'data_type', 'data_modality', 'test_type', 
                    'protocol', 'author', 'publication')


class ValidationTestDefinitionWithCodesReadSerializer(serializers.HyperlinkedModelSerializer):
    # codes = serializers.PrimaryKeyRelatedField(many = True, read_only=True)
    codes = ValidationTestCodeSerializer(many=True , read_only=True)

    class Meta:
        model = ValidationTestDefinition
        fields = ('id', 'name', 'species', 'brain_region', 
                    'cell_type', 'age', 'data_location', 
                    'data_type', 'data_modality', 'test_type', 
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



class CollabParametersSerializer(serializers.HyperlinkedModelSerializer):
     class Meta:
        model = CollabParameters
        fields = ('id', 'data_modalities', 'test_type', 'species', 'brain_region', 
                    'cell_type', 'model_type', 'app_type')

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
        model = Comment
        fields = ( 'id', 'author', 'text', 'creation_date', 'approved_comment', 'test_id')

