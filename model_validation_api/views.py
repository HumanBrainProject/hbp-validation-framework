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
                            ScientificModelInstanceSerializer,
                            ScientificModelImageSerializer,
                            ValidationTestResultSerializer,
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


# def is_admin(request):
#     try:
#         admins = get_admin_list(request)
#     except Exception as err:
#         logger.warning(err.message)
#         return False
#     try:
#         user_id = get_user(request)["id"]
#     except Exception as err:
#         logger.warning(err.message)
#         return False
#     return user_id in admins



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



@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ValidationTestDefinitionResource(View):
    serializer = ValidationTestDefinitionSerializer
    login_url='/login/hbp/'

    def _get_test(self, test_id):
        try:
            test = ValidationTestDefinition.objects.get(pk=test_id)
        except ValidationTestDefinition.DoesNotExist:
            test = None
        return test

    def get(self, request, *args, **kwargs):
        """View a test"""
        test = self._get_test(kwargs["test_id"])
        if test is None:
            return HttpResponseNotFound("No such test")
        code_version = request.GET.get("version", None)
        content = self.serializer.serialize(test, code_version)
        return HttpResponse(content, content_type="application/json; charset=utf-8", status=200)


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ValidationTestDefinitionListResource(View):
    serializer = ValidationTestDefinitionSerializer
    login_url='/login/hbp/'

    # NEEDS UPDATING NOW CODE IS A SEPARATE OBJECT
    def post(self, request, *args, **kwargs):
         """Add a test"""
         # if not is_admin(request):
         #     return HttpResponseForbidden("You do not have permission to add a test.")
         form = ValidationTestDefinitionForm(json.loads(request.body))
         if form.is_valid():
             test = form.save()
             content = self.serializer.serialize(test)
             return HttpResponse(content, content_type="application/json; charset=utf-8", status=201)
         else:
             print(form.data)
             return HttpResponseBadRequest(str(form.errors))  # todo: plain text

    def get(self, request, *args, **kwargs):
        tests = ValidationTestDefinition.objects.all()
        content = self.serializer.serialize(tests)
        return HttpResponse(content, content_type="application/json; charset=utf-8", status=200)


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ValidationTestDefinitionCreate(DetailView): 
    template_name = "simple_test_create.html"
    model = ValidationTestDefinition
    form_class = ValidationTestDefinitionForm
    form_class_code = ValidationTestCodeForm
    serializer = ValidationTestDefinitionSerializer
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):    
        h = ValidationTestDefinition()
        form = self.form_class(instance = h)
        c = ValidationTestCode()
        formcode  = self.form_class_code(instance = c)
        return render(request, self.template_name, {'form': form, 'formcode':formcode })

    def post(self, request, *args, **kwargs):
        """Add a test"""
        # if not is_admin(request):
        #     return HttpResponseForbidden("You do not have permission to add a test.")
        #  form = ValidationTestDefinitionForm(json.loads(request.body))

        test_creation = ValidationTestDefinition()
        form = self.form_class(request.POST, instance=test_creation)
        test_code_creation = ValidationTestCode()

        if form.is_valid():
            #TODO :  add some check to verify that repository/path/version are correct. 
                    #possible to combine 2 models in one form ? yep :-) it is done
                form = form.save()
                test_code_creation.test_definition = ValidationTestDefinition.objects.get(id = form.id)
                test_code_creation.repository = request.POST.get("repository", None)
                test_code_creation.path = request.POST.get("path", None)
                test_code_creation.version = request.POST.get("version", None)
                test_code_creation.save()
                return self.redirect(request, pk=form.id)
        else:
            return render(request, self.template_name, {'form': form, 'formcode': formcode})  # todo: plain text

    @classmethod    
    def redirect(self, request, *args, **kwargs): ### use to go back to Test detail View
        # url = reverse('simple-detail-view', kwargs = {'pk': kwargs['pk']})
        url = reverse('simple-detail-view', kwargs = {'pk': kwargs['pk']})
        
        return HttpResponseRedirect(url)


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ValidationTestDefinitionSearchResource(View):
    serializer = ValidationTestDefinitionSerializer
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):
        filters = {}
        for key, value in request.GET.items():
            if key not in VALID_FILTER_NAMES:
                return HttpResponseBadRequest("{} is not a valid filter".format(key))
            else:
                filters[key + "__contains"] = value  # should handle multiple values
        tests = ValidationTestDefinition.objects.filter(**filters)
#        raise Exception(str(filters))
        content = self.serializer.serialize(tests)
        return HttpResponse(content, content_type="application/json; charset=utf-8", status=200)


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleTestListView(LoginRequiredMixin, ListView):
    model = ValidationTestDefinition
    template_name = "simple_test_list.html"
    login_url='/login/hbp/'           

    def get_queryset(self):
        # print("SimpleTestListView - get_queryset" + str(self.request.GET.items()))
        filters = {}
        if self.request.META['QUERY_STRING'].startswith("search="):
            search = ""
            search_cat = ""
            for key, value in self.request.GET.items():
                if key == 'search':
                    search = value
                if key == 'search_cat':
                    search_cat = value
            # print(search_cat, search)
            if search_cat in VALID_FILTER_NAMES:
                filters[search_cat + "__icontains"] = search
            else :
                for item in VALID_FILTER_NAMES:
                    filters[item + "__icontains"] = search
                    name_list = ValidationTestDefinition.objects.filter(name__contains=search)
                    species_list = ValidationTestDefinition.objects.filter(species__contains=search)
                    age_list = ValidationTestDefinition.objects.filter(age__contains=search)
                    brain_region_list = ValidationTestDefinition.objects.filter(brain_region__contains=search)
                    cell_type_list = ValidationTestDefinition.objects.filter(cell_type__contains=search)
                    data_location_list = ValidationTestDefinition.objects.filter(data_location__contains=search)
                    data_type_list = ValidationTestDefinition.objects.filter(data_type__contains=search)
                    data_modality_list = ValidationTestDefinition.objects.filter(data_modality__contains=search)
                    test_type_list = ValidationTestDefinition.objects.filter(test_type__contains=search)
                    author_list = ValidationTestDefinition.objects.filter(author__contains=search)
                    publication_list = ValidationTestDefinition.objects.filter(publication__contains=search)

                    self.object_list = (name_list|species_list|age_list|brain_region_list|cell_type_list|data_location_list|data_type_list|data_modality_list|test_type_list|author_list|publication_list).distinct()
                    return self.object_list
        else :
            for key, value in self.request.GET.items():
                search = value
                filters[key + "__icontains"] = search

        return ValidationTestDefinition.objects.filter(**filters)


    def get_context_data(self, **kwargs):
        context = super(SimpleTestListView, self).get_context_data(**kwargs)
        context["section"] = "tests"
        context["filters"] = {
            "species": ValidationTestDefinition.objects.values_list('species', flat=True).distinct(),
            "brain_region": ValidationTestDefinition.objects.values_list('brain_region', flat=True).distinct(),
            "cell_type": ValidationTestDefinition.objects.values_list('cell_type', flat=True).distinct(),
        }

        return context


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleTestDetailView(LoginRequiredMixin, DetailView):
    model = ValidationTestDefinition
    template_name = "simple_test_detail.html"
    # template_name = "test_view.html"
    
    login_url='/login/hbp/'

    def get_context_data(self, **kwargs):
        context = super(SimpleTestDetailView, self).get_context_data(**kwargs)
        context["section"] = "tests"
        publication_field = context["object"].publication
        if publication_field.startswith("doi:"):
            crossref_metadata = self._get_crossref_metadata(publication_field)
            context["publication_detail"] = crossref_metadata
            if crossref_metadata:
                context["formatted_publication"] = self._format_publication(crossref_metadata)
        print (context)
        return context

    def _get_crossref_metadata(self, publication_field):
        prefix, doi = publication_field.split(":")
        try:
            response = requests.get(CROSSREF_URL + doi)
        except requests.ConnectionError:
            logger.warning("Unable to retrieve metadata for DOI {}".format(doi))
            return {}
        if response.ok:
            return response.json()['message']
        else:
            logger.warning("Unable to retrieve metadata for DOI {}".format(doi))
            return {}

    def _format_publication(self, pub_data):
        for author in pub_data["author"]:
            author["initials"] = "".join([name[0] for name in author["given"].split()])
        authors = [u"{family} {initials}".format(**author)
                   for author in pub_data["author"]]
        pub_data["authors"] = u", ".join(authors[:-1]) + u" and " + authors[-1]
        pub_data["year"] = pub_data["created"]["date-parts"][0][0]
        template = u"{authors} ({year}) {title[0]}. {short-container-title[0]} {volume}:{page} {URL}"
        return template.format(**pub_data)

@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class NewSimpleTestDetailView(LoginRequiredMixin, DetailView):
    model = ValidationTestDefinition
    template_name = "simple_test_detail.html"
    form_class = CommentForm

    def get(self, request, *args, **kwargs):
        validation_code = ValidationTestCode.objects.filter(test_definition_id = self.kwargs['pk'])
        test = ValidationTestDefinition.objects.get(id = self.kwargs['pk'])

        comment = Comment.objects.filter(test = self.kwargs['pk'])

        cmt = Comment()
        form = self.form_class(instance = cmt)
        
        return render(request, self.template_name, {'form': form, 'validation_code':validation_code, 'test':test, 'comment':comment})


    def post(self, request, *args, **kwargs):
        validation_code = ValidationTestCode.objects.filter(test_definition_id = self.kwargs['pk'])
        test = ValidationTestDefinition.objects.get(id = self.kwargs['pk'])
        comment = Comment.objects.filter(test = self.kwargs['pk'])

        if request.POST.get('action', None) == 'edit_comment':
            form=self.edit_comment(request)
        else:    
            comment_creation = Comment()
            comment_creation.test = get_object_or_404(ValidationTestDefinition, pk=self.kwargs['pk'])      
       
            if request.method == 'POST':
                form = CommentForm(request.POST, instance=comment_creation)

                if form.is_valid(): 
                    form = form.save(commit=False)
                    form.author = request.user
                    form.save()
           
        cmt = Comment()
        form = self.form_class(instance = cmt)
                
        return render(request, self.template_name, {'form': form, 'validation_code':validation_code, 'test':test, 'comment':comment})


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleTestEditView(DetailView):
    model = ValidationTestDefinition
    form_class = ValidationTestDefinitionForm
    template_name = "simple_test_edit.html"
    login_url='/login/hbp/'

    def get_context_data(self, **kwargs):
        context = super(SimpleTestEditView, self).get_context_data(**kwargs)
        context["section"] = "models"
        context["build_info"] = settings.BUILD_INFO
        return context

    def get(self, request, *args, **kwargs):
        print(self.get_object().id)
        h = ValidationTestDefinition.objects.get(id = self.get_object().id)
        form = self.form_class(instance = h)
        # print(str(form))
        return render(request, self.template_name, {'form': form, 'object':h})
    
    def post(self, request, *args, **kwargs):
        m = self.get_object()
        form = self.form_class(request.POST, instance=m)
        if form.is_valid():
            form = form.save(commit=False)
            form.save()
            return self.redirect(request, pk=m.id)
            # return render(request, "simple_test_detail.html", {'form': form, "object": m})
        return render(request, self.template_name, {'form': form, "object": m})

    @classmethod    
    def redirect(self, request, *args, **kwargs): 
        url = reverse("simple-detail-view", kwargs = { 'pk':kwargs['pk']})
        return HttpResponseRedirect(url)



@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
# class ScientificModelResource(View):
#     serializer = ScientificModelSerializer
#     login_url='/login/hbp/'

#     def _get_model(self, model_id):
#         try:
#             model = ScientificModel.objects.get(pk=model_id)
#         except ScientificModel.DoesNotExist:
#             model = None
#         return model

#     def get(self, request, *args, **kwargs):
#         """View a model"""
#         model = self._get_model(kwargs["model_id"])
#         if model is None:
#             return HttpResponseNotFound("No such result")
#         content = self.serializer.serialize(model)
#         return HttpResponse(content, content_type="application/json; charset=utf-8", status=200)

@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class AddImage(View):
    model = ScientificModelImage
    template_name = "modal.html"
    login_url='/login/hbp/'
    form_class = ScientificModelImageForm

    def get(self, request, *args, **kwargs):
        h = ScientificModelImage()
        form = self.form_class(instance = h)
        return render(request, self.template_name, {'form': form})



@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ScientificModelListResource(View):
    serializer = ScientificModelSerializer
    login_url='/login/hbp/'

    def post(self, request, *args, **kwargs):
         """Add a model"""
         print ("ScientificModelListResource POST")
         # if not is_admin(request):
         #     return HttpResponseForbidden("You do not have permission to add a result.")
         form = ScientificModelForm(json.loads(request.body))
         if form.is_valid():
             model = form.save()
             content = self.serializer.serialize(model)
             return HttpResponse(content, content_type="application/json; charset=utf-8", status=201)
         else:
             print(form.data)
             return HttpResponseBadRequest(str(form.errors))  # todo: plain text

    def get(self, request, *args, **kwargs):
        print ("ScientificModelListResource GET")
        
        models = ScientificModel.objects.all()
        content = self.serializer.serialize(models)
        return HttpResponse(content, content_type="application/json; charset=utf-8", status=200)


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleModelListView(LoginRequiredMixin, ListView):
    model = ScientificModel
    template_name = "simple_model_list.html"
    login_url='/login/hbp/'
    
    def get_queryset(self):
        filters = {}

        for key, value in self.request.GET.items():
            if key in VALID_MODEL_FILTER_NAMES:
                filters[key + "__icontains"] = value

        return ScientificModel.objects.filter(**filters)

    def get(self, request, *args, **kwargs):
        if request.META['QUERY_STRING'].startswith("search="):
            name_list = ScientificModel.objects.filter(name__contains=request.META['QUERY_STRING'][7:])
            species_list =  ScientificModel.objects.filter(species__contains=request.META['QUERY_STRING'][7:])
            brain_region_list =  ScientificModel.objects.filter(brain_region__contains=request.META['QUERY_STRING'][7:])
            cell_type_list = ScientificModel.objects.filter(cell_type__contains=request.META['QUERY_STRING'][7:])
            author_list = ScientificModel.objects.filter(author__contains=request.META['QUERY_STRING'][7:])
            self.object_list = (name_list|species_list|brain_region_list|cell_type_list|author_list).distinct()

        else:
            self.object_list = self.get_queryset()
        context = self.get_context_data()
        return self.render_to_response(context)


    def get_context_data(self, **kwargs):
        context = super(SimpleModelListView, self).get_context_data(**kwargs)
        context["section"] = "models"
        context["build_info"] = settings.BUILD_INFO
        context["filters"] = {
            "species": ScientificModel.objects.values_list('species', flat=True).distinct(),
            "brain_region": ScientificModel.objects.values_list('brain_region', flat=True).distinct(),
            "cell_type": ScientificModel.objects.values_list('cell_type', flat=True).distinct(),
        }
        return context


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleModelDetailView(LoginRequiredMixin, DetailView):
    model = ScientificModel
    template_name = "simple_model_detail.html"
    login_url='/login/hbp/'

    def get_context_data(self, **kwargs):
        context = super(SimpleModelDetailView, self).get_context_data(**kwargs)
        context["section"] = "models"
        context["build_info"] = settings.BUILD_INFO
        return context


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleModelEditView(DetailView):
    model = ScientificModel
    form_class = ScientificModelForm
    template_name = "simple_model_edit.html"
    login_url='/login/hbp/'

    def get_context_data(self, **kwargs):
        context = super(SimpleModelEditView, self).get_context_data(**kwargs)
        context["section"] = "models"
        context["build_info"] = settings.BUILD_INFO
        return context

    def get(self, request, *args, **kwargs):
        print(self.get_object().id)
        h = ScientificModel.objects.get(id = self.get_object().id)
        form = self.form_class(instance = h)
        # print(str(form))
        return render(request, self.template_name, {'form': form, 'object':h})
    
    def post(self, request, *args, **kwargs):
        m = self.get_object()
        form = self.form_class(request.POST, instance=m)
        if form.is_valid():
            form = form.save(commit=False)
            form.save()
            return self.redirect(request, pk=m.id)
        return render(request, self.template_name, {'form': form, "object": m})
    
    @classmethod    
    def redirect(self, request, *args, **kwargs): 
        url = reverse("simple-model-detail-view", kwargs = { 'pk':kwargs['pk']})
        return HttpResponseRedirect(url)


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleModelVersionView(DetailView):
    model = ScientificModelInstance
    form_class = ScientificModelInstanceForm
    template_name = "simple_model_version.html"
    login_url='/login/hbp/'

    def get_context_data(self, **kwargs):
        context = super(SimpleModelVersionView, self).get_context_data(**kwargs)
        context["section"] = "models"
        context["build_info"] = settings.BUILD_INFO
        return context

    def get(self, request, *args, **kwargs):
        qs = request.META['QUERY_STRING']
        if qs.startswith("modelID="):
            model_id = qs[8:] 
            h = ScientificModel.objects.get(id=model_id)
        else: 
            h = ScientificModel()
        instance = ScientificModelInstance()
        instance.model = h
        form = self.form_class(instance = instance)
        return render(request, self.template_name, {'form': form, 'object':h})
    
    def post(self, request, *args, **kwargs):

        form = self.form_class(request.POST)
        if form.is_valid():
            form = form.save(commit=False)
            form.save()
            return self.redirect(request, pk=form.model.id)
        return render(request, self.template_name, {'form': form})

    @classmethod    
    def redirect(self, request, *args, **kwargs): 
        url = reverse("simple-model-detail-view", kwargs = { 'pk':kwargs['pk']})
        return HttpResponseRedirect(url)


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleModelCreateView(View):
    model = ScientificModel
    template_name = "simple_model_create.html"
    login_url='/login/hbp/'
    form_class = ScientificModelForm
    form_class_instance = ScientificModelInstanceForm
    form_class_image = ScientificModelImageForm
    serializer = ScientificModelSerializer
    def get(self, request, *args, **kwargs):
        h = ScientificModel()
        form = self.form_class(instance = h)
        model_instance = ScientificModelInstance()
        form_instance = self.form_class_instance(instance=model_instance)
        model_image = ScientificModelImage()
        form_image = self.form_class_image(instance = model_image)
        return render(request, self.template_name, {'form': form, 'form_instance': form_instance, 'form_image': form_image})
    
    def post(self, request, *args, **kwargs):
         model_creation = ScientificModel()
         form = self.form_class(request.POST, instance=model_creation)
         if form.is_valid():
            form = form.save(commit=False)
            form.access_control = 2180 #self.get_collab_id()
            form.save()
            # content = self.serializer.serialize(form)
            model_instance = ScientificModelInstance(model = ScientificModel.objects.get(id = form.id))
            form_instance = self.form_class_instance(instance = model_instance)
            form_instance = form_instance.save(commit=False)
            form_instance.model = ScientificModel.objects.get(id = form.id)
            form_instance.source = request.POST.get('source', None)
            form_instance.version = request.POST.get('version', None)
            form_instance.parameters = request.POST.get('parameters', None)
            form_instance.save()
            return HttpResponseRedirect(form.id)
 
         return render(request, self.template_name, {'form': form}, status=400) 
    def get_collab_id(self):
        social_auth = self.request.user.social_auth.get()
        print("social auth", social_auth.extra_data )
        # import hbp_service_client.document_service.client as doc_service_client
        # access_token = get_access_token(self.request.user.social_auth.get())
        # dsc = doc_service_client.Client.new(access_token)

        headers = {
            'Authorization': get_auth_header(self.request.user.social_auth.get())
        }

        #to get collab_id
        svc_url = settings.HBP_COLLAB_SERVICE_URL
        context = self.request.session["next"][6:]
        url = '%scollab/context/%s/' % (svc_url, context)
        res = requests.get(url, headers=headers)
        collab_id = res.json()['collab']['id']
        return collab_id

@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ValidationTestResultResource(View):
    serializer = ValidationTestResultSerializer
    login_url='/login/hbp/'

    def _get_result(self, result_id):
        try:
            result = ValidationTestResult.objects.get(pk=result_id)
        except ValidationTestResult.DoesNotExist:
            result = None
        return result

    def get(self, request, *args, **kwargs):
        """View a result"""
        result = self._get_result(kwargs["result_id"])
        if result is None:
            return HttpResponseNotFound("No such result")
        content = self.serializer.serialize(result)
        return HttpResponse(content, content_type="application/json; charset=utf-8", status=200)


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ValidationTestResultView(View):  
    template_name = "simple_result_new_create.html"
    model = ValidationTestResult 
    form_class = ValidationTestResultForm

    serializer = ValidationTestResultSerializer
    login_url='/login/hbp/'


    def get(self, request, *args, **kwargs):

        h = ValidationTestResult()
        form = self.form_class(instance = h)

        return render(request, self.template_name, {'form': form, })


    def post(self, request, *args, **kwargs):
        """Add a test"""
      
        #result_creation = ValidationTestResult()
        test_creation = ValidationTestResult() 
        #form = self.form_class(request.POST, instance=result_creation)
        form = self.form_class(request.POST, instance=test_creation)

        if form.is_valid():
            form = form.save(commit=False)
            form.save()
            return HttpResponseRedirect(form.id)
        return render(request, self.template_name, {'form': form})


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ValidationTestResultListResource(View):
    serializer = ValidationTestResultSerializer
    login_url='/login/hbp/'

    def post(self, request, *args, **kwargs):
        """Add a result"""
         # if not is_admin(request):
         #     return HttpResponseForbidden("You do not have permission to add a result.")

        data = json.loads(request.body)

        sci_model = ScientificModel.objects.get(pk=data["model_instance"]["model_id"])
        model_instance, created = ScientificModelInstance.objects.get_or_create(model=sci_model,
                                                                            version=data["model_instance"]["version"],
                                                                            parameters=data["model_instance"]["parameters"])
        test_uri = data["test_definition"]
        parsed_uri = urlparse(test_uri)
        test_id = int(parsed_uri.path.split("/")[-1])
        test_instance_id = int(parse_qs(parsed_uri.query)['version'][0])
        test_instance = ValidationTestCode.objects.get(pk=test_instance_id)
        assert test_instance.test_definition.pk == test_id, "{} != {}".format(test_instance.test_definition.pk, test_id)   # sanity check

        new_test_result = ValidationTestResult(model_instance=model_instance,
                                               test_definition=test_instance,
                                               results_storage=data["results_storage"],
                                               result=float(data["result"]),  # should be a Quantity?
                                               passed=data["passed"],
                                               platform=json.dumps(data["platform"]),
                                               project=data.get("project", ""))
        new_test_result.save()
        content = self.serializer.serialize(new_test_result)
        return HttpResponse(content, content_type="application/json; charset=utf-8", status=201)

    def get(self, request, *args, **kwargs):
        results = ValidationTestResult.objects.all()
        content = self.serializer.serialize(results)

        return HttpResponse(content, content_type="application/json; charset=utf-8", status=200)


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleResultListView(LoginRequiredMixin, ListView):
    model = ValidationTestResult
    template_name = "simple_result_list.html"
    login_url='/login/hbp/'

    def get_queryset(self):
        filters = {}
        for key, value in self.request.GET.items():
            if key in VALID_RESULT_FILTERS:
                filters[VALID_RESULT_FILTERS[key]] = value

        return ValidationTestResult.objects.all().filter(**filters).order_by('-timestamp')

    def get_context_data(self, **kwargs):
        context = super(SimpleResultListView, self).get_context_data(**kwargs)
        context["section"] = "results"
        context["build_info"] = settings.BUILD_INFO

        # create list of model and tests filters
        context["filters"] = {
            "models": ScientificModel.objects.values_list('name', flat=True),
            "tests": ValidationTestDefinition.objects.values_list('name', flat=True)
        }
        return context


@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleResultDetailView(LoginRequiredMixin, DetailView):
    
    model = ValidationTestResult
    template_name = "simple_result_detail.html"

    def get_context_data(self, **kwargs):
        context = super(SimpleResultDetailView, self).get_context_data(**kwargs)
        context["section"] = "results"
        context["build_info"] = settings.BUILD_INFO
        context["related_data"] = self.get_related_data(self.request.user)

        if self.object.project:
            context["collab_name"] = self.get_collab_name()
        return context

    def get_collab_name(self):
        # import bbp_services.client as bsc
        # services = bsc.get_services()

        import hbp_service_client.document_service.client as doc_service_client
        access_token = get_access_token(self.request.user.social_auth.get())
        dsc = doc_service_client.Client.new(access_token)

        headers = {
            'Authorization': get_auth_header(self.request.user.social_auth.get())
        }

        #to get collab_id
        svc_url = settings.HBP_COLLAB_SERVICE_URL
        context = self.request.session["next"][6:]
        url = '%scollab/context/%s/' % (svc_url, context)
        res = requests.get(url, headers=headers)
        collab_id = res.json()['collab']['id']

        project = dsc.list_projects(collab_id=collab_id)["results"]

        # url = services['collab_service']['prod']['url'] + "collab/{}/".format(self.object.project)
        # url = services['collab_service']['prod']['url'] + "collab/{}/".format(dsc.list_projects(collab_id=2169)["results"][0]["name"])
        url = "https://services.humanbrainproject.eu/collab/v0/collab/{}/".format(dsc.list_projects(collab_id=collab_id)["results"][0]["name"])
        
        response = requests.get(url, headers=headers)
        collab_name = response.json()["title"]

        return collab_name

    def get_collab_storage_url(self):
        # import bbp_services.client as bsc
        # services = bsc.get_services()

        import hbp_service_client.document_service.client as doc_service_client
        access_token = get_access_token(self.request.user.social_auth.get())
        dsc = doc_service_client.Client.new(access_token)


        headers = {
            'Authorization': get_auth_header(self.request.user.social_auth.get())
        }

        #to get collab_id
        svc_url = settings.HBP_COLLAB_SERVICE_URL
        context = self.request.session["next"][6:]
        url = '%scollab/context/%s/' % (svc_url, context)
        res = requests.get(url, headers=headers)
        collab_id = res.json()['collab']['id']

        project = dsc.list_projects(collab_id=collab_id)["results"]

        # url = services['collab_service']['prod']['url'] + "collab/{}/nav/all/".format(self.object.project)
        url = "https://services.humanbrainproject.eu/collab/v0/collab/{}/nav/all/".format(dsc.list_projects(collab_id=collab_id)["results"][0]["name"])
        

        response = requests.get(url, headers=headers)
        if response.ok:
            nav_items = response.json()
            for item in nav_items:   
                if item["app_id"] == "31":  # Storage app

                    # return "https://collab.humanbrainproject.eu/#/collab/{}/nav/{}".format(self.object.project, item["id"])
                    return "https://collab.humanbrainproject.eu/#/collab/{}/nav/{}".format(dsc.list_projects(collab_id=collab_id)["results"][0]["name"], item["id"])
                    
        else:
            return ""

    def get_related_data(self, user):
        # assume for now that data is in collab

        # from bbp_client.oidc.client import BBPOIDCClient
        # from bbp_client.document_service.client import Client as DocClient
        # import bbp_services.client as bsc
        # services = bsc.get_services()

        # oidc_client = BBPOIDCClient.bearer_auth(services['oidc_service']['prod']['url'], access_token)
        # doc_client = DocClient(services['document_service']['prod']['url'], oidc_client) # a remplacer : creer instance de nouvelle classe : hbp_service client

        import hbp_service_client.document_service.client as doc_service_client

        access_token = get_access_token(user.social_auth.get())
        dsc = doc_service_client.Client.new(access_token)

        headers = {
            'Authorization': get_auth_header(user.social_auth.get())
        }

        #to get collab_id
        svc_url = settings.HBP_COLLAB_SERVICE_URL
        context = self.request.session["next"][6:]
        url = '%scollab/context/%s/' % (svc_url, context)
        res = requests.get(url, headers=headers)
        collab_id = res.json()['collab']['id']

        project_dict = dsc.list_projects(collab_id=collab_id)
        
        try :
            dsc.create_folder("folder_test", project_dict["results"][0]["uuid"])

        except:
            print ("folder already exist")     

        parse_result = urlparse(self.object.results_storage)

        # print ("parse result : ")
        # print (parse_result)
        # print ("")

        ###reste a voir ici... je ne comprend pas ce qui doit etre dans parse_result
        if parse_result.scheme == "collab":
        # if 1 :
            list_folder = dsc.list_project_content(project_dict["results"][0]["uuid"])
            # collab_folder = parse_result.path
            collab_folder = list_folder["results"][0]
            
            #return doc_client.listdir(collab_folder)
            # folder_uuid = doc_client.get_standard_attr(collab_folder)['_uuid'] #a remplacer
            folder_uuid = collab_folder["uuid"]
        
            data = {
                "folder": {
                    "path": collab_folder,
                }
            }
            if self.object.project:
                data["folder"]["url"] = self.get_collab_storage_url() + "?state=uuid={}".format(folder_uuid)
            return data
        else:
            print("Storage not yet supported")

        return {}

@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class SimpleResultEditView(View):
    model = ValidationTestResult   
    template_name = "simple_result_create.html"
    login_url='/login/hbp/'
    form_class = ValidationTestResultForm
    serializer = ValidationTestResultSerializer

    def get(self, request, *args, **kwargs):

        h = ValidationTestResult()
        form = self.form_class(instance = h)
        datas = {}
        datas['models'] = list(ScientificModel.objects.all().distinct())
        datas['tests'] = list(ValidationTestDefinition.objects.all().distinct())
        print(datas)
        return render(request, self.template_name, {'form': form, 'datas':datas})


    def post(self, request, *args, **kwargs):
        """Add a test"""
        print('result', request.POST.get("model_select", None))
        result_creation = ValidationTestResult()
        #test_creation = ValidationTestResult() 
        form = self.form_class(request.POST, instance=result_creation)
        #form = self.form_class(request.POST, instance=test_creation)

        if form.is_valid():
            form = form.save(commit=False)
            form.save()
            return HttpResponseRedirect(form.id)
        return render(request, self.template_name, {'form': form})

@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class HomeValidationView(View):
    # model = ValidationTestDefinition
    # template_name = "validation_home.html"
    # login_url='/login/hbp/'

    # def get(self, request, *args, **kwargs):
    #     template = loader.get_template(self.template_name)
    #     return HttpResponse(template.render())


    # model = ValidationTestDefinition
    template_name = "validation_home.html"
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):
        tests = ValidationTestDefinition.objects.all()
        models = ScientificModel.objects.all()
        tests = serializers.serialize("json", tests)
        models = serializers.serialize("json", models) 

        return render(request, self.template_name, { 'tests':tests, 'models':models})


#class AllModelAndTest(APIView):

#     def get(self, request, format=None, **kwargs):
#        models = ScientificModel.objects.all()
#        tests = ValidationTestDefinition.objects.all()

#        serializer_context = {
#            'request': request,
#        }


#        model_serializer = ScientificModelSerializer(models, context=serializer_context, many=True )#data=request.data)
#        test_serializer = ValidationTestDefinitionSerializer(tests, context=serializer_context, many=True)
#        configview_serializer = configviewSerializer(models, context=serializer_context, many=True )#data=request.data)


        #need to transform model_serializer.data :
        # "resource_uri": "/models/{}".format(model.pk)

        #also need to join "code" data throught serializer



#        return Response({
#            'models': model_serializer.data,
#            'tests': test_serializer.data,
#        })

# class TestDetail(APIView):

#     def get(self, request, format=None, **kwargs):
#         serializer_context = {
#             'request': request,
#         }
#         # print (self.kwargs.__dict__)
#         tests = ValidationTestDefinition.objects.filter(id = self.kwargs['id'])
#         test_serializer = ValidationTestDefinitionSerializer(tests, context=serializer_context, many=True)        

#         return Response({
#                     'tests': test_serializer.data,
#                 })


class AuthorizedCollabParameterRest(APIView):
    
    def get(self, request, format=None, **kwargs):
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


class CollabParameterRest(APIView):
      
      def get(self, request, format=None, **kwargs):
 
         serializer_context = {'request': request,}
         id = str(len(request.GET.getlist('id')))
 
         if(id == '0'):
             param = CollabParameters.objects.all()
         else:
             for key, value in self.request.GET.items():

                 if key == 'id':
                     param = CollabParameters.objects.filter(id = value)

         param_serializer = CollabParametersSerializer(param, context=serializer_context, many=True)

         return Response({
             'param': param_serializer.data,
         })
 
 
      def post(self, request, format=None):
         serializer_context = {'request': request,}
 
         param_serializer = CollabParametersSerializer(data=request.data, context=serializer_context)
         if param_serializer.is_valid():
             param = param_serializer.save() 
         else:
             return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
         
         return Response(status=status.HTTP_201_CREATED)


      def put(self, request, format=None):
          serializer_context = {'request': request,}

          print ("id : ")
          print( request.GET.getlist('id'))
          #get object with num collab
          param = CollabParameters.objects.get(id = "2" )
          print (param.__dict__)

          print (request.data)

          param_serializer = CollabParametersSerializer(param, data=request.data, context=serializer_context )#, many=True)
        #   print (param_serializer)

          print ("1")
          if param_serializer.is_valid():
              print ("2")
              
              param_serializer.save()
              return Response(param_serializer.data)
          return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class ScientificModelInstanceRest (APIView):
    def post(self, request, format=None):
        serializer_context = {'request': request,}
        serializer = ScientificModelInstanceSerializer(data=request.data, context=serializer_context)
        if serializer.is_valid():        
            serializer.save(model_id=request.data['model_id'])  #need to see how to get this value throught kwargs or other ?
            return Response(status=status.HTTP_201_CREATED) #put inside .is_valid

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ScientificModelRest(APIView):
    
    def get(self, request, format=None, **kwargs):
        serializer_context = {
            'request': request,
        }
        model_id = str(len(request.GET.getlist('id')))

        if(model_id == '0'):
            models = ScientificModel.objects.all()
            model_serializer = ScientificModelSerializer(models, context=serializer_context, many=True )
            return Response({
            'models': model_serializer.data,
            })
        else:
            for key, value in self.request.GET.items():
                if key == 'id':
                    models = ScientificModel.objects.filter(id=value)
                    model_instance = ScientificModelInstance.objects.filter(model_id=value)
                    model_images = ScientificModelImage.objects.filter(model_id=value)
            model_serializer = ScientificModelSerializer(models, context=serializer_context, many=True )#data=request.data)
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
        serializer_context = {'request': request,}
        print('fdeqr')
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
        model = model_serializer.save()
        model_instance_serializer.save(model_id=model.id)    
        if request.data['model_image']!={}:
            for i in request.data['model_image']:          
                model_image_serializer.save(model_id=model.id)

        return Response({'uuid':model.id}, status=status.HTTP_201_CREATED)

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
        serializer_context = {'request': request,}
        test_id = str(len(request.POST.getlist('id')))

        serializer = ValidationTestCodeSerializer(data=request.data, context=serializer_context)
        
        if serializer.is_valid():        
            serializer.save(test_definition_id=test_id)  #need to see how to get this value throught kwargs or other ?
            return Response(status=status.HTTP_201_CREATED) #put inside .is_valid

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

     def get_serializer_class(self):
         print (self.request.method)
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


class TestCommentRest(APIView):
    def get(self, request, format=None, **kwargs):
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

        param_serializer = CollabParametersSerializer(data=request.data['test_data'], context=serializer_context)
        if param_serializer.is_valid():
            param = param_serializer.save() 
        else:
            return Response(param_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_201_CREATED)




def _get_collab_id(self):
    social_auth = self.request.user.social_auth.get()
    print("social auth", social_auth.extra_data )

    headers = {
        'Authorization': get_auth_header(self.request.user.social_auth.get())
    }

    #to get collab_id
    svc_url = settings.HBP_COLLAB_SERVICE_URL
    context = self.request.session["next"][6:]
    url = '%scollab/context/%s/' % (svc_url, context)
    res = requests.get(url, headers=headers)
    collab_id = res.json()['collab']['id']
    return collab_id




# @method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
# class ValidationTestResultEdit(TemplateView): 
#     template_name = "simple_result_edit.html"
#     model = ValidationTestResult
#     form_class = ValidationTestResultForm

#     serializer = ValidationTestResultSerializer
#     login_url='/login/hbp/'

#     def get(self, request, *args, **kwargs):

#         h = ValidationTestResult()
#         form = self.form_class(instance = h)

#         return render(request, self.template_name, {'form': form, })


#     def post(self, request, *args, **kwargs):
#         """Add a result"""
       
#         result_creation = ValidationTestResult()
#         form = self.form_class(request.POST, instance=result_creation)

#         if form.is_valid():
#             result = form.save()
#             content = self.serializer.serialize(test)
#             return HttpResponse(content, content_type="application/json; charset=utf-8", status=201)
#         else:
#             print(form.data)
#             return HttpResponseBadRequest(str(form.errors))  # todo: plain text

# #############################################################
###views for model catalog api
@method_decorator(login_required(login_url='/login/hbp'), name='dispatch' )
class ModelCatalogView(View):

    template_name = "model_catalog.html"
    login_url='/login/hbp/'

    def get(self, request, *args, **kwargs):
        models = ScientificModel.objects.all()
        models = serializers.serialize("json", models) 
        return render(request, self.template_name, {'models':models})

        