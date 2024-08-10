import os
import simplejson as json
from dotenv import load_dotenv
from pyairtable import Api
import requests
from datetime import datetime

AIRTABLE_BASE_ID = 'app9fpjsdlh5R7gsq'
AIRTABLE_TABLE_ID = 'Adjust_nav_values copy'
WEBFLOW_COLLECTION_ID = '66b62c95d2784eaeb57d21b9'
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

def add_items_to_webflow(records):
    url = f"https://api.webflow.com/v2/collections/{WEBFLOW_COLLECTION_ID}/items"

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": f"Bearer {os.environ['WEBFLOW_KEY']}"
    }

    responses = []

    i = 0
    for record in records:
        print(f'Uploading record {i}')

        datetime_obj = datetime.strptime(record['fields']['date'], "%Y-%m-%d")
        date_iso_format = f"{datetime_obj.isoformat()}.000Z" # format with miliseconds added in 

        payload = {
            "isArchived": False,
            "isDraft": False,
            "fieldData": {
                "name": str(i),
                "slug": str(i),
                # "date": "2024-08-09T00:00:00.000Z",
                "date": date_iso_format,
                "miietf-nav": record['fields']['NAV'],
                "miietf-adjustnav": record['fields']['navValue'],
                "miietf-benchmark": record['fields']['performanceValue'],
                "miietf-kmi30": record['fields']['kmi30'],
                "miietf-peer": record['fields']['peer_avg'],
            }
        }
    
        response = requests.post(url, json=payload, headers=headers)

        if response.status_code == 202:
            responses.append(json.loads(response.text))
        else:
            print('Could not upload an item in collection')
            print(response.text)
            return None

        i = i + 1

    return responses

def publish_all_webflow_items(item_ids):
    url = f"https://api.webflow.com/v2/collections/{WEBFLOW_COLLECTION_ID}/items/publish"

    print('item_ids')
    print(item_ids)

    payload = { "itemIds": item_ids }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": f"Bearer {os.environ['WEBFLOW_KEY']}"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 202:
        return json.loads(response.text) 
    else:
        return None

### Airtable

airtable_api = Api(os.environ['AIRTABLE_KEY'])
table = airtable_api.table(AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID)
records = table.all()

print('records')
print(records)

### Webflow

item_ids = []
collection_items = get_webflow_collection_items()

# print(collection_items)

for item in collection_items['items']:
    item_ids.append(item['id'])

print(item_ids)

delete_all_webflow_collection_items(item_ids)

add_responses = add_items_to_webflow(records)
print(add_responses)

created_item_ids = []
for response in add_responses:
    created_item_ids.append(response['id'])

print('created_item_ids')
print(created_item_ids)

creation_resp = publish_all_webflow_items(created_item_ids)

print('creation_resp')
print(creation_resp)




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
