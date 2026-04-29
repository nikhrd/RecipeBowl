from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image

try:
    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
    print("Model loaded successfully!")
    
    img = Image.new('RGB', (100, 100), color = 'red')
    inputs = processor(img, return_tensors="pt")
    out = model.generate(**inputs)
    print("Caption:", processor.decode(out[0], skip_special_tokens=True))
except Exception as e:
    print("Error:", e)
