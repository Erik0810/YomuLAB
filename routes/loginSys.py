from sqlite3 import IntegrityError
from flask import Blueprint, get_flashed_messages, jsonify, render_template, request, url_for, redirect, flash
from flask_login import login_user, logout_user, login_required, current_user
from extensions import db
from models import User
from forms import LoginForm, RegistrationForm

loginSys = Blueprint('loginSys', __name__)

@loginSys.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            get_flashed_messages()
            return redirect(url_for('main.index'))
        else:
            flash('Invalid username or password.', 'danger')
    return render_template('login.html', form=form)

@loginSys.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        existing_user = User.query.filter_by(username=form.username.data).first()
        if existing_user:
            flash('Username already taken. Please choose another one.', 'danger')
            return render_template('register.html', form=form)

        user = User(username=form.username.data)
        user.set_password(form.password.data)
        db.session.add(user)

        try:
            db.session.commit()
            get_flashed_messages()
            flash('Registration successful! Please log in.', 'success')
            return redirect(url_for('loginSys.login'))
        except IntegrityError:
            db.session.rollback()
            flash('An error occurred. Try again.', 'danger')

    return render_template('register.html', form=form)


@loginSys.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'success')
    return redirect(url_for('main.index'))

@loginSys.route('/tos')
def tos():
    return render_template('tos.html')

@loginSys.route('/privacy')
def privacy():
    return render_template('privacy.html')


