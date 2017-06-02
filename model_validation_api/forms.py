from django.forms import ModelForm
from django import forms
from .models import ValidationTestDefinition, ValidationTestCode, ScientificModel, ValidationTestResult, ScientificModelInstance


class ValidationTestDefinitionForm(ModelForm):

    class Meta:
        model = ValidationTestDefinition
        fields = "__all__"   

class ValidationTestCodeForm(ModelForm):

    class Meta:
        model = ValidationTestCode
        fields = "__all__"   

class ValidationTestResultForm(ModelForm):

    class Meta:
        model = ValidationTestResult
        fields = "__all__"

class ScientificTestForm(ModelForm):

    class Meta:
        model = ValidationTestResult
        fields = "__all__"

class ScientificModelForm(ModelForm):

    class Meta:
        model = ScientificModel
        fields = "__all__"

class ScientificModelInstanceForm(ModelForm):

    class Meta:
        model = ScientificModelInstance
        fields = "__all__"
