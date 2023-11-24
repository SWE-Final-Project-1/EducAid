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
    return "OCR endpoint"




@app.route("/image_scans", methods = ['POST'])
def upload_blob():
    """Uploads a file to the bucket."""
    metaData = json.loads(request.data)
    studentID = metaData["studentID"]
    testID = metaData["testID"]
    imagePath = metaData["imagePath"]
    imageID = testID + studentID
    # The ID of your GCS bucket
    bucket_name = "image_scans"
    
    source_file_name = imagePath
    # The ID of your GCS object
    destination_blob_name = imageID

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    generation_match_precondition = 0

    blob.upload_from_filename(source_file_name, if_generation_match=generation_match_precondition)

    return jsonify(
        "File {source_file_name} uploaded to {destination_blob_name}."
    ), 200
    


# '''
# Parameter will need to include student and test IDs
# This will need to generate the ID of the scanned document using the parameters (in a way that keeps them identifiable)
# Should store the image in the Firestore db with that generated ID
# Should return stored ID and success code if applicable
# '''
# @app.route("/upload_scan", methods = ['POST'])
# def upload_scan():
#     metaData = json.loads(request.data)
#     studentID = metaData["studentID"]
#     testID = metaData["testID"]
#     imageData = studentID + testID


    
#     doc_ref = db.collection("users").document(imageData)
#     doc_ref.set({"image"})
#     doc_ref = db.collection("users").document("alovelace")
#     doc_ref.set({"first": "Ada", "last": "Lovelace", "born": 1815})
#     return jsonify("Success"), 200


app.run(debug = True)


project_id = "educaid-406000"
location = "us"
file_path = "C:/Users/Wepea Buntugu/Desktop/Calculus miscellaneous/Calculus assignment 2.pdf"
processor_display_name = "Paper Test Digitizer"



def quickstart(
        project_id: str, 
        location: str, 
        file_path: str, 
        processor_display_name: str = "Paper Test Digitizer",
):

    client = documentai.DocumentProcessorServiceClient()

    
  # The full resource name of the location, e.g.:
    # `projects/{project_id}/locations/{location}`
    parent = client.common_location_path(project_id, location)


    # Create a Processor
    processor = client.create_processor(
        parent=parent,
        processor=documentai.Processor(
            type_="OCR_PROCESSOR",  # Refer to https://cloud.google.com/document-ai/docs/create-processor for how to get available processor types
            display_name=processor_display_name,
        ),
    )

    # Print the processor information
    print(f"Processor Name: {processor.name}")


    # Read the file into memory
    with open(file_path, "rb") as image:
        image_content = image.read()

    # Load binary data
    raw_document = documentai.RawDocument(
        content=image_content,
        mime_type="application/pdf",  # Refer to https://cloud.google.com/document-ai/docs/file-types for supported file types
    )

    # Configure the process request
    # `processor.name` is the full resource name of the processor, e.g.:
    # `projects/{project_id}/locations/{location}/processors/{processor_id}`
    request = documentai.ProcessRequest(name=processor.name, raw_document=raw_document)

    result = client.process_document(request=request)

    # For a full list of `Document` object attributes, reference this page:
    # https://cloud.google.com/document-ai/docs/reference/rest/v1/Document
    document = result.document

    # Read the text recognition output from the processor
    print("The document contains the following text:")
    print(document.text)


# quickstart(project_id, location, file_path, 
#            processor_display_name)