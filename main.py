import os
import simplejson as json
from dotenv import load_dotenv
from pyairtable import Api
import requests

AIRTABLE_BASE_ID = 'app9fpjsdlh5R7gsq'
AIRTABLE_TABLE_ID = 'Adjust_nav_values'
WEBFLOW_COLLECTION_ID = '66b4be6b03988ba8bc4ca48f'
# WEBFLOW_SITE_NAME = "Anas's Supercool Site"
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

def get_webflow_collection_items():
    url = f"https://api.webflow.com/v2/collections/{WEBFLOW_COLLECTION_ID}/items"

    headers = {
        "accept": "application/json",
        "authorization": f"Bearer {os.environ['WEBFLOW_KEY']}"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return json.loads(response.text) 
    else:
        return None

def delete_all_webflow_collection_items(item_ids):
    headers = {
        "accept": "application/json",
        "authorization": f"Bearer {os.environ['WEBFLOW_KEY']}"
    }

    for item_id in item_ids:
        url = f"https://api.webflow.com/v2/collections/{WEBFLOW_COLLECTION_ID}/items/{item_id}"
        
        requests.delete(url, headers=headers)


### Airtable

airtable_api = Api(os.environ['AIRTABLE_KEY'])
table = airtable_api.table(AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID)
records = table.all()

# print('records')
# print(records)

### Webflow

item_ids = []
collection_items = get_webflow_collection_items()

# print(collection_items)

for item in collection_items['items']:
    item_ids.append(item['id'])

print(item_ids)

delete_all_webflow_collection_items(item_ids)




url = f"https://api.webflow.com/v2/collections/{WEBFLOW_COLLECTION_ID}/items"

payload = {
    "isArchived": False,
    "isDraft": True,
    "fieldData": {
        "name": "0",
        "slug": "0",
        # "date": "10/11/2024",
        "nav": 100,
        # "adjusted_nav": 100,
        # "benchmark": 100,
        # "kmi30": 100,
        "peer_avg": 100,
    }
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer 25f9fc9e618e097bc4cc9f7956e2a90a3cbdcd8b0a3c1c1b4c6df91463957b7b"
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)




# site_resp = get_webflow_site_data()

# # Find selected site
# site_id = None
# i = 0
# for site in site_resp['sites']:
#     if site['displayName'] == WEBFLOW_SITE_NAME:
#         site_id = site['id']
#         break

#     if len(site_resp['sites']) == (i + 1):
#         print("Couldn't find selected webflow site. Exiting.")
#         exit()
    
#     i = i + 1

# print(site_id)



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
