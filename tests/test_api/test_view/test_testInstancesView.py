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





username = os.environ.get('HBP_USERNAME')
base_client = BaseClient(username = username)
client = Client(HTTP_AUTHORIZATION=base_client.token)






    


class TestsInstancesViewTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        
        create_all_parameters()
        create_fake_collab(
                        id='1', 
                        collab_id='1',
                        data_modality='electrophysiology', 
                        test_type='single cell activity', 
                        species='Mouse (Mus musculus)', 
                        brain_region='Hippocampus',
                        cell_type = 'Interneuron',
                        model_type = 'Single Cell',
                        )

        #Create 3 tests with different caracteristics
        cls.original_time = time.time()

        cls.uuid_test1 = uuid.uuid4()
        cls.uuid_test1_bis = uuid.uuid4()
        cls.uuid_test2 = uuid.uuid4()

        cls.uuid_testcode1_1 = uuid.uuid4()
        cls.uuid_testcode1_bis_1 = uuid.uuid4()
        cls.uuid_testcode2_1 = uuid.uuid4()

        cls.test1 = create_specific_test (
                    cls.uuid_test1, 
                    "name 1", 
                    "T1", 
                    species="Mouse (Mus musculus)",
                    brain_region = "Hippocampus", 
                    cell_type = "Interneuron", 
                    age = "12",  
                    data_location = "http://bbbb.com", 
                    data_type = "data type",
                    data_modality = "electrophysiology",
                    test_type = "single cell activity",
                    protocol ="protocol",
                    author = "me",
                    publication = "not published",
                    score_type="p-value",
                    )
        cls.test1_bis = create_specific_test (
                    cls.uuid_test1_bis, 
                    "name 1_bis", 
                    "T1_bis", 
                    species="Mouse (Mus musculus)",
                    brain_region = "Hippocampus", 
                    cell_type = "Interneuron", 
                    age = "12",  
                    data_location = "http://bbbb.com", 
                    data_type = "data type",
                    data_modality = "electrophysiology",
                    test_type = "single cell activity",
                    protocol ="protocol",
                    author = "me",
                    publication = "not published",
                    score_type="p-value",
                    )
        cls.test2 = create_specific_test (
                    cls.uuid_test2, 
                    "name 2", 
                    "T2", 
                    species="Rat (Rattus rattus)",
                    brain_region = "Cerebellum", 
                    cell_type = "Granule Cell", 
                    age = "13",  
                    data_location = "http://aaaa.com", 
                    data_type = "data type2",
                    data_modality = "histology",
                    test_type = "network structure",
                    protocol ="blabla",
                    author = "me2",
                    publication = "not published2",
                    score_type="p-value2",
                    )

        cls.testcode1 = create_specific_testcode (
                            cls.uuid_testcode1_1, 
                            "1.1", 
                            "2017-01-24T14:59:26.031Z", 
                            cls.test1,
                            repository = "repo1",
                            path = "path1",
                            )

        cls.testcode1_bis = create_specific_testcode (
                            cls.uuid_testcode1_bis_1, 
                            "2.1", 
                            "2017-01-24T14:59:26.031Z", 
                            cls.test1_bis,
                            repository = "repo2",
                            path = "path2",
                            )

        cls.testcode2 = create_specific_testcode (
                            cls.uuid_testcode2_1, 
                            "3.1", 
                            "2017-01-24T14:59:26.031Z", 
                            cls.test2,
                            repository = "repo3",
                            path = "path3",
                            )





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
        response = client.get('/test-instances/', data={})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 3)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')



    def test_get_param_id (self):
        response = client.get('/test-instances/', data={'id': self.uuid_testcode1_1})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_repository (self):
        response = client.get('/test-instances/', data={'repository': self.testcode1.repository })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_version (self):
        response = client.get('/test-instances/', data={'version' :self.testcode1.version })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_path (self):
        response = client.get('/test-instances/', data={'path':self.testcode1.path })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_timestamp (self):
        response = client.get('/test-instances/', data={'timestamp':self.testcode1.timestamp })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_test_definition_id (self):
        response = client.get('/test-instances/', data={'test_definition_id':self.testcode1.test_definition_id})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_test_alias (self):
        response = client.get('/test-instances/', data={'test_alias':self.test1.alias})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')