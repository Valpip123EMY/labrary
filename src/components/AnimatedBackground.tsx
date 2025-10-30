import { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

declare global {
  interface Window {
    requestAnimationFrame: (callback: FrameRequestCallback) => number;
  }
}

const AnimatedBackground = () => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let animationFrameId: number;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
      if (!interactiveRef.current) return;
      
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      
      const interactiveElements = document.querySelectorAll<HTMLElement>('.interactive');
      interactiveElements.forEach(element => {
        element.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      });
      
      animationFrameId = window.requestAnimationFrame(move);
    };

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    // Start the animation
    move();
    
    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="gradient-bg">
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive" ref={interactiveRef}></div>
      </div>
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
