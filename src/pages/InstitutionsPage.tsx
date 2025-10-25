import { Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { Header } from '../components/Header';

// Import local logo images
import stanfordLogo from '../assets/stanford-logo.png';
import oxfordLogo from '../assets/oxford-logo.png';
import tokyoLogo from '../assets/tokyo-logo.png';
import nusLogo from '../assets/nus-logo.png';

const institutions = [
  {
    name: 'Stanford University',
    location: 'Stanford, CA',
    description: 'A leading research institution known for innovation and interdisciplinary collaboration.',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR9Sq1yj4dMTeHCc1pUQo9_0XtYbuIR68Ayg&s',
    researchAreas: ['Computer Science', 'Medicine', 'Engineering', 'Humanities']
  },
  {
    name: 'MIT',
    location: 'Cambridge, MA',
    description: 'World-renowned for cutting-edge research in technology and science.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2560px-MIT_logo.svg.png',
    researchAreas: ['Artificial Intelligence', 'Robotics', 'Physics', 'Economics']
  },
  {
    name: 'ETH Zurich',
    location: 'Zurich, Switzerland',
    description: 'A global leader in science and technology with a strong entrepreneurial tradition.',
    logo: 'https://ethz.ch/etc/designs/ethz/img/header/ethz_logo_black.svg',
    researchAreas: ['Engineering', 'Chemistry', 'Physics', 'Mathematics']
  },
  {
    name: 'University of Tokyo',
    location: 'Tokyo, Japan',
    description: 'Japan\'s premier research university with a rich history of academic excellence.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/University_of_Tokyo_logo%2C_basic%2C_horizontal_%282004%E2%80%932024%29.svg',
    researchAreas: ['Robotics', 'Biotechnology', 'Materials Science', 'Asian Studies']
  },
  {
    name: 'University of Oxford',
    location: 'Oxford, UK',
    description: 'The oldest university in the English-speaking world, with a diverse research portfolio.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/University_of_Oxford.svg',
    researchAreas: ['Medicine', 'Humanities', 'Social Sciences', 'Physical Sciences']
  },
  {
    name: 'National University of Singapore',
    location: 'Singapore',
    description: 'A leading global university with strengths in research and enterprise.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/NationalUniversityofSingapore.svg/250px-NationalUniversityofSingapore.svg.png',
    researchAreas: ['Engineering', 'Computing', 'Business', 'Life Sciences']
  },
  {
    name: 'Harvard University',
    location: 'Cambridge, MA',
    description: 'Ivy League institution with world-class research across all major academic disciplines.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg/1200px-Harvard_University_logo.svg.png',
    researchAreas: ['Law', 'Business', 'Medicine', 'Government']
  },
  {
    name: 'California Institute of Technology',
    location: 'Pasadena, CA',
    description: 'Small but mighty institution with exceptional strength in science and engineering.',
    logo: 'https://www.designyourway.net/blog/wp-content/uploads/2024/04/the-font-used-in-the-caltech-logo.png',
    researchAreas: ['Physics', 'Astronomy', 'Engineering', 'Computer Science']
  },
  {
    name: 'University of Cambridge',
    location: 'Cambridge, UK',
    description: 'Historic institution with a strong tradition of academic excellence and research.',
    logo: 'https://www.cam.ac.uk/sites/default/files/university-cambridge-full-colour-preferred-logo-transparency-2362x491.png',
    researchAreas: ['Natural Sciences', 'Mathematics', 'History', 'Literature']
  },
  {
    name: 'Peking University',
    location: 'Beijing, China',
    description: 'China\'s leading institution with comprehensive academic disciplines.',
    logo: 'https://www.lead2-project.eu/sites/default/files/inline-images/pekingu.png',
    researchAreas: ['Chinese Studies', 'Chemistry', 'Economics', 'Environmental Science']
  },
  {
    name: 'University of Toronto',
    location: 'Toronto, Canada',
    description: 'Canada\'s leading university with strengths in research and innovation.',
    logo: 'https://www.diglib.org/wp-content/uploads/sites/3/2014/12/UofT_Logo.svg-copy.jpg',
    researchAreas: ['Medicine', 'Engineering', 'Humanities', 'Social Sciences']
  },
  {
    name: 'Technical University of Munich',
    location: 'Munich, Germany',
    description: 'Germany\'s top technical university with strong industry connections.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/TU_Muenchen_Logo.svg/1280px-TU_Muenchen_Logo.svg.png',
    researchAreas: ['Engineering', 'Computer Science', 'Physics', 'Life Sciences']
  },
  {
    name: 'University of Melbourne',
    location: 'Melbourne, Australia',
    description: 'Australia\'s leading research-intensive university with global impact.',
    logo: 'https://ires.ubc.ca/files/2020/08/the-university-of-melbourne-vector-logo.jpg',
    researchAreas: ['Biomedicine', 'Law', 'Education', 'Arts']
  },
  {
    name: 'University of Cape Town',
    location: 'Cape Town, South Africa',
    description: 'Africa\'s leading research institution with a focus on global challenges.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/University_of_Cape_Town_logo.svg/1280px-University_of_Cape_Town_logo.svg.png',
    researchAreas: ['African Studies', 'Public Health', 'Environmental Science', 'Politics']
  }
];

// Add region mapping for each institution
const institutionsWithRegions = institutions.map((institution, index) => {
  const regions = [
    'North America', 'North America', 'Europe', 'Asia', 'Europe', 'Asia',
    'North America', 'Europe', 'Europe', 'Asia', 'North America', 'Europe',
    'Oceania', 'Africa'
  ];
  return {
    ...institution,
    region: regions[index] || 'International'
  };
});

const InstitutionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 6 items per page for 2x3 grid

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredInstitutions = useMemo(() => {
    return institutionsWithRegions.filter(institution => {
      return searchQuery === '' || 
        institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        institution.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        institution.researchAreas.some(area => 
          area.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
  }, [searchQuery]);
  // Calculate pagination
  const totalPages = Math.ceil(filteredInstitutions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInstitutions = filteredInstitutions.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-8">
        {/* Search Section */}
        <section className="pt-4 pb-6 md:pt-6">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-base font-medium text-gray-900 mb-3">Find Research Institutions</h2>
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
                  placeholder="Search by institution name, location, or research area..."
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm transition-colors"
                />
                <button 
                  className="ml-3 px-4 py-2.5 bg-gray-100 text-gray-700 font-normal rounded-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 transition-colors text-sm"
                >
                  Search
                </button>
              </div>
            </div>
            </div>
          </div>
        </section>
      </main>

      {/* Institutions Grid */}
      <section className="pb-16 mt-6">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          {filteredInstitutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentInstitutions.map((institution, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-gray-300"
                >
                  {/* Logo */}
                  <div className="h-[180px] bg-gray-50 flex items-center justify-center p-6">
                    <img 
                      src={institution.logo} 
                      alt={`${institution.name} logo`} 
                      className="max-h-16 max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 space-y-5">
                    <div className="space-y-3">
                      <h3 className="text-[20px] font-normal text-gray-900 leading-[1.4] group-hover:text-gray-600 transition-colors">
                        {institution.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-[15px] text-gray-500">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{institution.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-[14px] text-gray-500 leading-[1.7] line-clamp-3">
                      {institution.description}
                    </p>
                    
                    <div className="pt-2">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Research Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {institution.researchAreas.map((area, i) => (
                          <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Link 
                        to={`/all-positions?search=${encodeURIComponent(institution.name)}`}
                        className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                      >
                        View Opportunities
                        <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <p className="text-lg text-gray-500 font-light mb-4">No institutions found matching your criteria</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
          
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
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Always show first page, last page, and current page with neighbors
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1; // First 5 pages
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i; // Last 5 pages
                  } else {
                    pageNumber = currentPage - 2 + i; // Middle pages
                  }
                  
                  if (i === 3 && currentPage < totalPages - 3) {
                    return <span key="ellipsis" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>;
                  }
                  
                  if (i === 1 && currentPage > 4) {
                    return <span key="ellipsis-start" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>;
                  }
                  
                  if ((i === 3 && currentPage >= totalPages - 3) || (i === 4 && currentPage > 4)) {
                    return null;
                  }
                  
                  return (
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
                  );
                })}
                
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">Representing an Institution?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network of leading research institutions and connect with top talent from around the world.
          </p>
          <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors">
            List Your Institution
          </button>
        </div>
      </section>

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

export default InstitutionsPage;
