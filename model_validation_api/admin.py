from django.contrib import admin
from .models import (ValidationTestDefinition, ValidationTestCode, ValidationTestResult,
                     ScientificModel, ScientificModelInstance, ScientificModelImage,
                     CollabParameters,
                     Param_DataModalities, Param_TestType, Param_Species,
                     Param_BrainRegion, Param_CellType, Param_ModelScope, Param_AbstractionLevel, Param_ScoreType,Param_organizations,
                     Tickets, Comments)

admin.site.site_header = "HBP Validation Service administration"

@admin.register(ValidationTestDefinition)
class ValidationTestDefinitionAdmin(admin.ModelAdmin):
    list_display = ('id','name','alias', 'species', 'brain_region', 'cell_type',
                    'data_type', 'data_modality', 'test_type',
                    'publication', 'author', 'score_type', 'age', 'data_location', 'protocol', 'creation_date')
    list_filter = ('brain_region', 'cell_type', 'test_type', 'score_type', 'species', 'data_modality',)
    search_fields = ('id','name','alias', 'species', 'brain_region', 'cell_type',
                    'data_type', 'data_modality', 'test_type',
                    'publication', 'author', 'score_type', 'age', 'data_location', 'protocol', 'creation_date')


@admin.register(ValidationTestCode)
class ValidationTestCodeAdmin(admin.ModelAdmin):
    list_display = ('id', 'repository', 'version', 'description', 'parameters', 'path', 'timestamp', 'test_definition')
    # list_filter = ()
    search_fields = ('id', 'repository', 'version', 'description', 'parameters', 'path', 'timestamp', 'test_definition')


@admin.register(ValidationTestResult)
class ValidationTestResultAdmin(admin.ModelAdmin):
    list_display = ('id','model_version', 'test_code',
                    'score', 'passed', 'timestamp', 
                    'normalized_score', 'platform', 'project')
    search_fields = ('id','model_version', 'test_code',
                    'score', 'passed', 'timestamp', 
                    'normalized_score', 'platform', 'project')

@admin.register(ScientificModel)
class ScientificModelAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'alias', 'author', 'owner', 'description', 'species', 'brain_region', 'cell_type',  'model_scope','abstraction_level', 'private', 'app', 'code_format',  'creation_date', 'organization',  'project', 'license')
    search_fields = ('id','name', 'alias', 'author', 'owner', 'description', 'species', 'brain_region', 'cell_type', 'model_scope','abstraction_level', 'private', 'app', 'code_format',  'creation_date', 'organization',  'project', 'license')
    list_filter = ('species', 'brain_region', 'cell_type',  'model_scope','abstraction_level', 'private', 'code_format', 'organization')

@admin.register(ScientificModelInstance)
class ScientificModelInstanceAdmin(admin.ModelAdmin):
    list_display = ('id','version', 'model', 'description', 'parameters', 'code_format', 'source',  'timestamp', 'hash')
    search_fields = ('id','version', 'model', 'description', 'parameters', 'code_format', 'source',  'timestamp', 'hash')

@admin.register(ScientificModelImage)
class ScientificModelImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'model', 'url', 'caption')
    search_fields = ('id', 'model', 'url', 'caption')

@admin.register(CollabParameters)
class CollabParametersAdmin(admin.ModelAdmin):
    list_display = ('id', 'app_type', 'data_modalities', 'test_type', 'species', 'brain_region', 'cell_type', 'model_scope','abstraction_level', 'organization', 'collab_id')
    search_fields = ('id', 'app_type', 'data_modalities', 'test_type', 'species', 'brain_region', 'cell_type', 'model_scope','abstraction_level', 'organization', 'collab_id')

@admin.register(Param_DataModalities)
class Param_DataModalitiesAdmin(admin.ModelAdmin):
    list_display = ('id', 'authorized_value')
    search_fields = ('id', 'authorized_value')

@admin.register(Param_TestType)
class Param_TestTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'authorized_value')
    search_fields = ('id', 'authorized_value')

@admin.register(Param_Species)
class Param_SpeciesAdmin(admin.ModelAdmin):
    list_display = ('id', 'authorized_value')
    search_fields = ('id', 'authorized_value')

@admin.register(Param_BrainRegion)
class Param_BrainRegionAdmin(admin.ModelAdmin):
    list_display = ('id', 'authorized_value')
    search_fields = ('id', 'authorized_value')

@admin.register(Param_CellType)
class Param_CellTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'authorized_value')
    search_fields = ('id', 'authorized_value')    

@admin.register(Param_ModelScope)
class Param_ModelScopeAdmin(admin.ModelAdmin):
    list_display = ('id', 'authorized_value')
    search_fields = ('id', 'authorized_value')    

@admin.register(Param_AbstractionLevel)
class Param_AbstractionLevelAdmin(admin.ModelAdmin):
    list_display = ('id', 'authorized_value')
    search_fields = ('id', 'authorized_value')    

@admin.register(Param_ScoreType)
class Param_ScoreTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'authorized_value')
    search_fields = ('id', 'authorized_value')    

@admin.register(Param_organizations)
class Param_organizationsAdmin(admin.ModelAdmin):
    list_display = ('id', 'authorized_value')
    search_fields = ('id', 'authorized_value')    

@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'Ticket', 'author', 'text', 'creation_date')
    search_fields = ('id', 'Ticket', 'author', 'text', 'creation_date')    

@admin.register(Tickets)
class TicketsAdmin(admin.ModelAdmin):
    list_display = ('id', 'test', 'author', 'title', 'text', 'creation_date')
    search_fields = ('id', 'test', 'author', 'title', 'text', 'creation_date')