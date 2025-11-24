import React, { useRef, useEffect, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale';
  threshold?: number;
}

/**
 * Ultra-optimized IntersectionObserver hook
 * - Automatic cleanup
 * - Trigger once for performance
 * - GPU-accelerated animations only
 */
const useIntersectionObserver = (
  options: IntersectionObserverInit & { triggerOnce?: boolean }
): [React.Dispatch<React.SetStateAction<HTMLElement | null>>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!node) return;

    // Skip if already triggered and triggerOnce is enabled
    if (options.triggerOnce && hasTriggered.current) {
      return;
    }

    const { triggerOnce, ...observerOptions } = options;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      
      if (visible) {
        setIsVisible(true);
        hasTriggered.current = true;

        // Disconnect after first trigger for performance
        if (triggerOnce && observer.current) {
          observer.current.disconnect();
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    }, observerOptions);

    observer.current.observe(node);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [node, options.threshold, options.rootMargin, options.triggerOnce]);

  return [setNode, isVisible];
};

/**
 * Ultra-performance AnimatedSection component
 * - Only animates transform and opacity (60fps)
 * - GPU-accelerated with translate3d
 * - Automatic IntersectionObserver cleanup
 * - Support for multiple animation types
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  animation = 'fade',
  threshold = 0.1,
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold,
    triggerOnce: true,
  });

  // Get animation classes based on type
  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out gpu-accelerate';
    
    switch (animation) {
      case 'slide-up':
        return `${baseClasses} ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`;
      case 'slide-left':
        return `${baseClasses} ${
          isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-10'
        }`;
      case 'slide-right':
        return `${baseClasses} ${
          isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-10'
        }`;
      case 'scale':
        return `${baseClasses} ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`;
      case 'fade':
      default:
        return `${baseClasses} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        // Force GPU acceleration
        transform: 'translate3d(0, 0, 0)',
        willChange: isVisible ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
