from flask import Flask
from flask_cors import CORS
from config.config import Config
from controller.grade_controller import grade
from controller.auth_controller import auth
from controller.assignment_controller import assignment
from ws import socketio


app = Flask(__name__)
app.secret_key = "super secret key"

CORS(
    app,
    supports_credentials=True,
    resources={
        r"/*": {
            "origins": "http://localhost:5173",
        }
    },
)

socketio.init_app(
    app,
    cors_allowed_origins=[
        "http://localhost:5173",
    ],
)


@app.route("/")
def hello_world():
    return "<p>Welcome to EducAid API</p>"


app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(grade, url_prefix="/grade")
app.register_blueprint(assignment, url_prefix="/assignment")

if __name__ == "__main__":
    # app.run(debug=Config.DEBUG)
    socketio.run(app, debug=Config.DEBUG)