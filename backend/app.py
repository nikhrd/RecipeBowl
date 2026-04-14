from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from flask import request
import os

from routes.auth_routes import init_auth_routes
from routes.recipe_routes import init_recipe_routes

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# MongoDB Connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["recipebowl_db"]

auth_routes = init_auth_routes(db)
app.register_blueprint(auth_routes, url_prefix="/auth")

recipe_routes = init_recipe_routes(db)
app.register_blueprint(recipe_routes, url_prefix="/recipe")

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

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True)