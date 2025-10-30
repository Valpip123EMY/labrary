import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const MissionPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-32 md:py-40 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
              alt="Mountain landscape"
              className="w-full h-full object-cover opacity-30"
              loading="eager"
            />
          </div>
          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 leading-[1.1] tracking-tight">
                About Us
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light max-w-2xl">
                We're building the central hub for research positions—making it easier for talented researchers to find opportunities and institutions to discover the people they need.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <motion.div 
              className="max-w-3xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="space-y-16">
                <div>
                  <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">The Problem</h2>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>
                      Research opportunities are scattered across countless job boards, university websites, and email lists. Talented postdocs and research scientists spend weeks searching for positions that match their expertise. Institutions struggle to reach qualified candidates beyond their immediate networks.
                    </p>
                    <p className="text-gray-900">
                      The system is fragmented, inefficient, and outdated.
                    </p>
                  </div>
                </div>

                <div className="pt-16 border-t border-gray-100">
                  <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">Our Solution</h2>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>
                      We created a single destination for research positions across all fields and institutions. One clean platform where researchers can discover opportunities and institutions can connect with talent—no more endless searching, no more missed connections.
                    </p>
                  </div>
                </div>

                <div className="pt-16 border-t border-gray-100">
                  <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">What We Believe</h2>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>
                      Great research happens when the right people find the right opportunities. Career advancement shouldn't depend on knowing the right people or stumbling upon the right website at the right time.
                    </p>
                    <p className="text-gray-900">
                      We believe in making research careers more accessible, transparent, and merit-based. By connecting talent with opportunity more efficiently, we're helping accelerate scientific discovery itself.
                    </p>
                  </div>
                </div>

                <div className="pt-16 border-t border-gray-100">
                  <p className="text-lg text-gray-600 leading-relaxed italic">
                    We're just getting started. If you're a researcher looking for your next position or an institution seeking exceptional talent, we're here to help make that connection.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-3xl"
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 tracking-tight">
                Ready to Get Started?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/all-positions"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gray-800 hover:bg-gray-700 transition-colors gap-3"
                >
                  <span>Browse Positions</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
                <Link
                  to="/institutions"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-900 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors gap-3"
                >
                  <span>For Institutions</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MissionPage;