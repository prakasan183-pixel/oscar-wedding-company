import React, { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { FEATURED_FILMS } from '../data/weddingContent';
import { ScrollReveal } from './ScrollReveal';

interface PhotographyAndFilmsSectionProps {
  onOpenFilms: () => void;
  onExplorePhotography: () => void;
}

export const PhotographyAndFilmsSection: React.FC<PhotographyAndFilmsSectionProps> = ({
  onOpenFilms,
}) => {
  const [playingFilmId, setPlayingFilmId] = useState<string | null>(null);

  return (
    <section
      id="craft"
      data-theme="light"
      className="relative overflow-hidden border-t border-[#D9D1C5] bg-[#FBF8F3] px-6 py-16 text-[#171615] md:px-12 md:py-24 lg:px-20"
    >
      <div className="mx-auto max-w-7xl space-y-12 md:space-y-20">
        <ScrollReveal y={20} duration={0.8} amount={0.2}>
          <div className="border-b border-[#D9D1C5] pb-6">
            <span className="text-[10px] uppercase tracking-[0.34em] text-[#8C8479]">
              SECTION 05 — CINEMATIC FILMS
            </span>
            <h2
              className="mt-3 text-4xl font-light tracking-wide sm:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Stories in motion.
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-16 md:space-y-24">
          {FEATURED_FILMS.slice(0, 2).map((film, index) => {
            const isPlaying = playingFilmId === film.id;
            const isSecondFilm = index === 1;

            return (
              <ScrollReveal key={film.id} delay={index * 0.12} y={28} duration={0.85} amount={0.15}>
                <article className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${isSecondFilm ? 'film-row-reverse' : ''}`}>
                  <div className="max-w-xl">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-[#A0805D]">
                      0{index + 1} · YouTube Film
                    </span>
                    <h3
                      className="mt-4 text-3xl font-light leading-tight sm:text-5xl"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {film.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#736B63]">{film.subtitle}</p>
                    <p className="mt-6 max-w-md text-sm leading-relaxed text-[#736B63]">{film.synopsis}</p>
                    <a
                      href={film.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-2 border-b border-[#8C8479] pb-1 text-[10px] uppercase tracking-[0.2em] text-[#4E4841] transition-colors hover:border-[#171615] hover:text-[#171615]"
                    >
                      Watch on YouTube <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>

                  <div className="relative aspect-video overflow-hidden bg-[#E7DED2] shadow-[0_18px_50px_rgba(83,68,50,0.12)]">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                        title={`${film.title} - ${film.subtitle}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="h-full w-full border-0"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlayingFilmId(film.id)}
                        className="group relative block h-full w-full cursor-pointer text-left"
                        aria-label={`Play ${film.title}`}
                      >
                        <img
                          src={film.thumbnail}
                          alt={`${film.title} film thumbnail`}
                          loading="lazy"
                          decoding="async"
                          className="image-shutter-reveal h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/0">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EEE5] text-[#171615] shadow-xl transition-transform group-hover:scale-110">
                            <Play className="ml-1 h-6 w-6 fill-current" />
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <a
          id="watch-films-btn"
          href={FEATURED_FILMS[0].youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex items-center gap-3 border-b border-[#171615] pb-1 text-[10px] uppercase tracking-[0.22em] text-[#171615] transition-colors hover:text-[#8C6B4B]"
        >
          Watch on YouTube <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
};
