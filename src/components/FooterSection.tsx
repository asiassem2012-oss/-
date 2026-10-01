import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Navigation,
} from 'lucide-react';
import { Language, RESTAURANT_INFO } from '../data/restaurantData';

interface FooterSectionProps {
  lang: Language;
  onOpenMenu: () => void;
  onOpenBooking: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  lang,
  onOpenMenu,
  onOpenBooking,
}) => {
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);

  const handleCopyPlusCode = () => {
    navigator.clipboard?.writeText(RESTAURANT_INFO.plusCode[lang]);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="bg-[#071324] text-[#FAF8F5] border-t border-white/10"
    >
      {/* Interactive Map & Branch Information Showcase */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact & Location Details Card */}
          <div className="lg:col-span-5 bg-[#0F2137] border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-semibold text-[#E59849]">
                {lang === 'ar'
                  ? '05 · الموقع والتواصل المباشر'
                  : '05 · Location & Direct Contact'}
              </div>
              <h2 className="text-2xl font-bold font-display text-white balance-text">
                {RESTAURANT_INFO.fullName[lang]}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'ar'
                  ? 'فرع شارع قناة السويس الرئيسي بالمنصورة — صالات عائلية مكيفة، استلام فوري للسيارة، وتوصيل سريع بدون تلامس.'
                  : 'Main Suez Canal Street branch in Mansoura — air-conditioned family dining halls, curbside pickup, and fast contactless delivery.'}
              </p>

              <div className="pt-2 space-y-4 divide-y divide-white/10">
                {/* Address */}
                <div className="pt-3 first:pt-0 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E59849] shrink-0 mt-1" />
                  <div className="text-xs space-y-1">
                    <div className="text-slate-400">
                      {lang === 'ar' ? 'العنوان بالتفصيل:' : 'Branch Address:'}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {RESTAURANT_INFO.address[lang]}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-mono-num text-[#E59849] font-semibold">
                        {RESTAURANT_INFO.plusCode[lang]}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyPlusCode}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      >
                        {copiedPlusCode ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{lang === 'ar' ? 'نسخ الكود' : 'Copy Code'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="pt-3 flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#E59849] shrink-0 mt-1" />
                  <div className="text-xs space-y-1">
                    <div className="text-slate-400">
                      {lang === 'ar'
                        ? 'رقم الهاتف للحجز والطلبات:'
                        : 'Reservations & Delivery Hotline:'}
                    </div>
                    <a
                      href={RESTAURANT_INFO.phoneHref}
                      className="text-lg font-bold font-mono-num text-white hover:text-[#E59849] transition-colors inline-block"
                    >
                      {RESTAURANT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="pt-3 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#E59849] shrink-0 mt-1" />
                  <div className="text-xs space-y-1">
                    <div className="text-slate-400">
                      {lang === 'ar' ? 'مواعيد العمل الرسمية:' : 'Operating Hours:'}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {RESTAURANT_INFO.hoursText[lang]}
                    </div>
                    <div className="text-slate-300">
                      {lang === 'ar'
                        ? 'الجلوس داخل المكان · الإيصال إلى السيارة · التسليم بدون تلامس'
                        : 'Dine-in · Curbside pickup · Contactless delivery'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#C86412] hover:bg-[#b0550c] rounded-lg transition-colors whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ar'
                    ? 'الاتجاهات على خرائط جوجل'
                    : 'Get Directions on Maps'}
                </span>
              </a>

              <a
                href={RESTAURANT_INFO.digitalMenuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors whitespace-nowrap font-mono-num"
              >
                <span>{RESTAURANT_INFO.digitalMenuDomain}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E59849]" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7 bg-[#0F2137] border border-white/10 rounded-xl overflow-hidden flex flex-col min-h-[380px]">
            <div className="px-5 py-3.5 bg-[#0A182B] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="font-semibold text-white">
                {lang === 'ar'
                  ? 'خريطة موقع فرع شارع قناة السويس · المنصورة (قسم 2)'
                  : 'Interactive Map · Suez Canal St., Mansoura (Qism 2)'}
              </div>
              <span className="font-mono-num text-slate-300">
                31.0489° N, 31.3988° E · 29XW+PG
              </span>
            </div>

            <div className="relative flex-1 w-full bg-[#0A182B]">
              <iframe
                title={
                  lang === 'ar'
                    ? 'موقع مطاعم الصباحي بشارع قناة السويس بالمنصورة'
                    : 'El-Sabahi Seafood Restaurant Map Location in Mansoura'
                }
                src="https://www.google.com/maps?q=Suez+Canal+Street+Mansoura+Egypt+El+Sabahi&hl=ar&z=16&output=embed"
                className="w-full h-full min-h-[340px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Quiet Footer Bar */}
      <div className="border-t border-white/10 bg-[#050E1B]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-white text-sm font-display">
              {RESTAURANT_INFO.name[lang]}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {lang === 'ar'
                ? 'جميع الحقوق محفوظة © مطاعم الصباحي للمأكولات البحرية والمشويات - المنصورة'
                : '© El-Sabahi Seafood & Charcoal Grill Restaurant - Mansoura. All rights reserved.'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={onOpenMenu}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'المنيو الرقمي' : 'Digital Menu'}
            </button>
            <button
              type="button"
              onClick={onOpenBooking}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'حجز طاولة / طلب للسيارة' : 'Book Table / Curbside'}
            </button>
            <a
              href={RESTAURANT_INFO.phoneHref}
              className="font-mono-num hover:text-white transition-colors"
            >
              {RESTAURANT_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
