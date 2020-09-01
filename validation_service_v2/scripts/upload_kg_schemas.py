import os
from os.path import join, getsize, expanduser
import requests

token = os.environ["HBP_token"]

base_dir = '~/dev/data/neuroshapes/modules/simulation/src/main/resources/schemas/neurosciencegraph'
commons?
core?



url_template = "https://nexus.humanbrainproject.org/v0/schemas/modelvalidation/{domain}/{name}/{version}"

auth = {"Bearer": token}

for root, dirs, files in os.walk(expanduser(base_dir)):
    templated_files = [fn for fn in files if "resolved" not in fn]
    if templated_files:
        domain, name = root.split("/")[-2:]
        latest_file = sorted(templated_files)[-1]
        version = os.path.splitext(latest_file)[0]
        print(join(root, latest_file))
        url = url_template.format(domain=domain, name=name, version=version)
        print(url)
        with open(latest_file) as fp:
            content = fp.read()

        # todo: replace {{base}}
        # todo: either replace neurosciencegraph or add a wrapper schema
        # todo: add the remaining validation schemas to neuroshapes folder
        # todo: check that the schema from neuralactivity matches the one in neuroshapes

        # ALTERNATIVE APPROACH: take schemas directly from neuralactivity to upload to modelvalidation

        response = requests.put(url, json=content, auth=auth)

        if response.status_code < 300:
