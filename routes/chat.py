from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
from openai import OpenAI
import logging
import os
from dotenv import load_dotenv
from extensions import db

chat = Blueprint('chat', __name__)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

#Fetch api and set up client
load_dotenv()
API_KEY = os.getenv("API_KEY")

client = OpenAI(
    api_key=API_KEY  # From .env file
)

@chat.route('/chat')
@login_required
def index():
    return render_template('chat.html')

@chat.route('/send_message', methods=['POST'])
def send_message():
    user_input = request.json.get('message')

    # System message to set the AI's behavior
    system_message = {
        "role": "system",
        "content": """
        You are a helpful and patient Japanese language tutor. Your goal is to assist users in learning Japanese by:
        1. Explaining grammar, vocabulary, and sentence structures clearly.
        2. Providing examples in Japanese with English translations.
        3. Correcting mistakes politely and offering suggestions for improvement.
        4. Avoiding off-topic conversations and staying focused on teaching Japanese.
        5. Using polite and encouraging language to motivate the learner.
        6. Respond with concise answers. Keep your responses brief and to the point. Max 400 characters.
        7. Speak in english with examples etc being in japanese
        """
    }

    # Prepare the messages
    messages = [
        system_message,
        {"role": "user", "content": user_input}
    ]
    logging.debug("Sending request to OpenAI API...")
    try:
        # Call to the OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.5,
            max_tokens=400
        )

        logging.debug("Received response from OpenAI API.")

        # Extract response
        ai_response = response.choices[0].message.content

        # Return the response as JSON
        return jsonify({"response": ai_response})

    except Exception as e:
        # Log the error and return a 500 response
        print(f"Error in send_message: {e}")
        return jsonify({"error": str(e)}), 500