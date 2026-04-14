# Basic nutrition database (extendable)
nutrition_db = {
    "chicken": {"calories": 200, "protein": 30, "fat": 8},
    "rice": {"calories": 130, "carbs": 28},
    "egg": {"calories": 70, "protein": 6, "fat": 5},
    "butter": {"calories": 100, "fat": 11},
    "milk": {"calories": 50, "protein": 3, "fat": 2},
    "cheese": {"calories": 110, "protein": 7, "fat": 9},
    "tomato": {"calories": 20, "carbs": 5},
    "onion": {"calories": 40, "carbs": 9}
}

# Allergen database
allergens_db = {
    "milk": "Dairy",
    "cheese": "Dairy",
    "butter": "Dairy",
    "egg": "Egg",
    "peanut": "Peanut",
    "wheat": "Gluten"
}

def analyze_nutrition(ingredients_text):
    ingredients = ingredients_text.lower().split(",")

    total = {
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fat": 0
    }

    detected_allergens = set()

    for item in ingredients:
        item = item.strip().lower()

        # Nutrition
        for key, data in nutrition_db.items():
            if key in item:
                for k in total:
                    total[k] += data.get(k, 0)

        # Allergens
        for key, allergen in allergens_db.items():
            if key in item:
                detected_allergens.add(allergen)

    return total, list(detected_allergens)

def classify_diet(ingredients_text):
    text = ingredients_text.lower()

    if "chicken" in text or "meat" in text:
        return "Non-Vegetarian"
    elif "egg" in text:
        return "Eggetarian"
    elif "milk" in text or "cheese" in text:
        return "Vegetarian"
    else:
        return "Vegan"