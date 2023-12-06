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

@app.route("/", methods = ['GET'])
def index():
    return "DB endpoint"



'''This function creates a new upload in the image scans database/updates an existing one.'''
@app.route("/image_scans", methods = ['POST'])
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
    
    
    imageID = testID + studentID
    destination_blob_name = imageID
    source_file_name = imagePath
    
    blobsIter = bucket.list_blobs()
    for blob in blobsIter:
        print(blob.name)
        if (blob.name == destination_blob_name): 
            if(toUpdate == "yes"):
                 blob = bucket.blob(destination_blob_name)
                 blob.upload_from_filename(source_file_name)
                 return jsonify(
                     f"File successfully edited. {source_file_name} uploaded to {destination_blob_name}."
                    ), 200
            return jsonify("Student test already uploaded"), 403

    
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    
    return jsonify(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    ), 201
    

# '''Function to download test text after it has been digitized by OCR API'''
# @app.route("image_scans/digitized_test", methods = ["GET"])


app.run(debug=True)