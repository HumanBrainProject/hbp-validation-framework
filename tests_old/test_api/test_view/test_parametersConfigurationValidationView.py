# """
# Tests of the ValidationFramework TestsView.
# """

from test_base import *



class ParametersConfigurationValidationViewTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.data = DataForTests()

    def setUp(self):
        #Setup run before every test method.
        pass




    # def compare_serializer_keys (self, elements, targeted_keys_list_type='all'):
    #            return render(request, self.template_name, {'app_type': "validation_app"})

    #     if targeted_keys_list_type == "standard" :
    #         targeted_keys = [
    #                         'id', 
    #                         'version',
    #                         'description', 
    #                         'parameters',
    #                         'code_format',
    #                         'source',
    #                         'model_id', 
    #                          ]


    #         for element in elements :
    #             self.assertEqual(set(element.keys()), set(targeted_keys))

     

    def test_get_no_param (self):
        response = client_authorized.get('/parametersconfiguration-validation-app/', data={})
        
        self.assertEqual(response['location'], "/login/hbp/?next=/parametersconfiguration-validation-app/")
