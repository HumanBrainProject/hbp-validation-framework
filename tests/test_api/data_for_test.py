from __future__ import unicode_literals

import os
import random
import json

from uuid import uuid4
import uuid

import time
from datetime import datetime


# from django.test import TestCase, Client, RequestFactory
# SimpleTestCase, TransactionTestCase, TestCase, LiveServerTestCase, assertRedirects
# from django.contrib.auth.models import User
# from social.apps.django_app.default.models import UserSocialAuth
# from hbp_app_python_auth.auth import get_access_token, get_token_type, get_auth_header

# from rest_framework.test import APIRequestFactory

# from model_validation_api.models import (ValidationTestDefinition, 
#                         ValidationTestCode,
#                         ValidationTestResult, 
#                         ScientificModel, 
#                         ScientificModelInstance,
#                         ScientificModelImage,   
#                         Comments,
#                         Tickets,
#                         # FollowModel,
#                         CollabParameters,
#                         Param_DataModalities,
#                         Param_TestType,
#                         Param_Species,
#                         Param_BrainRegion,
#                         Param_CellType,
#                         Param_ModelType,
#                         Param_ScoreType,
#                         Param_organizations,
#                         )

# from validation_service.views import config, home

# from model_validation_api.views import (
#                     ModelCatalogView,
#                     HomeValidationView,

#                     ParametersConfigurationRest,
#                     AuthorizedCollabParameterRest,
#                     Models,
#                     ModelAliases,
#                     Tests,
#                     TestAliases,
#                     ModelInstances,
#                     Images,
#                     TestInstances,
#                     TestCommentRest,
#                     CollabIDRest,
#                     AppIDRest,
#                     AreVersionsEditableRest,
#                     ParametersConfigurationModelView,
#                     ParametersConfigurationValidationView,
#                     TestTicketRest,
#                     IsCollabMemberRest,
#                     Results,
#                     CollabAppID,

#                     )

# from model_validation_api.validation_framework_toolbox.fill_db import (
#         create_data_modalities,
#         create_organizations,
#         create_test_types,
#         create_score_type,
#         create_species,
#         create_brain_region,
#         create_cell_type,
#         create_model_type,
#         create_models_test_results,
#         create_fake_collab,
#         create_all_parameters,
#         create_specific_test,
#         create_specific_testcode,
#         create_specific_model,
#         create_specific_result,
#         create_specific_modelinstance,
#         create_specific_ticket,
#         create_specific_comment,
#         create_specific_image,
# )



 

class DataForTests:
    def __init__(self):
        create_all_parameters()
        self.collab1 = create_fake_collab(id='1', 
                        collab_id='2169',
                        data_modality='electrophysiology', 
                        test_type='single cell activity', 
                        species='Mouse (Mus musculus)', 
                        brain_region='Hippocampus',
                        cell_type = 'Interneuron',
                        model_type = 'Single Cell',
                        organization = '',
                        app_type = "model_catalog",
                        )
        self.collab2 = create_fake_collab(id='2', 
                        collab_id='9000',
                        data_modality='electrophysiology', 
                        test_type='single cell activity', 
                        species='Mouse (Mus musculus)', 
                        brain_region='Hippocampus',
                        cell_type = 'Interneuron',
                        model_type = 'Single Cell',
                        organization = '',
                        app_type = "validation_app",
                        
                        
                        )

        #Create 3 tests with different caracteristics
        self.original_time = time.time()

        self.uuid_test1 = uuid.uuid4()
        self.uuid_test1_bis = uuid.uuid4()
        self.uuid_test2 = uuid.uuid4()

        self.uuid_testcode1_1 = uuid.uuid4()
        self.uuid_testcode1_bis_1 = uuid.uuid4()
        self.uuid_testcode2_1 = uuid.uuid4()

        self.test1 = create_specific_test (
                    self.uuid_test1, 
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
        self.test1_bis = create_specific_test (
                    self.uuid_test1_bis, 
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
        self.test2 = create_specific_test (
                    self.uuid_test2, 
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

        self.testcode1 = create_specific_testcode (
                            self.uuid_testcode1_1, 
                            "1.1", 
                            "2017-01-24T14:59:26.031Z", 
                            self.test1,
                            repository = "repo1",
                            path = "path1",
                            )

        self.testcode1_bis = create_specific_testcode (
                            self.uuid_testcode1_bis_1, 
                            "2.1", 
                            "2017-01-24T14:59:26.031Z", 
                            self.test1_bis,
                            repository = "repo2",
                            path = "path2",
                            )

        self.testcode2 = create_specific_testcode (
                            self.uuid_testcode2_1, 
                            "3.1", 
                            "2017-01-24T14:59:26.031Z", 
                            self.test2,
                            repository = "repo3",
                            path = "path3",
                            )

        self.uuid_test1_ticket = uuid.uuid4()
        self.uuid_test1_bis_ticket = uuid.uuid4()
        self.uuid_test2_ticket = uuid.uuid4()

        self.uuid_test1_ticket_comment = uuid.uuid4()
        self.uuid_test1_bis_ticket_comment = uuid.uuid4()
        self.uuid_test2_ticket_comment = uuid.uuid4()

        self.ticket1 = create_specific_ticket (
                                                self.uuid_test1_ticket, 
                                                self.test1,
                                                author = "me1",
                                                title = "title1",
                                                text = "text1",
                                                creation_date = "2017-01-24T14:59:26.031Z", 
                                            )
        self.ticket2 = create_specific_ticket (
                                                self.uuid_test1_bis_ticket, 
                                                self.test1_bis,
                                                author = "me2",
                                                title = "title2",
                                                text = "text2",
                                                creation_date = "2017-01-24T14:59:26.031Z", 
                                                
                                            )
        self.ticket3 = create_specific_ticket (
                                                self.uuid_test2_ticket, 
                                                self.test2,
                                                author = "me3",
                                                title = "title3",
                                                text = "text3",
                                                creation_date = "2017-01-24T14:59:26.031Z", 
                                                
                                            )

        self.comment1 = create_specific_comment (
                                                self.uuid_test1_ticket_comment, 
                                                self.ticket1,
                                                author = "me1",
                                                text = "text1",
                                                creation_date = "2017-01-24T14:59:26.031Z", 
                                                
                                                )

        self.comment2 = create_specific_comment (
                                                self.uuid_test1_bis_ticket_comment, 
                                                self.ticket2,
                                                author = "me2",
                                                text = "text2",
                                                creation_date = "2017-01-24T14:59:26.031Z", 
                                                
                                                )

        self.comment3 = create_specific_comment (
                                                self.uuid_test2_ticket_comment, 
                                                self.ticket3,
                                                author = "me3",
                                                text = "text3",
                                                creation_date = "2017-01-24T14:59:26.031Z", 
                                                
                                                )




        self.uuid_model1 = uuid.uuid4()
        self.uuid_model1_bis_private = uuid.uuid4()
        self.uuid_model2 = uuid.uuid4()
        self.uuid_model3 = uuid.uuid4()
        self.uuid_model4 = uuid.uuid4()
        self.model1 = create_specific_model (
                    self.uuid_model1, 
                    name= "model1", 
                    alias = "M1", 
                    app_id = '1',
                    description = "description1",
                    species = "Mouse (Mus musculus)",
                    brain_region = "Hippocampus",
                    cell_type = "Interneuron",
                    author = "me1",
                    model_type = "Single Cell",
                    private = "0",
                    code_format = "py",
                    organization = "HBP-SP1",
                    
                    )
        self.model1_bis_private = create_specific_model (
                    self.uuid_model1_bis_private, 
                    name= "model1_bis_private", 
                    alias = "M1_bis_private", 
                    app_id = '1',
                    description = "description2",
                    species = "Mouse (Mus musculus)",
                    brain_region = "Hippocampus",
                    cell_type = "Interneuron",
                    author = "me1",
                    model_type = "Single Cell",
                    private = "1",
                    code_format = "py",
                    organization = "<<empty>>",
                    
                    
                    )
        self.model2 = create_specific_model (
                    self.uuid_model2, 
                    name= "model2", 
                    alias = "M2", 
                    app_id = '1',
                    description = "description3",
                    species = "Rat (Rattus rattus)",
                    brain_region = "Cerebellum",
                    cell_type = "Granule Cell",
                    author = "me2",
                    model_type = "Network",
                    private = "0",
                    code_format = "c",
                    organization = "<<empty>>",
                    
                    
                    )

        self.model3 = create_specific_model (
                    self.uuid_model3, 
                    name= "model3", 
                    alias = "M3", 
                    app_id = '2',
                    description = "description4",
                    species = "Rat (Rattus rattus)",
                    brain_region = "Cerebellum",
                    cell_type = "Granule Cell",
                    author = "me2",
                    model_type = "Network",
                    private = "1",
                    code_format = "c",
                    organization = "HBP-SP1",
                    
                    
                    )
        self.model4 = create_specific_model (
                    self.uuid_model4, 
                    name= "model4", 
                    alias = "M4", 
                    app_id = '2',
                    description = "description5",
                    species = "Rat (Rattus rattus)",
                    brain_region = "Cerebellum",
                    cell_type = "Granule Cell",
                    author = "me2",
                    model_type = "Network",
                    private = "0",
                    code_format = "c",
                    organization = "<<empty>>",
                    
                    
                    )


        self.uuid_modelinstance1 = uuid.uuid4()
        self.uuid_modelinstance1_bis_private = uuid.uuid4()
        self.uuid_modelinstance2 = uuid.uuid4()
        self.modelinstance1 = create_specific_modelinstance (
                            self.uuid_modelinstance1, 
                            model = self.model1,  
                            version = "1.1",
                            parameters = "param1",
                            source = "http://dd.com",
                            
                            )
        self.modelinstance1_bis_private = create_specific_modelinstance (
                            self.uuid_modelinstance1_bis_private, 
                            model = self.model1_bis_private,  
                            version = "2.1",
                            parameters = "param2",
                            source = "http://dd.com",
                            
                            )
        self.modelinstance2 = create_specific_modelinstance (
                            self.uuid_modelinstance2, 
                            model = self.model2,  
                            version = "3.1",
                            parameters = "param3",
                            source = "http://dkjgd.com",
                            
                            )

        self.uuid_modelimage1 = uuid.uuid4()
        self.uuid_modelimage1_bis_private = uuid.uuid4()
        self.uuid_modeliimage2 = uuid.uuid4()
        self.uuid_modeliimage3 = uuid.uuid4()
        self.image1 = create_specific_image (
                            self.uuid_modelimage1,
                            self.model1,
                            url = "http://.aa1.com",
                            caption = "caption1",
                            )
        self.image2 = create_specific_image (
                            self.uuid_modelimage1_bis_private,
                            self.model1_bis_private,
                            url = "http://.aa2.com",
                            caption = "caption2",
                            )
        self.image3 = create_specific_image (
                            self.uuid_modeliimage2,
                            self.model2,
                            url = "http://.aa3.com",
                            caption = "caption3",
                            )
        self.image4 = create_specific_image (
                            self.uuid_modeliimage3,
                            self.model3,
                            url = "http://.aa3.com",
                            caption = "caption3",
                            )


        self.uuid_resultM1_T1 = uuid.uuid4()
        self.uuid_resultM1_T2 = uuid.uuid4()
        self.uuid_resultM1_bis_T1_bis = uuid.uuid4()
        self.uuid_resultM2_T2 = uuid.uuid4()

        self.resultM1_T1 = create_specific_result (
                            self.uuid_resultM1_T1, 
                            model_version = self.modelinstance1, 
                            test_code = self.testcode1, 
                            result_storage = "storage1", 
                            score=  1.0, 
                            platform = "azerty1",
                            project = "azerty1",
                            )
        self.resultM1_T2 = create_specific_result (
                            self.uuid_resultM1_T2, 
                            model_version = self.modelinstance1, 
                            test_code = self.testcode2, 
                            result_storage = "storage2", 
                            score=  2.0, 
                            platform = "azerty2",
                            project = "azerty2",
                            )

        # self.resultM1_bis_T1_bis = create_specific_result (
        #                     self.uuid_resultM1_bis_T1_bis, 
        #                     model_version = self.modelinstance1_bis_private, 
        #                     test_code = self.testcode1_bis, 
        #                     result_storage = "storage3", 
        #                     score=  3.0, 
        #                     platform = "azerty3",
        #                     project = "azerty3",
        #                     )
        self.resultM2_T2 = create_specific_result (
                            self.uuid_resultM2_T2, 
                            model_version = self.modelinstance2, 
                            test_code = self.testcode2, 
                            result_storage = "storage4", 
                            score=  4.0, 
                            platform = "azerty4",
                            project = "azerty4",
                            )

