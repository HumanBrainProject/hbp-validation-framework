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

class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'our help string comes here'    

    def _create_data_modalities(self):
        Param_DataModalities(id=uuid.uuid4(),authorized_value='electrophysiology').save()
        Param_DataModalities(id=uuid.uuid4(),authorized_value='fMRI').save()
        Param_DataModalities(id=uuid.uuid4(),authorized_value='2-photon imaging').save()
        Param_DataModalities(id=uuid.uuid4(),authorized_value='electron microscopy').save()
        Param_DataModalities(id=uuid.uuid4(),authorized_value='histology').save()   
    
    def _create_organizations(self):
        Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP4').save()
        Param_organizations(id=uuid.uuid4(),authorized_value='HBP-SP6').save()
        Param_organizations(id=uuid.uuid4(),authorized_value='Blue Brain Project').save() 
	Param_organizations(id=uuid.uuid4(),authorized_value='Other').save()  
        	
    def _create_test_types(self): 
        Param_TestType(id=uuid.uuid4(),authorized_value='single cell activity').save()
        Param_TestType(id=uuid.uuid4(),authorized_value='network structure').save()
        Param_TestType(id=uuid.uuid4(),authorized_value='network activity').save()
        Param_TestType(id=uuid.uuid4(),authorized_value='behaviour').save()
        Param_TestType(id=uuid.uuid4(),authorized_value='subcellular').save()   
     
    def _create_score_type(self): 
        Param_ScoreType(id=uuid.uuid4(),authorized_value='p-value').save()
	Param_ScoreType(id=uuid.uuid4(),authorized_value='Rsquare').save()
        Param_ScoreType(id=uuid.uuid4(),authorized_value='number').save()
	Param_ScoreType(id=uuid.uuid4(),authorized_value='Zscore').save()
	Param_ScoreType(id=uuid.uuid4(),authorized_value='purcentage').save()
	Param_ScoreType(id=uuid.uuid4(),authorized_value='Other').save()


    def _create_species(self):
        Param_Species(id=uuid.uuid4(),authorized_value='Mouse (Mus musculus)').save()
        Param_Species(id=uuid.uuid4(),authorized_value='Rat (Rattus rattus)').save()
        Param_Species(id=uuid.uuid4(),authorized_value='Marmoset (callithrix jacchus)').save()
        Param_Species(id=uuid.uuid4(),authorized_value='Human (Homo sapiens)').save()
        Param_Species(id=uuid.uuid4(),authorized_value='Paxinos Rhesus Monkey (Macaca mulatta)').save()
        Param_Species(id=uuid.uuid4(),authorized_value='Opossum (Monodelphis domestica)').save()
        Param_Species(id=uuid.uuid4(),authorized_value='Other').save()
        
    def _create_brain_region(self):
        Param_BrainRegion(id=uuid.uuid4(),authorized_value='Basal Ganglia').save()
        Param_BrainRegion(id=uuid.uuid4(),authorized_value='Cerebellum').save()
        Param_BrainRegion(id=uuid.uuid4(),authorized_value='Cortex').save()
        Param_BrainRegion(id=uuid.uuid4(),authorized_value='Hippocampus').save()
        Param_BrainRegion(id=uuid.uuid4(),authorized_value='Other').save()
        
    def _create_cell_type(self):
        Param_CellType(id=uuid.uuid4(),authorized_value='Granule Cell').save()
        Param_CellType(id=uuid.uuid4(),authorized_value='Interneuron').save()
        Param_CellType(id=uuid.uuid4(),authorized_value='Pyramidal Cell').save()
        Param_CellType(id=uuid.uuid4(),authorized_value='Other').save()     
        
    def _create_model_type(self):
        Param_ModelType(id=uuid.uuid4(),authorized_value='Single Cell').save()
        Param_ModelType(id=uuid.uuid4(),authorized_value='Network').save()
        Param_ModelType(id=uuid.uuid4(),authorized_value='Mean Field').save()
        Param_ModelType(id=uuid.uuid4(),authorized_value='Other').save()


    def _fake_collab(self):
        collab1 = CollabParameters(id='1')
        collab1.save()

        collab1.data_modalities.add( Param_DataModalities.objects.get(authorized_value='electrophysiology') )
        collab1.test_type.add( Param_TestType.objects.get(authorized_value='subcellular'))
        collab1.species.add(Param_Species.objects.get(authorized_value='Other') )
        collab1.brain_region.add(Param_BrainRegion.objects.get(authorized_value='Hippocampus')  )
        collab1.cell_type.add(Param_CellType.objects.get(authorized_value='Interneuron'))
        collab1.model_type.add(Param_ModelType.objects.get(authorized_value='Single Cell') )

        collab1.save()

    def _fake_models_test_results(self):
        
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

    def _fake_models_test_results_heli(self):
        
        import uuid
        import time
        time = time.time()
	

        import datetime

	##params
	ctx = 38111

	##times
 	time1 = time
	time2 = time1 + 11000
	time3 = time2+ 11000
	time4 = time3+ 11000

	##tests
        uuid_test1 = uuid.uuid4()
        uuid_test2 = uuid.uuid4()
	uuid_test3 = uuid.uuid4()
	
	uuid_testcode1_1 = uuid.uuid4()
        uuid_testcode2_1 = uuid.uuid4()
	uuid_testcode3_1 = uuid.uuid4()
	
	uuid_testcode1_2 = uuid.uuid4()
        uuid_testcode2_2 = uuid.uuid4()
	uuid_testcode3_2 = uuid.uuid4()


   	#model
        uuid_model1 = uuid.uuid4()
    
        uuid_model_version1 = uuid.uuid4()
	uuid_model_version2 = uuid.uuid4()
	uuid_model_version3 = uuid.uuid4()

        uuid_result1 = uuid.uuid4()
        uuid_result2 = uuid.uuid4()
        uuid_result3 = uuid.uuid4()
        uuid_result4 = uuid.uuid4()
	uuid_result5 = uuid.uuid4()
	uuid_result6 =uuid.uuid4()
	uuid_result7 = uuid.uuid4()
	uuid_result8 = uuid.uuid4()
	uuid_result9 = uuid.uuid4()

	uuid_result1_2 = uuid.uuid4()
        uuid_result2_2 = uuid.uuid4()
        uuid_result3_2 = uuid.uuid4()
        uuid_result4_2 = uuid.uuid4()
	uuid_result5_2 = uuid.uuid4()
	uuid_result6_2 = uuid.uuid4()
	uuid_result7_2 = uuid.uuid4()
	uuid_result8_2 = uuid.uuid4()
	uuid_result9_2 = uuid.uuid4()
           
        test1 = ValidationTestDefinition()
	test1.id = uuid_test1
        test1.name = "name 1"
	test1.alias = "T1"
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
	test1.score_type="p-value"
        test1.save()

	test2 = ValidationTestDefinition()
	test2.id = uuid_test2
        test2.name = "name 2"
	test2.alias = "T2"
        test2.species = "Mouse (Mus musculus)"
        test2.brain_region = "Hippocampus"
        test2.cell_type = "Interneuron"
        test2.age = "12"
        test2.data_location = "http://bbbb.com"
        test2.data_type = "data type"
        test2.data_modality = "electrophysiology"
        test2.test_type = "single cell activity"
        test2.protocol ="protocol"
        test2.author = "me"
        test2.publication = "not published"
	test2.score_type="p-value"
        test2.save()

	test3 = ValidationTestDefinition()
	test3.id = uuid_test3
        test3.name = "name 3"
	test3.alias = "T3"
        test3.species = "Mouse (Mus musculus)"
        test3.brain_region = "Hippocampus"
        test3.cell_type = "Interneuron"
        test3.age = "12"
        test3.data_location = "http://bbbb.com"
        test3.data_type = "data type"
        test3.data_modality = "electrophysiology"
        test3.test_type = "single cell activity"
        test3.protocol ="protocol"
        test3.author = "me"
        test3.publication = "not published"
	test3.score_type="p-value"
        test3.save()
        

        testcode1 = ValidationTestCode()
	testcode1.id = uuid_testcode1_1
        testcode1.repository = ""
        testcode1.version = "1.1"
        testcode1.path = ""
        testcode1.timestamp = "2017-01-24T14:59:26.031Z"
        testcode1.test_definition = test1
        testcode1.save()

	testcode2 = ValidationTestCode()
	testcode2.id = uuid_testcode2_1
        testcode2.repository = ""
        testcode2.version = "1.1"
        testcode2.path = ""
        testcode2.timestamp = "2017-01-24T14:59:26.031Z"
        testcode2.test_definition = test2
        testcode2.save()

	testcode3 = ValidationTestCode()
	testcode3.id = uuid_testcode3_1
        testcode3.repository = ""
        testcode3.version = "1.1"
        testcode3.path = ""
        testcode3.timestamp = "2017-01-24T14:59:26.031Z"
        testcode3.test_definition = test3
        testcode3.save()
	
	testcode1_2 = ValidationTestCode()
	testcode1_2.id = uuid_testcode1_2
        testcode1_2.repository = ""
        testcode1_2.version = "2.1"
        testcode1_2.path = ""
        testcode1_2.timestamp = "2018-01-24T14:59:26.031Z"
        testcode1_2.test_definition = test1
        testcode1_2.save()

	testcode2_2 = ValidationTestCode()
	testcode2_2.id = uuid_testcode2_2
        testcode2_2.repository = ""
        testcode2_2.version = "2.1"
        testcode2_2.path = ""
        testcode2_2.timestamp = "2018-01-24T14:59:26.031Z"
        testcode2_2.test_definition = test2
        testcode2_2.save()

	testcode3_2 = ValidationTestCode()
	testcode3_2.id = uuid_testcode3_2
        testcode3_2.repository = ""
        testcode3_2.version = "2.1"
        testcode3_2.path = ""
        testcode3_2.timestamp = "2018-01-24T14:59:26.031Z"
        testcode3_2.test_definition = test3
        testcode3_2.save()

        model1 = ScientificModel()
	model1.id = uuid_model1         
        model1.name = "model for result test"
	model1.alias = "M1"
        model1.description = "description"
        model1.species = "Mouse (Mus musculus)"
        model1.brain_region = "Hippocampus"
        model1.cell_type = "Interneuron"
        model1.author = "me"
        model1.model_type = "Single Cell"
        model1.private = "0"
        model1.app_id = ctx
        model1.code_format = "py"
        model1.save()        

        model_version1 = ScientificModelInstance()
	model_version1.id = uuid_model_version1
        model_version1.model = model1
        model_version1.version = "version 1"
        model_version1.parameters = "param"
        model_version1.source = "http://dd.com"
        model_version1.save()

	model_version2 = ScientificModelInstance()
	model_version2.id = uuid_model_version2
        model_version2.model = model1
        model_version2.version = "version 2"
        model_version2.parameters = "param"
        model_version2.source = "http://dd.com"
        model_version2.save()
	
	model_version3 = ScientificModelInstance()
 	model_version3.id = uuid_model_version3       
	model_version3.model = model1
        model_version3.version = "version 3"
        model_version3.parameters = "param"
        model_version3.source = "http://dd.com"
        model_version3.save()

        result = ValidationTestResult()
	result.id = uuid_result1
        result.model_version = model_version1
        result.test_code = testcode1
        result.results_storage ="azerty"
        result.score= 0.25
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time1).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult()
	result.id = uuid_result2
        result.model_version = model_version1
        result.test_code = testcode2
        result.results_storage ="azerty"
        result.score= 0.43
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time1).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

	result = ValidationTestResult()
	result.id = uuid_result3
        result.model_version = model_version1
        result.test_code = testcode3
        result.results_storage ="azerty"
        result.score= 0.795
	result.normalized_score= result.score
        result.passed = None
        time3 = time2 + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time1).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult()
	result.id = uuid_result4
        result.model_version = model_version2
        result.test_code = testcode1
        result.results_storage ="azerty"
        result.score= 0.8
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time2).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()


        result = ValidationTestResult()
	result.id = uuid_result5
        result.model_version = model_version2
        result.test_code = testcode2
        result.results_storage ="azerty"
        result.score= 0.888
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time2).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

	result = ValidationTestResult()
	result.id = uuid_result6
        result.model_version = model_version2
        result.test_code = testcode3
        result.results_storage ="azerty"
        result.score= 0.795
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time2).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

	result = ValidationTestResult()
	result.id = uuid_result7
        result.model_version = model_version3
        result.test_code = testcode1
        result.results_storage ="azerty"
        result.score= 0.5
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time3).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

	result = ValidationTestResult()
	result.id = uuid_result8
        result.model_version = model_version3
        result.test_code = testcode2
        result.results_storage ="azerty"
        result.score= 0.1
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time3).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

	result = ValidationTestResult()
	result.id = uuid_result9
        result.model_version = model_version3
        result.test_code = testcode3
        result.results_storage ="azerty"
        result.score= 0.796
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time3).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()


	result = ValidationTestResult()
	result.id = uuid_result1_2
        result.model_version = model_version1
        result.test_code = testcode1_2
        result.results_storage ="azerty"
        result.score= 0.25
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time1).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult()
	result.id = uuid_result2_2
        result.model_version = model_version1
        result.test_code = testcode2_2
        result.results_storage ="azerty"
        result.score= 0.43
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time1).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

	result = ValidationTestResult()
	result.id = uuid_result3_2
        result.model_version = model_version1
        result.test_code = testcode3_2
        result.results_storage ="azerty"
        result.score= 0.795
	result.normalized_score= result.score
        result.passed = None
        time3 = time2 + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time1).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult()
	result.id = uuid_result4_2
        result.model_version = model_version2
        result.test_code = testcode1_2
        result.results_storage ="azerty"
        result.score= 0.8
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time2).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()


        result = ValidationTestResult()
	result.id = uuid_result5_2
        result.model_version = model_version2
        result.test_code = testcode2_2
        result.results_storage ="azerty"
        result.score= 0.888
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time2).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

	result = ValidationTestResult()
	result.id = uuid_result6_2
        result.model_version = model_version2
        result.test_code = testcode3_2
        result.results_storage ="azerty"
        result.score= 0.795
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time2).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

	result = ValidationTestResult()
	result.id = uuid_result7_2
        result.model_version = model_version3
        result.test_code = testcode1_2
        result.results_storage ="azerty"
        result.score= 0.5
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time3).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

	result = ValidationTestResult()
	result.id = uuid_result8_2
        result.model_version = model_version3
        result.test_code = testcode2_2
        result.results_storage ="azerty"
        result.score= 0.1
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time3).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

	result = ValidationTestResult()
	result.id = uuid_result9_2
        result.model_version = model_version3
        result.test_code = testcode3_2
        result.results_storage ="azerty"
        result.score= 0.796
	result.normalized_score= result.score
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time3).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

    def delete_models_in_collab(self,app_id, *args, **options):
        # app_id = CollabParameters.objects.filter(collab_id = collab_id, app_type='model_catalog')
        models_to_delete = ScientificModel.objects.filter(app_id=app_id)
        for model in models_to_delete:
                model.delete()

    def handle(self, *args, **options):
        #self._create_data_modalities()
        #self._create_test_types()
        #self._create_species()
        #self._create_brain_region()
        #self._create_cell_type()
        #self._create_model_type()
	self._create_score_type()
	#self._create_organizations()

        # self._fake_collab()
	# self._fake_models_test_results()

        #self._fake_models_test_results_heli()
        # self.delete_models_in_collab(collab_id = 2180)





