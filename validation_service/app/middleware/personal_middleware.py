from django.utils.functional import SimpleLazyObject
from django.utils.deprecation import MiddlewareMixin


def get_actual_value(request):
    # request.__dict__.items())

    # for key, value in  request.__dict__.items(): #items():
    #     print ("KEY :" + str(key))
    #     print value
    #     try:
    #         for key2, value2 in value.__dict__.items() :
    #             print ("key2 :" +str(key2))
    #             print value2
    #     except:
    #         pass


    if request.user is None:
        return None

    return request.user #here should have value, so any code using request.user will work


class UserData(object):
    def process_request(self, request):
        print(request.__dict__)
        print(request.environ)

        print(request.environ['USER'])
        # print request.environ['USER']

        request.custom_prop = SimpleLazyObject(lambda: get_actual_value(request))





class DisableCsrfCheck(MiddlewareMixin):

    def process_request(self, req):
        attr = '_dont_enforce_csrf_checks'
        if not getattr(req, attr, False):
            setattr(req, attr, True)