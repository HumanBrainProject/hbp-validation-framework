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
        # 'param': param_serializer.data,
        #for each : params
        if targeted_keys_list_type == "standard" :
            targeted_keys = [
                            'id', 
                            'cell_type',
                            'app_type',
                            'test_type',
                            'data_modalities',
                            'collab_id',
                            'brain_region',
                            'model_type',
                            'organization',
                            'species',

                             ]


            for element in elements :
                self.assertEqual(set(element.keys()), set(targeted_keys))

     

    def test_get_no_param (self):
        response = client_authorized.get('/parametersconfigurationrest/', data={})
        
        self.assertEqual(response.status_code, 400)

    def test_get_param_id (self):
        response = client_authorized.get('/parametersconfigurationrest/', data={'app_id': self.data.collab1.id})
        instances = json.loads(response._container[0])['param']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances), 1)
        self.compare_serializer_keys(elements=instances, targeted_keys_list_type='standard')


    def test_post_no_data (self):
        data= {}
        data = json.dumps(data)
        response = client_authorized.post('/parametersconfigurationrest/', data = data,  content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_post(self):
        data = {
                'id' : '10',
                'collab_id':'2169',
                'data_modality':'electrophysiology', 
                'test_type':'single cell activity', 
                'species':'Mouse (Mus musculus)', 
                'brain_region':'Hippocampus',
                'cell_type' : 'Interneuron',
                'model_type' : 'Single Cell',
                'organization' : '',
                'app_type' : "model_catalog",
        }
             
        data_json = json.dumps(data)
        response = client_authorized.post('/parametersconfigurationrest/', data = data_json,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']

        
        self.assertEqual(response.status_code, 201)

        self.assertEqual(results, data['id'])

        response = client_authorized.get('/parametersconfigurationrest/', data={'app_id': results})
        comments = json.loads(response._container[0])['param']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(comments), 1)
        self.compare_serializer_keys(elements=comments, targeted_keys_list_type='standard')


    def test_put(self):
        data = {
                'id' : '10',
                'collab_id':'2169',
                'data_modality':'electrophysiology', 
                'test_type':'single cell activity', 
                'species':'Mouse (Mus musculus)', 
                'brain_region':'Hippocampus',
                'cell_type' : 'Interneuron',
                'model_type' : 'Single Cell',
                'organization' : '',
                'app_type' : "model_catalog",
        }
             
        data_json = json.dumps(data)
        response = client_authorized.post('/parametersconfigurationrest/', data = data_json,  content_type='application/json')


        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/parametersconfigurationrest/', data={'app_id': results})
        self.assertEqual(response.status_code, 200)
        
        instances1 = json.loads(response._container[0])['param']

        data2 = {
                'id' : '10',
                'collab_id':'2169',
                'data_modality':'electrophysiology', 
                'test_type':'single cell activity', 
                'species':'Mouse (Mus musculus)666', 
                'brain_region':'Hippocampus',
                'cell_type' : 'Interneuron',
                'model_type' : 'Single Cell',
                'organization' : '',
                'app_type' : "model_catalog",
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/parametersconfigurationrest/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/parametersconfigurationrest/', data={'app_id': results})

        instances2 = json.loads(response._container[0])['param']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(elements=instances2, targeted_keys_list_type='full')

        self.assertEqual(instances2[0]['species'],data2['species'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )