import os
import base64
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def detect_ingredients(image_path):
    try:
        # Encode image to base64
        base64_image = encode_image(image_path)
        
        # Call Groq Vision API
        completion = client.chat.completions.create(
            model="llama-3.2-11b-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Identify all the raw food ingredients in this image. Return ONLY a comma-separated list of the ingredients. Do not use full sentences or bullet points. If you do not see any food, return 'Unknown'."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            temperature=0.2,
            max_tokens=100
        )
        
        response_text = completion.choices[0].message.content.strip()
        
        # Split the comma-separated string into a list
        if "Unknown" in response_text or not response_text:
            return []
            
        ingredients = [i.strip() for i in response_text.split(",")]
        return ingredients

    except Exception as e:
        print("Error in Groq Vision API:", e)
        return []