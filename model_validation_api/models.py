"""
Django models for the Model Validation API

"""

import json
import uuid
from django.db import models
from django.utils.encoding import python_2_unicode_compatible

@python_2_unicode_compatible 
class CollabParameters(models.Model):
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, ) 
    id = models.CharField(primary_key=True, max_length=100 , default="")
    app_type = models.CharField(max_length=100 ,blank=True, help_text="type of application: model_catalog or validation_app")
    data_modalities = models.CharField(max_length=500 ,blank=True, help_text="data modalities")
    test_type = models.CharField(max_length=500, blank=True, help_text="test type")
    species = models.CharField(max_length=500,blank=True, help_text="species")
    brain_region = models.CharField(max_length=500, blank=True, help_text="brain region, if applicable")
    cell_type = models.CharField(max_length=500, blank=True, help_text="cell type, for single-cell models")
    model_type = models.CharField(max_length=500, blank=True, help_text="model_type...will be deleted after (split into model scope and abstraction level)")
    abstraction_level = models.CharField(max_length=500, blank=True, help_text="abstraction level: single cell, network or mean field region")
    model_scope = models.CharField(max_length=500, blank=True, help_text="model scope: subcellular model, single cell, network...")
    organization = models.CharField(max_length=500, blank=True, help_text="organization: HBP-SP1, HBP-SP2... ")
    collab_id = models.IntegerField( help_text="ID of the collab")
    # app_id = models.IntegerField( help_text="ID of the app")
    def __str__(self):
            return "Collab Parameters {}".format(self.id)

@python_2_unicode_compatible
class ValidationTestDefinition(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    name = models.CharField(max_length=200, help_text="short descriptive name")
    species = models.CharField(max_length=100,default='', blank=True, help_text="species") # G
    brain_region = models.CharField(max_length=100,default='',blank=True, help_text="brain region")  # I
    cell_type = models.CharField(max_length=100, default='', blank=True,help_text="cell type")  # D
    age = models.CharField(max_length=50, null=True, blank=True, help_text="age of animal, e.g. '6 weeks'")
    data_location = models.CharField(null=True, blank=True, max_length=200, help_text="location of comparison data")  # M
    data_type = models.CharField(max_length=100, help_text="type of comparison data (number, histogram, time series, etc.)")  # S
    data_modality = models.CharField(max_length=100, default='', blank=True,
                                     help_text="recording modality for comparison data (ephys, fMRI, 2-photon, etc)")  # J, K
    test_type = models.CharField(max_length=100, 
                                 help_text="single cell activity, network structure, network activity, subcellular")  # B, C
    protocol = models.TextField(blank=True, help_text="Description of the experimental protocol")  # R (sort of)
    author = models.CharField(max_length=100, help_text="Author of this test")  # H
    publication = models.CharField(max_length=1000, null=True, blank=True, help_text="Publication in which the validation data set was reported")  # E
    score_type = models.CharField(help_text="Type of score: p-value, r square ..", max_length=20)
    alias = models.CharField(max_length=200, unique=True, null=True, blank=True, default=None, help_text="alias of the test") 
    creation_date = models.DateTimeField(auto_now_add=True, help_text="creation date of the test")
    
    # missing fields wrt Lungsi's spreadsheet
    # L - file format  - infer from file suffix?
    # N - registered with NIP?
    # O - language of test code
    # Q - test code version

    def __str__(self):
        return "Test {}: {}".format(self.id, self.name)

    def get_latest_code(self):
        """
        Return the most recent code for this test
        """
        return self.code.latest()
    def clean_something_unique_or_null(self):
        if self.cleaned_data['alias'] == "":
            return None
        else:
            return self.cleaned_data['alias']

@python_2_unicode_compatible
class ValidationTestCode(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    repository = models.CharField(max_length=200, help_text="location of the code that defines the test")
    version = models.CharField(max_length=128, help_text="version of the code that defines the test")
    description = models.TextField(null=True, blank=True)
    parameters = models.TextField(null=True, blank=True)
    path = models.CharField(max_length=500, help_text="path to test class within Python code")
    timestamp = models.DateTimeField(auto_now_add=True, help_text="timestamp for this version of the code")
    test_definition = models.ForeignKey(ValidationTestDefinition, help_text="Validation test implemented by this code",
                                        related_name="codes")



    class Meta:
        verbose_name_plural = "validation test code"
        get_latest_by = "timestamp"

    def __str__(self):
        return "Code for test {}: {}@{}:{}".format(self.test_definition.pk,
                                                   self.repository,
                                                   self.version,
                                                   self.path)
# separate classes for Dataset, Code, ValidationTestDefinition?


@python_2_unicode_compatible
class ScientificModel(models.Model):
    """
    A model of a subcellular mechanism, cell, neuronal network, or other neural structure.

    The model may change over time or have different parameterisations.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    name = models.CharField(max_length=200, help_text="short descriptive name")
    description = models.TextField()
    species = models.CharField(max_length=100 ,blank=True, help_text="species")
    brain_region = models.CharField(max_length=100, blank=True, help_text="brain region, if applicable")
    cell_type = models.CharField(max_length=100, blank=True, help_text="cell type, for single-cell models")
    author = models.TextField(help_text="Author(s) of this model")  # do we need a separate "owner" field?
    model_type = models.CharField(max_length=100, blank=True, help_text="model_type...will be deleted after (split into model scope and abstraction level)")
    model_scope = models.CharField(max_length=100, blank=True, help_text="model scope: subcellular model, single cell, network...")
    abstraction_level = models.CharField(max_length=100, blank=True, help_text="model type: protein sturcture, system biology, spiking neurons...")
    private = models.BooleanField ( default= False ,help_text="privacy of the model: can be private (if true) or public (if false)")
    app = models.ForeignKey(CollabParameters, related_name="collab_params")
    code_format = models.CharField(max_length=100 ,blank=True, help_text=".py, .c, etc...") ###to remove
    alias = models.CharField(max_length=200, unique=True, blank=True, null=True, default=None,  help_text="alias of the model")
    creation_date = models.DateTimeField(auto_now_add=True, help_text="creation date of the model")
    organization = models.CharField(max_length=100 , blank=False, default="<<empty>>")
    owner = models.TextField(max_length=100, blank=True, null = True)
    project = models.TextField(max_length=100, blank=True, null = True) ##will be removed in KG
    license = models.TextField(max_length=200, blank=True, null = True)
    # todo: 
    # spiking vs rate?

    def __str__(self):
        return "Model: {} ({})".format(self.name, self.id)

    def clean_something_unique_or_null(self):
        if self.cleaned_data['alias'] == "":
            return None
        else:
            return self.cleaned_data['alias']

@python_2_unicode_compatible
class ScientificModelInstance(models.Model):
    """
    A specific instance of a model with a well defined version and parameterization.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    model = models.ForeignKey(ScientificModel, related_name="instances", on_delete=models.CASCADE)
    version = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    parameters = models.TextField(null=True, blank=True)
    source = models.TextField(max_length=500, blank=True, help_text="Version control repository containing the source code of the model")
    timestamp = models.DateTimeField(auto_now_add=True, help_text="Timestamp of when the version was created")
    code_format = models.CharField(max_length=100 , blank=True, null=True, default=None, help_text = "format of the code (PyNN, Brian, Neuron...)")
    hash = models.CharField(max_length=100 , blank=True, null=True, default=None, help_text = "")
    def __str__(self):
        return "Model: {} @ version {}".format(self.model.name, self.version)

@python_2_unicode_compatible
class ScientificModelImage(models.Model):
    """
    A specific instance of a model with a well defined version and parameterization.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    model = models.ForeignKey(ScientificModel, related_name="images", on_delete=models.CASCADE)
    url =  models.URLField(max_length=500, blank=False, help_text="Version control repository containing the source code of the model")
    caption = models.TextField(null=True, blank=True)

    def __str__(self):
        return "Model: {} (image {})".format(self.model.name, self.id)


@python_2_unicode_compatible
class ValidationTestResult(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    model_version = models.ForeignKey(ScientificModelInstance)
    test_code = models.ForeignKey(ValidationTestCode)
    results_storage = models.TextField(blank=True, help_text="Location of data files produced by the test run")  # or store locations of individual files?
    score = models.FloatField(help_text="A numerical measure of the difference between model and experiment")  # name this 'score'? like sciunit
    # should result be a Quantity?
    passed = models.NullBooleanField(help_text="Whether the test passed or failed")
    timestamp = models.DateTimeField(auto_now_add=True, help_text="Timestamp of when the simulation was run")
    platform = models.TextField(help_text="Computer system on which the simulation was run")
    project = models.CharField(help_text="Project with which this test run is associated(optional)",
                               max_length=200,
                               blank=True)  # project==collab_id for HBP ??rename o collab_id?
    normalized_score = models.FloatField(help_text="A normalized numerical measure of the difference between model and experiment") 

    class Meta:
        get_latest_by = "timestamp"

    def get_platform_as_dict(self):
        return json.loads(self.platform)

    def __str__(self):
        return "Validation test result {}".format(self.id,)


class Tickets(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    test = models.ForeignKey(ValidationTestDefinition, on_delete=models.CASCADE)
    author = models.CharField(max_length=200, default="")
    title = models.CharField(max_length=200, default="")
    text = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)

class Comments(models.Model): 
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    Ticket = models.ForeignKey(Tickets, on_delete=models.CASCADE, default=None)
    author = models.CharField(max_length=200, default="")
    text = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)

# class FollowModel(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
#     model = models.ForeignKey(ScientificModel)
#     user_id = models.IntegerField(help_text="user id of the follower")

# class FollowTest(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
#     test = models.ForeignKey(ValidationTestDefinition)
#     user_id = models.IntegerField(help_text="user id of the follower")

class  Param_organizations (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    authorized_value = models.CharField(max_length=200, unique=True, default="")

class Param_DataModalities (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    authorized_value = models.CharField(max_length=200, unique=True, default="")

class Param_TestType (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    authorized_value = models.CharField(max_length=200, unique=True, default="")

class Param_Species (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    authorized_value = models.CharField(max_length=200, unique=True, default="")

class Param_BrainRegion (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    authorized_value = models.CharField(max_length=200, unique=True, default="")

class Param_CellType (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    authorized_value = models.CharField(max_length=200, unique=True, default="")

class Param_ModelType (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    authorized_value = models.CharField(max_length=200, unique=True, default="")

class Param_ModelScope (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    authorized_value = models.CharField(max_length=200, unique=True, default="")

class Param_AbstractionLevel (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    authorized_value = models.CharField(max_length=200, unique=True, default="")

class Param_ScoreType (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, )
    authorized_value = models.CharField(max_length=200, unique=True, default="")




