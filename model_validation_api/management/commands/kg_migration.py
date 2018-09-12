from django.core.management.base import BaseCommand
from ...models import (
                    Param_Species, 
                    Param_DataModalities, 
                    Param_TestType, 
                    Param_BrainRegion, 
                    Param_CellType, 
                    Param_organizations,
                    Param_ModelType,
                    Param_ModelScope,
                    Param_ScoreType,
                    Param_AbstractionLevel,
                    CollabParameters,

                    ScientificModel,
                    ScientificModelInstance,
                    Persons
                    # ValidationTestDefinition,
                    # ValidationTestCode,
                    # ValidationTestResult,
                    )
from ...serializer.simple_serializer import PersonSerializer
from tabulate  import tabulate
from nar.brainsimulation import ModelProject
from nar.core import Person
from nar.client import NARClient
from hbp_app_python_auth.auth import get_access_token, get_auth_header
import uuid
import requests
import os
token = os.environ.get('HBP_token', 'none')
nexus_endpoint = "https://nexus-int.humanbrainproject.org/v0"
NAR_client = NARClient(token, nexus_endpoint)



class Command(BaseCommand):
    
    def migrate_models(self):

        models = ScientificModel.objects.all()

        for model in models:

            name = self._reorder_model_parameters(model)

            # var model_project = new ModelProject(model.name, model.alias, model.author, model.owner, model.organization, model.pla_components, model.private, model.collab_id, model.brain_region, model.species, model.cell_type, model.abstraction_level, model.description, model.date_created, model.model_of)

            # model_project.save()

        return ''
    def _getPersons_and_migrate(self):

        authors_list = ScientificModel.objects.all().values_list('author').distinct()
        
        for authors in authors_list:
            authors[0].replace(';',',')
            authors[0].replace('&',',')
            authors[0].replace('and',',') ##not working??? why??
            authors = authors[0].split(',')

            for auth in authors:
                if str(auth)[0] == ' ':
                    auth = str(auth)[1:]
                print('Searching for the author:', auth)
                ###check if pattern already exists
                person_object = Persons.objects.all().filter(pattern = auth)
                if(len(person_object)>0):
                    print('already in database', person_object[0].first_name)
                    self._save_person_in_KG(person_object[0].first_name,person_object[0].last_name, person_object[0].email)
                else:
                    print('This person is not in the database yet.')
                    answer = raw_input('do you want to add it?')
                    if(answer == 'y'):
                        print('You need to enter a new person for: ', auth)
                        first_name = raw_input('please enter the first_name:')
                        last_name = raw_input('please enter the last name:')
                        email = self._get_email(first_name, last_name)
                        data = {'pattern':auth,'first_name':first_name,'last_name':last_name, 'email':email}
                        Person_serializer = PersonSerializer(data=data)
                        if Person_serializer.is_valid():
                            p = Person_serializer.save()
                            print("person saved in postgress:", p)
                            self._save_person_in_KG(first_name = first_name, last_name=last_name, email=email)
                        else:
                            print(Person_serializer.errors)
                        print('checking next person')
                    else:
                        print('checking next person')
    
    def _save_person_in_KG(self,first_name, last_name, email):
        person = Person(family_name=last_name, given_name =first_name, email=email, affiliation='')
        if not person.exists(NAR_client):
            person.save(NAR_client)
            print('saved in KG')
        else:
            print('already exists in KG') 

    def _get_email(self,first_name, last_name):
         
        url = 'https://services.humanbrainproject.eu/idm/v1/api/user/search?displayName=*'+first_name+' '+last_name+'*'
        print('url', url)
        headers={"authorization":"Bearer "+ token }
        
        res = requests.get(url, headers=headers)
        if res.status_code != 200:
            print('cannot find the email from collab')
            email = raw_input('please enter e-mail by hand')
        else:
            res = res.json()['_embedded']['users']
            print('user list found is:')
            for u in res:
                print (u)
            if len(res) >0:
                res = res[0]
                print('email found is: ',res['emails'][0]['value'])
                check = raw_input('is this ok?')
                if(check == 'y'):
                    email =res['emails'][0]['value']
                else:
                    email = raw_input('then, please enter e-mail by hand')
            else:
                    email = raw_input('then, please enter e-mail by hand')
        return email


    def _change_model_parameters(self, model):
        
        model.author = get_person(model.author)
        model.owner = get_person(model.owner)
        model.species = get_parameter("species",model.species)
        model.brain_region = get_parameter("brain_region", model.brain_region)
        model.cell_type = get_parameter("cell_type", model.cell_type)
        model.abstraction_level = get_parameter("abstraction_level", model.abstraction_level)
        model.data_modalities = get_parameter("data_modalities", model.data_modalities)
        model.model_scope = get_parameter("data_modalities", model.model_scope)
        model.model_type = get_parameter("model_type", model.model_type)
        model.organization = get_parameter("organization", model.organization)

        print('new_model',name)
        return model

    def get_parameters(self, parameter_type, parameter_value):
    
        if parameter_type == 'species':
            if parameter_value == 'Mouse (Mus musculus)':
                new_parameter = 'Mus musculus'
            if parameter_value == 'Rat (Rattus rattus)':
                new_parameter = 'Rattus norvegicus'
            if parameter_value == 'Marmoset (callithrix jacchus)':
                new_parameter = 'Callithrix jacchus'
            if parameter_value == 'Human (Homo sapiens)':
                new_parameter = 'Homo sapiens'
            if parameter_value == 'Paxinos Rhesus Monkey (Macaca mulatta)':
                new_parameter = 'Macaca mulatta'
            if parameter_value == 'Opossum (Monodelphis domestica)':
                new_parameter = 'Monodelphis domestica'
            if parameter_value == 'Rodent (non specific)':
                new_parameter = 'Rodentia'

        if parameter == 'brain_region':
            if parameter_value == 'Somatosensory Cortex':
                new_parameter = 'somatosensory cortex'
            if parameter_value == 'Thalamus':
                new_parameter = 'thalamus'
            # if parameter_value == 'Thalamocortical':
            # new_parameter = 'Thalamocortical'
            if parameter_value == 'Brain Stem':
                new_parameter = 'brainstem'
            if parameter_value == 'Spinal Cord':
                new_parameter = 'spinal cord'
            if parameter_value == 'Hippocampus':
                new_parameter = 'hippocampus'
            if parameter_value == 'Basal Ganglia':
                new_parameter = 'basal ganglia'
            if parameter_value == 'Cortex':
                new_parameter = 'cortex'
            if parameter_value == 'Cerebellum':
                new_parameter = 'cerebellum'
            if parameter_value == 'Whole-brain':
                new_parameter = 'whole brain'
            if parameter_value == 'Striatum':
                new_parameter = 'striatum'

        if parameter == 'cell_type':
            # if parameter_value == "L2/3 Chandelier cell":
            #     new_parameter = "L2/3 Chandelier cell"
            # if parameter_value == "Fast spiking interneuron":
            #     new_parameter = "fast spiking interneuron"
            if parameter_value == "Purkinje Cell":
                new_parameter = "Purkinje cell"
            # if parameter_value == "Spiny stellate neuron":
            #     new_parameter = "Spiny stellate neuron"
            if parameter_value == "Medium spiny neuron":
                new_parameter = "medium spiny neuron"
            # if parameter_value == "L5 Tufted pyramidal cell":
            #     new_parameter = "L5 Tufted pyramidal cell"
            if parameter_value == "Interneuron":
                new_parameter = "interneuron"
            # if parameter_value == "L2/3 Pyramidal cell":
            #     new_parameter = "L2/3 Pyramidal cell"
            if parameter_value == "Golgi Cell":
                new_parameter = "Golgi cell"
            # if parameter_value == "Medium spiny neuron (D2 type)":
            #     new_parameter = "Medium spiny neuron (D2 type)"
            # if parameter_value == "L6 Inverted pyramidal cell":
            #     new_parameter = "L6 Inverted pyramidal cell"
            if parameter_value == "L4 Martinotti cell":
                new_parameter = "L4 Martinotti cell"
            # if parameter_value == "Medium spiny neuron (D1 type)":
            #     new_parameter = "Medium spiny neuron (D1 type)"
            if parameter_value == "Pyramidal Cell":
                new_parameter = "Pyramidal Cell"
            if parameter_value == "Granule Cell":
                new_parameter = "Granule Cell"
            # if parameter_value == "Cholinergic interneuron":
            #     new_parameter = "Cholinergic interneuron"
            # if parameter_value == "L1 Neurogliaform cell":
            #     new_parameter = "L1 Neurogliaform cell"
            # if parameter_value == "L2 Inverted pyramidal cell":
            #     new_parameter = "L2 Inverted pyramidal cell"

        return new_parameter


    def migrate_model_instances(self):
        return ''

    # def _search_for_person_or_create():


    def handle(self, *args, **options):
         
        # self.migrate_models()
        self._getPersons_and_migrate()