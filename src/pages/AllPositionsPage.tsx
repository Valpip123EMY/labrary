import { useState, useMemo } from 'react';

// Mock data
const researchOpportunities = [
  {
    id: 1,
    title: "Machine Learning for Healthcare Analytics",
    institution: "Stanford University",
    category: "Computer Science",
    type: "Full-time",
    location: "Stanford, CA",
    deadline: "2024-12-15",
    description: "Develop advanced machine learning models to predict patient outcomes and optimize treatment plans using large-scale healthcare datasets.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Machine Learning", "Healthcare", "Python"]
  },
  {
    id: 2,
    title: "Quantum Computing Research",
    institution: "MIT",
    category: "Physics",
    type: "Part-time",
    location: "Cambridge, MA",
    deadline: "2025-01-10",
    description: "Explore quantum algorithms and their applications in optimization problems, focusing on variational quantum eigensolvers.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Quantum Computing", "Physics", "Algorithms"]
  },
  {
    id: 3,
    title: "Climate Change Modeling",
    institution: "UC Berkeley",
    category: "Environmental Science",
    type: "Full-time",
    location: "Berkeley, CA",
    deadline: "2024-11-30",
    description: "Research climate change impacts through advanced computational modeling and data analysis of environmental systems.",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Climate", "Modeling", "Data Science"]
  },
  {
    id: 4,
    title: "Neural Networks in Robotics",
    institution: "Carnegie Mellon",
    category: "Robotics",
    type: "Full-time",
    location: "Pittsburgh, PA",
    deadline: "2024-12-20",
    description: "Apply deep learning techniques to improve robotic perception and decision-making in complex environments.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Robotics", "Neural Networks", "AI"]
  },
  {
    id: 5,
    title: "Genomics Data Analysis",
    institution: "Harvard Medical School",
    category: "Biology",
    type: "Part-time",
    location: "Boston, MA",
    deadline: "2025-01-15",
    description: "Analyze large-scale genomic data to identify genetic markers for disease susceptibility and treatment response.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Genomics", "Bioinformatics", "Medicine"]
  },
  {
    id: 6,
    title: "Sustainable Energy Systems",
    institution: "California Institute of Technology",
    category: "Engineering",
    type: "Full-time",
    location: "Pasadena, CA",
    deadline: "2024-12-01",
    description: "Design and optimize renewable energy systems with focus on solar and wind power integration into smart grids.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Energy", "Sustainability", "Engineering"]
  },
  {
    id: 7,
    title: "Cognitive Neuroscience Research",
    institution: "Yale University",
    category: "Neuroscience",
    type: "Part-time",
    location: "New Haven, CT",
    deadline: "2025-01-05",
    description: "Investigate neural mechanisms of memory and learning using advanced neuroimaging techniques and computational models.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Neuroscience", "Cognition", "fMRI"]
  },
  {
    id: 8,
    title: "Materials Science Innovation",
    institution: "Princeton University",
    category: "Materials Science",
    type: "Full-time",
    location: "Princeton, NJ",
    deadline: "2024-12-10",
    description: "Develop novel nanomaterials for energy storage applications and characterize their properties using advanced techniques.",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Materials", "Nanotechnology", "Energy"]
  }
];

const OpportunityModal = ({ opportunity, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-slate-100">
          <img 
            src={opportunity.image} 
            alt={opportunity.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white transition-colors"
          >
            <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-slate-100 text-slate-900 text-xs font-medium uppercase tracking-wider">
                {opportunity.type}
              </span>
              <span className="text-sm text-slate-500">{opportunity.category}</span>
            </div>
            
            <h2 className="text-3xl font-light text-slate-900 leading-tight tracking-tight">
              {opportunity.title}
            </h2>
            
            <p className="text-lg text-slate-600 font-light">
              {opportunity.institution}
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-light text-slate-900">About this position</h3>
            <p className="text-slate-600 leading-relaxed font-light">
              {opportunity.description}
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="text-xl font-light text-slate-900">Key areas</h3>
            <div className="flex flex-wrap gap-2">
              {opportunity.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-slate-50 text-slate-700 text-sm font-light border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button className="w-full px-8 py-3.5 bg-slate-900 text-white text-base font-medium tracking-wide hover:bg-slate-800 transition-all duration-200">
              Apply for this position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllPositionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    location: ''
  });
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allCategories = useMemo(() => {
    const categories = new Set();
    researchOpportunities.forEach(opp => categories.add(opp.category));
    return Array.from(categories);
  }, []);

  const allTypes = useMemo(() => {
    const types = new Set();
    researchOpportunities.forEach(opp => types.add(opp.type));
    return Array.from(types);
  }, []);

  const allLocations = useMemo(() => {
    const locations = new Set();
    researchOpportunities.forEach(opp => locations.add(opp.location.split(',').pop()?.trim() || ''));
    return Array.from(locations).filter(Boolean);
  }, []);

  const filteredOpportunities = useMemo(() => {
    setCurrentPage(1);
    return researchOpportunities.filter(opportunity => {
      const matchesSearch = searchQuery === '' || 
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !filters.category || opportunity.category === filters.category;
      const matchesType = !filters.type || opportunity.type === filters.type;
      const matchesLocation = !filters.location || 
        opportunity.location.toLowerCase().includes(filters.location.toLowerCase());
      
      return matchesSearch && matchesCategory && matchesType && matchesLocation;
    });
  }, [searchQuery, filters]);

  const clearFilters = () => {
    setFilters({
      category: '',
      type: '',
      location: ''
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOpportunities.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24">
        {/* Search and Filter Section */}
        <section className="pt-4 pb-6 md:pt-6">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <h2 className="text-base font-medium text-gray-900 mb-3">Find Research Positions</h2>
                <div className="relative flex items-stretch">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by position, institution, or keyword..."
                    className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm transition-colors"
                  />
                  <button 
                    className="ml-3 px-4 py-2.5 bg-gray-100 text-gray-700 font-normal rounded-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 transition-colors text-sm"
                    onClick={() => {}}
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="pt-4">
                <div className="flex items-center mb-4">
                  <span className="h-px bg-gray-200 flex-1"></span>
                  <span className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Filter by</span>
                  <span className="h-px bg-gray-200 flex-1"></span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wider">Category</label>
                    <select 
                      id="category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm transition-colors"
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                    >
                      <option value="">All Categories</option>
                      {allCategories.map((category) => (
                        <option key={category} value={category} className="text-gray-700">{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wider">Type</label>
                    <select 
                      id="type"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm transition-colors"
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                    >
                      <option value="">All Types</option>
                      {allTypes.map((type) => (
                        <option key={type} value={type} className="text-gray-700">{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wider">Location</label>
                    <select 
                      id="location"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm transition-colors"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    >
                      <option value="">All Locations</option>
                      {allLocations.map((location) => (
                        <option key={location} value={location} className="text-gray-700">{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {(searchQuery || Object.values(filters).some(Boolean)) && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-600 hover:text-gray-800 flex items-center font-medium"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="pb-16 -mt-2">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            {currentItems.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <p className="text-lg text-gray-500 font-light mb-4">No positions found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentItems.map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className="group cursor-pointer bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-gray-300 h-full flex flex-col"
                      onClick={() => setSelectedOpp(opportunity)}
                    >
                      {/* Image */}
                      <div className="relative h-[170px] overflow-hidden bg-gray-100">
                        <img 
                          src={opportunity.image} 
                          alt={opportunity.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 bg-white text-gray-900 text-[10px] font-semibold uppercase tracking-wider">
                            {opportunity.type}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4 space-y-2.5 flex-1 flex flex-col">
                        <div className="space-y-2">
                          <h3 className="text-[16px] font-normal text-gray-900 leading-[1.35] group-hover:text-gray-600 transition-colors">
                            {opportunity.title}
                          </h3>
                          
                          <p className="text-[13px] font-medium text-gray-600">
                            {opportunity.institution}
                          </p>
                        </div>
                        
                        <p className="text-[12.5px] text-gray-500 leading-[1.5] line-clamp-2 mb-1.5">
                          {opportunity.description}
                        </p>
                        
                        <div className="flex items-center gap-3 text-[11.5px] text-gray-500 mt-auto pt-1.5">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>{opportunity.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                              <line x1="16" x2="16" y1="2" y2="6"></line>
                              <line x1="8" x2="8" y1="2" y2="6"></line>
                              <line x1="3" x2="21" y1="10" y2="10"></line>
                            </svg>
                            <span>{new Date(opportunity.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                          currentPage === 1 
                            ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed' 
                            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            pageNumber === currentPage
                              ? 'z-10 bg-gray-100 border-gray-300 text-gray-700'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                          currentPage === totalPages 
                            ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed' 
                            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Opportunity Modal */}
        {selectedOpp && (
          <OpportunityModal
            opportunity={selectedOpp}
            onClose={() => setSelectedOpp(null)}
          />
        )}
      </main>
    </div>
  );
};

export default AllPositionsPage;