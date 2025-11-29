import requests
import json

BASE_URL = "http://localhost:8000"

# Test health
health = requests.get(f"{BASE_URL}/health")
print(f"Health check: {health.json()}")

# Create a test job
job_data = {
    "title": "Research Scientist Position",
    "description": "Exciting research opportunity in AI",
    "url": "https://example.com/job/123",
    "source_domain": "example.com",
    "location_lat": 40.7128,
    "location_lng": -74.0060,
    "tags": ["AI", "Research", "PhD"]
}

create_response = requests.post(f"{BASE_URL}/api/v1/jobs/", json=job_data)
print(f"\nCreate job status: {create_response.status_code}")
created_job = create_response.json()
print(f"Created job: {json.dumps(created_job, indent=2)}")

# List all jobs
jobs_response = requests.get(f"{BASE_URL}/api/v1/jobs/")
print(f"\nList jobs status: {jobs_response.status_code}")
jobs = jobs_response.json()
print(f"Total jobs: {len(jobs)}")

# Get specific job
if created_job.get("id"):
    job_id = created_job["id"]
    get_response = requests.get(f"{BASE_URL}/api/v1/jobs/{job_id}")
    print(f"\nGet job {job_id} status: {get_response.status_code}")
    print(f"Retrieved job: {json.dumps(get_response.json(), indent=2)}")
