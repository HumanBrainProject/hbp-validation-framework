"""
Django settings for Validation Search Service.

"""

import os
import sys
import json
import hbp_app_python_auth.settings as auth_settings


# ENV = os.environ.get('VALIDATION_SERVICE_ENV', 'production')
ENV = 'dev'


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))



# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True#os.environ.get('DEBUG') in ['True', '1']
LOCAL_DB = True# False  ## only applies when ENV='dev'

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    # 'sslserver',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'model_validation_api',
    #'social_django',
    'jsonify',
    'social.apps.django_app.default',
    'hbp_app_python_auth',
    'markdown_deux',

    'corsheaders',
    'rest_framework',
]
if ENV == "dev":
    INSTALLED_APPS.append('sslserver')
    sys.path.append("..")



from django.utils.functional import SimpleLazyObject




MIDDLEWARE_CLASSES = (
    # 'app.middleware.personal_middleware.UserData',

    'app.middleware.personal_middleware.DisableCsrfCheck',

    
    # 'django.middleware.common.CommonMiddleware',

    'django.middleware.csrf.CsrfViewMiddleware',

    

    'django.contrib.sessions.middleware.SessionMiddleware',

    'corsheaders.middleware.CorsMiddleware',
    
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.security.SecurityMiddleware',
    
    'social.apps.django_app.middleware.SocialAuthExceptionMiddleware',
    # 'social_django.middleware.SocialAuthExceptionMiddleware', ####

 
  
)

AUTHENTICATION_BACKENDS = (
    'hbp_app_python_auth.auth.HbpAuth',
    'django.contrib.auth.backends.ModelBackend',
)

ROOT_URLCONF = 'validation_service.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['app/templates',],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'validation_service.wsgi.application'

APPEND_SLASH = False

# Database

if ENV == "dev" and LOCAL_DB:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'validations',
            'USER': 'validations_admin',
            'PASSWORD': os.environ.get("VALIDATION_SERVICE_PASSWORD"),
            'HOST': os.environ.get("VALIDATION_SERVICE_HOST"),
            'PORT': os.environ.get("VALIDATION_SERVICE_PORT", "5432"),  


        },
    }


# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = "%s/static/" % BASE_DIR
STATICFILES_DIRS = [
    # os.path.join(BASE_DIR, "lib"),
    os.path.join(BASE_DIR, "app"),
    # os.path.join(BASE_DIR, "app/static"),
    # os.path.join(BASE_DIR, "app/scripts"),  
    # os.path.join(BASE_DIR, "app/js"),
    # os.path.join(BASE_DIR, "app/css"),

]


HBP_COLLAB_SERVICE_URL = 'https://services.humanbrainproject.eu/collab/v0/'
HBP_ENV_URL = 'https://collab.humanbrainproject.eu/config.json'
HBP_IDENTITY_SERVICE_URL = 'https://services.humanbrainproject.eu/idm/v1/api'
HBP_STORAGE_SERVICE_URL = 'https://services.humanbrainproject.eu/storage/v1/api/entity/'



# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'none')

auth_settings.SOCIAL_AUTH_HBP_KEY = os.environ.get('HBP_OIDC_CLIENT_ID')
SOCIAL_AUTH_HBP_KEY = auth_settings.SOCIAL_AUTH_HBP_KEY

auth_settings.SOCIAL_AUTH_HBP_SECRET = os.environ.get('HBP_OIDC_CLIENT_SECRET')
SOCIAL_AUTH_HBP_SECRET = auth_settings.SOCIAL_AUTH_HBP_SECRET 

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django.log',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
        },
        'model_validation_api': {
            'handlers': ['file'],
            'level': 'DEBUG',
        }
    },
    'formatters': {
        'verbose': {
            'format': '%(asctime)s %(levelname)s %(name)s: %(message)s'
        },
    },
}
if ENV == "dev":
    LOGGING['handlers']['file']['filename'] = 'django.log'

if os.path.exists(os.path.join(BASE_DIR, "build_info.json")):
    with open(os.path.join(BASE_DIR, "build_info.json"), "r") as fp:
        BUILD_INFO = json.load(fp)
else:
    BUILD_INFO = None



# https://github.com/ottoyiu/django-cors-headers
# CORS_ORIGIN_ALLOW_ALL = True

CSRF_TRUSTED_ORIGINS = [    
    'localhost:8000',
    '127.0.0.1:9000',
    # 'https://localhost:8000/app/'
    
    ]

CORS_ORIGIN_WHITELIST = (
    'localhost:8000',
    '127.0.0.1:9000',
    'https://localhost:8000/app/',
    
)
CORS_ALLOW_CREDENTIALS = True

# CORS_ORIGIN_ALLOW_ALL = True  
# ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin'

CSRF_COOKIE_DOMAIN = (
    # ".mydomain.com",
    '.localhost:8000',
    '.127.0.0.1:9000'

)

CORS_ALLOW_HEADERS = (
'x-requested-with',
'content-type',
'accept',
'origin',
'authorization',
'X-CSRFToken',
'access-control-allow-origin'
)

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 100,
    # 'DEFAULT_PERMISSION_CLASSES': (
    #     'rest_framework.permissions.IsAuthenticated',
    # )

    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework_expiring_authtoken.authentication.ExpiringTokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    )
}