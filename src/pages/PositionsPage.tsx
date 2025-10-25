import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { researchOpportunities } from '../data/opportunities';
import { ResearchOpportunity } from '../types';
import { OpportunityCard } from '../components/OpportunityCard';
import { Header } from '../components/Header';

const PositionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredOpportunities = useMemo(() => {
    return researchOpportunities.filter(opportunity => 
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled reactively through the filteredOpportunities
  };

  const handleOpportunityClick = (id: string) => {
    navigate(`/opportunity/${id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Research Positions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover research opportunities from top institutions around the world
            </p>
            
            {/* Search bar */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  placeholder="Search research positions, institutions, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Positions Section */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="container px-8 md:px-12">
          <div className="space-y-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h2 className="text-2xl font-light text-gray-900">
                  Available Positions
                </h2>
                <div className="mt-4 md:mt-0">
                  <span className="text-sm text-gray-500">
                    {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'position' : 'positions'} found
                  </span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-8">
                <select className="px-4 py-2 border border-gray-300 rounded-full text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Categories</option>
                  <option>Computer Science</option>
                  <option>Physics</option>
                  <option>Biology</option>
                  <option>Engineering</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-full text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>All Types</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-full text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Any Location</option>
                  <option>United States</option>
                  <option>Europe</option>
                  <option>Asia</option>
                </select>
              </div>

              {filteredOpportunities.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-lg text-gray-400 font-light">No positions found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredOpportunities.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      onViewDetails={() => handleOpportunityClick(opportunity.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PositionsPage;
