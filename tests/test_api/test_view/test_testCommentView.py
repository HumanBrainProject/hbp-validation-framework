"""
Tests of the ValidationFramework TestsView.
"""

from test_base import *



class TestCommentRestTest(TestCase):
    
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
                            'author',
                            'text', 
                            'creation_date',
                            'Ticket_id',
                             ]


            for element in elements :
                self.assertEqual(set(element.keys()), set(targeted_keys))

     

    def test_get_no_param (self):
        response = client_authorized.get('/testcomment/', data={})
        self.assertEqual(response.status_code, 400)

    def test_get_param_Ticket_id (self):
        response = client_authorized.get('/testcomment/', data={'Ticket_id': self.data.ticket1.id})
        comments = json.loads(response._container[0])['comments']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(comments), 1)
        self.compare_serializer_keys(elements=comments, targeted_keys_list_type='standard')

    def test_post_no_data (self):
        data= {}
        data = json.dumps(data)
        response = client_authorized.post('/testcomment/', data = data,  content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_post(self):
        data = {
                'Ticket_id': str(self.data.ticket1.id),
                'author' :"me",
                'text' :"text",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/testcomment/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])['uuid']

        
        self.assertEqual(response.status_code, 201)

        response = client_authorized.get('/testcomment/', data={'id': results})
        comments = json.loads(response._container[0])['comments']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(comments), 1)
        self.compare_serializer_keys(elements=comments, targeted_keys_list_type='standard')


    def test_put(self):
        data = {
                'Ticket_id': str(self.data.ticket1.id),
                'author' :"me",
                'text' :"text",
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/testcomment/', data = data,  content_type='application/json')


        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/testcomment/', data={'id': results})
        self.assertEqual(response.status_code, 200)
        
        instances1 = json.loads(response._container[0])['comments']

        data2 = {
            'id': instances1[0]['id'],
            'Ticket_id': str(self.data.ticket1.id),
            'author' :"me",
            'text' :"textssss",
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/testcomment/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)

        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/testcomment/', data={'id': results})

        instances2 = json.loads(response._container[0])['comments']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 1)
        self.compare_serializer_keys(elements=instances2, targeted_keys_list_type='full')

        self.assertEqual(instances2[0]['text'],data2['text'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )