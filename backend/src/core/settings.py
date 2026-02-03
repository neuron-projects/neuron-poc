from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # AWS
    AWS_REGION: str = "us-east-1"
    DYNAMODB_TABLE: str = "NeuronIncidents"

    # Credentials (Optional here, but good for validation)
    AWS_ACCESS_KEY_ID: str | None = None
    AWS_SECRET_ACCESS_KEY: str | None = None

    # OpenAI / Azure OpenAI
    AZURE_OPENAI_KEY: str | None = None
    AZURE_OPENAI_ENDPOINT: str = ""
    AZURE_OPENAI_API_VERSION: str = "2024-02-15-preview"
    AZURE_OPENAI_DEPLOYMENT: str = "gpt-4o"

    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )


settings = Settings()
