from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from geoalchemy2.elements import WKTElement
from typing import List, Optional
from app.core.database import get_db
from app.models.job import Job
from app.schemas.job import Job as JobSchema, JobCreate, JobGeoJSON

router = APIRouter()

@router.get("/", response_model=List[JobSchema])
async def read_jobs(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Job).offset(skip).limit(limit))
    jobs = result.scalars().all()
    return jobs

@router.get("/map", response_model=List[JobGeoJSON])
async def read_jobs_map(
    min_lat: float,
    max_lat: float,
    min_lng: float,
    max_lng: float,
    db: AsyncSession = Depends(get_db)
):
    # Create a bounding box polygon
    # Note: This is a simplified bounding box query. 
    # For production, consider using ST_MakeEnvelope
    
    # We'll filter by lat/lng columns first for speed if they exist, 
    # but ideally we use the geom column with ST_Within or && operator
    
    query = select(Job).filter(
        Job.location_lat >= min_lat,
        Job.location_lat <= max_lat,
        Job.location_lng >= min_lng,
        Job.location_lng <= max_lng
    )
    
    result = await db.execute(query)
    jobs = result.scalars().all()
    
    features = []
    for job in jobs:
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [job.location_lng, job.location_lat]
            },
            "properties": {
                "id": str(job.id),
                "title": job.title,
                "url": str(job.url),
                "source_domain": job.source_domain
            }
        })
        
    return features

@router.get("/{job_id}", response_model=JobSchema)
async def read_job(job_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).filter(Job.id == job_id))
    job = result.scalars().first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/", response_model=JobSchema)
async def create_job(job: JobCreate, db: AsyncSession = Depends(get_db)):
    # Check if job exists by URL
    result = await db.execute(select(Job).filter(Job.url == str(job.url)))
    existing_job = result.scalars().first()
    if existing_job:
        return existing_job

    db_job = Job(
        title=job.title,
        description=job.description,
        url=str(job.url),
        source_domain=job.source_domain,
        location_lat=job.location_lat,
        location_lng=job.location_lng,
        tags=job.tags,
        # Create geometry point if lat/lng are present
        geom=f"POINT({job.location_lng} {job.location_lat})" if job.location_lat and job.location_lng else None
    )
    db.add(db_job)
    await db.commit()
    await db.refresh(db_job)
    return db_job

from app.services.crawler import crawler_service
from pydantic import BaseModel

class CrawlRequest(BaseModel):
    url: str

@router.post("/crawl")
async def trigger_crawl(request: CrawlRequest, db: AsyncSession = Depends(get_db)):
    # Run in background or await (for MVP await is fine but blocks)
    # Ideally use BackgroundTasks
    await crawler_service.crawl_page(request.url, db)
    return {"message": f"Crawling started for {request.url}"}
