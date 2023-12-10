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
import requests


#Firestore imports
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud import storage

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

@app.route('/', methods = ['GET'])
def index():
    return "OCR endpoint"

'''Digitize a test using Document OCR. 
    Will be useful for question 5'''

#TODO - Using placeholder student ID, need to generate ID based on studentName, class and others. Where in flow?
@app.route('/document_ocr/test', methods = ['POST'])
def digitize_submission():
    metaData = json.loads(request.data)
    studentID = metaData["studentID"]
    testID = metaData["testID"]
    imagePath = metaData["imagePath"]

    studentTestID = studentID + testID

    if (process_document_ocr(project_id_value, location_value, imagePath, form_processor_display_name, studentTestID)):
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

    modified_student_data = ""
    filename = "Modified Student Data"
    
    # if 'file' not in request.files:
    #     return jsonify("Student data file not found"), 400

    #Get file sent through POST request
    files = request.files.getlist('file')

    for file in files: 
        modified_student_data = edit_csv(file, school, student_class)
    
    if not (upload_class_info(school, student_class, modified_student_data)):
        return jsonify("Student info upload failed"), 404
    
    response = Response(modified_student_data, content_type='text/csv')
    response.headers['Content-Disposition'] = f'attachment; filename={filename}'

    return response



'''Create a test and upload its marking scheme
    Accept a test type(Literacy/Numeracy), a test date, marking scheme
    Generate a test ID
    Create a records in the db

    Test - Test type, date, ID, marking scheme'''
@app.route("/tests/upload", methods = ['POST'])
def create_test():
    test_type = request.form['test_type']
    test_date = request.form.get('test_date', 'N/A')
    testID = test_type[0:3] + test_date[2:4] + test_date[8:]


    if 'marking_scheme' not in request.files:
        return jsonify("Marking scheme not found"), 400
        
    marking_scheme_file = request.files['marking_scheme']

    in_file_object = io.StringIO(marking_scheme_file.read().decode('utf-8'))
    
    marking_scheme_text = in_file_object.getvalue()
    # return jsonify(marking_scheme_text)

    if(upload_marking_scheme(marking_scheme_text, testID, test_type, test_date)):
        return jsonify("Test successfully created"), 200

    


'''Get all the tests and their information
Useful when attempting to display info to teacher for uploading student test files'''
@app.route("/tests/retrieve", methods = ['GET'])
def get_all_tests():
    all_tests = (
    db.collection("Tests")
    .stream()   
    )

    final_test = []


    for test in all_tests:
        full_test = test.to_dict()
        del full_test["Marking_scheme"]
        full_test["testID"] = test.id
        final_test.append(full_test)
    return jsonify(final_test), 200
    


'''Allow for upload of multiple files under a particular test
   Grade question 1 of the quiz, using matching algo and return score
   Could reuse that same algo for question 2
   Add results to firebase
   Return results document HOW?? - (by classes)?? Priority will be a collective result doc, individual student/class not priority'''

@app.route("/student_submission", methods = ["POST"])
def submit_tests():
    school = request.form["school"]
    student_class = request.form["student_class"]
    student_class = "Grade_"+ student_class
    test_ID = request.form["test_ID"]
    files = request.files.getlist('file[]')
    IDs = []
    marking_scheme_answers = parse_marking_scheme(get_marking_scheme(test_ID))
    new_dict = {}
    new_dict["a"] = "b"
    dummy_answer_list = ["a"]

    # try:
    for file in files:
        # digitized_submission = digitize_submission(project_id_value, location_value, file, form_processor_display_name)
        # studentID = retrieveID(digitized_submission)
        # first_page = get_first_page(file)
        # URL for the OCR API endpoint
        answer_list = digitize_pages(file.read())
        print(answer_list)
        print(marking_scheme_answers)
        grade = match_solution(answer_list, marking_scheme_answers)
        IDs.append(grade)
    return jsonify(IDs)
        # IDs.append(answer_list)

    '''Grade questions, add grades to database and return them in a file (by school), then deploy'''
    #         '''Need another function to break down digitized submission into the different pages, 
    #         list of different pages will be returned using "literacy" delimiter'''
    #         part_one_grade = grade_part_one(part_one)
    #         part_two_grade = grade_part_two(part_two)
    #         part_three_grade = grade_part_three(part_three)
    #         part_four_grade = grade_part_four(part_four)

    #         total_grade = (part_four_grade +
    #                     part_three_grade +
    #                     part_two_grade + 
    #                     part_one_grade)
    #         '''Test timing for individual test grading and total batch of 5 and of 30'''
    #         upload_grades(school, student_class, studentID, test_ID, total_grade)
        
    # except Exception as e:
    #         return jsonify("Error occurred: ", e), 500

    # return jsonify("All tests uploaded and graded successfully"), 200
       













######################################            HELPER FUNCTIONS     #########################################################
'''Return grades in a file'''
def return_grades():
    pass





'''Need to provide the school after selecting which test the student files 
are going to be uploaded under'''
def upload_grades(school, student_class, studentID, testID, grade):
    pass

def match_solution(student_answers, marking_scheme_answers):
    start = "a"
    result = 0
    for student_answer in student_answers:
        curr_marking_scheme_answer = marking_scheme_answers[start]
        slash_index = curr_marking_scheme_answer.find("/")

        if slash_index != -1:
            scheme_answers = []
            scheme_answers.append(curr_marking_scheme_answer[:slash_index])
            scheme_answers.append(curr_marking_scheme_answer[slash_index +1:])
            # print(scheme_answers)
            if student_answer.casefold() == scheme_answers[0].casefold() or student_answer.casefold() == scheme_answers[1].casefold():
                result += 1
                print(student_answer, "+", curr_marking_scheme_answer)


        else:
            if curr_marking_scheme_answer.casefold().encode("utf-8") == student_answer.casefold().encode("utf-8"):
                result += 1
                print(student_answer, "+", curr_marking_scheme_answer, "-", result)

        print(student_answer, "-", curr_marking_scheme_answer)
        start = chr(ord(start) + 1)
        if(start == 'u'):
            break
    return result


def get_marking_scheme(test_ID):
    doc_ref = db.collection("Tests").document(test_ID)

    doc = doc_ref.get()

    doc_dict = doc.to_dict()
  
    return doc_dict["Marking_scheme"]


def parse_marking_scheme(text):
    lines = re.split(r'\n|\t', text)

    # Find the starting point of the scheme_answers
    start_index = None
    for i, line in enumerate(lines):
        if line.startswith("a. ") or line.startswith("1. "):
            start_index = i
            break

    # Check if the start index was found
    if start_index is None:
        return {}

    # Parse the scheme_answers into a dictionary
    scheme_answers = {}
    for line in lines[start_index: start_index + 20]:
        if line.strip():  # Check if the line is not empty
            keyValue = line.split('. ')
            key = keyValue[0]
            value = keyValue[1]
            scheme_answers[key.strip()] = value.strip()

    return scheme_answers


'''Extracts student ID from submission file
Returns false if the ID was not found'''
def retrieveID(submission_text):
    pattern = r"ID: ([A-Z0-9]+)"
    match = re.search(pattern, submission_text)
    if match:
        return match.group(1)
    else:
        return False

# def get_first_page(student_file):
#     file_content = student_file.read()
#     file_like_object = io.BytesIO(file_content)
#     pdf_reader = PyPDF2.PdfReader(file_like_object)
#     first_page = pdf_reader.pages[0]
#     # file_like_object.close()
#     return first_page
        
    

def digitize_pages(file_object):
    url = 'https://app.nanonets.com/api/v2/OCR/Model/15294711-5f6e-4bf3-ac48-79e6b0e74ce5/LabelFile/?async=false&lang=en'
    api_key = '54f9c115-96de-11ee-91d1-e6e501c4925a'

    
    # Open the file in binary mode
    image_content = file_object
        # Prepare data to be sent in the request
    data = {'file': ("placeholder", image_content, 'application/pdf')}  # Assuming the file is a PDF, update the content type as needed

    # Send the request to the OCR API
    response = requests.post(url, auth=requests.auth.HTTPBasicAuth(api_key, ''), files=data)

    first_answer_list = []
    second_answer_list = []
    count_1 = 0
    count_2 = 0
    # first_answer_list.append(response.text)
    first_table = json.loads(response.text)["result"][0]["prediction"][1]["cells"]
    for cell in first_table:
        if ((count_1 % 2) != 0):
            first_answer_list.append(cell["text"])
        count_1 += 1

    second_table = json.loads(response.text)["result"][0]["prediction"][0]["cells"]
    for cell in second_table:
        if((count_2 % 2) != 0):
            second_answer_list.append(cell["text"])
        count_2 += 1
    final_list = first_answer_list[1:] + second_answer_list

    return final_list
    # return first_answer_list
    

'''Need to allow the function to take the image object that is read from the file passed through html
Need to return the text file that is produced'''
# def digitize_submission(
#         project_id: str, 
#         location: str, 
#         file_object, 
#         processor_display_name: str,
# ):
#     client = documentai.DocumentProcessorServiceClient()
    
#   # The full resource name of the location, e.g.:
#     # `projects/{project_id}/locations/{location}`
#     parent = client.common_location_path(project_id, location)

#     #Create in-memory file to allow for file handling without downloading
#     # with open(file_object):
#     image_content = file_object.read()
#     file_object.close()

#     # Load binary data
#     raw_document = documentai.RawDocument(
#         content=image_content,
#         mime_type="application/pdf",  # Refer to https://cloud.google.com/document-ai/docs/file-types for supported file types
#     )

#     name = client.processor_version_path(
#             project= project_id_value,
#             location= location_value,
#             processor = document_processor_id_value ,
#             processor_version = document_processor_version_id
#         )

#     request = documentai.ProcessRequest(name= name, raw_document=raw_document )

#     result = client.process_document(request=request)

#     document = result.document

#     return document.text



'''Uploads marking scheme to the test firestore database along with the relevant information about the test'''
def upload_marking_scheme(marking_scheme, testID, test_type, test_date):
    test_collection_ref = db.collection("Tests")
    single_test_ref = test_collection_ref.document(testID).set(
        {"Test_type":test_type,
        "Test_date":test_date, 
        "Marking_scheme":marking_scheme}
    )
    return True


def upload_class_info(school, student_class, student_names):
    student_list = student_names.split("\n")
    student_list = student_list[0:len(student_list)-1]

    #Create database
    schools_collection_ref = db.collection('Educaid').document('Schools')
    schools_collection_ref.set({"Activity":"Active"})


    #Add school
    new_school_ref = schools_collection_ref.collection(school)
    new_school_info_ref = new_school_ref.document("School_Information")
    new_school_info_ref.set({"Head Teacher": "N/A", "Location": "N/A"})
    classes_ref = new_school_ref.document("Classes")
    classes_ref.set({"Activity":"Active"})

    #Add class
    final_class = "Grade_" + student_class
    class_students_ref = classes_ref.collection(final_class).document("Students")
    class_students_ref.set({"Activity":"Active"})
    class_information_ref = classes_ref.collection(final_class).document("Class_Information")
    class_information_ref.set({"Class_Teacher": "N/A", "Class_Prefect":"N/A"})


#Add individual student information
    for row in student_list[1:]:
        details = row.split(",")
        student_name = details[0]
        student_gender = details[1]
        student_ID = details[2]
        students_ref = class_students_ref.collection(student_ID)
        student_info_ref = students_ref.document("Student_Information").set({"Name": student_name, "Gender": student_gender})
        # student_test_ref = students_ref.document("Tests").set({"TestId": [],
        #                                                     "Test_Scores": []}
        #     )

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
    



app.run() 