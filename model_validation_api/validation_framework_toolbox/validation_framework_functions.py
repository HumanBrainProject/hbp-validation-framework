from .user_auth_functions import *

from uuid import UUID
import json


from ..models import (ValidationTestDefinition,
                        ValidationTestCode,
                        ValidationTestResult,
                        ScientificModel,
                        ScientificModelInstance,
                        ScientificModelImage,
                        Comments,
                        Tickets,
                        # FollowModel,
                        Param_DataModalities,
                        Param_TestType,
                        Param_Species,
                        Param_BrainRegion,
                        Param_CellType,
                        Param_ModelScope,
                        Param_AbstractionLevel,
                        CollabParameters,
                        Param_ScoreType,
                        Param_organizations,
                        )


from ..serializer.serializer import (ValidationTestDefinitionSerializer,
                            ScientificModelSerializer,
                            ScientificModelReadOnlySerializer,
                            ScientificModelFullReadOnlySerializer,
                            ScientificModelInstanceSerializer,
                            ScientificModelInstanceReadOnlySerializer,
                            ScientificModelReadOnlyForHomeSerializer,
                            ScientificModelImageSerializer,
                            ValidationTestResultSerializer,
                            ValidationTestResultReadOnlySerializer,
                            ValidationModelResultReadOnlySerializer,
                            ValidationTestCodeSerializer,
                            ValidationTestCodeReadOnlySerializer,
                            ValidationTestDefinitionFullSerializer,
                            CommentSerializer,
                            TicketReadOnlySerializer,
                            TicketSerializer,
                            # FollowModelSerializer,

                            CollabParametersSerializer,

                            Param_DataModalitiesSerializer,
                            Param_TestTypeSerializer,
                            Param_SpeciesSerializer,
                            Param_BrainRegionSerializer,
                            Param_CellTypeSerializer,
                            Param_ModelScopeSerializer,
                            Param_AbstractionLevelSerializer,
                            Param_ScoreTypeSerializer,
                            Param_OrganizationsSerializer)

from ..serializer.serializer_kg import ValidationTestResultKGSerializer


from nar.base import as_list
from nar.brainsimulation import ModelProject


def check_list_uuid_validity (uuid_list) :
    """
    Check validity of a list of uuid
    :param uuid_list: list of uuid
    :type uuid_list: list
    :returns: response
    :rtype: boolean
    """
    for i in uuid_list :
        if check_uuid_validity(i) is False :
            return False
    return True


def check_uuid_validity (uuid_string):
    """
    Check validity of uuid
    :param uuid_string: string of uuid
    :type uuid_string: str
    :returns: response
    :rtype: boolean
    """
    try :
        UUID(uuid_string)
        return True
    except :
        return False


def get_collab_id_from_app_id (app_id):
    """
    Get collab id with app id
    :param app_id: id of app
    :type app_id: int
    :returns: collab_id
    :rtype: int
    """
    collab_param = CollabParameters.objects.filter(id = app_id)
    # if len(collab_param) > 0 :
    collab_id = collab_param.values('collab_id')[0]['collab_id']
    return collab_id
    # else :
    #     return (false)


def _are_model_instance_version_unique (instance_json):
    """
    Check if versions of model instance are unique
    :param instance_json: datas of instance
    :type instance_json: dict
    :returns: response
    :rtype: boolean
    """
    new_version_name = instance_json['version']
    try :
        new_instance_id = instance_json["id"]
    except:
        new_instance_id = None
    all_instances_versions_name = ScientificModelInstance.objects.filter(model_id = instance_json['model_id']).exclude(id=new_instance_id).values_list("version",flat=True)
    if new_version_name in all_instances_versions_name:
        return False
    return True

def _are_model_instance_version_unique_kg(instance_json, nar_client):
    """
    Check if versions of model instance are unique
    :param instance_json: datas of instance
    :type instance_json: dict
    :returns: response
    :rtype: boolean
    """
    new_version_name = instance_json['version']
    try :
        new_instance_id = instance_json["id"]
    except:
        new_instance_id = None

    model_project = ModelProject.from_uuid(instance_json['model_id'], nar_client)
    if model_project.instances:
        all_instances_versions_name = [inst.resolve(nar_client).version for inst in as_list(model_project.instances)]
        if new_version_name in all_instances_versions_name:
            return False
    return True

def _are_test_code_version_unique (testcode_json):
    """
    Check if versions of test code are unique
    :param testcode_json: datas of test code
    :type testcode_json: dict
    :returns: response
    :rtype: boolean
    """
    new_version_name = testcode_json['version']
    try :
        new_testcode_id = testcode_json["id"]
    except:
        new_testcode_id = None
    all_test_code_versions_name = ValidationTestCode.objects.filter(test_definition_id = testcode_json['test_definition_id']).exclude(id=new_testcode_id).values_list("version",flat=True)
    if new_version_name in all_test_code_versions_name:
        return False
    return True

def _are_test_code_editable(testcode_json):
    """
    Check if tests code are editable
    :param testcode_json: datas of test code
    :type testcode_json: dict
    :returns: response
    :rtype: boolean
    """
    try:
        results = ValidationTestResult.objects.filter(test_code_id=testcode_json['id'])
    except:
        try:
            results = ValidationTestResult.objects.filter(test_code_id=testcode_json.get('id'))
        except:
            results = ValidationTestResult.objects.filter(test_code_id=testcode_json.id)
    if len(results)>0:
        return False
    return True

def _are_model_instance_editable(model_instance_json):
    """
    Check if model instance are editable
    :param model_instance_json: datas of test code
    :type model_instance_json: dict
    :returns: response
    :rtype: boolean
    """
    try:
        results = ValidationTestResult.objects.filter(model_version_id=model_instance_json['id'])
    except:
        try:
            results = ValidationTestResult.objects.filter(model_version_id=model_instance_json.get('id'))
        except:
                results = ValidationTestResult.objects.filter(model_version_id=model_instance_json.id)
    if len(results)>0:
        return False
    return True


def check_versions_unique (list_given, list_already_there):
    """
    Compare two list and check verify difference
    :param list_given: first list
    :type list_given: list
    :param list_already_there: second list
    :type list_already_there: list
    :returns: response
    :rtype: boolean
    """
    #inner check on list_givent
    if not len(list_given) == len(set(list_given)) :
        return (False)

    if not len(list_already_there) == len(set(list_already_there)) :
        return (False)

    #cross check list_given and list_already_there
    if not (len(list_given)+ len(list_already_there)) ==  len(set(list_given).union(set(list_already_there))) :
        return (False)

    return (True)

def extract_all_code_version_from_test_object_id (put_id, test_id):
    """
    get all code versions with test object id
    :param put_id: param to exclude
    :type put_id: int
    :param test_id: id of object
    :type test_id: int
    :returns: extracted list of code version
    :rtype: list
    """
    if put_id :
        test_code_list_id = ValidationTestCode.objects.filter(test_definition_id = test_id).exclude(id=put_id).values_list("version", flat=True)
    else :
        test_code_list_id = ValidationTestCode.objects.filter(test_definition_id = test_id).values_list("version", flat=True)

    return test_code_list_id

def extract_all_instance_version_from_model_id (put_id,  model_id):
    """
    get all instances versions with test object id
    :param put_id: param to exclude
    :type put_id: int
    :param test_id: id of model
    :type test_id: int
    :returns: extracted list of instances version
    :rtype: list
    """
    if put_id :
        model_instance_list_id = ScientificModelInstance.objects.filter(model_id = model_id).exclude(id=put_id).values_list("version",flat=True)
    else :
        model_instance_list_id = ScientificModelInstance.objects.filter(model_id = model_id).values_list("version",flat=True)

    return model_instance_list_id

def extract_versions_and_model_id_from_instance_json (instance_json):
    """
    Get versions and id of models in json string with instance_json
    :param instance_json: data of instance
    :type instance_json: dict
    :returns: str json response
    :rtype: str
    """
    return {'model_id': instance_json["model_id"] ,  'version_name': instance_json["version"] }

def extract_versions_and_test_id_from_list_testcode_json (testcode_json):
    """
    Get versions and id of test in json string with testcode_json
    :param testcode_json: data of test code
    :type testcode_json: dict
    :returns: str json response
    :rtype: str
    """
    return {'test_id' :testcode_json["test_definition_id"] ,  'version_name': testcode_json["version"] }

def check_commun_params_json (json):
    """
    Check validity of params of json params. It need each one of next parameters: cell_type, species and brain_region.
    :param json: json dict of data with parameters to check
    :type json: dict
    :returns: response boolean
    :rtype: boolean
    """
    if 'cell_type' in json :
        if json['cell_type'] != "" :
            if len(Param_CellType.objects.filter(authorized_value= json['cell_type'])) != 1 :
                return ("You gave an invalid cell_type parameter")
        else :
            json.pop('cell_type', None)

    if 'species' in json :
        if json['species'] != "" :
            if len(Param_Species.objects.filter(authorized_value=json['species'])) != 1 :
                return ("You gave an invalid species parameter")
        else :
            json.pop('species', None)

    if 'brain_region' in json :
        if json['brain_region'] != "" :
            if len(Param_BrainRegion.objects.filter(authorized_value=json['brain_region'])) != 1 :
                return ("You gave an invalid brain_region parameter")
        else :
            json.pop('brain_region', None)

    return (True)

def check_param_of_model_json (json):
    """
    Check validity of params of model json. It need each one of next parameters: model_type and organization.
    :param json: json dict of data with parameters to check
    :type json: dict
    :returns: response
    :rtype: boolean
    """
    commun = check_commun_params_json(json)
    if commun is True :
        if 'model_type' in json :
            if json['model_type'] != "" :
                if len(Param_ModelType.objects.filter(authorized_value=json['model_type'])) != 1 :
                    return ("You gave an invalid model_type parameter")
            else :
                json.pop('model_type', None)

        if 'organization' in json :
            if json['organization'] != "" :
                if len(Param_organizations.objects.filter(authorized_value=json['organization'])) != 1 :
                    return ("You gave an invalid organization parameter")
            else :
                json.pop('organization', None)

        return (True)
    else :
        return (commun)

def check_param_of_test_json (json):
    """
    Check validity of params of test json. It need each one of next parameters: data_modality, test_type and score_type.
    :param json: json dict of data with parameters to check
    :type json: dict
    :returns: response
    :rtype: boolean
    """
    commun = check_commun_params_json(json)
    if commun is True :
        if 'data_modality' in json :
            if json['data_modality'] != "" :
                if len(Param_DataModalities.objects.filter(authorized_value=json['data_modality'])) != 1 :
                    return ("You gave an invalid data_modality parameter")
            else :
                json.pop('data_modality', None)

        if 'test_type' in json :
            if json['test_type'] != "" :
                if len(Param_TestType.objects.filter(authorized_value=json['test_type'])) != 1 :
                    return ("You gave an invalid test_type parameter")
            else :
                json.pop('test_type', None)

        # if 'score_type' in json :
        #     if json['score_type'] != "" :
        #         if len(Param_ScoreType.objects.filter(authorized_value=json['score_type'])) != 1 :
        #             return ("You gave an invalid score_type parameter")
        #     else :
        #         json.pop('score_type', None)

        return (True)
    else :
        return (commun)


def user_has_acces_to_model (request, model):
    """
    Check if user execute request has access to model
    :param request: request
    :type request: str
    :param model: model
    :type model: object
    :returns: response
    :rtype: boolean
    """
    if model.private == 0 :
        return True

    app_id = model.app_id
    collab_id = get_collab_id_from_app_id(app_id)
    if is_authorised_or_admin(request, collab_id) :
        return True
    else :
        return False


def user_has_acces_to_result (request, result):
    """
    Check if user execute request has access to result
    :param request: request
    :type request: str
    :param result: result
    :type result: object
    :returns: response
    :rtype: boolean
    """

    model_version_id = result.model_version_id
    model_instance = ScientificModelInstance.objects.get (id= model_version_id)
    model = ScientificModel.objects.get(id=model_instance.model_id)

    acces = user_has_acces_to_model(request, model)
    return acces



def get_result_informations (result):
    """
    Get information of result
    :param result: result
    :type result: object
    :returns: list result_info
    :rtype: list
    """
    result_info = {}

    #test info
    test_code = ValidationTestCode.objects.get (id=result.test_code_id )
    test = ValidationTestDefinition.objects.get(id=test_code.test_definition_id)

    result_info['test_id'] = str(test_code.test_definition_id)
    result_info['test_name'] = str(test.name)
    result_info['test_alias'] = str(test.alias)
    result_info['test_score_type'] = str(test.score_type)
    result_info['test_code_id'] = str(test_code.id)
    result_info['test_code_version'] = str(test_code.version)
    result_info['test_code_timestamp'] = str(test_code.timestamp)


    #model info
    model_instance = ScientificModelInstance.objects.get (id= result.model_version_id)
    model = ScientificModel.objects.get(id=model_instance.model_id)

    result_info['model_id'] = str(model.id)
    result_info['model_name'] = str(model.name)
    result_info['model_alias'] = str(model.alias)
    result_info['model_instance_id'] = str(model_instance.id)
    result_info['model_instance_version'] = str(model_instance.version)
    result_info['model_instance_timestamp'] = str(model_instance.timestamp)


    return (result_info)


def get_result_information_kg(result, client):
    """
    Get information of result
    :param result: result
    :type result: object
    :returns: list result_info
    :rtype: list
    """
    result_info = {}

    #test info
    validation_activity = result.generated_by.resolve(client)
    test_code = validation_activity.test_script.resolve(client)
    test = test_code.test_definition.resolve(client)

    result_info['test_id'] = str(test.uuid)
    result_info['test_name'] = str(test.name)
    result_info['test_alias'] = str(test.alias)
    result_info['test_score_type'] = str(test.score_type)
    result_info['test_code_id'] = str(test_code.uuid)
    result_info['test_code_version'] = str(test_code.version)
    result_info['test_code_timestamp'] = str(test_code.date_created)


    #model info
    model_instance = validation_activity.model_instance.resolve(client)
    model = model_instance.project.resolve(client)

    result_info['model_id'] = str(model.uuid)
    result_info['model_name'] = str(model.name)
    result_info['model_alias'] = str(model.alias)
    result_info['model_instance_id'] = str(model_instance.uuid)
    result_info['model_instance_version'] = str(model_instance.version)
    result_info['model_instance_timestamp'] = str(model_instance.timestamp)


    return (result_info)


def organise_results_dict ( detailed_view, point_of_view, results, serializer_context):
    """
    Get result informations and organize it in term of points of view in only one json string
    :param detailed_view: detailed_view
    :type detailed_view: boolean
    :param point_of_view: point_of_view
    :type point_of_view: str
    :param results: results
    :type results: str
    :param serializer_context: serializer_context
    :type serializer_context: str
    :returns: str json data_to_return
    :rtype: str
    """
    data_to_return = {}

    #data_to_return structuraction for test point of view
    if point_of_view == "test" :
        # print "test first"
        data_to_return['tests'] = {}
        for result in results :
            result_info = get_result_informations(result)

            current = data_to_return['tests']
            if result_info['test_id'] not in current  :
                 current[result_info['test_id']] = { 'alias': result_info['test_alias'],'score_type':result_info['test_score_type'], 'test_codes' : {} }

            current = current[result_info['test_id']]['test_codes']
            if result_info['test_code_id'] not in current :
                current[result_info['test_code_id']] = {'version' : result_info['test_code_version']  , 'models' : {}}

            current = current[result_info['test_code_id']]['models']
            if result_info['model_id'] not in current :
                current[result_info['model_id']] = {'alias' : result_info['model_alias'], 'model_instances' : {} }

            current = current[result_info['model_id']]['model_instances']
            if result_info['model_instance_id'] not in current :
                result_data = ValidationTestResultSerializer(result, context=serializer_context).data
                current[result_info['model_instance_id']] = {'version' : result_info['model_instance_version'], 'result' : result_data }


    #data_to_return structuraction for model point of view
    elif  point_of_view == "model" :
        # print "model first"

        data_to_return['models'] = {}
        for result in results :
            result_info = get_result_informations(result)

            current = data_to_return['models']
            if result_info['model_id'] not in current  :
                 current[result_info['model_id']] = { 'alias': result_info['model_alias'],  'model_instances' : {} }

            current = current[result_info['model_id']]['model_instances']
            if result_info['model_instance_id'] not in current :
                current[result_info['model_instance_id']] = {'version' : result_info['model_instance_version']  , 'tests' : {}}

            current = current[result_info['model_instance_id']]['tests']
            if result_info['test_id'] not in current :
                current[result_info['test_id']] = {'alias' : result_info['test_alias'], 'test_codes' : {} }

            current = current[result_info['test_id']]['test_codes']
            if result_info['test_code_id'] not in current :
                result_data = ValidationTestResultSerializer(result, context=serializer_context).data
                current[result_info['test_code_id']] = {'version' : result_info['test_code_version'], 'result' : result_data }

    elif  point_of_view == "test_code" :

        data_to_return['test_codes'] = {}
        for result in results :
            result_info = get_result_informations(result)

            current = data_to_return['test_codes']
            if result_info['test_code_id'] not in current  :
                 current[result_info['test_code_id']] = { 'version' : result_info['test_code_version'],'test_alias': result_info['test_alias'],'test_id': result_info['test_id'], 'test_name': result_info['test_name'], 'model_instances':{}, 'timestamp': result_info['test_code_timestamp'] }

            current = current[result_info['test_code_id']]['model_instances']
            if result_info['model_instance_id'] not in current :
                current[result_info['model_instance_id']] = {'version' : result_info['model_instance_version'], 'model_alias' : result_info['model_alias'],'model_id' : result_info['model_id'], 'timestamp' : result_info['model_instance_timestamp'] , 'results' : {} }

            current = current[result_info['model_instance_id']]['results']
            result_data = ValidationTestResultSerializer(result, context=serializer_context).data
            current[result_data['id']] = result_data

    elif  point_of_view == "model_instance" :

        data_to_return['model_instances'] = {}
        for result in results :
            result_info = get_result_informations(result)
            current = data_to_return['model_instances']
            if result_info['model_instance_id'] not in current  :
                 current[result_info['model_instance_id']] = { 'version' : result_info['model_instance_version'],'model_alias': result_info['model_alias'],'model_id': result_info['model_id'], 'model_name': result_info['model_name'], 'test_codes':{},  'timestamp': result_info['model_instance_timestamp'] }

            current = current[result_info['model_instance_id']]['test_codes']
            if result_info['test_code_id'] not in current :
                current[result_info['test_code_id']] = {'version' : result_info['test_code_version'], 'test_alias' : result_info['test_alias'],'test_id' : result_info['test_id'], 'timestamp' : result_info['test_code_timestamp'], 'results' : {} }

            current = current[result_info['test_code_id']]['results']

            result_data = ValidationTestResultSerializer(result, context=serializer_context).data
            current[result_data['id']] = result_data

    elif  point_of_view == "score_type" :
        data_to_return['score_type'] = {}

        for result in results :
            result_info = get_result_informations(result)
            current = data_to_return['score_type']
            if result_info['test_score_type'] not in current  :
                 current[result_info['test_score_type']] = {'test_codes':{}}

            current = current[result_info['test_score_type']]['test_codes']

            if result_info['test_code_id'] not in current  :
                 current[result_info['test_code_id']] = { 'version' : result_info['test_code_version'],'test_alias': result_info['test_alias'],'test_id': result_info['test_id'], 'test_name': result_info['test_name'], 'model_instances':{}, 'timestamp': result_info['test_code_timestamp'] }

            current = current[result_info['test_code_id']]['model_instances']

            if result_info['model_instance_id'] not in current :
                current[result_info['model_instance_id']] = {'version' : result_info['model_instance_version'], 'model_alias' : result_info['model_alias'],'model_id' : result_info['model_id'], 'timestamp' : result_info['model_instance_timestamp'] , 'results' : {} }

            current = current[result_info['model_instance_id']]['results']

            result_data = ValidationTestResultSerializer(result, context=serializer_context).data
            current[result_data['id']] = result_data

    #data_to_return no structuraction
    else :
        if detailed_view :
            result_serializer = ValidationTestResultReadOnlySerializer(results, context=serializer_context, many=True).data
        else :
            result_serializer = ValidationTestResultSerializer(results, context=serializer_context, many=True).data

        data_to_return = {'results' : result_serializer}

    return data_to_return

def organise_results_dict_kg( detailed_view, point_of_view, results, client):
    """
    Get result informations and organize it in term of points of view in only one json string
    :param detailed_view: detailed_view
    :type detailed_view: boolean
    :param point_of_view: point_of_view
    :type point_of_view: str
    :param results: results
    :type results: str
    :param serializer_context: serializer_context
    :type serializer_context: str
    :returns: str json data_to_return
    :rtype: str
    """
    data_to_return = {}

    #data_to_return structuraction for test point of view
    if point_of_view == "test" :
        # print "test first"
        data_to_return['tests'] = {}
        for result in results :
            result_info = get_result_information_kg(result, client)

            current = data_to_return['tests']
            if result_info['test_id'] not in current  :
                 current[result_info['test_id']] = { 'alias': result_info['test_alias'],'score_type':result_info['test_score_type'], 'test_codes' : {} }

            current = current[result_info['test_id']]['test_codes']
            if result_info['test_code_id'] not in current :
                current[result_info['test_code_id']] = {'version' : result_info['test_code_version']  , 'models' : {}}

            current = current[result_info['test_code_id']]['models']
            if result_info['model_id'] not in current :
                current[result_info['model_id']] = {'alias' : result_info['model_alias'], 'model_instances' : {} }

            current = current[result_info['model_id']]['model_instances']
            if result_info['model_instance_id'] not in current :
                result.model_version_id = result_info["model_instance_id"]
                result.test_code_id = result_info["test_code_id"]
                result_data = ValidationTestResultKGSerializer(result, client).data
                current[result_info['model_instance_id']] = {'version' : result_info['model_instance_version'], 'result' : result_data }


    #data_to_return structuraction for model point of view
    elif  point_of_view == "model" :
        # print "model first"

        data_to_return['models'] = {}
        for result in results :
            result_info = get_result_information_kg(result, client)

            current = data_to_return['models']
            if result_info['model_id'] not in current  :
                 current[result_info['model_id']] = { 'alias': result_info['model_alias'],  'model_instances' : {} }

            current = current[result_info['model_id']]['model_instances']
            if result_info['model_instance_id'] not in current :
                current[result_info['model_instance_id']] = {'version' : result_info['model_instance_version']  , 'tests' : {}}

            current = current[result_info['model_instance_id']]['tests']
            if result_info['test_id'] not in current :
                current[result_info['test_id']] = {'alias' : result_info['test_alias'], 'test_codes' : {} }

            current = current[result_info['test_id']]['test_codes']
            if result_info['test_code_id'] not in current :
                result.model_version_id = result_info["model_instance_id"]
                result.test_code_id = result_info["test_code_id"]
                result_data = ValidationTestResultKGSerializer(result, client).data
                current[result_info['test_code_id']] = {'version' : result_info['test_code_version'], 'result' : result_data }

    elif  point_of_view == "test_code" :

        data_to_return['test_codes'] = {}
        for result in results :
            result_info = get_result_information_kg(result, client)

            current = data_to_return['test_codes']
            if result_info['test_code_id'] not in current  :
                 current[result_info['test_code_id']] = { 'version' : result_info['test_code_version'],'test_alias': result_info['test_alias'],'test_id': result_info['test_id'], 'test_name': result_info['test_name'], 'model_instances':{}, 'timestamp': result_info['test_code_timestamp'] }

            current = current[result_info['test_code_id']]['model_instances']
            if result_info['model_instance_id'] not in current :
                current[result_info['model_instance_id']] = {'version' : result_info['model_instance_version'], 'model_alias' : result_info['model_alias'],'model_id' : result_info['model_id'], 'timestamp' : result_info['model_instance_timestamp'] , 'results' : {} }

            current = current[result_info['model_instance_id']]['results']
            result.model_version_id = result_info["model_instance_id"]
            result.test_code_id = result_info["test_code_id"]
            result_data = ValidationTestResultKGSerializer(result, client).data
            current[result_data['id']] = result_data

    elif  point_of_view == "model_instance" :

        data_to_return['model_instances'] = {}
        for result in results :
            result_info = get_result_information_kg(result, client)
            current = data_to_return['model_instances']
            if result_info['model_instance_id'] not in current  :
                 current[result_info['model_instance_id']] = { 'version' : result_info['model_instance_version'],'model_alias': result_info['model_alias'],'model_id': result_info['model_id'], 'model_name': result_info['model_name'], 'test_codes':{},  'timestamp': result_info['model_instance_timestamp'] }

            current = current[result_info['model_instance_id']]['test_codes']
            if result_info['test_code_id'] not in current :
                current[result_info['test_code_id']] = {'version' : result_info['test_code_version'], 'test_alias' : result_info['test_alias'],'test_id' : result_info['test_id'], 'timestamp' : result_info['test_code_timestamp'], 'results' : {} }

            current = current[result_info['test_code_id']]['results']
            result.model_version_id = result_info["model_instance_id"]
            result.test_code_id = result_info["test_code_id"]
            result_data = ValidationTestResultKGSerializer(result, client).data
            current[result_data['id']] = result_data

    elif  point_of_view == "score_type" :
        data_to_return['score_type'] = {}

        for result in results :
            result_info = get_result_information_kg(result, client)
            current = data_to_return['score_type']
            if result_info['test_score_type'] not in current  :
                 current[result_info['test_score_type']] = {'test_codes':{}}

            current = current[result_info['test_score_type']]['test_codes']

            if result_info['test_code_id'] not in current  :
                 current[result_info['test_code_id']] = { 'version' : result_info['test_code_version'],'test_alias': result_info['test_alias'],'test_id': result_info['test_id'], 'test_name': result_info['test_name'], 'model_instances':{}, 'timestamp': result_info['test_code_timestamp'] }

            current = current[result_info['test_code_id']]['model_instances']

            if result_info['model_instance_id'] not in current :
                current[result_info['model_instance_id']] = {'version' : result_info['model_instance_version'], 'model_alias' : result_info['model_alias'],'model_id' : result_info['model_id'], 'timestamp' : result_info['model_instance_timestamp'] , 'results' : {} }

            current = current[result_info['model_instance_id']]['results']
            result.model_version_id = result_info["model_instance_id"]
            result.test_code_id = result_info["test_code_id"]
            result_data = ValidationTestResultKGSerializer(result, client).data
            current[result_data['id']] = result_data

    #data_to_return no structuraction
    else :
        if detailed_view :
            result_serializer = ValidationTestResultKGSerializer(results, client, many=True).data
        else :
            result_serializer = ValidationTestResultKGSerializer(results, client, many=True).data

        data_to_return = {'results' : result_serializer}

    return data_to_return


def _get_collab_id(request):
    """
    Extract collab_id from request
    :param request: request
    :type request: str
    :returns: collab_id
    :rtype: int
    """
    social_auth = request.user.social_auth.get()
    headers = {
        'Authorization': get_auth_header(request.user.social_auth.get())
    }
    ctx = request.GET.getlist('ctx')[0]
    svc_url = settings.HBP_COLLAB_SERVICE_URL
    url = '%scollab/context/%s/' % (svc_url, ctx)
    res = requests.get(url, headers=headers)
    collab_id = res.json()['collab']['id']

    return collab_id

def _get_app_id(request):
    """
    Extract app_id from request
    :param request: request
    :type request: str
    :returns: app_id
    :rtype: int
    """
    social_auth = request.user.social_auth.get()
    headers = {
        'Authorization': get_auth_header(request.user.social_auth.get())
    }
    #to get collab_id
    svc_url = settings.HBP_COLLAB_SERVICE_URL
    ctx = request.GET.getlist('ctx')[0]

    url = '%scollab/context/%s/' % (svc_url, ctx)
    res = requests.get(url, headers=headers)
    app_id = res.json()['id']

    return app_id

def _get_nb_pages (total_items, nb_per_pages):
    mod = divmod(total_items,nb_per_pages)
    if mod[1] == 0:
        pages = mod[0]
    else:
        pages = mod[0]+1

    return pages