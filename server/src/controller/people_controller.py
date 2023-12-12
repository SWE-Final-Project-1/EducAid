from flask import Blueprint, request, session
from config.config import Config
from config.db import db
import json

people = Blueprint("people", __name__)


@people.route("/", methods=["GET"])
def retrieve_students():
    try:
        # school_name = request.args.get("school")
        instructor_id = session.get("user").get("id")
        students_ref = db.collection("students")

        if instructor_id:
            query = students_ref.where("instructorId", "==", instructor_id)
        else:
            query = students_ref
        students = query.stream()

        students_data = [
            {"id": student.id, **student.to_dict()} for student in students
        ]

        return students_data, 200

    except Exception as e:
        return {"error": str(e)}, 500


@people.route("/", methods=["POST"])
def create_student():
    try:
        req = json.loads(request.data)
        student_ref = db.collection("students").document()
        student_ref.set(req)

        return {"id": student_ref.id, **req}, 201

    except Exception as e:
        return {"error": str(e)}, 500
