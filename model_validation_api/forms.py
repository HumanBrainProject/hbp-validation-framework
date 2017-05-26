from django.forms import ModelForm
from .models import ValidationTestDefinition, ScientificModel, ValidationTestResult


class ValidationTestDefinitionForm(ModelForm):

    class Meta:
        model = ValidationTestDefinition
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
