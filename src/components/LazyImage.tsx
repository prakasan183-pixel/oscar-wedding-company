import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  containerClassName?: string;
  placeholderClassName?: string;
  priority?: boolean;
  rootMargin?: string;
  threshold?: number;
  showPlaceholder?: boolean;
  objectPosition?: string;
}

/**
 * LazyImage:
 * High-performance IntersectionObserver image component designed for luxury photography portfolios.
 * - Replaces erratic browser-native lazy loading with predictable viewport intersection observation.
 * - Uses an anticipatory 250px rootMargin to trigger downloads before entering viewport.
 * - Prevents Cumulative Layout Shift (CLS) by retaining container aspect ratios and explicit dimensions.
 * - Smoothly fades in images upon load completion, with a warm neutral dark placeholder.
 * - Supports priority above-the-fold images and browser-cache instant detection.
 */
export const LazyImage = forwardRef<HTMLDivElement, LazyImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      className = '',
      containerClassName = 'w-full h-full',
      placeholderClassName = 'bg-[#141312]',
      priority = false,
      rootMargin = '250px 0px',
      threshold = 0.01,
      showPlaceholder = true,
      objectPosition,
      style,
      onLoad,
      onError,
      ...rest
    },
    ref
  ) => {
    // 1. Observe intersection using anticipatory rootMargin
    const [observerRef, isInView] = useIntersectionObserver<HTMLDivElement>({
      rootMargin,
      threshold,
      freezeOnceVisible: true,
      disabled: priority,
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // Merge forwarded ref with internal observerRef
    const setRefs = (node: HTMLDivElement | null) => {
      // @ts-ignore
      observerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        // @ts-ignore
        ref.current = node;
      }
    };

    // 2. Check if image is already cached or complete
    useEffect(() => {
      if (isInView && imgRef.current) {
        if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
          setIsLoaded(true);
        }
      }
    }, [isInView, src]);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoaded(true);
      onLoad?.(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setHasError(true);
      onError?.(e);
    };

    const hasTransformTransition =
      className.includes('scale') || className.includes('transition-transform');
    const cleanClassName = className
      .replace(/\btransition-transform\b/g, '')
      .replace(/\btransition-opacity\b/g, '')
      .trim();
    const transitionClass = hasTransformTransition
      ? 'transition-[opacity,transform] duration-700 ease-out'
      : 'transition-opacity duration-700 ease-out';

    return (
      <div
        ref={setRefs}
        className={`relative overflow-hidden ${containerClassName}`}
        style={{
          // Provide intrinsic aspect-ratio reservation only when container is not filling parent or explicitly sized
          ...(width &&
          height &&
          !containerClassName.includes('aspect-') &&
          !containerClassName.includes('h-full') &&
          !containerClassName.includes('inset-0')
            ? { aspectRatio: `${width} / ${height}` }
            : {}),
        }}
      >
        {/* Warm luxury placeholder background that fades out when loaded */}
        {showPlaceholder && (
          <div
            className={`absolute inset-0 z-0 transition-opacity duration-700 ease-out pointer-events-none ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            } ${placeholderClassName}`}
            aria-hidden="true"
          />
        )}

        {/* The actual image element, mounted once near/in viewport */}
        {isInView && (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            decoding="async"
            loading={priority ? 'eager' : undefined}
            fetchPriority={priority ? 'high' : 'auto'}
            referrerPolicy="no-referrer"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              ...(objectPosition ? { objectPosition } : {}),
              ...style,
            }}
            className={`${cleanClassName} ${transitionClass} ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            {...rest}
          />
        )}
      </div>
    );
  }
);

LazyImage.displayName = 'LazyImage';
