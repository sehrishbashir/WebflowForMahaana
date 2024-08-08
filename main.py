import os
from dotenv import load_dotenv
from pyairtable import Api
import requests
# from webflow.client import Webflow

AIRTABLE_BASE_ID = 'app9fpjsdlh5R7gsq'
AIRTABLE_TABLE_ID = 'Adjust_nav_values'
load_dotenv()

# Airtable #
############

airtable_api = Api(os.environ['AIRTABLE_KEY'])
table = airtable_api.table(AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID)
records = table.all()

# for record in records:
#     print(record)

###########
# Webflow #
###########

# 64525a82e6ab51cfbe7a1f51

url = "https://api.webflow.com/v2/sites"

headers = {
    "accept": "application/json",
    "authorization": "Bearer 71032c45837440a1d709127be3bc3f518731841407fc4d4141d732aa3c25e70a"
}
response = requests.get(url, headers=headers)

print(response.text)

# url = "https://api.webflow.com/v2/sites/null/collections"
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
