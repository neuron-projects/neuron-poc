# Neuron: ERP Incident Triage System

Neuron is an AI-powered triage system that automates the categorization and prioritization of ERP incidents. It uses LLMs to analyze issue descriptions and provide immediate technical suggestions for support teams.

This project was built for the **NeuronERP** take-home assessment.

## 🚀 Architecture

```mermaid
graph TD
    classDef frontend fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff
    classDef backend fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff
    classDef external fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff
    classDef user fill:#6366f1,stroke:#4338ca,stroke-width:2px,color:#fff

    User((ERP User)):::user

    subgraph "Frontend (React + Vite)"
        UI[Lovable UI Components]:::frontend
        Store[Local State]:::frontend
    end
    
    subgraph "Backend (FastAPI)"
        API[Incident Controller]:::backend
        Triage[AI Triage Service]:::backend
        DBService[DynamoDB Client]:::backend
    end
    
    subgraph "Services"
        AzureOpenAI[Azure OpenAI - GPT-4o]:::external
        DynamoDB[(AWS DynamoDB)]:::external
    end

    User --> UI
    UI --> API
    API --> Triage
    Triage --> AzureOpenAI
    API --> DBService
    DBService --> DynamoDB
```

## 📊 Data Flow

```mermaid
sequenceDiagram
    autonumber
    
    participant User as "User"
    participant Frontend as "Frontend (Vite)"
    participant Backend as "Backend (FastAPI)"
    participant AI as "Azure OpenAI"
    participant DB as "DynamoDB"

    Note over User, Frontend: Incident Reporting
    User->>Frontend: Fill Form & Submit
    Frontend->>Backend: POST /api/incidents

    Note over Backend, AI: Smart Triage Logic
    Backend->>Backend: 1. Rule-based Severity Check
    Backend->>AI: 2. Request Categorization & Suggestions
    AI-->>Backend: 3. Return Insights (GPT-4o)

    Note over Backend, DB: Data Persistence
    Backend->>DB: Put Item (id, created_at, ai_fields)
    DB-->>Backend: OK
    Backend-->>Frontend: 201 Created (JSON Response)
    
    Frontend->>User: Success Feedback & AI Insights
```

## 🗄 Database Schema (DynamoDB)

| Attribute | Type | Key | Description |
| :--- | :--- | :--- | :--- |
| **id** | `String` | **PK** | Unique identifier (UUID) |
| **title** | `String` | - | Incident title |
| **description** | `String` | - | Detailed problem description |
| **module** | `Enum` | - | ERP Module (AP, AR, GL, etc.) |
| **environment** | `Enum` | - | Production or Test |
| **status** | `Enum` | - | Current state (Open, In Progress, etc.) |
| **createdAt** | `String` | - | ISO timestamp |
| **aiSeverity** | `Enum` | - | AI priority level (P1-P3) |
| **aiCategory** | `Enum` | - | System-determined category |
| **aiConfidence** | `Number` | - | Confidence score (0-100) |
| **aiSuggestions**| `List` | - | Recommeded fix actions |

## 🛠 Tech Stack

*   **Frontend**: React (Vite) for the UI.
*   **Backend**: FastAPI for the REST API.
*   **Database**: AWS DynamoDB (Single-table design).
*   **AI**: Azure OpenAI (GPT-4o) for incident analysis.
*   **UI Components**: Shadcn/UI for consistent design.

## 🤖 Development Methodology

The project was developed iteratively using various AI agents under the supervision of a **Lead Developer**:

*   **Claude**: Used for initial planning and system architecture design.
*   **Lovable**: Used to build the frontend UI and ensure high visual standards.
*   **Antigravity**: Used as a coding assistant to implement backend logic, refactor the codebase into a modular `src/` structure, and integrate the API layers.
*   **Lead Developer**: Reviewed all code, managed architectural decisions, and directed the integration process to ensure technical standards were met.

## 📸 Screenshots

| Dashboard | Incident Detail | New Incident |
| :---: | :---: | :---: |
| ![Dashboard](file:///Users/avi/Desktop/neuron-poc/docs/dashboard_placeholder.png) | ![Details](file:///Users/avi/Desktop/neuron-poc/docs/detail_placeholder.png) | ![Report](file:///Users/avi/Desktop/neuron-poc/docs/new_placeholder.png) |

## 🔌 API Endpoints

*   `GET /api/incidents/`: List all incidents.
*   `POST /api/incidents/`: Create and analyze a new incident.
*   `GET /api/incidents/{id}`: Get single incident details.
*   `PATCH /api/incidents/{id}`: Update incident status.

## 📦 Running Locally

### Backend
1.  Navigate to `/backend`.
2.  Create & Activate the virtual environment
    `python -m venv venv`
    `source venv/bin/activate`
3.  Install requirements: `pip install -r requirements.txt`.
4.  Set environment variables in `.env`.
5.  Run: `uvicorn src.main:app --reload`.

### Frontend
1.  Navigate to `/frontend`.
2.  Run: `npm install && npm run dev`.

## ☁️ Deployment

### Docker
The project includes a `docker-compose.yml` to run the full stack:
```bash
docker-compose up -d --build
```

### EC2
1.  Launch an EC2 instance and install Docker.
2.  Clone the repo and configure environment variables.
3.  Run `docker-compose up -d`.
