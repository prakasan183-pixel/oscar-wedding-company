import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, X, MapPin } from 'lucide-react';
import { SPECIALIZATION_DATA } from '../data/weddingContent';
import { SpecializationPhoto } from '../types';
import { LazyImage } from './LazyImage';

interface SpecializationSectionProps {
  onOpenEnquiry: () => void;
}

const getSpecializationPreview = (url: string): string => {
  if (!url.startsWith('/images/') || url.includes('/mainpics/') || url.includes('/og/')) {
    return url;
  }

  const separatorIndex = url.lastIndexOf('/');
  return `${url.slice(0, separatorIndex + 1)}thumb-${url.slice(separatorIndex + 1)}.jpg`;
};

const AnimatedCounter: React.FC<{ target: number; started: boolean }> = ({ target, started }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    let frameId = 0;
    const duration = 1300;
    let startTime: number | undefined;

    const animate = (time: number) => {
      if (startTime === undefined) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [started, target]);

  return <>{count}+</>;
};

export const SpecializationSection: React.FC<SpecializationSectionProps> = ({
  onOpenEnquiry,
}) => {
  const [activeModalPhoto, setActiveModalPhoto] = useState<SpecializationPhoto | null>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const { photos } = SPECIALIZATION_DATA;
  const stripImages: Array<{ src: string; alt: string; photo?: SpecializationPhoto }> = [
    { src: getSpecializationPreview(photos[0].image), alt: photos[0].alt, photo: photos[0] },
    {
      src: '/images/aleena&Nithin/thumb-HD (10) (1).jpg.jpg',
      alt: 'A wedding moment from Aleena and Nithin’s collection',
    },
    { src: getSpecializationPreview(photos[1].image), alt: photos[1].alt, photo: photos[1] },
    {
      src: '/images/Deva/HD  (1).jpg',
      alt: 'A portrait from Deva’s wedding collection',
    },
    { src: getSpecializationPreview(photos[2].image), alt: photos[2].alt, photo: photos[2] },
    {
      src: '/images/jesica/thumb-0 (7).jpeg.jpg',
      alt: 'A portrait from Jessica’s wedding collection',
    },
    { src: getSpecializationPreview(photos[3].image), alt: photos[3].alt, photo: photos[3] },
    {
      src: '/images/vyshak/thumb-HD (2).jpg.jpeg.jpg',
      alt: 'A wedding photograph from Vyshak’s collection',
    },
  ];

  useEffect(() => {
    const element = statsRef.current;
    if (!element || statsStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [statsStarted]);

  // Modal navigation
  const handleModalNext = useCallback(() => {
    if (!activeModalPhoto) return;
    const currentIdx = photos.findIndex((p) => p.id === activeModalPhoto.id);
    const nextIdx = (currentIdx + 1) % photos.length;
    setActiveModalPhoto(photos[nextIdx]);
  }, [activeModalPhoto, photos]);

  const handleModalPrev = useCallback(() => {
    if (!activeModalPhoto) return;
    const currentIdx = photos.findIndex((p) => p.id === activeModalPhoto.id);
    const prevIdx = (currentIdx - 1 + photos.length) % photos.length;
    setActiveModalPhoto(photos[prevIdx]);
  }, [activeModalPhoto, photos]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalPhoto) return;
      if (e.key === 'Escape') setActiveModalPhoto(null);
      if (e.key === 'ArrowRight') handleModalNext();
      if (e.key === 'ArrowLeft') handleModalPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalPhoto, handleModalNext, handleModalPrev]);

  return (
    <section
      id="specialization"
      data-theme="light"
      className="relative overflow-hidden border-t border-[#EAE4DA] bg-[#FAF8F5] text-[#141210]"
    >
      <header className="px-5 pb-8 pt-12 text-center sm:pb-10 sm:pt-16 md:pb-12 md:pt-[4.5rem]">
        <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.3em] text-[#89775F] sm:text-[10px]">
          DETAILS THAT TELL A BIGGER STORY
        </p>
        <h2
          className="whitespace-nowrap text-[clamp(1.35rem,7vw,2.15rem)] font-light uppercase leading-none tracking-[0.045em] text-[#171615] sm:text-5xl md:text-[3.5rem]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          The Art of Weddings
        </h2>
        <p className="mx-auto mt-4 max-w-[38rem] text-xs font-light leading-[1.7] text-[#655E55] sm:mt-5 sm:text-sm">
          Every detail, quiet gesture and fleeting moment, thoughtfully preserved as part of your
          wedding story.
        </p>
      </header>

      <div className="grid grid-cols-4 md:grid-cols-8" aria-label="Wedding details gallery">
        {stripImages.map(({ src, alt, photo }) => {
          const image = (
            <LazyImage
              src={src}
              alt={alt}
              width={480}
              height={430}
              rootMargin="100px 0px"
              revealAnimation={false}
              containerClassName="aspect-[1.05] w-full"
              placeholderClassName="bg-[#EAE4DA]"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            />
          );

          return photo ? (
            <button
              key={src}
              type="button"
              onClick={() => setActiveModalPhoto(photo)}
              aria-label={`View photograph: ${photo.title}`}
              className="group relative block min-w-0 cursor-pointer overflow-hidden bg-[#EAE4DA] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
            >
              {image}
            </button>
          ) : (
            <div key={src} className="group relative min-w-0 overflow-hidden bg-[#EAE4DA]">
              {image}
            </div>
          );
        })}
      </div>

      <div
        ref={statsRef}
        className="mx-auto grid max-w-5xl grid-cols-3 px-3 py-9 sm:px-8 sm:py-12 md:py-14"
        aria-label="Oscar Wedding Company in numbers"
      >
        {[
          { target: 20, label: 'WEDDINGS DOCUMENTED' },
          { target: 20, label: 'LOCATIONS' },
          { target: 5, label: 'YEARS OF STORYTELLING' },
        ].map(({ target, label }, index) => (
          <div
            key={label}
            className={`flex flex-col items-center justify-center text-center ${
              index > 0 ? 'border-l border-[#D9D2C8]' : ''
            }`}
          >
            <span
              className="font-cormorant text-[2.35rem] font-light leading-[0.8] tracking-[-0.055em] text-[#796549] sm:text-5xl md:text-[3.5rem]"
              aria-label={`${target} plus`}
            >
              <AnimatedCounter target={target} started={statsStarted} />
            </span>
            <span className="mt-3 max-w-[10rem] text-[7px] font-medium uppercase leading-relaxed tracking-[0.16em] text-[#655E55] sm:text-[9px] sm:tracking-[0.22em] md:text-[10px]">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* IMMERSIVE ARCHIVAL LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModalPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#11100F]/96 backdrop-blur-md flex items-start sm:items-center justify-center p-2 pt-[4.5rem] sm:p-6"
            data-theme="dark"
            onClick={() => setActiveModalPhoto(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[calc(100dvh-5.25rem)] sm:max-h-[calc(100dvh-3rem)] lg:translate-y-6 bg-[#171615] border border-white/15 rounded-[3px] overflow-y-auto sm:overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalPhoto(null)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-[70] flex items-center justify-center w-10 h-10 text-white/85 bg-[#171615]/90 border border-white/20 rounded-full hover:text-white hover:bg-[#252321] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Master Image Frame */}
              <div className="relative md:w-[60%] h-[28dvh] min-h-[180px] sm:h-[42dvh] sm:min-h-[300px] md:h-auto md:min-h-0 bg-[#0D0D0C] flex items-center justify-center overflow-hidden flex-shrink-0">
                <LazyImage
                  src={activeModalPhoto.image}
                  alt={activeModalPhoto.alt}
                  width={1200}
                  height={900}
                  priority={true}
                  containerClassName="w-full h-full flex items-center justify-center"
                  className="w-full h-full object-contain max-h-[75vh]"
                />

                {/* Modal Step Controls */}
                <button
                  onClick={handleModalPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/75 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleModalNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/75 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Details Panel */}
              <div className="md:w-[40%] p-4 sm:p-7 md:p-8 flex flex-col justify-between gap-5 overflow-y-auto bg-[#191817] text-[#FAF8F5]">
                <div className="space-y-3 sm:space-y-5">
                  <div className="text-[#C5A880] text-[10px] tracking-[0.28em] uppercase font-medium">
                    <span>{activeModalPhoto.tag}</span>
                  </div>

                  <h3
                    className="text-xl sm:text-3xl font-serif text-white font-light leading-[1.08]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {activeModalPhoto.title}
                  </h3>

                  {activeModalPhoto.location && (
                    <div className="flex items-center gap-2 text-xs text-white/55 font-light border-b border-white/10 pb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{activeModalPhoto.location}</span>
                    </div>
                  )}

                  <p className="text-sm text-white/75 font-light leading-[1.6] max-w-md">
                    {activeModalPhoto.caption}
                  </p>

                  {/* Craft Note */}
                  {activeModalPhoto.craftNote && (
                    <div className="py-3 border-y border-white/10 space-y-2">
                      <span className="text-[9px] tracking-[0.24em] uppercase text-[#C5A880] block font-medium">
                        ARCHIVAL SPECIFICATION
                      </span>
                      <p className="text-xs text-white/65 leading-relaxed">
                        {activeModalPhoto.craftNote}
                      </p>
                    </div>
                  )}

                  {/* Aesthetic Keywords */}
                  {activeModalPhoto.aestheticKeywords && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[10px] tracking-[0.12em] uppercase text-white/55">
                      {activeModalPhoto.aestheticKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="after:content-['·'] after:ml-3 last:after:content-none"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/10 space-y-4">
                  <button
                    onClick={() => {
                      setActiveModalPhoto(null);
                      onOpenEnquiry();
                    }}
                    className="w-full py-3.5 rounded-[2px] bg-[#FAF8F5] text-[#0A0A0A] hover:bg-white text-[10px] tracking-[0.22em] uppercase font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>CHECK DATE AVAILABILITY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[9px] text-center text-white/35 tracking-[0.18em] uppercase">
                    OSCAR WEDDING COMPANY · PRIVATE COMMISSION
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
