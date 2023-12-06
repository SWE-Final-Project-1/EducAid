from google.api_core.client_options import ClientOptions
from google.cloud import documentai 
from flask import Flask, json, request, jsonify, Response
from flask_cors import CORS
import csv 
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
import io
import datetime


#Firestore imports
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud import storage
import functions_framework

'''Set project variables'''
import os
os.environ["GCLOUD_PROJECT"] = "educaid-406000"
os.environ["GOOGLE_FUNCTION_SOURCE"] ="SWE_Final/main.py"
# Use the application default credentials.
cred = credentials.ApplicationDefault()

#Firestore initialization
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)

#Enable CORS
CORS(app)

#General Document AI variables 
project_id_value = "educaid-406000"
location_value = "us"
file_path = "SWE_Final/EducaidFiles/Literacy Test Marking Scheme detail.pdf"

#Document OCR variables
document_processor_display_name = "Test_Processor"
document_processor_id_value = "8aec39517a59d1a3" # Create processor before running sample
gcs_output_uri_value = "gs://digitized_test/" # Must end with a trailing slash `/`. Format: gs://bucket/directory/subdirectory/
document_processor_version_id = "pretrained-ocr-v1.0-2020-09-23"

#Form parser variables
form_processor_display_name = "Form_parser"
form_processor_id_value = "821f6f6b9cb17026" # Create processor before running sample
gcs_output_uri_value = "gs://digitized_test/" # Must end with a trailing slash `/`. Format: gs://bucket/directory/subdirectory/
form_processor_version_id_value = "pretrained-form-parser-v2.0-2022-11-10"

@functions_framework.http
@app.route('/', methods = ['GET'])
def index():
    return "OCR endpoint"

'''Digitize a test using Document OCR. 
    Will be useful for question 5'''

#TODO - Using placeholder student ID, need to generate ID based on studentName, class and others. Where in flow?
@functions_framework.http
@app.route('/document_ocr/test', methods = ['POST'])
def test():
    metaData = json.loads(request.data)
    studentID = metaData["studentID"]
    testID = metaData["testID"]
    imagePath = metaData["imagePath"]

    studentTestID = studentID + testID

    if (process_document_ocr(project_id_value, location_value, imagePath, document_processor_display_name, studentTestID)):
        return jsonify("File successfully digitized"), 200
    else:
        return jsonify("Error encountered"), 500


#TODO Put student, school and class information into firestore
'''This endpoint collects student data and
    i. Creates new school/class/student info
    ii. Edits school/class/student info'''
@app.route('/student_data', methods = ["POST"])
def generate_student_ID():
   # Access the form data
    school = request.form['school']
    student_class = request.form['student_class']

    file = request.files['file']


    
    modified_student_data = ""
    filename = "Modified Student Data"
    
    if 'file' not in request.files:
        return jsonify("Student data file not found"), 400

    #Get file sent through POST request
    files = request.files.getlist('file')

    for file in files: 
        modified_student_data = edit_csv(file, school, student_class)
    
    if not (upload_class_info(school, student_class, modified_student_data)):
        return jsonify("Student info upload failed"), 404
    
    response = Response(modified_student_data, content_type='text/csv')
    response.headers['Content-Disposition'] = f'attachment; filename={filename}'

    return response


'''Create a test and upload its marking scheme'''
@app.route("/tests", methods = ['POST'])
def create_test():
    test_type = request.form['test_type']
    test_date = request.form.get('test_date', 'N/A')
    testID = test_type[0:3] + test_date[2:4] + test_date[8:]


    if 'marking_scheme' not in request.files:
        return jsonify("Marking scheme not found"), 400
        
    marking_scheme_file = request.files['marking_scheme']

    in_file_object = io.StringIO(file)
    marking_scheme_text = 

    digitized_marking_scheme = digitize_marking_scheme(file, )

    

    # return jsonify(test_type, test_date), 200



'''Get all the tests and their information'''
@app.route("/tests", methods = ['GET'])
def get_all_tests():
    pass
    












######################################            HELPER FUNCTIONS     #########################################################
def upload_grades(school, student_class, studentID, testID, grade):
    pass

'''Accept a test type(Literacy/Numeracy), a test date, marking scheme
    Generate a test ID
    Create a records in the db

    Test - Test type, date, ID, marking scheme'''
def create_test():
    pass

def digitize_marking_scheme(
        paper_marking_scheme,
        project_id: str, 
        location: str, 
        file_path: str, 
        processor_display_name: str,
        studentTestID: str):

        pass
    

'''Uploads marking scheme to the test firestore database along with the relevant information about the test'''
def upload_marking_scheme(marking_scheme, testID, test_type, test_date):
    test_collection_ref = db.collection("Test")
    single_test_ref = test_collection_ref.document(testID).set(
        {"Test_type":test_type,
        "Test_date":test_date, 
        "Marking_scheme":marking_scheme}
    )


'''Information about different collections that will be repeated as a subcollection will be provided as key:value pairs
   in documents.
   Eg. School - Location, headteacher
       Class - Class teacher'''

def upload_class_info(school, student_class, student_names):
    student_list = student_names.split("\n")
    student_list = student_list[0:len(student_list)-1]

    #Create database
    schools_collection_ref = db.collection('Educaid').document('Schools')
    schools_collection_ref.set({"Activity":"Active"})


    #Add school
    new_school_ref = schools_collection_ref.collection(school)
    new_school_ref.document("School_Information").set({"Head Teacher": "N/A", "Location": "N/A"})
    classes_ref = new_school_ref.document("Classes")

    #Add class
    final_class = "Grade_" + student_class
    class_students_ref = classes_ref.collection(final_class).document("Students")
    class_students_ref.set({"Activity":"Active"})
    class_information_ref = classes_ref.collection(final_class).document("Class Information")
    class_information_ref.set({"Class_Teacher": "N/A", "Class_Prefect":"N/A"})


#Add individual student information
    for row in student_list[1:]:
        details = row.split(",")
        student_name = details[0]
        student_gender = details[1]
        student_ID = details[2]
        students_ref = class_students_ref.collection(student_ID)
        student_info_ref = students_ref.document("Student_Information").set({"Name": student_name, "Gender": student_gender})
        student_test_ref = students_ref.document("Tests").set({"TestId": [],
                                                            "Test_Scores": []}
            )

    return True


def process_document_ocr(
        project_id: str, 
        location: str, 
        file_path: str, 
        processor_display_name: str,
        studentTestID: str

):
    client = documentai.DocumentProcessorServiceClient()
    
  # The full resource name of the location, e.g.:
    # `projects/{project_id}/locations/{location}`
    parent = client.common_location_path(project_id, location)

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
            processor = document_processor_id_value ,
            processor_version = document_processor_version_id
        )

    request = documentai.ProcessRequest(name= name, raw_document=raw_document)

    result = client.process_document(request=request)

    document = result.document

    #Create local folder to store files
    path = "./tests"
    if not os.path.exists(path):
        os.mkdir(path)
    
    file_path = path + '/' + studentTestID + ".txt"

    with open(file_path, 'w', encoding = 'utf-8') as fin:
            fin.write(document.text)

    # Read the text recognition output from the processor
    # print("The document contains the following text:")
    # print(document.text)

    #Upon successful completion 
    return True


def create_hash(school, student_class):
    #Cut first two letters from school and class 
    school_slice = school[0:2]
    class_slice = str(student_class)

    code = class_slice + school_slice
    return code

def edit_csv(file_object, school, student_class):
    codeGenerator = create_hash(school, student_class)

    #Create file object from contents of file using io module
    in_file_object = io.StringIO(file_object.read().decode('utf-8'))
    
    #Create csv handling object using above created file object 
    csv_reader = csv.reader(in_file_object)
    data_in_file = list(csv_reader)

    #Create new row with student ID
    data_in_file[0].append('Student ID')

    #Populate row using school and class hash
    current_number = 1
    for row in data_in_file[1:]:
        row.append(codeGenerator + str(current_number))
        current_number += 1

    #Create file object to write the edited file back
    out_file_object = io.StringIO()

    csv_writer = csv.writer(out_file_object)

    csv_writer.writerows(data_in_file)

    modified_student_data = out_file_object.getvalue()

    return modified_student_data
    



app.run(debug=True)