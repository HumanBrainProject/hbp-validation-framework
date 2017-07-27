import json
from django.http import HttpResponse, HttpResponseForbidden
from django.shortcuts import render_to_response, render
from uuid import UUID
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.http import  HttpResponseRedirect
from django.core.urlresolvers import reverse
import requests
from hbp_app_python_auth.auth import get_access_token, get_token_type, get_auth_header
#from model_validation_api.views import is_admin
from model_validation_api.models import CollabParameters
from model_validation_api.serializer import CollabParametersSerializer

@login_required(login_url='/login/hbp/')
def home(request):
    ##get collab
    serializer_context = {'request': request,}
    ctx = request.META['QUERY_STRING']
    id = ctx[4:]
    app_params=list(CollabParameters.objects.filter(id = id).values('app_type'))
    if app_params != []:
        if app_params[0]["app_type"]=="model_catalog":
            return  render(request, 'model_catalog.html', {})
        else: 
            if app_params[0]["app_type"]=="validation_app":
                return render(request, 'validation_home.html', {})

    return render(request, 'home.html', {})

@login_required(login_url='/login/hbp/')
def show(request):
    context = UUID(request.GET.get('ctx'))
    return render_to_response('show.html', {'context': context})


@login_required(login_url='/login/hbp/')
def edit(request):
    # if not _is_collaborator(request):
    #     return HttpResponseForbidden()

    context = UUID(request.GET.get('ctx'))
    return render_to_response('edit.html', {'context': context})


def test(request):
    return render_to_response('test.html', {})


@login_required(login_url='/login/hbp/')
def config(request):
    '''Render the config file'''

    res = requests.get(settings.HBP_ENV_URL)
    config = res.json()

    # Use this app client ID
    config['auth']['clientId'] = settings.SOCIAL_AUTH_HBP_KEY

    # Add user token informations
    request.user.social_auth.get().extra_data
    config['auth']['token'] = {
        'access_token': get_access_token(request.user.social_auth.get()),
        'token_type': get_token_type(request.user.social_auth.get()),
        'expires_in': request.session.get_expiry_age(),
    }
    config['build'] = settings.BUILD_INFO

    return HttpResponse(json.dumps(config), content_type='application/json')


# def _is_collaborator(request):
#     '''check access depending on context'''
#
#     svc_url = settings.HBP_COLLAB_SERVICE_URL
#
#     context = request.GET.get('ctx')
#     if not context:
#         return False
#     url = '%scollab/context/%s/' % (svc_url, context)
#     headers = {'Authorization': get_auth_header(request.user.social_auth.get())}
#     res = requests.get(url, headers=headers)
#     if res.status_code != 200:
#         return False
#     collab_id = res.json()['collab']['id']
#     url = '%scollab/%s/permissions/' % (svc_url, collab_id)
#     res = requests.get(url, headers=headers)
#     if res.status_code != 200:
#         return False
#     return res.json().get('UPDATE', False)





@login_required(login_url='/login/hbp')
def About_the_Models_Page(request):
    return render(request,'simple_model_detail.html', {})


def simple_result_detail(request):
    return render(request,'simple_test_detail.html', {})


def simple_result_list(request):
    
    context = UUID(request.GET.get('ctx'))
    return render_to_response('simple_result_list.html', {'context': context})


#def edit_select_models(request):
#    return render(request,'edit_select_models.html', {})
   
 
 
def About_the_validation_test_result(request):
    return render(request,'simple_result_detail.html', {})