from django.forms import ModelForm
from .models import ValidationTestDefinition, ScientificModel


class ValidationTestDefinitionForm(ModelForm):

    class Meta:
        model = ValidationTestDefinition
        fields = "__all__"


class ScientificModelForm(ModelForm):

    class Meta:
        model = ScientificModel
        fields = "__all__"
