from django.conf.urls import url
from .views import (
                    ModelCatalogView,
                    HomeValidationView,

                    CollabParameterRest,
                    AuthorizedCollabParameterRest,
                    ScientificModelRest,
                    ValidationTestDefinitionRest,
                    ScientificModelInstanceRest,
                    ScientificModelImageRest,
                    ValidationTestCodeRest,
                    TestCommentRest,
                    CollabIDRest
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

    url(r'^app/scientificmodel/$',
        ScientificModelRest.as_view(),
        name="scientific-model"),
    
    url(r'^app/scientificmodelinstance/$',
        ScientificModelInstanceRest.as_view(),
        name="scientific-model-instance"),

    url(r'^app/scientificmodelimage/$',
        ScientificModelImageRest.as_view(),
        name="scientific-model-image"),

    url(r'^app/validationtestdef/$',
        ValidationTestDefinitionRest.as_view(),
        name="validation-test-definition"),

    url(r'^app/validationtestscode/$',
        ValidationTestCodeRest.as_view(),
        name="validation-test-code"),

    url(r'^app/testcomment/$',
        TestCommentRest.as_view(),
        name="test-comment"),

    url(r'^app/collabparameterrest/$',
        # csrf_exempt(CollabParameterRest.as_view())
        CollabParameterRest.as_view(), #csrf_exempt(views.LoginView.as_view()) #login_required #login_required(login_url='/login/hbp')
        ),
    url(r'^app/collabidrest/$',
        CollabIDRest.as_view(), 
        ),
    url(r'^app/authorizedcollabparameterrest/$',
        AuthorizedCollabParameterRest.as_view(), 
        ),


     #model catalog app url
    url(r'^model-catalog/$',
        ModelCatalogView.as_view(),
        name="model-catalog-view"),
    url(r'^model-catalog/collabparameterrest/$',
        # csrf_exempt(CollabParameterRest.as_view())
        CollabParameterRest.as_view(), #csrf_exempt(views.LoginView.as_view()) #login_required #login_required(login_url='/login/hbp')
        ),
    url(r'^model-catalog/scientificmodel/$',
        ScientificModelRest.as_view(),
        name="scientific-model"),

    url(r'^model-catalog/authorizedcollabparameterrest/$',
        AuthorizedCollabParameterRest.as_view(), 
        ),
    url(r'^model-catalog/scientificmodelinstance/$',
        ScientificModelInstanceRest.as_view(),
        name="scientific-model-instance"),
    url(r'^model-catalog/scientificmodelimage/$',
        ScientificModelImageRest.as_view(),
        name="scientific-model-image"),

)



