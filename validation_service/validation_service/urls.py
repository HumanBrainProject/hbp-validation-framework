"""
Validation Search Service URL Configuration

"""
from django.conf.urls import include, url
from django.contrib import admin

from views import show, edit, config, home


from views import About_the_Models_Page
from views import About_the_validation_test_result 
from views import simple_result_detail
from views import simple_result_create
#from views import edit_select_models

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^admin/', include(admin.site.urls)),
    #url('', include('social_django.urls', namespace='social')),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('hbp_app_python_auth.urls', namespace='hbp-social')),
    url(r'^app/$', show, name='app_show'),
    url(r'^app/edit$', edit, name='app_edit'),
    url(r'^config.json$', config, name='config'),
    url(r'^', include('model_validation_api.urls')),
    url(r'^About_the_Models_Page$', About_the_Models_Page, name='About_the_Models_Page'), 
    url(r'^About_the_validation_test_result$', About_the_validation_test_result, name='About_the_validation_test_result'),   
    url(r'^simple_result_detail$', simple_result_detail, name='simple_result_detail'), 
    url(r'^simple_result_create$', simple_result_create, name='simple_result_create'),   
]
