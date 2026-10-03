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
  const selectedStories = useMemo(() => STORIES_DATA, []);

  const renderSelectedMosaic = () => (
    <div className="columns-2 gap-2 md:columns-3 md:gap-3 xl:columns-4 xl:gap-4">
      {selectedStories.map((story) => {
        const isPortrait = story.coverAspect === 'vertical' || story.coverAspect === 'portrait';

        return (
        <button
          key={story.id}
          type="button"
          onClick={() => onOpenStory(story)}
          className="group mb-5 block w-full break-inside-avoid overflow-hidden bg-[#EAE6DF] text-left md:mb-6"
          aria-label={`Open ${story.couple} story`}
        >
          <div className={`${isPortrait ? 'aspect-[4/5]' : 'aspect-[4/3]'} overflow-hidden`}>
            <LazyImage
              src={story.coverImage}
              alt={`${story.couple} wedding story`}
              width={900}
              height={isPortrait ? 1125 : 675}
              rootMargin="120px 0px"
              containerClassName="h-full w-full"
              className="block h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
          <div className="border-x border-b border-[#EAE6DF] bg-[#FAF9F6] px-3 py-3 md:px-4 md:py-4">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-[#141312]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {story.couple}
            </p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#8C8479]">
              {story.location.split('·')[0].trim()}
            </p>
          </div>
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
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              OSCAR WEDDINGS · STORY ARCHIVE
            </span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-light text-[#141312] tracking-[0.16em] sm:tracking-[0.22em] uppercase leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            THE WEDDING ARCHIVE
          </h2>

          <p
            className="text-xs sm:text-sm text-[#736B63] font-light tracking-wide max-w-xl mx-auto pt-1 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Stories photographed with feeling, elegance, and permanence.
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
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
};