import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, X, MapPin } from 'lucide-react';
import { SPECIALIZATION_DATA } from '../data/weddingContent';
import { SpecializationPhoto } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { LazyImage } from './LazyImage';

interface SpecializationSectionProps {
  onOpenEnquiry: () => void;
}

export const SpecializationSection: React.FC<SpecializationSectionProps> = ({
  onOpenEnquiry,
}) => {
  const [activeModalPhoto, setActiveModalPhoto] = useState<SpecializationPhoto | null>(null);

  const { eyebrow, titleLine1, titleLine2, narrative, photos } = SPECIALIZATION_DATA;

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
      className="relative bg-[#FAF8F5] text-[#141210] py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-[#EAE4DA] overflow-hidden"
    >
      {/* Subtle fine-art warm radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.95)_0%,rgba(250,248,245,0.9)_50%,rgba(242,237,230,0.95)_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-10 md:space-y-12">
        {/* ========================================================================= */}
        {/* ATELIER EDITORIAL HEADER — Clean typography with NO starting symbols */}
        {/* ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <ScrollReveal delay={0} y={16} duration={0.75} amount={0.2}>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EDE7DD]/80 border border-[#DDD5C7]/70 text-[#6B6358] text-[9.5px] sm:text-[10.5px] tracking-[0.32em] uppercase font-medium">
              <span>{eyebrow}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.06} y={20} duration={0.8} amount={0.2}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#141210] tracking-[-0.015em] leading-[1.08]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              <span>{titleLine1}</span>
              <span className="block italic text-[#806B52] font-normal mt-1 sm:mt-2">
                {titleLine2}
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.12} y={16} duration={0.8} amount={0.2}>
            <p className="text-sm sm:text-base text-[#615A52] leading-relaxed max-w-2xl mx-auto font-light pt-1">
              {narrative}
            </p>
          </ScrollReveal>
        </div>

        {/* ========================================================================= */}
        {/* EDITORIAL MOSAIC SPREAD — 100% Responsive for Mobile, Tablet & Desktop */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E5DFD5] pb-4">
            <div>
              <span className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#736B63] font-medium block">
                CURATED MOSAIC
              </span>
              <h3
                className="text-2xl sm:text-3xl font-serif font-light text-[#141210] mt-0.5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Ceremonial Cadences & Pre-Wedding
              </h3>
            </div>
            <p className="text-xs text-[#736B63] max-w-xs font-light">
              Tap any frame to view archival notes and full-resolution composition.
            </p>
          </div>

          {/* Grid Layout: Desktop 12-cols bento, Tablet 2-cols, Mobile 1-col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* 1. Feature Card: Traditional Kasavu & Temple Lotus (Kerala Wedding) */}
            {photos[0] && (
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveModalPhoto(photos[0])}
                className="sm:col-span-2 lg:col-span-6 relative overflow-hidden bg-[#EAE4DA] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#E5DFD5] cursor-pointer group"
              >
                <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden relative">
                  <LazyImage
                    src={photos[0].image}
                    alt={photos[0].alt}
                    width={1200}
                    height={900}
                    containerClassName="w-full h-full"
                    placeholderClassName="bg-[#EAE4DA]"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4
                      className="text-xl sm:text-2xl font-serif text-white mt-1"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {photos[0].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/80 font-light mt-1 line-clamp-2">
                      {photos[0].caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. Portrait Card: Save The Date Backwater Serenade */}
            {photos[1] && (
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveModalPhoto(photos[1])}
                className="sm:col-span-1 lg:col-span-3 relative overflow-hidden bg-[#EAE4DA] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#E5DFD5] cursor-pointer group"
              >
                <div className="aspect-[3/4] w-full overflow-hidden relative">
                  <LazyImage
                    src={photos[1].image}
                    alt={photos[1].alt}
                    width={900}
                    height={1200}
                    containerClassName="w-full h-full"
                    placeholderClassName="bg-[#EAE4DA]"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4
                      className="text-lg sm:text-xl font-serif text-white mt-1"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {photos[1].title}
                    </h4>
                    <p className="text-xs text-white/80 font-light mt-1 line-clamp-2">
                      {photos[1].caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. Portrait Card: The Heirloom Kerala Bride */}
            {photos[2] && (
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveModalPhoto(photos[2])}
                className="sm:col-span-1 lg:col-span-3 relative overflow-hidden bg-[#EAE4DA] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#E5DFD5] cursor-pointer group"
              >
                <div className="aspect-[3/4] w-full overflow-hidden relative">
                  <LazyImage
                    src={photos[2].image}
                    alt={photos[2].alt}
                    width={900}
                    height={1200}
                    containerClassName="w-full h-full"
                    placeholderClassName="bg-[#EAE4DA]"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4
                      className="text-lg sm:text-xl font-serif text-white mt-1"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {photos[2].title}
                    </h4>
                    <p className="text-xs text-white/80 font-light mt-1 line-clamp-2">
                      {photos[2].caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. Landscape Card: The Auspicious Thalikettu (Sacred Ritual) */}
            {photos[3] && (
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveModalPhoto(photos[3])}
                className="sm:col-span-1 lg:col-span-6 relative overflow-hidden bg-[#EAE4DA] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#E5DFD5] cursor-pointer group"
              >
                <div className="aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/9] w-full overflow-hidden relative">
                  <LazyImage
                    src={photos[3].image}
                    alt={photos[3].alt}
                    width={1200}
                    height={675}
                    containerClassName="w-full h-full"
                    placeholderClassName="bg-[#EAE4DA]"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4
                      className="text-lg sm:text-xl font-serif text-white mt-1"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {photos[3].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/80 font-light mt-1 line-clamp-2">
                      {photos[3].caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. Landscape Card: Twilight Reception & Celebrations */}
            {photos[4] && (
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveModalPhoto(photos[4])}
                className="sm:col-span-1 lg:col-span-6 relative overflow-hidden bg-[#EAE4DA] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#E5DFD5] cursor-pointer group"
              >
                <div className="aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/9] w-full overflow-hidden relative">
                  <LazyImage
                    src={photos[4].image}
                    alt={photos[4].alt}
                    width={1200}
                    height={675}
                    containerClassName="w-full h-full"
                    placeholderClassName="bg-[#EAE4DA]"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4
                      className="text-lg sm:text-xl font-serif text-white mt-1"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {photos[4].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/80 font-light mt-1 line-clamp-2">
                      {photos[4].caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Inquire CTA */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5DFD5]">
            <p className="text-xs sm:text-sm text-[#736B63] font-light text-center sm:text-left">
              Accepting private commissions for Kerala wedding celebrations and Save The Date shoots across 2025 & 2026.
            </p>
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#141210] hover:bg-[#2B2723] text-[#FAF8F5] text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 cursor-pointer shadow-md group whitespace-nowrap"
            >
              <span>INQUIRE FOR WEDDING & SAVE THE DATE</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
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
                    OSCAR WEDDINGS · PRIVATE COMMISSION
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
