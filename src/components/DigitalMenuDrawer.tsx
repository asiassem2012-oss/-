import React, { useState } from 'react';
import {
  X,
  Phone,
  ExternalLink,
  Plus,
  Minus,
  CheckCircle2,
  Trash2,
  ShoppingBag,
} from 'lucide-react';
import {
  Language,
  MENU_HIGHLIGHTS,
  RESTAURANT_INFO,
} from '../data/restaurantData';

export interface OrderItem {
  id: string;
  name: { ar: string; en: string };
  preparation: string;
  price: number;
  quantity: number;
}

interface DigitalMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  orderItems: OrderItem[];
  onAddItem: (item: Omit<OrderItem, 'quantity'>) => void;
  onUpdateQuantity: (id: string, preparation: string, delta: number) => void;
  onClearOrder: () => void;
  initialTab?: 'menu' | 'checkout';
}

export const DigitalMenuDrawer: React.FC<DigitalMenuDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  orderItems,
  onAddItem,
  onUpdateQuantity,
  onClearOrder,
  initialTab = 'menu',
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'checkout'>(initialTab);
  const [serviceMode, setServiceMode] = useState<'dine_in' | 'curbside' | 'delivery'>('dine_in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceDetail, setServiceDetail] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const trimmedName = customerName.trim();
    const cleanedPhone = customerPhone.replace(/\s+/g, '');

    if (!trimmedName) {
      setFormError(
        lang === 'ar'
          ? 'يرجى إدخال الاسم الكامل لتأكيد الطلب أو الحجز.'
          : 'Please enter your full name to confirm the order or reservation.'
      );
      return;
    }

    if (!/^[0-9+]{8,15}$/.test(cleanedPhone)) {
      setFormError(
        lang === 'ar'
          ? 'يرجى إدخال رقم هاتف صحيح للتواصل (مثال: 010xxxxxxx).'
          : 'Please enter a valid phone number (e.g., 010xxxxxxx).'
      );
      return;
    }

    if (!serviceDetail.trim()) {
      setFormError(
        lang === 'ar'
          ? serviceMode === 'dine_in'
            ? 'يرجى تحديد عدد الأفراد وموعد الحضور.'
            : serviceMode === 'curbside'
            ? 'يرجى كتابة نوع ولون السيارة أو رقم اللوحة للإيصال السريع.'
            : 'يرجى إدخال عنوان التوصيل بالتفصيل في المنصورة.'
          : serviceMode === 'dine_in'
          ? 'Please specify party size and arrival time.'
          : serviceMode === 'curbside'
          ? 'Please enter vehicle model/color for Curbside Pickup.'
          : 'Please enter your full delivery address in Mansoura.'
      );
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setConfirmedRef(`SBH-${randomNum}`);
  };

  const resetConfirmation = () => {
    setConfirmedRef(null);
    onClearOrder();
    setCustomerName('');
    setCustomerPhone('');
    setServiceDetail('');
    setNotes('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#071324]/70 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'ar' ? 'المنيو الرقمي والطلب السريع' : 'Digital Menu & Quick Order'}
    >
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] text-[#0B192C] h-full flex flex-col shadow-2xl border-s border-slate-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#071324] text-white border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold tracking-tight">
              {lang === 'ar'
                ? 'المنيو الرقمي التفاعلي · مطاعم الصباحي'
                : 'Interactive Digital Menu · El-Sabahi'}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === 'ar'
                ? `الرابط الرسمي: ${RESTAURANT_INFO.digitalMenuDomain} · خط الطلبات: ${RESTAURANT_INFO.phoneDisplay}`
                : `Official Menu: ${RESTAURANT_INFO.digitalMenuDomain} · Hotline: ${RESTAURANT_INFO.phoneDisplay}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#F2EFE9] border-b border-slate-200/80">
          <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200/80">
            <button
              type="button"
              onClick={() => setActiveTab('menu')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-[#071324] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ar' ? 'تصفح الأصناف والأسعار' : 'Browse Menu & Prices'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('checkout')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'checkout'
                  ? 'bg-[#C86412] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ar'
                ? `سلة الطلب والحجز (${totalCount})`
                : `Order & Booking Tray (${totalCount})`}
            </button>
          </div>

          <a
            href={RESTAURANT_INFO.digitalMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C86412] hover:underline whitespace-nowrap"
          >
            <span className="font-mono-num">{RESTAURANT_INFO.digitalMenuDomain}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {confirmedRef ? (
            <div className="bg-white border border-emerald-200 rounded-xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#071324]">
                {lang === 'ar'
                  ? 'تم تسجيل طلبك / حجزك بنجاح!'
                  : 'Order / Reservation Confirmed!'}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {lang === 'ar'
                  ? `رقم المرجع الخاص بك هو ${confirmedRef}. سيتواصل معك قسم خدمة العملاء بفرع قناة السويس خلال دقائق لتأكيد التحضير.`
                  : `Your reference code is ${confirmedRef}. Our Suez Canal St. branch team will contact you shortly to finalize preparation.`}
              </p>
              <div className="p-4 bg-[#FAF8F5] rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1 text-start">
                <div>
                  <strong>{lang === 'ar' ? 'العميل:' : 'Customer:'}</strong> {customerName} ({customerPhone})
                </div>
                <div>
                  <strong>{lang === 'ar' ? 'نوع الخدمة:' : 'Service Type:'}</strong>{' '}
                  {serviceMode === 'dine_in'
                    ? lang === 'ar'
                      ? 'الجلوس داخل المكان (Dine-in)'
                      : 'Dine-in'
                    : serviceMode === 'curbside'
                    ? lang === 'ar'
                      ? 'الإيصال إلى السيارة (Curbside Pickup)'
                      : 'Curbside Pickup'
                    : lang === 'ar'
                    ? 'التسليم بدون تلامس (Contactless Delivery)'
                    : 'Contactless Delivery'}
                </div>
                <div>
                  <strong>{lang === 'ar' ? 'التفاصيل:' : 'Details:'}</strong> {serviceDetail}
                </div>
                {totalAmount > 0 && (
                  <div className="pt-2 border-t border-slate-200 font-semibold text-[#071324] font-mono-num">
                    {lang === 'ar' ? 'إجمالي الأصناف المختارة:' : 'Estimated Total:'} {totalAmount}{' '}
                    {lang === 'ar' ? 'ج.م' : 'EGP'}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={RESTAURANT_INFO.phoneHref}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#071324] text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar'
                      ? `اتصال مباشر: ${RESTAURANT_INFO.phoneDisplay}`
                      : `Call Branch: ${RESTAURANT_INFO.phoneDisplay}`}
                  </span>
                </a>
                <button
                  type="button"
                  onClick={resetConfirmation}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'العودة للموقع' : 'Back to Website'}
                </button>
              </div>
            </div>
          ) : activeTab === 'menu' ? (
            <div className="space-y-6">
              {MENU_HIGHLIGHTS.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4"
                >
                  <div className="border-b border-slate-100 pb-3">
                    <div className="text-xs text-slate-500 font-mono-num">
                      {section.indexNumber} · {section.subtitle[lang]}
                    </div>
                    <h3 className="text-base font-bold text-[#071324] mt-0.5">
                      {section.title[lang]}
                    </h3>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {section.signatureDishes.map((dish, idx) => {
                      const defaultPrep = section.preparations[lang][0];
                      const itemId = `${section.id}-${idx}`;
                      return (
                        <div
                          key={itemId}
                          className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                        >
                          <div>
                            <div className="text-sm font-semibold text-[#0B192C]">
                              {dish.name[lang]}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5 font-mono-num">
                              {dish.price} {dish.unit[lang]}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onAddItem({
                                id: itemId,
                                name: dish.name,
                                preparation: defaultPrep,
                                price: dish.price,
                              })
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#071324] bg-[#F2EFE9] hover:bg-[#C86412] hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{lang === 'ar' ? 'إضافة للطلب' : 'Add'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order Items List */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-[#071324] flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#C86412]" />
                    <span>
                      {lang === 'ar' ? 'الأصناف المختارة' : 'Selected Dishes'}
                    </span>
                  </h3>
                  {orderItems.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearOrder}
                      className="inline-flex items-center gap-1 text-xs text-rose-600 hover:underline cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'إفراغ السلة' : 'Clear All'}</span>
                    </button>
                  )}
                </div>

                {orderItems.length === 0 ? (
                  <div className="py-6 text-center space-y-2">
                    <p className="text-xs text-slate-500">
                      {lang === 'ar'
                        ? 'لم تقم بإضافة أطباق محددة بعد — يمكنك إضافة أطباق من القائمة أو إرسال طلب حجز طاولة مباشرة أدناه.'
                        : 'No dishes selected yet — you can add items from the menu tab or submit a table reservation directly below.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('menu')}
                      className="text-xs font-semibold text-[#C86412] hover:underline cursor-pointer"
                    >
                      {lang === 'ar' ? '+ تصفح الأطباق لإضافتها' : '+ Browse Dishes to Add'}
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {orderItems.map((item) => (
                      <div
                        key={`${item.id}-${item.preparation}`}
                        className="py-3 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#0B192C]">
                            {item.name[lang]}
                          </div>
                          <div className="text-xs text-slate-500">
                            {item.preparation} ·{' '}
                            <span className="font-mono-num">
                              {item.price} {lang === 'ar' ? 'ج.م' : 'EGP'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.preparation, -1)
                            }
                            className="w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                            aria-label={lang === 'ar' ? 'تقليل الكمية' : 'Decrease quantity'}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold font-mono-num w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.preparation, 1)
                            }
                            className="w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                            aria-label={lang === 'ar' ? 'زيادة الكمية' : 'Increase quantity'}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 flex items-center justify-between text-sm font-bold text-[#071324]">
                      <span>{lang === 'ar' ? 'الإجمالي التقديري:' : 'Estimated Subtotal:'}</span>
                      <span className="font-mono-num text-base text-[#C86412]">
                        {totalAmount} {lang === 'ar' ? 'ج.م' : 'EGP'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Service Mode & Customer Form */}
              <form
                onSubmit={handleSubmitOrder}
                className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4"
              >
                <h3 className="text-sm font-bold text-[#071324]">
                  {lang === 'ar'
                    ? 'اختر طريقة الخدمة (متاح يومياً 11 ص – 2 ص)'
                    : 'Select Service Option (Daily 11 AM – 2 AM)'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceMode('dine_in')}
                    className={`p-3 rounded-lg border text-start transition-colors cursor-pointer ${
                      serviceMode === 'dine_in'
                        ? 'border-[#C86412] bg-[#C86412]/10 text-[#071324]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">
                      {lang === 'ar' ? 'الجلوس داخل المكان' : 'Dine-in'}
                    </div>
                    <div className="text-[11px] opacity-80 mt-0.5">
                      {lang === 'ar' ? 'حجز طاولة بالفرع' : 'Table reservation'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceMode('curbside')}
                    className={`p-3 rounded-lg border text-start transition-colors cursor-pointer ${
                      serviceMode === 'curbside'
                        ? 'border-[#C86412] bg-[#C86412]/10 text-[#071324]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">
                      {lang === 'ar' ? 'الإيصال إلى السيارة' : 'Curbside Pickup'}
                    </div>
                    <div className="text-[11px] opacity-80 mt-0.5">
                      {lang === 'ar' ? 'استلام أمام الفرع' : 'Deliver to your car'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceMode('delivery')}
                    className={`p-3 rounded-lg border text-start transition-colors cursor-pointer ${
                      serviceMode === 'delivery'
                        ? 'border-[#C86412] bg-[#C86412]/10 text-[#071324]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">
                      {lang === 'ar' ? 'التسليم بدون تلامس' : 'Contactless Delivery'}
                    </div>
                    <div className="text-[11px] opacity-80 mt-0.5">
                      {lang === 'ar' ? 'توصيل لباب المنزل' : 'Home delivery'}
                    </div>
                  </button>
                </div>

                {formError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={lang === 'ar' ? 'مثال: محمد الشناوي' : 'e.g. Mohamed El-Shenawy'}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#071324]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'ar' ? 'رقم الموبايل *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="010xxxxxxxx"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#071324] font-mono-num"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {serviceMode === 'dine_in'
                      ? lang === 'ar'
                        ? 'عدد الأفراد وموعد الحضور المفضل *'
                        : 'Number of Guests & Preferred Time *'
                      : serviceMode === 'curbside'
                      ? lang === 'ar'
                        ? 'نوع ولون السيارة وموعد الوصول أمام فرع قناة السويس *'
                        : 'Vehicle Model/Color & Arrival Time on Suez Canal St. *'
                      : lang === 'ar'
                      ? 'عنوان التوصيل بالتفصيل (المنصورة) *'
                      : 'Full Delivery Address in Mansoura *'}
                  </label>
                  <input
                    type="text"
                    value={serviceDetail}
                    onChange={(e) => setServiceDetail(e.target.value)}
                    placeholder={
                      serviceMode === 'dine_in'
                        ? lang === 'ar'
                          ? 'مثال: 4 أفراد - اليوم الساعة 8:30 مساءً (صالة العائلات)'
                          : 'e.g. 4 Guests - Today at 8:30 PM (Family Hall)'
                        : serviceMode === 'curbside'
                        ? lang === 'ar'
                          ? 'مثال: كيا سبورتاج سوداء - خلال 25 دقيقة'
                          : 'e.g. Black Kia Sportage - Arriving in 25 mins'
                        : lang === 'ar'
                        ? 'مثال: شارع الجمهورية، بجوار كلية الطب، برج النيل الدور 4'
                        : 'e.g. El-Gomhoria St., Next to Faculty of Medicine, Floor 4'
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#071324]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar'
                      ? 'ملاحظات خاصة على التسوية أو التحضير (اختياري)'
                      : 'Preparation & Seasoning Notes (Optional)'}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'مثال: السمك السنجاري قليل الملح، الشوربة بدون شطة...'
                        : 'e.g. Light salt on Singari fish, extra lemon wedges...'
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#071324]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-[#C86412] hover:bg-[#b0550c] rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'ar'
                    ? 'تأكيد وإرسال الطلب لفرع قناة السويس'
                    : 'Confirm & Send to Suez Canal St. Branch'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            <span>{lang === 'ar' ? 'للحجز والطلب الهاتفي المباشر:' : 'Direct Phone Order:'}</span>{' '}
            <a
              href={RESTAURANT_INFO.phoneHref}
              className="font-bold text-[#071324] font-mono-num hover:underline"
            >
              {RESTAURANT_INFO.phoneDisplay}
            </a>
          </div>
          {activeTab === 'menu' && orderItems.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('checkout')}
              className="px-4 py-2 text-xs font-bold text-white bg-[#C86412] rounded-lg hover:bg-[#b0550c] transition-colors whitespace-nowrap cursor-pointer"
            >
              {lang === 'ar'
                ? `إتمام الطلب (${totalCount} · ${totalAmount} ج.م)`
                : `Proceed (${totalCount} items · ${totalAmount} EGP)`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
