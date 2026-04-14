from transformers import pipeline
from PIL import Image

# FOOD-SPECIFIC MODEL 
classifier = pipeline("image-classification", model="nateraw/food")

def detect_ingredients(image_path):
    image = Image.open(image_path)

    results = classifier(image)

    labels = [r['label'] for r in results[:5]]

    return labels