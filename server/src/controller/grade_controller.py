from flask import Blueprint, request, session
import ai21
from config.config import Config
from config.db import db
from constants.LLM_config import SYSTEM_INSTRUCTIONS, AI_ROLE, RUBRIC
from firebase_admin import firestore
from datetime import datetime

from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

import time
import os
import json
import base64
import uuid

grade = Blueprint("grade", __name__)
ai21.api_key = Config.LLM_API_KEY
blob_service_client = BlobServiceClient.from_connection_string(
    Config.AZURE_STORAGE_CONNECTION_STRING
)


@grade.route("/", methods=["POST"])
def auto_grade():
    try:
        req = request.form

        instructor_id = session.get("user").get("id")
        file = request.files.get("file")
        file_extension = req.get("fileExtension")
        student_id = req.get("studentId")
        assignment_id = req.get("assignmentId")

        assignment_ref = db.collection("assignments").document(assignment_id)
        assignment_data = assignment_ref.get().to_dict()

        name = assignment_data.get("name")
        rubric = assignment_data.get("rubric")
        prompt = assignment_data.get("prompt")

        print(file)

        blob_client = blob_service_client.get_blob_client(
            container="educaid", blob=f"{uuid.uuid4().hex}.{file_extension}"
        )

        blob_client.upload_blob(file.read())

        assignment_url = (
            f"https://educaidblob.blob.core.windows.net/educaid/{blob_client.blob_name}"
        )

        print(assignment_url)

        essay = extract_text(assignment_url)
        print(essay)

        if not (name or rubric or prompt or essay):
            return {"msg": "Please provide all required fields"}, 400

        _prompt = f"""
            System Instructions:
            {SYSTEM_INSTRUCTIONS}

            AI_ROLE:
            {AI_ROLE}

            Course Information:
            {name}

            Rubric:
            {RUBRIC}

            Assignment Instructions:
            {prompt}

            Essay:
            {essay}
            """
        response = ai21.Completion.execute(
            model="j2-ultra",
            prompt=_prompt,
            numResults=1,
            maxTokens=1500,
            temperature=0.1,
            topP=1,
        )
        print(response.completions[0].data.text)

        submission_data = {
            "assignmentId": assignment_id,
            "studentId": student_id,
            "submissionDate": firestore.SERVER_TIMESTAMP,
            "submissionURL": assignment_url,
            "instructorId": instructor_id,
        }

        submission_ref = db.collection("submissions").add(submission_data)

        grade_results_data = {
            "submissionId": submission_ref[1].id,
            "feedback": response.completions[0].data.text,
            "gradedAt": firestore.SERVER_TIMESTAMP,
            "instructorId": instructor_id,
        }

        grade_results_ref = db.collection("gradeResults").add(grade_results_data)
        return {
            "submissionId": submission_ref[1].id,
            "feedback": response.completions[0].data.text,
            "gradedAt": datetime.now(),
            "instructorId": instructor_id,
        }, 200
    except Exception as e:
        print(e)
        return {"error": str(e)}, 500



@grade.route("/submissions/<assignment_id>", methods=["GET"])
def retrieve_submissions_by_assignment(assignment_id):
    try:
        print(assignment_id)
        submissions_ref = db.collection("submissions").where("assignmentId", "==", assignment_id)
        submissions = []
        for submission in submissions_ref.stream():
            submissions.append(
                {"id": submission.id, **submission.to_dict()}
            )
        print(submissions)
        return submissions, 200
    except Exception as e:
        print(e)
        return {"error": str(e)}, 500

@grade.route("/submit", methods=["POST"])
def submit_assignment():
    try:
        req = request.form

        instructor_id = session.get("user").get("id")
        file = request.files.get("file")
        file_extension = req.get("fileExtension")
        student_id = req.get("studentId")
        assignment_id = req.get("assignmentId")

        blob_client = blob_service_client.get_blob_client(
            container="educaid", blob=f"{uuid.uuid4().hex}.{file_extension}"
        )

        blob_client.upload_blob(file.read())

        assignment_url = (
            f"https://educaidblob.blob.core.windows.net/educaid/{blob_client.blob_name}"
        )
    

        submission_data = {
            "assignmentId": assignment_id,
            "studentId": student_id,
            "submissionDate": firestore.SERVER_TIMESTAMP,
            "submissionURL": assignment_url,
            "instructorId": instructor_id,
        }

        submission_ref = db.collection("submissions").add(submission_data)

        return {}, 200
    except Exception as e:
        print(e)
        return {"error": str(e)}, 500


def extract_text(file_data):
    subscription_key = Config.VISION_KEY

    endpoint = Config.VISION_ENDPOINT

    computervision_client = ComputerVisionClient(
        endpoint, CognitiveServicesCredentials(subscription_key)
    )

    read_image_url = file_data

    read_response = computervision_client.read(read_image_url, raw=True)

    # Get the operation location (URL with an ID at the end) from the response
    read_operation_location = read_response.headers["Operation-Location"]
    # Grab the ID from the URL
    operation_id = read_operation_location.split("/")[-1]

    # Call the "GET" API and wait for it to retrieve the results
    while True:
        read_result = computervision_client.get_read_result(operation_id)
        if read_result.status not in ["notStarted", "running"]:
            break
        time.sleep(1)

    res = ""
    # Print the detected text, line by line
    if read_result.status == OperationStatusCodes.succeeded:
        for text_result in read_result.analyze_result.read_results:
            for line in text_result.lines:
                res += line.text + " "
    return res
