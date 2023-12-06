from google.api_core.client_options import ClientOptions
from google.cloud import documentai 
from flask import Flask, json, request, jsonify

#Firestore imports
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud import storage

'''Set project variables'''
import os
os.environ["GCLOUD_PROJECT"] = "educaid-406000"



# Use the application default credentials.
cred = credentials.ApplicationDefault()

firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)

project_id = "educaid-406000"
location = "us"
file_path = "SWE_Final/EducaidFiles/Literacy Test Marking Scheme detail.pdf"
processor_display_name = "Test_Processor"
input_uri = "https://storage.cloud.google.com/image_scans/SCI342353"


project_id_value = "educaid-406000"
location_value = "us" # Format is "us" or "eu"
processor_id_value = "8aec39517a59d1a3" # Create processor before running sample
gcs_output_uri_value = "gs://digitized_test/" # Must end with a trailing slash `/`. Format: gs://bucket/directory/subdirectory/
processor_version_id_value = "pretrained-ocr-v1.0-2020-09-23"

# @app.route("/", methods = ['GET'])
# def index():
#     return "OCR endpoint"


# #Want to be able to send file from google cloud bucket to ocr api






# app.run(debug = True)




#TODO - Create api endpoint for this
'''Digitize test from local file'''
def quickstart(
        project_id: str, 
        location: str, 
        file_path: str, 
        processor_display_name: str
):

    client = documentai.DocumentProcessorServiceClient()

    
  # The full resource name of the location, e.g.:
    # `projects/{project_id}/locations/{location}`
    parent = client.common_location_path(project_id, location)


    # # Create a Processor
    # processor = client.create_processor(
    #     parent=parent,
    #     processor=documentai.Processor(
    #         type_="OCR_PROCESSOR",  # Refer to https://cloud.google.com/document-ai/docs/create-processor for how to get available processor types
    #         display_name=processor_display_name,
    #     ),
    # )

    # Print the processor information


    # Read the file into memory
    with open(file_path, "rb") as image:
        image_content = image.read()

    # Load binary data
    raw_document = documentai.RawDocument(
        content=image_content,
        mime_type="application/pdf",  # Refer to https://cloud.google.com/document-ai/docs/file-types for supported file types
    )

    name = client.processor_version_path(
            project= project_id_value,
            location= location_value,
            processor = processor_id_value,
            processor_version = processor_version_id_value
        )

    request = documentai.ProcessRequest(name= name, raw_document=raw_document)

    result = client.process_document(request=request)

    document = result.document

    with open('./data/Marking_Scheme.txt', 'w', encoding = 'utf-8') as fin:
            fin.write(document.text)

    # Read the text recognition output from the processor
    print("The document contains the following text:")
    print(document.text)




'''Digitize test using file from google cloud bucket'''
def process_document(project_id, input_uri):
  client = documentai.DocumentProcessorServiceClient()
  processor_id = "8aec39517a59d1a3"
  location = "us" # Format is 'us' or 'eu'
  name = "projects/948116484904/locations/us/processors/8aec39517a59d1a3"
  parent = f"projects/{project_id}/locations/{location}"
  
  # The mime_type can be application/pdf, image/tiff, and image/gif, etc.
  # This example uses application/pdf
  mime_type = "application/pdf"
  storage_client = storage.Client()
  bucket = storage_client.bucket("image_scans")
  blob = bucket.blob("SCI342353")

  # The full resource name of the processor, e.g.:
  # projects/project-id/locations/location/processors/processor-id
  # You must create new processors in the Cloud Console first
  gcs_document = documentai.GcsDocument(
            gcs_uri="https://storage.cloud.google.com/image_scans/SCI342353.pdf", mime_type="application/pdf"
        )
        # Load GCS Input URI into a List of document files
  gcs_documents = documentai.GcsDocuments(documents=[gcs_document])
  input_config = documentai.BatchDocumentsInputConfig(gcs_documents=gcs_documents)
  
 

#   with open(blob, "rb") as image:
#       input_config = documentai.types.InputConfig(
#           gcs_source=documentai.types.GcsSource(uri=input_uri), mime_type=mime_type
#       )

  request = documentai.BatchProcessRequest(
        name=name,
        input_documents=input_config,
    )

      # Use the Document AI client to process the document
  document = client.process_document(request=request)

  print("Document processing completed.")

      # Read the document
  for page in document.pages:
    print(f"Document Page {page.page_number}:")
    print(f"Dimension: {page.dimension}")
    print(f"Layout: {page.layout}")
    print(f"Text: {page.text}")

      # For a full list of Document object attributes, please reference this page:
      # https://googleapis.dev/python/documentai/latest/documentai.types.Document.html

# 
