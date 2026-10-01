import React, { useState } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  GalleryCategoryKey,
  GalleryItem,
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  Language,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface MediaGallerySectionProps {
  lang: Language;
  onOpenMenu: () => void;
}

export const MediaGallerySection: React.FC<MediaGallerySectionProps> = ({
  lang,
  onOpenMenu,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategoryKey>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) =>
          item.categories.includes(selectedCategory)
        );

  const currentIndex = lightboxItem
    ? filteredItems.findIndex((i) => i.id === lightboxItem.id)
    : -1;

  const handlePrev = () => {
    if (filteredItems.length === 0 || currentIndex === -1) return;
    const prevIdx =
      (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxItem(filteredItems[prevIdx]);
  };

  const handleNext = () => {
    if (filteredItems.length === 0 || currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % filteredItems.length;
    setLightboxItem(filteredItems[nextIdx]);
  };

  return (
    <section id="gallery" className="py-20 bg-[#F2EFE9] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Interactive Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-semibold text-[#C86412]">
              {lang === 'ar'
                ? '03 · معرض الصور والأجواء الحقيقية'
                : '03 · Visual Gallery & Dining Atmosphere'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#071324] balance-text">
              {lang === 'ar'
                ? 'لقطات من موائد الصباحي للبحريات والمشويات'
                : 'Snapshots from El-Sabahi Seafood & Charcoal Tables'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'تصفح صور الأطباق الطازجة، صواني السي فود، المشويات على الفحم، وأجواء صالات العائلات بفرع شارع قناة السويس.'
                : 'Browse authentic dishes, family seafood trays, live charcoal grills, and dining hall moments from Suez Canal St.'}
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            className="flex items-center gap-1 p-1.5 bg-white rounded-xl border border-slate-200/80 overflow-x-auto"
            role="tablist"
            aria-label={lang === 'ar' ? 'تصنيفات الصور' : 'Gallery categories'}
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#071324] text-white'
                      : 'text-slate-600 hover:text-[#071324]'
                  }`}
                >
                  {cat.label[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Bento Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredItems.map((item, idx) => {
            // Make first item or landscape items span wider on desktop when showing all
            const colSpanClass =
              selectedCategory === 'all' && idx === 0
                ? 'md:col-span-8'
                : selectedCategory === 'all' && idx === 4
                ? 'md:col-span-8'
                : 'md:col-span-4';

            return (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className={`${colSpanClass} group relative rounded-xl overflow-hidden bg-[#071324] border border-slate-200/80 cursor-pointer h-72 sm:h-80`}
              >
                <ResilientImage
                  src={item.image}
                  alt={item.title[lang]}
                  fallbackTitle={item.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                {/* Measured Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-300 mb-1">
                    <span>
                      {item.contributor[lang]} · {item.date[lang]}
                    </span>
                    <span className="p-1.5 rounded-lg bg-white/15 text-white opacity-90 group-hover:bg-[#C86412] transition-colors">
                      <Expand className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white balance-text">
                    {item.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                    {item.caption[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-[#071324]/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0F2137] border border-white/15 rounded-xl overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
              <div className="text-xs text-slate-300">
                {lightboxItem.contributor[lang]} · {lightboxItem.date[lang]}
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-72 sm:h-[420px] bg-black">
              <ResilientImage
                src={lightboxItem.image}
                alt={lightboxItem.title[lang]}
                className="w-full h-full object-cover"
              />
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute top-1/2 -translate-y-1/2 start-3 p-2.5 rounded-full bg-black/60 hover:bg-[#C86412] text-white transition-colors cursor-pointer"
                    aria-label={lang === 'ar' ? 'السابق' : 'Previous'}
                  >
                    {lang === 'ar' ? (
                      <ChevronRight className="w-5 h-5" />
                    ) : (
                      <ChevronLeft className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute top-1/2 -translate-y-1/2 end-3 p-2.5 rounded-full bg-black/60 hover:bg-[#C86412] text-white transition-colors cursor-pointer"
                    aria-label={lang === 'ar' ? 'التالي' : 'Next'}
                  >
                    {lang === 'ar' ? (
                      <ChevronLeft className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                </>
              )}
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {lightboxItem.title[lang]}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {lightboxItem.caption[lang]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLightboxItem(null);
                  onOpenMenu();
                }}
                className="px-4 py-2.5 text-xs font-bold bg-[#C86412] hover:bg-[#b0550c] text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {lang === 'ar' ? 'اطلب هذا الصنف الآن' : 'Order This Specialty'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
