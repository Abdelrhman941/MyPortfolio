/* ========================================
   PERFORMANCE UTILITIES
   Throttle, debounce, RAF, and optimization helpers
   ======================================== */

/**
 * Throttle function - limits execution rate
 * Perfect for scroll/resize handlers
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}

/**
 * Debounce function - delays execution until after wait period
 * Perfect for search inputs, auto-save
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * RequestAnimationFrame wrapper for smooth animations
 * Ensures animations run at 60fps
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      func.apply(this, args);
      rafId = null;
    });
  };
}

/**
 * Smooth scroll to element with offset
 */
export function smoothScrollTo(
  element: HTMLElement | string,
  offset: number = 0,
  duration: number = 800
): void {
  const target = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element;

  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing function: ease-in-out cubic
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Lazy load images with IntersectionObserver
 */
export function lazyLoadImages(selector: string = '.lazy-img'): void {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    const images = document.querySelectorAll<HTMLImageElement>(selector);
    images.forEach(img => {
      if (img.dataset.src) img.src = img.dataset.src;
    });
    return;
  }

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: '50px', // Start loading 50px before entering viewport
      threshold: 0.01,
    }
  );

  const images = document.querySelectorAll<HTMLImageElement>(selector);
  images.forEach(img => imageObserver.observe(img));
}

/**
 * Prefetch link on hover for instant navigation
 */
export function prefetchOnHover(selector: string = 'a[data-prefetch]'): void {
  const links = document.querySelectorAll<HTMLAnchorElement>(selector);
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = link.href;
      if (!href) return;

      const linkEl = document.createElement('link');
      linkEl.rel = 'prefetch';
      linkEl.href = href;
      document.head.appendChild(linkEl);
    }, { passive: true, once: true });
  });
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get optimized animation duration based on user preference
 */
export function getAnimationDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration;
}

/**
 * Measure performance with Web Vitals
 */
export function measureWebVitals(): void {
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      });
      console.log('CLS:', clsScore);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }

  // Navigation Timing
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      console.log('Navigation Timing:', {
        DNS: perfData.domainLookupEnd - perfData.domainLookupStart,
        TCP: perfData.connectEnd - perfData.connectStart,
        Request: perfData.responseStart - perfData.requestStart,
        Response: perfData.responseEnd - perfData.responseStart,
        DOM: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        Load: perfData.loadEventEnd - perfData.loadEventStart,
        Total: perfData.loadEventEnd - perfData.fetchStart,
      });
    }, 0);
  });
}

/**
 * Create optimized event listener with automatic cleanup
 */
export function addOptimizedListener(
  element: HTMLElement | Window | Document,
  event: string,
  handler: EventListener,
  options: AddEventListenerOptions = {}
): () => void {
  const optimizedOptions = {
    passive: true, // Better scroll performance
    ...options,
  };

  element.addEventListener(event, handler, optimizedOptions);

  // Return cleanup function
  return () => {
    element.removeEventListener(event, handler);
  };
}

/**
 * Batch DOM reads and writes for better performance
 */
export class DOMBatcher {
  private readQueue: Array<() => void> = [];
  private writeQueue: Array<() => void> = [];
  private scheduled = false;

  read(callback: () => void): void {
    this.readQueue.push(callback);
    this.scheduleFlush();
  }

  write(callback: () => void): void {
    this.writeQueue.push(callback);
    this.scheduleFlush();
  }

  private scheduleFlush(): void {
    if (this.scheduled) return;
    this.scheduled = true;

    requestAnimationFrame(() => {
      // Execute all reads first
      this.readQueue.forEach(callback => callback());
      this.readQueue = [];

      // Then execute all writes
      this.writeQueue.forEach(callback => callback());
      this.writeQueue = [];

      this.scheduled = false;
    });
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(
  href: string,
  as: 'script' | 'style' | 'image' | 'font' | 'fetch',
  type?: string
): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  if (as === 'font') link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement, offset: number = 0): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

/**
 * Get device pixel ratio for sharp images
 */
export function getDevicePixelRatio(): number {
  return window.devicePixelRatio || 1;
}

/**
 * Generate responsive image srcset
 */
export function generateSrcSet(baseUrl: string, sizes: number[]): string {
  return sizes
    .map(size => `${baseUrl}?w=${size} ${size}w`)
    .join(', ');
}

/**
 * Memory-efficient infinite scroll
 */
export function createInfiniteScroll(
  container: HTMLElement,
  loadMore: () => Promise<void>,
  threshold: number = 200
): () => void {
  const handleScroll = throttle(() => {
    const { scrollTop, scrollHeight, clientHeight } = container;
    
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      loadMore();
    }
  }, 200);

  const cleanup = addOptimizedListener(container, 'scroll', handleScroll);
  return cleanup;
}
