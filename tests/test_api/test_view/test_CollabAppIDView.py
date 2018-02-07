"""
Tests of the ValidationFramework TestsView.
"""


from test_base import *


class CollabAppIDTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass

    def test_get_no_param (self):
        response = client_authorized.get('/collabappid/', data={})
        
        self.assertEqual(response.status_code, 400)

    def test_get_param_collab_id (self):
        response = client_authorized.get('/collabappid/', data={'collab_id': self.data.collab1.collab_id})
        app_id = json.loads(response._container[0])['app_id']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(app_id, self.data.collab1.id)

    def test_get_param_collab_id_app_type_success (self):
        response = client_authorized.get('/collabappid/', data={'collab_id': self.data.collab1.collab_id, 'app_type' : self.data.collab1.app_type })
        app_id = json.loads(response._container[0])['app_id']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(app_id, self.data.collab1.id)


    def test_get_param_collab_id_app_type_fail (self):
        response = client_authorized.get('/collabappid/', data={'collab_id': self.data.collab1.collab_id, 'app_type' : "wrong"})
        app_id = json.loads(response._container[0])['app_id']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(app_id, "")