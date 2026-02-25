PROJECT NAME: MediSummarizer – Medical Report Analysis System

---

ABOUT THE PROJECT

MediSummarizer is a web application that helps users understand their medical
reports in simple language. Users can upload a medical PDF file, and the system
automatically extracts the text and provides a structured summary including:

• Plain-language report overview
• Important or abnormal findings
• Explanation of medical terms
• General health guidance

This platform is designed to assist users in understanding their reports,
but it does NOT replace professional medical advice.

---

TECHNOLOGY STACK

Frontend:

* React.js
* Tailwind CSS
* Axios

Backend:

* Django
* Django REST Framework

Other Tools:

* pdfplumber (PDF text extraction)
* Google Gemini API (content processing)

---

PROJECT STRUCTURE

BCT Gen AI/
│
├── backend/      → Django backend API
├── frontend/     → React frontend interface
└── README.txt

---

HOW TO RUN THE BACKEND

1. Open terminal and navigate to backend folder

   cd backend

2. Create virtual environment

   python -m venv venv

3. Activate environment

   venv\Scripts\activate

4. Install dependencies

   pip install -r requirements.txt

5. Add your API key inside backend/.env

   GEMINI_API_KEY=YOUR_API_KEY

6. Run Django server

   python manage.py runserver

Backend will start at:
http://127.0.0.1:8000/

---

HOW TO RUN THE FRONTEND

1. Open another terminal

2. Navigate to frontend folder

   cd frontend

3. Install node packages

   npm install

4. Start the development server

   npm run dev

Frontend will start at:
http://localhost:5173/

---

HOW TO USE THE APPLICATION

1. Open the frontend in browser
2. Upload a medical PDF file
3. Wait for processing
4. View structured summary on screen

---

IMPORTANT NOTES

• Do NOT upload node_modules, venv, or dist folders
• Always keep the .env file private
• Add your own Gemini API key before running
• This system is for educational understanding only

---

DISCLAIMER

This application provides automated explanations for medical reports.
It is NOT a medical diagnosis system and should not be used as a
replacement for consultation with a qualified healthcare professional.

---

END OF README
