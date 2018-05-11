from django.core.management.base import BaseCommand
from ...models import (
                    Param_Species, 
                    Param_DataModalities, 
                    Param_TestType, 
                    Param_BrainRegion, 
                    Param_CellType, 
                    Param_ModelType,
                    Param_organizations, 
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

    def add_results_to_test_code_heli(self, test_code_id, model_version_id):
        import time
        import datetime
        time = time.time()
        result = ValidationTestResult(id=uuid.uuid4())
        result.model_version_id = model_version_id
        result.test_code_id = test_code_id
        result.results_storage ="azerty"
        result.score= 0.3
        result.normalized_score= 0.3
        result.passed = None
        time += 100
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid.uuid4())
        result.model_version_id = model_version_id
        result.test_code_id = test_code_id
        result.results_storage ="azerty"
        result.score= 0.8
        result.normalized_score= 0.8
        result.passed = None
        time += 1000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

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

	if table_type == 'model_instance':	 
        	elements_to_delete = ScientificModelInstance.objects.filter(id__in=list_uuid)
        	for model_instance in elements_to_delete:
                	model_instance.delete()


	if table_type == 'test':	 
        	elements_to_delete = ValidationTestDefinition.objects.filter(id__in=list_uuid)
        	for test in elements_to_delete:
                	test.delete()

	if table_type == 'test_instance':	 
        	elements_to_delete = ValidationTestCode.objects.filter(id__in=list_uuid)
        	for test_instance in elements_to_delete:
                	test_instance.delete()
	
    def add_element(self, table_type, list_elements, *args, **options):
	if table_type == 'species':
		for elem in list_elements:
			Param_Species(id=uuid.uuid4(),authorized_value=elem).save()
	if table_type == 'data_modalities':
		for elem in list_elements:
			Param_DataModalities(id=uuid.uuid4(),authorized_value=elem).save()

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
	self.delete("test_instance", ['01270b83f1af49c79f16c500262e9c9a','a11b6786318d4546922f85dedf8c3491'])
       
       





