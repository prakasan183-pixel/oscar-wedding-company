import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { STORIES_DATA } from '../data/weddingContent';
import { WeddingStory } from '../types';
import { LazyImage } from './LazyImage';

interface SelectedStoriesSectionProps {
  onOpenStory: (story: WeddingStory) => void;
}

export const SelectedStoriesSection: React.FC<SelectedStoriesSectionProps> = ({
  onOpenStory,
}) => {
  const selectedStories = useMemo(() => STORIES_DATA.slice(0, 6), []);

  const renderSelectedMosaic = () => (
    <div className="grid grid-cols-2 gap-2 md:gap-3 xl:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {selectedStories.map((story, index) => {
        const isTall = story.coverAspect === 'vertical' || story.coverAspect === 'portrait' || story.coverAspect === 'square';
        const heightClass = isTall ? 'lg:min-h-[420px] xl:min-h-[500px]' : 'lg:min-h-[300px] xl:min-h-[340px]';

        return (
          <button
            key={`${story.id}-${index}`}
            type="button"
            onClick={() => onOpenStory(story)}
            className={`group relative block aspect-[4/5] w-full overflow-hidden bg-[#EAE6DF] text-left lg:aspect-auto ${heightClass}`}
            aria-label={`Open ${story.couple} story`}
          >
            <LazyImage
              src={story.coverImage}
              alt={`${story.couple} wedding story`}
              width={900}
              height={isTall ? 1125 : 675}
              rootMargin="120px 0px"
              containerClassName="h-full w-full"
              className="block h-full w-full object-cover object-center transition-opacity duration-300 ease-out"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-10 text-[9px] uppercase tracking-[0.18em] text-white opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100">
              {story.couple}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <section
      id="stories"
      data-theme="light"
      className="relative bg-[#FAF9F6] text-[#141312] py-12 md:py-18 px-4 sm:px-6 lg:px-10 xl:px-12 border-t border-[#EAE6DF] transition-colors"
    >
      <div className="mx-auto max-w-[1280px] space-y-6 md:space-y-8">

        {/* Section Header */}
        <div className="text-center space-y-3.5 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <span
              className="text-[10px] sm:text-[11px] tracking-[0.38em] uppercase text-[#8C8479] font-medium block"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              SELECTED WORKS
            </span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-light text-[#141312] tracking-[0.16em] sm:tracking-[0.22em] uppercase leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            CURATED LUXURY WEDDING PORTFOLIO
          </h2>

          <p
            className="text-xs sm:text-sm text-[#736B63] font-light tracking-wide max-w-xl mx-auto pt-1 leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Moments observed with stillness, quiet elegance, and editorial permanence.
          </p>
        </div>

        {renderSelectedMosaic()}

        <div className="flex flex-col items-center gap-4 pt-5 text-center">
          <p className="max-w-[34ch] text-sm italic leading-relaxed text-[#736B63]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            A considered selection from celebrations photographed across India.
          </p>
          <a
            id="view-full-portfolio-btn"
            href="/portfolio"
            className="group inline-flex items-center gap-2.5 border border-[#141312] px-6 py-3 text-[10px] tracking-[0.3em] uppercase text-[#141312] font-medium transition-colors duration-500 hover:bg-[#141312] hover:text-[#FAF8F5]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
};