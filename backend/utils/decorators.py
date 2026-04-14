from functools import wraps
from flask import request, jsonify
from utils.auth_utils import decode_token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Token missing"}), 401

        try:
            token = token.split(" ")[1]  # Remove "Bearer "
            data = decode_token(token)

            if not data:
                return jsonify({"error": "Invalid token"}), 401

        except:
            return jsonify({"error": "Token error"}), 401

        return f(data, *args, **kwargs)

    return decorated