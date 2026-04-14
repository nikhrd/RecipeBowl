from transformers import pipeline

# Load once (important)
generator = pipeline("text-generation", model="gpt2")

def generate_recipe_local(ingredients):
    prompt = f"""
    Create a cooking recipe using these ingredients: {ingredients}.
    Include ingredients and step-by-step instructions.
    """

    result = generator(
        prompt,
        max_length=200,
        num_return_sequences=1,
        temperature=0.7
    )

    return result[0]["generated_text"]