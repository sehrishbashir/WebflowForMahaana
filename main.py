import os
import simplejson as json
from dotenv import load_dotenv
from pyairtable import Api
import requests

AIRTABLE_BASE_ID = 'app9fpjsdlh5R7gsq'
AIRTABLE_TABLE_ID = 'Adjust_nav_values'
WEBFLOW_SITE_NAME = "Anas's Supercool Site"
load_dotenv()

def get_webflow_site_data(): 
    url = "https://api.webflow.com/v2/sites"

    headers = {
        "accept": "application/json",
        "authorization": f"Bearer {os.environ['WEBFLOW_KEY']}"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return json.loads(response.text) 
    else:
        return None

### Airtable

airtable_api = Api(os.environ['AIRTABLE_KEY'])
table = airtable_api.table(AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID)
records = table.all()

### Webflow

site_resp = get_webflow_site_data()

site_id = None

for site in site_resp['sites']:
    if site['displayName'] == WEBFLOW_SITE_NAME:
        site_id = site['id']
    else:
        print("Couldn't find selected webflow site")
        exit()

print(site_id)

# url = f"https://api.webflow.com/v2/sites/{site_id}/collections"
# headers = {
#     "accept": "application/json",
#     "authorization": f"Bearer {os.environ['WEBFLOW_KEY']}"
# }

# response = requests.get(url, headers=headers)

# print(response.text)


# url = "https://api.webflow.com/v2/token/authorized_by"
# headers = {
#     "accept": "application/json",
#     "authorization": f'Bearer {os.environ['WEBFLOW_KEY']}'
# }

# response = requests.get(url, headers=headers)

# print(response.text)
