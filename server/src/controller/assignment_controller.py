from flask import Blueprint, request, jsonify, session
import ai21
from config.config import Config
from tasks import batch_grade
from constants.LLM_config import SYSTEM_INSTRUCTIONS, AI_ROLE, RUBRIC
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from firebase_admin import firestore
from flask_cors import CORS
from config.db import db
import json
import base64
import uuid


assignment = Blueprint("assignment", __name__)
blob_service_client = BlobServiceClient.from_connection_string(
    Config.AZURE_STORAGE_CONNECTION_STRING
)


@assignment.route("/", methods=["POST"])
def create_assignment():
    try:
        req = json.loads(request.data)
        name = req.get("name")
        # description = req.get("description")
        due_date = req.get("dueDate")
        rubric = req.get("rubric")
        type = req.get("type")
        prompt = req.get("prompt")
        points = req.get("points")

        assignments_ref = db.collection("assignments")
        assignment_data = {
            "name": name,
            "dueDate": due_date,
            "rubric": rubric,
            "type": type,
            "prompt": prompt,
            "points": points,
        }
        assignments_ref.add(assignment_data)

        return {"message": "Assignment created successfully"}, 201
    except Exception as e:
        print(e)
        return {"error": str(e)}, 500


@assignment.route("/", methods=["GET"])
def retrieve_assignments():
    try:
        assignments_ref = db.collection("assignments")

        assignments = assignments_ref.stream()

        assignments_data = [
            {"id": assignment.id, **assignment.to_dict()} for assignment in assignments
        ]

        return assignments_data, 200

    except Exception as e:
        return {"error": str(e)}, 500


@assignment.route("/<assignment_id>", methods=["GET"])
def retrive_assignment_by_id(assignment_id):
    try:
        assignment_ref = db.collection("assignments").document(assignment_id)
        assignment = assignment_ref.get()

        if assignment.exists:
            assignment_data = assignment.to_dict()
            return assignment_data, 200
        else:
            return {"error": "Assignment not found"}, 404
    except Exception as e:
        print(e)
        return {"error": str(e)}, 500


@assignment.route("/<assignment_id>", methods=["PUT"])
def update_assignment(assignment_id):
    try:
        req = json.loads(request.data)
        name = req.get("name")
        # description = req.get("description")
        due_date = req.get("dueDate")
        rubric = req.get("rubric")
        type = req.get("type")
        prompt = req.get("prompt")
        points = req.get("points")

        assignments_ref = db.collection("assignments")
        assignment_ref = assignments_ref.document(assignment_id)

        if not assignment_ref.get().exists:
            return {"error": f"Assignment with ID {assignment_id} not found"}, 404

        # Update the assignment document
        assignment_ref.update(
            {
                "name": name,
                # "description": description,
                "dueDate": due_date,
                "rubric": rubric,
                "type": type,
                "prompt": prompt,
                "points": points,
            }
        )

        return {
            "message": f"Assignment with ID {assignment_id} updated successfully"
        }, 200

    except Exception as e:
        print(e)
        return {"error": str(e)}, 500


@assignment.route("/<assignment_id>/submission", methods=["POST"])
def create_submission(assignment_id):
    try:
        req = json.loads(request.data)
        student_id = req.get("studentId")
        submission_file = base64.b64decode(req.get("file"))
        submission_file_extension = req.get("fileExtension")

        # Create a reference to the submissions collection
        submissions_ref = db.collection("submissions")

        # Check if the assignment exists
        assignment_ref = db.collection("assignments").document(assignment_id)
        if not assignment_ref.get().exists:
            return {"error": f"Assignment with ID {assignment_id} not found"}, 404

        # Upload the submission file to Azure Blob Storage
        blob_client = blob_service_client.get_blob_client(
            container="educaid", blob=f"{uuid.uuid4().hex}.{submission_file_extension}"
        )
        blob_client.upload_blob(submission_file)
        submission_url = (
            f"https://educaidblob.blob.core.windows.net/educaid/{blob_client.blob_name}"
        )

        # Add a new submission document to the submissions collection
        submission_data = {
            "assignmentId": assignment_id,
            "studentId": student_id,
            "submissionURL": submission_url,
            "submissionDate": firestore.SERVER_TIMESTAMP,
        }

        submissions_ref.add(submission_data)

        return {"message": "Submission created successfully"}, 201

    except Exception as e:
        print(e)
        return {"error": str(e)}, 500


@assignment.route("/<assignment_id>/submissions", methods=["GET"])
def get_submissions(assignment_id):
    try:
        submissions_ref = db.collection("submissions")

        query = submissions_ref.where("assignment_id", "==", assignment_id)
        submissions = query.stream()

        submissions_data = [
            {"id": submission.id, **submission.to_dict()} for submission in submissions
        ]

        return submissions_data, 200

    except Exception as e:
        print(e)
        return {"error": str(e)}, 500


@assignment.route("/<assignment_id>/batch", methods=["POST"])
def batch_grade_submissions(assignment_id):
    try:
        task = batch_grade.delay(assignment_id)
        return {"msg": "Batch grading started", "taskId": task.id}, 200
    except Exception as e:
        print(e)
        return {"message": "Something went wrong"}, 500
