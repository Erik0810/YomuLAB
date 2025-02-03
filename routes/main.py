import datetime
import os
from flask import Blueprint, app, flash, jsonify, redirect, render_template, request, url_for
from flask_login import current_user, login_required
from extensions import db
from werkzeug.utils import secure_filename

main = Blueprint('main', __name__)

@main.route('/')
def index():
    if current_user.is_authenticated:
        if current_user.user_level == 0:
            return redirect(url_for('main.test'))
        return redirect(url_for('chat.index'))  # Redirect logged-in users
    
    return render_template('index.html')

@main.route("/test", methods=['GET'])
def test():
    return render_template('test.html')


@main.route('/submit-quiz-results', methods=['POST'])
def submit_quiz_results():
    results = request.json
    
    if current_user.is_authenticated:
        # Update user's level in the database
        current_user.user_level = {
            'beginner': 1,
            'intermediate': 2,
            'advanced': 3
        }.get(results['level'], 1)
        
        # Store test results
        #current_user.last_test_score = results['score']
        #current_user.last_test_percentage = results['percentage']
        #current_user.last_test_date = datetime.datetime.utcnow()
        
        db.session.commit()
    
    # Redirect to chat page
    return jsonify({'redirect': url_for('chat.index')})

@main.route('/quiz-results')
def quiz_results():
    # Render results page
    return render_template('chat.html')

@main.route("/contact", methods=['GET'])
def contact():
    return render_template('contact.html')

@main.route("/about", methods=['GET'])
def about():
    return render_template('about.html')
