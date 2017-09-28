"""


"""
import pprint

import json
import logging
from urlparse import urlparse, parse_qs
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
from django.db.models import Max, Count
from django.conf import settings
from django.template import loader
import requests
from hbp_app_python_auth.auth import get_access_token, get_auth_header

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
                        Param_ModelType,
                        CollabParameters,
                        Param_ScoreType,
                        Param_organizations,
                        )


# from .forms import (ValidationTestDefinitionForm, 
#                         ValidationTestCodeForm,
#                         ScientificModelForm,
#                         ScientificModelImageForm,  
#                         ScientificTestForm, 
#                         ValidationTestResultForm, 
#                         ScientificModelInstanceForm,
#                         CommentForm,
# #                        configviewForm,  
#                         )

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
                            Param_ModelTypeSerializer,
                            Param_ScoreTypeSerializer,
                            Param_OrganizationsSerializer,
  
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


from .user_auth_functions import _is_collaborator, is_authorised, get_user_info, is_hbp_member



#dirty logg ... need a module 
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









CROSSREF_URL = "http://api.crossref.org/works/"
# VALID_FILTER_NAMES = ('name', 'age', 'brain_region', 'cell_type',
#                       'data_type', 'data_modality', 'test_type',
#                       'author', 'species', 'data_location', 'publication')
# VALID_MODEL_FILTER_NAMES = ('brain_region', 'cell_type',
#                             'author', 'species')
# VALID_RESULT_FILTERS = {
#     'model': 'model_instance__model__name__icontains',
#     'validation': 'test_definition__test_definition__name__icontains',
#     'project': 'project',
#     'collab_id': 'project',
#     'brain_region': 'test_definition__test_definition__brain_region__icontains',
# }






# def get_admin_list(request):
#     url = 'https://services.humanbrainproject.eu/idm/v1/api/group/hbp-neuromorphic-platform-admin/members'
#     headers = get_authorization_header(request)
#     res = requests.get(url, headers=headers)
#     logger.debug(headers)
#     if res.status_code != 200:
#         raise Exception("Couldn't get list of administrators." + res.content + str(headers))
#     data = res.json()
#     assert data['page']['totalPages'] == 1
#     admins = [user['id'] for user in data['_embedded']['users']]
#     return admins



def get_collab_id_from_app_id (app_id):
    collab_param = CollabParameters.objects.filter(id = app_id)
    collab_id = collab_param.values('collab_id')[0]['collab_id']
    return collab_id

@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class HomeValidationView(View):
    template_name = "validation_framework/validation_home.html"
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs): 
        tests = ValidationTestDefinition.objects.all()
        models = ScientificModel.objects.all()
        tests = serializers.serialize("json", tests)
        models = serializers.serialize("json", models) 


        return render(request, self.template_name, { 'tests':tests, 'models':models})

class AuthorizedCollabParameterRest(APIView):

    def get(self, request,  format=None, **kwargs):
        try:
            python_client = request.GET.getlist('python_client')[0]
        except: 
            python_client = 'false'
            
        serializer_context = {'request': request,}

        data_modalities = Param_DataModalities.objects.all()
        data_modalities_serializer = Param_DataModalitiesSerializer(data_modalities, context=serializer_context, many=True)
        
        test_type = Param_TestType.objects.all()
        test_type_serializer = Param_TestTypeSerializer(test_type, context=serializer_context, many=True)
        
        species = Param_Species.objects.all()
        species_serializer = Param_SpeciesSerializer(species, context=serializer_context, many=True)
        
        brain_region = Param_BrainRegion.objects.all()
        brain_region_serializer = Param_BrainRegionSerializer(brain_region, context=serializer_context, many=True)
        
        cell_type = Param_CellType.objects.all()
        cell_type_serializer = Param_CellTypeSerializer(cell_type, context=serializer_context, many=True)
        
        model_type = Param_ModelType.objects.all()
        model_type_serializer = Param_ModelTypeSerializer(model_type, context=serializer_context, many=True)     

        score_type = Param_ScoreType.objects.all()
        score_type_serializer = Param_ScoreTypeSerializer(score_type, context=serializer_context, many=True)     
        
        organization = Param_organizations.objects.all()
        organization_serializer = Param_OrganizationsSerializer(organization, context=serializer_context, many=True)   

        ##for python client #'python_client=True' 'parameters= list()'
        if python_client == 'true':
            params_asked = request.GET.getlist('parameters')
            if(params_asked[0]=='all'):
                res = {
                    'data_modalities': data_modalities.values_list('authorized_value', flat=True),
                    'test_type' : test_type.values_list('authorized_value', flat=True),
                    'species' : species.values_list('authorized_value', flat=True),
                    'brain_region' : brain_region.values_list('authorized_value', flat=True),
                    'cell_type' : cell_type.values_list('authorized_value', flat=True),
                    'model_type' : model_type.values_list('authorized_value', flat=True),
                    'score_type': score_type.values_list('authorized_value', flat=True),
                    'organization': organization.values_list('authorized_value', flat=True),
                } 
                return Response(res)
            else: 
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
                    if (param == 'model_type'):
                        res['model_type'] = model_type.values_list('authorized_value', flat=True)
                    if (param == 'score_type'):
                        res['score_type'] = score_type.values_list('authorized_value', flat=True)
                    if (param == 'organization'):
                        res['organization'] = organization.values_list('authorized_value', flat=True)       
                return Response(res)   


        return Response({
            'data_modalities': data_modalities_serializer.data,
            'test_type' : test_type_serializer.data,
            'species' : species_serializer.data,
            'brain_region' : brain_region_serializer.data,
            'cell_type' : cell_type_serializer.data,
            'model_type' : model_type_serializer.data,
            'score_type': score_type_serializer.data,
            'organization': organization_serializer.data,
        })

class CollabIDRest(APIView): 
    def get(self, request, format=None, **kwargs):
        if self.request.user == "AnonymousUser" :
            collab_id = 0
        else :         
            collab_id = _get_collab_id(request)

        return Response({
            'collab_id': collab_id,
        })

def _get_collab_id(request):
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

class AppIDRest(APIView): 
    def get(self, request, format=None, **kwargs):

        if self.request.user == "AnonymousUser" :
            app_id = 0
        else :         
            app_id = _get_app_id(request)

        return Response({
            'app_id': app_id,
        })

def _get_app_id(request):
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

class ParametersConfigurationRest( APIView): #LoginRequiredMixin, 

    def get(self, request, format=None, **kwargs):
        serializer_context = {'request': request,}

        id = request.GET.getlist('app_id')[0]
        param = CollabParameters.objects.filter(id = id)
        param_serializer = CollabParametersSerializer(param, context=serializer_context, many=True)

        return Response({
            'param': param_serializer.data,
        })
 

    def post(self, request, format=None):
        # ctx = request.GET.getlist('ctx')[0]
        app_id = request.GET.getlist('app_id')[0]
        collab_id = request.GET.getlist('collab_id')[0]

        if not is_authorised(request, collab_id):
            return HttpResponseForbidden() 

        serializer_context = {'request': request,}
        param_serializer = CollabParametersSerializer(data=request.data, context=serializer_context)
        if param_serializer.is_valid():
            param = param_serializer.save(id =request.data['id'] ) 
        else:
            return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
         
        return Response(status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        # ctx = request.GET.getlist('ctx')[0]
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not is_authorised(request, collab_id):
            return HttpResponseForbidden()
        
        serializer_context = {'request': request,}
  
        param = CollabParameters.objects.get(id = app_id )
        param_serializer = CollabParametersSerializer(param, data=request.data, context=serializer_context )

        if param_serializer.is_valid():         
            param_serializer.save()
            return Response(param_serializer.data)
        return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ScientificModelInstanceRest (APIView):
    def post(self, request, format=None):       
        serializer_context = {'request': request,}

        #check if valid + security
        for instance in request.data :

            serializer = ScientificModelInstanceSerializer(data=instance, context=serializer_context)
            if serializer.is_valid():   

                #security
                app_id = ScientificModel.objects.get(id=instance['model_id']).app_id
                collab_id = get_collab_id_from_app_id(app_id)
                if not is_authorised(request, collab_id):
                    return HttpResponseForbidden()
            else :
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        for instance in request.data :
            serializer = ScientificModelInstanceSerializer(data=instance, context=serializer_context)

            if serializer.is_valid(): 
                serializer.save(model_id=instance['model_id'])

        return Response(status=status.HTTP_201_CREATED)

            
    
    def put(self, request, format=None):
        serializer_context = {'request': request,}

        #check if valid
        for instance in request.data:
            model_instance = ScientificModelInstance.objects.get(id=instance['id'])

            #security
            app_id =ScientificModel.objects.get(id=model_instance.model_id).app_id
            collab_id = get_collab_id_from_app_id(app_id)
            if not is_authorised(request, collab_id):
                return HttpResponseForbidden()

            model_serializer = ScientificModelInstanceSerializer(model_instance, data=instance, context=serializer_context)

            if  model_serializer.is_valid() is False :
                return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        #is valid + authaurised : save it
        for instance in request.data: 
            model_instance = ScientificModelInstance.objects.get(id=instance['id'])
            model_serializer = ScientificModelInstanceSerializer(model_instance, data=instance, context=serializer_context)

            if  model_serializer.is_valid() :
                model_instance = model_serializer.save()

        return Response( status=status.HTTP_201_CREATED) 



class ScientificModelImageRest (APIView):

    def post(self, request, format=None):
        serializer_context = {'request': request,}

        #check if valid + security
        for image in request.data :
            serializer = ScientificModelImageSerializer(data=image, context=serializer_context)
            if serializer.is_valid():   
                #security
                app_id = ScientificModel.objects.get(id=image['model_id']).app_id
                collab_id = get_collab_id_from_app_id(app_id)
                if not is_authorised(request, collab_id):
                    return HttpResponseForbidden()
            else :
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        for image in request.data :
            serializer = ScientificModelImageSerializer(data=image, context=serializer_context)

            if serializer.is_valid(): 
                serializer.save(model_id=image['model_id'])

        return Response(status=status.HTTP_201_CREATED)



    def put(self, request, format=None):


        serializer_context = {'request': request,}

        for image in request.data:
            model_image = ScientificModelImage.objects.get(id=image['id'])

            #security
            app_id = ScientificModel.objects.get(id=model_image.model_id).app_id
            collab_id = get_collab_id_from_app_id(app_id)
            if not is_authorised(request, collab_id):
                return HttpResponseForbidden()

            # check if data is ok else return error
            model_serializer = ScientificModelImageSerializer(model_image, data=image, context=serializer_context)
            if model_serializer.is_valid() :
                model_image = model_serializer.save()
            else: 
                return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response( status=status.HTTP_202_ACCEPTED) 
        

    def delete(self, request, format=None):
        
        image_id = request.GET.getlist('id')[0]
        
        #security
        image = ScientificModelImage.objects.get(id=image_id)
        app_id = ScientificModel.objects.get(id= image.model_id).app_id
        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised(request, collab_id):
            return HttpResponseForbidden()

        image = image.delete()
        return Response( status=status.HTTP_200_OK) 




class ScientificModelRest(APIView):
    def get(self, request, format=None, **kwargs):
        serializer_context = {
            'request': request,
        }

        #if model id not specified
        if(len(request.GET.getlist('id')) == 0):

            web_app = request.GET.getlist('web_app')    


            #if the request comes from the webapp : uses collab_parameters
            if len(web_app) > 0 and web_app[0] == 'True' :  

                app_id = request.GET.getlist('app_id')[0]
                collab_id = get_collab_id_from_app_id(app_id)

                collab_params = CollabParameters.objects.get(id = app_id )
                all_ctx_from_collab = CollabParameters.objects.filter(collab_id = collab_id).distinct()

                if is_authorised(request, collab_id) :
                    rq1 = ScientificModel.objects.filter(
                        private=1,
                        app__in=all_ctx_from_collab.values("id"), 
                        species__in=collab_params.species.split(",")+[u''], 
                        brain_region__in=collab_params.brain_region.split(",")+[u''], 
                        cell_type__in=collab_params.cell_type.split(",")+[u''], 
                        model_type__in=collab_params.model_type.split(",")+[u''],
                        organization__in=collab_params.organization.split(",")+[u'']).prefetch_related()
                else :
                    rq1 = []
                    
    
                rq2 = ScientificModel.objects.filter (
                    private=0, 
                    species__in=collab_params.species.split(",")+[u''], 
                    brain_region__in=collab_params.brain_region.split(",")+[u''], 
                    cell_type__in=collab_params.cell_type.split(",")+[u''], 
                    model_type__in=collab_params.model_type.split(",")+[u''],
                    organization__in=collab_params.organization.split(",")+[u'']).prefetch_related()

                if len(rq1) >0:
                    models  = (rq1 | rq2).distinct().order_by('-creation_date')
                else:
                    models = rq2.distinct().order_by('-creation_date')
                
                model_serializer = ScientificModelReadOnlyForHomeSerializer(models, context=serializer_context, many=True )
                return Response({
                'models': model_serializer.data,
                })
            

            else :  
                app_id =request.GET.getlist('app_id')   
                name =request.GET.getlist('name')
                description =request.GET.getlist('description')
                species =request.GET.getlist('species')
                brain_region =request.GET.getlist('brain_region')
                cell_type =request.GET.getlist('cell_type')
                author =request.GET.getlist('author')
                model_type =request.GET.getlist('model_type')
                private =request.GET.getlist('private')
                code_format =request.GET.getlist('code_format')
                alias =request.GET.getlist('alias')
                organization = request.GETlist('organization')

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
                if len(model_type) > 0 :
                    q = q.filter(model_type__in = model_type)
                if len(code_format) > 0 :
                    q = q.filter(code_format__in = code_format)    
                if len(app_id) > 0 :
                    q = q.filter(app__in = app_id)
                if len(organization) > 0 :
                    q = q.filter(organization__in = organization)
                       
                #For each models, check if collab member, if not then just return the publics....
                list_app_id = q.values("app").distinct()
                for app_id in list_app_id :
                    app_id = app_id['app']
                    collab_id = get_collab_id_from_app_id(app_id)
                    if not is_authorised(request, collab_id) :
                        #exclude it here
                        q.exclude(app=app_id, private=1)


                models = q
                model_serializer = ScientificModelReadOnlySerializer(models, context=serializer_context, many=True )

                return Response({
                'models': model_serializer.data,
                })

        # a model ID has been specified 
        else:
        
            id =request.GET.getlist('id')[0]
            models = ScientificModel.objects.filter(id=id)

            #check if private 
            if models.values("private")[0]["private"] == 1 :
                #if private check if collab member
                app_id = models.values("app")[0]['app']
                collab_id = get_collab_id_from_app_id(app_id)
                if not is_authorised(request, collab_id) :
                    return HttpResponse('Unauthorized', status=401)
                    return HttpResponseForbidden()
            
            model_serializer = ScientificModelReadOnlySerializer(models, context=serializer_context, many=True )

            return Response({
                'models': model_serializer.data,
            })

    def post(self, request, format=None):   
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised(request, collab_id):
            return HttpResponseForbidden()

        serializer_context = {'request': request,}

        # check if data is ok else return error
        model_serializer = ScientificModelSerializer(data=request.data['model'], context=serializer_context)
        if model_serializer.is_valid() is not True:
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
               
        if len(request.data['model_instance']) >  0 :
            for i in request.data['model_instance']:
                model_instance_serializer = ScientificModelInstanceSerializer(data=i, context=serializer_context)
                if model_instance_serializer.is_valid() is not True:    
                    return Response(model_instance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if len(request.data['model_image']) >  0 :
            for i in request.data['model_image']:
                model_image_serializer = ScientificModelImageSerializer(data=i, context=serializer_context)  
                if model_image_serializer.is_valid()  is not True:
                    return Response(model_image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        # no error then save all 
        model = model_serializer.save(app_id=app_id)

        if len(request.data['model_instance']) >  0 :
            for i in request.data['model_instance'] :
                model_instance_serializer = ScientificModelInstanceSerializer(data=i, context=serializer_context)
                if model_instance_serializer.is_valid():
                    model_instance_serializer.save(model_id=model.id) 

        if len(request.data['model_image']) >  0 :
            for i in request.data['model_image']: 
                model_image_serializer = ScientificModelImageSerializer(data=i, context=serializer_context) 
                if model_image_serializer.is_valid()   :     
                    model_image_serializer.save(model_id=model.id)

        return Response({'uuid':model.id}, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        

        ## save only modifications on model. if you want to modify images or instances, do separate put.  
        ##get objects 
        value = request.data['models'][0]
        model = ScientificModel.objects.get(id=value['id'])

        #security
        app_id = model.app_id
        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised(request, collab_id):
            return HttpResponseForbidden()


        serializer_context = {'request': request,}

        # check if data is ok else return error
        model_serializer = ScientificModelSerializer(model, data=value, context=serializer_context)
        if model_serializer.is_valid() :
            model = model_serializer.save()
        else: 
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response( status=status.HTTP_201_CREATED) 

    def delete(self, request, format=None):
        
        model_id = request.GET.getlist('id')[0]
        collab_id = request.GET.getlist('collab_id')

        if collab_id[0]:
            models_to_delete = ScientificModel.objects.filter(collab_id=collab_id)
            for model in models_to_delete:
                model.delete()
        else:
            model_to_delete = ScientificModel.objects.get(id=model_id)
            model_to_delete.delete()
        return Response( status=status.HTTP_200_OK) 
        
class ScientificModelAliasRest(APIView):
    def get(self, request, format=None, **kwargs):
        serializer_context = {
            'request': request,
        }
        alias = request.GET.getlist('alias')

        all_alias_in_model = ScientificModel.objects.filter().values_list('alias', flat=True)
        if alias[0] in all_alias_in_model:
            is_valid= False
        else: 
            is_valid = True

        try:
            model_id = request.GET.getlist('model_id')
            old_alias = ScientificModel.objects.filter(id = model_id[0]).values_list('alias', flat=True)
            if alias[0] == old_alias[0]:
                is_valid = True
        except: 
            print('')
        return Response({ 'is_valid':is_valid})

class ValidationTestAliasRest(APIView):
    def get(self, request, format=None, **kwargs):
        serializer_context = {
            'request': request,
        }
        alias = request.GET.getlist('alias')

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
            print('')
        return Response({ 'is_valid':is_valid})

class ValidationTestCodeRest(APIView):

     def get(self, request, format=None, **kwargs):
        serializer_context = {'request': request,}

        param_id = request.GET.getlist('id')
        param_repository = request.GET.getlist('repository')
        param_version = request.GET.getlist('version')
        param_path = request.GET.getlist('path')
        param_timestamp = request.GET.getlist('timestamp')
        param_test_definition_id = request.GET.getlist('test_definition_id')
        

        q = ValidationTestCode.objects.all()

        if len(param_id) > 0 :
            q = q.filter(app_id__in = param_id)  
        if len(param_test_definition_id) > 0 :
            q = q.filter(app_id__in = param_test_definition_id)     
        if len(param_repository) > 0 :
            q = q.filter(app_id__in = param_repository)           
        if len(param_version) > 0 :
            q = q.filter(app_id__in = param_version) 
        if len(param_path) > 0 :
            q = q.filter(app_id__in = param_path) 
        if len(param_timestamp) > 0 :
            q = q.filter(app_id__in = param_timestamp) 


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

        test_serializer = ValidationTestCodeSerializer(tests, context=serializer_context, many=True)
        # TODO rename tests to testcodes
        return Response({
            'tests': test_serializer.data, 
        })


     def post(self, request, format=None):
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not is_authorised(request, collab_id):
            return HttpResponseForbidden()

        serializer_context = {'request': request,}
        test_id = request.query_params['id']#str(len(request.POST.getlist('id')))
        serializer = ValidationTestCodeSerializer(data=request.data, context=serializer_context)
        
        if serializer.is_valid():        
            serializer.save(test_definition_id=test_id)  #need to see how to get this value throught kwargs or other ?
            return Response(status=status.HTTP_201_CREATED) #put inside .is_valid

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

     def get_serializer_class(self):
        #  if self.request.method in ('GET', )
        #      return ValidationTestDefinitionFullSerializer
         return ValidationTestCodeSerializer



class ValidationTestDefinitionRest(APIView):
    
    def get(self, request, format=None, **kwargs):
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
        param_alias = request.GET.getlist('alias')
        param_web_app = request.GET.getlist('web_app')
        param_app_id = request.GET.getlist('app_id')


        # app_id = request.query_params['app_id']
        # collab_id = get_collab_id_from_app_id(app_id)

        if len(param_web_app) > 0 and param_web_app[0] == 'True' : 

            if(len(request.GET.getlist('id')) == 0):

                param_app_id = request.query_params['app_id']
                collab_params = CollabParameters.objects.get(id = param_app_id )

                tests= ValidationTestDefinition.objects.filter (
                    species__in=collab_params.species.split(",")+[u''], 
                    brain_region__in=collab_params.brain_region.split(",")+[u''], 
                    cell_type__in=collab_params.cell_type.split(",")+[u''],
                    data_modality__in=collab_params.data_modalities.split(",")+[u''],
                    test_type__in=collab_params.test_type.split(",")+[u'']).prefetch_related().distinct()

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
                if len(param_app_id) > 0 :
                    q = q.filter(app_id__in = param_app_id)
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
                if len(param_) > 0 :
                    q = q.filter(score_type__in = param_score_type)
                        
                tests = q
                #serializer : ValidationTestDefinition
                test_serializer = ValidationTestDefinitionSerializer(tests, context=serializer_context, many=True)

                

            else :               
                tests = ValidationTestDefinition.objects.filter(id__in = param_id)
                # TODO serializer : ValidationTestDefinitionFull
                # test_serializer = ValidationTestDefinitionSerializer(tests, context=serializer_context, many=True)
                test_serializer = ValidationTestDefinitionFullSerializer(tests, context=serializer_context, many=True)


        return Response({
            'tests': test_serializer.data,
        })


    def post(self, request, format=None):
        # ctx = request.GET.getlist('ctx')[0]    
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        # app_id = request.GET.getlist('app_id')[0]
        # collab_id = get_collab_id_from_app_id(app_id)
        # if not is_authorised(request, collab_id):
        #     return HttpResponseForbidden()

        serializer_context = {'request': request,}

        test_serializer = ValidationTestDefinitionSerializer(data=request.data['test_data'], context=serializer_context)
        if test_serializer.is_valid():
            test = test_serializer.save() 
        else:
            return Response(test_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        code_serializer = ValidationTestCodeSerializer(data=request.data['code_data'], context=serializer_context)
        if code_serializer.is_valid():
            code_serializer.save(test_definition_id=test.id)
        else:
            return Response(code_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'id':test.id})

    def put(self, request, format=None):
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        # app_id = request.GET.getlist('app_id')[0]
        # collab_id = get_collab_id_from_app_id(app_id)
        # if not is_authorised(request, collab_id):
        #     return HttpResponseForbidden()

        value = request.data
        test = ValidationTestDefinition.objects.get(id=value['id'])
        serializer_context = {'request': request,}

        # check if data is ok else return error
        test_serializer = ValidationTestDefinitionSerializer(test, data=value, context=serializer_context)
        if test_serializer.is_valid() :
            test = test_serializer.save()
        else: 
            return Response(test_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response( status=status.HTTP_201_CREATED) 

class TestTicketRest(APIView):
    def get(self, request, format=None, **kwargs):
        serializer_context = {'request': request,}
        nb_test_id = request.query_params['test_id']
        tickets = Tickets.objects.filter(test_id = nb_test_id)
        for ticket in tickets:
            ticket.comments = Comments.objects.filter(Ticket_id = ticket.id)
        ticket_serializer = TicketReadOnlySerializer(tickets, context=serializer_context, many=True)

        return Response({
            'tickets': ticket_serializer.data,
            'user_connected':str(request.user)
        })
  
    def post(self, request, format=None):
        serializer_context = {'request': request,}

        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised(request, collab_id):
            return HttpResponseForbidden()

        request.data['author'] = str(request.user)
        param_serializer = TicketSerializer(data=request.data, context=serializer_context)
        if param_serializer.is_valid():
            param = param_serializer.save(test_id=request.data['test_id'])
        else:
            return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        new_ticket = Tickets.objects.filter(id=param.id)
        new_ticket_serializer = TicketReadOnlySerializer(new_ticket, context=serializer_context, many=True)
        return Response({'new_ticket' : new_ticket_serializer.data})

    def put(self, request, format=None):
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not is_authorised(request, collab_id):
            return HttpResponseForbidden()
        
        serializer_context = {'request': request,}
        ticket_id = request.data['id']
        ticket = Tickets.objects.get(id=ticket_id)
        param_serializer = TicketSerializer(ticket, data=request.data, context=serializer_context )

        if param_serializer.is_valid():         
            param_serializer.save()
            return Response(param_serializer.data)
        return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestCommentRest(APIView):
    def get(self, request, format=None, **kwargs):
        logger.debug("*** TestCommentRest get ***")
        serializer_context = {'request': request,}
        nb_ticket_id = str(len(request.GET.getlist('Ticket_id')))

        comments = Comments.objects.filter(Ticket_id = nb_ticket_id)
        comments_serializer = CommentsSerializer(comments, context=serializer_context, many=True)

        return Response({
            'comments': comments_serializer.data,
        })
  
    def post(self, request, format=None):
        serializer_context = {'request': request,}

        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised(request, collab_id):
            return HttpResponseForbidden()


        request.data['author'] = str(request.user)
        param_serializer = CommentSerializer(data=request.data, context=serializer_context)
        if param_serializer.is_valid():
            param = param_serializer.save(Ticket_id=request.data['Ticket_id'])
        else:
            return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        new_comment = Comments.objects.filter(id=param.id)
        new_comment_serializer = CommentSerializer (new_comment, context=serializer_context, many=True)
        return Response({'new_comment' : new_comment_serializer.data})

    def put(self, request, format=None):
        app_id = request.query_params['app_id']
        collab_id = get_collab_id_from_app_id(app_id)
        if not is_authorised(request, collab_id):
            return HttpResponseForbidden()
        
        serializer_context = {'request': request,}
        comment_id = request.data['id']
        comment = Comments.objects.get(id=comment_id)
        param_serializer = CommentSerializer(comment, data=request.data, context=serializer_context )

        if param_serializer.is_valid():         
            param_serializer.save()
            return Response(param_serializer.data)
        return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ModelCatalogView(View):

    template_name = "model_catalog/model_catalog.html"
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):
        models = ScientificModel.objects.all()
        models = serializers.serialize("json", models) 
        return render(request, self.template_name, {'models':models})

# @method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ParametersConfigurationValidationView(View):
    
    template_name = "configuration/parameters-configuration.html"
    login_url='/login/hbp/'
    def get(self, request, *args, **kwargs):
       return render(request, self.template_name, {'app_type': "validation_app"})

# @method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ParametersConfigurationModelView(View):
    
    template_name = "configuration/parameters-configuration.html"
    login_url='/login/hbp/'


    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {'app_type': "model_catalog"})


class IsCollabMemberRest (APIView):
    def get(self, request, format=None, **kwargs):
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)
        
        is_member = is_authorised(request, collab_id) 
        

        return Response({
            'is_member':  is_member,
        })


class ValidationResultRest (APIView):
    def get(self, request, format=None, **kwargs):
        
        # param_id = request.GET.getlist('id')


        serializer_context = {'request': request,}

        test_result_id = request.query_params['id']

        validation_result =  ValidationTestResult.objects.get(id = test_result_id )
        result_serializer = ValidationTestResultReadOnlySerializer(validation_result, context=serializer_context) 
        
        return Response({
            'data': result_serializer.data,
        })

class ValidationModelResultRest (APIView):
    def get(self, request, format=None, **kwargs):
        
        param_id = request.GET.getlist('id')


        serializer_context = {'request': request,}
        model_id  = request.query_params['model_id']
        list_test_id  = request.GET.getlist('list_id')

        try :      
            model_instances = ScientificModelInstance.objects.filter(model_id=model_id).values("id")
        except:    
            model_instances = [ScientificModelInstance.objects.get(model_id= model_id).id]
        results_all= ValidationTestResult.objects.filter(model_version_id__in = model_instances )
        list_code_id = []
        if list_test_id == []:
            def_ids = results_all.values_list('test_code__test_definition_id', flat=True).distinct()
            for def_id in def_ids:
                last_code_id = results_all.filter(test_code__test_definition_id = def_id).order_by('-test_code__timestamp').first().test_code_id
                list_code_id.append(last_code_id)
            versions = list_code_id
        else:
            if list_test_id[0] == 'all':
                versions = results_all.values_list('test_code_id', flat=True).distinct()
            else:
                versions = list_test_id
        result_serialized=[]
        new_id = []
        for version in versions:
            r =results_all.filter(test_code_id = version)
            r_serializer = ValidationModelResultReadOnlySerializer(r, context = serializer_context, many=True)
            result_serialized.append(r_serializer.data)  
            #change the label to generalize datablock_id
            version_object = ValidationTestCode.objects.get(id=version)
            if(str(version_object.test_definition.alias) !=""):
                new_id.append({"id":str(version_object.test_definition.alias) +" ("+str(version_object.version)+")"})
            else:
                new_id.append({"id":str(version_object.id)})   
        #get list of all test_code to show in checkbox
        versions_id = results_all.values_list("test_code_id", flat=True).distinct() 
        versions_all = ValidationTestCode.objects.filter(id__in=versions_id).order_by('test_definition_id')
        versions_all_ser = ValidationTestCodeReadOnlySerializer(versions_all, many=True).data
        return Response({
            'data': result_serialized,
            'data_block_id':new_id,
            'versions_id_all': versions_all_ser,
        })    

class ValidationTestResultRest (APIView):
    def get(self, request, format=None, **kwargs):

        serializer_context = {'request': request,}
        
        test_definition_id = request.query_params['test_id']
        list_model_id  = request.GET.getlist('list_id')
        try : 
            test_codes = ValidationTestCode.objects.filter(test_definition_id= test_definition_id).values("id")
        except:
            test_codes = [ValidationTestCode.objects.get(test_definition_id= test_definition_id).id]   
        #need to rename in model test_code_id
        results_all = ValidationTestResult.objects.filter(test_code_id__in = test_codes)

        list_version_id = []
        if list_model_id == []:
            def_ids = results_all.values_list('model_version__model_id', flat=True).distinct()
            for def_id in def_ids:
                last_version_id = results_all.filter(model_version__model_id = def_id).order_by('-model_version__timestamp').first().model_version_id
                list_version_id.append(last_version_id)
            versions = list_version_id
        else:
            if list_model_id[0] == 'all':
                versions = results_all.values_list('model_version_id', flat=True).distinct()
            else:
                versions = list_model_id
        # model_instance_id = list(results_all.values("model_instance_id").distinct())
        result_serialized = []
        new_id = []
        for version in versions:
            r = results_all.filter(model_version_id = version)
            r_serializer = ValidationTestResultReadOnlySerializer(r, context = serializer_context, many=True)
            result_serialized.append(r_serializer.data)  
            #change the label to generalize datablock_id
            version_object = ScientificModelInstance.objects.get(id=version)
            if(str(version_object.model.alias) !=""):
               new_id.append({"id":str(version_object.model.alias)+" ("+str(version_object.version)+")"})
            else:
                new_id.append({"id":str(version_object.id)})   
            
        #get list of all model_versions to show in checkbox
        versions_id = results_all.values_list("model_version_id", flat=True).distinct() 
        versions_all = ScientificModelInstance.objects.filter(id__in=versions_id).order_by('model_id')
        versions_all_ser =ScientificModelInstanceReadOnlySerializer(versions_all, many=True).data
        return Response({
            'data': result_serialized,
            'data_block_id': new_id,
            'versions_id_all': versions_all_ser,
        })

# class ValidationResultRest (APIView):
#     def get(self, request, format=None, **kwargs):
#         param_id = request.GET.getlist('id')
#         param_ = request.GET.getlist('')
#         param_ = request.GET.getlist('')
#         param_ = request.GET.getlist('')
#         param_ = request.GET.getlist('')
#         param_ = request.GET.getlist('')
#         param_ = request.GET.getlist('')
#         param_ = request.GET.getlist('')
#         param_ = request.GET.getlist('')
#         param_ = request.GET.getlist('')


#         serializer_context = {'request': request,}



class ParametersConfigurationView(View):
    
    template_name = "configuration/parameters-configuration.html"
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

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
#         # if not is_authorised(request, collab_id):
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







# @method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
# class ValidationTestDefinitionSearchResource(View):
#     serializer = ValidationTestDefinitionSerializer
#     login_url='/login/hbp/'

#     def get(self, request, *args, **kwargs):
#         filters = {}
#         for key, value in request.GET.items():
#             if key not in VALID_FILTER_NAMES:
#                 return HttpResponseBadRequest("{} is not a valid filter".format(key))
#             else:
#                 filters[key + "__contains"] = value  # should handle multiple values
#         tests = ValidationTestDefinition.objects.filter(**filters)
# #        raise Exception(str(filters))
#         content = self.serializer.serialize(tests)
#         return HttpResponse(content, content_type="application/json; charset=utf-8", status=200)


    # def get_collab_id(self):
    #     social_auth = self.request.user.social_auth.get()
    #     print("social auth", social_auth.extra_data )
    #     # import hbp_service_client.document_service.client as doc_service_client
    #     # access_token = get_access_token(self.request.user.social_auth.get())
    #     # dsc = doc_service_client.Client.new(access_token)

    #     headers = {
    #         'Authorization': get_auth_header(self.request.user.social_auth.get())
    #     }

    #     #to get collab_id
    #     svc_url = settings.HBP_COLLAB_SERVICE_URL
    #     context = self.request.session["next"][6:]
    #     url = '%scollab/context/%s/' % (svc_url, context)
    #     res = requests.get(url, headers=headers)
    #     collab_id = res.json()['collab']['id']
    #     return collab_id



# @method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
# class SimpleResultDetailView(LoginRequiredMixin, DetailView):
    
#     model = ValidationTestResult
#     template_name = "simple_result_detail.html"

#     def get_context_data(self, **kwargs):
#         context = super(SimpleResultDetailView, self).get_context_data(**kwargs)
#         context["section"] = "results"
#         context["build_info"] = settings.BUILD_INFO
#         context["related_data"] = self.get_related_data(self.request.user)

#         if self.object.project:
#             context["collab_name"] = self.get_collab_name()
#         return context

#     def get_collab_name(self):
#         # import bbp_services.client as bsc
#         # services = bsc.get_services()

#         import hbp_service_client.document_service.client as doc_service_client
#         access_token = get_access_token(self.request.user.social_auth.get())
#         dsc = doc_service_client.Client.new(access_token)

#         headers = {
#             'Authorization': get_auth_header(self.request.user.social_auth.get())
#         }

#         #to get collab_id
#         svc_url = settings.HBP_COLLAB_SERVICE_URL
#         context = self.request.session["next"][6:]
#         url = '%scollab/context/%s/' % (svc_url, context)
#         res = requests.get(url, headers=headers)
#         collab_id = res.json()['collab']['id']

#         project = dsc.list_projects(collab_id=collab_id)["results"]

#         # url = services['collab_service']['prod']['url'] + "collab/{}/".format(self.object.project)
#         # url = services['collab_service']['prod']['url'] + "collab/{}/".format(dsc.list_projects(collab_id=2169)["results"][0]["name"])
#         url = "https://services.humanbrainproject.eu/collab/v0/collab/{}/".format(dsc.list_projects(collab_id=collab_id)["results"][0]["name"])
        
#         response = requests.get(url, headers=headers)
#         collab_name = response.json()["title"]

#         return collab_name

#     def get_collab_storage_url(self):
#         # import bbp_services.client as bsc
#         # services = bsc.get_services()

#         import hbp_service_client.document_service.client as doc_service_client
#         access_token = get_access_token(self.request.user.social_auth.get())
#         dsc = doc_service_client.Client.new(access_token)


#         headers = {
#             'Authorization': get_auth_header(self.request.user.social_auth.get())
#         }

#         #to get collab_id
#         svc_url = settings.HBP_COLLAB_SERVICE_URL
#         context = self.request.session["next"][6:]
#         url = '%scollab/context/%s/' % (svc_url, context)
#         res = requests.get(url, headers=headers)
#         collab_id = res.json()['collab']['id']

#         project = dsc.list_projects(collab_id=collab_id)["results"]

#         # url = services['collab_service']['prod']['url'] + "collab/{}/nav/all/".format(self.object.project)
#         url = "https://services.humanbrainproject.eu/collab/v0/collab/{}/nav/all/".format(dsc.list_projects(collab_id=collab_id)["results"][0]["name"])
        

#         response = requests.get(url, headers=headers)
#         if response.ok:
#             nav_items = response.json()
#             for item in nav_items:   
#                 if item["app_id"] == "31":  # Storage app

#                     # return "https://collab.humanbrainproject.eu/#/collab/{}/nav/{}".format(self.object.project, item["id"])
#                     return "https://collab.humanbrainproject.eu/#/collab/{}/nav/{}".format(dsc.list_projects(collab_id=collab_id)["results"][0]["name"], item["id"])
                    
#         else:
#             return ""

#     def get_related_data(self, user):
#         # assume for now that data is in collab

#         # from bbp_client.oidc.client import BBPOIDCClient
#         # from bbp_client.document_service.client import Client as DocClient
#         # import bbp_services.client as bsc
#         # services = bsc.get_services()

#         # oidc_client = BBPOIDCClient.bearer_auth(services['oidc_service']['prod']['url'], access_token)
#         # doc_client = DocClient(services['document_service']['prod']['url'], oidc_client) # a remplacer : creer instance de nouvelle classe : hbp_service client

#         import hbp_service_client.document_service.client as doc_service_client

#         access_token = get_access_token(user.social_auth.get())
#         dsc = doc_service_client.Client.new(access_token)

#         headers = {
#             'Authorization': get_auth_header(user.social_auth.get())
#         }

#         #to get collab_id
#         svc_url = settings.HBP_COLLAB_SERVICE_URL
#         context = self.request.session["next"][6:]
#         url = '%scollab/context/%s/' % (svc_url, context)
#         res = requests.get(url, headers=headers)
#         collab_id = res.json()['collab']['id']

#         project_dict = dsc.list_projects(collab_id=collab_id)
        
#         try :
#             dsc.create_folder("folder_test", project_dict["results"][0]["uuid"])

#         except:
#             print ("folder already exist")     

#         parse_result = urlparse(self.object.results_storage)

#         # print ("parse result : ")
#         # print (parse_result)
#         # print ("")

#         ###reste a voir ici... je ne comprend pas ce qui doit etre dans parse_result
#         if parse_result.scheme == "collab":
#         # if 1 :
#             list_folder = dsc.list_project_content(project_dict["results"][0]["uuid"])
#             # collab_folder = parse_result.path
#             collab_folder = list_folder["results"][0]
            
#             #return doc_client.listdir(collab_folder)
#             # folder_uuid = doc_client.get_standard_attr(collab_folder)['_uuid'] #a remplacer
#             folder_uuid = collab_folder["uuid"]
        
#             data = {
#                 "folder": {
#                     "path": collab_folder,
#                 }
#             }
#             if self.object.project:
#                 data["folder"]["url"] = self.get_collab_storage_url() + "?state=uuid={}".format(folder_uuid)
#             return data
#         else:
#             print("Storage not yet supported")

#         return {}
