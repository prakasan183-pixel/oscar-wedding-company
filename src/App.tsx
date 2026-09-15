import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { SelectedStoriesSection } from './components/SelectedStoriesSection';
import { KeralaSection } from './components/KeralaSection';
import { SpotlightParallaxSection } from './components/SpotlightParallaxSection';
import { PhotographyAndFilmsSection } from './components/PhotographyAndFilmsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SpecializationSection } from './components/SpecializationSection';
import { FinalEnquirySection } from './components/FinalEnquirySection';
import { Footer } from './components/Footer';
import { StoryModal } from './components/StoryModal';
import { FilmModal } from './components/FilmModal';
import { EnquiryModal } from './components/EnquiryModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { CustomCursor } from './components/CustomCursor';
import { SEOHead } from './components/SEOHead';
import { WeddingStory } from './types';
import { STORIES_DATA, FEATURED_HALDI_STORY } from './data/weddingContent';

export default function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<WeddingStory | null>(null);
  const [isFilmModalOpen, setIsFilmModalOpen] = useState(false);

  // Sync initial URL params (?story=xyz or ?film=xyz)
  useEffect(() => {
    const allStories = [FEATURED_HALDI_STORY, ...STORIES_DATA];
    const params = new URLSearchParams(window.location.search);
    const storyParam = params.get('story');
    const filmParam = params.get('film');

    if (storyParam) {
      const match = allStories.find((s) => s.id === storyParam);
      if (match) setSelectedStory(match);
    } else if (filmParam) {
      setIsFilmModalOpen(true);
    }

    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      const sId = p.get('story');
      const f = p.get('film');
      if (sId) {
        const match = allStories.find((s) => s.id === sId);
        setSelectedStory(match || null);
      } else {
        setSelectedStory(null);
      }
      setIsFilmModalOpen(!!f);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenEnquiry = () => {
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  const handleOpenStory = (story: WeddingStory) => {
    setSelectedStory(story);
    const newUrl = `?story=${story.id}${window.location.hash}`;
    window.history.pushState({ storyId: story.id }, '', newUrl);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.pushState({}, '', cleanUrl || '/');
  };

  const handleOpenFilms = () => {
    setIsFilmModalOpen(true);
    const newUrl = `?film=jibin-lizbeth${window.location.hash}`;
    window.history.pushState({ film: 'jibin-lizbeth' }, '', newUrl);
  };

  const handleCloseFilms = () => {
    setIsFilmModalOpen(false);
    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.pushState({}, '', cleanUrl || '/');
  };

  const handleExplorePhotography = () => {
    // Smooth scroll to Selected Stories
    const storiesEl = document.getElementById('stories');
    if (storiesEl) {
      storiesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#FAF8F5] selection:bg-[#EAE6DF] selection:text-[#0A0A0A]">
      {/* Dynamic SEO & Social Sharing Metadata Management */}
      <SEOHead
        selectedStory={selectedStory}
        isFilmModalOpen={isFilmModalOpen}
        isEnquiryOpen={isEnquiryOpen}
      />

      {/* Minimalist Interactive Circular Cursor */}
      <CustomCursor />

      {/* Main Page Container with Smooth Fluid Entry */}
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full overflow-x-hidden min-h-screen"
      >
        {/* Editorial Navigation */}
        <Navbar onOpenEnquiry={handleOpenEnquiry} />

        {/* Main 7 Sections Flow */}
        <main className="relative z-10">
          {/* SECTION 01 — HERO */}
          <HeroSection
            onOpenEnquiry={handleOpenEnquiry}
          />

          {/* SECTION 02 — PHILOSOPHY */}
          <PhilosophySection />

          {/* SECTION 03 — SELECTED STORIES */}
          <SelectedStoriesSection onOpenStory={handleOpenStory} />

          {/* SECTION 04 — KERALA (SENSE OF PLACE & IDENTITY) */}
          <KeralaSection />

          {/* SPECIALIZATION & DESTINATION ARCHIVE (Placed immediately after SENSE OF PLACE & IDENTITY) */}
          <SpecializationSection onOpenEnquiry={handleOpenEnquiry} />

          {/* SECTION 04B — CEREMONY SPOTLIGHT STAY-BACK PARALLAX (BHAGYA & PRABHU HALDI) */}
          <SpotlightParallaxSection onOpenStory={handleOpenStory} />

          {/* SECTION 05 — PHOTOGRAPHY & FILMS */}
          <PhotographyAndFilmsSection
            onOpenFilms={handleOpenFilms}
            onExplorePhotography={handleExplorePhotography}
          />

          {/* SECTION 06 — THE OSCAR EXPERIENCE */}
          <ExperienceSection />

          {/* SECTION 07 — FINAL ENQUIRY */}
          <FinalEnquirySection onOpenEnquiry={handleOpenEnquiry} />
        </main>

        {/* Minimal Editorial Footer */}
        <Footer />

        {/* Sticky Mobile Bar */}
        <StickyMobileBar onOpenEnquiry={handleOpenEnquiry} />
      </motion.div>

      {/* Interactive Modals */}
      <StoryModal
        story={selectedStory}
        onClose={handleCloseStory}
        onSelectStory={setSelectedStory}
        allStories={STORIES_DATA}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <FilmModal
        isOpen={isFilmModalOpen}
        onClose={handleCloseFilms}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
      />
    </div>
  );
}

