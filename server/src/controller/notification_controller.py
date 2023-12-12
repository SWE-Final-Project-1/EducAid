from flask import Blueprint, request, session
from config.config import Config
from config.db import db
from firebase_admin import firestore

notification = Blueprint("notification", __name__)


@notification.route("/", methods=["GET"])
def retrive_notification_by_id():
    user_id = session["user"].get("id")
    try:
        query = (
            db.collection("notifications")
            .where("userId", "==", user_id)
            .limit(5)
        )

        notifications = query.get()
        results = [notif.to_dict() for notif in notifications]
        print(results)
        return results, 200

    except Exception as e:
        return {"error": str(e)}, 500
