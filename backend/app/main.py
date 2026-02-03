from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Neuron API", version="0.1.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For PoC, allow all. In prod, lock this down.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from app.api.endpoints import router as api_router

app.include_router(api_router, prefix="/api/v1/incidents", tags=["incidents"])

@app.get("/")
def read_root():
    return {"message": "Neuron API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
