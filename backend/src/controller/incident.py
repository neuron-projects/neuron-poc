from typing import List, Optional

from fastapi import APIRouter, HTTPException, Query
from src.models.incident import Incident, IncidentCreate, Status
from src.services.db import db
from src.services.triage import analyze_incident

router = APIRouter()


@router.post("/", response_model=Incident, status_code=201)
async def create_incident(incident_in: IncidentCreate):
    """
    Create a new incident, perform AI analysis, and save to DynamoDB.
    """
    try:
        # 1. AI Analysis
        analysis = analyze_incident(incident_in)

        # 2. Merge Data
        incident_data = Incident(
            **incident_in.model_dump(),
            aiSeverity=analysis.severity,
            aiSeverityReason=analysis.reasoning,
            aiCategory=analysis.category,
            aiConfidence=analysis.confidence,
            aiSuggestions=(
                analysis.suggested_actions if analysis.suggested_actions else []
            ),
        )

        # 3. Save to DB
        saved_incident = db.create_incident(incident_data)
        return saved_incident
    except Exception as e:
        print(f"Error in create_incident: {e}")
        raise HTTPException(
            status_code=500, detail=f"Failed to create incident: {str(e)}"
        )


@router.get("/", response_model=dict)
async def list_incidents(
    severity: Optional[str] = Query(None),
    module: Optional[str] = Query(None),
    limit: int = Query(20),
):
    """
    Get all incidents with optional filtering.
    """
    try:
        incidents = db.get_incidents(severity=severity, module=module)
        return {
            "incidents": incidents[:limit],
            "count": len(incidents),
            "lastEvaluatedKey": None,
        }
    except Exception as e:
        print(f"Error in list_incidents: {e}")
        raise HTTPException(
            status_code=500, detail=f"Failed to fetch incidents: {str(e)}"
        )


@router.get("/{incident_id}", response_model=Incident)
async def get_incident(incident_id: str):
    """
    Get incident by ID.
    """
    try:
        incident = db.get_incident_by_id(incident_id)
        if not incident:
            raise HTTPException(status_code=404, detail="Incident not found")
        return incident
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_incident: {e}")
        raise HTTPException(
            status_code=500, detail=f"Error retrieving incident: {str(e)}"
        )


@router.patch("/{incident_id}", response_model=dict)
async def update_status(incident_id: str, status_update: dict):
    """
    Update incident status.
    """
    status = status_update.get("status")
    if not status:
        raise HTTPException(status_code=400, detail="Status is required")

    # Validate status against Enum
    if status not in [s.value for s in Status]:
        valid_statuses = [s.value for s in Status]
        raise HTTPException(
            status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}"
        )

    try:
        success = db.update_status(incident_id, status)
        if not success:
            raise HTTPException(
                status_code=404, detail="Incident not found or update failed"
            )

        return {"message": "Status updated successfully", "status": status}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in update_status: {e}")
        raise HTTPException(
            status_code=500, detail=f"Failed to update status: {str(e)}"
        )
