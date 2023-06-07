import os
import json

NEXUS_ENDPOINT = "https://nexus.humanbrainproject.org/v0"
EBRAINS_IAM_BASE_URL = os.environ.get("EBRAINS_IAM_BASE_URL", "https://iam.ebrains.eu")
HBP_IDENTITY_SERVICE_URL = f"{EBRAINS_IAM_BASE_URL}/auth/realms/hbp/protocol/openid-connect"
EBRAINS_IAM_CONF_URL = f"{EBRAINS_IAM_BASE_URL}/auth/realms/hbp/.well-known/openid-configuration"
HBP_COLLAB_SERVICE_URL = "https://wiki.ebrains.eu/rest/v1/"
KG_CORE_API_HOST = os.environ.get("KG_CORE_API_HOST")
KG_SERVICE_ACCOUNT_CLIENT_ID = os.environ.get("KG_SERVICE_ACCOUNT_CLIENT_ID")
KG_SERVICE_ACCOUNT_SECRET = os.environ.get("KG_SERVICE_ACCOUNT_SECRET")
EBRAINS_IAM_CLIENT_ID = os.environ.get("EBRAINS_IAM_CLIENT_ID")
EBRAINS_IAM_SECRET = os.environ.get("EBRAINS_IAM_SECRET")
SESSIONS_SECRET_KEY = os.environ.get("SESSIONS_SECRET_KEY")
ADMIN_COLLAB_ID = "model-validation"  # "13947"
BASE_URL = os.environ.get("VALIDATION_SERVICE_BASE_URL")
SERVICE_STATUS = os.environ.get("VF_SERVICE_STATUS", "ok")
# e.g. SERVICE_STATUS = "The site is undergoing maintenance, and is currently in read-only mode."
AUTHENTICATION_TIMEOUT = 20

this_dir = os.path.dirname(__file__)
build_info_path = os.path.join(this_dir, "build_info.json")
if os.path.exists(build_info_path):
    with open(build_info_path, "r") as fp:
        BUILD_INFO = json.load(fp)
else:
    BUILD_INFO = None
