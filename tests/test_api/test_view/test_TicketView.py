"""
Tests of the ValidationFramework TestsView.
"""

from test_base import *



class TestTicketRestTest(TestCase):
    
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
                            'title', 
                            'text',
                            'creation_date',
                            'test_id',
                            'comments', 
                             ]
            sub_keys = [
                        'id', 
                        'author',
                        'text',
                        'creation_date',
                        'Ticket_id',
                        ]


            for element in elements :
                self.assertEqual(set(element.keys()), set(targeted_keys))

                for i in element['comments'] : 
                    self.assertEqual(set(i.keys()), set(sub_keys))
                    

     

    def test_get_no_param (self):
        response = client_authorized.get('/testticket/', data={})
        # tickets = json.loads(response._container[0])['tickets']
        # user_connected = json.loads(response._container[0])['user_connected']
        
        self.assertEqual(response.status_code, 400)
        # self.assertEqual(len(tickets), 3)
        # self.compare_serializer_keys(elements=tickets, targeted_keys_list_type='standard')

    def test_get_param_test_id (self):
        response = client_authorized.get('/testticket/', data={'test_id': self.data.uuid_test1})
        tickets = json.loads(response._container[0])['tickets']
        # user_connected = json.loads(response._container[0])['user_connected']
        
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tickets), 1)
        self.compare_serializer_keys(elements=tickets, targeted_keys_list_type='standard')


    def test_post_no_data (self):
        data= {}
        data = json.dumps(data)
        response = client_authorized.post('/testticket/', data = data,  content_type='application/json')

        self.assertEqual(response.status_code, 400)

    def test_post(self):
        data = {
                'test_id': str(self.data.test1.id),
                'author' : 'me',
                'title' : 'models.CharField(max_length=200, default="")',
                'text' : 'models.TextField()',
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/testticket/', data = data,  content_type='application/json')
        results = json.loads(response._container[0])

        
        self.assertEqual(response.status_code, 201)


        response = client_authorized.get('/testticket/', data={'test_id': self.data.uuid_test1})
        tickets = json.loads(response._container[0])['tickets']
        # user_connected = json.loads(response._container[0])['user_connected']
        
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(tickets), 2)
        self.compare_serializer_keys(elements=tickets, targeted_keys_list_type='standard')



    def test_put(self):
        data = {
                'test_id': str(self.data.test2.id),
                'author' : 'me',
                'title' : 'models.CharField(max_length=200, default="")',
                'text' : 'models.TextField()',
        }
             
        data = json.dumps(data)
        response = client_authorized.post('/testticket/', data = data,  content_type='application/json')


        results = json.loads(response._container[0])['new_ticket'][0]['id']
        response = client_authorized.get('/testticket/', data={'test_id': str(self.data.test2.id)})
        self.assertEqual(response.status_code, 200)
        
        instances1 = json.loads(response._container[0])['tickets']

        data2 = {
            'id': instances1[0]['id'],
            'test_id': str(self.data.test2.id),
            'author' : 'me',
            'title' : 'models.CharField(max_length=200, default="")',
            'text' : 'models.TextField()zzzz',
        }
        data2_json = json.dumps(data2)
        response = client_authorized.put('/testticket/', data = data2_json,  content_type='application/json')

        self.assertEqual(response.status_code, 202)


        results = json.loads(response._container[0])['uuid']
        response = client_authorized.get('/testticket/', data={'test_id': str(self.data.test2.id)})

        instances2 = json.loads(response._container[0])['tickets']


        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(instances2), 2)
        self.compare_serializer_keys(elements=instances2, targeted_keys_list_type='full')

        self.assertEqual(instances2[0]['text'],data2['text'] )
        self.assertEqual(instances2[0]['id'],instances1[0]['id'] )