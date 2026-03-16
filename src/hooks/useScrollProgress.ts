import { useEffect, useRef, useState } from 'react';

/**
 * Hook that tracks scroll progress (0 to 1) of a referenced element
 * through the viewport. Returns 0 when the element top enters the viewport
 * and 1 when the element bottom leaves the viewport.
 */
export function useScrollProgress() {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Element hasn't entered viewport yet
      if (rect.top >= windowHeight) {
        setProgress(0);
        return;
      }

      // Element has fully passed viewport
      if (rect.bottom <= 0) {
        setProgress(1);
        return;
      }

      // Calculate progress: how far through the element we've scrolled
      const totalScrollableDistance = windowHeight + rect.height;
      const distanceScrolled = windowHeight - rect.top;
      const currentProgress = distanceScrolled / totalScrollableDistance;

      // Clamp between 0 and 1
      const clampedProgress = Math.min(1, Math.max(0, currentProgress));
      setProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { ref, progress };
}

