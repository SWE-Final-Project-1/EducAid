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
    

@people.route("/dashboard", methods=["GET"])
def retrieve_dashboard_stats():
    try:
        # Retrieve total counts
        instructor_id = session.get("user").get("id")
        assignments_count = len(db.collection('assignments').where("instructorId", "==", instructor_id).get())
        submissions_count = len(db.collection('submissions').where("instructorId", "==", instructor_id).get())
        students_count = len(db.collection('students').where("instructorId", "==", instructor_id).get())
        notifications_count = len(db.collection('notifications').where("instructorId", "==", instructor_id).get())

        previous_counts = {
            'assignments': 3,  # Replace with your actual previous count
            'submissions': 2,   # Replace with your actual previous count
            'students': 3,     # Replace with your actual previous count
            'notifications': 4# Replace with your actual previous count
        }

        def calculate_percentage_increase(current, previous):
            return ((current - previous) / previous) * 100

        percentage_increase_assignments = calculate_percentage_increase(assignments_count, previous_counts['assignments'])
        percentage_increase_submissions = calculate_percentage_increase(submissions_count, previous_counts['submissions'])
        percentage_increase_students = calculate_percentage_increase(students_count, previous_counts['students'])
        percentage_increase_notifications = calculate_percentage_increase(notifications_count, previous_counts['notifications'])

        # Prepare response
        response = {
            'total_assignments': assignments_count,
            'total_submissions': submissions_count,
            'total_students': students_count,
            'total_notifications': notifications_count,
            'percentage_increase_assignments': percentage_increase_assignments,
            'percentage_increase_submissions': percentage_increase_submissions,
            'percentage_increase_students': percentage_increase_students,
            'percentage_increase_notifications': percentage_increase_notifications
        }

        return response

    except Exception as e:
        print(f"Error fetching metrics: {e}")
        return {'error': 'Internal server error'}, 500

@people.route("/", methods=["POST"])
def create_student():
    try:
        req = json.loads(request.data)
        student_ref = db.collection("students").document()
        student_ref.set(req)

        return {"id": student_ref.id, **req}, 201

    except Exception as e:
        return {"error": str(e)}, 500
