# """
# Tests of the ValidationFramework TestsView.
# """

from test_base import *



class TestInstancesViewTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass

    def compare_serializer_keys (self, codes, targeted_keys_list_type='all'):
        
        if targeted_keys_list_type == "standard" :
            targeted_keys = [
                            'id', 
                            'description', 
                            'repository',
                            'timestamp',
                            'version', 
                            'path', 
                            'test_definition_id', 
                            ]


        for code in codes :
            self.assertEqual(set(code.keys()), set(targeted_keys))




    def test_get_no_param (self):
        response = client_authorized.get('/test-instances/', data={})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 3)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')


    def test_get_param_id (self):
        response = client_authorized.get('/test-instances/', data={'id': self.data.uuid_testcode1_1})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_repository (self):
        response = client_authorized.get('/test-instances/', data={'repository': self.data.testcode1.repository })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_version (self):
        response = client_authorized.get('/test-instances/', data={'version' :self.data.testcode1.version })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_path (self):
        response = client_authorized.get('/test-instances/', data={'path':self.data.testcode1.path })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_timestamp (self):
        response = client_authorized.get('/test-instances/', data={'timestamp':self.data.testcode1.timestamp })
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_test_definition_id (self):
        response = client_authorized.get('/test-instances/', data={'test_definition_id':self.data.testcode1.test_definition_id})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_get_param_test_alias (self):
        response = client_authorized.get('/test-instances/', data={'test_alias':self.data.test1.alias})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')

    def test_post_no_data (self):
        data= {}
        data = json.dumps(data)
        response = client_authorized.post('/test-instances/', data = data,  content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_post(self):
        data = {
                'version':"ssdsfgs", 
                'test_definition_id': str(self.data.test1.id),
                'repository' : "http://sd.com",
                'path' : "http://sd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/test-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        
        self.assertEqual(response.status_code, 201)

        response = client_authorized.get('/test-instances/', data={'id': results})
        codes = json.loads(response._container[0])['test_codes']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(codes), 1)
        self.compare_serializer_keys(codes=codes, targeted_keys_list_type='standard')


    def test_put(self):
        data = {
            'version':"ssdsfgs", 
            'test_definition_id': str(self.data.test1.id),
            'repository' : "http://sd.com",
            'path' : "http://sd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/test-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/test-instances/', data={'id': results})
        self.assertEqual(response.status_code, 200)
        
        instances1 = json.loads(response._container[0])['test_codes']

        data2 = {
            'id': instances1[0]['id'],
            'version':"ssdsfgsds", 
            'test_definition_id': str(self.data.test1.id),
            'repository' : "http://sd.com",
            'path' : "http://sd.com",
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/test-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid'][0]['id']
        response = client_authorized.get('/test-instances/', data={'id': results})

        instances2 = json.loads(response._container[0])['test_codes']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(codes=instances2, targeted_keys_list_type='standard')

        self.assertEqual(instances2[0]['version'],data2['version'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )


    def test_put_bad_id(self):
        data = {
            'version':"ssdsfgs", 
            'test_definition_id': str(self.data.test1.id),
            'repository' : "http://sd.com",
            'path' : "http://sd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/test-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/test-instances/', data={'id': results})
        self.assertEqual(response.status_code, 200)
        
        instances1 = json.loads(response._container[0])['test_codes']

        data2 = {
            'id': instances1[0]['id']+"888",
            'version':"ssdsfgsds", 
            'test_definition_id': str(self.data.test1.id),
            'repository' : "http://sdddd.com",
            'path' : "http://sd.com",
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/test-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 400)


    def test_put_no_id_but_test_alias(self):
        data = {
            'version':"ssdsfgs", 
            'test_definition_id': str(self.data.test1.id),
            'repository' : "http://sd.com",
            'path' : "http://sd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/test-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/test-instances/', data={'id': results})
        self.assertEqual(response.status_code, 200)
        
        instances1 = json.loads(response._container[0])['test_codes']

        data2 = {
            'test_alias': str(self.data.test1.alias),
            'version':"ssdsfgs", 
            'repository' : "http://sdddd.com",
            'path' : "http://sd.com",
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/test-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)


        results = json.loads(response._container[0])['uuid'][0]['id']
        response = client_authorized.get('/test-instances/', data={'id': results})

        instances2 = json.loads(response._container[0])['test_codes']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(codes=instances2, targeted_keys_list_type='standard')

        self.assertEqual(instances2[0]['repository'],data2['repository'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )



    def test_put_no_id_but_test_definition_id(self):
        data = {
            'version':"ssdsfgs", 
            'test_definition_id': str(self.data.test1.id),
            'repository' : "http://sd.com",
            'path' : "http://sd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/test-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/test-instances/', data={'id': results})
        self.assertEqual(response.status_code, 200)
        
        instances1 = json.loads(response._container[0])['test_codes']

        data2 = {
            'version':"ssdsfgs", 
            'test_definition_id': str(self.data.test1.id),
            'repository' : "http://sdddd.com",
            'path' : "http://sd.com",
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/test-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid'][0]['id']
        response = client_authorized.get('/test-instances/', data={'id': results})

        instances2 = json.loads(response._container[0])['test_codes']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(codes=instances2, targeted_keys_list_type='standard')

        self.assertEqual(instances2[0]['repository'],data2['repository'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )       

    def test_put_no_id_no_version(self):
        data = {
            'version':"ssdsfgs", 
            'test_definition_id': str(self.data.test1.id),
            'repository' : "http://sd.com",
            'path' : "http://sd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/test-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/test-instances/', data={'id': results})
        self.assertEqual(response.status_code, 200)
        
        instances1 = json.loads(response._container[0])['test_codes']

        data2 = {
            'test_definition_id': str(self.data.test1.id),
            'repository' : "http://sdddd.com",
            'path' : "http://sd.com",
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/test-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 400)