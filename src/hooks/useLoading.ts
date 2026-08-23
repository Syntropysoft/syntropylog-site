'use client';

import { useEffect, useState } from 'react';

export function useLoading(minLoadTime: number = 2000) {
  const [isLoading, setIsLoading] = useState(true);
  // Initializer lazy: Date.now() es impura y no debe correr en cada render.
  const [startTime] = useState(() => Date.now());

  useEffect(() => {
    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [minLoadTime, startTime]);

  return isLoading;
} 