const API_BASE = 'http://localhost:8000/api/v1';

let map = null;
let markers = [];
let allJobs = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    loadJobs();
    initSearch();
    initModal();
});

// Navigation
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            switchView(view);
        });
    });
}

function switchView(view) {
    // Update buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Update views
    document.querySelectorAll('.view').forEach(v => {
        v.classList.toggle('active', v.id === `${view}-view`);
    });
    
    // Initialize map if switching to map view
    if (view === 'map' && !map) {
        initMap();
    }
}

// Load Jobs
async function loadJobs() {
    try {
        const response = await fetch(`${API_BASE}/jobs/`);
        allJobs = await response.json();
        displayJobs(allJobs);
    } catch (error) {
        console.error('Error loading jobs:', error);
        document.getElementById('jobs-container').innerHTML = 
            '<div class="loading">Error loading jobs. Please try again later.</div>';
    }
}

function displayJobs(jobs) {
    const container = document.getElementById('jobs-container');
    
    if (jobs.length === 0) {
        container.innerHTML = '<div class="loading">No jobs found.</div>';
        return;
    }
    
    container.innerHTML = jobs.map(job => createJobCard(job)).join('');
    
    // Add click listeners
    document.querySelectorAll('.job-card').forEach(card => {
        card.addEventListener('click', () => {
            const jobId = card.dataset.jobId;
            showJobDetails(jobId);
        });
    });
}

function createJobCard(job) {
    const location = job.location_lat && job.location_lng 
        ? `📍 ${job.location_lat.toFixed(2)}, ${job.location_lng.toFixed(2)}`
        : '📍 Location not specified';
    
    const tags = job.tags && job.tags.length > 0
        ? job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
        : '';
    
    const description = job.description 
        ? job.description.substring(0, 150) + '...'
        : 'No description available.';
    
    return `
        <div class="job-card" data-job-id="${job.id}">
            <div class="job-header">
                <h3 class="job-title">${job.title}</h3>
                <div class="job-source">${job.source_domain}</div>
            </div>
            <p class="job-description">${description}</p>
            ${tags ? `<div class="job-tags">${tags}</div>` : ''}
            <div class="job-footer">
                <span class="job-location">${location}</span>
                <button class="btn-view" onclick="event.stopPropagation(); showJobDetails('${job.id}')">
                    View Details →
                </button>
            </div>
        </div>
    `;
}

// Search
function initSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allJobs.filter(job => {
            const title = job.title.toLowerCase();
            const description = (job.description || '').toLowerCase();
            const tags = (job.tags || []).join(' ').toLowerCase();
            return title.includes(query) || description.includes(query) || tags.includes(query);
        });
        displayJobs(filtered);
    });
}

// Job Details Modal
function initModal() {
    const modal = document.getElementById('job-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

async function showJobDetails(jobId) {
    const modal = document.getElementById('job-modal');
    const detailsContainer = document.getElementById('job-details');
    
    try {
        const response = await fetch(`${API_BASE}/jobs/${jobId}`);
        const job = await response.json();
        
        const location = job.location_lat && job.location_lng
            ? `${job.location_lat.toFixed(4)}, ${job.location_lng.toFixed(4)}`
            : 'Not specified';
        
        const tags = job.tags && job.tags.length > 0
            ? job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
            : 'None';
        
        detailsContainer.innerHTML = `
            <h2>${job.title}</h2>
            
            <div class="detail-section">
                <div class="detail-label">Source</div>
                <div class="detail-value">${job.source_domain}</div>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Description</div>
                <div class="detail-value">${job.description || 'No description available.'}</div>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Location</div>
                <div class="detail-value">📍 ${location}</div>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Tags</div>
                <div class="job-tags">${tags}</div>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Posted</div>
                <div class="detail-value">${new Date(job.created_at).toLocaleDateString()}</div>
            </div>
            
            <div class="detail-section">
                <a href="${job.url}" target="_blank" class="btn-apply">Apply Now →</a>
            </div>
        `;
        
        modal.classList.add('active');
    } catch (error) {
        console.error('Error loading job details:', error);
        alert('Error loading job details. Please try again.');
    }
}

// Map
function initMap() {
    // Initialize map centered on US by default
    map = L.map('map').setView([39.8283, -98.5795], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Load jobs on map
    loadJobsOnMap();
    
    // Update jobs when map moves
    map.on('moveend', loadJobsOnMap);
    
    // Locate button
    document.getElementById('locate-btn').addEventListener('click', locateUser);
}

function locateUser() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                map.setView([lat, lng], 10);
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Unable to get your location. Please check permissions.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

async function loadJobsOnMap() {
    const bounds = map.getBounds();
    const params = new URLSearchParams({
        min_lat: bounds.getSouth(),
        max_lat: bounds.getNorth(),
        min_lng: bounds.getWest(),
        max_lng: bounds.getEast()
    });
    
    try {
        const response = await fetch(`${API_BASE}/jobs/map/geojson?${params}`);
        const geojson = await response.json();
        
        // Clear existing markers
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
        
        // Add new markers
        geojson.features.forEach(feature => {
            const [lng, lat] = feature.geometry.coordinates;
            const props = feature.properties;
            
            const marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(`
                <div style="min-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 1.1rem;">${props.title}</h3>
                    <p style="margin: 0 0 8px 0; color: #666; font-size: 0.9rem;">${props.source_domain}</p>
                    ${props.tags ? `<div style="margin-bottom: 8px;">${props.tags.map(t => `<span style="background: #e0e7ff; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; margin-right: 4px;">${t}</span>`).join('')}</div>` : ''}
                    <button onclick="showJobDetails('${props.id}')" style="background: #6366f1; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;">View Details</button>
                </div>
            `);
            
            markers.push(marker);
        });
    } catch (error) {
        console.error('Error loading jobs on map:', error);
    }
}
