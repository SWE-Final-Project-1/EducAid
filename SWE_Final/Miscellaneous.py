import csv 
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
import io
from flask import Flask

from google.api_core.client_options import ClientOptions
from google.cloud import documentai 
from flask import Flask, json, request, jsonify, Response
from flask_cors import CORS
import csv 
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
import io
import datetime
import re

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


def create_hash(school, student_class):
    #Cut first two letters from school and class 
    school_slice = school[0:2]
    class_slice = str(student_class)

    code = class_slice + school_slice
    return code

'''Will receive a file object, returns csv content containing student IDs '''
def edit_csv(file_object, school, student_class):
    codeGenerator = create_hash(school, student_class)

    #Create file object from contents of file using io module
    in_file_object = io.StringIO(file_object.read().decode('utf-8'))
    
    #Create csv handling object using above created file object 
    csv_reader = csv.reader(in_file_object)
    data_in_file = list(csv_reader)
    print(data_in_file)

    #Create new row with student ID
    data_in_file[0].append('Student ID')

    #Populate row using school and class hash
    current_number = 1
    for row in data_in_file[1:]:
        row.append(codeGenerator + str(current_number))
        current_number += 1

    print(data_in_file)

    #Create file object to write the edited file back
    out_file_object = io.StringIO()

    csv_writer = csv.writer(out_file_object)

    csv_writer.writerows(data_in_file)

    modified_student_data = out_file_object.getvalue()

    return modified_student_data
    

def digitize_submission(
        project_id: str, 
        location: str, 
        file_object, 
        processor_display_name: str,
):
    client = documentai.DocumentProcessorServiceClient()
    
  # The full resource name of the location, e.g.:
    # `projects/{project_id}/locations/{location}`
    parent = client.common_location_path(project_id, location)

    #Create in-memory file to allow for file handling without downloading
    # with open(file_object):
    image_content = file_object.read()
    file_object.close()

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

    request = documentai.ProcessRequest(name= name, raw_document=raw_document )

    result = client.process_document(request=request)

    document = result.document

    #Create local folder to store files
    path = "./tests"
    if not os.path.exists(path):
        os.mkdir(path)
    
    file_path = path + '/' + "Page 1 Answers v2" + ".txt"

    with open(file_path, 'w', encoding = 'utf-8') as fin:
            fin.write(document.text)
    
    return document.text

    # Read the text recognition output from the processor
    # print("The document contains the following text:")
    # print(document.text)

    #Upon successful completion 

def retrieveID(submission_text):
    pattern = r"ID: ([A-Z0-9]+)"
    match = re.search(pattern, submission_text)
    if match:
        return match.group(1)
    else:
        return False

def parse_marking_scheme(text):
    lines = re.split(r'\n|\t', text)

    # Find the starting point of the mappings
    start_index = None
    for i, line in enumerate(lines):
        print("hello", line)
        if line.startswith("a. ") or line.startswith("1. "):
            start_index = i
            break

    # Check if the start index was found
    if start_index is None:
        return {}

    # Parse the mappings into a dictionary
    mappings = {}
    res_arr = []
    for line in lines[start_index: start_index + 20]:
        if line.strip():  # Check if the line is not empty
            keyValue = line.split('. ')
            print(keyValue)
            key = keyValue[0]
            value = keyValue[1]
            res_arr.append(value.strip())
            mappings[key.strip()] = value.strip()

    return mappings, res_arr

def match_solution(soln, mappings):
    start = "a"
    total = len(mappings)
    result = 0
    for val in soln:
        curr_marking_scheme_answer = mappings[start]
        slash_index = curr_marking_scheme_answer.find("/")
        if slash_index != -1:
            scheme_answers = []
            scheme_answers.append(curr_marking_scheme_answer[:slash_index])
            scheme_answers.append(curr_marking_scheme_answer[slash_index +1:])
            # print(scheme_answers)
            if val == scheme_answers[0] or val == scheme_answers[1]:
                result += 1

        else:
            if curr_marking_scheme_answer == val:
                result += 1
        start = chr(ord(start) + 1)
        if(start == 'u'):
            break
    return result

with open(r"C:\Users\Wepea Buntugu\Desktop\V3_Test_Marking_Scheme.txt", encoding = "utf-8") as fin:
    text = fin.read()
    parsed, res_arr = parse_marking_scheme(text)
    score = match_solution([  'B','D','P', 'F','M','N', 'R',
    'G','U','C','H','L','T', 'Sh', 'Z','j','o','w','s',
    'ch'], parsed)
    print(parsed, res_arr, score)

file_path = r"C:\Users\Wepea Buntugu\Downloads\Page 1 sample answer .pdf"

file_storage_instance = FileStorage(
                        stream = open(file_path, 'rb'), 
                        filename = 'IDFile', 
                        content_type = 'application/pdf'
)
# with open(r"tests\test23.txt", encoding = "utf-8") as fin:
#     print(retrieveID(fin.read()))
# digitize_submission(project_id_value, location_value, file_storage_instance, form_processor_display_name)
# edit_csv(file_storage_instance, "Educaid Primary School", "4")



def upload_class_info(school, student_class, student_names):
    student_list = student_names.split("\n")
    student_list = student_list[0:len(student_list)-1]

    for row in student_list[1:]:
        details = row.split(",")
        student_name = details[0]
        student_gender = details[1]
        student_ID = details[2]

        
    schools_collection_ref = db.collection('Educaid').document('Schools')

    new_school_ref = schools_collection_ref.collection("Alabama_CrimsonTide").document("School_Information")
    new_school_ref.set({"Head Teacher": "Lebron", "Location": "25 Freetown Drive"})

    new_school_ref = schools_collection_ref.collection("Montverde_Academy")
    new_school_ref.document("School_Information").set({"Head Teacher": "Steph", "Location": "City Centre, Bo"})

    classes_ref = new_school_ref.document("Classes")
    class_students_ref = classes_ref.collection("Grade_5").document("Students")
    class_information_ref = classes_ref.collection("Grade_5").document("Class Information")

    class_information_ref.set({"Class_Teacher": "Shai Gilgaeous-Alexander", "Class_Prefect":"Chet"})
    
    students_ref = class_students_ref.collection("2MA5")
    student_info_ref = students_ref.document("Student_Information").set({"Name": "Gradey Barnes", "Gender": "M"})
    student_test_ref = students_ref.document("Tests").set({"TestId": [
                                                                    "MTH1",
                                                                    "LIT1",
                                                                    "MTH2"
                                                                            ],
                                                            "Test_Scores": [
                                                                    34,
                                                                    45, 
                                                                    99
                                                            ]}
            )


   



    # #TODO #4 - Curry 
    # new_school_ref.set({"Head Teacher": "Steph", "Location": "City Centre, Bo"})
    # # new_school_ref = schools_collection_ref.collection("Chino_Hills").document("School_Information")
    # # new_school_ref.set({"Head Teacher": "EasyMoneySniper", "Location": "8 Avenue, Port Loko"})

    
    # #TODO #5 Play with editing documents instead of going doc->collection->doc
    # #Also, use document references a bit more creatively
    # classes_doc_ref.set({"Class_Teacher":"Shai"})

    # single_classes_ref = classes_doc_ref.collection("3CH1")
    # single_classes_ref.set({"Name": "Vai Taylor",
    #                     "Gender": "M"})
    
    # test_ref = single_classes_ref.document("tests")
    # test_ref.set({"testID": "TT1", "testResult": "45", "testDate":datetime.datetime(2023, 12, 9)})
# #     schools_collection_ref.update({
#    u'School_Name': firestore.ArrayUnion([u'Oklahoma Sooners', u'Miami Hurricanes', u'Colorado Bulldogs'])
# # })




    # Add a new document with a generated id to the 'Class' subcollection within the 'School' document
    # classes_ref = school_ref.collection('Class').document()
    # classes_ref.set({'Class Name': student_class})

    # Add a new document with the 'student_ID' as the id to the 'Student' subcollection within the 'Class' document
    # for row in student_names:
    #     student_ref = classes_ref.collection('Student').document('student_ID')
    #     student_ref.set({'Student_ID': row[0]})
    #     student_ref.set({'Student Name': row[0]})
    #     student_ref.set({'Gender': row[0]})

    #     # Add a new document with a generated id to the 'Test Results' subcollection within the 'Student' document
    #     test_result_ref = student_ref.collection('Test Results').document()

    #     test_result_ref.set({'test_name': 'Test Name', 'test_ID': 'DefaultID', 'score': 90})

    return True