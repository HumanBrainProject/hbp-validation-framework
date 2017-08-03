from django.conf.urls import url
from .views import (
                    ModelCatalogView,
                    HomeValidationView,
                    ParametersConfigurationView,

                    ParametersConfigurationRest,
                    AuthorizedCollabParameterRest,
                    ScientificModelRest,
                    ValidationTestDefinitionRest,
                    ScientificModelInstanceRest,
                    ScientificModelImageRest,
                    ValidationTestCodeRest,
                    TestCommentRest,
                    CollabIDRest,

                    ParametersConfigurationModelView,
                    ParametersConfigurationValidationView,

                    IsCollabMemberRest,
                    ValidationResultRest,
                    ValidationResultRest_fortest

                    )

# from django.contrib.auth.decorators import login_required

from django.views.decorators.csrf import csrf_exempt

from django.conf.urls import include


uuid_pattern = "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}"
# simplified from http://stackoverflow.com/questions/11384589/what-is-the-correct-regex-for-matching-values-generated-by-uuid-uuid4-hex
# will accept some patterns that are not strictly UUID v4

urlpatterns = (
    

    #validation app url
    url(r'^app/$',
        HomeValidationView.as_view(),
        name="home-validation-view"),

    url(r'^validationtestdef/$',
        ValidationTestDefinitionRest.as_view(),
        name="validation-test-definition"),

    url(r'^validationtestscode/$',
        ValidationTestCodeRest.as_view(),
        name="validation-test-code"),

    url(r'^testcomment/$',
        TestCommentRest.as_view(),
        name="test-comment"),

    url(r'^parametersconfigurationrest/$',
        ParametersConfigurationRest.as_view(),
        ),

    url(r'^collabidrest/$',
        CollabIDRest.as_view(), 
        ),
        
    url(r'^authorizedcollabparameterrest/$',
        AuthorizedCollabParameterRest.as_view(), 
        ),
    url(r'^iscollabmemberrest/$',
        IsCollabMemberRest.as_view(),
        ),

    url(r'^validationresultrest_fortest/$',
        ValidationResultRest_fortest.as_view(),
        ), 

    url(r'^validationresultrest/$',
        ValidationResultRest.as_view(),
        ), 


######## model catalog url ##########
    url(r'^model-catalog/$',
        ModelCatalogView.as_view(),
        name="model-catalog-view"),

    url(r'^scientificmodel/$',
        ScientificModelRest.as_view(),
        name="scientific-model"),

    url(r'^scientificmodelinstance/$',
        ScientificModelInstanceRest.as_view(),
        name="scientific-model-instance"),
    url(r'^scientificmodelimage/$',
        ScientificModelImageRest.as_view(),
        name="scientific-model-image"),
    



######## ParameterConfiguration ##########
    # url(r'^parametersconfiguration/$',
    #     ParametersConfigurationView.as_view(),
    #     name="parameters-configuration"), 

    # url(r'^parametersconfiguration/parametersconfigurationrest/$',
    #     ParametersConfigurationRest.as_view(),
    #     ),   

    # url(r'^parametersconfiguration/authorizedcollabparameterrest/$',
    #     AuthorizedCollabParameterRest.as_view(),
    #     ),   

    url(r'^parametersconfiguration-model-catalog/$',
        ParametersConfigurationModelView.as_view(), 
        ),  
    url(r'^parametersconfiguration-model-catalog/parametersconfigurationrest/$',
        ParametersConfigurationRest.as_view(),
        ),

    url(r'^parametersconfiguration-model-catalog/authorizedcollabparameterrest/$',
        AuthorizedCollabParameterRest.as_view(),

        ),
    url(r'^parametersconfiguration-model-catalog/iscollabmemberrest/$',
        IsCollabMemberRest.as_view(),
        ), 
    url(r'^parametersconfiguration-model-catalog/collabidrest/$',
         CollabIDRest.as_view(),
        ),      

    url(r'^parametersconfigurationrest/$',
        ParametersConfigurationRest.as_view(),
        ),
    
    url(r'^parametersconfiguration-validation-app/$',
        ParametersConfigurationValidationView.as_view(), 
        ),  
    url(r'^parametersconfiguration-validation-app/parametersconfigurationrest/$',
        ParametersConfigurationRest.as_view(),
        ),
    url(r'^parametersconfiguration-validation-app/collabidrest/$',
         CollabIDRest.as_view(),
        ),      
    url(r'^parametersconfiguration-validation-app/authorizedcollabparameterrest/$',
        AuthorizedCollabParameterRest.as_view(),
    ),

    url(r'^parametersconfiguration-validation-app/iscollabmemberrest/$',
        IsCollabMemberRest.as_view(),
        ),   

)



