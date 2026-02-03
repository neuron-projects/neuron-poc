from openai import OpenAI
import json
from app.core.config import settings
from app.schemas import IncidentCreate, AIAnalysis

client = OpenAI(api_key=settings.OPENAI_API_KEY)

SYSTEM_PROMPT = """
You are an expert ERP Support Analyst (Oracle/SAP). 
Your job is to triage incoming incident reports.
You must analyze the Title, Description, and Module to determine:
1. Severity: P1 (Critical/Blocker), P2 (Major), P3 (Minor).
2. Category: Data Issue, Configuration, Integration, Code Bug, Access/Security, or Process Gap.
3. Suggested Action: A specific, technical next step for the analyst.

Response must be valid JSON matching this schema:
{
  "severity": "P1|P2|P3",
  "category": "Category Name",
  "reasoning": "One sentence explanation",
  "suggested_action": "One sentence technical recommendation"
}
"""

def analyze_incident(incident: IncidentCreate) -> AIAnalysis:
    """
    Send incident details to LLM for triage analysis.
    """
    user_content = f"""
    Title: {incident.title}
    Module: {incident.module}
    Environment: {incident.environment}
    Description: {incident.description}
    """

    try:
        response = client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_content}
            ],
            response_format={"type": "json_object"},
            temperature=0.1
        )
        
        content = response.choices[0].message.content
        data = json.loads(content)
        
        return AIAnalysis(**data)
    except Exception as e:
        print(f"AI Analysis failed: {e}")
        # Fallback
        return AIAnalysis(
            severity="P3",
            category="Uncategorized",
            reasoning="AI analysis failed",
            suggested_action="Manual review required"
        )
