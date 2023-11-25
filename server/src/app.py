from flask import Flask
from config.config import Config
from controller.grade_controller import grade


app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Welcome to EducAid API</p>"


app.register_blueprint(grade, url_prefix="/grade")

if __name__ == "__main__":
    app.run(debug=Config.DEBUG)
