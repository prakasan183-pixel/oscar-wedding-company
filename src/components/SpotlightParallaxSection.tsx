import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FEATURED_HALDI_STORY } from '../data/weddingContent';
import { WeddingStory } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { LazyImage } from './LazyImage';

interface SpotlightParallaxSectionProps {
  onOpenStory: (story: WeddingStory) => void;
}

export const SpotlightParallaxSection: React.FC<SpotlightParallaxSectionProps> = ({
  onOpenStory,
}) => {
  const handleExplore = () => {
    onOpenStory(FEATURED_HALDI_STORY);
  };

  return (
    <section
      id="ceremony-spotlight"
      data-theme="dark"
      className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070706] text-[#FAF8F5] py-16 md:py-24 px-6 md:px-12 lg:px-20"
      aria-label="Bhagya and Prabhu Haldi Ceremony Editorial Spotlight"
    >
      {/* 
        Full-bleed Atmospheric Background: 
        Rendered with zero sticky traps, zero scroll listeners, and zero heavy CSS filter shaders.
        Guarantees instant, buttery-smooth 60/120 FPS scrolling across all devices.
      */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <LazyImage
          src="/images/haldi_ceremony_bride.jpg"
          alt="Bhagya and Prabhu Haldi Ceremony at Kumarakom Lake Palace Heritage Grove — Indian destination wedding photography by Oscar Weddings"
          width={1376}
          height={768}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-center brightness-[0.85]"
        />

        {/* Luxury Atmospheric Film Scrims for High-Contrast Editorial Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent" />
      </div>

      {/* Subtle Ambient Accent Hairlines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAE6DF]/20 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EAE6DF]/20 to-transparent z-10 pointer-events-none" />

      {/* Foreground Editorial Story Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-5 md:space-y-7">
          
          {/* Editorial Eyebrow Tag - Clean without star/sparkle icon */}
          <ScrollReveal delay={0} y={16} duration={0.8} amount={0.2}>
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-black/55 border border-white/15 text-[#E6E1D8] shadow-sm">
              <span
                className="text-[9px] sm:text-[10px] tracking-[0.32em] uppercase font-medium"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                FEATURED CEREMONIAL SPOTLIGHT
              </span>
            </div>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal delay={0.12} y={24} duration={0.85} amount={0.2}>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-serif font-light text-[#FFFFFF] tracking-tight leading-[1.12] drop-shadow-md cursor-pointer group hover:text-[#FAF8F5]/95 transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              onClick={handleExplore}
            >
              Unveiling the Magic of Bhagya and Prabhu&apos;s Haldi Ceremony: A Day of Love and Traditions
            </h2>
          </ScrollReveal>

          {/* Date & Location Tag */}
          <ScrollReveal delay={0.22} y={20} duration={0.85} amount={0.2}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[#E6E1D8]">
              <span
                className="text-xs sm:text-sm tracking-[0.28em] uppercase font-medium text-[#FAF8F5]/90"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                MARCH 26, 2025
              </span>

              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />

              <span
                className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#C5A880] font-medium"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                KUMARAKOM · HERITAGE GROVE
              </span>
            </div>
          </ScrollReveal>

          {/* Interactive Arrow Line - Completely hardware accelerated and responsive */}
          <ScrollReveal delay={0.32} y={16} duration={0.8} amount={0.2}>
            <div className="pt-2 sm:pt-4">
              <button
                id="haldi-spotlight-arrow-btn"
                onClick={handleExplore}
                className="group inline-flex items-center gap-5 cursor-pointer focus:outline-none"
                aria-label="View Bhagya and Prabhu Haldi Ceremony story"
              >
                <div className="relative flex items-center">
                  {/* The Horizontal Line */}
                  <div className="w-24 sm:w-36 h-[1.5px] bg-[#FAF8F5] group-hover:w-48 transition-all duration-300 ease-out shadow-sm" />
                  
                  {/* Arrowhead */}
                  <ArrowRight className="w-5 h-5 text-[#FAF8F5] -ml-2 group-hover:translate-x-3 transition-transform duration-300 ease-out" />
                </div>

                <span
                  className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#FAF8F5]/85 group-hover:text-[#FFFFFF] group-hover:tracking-[0.32em] font-medium transition-all duration-200"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  VIEW FULL CEREMONY STORY
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Corner Curated Badge */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-10 pointer-events-none hidden sm:block">
        <div className="px-3.5 py-1.5 rounded-full bg-black/55 border border-white/10 text-[9px] tracking-[0.24em] uppercase text-[#FAF8F5]/70 font-light shadow-sm">
          MONOGRAPH 04 · OSCAR WEDDINGS
        </div>
      </div>
    </section>
  );
};
