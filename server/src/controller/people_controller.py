from flask import Blueprint, request
from config.config import Config

people = Blueprint("people", __name__)

@people.route("/", methods=["GET"])
def retrieve_people():
    pass

