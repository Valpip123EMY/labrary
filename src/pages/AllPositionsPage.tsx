import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { researchOpportunities } from '../data/opportunities';
import { ResearchOpportunity } from '../types';
import { OpportunityModal } from '../components/OpportunityModal';
import { Header } from '../components/Header';

const AllPositionsPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    location: ''
  });
  const [selectedOpp, setSelectedOpp] = useState<ResearchOpportunity | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 6 items per page for 2x3 grid
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  // Initialize search from URL
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(decodeURIComponent(search));
    }
  }, [searchParams]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    researchOpportunities.forEach(opp => categories.add(opp.category));
    return Array.from(categories);
  }, []);

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    researchOpportunities.forEach(opp => types.add(opp.type));
    return Array.from(types);
  }, []);

  const allLocations = useMemo(() => {
    const locations = new Set<string>();
    researchOpportunities.forEach(opp => locations.add(opp.location.split(',').pop()?.trim() || ''));
    return Array.from(locations).filter(Boolean);
  }, []);

  const filteredOpportunities = useMemo(() => {
    // Reset to first page when filters change
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

  // Calculate pagination
  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOpportunities.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Show 3 page numbers at a time
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, current page with neighbors, and last page
      const startPage = Math.max(1, Math.min(currentPage - 1, totalPages - maxVisiblePages + 1));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('...');
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-8">
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
                  onClick={() => {}} // Search is handled by the input's onChange
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container px-8 md:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-3">
              <Link to="/" className="flex items-center gap-1">
                <img 
                  src="https://cdn-icons-png.freepik.com/512/12377/12377562.png" 
                  alt="Labrary Research Logo" 
                  className="h-6 w-6 object-contain"
                />
                <div className="text-[18px] font-light">
                  <span className="text-gray-900">Labrary</span><span className="text-gray-400"></span>
                </div>
              </Link>
              <p className="text-[14px] text-gray-600 leading-[1.7] font-light max-w-xs">
                Connecting exceptional researchers with world-class institutions.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-gray-900 font-semibold text-[12px] uppercase tracking-wider">Platform</h4>
              <div className="space-y-2.5">
                <Link to="/all-positions" className="block text-gray-600 hover:text-gray-900 text-[14px] transition-colors font-light">Opportunities</Link>
                <Link to="/institutions" className="block text-gray-600 hover:text-gray-900 text-[14px] transition-colors font-light">Institutions</Link>
                <a href="#" className="block text-gray-600 hover:text-gray-900 text-[14px] transition-colors font-light">Success Stories</a>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-gray-900 font-semibold text-[12px] uppercase tracking-wider">Company</h4>
              <div className="space-y-2.5">
                <Link to="/mission" className="block text-gray-600 hover:text-gray-900 text-[14px] transition-colors font-light">About</Link>
                <a href="#" className="block text-gray-600 hover:text-gray-900 text-[14px] transition-colors font-light">Contact</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 text-[14px] transition-colors font-light">Careers</a>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-gray-900 font-semibold text-[12px] uppercase tracking-wider">Legal</h4>
              <div className="space-y-2.5">
                <a href="#" className="block text-gray-600 hover:text-gray-900 text-[14px] transition-colors font-light">Privacy Policy</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 text-[14px] transition-colors font-light">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-16 pt-8">
            <p className="text-gray-500 text-[13px] text-center font-light">
              &copy; {new Date().getFullYear()} labrary.research. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AllPositionsPage;