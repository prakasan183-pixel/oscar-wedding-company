import { useState, useEffect, useRef, RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  freezeOnceVisible?: boolean;
  disabled?: boolean;
}

/**
 * useIntersectionObserver:
 * High-performance hook for detecting when an element enters or nears the viewport.
 * Uses a small anticipatory rootMargin to trigger asset loading shortly before
 * viewport entry without creating a scroll-time download spike.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const {
    root = null,
    rootMargin = '80px 0px',
    threshold = 0.01,
    freezeOnceVisible = true,
    disabled = false,
  } = options;

  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState<boolean>(disabled);

  useEffect(() => {
    // If disabled (e.g. priority hero images), mark visible immediately
    if (disabled) {
      setIsVisible(true);
      return;
    }

    // SSR or browsers without IntersectionObserver fallback
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Once visible and frozen, skip re-observing
    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (freezeOnceVisible && element) {
            observer.unobserve(element);
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [disabled, freezeOnceVisible, isVisible, root, rootMargin, threshold]);

  return [elementRef, isVisible];
}
