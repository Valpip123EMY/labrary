export function Hero() {
  return (
    <div className="min-h-screen bg-white py-[60px] px-5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-20">
        {/* Left Content */}
        <div className="px-5 lg:px-10 lg:pl-[60px]">
          <div className="inline-flex items-center gap-2 bg-gray-50 px-[18px] py-2 rounded-full text-sm text-slate-500 mb-12">
            <span className="text-slate-400 text-xs">◆</span>
            Accredited by the United Nations
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-[68px] leading-tight font-light tracking-tight mb-6 text-gray-900">
            Transforming<br />
            <span className="font-semibold text-slate-900">policy research</span>
            <br className="hidden sm:block" />
            <span className="text-slate-400">with AI</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-[540px] leading-relaxed">
            Advanced analytics and machine learning to solve complex policy challenges at the University of Virginia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <a 
              href="#" 
              className="px-7 py-3.5 bg-gray-900 text-white rounded-md text-sm md:text-base font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-200"
            >
              View our intelligence
              <span>→</span>
            </a>
            <a 
              href="#" 
              className="px-7 py-3.5 bg-white border border-gray-200 text-slate-700 rounded-md text-sm md:text-base font-medium hover:border-gray-300 transition-colors duration-200"
            >
              Explore research labs
            </a>
          </div>

          <a href="#" className="text-sm text-slate-500 hover:text-slate-700 inline-flex items-center gap-1 transition-colors">
            Learn more about our research
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>

        {/* Right Content - Placeholder for image/stats */}
        <div className="relative pr-0 lg:pr-[60px] z-10">
          {/* Stats Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-5 max-w-md">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-semibold text-slate-900">Active Research</span>
              </div>
              <span className="text-xs bg-gray-50 px-3 py-1 rounded text-slate-500">Updated today</span>
            </div>
            
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-xs text-slate-500">Labs & Research Centers</p>
                <p className="text-2xl font-bold text-slate-900">47</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Active Projects</p>
                <p className="text-2xl font-bold text-slate-900">128</p>
              </div>
            </div>
            
            <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-[70%] rounded-full"></div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50 h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <p className="text-sm text-slate-700">Research visualization</p>
              </div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute bottom-6 right-6 bg-white rounded-lg p-5 shadow-lg max-w-[280px]">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-gray-900 w-9 h-9 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">▭</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Policy Impact 2023</h4>
                  <p className="text-xs text-slate-400">Annual Research Report</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <div>
                  <p className="text-2xl font-bold text-slate-900">87%</p>
                  <p className="text-xs text-slate-500">Adoption Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">24+</p>
                  <p className="text-xs text-slate-500">Publications</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">15+</p>
                  <p className="text-xs text-slate-500">Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}