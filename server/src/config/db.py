from firebase_admin import credentials, firestore, initialize_app
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(current_dir, "firebase_config.json")

cred = credentials.Certificate(config_path)
default_app = initialize_app(cred)

db = firestore.client()