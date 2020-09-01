# """
# Tests of the ValidationFramework TestsView.
# """


from test_base import *



class ModelInstancesViewTest(TestCase):
    
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
                            'version',
                            'description', 
                            'parameters',
                            'code_format',
                            'source',
                            'model_id', 
                             ]


            for element in elements :
                self.assertEqual(set(element.keys()), set(targeted_keys))

     

    def test_get_no_param (self):
        response = client_authorized.get('/model-instances/', data={})
        instances = json.loads(response._container[0])['instances']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances), 3)
        self.compare_serializer_keys(elements=instances, targeted_keys_list_type='standard')

    def test_get_param_id (self):
        response = client_authorized.get('/model-instances/', data={'id': self.data.uuid_modelinstance1})
        instances = json.loads(response._container[0])['instances']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances), 1)
        self.compare_serializer_keys(elements=instances, targeted_keys_list_type='standard')

    def test_get_param_model_id (self):
        response = client_authorized.get('/model-instances/', data={'model_id': self.data.modelinstance1.model_id })
        instances = json.loads(response._container[0])['instances']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances), 1)
        self.compare_serializer_keys(elements=instances, targeted_keys_list_type='standard')

    def test_get_param_version (self):
        response = client_authorized.get('/model-instances/', data={'version': self.data.modelinstance1.version })
        instances = json.loads(response._container[0])['instances']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances), 1)
        self.compare_serializer_keys(elements=instances, targeted_keys_list_type='standard')

    def test_get_param_parameters (self):
        response = client_authorized.get('/model-instances/', data={'parameters': self.data.modelinstance1.parameters })
        instances = json.loads(response._container[0])['instances']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances), 1)
        self.compare_serializer_keys(elements=instances, targeted_keys_list_type='standard')

    def test_get_param_source (self):
        response = client_authorized.get('/model-instances/', data={'source':  self.data.modelinstance1.source})
        instances = json.loads(response._container[0])['instances']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances), 2)
        self.compare_serializer_keys(elements=instances, targeted_keys_list_type='standard')

    def test_get_param_timestamp (self):
        response = client_authorized.get('/model-instances/', data={'timestamp': self.data.modelinstance1.timestamp})
        instances = json.loads(response._container[0])['instances']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances), 1)
        self.compare_serializer_keys(elements=instances, targeted_keys_list_type='standard')

    def test_get_param_model_alias (self):
        response = client_authorized.get('/model-instances/', data={'model_alias': self.data.model1.alias })
        instances = json.loads(response._container[0])['instances']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances), 1)
        self.compare_serializer_keys(elements=instances, targeted_keys_list_type='standard')

    def test_post_no_data (self):
        data= {}
        data = json.dumps(data)
        response = client_authorized.post('/model-instances/', data = data,  content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_post(self):
        data = {
            'model_id': str(self.data.model1.id),           
            'version' : "1.sdvfszf1",
            'parameters' : "param",
            'source' : "http://dd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/model-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        
        self.assertEqual(response.status_code, 201)


        response = client_authorized.get('/model-instances/', data={'id': results})
        instances = json.loads(response._container[0])['instances']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances), 1)
        self.compare_serializer_keys(elements=instances, targeted_keys_list_type='standard')


    def test_put_no_data(self):
        data = {
            'model_id': str(self.data.model1.id),           
            'version' : "1.sdvfszf1",
            'parameters' : "param",
            'source' : "http://dd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/model-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/model-instances/', data={'id': results})
        instances1 = json.loads(response._container[0])['instances']

        data2 = {

        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/model-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 400)


    def test_put(self):
        data = {
            'model_id': str(self.data.model1.id),           
            'version' : "1.sdvfszf1",
            'parameters' : "param",
            'source' : "http://dd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/model-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/model-instances/', data={'id': results})
        instances1 = json.loads(response._container[0])['instances']

        data2 = {
            'id': instances1[0]['id'],
            'model_id': instances1[0]['model_id'],           
            'version' : instances1[0]['version']+"aaaa",
            'parameters' : instances1[0]['parameters'],
            'source' : instances1[0]['source'],
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/model-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/model-instances/', data={'id': results})

        instances2 = json.loads(response._container[0])['instances']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(elements=instances2, targeted_keys_list_type='standard')

        self.assertEqual(instances2[0]['version'],data2['version'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )


    def test_put_wrong_id(self):
        data = {
            'model_id': str(self.data.model1.id),           
            'version' : "1.sdvfszf1",
            'parameters' : "param",
            'source' : "http://dd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/model-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/model-instances/', data={'id': results})
        instances1 = json.loads(response._container[0])['instances']

        data2 = {
            'id': instances1[0]['id']+"555",
            'model_id': instances1[0]['model_id'],           
            'version' : instances1[0]['version']+"aaaa",
            'parameters' : instances1[0]['parameters'],
            'source' : instances1[0]['source'],
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/model-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 400)


    def test_put_no_id_but_model_and_version(self):
        data = {
            'model_id': str(self.data.model1.id),           
            'version' : "1.sdvfszf1",
            'parameters' : "param",
            'source' : "http://dd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/model-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/model-instances/', data={'id': results})
        instances1 = json.loads(response._container[0])['instances']

        data2 = {
            # 'id': instances1[0]['id'],
            'model_id': instances1[0]['model_id'],           
            'version' : instances1[0]['version'],
            'parameters' : instances1[0]['parameters']+'aaa',
            'source' : instances1[0]['source'],
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/model-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/model-instances/', data={'id': results})

        instances2 = json.loads(response._container[0])['instances']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(elements=instances2, targeted_keys_list_type='standard')

        self.assertEqual(instances2[0]['parameters'],data2['parameters'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )



    def test_put_param_web(self):
        data = {
            'model_id': str(self.data.model1.id),           
            'version' : "1.sdvfszf1",
            'parameters' : "param",
            'source' : "http://dd.com",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/model-instances/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/model-instances/', data={'id': results})
        instances1 = json.loads(response._container[0])['instances']

        data2 = {
            'id': instances1[0]['id'],
            'model_id': instances1[0]['model_id'],           
            'version' : instances1[0]['version']+"aaaa",
            'parameters' : instances1[0]['parameters'],
            'source' : instances1[0]['source'],
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/model-instances/?web_app=1', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/model-instances/', data={'id': results})

        instances2 = json.loads(response._container[0])['instances']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(elements=instances2, targeted_keys_list_type='standard')

        self.assertEqual(instances2[0]['version'],data2['version'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )

    def test_put_param_web_not_editable_id(self):

        data2 = {
            'id': str(self.data.modelinstance1.id),
            'model_id': str(self.data.modelinstance1.model_id),           
            'version' : self.data.modelinstance1.version +"aaaa",
            'parameters' : self.data.modelinstance1.parameters,
            'source' : self.data.modelinstance1.source,
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/model-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 400)


    def test_put_param_web_not_version_unique(self):

        data2 = {
            'id': str(self.data.modelinstance1.id),
            'model_id': str(self.data.modelinstance1.model_id),           
            'version' : self.data.modelinstance1.version,
            'parameters' :self.data.modelinstance1.parameters+"aaa",
            'source' : self.data.modelinstance1.source,
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/model-instances/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 400)

