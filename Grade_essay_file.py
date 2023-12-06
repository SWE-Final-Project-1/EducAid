'''Find out how to access text from pdf in storage bucket - Use batch processor code'''
'''Send text to Grammar and error correction endpoint'''
'''Assign point score to each grammar section - Reduce total grade by occurrence of each grammar mistake weighted by point
    Will need to be separate function'''
'''Return value of grade'''


#TODO
'''Submit individual file to OCR. Pass the resulting document to the digitized text bucket.'''
'''Get that digitized text and pass it to Grammar and error correction api'''
'''Return response'''
'''Get grades associated with response'''

import requests
from SWE_Final.Process_Single_Doc_Cloud_Source import *

from google.api_core.client_options import ClientOptions
from google.cloud import documentai 
from flask import Flask, json, request, jsonify

#Firestore imports
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud import storage

# Use the application default credentials.
cred = credentials.ApplicationDefault()

firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)



'''This function creates a new upload in the image scans database/updates an existing one.'''
@app.route("/grade_essay", methods = ['POST'])
def upload_blob():
    storage_client = storage.Client()
    bucket_name = "image_scans"
    bucket = storage_client.bucket(bucket_name)


    """Uploads a file to the bucket."""
    metaData = json.loads(request.data)
    studentID = metaData["studentID"]
    testID = metaData["testID"]
    toUpdate = metaData.get("toUpdate", "no")
    imagePath = metaData["imagePath"]
    
    
    imageID = "/" + testID + "/" +  studentID
    destination_blob_name = imageID
    source_file_name = imagePath
    
    blobsIter = bucket.list_blobs()
    for blob in blobsIter:
        print(blob.name)
        if (blob.name == destination_blob_name):
            if(toUpdate == "yes"):
                 blob = bucket.blob(destination_blob_name)
                 blob.upload_from_filename(source_file_name)
                 print(
                     f"File successfully edited. {source_file_name} uploaded to {destination_blob_name}."
                    )
            print("Student test already uploaded"), 403

    
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    )

    gcs_input_uri_value = "gs://image_scans" + imageID
    print(f"Gcs input uri {gcs_input_uri_value}")


    blob = batch_process_documents(project_id_value, 
                        location_value,
                        processor_id_value,
                        gcs_output_uri_value,
                        processor_version_id = processor_version_id_value, 
                        gcs_input_uri= gcs_input_uri_value,
                        input_mime_type = input_mime_type_value
                        )
    document = documentai.Document.from_json(
                blob.download_as_bytes(), ignore_unknown_fields=True
            )
    with open("./data/DocumentResponse.txt", "w") as fin:
        fin.write(document.text)
    # print(document)

    # blob_list = list(blob_list)
    
    # first_blob = blob_list[0]
    # first_blob_name = first_blob.name
    print("Here")
    
    # blob_uri = gcs_output_uri_value + first_blob_name
    # document = documentai.Document.from_json(
    #             first_blob.download_as_bytes(), ignore_unknown_fields=True
    #         )

    essay = document.text
    data=json.dumps(
        {
    "numResults": 1,
    "maxTokens": 300,
    "minTokens": 0,
    "temperature": 0.7,
    "topP": 1,
    "topKReturn": 0,
    "frequencyPenalty": {
        "scale": 0,
        "applyToWhitespaces": True,
        "applyToPunctuations": True,
        "applyToNumbers": True,
        "applyToStopwords": True,
        "applyToEmojis": True
    },
    "presencePenalty": {
        "scale": 0,
        "applyToWhitespaces": True,
        "applyToPunctuations": True,
        "applyToNumbers": True,
        "applyToStopwords": True,
        "applyToEmojis": True
    },
    "countPenalty": {
        "scale": 0,
        "applyToWhitespaces": True,
        "applyToPunctuations": True,
        "applyToNumbers": True,
        "applyToStopwords": True,
        "applyToEmojis": True
    },
    "prompt": "What are some interesting applications of emergence theory " + essay 
}
)

    headers = {"Authorization": "Bearer 7X7mvKNPEJ4eXieVoFsTISA2p0yGumA2",
            "Content-Type": "application/json",
            "accept": "application/json"} # Assuming the API expects JSON

    response2 = requests.post('https://api.ai21.com/studio/v1/j2-mid/complete', headers=headers, json=data)
    assessment_response = response2.json()
    return jsonify(assessment_response), 200


    
    

app.run(debug=True)



'''Create endpoint for end to end processing of a local file. The '''
