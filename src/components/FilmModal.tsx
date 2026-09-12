import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { FEATURED_FILMS } from '../data/weddingContent';
import { FilmReel } from '../types';
import { LazyImage } from './LazyImage';

interface FilmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: () => void;
}

export const FilmModal: React.FC<FilmModalProps> = ({
  isOpen,
  onClose,
  onOpenEnquiry,
}) => {
  const [selectedFilm, setSelectedFilm] = useState<FilmReel>(FEATURED_FILMS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      id="film-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#0A0A0A]/95 backdrop-blur-xl text-[#FAF8F5]"
      onClick={onClose}
    >
      <div className="min-h-full flex items-center justify-center p-3 xs:p-4 sm:p-8 py-6 sm:py-12">
        <div
          id="film-modal-container"
          className="relative w-full max-w-5xl bg-[#0F0E0D] border border-[#262422] rounded-xl sm:rounded-2xl p-4 xs:p-6 sm:p-10 shadow-2xl space-y-6 sm:space-y-8 text-[#FAF8F5] my-auto"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#211F1D] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C8479]">
                OSCAR CINEMA ARCHIVE
              </span>
              {selectedFilm.youtubeId && (
                <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 bg-[#1C1814] border border-[#3A2E1F] text-[#D8B48A] rounded-[2px] flex items-center gap-1 font-mono">
                  <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
                  <span>4K WEDDING FILM</span>
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#FAF8F5]">
              {selectedFilm.title}
            </h2>
            {selectedFilm.subtitle && (
              <p className="text-xs text-[#B4ACA1] font-light">
                {selectedFilm.subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {selectedFilm.youtubeUrl && (
              <a
                href={selectedFilm.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-[2px] bg-[#141312] border border-[#2B2824] hover:border-[#8C8479] text-[#FAF8F5] hover:text-[#C5A880] transition-colors"
              >
                <span>OPEN ON YOUTUBE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 text-[#B4ACA1] hover:text-[#FAF8F5] transition-colors"
              aria-label="Close film modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cinematic Video Player Container */}
        <div className="relative aspect-video w-full bg-black overflow-hidden border border-[#211F1D]">
          {selectedFilm.youtubeId ? (
            <iframe
              key={selectedFilm.id}
              src={`https://www.youtube-nocookie.com/embed/${selectedFilm.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={`${selectedFilm.title} — Cinematic Wedding Highlight Film by Oscar Weddings`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : selectedFilm.teaserVideoUrl ? (
            <>
              <video
                key={selectedFilm.id}
                src={selectedFilm.teaserVideoUrl}
                poster={selectedFilm.thumbnail}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Player Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Video Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#FAF8F5] hover:bg-white/20 transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-xs text-[#E6E1D8] tracking-widest font-mono">
                    {selectedFilm.duration} • 4K DCI
                  </span>
                </div>

                <span className="text-xs tracking-[0.2em] uppercase text-[#8C8479]">
                  {selectedFilm.location}
                </span>
              </div>
            </>
          ) : (
            <LazyImage
              src={selectedFilm.thumbnail}
              alt={`${selectedFilm.title} — 4K Cinematic Wedding Highlight Film by Oscar Weddings`}
              width={1280}
              height={720}
              priority={true}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Film Description & Selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
          <div className="md:col-span-7 space-y-4">
            <p className="text-sm text-[#E6E1D8] font-light leading-relaxed">
              {selectedFilm.synopsis}
            </p>
            <p className="font-serif italic text-base text-[#C5A880]">
              "{selectedFilm.quote}"
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between space-y-4 border-t md:border-t-0 md:border-l border-[#211F1D] md:pl-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C8479]">
                SELECT FILM REEL
              </span>
              <div className="space-y-2">
                {FEATURED_FILMS.map((film) => (
                  <button
                    key={film.id}
                    onClick={() => setSelectedFilm(film)}
                    className={`w-full text-left p-3 text-xs transition-colors flex flex-col gap-0.5 border ${
                      selectedFilm.id === film.id
                        ? 'border-[#C5A880] bg-[#1A1816] text-[#FAF8F5]'
                        : 'border-[#262422] text-[#8C8479] hover:text-[#FAF8F5] hover:border-[#38342F]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium tracking-wide">{film.title}</span>
                      <span className="text-[10px] tracking-widest opacity-70 font-mono">
                        {film.duration}
                      </span>
                    </div>
                    {film.subtitle && (
                      <span className="text-[10px] text-[#8C8479] truncate">
                        {film.subtitle}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="film-inquire-btn"
              onClick={() => {
                onClose();
                onOpenEnquiry();
              }}
              className="w-full py-3 bg-[#FAF8F5] text-[#0A0A0A] text-xs uppercase tracking-[0.2em] hover:bg-[#E6E1D8] transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>COMMISSION A CINEMATIC FILM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
