
import requests
from hbp_app_python_auth.auth import get_access_token, get_auth_header
from django.conf import settings

#dirty logg ... need a module 
import logging

from logging.handlers import RotatingFileHandler
logger = logging.getLogger("model_validation_api")
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s :: %(levelname)s :: %(message)s')
file_handler = RotatingFileHandler('activity.log', 'a', 1000000, 1)
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.DEBUG)
logger.addHandler(stream_handler)



    
def get_authorization_header(request):
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    if auth is None:
        try:
#            auth = get_auth_header(request.user.social_auth.get())
            logger.debug("Got authorization from database")
        except AttributeError:
            pass
    # in case of 401 error, need to trap and redirect to login
    else:
        logger.debug("Got authorization from HTTP header")
    return {'Authorization': auth}



# def build_storage_url (request, collab_id):
    
#     storage_string = "collab:///2169/folder_test"

#     storage_navigation_data = get_storage_navigation_data(request, collab_id)

    


#     goal_url = "https://collab.humanbrainproject.eu/#/collab/2169/nav/18935?state=uuid=9445b96d-6d55-41ef-9d93-727d5d8fabce"

def get_storage_navigation_data (request, collab_id):  
    svc_url = settings.HBP_COLLAB_SERVICE_URL
    headers = {'Authorization': get_auth_header(request.user.social_auth.get())}
    url = '%scollab/%s/nav/all/' % (svc_url, collab_id)
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        return False
    
    for i in res.json() :
            if i["name"] == "Storage" : 
                return (i) 

    return (None)


def get_user_from_token(request):
    url = "{}/user/me".format(settings.HBP_IDENTITY_SERVICE_URL)
    headers = get_authorization_header(request)
    logger.debug("Requesting user information for given access token")
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        logger.debug("Error" + res.content)
        raise Exception(res.content)
    logger.debug("User information retrieved")
    return res.json()



def is_admin(request):
    try:
        admins = get_admin_list(request)
    except Exception as err:
        logger.warning(err.message)
        return False
    try:
        user_id = get_user_from_token(request)["id"]
    except Exception as err:
        logger.warning(err.message)
        return False
    return user_id in admins


def _is_collaborator(request, collab_id):
    '''check access depending on context'''

    svc_url = settings.HBP_COLLAB_SERVICE_URL

    headers = {'Authorization': get_auth_header(request.user.social_auth.get())}
        
    url = '%scollab/%s/permissions/' % (svc_url, collab_id)
    res = requests.get(url, headers=headers)

    if res.status_code != 200:
        return False

    return res.json().get('UPDATE', False)


def _is_collaborator_token(request, collab_id):

    # user = get_user_from_token(request)
    # request.user = user

    svc_url = settings.HBP_COLLAB_SERVICE_URL

    url = '%scollab/%s/permissions/' % (svc_url, collab_id)
    headers = {'Authorization': request.META.get("HTTP_AUTHORIZATION", None)}

    res = requests.get(url, headers=headers)

    if res.status_code != 200:
        return False

    return res.json().get('UPDATE', False)

def is_authorised(request, collab_id):
    if str(request.user) == "AnonymousUser" : 
        if request.META.get("HTTP_AUTHORIZATION", None) == None :
            return False
        else: 
            _is_collaborator_token(request, collab_id)
            return True

    else :       
        
        if not _is_collaborator(request, collab_id):
            return False
        else: 
            return True 


def get_user_info(request):
    social_auth = request.user.social_auth.get()
    url = "https://services.humanbrainproject.eu/oidc/userinfo"
    headers = {
        'Authorization': get_auth_header(request.user.social_auth.get()),   
    }
    res = requests.post(url, headers=headers)
    print(res.json())
    return res.json() 

def is_hbp_member (request):
    svc_url = settings.HBP_COLLAB_SERVICE_URL

    if str(request.user) == "AnonymousUser" : 
        try:
            user_id = get_user_from_token(request)["id"]
            return True
        except Exception as err:
            logger.warning(err.message)
            return False

    else :
        return True


