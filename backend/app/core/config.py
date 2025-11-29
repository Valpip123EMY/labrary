from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Research Job Aggregator"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost/research_jobs"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Security
    ENABLE_ANTIBOT: bool = True

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"

settings = Settings()
