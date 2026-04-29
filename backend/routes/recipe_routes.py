from flask import Blueprint, request, jsonify
from utils.decorators import token_required
from utils.recipe_engine import find_best_recipes
import os
from utils.image_model import detect_ingredients
from utils.nutrition_engine import analyze_nutrition, classify_diet

recipe_bp = Blueprint('recipe', __name__)

def init_recipe_routes(db):

    @recipe_bp.route('/generate', methods=['POST'])
    @token_required
    def generate_recipe(user_data):
        data = request.json
        print("Request data:", request.json)
        
        if not data:
            return jsonify({"error": "No data received"}), 400

        ingredients = data.get("ingredients")
        cuisine = data.get("cuisine", "")
        print("Ingredients:", ingredients)
        if not ingredients:
            return jsonify({"error": "Ingredients missing"}), 400

        results = find_best_recipes(ingredients, cuisine)
        return jsonify({
            "recipes": results
        })
        
    @recipe_bp.route('/generate-from-image', methods=['POST'])
    @token_required
    def generate_from_image(user_data):
        if 'image' not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        image = request.files['image']
        cuisine = request.form.get("cuisine", "")
        print("FILES:", request.files)
        filepath = os.path.join("uploads", image.filename)
        os.makedirs("uploads", exist_ok=True)

        image.save(filepath)

    # Detect ingredients
        ingredients = detect_ingredients(filepath)

    # Convert to string
        ingredients_str = ", ".join(ingredients)

    # Use existing engine
        recipes = find_best_recipes(ingredients_str, cuisine)

        return jsonify({
            "detected": ingredients,
            "recipes": recipes
        })
        
    @recipe_bp.route('/save', methods=['POST'])
    @token_required
    def save_recipe(user_data):
        data = request.json

        recipe = {
            "user_id": user_data["user_id"],
            "title": data.get("title", data.get("Title")),
            "ingredients": data.get("ingredients", data.get("Ingredients")),
            "instructions": data.get("instructions", data.get("Instructions")),
            "nutrition": data.get("nutrition"),
            "allergens": data.get("allergens"),
            "diet": data.get("diet")
        }

        db.saved_recipes.insert_one(recipe)

        return jsonify({"message": "Recipe saved!"})

    @recipe_bp.route('/saved', methods=['GET'])
    @token_required
    def get_saved_recipes(user_data):
        recipes = []
        for r in db.saved_recipes.find({"user_id": user_data["user_id"]}):
            r["_id"] = str(r["_id"])
            recipes.append(r)
        return jsonify({"recipes": recipes})

    @recipe_bp.route('/saved/<recipe_id>', methods=['DELETE'])
    @token_required
    def delete_saved_recipe(user_data, recipe_id):
        from bson.objectid import ObjectId
        db.saved_recipes.delete_one({"_id": ObjectId(recipe_id), "user_id": user_data["user_id"]})
        return jsonify({"message": "Recipe deleted!"})

    return recipe_bp