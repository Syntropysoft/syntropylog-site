'use client';

import { useEffect, useRef, useState } from 'react';

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export interface ScrollAnimationState {
  isVisible: boolean;
  hasAnimated: boolean;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}): [React.RefObject<HTMLElement | null>, ScrollAnimationState] {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<ScrollAnimationState>({
    isVisible: false,
    hasAnimated: false
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting && !state.hasAnimated) {
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setState({
                isVisible: true,
                hasAnimated: true
              });
            }, delay);
          } else {
            setState({
              isVisible: true,
              hasAnimated: true
            });
          }
        } else if (!triggerOnce && !isIntersecting) {
          setState(prev => ({
            ...prev,
            isVisible: false
          }));
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay, state.hasAnimated]);

  return [elementRef, state];
}

// Utility hook for fade-in animations
export function useFadeInAnimation(delay: number = 0) {
  return useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
    delay
  });
}

// Utility hook for slide-in animations
export function useSlideInAnimation(delay: number = 0) {
  return useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
    delay
  });
} 