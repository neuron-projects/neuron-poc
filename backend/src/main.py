from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.controller.incident import router as incident_router

app = FastAPI(title="Neuron API", version="0.1.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For PoC, allow all. In prod, lock this down.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(incident_router, prefix="/api/incidents", tags=["incidents"])


@app.get("/")
def read_root():
    return {"message": "Neuron API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
