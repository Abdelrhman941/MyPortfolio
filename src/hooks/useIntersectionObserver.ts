import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * High-performance IntersectionObserver hook for fade-in effects
 * Automatically handles cleanup and supports freezing after visibility
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If already visible and frozen, skip observer setup
    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;
        setIsVisible(isElementVisible);

        // Unobserve if frozen after becoming visible
        if (freezeOnceVisible && isElementVisible) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return [elementRef, isVisible];
}

/**
 * Hook for multiple elements with stagger effect
 */
export function useStaggeredIntersectionObserver(
  count: number,
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>[], boolean[]] {
  const refs = useRef<React.RefObject<HTMLDivElement>[]>(
    Array.from({ length: count }, () => ({ current: null }))
  );
  const [visibilities, setVisibilities] = useState<boolean[]>(
    Array(count).fill(false)
  );

  useEffect(() => {
    const {
      threshold = 0.1,
      root = null,
      rootMargin = '0px',
      freezeOnceVisible = false,
    } = options;

    const observers = refs.current.map((ref, index) => {
      const element = ref.current;
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibilities(prev => {
              const newVisibilities = [...prev];
              newVisibilities[index] = true;
              return newVisibilities;
            });

            if (freezeOnceVisible) {
              observer.unobserve(element);
            }
          }
        },
        {
          threshold,
          root,
          rootMargin,
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [count, options]);

  return [refs.current, visibilities];
}

/**
 * Hook for lazy loading images
 */
export function useLazyImage(
  src: string,
  placeholder?: string
): [React.RefObject<HTMLImageElement>, string, boolean] {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Preload image
          const tempImg = new Image();
          tempImg.src = src;
          
          tempImg.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
          };

          observer.unobserve(img);
        }
      },
      {
        rootMargin: '50px', // Start loading before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return [imgRef, imageSrc, isLoaded];
}
