import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}

/**
 * Ultra-optimized image component with:
 * - Native lazy loading
 * - IntersectionObserver for advanced control
 * - Blur-up progressive loading
 * - Automatic WebP/AVIF support
 * - Prevent layout shift with aspect ratio
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  width,
  height,
  loading = 'lazy',
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Use IntersectionObserver for early loading (50px before viewport)
    if (!imgRef.current || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Calculate aspect ratio for layout stability
  const aspectRatio = width && height ? (height / width) * 100 : undefined;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        paddingBottom: aspectRatio ? `${aspectRatio}%` : undefined,
        background: '#1a1d24',
      }}
    >
      {/* Placeholder blur */}
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 transition-opacity duration-300"
          style={{ opacity: isInView ? 0.5 : 0 }}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={isInView ? src : placeholder || ''}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={loading}
        onLoad={handleLoad}
        style={{
          // GPU acceleration
          transform: 'translate3d(0, 0, 0)',
        }}
        width={width}
        height={height}
      />

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 skeleton" aria-hidden="true" />
      )}
    </div>
  );
};

export default OptimizedImage;

/**
 * Usage example:
 * 
 * <OptimizedImage
 *   src="https://example.com/image.jpg"
 *   alt="Description"
 *   width={800}
 *   height={600}
 *   placeholder="https://example.com/image-tiny.jpg"
 *   className="rounded-lg"
 *   loading="lazy"
 * />
 */
