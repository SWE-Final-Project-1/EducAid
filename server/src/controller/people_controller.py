from flask import Blueprint, request
from config.config import Config
from config.db import db

people = Blueprint("people", __name__)

@people.route("/", methods=["GET"])
def retrieve_students():
    try:
        school_name = request.args.get('school')
        students_ref = db.collection("students")

        if school_name:
            query = students_ref.where("school", "==", school_name)
        else:
            query = students_ref
        students = query.stream()

        students_data = [
            {"id": student.id, **student.to_dict()} for student in students
        ]

        return students_data, 200

    except Exception as e:
        return {"error": str(e)}, 500   


