from flask import Blueprint, request, redirect, session
from flask_login import login_user, logout_user, current_user
from firebase_admin import firestore
from werkzeug.security import generate_password_hash, check_password_hash
from tasks import batch_onboard
from config.db import db
from auth.oauth import oauth
from config.config import Config
from io import BytesIO
from flask_socketio import send, emit
import pandas as pd
import json

auth = Blueprint("auth", __name__)
app_user_ref = db.collection("app_users")


@auth.route("/login", methods=["POST"])
def login():
    try:
        req = json.loads(request.data)

        email_address = req.get("emailAddress")
        password = req.get("password")

        app_user_ref = db.collection("app_users")

        query = app_user_ref.where("emailAddress", "==", email_address).limit(1)

        user = next(query.stream(), None)

        if user is None:
            return {"msg": "User not found"}, 404

        if check_password_hash(
            pwhash=user.to_dict().get("passwordHash"), password=password
        ):
            response = user.to_dict()
            response["id"] = user.id
            session["user"] = response

            return {"msg": "Login successful", "user": response}, 200
        else:
            return {"msg": "Incorrect password"}, 401

    except Exception as e:
        print(e)
        return {"msg": "Something went wrong"}, 500


@auth.route("/signup", methods=["POST"])
def signup():
    try:
        req = json.loads(request.data)
        first_name = req.get("firstName")
        last_name = req.get("lastName")
        email_address = req.get("emailAddress")
        password = req.get("password")
        role = req.get("role")

        app_user_ref = db.collection("app_users")

        existing_user = (
            app_user_ref.where("emailAddress", "==", email_address).limit(1).stream()
        )

        if next(existing_user, None) is not None:
            return {
                "msg": "User with this email already exists"
            }, 409  # 409 Conflict status code

        password_hash = generate_password_hash(password, method="sha256")
        new_user_ref = app_user_ref.add(
            {
                "id": existing_user.id,
                "firstName": first_name,
                "last_name": last_name,
                "role": role,
                "emailAddress": email_address,
                "passwordHash": password_hash,
                "createdAt": firestore.SERVER_TIMESTAMP,
                "hasOnboarded": False,
            }
        )

        # login_user(new_user_ref[1].get().to_dict())
        session["user"] = new_user_ref[1].get().to_dict()

        return {
            "msg": "User successfully created",
            "user": new_user_ref[1].get().to_dict(),
        }, 200
    except Exception as e:
        print(e)
        return {"msg": "Something went wrong"}, 500


@auth.route("/microsoft")
def auth_microsoft():
    microsoft = oauth.microsoft
    microsoft_callback = Config.MICROSOFT_CALLBACK
    return microsoft.authorize_redirect(microsoft_callback)


@auth.route("/microsoft/callback")
def auth_microsoft_callback():
    microsoft = oauth.microsoft
    token = microsoft.authorize_access_token()
    user_info = token["userinfo"]

    print(user_info)

    app_user_ref = db.collection("app_users")

    user_exists = next(
        (
            app_user_ref.where("microsoftId", "==", user_info.get("oid"))
            .limit(1)
            .stream()
        ),
        None,
    )

    if not user_exists:
        me = app_user_ref.add(
            {
                "id": user_exists.id,
                "emailAddress": user_info.get("email"),
                "microsoftId": user_info.get("oid"),
                "firstName": user_info.get("name").split(" ")[0],
                "lastName": user_info.get("name").split(" ")[1],
                "createdAt": firestore.SERVER_TIMESTAMP,
                "role": "Instructor",
                "hasOnboarded": False,
            }
        )
        # login_user(me[1].get().to_dict())
        session["user"] = me[1].get().to_dict()
    else:
        # login_user(user_exists.to_dict())
        print(user_exists)
        response = user_exists.to_dict()
        response["id"] = user_exists.id
        session["user"] = response

    return redirect(Config.CLIENT_URL)


# @auth.route("/onboard", methods=["POST"])
# def onboard_student_data():
#     try:
#         file_data = request.files.get('file')
#         file_type = request.form.get('fileType')
#         school_name = request.form.get('school')
#         grade = request.form.get('grade')
#         instructor_id = request.form.get("instructorId")

#         if file_type.lower() not in ['json', 'xls', 'xlsx']:
#             return {"error": "wrong file format"}, 400

#         print("here")

#         task = batch_onboard.delay(file_data.read(), school_name, grade)

#         app_user_ref = db.collection("app_users").document(instructor_id)
#         doc = app_user_ref.get()

#         if doc.exists:
#             if "hasOnboarded" in doc.to_dict():
#                 app_user_ref.update({"hasOnboarded": True})
#                 print("Document updated successfully.")
#             else:
#                 print("Error: 'hasOnboarded' field does not exist in the document.")
#         else:
#             print("Error: Document does not exist.")

#         return {"msg": "Batch onboarding started", "taskId": task.id}, 200


#     except Exception as e:
#         return {"error": str(e)}, 500
@auth.route("/onboard", methods=["POST"])
def onboard_student_data():
    try:
        file_data = request.files.get("file")
        file_type = request.form.get("fileType")
        school_name = request.form.get("school")
        grade = request.form.get("grade")
        instructor_id = request.form.get("instructorId")

        if file_type.lower() not in ["json", "xls", "xlsx"]:
            return {"error": "wrong file format"}, 400

        print("here")

        task = batch_onboard.delay(file_data.read(), school_name, grade)

        app_user_ref = db.collection("app_users").document(instructor_id)
        doc = app_user_ref.get()

        if doc.exists:
            user_data = doc.to_dict()
            has_onboarded = user_data.get("hasOnboarded", False)

            if not has_onboarded:
                app_user_ref.update({"hasOnboarded": True})
                print("Document updated successfully.")
                # Add the updated user data to the session
                user_data["hasOnboarded"] = True
                user_data["id"] = instructor_id
                session["user"] = user_data
                print("User added to the session.")

            else:
                print("User has already onboarded.")
        else:
            print("Error: Document does not exist.")

        return {"msg": "Batch onboarding started", "taskId": task.id}, 200

    except Exception as e:
        return {"error": str(e)}, 500


@auth.route("/user", methods=["GET"])
def get_user():
    current = session.get("user")
    if current is None:
        return {}, 200
    return current


@auth.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return redirect("/")
