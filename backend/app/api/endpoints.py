from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas import Incident, IncidentCreate
from app.services.triage import analyze_incident
from app.services.db import db

router = APIRouter()

@router.post("/analyze", response_model=Incident)
async def create_incident(incident_in: IncidentCreate):
    """
    Receive incident, analyze with AI, and save to DB.
    """
    # 1. AI Analysis
    analysis = analyze_incident(incident_in)
    
    # 2. Merge Data
    incident_data = Incident(
        **incident_in.model_dump(),
        severity=analysis.severity,
        category=analysis.category,
        analysis_summary=analysis.reasoning,
        suggested_action=analysis.suggested_action
    )
    
    # 3. Save to DB
    saved_incident = db.create_incident(incident_data)
    
    return saved_incident

@router.get("/", response_model=List[Incident])
async def list_incidents():
    """
    Get all incidents.
    """
    return db.get_incidents()
