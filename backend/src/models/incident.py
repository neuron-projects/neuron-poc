from datetime import datetime
from enum import Enum
from typing import List, Optional
from uuid import uuid4

from pydantic import BaseModel, Field


class Severity(str, Enum):
    P1 = "P1"
    P2 = "P2"
    P3 = "P3"


class Status(str, Enum):
    OPEN = "Open"
    IN_PROGRESS = "In Progress"
    RESOLVED = "Resolved"
    CLOSED = "Closed"


class ERPModule(str, Enum):
    AP = "AP"
    AR = "AR"
    GL = "GL"
    INVENTORY = "Inventory"
    HR = "HR"
    PAYROLL = "Payroll"


class Environment(str, Enum):
    PRODUCTION = "Production"
    TEST = "Test"


class IncidentCategory(str, Enum):
    CONFIGURATION_ISSUE = "Configuration Issue"
    SECURITY_ACCESS = "Security/Access"
    INTEGRATION_FAILURE = "Integration Failure"
    DATA_ISSUE = "Data Issue"

    CALCULATION_ERROR = "Calculation Error"
    BATCH_JOB_FAILURE = "Batch Job Failure"
    WORKFLOW_CONFIGURATION = "Workflow Configuration"
    PAYMENT_PROCESSING = "Payment Processing"
    DATA_RECONCILIATION = "Data Reconciliation"

    UNKNOWN = "Unknown"


class IncidentBase(BaseModel):
    title: str = Field(..., example="Invoice #12345 stuck in AP module")
    description: str = Field(
        ...,
        example="Finance team tries to pay a vendor invoice but it is stuck in approval workflow.",
    )
    module: ERPModule = Field(..., example=ERPModule.AP)
    environment: Environment = Field(..., example=Environment.PRODUCTION)
    businessUnit: Optional[str] = Field(None, example="North America Finance")


class IncidentCreate(IncidentBase):
    pass


class AIAnalysis(BaseModel):
    severity: Severity = Field(..., description="P1, P2, or P3")
    category: IncidentCategory = Field(..., description="Root cause category")
    confidence: int = Field(..., description="Confidence score 0-100")
    reasoning: str = Field(..., description="Explanation")
    suggested_actions: List[str] = Field(..., description="Recommended next steps")


class Incident(IncidentBase):
    id: str = Field(default_factory=lambda: str(uuid4()))
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    status: Status = Status.OPEN
    submittedBy: str = "current.user@company.com"

    # AI Enriched Fields
    aiSeverity: Optional[Severity] = None
    aiSeverityReason: Optional[str] = None
    aiCategory: Optional[IncidentCategory] = None
    aiConfidence: Optional[int] = None
    aiSuggestions: List[str] = Field(default_factory=list)

    class Config:
        use_enum_values = True
        populate_by_name = True
