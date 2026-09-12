export interface HeroSlide {
  id: string;
  image: string;
  headline: string;
  subheadline: string;
  location?: string;
  tagline?: string;
  quote?: string;
  alt: string;
  objectPosition?: string;
}

export interface WeddingStory {
  id: string;
  title: string;
  couple: string;
  location: string;
  year: string;
  category: string;
  tagline: string;
  coverImage: string;
  coverAspect?: 'vertical' | 'horizontal' | 'wide' | 'portrait' | 'square' | 'tall';
  gallery: {
    url: string;
    caption: string;
    orientation: 'portrait' | 'landscape' | 'square';
  }[];
  filmFrame?: string;
  description: string;
  rituals: string[];
  clientQuote?: {
    text: string;
    author: string;
  };
}

export interface FilmReel {
  id: string;
  title: string;
  subtitle?: string;
  location: string;
  duration: string;
  thumbnail: string;
  teaserVideoUrl?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  synopsis: string;
  quote: string;
}

export interface ExperienceStage {
  number: string;
  title: string;
  summary: string;
  detail: string;
}

export interface SpecializationPhoto {
  id: string;
  image: string;
  title: string;
  tag: string;
  caption: string;
  alt: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  role: 'center' | 'top-right' | 'mid-left' | 'bottom-left' | 'bottom-right';
  disciplineNumber?: string;
  disciplineCategory?: string;
  craftNote?: string;
  aestheticKeywords?: string[];
  location?: string;
}
