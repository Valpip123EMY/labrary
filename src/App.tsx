import { Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import AllPositionsPage from './pages/AllPositionsPage';
import MissionPage from './pages/MissionPage';
import UnchartedPage from './pages/UnchartedPage';
import TypeWriter from './components/TypeWriter';

// University Carousel Component
const UniversityCarousel = () => {
  const universities = [
    'https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/1200px-Harvard_University_coat_of_arms.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/1200px-Oxford-University-Circlet.svg.png',
    'https://www.cam.ac.uk/sites/default/files/secondary-logo-stacked.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/1200px-Yale_University_Shield_1.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/1200px-Princeton_seal.svg.png',
  ];

  return (
    <div className="w-full bg-white">
      <div className="pt-0 pb-8 w-full overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-40 mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full overflow-hidden h-16">
            <div 
              className="flex items-center absolute top-0 left-0 h-full whitespace-nowrap"
              style={{
                animation: 'scroll 20s linear infinite',
                animationPlayState: 'running',
                width: '200%',
                animationDirection: 'reverse'
              }}
            >
              {[...universities, ...universities].map((logo, index) => (
                <div key={`uni-${index}`} className="inline-flex items-center justify-center mx-4">
                  <img 
                    src={logo} 
                    alt={`University ${index + 1}`}
                    className="h-12 object-contain transition-all duration-300 hover:opacity-80"
                    style={{ minWidth: '120px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation:"] {
            animation: none !important;
          }
        }
      `}</style>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Content */}
      <div className="relative z-10">
        <Header fixed={false} />
        <Routes>
            <Route path="/" element={
              <>
                {/* Hero Section */}
                <section id="hero-section" className="w-full h-screen flex items-start justify-start relative overflow-hidden">
                  
                  {/* Right Side Paper */}
                  <div className="absolute right-40 top-2 transform w-80 hidden xl:block" style={{ right: '10%' }}>
                    <img 
                      src="https://ieeexplore.ieee.org/xploreAssets/images/absImages/01458660.png" 
                      alt="Research Paper" 
                      className="w-full h-auto border border-slate-200 rounded-sm shadow-sm"
                    />
                  </div>

                  <div className="w-full px-6 md:px-12 lg:px-40 mx-auto flex flex-col items-start text-left pt-2">
                    <div className="w-full max-w-4xl space-y-6">
                      {/* Heading */}
                      <div className="mb-2">
                        <h1 className="space-y-4">
                          <div className="text-8xl md:text-9xl lg:text-[6.5rem] font-light tracking-tighter text-slate-900 leading-[0.9]">
                            Research 
                          </div>
                          <div className="text-8xl md:text-9xl lg:text-[6.5rem] font-light tracking-tighter text-slate-900 leading-[0.9]">
                            <TypeWriter words={['democratized', ' made accessible', 'made inclusive']} delay={500} />
                          </div>
                        </h1>
                      </div>

                      {/* Description */}
                      <div className="my-2 max-w-2xl">
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light space-y-2">
                          <span className="block">Connecting exceptional researchers with world-class institutions.</span>
                          <span className="block">AI-powered matching. Always free. Forever accessible.</span>
                        </p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="h-6"></div>
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <Link 
                          to="/all-positions" 
                          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white text-base font-medium tracking-wide hover:bg-slate-800 transition-all duration-200"
                        >
                          <span>Browse Opportunities</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <span className="text-slate-400 text-sm font-light hidden sm:inline">or</span>
                        <Link 
                          to="/uncharted" 
                          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-slate-300 text-slate-900 text-base font-medium tracking-wide hover:border-slate-900 transition-all duration-200 group"
                        >
                          <span>Try Uncharted</span>
                          <span className="px-2 py-0.5 border border-slate-900 text-slate-900 text-xs font-medium uppercase tracking-wider group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200">Beta</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Engineers Section */}
                <section className="pt-0 pb-16 -mt-[12rem] bg-white w-full overflow-hidden">
                  <div className="w-full px-6 md:px-12 lg:px-40 mx-auto">
                    <div className="max-w-7xl mx-auto">
                      <p className="text-center text-xs font-medium text-slate-400 mb-2 tracking-widest uppercase">Engineers from</p>
                      <div className="relative w-full overflow-hidden h-16">
                        <div 
                          className="flex items-center absolute top-0 left-0 h-full whitespace-nowrap"
                          style={{
                            animation: 'scroll 20s linear infinite',
                            animationPlayState: 'running',
                            width: '200%'
                          }}
                        >
                          {[
                            'https://media.zenfs.com/en/globenewswire.com/1f59ea9f1ba022ccb65f194410ae110f',
                            'https://mghanesthesiaresearch.com/wp-content/uploads/2019/12/MGH_Logo_wide-4.png',
                            'https://geiselmed.dartmouth.edu/news/wp-content/uploads/sites/2/2022/04/DH-new-nc.png',
                            'https://upload.wikimedia.org/wikipedia/commons/2/26/Jacobs_School_logo.png',
                            'https://assets.themuse.com/uploaded/companies/11832/small_logo.png',
                            'https://logos-world.net/wp-content/uploads/2020/04/Huawei-Logo.png',
                            'https://thebasement.ucsd.edu/_images/BLP-Logo.png'
                          ].map((logo, index) => (
                            <div key={index} className="inline-flex items-center justify-center mx-4">
                              <img 
                                src={logo} 
                                alt={`Logo ${index + 1}`} 
                                className="h-12 object-contain transition-all duration-300 hover:opacity-80"
                                style={{ minWidth: '120px' }}
                              />
                            </div>
                          ))}
                          {/* Duplicate for seamless loop */}
                          {[
                            'https://media.zenfs.com/en/globenewswire.com/1f59ea9f1ba022ccb65f194410ae110f',
                            'https://mghanesthesiaresearch.com/wp-content/uploads/2019/12/MGH_Logo_wide-4.png',
                            'https://geiselmed.dartmouth.edu/news/wp-content/uploads/sites/2/2022/04/DH-new-nc.png',
                            'https://upload.wikimedia.org/wikipedia/commons/2/26/Jacobs_School_logo.png',
                            'https://assets.themuse.com/uploaded/companies/11832/small_logo.png',
                            'https://logos-world.net/wp-content/uploads/2020/04/Huawei-Logo.png',
                            'https://thebasement.ucsd.edu/_images/BLP-Logo.png'
                          ].map((logo, index) => (
                            <div key={`dupe-${index}`} className="inline-flex items-center justify-center mx-4">
                              <img 
                                src={logo} 
                                alt={`Logo ${index + 1}`} 
                                className="h-12 object-contain transition-all duration-300 hover:opacity-80"
                                style={{ minWidth: '120px' }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <style jsx global>{`
                    @keyframes scroll {
                      0% {
                        transform: translateX(0);
                      }
                      100% {
                        transform: translateX(-50%);
                      }
                    }
                    @media (prefers-reduced-motion: reduce) {
                      [style*="animation:"] {
                        animation: none !important;
                      }
                    }
                  `}</style>
                </section>

                {/* About Section */}
                <section className="pt-0 pb-32 bg-white relative">
                  <div className="absolute inset-0 bg-white z-0"></div>
                  
                  <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                      {/* Text Content */}
                      <div className="space-y-8">
                        <h2 className="space-y-2">
                          <div className="text-5xl md:text-6xl font-light text-slate-900 leading-tight tracking-tight">
                            Where brilliant minds
                          </div>
                          <div className="text-5xl md:text-6xl font-light text-slate-900 leading-tight tracking-tight">
                            <span className="italic font-serif">find their place</span> in research
                          </div>
                        </h2>
                        
                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
                          <p className="text-slate-700">
                            In a world where research opportunities are often hidden behind institutional walls, we're tearing down barriers. Labrary is more than a platform—it's a movement to democratize access to cutting-edge research.
                          </p>
                          <p className="text-slate-600">
                            Our AI doesn't just match skills to positions; it understands research potential, academic aspirations, and the unwritten rules of academic success. We're not just filling positions—we're building the future of research collaboration.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200/70">
                          <div className="group">
                            <div className="text-4xl font-light text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">10K+</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium group-hover:text-slate-700 transition-colors">Research Enthusiasts</div>
                          </div>
                          <div className="group">
                            <div className="text-4xl font-light text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">500+</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium group-hover:text-slate-700 transition-colors">Cutting-Edge Positions</div>
                          </div>
                          <div className="group">
                            <div className="text-4xl font-light text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">50+</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium group-hover:text-slate-700 transition-colors">Leading Institutions</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Image/Cards */}
                      <div className="relative h-[500px]">
                        <div className="absolute inset-0">
                          {/* Card 1 - Bottom Left */}
                          <div className="absolute w-[85%] h-[380px] bg-white border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 -left-3 bottom-12 z-10 transform -rotate-3 origin-bottom-left">
                            <div className="relative h-40 bg-slate-100 overflow-hidden">
                              <img 
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                                alt="Research"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-5 space-y-3">
                              <div className="text-xs text-slate-400 uppercase tracking-widest">Full-time</div>
                              <h3 className="text-lg font-light text-slate-900 leading-tight">
                                Machine Learning for Healthcare Analytics
                              </h3>
                              <p className="text-xs text-slate-500 font-light">Stanford University</p>
                              <p className="text-xs text-slate-600 leading-relaxed font-light">
                                Develop advanced machine learning models to predict patient outcomes and optimize treatment plans.
                              </p>
                              <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-100">
                                <span>Stanford, CA</span>
                                <span>Dec 15, 2024</span>
                              </div>
                            </div>
                          </div>

                          {/* Card 2 - Top Right */}
                          <div className="absolute w-[85%] h-[380px] bg-white border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 -right-3 top-3 z-10 transform rotate-3 origin-top-right">
                            <div className="relative h-40 bg-slate-100 overflow-hidden">
                              <img 
                                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                                alt="Research"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-5 space-y-3">
                              <div className="text-xs text-slate-400 uppercase tracking-widest">Part-time</div>
                              <h3 className="text-lg font-light text-slate-900 leading-tight">
                                Quantum Computing Research
                              </h3>
                              <p className="text-xs text-slate-500 font-light">MIT</p>
                              <p className="text-xs text-slate-600 leading-relaxed font-light">
                                Explore quantum algorithms and their applications in optimization problems.
                              </p>
                              <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-100">
                                <span>Cambridge, MA</span>
                                <span>Jan 10, 2025</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* University Carousel */}
                <div className="relative bg-white -mt-24">
                  <div className="relative z-50">
                    <div className="w-full px-6 md:px-12 lg:px-40 mx-auto">
                      <div className="max-w-7xl mx-auto">
                        <p className="text-center text-xs font-medium text-slate-400 mb-4 tracking-widest uppercase relative z-50">
                          Trusted by students from
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative -mt-2">
                    <UniversityCarousel />
                  </div>
                </div>

                {/* FAQ Section */}
                <section className="relative py-16 bg-white">
                  
                  <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
                    <div className="text-center mb-26">
                      <h2 className="space-y-2">
                        <div className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-slate-900 leading-none">
                          Your questions,
                        </div>
                        <div className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-slate-900 leading-none">
                          <span className="italic font-serif">answered</span>.
                        </div>
                      </h2>
                      <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                        Everything you need to know about finding and securing your ideal research position.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 max-w-6xl mx-auto">
                      {/* Left Column */}
                      <div className="space-y-16">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-light text-slate-900">
                            How does Labrary connect me with research opportunities?
                          </h3>
                          <p className="text-slate-600 leading-relaxed font-light">
                            Our AI analyzes your academic profile, research interests, and skills to match you with the most relevant opportunities across top institutions. We ensure perfect alignment with your academic journey.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-light text-slate-900">
                            How do I create a strong profile?
                          </h3>
                          <p className="text-slate-600 leading-relaxed font-light">
                            Highlight your academic background, research experience, technical skills, and research interests. The more detailed your profile, the better our AI can match you with ideal opportunities.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-light text-slate-900">
                            How should I prepare my application?
                          </h3>
                          <p className="text-slate-600 leading-relaxed font-light">
                            Review position requirements carefully, tailor your materials to highlight relevant experience, and be ready to discuss your research interests and goals in detail.
                          </p>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-16">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-light text-slate-900">
                            What makes Labrary different from other platforms?
                          </h3>
                          <p className="text-slate-600 leading-relaxed font-light">
                            We focus exclusively on academic research, partnering directly with leading institutions to provide vetted, high-quality opportunities that truly advance your career.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-light text-slate-900">
                            What types of positions are available?
                          </h3>
                          <p className="text-slate-600 leading-relaxed font-light">
                            From undergraduate research assistant roles to postdoctoral positions, we cover the full spectrum of academic research opportunities across all major disciplines.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-light text-slate-900">
                            Is there support during the application process?
                          </h3>
                          <p className="text-slate-600 leading-relaxed font-light">
                            Absolutely! We provide resources and guidance to help you craft strong applications and prepare for interviews, ensuring you put your best foot forward.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-24 text-center">
                      <p className="text-slate-600 mb-8 text-lg font-light">Still have questions about Labrary?</p>
                      <button className="group inline-flex items-center gap-2 px-8 py-3.5 border border-slate-900 text-slate-900 text-sm font-medium tracking-wide hover:bg-slate-900 hover:text-white transition-all duration-200 rounded-full">
                        <span>Contact our support team</span>
                        <svg className="w-3.5 h-3.5 -mr-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-32 flex items-center justify-center relative overflow-hidden bg-white">
                  {/* Top gradient fade */}
                  <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white to-transparent z-0"></div>
                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-white to-transparent z-0"></div>
                  
                  <div className="w-full px-6 mx-auto text-center max-w-5xl relative z-10">
                    {/* Heading */}
                    <div className="mb-7">
                      <h2 className="space-y-2">
                        <div className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-slate-900 leading-none">
                          Ready to start your
                        </div>
                        <div className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-slate-900 leading-none">
                          <span className="italic font-serif">research journey</span>?
                        </div>
                      </h2>
                    </div>

                    {/* Description */}
                    <div className="mb-12 max-w-2xl mx-auto">
                      <p className="text-lg text-slate-600 leading-relaxed font-light">
                        Join thousands of researchers advancing their careers with Labrary.
                        <br className="hidden md:block" />
                        AI-powered matching. Always free. Forever accessible.
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                      <Link 
                        to="/all-positions" 
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white text-sm font-medium tracking-wide hover:bg-slate-800 transition-all duration-200"
                      >
                        <span>Browse Opportunities</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <span className="text-slate-400 text-sm font-light hidden sm:inline">or</span>
                      <Link 
                        to="/uncharted" 
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-slate-300 text-slate-900 text-sm font-medium tracking-wide hover:border-slate-900 transition-all duration-200 group"
                      >
                        <span>Try Uncharted AI</span>
                        <span className="px-2 py-0.5 border border-slate-900 text-slate-900 text-xs font-medium uppercase tracking-wider group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200">Beta</span>
                      </Link>
                    </div>
                    
                  </div>
                </section>
              </>
            } />
            
            <Route path="/all-positions" element={
              <div className="pt-[70px]">
                <AllPositionsPage />
              </div>
            } />
            
            <Route path="/mission" element={
              <div className="pt-[70px]">
                <MissionPage />
              </div>
            } />
            
            <Route path="/uncharted" element={
              <div className="pt-[70px]">
                <UnchartedPage />
              </div>
            } />
            
            <Route path="*" element={
              <div className="min-h-screen bg-white pt-[70px]">
                <div className="container mx-auto px-4 py-16 text-center">
                  <h1 className="text-4xl font-light mb-4">Page Not Found</h1>
                  <p className="text-lg text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                  <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
                </div>
              </div>
            } />
          </Routes>

        {/* Footer */}
        <footer className="relative bottom-0 left-0 right-0 z-[1000] bg-white border-t border-gray-200">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <nav className="flex items-center justify-between h-[80px]">
              <div className="flex items-center space-x-8">
                <Link 
                  to="/mission" 
                  className="text-[15px] transition-colors font-serif font-normal text-gray-600 hover:text-gray-900"
                >
                  About
                </Link>
                <a 
                  href="#" 
                  className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors font-serif font-normal"
                >
                  Contact
                </a>
                <a 
                  href="#" 
                  className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors font-serif font-normal"
                >
                  Privacy
                </a>
                <a 
                  href="#" 
                  className="text-[15px] text-gray-600 hover:text-gray-900 transition-colors font-serif font-normal"
                >
                  Terms
                </a>
              </div>
              <div className="text-gray-600 text-sm font-light">
                © {new Date().getFullYear()} Labrary Research
              </div>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;