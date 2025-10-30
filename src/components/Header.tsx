import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  fixed?: boolean;
}

export function Header({ fixed = true }: HeaderProps) {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-sm transition-transform duration-300">
      <div className="w-full px-6 md:px-12 lg:px-40">
        <nav className="flex items-center justify-between h-[80px] max-w-[2000px] mx-auto">
          <Link to="/" className="flex items-center font-light gap-2 -ml-2">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4E0BAQED2EFwKdYzAw/company-logo_100_100/B4EZokppoaIMAQ-/0/1761551489851/labrary_research_logo?e=1763596800&v=beta&t=sBZarGD_ibMx3VxqvZ-OsBMBe751NqgidFRrXP4GZ3I"
              alt="Labrary Research Logo"
              className="h-9 w-9 object-contain rounded-full"
            />
            <div>
              <span className="text-gray-900 font-serif font-normal text-[22px] leading-none flex items-center">Labrary</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/all-positions" 
              className={`flex items-center text-[15px] transition-colors font-serif font-normal ${
                location.pathname === '/all-positions' 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Opportunities
            </Link>
            <Link 
              to="/uncharted" 
              className={`flex items-center text-[15px] transition-colors font-serif font-normal ${
                location.pathname === '/uncharted' 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Uncharted</span>
              <span className="ml-1.5 text-xs border border-slate-600 text-slate-600 px-1.5 py-0.5">BETA</span>
            </Link>
            <Link 
              to="/mission" 
              className={`flex items-center text-[15px] transition-colors font-serif font-normal ${
                location.pathname === '/mission' 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}