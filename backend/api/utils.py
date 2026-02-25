import pdfplumber
import json
from django.conf import settings
from google import genai


# -------------------------
# PDF TEXT EXTRACTION
# -------------------------
def extract_text_from_pdf(pdf_file):
    """
    Extracts text from a PDF file using pdfplumber.
    """
    text = ""
    try:
        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
    except Exception as e:
        print("PDF extraction error:", e)
        return None

    return text.strip()


# -------------------------
# GEMINI SUMMARY FUNCTION
# -------------------------
def get_gemini_summary(text):

    # Safety check for API key
    if not settings.GEMINI_API_KEY:
        return {
            "summary": "API Key missing.",
            "abnormal_values": [],
            "term_explanations": "N/A",
            "general_advice": "Please configure Gemini API key."
        }

    try:
        client = genai.Client(api_key=settings.GEMINI_API_KEY)

        prompt = f"""
You are a professional medical assistant.

Analyze this medical report and return ONLY VALID JSON.

JSON must contain exactly:

summary → plain language overview  
abnormal_values → list of abnormal values  
term_explanations → explain medical terms simply  
general_advice → general health guidance  

Medical report text:
{text}

IMPORTANT:
Return ONLY JSON.
NO markdown.
NO explanation.
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        content = response.text.strip()

        # Clean accidental markdown blocks
        if "```" in content:
            content = content.split("```")[1]

        return json.loads(content)

    except Exception as e:
        print("Gemini error:", e)

        return {
            "summary": "Failed to process the report with AI.",
            "abnormal_values": [],
            "term_explanations": "N/A",
            "general_advice": "Try again later."
        }