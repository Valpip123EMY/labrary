import requests
import json

API_BASE = "http://localhost:8000/api/v1"

sample_jobs = [
    {
        "title": "Senior AI Research Scientist",
        "description": "Join our AI research team working on cutting-edge machine learning models. We're looking for someone with deep expertise in neural networks and NLP.",
        "url": "https://deepmind.com/careers/123",
        "source_domain": "deepmind.com",
        "location_lat": 51.5074,
        "location_lng": -0.1278,
        "tags": ["AI", "Machine Learning", "NLP", "PhD"]
    },
    {
        "title": "Postdoctoral Researcher - Quantum Computing",
        "description": "Exciting opportunity to work on quantum algorithms and error correction in our state-of-the-art quantum lab.",
        "url": "https://mit.edu/jobs/quantum-456",
        "source_domain": "mit.edu",
        "location_lat": 42.3601,
        "location_lng": -71.0942,
        "tags": ["Quantum Computing", "Physics", "Research", "Postdoc"]
    },
    {
        "title": "Research Engineer - Robotics",
        "description": "Work on autonomous systems and robot perception. Experience with ROS and computer vision required.",
        "url": "https://cmu.edu/robotics/789",
        "source_domain": "cmu.edu",
        "location_lat": 40.4433,
        "location_lng": -79.9436,
        "tags": ["Robotics", "Computer Vision", "ROS", "Engineering"]
    },
    {
        "title": "Climate Science Researcher",
        "description": "Contribute to climate modeling and analysis using large-scale datasets. Strong computational skills needed.",
        "url": "https://stanford.edu/climate/101",
        "source_domain": "stanford.edu",
        "location_lat": 37.4275,
        "location_lng": -122.1697,
        "tags": ["Climate Science", "Data Analysis", "Python", "Research"]
    },
    {
        "title": "Bioinformatics Research Associate",
        "description": "Analyze genomic data and develop computational tools for precision medicine applications.",
        "url": "https://ucsd.edu/bio/202",
        "source_domain": "ucsd.edu",
        "location_lat": 32.8801,
        "location_lng": -117.2340,
        "tags": ["Bioinformatics", "Genomics", "Programming", "Biology"]
    },
    {
        "title": "Research Scientist - Materials Science",
        "description": "Investigate novel materials for energy storage applications. Background in chemistry or physics required.",
        "url": "https://berkeley.edu/materials/303",
        "source_domain": "berkeley.edu",
        "location_lat": 37.8719,
        "location_lng": -122.2585,
        "tags": ["Materials Science", "Energy", "Chemistry", "PhD"]
    },
    {
        "title": "Data Science Researcher - Healthcare",
        "description": "Apply machine learning to healthcare data for disease prediction and treatment optimization.",
        "url": "https://jhu.edu/health-data/404",
        "source_domain": "jhu.edu",
        "location_lat": 39.3299,
        "location_lng": -76.6205,
        "tags": ["Data Science", "Healthcare", "ML", "Statistics"]
    },
    {
        "title": "Astrophysics Research Fellow",
        "description": "Study exoplanets and stellar evolution using data from space telescopes. Strong coding skills essential.",
        "url": "https://caltech.edu/astro/505",
        "source_domain": "caltech.edu",
        "location_lat": 34.1377,
        "location_lng": -118.1253,
        "tags": ["Astrophysics", "Python", "Research", "Space"]
    }
]

def add_sample_jobs():
    print("Adding sample jobs to the database...")
    
    for i, job in enumerate(sample_jobs, 1):
        try:
            response = requests.post(f"{API_BASE}/jobs/", json=job)
            if response.status_code == 200:
                print(f"✓ Added job {i}/{len(sample_jobs)}: {job['title']}")
            else:
                print(f"✗ Failed to add job {i}: {response.text}")
        except Exception as e:
            print(f"✗ Error adding job {i}: {e}")
    
    print("\nDone! Check http://localhost:8000/api/v1/jobs/ to see all jobs.")

if __name__ == "__main__":
    add_sample_jobs()
