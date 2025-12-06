import google.generativeai as genai
from django.conf import settings
import json
import PIL.Image

# Configure API
genai.configure(api_key=settings.GEMINI_API_KEY)

def get_model():
    # gemini-1.5-flash is optimized for multimodal (text + images) and speed
    return genai.GenerativeModel('gemini-2.5-flash')

def clean_json_response(response_text):
    """Helper to strip markdown and parse JSON"""
    clean_text = response_text.replace("```json", "").replace("```", "").strip()
    try:
        return json.loads(clean_text)
    except json.JSONDecodeError:
        return []

def generate_questions_from_text(text_content, num_questions=5, difficulty="Medium", custom_instructions=""):
    model = get_model()
    
    style_guide = custom_instructions if custom_instructions else "General Competitive Exam standards"

    prompt = f"""
    Act as an expert exam setter.
    CONTEXT: {style_guide}
    TASK: Generate {num_questions} Multiple Choice Questions (MCQ) based on the notes.
    DIFFICULTY: {difficulty}
    
    STRICT JSON OUTPUT FORMAT:
    [
        {{
            "question_text": "Question...",
            "options": ["A", "B", "C", "D"],
            "correct_index": 0,
            "marks": 2
        }}
    ]
    
    NOTES:
    {text_content[:25000]} 
    """
    # Note: Increased char limit to 25k for Subject/Mock tests
    
    try:
        response = model.generate_content(prompt)
        return clean_json_response(response.text)
    except Exception as e:
        print(f"Text AI Error: {e}")
        return []

def generate_question_from_image(image_file, difficulty="Medium", custom_instructions=""):
    model = get_model()
    
    # Load image using PIL
    img = PIL.Image.open(image_file)

    style_guide = custom_instructions if custom_instructions else "standard exam pattern"

    prompt = f"""
    Analyze this image. It might be a diagram, a mathematical equation, or a code snippet.
    
    TASK: Create 1 high-quality Multiple Choice Question (MCQ) that tests the concept shown in this image.
    Do NOT just describe the image. Create a question *based* on it (e.g., if it's a circuit, ask for total resistance).
    
    CONTEXT: {style_guide}
    DIFFICULTY: {difficulty}
    
    STRICT JSON OUTPUT FORMAT (Array of 1 object):
    [
        {{
            "question_text": "Question...",
            "options": ["A", "B", "C", "D"],
            "correct_index": 0,
            "marks": 2
        }}
    ]
    """

    try:
        # Pass both text prompt and image to the model
        response = model.generate_content([prompt, img])
        return clean_json_response(response.text)
    except Exception as e:
        print(f"Vision AI Error: {e}")
        return []