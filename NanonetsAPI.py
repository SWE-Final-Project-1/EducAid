import requests
import base64
import json


url = 'https://app.nanonets.com/api/v2/OCR/Model/15294711-5f6e-4bf3-ac48-79e6b0e74ce5/LabelFile/?async=false'

data = {'file': open(r"C:\Users\Wepea Buntugu\SWE_Final\SWE_Final\EducaidFiles\CombinedLiteracyTest.pdf", 'rb')}

response = requests.post(url, auth=requests.auth.HTTPBasicAuth('54f9c115-96de-11ee-91d1-e6e501c4925a', ''), files=data)


first_answer_list = []
second_answer_list = []
count_1 = 0
count_2 = 0
first_table = json.loads(response.text)["result"][0]["prediction"][1]["cells"]
for cell in first_table:
    if ((count_1 % 2) != 0):
        first_answer_list.append(cell["text"])
    count_1 += 1
print(first_answer_list[1:])


second_table = json.loads(response.text)["result"][0]["prediction"][0]["cells"]
for cell in second_table:
    if((count_2 % 2) != 0):
        second_answer_list.append(cell["text"])
    count_2 += 1
print(second_answer_list)
