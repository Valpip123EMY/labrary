import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  
  return (
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
            <Link to="/" className={`${location.pathname === '/' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>
              Home
            </Link>
            <Link to="/all-positions" className={`${location.pathname === '/all-positions' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>
              Positions
            </Link>
            <Link to="/institutions" className={`${location.pathname === '/institutions' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>
              Institutions
            </Link>
            <Link to="/mission" className={`${location.pathname === '/mission' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>
              Mission
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
