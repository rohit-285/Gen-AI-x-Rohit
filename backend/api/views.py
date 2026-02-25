from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .utils import extract_text_from_pdf, get_gemini_summary

class SummarizeView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # 1. Validate file exists
        if 'file' not in request.FILES:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
        
        pdf_file = request.FILES['file']
        
        # 2. Check if it's a PDF
        if not pdf_file.name.lower().endswith('.pdf'):
            return Response({"error": "Only PDF files are allowed"}, status=status.HTTP_400_BAD_REQUEST)
        
        # 3. Extract text
        text = extract_text_from_pdf(pdf_file)
        if not text:
            return Response({"error": "Could not extract text from the PDF. It might be empty or corrupted."}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        
        # 4. Get summary from Gemini
        summary_data = get_gemini_summary(text)
        if not summary_data:
            return Response({"error": "Failed to process the report with AI. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # 5. Return JSON response
        return Response(summary_data, status=status.HTTP_200_OK)
