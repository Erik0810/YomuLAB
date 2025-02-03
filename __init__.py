from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_wtf.csrf import CSRFProtect
from models import User
from extensions import db, bcrypt, login_manager, csrf
from dotenv import load_dotenv
import os
#from models import User

def create_app():
    app = Flask(__name__)

    # Configure the app
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # SQLite database

    UPLOAD_FOLDER = 'static/profile_pics'  # Set the upload folder path
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max file size 16MB

    # Initialize extensions with the app
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    csrf.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Register blueprints
    from routes.main import main
    from routes.chat import chat
    from routes.loginSys import loginSys
    from routes.profile import profile
    app.register_blueprint(main)
    app.register_blueprint(chat)
    app.register_blueprint(loginSys)
    app.register_blueprint(profile)

    # Create database tables
    with app.app_context():
        #db.drop_all()
        db.create_all()

    return app