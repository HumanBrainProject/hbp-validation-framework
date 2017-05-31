from django.test import TestCase

#models
# from myapp.models import Animal
from model_validation_api.models import ValidationTestDefinition



def create_test():
    return ValidationTestDefinition.objects.create(name= "name_test", 
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



# def create_test():
#     import time
#     import datetime

#     ts = time.time()
#     st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

#     return ValidationTestCode.objects.create(repository= "",
#                                                 version= "",
#                                                 path= "",
#                                                 timestamp= st,
#                                                 test_definition=,
#                                                 )

#     repository = models.CharField(max_length=200, help_text="location of the code that defines the test")
#     version = models.CharField(max_length=128, help_text="version of the code that defines the test")
#     path = models.CharField(max_length=200, help_text="path to test class within Python code")
#     timestamp = models.DateTimeField(auto_now_add=True, help_text="timestamp for this version of the code")
#     test_definition = models.ForeignKey(ValidationTestDefinition, help_text="Validation test implemented by this code",
#                                         related_name="code")


# def create_test():
#     return ScientificModel.objects.create(
#                                                 )
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=200, help_text="short descriptive name")
#     description = models.TextField()
#     species = models.CharField(max_length=100, choices=SPECIES_CHOICES ,blank=True, help_text="species")
#     brain_region = models.CharField(max_length=100, choices=BRAIN_REGION_CHOICES, blank=True, help_text="brain region, if applicable")
#     cell_type = models.CharField(max_length=100,choices=CELL_TYPE_CHOICES, blank=True, help_text="cell type, for single-cell models")
#     author = models.TextField(help_text="Author(s) of this model")  # do we need a separate "owner" field?
#     source = models.URLField(help_text="Version control repository containing the source code of the model")

# def create_test():
#     return ValidationTestResult.objects.create(
#                                                 )
#     model_instance = models.ForeignKey(ScientificModelInstance)
#     test_definition = models.ForeignKey(ValidationTestCode)
#     results_storage = models.TextField(help_text="Location of data files produced by the test run")  # or store locations of individual files?
#     result = models.FloatField(help_text="A numerical measure of the difference between model and experiment")  # name this 'score'? like sciunit
#     # should result be a Quantity?
#     passed = models.NullBooleanField(help_text="Whether the test passed or failed")
#     timestamp = models.DateTimeField(auto_now_add=True, help_text="Timestamp of when the simulation was run")
#     platform = models.TextField(help_text="Computer system on which the simulation was run")
#     project = models.CharField(help_text="Project with which this test run is associated(optional)",
#                                max_length=200,
#                                blank=True)  # project==collab_id for HBP


# class SimpleTest(TestCase):
#     T = create_test()

