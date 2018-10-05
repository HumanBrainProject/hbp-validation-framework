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
from nar.core import Person, Organization
from nar.commons import Address, BrainRegion, Species, AbstractionLevel, CellType
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
            authors = self._get_authors_from_Persons_table(model.author)
            for author in authors:
                author.save(NAR_client)
            owner = self._get_person_from_Persons_table(model.owner)
            organization = self.get_organization(model.organization)
            brain_region = self.get_parameters("brain_region", model.brain_region)
            species = self.get_parameters("species", model.species)
            cell_type = self.get_parameters("cell_type", model.cell_type)
            abstraction_level = self.get_parameters("abstraction_level", model.abstraction_level)
            model_scope = self.get_parameters("model_scope", model.model_scope)
            model_project = ModelProject(model.name, owner, authors,  model.description, model.creation_date, model.private, model.app.collab_id, model.alias,  [organization], model.pla_components, brain_region, species, cell_type, abstraction_level, [model_scope])

            model_project.save(NAR_client)

        return ''

    def get_organization (self, pattern):
        organization = None

        if pattern == "HBP-SP1":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP1",address, None ) 
                
        if pattern == "HBP-SP2":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP2",address, None )

        if pattern == "HBP-SP3":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP3",address, None ) 
       
        if pattern == "HBP-SP4":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP4",address, None ) 
    
        if pattern == "HBP-SP5":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP5",address, None ) 
       
        if pattern == "HBP-SP6":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP6",address, None ) 
        
        if pattern == "HBP-SP7":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP7",address, None ) 
            
        if pattern == "HBP-SP8":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP8",address, None ) 
           
        if pattern == "HBP-SP9":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP9",address, None ) 
                
        if pattern == "HBP-SP10":
            address = Address(locality='HBP', country='Europe')
            sp10 = Organization("HBP-SP10",address , None ) 
        
        if pattern == "HBP-SP11":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP11",address , None ) 
       
        if pattern == "HBP-SP12":
            address = Address(locality='HBP', country='Europe')
            organization = Organization("HBP-SP12",address , None ) 
       
        if pattern == "Blue Brain Porject":
            address = Address(locality='Geneva', country='Switzerland')
            organization = Organization("Blue Brain Project",address , None ) 
    
        if pattern == "Allen Institute":
            address = Address(locality='Seattle', country='United States')
            organization = Organization("Allen Institute",address , None ) 
    
        return organization

    def _get_person_from_Persons_table(self, pattern):
        try:
            if str(pattern)[0] == ' ':
                pattern = str(pattern)[1:]
        except:
            print('auth ', pattern)
        try:
            p = Persons.objects.get(pattern = pattern)
            person = Person(family_name=p.last_name, given_name =p.first_name, email=p.email, affiliation='')
            print('person :', person)
        except:
            print('person ', pattern ,' has not been found. please enter it by hand')
            family_name = raw_input('  give the family_name : ')
            given_name = raw_input('  give the first_name : ')
            email = raw_input('  give the email adress : ')
            person = Person(family_name=family_name, given_name =given_name, email=email, affiliation='')
        return person
    
    def _get_authors_from_Persons_table(self, patterns):

            persons = []
            if patterns and patterns != None:
                patterns[0].replace(';',',')
                patterns[0].replace('&',',')
                patterns[0].replace('and',',') ##not working??? why??
                patterns = patterns[0].split(',')

                for pattern in patterns:
                    person = self._get_person_from_Persons_table(pattern)
                    persons.append(person)
            return persons

    def _getPersons_and_migrate(self):

        authors_list = ScientificModel.objects.all().values_list('author').distinct()
        
        for authors in authors_list:
            authors[0].replace(';',',')
            authors[0].replace('&',',')
            authors[0].replace('and',',') ##not working??? why??
            authors = authors[0].split(',')

            for auth in authors:
                try:
                    if str(auth)[0] == ' ':
                        auth = str(auth)[1:]
                except:
                    print('auth ', auth)
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
            print('saved in KG', person)
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
        return model

    def get_parameters(self, parameter_type, parameter_value):
        parameter = None
        if parameter_type == 'species':
            if parameter_value == 'Mouse (Mus musculus)':
                new_parameter = 'Mus musculus'
            elif parameter_value == 'Rat (Rattus rattus)':
                new_parameter = 'Rattus norvegicus'
            elif parameter_value == 'Marmoset (callithrix jacchus)':
                new_parameter = 'Callithrix jacchus'
            elif parameter_value == 'Human (Homo sapiens)':
                new_parameter = 'Homo sapiens'
            elif parameter_value == 'Paxinos Rhesus Monkey (Macaca mulatta)':
                new_parameter = 'Macaca mulatta'
            elif parameter_value == 'Opossum (Monodelphis domestica)':
                new_parameter = 'Monodelphis domestica'
            elif parameter_value == 'Rodent (non specific)':
                new_parameter = 'Rodentia'
            else:
                new_parameter = None

            if new_parameter != None:
                parameter = Species(new_parameter)

        if parameter_type == 'brain_region':
            if parameter_value == 'Somatosensory Cortex':
                new_parameter = 'somatosensory cortex'
            elif parameter_value == 'Thalamus':
                new_parameter = 'thalamus'
            elif parameter_value == 'Thalamocortical':
                new_parameter = 'Thalamocortical'
            elif parameter_value == 'Brain Stem':
                new_parameter = 'brainstem'
            elif parameter_value == 'Spinal Cord':
                new_parameter = 'spinal cord'
            elif parameter_value == 'Hippocampus':
                new_parameter = 'hippocampus'
            elif parameter_value == 'Basal Ganglia':
                new_parameter = 'basal ganglia'
            elif parameter_value == 'Cortex':
                new_parameter = 'cortex'
            elif parameter_value == 'Cerebellum':
                new_parameter = 'cerebellum'
            elif parameter_value == 'Whole-brain':
                new_parameter = 'whole brain'
            elif parameter_value == 'Striatum':
                new_parameter = 'striatum'
            else:
                new_parameter = None

            if new_parameter != None:
                parameter = BrainRegion(new_parameter)

        if parameter_type == 'cell_type':
            if parameter_value == "L2/3 Chandelier cell":
                new_parameter = "L2/3 Chandelier cell"
            elif parameter_value == "Fast spiking interneuron":
                new_parameter = "fast spiking interneuron"
            elif parameter_value == "Purkinje Cell":
                new_parameter = "Purkinje cell"
            elif parameter_value == "Spiny stellate neuron":
                new_parameter = "spiny stellate neuron"
            elif parameter_value == "Medium spiny neuron":
                new_parameter = "medium spiny neuron"
            elif parameter_value == "L5 Tufted pyramidal cell":
                new_parameter = "L5 tufted pyramidal cell"
            elif parameter_value == "Interneuron":
                new_parameter = "interneuron"
            elif parameter_value == "L2/3 Pyramidal cell":
                new_parameter = "L2/3 Pyramidal cell"
            elif parameter_value == "Golgi Cell":
                new_parameter = "Golgi cell"
            elif parameter_value == "Medium spiny neuron (D2 type)":
                new_parameter = "medium spiny neuron (D2 type)"
            elif parameter_value == "L6 Inverted pyramidal cell":
                new_parameter = "L6 Inverted pyramidal cell"
            elif parameter_value == "L4 Martinotti cell":
                new_parameter = "L4 Martinotti cell"
            elif parameter_value == "Medium spiny neuron (D1 type)":
                new_parameter = "medium spiny neuron (D1 type)"
            elif parameter_value == "Pyramidal Cell":
                new_parameter = "pyramidal cell"
            elif parameter_value == "Granule Cell":
                new_parameter = "granule cell"
            elif parameter_value == "Cholinergic interneuron":
                new_parameter = "cholinergic interneuron"
            elif parameter_value == "L1 Neurogliaform cell":
                new_parameter = "L1 neurogliaform cell"
            elif parameter_value == "L2 Inverted pyramidal cell":
                new_parameter = "L2 inverted pyramidal cell"
            else:
                new_parameter = None

            if new_parameter != None:
                parameter = CellType(new_parameter)

        if parameter_type == "abstracion_level":
            if parameter_value == "rate neuron":
                new_parameter = "rate neuron"
            elif parameter_value == "protein structure":
                new_parameter = "protein structure"
            elif parameter_value == "Systems biology -- flux balance":
                new_parameter = "systems biology: flux balance"
            elif parameter_value == "Systems biology -- discrete":
                new_parameter = "systems biology: discrete"
            elif parameter_value == "Systems biology -- continuous":
                new_parameter = "systems biology: continuous"
            elif parameter_value == "Systems biology":
                new_parameter = "systems biology"
            elif parameter_value == "Spiking neurons -- point neuron":
                new_parameter = "spiking neurons: point neuron"
            elif parameter_value == "Spiking neurons -- biophysical":
                new_parameter = "spiking neurons: biophysical"
            elif parameter_value == "Spiking neurons":
                new_parameter = "spiking neurons"
            elif parameter_value == "Population modelling -- neural mass":
                new_parameter = "population modelling: neural mass"
            elif parameter_value == "Population modelling -- neural field":
                new_parameter = "population modelling: neural field"
            elif parameter_value == "Population modelling":
                new_parameter = "population modelling"
            elif parameter_value == "Cognitive modelling":
                new_parameter = "cognitive modelling"
            else:
                new_parameter = None

            if new_parameter != None:
                parameter = AbstractionLevel(new_parameter)

        if parameter_type == "model_scope":
            if parameter_value == "Subcellular model -- spine model":
                new_parameter = "subcellular model: spine model"
            elif parameter_value == "Subcellular model -- ion channel model":
                new_parameter = "subcellular model: ion channel model"
            elif parameter_value == "Subcellular model -- signalling model":
                new_parameter = "subcellular model: signalling model"  
            elif parameter_value == "Subcellular model -- molecular model":
                new_parameter = "subcellular model: molecular model"  
            elif parameter_value == "Single cell model":
                new_parameter = "single cell model"       
            elif parameter_value == "Network model -- microcircuit model":
                new_parameter = "network model: microcircuit model" 
            elif parameter_value == "Network model -- brain region model":
                new_parameter = "network model: brain region model" 
            elif parameter_value == "Network model -- whole brain model":
                new_parameter = "network model: whole brain model" 
            elif parameter_value == "Network model":
                new_parameter = "network model"
            elif parameter_value == "Subcellular model":
                new_parameter = "Subcellular model"  
            else:
                new_parameter = None

            if new_parameter != None:
                parameter = new_parameter

        return parameter

    def add_organizations_in_KG_database(self):
        address1 = Address(locality='HBP', country='Europe')
        sp1 = Organization("HBP-SP1",address1 , None ) 
        sp1.save(NAR_client)

        address2 = Address(locality='HBP', country='Europe')
        sp2 = Organization("HBP-SP2",address2 , None ) 
        sp2.save(NAR_client)

        address3 = Address(locality='HBP', country='Europe')
        sp3 = Organization("HBP-SP3",address3 , None ) 
        sp3.save(NAR_client)

        address4 = Address(locality='HBP', country='Europe')
        sp4 = Organization("HBP-SP4",address4 , None ) 
        sp4.save(NAR_client)
        print(sp1)

        address5 = Address(locality='HBP', country='Europe')
        sp5 = Organization("HBP-SP5",address5 , None ) 
        sp5.save(NAR_client)

        address6 = Address(locality='HBP', country='Europe')
        sp6 = Organization("HBP-SP6",address6 , None ) 
        sp6.save(NAR_client)

        address7 = Address(locality='HBP', country='Europe')
        sp7 = Organization("HBP-SP7",address7 , None ) 
        sp7.save(NAR_client)

        address8 = Address(locality='HBP', country='Europe')
        sp8 = Organization("HBP-SP8",address8 , None ) 
        sp8.save(NAR_client)

        address9 = Address(locality='HBP', country='Europe')
        sp9 = Organization("HBP-SP9",address9 , None ) 
        sp9.save(NAR_client)

        address10 = Address(locality='HBP', country='Europe')
        sp10 = Organization("HBP-SP10",address10 , None ) 
        sp10.save(NAR_client)

        address11 = Address(locality='HBP', country='Europe')
        sp11 = Organization("HBP-SP11",address11 , None ) 
        sp11.save(NAR_client)

        address12 = Address(locality='HBP', country='Europe')
        sp12 = Organization("HBP-SP12",address12 , None ) 
        sp12.save(NAR_client)

        addressBBP = Address(locality='Geneva', country='Switzerland')
        BBP = Organization("Blue Brain Project",addressBBP , None ) 
        BBP.save(NAR_client)
           
        addressAllen = Address(locality='Seattle', country='United States')
        spAllen = Organization("Allen Institute",addressAllen , None ) 
        spAllen.save(NAR_client)

        return ''

    def migrate_model_instances(self):
        return ''

    # def _search_for_person_or_create():


    def handle(self, *args, **options):
         
        self._getPersons_and_migrate()
        self.add_organizations_in_KG_database()
        #self.add_cell_types_in_KG_database()

        self.migrate_models()