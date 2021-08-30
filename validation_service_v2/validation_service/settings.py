import os

NEXUS_ENDPOINT = "https://nexus.humanbrainproject.org/v0"
OIDC_HOST = "https://iam.ebrains.eu/auth/realms/hbp"
HBP_IDENTITY_SERVICE_URL_V2 = (
    "https://iam.ebrains.eu/auth/realms/hbp/protocol/openid-connect"
)
HBP_COLLAB_SERVICE_URL_V2 = "https://wiki.ebrains.eu/rest/v1/"
KG_SERVICE_ACCOUNT_CLIENT_ID = os.environ.get("KG_SERVICE_ACCOUNT_CLIENT_ID")
KG_SERVICE_ACCOUNT_SECRET = os.environ.get("KG_SERVICE_ACCOUNT_SECRET")
EBRAINS_IAM_CONF_URL = "https://iam.ebrains.eu/auth/realms/hbp/.well-known/openid-configuration"
EBRAINS_IAM_CLIENT_ID = os.environ.get("EBRAINS_IAM_CLIENT_ID")
EBRAINS_IAM_SECRET = os.environ.get("EBRAINS_IAM_SECRET")
SESSIONS_SECRET_KEY = os.environ.get("SESSIONS_SECRET_KEY")
ADMIN_COLLAB_ID = "model-validation"  # "13947"
BASE_URL = os.environ.get("VALIDATION_SERVICE_BASE_URL")
