import os
import json
from groq import Groq
from dotenv import load_dotenv
load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def format_text_list(items, is_bullet=False):
    if not isinstance(items, list):
        return items
    if is_bullet:
        return "\n".join([f"• {str(item).strip()}" for item in items])
    else:
        return "\n".join([f"{i+1}. {str(item).strip()}" for i, item in enumerate(items)])

def find_best_recipes(user_input, cuisine=""):
    user_ingredients = [i.strip() for i in user_input.split(",")]
    
    system_prompt = f"""You are an expert chef API. 
    Your task is to generate 3 creative recipes using ONLY the provided ingredients.
    Do NOT add extra main ingredients (like meats, vegetables, or cheeses) that are not in the list.
    You MAY assume the user has basic pantry staples: salt, pepper, cooking oil, and water.
    {"The user wants recipes specifically matching this cuisine: " + cuisine if cuisine else ""}
    
    You must return a raw JSON object with a single key "recipes" containing an array of 3 recipe objects.
    Each recipe object must have exactly these keys:
    - "title": (string) The name of the recipe
    - "ingredients": (array of strings) The list of ingredients and their estimated quantities
    - "instructions": (array of strings) Step-by-step cooking instructions
    - "nutrition": (object) with keys "calories", "protein", "carbs", "fat" (all numeric values or strings like "20g")
    - "allergens": (array of strings) any allergens present (e.g. "Dairy", "Nuts")
    - "diet": (string) e.g., "Vegan", "Keto", "Standard"
    
    DO NOT wrap the response in markdown blocks like ```json. Return ONLY valid JSON.
    """
    
    user_prompt = f"Here are my ingredients: {', '.join(user_ingredients)}"
    if cuisine:
        user_prompt += f"\nDesired Cuisine: {cuisine}"

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            response_format={"type": "json_object"}
        )
        
        response_text = completion.choices[0].message.content
        data = json.loads(response_text)
        
        recipes = data.get("recipes", [])
        
        # Format the arrays into strings with newlines so it matches the existing frontend rendering
        for r in recipes:
            if isinstance(r.get("ingredients"), list):
                r["ingredients"] = format_text_list(r["ingredients"], is_bullet=True)
            if isinstance(r.get("instructions"), list):
                r["instructions"] = format_text_list(r["instructions"], is_bullet=False)
                
        return recipes

    except Exception as e:
        print("Error generating recipes from Groq:", e)
        return []