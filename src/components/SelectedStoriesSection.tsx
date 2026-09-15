// import React, { useState, useEffect, useMemo } from 'react';
// import { motion } from 'motion/react';
// import { ArrowRight, ChevronDown, ChevronUp, Eye } from 'lucide-react';
// import { STORIES_DATA } from '../data/weddingContent';
// import { WeddingStory } from '../types';
// import { LazyImage } from './LazyImage';

// interface SelectedStoriesSectionProps {
//   onOpenStory: (story: WeddingStory) => void;
// }

// // Numeric width/height ratio for each aspect keyword.
// // Used only to ESTIMATE relative card height for column-balancing —
// // the actual image still renders with its real CSS aspect class.
// const ASPECT_RATIO_VALUES: Record<string, number> = {
//   tall: 3 / 4,
//   vertical: 3 / 4,
//   portrait: 4 / 5,
//   square: 1,
//   wide: 16 / 10,
//   horizontal: 4 / 3,
// };

// const CAPTION_HEIGHT = 64; // approx height of the bottom text strip, in "units"

// function getAspectRatioValue(aspect?: string): number {
//   return ASPECT_RATIO_VALUES[aspect || 'horizontal'] ?? 4 / 3;
// }

// // Greedy column-balancing masonry: walk stories in order, always drop the
// // next one into whichever column currently has the least total height.
// // This is what actually eliminates blank space — CSS grid/columns can't
// // do this because they don't know real content height in advance.
// function distributeToColumns(
//   stories: WeddingStory[],
//   columnCount: number
// ): { story: WeddingStory; originalIndex: number }[][] {
//   const columns: { story: WeddingStory; originalIndex: number }[][] = Array.from(
//     { length: columnCount },
//     () => []
//   );
//   const heights = new Array(columnCount).fill(0);

//   stories.forEach((story, originalIndex) => {
//     const ratio = getAspectRatioValue(story.coverAspect);
//     const estimatedHeight = 1000 / ratio + CAPTION_HEIGHT; // columnWidth normalized to 1000 units
//     const shortestColumn = heights.indexOf(Math.min(...heights));
//     columns[shortestColumn].push({ story, originalIndex });
//     heights[shortestColumn] += estimatedHeight;
//   });

//   return columns;
// }

// // Responsive column count matching the sm/lg breakpoints used elsewhere in this file.
// function useColumnCount(): number {
//   const [columns, setColumns] = useState(3);

//   useEffect(() => {
//     const compute = () => {
//       const w = window.innerWidth;
//       if (w < 640) setColumns(1);
//       else if (w < 1024) setColumns(2);
//       else setColumns(3);
//     };
//     compute();
//     window.addEventListener('resize', compute);
//     return () => window.removeEventListener('resize', compute);
//   }, []);

//   return columns;
// }

// export const SelectedStoriesSection: React.FC<SelectedStoriesSectionProps> = ({
//   onOpenStory,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'HERITAGE' | 'ROYAL' | 'COASTAL' | 'RECEPTION'>('ALL');
//   const columnCount = useColumnCount();

//   const filterMap: Record<string, (story: WeddingStory) => boolean> = {
//     ALL: () => true,
//     HERITAGE: (s) =>
//       s.category.toLowerCase().includes('heritage') ||
//       s.category.toLowerCase().includes('kasavu') ||
//       s.category.toLowerCase().includes('temple'),
//     ROYAL: (s) =>
//       s.category.toLowerCase().includes('royal') ||
//       s.category.toLowerCase().includes('sangeet') ||
//       s.category.toLowerCase().includes('estate'),
//     COASTAL: (s) =>
//       s.category.toLowerCase().includes('backwater') ||
//       s.category.toLowerCase().includes('baraat') ||
//       s.location.toLowerCase().includes('alleppey') ||
//       s.category.toLowerCase().includes('harbor'),
//     RECEPTION: (s) =>
//       s.category.toLowerCase().includes('reception') ||
//       s.category.toLowerCase().includes('twirl') ||
//       s.category.toLowerCase().includes('gala'),
//   };

//   const filteredStories = STORIES_DATA.filter(filterMap[selectedFilter] || (() => true));
//   const displayedStories = isExpanded ? filteredStories : filteredStories.slice(0, 6);

//   // Recompute column placement whenever the visible set or column count changes
//   const columns = useMemo(
//     () => distributeToColumns(displayedStories, columnCount),
//     [displayedStories, columnCount]
//   );

//   const getAspectClass = (aspect?: string) => {
//     switch (aspect) {
//       case 'tall':
//       case 'vertical':
//         return 'aspect-[3/4]';
//       case 'portrait':
//         return 'aspect-[4/5]';
//       case 'square':
//         return 'aspect-square';
//       case 'wide':
//         return 'aspect-[16/10]';
//       case 'horizontal':
//       default:
//         return 'aspect-[4/3]';
//     }
//   };

//   const headerVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
//     },
//   };

//   // Render individual portfolio card
//   const renderCard = (story: WeddingStory, originalIndex: number) => {
//     const aspectClass = getAspectClass(story.coverAspect);

//     return (
//       <motion.div
//         key={story.id}
//         variants={itemVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: '-40px', amount: 0.1 }}
//         className="w-full group mb-8 last:mb-0"
//       >
//         <div
//           id={`portfolio-card-${story.id}`}
//           onClick={() => onOpenStory(story)}
//           className="cursor-pointer relative overflow-hidden bg-[#EAE6DF] border border-[#E5E0D8] hover:border-[#B4ACA1] transition-all duration-500 shadow-sm hover:shadow-2xl rounded-[2px]"
//         >
//           {/* Image Container — real aspect ratio kept per-card, so sizes stay mixed/uneven */}
//           <div className={`w-full overflow-hidden relative ${aspectClass}`}>
//             <LazyImage
//               src={story.coverImage}
//               alt={`${story.title} — ${story.category} wedding photography in ${story.location} by Oscar Weddings`}
//               width={1200}
//               height={1400}
//               containerClassName="w-full h-full"
//               placeholderClassName="bg-[#EAE6DF]"
//               className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out filter contrast-[1.03] brightness-[0.98]"
//             />

//             {/* Corner Index Badge */}
//             <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
//               <span className="bg-black/60 backdrop-blur-sm text-[#FAF8F5] text-[9px] tracking-[0.24em] uppercase px-2.5 py-1 rounded-[1px] font-medium border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
//                 {String(originalIndex + 1).padStart(2, '0')}
//               </span>
//             </div>

//             {/* Luxury Editorial Hover Curtain */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 sm:p-6 text-[#FAF8F5] z-10">
//               <div className="space-y-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
//                 <span className="text-[9px] sm:text-[10px] tracking-[0.26em] uppercase text-[#C5A880] font-medium block">
//                   {story.location}
//                 </span>

//                 <h3
//                   className="text-lg sm:text-xl font-serif text-[#FAF8F5] tracking-wide font-light leading-snug"
//                   style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
//                 >
//                   {story.title}
//                 </h3>

//                 <p className="text-[11px] sm:text-xs text-[#E6E1D8]/80 font-light line-clamp-1 italic font-serif">
//                   {story.tagline}
//                 </p>

//                 <div className="pt-2.5 flex items-center justify-between text-[9px] tracking-[0.22em] uppercase text-[#FAF8F5] font-medium border-t border-white/15">
//                   <span className="inline-flex items-center gap-1.5 text-[#C5A880]">
//                     <Eye className="w-3.5 h-3.5" />
//                     <span className="tracking-[0.2em] font-semibold text-white">VIEW STORY</span>
//                   </span>
//                   <span className="text-[#B4ACA1] text-[8px] tracking-widest">
//                     {story.gallery.length} ARCHIVED IMAGES
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Understated Editorial Caption Strip for Magazine Aesthetics */}
//           <div className="px-4 py-3 bg-[#FAF8F5] flex items-center justify-between border-t border-[#EAE6DF]/60">
//             <div className="min-w-0 pr-3">
//               <span className="text-[9px] tracking-[0.2em] uppercase text-[#8C8479] font-medium block truncate">
//                 {story.location.split('·')[0].trim()}
//               </span>
//               <h4
//                 className="text-sm sm:text-base font-serif text-[#141312] tracking-wide font-medium truncate group-hover:text-[#8C6D3B] transition-colors"
//                 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
//               >
//                 {story.couple}
//               </h4>
//             </div>
//             <div className="flex-shrink-0 flex items-center gap-1 text-[9px] tracking-[0.18em] uppercase text-[#736B63] group-hover:text-[#141312] transition-colors font-medium">
//               <span>EXPLORE</span>
//               <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <section
//       id="stories"
//       data-theme="light"
//       className="relative bg-[#FAF9F6] text-[#141312] py-20 sm:py-28 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#EAE6DF] transition-colors"
//     >
//       <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 md:space-y-14">

//         {/* Section Header */}
//         <motion.div
//           variants={headerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-60px' }}
//           className="text-center space-y-3.5 max-w-4xl mx-auto"
//         >
//           <div className="inline-flex items-center gap-2">
//             <span
//               className="text-[10px] sm:text-[11px] tracking-[0.38em] uppercase text-[#8C8479] font-medium block"
//               style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//             >
//               SELECTED WORKS
//             </span>
//           </div>

//           <h2
//             className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-light text-[#141312] tracking-[0.16em] sm:tracking-[0.22em] uppercase leading-tight"
//             style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
//           >
//             CURATED LUXURY WEDDING PORTFOLIO
//           </h2>

//           <p
//             className="text-xs sm:text-sm text-[#736B63] font-light tracking-wide max-w-xl mx-auto pt-1 leading-relaxed"
//             style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//           >
//             Moments observed with stillness, quiet elegance, and editorial permanence.
//           </p>
//         </motion.div>

//         {/* Category Filter Navigation */}
//         {isExpanded && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1"
//           >
//             {(['ALL', 'HERITAGE', 'ROYAL', 'COASTAL', 'RECEPTION'] as const).map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setSelectedFilter(filter)}
//                 className={`px-4 py-1.5 rounded-full text-[10px] tracking-[0.24em] uppercase transition-all duration-300 font-medium cursor-pointer ${
//                   selectedFilter === filter
//                     ? 'bg-[#141312] text-[#FAF8F5] shadow-sm'
//                     : 'bg-[#EFECE6] text-[#736B63] hover:bg-[#E5E0D8] hover:text-[#141312]'
//                 }`}
//               >
//                 {filter === 'ALL' ? 'ALL CELEBRATIONS' : filter}
//               </button>
//             ))}
//           </motion.div>
//         )}

//         {/* ========================================================================= */}
//         {/* TRUE MASONRY — JS column-balancing (Pinterest-style).                     */}
//         {/* Each column is an independent vertical stack; every new card goes into    */}
//         {/* whichever column is currently shortest, so heights stay tight with ZERO   */}
//         {/* leftover blank space, while still mixing big/small images freely.         */}
//         {/* ========================================================================= */}
//         <div className="flex gap-8 items-start">
//           {columns.map((column, colIndex) => (
//             <div key={colIndex} className="flex-1 flex flex-col min-w-0">
//               {column.map(({ story, originalIndex }) => renderCard(story, originalIndex))}
//             </div>
//           ))}
//         </div>

//         {/* Button Controls — centered */}
//         <div className="text-center pt-6 sm:pt-8">
//           {!isExpanded ? (
//             <button
//               id="view-full-portfolio-btn"
//               onClick={() => setIsExpanded(true)}
//               className="inline-flex items-center justify-center gap-3 bg-[#141312] hover:bg-[#2A2724] text-[#FAF8F5] px-10 py-4 rounded-full text-xs tracking-[0.25em] font-medium uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 border border-[#141312] hover:border-[#38332E] cursor-pointer group"
//               style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//             >
//               <span>VIEW FULL PORTFOLIO</span>
//               <ChevronDown className="w-3.5 h-3.5 text-[#B4ACA1] group-hover:translate-y-0.5 transition-transform" />
//             </button>
//           ) : (
//             <button
//               id="collapse-portfolio-btn"
//               onClick={() => setIsExpanded(false)}
//               className="inline-flex items-center justify-center gap-3 bg-[#141312] hover:bg-[#2A2724] text-[#FAF8F5] px-10 py-4 rounded-full text-xs tracking-[0.25em] font-medium uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 border border-[#141312] hover:border-[#38332E] cursor-pointer group"
//               style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//             >
//               <span>COLLAPSE ARCHIVE</span>
//               <ChevronUp className="w-3.5 h-3.5 text-[#B4ACA1] group-hover:-translate-y-0.5 transition-transform" />
//             </button>
//           )}
//         </div>

//       </div>
//     </section>
//   );
// };


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { ArrowRight, ChevronDown, ChevronUp, Eye } from 'lucide-react';
// import { STORIES_DATA } from '../data/weddingContent';
// import { WeddingStory } from '../types';
// import { LazyImage } from './LazyImage';

// interface SelectedStoriesSectionProps {
//   onOpenStory: (story: WeddingStory) => void;
// }

// // TEMP SAFEGUARD: excludes the Chitra & Dinesh / Thrissur Sacred Grounds story.
// // Ideally also delete this entry directly from STORIES_DATA in
// // ../data/weddingContent.ts so it doesn't surface elsewhere that also reads
// // from that array.
// const EXCLUDED_COUPLES = ['Chitra & Dinesh'];
// const VISIBLE_STORIES = STORIES_DATA.filter(
//   (s) => !EXCLUDED_COUPLES.includes(s.couple)
// );

// export const SelectedStoriesSection: React.FC<SelectedStoriesSectionProps> = ({
//   onOpenStory,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'HERITAGE' | 'ROYAL' | 'COASTAL' | 'RECEPTION'>('ALL');

//   const filterMap: Record<string, (story: WeddingStory) => boolean> = {
//     ALL: () => true,
//     HERITAGE: (s) =>
//       s.category.toLowerCase().includes('heritage') ||
//       s.category.toLowerCase().includes('kasavu') ||
//       s.category.toLowerCase().includes('temple'),
//     ROYAL: (s) =>
//       s.category.toLowerCase().includes('royal') ||
//       s.category.toLowerCase().includes('sangeet') ||
//       s.category.toLowerCase().includes('estate'),
//     COASTAL: (s) =>
//       s.category.toLowerCase().includes('backwater') ||
//       s.category.toLowerCase().includes('baraat') ||
//       s.location.toLowerCase().includes('alleppey') ||
//       s.category.toLowerCase().includes('harbor'),
//     RECEPTION: (s) =>
//       s.category.toLowerCase().includes('reception') ||
//       s.category.toLowerCase().includes('twirl') ||
//       s.category.toLowerCase().includes('gala'),
//   };

//   const filteredStories = VISIBLE_STORIES.filter(filterMap[selectedFilter] || (() => true));

//   // Collapsed state: exactly 3 stories in the hero (left, center, right).
//   // Expanded state: the full filtered list in an even grid.
//   const heroStories = filteredStories.slice(0, 3);
//   const [heroLeft, heroCenter, heroRight] = heroStories;
//   const fullStories = filteredStories;

//   const headerVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
//     },
//   };

//   // Shared card renderer — aspectClass is passed explicitly by the caller
//   // (hero layout or grid layout) rather than read from story.coverAspect.
//   const renderCard = (
//     story: WeddingStory,
//     originalIndex: number,
//     aspectClass: string
//   ) => {
//     return (
//       <motion.div
//         key={story.id}
//         variants={itemVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: '-40px', amount: 0.1 }}
//         className="w-full group"
//       >
//         <div
//           id={`portfolio-card-${story.id}`}
//           onClick={() => onOpenStory(story)}
//           className="cursor-pointer relative overflow-hidden bg-[#EAE6DF] border border-[#E5E0D8] hover:border-[#B4ACA1] transition-all duration-500 shadow-sm hover:shadow-2xl rounded-[2px] h-full flex flex-col"
//         >
//           {/* Image Container */}
//           <div className={`w-full overflow-hidden relative ${aspectClass}`}>
//             <LazyImage
//               src={story.coverImage}
//               alt={`${story.title} — ${story.category} wedding photography in ${story.location} by Oscar Weddings`}
//               width={1200}
//               height={1400}
//               containerClassName="w-full h-full"
//               placeholderClassName="bg-[#EAE6DF]"
//               className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out filter contrast-[1.03] brightness-[0.98]"
//             />

//             {/* Corner Index Badge */}
//             <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
//               <span className="bg-black/60 backdrop-blur-sm text-[#FAF8F5] text-[9px] tracking-[0.24em] uppercase px-2.5 py-1 rounded-[1px] font-medium border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
//                 {String(originalIndex + 1).padStart(2, '0')}
//               </span>
//             </div>

//             {/* Luxury Editorial Hover Curtain */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 sm:p-6 text-[#FAF8F5] z-10">
//               <div className="space-y-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
//                 <span className="text-[9px] sm:text-[10px] tracking-[0.26em] uppercase text-[#C5A880] font-medium block">
//                   {story.location}
//                 </span>

//                 <h3
//                   className="text-lg sm:text-xl font-serif text-[#FAF8F5] tracking-wide font-light leading-snug"
//                   style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
//                 >
//                   {story.title}
//                 </h3>

//                 <p className="text-[11px] sm:text-xs text-[#E6E1D8]/80 font-light line-clamp-1 italic font-serif">
//                   {story.tagline}
//                 </p>

//                 <div className="pt-2.5 flex items-center justify-between text-[9px] tracking-[0.22em] uppercase text-[#FAF8F5] font-medium border-t border-white/15">
//                   <span className="inline-flex items-center gap-1.5 text-[#C5A880]">
//                     <Eye className="w-3.5 h-3.5" />
//                     <span className="tracking-[0.2em] font-semibold text-white">VIEW STORY</span>
//                   </span>
//                   <span className="text-[#B4ACA1] text-[8px] tracking-widest">
//                     {story.gallery.length} ARCHIVED IMAGES
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Understated Editorial Caption Strip */}
//           <div className="px-4 py-3 bg-[#FAF8F5] flex items-center justify-between border-t border-[#EAE6DF]/60 mt-auto">
//             <div className="min-w-0 pr-3">
//               <span className="text-[9px] tracking-[0.2em] uppercase text-[#8C8479] font-medium block truncate">
//                 {story.location.split('·')[0].trim()}
//               </span>
//               <h4
//                 className="text-sm sm:text-base font-serif text-[#141312] tracking-wide font-medium truncate group-hover:text-[#8C6D3B] transition-colors"
//                 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
//               >
//                 {story.couple}
//               </h4>
//             </div>
//             <div className="flex-shrink-0 flex items-center gap-1 text-[9px] tracking-[0.18em] uppercase text-[#736B63] group-hover:text-[#141312] transition-colors font-medium">
//               <span>EXPLORE</span>
//               <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   // ===========================================================================
//   // COLLAPSED "HERO" — exactly 3 cards. Left & right use the same tall aspect
//   // ratio so they stay visually equal in height. Center uses a shorter aspect
//   // ratio. All three columns sit in one flex row with the default
//   // align-items: stretch, so the center column's div auto-stretches to match
//   // the taller side cards — the flex-1 spacer beneath the short card then
//   // absorbs exactly that leftover height and centers the button inside it.
//   // No manual height math, and it stays correct at any screen size.
//   // ===========================================================================
//   const renderHeroComposition = () => (
//     <div className="flex flex-col sm:flex-row gap-8 items-stretch">
//       {/* LEFT — tall, dominant */}
//       <div className="flex-1 min-w-0">
//         {heroLeft && renderCard(heroLeft, 0, 'aspect-[3/4]')}
//       </div>

//       {/* CENTER — shorter card + button in the leftover gap */}
//       <div className="flex-1 flex flex-col gap-8 min-w-0">
//         {heroCenter && renderCard(heroCenter, 1, 'aspect-[16/11]')}

//         <div className="flex-1 flex items-center justify-center min-h-[88px]">
//           <button
//             id="view-full-portfolio-btn"
//             onClick={() => setIsExpanded(true)}
//             className="inline-flex items-center justify-center gap-3 bg-[#141312] hover:bg-[#2A2724] text-[#FAF8F5] px-10 py-4 rounded-full text-xs tracking-[0.25em] font-medium uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 border border-[#141312] hover:border-[#38332E] cursor-pointer group"
//             style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//           >
//             <span>VIEW FULL PORTFOLIO</span>
//             <ChevronDown className="w-3.5 h-3.5 text-[#B4ACA1] group-hover:translate-y-0.5 transition-transform" />
//           </button>
//         </div>
//       </div>

//       {/* RIGHT — tall, dominant, matches left */}
//       <div className="flex-1 min-w-0">
//         {heroRight && renderCard(heroRight, 2, 'aspect-[3/4]')}
//       </div>
//     </div>
//   );

//   // ===========================================================================
//   // EXPANDED FULL PORTFOLIO — even grid, no leftover blank space.
//   // ===========================================================================
//   const renderFullPortfolio = () => (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
//         {fullStories.map((story, index) => renderCard(story, index, 'aspect-[4/5]'))}
//       </div>

//       <div className="text-center pt-6 sm:pt-8">
//         <button
//           id="collapse-portfolio-btn"
//           onClick={() => setIsExpanded(false)}
//           className="inline-flex items-center justify-center gap-3 bg-[#141312] hover:bg-[#2A2724] text-[#FAF8F5] px-10 py-4 rounded-full text-xs tracking-[0.25em] font-medium uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 border border-[#141312] hover:border-[#38332E] cursor-pointer group"
//           style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//         >
//           <span>COLLAPSE ARCHIVE</span>
//           <ChevronUp className="w-3.5 h-3.5 text-[#B4ACA1] group-hover:-translate-y-0.5 transition-transform" />
//         </button>
//       </div>
//     </>
//   );

//   return (
//     <section
//       id="stories"
//       data-theme="light"
//       className="relative bg-[#FAF9F6] text-[#141312] py-20 sm:py-28 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#EAE6DF] transition-colors"
//     >
//       <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 md:space-y-14">

//         {/* Section Header */}
//         <motion.div
//           variants={headerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-60px' }}
//           className="text-center space-y-3.5 max-w-4xl mx-auto"
//         >
//           <div className="inline-flex items-center gap-2">
//             <span
//               className="text-[10px] sm:text-[11px] tracking-[0.38em] uppercase text-[#8C8479] font-medium block"
//               style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//             >
//               SELECTED WORKS
//             </span>
//           </div>

//           <h2
//             className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-light text-[#141312] tracking-[0.16em] sm:tracking-[0.22em] uppercase leading-tight"
//             style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
//           >
//             CURATED LUXURY WEDDING PORTFOLIO
//           </h2>

//           <p
//             className="text-xs sm:text-sm text-[#736B63] font-light tracking-wide max-w-xl mx-auto pt-1 leading-relaxed"
//             style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//           >
//             Moments observed with stillness, quiet elegance, and editorial permanence.
//           </p>
//         </motion.div>

//         {/* Category Filter Navigation — only shown once expanded */}
//         {isExpanded && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1"
//           >
//             {(['ALL', 'HERITAGE', 'ROYAL', 'COASTAL', 'RECEPTION'] as const).map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setSelectedFilter(filter)}
//                 className={`px-4 py-1.5 rounded-full text-[10px] tracking-[0.24em] uppercase transition-all duration-300 font-medium cursor-pointer ${
//                   selectedFilter === filter
//                     ? 'bg-[#141312] text-[#FAF8F5] shadow-sm'
//                     : 'bg-[#EFECE6] text-[#736B63] hover:bg-[#E5E0D8] hover:text-[#141312]'
//                 }`}
//               >
//                 {filter === 'ALL' ? 'ALL CELEBRATIONS' : filter}
//               </button>
//             ))}
//           </motion.div>
//         )}

//         {/* ===================================================================
//            layout on this wrapper makes Framer Motion smoothly animate the
//            HEIGHT CHANGE between the short hero and the taller full grid —
//            this is what removes the blank-space jump on expand/collapse.
//            AnimatePresence crossfades the two states instead of a hard swap.
//         =================================================================== */}
//         <motion.div layout transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
//           <AnimatePresence mode="wait" initial={false}>
//             {!isExpanded ? (
//               <motion.div
//                 key="hero"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1, transition: { duration: 0.4 } }}
//                 exit={{ opacity: 0, transition: { duration: 0.25 } }}
//               >
//                 {renderHeroComposition()}
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="full"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
//                 exit={{ opacity: 0, transition: { duration: 0.25 } }}
//               >
//                 {renderFullPortfolio()}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { STORIES_DATA } from '../data/weddingContent';
import { WeddingStory } from '../types';
import { LazyImage } from './LazyImage';

interface SelectedStoriesSectionProps {
  onOpenStory: (story: WeddingStory) => void;
}

export const SelectedStoriesSection: React.FC<SelectedStoriesSectionProps> = ({
  onOpenStory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'HERITAGE' | 'ROYAL' | 'COASTAL' | 'RECEPTION'>('ALL');

  const filterMap: Record<string, (story: WeddingStory) => boolean> = {
    ALL: () => true,
    HERITAGE: (s) =>
      s.category.toLowerCase().includes('heritage') ||
      s.category.toLowerCase().includes('kasavu') ||
      s.category.toLowerCase().includes('temple'),
    ROYAL: (s) =>
      s.category.toLowerCase().includes('royal') ||
      s.category.toLowerCase().includes('sangeet') ||
      s.category.toLowerCase().includes('estate'),
    COASTAL: (s) =>
      s.category.toLowerCase().includes('backwater') ||
      s.category.toLowerCase().includes('baraat') ||
      s.location.toLowerCase().includes('alleppey') ||
      s.category.toLowerCase().includes('harbor'),
    RECEPTION: (s) =>
      s.category.toLowerCase().includes('reception') ||
      s.category.toLowerCase().includes('twirl') ||
      s.category.toLowerCase().includes('gala'),
  };

  const filteredStories = STORIES_DATA.filter(filterMap[selectedFilter] || (() => true));

  // Collapsed state: exactly 3 stories in the hero (left, center, right).
  // Expanded state: the full filtered list in an even grid.
  const heroStories = filteredStories.slice(0, 3);
  const [heroLeft, heroCenter, heroRight] = heroStories;
  const fullStories = filteredStories;

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Shared card renderer — aspectClass is passed explicitly by the caller
  // (hero layout or grid layout) rather than read from story.coverAspect.
  const renderCard = (
    story: WeddingStory,
    originalIndex: number,
    aspectClass: string
  ) => {
    return (
      <motion.div
        key={story.id}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px', amount: 0.1 }}
        className="w-full group"
      >
        <div
          id={`portfolio-card-${story.id}`}
          onClick={() => onOpenStory(story)}
          className="cursor-pointer relative overflow-hidden bg-[#EAE6DF] border border-[#E5E0D8] hover:border-[#B4ACA1] transition-colors duration-300 shadow-sm rounded-[2px] h-full flex flex-col"
        >
          {/* Image Container */}
          <div className={`w-full overflow-hidden relative ${aspectClass}`}>
            <LazyImage
              src={story.coverImage}
              alt={`${story.title} — ${story.category} wedding photography in ${story.location} by Oscar Weddings`}
              width={1200}
              height={1400}
              containerClassName="w-full h-full"
              placeholderClassName="bg-[#EAE6DF]"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out filter contrast-[1.03] brightness-[0.98]"
            />

            {/* Corner Index Badge */}
            <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
              <span className="bg-black/60 backdrop-blur-sm text-[#FAF8F5] text-[9px] tracking-[0.24em] uppercase px-2.5 py-1 rounded-[1px] font-medium border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
                {String(originalIndex + 1).padStart(2, '0')}
              </span>
            </div>

          </div>

          {/* Understated Editorial Caption Strip */}
          <div className="px-4 py-3 bg-[#FAF8F5] flex items-center justify-between border-t border-[#EAE6DF]/60 mt-auto">
            <div className="min-w-0 pr-3">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#8C8479] font-medium block truncate">
                {story.location.split('·')[0].trim()}
              </span>
              <h4
                className="text-sm sm:text-base font-serif text-[#141312] tracking-wide font-medium truncate group-hover:text-[#8C6D3B] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {story.couple}
              </h4>
            </div>
            <div className="flex-shrink-0 flex items-center gap-1 text-[9px] tracking-[0.18em] uppercase text-[#736B63] group-hover:text-[#141312] transition-colors font-medium">
              <span>EXPLORE</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // ===========================================================================
  // COLLAPSED "HERO" — exactly 3 cards. Left & right use the same tall aspect
  // ratio so they stay visually equal in height. Center uses a shorter aspect
  // ratio. All three columns sit in one flex row with the default
  // align-items: stretch, so the center column's div auto-stretches to match
  // the taller side cards — the flex-1 spacer beneath the short card then
  // absorbs exactly that leftover height and centers the button inside it.
  // ===========================================================================
  const renderHeroComposition = () => (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-stretch">
      {/* LEFT — tall, dominant */}
      <div className="flex-1 min-w-0">
        {heroLeft && renderCard(heroLeft, 0, 'aspect-[3/4]')}
      </div>

      {/* CENTER — shorter card */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        {heroCenter && renderCard(heroCenter, 1, 'aspect-[16/11]')}

        <div className="hidden sm:flex flex-1 items-center justify-center min-h-[88px]">
          <button
            id="view-full-portfolio-btn"
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center justify-center gap-3 bg-[#141312] hover:bg-[#2A2724] text-[#FAF8F5] px-10 py-4 rounded-full text-xs tracking-[0.25em] font-medium uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 border border-[#141312] hover:border-[#38332E] cursor-pointer group"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span>VIEW FULL PORTFOLIO</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#B4ACA1] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* RIGHT — tall, dominant, matches left */}
      <div className="flex-1 min-w-0">
        {heroRight && renderCard(heroRight, 2, 'aspect-[3/4]')}
      </div>

      {/* Mobile button sits after the third image, aligned at the end of the stack */}
      <div className="sm:hidden w-full">
        <button
          id="view-full-portfolio-btn-mobile"
          onClick={() => setIsExpanded(true)}
          className="inline-flex w-full items-center justify-center gap-3 bg-[#141312] hover:bg-[#2A2724] text-[#FAF8F5] px-10 py-4 rounded-full text-xs tracking-[0.25em] font-medium uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 border border-[#141312] hover:border-[#38332E] cursor-pointer group"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <span>VIEW FULL PORTFOLIO</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#B4ACA1] group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );

  // ===========================================================================
  // EXPANDED FULL PORTFOLIO — even grid, no leftover blank space.
  // ===========================================================================
  const renderFullPortfolio = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {fullStories.map((story, index) => renderCard(story, index, 'aspect-[4/5]'))}
      </div>

      <div className="text-center pt-6 sm:pt-8">
        <button
          id="collapse-portfolio-btn"
          onClick={() => setIsExpanded(false)}
          className="inline-flex items-center justify-center gap-3 bg-[#141312] hover:bg-[#2A2724] text-[#FAF8F5] px-10 py-4 rounded-full text-xs tracking-[0.25em] font-medium uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 border border-[#141312] hover:border-[#38332E] cursor-pointer group"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <span>COLLAPSE ARCHIVE</span>
          <ChevronUp className="w-3.5 h-3.5 text-[#B4ACA1] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </>
  );

  return (
    <section
      id="stories"
      data-theme="light"
      className="relative bg-[#FAF9F6] text-[#141312] py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-[#EAE6DF] transition-colors"
    >
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">

        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center space-y-3.5 max-w-4xl mx-auto"
        >
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
        </motion.div>

        {/* Category Filter Navigation — only shown once expanded */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1"
          >
            {(['ALL', 'HERITAGE', 'ROYAL', 'COASTAL', 'RECEPTION'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-[10px] tracking-[0.24em] uppercase transition-all duration-300 font-medium cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-[#141312] text-[#FAF8F5] shadow-sm'
                    : 'bg-[#EFECE6] text-[#736B63] hover:bg-[#E5E0D8] hover:text-[#141312]'
                }`}
              >
                {filter === 'ALL' ? 'ALL CELEBRATIONS' : filter}
              </button>
            ))}
          </motion.div>
        )}

        {/* layout on this wrapper makes Framer Motion smoothly animate the
           height change between the short hero and the taller full grid.
           AnimatePresence crossfades the two states instead of a hard swap. */}
        <motion.div layout transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <AnimatePresence mode="wait" initial={false}>
            {!isExpanded ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
              >
                {renderHeroComposition()}
              </motion.div>
            ) : (
              <motion.div
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
              >
                {renderFullPortfolio()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};