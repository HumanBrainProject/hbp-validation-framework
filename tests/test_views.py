
#models
from django.contrib.auth.models import User

from model_validation_api.models import ValidationTestDefinition
from model_validation_api.models import ScientificModel
from model_validation_api.models import configview


from django.test import TestCase, RequestFactory


#views
# from model_validation_api.views import ValidationTestDefinitionResource
from model_validation_api.views import ValidationTestDefinitionListResource
from model_validation_api.views import ValidationTestDefinitionCreate
from model_validation_api.views import SimpleModelCreateView
from model_validation_api.views import configviewCreateView


#test_functions :
from test_models import create_test



class tests(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='jacob', email='jacob@...', password='top_secret')

        self.test1 = ValidationTestDefinition.objects.create(name= "name_test", 
                                               species="species_test",
                                               brain_region="region_test",
                                               cell_type="Test cell",
                                               age="age_test",
                                               data_location="location_test",
                                               data_type="",
                                               data_modality="",
                                               test_type="",
                                               protocol="",
                                               author="",
                                               publication="",
                                                )

    def test_get_tests(self):
        # Create an instance of a GET request.
        request = self.factory.get('view/tests/')
        request.user = self.user
        response = ValidationTestDefinitionListResource.as_view()(request)

        self.assertEqual(response.status_code, 200)
        
       

    def test_create_new_test(self):

        # Create an instance of a POST request.
        request = self.factory.post("/view/tests/create/", {  "name": "name_test", 
                                               "species":"species_test",
                                               "brain_region":"region_test",
                                               "cell_type":"Test cell",
                                               "age":"age_test",
                                               "data_location":"location_test",
                                               "data_type":"...",
                                               "data_modality":"histology",
                                               "test_type":"behaviour",
                                               "protocol":"...",
                                               "author":"...",
                                               "publication":"..."})

        request.user = self.user
        response = ValidationTestDefinitionCreate.as_view()(request)

        self.assertEqual(response.status_code, 302)



class results(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='jacob', email='jacob@...', password='top_secret')


class models(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='jacob', email='jacob@...', password='top_secret')

        self.model1 = ScientificModel.objects.create(name= "", 
                                                    description="",
                                                    brain_region="Other",
                                                    cell_type="Other",
                                                    species="Other",                   
                                                    author="",
                                                    source="",
                                                    id='786d1b69-a603-4eb8-9178-fed2a195a1ed',
                                                )


    def test_get_models(self):
        # Create an instance of a GET request.
        request = self.factory.get('view/models/')
        request.user = self.user
        response = ValidationTestDefinitionListResource.as_view()(request)

        self.assertEqual(response.status_code, 200)


    def test_create_new_model(self):
        # Create an instance of a POST request.
        request = self.factory.post("/view/models/create", {"name": "..", 
                                                            "description":"...",
                                                            "brain_region":"other",
                                                            "cell_type":"other",
                                                            "species":"other",                   
                                                            "author":"...",
                                                            "source":"http://here.com",})
                                                            #"id":'786d1b69-a603-4eb8-9178-fed2a195a1ed',})
        request.user = self.user
        # print (request.__dict__)
        # print (request.user)
        response = SimpleModelCreateView.as_view()(request)

        self.assertEqual(response.status_code, 302)




#class models_configview(TestCase):
class configview(TestCase):   
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            username='jacob', email='jacob@...', password='top_secret')

        self.model1bis = configview.objects.create(species:"Other",
                                                   brain_region:"Other",
                                                   cell_type:"Other",
                                                   model_type:"Other",
                                                  )

    def test_create_new_model(self):
        # Create an instance of a POST request.
        request = self.factory.post("/view/models/create", {"species":"other",
                                                            "brain_region":"other",
                                                            "cell_type":"other",
                                                            "model_type":"other",
                                                            })
        request.user = self.user
        response = configviewCreateView.as_view()(request)

        self.assertEqual(response.status_code, 302)





# id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=200, help_text="short descriptive name")
#     description = models.TextField()
#     species = models.CharField(max_length=100, choices=SPECIES_CHOICES ,blank=True, help_text="species")
#     brain_region = models.CharField(max_length=100, choices=BRAIN_REGION_CHOICES, blank=True, help_text="brain region, if applicable")
#     cell_type = models.CharField(max_length=100,choices=CELL_TYPE_CHOICES, blank=True, help_text="cell type, for single-cell models")
#     author = models.TextField(help_text="Author(s) of this model")  # do we need a separate "owner" field?
#     source = models.URLField(help_text="Version control repository containing the source code of the model")




# class SearchFormTestCase(TestCase):
#     def test_empty_get(self):
#         response = self.client.get('/en/dev/search/', HTTP_HOST='docs.djangoproject.dev:8000')
#         self.assertEqual(response.status_code, 200)



# class Snipet_test_code(TestCase):
#     def setUp(self):
#         # Every test needs access to the request factory.
#         self.factory = RequestFactory()
#         self.user = User.objects.create_user(
            # username='jacob', email='jacob@...', password='top_secret')

#     def test_details(self):
#         # Create an instance of a GET request.
#         request = self.factory.get('/customer/details')

#         # Recall that middleware are not supported. You can simulate a
#         # logged-in user by setting request.user manually.
#         request.user = self.user

#         # Or you can simulate an anonymous user by setting request.user to
#         # an AnonymousUser instance.
#         request.user = AnonymousUser()

#         # Test my_view() as if it were deployed at /customer/details
#         response = my_view(request)
#         # Use this syntax for class-based views.
#         response = MyView.as_view()(request)
#         self.assertEqual(response.status_code, 200)