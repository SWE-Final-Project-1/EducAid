import csv 
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
import io
from flask import Flask


'''Will receive a file object, returns csv content containing student IDs '''


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
    


file_path = r"C:\Users\Wepea Buntugu\Desktop\Test_Student_Data.csv"

file_storage_instance = FileStorage(
                        stream = open(file_path, 'rb'), 
                        filename = 'StudentData', 
                        content_type = 'text/csv'
)

edit_csv(file_storage_instance, "Educaid Primary School", "4")



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

    

#     schools_collection_ref.update({
#    u'School_Name': firestore.ArrayUnion([u'Oklahoma Sooners', u'Miami Hurricanes', u'Colorado Bulldogs'])
# })




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