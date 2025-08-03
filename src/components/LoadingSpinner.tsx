'use client';

import { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  text?: string;
  showFor?: number; // Minimum time to show spinner in ms
}

export default function LoadingSpinner({
  text = "Loading SyntropySoft...",
  showFor = 2000
}: LoadingSpinnerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldFadeOut(true);
      // Wait for the fade-out animation to complete before hiding
      setTimeout(() => {
        setIsVisible(false);
      }, 800); // Match the CSS transition duration
    }, showFor);

    return () => clearTimeout(timer);
  }, [showFor]);

  if (!isVisible) return null;

  return (
    <div className={`loading-overlay ${shouldFadeOut ? 'fade-out' : ''}`}>
      <div className="loading-spinner"></div>
      <div className="loading-text">{text}</div>
    </div>
  );
} 