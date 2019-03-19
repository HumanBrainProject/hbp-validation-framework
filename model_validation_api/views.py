"""
    views.py
"""

# -*- coding: utf-8 -*-


import pprint
import math
import json
import logging
import time
try:
    from urlparse import urlparse, parse_qs  # py2
except ImportError:
    from urllib.parse import urlparse, parse_qs
from datetime import date
from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.forms.models import model_to_dict
from django.views.generic import View, ListView, DetailView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.http import (HttpResponse, JsonResponse,
                         HttpResponseBadRequest,     # 400
                         HttpResponseForbidden,      # 403
                         HttpResponseNotFound,       # 404
                         HttpResponseNotAllowed,     # 405
                         HttpResponseNotModified,    # 304
                         HttpResponseRedirect)       # 302
from django.db.models import Max, Count, CASCADE
from django.conf import settings
from django.template import loader
from django.db import connection
import requests

from nar.client import NARClient
from nar.base import KGQuery, as_list
from nar.brainsimulation import ModelProject, ModelInstance, MEModel

from .models import (ValidationTestDefinition,
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


from .serializer.serializer import (ValidationTestDefinitionSerializer,
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
                            Param_OrganizationsSerializer,

                            ScientificModelKGSerializer,
                            ScientificModelInstanceKGSerializer
                            )


from django.shortcuts import get_object_or_404

from django.core import serializers


#rest_framework
from rest_framework import (viewsets,
                            status,
                            mixins,
                            generics,
                            permissions,)

from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt, csrf_protect, ensure_csrf_cookie


from .validation_framework_toolbox.user_auth_functions import (
    _is_collaborator,
    is_authorised_or_admin,
    is_authorised,
    get_user_info,
    is_hbp_member,
    get_storage_file_by_id,
    get_authorization_header
)

from .validation_framework_toolbox.validation_framework_functions import (
    check_list_uuid_validity,
    check_uuid_validity,
    get_collab_id_from_app_id,
    _are_model_instance_version_unique,
    _are_model_instance_version_unique_kg,
    _are_test_code_version_unique,
    _are_test_code_editable,
    _are_model_instance_editable,
    check_versions_unique,
    extract_all_code_version_from_test_object_id,
    extract_all_instance_version_from_model_id,
    extract_versions_and_model_id_from_instance_json,
    extract_versions_and_test_id_from_list_testcode_json,
    check_commun_params_json,
    check_param_of_model_json,
    check_param_of_test_json,
    user_has_acces_to_model,
    user_has_acces_to_result,
    get_result_informations,
    organise_results_dict,
    _get_collab_id,
    _get_app_id,
    _get_nb_pages,
)


import logging

from logging.handlers import RotatingFileHandler
logger = logging.getLogger("model_validation_api")
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s :: %(levelname)s :: %(message)s')
file_handler = RotatingFileHandler('activity.log', 'a', 1000000, 1)
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.DEBUG)
logger.addHandler(stream_handler)

from uuid import UUID


CROSSREF_URL = "http://api.crossref.org/works/"



# class WelcomeView(View):
#     template_name = "welcome.html"
#     # login_url='/login/hbp/'

#     def get(self, request, *args, **kwargs):

#         return render(request, self.template_name, {})

@method_decorator(login_required(login_url='/login/hbp/'), name='dispatch' )
class HomeValidationView(View):
    template_name = "validation_framework/validation_home.html"
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {})

class AuthorizedCollabParameterRest(APIView):
    '''Get Authorized Collab Parameter'''
    def get(self, request,  format=None, **kwargs):
        """
        get the authorized values for the collab parameters: data_modalities, test_type, species, brain_region, cell_type, model_scope, abstraction_level score_type, organization.
        :param python_client:
        :type python_client: boolean
        :returns: list of the autorized values for each parameter: data_modalities, test_type, species, brain_region, cell_type, model_scope, abstraction_level, score_type, organization
        :rtype: string list:
        """
        try:
            python_client = request.GET.getlist('python_client')[0]
        except:
            python_client = 'false'

        serializer_context = {'request': request,}

        data_modalities = Param_DataModalities.objects.all().order_by('authorized_value')
        data_modalities_serializer = Param_DataModalitiesSerializer(data_modalities, context=serializer_context, many=True)

        test_type = Param_TestType.objects.all().order_by('authorized_value')
        test_type_serializer = Param_TestTypeSerializer(test_type, context=serializer_context, many=True)

        species = Param_Species.objects.all().order_by('authorized_value')
        species_serializer = Param_SpeciesSerializer(species, context=serializer_context, many=True)

        brain_region = Param_BrainRegion.objects.all().order_by('authorized_value')
        brain_region_serializer = Param_BrainRegionSerializer(brain_region, context=serializer_context, many=True)

        cell_type = Param_CellType.objects.all().order_by('authorized_value')
        cell_type_serializer = Param_CellTypeSerializer(cell_type, context=serializer_context, many=True)

        model_scope = Param_ModelScope.objects.all().order_by('authorized_value')
        model_scope_serializer = Param_ModelScopeSerializer(model_scope, context=serializer_context, many=True)

        abstraction_level = Param_AbstractionLevel.objects.all().order_by('authorized_value')
        abstraction_level_serializer = Param_AbstractionLevelSerializer(abstraction_level, context=serializer_context, many=True)

        score_type = Param_ScoreType.objects.all().order_by('authorized_value')
        score_type_serializer = Param_ScoreTypeSerializer(score_type, context=serializer_context, many=True)

        organization = Param_organizations.objects.all().order_by('authorized_value')
        organization_serializer = Param_OrganizationsSerializer(organization, context=serializer_context, many=True)

        ##for python client #'python_client=True' 'parameters= list()'
        if python_client == 'true':
            params_asked = request.GET.getlist('parameters')
            if len(params_asked) ==0 :
                params_asked = ["all"]

            if(params_asked[0]=='all') :
                # print "if((params_asked[0]=='all') or (len(params_asked) ==0)):"
                res = {
                    'data_modalities': data_modalities.values_list('authorized_value', flat=True),
                    'test_type' : test_type.values_list('authorized_value', flat=True),
                    'species' : species.values_list('authorized_value', flat=True),
                    'brain_region' : brain_region.values_list('authorized_value', flat=True),
                    'cell_type' : cell_type.values_list('authorized_value', flat=True),
                    'model_scope' : model_scope.values_list('authorized_value', flat=True),
                    'abstraction_level' : abstraction_level.values_list('authorized_value', flat=True),
                    'score_type': score_type.values_list('authorized_value', flat=True),
                    'organization': organization.values_list('authorized_value', flat=True),
                }
                return Response(res)
            else:
                # print "not in the IF"
                # print params_asked
                res = {}
                for param in params_asked:
                    if (param == 'species'):
                        res['species']= species.values_list('authorized_value', flat=True)
                    if (param == 'data_modalities'):
                        res['data_modalities'] = data_modalities.values_list('authorized_value', flat=True)
                    if (param == 'test_type'):
                        res['test_type'] = test_type.values_list('authorized_value', flat=True)
                    if (param == 'brain_region'):
                        res['brain_region'] = brain_region.values_list('authorized_value', flat=True)
                    if (param == 'cell_type'):
                        res['cell_type'] = cell_type.values_list('authorized_value', flat=True)
                    if (param == 'model_scope'):
                        res['model_scope'] = model_scope.values_list('authorized_value', flat=True)
                    if (param == 'abstraction_level'):
                        res['abstraction_level'] = abstraction_level.values_list('authorized_value', flat=True)
                    if (param == 'score_type'):
                        res['score_type'] = score_type.values_list('authorized_value', flat=True)
                    if (param == 'organization'):
                        res['organization'] = organization.values_list('authorized_value', flat=True)

                # print "final res"
                # print res
                return Response(res)


        return Response({
            'data_modalities': data_modalities_serializer.data,
            'test_type' : test_type_serializer.data,
            'species' : species_serializer.data,
            'brain_region' : brain_region_serializer.data,
            'cell_type' : cell_type_serializer.data,
            'model_scope' : model_scope_serializer.data,
            'abstraction_level' : abstraction_level_serializer.data,
            'score_type': score_type_serializer.data,
            'organization': organization_serializer.data,
        })

class CollabIDRest(APIView):
    """
    Get collab ID
    """
    def get(self, request, format=None, **kwargs):
        """
        Get collab ID
        :param user: user name
        :type user: string
        :returns: id of the collab <collab_id>
        :rtype: int:
        """
        if self.request.user == "AnonymousUser" :
            collab_id = 0
        else :
            collab_id = _get_collab_id(request)

        return Response({
            'collab_id': collab_id,
        })


class AppIDRest(APIView):
    """
    Get app ID
    """
    def get(self, request, format=None, **kwargs):
        """
        Get app ID
        :param user: user name
        :type user: string
        :return: id or the application <app_id>
        r_type: int:
        """
        if self.request.user == "AnonymousUser" :
            app_id = 0
        else :
            app_id = _get_app_id(request)

        return Response({
            'app_id': app_id,
        })

class CollabAppID(APIView):
    """
    Get app id with collab_id and app_type
    """
    def get(self, request, format=None, **kwargs):
        """
        Get app id with collab_id and app_type
        :param collab_id: id of collaboratory
        :type collab_id: int
        :param app_type: string equal to "model_catalog" or "validation_framework"
        :type app_type: int
        :returns: app_id : id of the application
        rtype: int:
        """
        param_collab_id = request.GET.getlist('collab_id')
        param_app_type = request.GET.getlist('app_type')

        if len(param_app_type) == 0 :
            param_app_type = ["model_catalog"]

        if len(param_collab_id) > 0 :
            collab_param = CollabParameters.objects.filter(collab_id = param_collab_id[0], app_type=param_app_type[0])

            if len(collab_param)> 0 :
                app_id = collab_param[0].id
            else :
                app_id = ""
            return Response({
                'app_id': app_id,
            })
        else :
            return Response(status=status.HTTP_400_BAD_REQUEST)




class ParametersConfigurationRest( APIView): #LoginRequiredMixin,
    ''' Manage app configuration '''
    def get(self, request, format=None, **kwargs):
        """
        Get app configuration.
        :param app_id: id of application
        :type app_id: string
        :returns: configuration array
        :rtype: json:
        """
        serializer_context = {'request': request,}

        app_id = request.GET.getlist('app_id')
        if len(app_id) == 0 :
            return Response( status=status.HTTP_400_BAD_REQUEST)
        else :
            app_id = app_id[0]


        param = CollabParameters.objects.filter(id = app_id)
        param_serializer = CollabParametersSerializer(param, context=serializer_context, many=True)

        return Response({
            'param': param_serializer.data,
        })


    def post(self, request, format=None):
        """
        Post app configuration.
        :param collab_id: id of collab
        :type collab_id: int
        :return: :param uuid: app id
                :type uuid: int
        """
        # ctx = request.GET.getlist('ctx')[0]

        if 'collab_id' in request.data :
            collab_id = request.data['collab_id']
            collab_id = [collab_id]
        else :
            collab_id = request.GET.getlist('collab_id')


        if len(collab_id) == 0 :
            return Response( status=status.HTTP_400_BAD_REQUEST)
        else :
            collab_id = collab_id[0]


        if not is_authorised_or_admin(request, collab_id):
            return HttpResponseForbidden()

        serializer_context = {'request': request,}
        param_serializer = CollabParametersSerializer(data=request.data, context=serializer_context)
        if param_serializer.is_valid():
            param = param_serializer.save(id =request.data['id'] )
            return Response({'uuid': param.id}, status=status.HTTP_201_CREATED)
        else:
            return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, format=None):
        """
        Edit app configuration
        :param collab_id: id of collaboratory
        :type collab_id: int
         :return: :param uuid: app id
                :type uuid: int
        """
        # ctx = request.GET.getlist('ctx')[0]

        if 'id' in request.data :
            app_id = request.data['id']

        else :
            app_id = request.GET.getlist('app_id')
            if len(app_id) == 0 :
                return Response( status=status.HTTP_400_BAD_REQUEST)
            else :
                app_id = app_id[0]

        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised_or_admin(request, collab_id):
            return HttpResponseForbidden()


        if 'collab_id' in request.data :
            collab_id = request.data['collab_id']
            if not is_authorised_or_admin(request, collab_id):
                return HttpResponseForbidden()

        serializer_context = {'request': request,}

        param = CollabParameters.objects.get(id = app_id )
        param_serializer = CollabParametersSerializer(param, data=request.data, context=serializer_context )

        if param_serializer.is_valid():
            param_serializer.save()
            return Response({'uuid': param.id},status=status.HTTP_202_ACCEPTED)
        return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def _reformat_request_data (data):
    """
    Utilitary function to reformat data to a list
    :param data: string of data
    :type data: str
    :returns: data formatted
    :rtype: list
    """
    if type(data) == list :
        data = data

    elif type(data) == dict :
        data = [data]
    else :
        data = []
    return data

class ModelInstances (APIView):
    """
    Model of table model_validation_api_scientificmodelinstance
    """
    def get(self, request, format=None, **kwargs):
        """
        get Instance of model_validation_api_scientificmodelinstance
        :param id: instance id
        :type id: UUID
        :param model_id: model id
        :type model_id: UUID
        :param version: instance version
        :type version: str
        :param parameters: parameters of the version
        :type parameters: string
        :param source: url of the code source
        :type source: url
        :param timestamp: creation date of the instance
        :type timestamp: datetime
        :param model_alias: alias of the model name
        :type model_alias: str
        :param code_format: format of the code
        :type code_format: str
        :param hash: hash
        :type hash: str
        :return: list of instances
        :rtype: dictionnary
        """
        serializer_context = {'request': request,}

        param_id = request.GET.getlist('id')
        param_model_id = request.GET.getlist('model_id')
        param_version = request.GET.getlist('version')
        param_parameters = request.GET.getlist('parameters')
        param_source = request.GET.getlist('source')
        param_timestamp = request.GET.getlist('timestamp')
        param_model_alias = request.GET.getlist('model_alias')
        param_code_format = request.GET.getlist('code_format')
        param_hash = request.GET.getlist('hash')

        if check_list_uuid_validity(param_id) is False :
            return Response("Badly formed uuid in : id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_model_id) is False :
            return Response("Badly formed uuid in : model_id", status=status.HTTP_400_BAD_REQUEST)

        q = ScientificModelInstance.objects.all()

        if len(param_id) > 0 :
            q = q.filter(id__in = param_id )
        if len(param_model_id) > 0 :
            q = q.filter(model_id__in = param_model_id )

        else :
            if  len(param_model_alias) > 0 :
                q = q.prefetch_related().filter(model__alias__in = param_model_alias)
        if len(param_version) > 0 :
            q = q.filter(version__in = param_version )
        if len(param_parameters) > 0 :
            q = q.filter(parameters__in = param_parameters )
        if len(param_source) > 0 :
            q = q.filter(source__in = param_source )
        if len(param_timestamp) > 0 :
            q = q.filter(timestamp__in = param_timestamp )
        if len(param_code_format) > 0 :
            q = q.filter(code_format__in = param_code_format )
        if len(param_hash) > 0 :
            q = q.filter(hash__in = param_hash )

        instances = q

        instance_serializer = ScientificModelInstanceSerializer(data=instances, context=serializer_context, many=True)
        instance_serializer.is_valid()

        return Response({
                'instances': instance_serializer.data,
                })

    def post(self, request, format=None):
        """
        Save model instance in the table
        :param data: instance array
        :type data: object array
        :returns: uuid list of the created objects
        :rtype: uuid list
        """
        serializer_context = {'request': request,}

        DATA = _reformat_request_data(request.data)

        for i in DATA :
            if len(i) == 0 :
                return Response(status=status.HTTP_400_BAD_REQUEST)



        #check if valid + security
        for instance in DATA :
            if not instance['model_id']:
                try:
                    model = ScientificModel.objects.filter(alias=instance['model_alias'])
                    instance['model_id']=model.id
                except:
                    Response(status=status.HTTP_400_BAD_REQUEST)
            serializer = ScientificModelInstanceSerializer(data=instance, context=serializer_context)
            if serializer.is_valid():

                #security
                app_id = ScientificModel.objects.get(id=instance['model_id']).app_id
                collab_id = get_collab_id_from_app_id(app_id)
                if not is_authorised_or_admin(request, collab_id):
                    return HttpResponseForbidden()

                #check if versions are unique
                if not _are_model_instance_version_unique(instance) :
                    return Response("Oh no... The specified version name already exists for this model. Please, give me a new name", status=status.HTTP_400_BAD_REQUEST)
            else :
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        list_id = []
        for instance in DATA :
            serializer = ScientificModelInstanceSerializer(data=instance, context=serializer_context)

            if serializer.is_valid():
                obj = serializer.save(model_id=instance['model_id'])
                list_id.append(obj.id)

        return Response({'uuid':list_id}, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        """
        Update model instance
        :param web_app: true if the request comes from the web application, false if not.
        :type web_app: boolean
        :returns: uuid list of the updated objects
        :rtype: uuid list:
        """

        serializer_context = {'request': request,}

        DATA = _reformat_request_data(request.data)
        for i in DATA :
            if len(i) == 0 :
                return Response(status=status.HTTP_400_BAD_REQUEST)

        #check if valid
        try:
            param_web_app = request.GET.getlist('web_app')[0]
        except:
            param_web_app = False

        for instance in DATA:

            if param_web_app==True:
                original_instance = ScientificModelInstance.objects.get(id=instance.get('id'))
                #check if version is editable - only if you are not super user
                if not is_authorised_or_admin(request,settings.ADMIN_COLLAB_ID):
                    if not _are_model_instance_editable(instance):
                        return Response("This version is no longer editable as there is at least one result associated with it.", status=status.HTTP_400_BAD_REQUEST)


                #check if versions are unique
                if not _are_model_instance_version_unique(instance) :
                    return Response("Oh no... The specified version name already exists for this model. Please, give me a new name", status=status.HTTP_400_BAD_REQUEST)

                model_serializer = ScientificModelInstanceSerializer(original_instance, data=instance, context=serializer_context)
                if  model_serializer.is_valid():
                    model_instance = model_serializer.save()
                    return  Response(status=status.HTTP_202_ACCEPTED)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

            if 'id' in instance:
                try:
                    original_instance = ScientificModelInstance.objects.get(id= instance['id'])
                except:
                    return Response("The given id "+instance['id']+" does not exists. Please give a new id, or a model_id with a version_name, or a model_alias with a version_name. ", status=status.HTTP_400_BAD_REQUEST)
                instance['model_id'] = original_instance.model_id
                serializer = ScientificModelInstanceSerializer(original_instance, data=instance, context=serializer_context)
                if not serializer.is_valid():
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                if 'version' in instance:
                    if 'model_id' in instance:
                        try:
                            original_instance = ScientificModelInstance.objects.get(model_id= instance['model_id'], version=instance['version'])
                        except:
                            return Response("There is no model instance with this version name for this model_id. Please give a new model_id or a new version name. ", status=status.HTTP_400_BAD_REQUEST)
                        instance['id']=original_instance.id
                        serializer = ScientificModelInstanceSerializer(original_instance, data=instance, context=serializer_context)
                        if not serializer.is_valid():
                            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    if 'model_alias' in instance:
                        try:
                            model = ScientificModel.objects.get(alias = instance['model_alias'])
                        except:
                            return Response('There is no model with this alias. Please give a new alias or try with the model_id directly.', status=status.HTTP_400_BAD_REQUEST)
                        instance['model_id'] = model.id
                else:
                    return Response("To edit a model instance, you need to give an id, or a model_id with a version, or a model_alias with a version ", status=status.HTTP_400_BAD_REQUEST)

            #security
            app_id =ScientificModel.objects.get(id=original_instance.model_id).app_id
            collab_id = get_collab_id_from_app_id(app_id)
            if not is_authorised_or_admin(request, collab_id):
                return HttpResponseForbidden()

            #check if version is editable
            if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
                if not _are_model_instance_editable(instance):
                    return Response("This version is no longer editable as there is at least one result associated with it.", status=status.HTTP_400_BAD_REQUEST)

            #check if versions are unique
            if not _are_model_instance_version_unique(instance) :
                return Response("Oh no... The specified version name already exists for this model. Please, give me a new name", status=status.HTTP_400_BAD_REQUEST)

        list_id = []
        #is valid + authorized : save it
        for instance in DATA:
            model_instance = ScientificModelInstance.objects.get(id=instance['id'])
            model_serializer = ScientificModelInstanceSerializer(model_instance, data=instance, context=serializer_context)

            if  model_serializer.is_valid() :
                model_instance = model_serializer.save()
                list_id.append(model_instance.id)

        return Response({'uuid': list_id}, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, format=None):

        if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
            return HttpResponseForbidden()

        list_ids = request.GET.getlist('id')

        elements_to_delete = ScientificModelInstance.objects.filter(id__in=list_ids)
        for model_instance in elements_to_delete:
            model_instance.delete()

        return Response( status=status.HTTP_200_OK)



class ModelInstances_KG(APIView):
    """
    Model instances, taking data from KnowledgeGraph
    """

    def get(self, request, format=None, **kwargs):
        """
        get Instance of model_validation_api_scientificmodelinstance
        :param id: instance id
        :type id: UUID
        :param model_id: model id
        :type model_id: UUID
        :param version: instance version
        :type version: str
        :param model_alias: alias of the model name
        :type model_alias: str
        :return: list of instances
        :rtype: dictionnary
        """
        serializer_context = {'request': request,}

        param_id = request.GET.getlist('id')
        param_model_id = request.GET.getlist('model_id')
        param_model_alias = request.GET.getlist('model_alias')
        param_version = request.GET.getlist('version')

        if check_list_uuid_validity(param_id) is False :
            return Response("Badly formed uuid in : id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_model_id) is False :
            return Response("Badly formed uuid in : model_id", status=status.HTTP_400_BAD_REQUEST)

        method, token = get_authorization_header(request)["Authorization"].split(" ")
        assert method == "Bearer"
        client = NARClient(token,
                           nexus_endpoint=settings.NEXUS_ENDPOINT)

        # instance_id or (model_id, version) or (alias, version)
        instances = []
        if len(param_id) > 0:
            # Get instances by individual uuids
            for instance_id in param_id:
                inst = ModelInstance.from_uuid(instance_id, client)
                if inst is None:
                    inst = MEModel.from_uuid(instance_id, client)
                if inst is not None:
                    instances.append(inst)
            # todo: add project field for linked model project
        else:
            # Get instances belonging to a specific model project
            if len(param_model_id) > 0:
                assert len(param_model_id) == 1  # todo: return error response
                model_project = ModelProject.from_uuid(param_model_id[0], client)
            elif len(param_model_alias) > 0:
                assert len(param_model_alias) == 1  # todo: return error response
                context = {
                    "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
                    "schema": "http://schema.org/"
                }
                filter_query = {
                    "path": "nsg:alias",
                    "op": "in",
                    "value": param_model_alias[0]
                }
                model_project = KGQuery(ModelProject, filter_query, context).resolve(client)
            if model_project:
                instances = [inst.resolve(client) for inst in as_list(model_project.instances)]
                if len(param_version) > 0:
                    instances = [inst for inst in instances if inst.version in param_version]
            else:
                instances = []
            #for inst in instances:
            #    inst.project = model_project

        # todo: check access permissions

        instance_serializer = ScientificModelInstanceKGSerializer(instances, client, many=True)

        return Response({'instances': instance_serializer.data})

    def post(self, request, format=None):
        """
        Save model instance in the table
        :param data: instance array
        :type data: object array
        :returns: uuid list of the created objects
        :rtype: uuid list
        """
        serializer_context = {'request': request,}

        DATA = _reformat_request_data(request.data)

        for instance in DATA :
            if len(instance) == 0:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        method, token = get_authorization_header(request)["Authorization"].split(" ")
        assert method == "Bearer"
        client = NARClient(token,
                           nexus_endpoint=settings.NEXUS_ENDPOINT)

        # check if valid + security
        for instance in DATA :
            if "model_id" in instance:
                model_project = ModelProject.from_uuid(instance["model_id"], client)
                if model_project is None:
                    return Response("Invalid model id provided", status=status.HTTP_404_NOT_FOUND)
            elif "alias" in instance:
                model_project = ModelProject.from_alias(instance["alias"], client)
                if model_project is None:
                    return Response("No such alias", status=status.HTTP_404_NOT_FOUND)
                instance["model_id"] = model_project.uuid
            else:
                return Response("Must provide either model project id or model project alias", status=status.HTTP_400_BAD_REQUEST)

            serializer = ScientificModelInstanceKGSerializer(None, client, data=instance)
            if serializer.is_valid():

                # security
                collab_id = model_project.collab_id
                if not is_authorised_or_admin(request, collab_id):
                    return HttpResponseForbidden()

                # check if versions are unique
                if not _are_model_instance_version_unique_kg(instance, client):
                    return Response("The specified version name already exists for this model. Please provide a new name", status=status.HTTP_400_BAD_REQUEST)
            else :
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        list_id = []
        for instance in DATA:
            serializer = ScientificModelInstanceKGSerializer(None, client, data=instance)
            obj = serializer.save()
            list_id.append(obj.uuid)

        return Response({'uuid': list_id}, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        """
        Update model instance
        :param web_app: true if the request comes from the web application, false if not.
        :type web_app: boolean
        :returns: uuid list of the updated objects
        :rtype: uuid list:
        """

        serializer_context = {'request': request,}

        DATA = _reformat_request_data(request.data)
        for instance in DATA :
            if len(instance) == 0 :
                return Response(status=status.HTTP_400_BAD_REQUEST)

        #check if valid
        try:
            param_web_app = request.GET.getlist('web_app')[0]
        except:
            param_web_app = False

        method, token = get_authorization_header(request)["Authorization"].split(" ")
        assert method == "Bearer"
        client = NARClient(token,
                           nexus_endpoint=settings.NEXUS_ENDPOINT)

        for instance in DATA:
            if param_web_app:
                # need to check if single cell (MEModel) or not
                original_instance = ModelInstance.from_uuid(instance['id'])
                #check if version is editable - only if you are not super user
                # TODO once ValidationResult migrated to KG
                # if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
                #     if not _are_model_instance_editable(instance):
                #         return Response("This version is no longer editable as there is at least one result associated with it.", status=status.HTTP_400_BAD_REQUEST)

                #check if versions are unique
                if not _are_model_instance_version_unique_kg(instance) :
                    return Response("The specified version name already exists for this model. Please provide a new name", status=status.HTTP_400_BAD_REQUEST)

                model_serializer = ScientificModelInstanceKGSerializer(original_instance, client, data=instance)
                if  model_serializer.is_valid():
                    model_instance = model_serializer.save()
                    return  Response(status=status.HTTP_202_ACCEPTED)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

            if 'id' in instance:
                original_instance = ModelInstance.from_uuid(instance['id'], client)
                if original_instance is None:
                    return Response("The given id "+instance['id']+" does not exist. Please give a new id, or a model_id with a version_name, or a model_alias with a version_name. ",
                                    status=status.HTTP_400_BAD_REQUEST)
                model_project = original_instance.project.resolve(client)
                instance['model_id'] = model_project.uuid
                serializer = ScientificModelInstanceKGSerializer(original_instance, client, data=instance)
                if not serializer.is_valid():
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                if 'version' in instance:
                    if 'model_id' in instance and len(instance['model_id']) > 0:
                        model_project = ModelProject.from_uuid(instance['model_id'], client)
                    elif 'model_alias' in instance and len(instance['model_alias']) > 0:
                        model_project = ModelProject.from_alias(instance['model_alias'], client)
                    else:
                        return Response("Must provide either model id or alias",
                                            status=status.HTTP_400_BAD_REQUEST)

                    if model_project is None:
                        return Response("No such model", status=status.HTTP_400_BAD_REQUEST)
                    else:
                        original_instance = None
                        for inst in model_project.instances:
                            inst = inst.resolve(self)
                            if inst.version == instance['version']:
                                original_instance = inst
                                break
                        if original_instance is None:
                            return Response("There is no model instance with this version name for this model_id. Please give a new model_id or a new version name. ",
                                            status=status.HTTP_400_BAD_REQUEST)
                        instance['id'] = original_instance.id
                        serializer = ScientificModelInstanceKGSerializer(original_instance, client, data=instance)
                        if not serializer.is_valid():
                            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response("To edit a model instance, you need to give an id, or a model_id with a version, or a model_alias with a version ",
                                    status=status.HTTP_400_BAD_REQUEST)

            #security
            collab_id = model_project.collab_id
            if not is_authorised_or_admin(request, collab_id):
                return HttpResponseForbidden()

            # #check if version is editable - TODO reimplement once ValidationResult migrated to KG
            # if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
            #     if not _are_model_instance_editable(instance):
            #         return Response("This version is no longer editable as there is at least one result associated with it.", status=status.HTTP_400_BAD_REQUEST)

            # if the version has changed, check if versions are unique
            if "version" in instance and original_instance.version != instance["version"]:
                if not _are_model_instance_version_unique_kg(instance, client):
                    return Response("The specified version name already exists for this model. Please provide a new name", status=status.HTTP_400_BAD_REQUEST)

        list_id = []
        #is valid + authorized : save it
        for instance in DATA:
            model_serializer = ScientificModelInstanceKGSerializer(original_instance, client, data=instance)

            if  model_serializer.is_valid() :
                model_instance = model_serializer.save()
                list_id.append(model_instance.id)

        return Response({'uuid': list_id}, status=status.HTTP_202_ACCEPTED)


class Images (APIView):
    """
    Model images view
    """
    def get(self, request, format=None, **kwargs):
        """
        get Instance of model_validation_api_scientificmodelimage
        :param id: image id
        :type id: uuid
        :param model_id: model id
        :type model_id: uuid
        :param model_alias: alias of the model
        :type model_alias: str
        :param url: source of the image
        :type url: url
        :param caption: description of the image
        :type caption: str
        :return: updated list of model images
        :rtype: dictionnary
        """
        serializer_context = {'request': request,}

        param_id = request.GET.getlist('id')
        param_model_id = request.GET.getlist('model_id')
        param_model_alias = request.GET.getlist('model_alias')
        param_url = request.GET.getlist('url')
        param_caption = request.GET.getlist('caption')

        if check_list_uuid_validity(param_id) is False :
            return Response("Badly formed uuid in : id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_model_id) is False :
            return Response("Badly formed uuid in : model_id", status=status.HTTP_400_BAD_REQUEST)

        q = ScientificModelImage.objects.all()

        if len(param_id) > 0 :
            q = q.filter(id__in = param_id )

        if len(param_model_id) > 0 :
            q = q.filter(model_id__in = param_model_id )

        else :
            if  len(param_model_alias) > 0 :
                q = q.prefetch_related().filter(model__alias__in = param_model_alias)
        if len(param_model_id) > 0 :
            q = q.filter(model_id__in = param_model_id )
        if len(param_url) > 0 :
            q = q.filter(url__in = param_url )
        if len(param_caption) > 0 :
            q = q.filter(caption__in = param_caption )

        images = q

        image_serializer = ScientificModelImageSerializer(data=images, context=serializer_context, many=True)
        image_serializer.is_valid() # needed....

        return Response({
                'images': image_serializer.data,
                })

    def post(self, request, format=None):
        """
        Save image in model_validation_api_scientificmodelimage table
        :param data: list of images to save
        :returns: uuid list of the saved objects
        :rtype: uuid list:
        """
        serializer_context = {'request': request,}
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        DATA = _reformat_request_data(request.data)
        #check if valid + security
        for image in DATA :
            serializer = ScientificModelImageSerializer(data=image, context=serializer_context)
            if serializer.is_valid():
                #security
                try:
                    app_id = ScientificModel.objects.get(id=image['model_id']).app_id
                except:
                    app_id = ScientificModel.objects.get(alias=image['model_alias']).app_id
                collab_id = get_collab_id_from_app_id(app_id)
                if not is_authorised_or_admin(request, collab_id):
                    return HttpResponseForbidden()
            else :
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        list_id = []
        for image in DATA :
            serializer = ScientificModelImageSerializer(data=image, context=serializer_context)

            if serializer.is_valid():
                if image['model_id']:
                    im = serializer.save(model_id=image['model_id'])
                else:
                    if image['model_alias']:
                        model_id = ScientificModel.objects.get(alias=image['model_alias']).id
                        im = serializer.save(model_id=model_id)
                list_id.append(im.id)


        return Response({'uuid':list_id}, status=status.HTTP_201_CREATED)



    def put(self, request, format=None):
        """
        Update image in model_validation_api_scientificmodelimage table
        :param data: list of image objects
        :returns: UUID list of the updated images
        :rtype: UUID list
        """

        serializer_context = {'request': request,}
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        DATA = _reformat_request_data(request.data)
        for i in DATA :
            if len(i) == 0 :
                return Response(status=status.HTTP_400_BAD_REQUEST)

        for image in DATA:
            model_image = ScientificModelImage.objects.get(id=image['id'])

            #security
            app_id = ScientificModel.objects.get(id=model_image.model_id).app_id
            collab_id = get_collab_id_from_app_id(app_id)
            if not is_authorised_or_admin(request, collab_id):
                return HttpResponseForbidden()

            # check if data is ok else return error
            model_serializer = ScientificModelImageSerializer(model_image, data=image, context=serializer_context)
            if not model_serializer.is_valid() :
                Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        list_id = []
        for image in DATA:
            model_image = ScientificModelImage.objects.get(id=image['id'])

            model_serializer = ScientificModelImageSerializer(model_image, data=image, context=serializer_context)
            if model_serializer.is_valid() :
                model_image = model_serializer.save()
                list_id.append(model_image.id)

        return Response({'uuid':list_id}, status=status.HTTP_202_ACCEPTED)


    def delete(self, request, format=None):
        """
        delete model image from table
        :param image_id: image id
        :type image_id: uuid
        :return: int status response of request
        """

        if not is_hbp_member(request):
            return HttpResponseForbidden()

        image_id = request.GET.getlist('id')[0]

        #security
        image = ScientificModelImage.objects.get(id=image_id)
        app_id = ScientificModel.objects.get(id= image.model_id).app_id
        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised_or_admin(request, collab_id):
            return HttpResponseForbidden()

        image = image.delete()
        return Response( status=status.HTTP_200_OK)



class Models(APIView):
    """
    Model of table model_validation_api_scientificmodel
    """
    def get(self, request, format=None, **kwargs):
        """
        get models
        :param id: list of model ids
        :type id: uuid list
        :param web_app: true if the request comes from the web application, false if not.
        :type web_app: boolean
        :param app_id: app id
        :type app_id: int
        :param name: model name
        :type name: str
        :param description: model description
        :type description: str
        :param species: species parameter
        :type species: str
        :param brain_region: brain region parameter
        :type brain_region: str
        :param cell_type: cell type parameter
        :type cell_type: str
        :param author: author(s) of the model
        :type author: str
        :param model_scope: model scope parameter
        :type model_scope: str
        :param abstraction_level: abstraction level parameter
        :type abstraction_level: str
        :param private: privacy of the model
        :type private: boolean
        :param code_format: format used in the code
        :type code_format: str
        :param alias: alias of the model
        :type alias: str
        :param organization: organization parameter
        :type organization: str
        :param owner: owner of the model, for contact
        :type owner: str
        :param project: project parameter
        :type project: str
        :param license: license
        :type license: str
        :returns: list of serialized Models
        :rtype: object list
        """
        serializer_context = {
            'request': request,
        }
        # time_spent=time.time()
        id = request.GET.getlist('id')
        if check_list_uuid_validity(id) is False :
            return Response("Badly formed uuid in : id", status=status.HTTP_400_BAD_REQUEST)


        #if model id not specifiedorresponding to this alias.
        if(len(id) == 0):

            web_app = request.GET.getlist('web_app')


            # if the request comes from the webapp : uses collab_parameters
            if len(web_app) > 0 and web_app[0] == 'True' :


                app_id = request.GET.getlist('app_id')[0]

                collab_id = get_collab_id_from_app_id(app_id)

                collab_params = CollabParameters.objects.get(id = app_id )


                species_filter = collab_params.species.split(",")
                if species_filter==[u'']:
                    species_filter = list(Param_Species.objects.all().values_list('authorized_value', flat=True))+[u'']
                else:
                    species_filter += [u'']

                brain_region_filter = collab_params.brain_region.split(",")
                if brain_region_filter==[u'']:
                    brain_region_filter = list(Param_BrainRegion.objects.all().values_list('authorized_value', flat=True))+[u'']
                else:
                    brain_region_filter += [u'']

                cell_type_filter = collab_params.cell_type.split(",")
                if cell_type_filter==[u'']:
                    cell_type_filter = list(Param_CellType.objects.all().values_list('authorized_value', flat=True))+[u'']
                else:
                    cell_type_filter += [u'']

                model_scope_filter = collab_params.model_scope.split(",")
                if model_scope_filter==[u'']:
                    model_scope_filter = list(Param_ModelScope.objects.all().values_list('authorized_value', flat=True))+[u'']
                else:
                    model_scope_filter += [u'']

                abstraction_level_filter = collab_params.abstraction_level.split(",")
                if abstraction_level_filter==[u'']:
                    abstraction_level_filter = list(Param_AbstractionLevel.objects.all().values_list('authorized_value', flat=True))+[u'']
                else:
                    abstraction_level_filter += [u'']

                organization_filter = collab_params.organization.split(",")
                if organization_filter==[u'']:
                    organization_filter = list(Param_organizations.objects.all().values_list('authorized_value', flat=True)) #+[u'']


                rq1 = ScientificModel.objects.filter(
                        private=1,
                        species__in=species_filter,
                        brain_region__in=brain_region_filter,
                        cell_type__in=cell_type_filter,
                        abstraction_level__in=abstraction_level_filter,
                        model_scope__in=model_scope_filter,
                        organization__in=organization_filter).prefetch_related()

                ##check permissions for Collabs
                collab_ids = list(rq1.prefetch_related().values_list('app__collab_id', flat=True).distinct())
                collab_ids_new = []
                for collab in collab_ids:
                    if is_authorised_or_admin(request, collab):
                        collab_ids_new.append(collab)

                all_ctx_from_collab = CollabParameters.objects.filter(collab_id__in=collab_ids_new).distinct()
                rq1 = rq1.filter(app__in = all_ctx_from_collab.values("id"))


                rq2 = ScientificModel.objects.filter (
                    private=0,
                    species__in=species_filter,
                    brain_region__in=brain_region_filter,
                    cell_type__in=cell_type_filter,
                    abstraction_level__in=abstraction_level_filter,
                    model_scope__in=model_scope_filter,
                    organization__in=organization_filter).prefetch_related()

                if len(rq1) >0:
                    models  = (rq1 | rq2).distinct().order_by('-creation_date')
                else:
                    models = rq2.distinct().order_by('-creation_date')


                ####check for pages###
                try:
                    page = request.GET.getlist('page')[0]
                except:
                    page=0
                pagination_number = 50

                if(page != 0):
                    if page == '1':
                        model_serializer = ScientificModelReadOnlyForHomeSerializer(models[0:pagination_number], context=serializer_context, many=True )
                    else:
                        init = (int(page)-1)*(pagination_number)
                        end = (int(page)-1)*(pagination_number)+pagination_number-1
                        model_serializer = ScientificModelReadOnlyForHomeSerializer(models[init:end], context=serializer_context, many=True )
                else:
                    model_serializer = ScientificModelReadOnlyForHomeSerializer(models, context=serializer_context, many=True )

                return Response({
                'models': model_serializer.data,
                'page':page,
                'total_nb_pages': _get_nb_pages(len(models), pagination_number),
                'total_models':len(models)
                })


            else :
                app_id =request.GET.getlist('app_id')
                name =request.GET.getlist('name')
                description =request.GET.getlist('description')
                species =request.GET.getlist('species')
                brain_region =request.GET.getlist('brain_region')
                cell_type =request.GET.getlist('cell_type')
                author =request.GET.getlist('author')
                model_scope =request.GET.getlist('model_scope')
                abstraction_level =request.GET.getlist('abstraction_level')
                private =request.GET.getlist('private')
                code_format =request.GET.getlist('code_format')
                alias =request.GET.getlist('alias')
                organization = request.GET.getlist('organization')
                owner = request.GET.getlist('owner')
                license_param = request.GET.getlist('license')
                owner = request.GET.getlist('owner')
                project = request.GET.getlist('project')

                q = ScientificModel.objects.all()

                if len(alias) > 0 :
                    q = q.filter(alias__in = alias)
                if len(name) > 0 :
                    q = q.filter(name__in = name)
                if len(description) > 0 :
                    q = q.filter(description__in = description)
                if len(species) > 0 :
                    q = q.filter(species__in = species)
                if len(brain_region) > 0 :
                   q = q.filter(brain_region__in = brain_region)
                if len(cell_type ) > 0 :
                    q = q.filter(cell_type__in = cell_type )
                if len(author) > 0 :
                    q = q.filter(author__in = author)
                if len(model_scope) > 0 :
                    q = q.filter(model_scope__in = model_scope)
                if len(abstraction_level) > 0 :
                    q = q.filter(abstraction_level__in = abstraction_level)
                if len(code_format) > 0 :
                    q = q.filter(code_format__in = code_format)
                if len(app_id) > 0 :
                    q = q.filter(app__in = app_id)
                if len(organization) > 0 :
                    q = q.filter(organization__in = organization)
                if len(owner) > 0 :
                    q = q.filter(owner__in = owner)
                if len(project) > 0 :
                    q = q.filter(project__in = project)
                if len(license_param) > 0 :
                    q = q.filter(license__in = license_param)

                #For each models, check if collab member, if not then just return the publics....
                list_app_id = q.values("app").distinct()
                for app_id in list_app_id :
                    app_id = app_id['app']
                    collab_id = get_collab_id_from_app_id(app_id)
                    #TODO... keep all data and make only one request to HBP
                    if not is_authorised_or_admin(request, collab_id) :
                        q = q.exclude(app=app_id, private=1)


                models = q
                model_serializer = ScientificModelReadOnlySerializer(models, context=serializer_context, many=True )

                return Response({
                'models': model_serializer.data,
                })

        # a model ID has been specified
        else:
            try:
                web_app = request.GET.getlist('web_app')
            except:
                web_app = False
            id =id[0]
            models = ScientificModel.objects.filter(id=id)

            if len(models) > 0 :

                #check if private
                if models.values("private")[0]["private"] == 1 :
                    #if private check if collab member
                    app_id = models.values("app")[0]['app']
                    collab_id = get_collab_id_from_app_id(app_id)

                    if not is_authorised_or_admin(request, collab_id) :
                        return HttpResponse('Unauthorized', status=401)
                        return HttpResponseForbidden()
                if len(web_app) > 0 and web_app[0] == 'True' :
                    model_serializer = ScientificModelFullReadOnlySerializer(models, context=serializer_context, many=True)
                else:
                    model_serializer = ScientificModelReadOnlySerializer(models, context=serializer_context, many=True )

                return Response({
                    'models': model_serializer.data,
                })
            else :
                return HttpResponse('Not found', status=404)
                # return Response({
                #     'models':[],
                # })

    def post(self, request, format=None):
        """
        Save a new model in model_validation_api_scientificmodel table - if the model contains images and a version, it saves it also.
        :param app_id: application id
        :type app_id: int
        :return: uuid of the created object
        :rtype: uuid:
        """
        app_id = request.GET.getlist('app_id')

        if len(app_id) == 0 :
            return Response("You need to specify the app_id argument", status=status.HTTP_400_BAD_REQUEST)
        else :
            app_id = app_id[0]

        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised_or_admin(request, collab_id):
            return HttpResponse('Unauthorized', status=401)
            return HttpResponseForbidden()

        serializer_context = {'request': request,}


        DATA = _reformat_request_data(request.data)
        DATA = DATA[0]

        #make sure organisation is not empty :
        try :
            if DATA['model']["organization"] == "" :
                DATA['model']["organization"] = "<<empty>>"
        except :
            DATA['model']["organization"] = "<<empty>>"


        # check if data is ok else return error
        model_serializer = ScientificModelSerializer(data=DATA['model'], context=serializer_context)
        if model_serializer.is_valid() is not True:
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else :
            check_param = check_param_of_model_json(DATA['model'])
            if check_param is not True :
                return Response(check_param, status=status.HTTP_400_BAD_REQUEST)


        if len(DATA['model_instance']) >  0 :
            list_version_names = []
            for i in DATA['model_instance']:
                list_version_names.append(i["version"])
                model_instance_serializer = ScientificModelInstanceSerializer(data=i, context=serializer_context)
                if model_instance_serializer.is_valid() is not True:
                    return Response(model_instance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            if not len(list_version_names) == len(set(list_version_names)) :
                return Response("You are sending a version name which are not unique", status=status.HTTP_400_BAD_REQUEST)

        if len(DATA['model_image']) >  0 :
            for i in DATA['model_image']:
                model_image_serializer = ScientificModelImageSerializer(data=i, context=serializer_context)
                if model_image_serializer.is_valid()  is not True:
                    return Response(model_image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



        # no error then save all
        model = model_serializer.save(app_id=app_id)

        if len(DATA['model_instance']) >  0 :
            for i in DATA['model_instance'] :
                model_instance_serializer = ScientificModelInstanceSerializer(data=i, context=serializer_context)
                if model_instance_serializer.is_valid():
                    model_instance_serializer.save(model_id=model.id)

        if len(DATA['model_image']) >  0 :
            for i in DATA['model_image']:
                model_image_serializer = ScientificModelImageSerializer(data=i, context=serializer_context)
                if model_image_serializer.is_valid()   :
                    model_image_serializer.save(model_id=model.id)

        return Response({'uuid':model.id}, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        """
        Update model
        :param app_id: application id
        :type app_id: int
        :param id: model id
        :type id: uuid
        :returns: model id of the updated model
        :rtype: uuid:
        """

        ## save only modifications on model. if you want to modify images or instances, do separate put.
        ##get objects
        value = request.data['models'][0]

        app_id = request.GET.getlist('app_id')

        if len(app_id) > 0 :
            value['app_id'] = app_id[0]

        if 'id' in value and value['id'] != '':
            model = ScientificModel.objects.get(id=value['id'])
        else:
            if 'alias' in value and value['alias'] != '':
                try:
                    model = ScientificModel.objects.get(alias=value['alias'])
                except:
                    return Response('There is not model corresponding to this alias. Please give a new alias or use the id of the model', status=status.HTTP_400_BAD_REQUEST )
            else:
                return Response('We cannot update the model. Please give the id or the alias of the model.', status=status.HTTP_400_BAD_REQUEST )
        #security
        app_id = model.app_id
        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised_or_admin(request, collab_id):
            return HttpResponse('Unauthorized', status=401)
            return HttpResponseForbidden()

        app_id = value['app']['id']

        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised_or_admin(request, collab_id):
            return HttpResponseForbidden()


        serializer_context = {'request': request,}


        #make sure organisation is not empty :
        try :
            if value["organization"] == "" :
                value["organization"] = "<<empty>>"
        except :
            value["organization"] = "<<empty>>"

        # check if data is ok else return error
        model_serializer = ScientificModelSerializer(model, data=value, context=serializer_context)
        if model_serializer.is_valid() :
            check_param = check_param_of_model_json(value)
            if check_param is True :
                model = model_serializer.save(app_id=app_id)
            else :
                return Response(check_param, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'uuid':model.id}, status=status.HTTP_202_ACCEPTED)


    def delete(self, request, format=None):
        """
        delete model from table
        :param image_id: image id
        :type image_id: uuid
        :return: int status response of request
        """

        if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
            return HttpResponseForbidden()

        list_ids = request.GET.getlist('id')

        elements_to_delete = ScientificModel.objects.filter(id__in=list_ids)
        for model in elements_to_delete:
            model.delete()

        return Response( status=status.HTTP_200_OK)



class Models_KG(APIView):
    """
    Model projects (like Models, but taking data from KnowledgeGraph)
    """
    def get(self, request, format=None, **kwargs):
        """
        get models
        :param id: list of model ids
        :type id: uuid list
        :param web_app: true if the request comes from the web application, false if not.
        :type web_app: boolean
        :param app_id: app id
        :type app_id: int
        :param name: model name
        :type name: str
        :param description: model description
        :type description: str
        :param species: species parameter
        :type species: str
        :param brain_region: brain region parameter
        :type brain_region: str
        :param cell_type: cell type parameter
        :type cell_type: str
        :param author: author(s) of the model
        :type author: str
        :param model_scope: model scope parameter
        :type model_scope: str
        :param abstraction_level: abstraction level parameter
        :type abstraction_level: str
        :param private: privacy of the model
        :type private: boolean
        :param code_format: format used in the code
        :type code_format: str
        :param alias: alias of the model
        :type alias: str
        :param organization: organization parameter
        :type organization: str
        :param owner: owner of the model, for contact
        :type owner: str
        :param project: project parameter
        :type project: str
        :param license: license
        :type license: str
        :returns: list of serialized Models
        :rtype: object list
        """
        serializer_context = {
            'request': request,
        }
        # time_spent=time.time()
        id = request.GET.getlist('id')
        if check_list_uuid_validity(id) is False :
            return Response("Badly formed uuid in : id", status=status.HTTP_400_BAD_REQUEST)

        auth = get_authorization_header(request).get("Authorization")
        if auth:
            method, token = auth.split(" ")
            logger.debug(token)
        else:
            return Response("No authorization token provided", status=status.HTTP_401_UNAUTHORIZED)

        assert method == "Bearer"
        client = NARClient(token,
                           nexus_endpoint=settings.NEXUS_ENDPOINT)

        #if model id not specifiedorresponding to this alias.
        if(len(id) == 0):

            web_app = request.GET.getlist('web_app')

            ####check for pages###
            page = int(request.GET.get('page', 0))
            pagination_number = 50

            #if the request comes from the webapp : uses collab_parameters
            if len(web_app) > 0 and web_app[0] == 'True':

                app_id = request.GET.getlist('app_id')[0]
                collab_id = get_collab_id_from_app_id(app_id)
                collab_params = CollabParameters.objects.get(id=app_id)

                name_filter = []
                description_filter = []
                species_filter = collab_params.species.split(",") if collab_params.species else []
                brain_region_filter = collab_params.brain_region.split(",") if collab_params.brain_region else []
                cell_type_filter = collab_params.cell_type.split(",") if collab_params.cell_type else []
                author_filter = []
                model_scope_filter = collab_params.model_scope.split(",") if collab_params.model_scope else []
                abstraction_level_filter = collab_params.abstraction_level.split(",") if collab_params.abstraction_level else []
                private_status_filter = []
                code_format_filter = []
                alias_filter = []
                organization_filter = collab_params.organization.split(",") if collab_params.organization else []
                owner_filter = []
                license_param_filter = []
                owner_filter = []
                project_filter = []

            else :
                app_id = request.GET.getlist('app_id')
                name_filter = request.GET.getlist('name')
                description_filter = request.GET.getlist('description')
                species_filter = request.GET.getlist('species')
                brain_region_filter = request.GET.getlist('brain_region')
                cell_type_filter = request.GET.getlist('cell_type')
                author_filter = request.GET.getlist('author')
                model_scope_filter = request.GET.getlist('model_scope')
                abstraction_level_filter = request.GET.getlist('abstraction_level')
                private_status_filter = request.GET.getlist('private')
                code_format_filter = request.GET.getlist('code_format')
                alias_filter = request.GET.getlist('alias')
                organization_filter = request.GET.getlist('organization')
                owner_filter = request.GET.getlist('owner')
                license_param_filter = request.GET.getlist('license')
                owner_filter = request.GET.getlist('owner')
                project_filter = request.GET.getlist('project')

            context = {
                "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
                "schema": "http://schema.org/"
            }
            filter_query = {
                "op": "and",
                "value": []
            }

            if len(alias_filter) > 0 :
                filter_query["value"].append({
                    "path": "nsg:alias",
                    "op": "in",
                    "value": alias_filter
                })
            if len(name_filter) > 0 :
                filter_query["value"].append({
                    "path": "schema:name",
                    "op": "in",
                    "value": name_filter
                })
            if len(description_filter) > 0 :
                filter_query["value"].append({
                    "path": "schema:description",
                    "op": "in",
                    "value": description_filter
                })
            if len(species_filter) > 0 :
                filter_query["value"].append({
                    "path": "nsg:species / rdfs:label",  # todo: map search term to URIs, rather than searching by label
                    "op": "in",
                    "value": species_filter
                })
            if len(brain_region_filter) > 0 :
                filter_query["value"].append({
                    "path": "nsg:brainRegion / rdfs:label",
                    "op": "in",
                    "value": brain_region_filter
                })
            if len(cell_type_filter) > 0 :
                filter_query["value"].append({
                    "path": "nsg:celltype / rdfs:label",
                    "op": "in",
                    "value": cell_type_filter
                })
            if len(author_filter) > 0 :
                filter_query["value"].append({
                    "path": "schema:author / schema:familyName",
                    "op": "in",
                    "value": author_filter
                })
            if len(model_scope_filter) > 0 :
                filter_query["value"].append({
                    "path": "nsg:modelOf / rdfs:label",
                    "op": "in",
                    "value": model_scope_filter  # temporary, to fix
                })
            if len(abstraction_level_filter) > 0 :
                filter_query["value"].append({
                    "path": "nsg:abstractionLevel / rdfs:label",
                    "op": "in",
                    "value": abstraction_level_filter
                })
            # if len(code_format) > 0 :
            #     q = q.filter(code_format__in = code_format)
            # if len(app_id) > 0 :
            #     q = q.filter(app__in = app_id)
            if len(organization_filter) > 0 :
                filter_query["value"].append({
                    "path": "nsg:organization / schema:name",
                    "op": "in",
                    "value": organization_filter
                })
            if len(owner_filter) > 0 :
                filter_query["value"].append({
                    "path": "nsg:owner / schema:familyName",
                    "op": "in",
                    "value": owner_filter
                })
            # if len(project) > 0 :
            #     q = q.filter(project__in = project)
            # if len(license_param) > 0 :
            #     q = q.filter(license__in = license_param)

            if len(filter_query["value"]) > 0:
                models = KGQuery(ModelProject, filter_query, context).resolve(client)
            else:
                models = ModelProject.list(client)

            authorized_collabs = []
            for collab_id in set(model.collab_id for model in as_list(models) if model.private):
                if is_authorised_or_admin(request, collab_id):
                    authorized_collabs.append(collab_id)

            authorized_models = [model for model in as_list(models)
                                    if (not model.private) or (model.collab_id in authorized_collabs)]

            model_serializer = ScientificModelKGSerializer(authorized_models, client, many=True)

            if page != 0:
                init = (page - 1) * pagination_number
                end = init + pagination_number
                model_serializer = ScientificModelKGSerializer(authorized_models[init : end], client, many=True)
            else:
                model_serializer = ScientificModelKGSerializer(authorized_models, client, many=True)

            return Response({
                'models': model_serializer.data,
                'page': page,
                'total_nb_pages': _get_nb_pages(len(models), pagination_number),
                'total_models': len(models)
            })

        # a model ID has been specified
        else:
            try:
                web_app = request.GET.getlist('web_app')
            except:
                web_app = False
            id = id[0]

            model = ModelProject.from_uuid(id, client)
            if model is not None:
                #check if private
                if model.private:
                    #if private check if collab member
                    if not is_authorised_or_admin(request, model.collab_id) :
                        return HttpResponse('Unauthorized', status=401)

                model_serializer = ScientificModelKGSerializer(model, client)

                return Response({
                    'models': [model_serializer.data],
                })
            else :
                return HttpResponse('Not found', status=404)



    def post(self, request, format=None):
        """
        Save a new model in model_validation_api_scientificmodel table - if the model contains images and a version, it saves it also.
        :param app_id: application id
        :type app_id: int
        :return: uuid of the created object
        :rtype: uuid:
        """
        logger.debug("Models_KG POST data " + str(request.data))

        method, token = get_authorization_header(request)["Authorization"].split(" ")
        assert method == "Bearer"
        client = NARClient(token,
                           nexus_endpoint=settings.NEXUS_ENDPOINT)

        app_id = request.GET.getlist('app_id')

        if len(app_id) == 0 :
            return Response("You need to specify the app_id argument", status=status.HTTP_400_BAD_REQUEST)
        else :
            app_id = app_id[0]

        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised_or_admin(request, collab_id):
            return HttpResponse('Unauthorized for collab {}'.format(collab_id), status=401)

        data = _reformat_request_data(request.data)[0]

        # #make sure organisation is not empty :
        # try :
        #     if data['model']["organization"] == "" :
        #         data['model']["organization"] = "<<empty>>"
        # except :
        #     data['model']["organization"] = "<<empty>>"

        if len(data['model_image']) >  0 :
            data['model'].images = data['model_image']

        # check if data is ok else return error
        model_serializer = ScientificModelKGSerializer(None, client, data=data['model'], context={"collab_id": collab_id})
        if not model_serializer.is_valid():
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if len(data['model_instance']) >  0 :
            list_version_names = []
            for inst in data['model_instance']:
                list_version_names.append(inst["version"])
                model_instance_serializer = ScientificModelInstanceKGSerializer(None, client, data=inst)
                if not model_instance_serializer.is_valid():
                    return Response(model_instance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            if not len(list_version_names) == len(set(list_version_names)) :
                return Response("You are sending non-unique version names", status=status.HTTP_400_BAD_REQUEST)

        # no error then save all

        model_instances = []
        if len(data['model_instance']) >  0:
            for inst in data['model_instance']:
                model_instance_serializer = ScientificModelInstanceKGSerializer(None, client, data=inst)
                if model_instance_serializer.is_valid():
                    model_instances.append(
                        model_instance_serializer.save(client)
                    )

        model = model_serializer.save()
        if model_instances:
            model.instances = model_instances
            model.save(client)

        return Response({'uuid': model.uuid}, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        """
        Update model
        :param app_id: application id
        :type app_id: int
        :param id: model id
        :type id: uuid
        :returns: model id of the updated model
        :rtype: uuid:
        """

        method, token = get_authorization_header(request)["Authorization"].split(" ")
        assert method == "Bearer"
        client = NARClient(token,
                           nexus_endpoint=settings.NEXUS_ENDPOINT)

        ## save only modifications on model. if you want to modify images or instances, do separate put.
        # get objects
        model_data = request.data['models'][0]

        if 'id' in model_data and model_data['id'] != '':
            model = ModelProject.from_uuid(model_data['id'], client)
        else:
            if 'alias' in model_data and model_data['alias'] != '':
                # context = {
                #     "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
                #     #"schema": "http://schema.org/"
                # }
                # query = {
                #     "path": "nsg:alias",
                #     "op": "eq",
                #     "model_data": model_data['alias']
                # }
                # model = KGQuery(ModelProject, query, context).resolve(client)
                model = ModelProject.from_alias(model_data['alias'])
                if not model:
                    return Response('There is no model corresponding to this alias. Please give a new alias or use the id of the model', status=status.HTTP_400_BAD_REQUEST )
            else:
                return Response('We cannot update the model. Please give the id or the alias of the model.', status=status.HTTP_400_BAD_REQUEST )

        # security
        if not is_authorised_or_admin(request, model.collab_id):
            return HttpResponse('Unauthorized', status=401)

        # #make sure organisation is not empty :
        # try :
        #     if model_data["organization"] == "" :
        #         model_data["organization"] = "<<empty>>"
        # except :
        #     model_data["organization"] = "<<empty>>"

        # # check if data is ok else return error

        model_serializer = ScientificModelKGSerializer(model, client, data=model_data)
        if model_serializer.is_valid() :
            model = model_serializer.save()
            return Response({'uuid': model.id}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        """
        delete model from table
        :param image_id: image id
        :type image_id: uuid
        :return: int status response of request
        """

        if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
            return HttpResponseForbidden()

        list_ids = request.GET.getlist('id')

        method, token = get_authorization_header(request)["Authorization"].split(" ")
        assert method == "Bearer"
        client = NARClient(token,
                           nexus_endpoint=settings.NEXUS_ENDPOINT)

        elements_to_delete = [
            ModelProject.from_uuid(id, client)
            for id in list_ids
        ]
        for model in elements_to_delete:
            if model.instances:
                for instance in model.instances:
                    instance.delete(client)
            model.delete(client)

        return Response(status=status.HTTP_200_OK)


class ModelAliases_KG(APIView):
    """
    Test validity of model Alias using Knowledge Graph
    """

    def get(self, request, format=None, **kwargs):
        """
        Check if the alias entered is valid (not already used)
        :param alias: model alias
        :type alias: str
        :param model_id: model id
        :type model_id: int
        :return: bool -- is_valid
        """

        serializer_context = {
            'request': request,
        }
        alias = request.GET.get('alias')
        if alias is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        method, token = get_authorization_header(request)["Authorization"].split(" ")
        assert method == "Bearer"
        client = NARClient(token,
                           nexus_endpoint=settings.NEXUS_ENDPOINT)

        # if a model_id is provided, first check if the requested alias matches that
        # of the model
        is_valid = False
        model_id = request.GET.get('model_id')
        if model_id:
            model = ModelProject.from_uuid(model_id, client)
            if model:
                is_valid = (model.alias == alias)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        # if no model_id provided, or the alias doesn't match the model
        # check if the alias exists
        if not is_valid:
            filter = {"path": "nsg:alias", "op": "eq", "value": alias}
            context = {'nsg': 'https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/'}
            models = KGQuery(ModelProject, filter, context).resolve(client)
            is_valid = (models is None)
        return Response({'is_valid': is_valid})


class ModelAliases(APIView):
    """
    Test validity of model Alias
    """

    def get(self, request, format=None, **kwargs):
        """
        Check if the alias entered is valid (not already used)
        :param alias: model alias
        :type alias: str
        :param model_id: model id
        :type model_id: int
        :return: bool -- is_valid
        """

        serializer_context = {
            'request': request,
        }
        alias = request.GET.getlist('alias')
        if len(alias) == 0 :
            return Response(status=status.HTTP_400_BAD_REQUEST)

        all_alias_in_model = ScientificModel.objects.filter().values_list('alias', flat=True)
        if alias[0] in all_alias_in_model:
            is_valid = False
        else:
            is_valid = True

        try:
            model_id = request.GET.getlist('model_id')
            old_alias = ScientificModel.objects.filter(id = model_id[0]).values_list('alias', flat=True)
            if alias[0] == old_alias[0]:
                is_valid = True
        except:
            pass
        return Response({ 'is_valid':is_valid})


class TestAliases(APIView):
    """
    Test validity of test aliases
    """
    def get(self, request, format=None, **kwargs):
        """
        :param alias: str
        :type alias: str
        :param test_id: test id
        :type test_id: int
        :return: bool -- is_valid
        """
        serializer_context = {
            'request': request,
        }
        alias = request.GET.getlist('alias')

        if len(alias) == 0 :
            return Response(status=status.HTTP_400_BAD_REQUEST)


        all_alias_in_test = ValidationTestDefinition.objects.filter().values_list('alias', flat=True)
        if alias[0] in all_alias_in_test:
            is_valid= False
        else:
            is_valid = True

        try:
            test_id = request.GET.getlist('test_id')
            old_alias = ValidationTestDefinition.objects.filter(id = test_id[0]).values_list('alias', flat=True)
            if alias[0] == old_alias[0]:
                is_valid = True
        except:
            pass
        return Response({ 'is_valid':is_valid})


class TestInstances(APIView):
    """
    Test instances
    """
    def get(self, request, format=None, **kwargs):
        """
        :param id: test instance id
        :type id: uuid
        :param repository: test instance repository
        :type repository: str
        :param version: test instance name
        :type version: str
        :param path: test instance path
        :type path: url
        :param timestamp: creation date of the instance
        :type timestamp: datetime
        :param test_definition_id: test id
        :type test_definition_id: uuid
        :param test_alias: test alias
        :type test_alias: str
        :returns: test_codes: list of test instances
        :rtype: object list
        """
        serializer_context = {'request': request,}

        param_id = request.GET.getlist('id')
        param_repository = request.GET.getlist('repository')
        param_version = request.GET.getlist('version')
        param_path = request.GET.getlist('path')
        param_timestamp = request.GET.getlist('timestamp')
        param_test_definition_id = request.GET.getlist('test_definition_id')
        param_test_alias = request.GET.getlist('test_alias')
        if check_list_uuid_validity(param_id) is False :
            return Response("Badly formed uuid in : id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_test_definition_id) is False :
            return Response("Badly formed uuid in : test_definition_id", status=status.HTTP_400_BAD_REQUEST)

        q = ValidationTestCode.objects.all().prefetch_related()
        if len(param_id) > 0 :
            q = q.filter(id__in = param_id)
        if len(param_test_definition_id) > 0 :
            q = q.filter(test_definition_id__in = param_test_definition_id)
        if len(param_test_alias) > 0 :
            q = q.filter(test_definition__alias__in = param_test_alias)
        if len(param_repository) > 0 :
            q = q.filter(repository__in = param_repository)
        if len(param_version) > 0 :
            q = q.filter(version__in = param_version)
        if len(param_path) > 0 :
            q = q.filter(path__in = param_path)
        if len(param_timestamp) > 0 :
            q = q.filter(timestamp__in = param_timestamp)


        # nb_id = str(len(request.GET.getlist('id')))
        # nb_td_id = str(len(request.GET.getlist('test_definition_id')))

        # if nb_id == '0' and nb_td_id == '0':
        #     tests = ValidationTestCode.objects.all()
        # else:
        #     for key, value in self.request.GET.items():
        #         if key == 'id':
        #             tests = ValidationTestCode.objects.filter(id = value)
        #         if key == 'test_definition_id':
        #             tests = ValidationTestCode.objects.filter(test_definition_id = value)

        test_codes = q.order_by('timestamp')
        test_code_serializer = ValidationTestCodeSerializer(test_codes, context=serializer_context, many=True)
        return Response({
            'test_codes': test_code_serializer.data,
        })


    def post(self, request, format=None):
        """
        :param data: test instance object list
        :returns: UUID list of saved objects
        :rtype: uuid list:
        """

        serializer_context = {'request': request,}

        if not is_hbp_member(request):
            return HttpResponseForbidden()


        DATA = _reformat_request_data(request.data)


        for test_code in DATA :
            if 'test_alias' in test_code:
                test = ValidationTestDefinition.objects.get(alias = test_code["test_alias"])
                test_code['test_definition_id'] = test.id
            if 'test_definition_id' in test_code:
                try:
                    test = ValidationTestDefinition.objects.get(id = test_code["test_definition_id"])
                except:
                    return('There is no test matching this test_definition_id.')
            serializer = ValidationTestCodeSerializer(data=test_code, context=serializer_context)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            #check if versions are unique
            if not _are_test_code_version_unique(test_code) :
                return Response("Oh no... The specified version name already exists for this test. Please, give me a new name", status=status.HTTP_400_BAD_REQUEST)

        list_id = []
        for test_code in DATA :

            serializer = ValidationTestCodeSerializer(data=test_code, context=serializer_context)
            if serializer.is_valid():
                saved_test_code = serializer.save(test_definition_id=test_code['test_definition_id'])
                list_id.append(saved_test_code.id)
        return Response({'uuid':list_id}, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        """
        :param data: test instance
        :type data: object
        :returns: uuid list of the updated objects
        :rtype: uuid list
        """

        serializer_context = {'request': request,}

        if not is_hbp_member(request):
            return HttpResponseForbidden()

        DATA = _reformat_request_data(request.data)
        for i in DATA :
            if len(i) == 0 :
                return Response(status=status.HTTP_400_BAD_REQUEST)

        ##check if request is valid
        for test_code in DATA:
            ##get the test code
            if 'id' in test_code:
                try:
                    original_test_code = ValidationTestCode.objects.get(id= test_code['id'])
                except:
                    return Response("The given id "+test_code['id']+" does not exists. Please give a new id, or a test_definition_id with a version, or a test_definition_alias with a version. ", status=status.HTTP_400_BAD_REQUEST)
                test_code['test_definition_id'] = original_test_code.test_definition_id
                serializer = ValidationTestCodeSerializer(original_test_code, data=test_code, context=serializer_context)
                if not serializer.is_valid():
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                if 'version' in test_code:
                    if 'test_alias' in test_code:
                        try:
                            test_definition = ValidationTestDefinition.objects.get(alias = test_code['test_alias'])
                        except:
                            return Response('There is no test with this alias. Please give a new alias or try with the test_definition_id directly.', status=status.HTTP_400_BAD_REQUEST)
                        test_code['test_definition_id'] = test_definition.id
                    if 'test_definition_id' in test_code:
                        try:
                            original_test_code = ValidationTestCode.objects.get(test_definition_id= test_code['test_definition_id'], version=test_code['version'])
                        except:
                            return Response("There is no test instance with this version name for this test_definition_id. Please give a new test_definition_id or a new version name. ", status=status.HTTP_400_BAD_REQUEST)
                        test_code['id']=original_test_code.id
                        serializer = ValidationTestCodeSerializer(original_test_code, data=test_code, context=serializer_context)
                        if not serializer.is_valid():
                            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response("To edit a test instance, you need to give an id, or a test_definition_id with a version, or a test_definition_alias with a version ", status=status.HTTP_400_BAD_REQUEST)

            #check if version is editable
            if not is_authorised_or_admin(request,settings.ADMIN_COLLAB_ID):
                if not _are_test_code_editable(test_code):
                    return Response("This version is no longer editable as there is at least one result associated with it", status=status.HTTP_400_BAD_REQUEST)

            #check if versions are unique
            if not _are_test_code_version_unique(test_code) :
                return Response("Oh no... The specified version name already exists for this test. Please, give me a new name", status=status.HTTP_400_BAD_REQUEST)

        ## check is ok so create the serializer and save
        list_updated = []
        for test_code in DATA:
            original_test_code = ValidationTestCode.objects.get(id= test_code['id'])
            serializer = ValidationTestCodeSerializer(original_test_code, data=test_code, context=serializer_context)

            if serializer.is_valid() :
               serializer.save()
               list_updated.append(serializer.data)

        return Response({'uuid':list_updated}, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, format=None):

        if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
            return HttpResponseForbidden()

        list_ids = request.GET.getlist('id')

        elements_to_delete = ValidationTestCode.objects.filter(id__in=list_ids)
        for test_code in elements_to_delete:
            test_code.delete()

        return Response( status=status.HTTP_200_OK)

    def get_serializer_class(self): #############not used???? TO delete?
        #  if self.request.method in ('GET', )
        #      return ValidationTestDefinitionFullSerializer
         return ValidationTestCodeSerializer



class Tests(APIView):
    """
    Class tests
    """
    def get(self, request, format=None, **kwargs):
        """
        Get the tests from the database
        :param id: test id
        :type id: uuid
        :param name: test name
        :type name: str
        :param species: species parameter
        :type species: str
        :param brain_region: brain_region parameter
        :type brain_region: str
        :param cell_type: cell type parameter
        :type cell_type: str
        :param age: age parameter
        :type age: str
        :param data_location: location of the data
        :type data_location: str
        :param data_type: type of data
        :type data_type: str
        :param data_modality: data modality parameter
        :type data_modality: str
        :param test_type: test type parameter
        :type test_type: str
        :param protocol: protocol of the test
        :type protocol: str
        :param author: author(s)
        :type author: str
        :param publication: plublication related to the test
        :type publication: str
        :param score_type: score type
        :type score_type: str
        :param alias: test name alias
        :type alias: str
        :param web_app: true if the request comes from the web application, false if not.
        :type web_app: boolean

        :returns: list of the requested Tests
        :rtype: json
        """
        serializer_context = {'request': request,}

        param_id = request.GET.getlist('id')
        param_name = request.GET.getlist('name')
        param_species = request.GET.getlist('species')
        param_brain_region = request.GET.getlist('brain_region')
        param_cell_type = request.GET.getlist('cell_type')
        param_age = request.GET.getlist('age')
        param_data_location = request.GET.getlist('data_location')
        param_data_type = request.GET.getlist('data_type')
        param_data_modality = request.GET.getlist('data_modality')
        param_test_type = request.GET.getlist('test_type')
        param_protocol = request.GET.getlist('protocol')
        param_author = request.GET.getlist('author')
        param_publication = request.GET.getlist('publication')
        param_score_type = request.GET.getlist('score_type')
        param_status = request.GET.getlist('status')
        param_alias = request.GET.getlist('alias')
        param_web_app = request.GET.getlist('web_app')
        param_app_id = request.GET.getlist('app_id')

        if check_list_uuid_validity(param_id) is False :
            return Response("Badly formed uuid in : id", status=status.HTTP_400_BAD_REQUEST)

        # app_id = request.query_params['app_id']
        # collab_id = get_collab_id_from_app_id(app_id)

        if len(param_web_app) > 0 and param_web_app[0] == 'True' :

            if(len(param_id) == 0):

                # param_app_id = request.query_params['app_id']
                param_app_id = param_app_id[0]
                collab_params = CollabParameters.objects.get(id = param_app_id )

                 #if one of the collab_param is empty, don't filter on it.
                species_filter = collab_params.species.split(",")
                if species_filter==[u'']:
                    species_filter = list(Param_Species.objects.all().values_list('authorized_value', flat=True))+[u'']
                else:
                    species_filter += [u'']

                brain_region_filter = collab_params.brain_region.split(",")
                if brain_region_filter==[u'']:
                    brain_region_filter = list(Param_BrainRegion.objects.all().values_list('authorized_value', flat=True))+[u'']
                else:
                    brain_region_filter += [u'']

                cell_type_filter = collab_params.cell_type.split(",")
                if cell_type_filter==[u'']:
                    cell_type_filter = list(Param_CellType.objects.all().values_list('authorized_value', flat=True))+[u'']
                else:
                    cell_type_filter += [u'']

                test_type_filter = collab_params.test_type.split(",")
                if test_type_filter==[u'']:
                    test_type_filter = list(Param_TestType.objects.all().values_list('authorized_value', flat=True))+[u'']
                else:
                    test_type_filter += [u'']

                data_modality_filter = collab_params.data_modalities.split(",")
                if data_modality_filter==[u'']:
                    data_modality_filter = list(Param_DataModalities.objects.all().values_list('authorized_value', flat=True))+[u'']
                else:
                    data_modality_filter += [u'']

                tests= ValidationTestDefinition.objects.filter (
                    species__in=species_filter,
                    brain_region__in=brain_region_filter,
                    cell_type__in=cell_type_filter,
                    data_modality__in=data_modality_filter,
                    test_type__in=test_type_filter).prefetch_related().distinct()

                tests = tests.order_by('-creation_date')

                test_serializer = ValidationTestDefinitionSerializer(tests, context=serializer_context, many=True)


            else:
                tests = ValidationTestDefinition.objects.filter(id__in = param_id)
                # TODO serializer : ValidationTestDefinitionFull
                test_serializer = ValidationTestDefinitionSerializer(tests, context=serializer_context, many=True)



        else :
            if (len(request.GET.getlist('id')) == 0):
                q = ValidationTestDefinition.objects.all()

                if len(param_alias) > 0 :
                    q = q.filter(alias__in = param_alias)
                # if len(param_app_id) > 0 :
                #     q = q.filter(app_id__in = param_app_id)
                if len(param_name) > 0 :
                    q = q.filter(name__in = param_name)
                if len(param_species) > 0 :
                    q = q.filter(species__in = param_species)
                if len(param_brain_region) > 0 :
                    q = q.filter(brain_region__in = param_brain_region)
                if len(param_cell_type) > 0 :
                    q = q.filter(cell_type__in = param_cell_type)
                if len(param_age) > 0 :
                    q = q.filter(age__in = param_age)
                if len(param_data_location) > 0 :
                    q = q.filter(data_location__in = param_data_location)
                if len(param_data_type) > 0 :
                    q = q.filter(data_type__in = param_data_type)
                if len(param_data_modality) > 0 :
                    q = q.filter(data_modality__in = param_data_modality)
                if len(param_test_type) > 0 :
                    q = q.filter(test_type__in = param_test_type)
                if len(param_protocol) > 0 :
                    q = q.filter(protocol__in = param_protocol)
                if len(param_author) > 0 :
                    q = q.filter(author__in = param_author)
                if len(param_publication) > 0 :
                    q = q.filter(publication__in = param_publication)
                if len(param_score_type) > 0 :
                    q = q.filter(score_type__in = param_score_type)
                if len(param_status) > 0 :
                    q = q.filter(status__in = param_status)

                tests = q.order_by('-creation_date')
                #serializer : ValidationTestDefinition
                test_serializer = ValidationTestDefinitionFullSerializer(tests, context=serializer_context, many=True)



            else :
                tests = ValidationTestDefinition.objects.filter(id__in = param_id)
                # TODO serializer : ValidationTestDefinitionFull
                # test_serializer = ValidationTestDefinitionSerializer(tests, context=serializer_context, many=True)
                test_serializer = ValidationTestDefinitionFullSerializer(tests, context=serializer_context, many=True)


        return Response({
            'tests': test_serializer.data,
        })


    def post(self, request, format=None):
        """
        Save the tests in the database
        :param data: test object
        :returns:  list of test id
        :rtype: uuid list:
        """
        # ctx = request.GET.getlist('ctx')[0]
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        # app_id = request.GET.getlist('app_id')[0]
        # collab_id = get_collab_id_from_app_id(app_id)
        # if not is_authorised_or_admin(request, collab_id):
        #     return HttpResponseForbidden()

        serializer_context = {'request': request,}

        DATA = _reformat_request_data(request.data)

        for i in DATA :
            if len(i) == 0 :
                return Response( "You gave an empty dictionary",status=status.HTTP_400_BAD_REQUEST)

        if len(DATA) > 1 :
            return Response( "Posting more than 1 test is not supported yet",status=status.HTTP_400_BAD_REQUEST)

        else :
            DATA = DATA[0]

        test_serializer = ValidationTestDefinitionSerializer(data=DATA['test_data'], context=serializer_context)


        if test_serializer.is_valid():
            if 'code_data' in DATA:
                code_serializer = ValidationTestCodeSerializer(data=DATA['code_data'], context=serializer_context)
                if code_serializer.is_valid():
                    check_param = check_param_of_test_json(DATA['test_data'])
                    if check_param is not True :
                        return Response(check_param, status=status.HTTP_400_BAD_REQUEST)
                else :
                    return Response(code_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            test = test_serializer.save()

            if 'code_data' in DATA:
                code_serializer.save(test_definition_id=test.id)
            return Response({'uuid':test.id}, status=status.HTTP_201_CREATED)

        else :
            return Response(test_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, format=None):
        """
        Update a test in the database
        :param data: test obeject
        :returns: test id
        :rtype: uuid
        """
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        # app_id = request.GET.getlist('app_id')[0]
        # collab_id = get_collab_id_from_app_id(app_id)
        # if not is_authorised_or_admin(request, collab_id):
        #     return HttpResponseForbidden()

        value = request.data
        test = ValidationTestDefinition.objects.get(id=value['id'])
        serializer_context = {'request': request,}

        # check if data is ok else return error
        test_serializer = ValidationTestDefinitionSerializer(test, data=value, context=serializer_context)
        if test_serializer.is_valid() :
            check_param = check_param_of_test_json(value)
            if check_param is not True :
                return Response(check_param, status=status.HTTP_400_BAD_REQUEST)
            test = test_serializer.save()
        else:
            return Response(test_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'uuid':test.id}, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, format=None):

        if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
            return HttpResponseForbidden()

        list_ids = request.GET.getlist('id')

        elements_to_delete = ValidationTestDefinition.objects.filter(id__in=list_ids)
        for test in elements_to_delete:
            test.delete()

        return Response( status=status.HTTP_200_OK)


class TestTicketRest(APIView):
    """
    Test ticket Class
    """
    def get(self, request, format=None, **kwargs):
        """
        Get the tickets for a particular test
        :param test_id: test id
        :type test_id: uuid
        :returns: tickets objects related to the test
        :rtype: tickets objects
        """
        serializer_context = {'request': request,}
        # nb_test_id = request.query_params['test_id']
        nb_test_id = request.GET.getlist('test_id')

        if len(nb_test_id) == 0 :
            return Response(status=status.HTTP_400_BAD_REQUEST)

        tickets = Tickets.objects.filter(test_id__in = nb_test_id)
        for ticket in tickets:
            ticket.comments = Comments.objects.filter(Ticket_id = ticket.id)
        ticket_serializer = TicketReadOnlySerializer(tickets, context=serializer_context, many=True)

        return Response({
            'tickets': ticket_serializer.data,
            'user_connected':str(request.user)###should not be there. TO CHANGE
        })

    def post(self, request, format=None):
        """
        Save a ticket
        :param data: ticket object
        :type data: json object
        :returns: the created ticket
        :rtype: json object
        """
        serializer_context = {'request': request,}

        if not is_hbp_member(request):
            return HttpResponseForbidden()

        request.data['author'] = str(request.user)
        param_serializer = TicketSerializer(data=request.data, context=serializer_context)
        if param_serializer.is_valid():
            param = param_serializer.save(test_id=request.data['test_id'])
        else:
            return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        new_ticket = Tickets.objects.filter(id=param.id)
        new_ticket_serializer = TicketReadOnlySerializer(new_ticket, context=serializer_context, many=True)

        return Response({'uuid':param.id, 'new_ticket':new_ticket_serializer.data}, status=status.HTTP_201_CREATED) ##uuid is contained inside new_ticket ## TO CHANGE

    def put(self, request, format=None):
        """
        Update the ticket
        :param data: ticket object
         :type data: json object
        :returns: the updated ticket id
        :rtype: uuid
        """
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        serializer_context = {'request': request,}
        ticket_id = request.data['id']
        ticket = Tickets.objects.get(id=ticket_id)
        param_serializer = TicketSerializer(ticket, data=request.data, context=serializer_context )

        if param_serializer.is_valid():
            param_serializer.save()
            return Response({'uuid':ticket.id}, status=status.HTTP_202_ACCEPTED)
        return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestCommentRest(APIView):
    """
    Test comment class
    """
    def get(self, request, format=None, **kwargs):
        """
        Get one or several comment(s) of one or a list of ticket(s)
        :param ticket_id: Ticket id list
        :type ticket_id: uuid list
        :param id: comment id list
        :type id: uuid list
        :returns: comment list
        :rtype: object list
        """
        serializer_context = {'request': request,}
        ticket_id = request.GET.getlist('Ticket_id')
        param_id = request.GET.getlist('id')


        if len(ticket_id)==0 and len(param_id) == 0 :
            return Response(status=status.HTTP_400_BAD_REQUEST)

        comments = Comments.objects.all()
        if len(param_id) >0 :
            comments = Comments.objects.filter(id__in = param_id)

        if len(ticket_id) > 0 :
            comments = Comments.objects.filter(Ticket_id__in = ticket_id)

        comments_serializer = CommentSerializer(comments, context=serializer_context, many=True)

        return Response({
            'comments': comments_serializer.data,
        })

    def post(self, request, format=None):
        """
        Save a comment
        :param data: comment object
        :returns: comment created
        :rtype: comment object
        """
        serializer_context = {'request': request,}

        if not is_hbp_member(request):
            return HttpResponseForbidden()


        request.data['author'] = str(request.user)
        param_serializer = CommentSerializer(data=request.data, context=serializer_context)
        if param_serializer.is_valid():
            param = param_serializer.save(Ticket_id=request.data['Ticket_id'])
        else:
            return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        new_comment = Comments.objects.filter(id=param.id)
        new_comment_serializer = CommentSerializer (new_comment, context=serializer_context, many=True)

        return Response({'uuid':param.id, 'new_comment': new_comment_serializer.data },status=status.HTTP_201_CREATED) ##id should be inside new_comment ##TO CHANGE

    def put(self, request, format=None):
        """
        Update a comment
        :param data: comment object
        :returns: comment id
        :rtype: uuid
        """
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        serializer_context = {'request': request,}
        comment_id = request.data['id']
        comment = Comments.objects.get(id=comment_id)
        param_serializer = CommentSerializer(comment, data=request.data, context=serializer_context )

        if param_serializer.is_valid():
            param_serializer.save()
            return Response({'uuid':comment_id}, status=status.HTTP_202_ACCEPTED)
        return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(login_required(login_url='/login/hbp/'), name='dispatch' )
class ModelCatalogView(View):
    """
    Class to get template of model catalog
    """
    template_name = "model_catalog/model_catalog.html"
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {})





class IsCollabMemberOrAdminRest (APIView):
    """
    Class to check if user is a valid collab member
    """
    def get(self, request, format=None, **kwargs):
        """
        :param app_id: id of the application
        :type app_id: int
        :return: bool: is_member
        """
        app_id = request.GET.getlist('app_id')
        try:
            collab_id = request.GET.getlist('collab_id')[0]
        except:
            collab_id = request.GET.getlist('collab_id')


        if len(collab_id) == 0:
            if len(app_id) == 0 :
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else :
                app_id = app_id[0]

            collab_id = get_collab_id_from_app_id(app_id)

        is_member = is_authorised_or_admin(request, str(collab_id))
        return Response({
            'is_member':  is_member,
        })

class IsCollabMemberRest (APIView):
    """
    Class to check if user is a valid collab member
    """
    def get(self, request, format=None, **kwargs):
        """
        :param app_id: id of the application
        :type app_id: int
        :return: bool: is_member
        """
        app_id = request.GET.getlist('app_id')
        collab_id = request.GET.getlist('collab_id')

        if len(collab_id) == 0:
            if len(app_id) == 0 :
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else :
                app_id = app_id[0]

            collab_id = get_collab_id_from_app_id(app_id)
        else:
            if len(collab_id) >1:
                res_is_member = []
                res_authorized_collabs = []

                for ids in collab_id:
                    is_member = is_authorised(request, str(ids))

                    if is_member == True:
                        res_authorized_collabs.append(ids)
                    res_is_member.append({"collab_id":ids,"is_member":is_member})

                return Response({
                    'is_member':  res_is_member,
                    'is_authorized': res_authorized_collabs
                })
            else:
                collab_id = collab_id[0]

        res_authorized_collabs = []
        is_member = is_authorised(request, str(collab_id))
        if is_member:
            res_authorized_collabs.append(collab_id)

        return Response({
                'is_member':  is_member,
                'is_authorized': res_authorized_collabs
            })


class IsSuperUserRest (APIView):
    """
    Class to check if user is an admin
    """
    def get(self, request, format=None, **kwargs):
        """
        :param app_id: id of the application
        :type app_id: int
        :return: bool: is_member
        """

        is_superuser = is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID)
        return Response({
            'is_superuser':  is_superuser,
        })

"""
Model of table model_validation_api_validationtestresult
"""
class Results (APIView):

    '''Test Result Class'''

    def get(self, request, format=None, **kwargs):
        """
        get Instance of model_validation_api_validationtestresult
        :param id: result id
        :type id: uuid
        :param results_storage:
        :type results_storage: str
        :param score: core of the result
        :type score: int
        :param passed: true if the result passed, false else.
        :type passed: boolean
        :param timestamp: creation date of the result
        :type timestamp: datetime
        :param platform: str
        :type platform: str
        :param project: str
        :type project: str
        :param model_version_id: id of the model instance
        :type model_version_id: uuid
        :param test_code_id: id of the test instance
        :type test_code_id: uuid
        :param normalized_score: normalized score
        :type normalized_score: int
        :param model_id: model id
        :type model_id: uuid
        :param test_id: test id
        :type test_id: uuid
        :param model_alias: model name alias
        :type model_alias: str
        :param test_alias: test name alias
        :type test_alias: str
        :param score_type: type of score
        :type score_type: str
        :param order: order to get the results (test_code, model_instance, score_type)
        :type order: str
        :param detailed_view: to say results are for the detail view
        :type detailed_view: boolean
        :returns: organized dictionnary in function of the order param
        :rtype: dictionnary
        """
        param_id = request.GET.getlist('id')
        param_results_storage = request.GET.getlist('results_storage')
        param_score = request.GET.getlist('score')
        param_passed = request.GET.getlist('passed')
        param_timestamp = request.GET.getlist('timestamp')
        param_platform = request.GET.getlist('platform')
        param_project = request.GET.getlist('project')
        param_model_version_id = request.GET.getlist('model_version_id')
        param_test_code_id = request.GET.getlist('test_code_id')
        param_normalized_score = request.GET.getlist('normalized_score')

        param_model_id = request.GET.getlist('model_id')
        param_test_id = request.GET.getlist('test_id')

        param_model_alias = request.GET.getlist('model_alias')
        param_test_alias = request.GET.getlist('test_alias')
        param_test_score_type = request.GET.getlist('score_type')
        param_order = request.GET.getlist('order')

        param_detailed_view = request.GET.getlist('detailed_view')

        if len(param_detailed_view) > 0 :
            detailed_view =  param_detailed_view[0]
        else :
            detailed_view = False


        if len(param_order) > 0 and (param_order[0] == 'test' or param_order[0] == 'model' or param_order[0] == '' or param_order[0] == 'model_instance' or param_order[0] == 'test_code' or param_order[0] == 'score_type') :
            param_order = param_order[0]

        else :
            return Response("You need to give 'order' argument. Here are the options : 'test', 'model', 'model_instance', 'test_code', 'score_type', '' ", status=status.HTTP_400_BAD_REQUEST)

        if check_list_uuid_validity(param_id) is False :
            return Response("Badly formed uuid in : id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_model_version_id) is False :
            return Response("Badly formed uuid in : model_version_id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_test_code_id) is False :
            return Response("Badly formed uuid in : test_code_id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_model_id) is False :
            return Response("Badly formed uuid in : model_id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_test_id) is False :
            return Response("Badly formed uuid in : test_id", status=status.HTTP_400_BAD_REQUEST)



        serializer_context = {'request': request,}

        #if ID result
        if (len(param_id) == 0):

            #make the first sorting using the params
            q = ValidationTestResult.objects.all()
            if len(param_results_storage) > 0 :
                q = q.filter(results_storage__in = param_results_storage )
            if len(param_score) > 0 :
                q = q.filter(score__in = param_score)
            if len(param_passed) > 0 :
                q = q.filter(passed__in = param_passed)
            if len(param_timestamp) > 0 :
                q = q.filter(timestamp__in = param_timestamp)
            if len(param_platform) > 0 :
                q = q.filter(platform__in = param_platform)
            if len(param_project) > 0 :
                q = q.filter(project__in = param_project)
            if len(param_model_version_id) > 0 :
                q = q.filter(model_version_id__in = param_model_version_id)
            if len(param_test_code_id) > 0 :
                q = q.filter(test_code_id__in = param_test_code_id)
            if len(param_normalized_score) > 0 :
                q = q.filter(normalized_score__in = param_normalized_score)

            #add filter to order correctly the data in time depending on the param_order
            if  len(param_order)>0:
                if param_order == "test_code":
                    q = q.prefetch_related().order_by('model_version__timestamp','timestamp')
                if param_order == "model_instance":
                    q= q.prefetch_related().order_by('test_code__timestamp', 'timestamp')
                if param_order == "score_type": #if order=score_type, it has to be ordered by test_code also
                    q = q.prefetch_related().order_by('model_version__timestamp','timestamp')
            results = q
            #add filter using param_test_id >> filter by tests
            if len(param_test_code_id) == 0 :
                if (len(param_test_id) > 0 or len(param_test_alias) > 0 ) :
                    if len(param_test_id) == 0 :
                        param_test_id = ValidationTestDefinition.objects.filter(alias__in=param_test_alias).values_list('id', flat=True)
                    testcodes = ValidationTestCode.objects.filter(test_definition_id__in = param_test_id )
                    results = results.filter(test_code_id__in = testcodes.values("id"))

            #add filter using param_model_id >> filter by models
            if len(param_model_version_id) == 0 :
                if len(param_model_id) > 0 or len(param_model_alias) > 0 :
                    if len(param_model_id) == 0 :
                        param_model_id = ScientificModel.objects.filter(alias__in=param_model_alias).values_list('id', flat=True)
                    model_instance = ScientificModelInstance.objects.filter(model_id__in = param_model_id )
                    results = results.filter(model_version_id__in = model_instance.values("id"))

            #add filter using param_test_score_type
            if len(param_test_score_type) != 0:
                test_code_ids = results.values('test_code_id')
                test_codes_to_keep = ValidationTestCode.objects.filter(id__in = test_code_ids).prefetch_related().filter(test_definition__score_type__in = param_test_score_type)
                results = results.filter(test_code_id__in = test_codes_to_keep)

            #Exclude the results whitch the client can't access to.
            temp_results = results
            for result in results :
                if user_has_acces_to_result(request, result) is False :
                    temp_results.exclude(id = result.id )
            results = temp_results


        else :
            results =  ValidationTestResult.objects.filter(id__in = param_id)

            #check if user has acces to the model associated to the results
            for result in results :
                if user_has_acces_to_result(request, result) is False :
                    return Response("You do not access to result : {}".format(result.id), status=status.HTTP_403_FORBIDDEN)

        #####quick fix to get out nan and infinity numbers --will need to change it by allowing the json
        new_results = []
        for result in results:
            if not math.isnan(float(result.score)) and not math.isnan(float(result.normalized_score)) and not math.isinf(float(result.score)) and not math.isinf(float(result.normalized_score)):
                new_results.append(result)

        data_to_return = organise_results_dict(detailed_view, param_order, new_results, serializer_context)

        # file = get_storage_file_by_id(request)
        # data_to_return['PDF'] = file

        return Response(data_to_return)


    def post(self, request, format=None):
        """
        Save a result or a list of results
        :param data: list of result objects
        :returns: list of results id
        :rtype: uuid list
        """
        serializer_context = {'request': request,}
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        if type(request.data) == list :
            DATA = request.data

        elif type(request.data) == dict :
            DATA = [request.data]
        else :
            return Response(status=status.HTTP_400_BAD_REQUEST)

        #check if the user can acces the models, and if data are valids
        for result in DATA :
            value = self.check_data(request, serializer_context, result)
            if value is not True :
                return value

        list_id = []
        for result in DATA :
            value = self.save_data(request, serializer_context, result, list_id)
            if type(value) is list :
                list_id = value
            else :
                return value

        if len(list_id) > 0 :
            return Response({'uuid':list_id}, status=status.HTTP_201_CREATED)
        else :
            return Response(status=status.HTTP_400_BAD_REQUEST)


        return Response(status=status.HTTP_400_BAD_REQUEST)

    @classmethod
    def check_data(self,  request, serializer_context, result):
        """
        Check check if user has access to result by checking acces to the model
        :param data: result
        :type data: object
        :returns: true if user has access, false else:
        :rtype: boolean
        """
        serializer = ValidationTestResultSerializer (data=result, context=serializer_context)
        if serializer.is_valid():
            instance_id = result['model_version_id']
            instance = ScientificModelInstance.objects.get(id=instance_id)
            model = ScientificModel.objects.get(id=instance.model_id)
            if user_has_acces_to_model(request, model) :
                return True
            else :
                return HttpResponseForbidden()
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @classmethod
    def save_data(self, request,serializer_context, result, list_id):
        """
        Save the result in the database
        :param result: result object
        :type result: object
        :param serializer_context: context
        :type serializer_context: dictionnary
        :param list_id: list of results id
        :type list_id: uuid list
        :returns: list of results id saved
        :type list_id: uuid list
        """
        serializer = ValidationTestResultSerializer(data=result, context=serializer_context)
        if serializer.is_valid():
            res = serializer.save(model_version_id = result['model_version_id'], test_code_id = result['test_code_id'] )
            list_id.append(res.id)
            return list_id
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






    # def put(self, request, format=None):
    #     serializer_context = {'request': request,}

    #     #check if data are valids and if the user can modify the model-instance given
    #     for result in request.data :
    #         serializer = ValidationTestResultSerializer (data=result, context=serializer_context)
    #         if serializer.is_valid():
    #             instance_id = result.model_version_id
    #             model = ScientificModel.objects.get(id=instance_id)
    #             if not user_has_acces_to_model(request, model) :
    #                 return HttpResponseForbidden()

    #             #check if the client has allowed to modify the original result
    #             original_result = ValidationTestResult.filter(id= result.id)
    #             original_instance_id = original_result.model_version_id
    #             original_model = ScientificModel.objects.get(id=original_instance_id)
    #             if not user_has_acces_to_model(request, original_model) :
    #                 return HttpResponseForbidden()

    #         else :
    #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    #     for result in request.data :

    #         original_result = ValidationTestResult.get(id= result.id)

    #         serializer = ValidationTestResultSerializer(data=request.data, context=serializer_context)

    #         if serializer.is_valid():
    #             serializer.save()

    #     return Response( status=status.HTTP_202_ACCEPTED)

    def delete(self, request, format=None):

        if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
            return HttpResponseForbidden()

        list_ids = request.GET.getlist('id')

        elements_to_delete = ValidationTestResult.objects.filter(id__in=list_ids)
        for result in elements_to_delete:
            result.delete()

        return Response( status=status.HTTP_200_OK)




class ParametersConfigurationValidationView(View):
    """
    Get template for configuration of the validation_app
    """
    template_name = "configuration/parameters-configuration.html"
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):
       return render(request, self.template_name, {'app_type': "validation_app"})

    @method_decorator(login_required(login_url='/login/hbp/'))
    def dispatch(self, *args, **kwargs):
        return super(ParametersConfigurationValidationView, self).dispatch(*args, **kwargs)




class ParametersConfigurationModelView(View):
    """
     Get template for configuration of the model_catalog
    """
    template_name = "configuration/parameters-configuration.html"
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {'app_type': "model_catalog"})

    @method_decorator(login_required(login_url='/login/hbp/'))
    def dispatch(self, *args, **kwargs):
        return super(ParametersConfigurationModelView, self).dispatch(*args, **kwargs)






class  AreVersionsEditableRest(APIView):
    '''Class to check if the test or model versions are editable'''
    def get(self, request, *args, **kwargs):
        """
        Get a list of the versions id that are editable
        :param test_id: id of the test
        :type test_id: uuid
        :param model_id: id of the model
        :type model_id: uuid
        :returns: list of editable result ids
        :rtype: uuid list
        """
        test_id = request.GET.getlist('test_id')
        model_id = request.GET.getlist('model_id')

        list_ids_editable = []

        if len(test_id)>0:
            test_codes =  ValidationTestCode.objects.filter(test_definition_id__in=test_id)
            for test_code in list(test_codes):
                if _are_test_code_editable(test_code):
                    list_ids_editable.append(test_code.id)

        if len(model_id)>0:
            model_instances = ScientificModelInstance.objects.filter(model_id__in=model_id)
            for model_instance in model_instances:
                if _are_model_instance_editable(model_instance):
                    list_ids_editable.append(model_instance.id)

        return Response({"are_editable":list_ids_editable})


###############################
###### To keep for later ######
###############################

# class NotificationRest(APIView):
#     def post(self, request, format=None, **kwargs):
#         # social_auth = request.user.social_auth.get()
#         # headers = {
#         #     'Authorization': get_auth_header(request.user.social_auth.get()),
#         #     'Accept':'application/json',
#         #     'Content-Type':"application/json",
#         # }
#         # ctx = request.GET.getlist('ctx')[0]
#         # url = 'https://services.humanbrainproject.eu/stream/v0/api/notification/'
#         # # Indata = {'summary': 'test notif 1',
#         # #     'targets': [{"type": "HBPUser","id": "303271"}],
#         # #     'object': {"type": "HBPCollaboratoryContext","id": ctx}
#         # #     }
#         # ##to send to a group
#         # print('requesting...')
#         # res = requests.post(url, headers=headers, data=json.dumps(Indata))
#         # print(res.content)
#         res = True
#         return res

# class ModelFollowRest(APIView):
#     def post (self, request, format=None, **kwargs):
#         request.GET.getlist('app_id')[0]
#         # collab_id = get_collab_id_from_app_id(app_id)
#         # if not is_authorised_or_admin(request, collab_id):
#         #     return HttpResponseForbidden()
#         model_id = request.data['model_id']
#         print(get_user_info(request))
#         request.data['user_id'] = get_user_info(request)['sub']
#         print(request.data)
#         serializer_context = {'request': request,}

#         follow_serializer = FollowModelSerializer(data=request.data, context=serializer_context)
#         # ModelFollowing.save()
#         if follow_serializer.is_valid() :
#             follow = follow_serializer.save(model_id=model_id)
#         else:
#             return Response(follow_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         return Response( status=status.HTTP_201_CREATED)

#############################
#### can still be useful ####
#############################

# def notify_coordinators(request, project):
#     coordinators = get_admin_list(request)
#     url = 'https://services.humanbrainproject.eu/stream/v0/api/notification/'
#     #url = 'https://stream.humanbrainproject.eu/api/v0/notifications/'
#     headers = get_authorization_header(request)
#     targets = [{"type": "HBPUser", "id": id} for id in coordinators]
#     payload = {
#         "summary": "New access request for the Neuromorphic Computing Platform: {}".format(project.title),
#         "targets": targets,
#         "object": {
#             "type": "HBPCollaboratoryContext",
#             "id": "346173bb-887c-4a47-a8fb-0da5d5980dfc"
#         }
#     }
#     res = requests.post(url, json=payload, headers=headers)
#     if res.status_code not in (200, 204):
#         logger.error("Unable to notify coordinators. {}: {}".format(res.status_code, res.content))
#         return False
#     return True
