from django.core.management.base import BaseCommand
from ...models import (
                    Param_Species, 
                    Param_DataModalities, 
                    Param_TestType, 
                    Param_BrainRegion, 
                    Param_CellType, 
                    Param_ModelType, 
                    CollabParameters,

                    ScientificModel,
                    ScientificModelInstance,

                    ValidationTestDefinition,
                    ValidationTestCode,
                    ValidationTestResult,
                    )

class Command(BaseCommand):
    args = '<foo bar ...>'
    help = 'our help string comes here'    

    def _create_data_modalities(self):
        Param_DataModalities(authorized_value='electrophysiology').save()
        Param_DataModalities(authorized_value='fMRI').save()
        Param_DataModalities(authorized_value='2-photon imaging').save()
        Param_DataModalities(authorized_value='electron microscopy').save()
        Param_DataModalities(authorized_value='histology').save()   
        
    def _create_test_types(self): 
        Param_TestType(authorized_value='single cell activity').save()
        Param_TestType(authorized_value='network structure').save()
        Param_TestType(authorized_value='network activity').save()
        Param_TestType(authorized_value='behaviour').save()
        Param_TestType(authorized_value='subcellular').save()        

    def _create_species(self):
        Param_Species(authorized_value='Mouse (Mus musculus)').save()
        Param_Species(authorized_value='Rat (Rattus rattus)').save()
        Param_Species(authorized_value='Marmoset (callithrix jacchus)').save()
        Param_Species(authorized_value='Human (Homo sapiens)').save()
        Param_Species(authorized_value='Paxinos Rhesus Monkey (Macaca mulatta)').save()
        Param_Species(authorized_value='Opossum (Monodelphis domestica)').save()
        Param_Species(authorized_value='Other').save()
        
    def _create_brain_region(self):
        Param_BrainRegion(authorized_value='Basal Ganglia').save()
        Param_BrainRegion(authorized_value='Cerebellum').save()
        Param_BrainRegion(authorized_value='Cortex').save()
        Param_BrainRegion(authorized_value='Hippocampus').save()
        Param_BrainRegion(authorized_value='Other').save()
        
    def _create_cell_type(self):
        Param_CellType(authorized_value='Granule Cell').save()
        Param_CellType(authorized_value='Interneuron').save()
        Param_CellType(authorized_value='Pyramidal Cell').save()
        Param_CellType(authorized_value='Other').save()     
        
    def _create_model_type(self):
        Param_ModelType(authorized_value='Single Cell').save()
        Param_ModelType(authorized_value='Network').save()
        Param_ModelType(authorized_value='Mean Field').save()
        Param_ModelType(authorized_value='Other').save()


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
        uuid_model_instance1 = "d1135abda9ad46909e6783d41dd42d00"
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
        uuid_model_instance2 = "d1135abda9ad46909e6783d41dd42d01"
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
        model1.access_control_id = "0235296f-b73f-4374-9452-a89f4c20f05b"
        model1.code_format = "py"
        model1.collab_id = 0
        model1.save()        

        model_instance1 = ScientificModelInstance(id=uuid_model_instance1)
        model_instance1.model = model1
        model_instance1.version = "version "
        model_instance1.parameters = "param"
        model_instance1.source = "http://dd.com"
        model_instance1.save()

        time = original_time

        #create the results for test1-model1
        result = ValidationTestResult(id=uuid_result1)
        result.model_instance = model_instance1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.result = 0.25
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result2)
        result.model_instance = model_instance1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.result = 0.43
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result3)
        result.model_instance = model_instance1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.result = 0.3666
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result4)
        result.model_instance = model_instance1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.result = 0.795
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result5)
        result.model_instance = model_instance1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.result = 0.695
        result.passed = None
        time += 11000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result6)
        result.model_instance = model_instance1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.result = 0.4
        result.passed = None
        time += 110000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result7)
        result.model_instance = model_instance1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.result = 0.7
        result.passed = None
        time += 110000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty"
        result.project = "azerty"
        result.save()

        result = ValidationTestResult(id=uuid_result8)
        result.model_instance = model_instance1
        result.test_definition = testcode1
        result.results_storage ="azerty"
        result.result = 0.3
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
        model2.access_control_id = "0235296f-b73f-4374-9452-a89f4c20f05b"
        model2.code_format = "py"
        model2.collab_id = 0
        model2.save()        

        model_instance2 = ScientificModelInstance(id=uuid_model_instance2)
        model_instance2.model = model2
        model_instance2.version = "version 2 "
        model_instance2.parameters = "param 2"
        model_instance2.source = "http://dd2.com"
        model_instance2.save()

        time = original_time
        

        #create the results for test1-model2
        result = ValidationTestResult(id=uuid_result2_1)
        result.model_instance = model_instance2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.result = 0.1
        result.passed = None
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_2)
        result.model_instance = model_instance2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.result = 0.23
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_3)
        result.model_instance = model_instance2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.result = 0.3666
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_4)
        result.model_instance = model_instance2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.result = 0.45
        result.passed = None
        time = time + 1000000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_5)
        result.model_instance = model_instance2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.result = 0.55
        result.passed = None
        time += 11000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_6)
        result.model_instance = model_instance2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.result = 0.66
        result.passed = None
        time += 110000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_7)
        result.model_instance = model_instance2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.result = 0.76
        result.passed = None
        time += 110000000
        result.timestamp = datetime.datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
        result.platform = "azerty2"
        result.project = "azerty2"
        result.save()

        result = ValidationTestResult(id=uuid_result2_8)
        result.model_instance = model_instance2
        result.test_definition = testcode1
        result.results_storage ="azerty2"
        result.result = 0.86
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



    def handle(self, *args, **options):
        # self._create_data_modalities()
        # self._create_test_types()
        # self._create_species()
        # self._create_brain_region()
        # self._create_cell_type()
        # self._create_model_type()

        # self._fake_collab()

        # self._erase_all_models_test_results()
        # self._fake_models_test_results()



