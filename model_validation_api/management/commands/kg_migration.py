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
from nar.brainsimulation import ModelProject, MEModel, EModel, Morphology, ModelScript, ModelInstance
from nar.core import Person, Organization
from nar.commons import Address, BrainRegion, Species, AbstractionLevel, CellType
from nar.client import NARClient
from nar.base import KGQuery
from hbp_app_python_auth.auth import get_access_token, get_auth_header
import uuid
import requests
import os
import json
import datetime
import logging
try:
    raw_input
except NameError:
    raw_input = input

logger = logging.getLogger("kg_migration")

token = os.environ.get('HBP_token', 'none')
nexus_endpoint = "https://nexus-int.humanbrainproject.org/v0"
NAR_client = NARClient(token, nexus_endpoint)


species_map = {
    'Mouse (Mus musculus)': 'Mus musculus',
    'Rat (Rattus rattus)': 'Rattus norvegicus',
    'Marmoset (callithrix jacchus)': 'Callithrix jacchus',
    'Human (Homo sapiens)': 'Homo sapiens',
    'Paxinos Rhesus Monkey (Macaca mulatta)': 'Macaca mulatta',
    'Opossum (Monodelphis domestica)': 'Monodelphis domestica',
    'Rodent (non specific)': 'Rodentia'
}

brain_region_map = {
    'Somatosensory Cortex': 'somatosensory cortex',
    'Thalamus': 'thalamus',
    'Thalamocortical': 'Thalamocortical',
    'Brain Stem': 'brainstem',
    'Spinal Cord': 'spinal cord',
    'Hippocampus': 'hippocampus',
    'Basal Ganglia': 'basal ganglia',
    'Cortex': 'cortex',
    'Cerebellum': 'cerebellum',
    'Whole-brain': 'whole brain',
    'Striatum': 'striatum'
}

cell_type_map = {
    "L2/3 Chandelier cell": "L2/3 Chandelier cell",
    "Fast spiking interneuron": "fast spiking interneuron",
    "Purkinje Cell": "Purkinje cell",
    "Spiny stellate neuron": "spiny stellate neuron",
    "Medium spiny neuron": "medium spiny neuron",
    "L5 Tufted pyramidal cell": "L5 tufted pyramidal cell",
    "Interneuron": "interneuron",
    "L2/3 Pyramidal cell": "L2/3 Pyramidal cell",
    "Golgi Cell": "Golgi cell",
    "Medium spiny neuron (D2 type)": "medium spiny neuron (D2 type)",
    "L6 Inverted pyramidal cell": "L6 Inverted pyramidal cell",
    "L4 Martinotti cell": "L4 Martinotti cell",
    "Medium spiny neuron (D1 type)": "medium spiny neuron (D1 type)",
    "Pyramidal Cell": "pyramidal cell",
    "Granule Cell": "granule cell",
    "Cholinergic interneuron": "cholinergic interneuron",
    "L1 Neurogliaform cell": "L1 neurogliaform cell",
    "L2 Inverted pyramidal cell": "L2 inverted pyramidal cell"
}

abstraction_level_map = {
    "rate neuron": "rate neuron",
    "protein structure": "protein structure",
    "Systems biology -- flux balance": "systems biology: flux balance",
    "Systems biology -- discrete": "systems biology: discrete",
    "Systems biology -- continuous": "systems biology: continuous",
    "Systems biology": "systems biology",
    "Spiking neurons -- point neuron": "spiking neurons: point neuron",
    "Spiking neurons -- biophysical": "spiking neurons: biophysical",
    "Spiking neurons": "spiking neurons",
    "Population modelling -- neural mass": "population modelling: neural mass",
    "Population modelling -- neural field": "population modelling: neural field",
    "Population modelling": "population modelling",
    "Cognitive modelling": "cognitive modelling"
}

author_special_cases = {
    "Jeanette Hellgren Kotaleski": ("Jeanette", "Hellgren Kotaleski"),
    "João Pedro Santos": ("João Pedro", "Santos"),
    "Yi Ming Lai": ("Yi Ming", "Lai"),
    "Luis Georg Romundstad": ("Luis Georg", "Romundstad"),
    "Johanna Frost Nylen": ("Johanna", "Frost Nylen"),
    "Pål Gunnar Larsson": ("Pål Gunnar", "Larsson"),
    "André Sevenius Nilsen": ("André Sevenius", "Nilsen"),
    "Gabriel Andrés Fonseca Guerra": ("Gabriel Andrés", "Fonseca Guerra"),
    "Pier Stanislao Paolucci": ("Pier Stanislao", "Paolucci"),
    "BBP-team": ("BBP", "team")
}

model_scope_map = {
    "Subcellular model -- spine model": "subcellular model: spine model",
    "Subcellular model -- ion channel model": "subcellular model: ion channel model",
    "Subcellular model -- signalling model": "subcellular model: signalling model",
    "Subcellular model -- molecular model": "subcellular model: molecular model",
    "Single cell model": "single cell model",
    "Network model -- microcircuit model": "network model: microcircuit model",
    "Network model -- brain region model": "network model: brain region model",
    "Network model -- whole brain model": "network model: whole brain model",
    "Network model": "network model",
    "Subcellular model": "Subcellular model"
}

def resolve_name(full_name):
    if full_name in author_special_cases:
        first_name, last_name = author_special_cases[full_name]
    else:
        parts = full_name.strip().split(" ")
        if len(parts) == 2:
            first_name, last_name = parts
        elif len(parts) == 3 and ("." in parts[1] or len(parts[1]) == 1 or parts[1] in ("van", "de", "di", "Del", "De")):
            first_name = " ".join(parts[0:2])
            last_name = parts[2]
        else:
            first_name, last_name = None, None
            #print("ERR: {}".format(full_name))
            raise Exception(str(parts))
    if last_name:
        logger.debug("Resolved {} to {}, {}".format(full_name, last_name, first_name))
    return first_name, last_name


def lookup_model_project(model_name, client):
    context = {"schema": "http://schema.org/"}
    query_filter = {
        "path": "schema:name",
        "op": "eq",
        "value": model_name
    }
    query = KGQuery(ModelProject, query_filter, context)
    try:
        return query.resolve(client)
    except Exception as err:
        logger.error("Error in lookup_model_project:\n{}".format(err))
        return None


class Command(BaseCommand):

    def migrate_models(self):

        models = ScientificModel.objects.all()

        for model in models:
            authors = self._get_people_from_Persons_table(model.author)
            for author in authors:
                author.save(NAR_client)
            owners = self._get_people_from_Persons_table(model.owner)
            for owner in owners:
                owner.save(NAR_client)
            organization = self.get_organization(model.organization)
            brain_region = self.get_parameters("brain_region", model.brain_region)
            species = self.get_parameters("species", model.species)
            cell_type = self.get_parameters("cell_type", model.cell_type)
            abstraction_level = self.get_parameters("abstraction_level", model.abstraction_level)
            model_scope = self.get_parameters("model_scope", model.model_scope)

            model_project = ModelProject(
                name=model.name, owners=owners, authors=authors, description=model.description,
                date_created=model.creation_date, private=model.private,
                collab_id=model.app.collab_id, alias=model.alias,  organization=organization,
                pla_components=model.pla_components, brain_region=brain_region, species=species,
                celltype=cell_type, abstraction_level=abstraction_level,
                model_of=model_scope,  # to fix
                old_uuid=str(model.id))

            #print ("--authors",model_project.authors)
            #print ("--organization",model_project.organization)
            #print ("--brain_region",model_project.brain_region)
            #print ("--species",model_project.species)

            try:
                model_project.save(NAR_client)
            except Exception as err:
                logger.error(err)
            else:
                logger.info("ModelProject saved: %s", model_project)
            print (model_project)
        return ''

    def get_organization(self, pattern):
        organization = None
        if pattern is not None:
            if "HBP-SP" in pattern:
                address = Address(locality='HBP', country='Europe')
                organization = Organization(pattern, address, None)
            elif pattern == "Blue Brain Project":
                address = Address(locality='Geneva', country='Switzerland')
                organization = Organization("Blue Brain Project", address, None)
            elif pattern == "Allen Institute":
                address = Address(locality='Seattle', country='United States')
                organization = Organization("Allen Institute", address, None)
            elif pattern in ("KTH-UNIC", "KOKI-UNIC"):
                address = Address(locality='HBP', country='Europe')
                organization = Organization("HBP-SP6", address, None)
            elif pattern == "<<empty>>":
                organization = None
            else:
                raise ValueError("Can't handle this pattern: {}".format(pattern))

        return organization

    def _get_person_from_Persons_table(self, pattern):
        logger.debug("getting person %s", pattern)
        pattern = pattern.strip()
        try:
            p = Persons.objects.get(pattern=pattern)
            person = Person(family_name=str(p.last_name), given_name =str(p.first_name), email=str(p.email), affiliation='')
            logger.debug('person : %s', person)
        except:
            if pattern != None:
                raise Exception(pattern)
                print('person ', pattern ,' has not been found. please enter it by hand')
                family_name = raw_input('  give the family_name : ')
                given_name = raw_input('  give the first_name : ')
                email = raw_input('  give the email adress : ')
                person = Person(family_name=str(family_name), given_name =str(given_name), email=str(email), affiliation='')
            else:
                person = None
        return person

    def _get_people_from_Persons_table(self, patterns):
            persons = []
            if patterns and patterns != None:
                patterns = patterns.replace(';',',')
                patterns = patterns.replace('&',',')
                patterns = patterns.replace(' and ',',')
                patterns = [p.strip() for p in patterns.split(',')]
                logger.debug("new pattern %s and len %s", patterns, len(patterns))
                for pattern in patterns:
                    person = self._get_person_from_Persons_table(pattern)
                    persons.append(person)
            return persons

    def _create_person_in_kg(self, person):
        logger.debug('Searching KG for the person: %s', person)
        if " and " in person:
            raise Exception(person)
        ###check if pattern already exists
        person_object = Persons.objects.filter(pattern=person)
        if len(person_object ) >0:
            logger.debug('already in database %s', person_object[0].last_name)
            self._save_person_in_KG(person_object[0].first_name,person_object[0].last_name, person_object[0].email)
        else:
            print('This person is not in the database yet: {}'.format(person))
            answer = raw_input('do you want to add it?')
            if (answer == 'y'):
                try:
                    first_name, last_name = resolve_name(person)
                except ValueError:
                    first_name = raw_input('please enter the first_name:')
                    last_name = raw_input('please enter the last name:')
                email = self._get_email(first_name, last_name)
                data = {'pattern':person,'first_name':first_name,'last_name':last_name, 'email':email}
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

    def _getPersons_and_migrate(self):

        authors_list = ScientificModel.objects.all().values_list('author').distinct()
        owners_list = ScientificModel.objects.all().values_list('owner').distinct()

        for authors in authors_list:
            if isinstance(authors, tuple):
                authors = authors[0]
            authors = authors.replace(';',',')
            authors = authors.replace('&',',')
            authors = authors.replace(' and ',',')
            authors = [a.strip() for a in authors.split(',')]

            for auth in authors:
                self._create_person_in_kg(auth)

        for owners in owners_list:
            if isinstance(owners, tuple):
                owners = owners[0]
            if owners is None:
                continue
            owners = owners.replace(';',',')
            owners = owners.replace('&',',')
            owners = owners.replace(' and ',',')
            owners = [a.strip() for a in owners.split(',')]
            for owner in owners:
                self._create_person_in_kg(auth)


    def _save_person_in_KG(self,first_name, last_name, email):
        person = Person(family_name=last_name, given_name =first_name, email=email, affiliation='')
        if not person.exists(NAR_client):
            person.save(NAR_client)
            logger.debug('saved in KG: %s', person)
        else:
            logger.debug('already exists in KG: %s', person)

    def _get_email(self,first_name, last_name):

        url = 'https://services.humanbrainproject.eu/idm/v1/api/user/search?displayName=*'+first_name+' '+last_name+'*'
        headers={"authorization":"Bearer "+ token }

        res = requests.get(url, headers=headers)
        if res.status_code != 200:
            logger.debug('cannot find the email from collab')
            ##email = raw_input('please enter e-mail by hand')
            email = "unknown@example.com"
        else:
            res = res.json()['_embedded']['users']
            logger.debug('user list found is:')
            for u in res:
                logger.debug(u)
            if len(res) >0:
                res = res[0]
                logger.debug('email found is: ',res['emails'][0]['value'])
                check = raw_input('is this ok?')
                if(check == 'y'):
                    email =res['emails'][0]['value']
                else:
                    email = raw_input('then, please enter e-mail by hand')
            else:
                    ###email = raw_input('then, please enter e-mail by hand')
                    email = "unknown@example.com"
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
            new_parameter = species_map.get(parameter_value)
            if new_parameter != None:
                parameter = Species(new_parameter)

        if parameter_type == 'brain_region':
            new_parameter = brain_region_map.get(parameter_value)
            if new_parameter != None:
                parameter = BrainRegion(new_parameter)

        if parameter_type == 'cell_type':
            new_parameter = cell_type_map.get(parameter_value)
            if new_parameter != None:
                parameter = CellType(new_parameter)

        if parameter_type == "abstraction_level":
            new_parameter = abstraction_level_map.get(parameter_value)
            if new_parameter != None:
                parameter = AbstractionLevel(new_parameter)

        if parameter_type == "model_scope":
            new_parameter = model_scope_map.get(parameter_value)
            if new_parameter != None:
                parameter = new_parameter

        return parameter

    def add_organizations_in_KG_database(self):
        address = Address(locality='HBP', country='Europe')
        for sp_num in range(1, 13):
            org = Organization("HBP-SP{}".format(sp_num), address, None)
            org.save(NAR_client)
        addressBBP = Address(locality='Geneva', country='Switzerland')
        BBP = Organization("Blue Brain Project", addressBBP, None)
        BBP.save(NAR_client)

        addressAllen = Address(locality='Seattle', country='United States')
        spAllen = Organization("Allen Institute", addressAllen , None )
        spAllen.save(NAR_client)

        return ''

    def migrate_model_instances(self):
        """ """
        # mapping is based on abstraction_level and on model_scope
        for model in ScientificModel.objects.all():
            brain_region = self.get_parameters("brain_region", model.brain_region)
            species = self.get_parameters("species", model.species)
            cell_type = self.get_parameters("cell_type", model.cell_type)
            model_project = lookup_model_project(model.name, NAR_client)
            if model_project:
                instances = []
                for model_instance in model.instances.all():
                    if model.model_scope == "Single cell model":

                        # MEModel - mostly this is what we want; there are a few single cell models from the literature that are not MEModels
                        e_model = EModel(name="EModel for {} @ {}".format(model.name, model_instance.version),
                                        brain_region=brain_region,
                                        species=species,
                                        model_of=None,
                                        main_script=None,
                                        release=None)  # ModelCatalog doesn't contain any information about releases, I don't think? Maybe create from 'version' attribute
                        try:
                            e_model.save(NAR_client)
                        except Exception as err:
                            logger.error("Error saving EModel:\n{}".format(err))
                            continue
                        morphology = Morphology(name="EModel for {} @ {}".format(model.name, model_instance.version),
                                                cell_type=cell_type,
                                                morphology_file=model_instance.morphology)
                        try:
                            morphology.save(NAR_client)
                        except Exception as err:
                            logger.error("Error saving Morphology:\n{}".format(err))
                            continue
                        script = ModelScript(name="ModelScript for {} @ {}".format(model.name, model_instance.version),
                                             code_format=model_instance.code_format,
                                             code_location=model_instance.source)
                        try:
                            script.save(NAR_client)
                        except Exception as err:
                            logger.error("Error saving Script:\n{}".format(err))
                            continue
                        memodel = MEModel(name="MEModel for {} @ {}".format(model.name, model_instance.version),
                                          description=model_instance.description,
                                          brain_region=brain_region,
                                          species=species,
                                          model_of=cell_type,
                                          e_model=e_model,
                                          morphology=morphology,
                                          main_script=script,
                                          project=model_project,
                                          version=model_instance.version,
                                          parameters=model_instance.parameters,
                                          timestamp=model_instance.timestamp,
                                          release=None)  # see comment above about release
                        try:
                            memodel.save(NAR_client)
                            instances.append(memodel)
                        except Exception as err:
                            logger.error("Error saving MEModel:\n{}".format(err))
                            continue
                        print("SUCCESS for instance in '{}'".format(model.name))
                    else:
                        # Use plain ModelInstance where no more-specific sub-type exists
                        script = ModelScript(name="ModelScript for {} @ {}".format(model.name, model_instance.version),
                                             code_format=model_instance.code_format,
                                             code_location=model_instance.source)
                        try:
                            script.save(NAR_client)
                        except Exception as err:
                            logger.error("Error saving Script:\n{}".format(err))
                            continue
                        minst = ModelInstance(name="ModelInstance for {} @ {}".format(model.name, model_instance.version),
                                              description=model_instance.description,
                                              brain_region=brain_region,
                                              species=species,
                                              model_of=None,
                                              main_script=script,
                                              version=model_instance.version,
                                              parameters=model_instance.parameters,
                                              timestamp=model_instance.timestamp,
                                              release=None)  # see comment above about release
                        try:
                            minst.save(NAR_client)
                            instances.append(minst)
                        except Exception as err:
                            logger.error("Error saving ModelInstance:\n{}".format(err))
                            continue
                        print("SUCCESS for instance in '{}'".format(model.name))
                model_project.instances = instances
                model_project.save(NAR_client)
            else:
                logger.warning("Skipping {}, couldn't find model project".format(model.name))
        return ''

    # def _search_for_person_or_create():

    def save_model_project(self):
        # used for testing/development. Can be deleted once everything is working.
        models = ScientificModel.objects.all()
        model = models[0]

        organization = self.get_organization(model.organization) ##checked ok
        owner =self._get_person_from_Persons_table(model.owner) ##checked ok
        people = self._get_people_from_Persons_table(model.author) ## checked working only if already saved
        for p in people:
            p.save(NAR_client)
        celltype = self.get_parameters("cell_type", model.cell_type) ##checked ok
        abstraction = self.get_parameters("abstraction_level", model.abstraction_level)
        brainregion = self.get_parameters("brain_region", model.brain_region)
        species = self.get_parameters("species", model.species)
        description = model.description
        model_of = self.get_parameters("model_scope", model.model_scope)  # temporary, to fix
        pla_components = model.pla_components         #self._get_person_from_Persons_table(model.owner) #self._get_people_from_Persons_table(model.author)
        collab_id = model.app.collab_id
        date_created = model.creation_date
        private = model.private
        alias = model.alias
        name = model.name
        print("model is ",model)
        # print("authors are:",people)
         # self._get_person_from_Persons_table("heli")
        # p1 = Person("onur", "ates", "ates.onur@outlook.com", None)
        # p1.save(NAR_client)

        # todo: license

        d = ModelProject(name=name, description=description, date_created=date_created,
                         collab_id=collab_id, owner=owner, authors=people, private=private,
                         organization=organization, pla_components=pla_components, alias=alias,
                         model_of=model_of, brain_region=brainregion, species=species,
                         celltype=celltype, abstraction_level=abstraction)

        d.save(NAR_client)

        print (d)

    def handle(self, *args, **options):

        #self._getPersons_and_migrate()
        #self.add_organizations_in_KG_database()
        self.migrate_models()
        self.migrate_model_instances()
        ###self.save_model_project()

{
    '@context':
        {'name': 'schema:name', 'alias': 'nsg:alias', 'author': 'schema:author', 'owner': 'nsg:owner', 'organization': 'nsg:organization', 'PLAComponents': 'nsg:PLAComponents', 'private': 'nsg:private', 'collabID': 'nsg:collabID', 'brainRegion': 'nsg:brainRegion', 'species': 'nsg:species', 'celltype': 'nsg:celltype', 'abstractionLevel': 'nsg:abstractionLevel', 'modelOf': 'nsg:modelOf', 'description': 'schema:description', 'nsg': 'https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/', 'prov': 'http://www.w3.org/ns/prov#', 'schema': 'http://schema.org/', 'dateCreated': 'schema:dateCreated'},
    '@type': ['prov:Entity', 'nsg:ModelProject'],
    'author': [
        {
            '@type': ['nsg:Person', 'prov:Agent'],
            '@id': 'https://nexus-int.humanbrainproject.org/v0/data/neuralactivity/core/person/v0.1.0/11d1d326-0c94-4edb-b664-294be9840847'
        }
    ],
    'name': 'CA1_int_bAC_011127HP1_20170511120536',
    'collabID': 2270,
    'description': 'This model is being used to demonstrate use of the Validation Service',
    'private': False,
    'dateCreated': '18/12/17, 01:41',
    'organization': {'@type': 'nsg:Organization', '@id': None},
    'modelOf': 'single cell model',
    'brainRegion': {
        '@id': 'http://purl.obolibrary.org/obo/UBERON_0001954', 'label': 'hippocampus'
    },
    'species': {
        '@id': 'http://purl.obolibrary.org/obo/NCBITaxon_10116', 'label': 'Rattus norvegicus'
    },
    'celltype': {
        '@id': 'http://purl.obolibrary.org/obo/CL_0000598', 'label': 'pyramidal cell'
    },
    'oldUUID': '8eba68ab-ee07-4c9b-baa7-353626cc335a'
}
