from django.conf.urls import url
from .views import (
                    ModelCatalogView,
                    HomeValidationView,

                    ParametersConfigurationRest,
                    AuthorizedCollabParameterRest,
                    Models,
                    ModelAliases,
                    Tests,
                    TestAliases,
                    ModelInstances,
                    Images,
                    TestInstances,
                    TestCommentRest,
                    CollabIDRest,
                    AppIDRest,
                    AreVersionsEditableRest,
                    # NotificationRest,
                    ParametersConfigurationModelView,
                    ParametersConfigurationValidationView,
                    TestTicketRest,
                    IsCollabMemberOrAdminRest,
                    IsCollabMemberRest,
                    Results,
                    CollabAppID,
                    IsSuperUserRest,

                    Models_KG
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
     url(r'^issuperuser/$',
         IsSuperUserRest.as_view(),
        ),

    # url(r'^notificationrest/$',
    #     NotificationRest.as_view(),
    #     ),
    url(r'^authorizedcollabparameterrest/$',
        AuthorizedCollabParameterRest.as_view(),
        ),
    url(r'^IsCollabMemberRest/$',
        IsCollabMemberRest.as_view(),
        ),
    url(r'^IsCollabMemberOrAdminRest/$',
        IsCollabMemberOrAdminRest.as_view(),
        ),

    #validation app url
    url(r'^app/$',
        HomeValidationView.as_view(),
        name="home-validation-view"),

    url(r'^collabappid/$',
        CollabAppID.as_view(),
        ),


    url(r'^tests/$',
        Tests.as_view(),
        name="validation-test-definition"),
    url(r'^test-instances/$',
        TestInstances.as_view(),
        name="validation-test-code"),


    url(r'^results/$',
        Results.as_view(),
        ),

    url(r'^testcomment/$',
        TestCommentRest.as_view(),
        name="test-comment"),
    url(r'^testticket/$',
        TestTicketRest.as_view(),
        name="test-ticket"),
    url(r'^test-aliases/$',
        TestAliases.as_view(),
        name="scientific-test-alias"),
    url(r'areversionseditable/$',
        AreVersionsEditableRest.as_view(),
        name='are-versions-editable'),
######## model catalog url ##########
    url(r'^model-catalog/$',
        ModelCatalogView.as_view(),
        name="model-catalog-view"),
    url(r'^models/$',
        Models.as_view(),
        name="scientific-model"),
    url(r'^models-kg/$',
        Models_KG.as_view(),
        name="scientific-model-kg"),
    url(r'^model-instances/$',
        ModelInstances.as_view(),
        name="scientific-model-instance"),
    url(r'^images/$',
        Images.as_view(),
        name="scientific-model-image"),
    url(r'^model-aliases/$',
        ModelAliases.as_view(),
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
    url(r'^parametersconfiguration-model-catalog/IsCollabMemberOrAdminRest/$',
        IsCollabMemberOrAdminRest.as_view(),
        ),
    url(r'^parametersconfiguration-model-catalog/IsCollabMemberRest/$',
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
    url(r'^parametersconfiguration-validation-app/IsCollabMemberOrAdminRest/$',
        IsCollabMemberOrAdminRest.as_view(),
        ),
    url(r'^parametersconfiguration-validation-app/IsCollabMemberRest/$',
        IsCollabMemberRest.as_view(),
        ),
    url(r'^parametersconfiguration-validation-app/collabidrest/$',
         CollabIDRest.as_view(),
        ),
    url(r'^parametersconfiguration-validation-app/appidrest/$',
         AppIDRest.as_view(),
        ),

)
