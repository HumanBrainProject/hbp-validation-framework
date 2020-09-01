# """
# Tests of the ValidationFramework TestsView.
# """


from test_base import *

    


class TestsViewTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()
        

    def setUp(self):
        #Setup run before every test method.
        pass

    def compare_serializer_keys (self, tests, targeted_keys_list_type='all'):
        
        if targeted_keys_list_type == "standard" :
            targeted_keys = [
                            'id', 
                            'name', 
                            'alias',
                            'creation_date',
                            'species', 
                            'brain_region', 
                            'cell_type', 
                            'age', 
                            'data_location', 
                            'data_type',  
                            'data_modality', 
                            'test_type', 
                            'protocol', 
                            'author', 
                            'publication', 
                            'score_type',]
            for test in tests :
                self.assertEqual(set(test.keys()), set(targeted_keys))



        if targeted_keys_list_type == "full" :
            targeted_keys = [
                            'id', 
                            'name', 
                            'alias',
                            'creation_date',
                            'species', 
                            'brain_region', 
                            'cell_type', 
                            'age', 
                            'data_location', 
                            'data_type',  
                            'data_modality', 
                            'test_type', 
                            'protocol', 
                            'author', 
                            'publication', 
                            'codes',
                            # 'score',
                            # 'score_type',
                            ]

            for test in tests :
                self.assertEqual(set(test.keys()), set(targeted_keys))

            
                for code in test['codes'] :
                    self.assertEqual(set(code.keys()), set([
                                                    'description',
                                                    'repository',
                                                    'timestamp',
                                                    'version',
                                                    'path',
                                                    'id',
                                                    'test_definition_id',
                                                    ]))
                    

    def test_get_no_param (self):
        response = client_authorized.get('/tests/', data={})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests), 3)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
        

    def test_get_param_id (self):
        response = client_authorized.get('/tests/', data={'id': self.data.uuid_test1})
        tests = json.loads(response._container[0])['tests']

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests), 1)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='full')

        self.assertEqual(len(tests[0]['codes']), 1)

        targeted_keys = [
                        'id', 
                        'description', 
                        'repository',
                        'timestamp',
                        'version', 
                        'path', 
                        'test_definition_id', 
                        ]

        for code in tests[0]['codes'] :
            self.assertEqual(set(code.keys()), set(targeted_keys))                    
        # raise ValueError('A very specific bad thing happened.')
        
        

    def test_get_param_name (self):
        response = client_authorized.get('/tests/', data={ 'name': "name 1"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests), 1)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
           

    def test_get_param_species (self):
        response = client_authorized.get('/tests/', data={'species': "Mouse (Mus musculus)"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
          

    def test_get_param_brain_region (self):
        response = client_authorized.get('/tests/', data={'brain_region' : "Hippocampus" })
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
         

    def test_get_param_cell_type (self):
        response = client_authorized.get('/tests/', data={ 'cell_type' :  "Interneuron"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
         

    def test_get_param_age (self):
        response = client_authorized.get('/tests/', data={'age': "12" })
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
        
        
    def test_get_param_data_location (self):
        response = client_authorized.get('/tests/', data={'data_location': "http://bbbb.com"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
        
        
    def test_get_param_data_type (self):
        response = client_authorized.get('/tests/', data={'data_type' : "data type"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
         

    def test_get_param_data_modality (self):
        response = client_authorized.get('/tests/', data={'data_modality' : "electrophysiology"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)        
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
           

    def test_get_param_test_type (self):
        response = client_authorized.get('/tests/', data={'test_type' : "single cell activity"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')   
        

    def test_get_param_protocol (self):
        response = client_authorized.get('/tests/', data={'protocol': "protocol"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')    
        

    def test_get_param_author (self):
        response = client_authorized.get('/tests/', data={'author' : "me"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
             

    def test_get_param_publication (self):
        response = client_authorized.get('/tests/', data={'publication' :"not published" })
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
          

    def test_get_param_score_type (self):
        response = client_authorized.get('/tests/', data={'score_type' : "p-value"})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
            

    def test_get_param_alias (self):
        response = client_authorized.get('/tests/', data={'alias' : "T1" })
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),1)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
            

    def test_get_param_web_app (self):
        response = client_authorized.get('/tests/', data={'web_app' : True, 'app_id' : '1'})
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),2)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
        
        # raise ValueError('A very specific bad thing happened.')

    def test_get_param_app_id (self):
        response = client_authorized.get('/tests/', data={'app_id' : '1'  })
        tests = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests),3)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='standard')
        
    def test_post_no_data (self):
        data= {}
        data = json.dumps(data)
        response = client_authorized.post('/tests/', data = data,  content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_post(self):
        data = {
            'test_data': {
                'name':"FESZFEZEF", 
                'alias':"SD65SD4D", 
                'species':"Mouse (Mus musculus)",
                'brain_region' : "Hippocampus", 
                'cell_type' : "Interneuron", 
                'age' : "12",  
                'data_location' : "http://bbbb.com", 
                'data_type' : "data type",
                'data_modality' : "electrophysiology",
                'test_type' : "single cell activity",
                'protocol' :"protocol",
                'author' : "me",
                'publication' : "not published",
                'score_type':"p-value",
            },
            'code_data' : {
                'version':"sss", 
                'test': str(self.data.test1.id),
                'repository' : "http://sd.com",
                'path' : "http://sd.com",
            }
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/tests/', data = data,  content_type='application/json')

        results = json.loads(response._container[0])
        
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(results), 1)      


        response = client_authorized.get('/tests/', data={'id': results['uuid']})
        tests = json.loads(response._container[0])['tests']

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tests), 1)
        self.compare_serializer_keys(tests=tests, targeted_keys_list_type='full')

        self.assertEqual(len(tests[0]['codes']), 1)

        targeted_keys = [
                        'id', 
                        'description', 
                        'repository',
                        'timestamp',
                        'version', 
                        'path', 
                        'test_definition_id', 
                        ]

        for code in tests[0]['codes'] :
            self.assertEqual(set(code.keys()), set(targeted_keys))                    
        # raise ValueError('A very specific bad thing happened.')
        
        

    def test_put(self):
        data = {
            'test_data': {
                'name':"FESZFEZEF", 
                'alias':"SD65SD4D", 
                'species':"Mouse (Mus musculus)",
                'brain_region' : "Hippocampus", 
                'cell_type' : "Interneuron", 
                'age' : "12",  
                'data_location' : "http://bbbb.com", 
                'data_type' : "data type",
                'data_modality' : "electrophysiology",
                'test_type' : "single cell activity",
                'protocol' :"protocol",
                'author' : "me",
                'publication' : "not published",
                'score_type':"p-value",
            },
            'code_data' : {
                'version':"sss", 
                'test': str(self.data.test1.id),
                'repository' : "http://sd.com",
                'path' : "http://sd.com",
            }
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/tests/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/tests/', data={'id': results})
        self.assertEqual(response.status_code, 200)
        
        instances1 = json.loads(response._container[0])['tests']

        data2 = {
            'id': instances1[0]['id'],
            'name':"FESZFEZEFFFF", 
            'alias':"SD65SD4D", 
            'species':"Mouse (Mus musculus)",
            'brain_region' : "Hippocampus", 
            'cell_type' : "Interneuron", 
            'age' : "12",  
            'data_location' : "http://bbbb.com", 
            'data_type' : "data type",
            'data_modality' : "electrophysiology",
            'test_type' : "single cell activity",
            'protocol' :"protocol",
            'author' : "me",
            'publication' : "not published",
            'score_type':"p-value",
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/tests/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/tests/', data={'id': results})

        instances2 = json.loads(response._container[0])['tests']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(tests=instances2, targeted_keys_list_type='full')

        self.assertEqual(instances2[0]['name'],data2['name'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )
