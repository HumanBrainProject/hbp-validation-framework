"""
Simple script to synchronize schemas of interest from one namespace to another
"""

import requests
import os

token = os.environ["HBP_token"]
headers = {'Authorization': 'Bearer ' + token}

source_namespace = "neuralactivity"
target_namespace = "softwarecatalog"
base_url = "https://nexus-int.humanbrainproject.org/v0/"
#base_url = "https://nexus.humanbrainproject.org/v0/"

# 1. Create domains, if necessary

response = requests.get(base_url + 'domains/' + source_namespace, headers=headers)
if response.status_code == 200:
    source_domains = response.json()['results']
    #print("Domains: {}".format(source_domains))
else:
    raise Exception("Couldn't get domain list: {}".format(response.content))

for source_domain in source_domains:
    target_domain_url = source_domain['resultId'].replace(source_namespace, target_namespace)
    domain_name = target_domain_url.split("/")[-1]
    #print(domain_name, target_domain_url)
    response = requests.put(target_domain_url,
                            headers=headers,
                            json={"description": "'{}' domain".format(domain_name)})
    if response.status_code < 300:
        print("Created {} domain".format(domain_name))
    else:
        errors = response.json()
        if errors['code'] == "DomainAlreadyExists":
            pass
        else:
            raise Exception("Couldn't get domain list: {}".format(errors))

# 2. Copy/update schemas

schema_urls = []
response = requests.get(base_url + 'schemas/' + source_namespace + '?size=50', headers=headers)
if response.status_code == 200:
    result = response.json()
    schema_urls.extend(item["resultId"] for item in result["results"])
    while 'next' in result['links']:
        response = requests.get(result['links']['next'], headers=headers)
        if response.status_code == 200:
            result = response.json()
            schema_urls.extend(item["resultId"] for item in result["results"])
        else:
            raise Exception("Couldn't get schema list: {}".format(result))
else:
    errors = response.json()
    raise Exception("Couldn't get schema list: {}".format(result))

for source_schema_url in schema_urls:
    # note: if you wish to copy only certain domains, you could filter the urls at this point
    target_schema_url = source_schema_url.replace(source_namespace, target_namespace)
    response = requests.get(source_schema_url, headers=headers)
    response._content = response.content.replace(b'neuralactivity', b'softwarecatalog')
    target_content = response.json()
    for attr in ['nxv:rev', 'nxv:published', 'nxv:deprecated', 'links']:
        target_content.pop(attr)
    response = requests.put(target_schema_url, headers=headers, json=target_content)
    if response.status_code < 300:
        print(target_schema_url + " - ok")
    else:
        errors = response.json()
        if errors['code'] == "SchemaAlreadyExists":
            print(target_schema_url + " - already exists. Not updated")
            # todo: implement schema updating if the schema is different
        else:
            raise Exception("Couldn't upload schema: {}".format(errors))
    # now publish schema
    response = requests.patch(target_schema_url + "/config?rev=1", headers=headers,
                              json={"published": True})
    if response.status_code >= 300:
        errors = response.json()
        raise Exception("Couldn't publish schema: {}".format(errors))
