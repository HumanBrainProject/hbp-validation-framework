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
                    Persons,
                    ValidationTestDefinition,
                    ValidationTestCode,
                    ValidationTestResult
                    )
from ...serializer.simple_serializer import PersonSerializer
from tabulate  import tabulate
from fairgraph.brainsimulation import (ModelProject, MEModel, EModel, Morphology, ModelScript, ModelInstance,
                                 ValidationTestDefinition as ValidationTestDefinitionKG, AnalysisResult,
                                 ValidationScript, ValidationActivity, ValidationResult)
from fairgraph.core import Person, Organization, Collection
from fairgraph.commons import Address, BrainRegion, Species, AbstractionLevel, CellType, ModelScope
from fairgraph.client import KGClient
from fairgraph.base import KGQuery, Distribution, as_list
from hbp_app_python_auth.auth import get_access_token, get_auth_header
from hbp_service_client.storage_service.client import Client as StorageClient
from hbp_service_client.storage_service.exceptions import StorageForbiddenException, StorageNotFoundException
import uuid
import requests
import os
import json
import datetime
import logging
from time import sleep
try:
    raw_input
except NameError:
    raw_input = input

logger = logging.getLogger("kg_migration")

nexus_token = os.environ['HBP_token']
#nexus_endpoint = "https://nexus-int.humanbrainproject.org/v0"
nexus_endpoint = "https://nexus.humanbrainproject.org/v0"
NAR_client = KGClient(nexus_token, nexus_endpoint)



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
    "Werner Van Geit": ("Werner", "Van Geit"),
    "Sacha van Albada": ("Sacha", "van Albada"),
    "Paolo Del Giudice": ("Paolo", "Del Giudice"),
    "Ignazio De Blasi": ("Ignazio", "De Blasi"),
    "Marc de Kamps": ("Marc", "de Kamps"),
    "José Francisco Gómez González": ("José Francisco", "Gómez González"),
    "Ivilin Peev Stoianov": ("Ivilin Peev", "Stoianov"),
    "BBP-team": ("BBP", "team")
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


def lookup_model_project(model_name, date_created, client):
    context = {"schema": "http://schema.org/"}
    query_filter = {
        "op": "and",
        "value": [
            {
                "path": "schema:name",
                "op": "eq",
                "value": model_name
            },
            {
                "path": "schema:dateCreated",
                "op": "eq",
                "value": date_created.isoformat()
            }
        ]
    }
    query = KGQuery(ModelProject, query_filter, context)
    #try:
    return query.resolve(client)
    #except Exception as err:
    #    logger.error("Error in lookup_model_project:\n{}".format(err))
    #    return None


def lookup_model_instance(model_instance_old_uuid, client):
    query_filter = {"path": "nsg:providerId", "op": "eq", "value": model_instance_old_uuid}
    context = {"nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/", "oldUUID": "nsg:providerId"}
    query = KGQuery(ModelInstance, query_filter, context)
    result = query.resolve(client)
    if not(result):
        query = KGQuery(MEModel, query_filter, context)
        result = query.resolve(client)
    return result


def lookup_test_script(test_script_old_uuid, client):
    query_filter = {"path": "nsg:providerId", "op": "eq", "value": test_script_old_uuid}
    context = {"nsg": "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/", "oldUUID": "nsg:providerId"}
    query = KGQuery(ValidationScript, query_filter, context)
    return query.resolve(client)


def get_file_list(folder_uri, storage_client):
    if folder_uri.startswith("collab:"):
        path = folder_uri[8:]
        try:
            filenames = storage_client.list(path)
        except StorageForbiddenException:
            logger.error("Unable to access Collab storage for '{}', returning empty list".format(path))
            filenames = []
        except StorageNotFoundException:
            logger.error("Not found in Collab storage for '{}', returning empty list".format(path))
            filenames = []
        # todo: check if contents are files or folders
        logger.info("Found {} files in Collab storage '{}'".format(len(filenames), path))
        return ["https://collab-storage-redirect.brainsimulation.eu{}/{}".format(path, filename).replace(" ", "+")
                for filename in filenames]
    elif folder_uri.startswith("http:"):
        raise NotImplementedError()
    else:
        return []


class Command(BaseCommand):

    def migrate_models(self):

        models = ScientificModel.objects.all()
        #models = ScientificModel.objects.filter(id="121e8d61-d20b-43c9-b339-bea8fd6975db")

        for model in models:
            authors = self._get_people_from_Persons_table(model.author)
            for author in authors:
                author.save(NAR_client)
            owners = self._get_people_from_Persons_table(model.owner)
            for owner in owners:
                owner.save(NAR_client)
            if len(owners) == 0:
                owners = authors[-1:]
            if len(owners) > 1:
                owners = owners[0]  # temporary, need to fix schema to remove maxCount: 1
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
                images=[{"url": im.url, "caption": im.caption} for im in model.images.all()],
                old_uuid=str(model.id))

            #print ("--authors",model_project.authors)
            #print ("--organization",model_project.organization)
            #print ("--brain_region",model_project.brain_region)
            #print ("--species",model_project.species)

            try:
                model_project.save(NAR_client)
            except Exception as err:
                if "internal server error" in err.response.text:
                    logger.error(err)
                else:
                    raise
            else:
                logger.info("ModelProject saved: %s", model_project)
                print(model_project)

        # models_with_parents = ScientificModel.objects.filter(parents__isnull=False)
        # for model in models_with_parents:
        #     mp = ModelProject.by_name(model.name, NAR_client)
        #     for parent_obj in model.parents.all():
        #         parent_kg = ModelProject.by_name(parent_obj.name, NAR_client)
        #         mp.parents = as_list(mp.parents) + [parent_kg]
        #     mp.save(NAR_client)
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
                #raise Exception(pattern)
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
            #raise Exception(person)
            print('This person is not in the database yet: {}'.format(person))
            answer = raw_input('do you want to add it?')
            if (answer in ('y', 'yes', 'Y')):
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

        for authors in ValidationTestDefinition.objects.all().values_list('author').distinct():
            for authors in authors_list:
                if isinstance(authors, tuple):
                    authors = authors[0]
                authors = authors.replace(';',',')
                authors = authors.replace('&',',')
                authors = authors.replace(' and ',',')
                authors = [a.strip() for a in authors.split(',')]

                for auth in authors:
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
        headers={"authorization":"Bearer "+ nexus_token }

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
                if check in ('y', 'Y', 'yes'):
                    email =res['emails'][0]['value']
                else:
                    email = raw_input('then, please enter e-mail by hand')
            else:
                    ###email = raw_input('then, please enter e-mail by hand')
                    email = "unknown@example.com"
        return email

    def get_parameters(self, parameter_type, parameter_value):
        parameter = None
        if parameter_type == 'species':
            if parameter_value not in (None, '', "Undefined", "Other"):
                parameter = Species(parameter_value, strict=True)

        if parameter_type == 'brain_region':
            if parameter_value not in (None, '', 'other'):
                parameter = BrainRegion(parameter_value, strict=True)

        if parameter_type == 'cell_type':
            if parameter_value not in (None, '', 'other'):
                parameter = CellType(parameter_value, strict=True)

        if parameter_type == "abstraction_level":
            if parameter_value not in (None, '', "other"):
                parameter = AbstractionLevel(parameter_value, strict=True)

        if parameter_type == "model_scope":
            if parameter_value not in (None, '', 'other'):
                parameter = ModelScope(parameter_value, strict=True)

        if parameter_type == "age":
            parameter = None  # temporary

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
        models = ScientificModel.objects.exclude(name__contains="emodel")
        #models = ScientificModel.objects.filter(id="121e8d61-d20b-43c9-b339-bea8fd6975db")
        for model in models:
            brain_region = self.get_parameters("brain_region", model.brain_region)
            species = self.get_parameters("species", model.species)
            cell_type = self.get_parameters("cell_type", model.cell_type)
            try:
                model_project = lookup_model_project(model.name, model.creation_date, NAR_client)
            except Exception as err:
                if "internal server error" in err.response.text or "unexpected http response" in err.response.text:
                    logger.error("Lookup failed for model {}".format(model.name))
                    continue
                else:
                    raise
            if model_project:
                instances = []
                for model_instance in model.instances.all():
                    if model.model_scope == "single cell":

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
                        if model_instance.morphology:
                            if model_instance.morphology.startswith('http'):
                                morph_file = model_instance.morphology
                            elif model_instance.morphology.startswith('['):
                                morph_file = json.loads(model_instance.morphology)
                            else:
                                raise ValueError("Invalid morphology data: '{}'".format(model_instance.morphology))
                        else:
                            morph_file = None
                        morphology = Morphology(name="Morphology for {} @ {}".format(model.name, model_instance.version),
                                                cell_type=cell_type,
                                                morphology_file=morph_file)
                        #try:
                        morphology.save(NAR_client)
                        #except Exception as err:
                        #    logger.error("Error saving Morphology:\n{}".format(err))
                        #    continue
                        script = ModelScript(name="ModelScript for {} @ {}".format(model.name, model_instance.version),
                                             code_format=model_instance.code_format,
                                             code_location=model_instance.source)
                        #try:
                        script.save(NAR_client)
                        #except Exception as err:
                        #    logger.error("Error saving Script:\n{}".format(err))
                        #    continue
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
                                          old_uuid=str(model_instance.id),
                                          release=None)  # see comment above about release
                        #try:
                        memodel.save(NAR_client)
                        instances.append(memodel)
                        #except Exception as err:
                        #    logger.error("Error saving MEModel:\n{}".format(err))
                        #    continue
                        print("SUCCESS for instance in '{}'".format(model.name))
                    else:
                        # Use plain ModelInstance where no more-specific sub-type exists
                        script = ModelScript(name="ModelScript for {} @ {}".format(model.name, model_instance.version),
                                             code_format=model_instance.code_format,
                                             code_location=model_instance.source,
                                             license=model_instance.license)
                        #try:
                        script.save(NAR_client)
                        #except Exception as err:
                        #    logger.error("Error saving Script:\n{}".format(err))
                        #    continue
                        minst = ModelInstance(name="ModelInstance for {} @ {}".format(model.name, model_instance.version),
                                              description=model_instance.description,
                                              brain_region=brain_region,
                                              species=species,
                                              model_of=None,
                                              main_script=script,
                                              version=model_instance.version,
                                              parameters=model_instance.parameters,
                                              timestamp=model_instance.timestamp,
                                              old_uuid=str(model_instance.id),
                                              release=None)  # see comment above about release
                        #try:
                        minst.save(NAR_client)
                        instances.append(minst)
                        #except Exception as err:
                        #    logger.error("Error saving ModelInstance:\n{}".format(err))
                        #    continue
                        print("SUCCESS for instance in '{}'".format(model.name))
                model_project.instances = instances
                logger.info("Updating model project {} with {} instances".format(model_project.id, len(instances)))
                print("Updating model project {} with {} instances".format(model_project.id, len(instances)))
                try:
                    model_project.save(NAR_client)
                except Exception as err:
                    if "internal server error" in err.response.text:
                        logger.error(err)
                    else:
                        raise
            else:
                logger.warning("Skipping {}, couldn't find model project".format(model.name))
        return ''

    def migrate_validation_definitions(self):
        tests = ValidationTestDefinition.objects.all()

        for test in tests:
            authors = self._get_people_from_Persons_table(test.author)
            for author in authors:
                author.save(NAR_client)
            brain_region = self.get_parameters("brain_region", test.brain_region)
            species = self.get_parameters("species", test.species)
            cell_type = self.get_parameters("cell_type", test.cell_type)
            #age = self.get_parameters("age", test.age)

            if test.data_location == "to do":
                test.data_location = "http://example.com/todo"
            reference_data = AnalysisResult(name="Reference data for validation test '{}'".format(test.name),
                                            result_file=Distribution(test.data_location))
            reference_data.save(NAR_client)

            test_definition = ValidationTestDefinitionKG(
                name=test.name, authors=authors, description=test.protocol,
                date_created=test.creation_date,
                alias=test.alias,
                brain_region=brain_region, species=species,
                celltype=cell_type, test_type=test.test_type, age=None,  #age,
                reference_data=reference_data,
                data_type=test.data_type,
                recording_modality=test.data_modality,
                #test.publication,
                status="in development", #test.status,
                old_uuid=str(test.id))

            try:
                test_definition.save(NAR_client)
            except Exception as err:
                if "internal server error" in err.response.text:
                    logger.error(err)
                else:
                    raise
            else:
                logger.info("ValidationTestDefinition saved: %s", test_definition)
                print(test_definition)
        return ''

    def migrate_validation_code(self):
        test_code_objects = ValidationTestCode.objects.all()
        for tco in test_code_objects:
            test_name = tco.test_definition.name
            test_definition = ValidationTestDefinitionKG.by_name(test_name, NAR_client)
            if not test_definition:
                raise Exception("not found")
            script_obj = ValidationScript(
                name="Implementation of {}, version {}".format(test_name, tco.version),
                date_created=tco.timestamp,
                repository=tco.repository,
                version=tco.version,
                description=tco.description,
                parameters=tco.parameters,
                test_class=tco.path,
                test_definition=test_definition,
                old_uuid=str(tco.id))
            script_obj.save(NAR_client)
            logger.info("ValidationScript saved: %s", script_obj)

    def migrate_validation_results(self):
        result_objects = ValidationTestResult.objects.all()
        storage_token = os.environ["HBP_STORAGE_TOKEN"]
        storage_client = StorageClient.new(storage_token)

        for ro in result_objects[800:]:
            model_instance = lookup_model_instance(str(ro.model_version.id), NAR_client)  # use oldUUID (stored in nsg:providerId)
            test_script = lookup_test_script(str(ro.test_code.id), NAR_client)
            if not model_instance:
                logger.error("Model instance for {} not found in KG".format(ro.model_version))
                continue
            if not test_script:
                logger.error("Test script for {} not found in KG".format(ro.test_code))
                continue
            test_definition = test_script.test_definition.resolve(NAR_client)
            assert test_definition

            additional_data = [AnalysisResult(name="{} @ {}".format(uri, ro.timestamp.isoformat()),
                                              result_file=Distribution(uri),
                                              timestamp=ro.timestamp)
                               for uri in get_file_list(ro.results_storage, storage_client)]
            for ad in additional_data:
                ad.save(NAR_client)

            result_kg = ValidationResult(
                name="Result of running '{}' on model '{}' at {}".format(test_script.name, model_instance.name, ro.timestamp),
                generated_by=None,
                description=ro.platform,  # temporary location pending integration in KG
                score=ro.score,
                normalized_score=ro.normalized_score,
                passed=ro.passed,
                timestamp=ro.timestamp,
                additional_data=additional_data,
                old_uuid=str(ro.id),
                collab_id=ro.project)
            result_kg.save(NAR_client)
            logger.info("ValidationResult saved: %s", result_kg)

            reference_data = Collection("Reference data for {}".format(test_definition.name),
                                        members=test_definition.reference_data.resolve(NAR_client))
            reference_data.save(NAR_client)

            validation_activity = ValidationActivity(
                model_instance=model_instance,
                test_script=test_script,
                reference_data=reference_data,
                timestamp=ro.timestamp,
                result=result_kg,
                started_by=None)
            validation_activity.save(NAR_client)
            logger.info("ValidationActivity saved: %s", validation_activity)

            result_kg.generated_by = validation_activity
            result_kg.save(NAR_client)

    def handle(self, *args, **options):
        self._getPersons_and_migrate()
        self.add_organizations_in_KG_database()
        self.migrate_models()
        sleep(30)  # allow some time for indexing
        self.migrate_model_instances()
        #self.migrate_validation_definitions()
        #sleep(30)
        #self.migrate_validation_code()
        #sleep(30)
        #self.migrate_validation_results()
