import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquarePlus, Check } from 'lucide-react';
import {
  CustomerReview,
  INITIAL_REVIEWS,
  Language,
  RATING_DISTRIBUTION,
  RESTAURANT_INFO,
  REVIEW_KEYWORDS,
  ReviewKeywordKey,
} from '../data/restaurantData';

interface CustomerReviewsSectionProps {
  lang: Language;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  lang,
}) => {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [activeKeyword, setActiveKeyword] = useState<ReviewKeywordKey>('all');
  const [activeSegment, setActiveSegment] = useState<'all' | 'local' | 'visitor'>('all');
  const [helpfulClickedIds, setHelpfulClickedIds] = useState<string[]>([]);

  // New Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newSegment, setNewSegment] = useState<'local' | 'visitor'>('local');
  const [newRating, setNewRating] = useState(5);
  const [newDishes, setNewDishes] = useState('');
  const [newText, setNewText] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const filteredReviews = reviews.filter((rev) => {
    const matchesKeyword =
      activeKeyword === 'all' || rev.keywords.includes(activeKeyword);
    const matchesSegment =
      activeSegment === 'all' || rev.segment === activeSegment;
    return matchesKeyword && matchesSegment;
  });

  const handleToggleHelpful = (id: string) => {
    if (helpfulClickedIds.includes(id)) return;
    setHelpfulClickedIds((prev) => [...prev, id]);
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      )
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError('');

    if (!newAuthor.trim() || !newText.trim()) {
      setReviewError(
        lang === 'ar'
          ? 'يرجى كتابة الاسم وتفاصيل تجربتك في المطعم.'
          : 'Please enter your name and review details.'
      );
      return;
    }

    const created: CustomerReview = {
      id: `rev-custom-${Date.now()}`,
      author: { ar: newAuthor.trim(), en: newAuthor.trim() },
      badge:
        newSegment === 'local'
          ? { ar: 'عميل من المنصورة · مراجعة موثقة', en: 'Mansoura Local · Verified Review' }
          : { ar: 'زائر للمنصورة · مراجعة موثقة', en: 'Visitor · Verified Review' },
      segment: newSegment,
      rating: newRating,
      date: { ar: 'الآن', en: 'Just now' },
      serviceType: { ar: 'الجلوس داخل المكان', en: 'Dine-in' },
      text: { ar: newText.trim(), en: newText.trim() },
      orderedDishes: {
        ar: newDishes.trim() || 'تشكيلة بحريات الصباحي',
        en: newDishes.trim() || 'El-Sabahi Seafood Selection',
      },
      keywords: ['quality', 'experience', 'place', 'cleanliness'],
      helpfulCount: 1,
    };

    setReviews([created, ...reviews]);
    setNewAuthor('');
    setNewDishes('');
    setNewText('');
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setShowReviewForm(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-semibold text-[#C86412]">
              {lang === 'ar'
                ? '04 · تقييمات الزوار والمرشدين المحليين'
                : '04 · Verified Guest & Local Guide Reviews'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#071324] balance-text">
              {lang === 'ar'
                ? 'ثقة أكثر من 5,296 عميل على خرائط جوجل'
                : 'Trusted by Over 5,296 Guests on Google Maps'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'اقرأ تجارب الزوار من أهالي المنصورة والضيوف من مختلف المحافظات حول جودة الأسماك، النظافة، وأجواء شارع قناة السويس.'
                : 'Read firsthand experiences from Mansoura locals and visiting families regarding seafood freshness, cleanliness, and table hospitality.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewForm((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#071324] hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap self-start lg:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#E59849]" />
            <span>
              {showReviewForm
                ? lang === 'ar'
                  ? 'إغلاق نموذج التقييم'
                  : 'Close Review Form'
                : lang === 'ar'
                ? 'شارك تجربتك وتقييمك'
                : 'Write a Review'}
            </span>
          </button>
        </div>

        {/* Add Review Collapsible Form */}
        {showReviewForm && (
          <form
            onSubmit={handleAddReview}
            className="mb-10 bg-white rounded-xl border border-slate-200 p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#071324]">
                {lang === 'ar'
                  ? 'إضافة تقييم جديد لمطاعم الصباحي'
                  : 'Submit Your Review for El-Sabahi'}
              </h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="p-1 cursor-pointer"
                    aria-label={`${star} stars`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= newRating
                          ? 'fill-[#D97706] text-[#D97706]'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {reviewError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {reviewError}
              </div>
            )}

            {reviewSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>
                  {lang === 'ar'
                    ? 'شكراً لك! تم نشر تقييمك بنجاح.'
                    : 'Thank you! Your review has been added.'}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الاسم *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#071324]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'صفتك كزائر' : 'Visitor Segment'}
                </label>
                <select
                  value={newSegment}
                  onChange={(e) =>
                    setNewSegment(e.target.value as 'local' | 'visitor')
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#071324]"
                >
                  <option value="local">
                    {lang === 'ar'
                      ? 'من أهالي المنصورة / مرشد محلي'
                      : 'Mansoura Local / Local Guide'}
                  </option>
                  <option value="visitor">
                    {lang === 'ar'
                      ? 'زائر / ضيف من خارج المنصورة'
                      : 'Visitor / Tourist'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الأطباق التي جربتها' : 'Dishes Ordered'}
                </label>
                <input
                  type="text"
                  value={newDishes}
                  onChange={(e) => setNewDishes(e.target.value)}
                  placeholder={
                    lang === 'ar'
                      ? 'مثال: قاروص سنجاري، شوربة سي فود'
                      : 'e.g. Singari Sea Bass, Seafood Soup'
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#071324]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'ar' ? 'تفاصيل تجربتك *' : 'Your Experience *'}
              </label>
              <textarea
                rows={3}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'حدثنا عن جودة الطعام، النظافة، والخدمة في مطاعم الصباحي...'
                    : 'Share your thoughts on food quality, cleanliness, and service...'
                }
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#071324]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#C86412] hover:bg-[#b0550c] rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'نشر التقييم الآن' : 'Publish Review'}
              </button>
            </div>
          </form>
        )}

        {/* Rating Summary + Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left/Start Column: Rating Breakdown Card */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-6 space-y-6">
            <div className="flex items-center gap-5 border-b border-slate-100 pb-5">
              <div className="text-center">
                <div className="text-4xl font-bold font-mono-num text-[#071324]">
                  {RESTAURANT_INFO.rating}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-mono-num">
                  {lang === 'ar' ? 'من 5.0' : 'out of 5.0'}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[#D97706]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= 4
                          ? 'fill-[#D97706] text-[#D97706]'
                          : 'fill-[#D97706]/50 text-[#D97706]'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm font-bold text-[#071324] font-mono-num">
                  {(RESTAURANT_INFO.totalReviews + reviews.length - INITIAL_REVIEWS.length).toLocaleString()}{' '}
                  {lang === 'ar' ? 'مراجعة موثقة' : 'Verified Reviews'}
                </div>
                <div className="text-xs text-slate-500">
                  {lang === 'ar'
                    ? 'شارع قناة السويس · المنصورة'
                    : 'Suez Canal St. · Mansoura'}
                </div>
              </div>
            </div>

            {/* Star Bars */}
            <div className="space-y-2.5">
              {RATING_DISTRIBUTION.map((row) => (
                <div
                  key={row.stars}
                  className="flex items-center gap-3 text-xs font-mono-num"
                >
                  <span className="w-6 font-semibold text-slate-700">
                    {row.stars} ★
                  </span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D97706] rounded-full"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-end text-slate-500">
                    {row.percentage}%
                  </span>
                </div>
              ))}
            </div>

            {/* Segment Filter Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-xs font-semibold text-slate-600">
                {lang === 'ar'
                  ? 'تصفية حسب شريحة الزوار:'
                  : 'Filter by Reviewer Segment:'}
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F2EFE9] rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveSegment('all')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeSegment === 'all'
                      ? 'bg-white text-[#071324] shadow-xs'
                      : 'text-slate-600 hover:text-[#071324]'
                  }`}
                >
                  {lang === 'ar' ? 'الجميع' : 'All'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSegment('local')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeSegment === 'local'
                      ? 'bg-white text-[#071324] shadow-xs'
                      : 'text-slate-600 hover:text-[#071324]'
                  }`}
                >
                  {lang === 'ar' ? 'مرشد محلي' : 'Locals'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSegment('visitor')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeSegment === 'visitor'
                      ? 'bg-white text-[#071324] shadow-xs'
                      : 'text-slate-600 hover:text-[#071324]'
                  }`}
                >
                  {lang === 'ar' ? 'السياح والزوار' : 'Visitors'}
                </button>
              </div>
            </div>
          </div>

          {/* Right/End Column: Keyword Filter Bar + Review Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Keyword Filter Buttons (المكان، التجربة، الجودة، النظافة) */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-3">
              <div className="text-xs font-semibold text-slate-500">
                {lang === 'ar'
                  ? 'فلترة التقييمات حسب الكلمات الأكثر تكراراً:'
                  : 'Filter reviews by most mentioned topics:'}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {REVIEW_KEYWORDS.map((kw) => {
                  const isActive = activeKeyword === kw.key;
                  return (
                    <button
                      key={kw.key}
                      type="button"
                      onClick={() => setActiveKeyword(kw.key)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#071324] text-white border-[#071324]'
                          : 'bg-[#FAF8F5] text-slate-700 border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <span>{kw.label[lang]}</span>
                      <span className="ms-1.5 opacity-75 font-mono-num">
                        ({kw.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Review Cards */}
            <div className="space-y-4">
              {filteredReviews.map((rev) => {
                const isHelpfulClicked = helpfulClickedIds.includes(rev.id);
                return (
                  <article
                    key={rev.id}
                    className="bg-white rounded-xl border border-slate-200/80 p-6 space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-[#071324]">
                          {rev.author[lang]}
                        </h3>
                        {/* Zero-Pill Unboxed Metadata with · separators */}
                        <div className="text-xs text-slate-500 mt-0.5">
                          <span>{rev.badge[lang]}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{rev.serviceType[lang]}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{rev.date[lang]}</span>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-0.5 text-[#D97706]"
                        aria-label={`${rev.rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rev.rating
                                ? 'fill-[#D97706] text-[#D97706]'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      {rev.text[lang]}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                      <div>
                        <strong className="text-slate-700">
                          {lang === 'ar' ? 'الأصناف المجربة:' : 'Ordered:'}
                        </strong>{' '}
                        <span>{rev.orderedDishes[lang]}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleHelpful(rev.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border transition-colors cursor-pointer ${
                          isHelpfulClicked
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'ar' ? 'مفيد' : 'Helpful'} (
                          <span className="font-mono-num">{rev.helpfulCount}</span>
                          )
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
