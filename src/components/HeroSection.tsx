import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES, HERO_DATA } from '../data/weddingContent';

interface HeroSectionProps {
  onOpenEnquiry: () => void;
  isAppLoaded?: boolean;
}

const SLIDE_DURATION = 5500; // 5.5s cinematic cadence

// Cinematic Ken Burns variants for each of the 5 slides: subtle zoom, pan, and drift
const getCinematicVariants = (index: number) => {
  switch (index % 5) {
    case 0: // Slide 1 (Garden Celebration): Gentle upward float & slow zoom
      return {
        initial: { opacity: 0, scale: 1.01, y: 4 },
        animate: {
          opacity: 1,
          scale: 1.06,
          y: -8,
          transition: {
            opacity: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 8.5, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 8.5, ease: [0.16, 1, 0.3, 1] },
          },
        },
        exit: {
          opacity: 0,
          scale: 1.075,
          transition: {
            opacity: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          },
        },
      };
    case 1: // Slide 2 (Intimate Laugh): Gentle rightward pan & intimate warm zoom
      return {
        initial: { opacity: 0, scale: 1.01, x: -8 },
        animate: {
          opacity: 1,
          scale: 1.065,
          x: 8,
          transition: {
            opacity: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 8.5, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 8.5, ease: [0.16, 1, 0.3, 1] },
          },
        },
        exit: {
          opacity: 0,
          scale: 1.08,
          transition: {
            opacity: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          },
        },
      };
    case 2: // Slide 3 (Heirloom Royal Sofa): Pure classical regal slow push-in
      return {
        initial: { opacity: 0, scale: 1.0 },
        animate: {
          opacity: 1,
          scale: 1.065,
          transition: {
            opacity: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 8.5, ease: [0.16, 1, 0.3, 1] },
          },
        },
        exit: {
          opacity: 0,
          scale: 1.075,
          transition: {
            opacity: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          },
        },
      };
    case 3: // Slide 4 (Sacred Thaali Ritual): Slow leftward drift & devotional focus
      return {
        initial: { opacity: 0, scale: 1.01, x: 8 },
        animate: {
          opacity: 1,
          scale: 1.06,
          x: -8,
          transition: {
            opacity: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 8.5, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 8.5, ease: [0.16, 1, 0.3, 1] },
          },
        },
        exit: {
          opacity: 0,
          scale: 1.075,
          transition: {
            opacity: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          },
        },
      };
    case 4: // Slide 5 (Midnight Reception Twirl): Dynamic diagonal glide & celebration radiance
    default:
      return {
        initial: { opacity: 0, scale: 1.02, y: 6, x: -4 },
        animate: {
          opacity: 1,
          scale: 1.07,
          y: -6,
          x: 4,
          transition: {
            opacity: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 8.5, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 8.5, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 8.5, ease: [0.16, 1, 0.3, 1] },
          },
        },
        exit: {
          opacity: 0,
          scale: 1.08,
          transition: {
            opacity: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          },
        },
      };
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEnquiry, isAppLoaded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  useEffect(() => {
    if (isAppLoaded) {
      setIsInitialLoaded(true);
    }
  }, [isAppLoaded]);

  // Pre-cache hero images on mount for instantaneous, tear-free slides
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });

    const timer = setTimeout(() => {
      setIsInitialLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const handleGoToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

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
        // Advance strictly to the next slide in proper 1 -> 2 -> 3 -> 4 -> 5 order
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentIndex, isInitialLoaded, totalSlides]);

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

  const handleScrollToStories = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('stories');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlide = HERO_SLIDES[currentIndex];
  const cinematicVariants = getCinematicVariants(currentIndex);

  return (
    <section
      id="hero"
      data-theme="dark"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0A0A0A] text-[#FAF8F5]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. CINEMATIC AMBIENT IMAGE STACK: Seamless Ken Burns Crossfade between exactly 5 images */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden bg-[#0A0A0A]">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide.id}
            variants={cinematicVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'opacity, transform' }}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.alt}
              width={1376}
              height={768}
              className="w-full h-full object-cover brightness-[0.88] contrast-[1.04]"
              style={{
                objectPosition: currentSlide.objectPosition || 'center 30%',
              }}
              loading="eager"
              fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
              decoding="async"
              referrerPolicy="no-referrer"
            />

            {/* Editorial Multi-Tier Lighting Vignettes: Ensures crystal-clear legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_35%,_rgba(0,0,0,0.5)_100%] pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TOP SPACING: Clears the fixed editorial navbar */}
      <div className="h-16 sm:h-20 md:h-24 z-10" />

      {/* VERTICAL SPACER: Positions hero text intentionally within natural optical center */}
      <div className="flex-1 min-h-[4vh] sm:min-h-[8vh] md:min-h-[14vh] pointer-events-none" />

      {/* 2. MAIN EDITORIAL DISPLAY: Left Navigation, Center Content, Right Progress Counter */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
        
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
        <div className="relative z-20 text-center px-2 sm:px-6 md:px-8 w-full max-w-2xl sm:max-w-3xl flex-1 md:flex-initial mx-auto translate-y-[4vh] sm:translate-y-0">
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
              {/* Studio Mark & Location with Tracking Expansion */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mb-2 sm:mb-3 flex items-center justify-center gap-2"
              >
                <span className="text-[9px] sm:text-[10.5px] md:text-xs tracking-[0.32em] sm:tracking-[0.4em] uppercase text-[#EAE6DF]/90 font-light drop-shadow">
                  0{currentIndex + 1} &middot; OSCAR WEDDINGS &middot; {currentSlide.location || 'KERALA'}
                </span>
              </motion.div>

              {/* Primary Cormorant Garamond Editorial Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-[#FAF8F5] leading-[1.1] sm:leading-[1.04] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                <span className="sr-only">Oscar Weddings — Luxury Wedding Photography &amp; Cinematic Films: </span>
                {currentSlide.headline}
              </motion.h1>

              {/* Subheadline (Unique for each slide) */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.34 }}
                className="mt-2.5 sm:mt-3.5 text-[9.5px] sm:text-xs md:text-sm uppercase tracking-[0.22em] sm:tracking-[0.32em] text-[#FAF8F5]/90 font-light drop-shadow"
              >
                {currentSlide.subheadline}
              </motion.p>

              {/* Poetic Emotional Tagline (Sophisticated luxury descriptor) */}
              {currentSlide.tagline && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.44 }}
                  className="mt-2.5 sm:mt-3 max-w-lg sm:max-w-xl text-xs sm:text-sm md:text-base font-serif italic text-[#EAE6DF]/85 font-light leading-relaxed drop-shadow tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  "{currentSlide.tagline}"
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Action CTA Buttons */}
          <div className="mt-6 sm:mt-8 md:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              id="hero-explore-stories-btn"
              href="#stories"
              onClick={handleScrollToStories}
              className="w-full sm:w-auto min-h-[44px] px-7 sm:px-9 py-3 sm:py-3.5 bg-[#FAF8F5] text-[#0A0A0A] text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] font-medium hover:bg-[#EAE6DF] hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2 group"
            >
              <span>{HERO_DATA.ctaPrimary}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>

            <button
              id="hero-enquire-btn"
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto min-h-[44px] px-7 sm:px-9 py-3 sm:py-3.5 border border-[#FAF8F5]/60 bg-black/40 backdrop-blur-sm text-[#FAF8F5] text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] font-light hover:bg-[#FAF8F5]/20 hover:border-[#FAF8F5] transition-all duration-300"
            >
              {HERO_DATA.ctaSecondary}
            </button>
          </div>

          {/* MOBILE NAVIGATION: Thumb-friendly controls with live 01 / 05 progress bar */}
          <div className="md:hidden mt-6 flex items-center justify-center gap-5 select-none">
            <button
              id="mobile-hero-prev-btn"
              onClick={handlePrev}
              className="p-2.5 text-white/85 active:scale-90 hover:text-white transition-all flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/15"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5">
              <span className="text-xs font-serif tracking-[0.2em] text-white">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              
              <div className="w-16 h-[2px] bg-white/20 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-white rounded-full transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-xs font-serif tracking-[0.2em] text-white/60">
                {String(totalSlides).padStart(2, '0')}
              </span>
            </div>

            <button
              id="mobile-hero-next-btn"
              onClick={handleNext}
              className="p-2.5 text-white/85 active:scale-90 hover:text-white transition-all flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/15"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-4 h-4" />
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

      {/* 3. DESKTOP & TABLET 5-CHAPTER EDITORIAL SLIDE INDICATORS */}
      <div className="hidden lg:flex items-center justify-center gap-6 mt-6 z-20 select-none px-6">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => handleGoToSlide(idx)}
              className="group text-left focus:outline-none transition-all duration-300 py-1.5 cursor-pointer"
              aria-label={`Jump to slide ${idx + 1}: ${slide.headline}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`text-[9.5px] tracking-[0.24em] font-light transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-[9.5px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    isActive ? 'text-[#FAF8F5] font-medium' : 'text-white/40 group-hover:text-white/70'
                  }`}
                >
                  {slide.headline}
                </span>
              </div>
              {/* Hairline chapter progress track */}
              <div className="w-20 xl:w-28 h-[1.5px] bg-white/15 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all ${
                    isActive
                      ? 'bg-[#FAF8F5]'
                      : 'bg-transparent group-hover:bg-white/30'
                  }`}
                  style={{
                    width: isActive ? `${progress}%` : '0%',
                    transition: isActive ? 'width 75ms linear' : 'all 300ms ease',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* BOTTOM SPACER: Comfortable breathing room */}
      <div className="h-3 sm:h-6 md:h-8 pointer-events-none" />

      {/* 4. BOTTOM EDITORIAL BAR: Authentic Atelier Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-3 sm:py-4 md:py-5 pb-8 md:pb-5 flex items-end justify-between text-[9px] sm:text-[10px] tracking-[0.26em] uppercase text-[#B4ACA1]/80">
        <div className="hidden sm:block">
          <span>KERALA &middot; SOUTH INDIA &middot; DESTINATIONS</span>
        </div>

        <a
          href="#philosophy"
          className="flex items-center gap-2 hover:text-[#FAF8F5] transition-colors mx-auto sm:mx-0 cursor-pointer mt-1"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>

        <div className="hidden sm:block">
          <span>EST. 2019 &middot; VOLUME VI</span>
        </div>
      </div>
    </section>
  );
};
