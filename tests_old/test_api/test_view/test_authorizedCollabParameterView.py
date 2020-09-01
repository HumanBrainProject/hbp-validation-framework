"""
Tests of the ValidationFramework TestsView.
"""


from test_base import *



class AuthorizedCollabParameterRestTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass


    def compare_serializer_keys (self, elements, targeted_keys_list_type='all'):
        list_data_modalities = ['electrophysiology', 'fMRI','2-photon imaging','electron microscopy','histology' ]
        list_organization = ['HBP-SP1', 
                                'HBP-SP2',
                                'HBP-SP3',
                                'HBP-SP4',
                                'HBP-SP5',
                                'HBP-SP6',
                                'HBP-SP7',
                                'HBP-SP8',
                                'HBP-SP9',
                                'HBP-SP10',
                                'HBP-SP11',
                                'HBP-SP12',
                                'Blue Brain Project',
                                'Other',
                                'KOKI-UNIC',
                                'KTH-UNIC',
                                '<<empty>>',                                
                                ]
        list_test_type = ['single cell activity','network structure' ,'network activity', 'behaviour', 'subcellular']
        list_score_type = ['p-value','Rsquare','number','Zscore','purcentage','Other' ]
        list_species = ['Mouse (Mus musculus)','Rat (Rattus rattus)','Marmoset (callithrix jacchus)','Human (Homo sapiens)', 'Paxinos Rhesus Monkey (Macaca mulatta)','Opossum (Monodelphis domestica)','Other']
        list_brain_region = ['Basal Ganglia','Cerebellum','Cortex','Hippocampus', 'Other']
        list_cell_type = ['Granule Cell','Interneuron','Pyramidal Cell', 'Other']
        list_model_type = ['Single Cell', 'Network','Mean Field', 'Other']
    

        if targeted_keys_list_type == "standard" :
            targeted_keys = [
                            'data_modalities', 
                            'test_type',
                            'species', 
                            'brain_region',
                            'cell_type',
                            'model_type',
                            'score_type', 
                            'organization',
                             ]

            self.assertEqual(set(elements.keys()), set(targeted_keys))
            for key, value in elements.items() : 
                for j in value :
                    self.assertEqual(set(j.keys()), set(['id', 'authorized_value']))


        if targeted_keys_list_type == "python_client" :
            targeted_keys = [
                            'data_modalities', 
                            'test_type',
                            'species', 
                            'brain_region',
                            'cell_type',
                            'model_type',
                            'score_type', 
                            'organization',
                             ]

            self.assertEqual(set(elements.keys()), set(targeted_keys))

            self.assertEqual(len(elements['data_modalities']), len(list_data_modalities)) 
            self.assertEqual(len(elements['test_type']), len(list_test_type)) 
            self.assertEqual(len(elements['species']), len(list_species)) 
            self.assertEqual(len(elements['brain_region']), len(list_brain_region)) 
            self.assertEqual(len(elements['cell_type']), len(list_cell_type)) 
            self.assertEqual(len(elements['model_type']), len(list_model_type)) 
            self.assertEqual(len(elements['score_type']), len(list_score_type)) 
            self.assertEqual(len(elements['organization']), len(list_organization)) 

        if targeted_keys_list_type == "python_client_cell_type" :
            targeted_keys = [
                            'cell_type',
                             ]

            self.assertEqual(set(elements.keys()), set(targeted_keys))
            self.assertEqual(len(elements['cell_type']), len(list_cell_type) )




    def check_num_params (self, elements) :
        for key, value in elements.items() :
            
            if key == 'data_modalities' :
                data =  Param_DataModalities.objects.all().values('authorized_value')
                self.assertEqual(len(value), len(data) )
                
            if key == 'test_type' :
                data = Param_TestType.objects.all().values('authorized_value')
                self.assertEqual(len(value), len(data) )

            if key == 'species' :
                data = Param_Species.objects.all().values('authorized_value')
                self.assertEqual(len(value), len(data) )

            if key == 'brain_region' :
                data = Param_BrainRegion.objects.all().values('authorized_value')
                self.assertEqual(len(value), len(data) )

            if key == 'cell_type' :
                data = Param_CellType.objects.all().values('authorized_value')
                self.assertEqual(len(value), len(data) )

            if key == 'model_type' :
                data = Param_ModelType.objects.all().values('authorized_value')
                self.assertEqual(len(value), len(data) )

            if key == 'score_type' :
                data = Param_ScoreType.objects.all().values('authorized_value')
                self.assertEqual(len(value), len(data) )
            
            if key == 'organization' :
                data = Param_organizations.objects.all().values('authorized_value')
                self.assertEqual(len(value), len(data) )
                

    def test_get_no_param (self):
        response = client_authorized.get('/authorizedcollabparameterrest/', data={})
        params = json.loads(response._container[0])
        
        self.assertEqual(response.status_code, 200)
        self.check_num_params(params)
        self.assertEqual(len(params), 8)
        self.compare_serializer_keys(elements=params, targeted_keys_list_type='standard')

    def test_get_param_python_client_true (self):
        response = client_authorized.get('/authorizedcollabparameterrest/', data={'python_client': 'true'})
        params = json.loads(response._container[0])
        
        self.assertEqual(response.status_code, 200)
        self.check_num_params(params)
        self.assertEqual(len(params), 8)
        self.compare_serializer_keys(elements=params, targeted_keys_list_type='python_client')

    def test_get_param_python_client_true_parameters_all (self):
        response = client_authorized.get('/authorizedcollabparameterrest/', data={'python_client': 'true', 'parameters': 'all'})
        params = json.loads(response._container[0])
        
        self.assertEqual(response.status_code, 200)
        self.check_num_params(params)

        self.assertEqual(len(params), 8)
        self.compare_serializer_keys(elements=params, targeted_keys_list_type='python_client')


    def test_get_param_python_client_true_parameters_all_one_by_one (self):
        response = client_authorized.get('/authorizedcollabparameterrest/', data={'python_client': 'true', 'parameters': ['species', 'data_modalities','test_type', 'brain_region', 'cell_type', 'model_type', 'score_type', 'organization' ]})
        # response = client_authorized.get('/authorizedcollabparameterrest/', data={'python_client': 'true', 'parameters': "species, data_modalities, test_type, brain_region, cell_type, model_type, score_type, organization"})
        params = json.loads(response._container[0])
        
        self.assertEqual(response.status_code, 200)
        self.check_num_params(params)
        self.assertEqual(len(params), 8)
        self.compare_serializer_keys(elements=params, targeted_keys_list_type='python_client')



    def test_get_param_python_client_true_parameter_cell_type (self):
        response = client_authorized.get('/authorizedcollabparameterrest/', data={'python_client': 'true', 'parameters': [ 'cell_type']})
        # response = client_authorized.get('/authorizedcollabparameterrest/', data={'python_client': 'true', 'parameters': "species, data_modalities, test_type, brain_region, cell_type, model_type, score_type, organization"})
        params = json.loads(response._container[0])
        
        self.assertEqual(response.status_code, 200)
        self.check_num_params(params)
        self.assertEqual(len(params), 1)
        self.compare_serializer_keys(elements=params, targeted_keys_list_type='python_client_cell_type')



    def test_get_param_python_client_false (self):
        response = client_authorized.get('/authorizedcollabparameterrest/', data={'python_client': 'false'})
        params = json.loads(response._container[0])
        
        self.assertEqual(response.status_code, 200)
        self.check_num_params(params)        
        self.assertEqual(len(params), 8)
        self.compare_serializer_keys(elements=params, targeted_keys_list_type='standard')