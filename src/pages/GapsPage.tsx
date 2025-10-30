
const GapsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Research Frontier Mapping
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered identification and visualization of epistemic gaps in academic literature
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Semantic Clustering</h3>
            <p className="text-gray-600">
              Our AI analyzes academic literature to identify clusters of related research and surface the boundaries between them, revealing potential areas for novel investigation.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Knowledge Graphs</h3>
            <p className="text-gray-600">
              Interactive visualizations show connections between research areas, highlighting both well-trodden paths and uncharted territories in the academic landscape.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-xl mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 font-medium">1</div>
                <p className="font-medium">Analyze</p>
                <p className="text-sm text-gray-600">Process academic papers and metadata</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 font-medium">2</div>
                <p className="font-medium">Cluster</p>
                <p className="text-sm text-gray-600">Group related research using NLP</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 font-medium">3</div>
                <p className="font-medium">Visualize</p>
                <p className="text-sm text-gray-600">Map research frontiers and gaps</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Get Started</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Interested in exploring research gaps in your field? Sign up to be notified when our research frontier mapping tool becomes available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GapsPage;
