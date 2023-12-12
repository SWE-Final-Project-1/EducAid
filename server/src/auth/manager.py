from flask_login import LoginManager, current_user
from config.db import db

login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    # print(db.collection("app_users").document(user_id).get())
    return {} 
