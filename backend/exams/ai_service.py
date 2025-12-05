import google.generativeai as genai
from django.conf import settings
import json

genai.configure(api_key=settings.GEMINI_API_KEY)

def generate_questions_from_text(text_content, num_questions=5, difficulty="Medium", custom_instructions=""):
    model = genai.GenerativeModel('gemini-2.5-flash')

    # Logic: If instructions are empty, default to general competitive exams.
    # If provided (e.g., "TRE 4.0"), the AI will adapt to that style.
    style_guide = custom_instructions if custom_instructions else "General Competitive Exam standards"

    # Dynamic Prompt
    prompt = f"""
    Act as an expert exam setter.
    
    CONTEXT / EXAM STYLE:
    {style_guide}
    
    TASK: 
    Generate {num_questions} Multiple Choice Questions (MCQ) based strictly on the notes provided below.
    DIFFICULTY LEVEL: {difficulty}
    
    STRICT JSON OUTPUT FORMAT:
    The output MUST be a valid JSON array. Do not include markdown formatting like ```json ... ```.
    [
        {{
            "question_text": "Question here...",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct_index": 0, // Integer 0-3
            "marks": 1
        }}
    ]
    
    SOURCE MATERIAL (NOTES):
    {text_content[:15000]} // Truncated to fit token limits
    """

    try:
        response = model.generate_content(prompt)
        # Cleanup potential markdown wrapper from AI response
        clean_text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_text)
    except Exception as e:
        print(f"AI Error: {e}")
        # Return fallback error question so frontend doesn't crash
        return [{
            "question_text": "Error generating questions. Please try again.",
            "options": ["Error", "Error", "Error", "Error"],
            "correct_index": 0,
            "marks": 0
        }]