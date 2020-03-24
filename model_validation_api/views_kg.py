
import math
import logging

from django.conf import settings
from django.http import (HttpResponse, JsonResponse,
                         HttpResponseBadRequest,     # 400
                         HttpResponseForbidden,      # 403
                         HttpResponseNotFound,       # 404
                         HttpResponseNotAllowed,     # 405
                         HttpResponseNotModified,    # 304
                         HttpResponseRedirect)       # 302

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotAuthenticated

from fairgraph.client import KGClient
from fairgraph.base import KGQuery, as_list
from fairgraph.brainsimulation import (
    ModelProject, ModelInstance, MEModel,
    ValidationTestDefinition as ValidationTestDefinitionKG,
    ValidationScript,
    ValidationResult as ValidationResultKG)

from .serializer.serializer_kg import (
    ScientificModelKGSerializer,
    ScientificModelInstanceKGSerializer,
    ValidationTestDefinitionKGSerializer,
    ValidationTestCodeKGSerializer,
    ValidationTestResultKGSerializer)

from .validation_framework_toolbox.user_auth_functions import (
    is_authorised_or_admin,
    is_hbp_member,
    get_storage_file_by_id,
    get_authorization_header,
    get_user_from_token,
    get_kg_token,
    ADMIN_USERS
)

from .validation_framework_toolbox.validation_framework_functions import (
    check_list_uuid_validity,
    get_collab_id_from_app_id,
    _are_model_instance_version_unique_kg,
    _are_test_code_version_unique_kg,
    _are_test_code_editable_kg,
    _are_model_instance_editable,
    check_param_of_test_json,
    user_has_acces_to_result,
    organise_results_dict_kg,
    _get_nb_pages
)

from .views import _reformat_request_data
from .models import CollabParameters


logger = logging.getLogger("model_validation_api")


def get_full_uri(kg_types, uuid, client):
    if not isinstance(kg_types, (list, tuple)):
        kg_types = [kg_types]
    uris = [kg_type.uri_from_uuid(uuid, client) for kg_type in kg_types]
    if len(kg_types) == 1:
        return uris[0]
    return uris


class KGAPIView(APIView):

    def initial(self, request, *args, **kwargs):
        APIView.initial(self, request, *args, **kwargs)
        auth = get_authorization_header(request).get("Authorization")
        if auth:
            method, token = auth.split(" ")
            logger.debug(token)
        else:
            raise NotAuthenticated()
            #return Response("No authorization token provided", status=status.HTTP_401_UNAUTHORIZED)


        # check that the token is valid by getting user info
        self.user = get_user_from_token(request)
        self.user_token = token  # we need this for communicating with services other than Nexus (e.g. Collab storage)

        kg_token = get_kg_token()  # we need this for communicating with Nexus

        assert method == "Bearer"
        self.client = KGClient(kg_token,
                               nexus_endpoint=settings.NEXUS_ENDPOINT)


class Models_KG(KGAPIView):
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

        #if model id not specified
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
                collab_filter = []

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
                project_filter = request.GET.getlist('project')
                collab_filter = [int(id) for id in request.GET.getlist('collab_id')]

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
            if len(collab_filter) > 0: {
                filter_query["value"].append({
                    "path": "nsg:collabID",
                    "op": "in",
                    "value": collab_filter
                })
            }
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
                logger.info("Searching for ModelProject with the following query: {}".format(filter_query))
                models = KGQuery(ModelProject, {"nexus": filter_query}, context).resolve(self.client, api="nexus", size=10000)
            else:
                models = ModelProject.list(self.client, api="nexus", size=10000)

            logger.debug("{} total models".format(len(as_list(models))))
            authorized_collabs = []
            for collab_id in set(model.collab_id for model in as_list(models) if model.private):
                if self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, collab_id):
                    authorized_collabs.append(collab_id)

            logger.debug("Authorized collabs for user '{}': {}".format(self.user.get("username"), authorized_collabs))
            authorized_models = [model for model in as_list(models)
                                    if (not model.private) or (model.collab_id in authorized_collabs)]
            logger.debug("{} authorized models".format(len(authorized_models)))
            model_serializer = ScientificModelKGSerializer(authorized_models, self.client, many=True)

            if page != 0:
                init = (page - 1) * pagination_number
                end = init + pagination_number
                model_serializer = ScientificModelKGSerializer(authorized_models[init : end], self.client, many=True)
            else:
                model_serializer = ScientificModelKGSerializer(authorized_models, self.client, many=True)

            return Response({
                'models': model_serializer.data,
                'page': page,
                'total_nb_pages': _get_nb_pages(len(authorized_models), pagination_number),
                'total_models': len(authorized_models)
            })

        # a model ID has been specified
        else:
            try:
                web_app = request.GET.getlist('web_app')
            except:
                web_app = False
            response = {
                "models": [],
                "errors": {
                    "unauthorized": [],
                    "not found": []
                }
            }

            for model_id in id:
                model = ModelProject.from_uuid(model_id, self.client, api="nexus")
                if model:
                    #check if private
                    if model.private:
                        #if private check if collab member
                        if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, model.collab_id)):
                            response["errors"]["unauthorized"].append(model_id)
                            continue
                    model_serializer = ScientificModelKGSerializer(model, self.client)
                    response["models"].append(model_serializer.data)
                else:
                    response["errors"]["not found"].append(model_id)

            if response["models"]:
                return Response(response)
            elif response["unauthorized"]:
                return Response(response,status=status.HTTP_401_UNAUTHORIZED)
            elif response["not found"]:
                return Response(response, status=status.HTTP_404_NOT_FOUND)
            else:
                raise Exception("This should never happen")

    def post(self, request, format=None):
        """
        Save a new model in model_validation_api_scientificmodel table - if the model contains images and a version, it saves it also.
        :param app_id: application id
        :type app_id: int
        :return: uuid of the created object
        :rtype: uuid:
        """
        logger.debug("Models_KG POST data " + str(request.data))

        app_id = request.GET.get('app_id')
        collab_id = request.GET.get('collab_id')

        if app_id:
            if collab_id:
                return Response("Specify either app_id or collab_id, not both", status=status.HTTP_400_BAD_REQUEST)
            collab_id = get_collab_id_from_app_id(app_id)
        elif collab_id:
            pass
        else:
            return Response("You need to specify the app_id argument", status=status.HTTP_400_BAD_REQUEST)

        if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, collab_id)):
            return HttpResponse('Unauthorized for collab {}'.format(collab_id), status=401)

        data = _reformat_request_data(request.data)[0]

        # #make sure organisation is not empty :
        # try :
        #     if data['model']["organization"] == "" :
        #         data['model']["organization"] = "<<empty>>"
        # except :
        #     data['model']["organization"] = "<<empty>>"

        if len(data['model_image']) >  0:
            data['model']['images'] = data['model_image']
        # if "private" in data["model"] and data["model"]["private"] in ("True", "False"):
        #     data["model"]["private"] =

        # check if data is ok else return error
        model_serializer = ScientificModelKGSerializer(None, self.client, data=data['model'], context={"collab_id": collab_id})
        if not model_serializer.is_valid():
            return Response(model_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if len(data['model_instance']) >  0 :
            list_version_names = []
            for inst in data['model_instance']:
                list_version_names.append(inst["version"])
                model_instance_serializer = ScientificModelInstanceKGSerializer(None, self.client, data=inst)
                if not model_instance_serializer.is_valid():
                    return Response(model_instance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            if not len(list_version_names) == len(set(list_version_names)) :
                return Response("You are sending non-unique version names", status=status.HTTP_400_BAD_REQUEST)

        # no error then save all
        logger.info("Saving model project")
        model = model_serializer.save()

        if len(data['model_instance']) >  0:
            for inst in data['model_instance']:
                inst["model_id"] = model.uuid
                model_instance_serializer = ScientificModelInstanceKGSerializer(None, self.client, data=inst)
                if model_instance_serializer.is_valid():
                    model_instance_serializer.save()

        return Response({'uuid': model.uuid}, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        """
        Update model
        :param id: model id
        :type id: uuid
        :returns: model id of the updated model
        :rtype: uuid:
        """

        ## save only modifications on model. if you want to modify images or instances, do separate put.
        # get objects
        if "models" in request.data:
            model_data = request.data['models'][0]
        else:
            return HttpResponseBadRequest("'models' key not provided")

        if 'id' in model_data and model_data['id'] != '':
            model = ModelProject.from_uuid(model_data['id'], self.client, api="nexus")
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
                # model = KGQuery(ModelProject, query, context).resolve(self.client, api="nexus")
                model = ModelProject.from_alias(model_data['alias'], self.client, api="nexus")
                if not model:
                    return Response('There is no model corresponding to this alias. Please give a new alias or use the id of the model', status=status.HTTP_400_BAD_REQUEST )
            else:
                return Response('We cannot update the model. Please give the id or the alias of the model.', status=status.HTTP_400_BAD_REQUEST )

        # security
        if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, model.collab_id)):
            return HttpResponse('Access to original model collab ({}) unauthorized'.format(model.collab_id),
                                status=401)
        if ("collab_id" in model_data and model_data["collab_id"] != model.collab_id
            and not is_authorised_or_admin(request, model_data["collab_id"])):
            return HttpResponse('Access to requested collab ({}) unauthorized'.format(model_data["collab_id"]),
                                status=401)

        # #make sure organisation is not empty :
        # try :
        #     if model_data["organization"] == "" :
        #         model_data["organization"] = "<<empty>>"
        # except :
        #     model_data["organization"] = "<<empty>>"

        # # check if data is ok else return error

        model_serializer = ScientificModelKGSerializer(model, self.client, data=model_data)
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
        list_ids = request.GET.getlist('id')
        logger.debug("Request to delete {}".format(list_ids))

        if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID)):
            return HttpResponseForbidden()

        elements_to_delete = [
            ModelProject.from_uuid(id, self.client, api="nexus")
            for id in list_ids
        ]
        for model in elements_to_delete:
            if model.instances:
                for instance in as_list(model.instances):
                    instance.delete(self.client)
            model.delete(self.client)

        return Response(status=status.HTTP_200_OK)



class ModelAliases_KG(KGAPIView):
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

        # if a model_id is provided, first check if the requested alias matches that
        # of the model
        is_valid = False
        model_id = request.GET.get('model_id')
        if model_id:
            model = ModelProject.from_uuid(model_id, self.client, api="nexus")
            if model:
                is_valid = (model.alias == alias)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        # if no model_id provided, or the alias doesn't match the model
        # check if the alias exists
        if not is_valid:
            filter = {"path": "nsg:alias", "op": "eq", "value": alias}
            context = {'nsg': 'https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/'}
            models = KGQuery(ModelProject, {"nexus": filter}, context).resolve(self.client, api="nexus")
            logger.debug("Checking validity of {}. models = {}".format(alias, str(models)))
            is_valid = not bool(models)
        return Response({'is_valid': is_valid})


class ModelInstances_KG(KGAPIView):
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

        # instance_id or (model_id, version) or (alias, version)
        instances = []
        if len(param_id) > 0:
            # Get instances by individual uuids
            for instance_id in param_id:
                inst = ModelInstance.from_uuid(instance_id, self.client, api="nexus")
                if inst is None:
                    inst = MEModel.from_uuid(instance_id, self.client, api="nexus")
                if inst is not None:
                    instances.append(inst)
            # todo: add project field for linked model project
        else:
            # Get instances belonging to a specific model project
            if len(param_model_id) > 0:
                assert len(param_model_id) == 1  # todo: return error response
                model_project = ModelProject.from_uuid(param_model_id[0], self.client, api="nexus")
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
                model_project = KGQuery(ModelProject, {"nexus": filter_query}, context).resolve(self.client, api="nexus")
            if model_project:
                instances = [inst.resolve(self.client, api="nexus") for inst in as_list(model_project.instances)]
                if len(param_version) > 0:
                    instances = [inst for inst in instances if inst.version in param_version]
            else:
                instances = []
            #for inst in instances:
            #    inst.project = model_project

        # todo: check access permissions

        instance_serializer = ScientificModelInstanceKGSerializer(instances, self.client, many=True)

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

        # check if valid + security
        for instance in DATA :
            if "model_id" in instance:
                model_project = ModelProject.from_uuid(instance["model_id"], self.client, api="nexus")
                if model_project is None:
                    return Response("Invalid model id provided", status=status.HTTP_404_NOT_FOUND)
            elif "alias" in instance:
                model_project = ModelProject.from_alias(instance["alias"], self.client, api="nexus")
                if model_project is None:
                    return Response("No such alias", status=status.HTTP_404_NOT_FOUND)
                instance["model_id"] = model_project.uuid
            else:
                return Response("Must provide either model project id or model project alias", status=status.HTTP_400_BAD_REQUEST)

            serializer = ScientificModelInstanceKGSerializer(None, self.client, data=instance)
            if serializer.is_valid():

                # security
                collab_id = model_project.collab_id
                if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, collab_id)):
                    return HttpResponseForbidden()

                # check if versions are unique
                if not _are_model_instance_version_unique_kg(instance, self.client):
                    return Response("The specified version name already exists for this model. Please provide a new name", status=status.HTTP_400_BAD_REQUEST)
            else :
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        list_id = []
        for instance in DATA:
            serializer = ScientificModelInstanceKGSerializer(None, self.client, data=instance)
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

        for instance in DATA:
            if param_web_app:

                original_instance = ModelInstance.from_uuid(instance['id'], self.client, api="nexus")
                if original_instance is None:
                    original_instance = MEModel.from_uuid(instance['id'], self.client, api="nexus")
                #check if version is editable - only if you are not super user
                # TODO once ValidationResult migrated to KG
                # if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
                #     if not _are_model_instance_editable(instance):
                #         return Response("This version is no longer editable as there is at least one result associated with it.", status=status.HTTP_400_BAD_REQUEST)

                #check if versions are unique
                if original_instance.version != instance["version"]:
                    if not _are_model_instance_version_unique_kg(instance, self.client) :
                        return Response("The specified version name already exists for this model. Please provide a new name", status=status.HTTP_400_BAD_REQUEST)

                model_serializer = ScientificModelInstanceKGSerializer(original_instance, self.client, data=instance)
                if  model_serializer.is_valid():
                    model_instance = model_serializer.save()
                    return  Response(status=status.HTTP_202_ACCEPTED)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

            if 'id' in instance:
                original_instance = ModelInstance.from_uuid(instance['id'], self.client, api="nexus")
                if original_instance is None:
                    original_instance = MEModel.from_uuid(instance['id'], self.client, api="nexus")
                if original_instance is None:
                    return Response("The given id "+instance['id']+" does not exist. Please give a new id, or a model_id with a version_name, or a model_alias with a version_name. ",
                                    status=status.HTTP_400_BAD_REQUEST)
                model_project = original_instance.project.resolve(self.client, api="nexus")
                if isinstance(model_project, list):
                    logger.error("Model instance {} belongs to more than one model project".format(original_instance.id))
                    model_project = model_project[0]

                instance['model_id'] = model_project.uuid
                serializer = ScientificModelInstanceKGSerializer(original_instance, self.client, data=instance)
                if not serializer.is_valid():
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                if 'version' in instance:
                    if 'model_id' in instance and len(instance['model_id']) > 0:
                        model_project = ModelProject.from_uuid(instance['model_id'], self.client, api="nexus")
                    elif 'model_alias' in instance and len(instance['model_alias']) > 0:
                        model_project = ModelProject.from_alias(instance['model_alias'], self.client, api="nexus")
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
                        serializer = ScientificModelInstanceKGSerializer(original_instance, self.client, data=instance)
                        if not serializer.is_valid():
                            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response("To edit a model instance, you need to give an id, or a model_id with a version, or a model_alias with a version ",
                                    status=status.HTTP_400_BAD_REQUEST)

            #security
            collab_id = model_project.collab_id
            if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, collab_id)):
                return HttpResponseForbidden()

            # #check if version is editable - TODO reimplement once ValidationResult migrated to KG
            # if not is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID):
            #     if not _are_model_instance_editable(instance):
            #         return Response("This version is no longer editable as there is at least one result associated with it.", status=status.HTTP_400_BAD_REQUEST)

            # if the version has changed, check if versions are unique
            if "version" in instance and original_instance.version != instance["version"]:
                if not _are_model_instance_version_unique_kg(instance, self.client):
                    return Response("The specified version name already exists for this model. Please provide a new name", status=status.HTTP_400_BAD_REQUEST)

        list_id = []
        #is valid + authorized : save it
        for instance in DATA:
            model_serializer = ScientificModelInstanceKGSerializer(original_instance, self.client, data=instance)

            if  model_serializer.is_valid():
                logger.info("Saving updates to model instance {}".format(original_instance.id))
                logger.debug("Original: {}".format(original_instance.instance.data))
                logger.debug("Updated: {}".format(instance))

                model_instance = model_serializer.save()
                list_id.append(model_instance.uuid)

        return Response({'uuid': list_id}, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, format=None):
        """

        """

        if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID)):
            return HttpResponseForbidden()

        list_ids = request.GET.getlist('id')

        for id in list_ids:
            elem = ModelInstance.from_uuid(id, self.client, api="nexus")
            if not elem:
                elem = MEModel.from_uuid(id, self.client, api="nexus")


            if elem:
                project = elem.project.resolve(self.client, api="nexus")
                if project:
                    for proj in as_list(project):
                        # it shouldn't happen, but sometimes an instance belongs to multiple projects
                        logger.debug("???instances = {}".format(proj.instances))
                        # delete instance from project.instances
                        proj.instances = [inst for inst in as_list(proj.instances) if inst.id != elem.id]
                        proj.save(self.client)
                # delete any associated script and emodel
                if elem.main_script:
                    elem.main_script.delete(self.client)
                # not deleting morphologies, as in future they are liable to be shared between models
                if hasattr(elem, "e_model"):
                    elem.e_model.delete(self.client)
                # delete the instance itself
                elem.delete(self.client)

        return Response(status=status.HTTP_200_OK)


class Tests_KG(KGAPIView):

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

        param_id = request.GET.getlist('id')
        name_filter = request.GET.getlist('name')
        species_filter = request.GET.getlist('species')
        brain_region_filter = request.GET.getlist('brain_region')
        cell_type_filter = request.GET.getlist('cell_type')
        #param_age = request.GET.getlist('age')
        #param_data_location = request.GET.getlist('data_location')
        #param_data_type = request.GET.getlist('data_type')
        data_modality_filter = request.GET.getlist('data_modality')
        test_type_filter = request.GET.getlist('test_type')
        #param_protocol = request.GET.getlist('protocol')
        author_filter = request.GET.getlist('author')
        #param_publication = request.GET.getlist('publication')
        score_type_filter = request.GET.getlist('score_type')
        status_filter = request.GET.getlist('status')
        alias_filter = request.GET.getlist('alias')
        param_web_app = request.GET.getlist('web_app')
        param_app_id = request.GET.getlist('app_id')

        if check_list_uuid_validity(param_id) is False :
            return Response("Badly formed uuid in : id", status=status.HTTP_400_BAD_REQUEST)

        if len(param_id) > 0:
            logger.info("Retrieving tests with the following IDs: {}".format(param_id))
            # test ID(s) specified
            tests = []
            for test_id in param_id:
                test_definition = ValidationTestDefinitionKG.from_uuid(test_id, self.client, api="nexus")
                if test_definition is not None:
                    logger.debug("Retrieved test with id {}".format(test_id))
                    tests.append(test_definition)
                else:
                    logger.debug("Couldn't retrieve test with id {}".format(test_id))

            test_serializer = ValidationTestDefinitionKGSerializer(tests, self.client, many=True)

        else:
            if len(param_web_app) > 0 and param_web_app[0] == 'True':

                param_app_id = param_app_id[0]
                collab_params = CollabParameters.objects.get(id=param_app_id)

                # #if one of the collab_param is empty, don't filter on it.
                species_filter = collab_params.species.split(",") if collab_params.species else []
                brain_region_filter = collab_params.brain_region.split(",") if collab_params.brain_region else []
                cell_type_filter = collab_params.cell_type.split(",") if collab_params.cell_type else []
                test_type_filter = collab_params.test_type.split(",") if collab_params.test_type else []
                data_modality_filter = collab_params.data_modalities.split(",") if collab_params.data_modalities else []


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
            # todo:
            #   test_type
            #   data_type
            #   data_modality
            #   score_type
            logger.info("Searching for tests with the following query: {}".format(filter_query))

            if len(filter_query["value"]) > 0:
                tests = KGQuery(ValidationTestDefinitionKG, {"nexus": filter_query}, context).resolve(self.client, api="nexus")
            else:
                tests = ValidationTestDefinitionKG.list(self.client, api="nexus")
            logger.debug("Serializing the following tests: {}".format(str(tests)))
            test_serializer = ValidationTestDefinitionKGSerializer(tests, self.client, many=True)

        logger.debug(">>>>>" + str(test_serializer.data))
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

        if not is_hbp_member(request):
            return HttpResponseForbidden()

        DATA = _reformat_request_data(request.data)

        for i in DATA :
            if len(i) == 0 :
                return Response( "You gave an empty dictionary", status=status.HTTP_400_BAD_REQUEST)

        if len(DATA) > 1 :
            return Response( "Posting more than 1 test is not supported yet", status=status.HTTP_400_BAD_REQUEST)
        else :
            DATA = DATA[0]

        test_serializer = ValidationTestDefinitionKGSerializer(None, self.client, data=DATA['test_data'])

        if test_serializer.is_valid():
            if 'code_data' in DATA:
                code_serializer = ValidationTestCodeKGSerializer(None, self.client, data=DATA['code_data'])
                if code_serializer.is_valid():
                    check_param = check_param_of_test_json(DATA['test_data'])
                    if check_param is not True :
                        return Response(check_param, status=status.HTTP_400_BAD_REQUEST)
                else :
                    return Response(code_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            test = test_serializer.save()

            if 'code_data' in DATA:
                code_serializer.data['test_definition'] = test
                code_serializer.save()
            return Response({'uuid': test.uuid}, status=status.HTTP_201_CREATED)

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
        test = ValidationTestDefinitionKG.from_uuid(value['id'], self.client, api="nexus")

        # check if data is ok else return error
        test_serializer = ValidationTestDefinitionKGSerializer(test, self.client, data=value)
        if test_serializer.is_valid() :
            check_param = check_param_of_test_json(value)
            if check_param is not True :
                return Response(check_param, status=status.HTTP_400_BAD_REQUEST)
            test = test_serializer.save()
        else:
            return Response(test_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'uuid': test.uuid}, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, format=None):

        if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID)):
            return HttpResponseForbidden()

        list_ids = request.GET.getlist('id')

        elements_to_delete = [ValidationTestDefinitionKG.from_uuid(id, self.client, api="nexus") for id in list_ids]
        for test in elements_to_delete:
            if test:
                test.delete(self.client)

        return Response( status=status.HTTP_200_OK)


class TestAliases_KG(KGAPIView):
    """
    Test validity of test Alias using Knowledge Graph
    """

    def get(self, request, format=None, **kwargs):
        """
        Check if the alias entered is valid (not already used)
        :param alias: test alias
        :type alias: str
        :param test_id: test id
        :type test_id: int
        :return: bool -- is_valid
        """

        serializer_context = {
            'request': request,
        }
        alias = request.GET.get('alias')
        if alias is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # if a test_id is provided, first check if the requested alias matches that
        # of the test
        is_valid = False
        test_id = request.GET.get('test_id')
        if test_id:
            test = ValidationTestDefinitionKG.from_uuid(test_id, self.client, api="nexus")
            if test:
                is_valid = (test.alias == alias)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        # if no test_id provided, or the alias doesn't match the test
        # check if the alias exists
        if not is_valid:
            filter = {"path": "nsg:alias", "op": "eq", "value": alias}
            context = {'nsg': 'https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/'}
            tests = KGQuery(ValidationTestDefinitionKG, {"nexus": filter}, context).resolve(self.client, api="nexus")
            logger.debug("Checking validity of {}. tests = {}".format(alias, str(tests)))
            is_valid = not bool(tests)
        return Response({'is_valid': is_valid})


class TestInstances_KG(KGAPIView):

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

        if len(param_id) > 0:
            test_scripts = []
            for script_id in param_id:
                result = ValidationScript.from_uuid(script_id, self.client, api="nexus")
                if result:
                    test_scripts.append(result)
        else:
            context = {
                "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
                "schema": "http://schema.org/"
            }
            filter_query = {
                "op": "and",
                "value": []
            }
            if len(param_test_alias) > 0 :
                filter_query["value"].append({
                    "path": "nsg:implements / nsg:alias",
                    "op": "in",
                    "value": param_test_alias
                })
            if len(param_test_definition_id) > 0 :
                filter_query["value"].append({
                    "path": "nsg:implements",
                    "op": "in",
                    "value":  [ValidationTestDefinitionKG.uri_from_uuid(pid, self.client)
                               for pid in param_test_definition_id]
                    #"op": "eq",
                    #"value":  ValidationTestDefinitionKG.uri_from_uuid(param_test_definition_id[0], self.client)
                })
            if len(param_repository) > 0 :
                filter_query["value"].append({
                    "path": "schema:codeRepository",
                    "op": "in",
                    "value": param_repository
                })
            if len(param_version) > 0 :
                filter_query["value"].append({
                    "path": "schema:version",
                    "op": "in",
                    "value": param_version
                })
            if len(param_path) > 0 :
                filter_query["value"].append({
                    "path": "nsg:path",
                    "op": "in",
                    "value": param_path
                })
            if len(param_timestamp) > 0 :
                filter_query["value"].append({
                    "path": "schema:dateCreated",
                    "op": "in",
                    "value": param_timestamp
                })

            if len(filter_query["value"]) > 0:
                logger.debug("Searching for test scripts with query {}".format(filter_query))
                test_scripts = KGQuery(ValidationScript, {"nexus": filter_query}, context).resolve(self.client, api="nexus")
            else:
                test_scripts = ValidationScript.list(self.client, api="nexus")
            logger.debug("Found {} scripts".format(len(as_list(test_scripts))))

        test_code_serializer = ValidationTestCodeKGSerializer(test_scripts, self.client, many=True)

        logger.debug("||||||" + str(test_code_serializer.data))
        return Response({
            'test_codes': test_code_serializer.data,
        })

    def post(self, request, format=None):
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        DATA = _reformat_request_data(request.data)

        for test_code in DATA :
            if 'test_alias' in test_code:
                test = ValidationTestDefinitionKG.from_alias(test_code["test_alias"], self.client, api="nexus")
                if not test:
                    return Response("No such alias", status=status.HTTP_404_NOT_FOUND)
            elif 'test_definition_id' in test_code:
                test = ValidationTestDefinitionKG.from_uuid(test_code["test_definition_id"], self.client, api="nexus")
                if not test:
                    return Response("No such test id", status=status.HTTP_404_NOT_FOUND)
            test_code['test_definition'] = test

            serializer = ValidationTestCodeKGSerializer(None, self.client, data=test_code)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            #check if versions are unique
            if not _are_test_code_version_unique_kg(test_code, self.client):
                return Response("The specified version name already exists for this test. Please provide a new name",
                                status=status.HTTP_400_BAD_REQUEST)

        list_id = []
        for test_code in DATA :
            serializer = ValidationTestCodeKGSerializer(None, self.client, data=test_code)
            if serializer.is_valid():
                saved_test_code = serializer.save()
                list_id.append(saved_test_code.uuid)
        return Response({'uuid':list_id}, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        """
        :param data: test instance
        :type data: object
        :returns: uuid list of the updated objects
        :rtype: uuid list
        """

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
                original_test_code = ValidationScript.from_uuid(test_code['id'], self.client, api="nexus")
                if not original_test_code:
                    return Response("The given id "+test_code['id']+" does not exist. Please give a new id, or a test_definition_id with a version, or a test_definition_alias with a version. ", status=status.HTTP_400_BAD_REQUEST)
                test_code['test_definition_id'] = original_test_code.test_definition.uuid
                test_code['test_definition'] = original_test_code.test_definition
                serializer = ValidationTestCodeKGSerializer(original_test_code, self.client, data=test_code)
                if not serializer.is_valid():
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                if 'version' in test_code:
                    if 'test_alias' in test_code:
                        test_definition = ValidationTestDefinitionKG.from_alias(test_code['test_alias'], self.client, api="nexus")
                        if not test_definition:
                            return Response('There is no test with this alias. Please give a new alias or try with the test_definition_id directly.', status=status.HTTP_400_BAD_REQUEST)
                        test_code['test_definition_id'] = test_definition.id
                        test_code['test_definition'] = test_definition
                    if 'test_definition_id' in test_code:
                        filter_query = {
                            "op": "and",
                            "value": [
                                {
                                    "path": "nsg:implements",
                                    "op": "eq",
                                    "value": test_code['test_definition_id']
                                },
                                {
                                    "path": "schema:version",
                                    "op": "eq",
                                    "value": test_code['version']
                                }
                            ]
                        }
                        context = {
                            "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
                            "schema": "http://schema.org/"
                        }
                        original_test_code = KGQuery(ValidationScript, {"nexus": filter_query}, context).resolve(self.client, api="nexus")
                        if not original_test_code:
                            return Response("There is no test instance with this version name for this test_definition_id. Please give a new test_definition_id or a new version name. ", status=status.HTTP_400_BAD_REQUEST)
                        test_code['id'] = original_test_code.uuid
                        test_code['uri'] = original_test_code.id
                        serializer = ValidationTestCodeKGSerializer(original_test_code, self.client, data=test_code)
                        if not serializer.is_valid():
                            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response("To edit a test instance, you need to give an id, or a test_definition_id with a version, or a test_definition_alias with a version ", status=status.HTTP_400_BAD_REQUEST)

            #check if version is editable
            if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request,settings.ADMIN_COLLAB_ID)):
                if not _are_test_code_editable_kg(test_code, self.client):
                    return Response("This version is no longer editable as there is at least one result associated with it", status=status.HTTP_400_BAD_REQUEST)

            #check if versions are unique
            if test_code["version"] != original_test_code.version and not _are_test_code_version_unique_kg(test_code, self.client):
                return Response("The specified version name already exists for this test. Please provide a new version.", status=status.HTTP_400_BAD_REQUEST)

        ## check is ok so create the serializer and save
        list_updated = []
        for test_code in DATA:
            serializer = ValidationTestCodeKGSerializer(original_test_code, self.client, data=test_code)
            original_test_code = ValidationScript.from_uuid(test_code['id'], self.client, api="nexus")

            if serializer.is_valid():
               updated_test_code = serializer.save()
               list_updated.append(serializer.serialize(updated_test_code))
        logger.debug("List updated: {}".format(list_updated))
        return Response({'uuid': list_updated}, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, format=None):

        if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID)):
            return HttpResponseForbidden()

        list_ids = request.GET.getlist('id')

        elements_to_delete = [ValidationScript.from_uuid(id, self.client) for id in list_ids]
        for test in elements_to_delete:
            test.delete(self.client)
        # todo: delete test instance from parent test definition

        return Response( status=status.HTTP_200_OK)


class Results_KG(KGAPIView):

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
        param_passed = request.GET.getlist('passed')
        param_project = request.GET.getlist('project')
        param_model_version_id = request.GET.getlist('model_version_id')
        param_test_code_id = request.GET.getlist('test_code_id')

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

        if len(param_order) > 0 and param_order[0] in ('test', 'model', '', 'model_instance',
                                                       'test_code', 'score_type'):
            param_order = param_order[0]
        else :
            return Response("You need to give 'order' argument. Here are the options: "
                            "'test', 'model', 'model_instance', 'test_code', 'score_type', '' ",
                            status=status.HTTP_400_BAD_REQUEST)

        if check_list_uuid_validity(param_id) is False:
            return Response("Badly formed uuid in : id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_model_version_id) is False:
            return Response("Badly formed uuid in : model_version_id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_test_code_id) is False:
            return Response("Badly formed uuid in : test_code_id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_model_id) is False:
            return Response("Badly formed uuid in : model_id", status=status.HTTP_400_BAD_REQUEST)
        if check_list_uuid_validity(param_test_id) is False:
            return Response("Badly formed uuid in : test_id", status=status.HTTP_400_BAD_REQUEST)

        #if ID result
        if (len(param_id) == 0):

            # have to first lookup ModelProjects, as we currently have no
            # forward connection from ModelInstance to ModelProject
            # update: actually, this may not be neceessary, as we can use
            # inverse relations in paths: ^ (see https://www.w3.org/TR/sparql11-query/#propertypaths)
            model_instances = []
            for uuid in param_model_version_id:
                model_instances += get_full_uri((ModelInstance, MEModel), uuid, self.client)
            for uuid in param_model_id:
                model_instances += [inst.id for inst in as_list(ModelProject.from_uuid(uuid, self.client, api="nexus").instances)]
            for alias in param_model_alias:
                model_instances += [inst.id for inst in as_list(ModelProject.from_alias(alias, self.client, api="nexus").instances)]

            filter_query = {
                "op": "and",
                "value": []
            }
            context = {
                "nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/",
                "schema": "http://schema.org/"
            }

            if len(param_passed) > 0 :
                filter_query["value"].append({
                    "path": "nsg:passedValidation",
                    "op": "in",
                    "value": param_passed
                })
            if len(param_project) > 0 :
                filter_query["value"].append({
                    "path": "nsg:collabID",
                    "op": "in",
                    "value": param_project
                })
            if len(model_instances) > 0 :
                filter_query["value"].append({
                    "path": "prov:wasGeneratedBy / prov:used",
                    "op": "in",
                    "value": model_instances
                })
            if len(param_test_code_id) > 0 :
                filter_query["value"].append({
                    "path": "prov:wasGeneratedBy / prov:used",
                    "op": "in",
                    "value": [get_full_uri(ValidationScript, uuid, self.client) for uuid in param_test_code_id]
                })
            if len(param_test_id) > 0 :
                filter_query["value"].append({
                    "path": "prov:wasGeneratedBy / prov:used / nsg:implements",
                    "op": "in",
                    "value": [get_full_uri(ValidationTestDefinitionKG, uuid, self.client) for uuid in param_test_id]
                })
            if len(param_test_alias) > 0 :
                filter_query["value"].append({
                    "path": "prov:wasGeneratedBy / prov:used / nsg:implements / nsg:alias",
                    "op": "in",
                    "value": param_test_alias
                })
            if len(param_test_score_type) > 0:
                filter_query["value"].append({
                    "path": "prov:wasGeneratedBy / prov:used / nsg:implements / nsg:scoreType",
                    "op": "in",
                    "value": param_test_score_type
                })

            # todo: implement ordering (will need changes to pyxus)
            if len(filter_query["value"]) > 0:
                results = KGQuery(ValidationResultKG, {"nexus": filter_query}, context).resolve(self.client, api="nexus")
            else:
                results = ValidationResultKG.list(self.client, api="nexus")

            # TODO: Exclude the results which the self.client, api="nexus" can't access because the model is private

        else:

            results = [ValidationResultKG.from_uuid(uuid, self.client, api="nexus")
                       for uuid in param_id]

        #     #check if user has acces to the model associated to the results
        #     for result in results :
        #         if user_has_acces_to_result(request, result) is False :
        #             return Response("You do not access to result : {}".format(result.id), status=status.HTTP_403_FORBIDDEN)

        #####quick fix to get out nan and infinity numbers --will need to change it by allowing the json
        new_results = []
        for result in results:
            if result and not math.isnan(float(result.score)) and not math.isnan(float(result.normalized_score)) and not math.isinf(float(result.score)) and not math.isinf(float(result.normalized_score)):
                new_results.append(result)

        data_to_return = organise_results_dict_kg(detailed_view, param_order, new_results, self.client, self.user_token)

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
        if not is_hbp_member(request):
            return HttpResponseForbidden()

        if type(request.data) == list :
            DATA = request.data

        elif type(request.data) == dict :
            DATA = [request.data]
        else :
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # #check if the user can access the models, and if data are valid
        # for result in DATA :
        #     value = self.check_data(request, serializer_context, result)
        #     if value is not True :
        #         return value

        list_id = []
        for result in DATA :
            model_instance = ModelInstance.from_uuid(result["model_version_id"], self.client, api="nexus")
            if not model_instance:
                model_instance = MEModel.from_uuid(result["model_version_id"], self.client, api="nexus")
            if not model_instance:
                return Response("No such model instance", status=status.HTTP_404_NOT_FOUND)
            result["model_instance"] = model_instance

            test_code = ValidationScript.from_uuid(result["test_code_id"], self.client, api="nexus")
            if not test_code:
                return Response("No such test implementation: '{}'".format(result["test_code_id"]),
                                status=status.HTTP_404_NOT_FOUND)
            result["test_script"] = test_code

            serializer = ValidationTestResultKGSerializer(None, self.client, data=result, user_token=self.user_token)
            if serializer.is_valid():
                res = serializer.save()
                list_id.append(res.uuid)
            else :
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if len(list_id) > 0 :
            return Response({'uuid':list_id}, status=status.HTTP_201_CREATED)
        else :
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        """

        """

        if not (self.user.get("username") in ADMIN_USERS or is_authorised_or_admin(request, settings.ADMIN_COLLAB_ID)):
            return HttpResponseForbidden()

        list_ids = request.GET.getlist('id')
        logger.info("Trying to delete the following results: {}".format(list_ids))

        elements_to_delete = [
            ValidationResultKG.from_uuid(id, self.client, api="nexus")  # can probably just use KGProxy here, and in other delete methods where no relations need to be followed
            for id in list_ids
        ]
        for result in elements_to_delete:
            if result.generated_by:
                result.generated_by.delete(self.client)
            result.delete(self.client)

        return Response(status=status.HTTP_200_OK)
