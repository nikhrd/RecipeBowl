import os
import base64
from PIL import Image

img = Image.new('RGB', (100, 100), color = 'red')
img.save('dummy.jpg')

from utils.image_model import detect_ingredients
print("Result:", detect_ingredients('dummy.jpg'))
