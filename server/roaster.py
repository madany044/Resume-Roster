import os
import json
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

ROAST_PROMPT = """
You are a brutally honest but constructive senior tech recruiter and resume expert.
Your job is to roast and improve the given resume against the job description.

Analyze the resume carefully and respond ONLY with a valid JSON object in this exact format:

{{
  "overall_score": <integer 0-100>,
  "verdict": "<one punchy sentence verdict about the resume>",
  "sections": {{
    "summary": {{
      "score": <integer 0-100>,
      "roast": "<brutal honest feedback, 2-3 sentences>",
      "rewrite": "<improved version of their summary tailored to the JD>"
    }},
    "skills": {{
      "score": <integer 0-100>,
      "roast": "<brutal honest feedback, 2-3 sentences>",
      "rewrite": "<improved skills section tailored to JD keywords>"
    }},
    "experience": {{
      "score": <integer 0-100>,
      "roast": "<brutal honest feedback, 2-3 sentences>",
      "rewrite": "<one example of a rewritten bullet point from their experience using strong action verbs and metrics>"
    }},
    "format": {{
      "score": <integer 0-100>,
      "roast": "<brutal honest feedback about formatting, length, ATS friendliness, 2-3 sentences>",
      "rewrite": "<specific formatting tips as a short bullet list>"
    }}
  }},
  "top_strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "critical_fixes": ["<fix 1>", "<fix 2>", "<fix 3>"],
  "jd_match_percent": <integer 0-100>,
  "missing_keywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>", "<keyword 4>", "<keyword 5>"]
}}

Resume:
{resume}

Job Description:
{jd}

Respond ONLY with the JSON. No markdown, no explanation, no code blocks.
"""

async def roast_resume(resume_text: str, job_description: str) -> dict:
    prompt = ROAST_PROMPT.format(resume=resume_text, jd=job_description)

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        raw = response.text.strip()

        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
            raw = raw.strip()

        result = json.loads(raw)
        return result

    except json.JSONDecodeError as e:
        raise ValueError(f"Gemini returned invalid JSON: {str(e)}")
    except Exception as e:
        raise ValueError(f"Gemini API error: {str(e)}")