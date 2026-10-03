import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/weddingContent';

interface HeroSectionProps {
  onOpenEnquiry: () => void;
  isAppLoaded?: boolean;
}

const SLIDE_DURATION = 5500; // 5.5s cinematic cadence

// Static hero image crossfade without zoom/pan motion
const getCinematicVariants = () => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      opacity: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  },
});

export const HeroSection: React.FC<HeroSectionProps> = ({ isAppLoaded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const preloadedImages = useRef(new Map<string, { image: HTMLImageElement; promise: Promise<void> }>());

  const totalSlides = HERO_SLIDES.length;

  const preloadImage = useCallback((index: number) => {
    const imageUrl = HERO_SLIDES[index].image;
    const existingImage = preloadedImages.current.get(imageUrl);
    if (existingImage) return existingImage.promise;

    const image = new Image();
    const imagePromise = new Promise<void>((resolve, reject) => {
      image.onload = () => {
        image.decode().then(resolve).catch(resolve);
      };
      image.onerror = () => reject(new Error(`Unable to load hero image: ${imageUrl}`));
      image.src = imageUrl;
    });

    preloadedImages.current.set(imageUrl, { image, promise: imagePromise });
    return imagePromise;
  }, []);

  const changeSlide = useCallback((nextIndex: number) => {
    preloadImage(nextIndex)
      .then(() => {
        setCurrentIndex(nextIndex);
        setProgress(0);
      })
      .catch(() => {
        // Keep the current image visible if a replacement cannot be loaded.
      });
  }, [preloadImage]);

  useEffect(() => {
    if (isAppLoaded) {
      setIsInitialLoaded(true);
    }
  }, [isAppLoaded]);

  // Prepare the opening slide and its successor before the first transition.
  useEffect(() => {
    preloadImage(0);
    if (totalSlides > 1) preloadImage(1);

    const timer = setTimeout(() => {
      setIsInitialLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [preloadImage, totalSlides]);

  useEffect(() => {
    preloadImage((currentIndex + 1) % totalSlides);
  }, [currentIndex, preloadImage, totalSlides]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    changeSlide(nextIndex);
  }, [changeSlide, currentIndex, totalSlides]);

  const handlePrev = useCallback(() => {
    const nextIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    changeSlide(nextIndex);
  }, [changeSlide, currentIndex, totalSlides]);

  // Strictly sequential cinematic slide advancement (1 -> 2 -> 3 -> 4 -> 5 -> 1)
  // Driven by timestamp delta to prevent duplicate state updates or skipped slides
  useEffect(() => {
    if (!isInitialLoaded) return;

    setProgress(0);
    const startTime = Date.now();
    const duration = SLIDE_DURATION;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        // Advance only after the next image is ready, avoiding a black transition frame.
        changeSlide((currentIndex + 1) % totalSlides);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [changeSlide, currentIndex, isInitialLoaded, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      id="hero"
      data-theme="dark"
      className="relative min-h-[67vh] sm:min-h-[70vh] md:min-h-screen w-full flex flex-col justify-between overflow-hidden text-[#FAF8F5] bg-transparent"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. CINEMATIC AMBIENT IMAGE STACK: Seamless Ken Burns Crossfade between exactly 5 images */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden bg-transparent">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[1000ms] ease-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ willChange: 'opacity' }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                width={2400}
                height={1600}
                className="w-full h-full object-cover brightness-[0.88] contrast-[1.04]"
                style={{
                  objectPosition: slide.objectPosition || 'center 30%',
                }}
                loading="eager"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}
      </div>

      {/* TOP SPACING: Clears the fixed editorial navbar */}
      <div className="h-16 sm:h-20 md:h-24 z-10" />

      <div className="absolute left-[5%] top-[18%] z-20 hidden md:block text-[9px] uppercase tracking-[0.34em] leading-[2.1] text-[#FAF8F5]/70">
        <span className="block">People</span>
        <span className="block">Emotions</span>
        <span className="block">Forever</span>
        <span className="mt-4 block h-px w-9 bg-[#C7B58A]/80" />
      </div>

      {/* VERTICAL SPACER: Positions hero text intentionally within natural optical center */}
      <div className="flex-1 min-h-[4vh] sm:min-h-[8vh] md:min-h-[14vh] pointer-events-none" />

      {/* 2. MAIN EDITORIAL DISPLAY */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pb-12 sm:pb-14 md:pb-16 flex items-center justify-between">
        
        {/* DESKTOP LEFT NAVIGATION: Arrowhead on the exact same horizontal axis */}
        <div className="hidden md:flex flex-1 justify-start items-center">
          <button
            id="hero-prev-slide-btn"
            onClick={handlePrev}
            className="group relative flex items-center h-8 cursor-pointer select-none focus:outline-none transition-all duration-300"
            aria-label="Previous photograph"
            title="Previous photograph"
          >
            <div className="relative flex items-center">
              <svg
                className="w-16 sm:w-24 md:w-36 lg:w-44 h-4 overflow-visible"
                viewBox="0 0 160 16"
                fill="none"
              >
                <line
                  x1="7"
                  y1="8"
                  x2="160"
                  y2="8"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-white/50 group-hover:text-white transition-colors duration-300"
                />
                <path
                  d="M7 4 L2 8 L7 12"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white drop-shadow transition-transform duration-300 group-hover:-translate-x-1"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* CENTER CONTENT: Perfectly synchronized text entrance and exit transitions */}
        <div className="relative z-20 text-center px-2 sm:px-6 md:px-8 w-full max-w-2xl sm:max-w-3xl flex-1 md:flex-initial mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -14,
                transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
              }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Primary Editorial Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2 text-[1.75rem] sm:text-4xl md:text-[2.9rem] lg:text-[2.5rem] xl:text-[2.8rem] font-normal text-[#FAF8F5] leading-[1.1] sm:leading-[1.04] tracking-[0.08em] whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] uppercase"
                style={{ fontFamily: "'Italiana', 'Cormorant Garamond', Georgia, serif" }}
              >
                <span className="sr-only">Oscar Weddings — Luxury Wedding Photography &amp; Cinematic Films: </span>
                {currentSlide.headline}
              </motion.h1>

              {/* Subheadline (Unique for each slide) */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.34 }}
                className="mt-2.5 sm:mt-3.5 text-[9px] sm:text-[10px] md:text-xs lg:text-[13px] uppercase tracking-[0.14em] sm:tracking-[0.28em] text-[#FAF8F5]/90 font-light drop-shadow whitespace-nowrap"
              >
                {currentSlide.subheadline}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* MOBILE NAVIGATION: Slim editorial arrows matching the desktop controls */}
          <div className="md:hidden mt-6 flex items-center justify-center gap-4 select-none">
            <button
              id="mobile-hero-prev-btn"
              onClick={handlePrev}
              className="group relative flex items-center h-6 cursor-pointer select-none focus:outline-none transition-all duration-300 text-white/85 hover:text-white"
              aria-label="Previous photograph"
            >
              <svg className="w-16 h-4 overflow-visible" viewBox="0 0 160 16" fill="none">
                <line x1="7" y1="8" x2="160" y2="8" stroke="currentColor" strokeWidth="1" className="text-white/50 group-hover:text-white transition-colors duration-300" />
                <path d="M7 4 L2 8 L7 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow transition-transform duration-300 group-hover:-translate-x-1" />
              </svg>
            </button>

            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-serif tracking-[0.2em] text-white">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>

              <div className="relative w-7 h-5" aria-hidden="true">
                <div className="absolute left-1/2 top-1/2 w-8 -translate-x-1/2 -translate-y-1/2 -rotate-[55deg]">
                  <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-serif tracking-[0.2em] text-white/60">
                {String(totalSlides).padStart(2, '0')}
              </span>
            </div>

            <button
              id="mobile-hero-next-btn"
              onClick={handleNext}
              className="group relative flex items-center h-6 cursor-pointer select-none focus:outline-none transition-all duration-300 text-white/85 hover:text-white"
              aria-label="Next photograph"
            >
              <svg className="w-16 h-4 overflow-visible" viewBox="0 0 160 16" fill="none">
                <line x1="0" y1="8" x2="153" y2="8" stroke="currentColor" strokeWidth="1" className="text-white/50 group-hover:text-white transition-colors duration-300" />
                <path d="M153 4 L158 8 L153 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow transition-transform duration-300 group-hover:translate-x-1" />
              </svg>
            </button>
          </div>
        </div>

        {/* DESKTOP RIGHT NAVIGATION: Auto-progress line & arrowhead on the exact horizontal axis */}
        <div className="hidden md:flex flex-1 justify-end items-center">
          <div className="relative flex items-center">
            {/* Active Slide Number (e.g. 01) positioned above line */}
            <div className="absolute -top-7 right-0 text-xs sm:text-sm md:text-base font-light tracking-[0.2em] text-white/95 select-none pr-0.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="inline-block drop-shadow"
                >
                  {String(currentIndex + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Interactive Right Arrow Line with Auto-Progress fill */}
            <button
              id="hero-next-slide-btn"
              onClick={handleNext}
              className="group relative flex items-center h-8 cursor-pointer select-none focus:outline-none transition-all duration-300"
              aria-label="Next photograph"
              title="Next photograph"
            >
              <div className="relative flex items-center">
                <svg
                  className="w-16 sm:w-24 md:w-36 lg:w-44 h-4 overflow-visible"
                  viewBox="0 0 160 16"
                  fill="none"
                >
                  {/* Base track */}
                  <line
                    x1="0"
                    y1="8"
                    x2="153"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white/40 group-hover:text-white/60 transition-colors duration-300"
                  />
                  {/* Progress fill */}
                  <line
                    x1="0"
                    y1="8"
                    x2={Math.min(153, (progress / 100) * 153)}
                    y2="8"
                    stroke="#FAF8F5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="transition-all duration-75 ease-linear"
                  />
                  {/* Arrowhead */}
                  <path
                    d="M153 4 L158 8 L153 12"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white drop-shadow transition-transform duration-300 group-hover:translate-x-1"
                  />
                </svg>
              </div>
            </button>

            {/* Total Count Number (e.g. 05) positioned below line */}
            <div className="absolute -bottom-7 right-0 text-xs sm:text-sm md:text-base font-light tracking-[0.2em] text-white/75 select-none pr-0.5 drop-shadow">
              {String(totalSlides).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[3%] bottom-[6%] z-20 hidden md:block text-right text-[9px] uppercase tracking-[0.3em] leading-[2.1] text-[#FAF8F5]/70">
        <span className="block">Weddings</span>
        <span className="block">By People</span>
        <span className="block">For People</span>
        <span className="mt-4 ml-auto block h-px w-9 bg-[#C7B58A]/80" />
      </div>


    </section>
  );
};