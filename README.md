# GusteauGo - Multi Modal Recipe Recommendation System

An AI-powered web application that generates personalized recipes from available ingredients using text or image input.

---

##  Features

-  Manual ingredient input  
-  Image-based ingredient detection  
-  AI-powered recipe generation  
-  Structured recipes (ingredients, instructions, nutrition, diet type)  
-  Secure authentication (JWT + bcrypt)  
-  Save, view, and delete recipes  
-  User-friendly dashboard  
-  Responsive UI  

---


---

## Installation & Setup

### 1️ Clone the repository
```bash
git clone https://github.com/nikhrd/GusteauGo.git
cd GusteauGo

### 2 Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

Create .env file:
GROQ_API_KEY=your_api_key_here
JWT_SECRET=your_secret_key

Run backend:
python app.py

### 3 Frontend Setup
```bash
cd frontend
npm install
npm start
