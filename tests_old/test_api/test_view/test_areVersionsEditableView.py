"""
Tests of the ValidationFramework TestsView.
"""

from test_base import *



class AreVersionsEditableTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass


    def test_get_no_param (self):
        response = client_authorized.get('/areversionseditable/', data={})
        list_id = json.loads(response._container[0])['are_editable']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(list_id), 0)
        self.assertEqual(type(list_id), list)

    def test_get_param_test_id (self):
        response = client_authorized.get('/areversionseditable/', data={'test_id': [self.data.test1_bis.id]})
        list_id = json.loads(response._container[0])['are_editable']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(list_id), 1)
        self.assertEqual(type(list_id), list)
        
    def test_get_param_model_id (self):
        response = client_authorized.get('/areversionseditable/', data={'model_id': [self.data.model1_bis_private.id]})

        list_id = json.loads(response._container[0])['are_editable']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(list_id), 1)
        self.assertEqual(type(list_id), list)
        
