from typing import Optional, List
from sqlmodel import SQLModel, Field, Column, String
from datetime import datetime
from uuid import UUID, uuid4
from sqlalchemy import ARRAY

class JobBase(SQLModel):
    title: str = Field(index=True)
    description: Optional[str] = Field(default=None)
    url: str = Field(unique=True, index=True)
    source_domain: str = Field(index=True)
    location_lat: Optional[float] = Field(default=None)
    location_lng: Optional[float] = Field(default=None)
    tags: List[str] = Field(default=[], sa_column=Column(ARRAY(String)))
    is_active: bool = Field(default=True)

class Job(JobBase, table=True):
    __tablename__ = "jobs"
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default=None)

class JobCreate(JobBase):
    pass

class JobRead(JobBase):
    id: UUID
    created_at: datetime
    updated_at: Optional[datetime]

class JobUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    url: Optional[str] = None
    source_domain: Optional[str] = None
    location_lat: Optional[float] = None
    location_lng: Optional[float] = None
    tags: Optional[List[str]] = None
    is_active: Optional[bool] = None
