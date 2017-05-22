from django.contrib import admin
from .models import (ValidationTestDefinition, ValidationTestCode, ValidationTestResult,
                     ScientificModel, ScientificModelInstance)

admin.site.site_header = "HBP Validation Service administration"

@admin.register(ValidationTestDefinition)
class ValidationTestDefinitionAdmin(admin.ModelAdmin):
    list_display = ('name', 'brain_region', 'cell_type',
                    'data_type', 'data_modality', 'test_type',
                    'publication', 'author')
    list_filter = ('brain_region', 'cell_type', 'test_type')
    search_fields = ('name', 'protocol')


@admin.register(ValidationTestCode)
class ValidationTestCodeAdmin(admin.ModelAdmin):
   pass


@admin.register(ValidationTestResult)
class ValidationTestResultAdmin(admin.ModelAdmin):
    list_display = ('model_instance', 'test_definition',
                    'result', 'passed', 'timestamp',
                    'platform')
    search_fields = ('model_instance', 'test_definition')


admin.site.register(ScientificModel)
admin.site.register(ScientificModelInstance)
