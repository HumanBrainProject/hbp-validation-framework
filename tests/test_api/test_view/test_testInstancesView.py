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

#jgonintesting
# username_not_authorized = os.environ.get('HBP_USERNAME_NOT_AUTHORIZED')
# password_not_authorized = os.environ.get('HBP_PASSWORD_NOT_AUTHORIZED')
# base_client_not_authorized = BaseClient(username = username_not_authorized, password=password_not_authorized)
# client_not_authorized = Client(HTTP_AUTHORIZATION=base_client_not_authorized.token)


# username_authorized = os.environ.get('HBP_USERNAME_NOT_AUTHORIZED')
# password_authorized = os.environ.get('HBP_PASSWORD_NOT_AUTHORIZED')

# base_client_authorized = BaseClient(username = username_authorized, password=password_authorized)
# client_authorized = Client(HTTP_AUTHORIZATION=base_client_authorized.token)

    


class TestsInstancesViewTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass

    def compare_serializer_keys (self, codes, targeted_keys_list_type='all'):
        
        if targeted_keys_list_type == "standard" :
            targeted_keys = [
                            'id', 
                            'description', 
                            'repository',
                            'timestamp',
                            'version', 
                            'path', 
                            'test_definition_id', 
                            ]


        for code in codes :
            self.assertEqual(set(code.keys()), set(targeted_keys))




    def test_get_no_param (self):
        response = client_authorized.get('/test-instances/', data={})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 3)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')



    def test_get_param_id (self):
        response = client_authorized.get('/test-instances/', data={'id': self.data.uuid_testcode1_1})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_repository (self):
        response = client_authorized.get('/test-instances/', data={'repository': self.data.testcode1.repository })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_version (self):
        response = client_authorized.get('/test-instances/', data={'version' :self.data.testcode1.version })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_path (self):
        response = client_authorized.get('/test-instances/', data={'path':self.data.testcode1.path })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_timestamp (self):
        response = client_authorized.get('/test-instances/', data={'timestamp':self.data.testcode1.timestamp })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_test_definition_id (self):
        response = client_authorized.get('/test-instances/', data={'test_definition_id':self.data.testcode1.test_definition_id})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_test_alias (self):
        response = client_authorized.get('/test-instances/', data={'test_alias':self.data.test1.alias})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')