import { Link, useLocation } from 'react-router-dom';

interface FooterProps {
  fixed?: boolean;
}

export function Footer({ fixed = false }: FooterProps) {
  const location = useLocation();
  
  return (
    <footer className={`${fixed ? 'fixed' : 'relative'} bottom-0 left-0 right-0 z-[1000] bg-white border-t border-gray-200`}>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <nav className="flex items-center justify-between h-[80px]">
          <div className="flex items-center space-x-8">
            <Link 
              to="/mission" 
              className={`text-[15px] transition-colors font-serif font-normal ${
                location.pathname === '/mission' 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
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
  );
};

export default Footer;

