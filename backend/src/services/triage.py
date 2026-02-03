import json

from openai import AzureOpenAI
from src.core.settings import settings
from src.models.incident import (
    AIAnalysis,
    Environment,
    IncidentCategory,
    IncidentCreate,
    Severity,
)

if settings.AZURE_OPENAI_ENDPOINT:
    client = AzureOpenAI(
        api_key=settings.AZURE_OPENAI_KEY,
        api_version=settings.AZURE_OPENAI_API_VERSION,
        azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    )
else:
    from openai import OpenAI

    client = OpenAI(api_key=settings.OPENAI_API_KEY)


def calculate_severity(incident: IncidentCreate) -> dict:
    lower_desc = incident.description.lower()

    # Critical keywords
    critical_keywords = [
        "down",
        "critical",
        "urgent",
        "blocking",
        "month-end",
        "year-end",
        "payroll",
    ]

    # Check for P1
    if incident.environment == Environment.PRODUCTION and any(
        kw in lower_desc for kw in critical_keywords
    ):
        return {
            "severity": Severity.P1,
            "reason": "Production environment & critical keywords detected",
        }

    # Check for P2
    if (
        incident.environment == Environment.PRODUCTION
        or "important" in lower_desc
        or "urgent" in lower_desc
    ):
        return {
            "severity": Severity.P2,
            "reason": "Production environment or important keywords",
        }

    # Default P3
    return {"severity": Severity.P3, "reason": "Test environment or routine issue"}


def categorize_incident(incident: IncidentCreate) -> dict:
    lower_desc = incident.description.lower()
    lower_title = incident.title.lower()
    combined_text = f"{lower_title} {lower_desc}"

    categories_map = {
        IncidentCategory.CONFIGURATION_ISSUE: [
            "setup",
            "configuration",
            "settings",
            "parameter",
            "profile",
            "rule",
        ],
        IncidentCategory.SECURITY_ACCESS: [
            "access",
            "permission",
            "login",
            "password",
            "locked",
            "authentication",
            "role",
            "unauthorized",
        ],
        IncidentCategory.INTEGRATION_FAILURE: [
            "sync",
            "interface",
            "api",
            "integration",
            "connection",
            "middleware",
            "exchange",
            "endpoint",
            "failed sync",
        ],
        IncidentCategory.DATA_ISSUE: [
            "missing data",
            "corrupt",
            "null",
            "invalid value",
            "incorrect data",
            "broken record",
        ],
        IncidentCategory.CALCULATION_ERROR: [
            "total",
            "amount",
            "formula",
            "math",
            "rounding",
            "discrepancy",
            "calculation",
            "tax calculation",
        ],
        IncidentCategory.BATCH_JOB_FAILURE: [
            "scheduled job",
            "batch",
            "nightly",
            "background process",
            "cron",
            "job failed",
        ],
        IncidentCategory.WORKFLOW_CONFIGURATION: [
            "approval",
            "transition",
            "routing",
            "workflow",
            "hierarchy",
            "workflow stuck",
        ],
        IncidentCategory.PAYMENT_PROCESSING: [
            "payroll",
            "bank",
            "swift",
            "eft",
            "check",
            "payment",
            "rejection",
            "settlement",
            "bank transfer",
        ],
        IncidentCategory.DATA_RECONCILIATION: [
            "variance",
            "mismatch",
            "balance",
            "reconciliation",
            "gl vs sl",
            "offset",
            "reconcile",
        ],
    }

    for category, keywords in categories_map.items():
        for kw in keywords:
            if kw in combined_text:
                return {"category": category, "confidence": 95}

    return {"category": IncidentCategory.UNKNOWN, "confidence": 50}


def analyze_incident(incident: IncidentCreate) -> AIAnalysis:
    """
    Perform multi-tiered triage: Rule-based for severity/category, LLM for confidence/suggestions.
    """
    # 1. Rule-based severity (business logic)
    severity_info = calculate_severity(incident)
    category_info = categorize_incident(incident)

    # 2. LLM for technical suggestions
    try:
        response = client.chat.completions.create(
            model=settings.AZURE_OPENAI_DEPLOYMENT,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert ERP support analyst. Categorize the issue, "
                        "provide technical suggestions, and assign a confidence score."
                    ),
                },
                {
                    "role": "user",
                    "content": f"Issue: {incident.description}. Provide 3 short technical suggestions in a JSON list format under the key 'suggestions'.",
                },
            ],
            response_format={"type": "json_object"},
            temperature=0.3,
        )
        content = response.choices[0].message.content
        data = json.loads(content)
        suggestions = data.get(
            "suggestions",
            ["Contact system administrator", "Review logs", "Check permissions"],
        )
    except Exception:
        suggestions = ["Manual review required"]

    return AIAnalysis(
        severity=severity_info["severity"],
        category=category_info["category"],
        confidence=category_info["confidence"],
        reasoning=severity_info["reason"],
        suggested_actions=suggestions,
    )
