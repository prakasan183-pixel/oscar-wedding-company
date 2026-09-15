import React, { useState } from 'react';
import { Play, ArrowRight, Camera, Film, ArrowUpRight, X, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/weddingContent';
import { ScrollReveal } from './ScrollReveal';
import { LazyImage } from './LazyImage';

interface PhotographyAndFilmsSectionProps {
  onOpenFilms: () => void;
  onExplorePhotography: () => void;
}

export const PhotographyAndFilmsSection: React.FC<PhotographyAndFilmsSectionProps> = ({
  onOpenFilms,
  onExplorePhotography,
}) => {
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  return (
    <section
      id="craft"
      data-theme="dark"
      className="relative bg-[#0E0D0C] text-[#FAF8F5] py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-[#211F1D]"
    >
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        {/* Section Header */}
        <ScrollReveal y={20} duration={0.8} amount={0.2}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262422] pb-8 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.34em] uppercase text-[#8C8479]">
                SECTION 05 — TWO MEDIUMS, ONE VISION
              </span>
              <h2
                className="text-3xl sm:text-5xl font-serif font-light text-[#FAF8F5]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                The Stills &amp; The Motion.
              </h2>
            </div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#8C8479] max-w-xs md:text-right">
              CURATED MEDIUM FORMAT DIGITAL &amp; 4K CINEMATIC DOCUMENTARY
            </p>
          </div>
        </ScrollReveal>

        {/* Sophisticated Dual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* OFFERING 01: PHOTOGRAPHY */}
          <ScrollReveal delay={0.1} y={28} duration={0.85} amount={0.15}>
            <div
              id="offering-photography"
              className="group flex flex-col justify-between space-y-8 bg-[#141312] border border-[#211F1D] p-6 sm:p-10 hover:border-[#3A3632] transition-colors h-full"
            >
              <div className="space-y-6">
                {/* Visual Presentation */}
                <div
                  className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-[#0A0A0A] cursor-pointer"
                  onClick={onExplorePhotography}
                >
                  <LazyImage
                    src={SERVICES_DATA.photography.image}
                    alt="Luxury Indian wedding photography still archive by Oscar Weddings"
                    width={1200}
                    height={800}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1 text-[9px] tracking-[0.2em] uppercase text-[#E6E1D8] pointer-events-none">
                    <Camera className="w-3 h-3 text-[#8C8479]" />
                    <span>STILL ARCHIVE</span>
                  </div>
                </div>

                {/* Editorial Typography & Copy */}
                <div className="space-y-3">
                  <h3
                    className="text-3xl sm:text-4xl font-serif font-light text-[#FAF8F5] tracking-wide"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {SERVICES_DATA.photography.heading}
                  </h3>
                </div>

                <p
                  className="text-sm sm:text-base text-[#B4ACA1] font-light leading-relaxed"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {SERVICES_DATA.photography.copy}
                </p>

                {/* Sub details */}
                <ul className="pt-2 space-y-2 border-t border-[#211F1D]">
                  {SERVICES_DATA.photography.subDetails.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#8C8479]">
                      <span className="w-1.5 h-[1px] bg-[#8C8479]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button
                  id="explore-photography-btn"
                  onClick={onExplorePhotography}
                  className="inline-flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-[#FAF8F5] group-hover:text-[#E6E1D8] transition-colors border-b border-[#FAF8F5] pb-1"
                >
                  <span>{SERVICES_DATA.photography.cta}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* OFFERING 02: CINEMATIC FILMS */}
          <ScrollReveal delay={0.22} y={28} duration={0.85} amount={0.15}>
            <div
              id="offering-films"
              className="group flex flex-col justify-between space-y-8 bg-[#141312] border border-[#211F1D] p-6 sm:p-10 hover:border-[#3A3632] transition-colors h-full"
            >
              <div className="space-y-6">
                {/* Visual Presentation with Luxurious 4K YouTube Embed */}
                <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-[#0A0A0A] border border-[#262422]">
                  {isPlayingInline ? (
                    <div className="relative w-full h-full bg-black">
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/Vr-WvoInbu4?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                        title="Jibin & Lizbeth | Kerala Christian Wedding | Cinematic Wedding Highlight"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                      {/* Inline Control Strip */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                        <button
                          onClick={onOpenFilms}
                          className="px-2.5 py-1 bg-black/80 hover:bg-black text-[#FAF8F5] text-[9.5px] uppercase tracking-wider rounded-[2px] border border-white/20 backdrop-blur-sm transition-colors flex items-center gap-1"
                          title="Open Full Cinema Modal"
                        >
                          <ArrowUpRight className="w-3 h-3 text-[#D8B48A]" />
                          <span className="hidden sm:inline">Theater</span>
                        </button>
                        <button
                          onClick={() => setIsPlayingInline(false)}
                          className="px-2.5 py-1 bg-black/80 hover:bg-black text-[#FAF8F5] text-[9.5px] uppercase tracking-wider rounded-[2px] border border-white/20 backdrop-blur-sm transition-colors flex items-center gap-1"
                          title="Close Preview"
                        >
                          <X className="w-3 h-3" />
                          <span>Close</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="relative w-full h-full cursor-pointer group/film"
                      onClick={() => setIsPlayingInline(true)}
                    >
                      <LazyImage
                        src={SERVICES_DATA.films.thumbnail}
                        alt="Jibin & Lizbeth Kerala Christian Wedding Cinematic 4K Highlight Film by Oscar Weddings"
                        width={1280}
                        height={720}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover object-center group-hover/film:scale-105 transition-transform duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

                      {/* Quiet Luxury Play Button Indicator */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-black/60 border border-[#C5A880]/50 backdrop-blur-md flex items-center justify-center group-hover/film:scale-110 group-hover/film:bg-[#FAF8F5] group-hover/film:text-[#0A0A0A] group-hover/film:border-[#FAF8F5] transition-all duration-300 text-[#FAF8F5] shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                          <Play className="w-6 h-6 ml-0.5 fill-current" />
                        </div>
                        <span className="text-[9.5px] tracking-[0.24em] uppercase text-[#FAF8F5]/90 bg-black/60 px-3 py-1 rounded-[2px] backdrop-blur-sm border border-white/10 group-hover/film:border-[#C5A880]/40 transition-colors">
                          PLAY 4K WEDDING FILM
                        </span>
                      </div>

                      {/* Header Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1 text-[9px] tracking-[0.22em] uppercase text-[#FAF8F5] border border-white/10">
                        <Film className="w-3 h-3 text-[#C5A880]" />
                        <span>CINEMA ARCHIVE · 4K</span>
                      </div>

                      {/* Bottom Editorial Caption */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#FAF8F5] pointer-events-none">
                        <div className="space-y-0.5 max-w-[75%]">
                          <span className="text-[8.5px] tracking-[0.26em] uppercase text-[#C5A880] block font-mono">
                            FEATURED HIGHLIGHT
                          </span>
                          <p
                            className="text-sm sm:text-base font-serif font-normal text-white leading-tight line-clamp-1"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            Jibin &amp; Lizbeth · Kerala Christian Wedding
                          </p>
                        </div>
                        <span className="text-[9.5px] tracking-widest text-[#B4ACA1] font-mono bg-black/70 px-2 py-0.5 backdrop-blur-xs border border-white/10">
                          24 FPS
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Editorial Typography & Copy */}
                <div className="space-y-3">
                  <div className="flex items-center justify-end">
                    <span className="text-[9px] tracking-[0.22em] uppercase px-2 py-0.5 rounded-[2px] bg-[#1C1814] border border-[#3A2E1F] text-[#D8B48A] flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
                      <span>CINEMA FILM</span>
                    </span>
                  </div>
                  <h3
                    className="text-3xl sm:text-4xl font-serif font-light text-[#FAF8F5] tracking-wide"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {SERVICES_DATA.films.heading}
                  </h3>
                </div>

                <p
                  className="text-sm sm:text-base text-[#B4ACA1] font-light leading-relaxed"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {SERVICES_DATA.films.copy}
                </p>

                {/* Featured Highlight Card */}
                <div className="p-3.5 bg-[#0F0E0D] border border-[#2B2722] rounded-[2px] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8.5px] tracking-[0.25em] uppercase text-[#C5A880] font-mono">
                      FEATURED WEDDING FILM
                    </span>
                    <span className="text-[8.5px] tracking-wider uppercase text-[#8C8479]">
                      KERALA, INDIA
                    </span>
                  </div>
                  <h4
                    className="text-base sm:text-lg font-serif text-[#FAF8F5] leading-snug font-normal"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Jibin &amp; Lizbeth | Kerala Christian Wedding | Cinematic Wedding Highlight
                  </h4>
                  <p className="text-[11px] text-[#8C8479] font-light leading-relaxed">
                    Crafted with 4K Cinema Optics &amp; Natural Ambient Soundscape. Color-graded to capture the timeless reverence of heritage Kerala church ceremonies.
                  </p>
                </div>

                {/* Sub details */}
                <ul className="pt-2 space-y-2 border-t border-[#211F1D]">
                  {SERVICES_DATA.films.subDetails.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#8C8479]">
                      <span className="w-1.5 h-[1px] bg-[#C5A880]" />
                      <span className={idx === 0 ? "text-[#E6E1D8] font-medium" : ""}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#1F1D1B]">
                <button
                  id="watch-films-btn"
                  onClick={onOpenFilms}
                  className="inline-flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-[#FAF8F5] hover:text-[#C5A880] transition-colors border-b border-[#FAF8F5] pb-1"
                >
                  <span>{SERVICES_DATA.films.cta}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </button>

                <a
                  href={SERVICES_DATA.films.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.18em] uppercase text-[#B4ACA1] hover:text-[#FAF8F5] transition-colors font-mono"
                >
                  <span>WATCH ON YOUTUBE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
