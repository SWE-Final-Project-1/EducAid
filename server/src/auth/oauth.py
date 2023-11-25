from flask import current_app
from authlib.integrations.flask_client import OAuth
from config.config import Config 

oauth = OAuth(current_app)
oauth.register(
    name=Config.MICROSOFT_REMOTE_APP,
    client_id=Config.MICROSOFT_CLIENT_ID,
    client_secret=Config.MICROSOFT_CLIENT_SECRET,
    api_base_url=Config.API_BASE_URI,
    authorize_url=Config.AUTHORIZE_URI,
    access_token_url=Config.ACCESS_TOKEN_URI,
    jwks_uri=Config.JWKS_URI,
    userinfo_endpoint=Config.USER_INFO_ENDPOINT,
    client_kwargs=Config.CLIENT_KWARGS
)
