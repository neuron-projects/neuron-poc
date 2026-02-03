from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID, uuid4

class IncidentBase(BaseModel):
    title: str = Field(..., example="Invoice #12345 stuck in AP module")
    description: str = Field(..., example="Finance team tries to pay a vendor invoice but it is stuck in approval workflow.")
    module: str = Field(..., example="Accounts Payable")
    environment: str = Field(..., example="Production")

class IncidentCreate(IncidentBase):
    pass

class AIAnalysis(BaseModel):
    severity: str = Field(..., description="P1, P2, or P3")
    category: str = Field(..., description="Root cause category e.g., Data Issue, Configuration, bug")
    reasoning: str = Field(..., description="Explanation for the severity and category assignment")
    suggested_action: str = Field(..., description="Recommended next step for the analyst")

class Incident(IncidentBase):
    id: str = Field(default_factory=lambda: str(uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    status: str = "New"
    
    # AI Enriched Fields
    severity: Optional[str] = None
    category: Optional[str] = None
    analysis_summary: Optional[str] = None
    suggested_action: Optional[str] = None

    class Config:
        populate_by_name = True
