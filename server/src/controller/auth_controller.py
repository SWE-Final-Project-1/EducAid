from flask import Blueprint, request, redirect, session
from flask_login import login_user, logout_user, current_user
from firebase_admin import firestore
from werkzeug.security import generate_password_hash, check_password_hash
from config.db import db
from auth.oauth import oauth
from config.config import Config
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
            # login_user(user.to_dict())
            session['user'] = user.to_dict()

            return {"msg": "Login successful", "user": user.to_dict()},200
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
                "firstName": first_name,
                "last_name": last_name,
                "role": role,
                "emailAddress": email_address,
                "passwordHash": password_hash,
                "createdAt": firestore.SERVER_TIMESTAMP,
            }
        )

        # login_user(new_user_ref[1].get().to_dict())
        session['user'] = new_user_ref[1].get().to_dict()

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

    user_exists = (
        app_user_ref.where("microsoftId", "==", user_info.get("oid")).limit(1).stream()
    )

    if not user_exists:
        me = app_user_ref.add(
            {
                "username": user_info.get("name"),
                "emailAddress": user_info.get("email"),
                "microsoftId": user_info.get("oid"),
            }
        )
        # login_user(me[1].get().to_dict())
        session['user'] = me[1].get().to_dict()
    else:
        # login_user(user_exists.to_dict())
        session['user'] = user_exists.to_dict()

    return redirect(Config.CLIENT_URL)


@auth.route("/user", methods=["GET"])
def get_user():
    current = session.get('user')
    if current is None:
        return {"msg": "no user"}
    return current 


@auth.route("/logout")
def logout():
    # logout_user()
    session.pop('user', None)
    return redirect("/")
