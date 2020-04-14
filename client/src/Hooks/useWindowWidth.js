import { useState, useEffect } from 'react';

export const useWindowWidth = () => {
  const [width, setwidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setwidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  });
  return width;
}