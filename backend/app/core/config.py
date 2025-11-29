from pydantic_settings import BaseSettings
from pathlib import Path
from typing import Optional


class Settings(BaseSettings):
    PROJECT_NAME: str = "Research Job Aggregator"
    API_V1_STR: str = "/api/v1"

    # Database (will be overridden by environment / backend/.env)
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost/research_jobs"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # Security
    ENABLE_ANTIBOT: bool = True

    class Config:
        case_sensitive = True
        # Load .env located at the repository's backend/ folder
        env_file = str(Path(__file__).resolve().parents[2] / ".env")
        extra = "ignore"


settings = Settings()
