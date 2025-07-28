import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset visibility when route changes
    setIsVisible(false);
    
    // Small delay to allow exit animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div 
      className={`transition-all duration-300 ease-out ${
        isVisible 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-98 translate-y-2'
      }`}
    >
      {children}
    </div>
  );
};