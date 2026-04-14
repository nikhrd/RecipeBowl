import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import ast

# Load dataset
df = pd.read_csv("data/Food Ingredients and Recipe Dataset with Image Name Mapping.csv")
print("Columns:", df.columns)
df.columns = df.columns.str.strip()
# Combine ingredients into one string (adjust column name if needed)
df['combined'] = df['Ingredients'].fillna('')

# Convert text → vectors
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df['combined'])

from utils.nutrition_engine import analyze_nutrition, classify_diet

def format_text_list(text, is_bullet=False):
    if not isinstance(text, str):
        return ""
    text = text.strip()
    if text.startswith('[') and text.endswith(']'):
        try:
            items = ast.literal_eval(text)
            if is_bullet:
                return "\n".join([f"• {str(item).strip()}" for item in items])
            else:
                return "\n".join([f"{i+1}. {str(item).strip()}" for i, item in enumerate(items)])
        except:
            pass
    return text.replace(".,", ".\n").replace("', '", "'\n'")

def find_best_recipes(user_input, top_n=3):
    user_ingredients = user_input.split(",")
    user_ingredients = [i.strip() for i in user_ingredients]

    scores = []

    for idx, row in df.iterrows():
        ingredients = str(row['Ingredients']).lower()

        match_count = sum(1 for i in user_ingredients if i in ingredients)

        scores.append((idx, match_count))

    # Sort by match count
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    top_indices = [idx for idx, _ in scores[:top_n]]

    results = []

    for idx in top_indices:
        recipe = df.iloc[idx]
        ingreds = recipe.get("Ingredients", "")
        formatted_ingreds = format_text_list(ingreds, is_bullet=True)
        
        instructions = recipe.get("Instructions", "")
        formatted_instructions = format_text_list(instructions, is_bullet=False)
        
        nutri, allergens = analyze_nutrition(ingreds)
        diet = classify_diet(ingreds)
        results.append({
            "title": recipe.get("Title", "Recipe"),
            "ingredients": formatted_ingreds,
            "instructions": formatted_instructions,
            "nutrition": nutri,
            "allergens": allergens,
            "diet": diet
        })

    return results