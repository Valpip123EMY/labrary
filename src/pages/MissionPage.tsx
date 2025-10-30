import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      <main className="relative z-10">
        {/* Hero */}
        <section className="w-full h-screen flex items-start justify-start relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
          
          {/* Right Side Paper */}
          <div className="absolute right-40 top-2 transform w-80 hidden xl:block" style={{ right: '10%' }}>
            <img 
              src="https://ieeexplore.ieee.org/xploreAssets/images/absImages/01458660.png" 
              alt="Research Paper" 
              className="w-full h-auto border border-slate-200 rounded-sm shadow-sm"
            />
          </div>

          <div className="w-full pl-[18px] md:pl-[34px] lg:pl-[148px] pr-0 mx-0 flex flex-col items-start text-left pt-2">
            <div className="w-full max-w-4xl space-y-6">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="space-y-4"
              >
                <h1 className="text-8xl md:text-9xl lg:text-[6.5rem] font-light tracking-tighter text-slate-900 leading-[0.9]">
                  About
                </h1>
                <h1 className="text-8xl md:text-9xl lg:text-[6.5rem] font-light tracking-tighter text-slate-900 leading-[0.9] pb-4">
                  Our Mission
                </h1>
                <div className="max-w-2xl pl-0">
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light space-y-2">
                    <span className="block">Connecting exceptional researchers with world-class institutions.</span>
                    <span className="block">AI-powered matching. Always free. Forever accessible.</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-0 bg-white">
          <div className="w-full pl-[18px] md:pl-[34px] lg:pl-[148px] pr-0 mx-0">
            <div className="max-w-4xl space-y-24">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="space-y-6"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-slate-900 leading-[0.9]">
                  The Problem
                </h2>
                <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                  <p>
                    Research opportunities are scattered across countless job boards, university websites, and email lists. Talented postdocs and research scientists spend weeks searching for positions that match their expertise. Institutions struggle to reach qualified candidates beyond their immediate networks.
                  </p>
                  <p className="text-slate-900 font-medium">
                    The system is fragmented, inefficient, and outdated.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="pt-24 border-t border-slate-100"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-slate-900 leading-[0.9] mb-8">
                  Our Solution
                </h2>
                <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                  <p>
                    We created a single destination for research positions across all fields and institutions. One clean platform where researchers can discover opportunities and institutions can connect with talent—no more endless searching, no more missed connections.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="pt-24 border-t border-slate-100"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-slate-900 leading-[0.9] mb-8">
                  What We Believe
                </h2>
                <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                  <p>
                    Great research happens when the right people find the right opportunities. Career advancement shouldn't depend on knowing the right people or stumbling upon the right website at the right time.
                  </p>
                  <p className="text-slate-900 font-medium">
                    We believe in making research careers more accessible, transparent, and merit-based. By connecting talent with opportunity more efficiently, we're helping accelerate scientific discovery itself.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="pt-24 border-t border-slate-100 pb-32"
              >
                <p className="text-lg text-slate-500 leading-relaxed italic">
                  We're just getting started. If you're a researcher looking for your next position or an institution seeking exceptional talent, we're here to help make that connection.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="w-full pl-[18px] md:pl-[34px] lg:pl-[148px] pr-0 mx-0">
            <div className="max-w-4xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="space-y-8"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-slate-900 leading-[0.9]">
                  Ready to Get Started?
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/all-positions"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white text-base font-medium tracking-wide hover:bg-slate-800 transition-all duration-200"
                  >
                    <span>Browse Opportunities</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <span className="text-slate-400 text-sm font-light hidden sm:inline-flex items-center">or</span>
                  <Link
                    to="/institutions"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-slate-300 text-slate-900 text-base font-medium tracking-wide hover:border-slate-900 transition-all duration-200 group"
                  >
                    <span>For Institutions</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MissionPage;