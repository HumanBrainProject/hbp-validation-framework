
"""
Validation Search Service URL Configuration

HBP Model Validation API
------------------------

This directory contains a **Django** *app* "model_validation_api" that implements a RESTful API
for working with a database of validation tests for neuroscience models.


"""
from django.conf.urls import include, url
from django.contrib import admin

from .views import config, home

#from views import edit_select_models

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('hbp_app_python_auth.urls', namespace='hbp-social')),
    url(r'^config.json$', config, name='config'),
    url(r'^', include('model_validation_api.urls')),
]
