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
                        ScientificModelInstance, 
                        ScientificModel, 
                        ScientificModelInstance,
                        ScientificModelImage,   
                        Comment,
                        Param_DataModalities,
                        Param_TestType,
                        Param_Species,
                        Param_BrainRegion,
                        Param_CellType,
                        Param_ModelType,
                        CollabParameters,)


from .forms import (ValidationTestDefinitionForm, 
                        ValidationTestCodeForm,
                        ScientificModelForm,
                        ScientificModelImageForm,  
                        ScientificTestForm, 
                        ValidationTestResultForm, 
                        ScientificModelInstanceForm,
                        CommentForm,
#                        configviewForm,  
                        )

from .serializer import (ValidationTestDefinitionSerializer, 
                            ScientificModelSerializer,
                            ScientificModelReadOnlySerializer, 
                            ScientificModelInstanceSerializer,
                            ScientificModelImageSerializer,
                            ValidationTestResultSerializer,
                            ValidationTestResultReadOnlySerializer,
                            ValidationTestCodeSerializer,
                            ValidationTestDefinitionWithCodesReadSerializer,
                            CommentSerializer,

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



CROSSREF_URL = "http://api.crossref.org/works/"
VALID_FILTER_NAMES = ('name', 'age', 'brain_region', 'cell_type',
                      'data_type', 'data_modality', 'test_type',
                      'author', 'species', 'data_location', 'publication')
VALID_MODEL_FILTER_NAMES = ('brain_region', 'cell_type',
                            'author', 'species')
VALID_RESULT_FILTERS = {
    'model': 'model_instance__model__name__icontains',
    'validation': 'test_definition__test_definition__name__icontains',
    'project': 'project',
    'collab_id': 'project',
    'brain_region': 'test_definition__test_definition__brain_region__icontains',
}

logger = logging.getLogger("model_validation_api")


def get_authorization_header(request):
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    if auth is None:
        try:
#            auth = get_auth_header(request.user.social_auth.get())
            logger.debug("Got authorization from database")
        except AttributeError:
            pass
    # in case of 401 error, need to trap and redirect to login
    else:
        logger.debug("Got authorization from HTTP header")
    return {'Authorization': auth}


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


def is_admin(request):
    try:
        admins = get_admin_list(request)
    except Exception as err:
        logger.warning(err.message)
        return False
    try:
        user_id = get_user(request)["id"]
    except Exception as err:
        logger.warning(err.message)
        return False
    return user_id in admins



# to put inside views
# if not _is_collaborator(request, ctx):
#             return HttpResponseForbidden()
def _is_collaborator(request, context):
    '''check access depending on context'''
    svc_url = settings.HBP_COLLAB_SERVICE_URL
    if not context:
        return False
    url = '%scollab/context/%s/' % (svc_url, context)
    headers = {'Authorization': get_auth_header(request.user.social_auth.get())}
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        return False

    collab_id = res.json()['collab']['id']
    url = '%scollab/%s/permissions/' % (svc_url, collab_id)
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        return False
    return res.json().get('UPDATE', False)


def get_user(request):
    url = "{}/user/me".format(settings.HBP_IDENTITY_SERVICE_URL)
    headers = get_authorization_header(request)
    logger.debug("Requesting user information for given access token")
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        logger.debug("Error" + res.content)
        raise Exception(res.content)
    logger.debug("User information retrieved")
    return res.json()


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class HomeValidationView(View):
    # model = ValidationTestDefinition
    # template_name = "validation_home.html"
    # login_url='/login/hbp/'

    # def get(self, request, *args, **kwargs):
    #     template = loader.get_template(self.template_name)
    #     return HttpResponse(template.render())


    # model = ValidationTestDefinition
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

    # @method_decorator(login_required) #   (login_url='/login/hbp') )
    # @login_required
    # def dispatch(self, *args, **kwargs):
    #     # if not _is_collaborator(request, ctx):
    #     #     return HttpResponseForbidden()     
    #     return super(AuthorizedCollabParameterRest, self).dispatch(*args, **kwargs)




def _get_collab_id(request):
    social_auth = request.user.social_auth.get()
    headers = {
        'Authorization': get_auth_header(request.user.social_auth.get())
    }

    #to get collab_id
    svc_url = settings.HBP_COLLAB_SERVICE_URL    
    context = request.session["next"][6:]
    url = '%scollab/context/%s/' % (svc_url, context)
    res = requests.get(url, headers=headers)
    collab_id = res.json()['collab']['id']
    return collab_id



class CollabIDRest(APIView): 
    def get(self, request, format=None, **kwargs):

        if self.request.user == "AnonymousUser" :
            collab_id = 0
        else :         
            collab_id = _get_collab_id(request)

        return Response({
            'collab_id': collab_id,
        })

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
    print(request.query_params['ctx'])
    social_auth = request.user.social_auth.get()
    headers = {
        'Authorization': get_auth_header(request.user.social_auth.get())
    }
    #to get collab_id
    svc_url = settings.HBP_COLLAB_SERVICE_URL    
    context = request.query_params['ctx']
    url = '%scollab/context/%s/' % (svc_url, context)
    res = requests.get(url, headers=headers)
    app_id = res.json()['id']
    
    return app_id

class ParametersConfigurationRest( APIView): #LoginRequiredMixin, 

    def get(self, request, format=None, **kwargs):

        serializer_context = {'request': request,}
        id = request.GET.getlist('id')[0]
        param = CollabParameters.objects.filter(id = id)
        param_serializer = CollabParametersSerializer(param, context=serializer_context, many=True)

        return Response({
            'param': param_serializer.data,
        })
 

    def post(self, request, format=None):
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
            return HttpResponseForbidden() 


        serializer_context = {'request': request,}
        param_serializer = CollabParametersSerializer(data=request.data, context=serializer_context)
        if param_serializer.is_valid():
            param = param_serializer.save() 
        else:
            return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
         
        return Response(status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
            return HttpResponseForbidden()
        
        serializer_context = {'request': request,}
        id = request.GET.getlist('id')[0]
        param = CollabParameters.objects.get(id = id )
        param_serializer = CollabParametersSerializer(param, data=request.data, context=serializer_context )#, many=True)

        if param_serializer.is_valid():         
            param_serializer.save()
            return Response(param_serializer.data)
        return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # @method_decorator(csrf_exempt)
    # def dispatch(self, *args, **kwargs):
    #     return super(CollabParameterRest, self).dispatch(*args, **kwargs)





class ScientificModelInstanceRest (APIView):
    def post(self, request, format=None):
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
            return HttpResponseForbidden()

        serializer_context = {'request': request,}
        serializer = ScientificModelInstanceSerializer(data=request.data, context=serializer_context)
        if serializer.is_valid():        
            serializer.save(model_id=request.data['model_id'])
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, format=None):
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
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
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
            return HttpResponseForbidden()

        serializer_context = {'request': request,}
        serializer = ScientificModelImageSerializer(data=request.data['model_image'], context=serializer_context)
        if serializer.is_valid():        
            serializer.save(model_id=request.data['model_id'])
            return Response(status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, format=None):
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
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
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
            return HttpResponseForbidden()

        image = ScientificModelImage.objects.get(id=request.query_params['id']).delete()
        return Response( status=status.HTTP_200_OK) 



class ScientificModelRest(APIView):
    def get(self, request, format=None, **kwargs):
        serializer_context = {
            'request': request,
        }
        model_id = str(len(request.GET.getlist('id')))
        ctx = request.query_params['ctx']
        collab = _get_collab_id(request)
        if(model_id == '0'):
            collab_params = CollabParameters.objects.get(id = ctx )

            all_ctx_from_collab = CollabParameters.objects.filter(collab_id = collab).distinct()
            rq1 = ScientificModel.objects.filter(
                private=1,access_control__in=all_ctx_from_collab.values("id"), 
                species__in=collab_params.species.split(","), 
                brain_region__in=collab_params.brain_region.split(","), 
                cell_type__in=collab_params.cell_type.split(","), 
                model_type__in=collab_params.model_type.split(",")).prefetch_related()

            # print(rq1)
            
            rq2 = ScientificModel.objects.filter (
                private=0, species__in=collab_params.species.split(","), 
                brain_region__in=collab_params.brain_region.split(","), 
                cell_type__in=collab_params.cell_type.split(","), 
                model_type__in=collab_params.model_type.split(",")).prefetch_related()

            # print(rq2)

            if len(rq1) >0:
                # models = rq1.union(rq2)
                models  = (rq1 | rq2).distinct()
            else:
                models = rq2
            model_serializer = ScientificModelReadOnlySerializer(models, context=serializer_context, many=True )
            return Response({
            'models': model_serializer.data,
            })
        else:
            for key, value in self.request.GET.items():
                if key == 'id':
                    models = ScientificModel.objects.filter(id=value)
                    model_instance = ScientificModelInstance.objects.filter(model_id=value)
                    model_images = ScientificModelImage.objects.filter(model_id=value)
            model_serializer = ScientificModelReadOnlySerializer(models, context=serializer_context, many=True )#data=request.data)
            model_instance_serializer = ScientificModelInstanceSerializer(model_instance, context=serializer_context, many=True )
            model_image_serializer = ScientificModelImageSerializer(model_images, context=serializer_context, many=True )
        #need to transform model_serializer.data :
        # "resource_uri": "/models/{}".format(model.pk)
            return Response({
                'models': model_serializer.data,
                'model_instances': model_instance_serializer.data,
                'model_images': model_image_serializer.data,
            })
    def post(self, request, format=None):
        ctx = request.query_params['ctx']

        if not _is_collaborator(request, ctx):
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
        model = model_serializer.save(access_control_id=ctx)
        model_instance_serializer.save(model_id=model.id)    
        if request.data['model_image']!={}:
            for i in request.data['model_image']: 
                model_image_serializer = ScientificModelImageSerializer(data=i, context=serializer_context)
                if model_image_serializer.is_valid():          
                    model_image_serializer.save(model_id=model.id)

        return Response({'uuid':model.id}, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
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
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
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

        if(nb_id == '0'):
            tests = ValidationTestDefinition.objects.all()
        else:
            for key, value in self.request.GET.items():
                if key == 'id':
                    tests = ValidationTestDefinition.objects.filter(id = value)

        test_serializer = ValidationTestDefinitionSerializer(tests, context=serializer_context, many=True)

        return Response({
            'tests': test_serializer.data,
        })


    def post(self, request, format=None):
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
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
        ctx = request.query_params['ctx']
        if not _is_collaborator(request, ctx):
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

class TestCommentRest(APIView):
    def get(self, request, format=None, **kwargs):
        logger.debug("*** TestCommentRest get ***")
        serializer_context = {'request': request,}
        nb_id = str(len(request.GET.getlist('id')))
        nb_test_id = str(len(request.GET.getlist('test_id')))

        if nb_id == '0' and nb_test_id == '0':
            comments = Comment.objects.all()
        else:
            for key, value in self.request.GET.items():
                if key == 'id':
                    comments = Comment.objects.filter(id = value)
                if key == 'test_id':
                    logger.info("value : " + value)
                    comments = Comment.objects.filter(test_id = value)

        comment_serializer = CommentSerializer(comments, context=serializer_context, many=True)

        return Response({
            'comments': comment_serializer.data,
        })
  
    def post(self, request, format=None):
        serializer_context = {'request': request,}
        request.data['author'] = str(request.user)

        param_serializer = CommentSerializer(data=request.data, context=serializer_context)
        logger.debug("param_serializer OK")
        if param_serializer.is_valid():
            logger.debug("param_serializer begin")
            param = param_serializer.save(test_id=request.data['test_id'])
            logger.debug("param_serializer save OK")
        else:
            return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        logger.debug("response OK")
        return Response(status=status.HTTP_201_CREATED)


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

        ctx = request.query_params['ctx']
        is_member = _is_collaborator(request, ctx) # bool
        #is_member = True
        return Response({
            'is_member':  is_member,
        })


class ValidationResultRest (APIView):
    def get(self, request, format=None, **kwargs):
        serializer_context = {'request': request,}

        test_result_id = request.query_params['test_result_id']

        validation_result =  ValidationTestResult.objects.get(id = test_result_id )
        result_serializer = ValidationTestResultReadOnlySerializer(validation_result, context=serializer_context, many=True) 
        
        return Response({
            'data': result_serializer.data,
        })

class ValidationModelResultRest (APIView):
    def get(self, request, format=None, **kwargs):
        serializer_context = {'request': request,}
        model_id  = request.query_params['model_id']
        model_instances = ScientificModelInstance.objects.filter(model_id=model_id).values("id")


        results_all= ValidationTestResult.objects.filter(model_instance_id__in = model_instances )
        results_all_serializer =  ValidationTestResultSerializer(results_all,context=serializer_context, many=True)
        versions_id = list(results_all.values("test_definition_id").distinct())

        result_serialized=[]
        for version in versions_id:
            r = results_all.filter(test_definition_id = version['test_definition_id'])
            r_serializer = ValidationTestResultReadOnlySerializer(r, context = serializer_context, many=True)
            result_serialized.append(r_serializer.data)   
        return Response({
            'data': result_serialized,
            'test_versions':versions_id,
        })     

class ValidationTestResultRest (APIView):
    def get(self, request, format=None, **kwargs):

        serializer_context = {'request': request,}

        test_definition_id = request.query_params['test_code_id']
        tab_model_instance_id  = request.GET.getlist('tab_model_instance_id')

 
        validation_result = []

        for model_instance_id in tab_model_instance_id:
            aditional_validation_result =  ValidationTestResult.objects.filter(test_definition_id = test_definition_id, model_instance_id = model_instance_id )
            
            if len(aditional_validation_result) > 0 :
                if len(validation_result) > 0:
                    validation_result = (validation_result | aditional_validation_result)
                else : 
                    validation_result = aditional_validation_result

        result_serializer = ValidationTestResultSerializer(validation_result, context=serializer_context, many=True)


        
        return Response({
            'data': result_serializer.data,
        })


## This is just to make some test with NVD3.js
class ValidationResultRest_fortest (APIView):
    def get(self, request, format=None, **kwargs):
        import json

        with open('app/data_to_test/move_trial0_inh.txt') as data_file:    
            data = json.load(data_file)
        
        new_data = []

        index1 = 0
        for i in data :
            new_data.append([])
            for j in i:

                new_data[index1].append(j[0:-3])  
            index1 += 1 
        
        new_data = new_data[0:10]

        return Response({
            'data': new_data,
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
