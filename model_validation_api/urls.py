from django.conf.urls import url
from .views import (ValidationTestDefinitionResource,
                    ValidationTestDefinitionListResource,
                    ValidationTestDefinitionSearchResource,
                    ValidationTestResultResource,
                    ValidationTestResultListResource,
                    # ScientificModelResource,
                    ScientificModelListResource,
                    SimpleTestListView,

                    SimpleTestDetailView,
                    NewSimpleTestDetailView,

                    # SimpleTestVersionView,

                    SimpleTestEditView,
                    ValidationTestDefinitionCreate,
                    SimpleModelListView,
                    SimpleModelDetailView,
                    SimpleModelEditView,
                    SimpleModelVersionView,
                    SimpleModelCreateView,
                    SimpleResultListView,
                    SimpleResultDetailView,
                    SimpleResultEditView,
                    HomeValidationView,
#                    configviewListResource,
#                    configview,
#                    configviewCreateView,
#                    configviewEditView,
#                    configviewDetailView,

#                    configviewRest,

                    CollabParameterRest,
                    AuthorizedCollabParameterRest,

 
                    #SimpleResultCreateView,
                    #ValidationTestResultView, 
                    # ValidationTestResultCreate,
                    # ValidationTestResultEdit,

                    ScientificModelRest,
                    ValidationTestDefinitionRest,
                    ModelCatalogView,
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
    url(r'^tests/$',
        ValidationTestDefinitionListResource.as_view(),
        name="list-resource"),
    url(r'^tests/(?P<test_id>{})$'.format(uuid_pattern),
        ValidationTestDefinitionResource.as_view(),
        name="item-resource"),
    url(r'^search',
        ValidationTestDefinitionSearchResource.as_view(),
        name="search-resource"),
    url(r'^results/$',
        ValidationTestResultListResource.as_view(),
        name="result-list-resource"),
    url(r'^results/(?P<result_id>{})$'.format(uuid_pattern),
        ValidationTestResultResource.as_view(),
        name="result-item-resource"),
    url(r'^models/$',
        ScientificModelListResource.as_view(),
        name="model-list-resource"),
    # url(r'^models/(?P<model_id>{})$'.format(uuid_pattern),
    #     ScientificModelResource.as_view(),
    #     name="model-item-resource"),


    url(r'^view/tests/$',
        SimpleTestListView.as_view(),
        name="simple-list-view"),

    url(r'^view/tests/(?P<pk>{})$'.format(uuid_pattern),
        NewSimpleTestDetailView.as_view(),
        name="simple-detail-view"),


    url(r'^view/tests/edit/(?P<pk>{})$'.format(uuid_pattern),
        SimpleTestEditView.as_view(),
        name="edit-test-view"),
    url(r'^view/tests/create$',
        ValidationTestDefinitionCreate.as_view(),
        name="create-test-view"),


    url(r'^view/models/$',
        SimpleModelListView.as_view(),
        name="simple-modeValidationTestResultEdit,l-list-view"),
    url(r'^view/models/(?P<pk>{})$'.format(uuid_pattern),
        SimpleModelDetailView.as_view(),
        name="simple-model-detail-view"),
    url(r'^view/models/create$',
        SimpleModelCreateView.as_view(),
        name="simple-model-create-view"),
    # url(r'^view/models/create/addImage$',
    #     AddImage.as_view(),
    #     name="simple-model-add-image"),
    url(r'^view/models/edit/(?P<pk>{})$'.format(uuid_pattern),
        SimpleModelEditView.as_view(),
        name="simple-model-edit-view"),
    url(r'^view/models/new_version/$',
        SimpleModelVersionView.as_view(),
        name="simple-model-version-view"),
    url(r'^view/models/new_version/(?P<pk>{})$'.format(uuid_pattern),
        SimpleModelVersionView.as_view(),
        name="simple-model-version-view"),

    url(r'^view/results/$',
        SimpleResultListView.as_view(),
        name="simple-result-list-view"),

    url(r'^view/results/(?P<pk>{})$'.format(uuid_pattern),
        SimpleResultDetailView.as_view(),
        name="simple-result-detail-view"),





#    url(r'^view/models/(?P<pk>{})$'.format(uuid_pattern),
#        configviewDetailView.as_view(),
#        name="config-view-detail-view"),
#    url(r'^view/models/create$',
#        configviewCreateView.as_view(),
#        name="config-view-create-view"),
#    url(r'^view/models/edit/(?P<pk>{})$'.format(uuid_pattern),
#        configviewEditView.as_view(),
#        name="config-view-edit-view"),






    #validation app url
    url(r'^app/$',
        HomeValidationView.as_view(),
        name="home-validation-view"),

    url(r'^app/test(?P<pk>{})$'.format(uuid_pattern),
        NewSimpleTestDetailView.as_view(),
        name="simple-list-view"),

    url(r'^app/model(?P<pk>{})$'.format(uuid_pattern),
        SimpleModelDetailView.as_view(), #just for now
        name="simple-model-detail-view"),


    url(r'^app/scientificmodel/$',
        ScientificModelRest.as_view(),
        name="scientific-model"),

    url(r'^app/scientificmodelinstance/$',
        ScientificModelInstanceRest.as_view(),
        name="scientific-model-instance"),
    
    url(r'^app/scientificmodelimage/$',
        ScientificModelImageRest.as_view(),
        name="scientific-model-image"),

#   url(r'^app/configview$',
#        configviewListResource.as_view(),
#        name="config-view-resource"),

#    url(r'^app/configview$',
#        configviewCreateView.as_view(), 
#        name='configview'), 

#    url(r'^app/view/configview/edit/(?P<pk>{})$'.format(uuid_pattern), 
#        configviewEditView.as_view(),
#        name="config-view-edit-view"),







#    url(r'^app/getconfigview/$',
#        configviewRest.as_view(),
#        name="config-view-get-data"),


    url(r'^app/validationtestdef/$',
        ValidationTestDefinitionRest.as_view(),
        name="validation-test-definition"),

    url(r'^app/validationtestscode/$',
        ValidationTestCodeRest.as_view(),
        name="validation-test-code"),

    url(r'^app/testcomment/$',
        TestCommentRest.as_view(),
        name="test-comment"),
    

    # url(r'^ConfigView$',
    #     ConfigViewCreateView.as_view(), 
    #     name='ConfigView'), 




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


  
    
        
    


    # url(r'^view/results/create$',
    #     #SimpleResultCreateView.as_view(),
    #     #ValidationTestResultListResource.as_view(),
    #      #ValidationTestResultView.as_view(),
    #     ValidationTestResultCreate.as_view(),
    #     name="simple-result-create-view"),  
    
    #
    #url(r'^edit$',
    #    SimpleResultEditView.as_view(),
    #    name="simple-result-edit-view"), 

     #model catalog app url
    url(r'^model-catalog/$',
        ModelCatalogView.as_view(),
        name="model-catalog-view"),


)