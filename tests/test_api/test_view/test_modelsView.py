"""
Tests of the ValidationFramework TestsView.
"""


from test_base import *


class ModelsViewTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass

    def compare_serializer_keys (self, models, targeted_keys_list_type='all'):
        
        if targeted_keys_list_type == "standard" :
            targeted_keys = [
                            'id', 
                            'name',
                            'alias', 
                            'author',
                            'app',
                            'organization',
                            'private', 
                            'cell_type', 
                            'model_type', 
                            'brain_region', 
                            'species', 
                            'description',
                            'images',
                            'instances',


                            ]


            for model in models :
                self.assertEqual(set(model.keys()), set(targeted_keys))

            
                for image in model['images'] :
                    self.assertEqual(set(image.keys()), set([
                                                    'id', 
                                                    'url',
                                                    'caption', 
                                                    # 'model_id', 
                                                    
                                                    ]))

                for instance in model['instances'] :
                    self.assertEqual(set(instance.keys()), set([
                                                            'code_format',
                                                            'description',
                                                            'parameters',
                                                            'source',
                                                            'version',
                                                            'id',
                                                            ]))

        if targeted_keys_list_type == "less" :
            targeted_keys = [
                        'id', 
                        'name',
                        'alias', 
                        'author',
                        'app',
                        'organization',
                        'private', 
                        'cell_type', 
                        'model_type', 
                        'brain_region', 
                        'species', 
                        ]
        if targeted_keys_list_type == "web_id" :
            targeted_keys = [
                        'model_id', 
                        'name',
                        'alias', 
                        'author',
                        'app',
                        'organization',
                        'private', 
                        'cell_type', 
                        'model_type', 
                        'brain_region', 
                        'species', 
                        ]



    def test_get_no_param (self):
        response = client_authorized.get('/models/', data={})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 4)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='less')



    def test_get_param_id (self):
        response = client_authorized.get('/models/', data={'id': self.data.uuid_model1})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_web_app (self):
        response = client_authorized.get('/models/', data={'web_app': True, 'app_id': self.data.model1.app_id})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='less')

    def test_get_param_app_id (self):
        response = client_authorized.get('/models/', data={'app_id': self.data.model1.app_id})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 3)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_name (self):
        response = client_authorized.get('/models/', data={'name': self.data.model1.name })
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_description (self):
        response = client_authorized.get('/models/', data={'description': self.data.model1.description })
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_species (self):
        response = client_authorized.get('/models/', data={'species': self.data.model1.species})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_brain_region (self):
        response = client_authorized.get('/models/', data={'brain_region': self.data.model1.brain_region})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_cell_type (self):
        response = client_authorized.get('/models/', data={'cell_type': self.data.model1.cell_type})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_author (self):
        response = client_authorized.get('/models/', data={'author': self.data.model1.author})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_model_type (self):
        response = client_authorized.get('/models/', data={'model_type':  self.data.model1.model_type})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')


    def test_get_param_private (self):
        #private alone means nothing
        response = client_authorized.get('/models/', data={'private':  4})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 4)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')


    def test_get_param_private_with_id (self):
        response = client_authorized.get('/models/', data={'id': self.data.uuid_model1, 'private':  self.data.model1.private})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')


    def test_get_param_private_with_id_with_web (self):
        response = client_authorized.get('/models/', data={'id': self.data.uuid_model1, 'web_app': True, 'private':  self.data.model1.private})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='web_id')


    def test_get_param_private_with_web (self):
        response = client_authorized.get('/models/', data={ 'web_app': True, 'app_id' : '1', 'private':  self.data.model1.private})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='web_id')


    def test_get_param_code_format (self):
        response = client_authorized.get('/models/', data={'code_format': self.data.model1.code_format })
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 2)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_get_param_alias (self):
        response = client_authorized.get('/models/', data={'alias':  self.data.model1.alias})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')
    
    def test_get_param_organization (self):
        response = client_authorized.get('/models/', data={'organization': self.data.model1.organization})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')

    def test_post_no_data (self):
        data= {}
        data = json.dumps(data)
        response = client_authorized.post('/models/', data = data,  content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_post(self):
        data = {
            'model': {
                'name' : "sfsdfdf", 
                'alias' : "54f6s", 
                'app_id': '1',
                'description' : "description",
                'species' : "Mouse (Mus musculus)",
                'brain_region' : "Hippocampus",
                'cell_type' : "Interneuron",
                'author' : "me",
                'model_type' : "Single Cell",
                'private' : "0",
                'code_format' : "py",
                'organization' : "",
            },
            'model_instance' : [{
                'model_id': str(self.data.model1.id),           
                'version' : "1.ggggvfszf1",
                'parameters' : "param",
                'source' : "http://dd.com",

            }],
            'model_image': [{
                'model_id': str(self.data.model1.id), 
                'url' : "http://aa.com",
                'caption' : "caption",

            }]
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/models/?app_id=1', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        
        self.assertEqual(response.status_code, 201)

        response = client_authorized.get('/models/?app_id=1', data={'id': results})
        models = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(models), 1)
        self.compare_serializer_keys(models=models, targeted_keys_list_type='standard')


    def test_put(self):
        data = {
            'model': {
                'name' : "sfsdfdf", 
                'alias' : "54f6s", 
                'app_id': '1',
                'description' : "description",
                'species' : "Mouse (Mus musculus)",
                'brain_region' : "Hippocampus",
                'cell_type' : "Interneuron",
                'author' : "me",
                'model_type' : "Single Cell",
                'private' : "0",
                'code_format' : "py",
                'organization' : "",
            },
            'model_instance' : [{
                'model_id': str(self.data.model1.id),           
                'version' : "1.ggggvfszf1",
                'parameters' : "param",
                'source' : "http://dd.com",

            }],
            'model_image': [{
                'model_id': str(self.data.model1.id), 
                'url' : "http://aa.com",
                'caption' : "caption",

            }]
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/models/?app_id=1', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        
        self.assertEqual(response.status_code, 201)

        response = client_authorized.get('/models/?app_id=1', data={'id': results})
        instances1 = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)

        data2 = {
            'models': [{
                'id': instances1[0]['id'],
                'name' : "sfsdfdf", 
                'alias' : "54f6sss", 
                'app_id': '1',
                'description' : "description",
                'species' : "Mouse (Mus musculus)",
                'brain_region' : "Hippocampus",
                'cell_type' : "Interneuron",
                'author' : "me",
                'model_type' : "Single Cell",
                'private' : "0",
                'code_format' : "py",
                'organization' : "",
            }]

        }

        data2_json = json.dumps(data2)
        response = client_authorized.put('/models/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/models/', data={'id': results})

        instances2 = json.loads(response._container[0])['models']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(models=instances2, targeted_keys_list_type='standard')

        self.assertEqual(instances2[0]['alias'],data2['models'][0]['alias'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )


    def test_put_no_uuid_but_allias(self):
        data = {
            'model': {
                'name' : "sfsdfdf", 
                'alias' : "54f6s", 
                'app_id': '1',
                'description' : "description",
                'species' : "Mouse (Mus musculus)",
                'brain_region' : "Hippocampus",
                'cell_type' : "Interneuron",
                'author' : "me",
                'model_type' : "Single Cell",
                'private' : "0",
                'code_format' : "py",
                'organization' : "",
            },
            'model_instance' : [{
                'model_id': str(self.data.model1.id),           
                'version' : "1.ggggvfszf1",
                'parameters' : "param",
                'source' : "http://dd.com",

            }],
            'model_image': [{
                'model_id': str(self.data.model1.id), 
                'url' : "http://aa.com",
                'caption' : "caption",

            }]
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/models/?app_id=1', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        
        self.assertEqual(response.status_code, 201)

        response = client_authorized.get('/models/?app_id=1', data={'id': results})
        instances1 = json.loads(response._container[0])['models']
        
        self.assertEqual(response.status_code, 200)

        data2 = {
            'models': [{
                'name' : "sfsdfdffff", 
                'alias' : "54f6s", 
                'app_id': '1',
                'description' : "description",
                'species' : "Mouse (Mus musculus)",
                'brain_region' : "Hippocampus",
                'cell_type' : "Interneuron",
                'author' : "me",
                'model_type' : "Single Cell",
                'private' : "0",
                'code_format' : "py",
                'organization' : "",
            }]

        }

        data2_json = json.dumps(data2)
        response = client_authorized.put('/models/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/models/', data={'id': results})

        instances2 = json.loads(response._container[0])['models']

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(models=instances2, targeted_keys_list_type='standard')

        self.assertEqual(instances2[0]['name'],data2['models'][0]['name'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )