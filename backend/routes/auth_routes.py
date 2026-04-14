from flask import Blueprint, request, jsonify
from models.user_model import create_user, find_user_by_email
from utils.auth_utils import hash_password, check_password
from utils.auth_utils import generate_token
from utils.decorators import token_required

auth_bp = Blueprint('auth', __name__)

def init_auth_routes(db):

    @auth_bp.route('/signup', methods=['POST'])
    def signup():
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if find_user_by_email(db, email):
            return jsonify({"error": "User already exists"}), 400

        hashed_pw = hash_password(password)
        create_user(db, email, hashed_pw)

        return jsonify({"message": "User created successfully"})

    @auth_bp.route('/login', methods=['POST'])
    def login():
        data = request.json
        email = data.get("email")
        password = data.get("password")

        user = find_user_by_email(db, email)

        if not user or not check_password(password, user["password"]):
            return jsonify({"error": "Invalid credentials"}), 401

        token = generate_token(user)

        return jsonify({
        "message": "Login successful",
        "token": token
        })
    @auth_bp.route('/profile', methods=['GET'])
    @token_required
    def profile(user_data):
        return jsonify({
            "message": "Protected route accessed",
            "user": user_data
        })

    return auth_bp