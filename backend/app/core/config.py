import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Neuron API"
    
    # AWS
    AWS_REGION: str = "us-east-1"
    DYNAMODB_TABLE: str = "NeuronIncidents"
    
    # Credentials (Optional here, but good for validation)
    AWS_ACCESS_KEY_ID: str | None = None
    AWS_SECRET_ACCESS_KEY: str | None = None
    
    # OpenAI
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o"

    model_config = SettingsConfigDict(env_file=".env", env_ignore_empty=True, extra="ignore")

settings = Settings()
