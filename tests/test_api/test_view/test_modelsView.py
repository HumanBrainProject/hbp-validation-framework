"""
Tests of the ValidationFramework TestsView.
"""

from __future__ import unicode_literals

import os
import random
import json

from uuid import uuid4
import uuid

import time
from datetime import datetime


from django.test import TestCase, Client, RequestFactory
# SimpleTestCase, TransactionTestCase, TestCase, LiveServerTestCase, assertRedirects
from django.contrib.auth.models import User
from social.apps.django_app.default.models import UserSocialAuth
from hbp_app_python_auth.auth import get_access_token, get_token_type, get_auth_header

from rest_framework.test import APIRequestFactory

from model_validation_api.models import (ValidationTestDefinition, 
                        ValidationTestCode,
                        ValidationTestResult, 
                        ScientificModel, 
                        ScientificModelInstance,
                        ScientificModelImage,   
                        Comments,
                        Tickets,
                        # FollowModel,
                        CollabParameters,
                        Param_DataModalities,
                        Param_TestType,
                        Param_Species,
                        Param_BrainRegion,
                        Param_CellType,
                        Param_ModelType,
                        Param_ScoreType,
                        Param_organizations,
                        )

from validation_service.views import config, home

from model_validation_api.views import (
                    ModelCatalogView,
                    HomeValidationView,

                    ParametersConfigurationRest,
                    AuthorizedCollabParameterRest,
                    Models,
                    ModelAliases,
                    Tests,
                    TestAliases,
                    ModelInstances,
                    Images,
                    TestInstances,
                    TestCommentRest,
                    CollabIDRest,
                    AppIDRest,
                    AreVersionsEditableRest,
                    ParametersConfigurationModelView,
                    ParametersConfigurationValidationView,
                    TestTicketRest,
                    IsCollabMemberRest,
                    Results,
                    CollabAppID,

                    )

from model_validation_api.validation_framework_toolbox.fill_db import (
        create_data_modalities,
        create_organizations,
        create_test_types,
        create_score_type,
        create_species,
        create_brain_region,
        create_cell_type,
        create_model_type,
        create_models_test_results,
        create_fake_collab,
        create_all_parameters,
        create_specific_test,
        create_specific_testcode,
)

from ..auth_for_test_taken_from_validation_clien import BaseClient

from ..data_for_test import DataForTests



username_authorized = os.environ.get('HBP_USERNAME_AUTHORIZED')
password_authorized = os.environ.get('HBP_PASSWORD_AUTHORIZED')
base_client_authorized = BaseClient(username = username_authorized, password=password_authorized)
client_authorized = Client(HTTP_AUTHORIZATION=base_client_authorized.token)




class ModelsViewTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass

    def compare_serializer_keys (self, models, targeted_keys_list_type='all'):
        
        if targeted_keys_list_type == "standard" :
            targeted_keys = [
                            'id', 
                            'name',
                            'alias', 
                            'author',
                            'app',
                            'organization',
                            'private', 
                            'cell_type', 
                            'model_type', 
                            'brain_region', 
                            'species', 
                            'description',
                            'images',
                            'instances',


                            ]


            for model in models :
                self.assertEqual(set(model.keys()), set(targeted_keys))

            
                for image in model['images'] :
                    self.assertEqual(set(image.keys()), set([
                                                    
                                                    ]))

                for instance in model['instances'] :
                    self.assertEqual(set(instance.keys()), set([
                                                            'code_format',
                                                            'description',
                                                            'parameters',
                                                            'source',
                                                            'version',
                                                            'id',
                                                            ]))

        if targeted_keys_list_type == "less" :
            targeted_keys = [
                        'id', 
                        'name',
                        'alias', 
                        'author',
                        'app',
                        'organization',
                        'private', 
                        'cell_type', 
                        'model_type', 
                        'brain_region', 
                        'species', 
                        # 'description',
                        # 'images',
                        # 'instances',

                        ]
        if targeted_keys_list_type == "web_id" :
            targeted_keys = [
                        'model_id', 
                        'name',
                        'alias', 
                        'author',
                        'app',
                        'organization',
                        'private', 
                        'cell_type', 
                        'model_type', 
                        'brain_region', 
                        'species', 
                        # 'description',
                        # 'images',
                        # 'instances',

                        ]



    def test_get_no_param (self):
        response = client_authorized.get('/models/', data={})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 4)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='less')



    def test_get_param_id (self):
        response = client_authorized.get('/models/', data={'id': self.data.uuid_model1})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_web_app (self):
        response = client_authorized.get('/models/', data={'web_app': True, 'app_id': self.data.model1.app_id})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='less')

    def test_get_param_app_id (self):
        response = client_authorized.get('/models/', data={'app_id': self.data.model1.app_id})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 3)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_name (self):
        response = client_authorized.get('/models/', data={'name': self.data.model1.name })
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_description (self):
        response = client_authorized.get('/models/', data={'description': self.data.model1.description })
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_species (self):
        response = client_authorized.get('/models/', data={'species': self.data.model1.species})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_brain_region (self):
        response = client_authorized.get('/models/', data={'brain_region': self.data.model1.brain_region})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_cell_type (self):
        response = client_authorized.get('/models/', data={'cell_type': self.data.model1.cell_type})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_author (self):
        response = client_authorized.get('/models/', data={'author': self.data.model1.author})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_model_type (self):
        response = client_authorized.get('/models/', data={'model_type':  self.data.model1.model_type})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')


    def test_get_param_private (self):
        #private alone means nothing
        response = client_authorized.get('/models/', data={'private':  4})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 4)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')


    def test_get_param_private_with_id (self):
        response = client_authorized.get('/models/', data={'id': self.data.uuid_model1, 'private':  self.data.model1.private})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')


    def test_get_param_private_with_id_with_web (self):
        response = client_authorized.get('/models/', data={'id': self.data.uuid_model1, 'web_app': True, 'private':  self.data.model1.private})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='web_id')


    def test_get_param_private_with_web (self):
        response = client_authorized.get('/models/', data={ 'web_app': True, 'app_id' : '1', 'private':  self.data.model1.private})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='web_id')


    def test_get_param_code_format (self):
        response = client_authorized.get('/models/', data={'code_format': self.data.model1.code_format })
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_alias (self):
        response = client_authorized.get('/models/', data={'alias':  self.data.model1.alias})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')
    
    def test_get_param_organization (self):
        response = client_authorized.get('/models/', data={'organization': self.data.model1.organization})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')





                  
                
                 
                 
                
                 
                 
                 
                 
                 
                 
                 
                 
