import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()
client = InferenceClient(api_key=os.getenv("HF_API_KEY"))

try:
    res = client.image_to_text("dummy.jpg", model="Salesforce/blip-image-captioning-large")
    print("Caption:", res)
except Exception as e:
    print("Error:", e)
