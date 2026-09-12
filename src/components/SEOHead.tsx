import React, { useEffect } from 'react';
import { WeddingStory } from '../types';

interface SEOHeadProps {
  selectedStory: WeddingStory | null;
  isFilmModalOpen: boolean;
  isEnquiryOpen: boolean;
}

const DEFAULT_TITLE = 'Oscar Wedding Company';
const DEFAULT_DESC =
  'Oscar Weddings is an acclaimed luxury wedding photography and cinematic films atelier rooted in Kerala, crafting timeless heirloom stills and 4K cinema across India and worldwide destinations.';
const BASE_URL = 'https://oscarweddings.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/og/og-main.jpg`;

export const SEOHead: React.FC<SEOHeadProps> = ({
  selectedStory,
  isFilmModalOpen,
  isEnquiryOpen,
}) => {
  useEffect(() => {
    let title = DEFAULT_TITLE;
    let description = DEFAULT_DESC;
    let ogImage = DEFAULT_IMAGE;
    let canonicalUrl = `${BASE_URL}/`;
    let dynamicSchema: object | null = null;

    if (selectedStory) {
      title = `${selectedStory.title} | Luxury Wedding Photography | Oscar Weddings`;
      description = `${selectedStory.tagline} Captured by Oscar Weddings in ${selectedStory.location}. Preserving generational traditions and candid elegance.`;
      ogImage = selectedStory.id === 'bhagya-prabhu'
        ? `${BASE_URL}/images/og/og-haldi.jpg`
        : `${BASE_URL}/images/og/og-stories.jpg`;
      canonicalUrl = `${BASE_URL}/?story=${selectedStory.id}`;

      dynamicSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${selectedStory.title} — ${selectedStory.category}`,
        description: selectedStory.description,
        image: selectedStory.coverImage.startsWith('http')
          ? selectedStory.coverImage
          : `${BASE_URL}${selectedStory.coverImage}`,
        author: {
          '@type': 'Organization',
          name: 'Oscar Weddings',
          url: BASE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Oscar Weddings',
          logo: {
            '@type': 'ImageObject',
            url: DEFAULT_IMAGE,
          },
        },
        mainEntityOfPage: canonicalUrl,
        keywords: [
          'wedding photography',
          'Kerala wedding photography',
          selectedStory.category,
          selectedStory.location,
          selectedStory.couple,
        ].join(', '),
      };
    } else if (isFilmModalOpen) {
      title = 'Jibin & Lizbeth Wedding Highlight | 4K Cinematic Film | Oscar Weddings';
      description =
        'Watch the cinematic Kerala Christian wedding highlight film for Jibin & Lizbeth by Oscar Weddings. 4K cinema optics, authentic soundscapes, and sacred vows.';
      ogImage = `${BASE_URL}/images/og/og-films.jpg`;
      canonicalUrl = `${BASE_URL}/?film=jibin-lizbeth`;

      dynamicSchema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'Jibin & Lizbeth | Kerala Christian Wedding | Cinematic Wedding Highlight',
        description:
          'Cinematic wedding highlight film by Oscar Weddings capturing Jibin & Lizbeth Kerala Christian wedding with 4K cinema optics, natural ambient soundscapes, and sacred vows.',
        thumbnailUrl: [
          'https://img.youtube.com/vi/Vr-WvoInbu4/maxresdefault.jpg',
          ogImage,
        ],
        uploadDate: '2024-01-01T00:00:00+05:30',
        duration: 'PT4M30S',
        contentUrl: 'https://youtu.be/Vr-WvoInbu4',
        embedUrl: 'https://www.youtube.com/embed/Vr-WvoInbu4',
      };
    } else if (isEnquiryOpen) {
      title = 'Commissions & Dates | Oscar Weddings Photography & Films';
      description =
        'Check date availability and commission Oscar Weddings for luxury weddings and celebrations in Kerala, across India, and worldwide destinations.';
      canonicalUrl = `${BASE_URL}/#enquiry`;
    }

    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set meta content
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [nameType, nameVal] = selector.replace(/[\[\]']/g, '').split('=');
        el.setAttribute(nameType, nameVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // 3. Update Standard Meta & Open Graph / Twitter
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:image:secure_url"]', 'content', ogImage);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);

    // 4. Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // 5. Injected Dynamic Schema
    let script = document.getElementById('dynamic-seo-ld') as HTMLScriptElement | null;
    if (dynamicSchema) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'dynamic-seo-ld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(dynamicSchema, null, 2);
    } else if (script) {
      script.remove();
    }
  }, [selectedStory, isFilmModalOpen, isEnquiryOpen]);

  return null;
};
