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
      className="stories-motion-section"
      aria-labelledby="stories-motion-heading"
    >
      <div className="stories-motion-inner">
        <ScrollReveal y={20} duration={0.8} amount={0.2}>
          <header className="stories-motion-header">
            <div className="stories-motion-eyebrow">
              <span>SECTION 05 — CINEMATIC FILMS</span>
              <span className="stories-motion-rule" aria-hidden="true" />
            </div>
            <h2 id="stories-motion-heading">Stories in Motion</h2>
          </header>
        </ScrollReveal>

        <div className="stories-motion-list">
          {FEATURED_FILMS.slice(0, 2).map((film, index) => {
            const isPlaying = playingFilmId === film.id;

            return (
              <ScrollReveal key={film.id} delay={index * 0.12} y={28} duration={0.85} amount={0.15}>
                <article className={`stories-motion-row${index === 1 ? ' stories-motion-row-reverse' : ''}`}>
                  <div className="stories-motion-copy">
                    <div className="stories-motion-number" aria-hidden="true">
                      0{index + 1}
                    </div>
                    <div className="stories-motion-details">
                      <span className="stories-motion-label">YouTube Film</span>
                      <h3>{film.title}</h3>
                      <p className="stories-motion-subtitle">{film.subtitle}</p>
                      <p className="stories-motion-synopsis">{film.synopsis}</p>
                      <a
                        href={film.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stories-motion-link"
                      >
                        <span>Watch on YouTube</span>
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  <div className="stories-motion-video">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                        title={`${film.title} - ${film.subtitle}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlayingFilmId(film.id)}
                        aria-label={`Play ${film.title}`}
                      >
                        <img
                          src={film.thumbnail}
                          alt={`${film.title} film thumbnail`}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="stories-motion-play" aria-hidden="true">
                          <Play />
                        </span>
                      </button>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <footer className="stories-motion-footer">
          <button type="button" onClick={onOpenFilms}>
            <span>View All Films</span>
            <ArrowUpRight aria-hidden="true" />
          </button>
        </footer>
      </div>
    </section>
  );
};
