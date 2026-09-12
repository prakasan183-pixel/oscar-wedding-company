import React from 'react';
import { KERALA_DATA } from '../data/weddingContent';
import { ScrollReveal } from './ScrollReveal';
import { LazyImage } from './LazyImage';

export const KeralaSection: React.FC = () => {
  return (
    <section
      id="kerala"
      data-theme="dark"
      className="relative min-h-[85vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] text-[#FAF8F5] py-16 md:py-24 px-6 md:px-12 lg:px-20"
    >
      {/* Full-width Atmospheric Kerala Wedding Image */}
      <div className="absolute inset-0 z-0">
        <LazyImage
          src={KERALA_DATA.image}
          alt="Traditional Kerala wedding backwaters boat procession and backwaters heritage atmosphere — Oscar Weddings"
          width={1200}
          height={896}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/80 pointer-events-none" />
      </div>

      {/* Editorial Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
        {/* Section Label */}
        <ScrollReveal delay={0} y={16} duration={0.8} amount={0.2}>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-[#8C8479]/60" />
            <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#B4ACA1] font-light">
              SENSE OF PLACE &amp; IDENTITY
            </span>
            <span className="h-[1px] w-8 bg-[#8C8479]/60" />
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={0.1} y={24} duration={0.85} amount={0.2}>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#FAF8F5] uppercase tracking-[0.08em] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {KERALA_DATA.headline}
          </h2>
        </ScrollReveal>

        {/* Sophisticated Body Copy */}
        <ScrollReveal delay={0.2} y={24} duration={0.85} amount={0.2}>
          <p
            className="text-base sm:text-lg md:text-xl text-[#E6E1D8] font-light leading-[1.8] max-w-3xl mx-auto tracking-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {KERALA_DATA.copy}
          </p>
        </ScrollReveal>

        {/* Understated Location Line */}
        <ScrollReveal delay={0.3} y={16} duration={0.8} amount={0.2}>
          <div className="pt-4 border-t border-[#FAF8F5]/15 max-w-2xl mx-auto">
            <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#B4ACA1] font-light">
              {KERALA_DATA.locations}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
