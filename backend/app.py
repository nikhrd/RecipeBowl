from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from flask import request
import os

from routes.auth_routes import init_auth_routes

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["recipebowl_db"]

auth_routes = init_auth_routes(db)
app.register_blueprint(auth_routes, url_prefix="/auth")

@app.route('/')
def home():
    return jsonify({"message": "Connected to MongoDB!"})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    
    user = {
        "email": data.get("email"),
        "password": data.get("password")
    }

    db.users.insert_one(user)

    return jsonify({"message": "User created!"})

if __name__ == '__main__':
    app.run(debug=True)