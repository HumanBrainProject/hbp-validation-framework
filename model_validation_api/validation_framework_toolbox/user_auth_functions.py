
import requests
from hbp_app_python_auth.auth import get_access_token, get_auth_header
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
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

admin_id='13947'


def get_authorization_header(request):

    """
    Get HTTP authorization header
    :param request: request
    :type request: str
    :returns http status: string
    """

    auth = request.META.get("HTTP_AUTHORIZATION", None)
    if auth is None:
        try:
            auth = get_auth_header(request.user.social_auth.get())
            # logger.debug("Got authorization from database")
        except AttributeError:
            pass
    # in case of 401 error, need to trap and redirect to login
    else:
        if request.META.get("HTTP_AUTHORIZATION", None).split(" ")[0].lower() == "bearer" :
            auth = request.META.get("HTTP_AUTHORIZATION", None)
        else :
            auth = "Bearer "+request.META.get("HTTP_AUTHORIZATION", None)

        # logger.debug("Got authorization from HTTP header")
    return {'Authorization': auth}



# def build_storage_url (request, collab_id):

#     storage_string = "collab:///2169/folder_test"

#     storage_navigation_data = get_storage_navigation_data(request, collab_id)




#     goal_url = "https://collab.humanbrainproject.eu/#/collab/2169/nav/18935?state=uuid=9445b96d-6d55-41ef-9d93-727d5d8fabce"

def get_storage_navigation_data (request, collab_id):
    """
    Get HTTP authorization header
    :param request: request
    :type request: str
    :returns: http status
    :rtype: str
    """
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


# def get_storage_file_by_path (request, collab_id):
#     svc_url = HBP_STORAGE_SERVICE_URL
#     headers = {'Authorization': get_auth_header(request.user.social_auth.get())}
#     # url =  "/storage/v1/api/entity/?path=/12345/file_1"
#     # 18935
#     url =  "%s?path=/%s/folder_test/Invoice_200.pdf" % (svc_url, collab_id)

def get_storage_file_by_id (request):
    """
    Get file in collab storage with id
    :param request: request
    :type request: str
    :returns: res._content
    :rtype: str
    """
    url = "https://services.humanbrainproject.eu/storage/v1/api/file/7047b77d-10a7-45ee-903a-29fe7a8cc9e5/content/"

    headers = {'Authorization': get_auth_header(request.user.social_auth.get())}
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        return False

    return res._content



def get_user_from_token(request):
    """
    Get user id with token
    :param request: request
    :type request: str
    :returns: res._content
    :rtype: str
    """
    url = "{}/user/me".format(settings.HBP_IDENTITY_SERVICE_URL)
    headers = get_authorization_header(request)
    # logger.debug("Requesting user information for given access token")
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        logger.debug("Error" + res.content)
        raise Exception(res.content)
    # logger.debug("User information retrieved")
    return res.json()



def is_admin(request):
    """
    Check if user is an administrator
    :param request: request
    :type request: str
    :returns: admins
    :rtype: boolean
    """
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
    """
    Check access depending on context
    :param request: request
    :type request: str
    :param collab_id: int
    :type collab_id: int
    :returns: admins
    :rtype: boolean
    """

    svc_url = settings.HBP_COLLAB_SERVICE_URL

    #headers = {'Authorization': get_auth_header(request.user.social_auth.get())}
    headers = get_authorization_header(request)
    logger.debug(str(headers))

    url = '%scollab/%s/permissions/' % (svc_url, collab_id)
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        logger.debug(res.content)
        return False

    return res.json().get('UPDATE', False)


def _is_collaborator_token(request, collab_id):
    """
    Check access depending on token
    :param request: request
    :type request: str
    :param collab_id: int
    :type collab_id: int
    :returns: response
    :rtype: boolean
    """
    # user = get_user_from_token(request)
    # request.user = user

    svc_url = settings.HBP_COLLAB_SERVICE_URL

    url = '%scollab/%s/permissions/' % (svc_url, collab_id)
    if request.META.get("HTTP_AUTHORIZATION", None).split(" ")[0].lower() == "bearer" :
        headers = {'Authorization': request.META.get("HTTP_AUTHORIZATION", None)}

    else :
        headers = {'Authorization': "Bearer "+request.META.get("HTTP_AUTHORIZATION", None)}

    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        return False

    return res.json().get('UPDATE', False)

def is_authorised_or_admin(request, collab_id):
    """
    Check authorisation depending on context
    :param request: request
    :type request: str
    :param collab_id: int
    :type collab_id: int
    :returns: response
    :rtype: boolean
    """
    # if str(request.user) == "AnonymousUser" :
    #     logger.debug("anonymous")
    #     if request.META.get("HTTP_AUTHORIZATION", None) is None :
    #         return False
    #     else:
    #         auth = _is_collaborator_token(request, collab_id)
    #         if auth == False:
    #             auth = _is_collaborator_token(request, admin_id)
    #         return auth

    # else :
    #     logger.debug(str(request.user))
    #     if not (_is_collaborator(request, collab_id) or _is_collaborator(request,admin_id)):
    #         return False
    #     else:
    #         return True
    return _is_collaborator(request, collab_id) or _is_collaborator(request,admin_id)

def is_authorised(request, collab_id):
    """
    Check authorisation depending on context
    :param request: request
    :type request: str
    :param collab_id: int
    :type collab_id: int
    :returns: response
    :rtype: boolean
    """
    if str(request.user) == "AnonymousUser" :

        if request.META.get("HTTP_AUTHORIZATION", None) == None :
            return False
        else:
            auth = _is_collaborator_token(request, collab_id)
            return auth

    else :
        if not _is_collaborator(request, collab_id) :
            return False
        else:
            return True

def get_user_info(request):
    """
    :param request: request
    :type request: str
    :param collab_id: int
    :type collab_id: int
    :returns: response
    :rtype: str
    """
    social_auth = request.user.social_auth.get()
    url = "https://services.humanbrainproject.eu/oidc/userinfo"
    headers = {
        'Authorization': get_auth_header(request.user.social_auth.get()),
    }
    res = requests.post(url, headers=headers)
    return res.json()

def is_hbp_member (request):
    """
    Check if user is hbp member depending on token if user is anonymous
    :param request: request
    :type request: str
    :returns: response
    :rtype: boolean
    """
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


# def get_admin_list(request):
#     url = 'https://services.humanbrainproject.eu/idm/v1/api/group/hbp-neuromorphic-platform-admin/members'
#     headers = get_authorization_header(request)
#     res = requests.get(url, headers=headers)
#     logger.debug(headers)
#     if res.status_code != 200:
#         raise Exception("Couldn't get list of administrators." + res.content + str(headers))
#     data = res.json()
#     assert data['page']['totalPages'] == 1
#     admins = [user['id'] for user in data['_embedded']['users']]
#     return admins
