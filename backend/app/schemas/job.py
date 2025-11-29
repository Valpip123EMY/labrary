from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Any
from datetime import datetime
from uuid import UUID

class JobBase(BaseModel):
    title: str
    description: Optional[str] = None
    url: HttpUrl
    source_domain: str
    location_lat: Optional[float] = None
    location_lng: Optional[float] = None
    tags: Optional[List[str]] = []

class JobCreate(JobBase):
    pass

class JobUpdate(JobBase):
    title: Optional[str] = None
    url: Optional[HttpUrl] = None
    source_domain: Optional[str] = None
    is_active: Optional[bool] = None

class JobInDBBase(JobBase):
    id: UUID
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Job(JobInDBBase):
    pass

class JobGeoJSON(BaseModel):
    type: str = "Feature"
    geometry: dict
    properties: dict
