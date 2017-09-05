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
                        Param_DataModalities,
                        Param_TestType,
                        Param_Species,
                        Param_BrainRegion,
                        Param_CellType,
                        Param_ModelType,
                        CollabParameters,)


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

from .serializer import (ValidationTestDefinitionSerializer, 
                            ScientificModelSerializer,
                            ScientificModelReadOnlySerializer, 
                            ScientificModelFullReadOnlySerializer,
                            ScientificModelInstanceSerializer,
                            ScientificModelImageSerializer,
                            ValidationTestResultSerializer,
                            ValidationTestResultReadOnlySerializer,
                            ValidationModelResultReadOnlySerializer,
                            ValidationTestCodeSerializer,
                            ValidationTestDefinitionWithCodesReadSerializer,
                            CommentSerializer,
                            TicketReadOnlySerializer,
                            TicketSerializer,

                            CollabParametersSerializer,

                            Param_DataModalitiesSerializer,
                            Param_TestTypeSerializer,
                            Param_SpeciesSerializer,
                            Param_BrainRegionSerializer,
                            Param_CellTypeSerializer,
                            Param_ModelTypeSerializer,
  
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


from .user_auth_functions import _is_collaborator, is_authorised


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

        return Response({
            'data_modalities': data_modalities_serializer.data,
            'test_type' : test_type_serializer.data,
            'species' : species_serializer.data,
            'brain_region' : brain_region_serializer.data,
            'cell_type' : cell_type_serializer.data,
            'model_type' : model_type_serializer.data,
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

        if not _is_collaborator(request, collab_id):
            return HttpResponseForbidden() 

        serializer_context = {'request': request,}
        param_serializer = CollabParametersSerializer(data=request.data, context=serializer_context)
        if param_serializer.is_valid():
            param = param_serializer.save() 
        else:
            return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
         
        return Response(status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        # ctx = request.GET.getlist('ctx')[0]
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not _is_collaborator(request, collab_id):
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
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not _is_collaborator(request, collab_id):
            return HttpResponseForbidden()

        serializer_context = {'request': request,}
        serializer = ScientificModelInstanceSerializer(data=request.data, context=serializer_context)
        if serializer.is_valid():        
            serializer.save(model_id=request.data['model_id'])
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, format=None):
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not _is_collaborator(request, collab_id):
            return HttpResponseForbidden()


        for instance in request.data:
            model_instance = ScientificModelInstance.objects.get(id=instance['id'])
            serializer_context = {'request': request,}

            model_serializer = ScientificModelInstanceSerializer(model_instance, data=instance, context=serializer_context)
            if model_serializer.is_valid() :
                model_instance = model_serializer.save()
            else: 
                return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response( status=status.HTTP_201_CREATED) 



class ScientificModelImageRest (APIView):

    def post(self, request, format=None):
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not _is_collaborator(request, collab_id):
            return HttpResponseForbidden()

        serializer_context = {'request': request,}
        serializer = ScientificModelImageSerializer(data=request.data['model_image'], context=serializer_context)
        if serializer.is_valid():        
            serializer.save(model_id=request.data['model_id'])
            return Response(status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, format=None):
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not _is_collaborator(request, collab_id):
            return HttpResponseForbidden()

        for image in request.data:
            model_image = ScientificModelImage.objects.get(id=image['id'])
            serializer_context = {'request': request,}
            # check if data is ok else return error
            model_serializer = ScientificModelImageSerializer(model_image, data=image, context=serializer_context)
            if model_serializer.is_valid() :
                model_image = model_serializer.save()
            else: 
                return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response( status=status.HTTP_202_ACCEPTED) 

    def delete(self, request, format=None):
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not _is_collaborator(request, collab_id):
            return HttpResponseForbidden()

        image = ScientificModelImage.objects.get(id=request.query_params['id']).delete()
        return Response( status=status.HTTP_200_OK) 




class ScientificModelRest(APIView):
    def get(self, request, format=None, **kwargs):
        serializer_context = {
            'request': request,
        }


        #if model id not specified
        if(len(request.GET.getlist('id')) == 0):

            web_app = request.GET.getlist('web_app')
            name =request.GET.getlist('name')
            description =request.GET.getlist('description')
            species =request.GET.getlist('species')
            brain_region =request.GET.getlist('brain_region')
            cell_type =request.GET.getlist('cell_type')
            author =request.GET.getlist('author')
            model_type =request.GET.getlist('model_type')
            private =request.GET.getlist('private')
            code_format =request.GET.getlist('code_format')
            access_control =request.GET.getlist('access_control')


            #if the request comes from the webapp using collab_parameters
            if len(web_app) > 0 and web_app[0] == 'True' :        
                
                app_id = request.GET.getlist('app_id')[0]
                collab_id = get_collab_id_from_app_id(app_id)

                


                collab_params = CollabParameters.objects.get(id = app_id )

                all_ctx_from_collab = CollabParameters.objects.filter(collab_id = collab_id).distinct()

                if is_authorised(request, collab_id) :
                    rq1 = ScientificModel.objects.filter(
                        private=1,
                        access_control__in=all_ctx_from_collab.values("id"), 
                        species__in=collab_params.species.split(","), 
                        brain_region__in=collab_params.brain_region.split(","), 
                        cell_type__in=collab_params.cell_type.split(","), 
                        model_type__in=collab_params.model_type.split(",")).prefetch_related()
                else :
                    rq1 = []
                    
    
                rq2 = ScientificModel.objects.filter (
                    private=0, 
                    species__in=collab_params.species.split(","), 
                    brain_region__in=collab_params.brain_region.split(","), 
                    cell_type__in=collab_params.cell_type.split(","), 
                    model_type__in=collab_params.model_type.split(",")).prefetch_related()

                if len(rq1) >0:
                    models  = (rq1 | rq2).distinct()
                else:
                    models = rq2
                
                model_serializer = ScientificModelReadOnlySerializer(models, context=serializer_context, many=True )
                return Response({
                'models': model_serializer.data,
                })
            

            else :                 
                q = ScientificModel.objects.all()

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
                if len(access_control) > 0 :
                    q = q.filter(access_control__in = access_control)
                       
                #For each models, check if collab member, if not then just return the publics....
                list_app_id = q.values("access_control").distinct()
                for app_id in list_app_id :
                    app_id = app_id['access_control']
                    collab_id = get_collab_id_from_app_id(app_id)
                    if not is_authorised(request, collab_id) :
                        #exclude it here
                        q.exclude(access_control=app_id, private=1)


                models = q
                model_serializer = ScientificModelFullReadOnlySerializer(models, context=serializer_context, many=True )

                return Response({
                'models': model_serializer.data,
                })

        # a model ID has been specified 
        else:

            #TODO : change all that tu use the FULLREADONLY serializer            
            
            id =request.GET.getlist('id')[0]
            models = ScientificModel.objects.filter(id=id)
            model_instance = ScientificModelInstance.objects.filter(model_id=id)
            model_images = ScientificModelImage.objects.filter(model_id=id)



            #check if private 
            if models.values("private")[0]["private"] == 1 :
                #if private check if collab member
                app_id = models.values("access_control")[0]['access_control']
                collab_id = get_collab_id_from_app_id(app_id)
                if not is_authorised(request, collab_id) :
                    return HttpResponse('Unauthorized', status=401)
            
            model_serializer = ScientificModelReadOnlySerializer(models, context=serializer_context, many=True )
            model_instance_serializer = ScientificModelInstanceSerializer(model_instance, context=serializer_context, many=True )
            model_image_serializer = ScientificModelImageSerializer(model_images, context=serializer_context, many=True )

            return Response({
                'models': model_serializer.data,
                'model_instances': model_instance_serializer.data,
                'model_images': model_image_serializer.data,
            })

    def post(self, request, format=None):

        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not _is_collaborator(request, collab_id):
            return HttpResponseForbidden()

        serializer_context = {'request': request,}
        # check if data is ok else return error
        model_serializer = ScientificModelSerializer(data=request.data['model'], context=serializer_context)
        model_instance_serializer = ScientificModelInstanceSerializer(data=request.data['model_instance'], context=serializer_context)
        if model_serializer.is_valid() is not True:
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if model_instance_serializer.is_valid() is not True:    
            return Response(model_instance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if request.data['model_image']!={}:
            for i in request.data['model_image']:
                model_image_serializer = ScientificModelImageSerializer(data=i, context=serializer_context)  
                if model_image_serializer.is_valid()  is not True:
                    return Response(model_image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # if no error save all 
        # model = model_serializer.save(access_control_id=ctx)
        model = model_serializer.save(access_control_id=app_id)
        model_instance_serializer.save(model_id=model.id)    
        if request.data['model_image']!={}:
            for i in request.data['model_image']: 
                model_image_serializer = ScientificModelImageSerializer(data=i, context=serializer_context)
                if model_image_serializer.is_valid():          
                    model_image_serializer.save(model_id=model.id)

        return Response({'uuid':model.id}, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not _is_collaborator(request, collab_id):
            return HttpResponseForbidden()

        ## save only modifications on model tables. if want to modify images or instances, do separate put.  
        ##get objects 
        value = request.data['models'][0]
        model = ScientificModel.objects.get(id=value['id'])
        serializer_context = {'request': request,}

        # check if data is ok else return error
        model_serializer = ScientificModelSerializer(model, data=value, context=serializer_context)
        if model_serializer.is_valid() :
            model = model_serializer.save()
        else: 
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response( status=status.HTTP_201_CREATED) 



class ValidationTestCodeRest(APIView):

     def get(self, request, format=None, **kwargs):
        serializer_context = {'request': request,}
        nb_id = str(len(request.GET.getlist('id')))
        nb_td_id = str(len(request.GET.getlist('test_definition_id')))

        if nb_id == '0' and nb_td_id == '0':
            tests = ValidationTestCode.objects.all()
        else:
            for key, value in self.request.GET.items():
                if key == 'id':
                    tests = ValidationTestCode.objects.filter(id = value)
                if key == 'test_definition_id':
                    tests = ValidationTestCode.objects.filter(test_definition_id = value)

        test_serializer = ValidationTestCodeSerializer(tests, context=serializer_context, many=True)
        return Response({
            'tests': test_serializer.data,
        })


     def post(self, request, format=None):
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)

        if not _is_collaborator(request, collab_id):
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
        #      return ValidationTestDefinitionWithCodesReadSerializer
         return ValidationTestCodeSerializer



class ValidationTestDefinitionRest(APIView):
    
    def get(self, request, format=None, **kwargs):
        serializer_context = {'request': request,}
        nb_id = str(len(request.GET.getlist('id')))
        
        app_id = request.query_params['app_id']
        collab_id = get_collab_id_from_app_id(app_id)

        if(nb_id == '0'):
            collab_params = CollabParameters.objects.get(id = app_id )

            all_ctx_from_collab = CollabParameters.objects.filter(collab_id = collab_id).distinct()  
            tests= ValidationTestDefinition.objects.filter (
                species__in=collab_params.species.split(","), 
                brain_region__in=collab_params.brain_region.split(","), 
                cell_type__in=collab_params.cell_type.split(","),
                data_modality__in=collab_params.data_modalities.split(","),
                test_type__in=collab_params.test_type.split(",")).prefetch_related().distinct()
        else:
            
            for key, value in self.request.GET.items():
                if key == 'id':
                    tests = ValidationTestDefinition.objects.filter(id = value)

        test_serializer = ValidationTestDefinitionSerializer(tests, context=serializer_context, many=True)

        return Response({
            'tests': test_serializer.data,
        })


    def post(self, request, format=None):
        # ctx = request.GET.getlist('ctx')[0]
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)
        if not _is_collaborator(request, collab_id):
            return HttpResponseForbidden()

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
        
        return Response(status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        app_id = request.GET.getlist('app_id')[0]
        collab_id = get_collab_id_from_app_id(app_id)
        if not _is_collaborator(request, collab_id):
            return HttpResponseForbidden()
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
        logger.debug("*** TestCommentRest get ***")
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

        if not _is_collaborator(request, collab_id):
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
        if not _is_collaborator(request, collab_id):
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
        
        is_member = _is_collaborator(request, collab_id) 
        

        return Response({
            'is_member':  is_member,
        })


class ValidationResultRest (APIView):
    def get(self, request, format=None, **kwargs):
        serializer_context = {'request': request,}

        test_result_id = request.query_params['id']

        validation_result =  ValidationTestResult.objects.get(id = test_result_id )
        result_serializer = ValidationTestResultReadOnlySerializer(validation_result, context=serializer_context) 
        
        return Response({
            'data': result_serializer.data,
        })

class ValidationModelResultRest (APIView):
    def get(self, request, format=None, **kwargs):
        serializer_context = {'request': request,}
        model_id  = request.query_params['model_id']
        # list_test_id  = request.query_params['list_id']

        try :      
            model_instances = ScientificModelInstance.objects.filter(model_id=model_id).values("id")
        except:    
            model_instances = [ScientificModelInstance.objects.get(model_id= model_id).id]

        results_all= ValidationTestResult.objects.filter(model_instance_id__in = model_instances )
        versions_id = list(results_all.values("test_definition_id").distinct())
        ##if list_test_id == [] (default) return last version code of each test 
#         if list_test_id == []:
#             test_def_id = 
#             versions_id = results_all.order_by('test_definition_id',''). 
# Score.objects.order_by('student__username', '-date').distinct('student__username')
        result_serialized=[]
        new_id = []
        for version in versions_id:
            r = results_all.filter(test_definition_id = version['test_definition_id'])
            r_serializer = ValidationModelResultReadOnlySerializer(r, context = serializer_context, many=True)
            result_serialized.append(r_serializer.data)  
            #change the label to generalize datablock_id
            new_id.append({"id":version['test_definition_id']})

        return Response({
            'data': result_serialized,
            'data_block_id':new_id,
        })    

class ValidationTestResultRest (APIView):
    def get(self, request, format=None, **kwargs):

        serializer_context = {'request': request,}
        
        test_definition_id = request.query_params['test_id']

        try : 
            test_codes = ValidationTestCode.objects.filter(test_definition_id= test_definition_id).values("id")
        except:
            test_codes = [ValidationTestCode.objects.get(test_definition_id= test_definition_id).id]   
        #need to rename in model test_code_id
        results_all = ValidationTestResult.objects.filter(test_definition_id__in = test_codes)
        model_instance_id = list(results_all.values("model_instance_id").distinct())
        result_serialized = []
        new_id = []
        for model_instance in model_instance_id:
            r = results_all.filter(model_instance_id = model_instance['model_instance_id'])
            r_serializer = ValidationTestResultReadOnlySerializer(r, context = serializer_context, many=True)

            result_serialized.append(r_serializer.data)  
            #change the label to generalize datablock_id
            new_id.append({"id":model_instance['model_instance_id']})

        return Response({
            'data': result_serialized,
            'data_block_id': new_id,
        })

class ParametersConfigurationView(View):
    
    template_name = "configuration/parameters-configuration.html"
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)



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
