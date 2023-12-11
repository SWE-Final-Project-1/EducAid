from flask import Flask
from flask_cors import CORS
from config.config import Config
from controller.grade_controller import grade
from controller.auth_controller import auth
from controller.assignment_controller import assignment
from controller.people_controller import people
from controller.notification_controller import notification
from ws import socketio


app = Flask(__name__)
app.secret_key = "super secret key"
app.config["CORS_HEADERS"] = "Content-Type"

CORS(
    app,
    supports_credentials=True,
    resources={
        r"/*": {
            "origins": "http://localhost:5173",
        },
    },
)


# socketio.init_app(
#     app,
#     cors_allowed_origins=[
#         "*",
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#     ],
# )


@app.route("/")
def hello_world():
    return "<p>Welcome to EducAid API</p>"


app.register_blueprint(assignment, url_prefix="/assignment")
app.register_blueprint(people, url_prefix="/people")
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(grade, url_prefix="/grade")
app.register_blueprint(notification, url_prefix="/notification")

if __name__ == "__main__":
    app.run(debug=Config.DEBUG)
