import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Fraction of the element that must be visible (0 to 1). Default: 0.3 */
  threshold?: number;
  /** Only trigger once, then stop observing. Default: true */
  triggerOnce?: boolean;
  /** Root margin (CSS-like string). Default: '0px' */
  rootMargin?: string;
}

interface UseInViewReturn {
  ref: React.RefObject<HTMLElement | null>;
  isInView: boolean;
}

/**
 * Hook that detects when an element enters the viewport
 * using IntersectionObserver.
 */
export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
  const {
    threshold = 0.3,
    triggerOnce = true,
    rootMargin = '0px',
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;

        if (isElementVisible) {
          setIsInView(true);

          // Stop observing after first trigger if triggerOnce is true
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, rootMargin]);

  return { ref, isInView };
}

