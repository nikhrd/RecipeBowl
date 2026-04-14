'''import requests
import os
import time

HF_API_KEY = os.getenv("HF_API_KEY")

API_URL = "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.3"

headers = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "Content-Type": "application/json"
}

def generate_recipe_ai(ingredients):
    prompt = f"""
    [INST]
    Generate a detailed cooking recipe using these ingredients:
    {ingredients}

    Include:
    - Recipe name
    - Ingredients list
    - Step-by-step instructions
    [/INST]
    """

    for attempt in range(3):
        try:
            response = requests.post(API_URL, headers=headers, json={"inputs": prompt, "options": {"wait_for_model": True} # Add this
    }
)

            print("STATUS CODE:", response.status_code)
            print("RAW TEXT:", response.text)

            result = response.json()

            if isinstance(result, list):
                return result[0].get("generated_text", "No recipe generated")

            if "error" in result:
                return f"HF ERROR: {result['error']}"

        except Exception as e:
            return f"EXCEPTION: {str(e)}"

    return "Failed to generate recipe."'''