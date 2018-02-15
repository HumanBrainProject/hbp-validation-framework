# -*- coding: utf-8 -*-
"""
Tests of the ValidationFramework TestsView.
"""

from test_base import *



class ResultsTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass




    def compare_serializer_keys (self, elements, targeted_keys_list_type='all'):
        
        if targeted_keys_list_type == "standard" :
            targeted_keys = [
                            'id',
                            'model_version_id',
                            'timestamp',
                            'test_code_id',
                            'results_storage',
                            'project',
                            'platform',
                            'score',
                            'passed',
                            'normalized_score',
                             ]




            for element in elements :
                self.assertEqual(set(element.keys()), set(targeted_keys))

        elif targeted_keys_list_type == "test" :
            targeted_keys = [
                            'alias',
                            'score_type',
                            'test_codes',
                             ]
            second_key = [
                        'models',
                        'version',
                        ]
            third_key = [
                        'alias',
                        'model_instances',

                        ]
            forth_key = [
                        'version',
                        'result',
                        ]

            for key, value in elements.items() :
                self.assertEqual(set(value.keys()), set(targeted_keys))
                for key2, value2 in value['test_codes'].items() :
                    self.assertEqual(set(value2.keys()), set(second_key))
                    for key3, value3 in value2['models'].items() :
                        self.assertEqual(set(value3.keys()), set(third_key))
                        for key4, value4 in value3['model_instances'].items() :
                            self.assertEqual(set(value4.keys()), set(forth_key))
                        
                    


        elif targeted_keys_list_type == "model" :
            targeted_keys = [
                            'alias',
                            'model_instances',
                             ]

            second_key = [
                        'tests',
                        'version',
                        ]
            third_key = [
                        'alias',
                        'test_codes',

                        ]
            forth_key = [
                        'version',
                        'result',
                        ]





            for key, value in elements.items() :
                self.assertEqual(set(value.keys()), set(targeted_keys))
                for key2, value2 in value['model_instances'].items() :
                    self.assertEqual(set(value2.keys()), set(second_key))
                    for key3, value3 in value2['tests'].items() :
                        self.assertEqual(set(value3.keys()), set(third_key))
                        for key4, value4 in value3['test_codes'].items() :
                            self.assertEqual(set(value4.keys()), set(forth_key))

        elif targeted_keys_list_type == "model_instance" :
            targeted_keys = [
                            'model_name',
                            'model_id',
                            'version',
                            'model_alias',
                            'test_codes',
                            'timestamp',


                             ]

            second_key = [
                        'timestamp',
                        'test_id',
                        'results',
                        'test_alias',
                        'version',
                        ]
            third_key = [
                        'model_version_id',
                        'timestamp',
                        'test_code_id',
                        'results_storage',
                        'project',
                        'platform',
                        'score',
                        'passed',
                        'normalized_score',
                        'id',
                        ]

            for key, value in elements.items() :
                self.assertEqual(set(value.keys()), set(targeted_keys))
                for key2, value2 in value['test_codes'].items() :
                    self.assertEqual(set(value2.keys()), set(second_key))
                    for key3, value3 in value2['results'].items() :
                        self.assertEqual(set(value3.keys()), set(third_key))


        elif targeted_keys_list_type == "test_code" :
            targeted_keys = [
                            'test_id',
                            'test_alias',
                            'model_instances',
                            'version',
                            'test_name',
                            'timestamp'

                             ]

            second_key = [
                        'model_id',
                        'results',
                        'timestamp',
                        'model_alias',
                        'version',
                        ]
            third_key = [
                        'model_version_id',
                        'timestamp',
                        'test_code_id',
                        'results_storage',
                        'project',
                        'platform',
                        'score',
                        'passed',
                        'normalized_score',
                        'id',
                        ]


            for key, value in elements.items() :
                self.assertEqual(set(value.keys()), set(targeted_keys))
                for key2, value2 in value['model_instances'].items() :
                    self.assertEqual(set(value2.keys()), set(second_key))
                    for key3, value3 in value2['results'].items() :
                        self.assertEqual(set(value3.keys()), set(third_key))



    def test_get_no_param (self):
        response = client_authorized.get('/results/', data={})
        message = json.loads(response._container[0])

        error_message = "You need to give 'order' argument. Here are the options : 'test', 'model', 'model_instance', 'test_code', 'score_type', '' "

        self.assertEqual(json.loads(response._container[0]), error_message)
        
        self.assertEqual(response.status_code, 400)

    def test_get_param_id (self):
        response = client_authorized.get('/results/', data={'id': self.data.uuid_resultM1_T1, 'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_results_storage (self):
        response = client_authorized.get('/results/', data={'results_storage': self.data.resultM1_T1.results_storage ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_score (self):
        response = client_authorized.get('/results/', data={'score': self.data.resultM1_T1.score ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_passed (self):
        response = client_authorized.get('/results/', data={'passed': self.data.resultM1_T1.passed ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 0)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_timestamp (self):
        response = client_authorized.get('/results/', data={'timestamp': self.data.resultM1_T1.timestamp ,'order' :''})

        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_platform (self):
        response = client_authorized.get('/results/', data={'platform': self.data.resultM1_T1.platform ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_project (self):
        response = client_authorized.get('/results/', data={'project': self.data.resultM1_T1.project ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')


    def test_get_param_model_version_id (self):
        response = client_authorized.get('/results/', data={'model_version_id': self.data.resultM1_T1.model_version.id ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 2)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_test_code_id (self):
        response = client_authorized.get('/results/', data={'test_code_id': self.data.resultM1_T1.test_code.id ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_normalized_score (self):
        response = client_authorized.get('/results/', data={'normalized_score': self.data.resultM1_T1.normalized_score ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_model_id (self):
        response = client_authorized.get('/results/', data={'model_id': self.data.model1.id ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 2)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_test_id (self):
        response = client_authorized.get('/results/', data={'test_id': self.data.test1.id ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_model_alias (self):
        response = client_authorized.get('/results/', data={'model_alias': self.data.model1.alias ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 2)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_test_alias (self):
        response = client_authorized.get('/results/', data={'test_alias': self.data.test1.alias ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_score_type (self):
        response = client_authorized.get('/results/', data={'score_type': "p-value" ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')


    def test_get_param_detailed_view (self):
        response = client_authorized.get('/results/', data={'detailed_view': '' ,'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 3)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

    def test_get_param_order (self):
        response = client_authorized.get('/results/', data={'order': ''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 3)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')


    def test_get_param_order_test (self):
        response = client_authorized.get('/results/', data={ 'order' :'test'})
        
        results = json.loads(response._container[0])['tests']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 2)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='test')

    def test_get_param_order_model (self):
        response = client_authorized.get('/results/', data={ 'order' :'model'})
        
        results = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 2)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='model')

    def test_get_param_order_model_instance (self):
        response = client_authorized.get('/results/', data={ 'order' :'model_instance'})
        
        results = json.loads(response._container[0])['model_instances']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 2)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='model_instance')

    def test_get_param_order_test_code (self):
        response = client_authorized.get('/results/', data={ 'order' :'test_code'})
        results = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 2)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='test_code')

    def test_post_no_data (self):
        data= {}
        data = json.dumps(data)
        response = client_authorized.post('/results/', data = data,  content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_post(self):
        data = {
            'model_version_id': str(self.data.modelinstance1.id), 
            'test_code_id': str(self.data.testcode1.id), 
            'results_storage':"ff", 
            'score': "1", 
            'passed':"1", 
            'platform':"dd",   
            'project': "ss",  
            'normalized_score': "1"
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/results/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(results), 1)


        response = client_authorized.get('/results/', data={'id': results[0], 'order' :''})
        results = json.loads(response._container[0])['results']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(results), 1)
        self.compare_serializer_keys(elements=results, targeted_keys_list_type='standard')

