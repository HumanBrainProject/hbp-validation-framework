import os

NEXUS_ENDPOINT = "https://nexus.humanbrainproject.org/v0"
OIDC_ENDPOINT = "https://services.humanbrainproject.eu/oidc/token"
HBP_IDENTITY_SERVICE_URL_V1 = "https://services.humanbrainproject.eu/idm/v1/api"
HBP_IDENTITY_SERVICE_URL_V2 = "https://iam.humanbrainproject.eu/auth/realms/hbp/protocol/openid-connect"
HBP_COLLAB_SERVICE_URL = 'https://services.humanbrainproject.eu/collab/v0/'
KG_SERVICE_ACCOUNT_REFRESH_TOKEN = os.environ['KG_SERVICE_ACCOUNT_REFRESH_TOKEN']
KG_SERVICE_ACCOUNT_CLIENT_ID = os.environ.get('KG_SERVICE_ACCOUNT_CLIENT_ID')
KG_SERVICE_ACCOUNT_SECRET = os.environ.get('KG_SERVICE_ACCOUNT_SECRET')
EBRAINS_IAM_CONF_URL = 'https://iam.ebrains.eu/auth/realms/hbp/.well-known/openid-configuration'
EBRAINS_IAM_CLIENT_ID = os.environ.get('EBRAINS_IAM_CLIENT_ID')
EBRAINS_IAM_SECRET = os.environ.get('EBRAINS_IAM_SECRET')
SESSIONS_SECRET_KEY=os.environ.get('SESSIONS_SECRET_KEY')
ADMIN_COLLAB_ID = "model-validation"  # "13947"
BASE_URL=os.environ.get('VALIDATION_SERVICE_BASE_URL')