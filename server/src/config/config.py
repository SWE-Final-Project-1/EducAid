import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MICROSOFT_CLIENT_SECRET = os.environ.get("MICROSOFT_CLIENT_SECRET")
    MICROSOFT_CLIENT_ID = os.environ.get("MICROSOFT_CLIENT_ID")
    MICROSOFT_REMOTE_APP = os.environ.get("MICROSOFT_REMOTE_APP")
    MICROSOFT_CALLBACK = os.environ.get("MICROSOFT_CALLBACK")
    API_BASE_URI = os.environ.get("API_BASE_URI")
    AUTHORIZE_URI = os.environ.get("AUTHORIZE_URI")
    ACCESS_TOKEN_URI = os.environ.get("ACCESS_TOKEN_URI")
    JWKS_URI = os.environ.get("JWKS_URI")
    USER_INFO_ENDPOINT = os.environ.get("USER_INFO_ENDPOINT")
    CLIENT_KWARGS = {'scope': 'openid profile email'}
    DATABASE_URI = os.environ.get("DATABASE_URI")
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'None'
    DEBUG = os.environ.get("DEBUG")
    SQLALCHEMY_ECHO = os.environ.get("SQLALCHEMY_ECHO")
    CLIENT_URL = os.environ.get("CLIENT_URL")
    LLM_API_KEY = os.environ.get("LLM_API_KEY")
    VISION_KEY = os.environ.get("VISION_KEY")
    VISION_ENDPOINT = os.environ.get("VISION_ENDPOINT")
    AZURE_STORAGE_CONNECTION_STRING = os.environ.get("AZURE_STORAGE_CONNECTION_STRING")
    CELERY_BROKER_URL = os.environ.get("CELERY_BROKER_URL")
    CELERY_RESULT_BACKEND = os.environ.get("CELERY_RESULT_BACKEND")
