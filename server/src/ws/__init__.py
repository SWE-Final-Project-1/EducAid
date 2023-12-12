from flask import request
from flask_socketio import SocketIO, emit
from config.db import db
from config.config import Config
import json
import datetime

socketio = SocketIO()

@socketio.on('connect')
def socket_connect(data):
    print(f"someone connected to the socket {request.sid}")


@socketio.on('disconnet')
def socket_disconnet(data):
    print(f"someone disconneted from socket {request.sid}")


@socketio.on('new_post')
def handle_new_post(data):
    print(data)
    
@socketio.on('grading_complete')
def handle_new_post(data):
    print(data, "grading complete")
    emit('grading_complete', data)