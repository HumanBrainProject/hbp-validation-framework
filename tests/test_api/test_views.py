"""
Tests of the ValidationFramework views.
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

from auth_for_test_taken_from_validation_clien import BaseClient





username = os.environ.get('HBP_USERNAME')
base_client = BaseClient(username = username)
client = Client(HTTP_AUTHORIZATION=base_client.token)






    


class TestsViewTest(TestCase):
    
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
                            repository = "",
                            path = "",
                            )

        cls.testcode1_bis = create_specific_testcode (
                            cls.uuid_testcode1_bis_1, 
                            "1.1", 
                            "2017-01-24T14:59:26.031Z", 
                            cls.test1_bis,
                            repository = "",
                            path = "",
                            )

        cls.testcode2 = create_specific_testcode (
                            cls.uuid_testcode2_1, 
                            "1.1", 
                            "2017-01-24T14:59:26.031Z", 
                            cls.test2,
                            repository = "",
                            path = "",
                            )





    def setUp(self):
        #Setup run before every test method.
        pass

    def compare_serializer_keys (self, tests, targeted_keys_list_type='all'):
        
        if targeted_keys_list_type == "all" :
            targeted_keys = [
                            'id', 
                            'name', 
                            'alias',
                            'creation_date',
                            'species', 
                            'brain_region', 
                            'cell_type', 
                            'age', 
                            'data_location', 
                            'data_type',  
                            'data_modality', 
                            'test_type', 
                            'protocol', 
                            'author', 
                            'publication', 
                            'score_type',]

        for test in tests :
            self.assertEqual(set(test.keys()), set(targeted_keys))


    def test_get_no_param (self):
        response = client.get('/tests/', {})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests), 3)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
        

    def test_get_param_id (self):
        response = client.get('/tests/', data={'id': self.uuid_test1})
        tests = json.loads(response._container[0])['tests']

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests), 1)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
        

    def test_get_param_name (self):
        response = client.get('/tests/', data={ 'name': "name 1"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests), 1)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
           

    def test_get_param_species (self):
        response = client.get('/tests/', data={'species': "Mouse (Mus musculus)"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
          

    def test_get_param_brain_region (self):
        response = client.get('/tests/', data={'brain_region' : "Hippocampus" })
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
         

    def test_get_param_cell_type (self):
        response = client.get('/tests/', data={ 'cell_type' :  "Interneuron"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
         

    def test_get_param_age (self):
        response = client.get('/tests/', data={'age': "12" })
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
        
        
    def test_get_param_data_location (self):
        response = client.get('/tests/', data={'data_location': "http://bbbb.com"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
        
        
    def test_get_param_data_type (self):
        response = client.get('/tests/', data={'data_type' : "data type"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
         

    def test_get_param_data_modality (self):
        response = client.get('/tests/', data={'data_modality' : "electrophysiology"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)        
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
           

    def test_get_param_test_type (self):
        response = client.get('/tests/', data={'test_type' : "single cell activity"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')   
        

    def test_get_param_protocol (self):
        response = client.get('/tests/', data={'protocol': "protocol"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')    
        

    def test_get_param_author (self):
        response = client.get('/tests/', data={'author' : "me"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
             

    def test_get_param_publication (self):
        response = client.get('/tests/', data={'publication' :"not published" })
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
          

    def test_get_param_score_type (self):
        response = client.get('/tests/', data={'score_type' : "p-value"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
            

    def test_get_param_alias (self):
        response = client.get('/tests/', data={'alias' : "T1" })
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),1)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
            

    def test_get_param_web_app (self):
        response = client.get('/tests/', data={'web_app' : True, 'app_id' : '1'})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
        
        # raise ValueError('A very specific bad thing happened.')

    def test_get_param_app_id (self):
        response = client.get('/tests/', data={'app_id' : '1'  })
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),3)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='all')
        
        

