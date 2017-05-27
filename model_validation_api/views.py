"""


"""

import json
import logging
from urlparse import urlparse, parse_qs
from datetime import date
from django.shortcuts import render
from django.forms.models import model_to_dict
from django.views.generic import View, ListView, DetailView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import (HttpResponse, JsonResponse,
                         HttpResponseBadRequest,     # 400
                         HttpResponseForbidden,      # 403
                         HttpResponseNotFound,       # 404
                         HttpResponseNotAllowed,     # 405
                         HttpResponseNotModified,    # 304
                         HttpResponseRedirect)       # 302
from django.core.serializers.json import DjangoJSONEncoder
from django.conf import settings
import requests
from hbp_app_python_auth.auth import get_access_token, get_auth_header

from .models import (ValidationTestDefinition, ValidationTestCode,
                     ValidationTestResult, ScientificModelInstance, ScientificModel)
from .forms import ValidationTestDefinitionForm, ScientificModelForm, ScientificTestForm, ValidationTestResultForm

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


class ValidationTestDefinitionSerializer(object):

    @staticmethod
    def _to_dict(test, version=None):
        resource_uri = "/tests/{}".format(test.pk)
        if version is None:
            try:
                code_obj = ValidationTestCode.objects.filter(test_definition=test).latest()
                version = code_obj.pk
            except ValidationTestCode.DoesNotExist:
                code_obj = None
        else:
            code_obj = ValidationTestCode.objects.get(pk=version, test_definition=test)
        if code_obj:
            resource_uri += "?version={}".format(version)
            code = {
                "repository": code_obj.repository,
                "version": code_obj.version,  # note that this is the Git version, not the object version
                "path": code_obj.path,
            }
        else:
            code = None
        data = {
            "name": test.name,
            "species": test.species,
            "brain_region": test.brain_region,
            "cell_type": test.cell_type,
            "age": test.age,
            "data_location": test.data_location,
            "data_type": test.data_type,
            "data_modality": test.data_modality,
            "test_type": test.test_type,
            "protocol": test.protocol,
            "code": code,
            "author": test.author,
            "publication": test.publication,
            "resource_uri": resource_uri
        }
        return data

    @classmethod
    def serialize(cls, tests, version=None):
        if isinstance(tests, ValidationTestDefinition):
            data = cls._to_dict(tests, version=version)
        else:
            data = [cls._to_dict(test) for test in tests]
        encoder = DjangoJSONEncoder(ensure_ascii=False, indent=4)
        return encoder.encode(data)


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

class ValidationTestDefinitionCreate(DetailView): 
    template_name = "simple_test_create.html"
    model = ValidationTestDefinition
    form_class = ValidationTestDefinitionForm

    serializer = ValidationTestDefinitionSerializer
    login_url='/login/hbp/'


    def get(self, request, *args, **kwargs):

        

        h = ValidationTestDefinition()
        form = self.form_class(instance = h)

        return render(request, self.template_name, {'form': form, })


    def post(self, request, *args, **kwargs):
        """Add a test"""
        # if not is_admin(request):
        #     return HttpResponseForbidden("You do not have permission to add a test.")
        #  form = ValidationTestDefinitionForm(json.loads(request.body))

        test_creation = ValidationTestDefinition()
        form = self.form_class(request.POST, instance=test_creation)

        if form.is_valid():
            test = form.save()
            content = self.serializer.serialize(test)
            return HttpResponse(content, content_type="application/json; charset=utf-8", status=201)
        else:
            print(form.data)
            return HttpResponseBadRequest(str(form.errors))  # todo: plain text

    # @classmethod    
    # def redirect(self, request, *args, **kwargs): ### use to go back to TicketListView directly after creating a ticket
    #     url = reverse('ticket-list2', kwargs = {'ctx': kwargs['ctx']})

    #     return HttpResponseRedirect(url)

        # def post(self, request, *args, **kwargs):
        # ticket_creation = Ticket()
        # ticket_creation.ctx = get_object_or_404(Ctx, ctx=self.kwargs['ctx'])
        # form = self.form_class(request.POST, instance=ticket_creation)

        # if form.is_valid():
        #     form = form.save(commit=False)
        #     form.author = request.user
        #     form.save()
        #     return self.redirect(request, ctx = self.kwargs['ctx'])
        # return render(request, self.template_name, {'form': form, 'ctx': self.kwargs['ctx'], 'collab_name':get_collab_name(self.kwargs['ctx'])})


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



class SimpleTestListView(LoginRequiredMixin, ListView):
    model = ValidationTestDefinition
    template_name = "simple_test_list.html"
    login_url='/login/hbp/'           

    def get_queryset(self):
        logger.debug("SimpleTestListView - get_queryset" + str(self.request.GET.items()))
        filters = {}
        if self.request.META['QUERY_STRING'].startswith("search="):
            search = ""
            search_cat = ""
            for key, value in self.request.GET.items():
                if key == 'search':
                    search = value
                if key == 'search_cat':
                    search_cat = value
            print(search_cat, search)
            if search_cat in VALID_FILTER_NAMES:
                filters[search_cat + "__icontains"] = search
        else :
            for key, value in self.request.GET.items():
                print(key, value)
                if key in VALID_FILTER_NAMES:
                    filters[key + "__icontains"] = value
        return ValidationTestDefinition.objects.filter(**filters)


    def get_context_data(self, **kwargs):
        context = super(SimpleTestListView, self).get_context_data(**kwargs)
        context["section"] = "tests"
        return context


class SimpleTestDetailView(LoginRequiredMixin, DetailView):
    model = ValidationTestDefinition
    template_name = "simple_test_detail.html"
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

class SimpleTestEditView(DetailView):
    model = ValidationTestDefinition
    form_class = ScientificTestForm
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
        return render(request, self.template_name, {'form': form, 'object':h})
    
    def post(self, request, *args, **kwargs):
        m = self.get_object()
        form = self.form_class(request.POST, instance=m)
        if form.is_valid():
            form = form.save(commit=False)
            form.save()
            return render(request, "simple_test_detail.html", {'form': form, "object": m})
        return render(request, self.template_name, {'form': form, "object": m})


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


class ScientificModelSerializer(object):

    @staticmethod
    def _to_dict(model):
        data = {
            "name": model.name,
            "description": model.description,
            "species": model.species,
            "brain_region": model.brain_region,
            "cell_type": model.cell_type,
            "author": model.author,
            "source": model.source,
            "resource_uri": "/models/{}".format(model.pk)
        }
        return data

    @classmethod
    def serialize(cls, models):
        if isinstance(models, ScientificModel):
            data = cls._to_dict(models)
        else:
            data = [cls._to_dict(model) for model in models]
        encoder = DjangoJSONEncoder(ensure_ascii=False, indent=4)
        return encoder.encode(data)



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












#class SimpleResultCreateView(View):  
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










class ScientificModelResource(View):
    serializer = ScientificModelSerializer
    login_url='/login/hbp/'

    def _get_model(self, model_id):
        try:
            model = ScientificModel.objects.get(pk=model_id)
        except ScientificModel.DoesNotExist:
            model = None
        return model

    def get(self, request, *args, **kwargs):
        """View a model"""
        model = self._get_model(kwargs["model_id"])
        if model is None:
            return HttpResponseNotFound("No such result")
        content = self.serializer.serialize(model)
        return HttpResponse(content, content_type="application/json; charset=utf-8", status=200)


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

    # def get(self, request, *args, **kwargs):
    #     if request.META['QUERY_STRING'].startswith("search="):
    #         self.object_list = ScientificModel.objects.filter(name__contains=request.META['QUERY_STRING'][7:])
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
        return context





class SimpleModelDetailView(LoginRequiredMixin, DetailView):
    model = ScientificModel
    template_name = "simple_model_detail.html"
    login_url='/login/hbp/'

    def get_context_data(self, **kwargs):
        context = super(SimpleModelDetailView, self).get_context_data(**kwargs)
        context["section"] = "models"
        context["build_info"] = settings.BUILD_INFO
        return context

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
        return render(request, self.template_name, {'form': form, 'object':h})
    
    def post(self, request, *args, **kwargs):
        m = self.get_object()
        form = self.form_class(request.POST, instance=m)
        if form.is_valid():
            form = form.save(commit=False)
            form.save()
            return render(request, "simple_model_detail.html", {'form': form, "object": m})
        return render(request, self.template_name, {'form': form, "object": m})


class SimpleModelCreateView(View):
    model = ScientificModel
    template_name = "simple_model_create.html"
    login_url='/login/hbp/'
    form_class = ScientificModelForm

    def get(self, request, *args, **kwargs):
        h = ScientificModel()
        form = self.form_class(instance = h)
        return render(request, self.template_name, {'form': form})
    
    def post(self, request, *args, **kwargs):
         model_creation = ScientificModel()
         form = self.form_class(request.POST, instance=model_creation)

         if form.is_valid():
            form = form.save(commit=False)
            form.save()
            return HttpResponseRedirect(form.id)
         return render(request, self.template_name, {'form': form})


class SimpleResultListView(LoginRequiredMixin, ListView):
    model = ValidationTestResult
    template_name = "simple_result_list.html"
    login_url='/login/hbp/'

    def get_queryset(self):
        filters = {}
        for key, value in self.request.GET.items():
            if key in VALID_RESULT_FILTERS:
                filters[VALID_RESULT_FILTERS[key]] = value
        print(filters)
        return ValidationTestResult.objects.all().filter(**filters).order_by('-timestamp')

    def get_context_data(self, **kwargs):
        context = super(SimpleResultListView, self).get_context_data(**kwargs)
        context["section"] = "results"
        context["build_info"] = settings.BUILD_INFO

        # create list of model and validation filters
        context["filters"] = {
            "models": ScientificModel.objects.values_list('name', flat=True),
            "tests": ValidationTestDefinition.objects.values_list('name', flat=True)
        }
        return context


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
        import bbp_services.client as bsc
        services = bsc.get_services()
        headers = {
            'Authorization': get_auth_header(self.request.user.social_auth.get())
        }
        url = services['collab_service']['prod']['url'] + "collab/{}/".format(self.object.project)
        response = requests.get(url, headers=headers)
        collab_name = response.json()["title"]
        return collab_name

    def get_collab_storage_url(self):
        import bbp_services.client as bsc
        services = bsc.get_services()
        headers = {
            'Authorization': get_auth_header(self.request.user.social_auth.get())
        }
        url = services['collab_service']['prod']['url'] + "collab/{}/nav/all/".format(self.object.project)
        response = requests.get(url, headers=headers)
        if response.ok:
            nav_items = response.json()
            for item in nav_items:
                if item["app_id"] == "31":  # Storage app
                    return "https://collab.humanbrainproject.eu/#/collab/{}/nav/{}".format(self.object.project, item["id"])
        else:
            return ""

    def get_related_data(self, user):
        # assume for now that data is in collab
        from bbp_client.oidc.client import BBPOIDCClient
        from bbp_client.document_service.client import Client as DocClient
        import bbp_services.client as bsc
        services = bsc.get_services()

        access_token = get_access_token(user.social_auth.get())
        oidc_client = BBPOIDCClient.bearer_auth(services['oidc_service']['prod']['url'], access_token)
        doc_client = DocClient(services['document_service']['prod']['url'], oidc_client)

        parse_result = urlparse(self.object.results_storage)
        if parse_result.scheme == "collab":
            collab_folder = parse_result.path
            #return doc_client.listdir(collab_folder)
            folder_uuid = doc_client.get_standard_attr(collab_folder)['_uuid']
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