/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Phone,
  MapPin,
  Star,
  BookOpen,
  ShoppingBag,
  Menu,
  X,
  Plus,
  Check,
  ExternalLink,
} from 'lucide-react';
import {
  IMAGES,
  Language,
  MENU_CATEGORIES,
  MENU_HIGHLIGHTS,
  MenuCategoryKey,
  RESTAURANT_INFO,
} from './data/restaurantData';
import { ResilientImage } from './components/ResilientImage';
import { DigitalMenuDrawer, OrderItem } from './components/DigitalMenuDrawer';
import { LiveStatusSection } from './components/LiveStatusSection';
import { MediaGallerySection } from './components/MediaGallerySection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [selectedMenuCat, setSelectedMenuCat] =
    useState<MenuCategoryKey>('all');
  const [selectedPreps, setSelectedPreps] = useState<Record<string, string>>(
    {}
  );
  const [addedFeedbackId, setAddedFeedbackId] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Interactive Digital Menu & Order Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerInitialTab, setDrawerInitialTab] = useState<'menu' | 'checkout'>(
    'menu'
  );
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Synchronize HTML dir & lang attributes for full RTL / LTR support
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.dir = lang === 'ar' ? 'rtl' : 'ltr';
    htmlEl.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleAddOrderItem = (newItem: Omit<OrderItem, 'quantity'>) => {
    setOrderItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === newItem.id && item.preparation === newItem.preparation
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });

    setAddedFeedbackId(newItem.id);
    setTimeout(() => {
      setAddedFeedbackId((prev) => (prev === newItem.id ? null : prev));
    }, 1400);
  };

  const handleUpdateQuantity = (
    id: string,
    preparation: string,
    delta: number
  ) => {
    setOrderItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.preparation === preparation
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const openMenuDrawer = (tab: 'menu' | 'checkout' = 'menu') => {
    setDrawerInitialTab(tab);
    setDrawerOpen(true);
  };

  const totalOrderCount = orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const filteredMenuHighlights =
    selectedMenuCat === 'all'
      ? MENU_HIGHLIGHTS
      : MENU_HIGHLIGHTS.filter((item) => item.category === selectedMenuCat);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0B192C]">
      {/* Top Bar Contract: Strictly 1 row, 3 zones (Brand Wordmark — 5 Clean Nav Links — Primary Actions) */}
      <header className="sticky top-0 z-40 bg-[#071324]/95 backdrop-blur-md border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element Brand Wordmark */}
          <a
            href="#hero"
            className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white whitespace-nowrap shrink-0"
          >
            {RESTAURANT_INFO.name[lang]}
          </a>

          {/* Zone 2: 5 Clean Text Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-200"
            aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary Navigation'}
          >
            <a
              href="#hero"
              className="hover:text-white hover:underline underline-offset-8 decoration-[#E59849] transition-colors whitespace-nowrap"
            >
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </a>
            <a
              href="#menu"
              className="hover:text-white hover:underline underline-offset-8 decoration-[#E59849] transition-colors whitespace-nowrap"
            >
              {lang === 'ar' ? 'قائمة المأكولات' : 'Menu'}
            </a>
            <a
              href="#hours-status"
              className="hover:text-white hover:underline underline-offset-8 decoration-[#E59849] transition-colors whitespace-nowrap"
            >
              {lang === 'ar' ? 'أوقات العمل' : 'Hours'}
            </a>
            <a
              href="#gallery"
              className="hover:text-white hover:underline underline-offset-8 decoration-[#E59849] transition-colors whitespace-nowrap"
            >
              {lang === 'ar' ? 'المعرض' : 'Gallery'}
            </a>
            <a
              href="#reviews"
              className="hover:text-white hover:underline underline-offset-8 decoration-[#E59849] transition-colors whitespace-nowrap"
            >
              {lang === 'ar' ? 'التقييمات' : 'Reviews'}
            </a>
            <a
              href="#contact"
              className="hidden lg:inline-block hover:text-white hover:underline underline-offset-8 decoration-[#E59849] transition-colors whitespace-nowrap"
            >
              {lang === 'ar' ? 'اتصل بنا' : 'Contact'}
            </a>
          </nav>

          {/* Zone 3: 1-2 Primary Actions (Language Toggle + Digital Menu / Order CTA) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              aria-label={
                lang === 'ar'
                  ? 'Switch interface to English'
                  : 'التحويل إلى اللغة العربية'
              }
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>

            <button
              type="button"
              onClick={() =>
                openMenuDrawer(totalOrderCount > 0 ? 'checkout' : 'menu')
              }
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#C86412] hover:bg-[#b0550c] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              {totalOrderCount > 0 ? (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar'
                      ? `سلة الطلب (${totalOrderCount})`
                      : `Order Tray (${totalOrderCount})`}
                  </span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar' ? 'عرض المنيو الرقمي' : 'View Digital Menu'}
                  </span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={lang === 'ar' ? 'فتح القائمة' : 'Toggle Menu'}
            >
              {mobileNavOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileNavOpen && (
          <div className="md:hidden bg-[#0A192F] border-t border-white/10 px-6 py-4 space-y-3">
            <div className="flex flex-col space-y-2.5 text-sm font-medium text-slate-200">
              <a
                href="#hero"
                onClick={() => setMobileNavOpen(false)}
                className="py-1 hover:text-white"
              >
                {lang === 'ar' ? 'الرئيسية' : 'Home'}
              </a>
              <a
                href="#menu"
                onClick={() => setMobileNavOpen(false)}
                className="py-1 hover:text-white"
              >
                {lang === 'ar' ? 'قائمة المأكولات البحرية والمشويات' : 'Seafood & Grill Menu'}
              </a>
              <a
                href="#hours-status"
                onClick={() => setMobileNavOpen(false)}
                className="py-1 hover:text-white"
              >
                {lang === 'ar' ? 'أوقات العمل وحالة الزحمة' : 'Hours & Live Status'}
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileNavOpen(false)}
                className="py-1 hover:text-white"
              >
                {lang === 'ar' ? 'معرض الصور' : 'Media Gallery'}
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileNavOpen(false)}
                className="py-1 hover:text-white"
              >
                {lang === 'ar' ? 'المراجعات والتقييمات (4.4 ★)' : 'Customer Reviews (4.4 ★)'}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileNavOpen(false)}
                className="py-1 hover:text-white"
              >
                {lang === 'ar' ? 'الموقع واتصل بنا' : 'Location & Contact'}
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section
          id="hero"
          className="relative bg-[#071324] text-white overflow-hidden"
        >
          {/* Background 16:9 Culinary Feast Photography */}
          <div className="absolute inset-0">
            <ResilientImage
              src={IMAGES.hero}
              alt={RESTAURANT_INFO.fullName[lang]}
              className="w-full h-full object-cover object-center"
            />
            {/* Measured Contrast Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-[#071324]/80 to-[#071324]/60" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-14 lg:pt-24 lg:pb-20">
            <div className="max-w-3xl space-y-6">
              {/* Unboxed Metadata Line with · separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-200 font-medium">
                <span className="inline-flex items-center gap-1 text-[#E59849] font-bold font-mono-num">
                  <Star className="w-4 h-4 fill-[#E59849] text-[#E59849]" />
                  <span>{RESTAURANT_INFO.rating}</span>
                </span>
                <span>
                  {lang === 'ar'
                    ? `(${RESTAURANT_INFO.totalReviews.toLocaleString()}+ مراجعة موثقة)`
                    : `(${RESTAURANT_INFO.totalReviews.toLocaleString()}+ verified reviews)`}
                </span>
                <span aria-hidden="true">·</span>
                <span>{RESTAURANT_INFO.specialty[lang]}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {lang === 'ar'
                    ? 'شارع قناة السويس، المنصورة'
                    : 'Suez Canal St., Mansoura'}
                </span>
              </div>

              {/* Expressive Display Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold font-display leading-[1.15] tracking-tight text-white balance-text">
                {lang === 'ar'
                  ? 'مطاعم الصباحي — أصالة المأكولات البحرية الطازجة والمشويات المصرية بالمنصورة'
                  : 'El-Sabahi — Mansoura’s Landmark for Fresh Mediterranean Seafood & Charcoal Grill'}
              </h1>

              {/* Concrete Value Proposition */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                {lang === 'ar'
                  ? 'منذ سنوات في قلب شارع قناة السويس بالمنصورة، نقدم لكم صيد اليوم من الأسماك السنجاري والجمبري الجامبو والاستاكوزا وطواجن فواكه البحر بالموزاريلا، إلى جانب المشويات الشرقية والحمام المحشي على الفحم الحي.'
                  : 'Located in the heart of Suez Canal Street, Mansoura, we serve daily wild-caught Singari fish, jumbo tiger prawns, lobster, and mozzarella clay-pot tagines alongside live-charcoal Egyptian kebabs and stuffed pigeon.'}
              </p>

              {/* Quick Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openMenuDrawer('menu')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#C86412] hover:bg-[#b0550c] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-lg"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {lang === 'ar'
                      ? 'المنيو الرقمي والطلب السريع'
                      : 'Digital Menu & Quick Order'}
                  </span>
                </button>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-colors whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4 text-[#E59849]" />
                  <span>
                    {lang === 'ar'
                      ? 'موقعنا على الخريطة'
                      : 'Location on Map'}
                  </span>
                </a>

                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-colors whitespace-nowrap font-mono-num"
                >
                  <Phone className="w-4 h-4 text-[#E59849]" />
                  <span>
                    {lang === 'ar'
                      ? `الاتصال السريع: ${RESTAURANT_INFO.phoneDisplay}`
                      : `Call: ${RESTAURANT_INFO.phoneDisplay}`}
                  </span>
                </a>
              </div>
            </div>

            {/* Claim-to-Proof Adjacency Bar */}
            <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold font-mono-num text-[#E59849]">
                  ★ 4.4 / 5.0
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {lang === 'ar'
                    ? 'أكثر من 5,296 مراجعة وتقييم حقيقي من العملاء'
                    : 'Over 5,296 verified guest reviews on Maps'}
                </div>
              </div>

              <div>
                <div className="text-2xl font-bold font-mono-num text-white">
                  11:00 – 02:00
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {lang === 'ar'
                    ? 'يفتح يومياً من 11:00 صباحاً حتى 2:00 بعد منتصف الليل'
                    : 'Open daily from 11:00 AM until 2:00 AM'}
                </div>
              </div>

              <div>
                <div className="text-lg font-bold text-white">
                  {lang === 'ar'
                    ? 'صالة · إيصال للسيارة · دليفري'
                    : 'Dine-in · Curbside · Delivery'}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {lang === 'ar'
                    ? 'الجلوس داخل المكان، الإيصال للسيارة، والتسليم بدون تلامس'
                    : 'Full family hall, car-window pickup & contactless delivery'}
                </div>
              </div>

              <div>
                <div className="text-lg font-bold font-mono-num text-white">
                  {RESTAURANT_INFO.plusCode[lang]}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {lang === 'ar'
                    ? 'شارع قناة السويس، المنصورة (قسم 2)، الدقهلية'
                    : 'Suez Canal St., Mansoura (Qism 2), Dakahlia'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SEAFOOD & GRILL MENU HIGHLIGHTS SECTION */}
        <section id="menu" className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Heading & Digital Menu Link */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl space-y-2">
                <div className="text-xs font-semibold text-[#C86412]">
                  {lang === 'ar'
                    ? '01 · قائمة الطعام والأطباق الأكثر طلباً'
                    : '01 · Menu Specialties & Signature Dishes'}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#071324] balance-text">
                  {lang === 'ar'
                    ? 'تخصصات الصباحي الستة بين المأكولات البحرية والمشويات'
                    : 'Our Six Signature Seafood & Charcoal Grill Specialties'}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {lang === 'ar'
                    ? 'اختر طريقة الطهي المفضلة لديك وأضف أطباقك مباشرة لسلة الطلب أو تصفح رابط القائمة الإلكترونية l.ead.me.'
                    : 'Select your preferred preparation style and add dishes to your order tray, or explore our digital menu link at l.ead.me.'}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start lg:self-auto">
                <a
                  href={RESTAURANT_INFO.digitalMenuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#071324] bg-[#F2EFE9] hover:bg-slate-200 rounded-lg border border-slate-200/80 transition-colors whitespace-nowrap"
                >
                  <span>
                    {lang === 'ar'
                      ? `رابط المنيو: ${RESTAURANT_INFO.digitalMenuDomain}`
                      : `Menu Link: ${RESTAURANT_INFO.digitalMenuDomain}`}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C86412]" />
                </a>

                <button
                  type="button"
                  onClick={() => openMenuDrawer('menu')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#071324] hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  {lang === 'ar' ? 'فتح القائمة الكاملة' : 'Full Interactive Menu'}
                </button>
              </div>
            </div>

            {/* Interactive Category Filter Bar */}
            <div
              className="flex items-center gap-1.5 p-1.5 bg-[#F2EFE9] rounded-xl border border-slate-200/80 mb-10 overflow-x-auto"
              role="tablist"
              aria-label={
                lang === 'ar' ? 'أقسام قائمة الطعام' : 'Menu categories'
              }
            >
              {MENU_CATEGORIES.map((cat) => {
                const isActive = selectedMenuCat === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedMenuCat(cat.key)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#071324] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#071324]'
                    }`}
                  >
                    {cat.label[lang]}
                  </button>
                );
              })}
            </div>

            {/* 3-Column Featured Menu Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMenuHighlights.map((item) => {
                const currentPrep =
                  selectedPreps[item.id] || item.preparations[lang][0];
                const primaryDish = item.signatureDishes[0];
                const isJustAdded = addedFeedbackId === item.id;

                return (
                  <article
                    key={item.id}
                    className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    <div>
                      {/* 4:3 Dish Photography */}
                      <div className="relative aspect-4/3 bg-[#071324] overflow-hidden">
                        <ResilientImage
                          src={item.image}
                          alt={item.title[lang]}
                          fallbackTitle={item.title[lang]}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-3 start-4 end-4 flex items-center justify-between text-xs text-white">
                          <span className="font-medium">
                            {item.indexNumber} · {item.popularNote[lang]}
                          </span>
                          <span className="font-mono-num font-bold text-[#FBBF24]">
                            {lang === 'ar' ? 'يبدأ من' : 'From'}{' '}
                            {item.startingPrice} {item.priceUnit[lang]}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-4">
                        {/* Unboxed Metadata Kicker */}
                        <div className="text-xs text-slate-500">
                          {item.subtitle[lang]}
                        </div>

                        <h3 className="text-lg font-bold text-[#071324] leading-snug balance-text">
                          {item.title[lang]}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.description[lang]}
                        </p>

                        {/* Interactive Preparation Style Selector */}
                        <div className="pt-1 space-y-1.5">
                          <div className="text-[11px] font-semibold text-slate-500">
                            {lang === 'ar'
                              ? 'اختر طريقة الطهي والتقديم:'
                              : 'Select Preparation Style:'}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.preparations[lang].map((prep) => {
                              const isPrepSelected = currentPrep === prep;
                              return (
                                <button
                                  key={prep}
                                  type="button"
                                  onClick={() =>
                                    setSelectedPreps((prev) => ({
                                      ...prev,
                                      [item.id]: prep,
                                    }))
                                  }
                                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                                    isPrepSelected
                                      ? 'bg-[#071324] text-white border-[#071324]'
                                      : 'bg-[#FAF8F5] text-slate-700 border-slate-200 hover:border-slate-300'
                                  }`}
                                >
                                  {prep}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Signature Examples & Tabular Prices */}
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          {item.signatureDishes.map((dish, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between gap-2 text-xs"
                            >
                              <span className="text-slate-700 font-medium truncate">
                                {dish.name[lang]}
                              </span>
                              <span className="font-mono-num font-semibold text-[#071324] whitespace-nowrap shrink-0">
                                {dish.price} {lang === 'ar' ? 'ج.م' : 'EGP'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="px-6 pb-6 pt-2 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          handleAddOrderItem({
                            id: item.id,
                            name: primaryDish.name,
                            preparation: currentPrep,
                            price: primaryDish.price,
                          })
                        }
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                          isJustAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#C86412] hover:bg-[#b0550c] text-white'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>
                              {lang === 'ar'
                                ? 'تمت الإضافة للسلة'
                                : 'Added to Tray'}
                            </span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>
                              {lang === 'ar'
                                ? `أضف (${currentPrep})`
                                : `Add (${currentPrep})`}
                            </span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => openMenuDrawer('menu')}
                        className="py-2.5 px-3 text-xs font-semibold text-[#071324] bg-[#F2EFE9] hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {lang === 'ar' ? 'كل الأصناف' : 'All Items'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. LIVE STATUS & BUSY HOURS SECTION */}
        <LiveStatusSection
          lang={lang}
          onOpenBooking={() => openMenuDrawer('checkout')}
        />

        {/* 4. MEDIA GALLERY SECTION */}
        <MediaGallerySection
          lang={lang}
          onOpenMenu={() => openMenuDrawer('menu')}
        />

        {/* 5. CUSTOMER REVIEWS SECTION */}
        <CustomerReviewsSection lang={lang} />
      </main>

      {/* 6. FOOTER & GOOGLE MAPS SECTION */}
      <FooterSection
        lang={lang}
        onOpenMenu={() => openMenuDrawer('menu')}
        onOpenBooking={() => openMenuDrawer('checkout')}
      />

      {/* INTERACTIVE DIGITAL MENU & ORDER/RESERVATION DRAWER */}
      <DigitalMenuDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lang={lang}
        orderItems={orderItems}
        onAddItem={handleAddOrderItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearOrder={handleClearOrder}
        initialTab={drawerInitialTab}
      />
    </div>
  );
}
