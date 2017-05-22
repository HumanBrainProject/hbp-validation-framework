"""
Validation Search Service URL Configuration

"""
from django.conf.urls import include, url
from django.contrib import admin

from views import show, edit, config, home

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
]
