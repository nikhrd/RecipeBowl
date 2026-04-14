import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
df = pd.read_csv("data/Food Ingredients and Recipe Dataset with Image Name Mapping.csv")
print("Columns:", df.columns)
df.columns = df.columns.str.strip()
# Combine ingredients into one string (adjust column name if needed)
df['combined'] = df['Ingredients'].fillna('')

# Convert text → vectors
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df['combined'])

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
        print(recipe)
        results.append({
            "title": recipe.get("Title", "Recipe"),
            "ingredients": recipe.get("Ingredients", ""),
            "instructions": recipe.get("Instructions", "")
        })

    return results