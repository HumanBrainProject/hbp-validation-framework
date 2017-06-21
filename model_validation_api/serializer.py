
from django.core.serializers.json import DjangoJSONEncoder

from .models import (ValidationTestDefinition, 
                    ValidationTestCode,
                    ScientificModel,
                    ScientificModelInstance,
<<<<<<< HEAD
                    Comment,
=======
                    ScientificModelImage,
                    CollabParameters
>>>>>>> f6b03465ff79930c90a7971e7cf0ba48ef0fb3d3
                    )

from rest_framework import serializers


# class ValidationTestDefinitionSerializer(object):
    
#     @staticmethod
#     def _to_dict(test, version=None):
#         resource_uri = "/tests/{}".format(test.pk)
#         if version is None:
#             try:
#                 code_obj = ValidationTestCode.objects.filter(test_definition=test).latest()
#                 version = code_obj.pk
#             except ValidationTestCode.DoesNotExist:
#                 code_obj = None
#         else:
#             code_obj = ValidationTestCode.objects.get(pk=version, test_definition=test)
#         if code_obj:
#             resource_uri += "?version={}".format(version)
#             code = {
#                 "repository": code_obj.repository,
#                 "version": code_obj.version,  # note that this is the Git version, not the object version
#                 "path": code_obj.path,
#             }
#         else:
#             codes = None
#         data = {
#             "name": test.name,
#             "species": test.species,
#             "brain_region": test.brain_region,
#             "cell_type": test.cell_type,
#             "age": test.age,
#             "data_location": test.data_location,
#             "data_type": test.data_type,
#             "data_modality": test.data_modality,
#             "test_type": test.test_type,
#             "protocol": test.protocol,
#             "codes": codes,
#             "author": test.author,
#             "publication": test.publication,
#             "resource_uri": resource_uri
#         }
#         return data

#     @classmethod
#     def serialize(cls, tests, version=None):
#         if isinstance(tests, ValidationTestDefinition):
#             data = cls._to_dict(tests, version=version)
#         else:
#             data = [cls._to_dict(test) for test in tests]
#         encoder = DjangoJSONEncoder(ensure_ascii=False, indent=4)
#         return encoder.encode(data)


# class ScientificModelSerializer(object):
    
#     @staticmethod
#     def _to_dict(model):
#         data = {
#             "name": model.name,
#             "description": model.description,
#             "species": model.species,
#             "brain_region": model.brain_region,
#             "cell_type": model.cell_type,
#             "author": model.author,
#             "source": model.source,
#             "resource_uri": "/models/{}".format(model.pk)
#         }
#         return data

#     @classmethod
#     def serialize(cls, models):
#         if isinstance(models, ScientificModel):
#             data = cls._to_dict(models)
#         else:
#             data = [cls._to_dict(model) for model in models]
#         encoder = DjangoJSONEncoder(ensure_ascii=False, indent=4)
#         return encoder.encode(data)


class ValidationTestResultSerializer(object):
    
    @staticmethod
    def _to_dict(result):
        data = {
            "model_instance": {
                "model_id": result.model_instance.model.pk,
                "version": result.model_instance.version,
                "parameters": result.model_instance.parameters,
                "resource_uri": "/models/{}?instance={}".format(result.model_instance.model.pk,
                                                                result.model_instance.pk)
            },
            "test_definition": "/tests/{}?version={}".format(result.test_definition.test_definition.pk,
                                                             result.test_definition.pk),
            "results_storage": result.results_storage,
            "result": result.result,
            "passed": result.passed,
            "platform": result.get_platform_as_dict(),
            "timestamp": result.timestamp,
            "project": result.project,
            "resource_uri": "/results/{}".format(result.pk)
        }
        return data

    @classmethod
    def serialize(cls, results):
        if isinstance(results, ValidationTestResult):
            data = cls._to_dict(results)
        else:
            data = [cls._to_dict(result) for result in results]
        encoder = DjangoJSONEncoder(ensure_ascii=False, indent=4)
        return encoder.encode(data)


#### rest freamework serializers ####

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
        fields = ('id', 'name', 'description', 'species', 'brain_region', 'cell_type', 'author', 'model_type','private','access_control')


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


<<<<<<< HEAD
class CommentSerializer(serializers.HyperlinkedModelSerializer):
    # test = ValidationTestCodeSerializer(many=True , read_only=True)
    class Meta:
        model = Comment
        fields = ( 'id', 'author', 'text', 'creation_date', 'approved_comment', 'test_id')
=======


class CollabParametersSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = CollabParameters
        fields = ('id', 'data_modalities', 'test_type', 'species', 'brain_region', 
                    'cell_type', 'model_type',)

>>>>>>> f6b03465ff79930c90a7971e7cf0ba48ef0fb3d3
