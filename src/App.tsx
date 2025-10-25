import { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { researchOpportunities } from './data/opportunities';
import { ResearchOpportunity } from './types';
import AllPositionsPage from './pages/AllPositionsPage';
import InstitutionsPage from './pages/InstitutionsPage';
import MissionPage from './pages/MissionPage';
import { PageTransition } from './components/PageTransition';
import { OpportunityCard } from './components/OpportunityCard';
import { InstitutionsCarousel } from './components/InstitutionsCarousel';
import { OpportunityModal } from './components/OpportunityModal';

// Birds Background Component
const BirdsBackground = () => {
  useEffect(() => {
    const container = document.getElementById('birds-container');
    if (!container) return;

    const numBirds = 25;
    const waveCenter = 45;
    const waveThickness = 18;

    for (let i = 0; i < numBirds; i++) {
      const bird = document.createElement('div');
      bird.className = 'bird';
      
      const offset = (Math.random() - 0.5) * waveThickness;
      const startScale = 0.2 + Math.random() * 0.3;
      const duration = 10 + Math.random() * 12;
      // Start with a negative delay to begin animation partway through
      const delay = -5 + (Math.random() * 15); // Start between -5 and 10 seconds
      const flapSpeed = 0.6 + Math.random() * 0.7;
      
      bird.style.cssText = `
        --wave-center: ${waveCenter}vh;
        --offset: ${offset}vh;
        --start-scale: ${startScale};
        animation-duration: ${flapSpeed}s, ${duration}s;
        animation-delay: ${delay}s, ${delay}s;
      `;
      
      container.appendChild(bird);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <>
      <style>{`
        #birds-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          pointer-events: none;
          z-index: 5; /* Birds below image, above background */
          overflow: hidden;
        }

        .bird {
          background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/174479/bird-cells-new.svg);
          background-size: auto 100%;
          width: 88px;
          height: 125px;
          position: absolute;
          opacity: 1;
          left: 0;
          top: 0;
          transform: translateX(-10vw) translateY(calc(var(--wave-center, 45vh) + var(--offset, 0))) scale(var(--start-scale, 0.5));
          animation: fly-cycle steps(10) infinite, fly-wave linear infinite;
          z-index: 5; /* Birds below image, above background */
          will-change: transform, opacity;
        }

        @keyframes fly-cycle {
          100% {
            background-position: -900px 0;
          }
        }

        @keyframes fly-wave {
          0% {
            transform: translateX(-10vw) translateY(calc(var(--wave-center) + var(--offset))) scale(var(--start-scale));
            opacity: 1;
          }
          1% {
            opacity: 1;
          }
          2% {
            opacity: 0.4;
          }
          10% {
            transform: translateX(10vw) translateY(calc(var(--wave-center) - 8vh + var(--offset))) scale(calc(var(--start-scale) + 0.1));
          }
          20% {
            transform: translateX(20vw) translateY(calc(var(--wave-center) - 4vh + var(--offset))) scale(calc(var(--start-scale) + 0.15));
          }
          30% {
            transform: translateX(30vw) translateY(calc(var(--wave-center) + 2vh + var(--offset))) scale(calc(var(--start-scale) + 0.2));
          }
          40% {
            transform: translateX(40vw) translateY(calc(var(--wave-center) + 8vh + var(--offset))) scale(calc(var(--start-scale) + 0.25));
          }
          50% {
            transform: translateX(50vw) translateY(calc(var(--wave-center) + 6vh + var(--offset))) scale(calc(var(--start-scale) + 0.3));
          }
          60% {
            transform: translateX(60vw) translateY(calc(var(--wave-center) - 2vh + var(--offset))) scale(calc(var(--start-scale) + 0.35));
          }
          70% {
            transform: translateX(70vw) translateY(calc(var(--wave-center) - 8vh + var(--offset))) scale(calc(var(--start-scale) + 0.4));
          }
          80% {
            transform: translateX(80vw) translateY(calc(var(--wave-center) - 4vh + var(--offset))) scale(calc(var(--start-scale) + 0.4));
          }
          90% {
            transform: translateX(90vw) translateY(calc(var(--wave-center) + 4vh + var(--offset))) scale(calc(var(--start-scale) + 0.4));
          }
          100% {
            transform: translateX(110vw) translateY(calc(var(--wave-center) + 2vh + var(--offset))) scale(calc(var(--start-scale) + 0.4));
          }
        }
      `}</style>
      <div id="birds-container" />
    </>
  );
};

// Header component to be consistent across all pages
const Header = () => (
  <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-[1000] shadow-sm">
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
      <nav className="flex items-center justify-between py-6">
        <Link to="/" className="flex items-center text-2xl font-light gap-1">
          <img 
            src="https://cdn-icons-png.freepik.com/512/12377/12377562.png" 
            alt="Labrary Research Logo" 
            className="h-8 w-8 object-contain"
          />
          <div>
            <span className="text-gray-900 font-light">Labrary</span><span className="text-gray-400"></span>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-900 font-medium">Home</Link>
          <Link to="/all-positions" className="text-gray-600 hover:text-gray-900">Positions</Link>
          <Link to="/institutions" className="text-gray-600 hover:text-gray-900">Institutions</Link>
          <Link to="/mission" className="text-gray-600 hover:text-gray-900">Mission</Link>
        </div>
      </nav>
    </div>
  </header>
);

function App() {
  const [searchQuery] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState<ResearchOpportunity | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const filteredOpportunities = useMemo(() => {
    return researchOpportunities.filter((opp) => {
      const matchesSearch = searchQuery === '' || 
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSearch;
    });
  }, [searchQuery]);


  return (
    <>
      {isHomePage && <BirdsBackground />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/mission" element={
            <PageTransition>
              <div className="pt-[70px]">
                <MissionPage />
              </div>
            </PageTransition>
          } />
          <Route path="/" element={
            <PageTransition>
              <div className="min-h-screen bg-white pt-[70px] relative">
                <Header />
                
                {/* Hero Section - Policy Research Design */}
                <section className="w-full bg-white py-20 relative">
                  <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                      {/* Left Content */}
                      <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-slate-100 px-5 py-2 rounded-full text-sm text-slate-600">
                          <span className="text-slate-400 text-xs">◆</span>
                          AI-Powered Research Aggregation
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
                          Democratizing<br />
                          <span className="font-semibold text-slate-900">research work</span><br />
                          <span className="text-slate-400">with AI</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                          Connect with research opportunities and leverage AI to accelerate your academic journey.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link 
                            to="/all-positions" 
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-all hover:-translate-y-0.5 hover:shadow-lg font-medium text-sm"
                          >
                            View Opportunities
                            <span>→</span>
                          </Link>
                          <Link 
                            to="/institutions" 
                            className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-md hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-md transition-all font-medium text-sm"
                          >
                            Browse Institutions
                          </Link>
                        </div>
                      </div>

                      {/* Right Content */}
                      <div className="lg:block hidden flex items-center justify-center w-full max-w-xl relative" style={{ zIndex: 10 }}>
                        <img 
  src="https://images.unsplash.com/photo-1529528744093-6f8abeee511d?w=1000&q=80" 
  alt="Research Work Visualization" 
  className="w-full h-auto rounded-xl object-cover"
  style={{
    opacity: 1,
    aspectRatio: '16/10',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 100
  }}
/>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Institutions Carousel */}
                <div className="relative" style={{ position: 'relative', zIndex: 10 }}>
                  <InstitutionsCarousel />
                </div>

                {/* Opportunities Section */}
                <section className="w-full bg-gray-50 py-12 relative" style={{ position: 'relative', zIndex: 1 }}>
                  <div className="container px-4 mx-auto">
                    <div className="max-w-6xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="text-2xl font-light text-gray-900 mb-2">Featured Research Positions</h2>
                        <p className="text-gray-600">
                          Explore opportunities from leading research institutions
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOpportunities.slice(0, 6).map((opportunity) => (
                          <div key={opportunity.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <OpportunityCard 
                              opportunity={opportunity} 
                              onViewDetails={setSelectedOpportunity} 
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 text-center">
                        <Link 
                          to="/all-positions" 
                          className="inline-block px-6 py-2 border border-black rounded-md text-black hover:bg-gray-50 transition-colors"
                        >
                          View All Positions
                        </Link>
                      </div>
                    </div>
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
                
                {selectedOpportunity && (
                  <OpportunityModal
                    opportunity={selectedOpportunity}
                    onClose={() => setSelectedOpportunity(null)}
                  />
                )}
              </div>
            </PageTransition>
          } />
          <Route path="/all-positions" element={
            <PageTransition>
              <div className="pt-[70px]">
                <AllPositionsPage />
              </div>
            </PageTransition>
          } />
          <Route path="/institutions" element={
            <PageTransition>
              <div className="pt-[70px]">
                <InstitutionsPage />
              </div>
            </PageTransition>
          } />
          <Route path="*" element={
            <PageTransition>
              <div className="min-h-screen bg-white pt-[70px]">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                  <h1 className="text-4xl font-light mb-4">Page Not Found</h1>
                  <p className="text-lg text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                  <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
                </div>
              </div>
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;