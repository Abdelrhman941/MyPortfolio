import React, { useRef, useEffect, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Fix: Updated hook to accept `triggerOnce`, provide an explicit return type, and implement the triggerOnce logic.
const useIntersectionObserver = (options: IntersectionObserverInit & { triggerOnce?: boolean }): [React.Dispatch<React.SetStateAction<HTMLElement | null>>, IntersectionObserverEntry | null] => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Fix: Memoize options to prevent re-creating observer on every render.
  const memoizedOptions = JSON.stringify(options);

  useEffect(() => {
    // Fix: Destructure `triggerOnce` and pass valid options to IntersectionObserver.
    const parsedOptions = JSON.parse(memoizedOptions);
    const { triggerOnce, ...observerOptions } = parsedOptions;
    
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      setEntry(entry);
      // Fix: Implement `triggerOnce` logic to disconnect after first intersection.
      if (triggerOnce && entry.isIntersecting) {
        observer.current?.disconnect();
      }
    }, observerOptions);

    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, memoizedOptions]);

  return [setNode, entry];
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', delay = 0 }) => {
  // Fix: The `triggerOnce` property is now valid for the hook's options.
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Fix: `entry` is now correctly typed as `IntersectionObserverEntry | null`, so `isIntersecting` can be accessed safely.
  const isVisible = entry?.isIntersecting;

  return (
    <div
      // Fix: `ref` is a callback ref and is passed directly without incorrect casting.
      ref={ref}
      className={`transition-all duration-1000 ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
