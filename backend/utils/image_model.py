import os
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# Initialize Groq client for text processing
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Initialize Local Vision Model (BLIP)
print("Loading BLIP image captioning model locally. This may take a few seconds on first run...")
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
vision_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
print("BLIP model loaded successfully!")

def detect_ingredients(image_path):
    try:
        # Step 1: Get image caption using local BLIP model
        image = Image.open(image_path).convert('RGB')
        inputs = processor(image, return_tensors="pt")
        
        out = vision_model.generate(**inputs, max_new_tokens=50)
        caption = processor.decode(out[0], skip_special_tokens=True)
            
        print("Image Caption Detected:", caption)
        
        if not caption:
            return []

        # Step 2: Extract ingredients from caption using Groq
        completion = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant. I will give you an image caption. Extract all raw food ingredients mentioned in the caption. Return ONLY a comma-separated list of the ingredients. If there are no food ingredients, return 'Unknown'."
                },
                {
                    "role": "user",
                    "content": f"Caption: {caption}"
                }
            ],
            temperature=0.2,
            max_tokens=100
        )
        
        response_text = completion.choices[0].message.content.strip()
        
        if "Unknown" in response_text or not response_text:
            return []
            
        ingredients = [i.strip() for i in response_text.split(",")]
        return ingredients

    except Exception as e:
        print("Error in Local Image Processing Pipeline:", e)
        return []