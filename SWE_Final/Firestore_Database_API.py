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
    return "Firestore endpoint"





'''
Upload text info to firestore database
'''

#TODO - Determine the text data that will be sent over to db and how
@app.route("/student", methods = ['POST'])
def upload_info():
    metaData = json.loads(request.data)
    studentID = metaData["studentID"]
    testID = metaData["testID"]
    imageData = studentID + testID


    
    doc_ref = db.collection("users").document(imageData)
    doc_ref.set({"image"})
    doc_ref = db.collection("users").document("alovelace")
    doc_ref.set({"first": "Ada", "last": "Lovelace", "born": 1815})
    return jsonify("Success"), 200





app.run(debug = True)