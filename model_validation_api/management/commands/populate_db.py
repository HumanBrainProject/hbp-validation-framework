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
                    Param_AbstractionLevel,
                    CollabParameters,
		            Param_ScoreType,

                    ScientificModel,
                    ScientificModelInstance,

                    ValidationTestDefinition,
                    ValidationTestCode,
                    ValidationTestResult,
                    )

import uuid

from ...validation_framework_toolbox.fill_db import (
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
)

class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'our help string comes here'



    def old_fake_models_test_results(self):

        import uuid
        import time
        original_time = time.time()


        import datetime
        # ts = time.time()
        # st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

        # 2012-12-15 01:21:05

        #ID test
        uuid_test1 = uuid.uuid4()
        # uuid_testcode1 = uuid.uuid4()
        uuid_testcode1 =  "622f8ee151c940f3b502980831c7fc09"

        #ID model1 + results
        uuid_model1 = uuid.uuid4()
        uuid_model_version1 = "d1135abda9ad46909e6783d41dd42d00"
        uuid_result1 = uuid.uuid4()
        uuid_result2 = uuid.uuid4()
        uuid_result3 = uuid.uuid4()
        uuid_result4 = uuid.uuid4()
        uuid_result5 = uuid.uuid4()
        uuid_result6 = uuid.uuid4()
        uuid_result7 = uuid.uuid4()
        uuid_result8 = uuid.uuid4()


        #ID model2 + results
        uuid_model2 = uuid.uuid4()
        uuid_model_version2 = "d1135abda9ad46909e6783d41dd42d01"
        uuid_result2_1 = uuid.uuid4()
        uuid_result2_2 = uuid.uuid4()
        uuid_result2_3 = uuid.uuid4()
        uuid_result2_4 = uuid.uuid4()
        uuid_result2_5 = uuid.uuid4()
        uuid_result2_6 = uuid.uuid4()
        uuid_result2_7 = uuid.uuid4()
        uuid_result2_8 = uuid.uuid4()


        #Create the test
        test1 = ValidationTestDefinition(id= uuid_test1)
        test1.name = "name"
        test1.species = "Mouse (Mus musculus)"
        test1.brain_region = "Hippocampus"
        test1.cell_type = "Interneuron"
        test1.age = "12"
        test1.data_location = "http://bbbb.com"
        test1.data_type = "data type"
        test1.data_modality = "electrophysiology"
        test1.test_type = "single cell activity"
        test1.protocol ="protocol"
        test1.author = "me"
        test1.publication = "not published"
        test1.save()

        testcode1 = ValidationTestCode(id = uuid_testcode1)
        testcode1.repository = ""
        testcode1.version = ""
        testcode1.path = ""
        testcode1.timestamp = "2017-01-24T14:59:26.031Z"
        testcode1.test_definition = test1
        testcode1.save()


        #create the model 1
        model1 = ScientificModel(id= uuid_model1)
        model1.name = "name"
        model1.description = "description"
        model1.species = "Mouse (Mus musculus)"
        model1.brain_region = "Hippocampus"
        model1.cell_type = "Interneuron"
        model1.author = "me"
        model1.model_type = "Single Cell"
        model1.private = "0"
        model1.app_id = "0235296f-b73f-4374-9452-a89f4c20f05b"
        model1.code_format = "py"
        model1.collab_id = 0
        model1.save()

        model_version1 = ScientificModelInstance(id=uuid_model_version1)
        model_version1.model = model1
        model_version1.version = "version "
        model_version1.parameters = "param"
        model_version1.source = "http://dd.com"
        model_version1.save()

        time = original_time

        #create the results for test1-model1
        result = ValidationTestResult(id=uuid_result1)
        result.model_version = model_version1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.score= 0.25
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result2)
        result.model_version = model_version1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.score= 0.43
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result3)
        result.model_version = model_version1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.score= 0.3666
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result4)
        result.model_version = model_version1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.score= 0.795
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result5)
        result.model_version = model_version1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.score= 0.695
        result.passed = None
        time += 11000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result6)
        result.model_version = model_version1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.score= 0.4
        result.passed = None
        time += 110000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result7)
        result.model_version = model_version1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.score= 0.7
        result.passed = None
        time += 110000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result8)
        result.model_version = model_version1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.score= 0.3
        result.passed = None
        time += 100000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()


        #create the model 2
        model2 = ScientificModel(id= uuid_model2)
        model2.name = "name2"
        model2.description = "description2"
        model2.species = "Mouse (Mus musculus)"
        model2.brain_region = "Hippocampus"
        model2.cell_type = "Interneuron"
        model2.author = "me2"
        model2.model_type = "Single Cell"
        model2.private = "0"
        model2.app_id = "0235296f-b73f-4374-9452-a89f4c20f05b"
        model2.code_format = "py"
        model2.collab_id = 0
        model2.save()

        model_version2 = ScientificModelInstance(id=uuid_model_version2)
        model_version2.model = model2
        model_version2.version = "version 2 "
        model_version2.parameters = "param 2"
        model_version2.source = "http://dd2.com"
        model_version2.save()

        time = original_time


        #create the results for test1-model2
        result = ValidationTestResult(id=uuid_result2_1)
        result.model_version = model_version2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.score= 0.1
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_2)
        result.model_version = model_version2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.score= 0.23
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_3)
        result.model_version = model_version2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.score= 0.3666
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_4)
        result.model_version = model_version2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.score= 0.45
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_5)
        result.model_version = model_version2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.score= 0.55
        result.passed = None
        time += 11000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_6)
        result.model_version = model_version2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.score= 0.66
        result.passed = None
        time += 110000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_7)
        result.model_version = model_version2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.score= 0.76
        result.passed = None
        time += 110000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_8)
        result.model_version = model_version2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.score= 0.86
        result.passed = None
        time += 100000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()




    def _erase_all_models_test_results (self):

        tab_models = [
            ValidationTestCode.objects.all(),
            ValidationTestResult.objects.all(),
            ScientificModelInstance.objects.all(),
            ScientificModel.objects.all(),
            ValidationTestDefinition.objects.all(),
        ]

        for model in tab_models:
            for element in model:
                element.delete()



    def delete_models_in_collab(self,app_id, *args, **options):
        # app_id = CollabParameters.objects.filter(collab_id = collab_id, app_type='model_catalog')
        models_to_delete = ScientificModel.objects.filter(app_id=app_id)
        for model in models_to_delete:
                model.delete()

    def set_default_organisation_to_model_when_empty_string(self, *args, **options):
        # app_id = CollabParameters.objects.filter(collab_id = collab_id, app_type='model_catalog')
        models_to_update = ScientificModel.objects.all()
        for model in models_to_update:
            if model.organization == '':
                model.organization = "<<empty>>"
                model.save()


    def delete_specific_organization(self, organization):
        organization_to_delete = Param_organizations.objects.filter(authorized_value = organization)
        organization_to_delete.delete()

    def add_empty_to_all_config_orga(self,):
        collab_param = CollabParameters.objects.all()

        for i in collab_param :
            if i.organization == "":
                i.organization = i.organization + "<<empty>>"

            elif i.organization == None:
                pass
            else :
                i.organization = i.organization + ",<<empty>>"

            i.save()

    def delete(self,table_type, list_uuid, *args, **options):

        if table_type == 'model':
        	elements_to_delete = ScientificModel.objects.filter(id__in=list_uuid)
        	for model in elements_to_delete:
                 model.delete()
        elif table_type == 'model_instance':
        	elements_to_delete = ScientificModelInstance.objects.filter(id__in=list_uuid)
        	for model_instance in elements_to_delete:
                 model_instance.delete()
        elif table_type == 'test':
        	elements_to_delete = ValidationTestDefinition.objects.filter(id__in=list_uuid)
        	for test in elements_to_delete:
                 test.delete()
        elif table_type == 'test_instance':
        	elements_to_delete = ValidationTestCode.objects.filter(id__in=list_uuid)
        	for test_instance in elements_to_delete:
                 test_instance.delete()

    def add_element(self, table_type, list_elements, *args, **options):
        if table_type == 'abstraction_level':
            for elem in list_elements :
                Param_AbstractionLevel(id=uuid.uuid4(),authorized_value=elem).save()
        elif table_type == 'model_scope':
            for elem in list_elements:
                Param_ModelScope(id=uuid.uuid4(),authorized_value=elem).save()
        elif table_type == 'species':
            for elem in list_elements:
                Param_Species(id=uuid.uuid4(),authorized_value=elem).save()
        elif table_type == 'data_modalities':
            for elem in list_elements:
                Param_DataModalities(id=uuid.uuid4(),authorized_value=elem).save()


    def move_modelType_to_modelScope_or_abstractionLevel(self, *args, **options):

        models = ScientificModel.objects.all()
        print("model type in model is", models.iterator())
        for model in models.iterator():
            print("model type in model is", model)
            if model.model_type == 'Firing rate model':
                model.abstraction_level = 'rate neuron'
                model.save()
            if model.model_type == 'Intracellular signalling':
                model.model_scope = 'Subcellular model -- signalling model'
                model.save()
            if model.model_type == 'Mean Field':
                model.abstraction_level = 'Population modelling -- neural field'
                model.save()

            if model.model_type == 'Modelcular Model':
                model.model_scope = 'Subcellular model -- molecular model'
                model.save()
            if model.model_type == 'Neuron mass model':
                model.abstraction_level = 'Population modelling -- neural mass'
                model.save()
            if model.model_type == 'Single Cell':
                model.model_scope = 'Single cell model'
                model.save()
            # if model.model_type == 'Multi-area model':
            if model.model_type == 'Network':
                model.model_scope = 'Network model'
                model.save()
            if model.model_type == 'Spiking model':
                model.abstraction_level = 'Spiking model'
                model.save()
            if model.model_type == 'Subcellular model':
                model.model_scope = 'Subcellular model'
                model.save()
            # if model.model_type == 'Model Collection':


    def move_modelType_to_modelScope_or_abstractionLevel_for_configuration_table(self, *args, **options):

        elements = CollabParameters.objects.all()
        for element in elements.iterator():
            print("model type in model is", element.model_type)
            liste = [x.strip() for x in element.model_type.split(',')]
            new_liste_abst_level = []
            new_liste_model_scope = []
            print('liste',liste)
            for param in liste:
                if param == 'Firing rate model':
                    new_liste_abst_level.append('rate neuron')
                if param == 'Intracellular signalling':
                    new_liste_model_scope.append('Subcellular model -- signalling model')
                if param == 'Mean Field':
                    new_liste_abst_level.append('Population modelling -- mean field')
                if param == 'Molecular model':
                    new_liste_model_scope.append('Subcellular model -- molecular model')
                if param == 'Neuron mass model':
                    new_liste_abst_level.append('Population modelling -- neural mass')
                if param == 'Single Cell':
                    new_liste_model_scope.append('Single cell model')
                if param == 'Network':
                    new_liste_model_scope.append('Network model')
                if param == 'Spiking model':
                    new_liste_abst_level.append('Spiking model')
                if param == 'Subcellular model':
                    new_liste_model_scope.append('Subcellular model')
            print('new liste model scope', new_liste_model_scope)
            print('new liste model scope', new_liste_abst_level)
            element.model_scope = ",".join(new_liste_model_scope)
            element.abstraction_level = ",".join(new_liste_abst_level)
            element.save()

    def create_fake_models(self, number_models,*args, **options):
        import uuid
        for i in range(0,number_models):
            uuid_model = uuid.uuid4()
            model = ScientificModel(id= uuid_model)
            model.name = "fake_model_name_"+str(i)
            model.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet"
            model.species = "Mouse (Mus musculus)"
            model.brain_region = "Hippocampus"
            model.cell_type = "Interneuron"
            model.author = "heli"
            model.model_type = "Single Cell"
            model.private = "1"
            model.app_id = "38111"
            model.code_format = "py"
            model.save()

    def replace_collab_storage_files(self, *args, **options):
        results = ValidationTestResult.objects.all()
        for result in results:

            if result.results_storage.startswith("collab:///"):
                result.results_storage = str(result.results_storage)
                result.results_storage = "collab://" + str(result.results_storage.split("collab:///")[1])
                result.save()
                print(result)

    def populate_from_uberon(self):
        from owlready2 import get_ontology
        o = get_ontology("file:///Users/andrew/Data/uberon.owl").load()
        RegionalPartOfBrain = o.search(iri="http://purl.obolibrary.org/obo/UBERON_0002616")[0]
        parts_of_brain = o.search(subclass_of=RegionalPartOfBrain)
        for cls in parts_of_brain:
            print(cls.label[0], cls.iri)

    def handle(self, *args, **options):
        #create_data_modalities()
        #create_test_types()
        #create_species()
        #create_brain_region()
        #create_cell_type()
        #create_model_type()
        #create_score_type()
        #create_organizations()
	# self.create_fake_collab(id='1')
        #create_models_test_results(param_app_id=37928, result_storage = "collab:///2169/folder_test")


        #self.delete("model", ['2b160a50e2a445c69d908773a8d81f9b'])
	#self.delete("model_instance", ['2b160a50e2a445c69d908773a8d81f9b'])
	#self.delete("test", ['111307e4c86541529c2076fa26762051'])
	#self.delete("test_instance", ['01270b83f1af49c79f16c500262e9c9a','a11b6786318d4546922f85dedf8c3491'])
        #self.create_fake_models(62)

        # self.replace_collab_storage_files()

        ################ For database migration: split model type in model scope and abstraction level
        ####fill database
        # self.add_element("model_scope", ["Subcellular model -- spine model","Subcellular model -- ion channel model", "Subcellular model -- signalling model", "Subcellular model -- molecular model", "Single cell model", "Network model -- microcircuit model", "Network model -- brain region model", "Network model -- whole brain model" ])
        # self.add_element("abstraction_level", ["protein structure","Systems biology -- continuous", "Systems biology -- discrete", "Systems biology -- flux balance", "Spiking neurons -- biophysical", "Spiking neurons -- point neuron", "rate neuron", "Population modelling -- neural field", "Population modelling -- neural mass", "Cognitive modelling" ])
        # self.add_element("abstraction_level", ['Other', "Systems biology", "Spiking neurons", "Population modelling"])
        # self.add_element("model_scope", ['Other', "Network model", "Subcellular model"])
        #### move data from model_type to to abstraction level or model scope
        #self.move_modelType_to_modelScope_or_abstractionLevel()

        #### move data for the configuration app
        #self.move_modelType_to_modelScope_or_abstractionLevel_for_configuration_table()

        self.populate_from_uberon()
