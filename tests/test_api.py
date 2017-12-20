"""
Tests of the ValidationFramework API.
"""

from __future__ import unicode_literals
from datetime import datetime
# import pytz
import random
# from copy import copy
import json
from uuid import uuid4

from django.test import TestCase, Client, RequestFactory

from rest_framework.test import APIRequestFactory

from django.contrib.auth.models import User
# from django.core import mail
# from tastypie.authentication import Authentication
# from tastypie.models import ApiKey
from social.apps.django_app.default.models import UserSocialAuth

from model_validation_api.models import (ValidationTestDefinition, 
                        ValidationTestCode,
                        ValidationTestResult, 
                        ScientificModel, 
                        ScientificModelInstance,
                        ScientificModelImage,   
                        Comments,
                        Tickets,
                        # FollowModel,
                        Param_DataModalities,
                        Param_TestType,
                        Param_Species,
                        Param_BrainRegion,
                        Param_CellType,
                        Param_ModelType,
                        CollabParameters,
                        Param_ScoreType,
                        Param_organizations,
                        )

# from .api.resources import QueueResource, ResultsResource
# from .api.auth import CollabAuthorization
# from quotas.models import Quota, Project


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
                    # NotificationRest,
                    ParametersConfigurationModelView,
                    ParametersConfigurationValidationView,
                    TestTicketRest,
                    IsCollabMemberRest,
                    Results,
                    CollabAppID,

                    )

from hbp_app_python_auth.auth import get_access_token, get_token_type, get_auth_header

from auth_for_test_taken_from_validation_clien import BaseClient
import os


class Snipet(TestCase) :
    
    def test_snipet (self):
        
        username = os.environ.get('HBP_USERNAME')


        client = BaseClient(username = username)
        test_client = Client(HTTP_AUTHORIZATION=client.token)
        response = test_client.get('/tests/', {})
        response.status_code

        print response

        self.assertEqual(response.status_code, 200)

        raise ValueError('A very specific bad thing happened.')
        