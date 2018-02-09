# """
# Tests of the ValidationFramework TestsView.
# """

from test_base import *



class TestAliasesTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass



    def test_get_no_param (self):
        response = client_authorized.get('/test-aliases/', data={})
        # is_valid = json.loads(response._container[0])['is_valid']
        
        self.assertEqual(response.status_code, 400)
        # self.assertEqual(is_valid, True)

    def test_get_param_alias_true (self):
        response = client_authorized.get('/test-aliases/', data={'alias': self.data.test1.alias+"thing"})
        is_valid = json.loads(response._container[0])['is_valid']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(is_valid, True)

    def test_get_param_alias_false (self):
        response = client_authorized.get('/test-aliases/', data={'alias': self.data.test1.alias})
        is_valid = json.loads(response._container[0])['is_valid']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(is_valid, False)


    def test_get_param_alias_test_id (self):
        response = client_authorized.get('/test-aliases/', data={ 'alias': self.data.test1.alias,'test_id': self.data.test1.id})
        is_valid = json.loads(response._container[0])['is_valid']
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(is_valid, True)

    def test_get_param_test_id (self):
        response = client_authorized.get('/test-aliases/', data={ 'test_id': self.data.test1.id})
        # is_valid = json.loads(response._container[0])['is_valid']
        
        self.assertEqual(response.status_code, 400)
        # self.assertEqual(is_valid, True)



