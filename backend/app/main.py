from fastapi import FastAPI, Depends, HTTPException, Query
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from contextlib import asynccontextmanager
import redis.asyncio as redis
from fastapi_limiter import FastAPILimiter

from app.core.config import settings
from app.core.database import init_db, get_session
from app.models.job import Job, JobCreate, JobRead, JobUpdate

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    try:
        redis_connection = redis.from_url(settings.REDIS_URL, encoding="utf-8", decode_responses=True)
        await FastAPILimiter.init(redis_connection)
    except Exception as e:
        print(f"Warning: Redis connection failed: {e}")
    yield
    # Shutdown

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

# CORS
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

class AntiBotMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if not settings.ENABLE_ANTIBOT:
            return await call_next(request)
            
        user_agent = request.headers.get("user-agent", "").lower()
        if not user_agent:
             raise HTTPException(status_code=403, detail="No User-Agent provided")
        
        # Add more checks here if needed
        
        return await call_next(request)

app.add_middleware(AntiBotMiddleware)


@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/v1/jobs/", response_model=JobRead)
async def create_job(job: JobCreate, session: AsyncSession = Depends(get_session)):
    db_job = Job.from_orm(job)
    session.add(db_job)
    await session.commit()
    await session.refresh(db_job)
    return db_job

@app.get("/api/v1/jobs/", response_model=List[JobRead])
async def read_jobs(
    skip: int = 0,
    limit: int = 100,
    session: AsyncSession = Depends(get_session)
):
    jobs = await session.execute(select(Job).offset(skip).limit(limit))
    return jobs.scalars().all()

@app.get("/api/v1/jobs/{job_id}", response_model=JobRead)
async def read_job(job_id: str, session: AsyncSession = Depends(get_session)):
    job = await session.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@app.get("/api/v1/jobs/map/geojson")
async def get_jobs_map(
    min_lat: float = Query(..., description="Minimum latitude"),
    max_lat: float = Query(..., description="Maximum latitude"),
    min_lng: float = Query(..., description="Minimum longitude"),
    max_lng: float = Query(..., description="Maximum longitude"),
    session: AsyncSession = Depends(get_session)
):
    """Get jobs within a bounding box as GeoJSON"""
    stmt = select(Job).where(
        Job.location_lat >= min_lat,
        Job.location_lat <= max_lat,
        Job.location_lng >= min_lng,
        Job.location_lng <= max_lng,
        Job.is_active == True
    )
    result = await session.execute(stmt)
    jobs = result.scalars().all()
    
    features = []
    for job in jobs:
        if job.location_lat and job.location_lng:
            features.append({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [job.location_lng, job.location_lat]
                },
                "properties": {
                    "id": str(job.id),
                    "title": job.title,
                    "source_domain": job.source_domain,
                    "url": job.url,
                    "tags": job.tags
                }
            })
    
    return {
        "type": "FeatureCollection",
        "features": features
    }
