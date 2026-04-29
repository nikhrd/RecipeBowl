import os
import requests
from dotenv import load_dotenv

load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")
print("Key length:", len(HF_API_KEY) if HF_API_KEY else 0)

headers = {"Authorization": f"Bearer {HF_API_KEY}"}
res = requests.post("https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large", headers=headers, data=b"dummy")
print(res.json())
