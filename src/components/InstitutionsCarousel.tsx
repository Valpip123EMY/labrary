import { useEffect, useRef } from 'react';

// Using the same institutions data from InstitutionsPage
const institutions = [
  {
    name: 'Stanford University',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR9Sq1yj4dMTeHCc1pUQo9_0XtYbuIR68Ayg&s'
  },
  {
    name: 'MIT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2560px-MIT_logo.svg.png'
  },
  {
    name: 'ETH Zurich',
    logo: 'https://ethz.ch/etc/designs/ethz/img/header/ethz_logo_black.svg'
  },
  {
    name: 'University of Tokyo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/University_of_Tokyo_logo%2C_basic%2C_horizontal_%282004%E2%80%932024%29.svg'
  },
  {
    name: 'University of Oxford',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/University_of_Oxford.svg'
  },
  {
    name: 'National University of Singapore',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/NationalUniversityofSingapore.svg/250px-NationalUniversityofSingapore.svg.png'
  },
  {
    name: 'Harvard University',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg/1200px-Harvard_University_logo.svg.png'
  },
  {
    name: 'California Institute of Technology',
    logo: 'https://www.designyourway.net/blog/wp-content/uploads/2024/04/the-font-used-in-the-caltech-logo.png'
  },
  {
    name: 'University of Cambridge',
    logo: 'https://www.cam.ac.uk/sites/default/files/university-cambridge-full-colour-preferred-logo-transparency-2362x491.png'
  },
  {
    name: 'Peking University',
    logo: 'https://www.lead2-project.eu/sites/default/files/inline-images/pekingu.png'
  },
  {
    name: 'University of Toronto',
    logo: 'https://www.diglib.org/wp-content/uploads/sites/3/2014/12/UofT_Logo.svg-copy.jpg'
  },
  {
    name: 'Technical University of Munich',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/TU_Muenchen_Logo.svg/1280px-TU_Muenchen_Logo.svg.png'
  },
  {
    name: 'University of Melbourne',
    logo: 'https://ires.ubc.ca/files/2020/08/the-university-of-melbourne-vector-logo.jpg'
  },
  {
    name: 'University of Cape Town',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/University_of_Cape_Town_logo.svg/1280px-University_of_Cape_Town_logo.svg.png'
  }
];

// Create a larger set of items for smoother continuous scrolling
export const InstitutionsCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const scrollAmount = useRef(0);
  const items = [...institutions, ...institutions, ...institutions, ...institutions];

  // Auto-scroll effect with smooth continuous motion
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 1.5; // Slightly reduced for smoother animation
    let lastTimestamp = performance.now();
    let animationFrameId: number;
    
    // Set initial scroll position to the beginning of the second set
    const itemWidth = 200; // Width of each item including padding
    scrollContainer.scrollLeft = 0;
    scrollAmount.current = 0;

    const scroll = (timestamp: number) => {
      if (!scrollContainer) return;
      
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      // Calculate the scroll amount based on time for smooth animation
      scrollAmount.current += scrollSpeed * (deltaTime / 16); // Normalize to 60fps
      
      // Calculate max scroll based on the first set of items
      const maxScroll = itemWidth * institutions.length;
      
      // Reset scroll position when we've scrolled through one full set
      if (scrollAmount.current >= maxScroll) {
        scrollAmount.current = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollAmount.current;
      }
      
      // Request next frame
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(scroll);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-8 md:mb-12 text-center">
          Trusted by top institutions worldwide
        </h3>
        
        <div className="relative">
          <div className="relative overflow-hidden">
            <div 
              ref={containerRef}
              className="flex items-center py-4 md:py-6"
              style={{
                width: 'max-content',
                animation: `scroll ${institutions.length * 8}s linear infinite`,
                padding: '1rem 0',
              }}
            >
              {/* Render two identical sets of institutions for seamless looping */}
              {[...institutions, ...institutions].map((institution, index) => (
                <div 
                  key={`${institution.name}-${index}`} 
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ width: '200px', padding: '0 1.5rem' }}
                >
                  <div className="relative w-full h-24 md:h-28 flex items-center justify-center">
                    <img 
                      src={institution.logo} 
                      alt={institution.name} 
                      className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                      style={{ maxWidth: '180px' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Gradient fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-200px * ${institutions.length})); }
        }
        
        @media (max-width: 640px) {
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-180px * ${institutions.length})); }
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .infinite-scroll {
            animation: none;
            justify-content: center;
            width: 100%;
            flex-wrap: wrap;
            gap: 2rem;
            padding: 1.5rem 0;
          }
        }
      `}</style>
    </div>
  );
};
