import React from 'react';
import { X, ArrowRight, MapPin, CalendarDays } from 'lucide-react';
import { WeddingStory } from '../types';
import { LazyImage } from './LazyImage';

interface StoryModalProps {
  story: WeddingStory | null;
  onClose: () => void;
  onSelectStory: (story: WeddingStory) => void;
  allStories: WeddingStory[];
  onOpenEnquiry: () => void;
}

const getAccentWord = (story: WeddingStory): string => {
  const category = story.category.toLowerCase();
  if (category.includes('haldi') || category.includes('romance')) return 'Romance';
  if (category.includes('sangeet') || category.includes('twirl')) return 'Reverie';
  if (category.includes('royal') || category.includes('heritage')) return 'Legacy';
  if (category.includes('vow') || category.includes('kasavu') || category.includes('temple')) return 'Vows';
  if (category.includes('baraat') || category.includes('celebration')) return 'Joy';
  return 'Forever';
};

const collageImages = [
  { url: '/images/mainpics/Hero1.web.jpg', caption: 'Soft light settling over the celebration', orientation: 'landscape' as const },
  { url: '/images/mainpics/Hero2.web.jpg', caption: 'A quiet pause between rituals', orientation: 'landscape' as const },
  { url: '/images/mainpics/Hero3.web.jpg', caption: 'Details held close', orientation: 'portrait' as const },
  { url: '/images/mainpics/Hero4.web.jpg', caption: 'An evening of gathered light', orientation: 'landscape' as const },
  { url: '/images/mainpics/Hero5.web.jpg', caption: 'The last dance of the night', orientation: 'portrait' as const },
  { url: '/images/mainpics/section2img.web.jpg', caption: 'A tender glance between celebrations', orientation: 'portrait' as const },
  { url: '/images/story-bridal-portrait.jpg', caption: 'The texture and warmth of the day', orientation: 'portrait' as const },
  { url: '/images/hero-2-laugh.jpg', caption: 'A quiet detail preserved in light', orientation: 'landscape' as const },
  { url: '/images/story-kasavu-bride.jpg', caption: 'The celebration gathering around them', orientation: 'portrait' as const },
];

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  onSelectStory,
  allStories,
  onOpenEnquiry,
}) => {
  if (!story) return null;

  const currentIndex = allStories.findIndex((s) => s.id === story.id);
  const nextStory = allStories[(currentIndex + 1) % allStories.length] || allStories[0];

  const [imgOne, imgTwo, imgThree, ...galleryImages] = story.gallery;
  const accentWord = getAccentWord(story);
  const additionalImages = [
    ...galleryImages,
    ...collageImages.filter((image) => !story.gallery.some((galleryImage) => galleryImage.url === image.url)),
  ].slice(0, 9);

  return (
    <div
      id="story-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#f7f5f1] text-[#241F1B]"
    >
      {/* Minimal close control */}
      <button
        id="close-story-modal"
        onClick={onClose}
        aria-label="Close story"
        className="fixed right-5 top-5 z-20 flex h-10 w-10 items-center justify-center border border-[#ded8cf] bg-[#f7f5f1]/90 text-[#8C8177] transition-colors hover:border-[#7A2420] hover:text-[#7A2420] focus:outline-none sm:right-8 sm:top-8"
      >
        <X className="h-4 w-4" />
      </button>

      <main className="mx-auto max-w-3xl px-6 pb-20 pt-16 sm:px-12 sm:pt-20">
        <header className="mb-8 flex items-end justify-between gap-6 border-b border-[#ded8cf] pb-5 sm:mb-10">
          <div>
            <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#9b9187]">An Oscar Weddings story</p>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl text-[#241F1B] sm:text-3xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.06em' }}>
                {story.couple}
              </h1>
              {nextStory && (
                <button
                  type="button"
                  onClick={() => onSelectStory(nextStory)}
                  aria-label={`Open next story: ${nextStory.couple}`}
                  title={`Next story: ${nextStory.couple}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#ded8cf] text-[#7A2420] transition-colors hover:border-[#7A2420] hover:bg-[#7A2420] hover:text-[#f7f5f1] focus:outline-none focus:ring-1 focus:ring-[#7A2420]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="hidden text-right text-[9px] uppercase leading-loose tracking-[0.2em] text-[#9b9187] sm:block">
            <p className="inline-flex items-center gap-2"><MapPin className="h-3 w-3" /> {story.location.split('·')[0].trim()}</p>
            <p className="flex items-center justify-end gap-2"><CalendarDays className="h-3 w-3" /> {story.year}</p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-1.5 bg-[#f7f5f1] sm:gap-2">
          {imgOne && (
            <figure className="aspect-square overflow-hidden bg-[#F1EEE9]">
              <LazyImage
                src={imgOne.url}
                alt={imgOne.caption}
                width={700}
                height={700}
                priority
                containerClassName="h-full w-full"
                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </figure>
          )}

          {imgTwo && (
            <figure className="aspect-square overflow-hidden bg-[#F1EEE9]">
              <LazyImage
                src={imgTwo.url}
                alt={imgTwo.caption}
                width={700}
                height={700}
                containerClassName="h-full w-full"
                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </figure>
          )}

          <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#7A2420] px-6">
            <span className="absolute left-4 top-4 text-[8px] uppercase tracking-[0.3em] text-[#e5cdb9]/70">{story.year}</span>
            <span
              className="whitespace-nowrap text-center text-[3.4rem] leading-none text-[#EFD9C4] sm:text-[4.6rem]"
              style={{ fontFamily: "'Ballet', 'Brush Script MT', cursive", letterSpacing: '0' }}
            >
              {accentWord}
            </span>
          </div>

          {imgThree && (
            <figure className="aspect-square overflow-hidden bg-[#F1EEE9]">
              <LazyImage
                src={imgThree.url}
                alt={imgThree.caption}
                width={700}
                height={700}
                containerClassName="h-full w-full"
                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </figure>
          )}
        </div>

        <div className="mt-7 flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.2em] text-[#9b9187] sm:hidden">
          <span>{story.location.split('·')[0].trim()}</span><span className="h-1 w-1 rounded-full bg-[#7A2420]" /><span>{story.year}</span>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-justify text-[10px] uppercase leading-[1.9] tracking-[0.08em] text-[#8C8177] sm:mt-12 sm:text-[11px]">
          {story.description} {story.tagline} Their celebration was shaped by soft pauses and bright, honest moments: a hand held a little longer, a laugh carried across the room, and the calm that arrived between one ritual and the next. These are the details that remain after the music fades, gathered here as a quiet record of a day made entirely their own.
        </p>

        {additionalImages.length > 0 && (
          <section className="mt-10 sm:mt-12" aria-label={`${story.couple} image collection`}>
            <div className="mb-4 flex items-center justify-between border-t border-[#ded8cf] pt-3">
              <span className="text-[8px] uppercase tracking-[0.3em] text-[#9b9187]">More moments</span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-[#b5afa6]">{additionalImages.length.toString().padStart(2, '0')} frames</span>
            </div>
            <div className="columns-2 gap-1.5 sm:columns-3 sm:gap-2">
              {additionalImages.map((image, index) => {
                const layout = image.orientation === 'portrait'
                  ? 'aspect-[4/5]'
                  : image.orientation === 'square'
                    ? 'aspect-square'
                    : 'aspect-[4/3]';
                return (
                <figure key={`${image.url}-${index}`} className={`${layout} mb-1.5 break-inside-avoid overflow-hidden bg-[#ebe6df] sm:mb-2`}>
                <LazyImage
                  src={image.url}
                  alt={image.caption}
                  width={600}
                  height={450}
                  containerClassName="h-full w-full"
                  rootMargin="80px 0px"
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                </figure>
                );
              })}
            </div>
          </section>
        )}

        <p className="mx-auto mt-10 max-w-2xl text-center text-[10px] uppercase leading-[1.8] tracking-[0.08em] text-[#8C8177] sm:mt-12 sm:text-[11px]">
          {story.description}
        </p>

        <div className="mx-auto mt-12 max-w-xl border-t border-[#ded8cf] pt-5 text-center sm:mt-16">
          <p className="text-center text-[9px] uppercase tracking-[0.26em] text-[#9b9187]">
            {story.category}
          </p>
          {story.clientQuote && <p className="mt-4 text-xl italic leading-tight text-[#7A2420] sm:text-2xl" style={{ fontFamily: "'Parisienne', 'Brush Script MT', cursive", letterSpacing: '0.01em' }}>“{story.clientQuote.text}”</p>}
          {story.clientQuote && <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-[#9b9187]">{story.clientQuote.author}</p>}
        </div>

        <p className="mt-16 text-center text-[10px] uppercase tracking-[0.35em] text-[#B5AFA6] sm:mt-20">
          Oscar Weddings
        </p>

        {/* -------------------------------------------------- */}
        {/* Minimal footer nav — availability + next story       */}
        {/* -------------------------------------------------- */}
        <div className="mt-10 flex flex-col items-center justify-center gap-5 border-t border-[#ded8cf] pt-7 sm:mt-12 sm:flex-row sm:gap-8">
          <button
            id="story-modal-enquire-btn"
            onClick={() => {
              onClose();
              onOpenEnquiry();
            }}
            className="border-b border-[#7A2420] pb-1 text-[10px] uppercase tracking-[0.25em] text-[#241F1B] transition-colors hover:text-[#7A2420]"
          >
            Check availability
          </button>
        </div>
      </main>
    </div>
  );
};