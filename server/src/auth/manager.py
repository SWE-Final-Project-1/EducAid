from flask_login import LoginManager, current_user

login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    pass
    # return User.query.filter_by(user_id=user_id).first()
