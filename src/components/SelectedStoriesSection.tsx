import React from 'react';
import { ArrowRight } from 'lucide-react';
import { STORIES_DATA } from '../data/weddingContent';
import { WeddingStory } from '../types';
import { LazyImage } from './LazyImage';
import { ScrollReveal } from './ScrollReveal';

interface SelectedStoriesSectionProps {
  onOpenStory: (story: WeddingStory) => void;
}

type ArchiveCardLayout = 'portrait' | 'landscape';

interface ArchiveCardProps {
  story: WeddingStory;
  layout: ArchiveCardLayout;
  delay: number;
  onOpenStory: (story: WeddingStory) => void;
}

const getStory = (id: string): WeddingStory => {
  const story = STORIES_DATA.find((item) => item.id === id);

  if (!story) {
    throw new Error(`Wedding archive story "${id}" was not found.`);
  }

  return story;
};

const getCardImage = (story: WeddingStory, layout: ArchiveCardLayout): string => {
  if (layout === 'portrait') return story.coverImage;

  const landscapeImage = story.gallery.find((image) => image.orientation === 'landscape');

  if (!landscapeImage) {
    throw new Error(`Wedding archive story "${story.id}" has no landscape image.`);
  }

  if (story.id === 'deva') {
    return '/images/Deva/thumb-HD  (4).jpg.jpg';
  }

  const separatorIndex = landscapeImage.url.lastIndexOf('/');
  return `${landscapeImage.url.slice(0, separatorIndex + 1)}thumb-${landscapeImage.url.slice(separatorIndex + 1)}.jpg`;
};

const archiveColumns: { story: WeddingStory; layout: ArchiveCardLayout }[][] = [
  [{ story: getStory('albin-thara'), layout: 'portrait' }],
  [
    { story: getStory('aleena-nithin'), layout: 'landscape' },
    { story: getStory('deva'), layout: 'landscape' },
  ],
  [{ story: getStory('vivek-sreelakshmi'), layout: 'portrait' }],
  [
    { story: getStory('lizbeth-jibin'), layout: 'landscape' },
    { story: getStory('jesica'), layout: 'landscape' },
  ],
];

const ArchiveCard: React.FC<ArchiveCardProps> = ({
  story,
  layout,
  delay,
  onOpenStory,
}) => {
  const isPortrait = layout === 'portrait';

  return (
    <ScrollReveal delay={delay} y={10} duration={0.55} amount={0.12}>
      <button
        type="button"
        onClick={() => onOpenStory(story)}
        className="group block w-full text-left"
        aria-label={`Open ${story.couple} wedding story`}
      >
        <div
          className={`overflow-hidden rounded-[2px] bg-[#EAE6DF] ${
            isPortrait ? 'aspect-[4/5] sm:aspect-[0.65/1]' : 'aspect-[1.8/1]'
          }`}
        >
          <LazyImage
            src={getCardImage(story, layout)}
            alt={`${story.couple} wedding story`}
            width={isPortrait ? 900 : 1200}
            height={isPortrait ? 1200 : 575}
            rootMargin="60px 0px"
            containerClassName="h-full w-full"
            className="block h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
            revealAnimation={false}
          />
        </div>

        <div className="px-1 pt-3.5 sm:px-2.5 sm:pt-4">
          <h3
            className="archive-couple-name font-cormorant font-normal leading-none text-[#171615] normal-case"
            style={{ textTransform: 'none' }}
          >
            {story.couple}
          </h3>

          <div className="mt-3.5 flex items-center gap-3">
            <span className="font-editorial-sans whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.25em] text-[#736B63] sm:text-[10px]">
              {story.location.split('·')[0].trim()}
            </span>
            <span className="h-px w-full max-w-[74px] bg-[#A9A197]" aria-hidden="true" />
          </div>
        </div>
      </button>
    </ScrollReveal>
  );
};

export const SelectedStoriesSection: React.FC<SelectedStoriesSectionProps> = ({
  onOpenStory,
}) => (
  <section
    id="stories"
    data-theme="light"
    className="relative border-t border-[#EAE6DF] bg-[#FAF8F5] px-4 py-12 text-[#171615] transition-colors sm:px-6 sm:py-14 lg:px-0 lg:py-14"
  >
    <div className="mx-auto w-full max-w-[1228px] sm:w-[90%] lg:w-[96%] lg:max-w-[1360px]">
      <header className="mb-7 flex items-center justify-between gap-6 sm:mb-8 lg:mb-8">
        <h2 className="font-editorial-sans text-[11px] font-medium tracking-[0.34em] text-[#3E3934] sm:text-[14px]">
          THE WEDDING ARCHIVE
        </h2>
        <a
          href="/portfolio"
          className="group inline-flex shrink-0 items-center gap-2.5 font-editorial-sans text-[9px] font-medium tracking-[0.2em] text-[#3E3934] transition-colors hover:text-[#8C8479] sm:text-[10px]"
        >
          <span>MORE STORIES</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </header>

      <div className="wedding-archive-grid grid gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:gap-x-6">
        {archiveColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-7 sm:gap-8 lg:gap-7 xl:gap-8">
            {column.map(({ story, layout }, storyIndex) => (
              <ArchiveCard
                key={story.id}
                story={story}
                layout={layout}
                delay={columnIndex * 0.06 + storyIndex * 0.08}
                onOpenStory={onOpenStory}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);
