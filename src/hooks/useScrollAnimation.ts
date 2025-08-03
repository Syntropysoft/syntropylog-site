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

export function useScrollAnimation(options: ScrollAnimationOptions = {}): [React.RefObject<HTMLElement>, ScrollAnimationState] {
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

// Hook for staggered animations (multiple elements)
export function useStaggeredScrollAnimation(
  count: number,
  options: ScrollAnimationOptions & { staggerDelay?: number } = {}
): [React.RefObject<HTMLElement>[], ScrollAnimationState[]] {
  const { staggerDelay = 100, ...baseOptions } = options;
  
  const elementRefs = Array.from({ length: count }, () => useRef<HTMLElement>(null));
  const [states, setStates] = useState<ScrollAnimationState[]>(
    Array.from({ length: count }, () => ({ isVisible: false, hasAnimated: false }))
  );

  useEffect(() => {
    const observers = elementRefs.map((ref, index) => {
      const element = ref.current;
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          const isIntersecting = entry.isIntersecting;
          
          if (isIntersecting && !states[index].hasAnimated) {
            const totalDelay = (baseOptions.delay || 0) + (index * staggerDelay);
            
            setTimeout(() => {
              setStates(prev => prev.map((state, i) => 
                i === index 
                  ? { isVisible: true, hasAnimated: true }
                  : state
              ));
            }, totalDelay);
          }
        },
        {
          threshold: baseOptions.threshold || 0.1,
          rootMargin: baseOptions.rootMargin || '0px'
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [elementRefs, states, baseOptions, staggerDelay]);

  return [elementRefs, states];
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
export function useSlideInAnimation(direction: 'left' | 'right' | 'up' | 'down' = 'up', delay: number = 0) {
  return useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
    delay
  });
} 