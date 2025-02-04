import os
from flask import Blueprint, current_app, flash, jsonify, redirect, render_template, request, url_for, app
from flask_login import current_user, login_required
from flask_wtf import FlaskForm
from extensions import db
from werkzeug.utils import secure_filename

profile = Blueprint('profile', __name__)


@profile.route('/profile')
@login_required
def profilePage():
    form = ProfileForm()  # Create form instance for CSRF token
    return render_template('profile.html', user=current_user, form=form)

# Display user level as a string
@profile.app_template_filter('level_string')
def level_string(level):
    return {1: 'Beginner', 2: 'Intermediate', 3: 'Advanced'}.get(level, 'Unknown')

# Profile pic section
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class ProfileForm(FlaskForm):
    pass  # Only needed for CSRF protection

@profile.route('/upload_profile_picture', methods=['POST'])
@login_required
def upload_profile_picture():
    form = ProfileForm()
    
    if not form.validate():
        flash('CSRF validation failed')
        return redirect(url_for('profile.profilePage'))
        
    if 'profile_pic' not in request.files:
        flash('No file part')
        return redirect(url_for('profile.profilePage'))
    
    file = request.files['profile_pic']
    
    if file.filename == '':
        flash('No selected file')
        return redirect(url_for('profile.profilePage'))
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filename = f"{current_user.id}_{filename}"
        
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        current_user.profile_pic = filename
        db.session.commit()
        
        flash('Profile picture updated successfully!')
        return redirect(url_for('profile.profilePage'))
    
    flash('Invalid file type or file size exceeded')
    return redirect(url_for('profile.profilePage'))