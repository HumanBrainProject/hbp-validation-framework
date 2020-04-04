import os

NEXUS_ENDPOINT = "https://nexus.humanbrainproject.org/v0"
OIDC_ENDPOINT = "https://services.humanbrainproject.eu/oidc/token"
HBP_IDENTITY_SERVICE_URL_V1 = "https://services.humanbrainproject.eu/idm/v1/api"
HBP_IDENTITY_SERVICE_URL_V2 = "https://iam.humanbrainproject.eu/auth/realms/hbp/protocol/openid-connect"
HBP_COLLAB_SERVICE_URL = 'https://services.humanbrainproject.eu/collab/v0/'
KG_SERVICE_ACCOUNT_REFRESH_TOKEN = os.environ['KG_SERVICE_ACCOUNT_REFRESH_TOKEN']
KG_SERVICE_ACCOUNT_CLIENT_ID = os.environ.get('KG_SERVICE_ACCOUNT_CLIENT_ID')
KG_SERVICE_ACCOUNT_SECRET = os.environ.get('KG_SERVICE_ACCOUNT_SECRET')
