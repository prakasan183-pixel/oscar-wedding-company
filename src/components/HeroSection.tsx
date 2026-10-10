import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HERO_SLIDES } from '../data/weddingContent';

interface HeroSectionProps {
  onOpenEnquiry: () => void;
  isAppLoaded?: boolean;
}

const SLIDE_DURATION = 5500;

export const HeroSection: React.FC<HeroSectionProps> = ({ isAppLoaded }) => {
  const totalSlides = HERO_SLIDES.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const preloadedImages = useRef(new Map<string, Promise<void>>());
  const currentSlide = HERO_SLIDES[currentIndex];

  const renderHeadlineWords = (words: readonly string[], highlightInitials = false) => words.map((word, index) => (
    <React.Fragment key={`${word}-${index}`}>
      {index > 0 && ' '}
      <span>
        {highlightInitials && <span className="text-[#d9b98c]">{word[0]}</span>}
        {highlightInitials ? word.slice(1) : word}
      </span>
    </React.Fragment>
  ));

  const preloadImage = useCallback((index: number) => {
    const imageUrl = HERO_SLIDES[index].image;
    const cachedImage = preloadedImages.current.get(imageUrl);
    if (cachedImage) return cachedImage;

    const image = new Image();
    const imagePromise = new Promise<void>((resolve, reject) => {
      image.onload = () => {
        image.decode().then(resolve).catch(resolve);
      };
      image.onerror = () => reject(new Error(`Unable to load hero image: ${imageUrl}`));
      image.src = imageUrl;
    });

    preloadedImages.current.set(imageUrl, imagePromise);
    return imagePromise;
  }, []);

  const changeSlide = useCallback((nextIndex: number) => {
    preloadImage(nextIndex)
      .then(() => {
        setCurrentIndex(nextIndex);
      })
      .catch((error: Error) => {
        console.error(error.message, error);
      });
  }, [preloadImage]);

  useEffect(() => {
    if (isAppLoaded) setIsInitialLoaded(true);
  }, [isAppLoaded]);

  useEffect(() => {
    preloadImage(0);
    if (totalSlides > 1) preloadImage(1);

    const timer = window.setTimeout(() => setIsInitialLoaded(true), 400);
    return () => window.clearTimeout(timer);
  }, [preloadImage, totalSlides]);

  useEffect(() => {
    preloadImage((currentIndex + 1) % totalSlides);
  }, [currentIndex, preloadImage, totalSlides]);

  const handleNext = useCallback(() => {
    changeSlide((currentIndex + 1) % totalSlides);
  }, [changeSlide, currentIndex, totalSlides]);

  const handlePrev = useCallback(() => {
    changeSlide((currentIndex - 1 + totalSlides) % totalSlides);
  }, [changeSlide, currentIndex, totalSlides]);

  useEffect(() => {
    if (!isInitialLoaded) return;

    const timer = window.setTimeout(() => {
      changeSlide((currentIndex + 1) % totalSlides);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [changeSlide, currentIndex, isInitialLoaded, totalSlides]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') handleNext();
      if (event.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = event.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const distance = touchStartX.current - event.changedTouches[0].clientX;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      id="hero"
      data-theme="dark"
      aria-label="Oscar Wedding Company — wedding photography and films"
      className="hero-section relative isolate h-[66svh] min-h-[440px] w-full overflow-hidden bg-[#100c09] text-[#f5f0e9] sm:h-[100svh] sm:min-h-[560px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 z-[-2] bg-[#100c09]">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          >
            <img
              src={slide.image}
              alt=""
              width={2400}
              height={1600}
              className="h-full w-full object-cover"
              style={{ objectPosition: slide.objectPosition || 'center 30%' }}
              loading={index === currentIndex ? 'eager' : 'lazy'}
              fetchPriority={index === currentIndex ? 'high' : 'auto'}
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
      <div className="hero-image-treatment absolute inset-0 z-[-1]" aria-hidden="true" />

      <div className="hero-copy absolute bottom-[8%] left-[2.5%] right-[2.5%] z-10 sm:bottom-[9%] sm:left-[5%] sm:right-[5%] lg:bottom-[10%]">
        <div className="mb-6 w-1/2 sm:mb-8">
          <div className="relative h-px w-full bg-white/40" aria-hidden="true">
            <span
              key={currentIndex}
              className="hero-slide-progress absolute inset-y-0 left-0 w-full origin-left bg-white"
              style={{
                animationDuration: `${SLIDE_DURATION}ms`,
                animationPlayState: isInitialLoaded ? 'running' : 'paused',
              }}
            />
          </div>
          <p className="mt-2 text-left text-[0.65rem] tracking-[0.18em]" aria-live="polite">
            {String(currentIndex + 1).padStart(2, '0')}
          </p>
        </div>
        <h1 className="hero-headline m-0 w-full text-left text-[clamp(1.5rem,7.5vw,5.3rem)] leading-[1.25] text-[#f7f3ef] lg:text-[clamp(2.5rem,6.2vw,4.6rem)]">
          <span className="sr-only">Oscar Wedding Company — {currentSlide.heroWords.join(' ')}. </span>
          {currentSlide.heroLines.map((line) => (
            <span key={line} aria-hidden="true" className="block whitespace-nowrap text-left">
              {renderHeadlineWords(line.split(' '), currentSlide.id === 'kerala-thaali-ritual')}
            </span>
          ))}
        </h1>
        <p className="mt-3 text-left font-cormorant text-[0.6rem] font-medium uppercase tracking-[0.28em] text-white/85 sm:mt-4 sm:text-xs">
          {currentSlide.subheadline}
        </p>
      </div>
    </section>
  );
};
