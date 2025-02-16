from datetime import datetime
from extensions import db, bcrypt
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(60), nullable=False)
    user_level = db.Column(db.Float, nullable=False, default=0.0)
    registration_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    profile_pic = db.Column(db.String(120), nullable=True)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)