
import os

import json
import getpass
import requests
from requests.auth import AuthBase

TOKENFILE = os.path.expanduser("~/.hbptoken")

class HBPAuth(AuthBase):
    """Attaches OIDC Bearer Authentication to the given Request object."""

    def __init__(self, token):
        # setup any auth-related data here
        self.token = token

    def __call__(self, r):
        # modify and return the request
        r.headers['Authorization'] = 'Bearer ' + self.token
        return r


class BaseClient(object):
    """
    Base class that handles HBP authentication
    """
    # Note: Could possibly simplify the code later

    def __init__(self, username,
                 password=None,
                 environment="production"):

        if environment == "production":
            self.url = "https://validation-v1.brainsimulation.eu"
            self.client_id = "3ae21f28-0302-4d28-8581-15853ad6107d" # Prod ID
        elif environment == "dev":
            self.url = "https://validation-dev.brainsimulation.eu"
            self.client_id = "90c719e0-29ce-43a2-9c53-15cb314c2d0b" # Dev ID
        else:
            if os.path.isfile('config.json') and os.access('config.json', os.R_OK):
                with open('config.json') as config_file:
                    config = json.load(config_file)
                    if environment in config:
                        if "url" in config[environment] and "client_id" in config[environment]:
                            self.url = config[environment]["url"]
                            self.client_id = config[environment]["client_id"]
                        else:
                            raise KeyError("Cannot load environment info: config.json does not contain sufficient info for environment = {}".format(environment))
                    else:
                        raise KeyError("Cannot load environment info: config.json does not contain environment = {}".format(environment))
            else:
                raise IOError("Cannot load environment info: config.json not found in the current directory.")

        self.username = username
        self.verify = True
        if password is None:
            # check for a stored token
            self.token = None
            if os.path.exists(TOKENFILE):
                with open(TOKENFILE) as fp:
                    # self.token = json.load(fp).get(username, None)["access_token"]
                    data = json.load(fp).get(username, None)
                    if data and "access_token" in data:
                        self.token = data["access_token"]
                        if not self._check_token_valid():
                            print("HBP authentication token is invalid or has expired. Will need to re-authenticate.")
                            self.token = None
                    else:
                        print("HBP authentication token file not having required JSON data.")
            else:
                print("HBP authentication token file not found locally.")

            if self.token is None:
                password = os.environ.get('HBP_PASS')
                if password is not None:
                    try:
                        self._hbp_auth(username, password)
                    except Exception:
                        print("Authentication Failure. Possibly incorrect HBP password saved in environment variable 'HBP_PASS'.")
                if not hasattr(self, 'config'):
                    try:
                        # prompt for password
                        print("Please enter your HBP password: ")
                        password = getpass.getpass()
                        self._hbp_auth(username, password)
                    except Exception:
                        print("Authentication Failure! Password entered is possibly incorrect.")
                        raise
                with open(TOKENFILE, "w") as fp:
                    json.dump({username: self.config["auth"]["token"]}, fp)
                os.chmod(TOKENFILE, 0o600)
        else:
            try:
                self._hbp_auth(username, password)
            except Exception:
                print("Authentication Failure! Password entered is possibly incorrect.")
                raise
            with open(TOKENFILE, "w") as fp:
                json.dump({username: self.config["auth"]["token"]}, fp)
            os.chmod(TOKENFILE, 0o600)
        self.auth = HBPAuth(self.token)

    def _check_token_valid(self):
        """
        Checks with the hbp-collab-service if the locally saved HBP token is valid.
        See if this can be tweaked to improve performance.
        """
        url = "https://services.humanbrainproject.eu/collab/v0/collab/"
        data = requests.get(url, auth=HBPAuth(self.token))
        if data.status_code == 200:
            return True
        else:
            return False

    def _hbp_auth(self, username, password):
        """
        HBP authentication
        """
        redirect_uri = self.url + '/complete/hbp/'

        self.session = requests.Session()
        # 1. login button on NMPI
        rNMPI1 = self.session.get(self.url + "/login/hbp/?next=/config.json",
                                  allow_redirects=False, verify=self.verify)
        # 2. receives a redirect or some Javascript for doing an XMLHttpRequest
        if rNMPI1.status_code in (302, 200):
            # Get its new destination (location)
            if rNMPI1.status_code == 302:
                url = rNMPI1.headers.get('location')
            else:
                res = rNMPI1.content
                state = res[res.find("state")+6:res.find("&redirect_uri")]
                url = "https://services.humanbrainproject.eu/oidc/authorize?state={}&redirect_uri={}/complete/hbp/&response_type=code&client_id={}".format(state, self.url, self.client_id)
            # get the exchange cookie
            cookie = rNMPI1.headers.get('set-cookie').split(";")[0]
            self.session.headers.update({'cookie': cookie})
            # 3. request to the provided url at HBP
            rHBP1 = self.session.get(url, allow_redirects=False, verify=self.verify)
            # 4. receives a redirect to HBP login page
            if rHBP1.status_code == 302:
                # Get its new destination (location)
                url = rHBP1.headers.get('location')
                cookie = rHBP1.headers.get('set-cookie').split(";")[0]
                self.session.headers.update({'cookie': cookie})
                # 5. request to the provided url at HBP
                rHBP2 = self.session.get(url, allow_redirects=False, verify=self.verify)
                # 6. HBP responds with the auth form
                if rHBP2.text:
                    # 7. Request to the auth service url
                    formdata = {
                        'j_username': username,
                        'j_password': password,
                        'submit': 'Login',
                        'redirect_uri': redirect_uri + '&response_type=code&client_id=nmpi'
                    }
                    headers = {'accept': 'application/json'}
                    rNMPI2 = self.session.post("https://services.humanbrainproject.eu/oidc/j_spring_security_check",
                                               data=formdata,
                                               allow_redirects=True,
                                               verify=self.verify,
                                               headers=headers)
                    # check good communication
                    #print "rNMPI2.status_code = ", rNMPI2.status_code
                    #print "content = ", rNMPI2.content
                    if rNMPI2.status_code == requests.codes.ok:
                        #import pdb; pdb.set_trace()
                        # check success address
                        if rNMPI2.url == self.url + '/config.json':
                            # print rNMPI2.text
                            res = rNMPI2.json()
                            self.token = res['auth']['token']['access_token']
                            self.config = res
                        # unauthorized
                        else:
                            if 'error' in rNMPI2.url:
                                raise Exception("Authentication Failure: No token retrieved." + rNMPI2.url)
                            else:
                                raise Exception("Unhandled error in Authentication." + rNMPI2.url)
                    else:
                        raise Exception("Communication error")
                else:
                    raise Exception("Something went wrong. No text.")
            else:
                raise Exception("Something went wrong. Status code {} from HBP, expected 302".format(rHBP1.status_code))
        else:
            raise Exception("Something went wrong. Status code {} from NMPI, expected 302".format(rNMPI1.status_code))

    def _translate_URL_to_UUID(self, path):
        """
        Can take a path such as `collab:///5165/hippoCircuit_20171027-142713`
        with 5165 being the collab ID and the latter part being the target folder
        name, and translate this to the UUID on the HBP Collaboratory storage.
        The target can be a file or folder.
        """
        base_url = "https://services.humanbrainproject.eu/storage/v1/api/entity/"
        if path.startswith("collab://"):
            path = path[len("collab://"):]
        url = base_url + "?path=" + path
        data = requests.get(url, auth=self.auth)
        if data.status_code == 200:
            return data.json()["uuid"]
        else:
            raise Exception("Error: " + data.content)

    def _download_resource(self, uuid):
        """
        Downloads the resource specified by the UUID on the HBP Collaboratory.
        Target can be a file or a folder. Returns a list containing absolute
        filepaths of all downloaded files.
        """
        files_downloaded = []

        base_url = "https://services.humanbrainproject.eu/storage/v1/api/entity/"
        url = base_url + "?uuid=" + uuid
        data = requests.get(url, auth=self.auth)
        if data.status_code != 200:
            raise Exception("The provided 'uuid' is invalid!")
        else:
            data = data.json()
            if data["entity_type"] == "folder":
                if not os.path.exists(data["name"]):
                    os.makedirs(data["name"])
                os.chdir(data["name"])
                base_url = "https://services.humanbrainproject.eu/storage/v1/api/folder/"
                url = base_url + uuid + "/children/"
                folder_data = requests.get(url, auth=self.auth)
                folder_sublist = folder_data.json()["results"]
                for entity in folder_sublist:
                    files_downloaded.extend(self._download_resource(entity["uuid"]))
                os.chdir('..')
            elif data["entity_type"] == "file":
                base_url = "https://services.humanbrainproject.eu/storage/v1/api/file/"
                url = base_url + uuid + "/content/"
                file_data = requests.get(url, auth=self.auth)
                with open(data["name"], "w") as filename:
                    filename.write("%s" % file_data.content)
                    files_downloaded.append(os.path.realpath(filename.name))
            else:
                raise Exception("Downloading of resources currently supported only for files and folders!")
        return files_downloaded