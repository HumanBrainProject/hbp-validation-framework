from django.conf.urls import url
from .views import (
                    ModelCatalogView,
                    HomeValidationView,

                    ParametersConfigurationRest,
                    AuthorizedCollabParameterRest,
                    ScientificModelRest,
                    ScientificModelAliasRest,
                    ValidationTestDefinitionRest,
                    ValidationTestAliasRest,
                    ScientificModelInstanceRest,
                    ScientificModelImageRest,
                    ValidationTestCodeRest,
                    TestCommentRest,
                    CollabIDRest,
                    AppIDRest,
                    AreVersionsEditableRest,
                    # NotificationRest,
                    ParametersConfigurationModelView,
                    ParametersConfigurationValidationView,
                    TestTicketRest,
                    IsCollabMemberRest,
                    ValidationResultRest,
                    ValidationResultRest2,

                    )

# from django.contrib.auth.decorators import login_required

from django.views.decorators.csrf import csrf_exempt

from django.conf.urls import include


uuid_pattern = "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}"
# simplified from http://stackoverflow.com/questions/11384589/what-is-the-correct-regex-for-matching-values-generated-by-uuid-uuid4-hex
# will accept some patterns that are not strictly UUID v4

urlpatterns = (
    #general
    url(r'^collabidrest/$',
        CollabIDRest.as_view(), 
        ),
    url(r'^appidrest/$',
         AppIDRest.as_view(),
        ),
    # url(r'^notificationrest/$',
    #     NotificationRest.as_view(),
    #     ), 
    url(r'^authorizedcollabparameterrest/$',
        AuthorizedCollabParameterRest.as_view(), 
        ),
    url(r'^iscollabmemberrest/$',
        IsCollabMemberRest.as_view(),
        ),    

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
    
    url(r'^validationresultrest/$',
        ValidationResultRest.as_view(),
        ),
    #   url(r'^validationtestresultrest/$',
    #     ValidationTestResultRest.as_view(),
    #     ), 
    # url(r'^validationmodelresultrest/$',
    #     ValidationModelResultRest.as_view(),
    #     ), 
    url(r'^validationmodelresultrest2/$',
        ValidationResultRest2.as_view(),
        ),

    url(r'^testcomment/$',
        TestCommentRest.as_view(),
        name="test-comment"),
    url(r'^testticket/$',
        TestTicketRest.as_view(),
        name="test-ticket"),
    url(r'^validationtestalias/$',
        ValidationTestAliasRest.as_view(),
        name="scientific-test-alias"),
    url(r'areversionseditable/$',
        AreVersionsEditableRest.as_view(),
        name='are-versions-editable'),
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
    url(r'^scientificmodelalias/$',
        ScientificModelAliasRest.as_view(),
        name="scientific-model-alias"),  
    # url(r'^modelfollowrest/$',
    #     ModelFollowRest.as_view(),
    #     name="model-follow"),
######## ParameterConfiguration ##########
   
    url(r'^parametersconfigurationrest/$',
        ParametersConfigurationRest.as_view(),
        ),
    
        ## model_catalog configuration
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
    url(r'^parametersconfiguration-model-catalog/appidrest/$',
         AppIDRest.as_view(),
        ),        

        ## model_catalog configuration
    url(r'^parametersconfiguration-validation-app/$',
        ParametersConfigurationValidationView.as_view(), 
        ),  
    url(r'^parametersconfiguration-validation-app/parametersconfigurationrest/$',
        ParametersConfigurationRest.as_view(),
        ),
    url(r'^parametersconfiguration-validation-app/authorizedcollabparameterrest/$',
        AuthorizedCollabParameterRest.as_view(),
    ),
    url(r'^parametersconfiguration-validation-app/iscollabmemberrest/$',
        IsCollabMemberRest.as_view(),
        ),   
    url(r'^parametersconfiguration-validation-app/collabidrest/$',
         CollabIDRest.as_view(),
        ),    
    url(r'^parametersconfiguration-validation-app/appidrest/$',
         AppIDRest.as_view(),
        ),        

)



