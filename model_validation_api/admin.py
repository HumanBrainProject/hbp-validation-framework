from django.contrib import admin
from .models import (ValidationTestDefinition, ValidationTestCode, ValidationTestResult,
                     ScientificModel, ScientificModelInstance, ScientificModelImage,
                     CollabParameters,
                     Param_DataModalities, Param_TestType, Param_Species,
                     Param_BrainRegion, Param_CellType, Param_ModelType)

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
    list_display = ('model_version', 'test_code',
                    'result', 'passed', 'timestamp',
                    'platform')
    search_fields = ('model_version', 'test_code')


admin.site.register(ScientificModel)
admin.site.register(ScientificModelInstance)
admin.site.register(ScientificModelImage)
admin.site.register(CollabParameters)
admin.site.register(Param_DataModalities)
admin.site.register(Param_TestType)
admin.site.register(Param_Species)
admin.site.register(Param_BrainRegion)
admin.site.register(Param_CellType)
admin.site.register(Param_ModelType)
