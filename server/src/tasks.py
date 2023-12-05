from celery import Celery
from config.config import Config
from constants.LLM_config import SYSTEM_INSTRUCTIONS, AI_ROLE
from config.db import db
from ws import socketio
from firebase_admin import firestore
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from msrest.authentication import CognitiveServicesCredentials
import pandas as pd
import os
import time
import ai21


ai21.api_key = Config.LLM_API_KEY
celery = Celery(
    "tasks", broker=Config.CELERY_BROKER_URL, backend=Config.CELERY_RESULT_BACKEND
)


@celery.task()
def batch_grade(assignment_id):
    try:
        assignment_ref = db.collection("assignments").document(assignment_id)
        assignment_data = assignment_ref.get().to_dict()

        print(assignment_data)

        if not assignment_data:
            return {"msg": f"Assignment with ID {assignment_id} not found"}, 404

        print("go here")
        submissions_ref = db.collection("submissions").where(
            "assignmentId", "==", assignment_id
        )

        submissions = submissions_ref.stream()
        print(submissions)

        for submission in submissions:
            submission_data = submission.to_dict()
            print(submission_data)
            submission_id = submission.id

            essay_text = extract_text(submission_data.get("submissionURL"))
            print(essay_text)

            grading_result = auto_grade(
                name=assignment_data.get("name"),
                rubric=assignment_data.get("rubric"),
                prompt=assignment_data.get("prompt"),
                essay=essay_text,
            )

            print(grading_result)

            update_submission(submission_id, grading_result)

        print("grading complete")
        # socketio.emit("grading_complete", {"assignmentId": assignment_id})

    except Exception as e:
        print(e)


@celery.task()
def batch_onboard(file_data, school, grade):
    try:
        df = pd.read_excel(file_data)
        if not all(
            field in df.columns for field in ["firstname", "lastname", "age", "gender"]
        ):
            print({"error": "Missing required fields in Excel file"})

        collection_ref = db.collection("students")
        for index, row in df.iterrows():
            student_data = {
                "firstName": row["firstname"],
                "lastName": row["lastname"],
                "age": row["age"],
                "gender": row["gender"],
                "school": school,
                "grade": grade,
            }
            print(student_data)
            collection_ref.add(student_data)

        print("onboarding complete")
    except Exception as e:
        print(e)


def extract_text(submission_url):
    try:
        subscription_key, endpoint = os.environ.get("VISION_KEY"), os.environ.get(
            "VISION_ENDPOINT"
        )
        computervision_client = ComputerVisionClient(
            endpoint, CognitiveServicesCredentials(subscription_key)
        )

        read_image_url = submission_url
        read_response = computervision_client.read(read_image_url, raw=True)
        read_operation_location = read_response.headers["Operation-Location"]
        operation_id = read_operation_location.split("/")[-1]

        while True:
            read_result = computervision_client.get_read_result(operation_id)
            if read_result.status not in ["notStarted", "running"]:
                break
            time.sleep(1)

        res = ""

        if read_result.status == OperationStatusCodes.succeeded:
            for text_result in read_result.analyze_result.read_results:
                for line in text_result.lines:
                    res += line.text + " "
        return res
    except Exception as e:
        print(e)


def auto_grade(name, rubric, prompt, essay):
    try:
        prompt = f"""
            System Instructions:
            {SYSTEM_INSTRUCTIONS}

            AI_ROLE:
            {AI_ROLE}

            Course Information:
            {name}

            Rubric:
            {rubric}

            Assignment Instructions:
            {prompt}

            Essay:
            {essay}
            """
        response = ai21.Completion.execute(
            model="j2-ultra",
            prompt=prompt,
            numResults=1,
            maxTokens=1500,
            temperature=0.7,
            topP=1,
        )

        return response.completions[0].data.text
    except Exception as e:
        print(e)


def update_submission(submission_id, grading_result):
    try:
        grade_results_ref = db.collection("grade_results").document()
        grade_results_ref.set(
            {
                # "gradeRubric": grading_result["grade_rubric"],
                # "gradeResultScore": grading_result["grade_results_score"],
                # "gradeResultComments": grading_result["grade_results_comments"],
                "submissionId": submission_id,
                "gradeResults": grading_result,
                "gradedAt": firestore.SERVER_TIMESTAMP,  # Automatically set to the current timestamp
            }
        )
    except Exception as e:
        print(e)
