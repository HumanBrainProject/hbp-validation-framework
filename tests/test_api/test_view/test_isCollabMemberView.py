"""
Tests of the ValidationFramework TestsView.
"""

from test_base import *



class IsCollabMemberRestTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass


    def test_get_no_param (self):
        response = client_authorized.get('/iscollabmemberrest/', data={})
        # boolean = json.loads(response._container[0])['is_member']
        
        self.assertEqual(response.status_code, 400)
        # self.assertEqual(boolean, True)

    def test_get_param_app_id (self):
        response = client_authorized.get('/iscollabmemberrest/', data={'app_id': self.data.collab1.id})
        boolean = json.loads(response._container[0])['is_member']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(boolean, True)

