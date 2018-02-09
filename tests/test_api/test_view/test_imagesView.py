"""
Tests of the ValidationFramework TestsView.
"""

from test_base import *



class ImagesTest(TestCase):
    
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
                            'url',
                            'caption', 
                            'model_id', 
                             ]

            for element in elements :
                self.assertEqual(set(element.keys()), set(targeted_keys))

     

    def test_get_no_param (self):
        response = client_authorized.get('/images/', data={})
        images = json.loads(response._container[0])['images']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(images), 4)
        self.compare_serializer_keys(elements=images, targeted_keys_list_type='standard')

    def test_get_param_id (self):
        response = client_authorized.get('/images/', data={'id': self.data.uuid_modelimage1})
        images = json.loads(response._container[0])['images']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(images), 1)
        self.compare_serializer_keys(elements=images, targeted_keys_list_type='standard')

    def test_get_param_model_id (self):
        response = client_authorized.get('/images/', data={'model_id': self.data.uuid_model1})
        images = json.loads(response._container[0])['images']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(images), 1)
        self.compare_serializer_keys(elements=images, targeted_keys_list_type='standard')

    def test_get_param_model_alias (self):
        response = client_authorized.get('/images/', data={'model_alias': self.data.model1.alias})
        images = json.loads(response._container[0])['images']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(images), 1)
        self.compare_serializer_keys(elements=images, targeted_keys_list_type='standard')

    def test_get_param_url (self):
        response = client_authorized.get('/images/', data={'url': self.data.image1.url})
        images = json.loads(response._container[0])['images']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(images), 1)
        self.compare_serializer_keys(elements=images, targeted_keys_list_type='standard')

    def test_get_param_caption (self):
        response = client_authorized.get('/images/', data={'caption': self.data.image1.caption})
        images = json.loads(response._container[0])['images']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(images), 1)
        self.compare_serializer_keys(elements=images, targeted_keys_list_type='standard')

    def test_post_no_data (self):
        data= {}
        data = json.dumps(data)
        response = client_authorized.post('/images/', data = data,  content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_post(self):
        data = {
            'model_id': str(self.data.model1.id), 
            'url' : "http://aa.com",
            'caption' : "caption",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/images/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(results), 1)


        response = client_authorized.get('/images/', data={'id':results[0]})
        images = json.loads(response._container[0])['images']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(images), 1)
        self.compare_serializer_keys(elements=images, targeted_keys_list_type='standard')

    def test_put(self):
        data = {
            'model_id': str(self.data.model1.id), 
            'url' : "http://aa.com",
            'caption' : "caption",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/images/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/images/', data={'id': results})
        instances1 = json.loads(response._container[0])['images']

        data2 = {
            'id': instances1[0]['id'],
            'model_id': instances1[0]['model_id'], 
            'url' : instances1[0]['url'],
            'caption' : instances1[0]['caption']+"uuuu",
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/images/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/images/', data={'id': results})

        instances2 = json.loads(response._container[0])['images']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(elements=instances2, targeted_keys_list_type='standard')

        self.assertEqual(instances2[0]['caption'],data2['caption'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )


    def test_put_wrong_model(self):
        data2 = { 
            'id' : str(self.data.image4.id),
            'model_id': str(self.data.image4.model_id), 
            'url' : "http://aa.com",
            'caption' : "captionss",
     
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/images/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 403)

    def test_delete(self):

        response = client_authorized.delete('/images/?id='+str(self.data.image1.id), data = {},  content_type='application/json')

        self.assertEqual(response.status_code, 200)

    def test_delete_no_acces(self):
    
        response = client_authorized.delete('/images/?id='+str(self.data.image4.id), data = {},  content_type='application/json')

        self.assertEqual(response.status_code, 403)