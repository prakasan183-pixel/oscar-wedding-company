import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, AudioLines, Volume2, VolumeX } from 'lucide-react';
import { FEATURED_FILMS } from '../data/weddingContent';
import { FilmReel } from '../types';
import { withSiteBase } from '../utils/siteUrl';

interface PhotographyAndFilmsSectionProps {
  onOpenFilms: () => void;
  onExplorePhotography: () => void;
}

interface YouTubePlayer {
  destroy: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getIframe: () => HTMLIFrameElement;
  mute: () => void;
  pauseVideo: () => void;
  playVideo: () => void;
  unMute: () => void;
}

interface YouTubeIframeAPI {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events: {
        onReady: (event: { target: YouTubePlayer }) => void;
        onError: (event: { data: number }) => void;
        onStateChange: (event: { data: number }) => void;
      };
    },
  ) => YouTubePlayer;
}

declare global {
  interface Window {
    YT?: YouTubeIframeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YouTubeIframeAPI> | null = null;

const loadYouTubeApi = (): Promise<YouTubeIframeAPI> => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve, reject) => {
    window.onYouTubeIframeAPIReady = () => {
      if (!window.YT?.Player) {
        reject(new Error('The YouTube player API loaded without its Player constructor.'));
        return;
      }
      resolve(window.YT);
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = () => reject(new Error('Unable to load the YouTube player API.'));
    document.head.appendChild(script);
  });

  return youtubeApiPromise;
};

interface FilmPlayerProps {
  film: FilmReel;
  compact?: boolean;
}

const FilmPlayer: React.FC<FilmPlayerProps> = ({ film, compact = false }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const playerReadyRef = useRef(false);
  const initializationStartedRef = useRef(false);
  const lifecycleRef = useRef(0);
  const isInViewRef = useRef(false);
  const isMutedRef = useRef(true);
  const [isInView, setIsInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [playerError, setPlayerError] = useState(false);
  const [isActuallyPlaying, setIsActuallyPlaying] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        isInViewRef.current = visible;
        setIsInView(visible);
      },
      { threshold: [0, 0.25] },
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || initializationStartedRef.current || !film.youtubeId) return;

    initializationStartedRef.current = true;
    const lifecycle = lifecycleRef.current;
    loadYouTubeApi()
      .then((youtube) => {
        const host = playerHostRef.current;
        if (lifecycle !== lifecycleRef.current || !host) return;

        playerRef.current = new youtube.Player(host, {
          videoId: film.youtubeId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            loop: 1,
            modestbranding: 1,
            mute: 1,
            playsinline: 1,
            playlist: film.youtubeId,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: ({ target }) => {
              playerRef.current = target;
              playerReadyRef.current = true;
              const iframe = target.getIframe();
              iframe.title = `${film.title} wedding film`;
              iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
              iframe.setAttribute('allowfullscreen', '');
              if (isMutedRef.current) target.mute();
              else target.unMute();
              if (isInViewRef.current) target.playVideo();
              else target.pauseVideo();
            },
            onError: ({ data }) => {
              console.error(`Unable to play the wedding film "${film.title}" (YouTube error ${data}).`);
              setPlayerError(true);
            },
            onStateChange: ({ data }) => setIsActuallyPlaying(data === 1),
          },
        });
      })
      .catch((error: Error) => {
        if (lifecycle !== lifecycleRef.current) return;
        console.error(`Unable to initialize the wedding film "${film.title}".`, error);
        setPlayerError(true);
      });
  }, [film.title, film.youtubeId, isInView]);

  useEffect(() => () => {
    lifecycleRef.current += 1;
    playerReadyRef.current = false;
    playerRef.current?.destroy();
    playerRef.current = null;
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !playerReadyRef.current) return;
    if (isInView) {
      player.mute();
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    const timer = window.setInterval(() => {
      const player = playerRef.current;
      if (!player || !playerReadyRef.current) return;
      const duration = player.getDuration();
      if (duration > 0) {
        setProgress(Math.min(player.getCurrentTime() / duration, 1));
      }
    }, 500);

    return () => window.clearInterval(timer);
  }, [isInView]);

  const toggleMute = () => {
    const nextMuted = !isMutedRef.current;
    isMutedRef.current = nextMuted;
    setIsMuted(nextMuted);
    if (!playerReadyRef.current) return;
    if (nextMuted) playerRef.current?.mute();
    else playerRef.current?.unMute();
  };

  return (
    <div
      ref={panelRef}
      className={`stories-motion-card stories-motion-video-card${compact ? ' stories-motion-card-compact' : ' stories-motion-card-featured'}`}
    >
      <img
        className="stories-motion-poster"
        src={film.thumbnail}
        alt=""
        loading={compact ? 'lazy' : 'eager'}
        decoding="async"
      />
      <div
        className={`stories-motion-player${isActuallyPlaying ? ' stories-motion-player-playing' : ''}`}
        aria-hidden="true"
      >
        <div ref={playerHostRef} className="stories-motion-player-host" />
      </div>
      {playerError && (
        <p className="stories-motion-player-error" role="status">
          Film preview unavailable. <a href={film.youtubeUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </p>
      )}
      <div className="stories-motion-shade" aria-hidden="true" />

      <div className="stories-motion-overlay">
        <div className="stories-motion-card-meta">
          <div className="stories-motion-film-identity">
            <span className="stories-motion-film-number">{compact ? '02' : '01'}</span>
            <span className="stories-motion-film-divider" aria-hidden="true" />
            <div className="stories-motion-film-copy">
              <a
                className="stories-motion-film-title"
                href={film.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${film.title} full film on YouTube`}
              >
                {film.title}
                <ArrowUpRight aria-hidden="true" />
              </a>
              <span className="stories-motion-film-caption">
                {compact ? film.subtitle : 'WEDDING FILM'}
              </span>
            </div>
          </div>

          <div className="stories-motion-player-controls">
            <span className="stories-motion-now-playing">
              <span>{isActuallyPlaying ? 'NOW PLAYING' : 'FILM PREVIEW'}</span>
              <AudioLines aria-hidden="true" />
            </span>
            <button
              className="stories-motion-mute"
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? `Unmute ${film.title}` : `Mute ${film.title}`}
              title={isMuted ? 'Enable sound' : 'Mute film'}
            >
              {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          className="stories-motion-progress"
          role="progressbar"
          aria-label={`${film.title} playback progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </div>
  );
};

interface MoreStoriesCardProps {
  onOpenFilms: () => void;
}

const MoreStoriesCard: React.FC<MoreStoriesCardProps> = ({ onOpenFilms }) => (
  <button
    className="stories-motion-card stories-motion-card-compact stories-motion-more-card"
    type="button"
    onClick={onOpenFilms}
    aria-label="Explore more wedding films"
  >
    <img
      className="stories-motion-poster"
      src={withSiteBase('/images/albin&thara/F.jpg')}
      alt=""
      loading="lazy"
      decoding="async"
    />
    <span className="stories-motion-shade" aria-hidden="true" />
    <span className="stories-motion-overlay">
      <span className="stories-motion-card-meta">
        <span className="stories-motion-film-identity">
          <span className="stories-motion-film-number">03</span>
          <span className="stories-motion-film-divider" aria-hidden="true" />
          <span className="stories-motion-film-copy">
            <span className="stories-motion-film-title">MORE STORIES</span>
            <span className="stories-motion-film-caption">REAL WEDDINGS. REAL EMOTIONS.</span>
          </span>
        </span>
        <span className="stories-motion-explore">
          EXPLORE FILMS <ArrowUpRight aria-hidden="true" />
        </span>
      </span>
      <span className="stories-motion-progress stories-motion-static-progress" aria-hidden="true">
        <span />
      </span>
    </span>
  </button>
);

export const PhotographyAndFilmsSection: React.FC<PhotographyAndFilmsSectionProps> = ({
  onOpenFilms,
}) => {
  const [featuredFilm, secondFilm] = FEATURED_FILMS;

  return (
    <section
      id="craft"
      data-theme="light"
      className="stories-motion-section"
      aria-labelledby="stories-motion-heading"
    >
      <div className="stories-motion-inner">
        <header className="stories-motion-header">
          <div className="stories-motion-eyebrow">
            <span>SECTION 05 — CINEMATIC FILMS</span>
            <span className="stories-motion-rule" aria-hidden="true" />
          </div>
          <h2 id="stories-motion-heading">Stories in Motion</h2>
        </header>

        <div className="stories-motion-gallery">
          {featuredFilm?.youtubeId && <FilmPlayer film={featuredFilm} />}
          <div className="stories-motion-secondary-grid">
            {secondFilm?.youtubeId && <FilmPlayer film={secondFilm} compact />}
            <MoreStoriesCard onOpenFilms={onOpenFilms} />
          </div>
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
