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
