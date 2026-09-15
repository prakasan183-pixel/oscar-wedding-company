import React from 'react';
import { X, MapPin, Calendar, ArrowRight, Quote } from 'lucide-react';
import { WeddingStory } from '../types';
import { LazyImage } from './LazyImage';

interface StoryModalProps {
  story: WeddingStory | null;
  onClose: () => void;
  onSelectStory: (story: WeddingStory) => void;
  allStories: WeddingStory[];
  onOpenEnquiry: () => void;
}

const PriyaEditorialStory: React.FC<{
  story: WeddingStory;
  nextStory: WeddingStory;
  onClose: () => void;
  onSelectStory: (story: WeddingStory) => void;
  onOpenEnquiry: () => void;
}> = ({ story, nextStory, onClose, onSelectStory, onOpenEnquiry }) => (
  <div id="story-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-[#F8F8F6] text-[#292522]">
    <div className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-10 py-4 bg-[#F8F8F6]/90 backdrop-blur-md border-b border-[#E7E2DC]">
      <span className="font-story-sans text-[9px] tracking-[0.28em] uppercase text-[#7E6A62]">Oscar Weddings / Story 01</span>
      <button id="close-story-modal" onClick={onClose} aria-label="Close story" className="p-1 text-[#756A60] hover:text-[#292522] focus:outline-none"><X className="w-4 h-4" /></button>
    </div>

    <main>
      <section className="relative bg-[#F0EEEA] px-5 sm:px-10 md:px-16 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.45fr_0.75fr] gap-8 lg:gap-14 items-center">
          <div className="aspect-[4/3] overflow-hidden">
            <LazyImage src={story.coverImage} alt={`${story.title} wedding photography by Oscar Weddings`} width={1500} height={1125} priority containerClassName="w-full h-full" className="w-full h-full object-cover" />
          </div>
          <div className="px-2 sm:px-6 lg:px-0 py-4">
            <span className="font-story-sans text-[9px] tracking-[0.3em] uppercase text-[#8A5A60]">Kochi · 2024</span>
            <h1 className="mt-5 font-story-serif text-6xl sm:text-8xl font-light leading-[0.78] tracking-[-0.03em] normal-case">Priya<br />&amp; Aditya</h1>
            <p className="mt-8 max-w-xs font-story-serif text-xl sm:text-2xl italic leading-relaxed text-[#756A60] normal-case">A night of music, movement and modern Indian celebration.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 sm:px-10 py-16 sm:py-24 text-center">
        <p className="mx-auto max-w-3xl font-story-serif text-2xl sm:text-4xl leading-tight text-[#4D252D] normal-case">A celebration made of music, family, colour and the small moments between the grand ones.</p>
      </section>

      <section className="bg-[#F8F8F6] px-5 sm:px-10 md:px-16 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
          {story.gallery.map((image, index) => (
            <figure key={image.url} className={`${index === 0 ? 'md:col-span-7' : index === 1 ? 'md:col-span-5 md:mt-24' : index === 2 ? 'md:col-span-5 md:col-start-2 md:mt-8' : 'md:col-span-5 md:col-start-8 md:mt-[-2rem]'}`}>
              <div className={`${index === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'} overflow-hidden`}>
                <LazyImage src={image.url} alt={image.caption} width={1000} height={index === 0 ? 750 : 1200} containerClassName="w-full h-full" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-1000" />
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-[#5C202D] text-[#FFF9F5] px-6 sm:px-10 py-20 sm:py-28 text-center">
        {story.clientQuote && <>
          <p className="mx-auto max-w-3xl font-story-serif text-3xl sm:text-5xl italic leading-tight normal-case">“{story.clientQuote.text}”</p>
          <span className="block mt-7 font-story-sans text-[9px] tracking-[0.28em] uppercase text-[#E7C8C9]">{story.clientQuote.author}</span>
        </>}
      </section>

      <section className="bg-white px-6 sm:px-10 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-[#E2DCD5] pt-6">
          <span className="font-story-sans text-[9px] tracking-[0.24em] uppercase text-[#8A5A60]">Priya &amp; Aditya · Kochi</span>
          <div className="flex items-center gap-6">
            <button id="story-modal-enquire-btn" onClick={() => { onClose(); onOpenEnquiry(); }} className="font-story-sans text-[9px] tracking-[0.22em] uppercase border-b border-[#8A5A60] pb-1 text-[#4D252D]">Check availability</button>
            <button onClick={() => onSelectStory(nextStory)} className="inline-flex items-center gap-2 font-story-sans text-[9px] tracking-[0.22em] uppercase text-[#756A60]">Next story <ArrowRight className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  onSelectStory,
  allStories,
  onOpenEnquiry,
}) => {
  if (!story) return null;

  const nextStoryIndex = allStories.findIndex((s) => s.id === story.id);
  const nextStory = allStories[(nextStoryIndex + 1) % allStories.length];

  return (
    <div
      id="story-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-white text-[#211E1B]"
    >
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E8E3DC] bg-white px-5 py-4 sm:px-10">
        <span className="text-[9px] tracking-[0.28em] uppercase text-[#81786F]">
          Oscar Weddings / Selected Story
        </span>
        <button
          id="close-story-modal"
          onClick={onClose}
          aria-label="Close story"
          className="inline-flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase text-[#81786F] transition-colors hover:text-[#211E1B]"
        >
          <span className="hidden sm:inline">Close</span>
          <X className="h-4 w-4" />
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16 sm:px-10 sm:pb-24 md:px-14">
        <section className="grid items-start gap-8 border-b border-[#E8E3DC] py-10 sm:py-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="aspect-[4/3] overflow-hidden bg-[#F1EEE9]">
            <LazyImage
              src={story.coverImage}
              alt={`${story.title} wedding photography by Oscar Weddings`}
              width={1500}
              height={1125}
              priority
              containerClassName="w-full h-full"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="pb-1 lg:pt-8">
            <p className="text-[9px] tracking-[0.26em] uppercase text-[#81786F]">
              {story.location} / {story.year}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-light leading-[1.05] normal-case tracking-normal text-[#211E1B] sm:text-6xl">
              {story.title}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#625A52]">
              {story.tagline}
            </p>
          </div>
        </section>

        <section className="grid gap-10 border-b border-[#E8E3DC] py-12 sm:py-16 md:grid-cols-[1.4fr_0.6fr] md:gap-20">
          <div>
            <p className="max-w-2xl text-base leading-[1.8] text-[#403A35] sm:text-lg">
              {story.description}
            </p>
            {story.clientQuote && (
              <blockquote className="mt-10 max-w-2xl border-l border-[#B49B7C] pl-5 font-serif text-xl italic leading-relaxed text-[#514840] sm:text-2xl">
                &ldquo;{story.clientQuote.text}&rdquo;
                <cite className="mt-4 block font-sans text-[9px] not-italic tracking-[0.22em] uppercase text-[#81786F]">
                  {story.clientQuote.author}
                </cite>
              </blockquote>
            )}
          </div>

          <div>
            <h2 className="text-[9px] tracking-[0.26em] uppercase text-[#81786F]">
              Ceremony &amp; Rituals
            </h2>
            <ul className="mt-4 space-y-3 border-t border-[#E8E3DC] pt-4">
              {story.rituals.map((ritual) => (
                <li key={ritual} className="text-sm leading-relaxed text-[#514A43]">
                  {ritual}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mb-8 flex items-end justify-between border-b border-[#E8E3DC] pb-4">
            <h2 className="font-serif text-2xl font-light normal-case tracking-normal text-[#211E1B] sm:text-3xl">
              A few moments
            </h2>
            <span className="text-[9px] tracking-[0.22em] uppercase text-[#81786F]">
              {story.gallery.length} frames
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {story.gallery.map((image, index) => (
              <figure key={`${image.url}-${index}`} className={index === 0 ? 'md:col-span-2' : ''}>
                <div className={`${index === 0 ? 'aspect-[16/9]' : image.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-[4/3]'} overflow-hidden bg-[#F1EEE9]`}>
                  <LazyImage
                    src={image.url}
                    alt={`${image.caption} - ${story.title}`}
                    width={image.orientation === 'portrait' ? 800 : 1200}
                    height={image.orientation === 'portrait' ? 1000 : 800}
                    containerClassName="w-full h-full"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-3 text-xs leading-relaxed text-[#81786F]">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-6 border-t border-[#E8E3DC] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-[9px] tracking-[0.24em] uppercase text-[#81786F]">Next story</span>
            <p className="mt-1 font-serif text-xl normal-case tracking-normal text-[#211E1B]">{nextStory.title}</p>
          </div>
          <div className="flex items-center gap-6">
            <button
              id="story-modal-enquire-btn"
              onClick={() => { onClose(); onOpenEnquiry(); }}
              className="border-b border-[#81786F] pb-1 text-[9px] tracking-[0.2em] uppercase text-[#514A43]"
            >
              Check availability
            </button>
            <button
              onClick={() => onSelectStory(nextStory)}
              className="inline-flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-[#514A43]"
            >
              Next story <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );

  if (story.id === 'bhagya-prabhu') {
    const collageImages = [
      story.gallery[3],
      story.gallery[0],
      story.gallery[1],
      story.gallery[2],
      {
        url: '/images/hero-4-thaali.jpg',
        caption: 'A quiet detail from the ceremony',
        orientation: 'landscape' as const,
      },
    ];

    return (
      <div
        id="story-modal-overlay"
        className="fixed inset-0 z-50 overflow-y-auto bg-[#F8F7F4] text-[#27231F]"
      >
        <div className="sticky top-0 z-20 flex justify-end px-5 sm:px-8 py-5 bg-[#F8F7F4]/90 backdrop-blur-sm">
          <button
            id="close-story-modal"
            onClick={onClose}
            aria-label="Close story"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-[#6D665F] hover:text-[#27231F] transition-colors focus:outline-none"
          >
            <span className="hidden sm:inline">Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        <main className="max-w-[1040px] mx-auto px-5 sm:px-10 md:px-16 pb-16 sm:pb-24">
          <header className="text-center pt-1 sm:pt-5 pb-12 sm:pb-20">
            <span className="block text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-[#8B8176]">
              Specialised in
            </span>
            <h1 className="mt-2 text-lg sm:text-xl md:text-2xl font-serif font-normal leading-tight tracking-[0.04em] normal-case text-[#37312B]">
              South Asian Fusion &amp;<br className="sm:hidden" /> Destination Weddings
            </h1>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-5 md:gap-7 items-start">
            <figure className="col-span-1 sm:col-span-3 sm:mt-16">
              <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DE]">
                <LazyImage
                  src={collageImages[0].url}
                  alt={collageImages[0].caption}
                  width={800}
                  height={600}
                  priority={true}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-1000"
                />
              </div>
            </figure>

            <figure className="col-span-1 sm:col-span-5 sm:col-start-4 sm:mt-8">
              <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DE]">
                <LazyImage
                  src={collageImages[1].url}
                  alt={collageImages[1].caption}
                  width={1000}
                  height={750}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-1000"
                />
              </div>
            </figure>

            <figure className="col-span-1 sm:col-span-4 sm:col-start-9 sm:mt-0">
              <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DE]">
                <LazyImage
                  src={collageImages[2].url}
                  alt={collageImages[2].caption}
                  width={900}
                  height={675}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-1000"
                />
              </div>
            </figure>

            <figure className="col-span-1 sm:col-span-4 sm:col-start-3 sm:mt-[-1.5rem] md:mt-[-2rem]">
              <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DE]">
                <LazyImage
                  src={collageImages[3].url}
                  alt={collageImages[3].caption}
                  width={900}
                  height={675}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-1000"
                />
              </div>
            </figure>

            <figure className="col-span-1 sm:col-span-4 sm:col-start-9 sm:mt-[-1rem] md:mt-[-1.5rem]">
              <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DE]">
                <LazyImage
                  src={collageImages[4].url}
                  alt={`${story.title} ceremony portrait`}
                  width={900}
                  height={675}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-1000"
                />
              </div>
            </figure>
          </div>

          <div className="max-w-md mx-auto text-center mt-12 sm:mt-20">
            <p className="text-sm sm:text-base leading-6 font-serif italic text-[#5F574F] normal-case">
              A sunlit Haldi celebration, held close to family and the gardens of Kumarakom.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 sm:mt-16 pt-5 border-t border-[#DCD6CE]">
            <div className="text-center sm:text-left">
              <span className="block text-[9px] tracking-[0.24em] uppercase text-[#8B8176]">Bhagya &amp; Prabhu</span>
              <span className="block mt-1 text-xs text-[#6D665F]">Kumarakom · 2025</span>
            </div>
            <div className="flex items-center gap-5">
              <button
                id="story-modal-enquire-btn"
                onClick={() => {
                  onClose();
                  onOpenEnquiry();
                }}
                className="text-[9px] tracking-[0.22em] uppercase text-[#37312B] border-b border-[#9B8061] pb-1 hover:text-[#9B8061] transition-colors"
              >
                Check availability
              </button>
              <button
                onClick={() => onSelectStory(nextStory)}
                className="inline-flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase text-[#6D665F] hover:text-[#27231F] transition-colors"
              >
                Next story <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      id="story-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0A0A0A]/95 backdrop-blur-lg text-[#FAF8F5] transition-all"
    >
      {/* Sticky top control */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-5 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-[#211F1D]">
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C8479]">
            EDITORIAL ARCHIVE
          </span>
          <span className="text-[#3A3632]">/</span>
          <span className="text-xs tracking-[0.15em] text-[#E6E1D8] uppercase font-light">
            {story.couple}
          </span>
        </div>
        <button
          id="close-story-modal"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 text-xs tracking-[0.2em] uppercase text-[#B4ACA1] hover:text-[#FAF8F5] transition-colors focus:outline-none"
        >
          <span>CLOSE</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Story Container */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20 space-y-16 md:space-y-24">
        {/* Editorial Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 text-xs tracking-[0.25em] text-[#8C8479] uppercase">
            <span>{story.location}</span>
            <span>•</span>
            <span>{story.year}</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-[#FAF8F5] leading-tight">
            {story.title}
          </h2>

          <p className="text-sm md:text-base text-[#B4ACA1] font-light leading-relaxed max-w-2xl mx-auto">
            {story.tagline}
          </p>

          <div className="pt-2">
            <span className="inline-block px-3.5 py-1 text-[10px] tracking-[0.2em] uppercase border border-[#2B2824] text-[#8C8479]">
              {story.category}
            </span>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative overflow-hidden w-full max-h-[80vh] border border-[#211F1D]">
          <LazyImage
            src={story.coverImage}
            alt={`${story.title} — ${story.category} wedding photography in ${story.location} by Oscar Weddings`}
            width={1200}
            height={800}
            priority={true}
            containerClassName="w-full h-full max-h-[75vh]"
            className="w-full h-full object-cover object-center max-h-[75vh]"
          />
        </div>

        {/* Narrative & Rituals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-4 border-t border-[#211F1D]">
          <div className="md:col-span-8 space-y-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#8C8479]">
              THE STORY &amp; PERSPECTIVE
            </h3>
            <p className="text-base md:text-lg text-[#E6E1D8] font-light leading-relaxed">
              {story.description}
            </p>

            {story.clientQuote && (
              <div className="p-8 bg-[#141312] border-l-2 border-[#8C8479] mt-8 space-y-3">
                <Quote className="w-5 h-5 text-[#8C8479]" />
                <p className="font-serif italic text-lg md:text-xl text-[#FAF8F5] leading-relaxed">
                  "{story.clientQuote.text}"
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8C8479]">
                  — {story.clientQuote.author}
                </p>
              </div>
            )}
          </div>

          <div className="md:col-span-4 space-y-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#8C8479]">
              CEREMONY &amp; RITUALS
            </h3>
            <ul className="space-y-3">
              {story.rituals.map((ritual, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#B4ACA1]">
                  <span className="text-[#8C8479] font-serif">—</span>
                  <span>{ritual}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-[#211F1D]">
              <button
                id="story-modal-enquire-btn"
                onClick={() => {
                  onClose();
                  onOpenEnquiry();
                }}
                className="w-full py-3.5 bg-[#FAF8F5] text-[#0A0A0A] text-xs uppercase tracking-[0.2em] hover:bg-[#E6E1D8] transition-colors"
              >
                CHECK AVAILABILITY →
              </button>
            </div>
          </div>
        </div>

        {/* Curation Gallery */}
        <div className="space-y-12">
          <div className="text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C8479]">
              MOMENTS OBSERVED
            </span>
            <h3 className="text-2xl md:text-3xl font-serif text-[#FAF8F5] mt-1 font-light">
              Selected Frames &amp; Atmospheric Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {story.gallery.map((img, index) => (
              <div
                key={index}
                className={`space-y-3 ${
                  img.orientation === 'landscape' && index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="overflow-hidden border border-[#211F1D] bg-[#141312]">
                  <LazyImage
                    src={img.url}
                    alt={`${img.caption} — ${story.title} by Oscar Weddings`}
                    width={img.orientation === 'landscape' ? 1200 : 800}
                    height={img.orientation === 'landscape' ? 800 : 1000}
                    containerClassName="w-full h-auto"
                    className="w-full h-auto max-h-[600px] object-cover hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <p className="text-xs text-[#8C8479] tracking-wider italic font-serif">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Next Story Switcher */}
        <div className="pt-16 border-t border-[#211F1D] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C8479]">
              NEXT CELEBRATION
            </span>
            <h4 className="text-xl font-serif text-[#FAF8F5] mt-1">
              {nextStory.title} — {nextStory.location}
            </h4>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectStory(nextStory)}
              className="px-6 py-3 border border-[#2B2824] text-xs uppercase tracking-[0.2em] text-[#FAF8F5] hover:border-[#FAF8F5] transition-colors inline-flex items-center gap-2"
            >
              <span>VIEW NEXT STORY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#FAF8F5] text-[#0A0A0A] text-xs uppercase tracking-[0.2em] hover:bg-[#E6E1D8] transition-colors"
            >
              CLOSE STORY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
