from django.forms import ModelForm
from django import forms
from .models import ValidationTestDefinition, ValidationTestCode, ScientificModel, ValidationTestResult, ScientificModelInstance, Comment, ScientificModelImage


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
        widgets = {
            'access_control': forms.HiddenInput(),
        }
class ScientificModelInstanceForm(ModelForm):

    class Meta:
        model = ScientificModelInstance
        fields = "__all__"
        widgets = {
            '': forms.HiddenInput(),
        }
       
class ScientificModelImageForm(ModelForm):

    class Meta:
        model = ScientificModelImage
        fields = "__all__"
        widgets = {
            'model': forms.HiddenInput(),
        }
class CommentForm(ModelForm):
    
    class Meta:
        model = Comment
        fields = ['text',]

