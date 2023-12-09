import requests
import base64
import json


url = 'https://app.nanonets.com/api/v2/OCR/Model/15294711-5f6e-4bf3-ac48-79e6b0e74ce5/LabelFile/?async=false'

data = {'file': open(r"C:\Users\Wepea Buntugu\SWE_Final\SWE_Final\EducaidFiles\Literacy test mark s.pdf", 'rb')}

response = requests.post(url, auth=requests.auth.HTTPBasicAuth('54f9c115-96de-11ee-91d1-e6e501c4925a', ''), files=data)

print(json.loads(response.text)["prediction"]["cells"])
        
