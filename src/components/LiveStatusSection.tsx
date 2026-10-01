import React, { useState } from 'react';
import { Clock, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import {
  Language,
  RESTAURANT_INFO,
  WEEKLY_BUSY_SCHEDULE,
} from '../data/restaurantData';

interface LiveStatusSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const LiveStatusSection: React.FC<LiveStatusSectionProps> = ({
  lang,
  onOpenBooking,
}) => {
  // Determine current day and hour for realistic live state
  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentHour24 = now.getHours();

  // Operating hours: 11:00 AM (11) to 2:00 AM (2)
  const isOpenNow = currentHour24 >= 11 || currentHour24 < 2;

  const initialSchedule =
    WEEKLY_BUSY_SCHEDULE.find((d) => d.dayIndex === currentDayIndex) ||
    WEEKLY_BUSY_SCHEDULE[4]; // fallback to Thursday

  const [selectedDayId, setSelectedDayId] = useState<string>(initialSchedule.id);
  const [selectedHour24, setSelectedHour24] = useState<number>(
    currentHour24 >= 11
      ? currentHour24
      : currentHour24 === 0
      ? 24
      : currentHour24 === 1
      ? 25
      : 20 // Default highlight 8:00 PM peak dinner
  );

  const activeDay =
    WEEKLY_BUSY_SCHEDULE.find((d) => d.id === selectedDayId) ||
    WEEKLY_BUSY_SCHEDULE[0];

  const activeHourSlot =
    activeDay.hours.find((h) => h.hour24 === selectedHour24) ||
    activeDay.hours[9]; // 8 PM default

  return (
    <section
      id="hours-status"
      className="py-20 bg-[#071324] text-[#FAF8F5] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs text-[#E59849] font-medium tracking-wide">
              {lang === 'ar'
                ? '02 · حالة المطعم المباشرة وأوقات الذروة'
                : '02 · Live Occupancy & Operating Hours'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white balance-text">
              {lang === 'ar'
                ? 'مؤشر الزحمة المباشر وخيارات الخدمة بفرع قناة السويس'
                : 'Real-Time Busy Hours & Service Options on Suez Canal St.'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'يستقبل مطعم الصباحي زواره يومياً من الساعة 11:00 صباحاً وحتى 2:00 صباحاً. خطط لزيارتك العائلية أو اطلب خدمة الإيصال السريع للسيارة في أوقات الذروة.'
                : 'El-Sabahi welcomes guests daily from 11:00 AM until 2:00 AM. Plan your family table visit or schedule Curbside Pickup during evening peak hours.'}
            </p>
          </div>

          {/* Live Status Indicator Box */}
          <div className="bg-[#0F2137] border border-white/10 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
                aria-hidden="true"
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E59849]" />
                  <span>
                    {isOpenNow
                      ? lang === 'ar'
                        ? 'مفتوح الآن · يستقبل الطلبات'
                        : 'Open Now · Accepting Orders'
                      : lang === 'ar'
                      ? 'يفتح الساعة 11:00 صباحاً'
                      : 'Opens at 11:00 AM'}
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5 font-mono-num">
                  {RESTAURANT_INFO.hoursText[lang]}
                </div>
              </div>
            </div>

            <div className="sm:border-s sm:border-white/10 sm:ps-4 text-xs text-slate-300">
              <div>{lang === 'ar' ? 'كود بلس للوصول:' : 'Map Plus Code:'}</div>
              <div className="font-mono-num font-semibold text-white mt-0.5">
                {RESTAURANT_INFO.plusCode[lang]}
              </div>
            </div>
          </div>
        </div>

        {/* Main Interactive Grid: Busy Chart (Left/Start) + Service Modes & Wait Times (Right/End) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Popular Times Chart */}
          <div className="lg:col-span-7 bg-[#0F2137] border border-white/10 rounded-xl p-6 space-y-6">
            {/* Day Selector Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'ar'
                    ? 'الأوقات الأكثر ازدحاماً خلال الأسبوع'
                    : 'Popular Hours Across the Week'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {activeDay.peakSummary[lang]}
                </p>
              </div>

              <div
                className="flex items-center gap-1 p-1 bg-[#071324] rounded-lg border border-white/10 overflow-x-auto"
                role="tablist"
                aria-label={lang === 'ar' ? 'أيام الأسبوع' : 'Days of the week'}
              >
                {WEEKLY_BUSY_SCHEDULE.map((day) => {
                  const isSelected = day.id === selectedDayId;
                  return (
                    <button
                      key={day.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedDayId(day.id)}
                      className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#C86412] text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {day.label[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Hour Live Readout */}
            <div className="p-4 rounded-lg bg-[#071324]/80 border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400">
                  {lang === 'ar'
                    ? `توقعات الحركة ليوم ${activeDay.label.ar} الساعة ${activeHourSlot.hourLabel.ar}`
                    : `Estimated activity for ${activeDay.label.en} at ${activeHourSlot.hourLabel.en}`}
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {activeHourSlot.statusText[lang]}
                </div>
              </div>
              <div className="text-end font-mono-num">
                <span className="text-xl font-bold text-[#E59849]">
                  {activeHourSlot.occupancy}%
                </span>
                <span className="block text-[11px] text-slate-400">
                  {lang === 'ar' ? 'نسبة الإشغال التقديرية' : 'Estimated Capacity'}
                </span>
              </div>
            </div>

            {/* Bar Chart (11 AM to 1 AM) */}
            <div className="pt-4">
              <div className="grid grid-cols-15 gap-1.5 sm:gap-2 items-end h-44 pt-4 px-1 border-b border-white/10">
                {activeDay.hours.map((slot) => {
                  const isSelectedHour = slot.hour24 === selectedHour24;
                  const isHighPeak = slot.occupancy >= 80;
                  return (
                    <button
                      key={slot.hour24}
                      type="button"
                      onClick={() => setSelectedHour24(slot.hour24)}
                      className="group flex flex-col items-center justify-end h-full w-full focus:outline-none cursor-pointer"
                      aria-label={`${slot.hourLabel[lang]}: ${slot.occupancy}%`}
                    >
                      <span
                        className={`text-[10px] font-mono-num mb-1.5 transition-opacity ${
                          isSelectedHour
                            ? 'opacity-100 text-[#E59849] font-bold'
                            : 'opacity-0 group-hover:opacity-100 text-slate-300'
                        }`}
                      >
                        {slot.occupancy}%
                      </span>
                      <div
                        className={`w-full rounded-t-sm transition-transform duration-150 group-hover:scale-y-105 ${
                          isSelectedHour
                            ? 'bg-[#C86412]'
                            : isHighPeak
                            ? 'bg-[#E59849]/75 group-hover:bg-[#E59849]'
                            : 'bg-slate-500/50 group-hover:bg-slate-400'
                        }`}
                        style={{ height: `${Math.max(slot.occupancy, 12)}%` }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* X-Axis Hour Labels */}
              <div className="grid grid-cols-15 gap-1.5 sm:gap-2 pt-2 text-center">
                {activeDay.hours.map((slot, index) => {
                  const isSelectedHour = slot.hour24 === selectedHour24;
                  // Show every label on desktop, every 2nd label on narrow screens
                  const hideOnMobile = index % 2 !== 0 && !isSelectedHour;
                  return (
                    <div
                      key={slot.hour24}
                      className={`text-[10px] font-mono-num whitespace-nowrap ${
                        isSelectedHour
                          ? 'text-[#E59849] font-bold'
                          : 'text-slate-400'
                      } ${hideOnMobile ? 'hidden sm:block' : 'block'}`}
                    >
                      {slot.hourLabel[lang]}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend & Wait Times */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#C86412]" />
                  <span>{lang === 'ar' ? 'الساعة المحددة' : 'Selected Hour'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#E59849]/75" />
                  <span>{lang === 'ar' ? 'ساعات الذروة (80%+)' : 'Peak Hours (80%+)'}</span>
                </span>
              </div>

              <div className="font-mono-num text-slate-300">
                {lang === 'ar'
                  ? `متوسط الانتظار للصالة: ${activeDay.avgWaitMinutes.dineIn} د · للسيارة: ${activeDay.avgWaitMinutes.curbside} د`
                  : `Avg wait · Dine-in: ${activeDay.avgWaitMinutes.dineIn}m · Curbside: ${activeDay.avgWaitMinutes.curbside}m`}
              </div>
            </div>
          </div>

          {/* Service Options & Branch Details Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0F2137] border border-white/10 rounded-xl p-6 space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'ar'
                    ? 'خيارات الخدمة المتاحة يومياً'
                    : 'Available Daily Service Options'}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {lang === 'ar'
                    ? 'اختر الطريقة الأنسب لك للاستمتاع بأشهى الأسماك والمشويات من فرع شارع قناة السويس'
                    : 'Choose your preferred way to enjoy fresh seafood and charcoal grill from our Suez Canal St. branch'}
                </p>
              </div>

              <div className="space-y-3">
                {RESTAURANT_INFO.serviceOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="p-4 rounded-lg bg-[#071324]/70 border border-white/10 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E59849] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white">
                        {opt.title[lang]}
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {opt.desc[lang]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-[#E59849] shrink-0 mt-0.5" />
                  <span>
                    {RESTAURANT_INFO.address[lang]} ·{' '}
                    <strong className="text-white font-mono-num">
                      {RESTAURANT_INFO.plusCode[lang]}
                    </strong>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-[#C86412] hover:bg-[#b0550c] rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer"
                  >
                    {lang === 'ar'
                      ? 'حجز طاولة أو طلب للسيارة'
                      : 'Book Table or Curbside Order'}
                  </button>
                  <a
                    href={RESTAURANT_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors whitespace-nowrap font-mono-num"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E59849]" />
                    <span>{RESTAURANT_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
