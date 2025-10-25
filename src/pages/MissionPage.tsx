import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';

const MissionPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Add padding to account for fixed header */}
      <main className="pt-[70px] pb-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 space-y-16">
          {/* Hero Section */}
          <motion.section 
            className="flex flex-col lg:flex-row items-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
                The Future of <span className="font-normal text-gray-700">Research</span> is Collaborative
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Where brilliant minds meet groundbreaking opportunities. We're reimagining how research talent connects with institutions, creating a more dynamic and accessible research ecosystem.
              </p>
            </div>
            <div className="lg:w-1/2 overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Research collaboration"
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
            </div>
          </motion.section>

          {/* Purpose Section */}
          <motion.section 
            className="flex flex-col lg:flex-row-reverse items-center gap-12 pt-16 border-t border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <div className="lg:w-1/2">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2 inline-block">Our Mission</span>
              <h2 className="text-3xl font-light text-gray-900 mb-6 leading-tight">Bridging the Gap in Research Collaboration</h2>
              <div className="space-y-5 text-gray-600">
                <p className="leading-relaxed text-gray-700">
                  The research landscape is fragmented, making it difficult for talented researchers to find the right opportunities and for institutions to discover top talent. Traditional academic job boards are outdated and don't serve the needs of modern researchers.
                </p>
                <p className="leading-relaxed">
                  We're changing that by creating a platform that brings together researchers and institutions in a more meaningful way, focusing on the unique needs of the research community.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Data analysis"
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
            </div>
          </motion.section>

          {/* Vision Section */}
          <motion.section 
            className="flex flex-col lg:flex-row items-center gap-12 pt-16 border-t border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <div className="lg:w-1/2">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2 inline-block">Our Vision</span>
              <h2 className="text-3xl font-light text-gray-900 mb-6 leading-tight">Accelerating Scientific Discovery Through Connection</h2>
              <div className="space-y-5 text-gray-600">
                <p className="leading-relaxed">
                  We envision a world where every researcher can find the perfect opportunity to advance their work, and every institution can easily connect with the talent they need to drive innovation forward.
                </p>
                <p className="leading-relaxed text-gray-700">
                  By creating a more connected research community, we're helping to accelerate scientific discovery and technological advancement across all disciplines.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Scientific research"
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            className="pt-16 border-t border-gray-100 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <div className="max-w-3xl mx-auto">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2 inline-block">Join Us</span>
              <h2 className="text-3xl font-light text-gray-900 mb-6 leading-tight">Be Part of the Research Revolution</h2>
              <div className="space-y-6 text-gray-600 max-w-2xl mx-auto mb-8">
                <p className="leading-relaxed">
                  We're building more than a platform – we're creating a community that's redefining research collaboration. Our goal is to break down barriers and create new opportunities for discovery and innovation.
                </p>
                <p className="leading-relaxed text-gray-700 font-medium">
                  The future of research is collaborative, open, and accessible. Join us as we work together to solve the world's most pressing challenges through better connections and shared knowledge.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link
                  to="/all-positions"
                  className="px-8 py-3.5 text-base font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <span>Browse Open Positions</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
                <Link
                  to="/institutions"
                  className="px-8 py-3.5 border-2 border-gray-200 text-base font-medium rounded-lg text-gray-900 bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <span>For Research Institutions</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="container px-8 md:px-12 py-20">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
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
          </motion.div>
          <motion.div 
            className="border-t border-gray-200 mt-16 pt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-500 text-[13px] text-center font-light">
              &copy; {new Date().getFullYear()} labrary.research. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default MissionPage;
