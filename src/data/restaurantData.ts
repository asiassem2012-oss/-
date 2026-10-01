export type Language = 'ar' | 'en';

export type MenuCategoryKey =
  | 'all'
  | 'fresh_fish'
  | 'shrimp_lobster'
  | 'seafood_trays'
  | 'tagines_pasta'
  | 'oriental_grill'
  | 'soups_salads';

export type GalleryCategoryKey =
  | 'all'
  | 'latest'
  | 'food_drink'
  | 'seafood'
  | 'grill'
  | 'atmosphere';

export type ReviewKeywordKey =
  | 'all'
  | 'place'
  | 'experience'
  | 'quality'
  | 'cleanliness';

export interface MenuHighlightItem {
  id: string;
  indexNumber: string;
  category: Exclude<MenuCategoryKey, 'all'>;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  description: { ar: string; en: string };
  preparations: { ar: string[]; en: string[] };
  signatureDishes: {
    name: { ar: string; en: string };
    price: number;
    unit: { ar: string; en: string };
  }[];
  startingPrice: number;
  priceUnit: { ar: string; en: string };
  image: string;
  popularNote: { ar: string; en: string };
}

export interface GalleryItem {
  id: string;
  title: { ar: string; en: string };
  caption: { ar: string; en: string };
  categories: Exclude<GalleryCategoryKey, 'all'>[];
  image: string;
  date: { ar: string; en: string };
  contributor: { ar: string; en: string };
  aspect: 'landscape' | 'square';
}

export interface CustomerReview {
  id: string;
  author: { ar: string; en: string };
  badge: { ar: string; en: string };
  segment: 'local' | 'visitor';
  rating: number;
  date: { ar: string; en: string };
  serviceType: { ar: string; en: string };
  text: { ar: string; en: string };
  orderedDishes: { ar: string; en: string };
  keywords: Exclude<ReviewKeywordKey, 'all'>[];
  helpfulCount: number;
}

export interface DayBusySchedule {
  id: string;
  dayIndex: number; // 0 = Sunday ... 6 = Saturday
  label: { ar: string; en: string };
  peakSummary: { ar: string; en: string };
  avgWaitMinutes: { dineIn: number; curbside: number; delivery: number };
  hours: {
    hourLabel: { ar: string; en: string };
    hour24: number; // 11..25 (where 24 is 12AM, 25 is 1AM)
    occupancy: number; // 0-100
    statusText: { ar: string; en: string };
  }[];
}

export const IMAGES = {
  hero: '/src/assets/images/hero_seafood_feast_1790803347787.jpg',
  singariFish: '/src/assets/images/dish_singari_fish_1790803361059.jpg',
  shrimpLobster: '/src/assets/images/dish_shrimp_lobster_1790803370946.jpg',
  seafoodTagine: '/src/assets/images/dish_seafood_tagine_1790803381488.jpg',
  orientalGrill: '/src/assets/images/dish_oriental_grill_1790803393133.jpg',
};

export const RESTAURANT_INFO = {
  name: {
    ar: 'مطاعم الصباحي',
    en: 'El-Sabahi Seafood',
  },
  fullName: {
    ar: 'مطاعم الصباحي للمأكولات البحرية والمشويات',
    en: 'El-Sabahi Seafood & Egyptian Charcoal Grill',
  },
  specialty: {
    ar: 'مأكولات بحرية طازجة ومشويات مصرية أصيلة',
    en: 'Fresh Seafood & Authentic Egyptian Charcoal Grill',
  },
  rating: 4.4,
  totalReviews: 5296,
  phoneDisplay: '01288816288',
  phoneHref: 'tel:01288816288',
  digitalMenuDomain: 'l.ead.me',
  digitalMenuUrl: 'https://l.ead.me',
  plusCode: {
    ar: '29XW+PG المنصورة',
    en: '29XW+PG Mansoura',
  },
  address: {
    ar: 'شارع قناة السويس، المنصورة (قسم 2)، محافظة الدقهلية',
    en: 'Suez Canal St., Mansoura (Qism 2), Dakahlia Governorate, Egypt',
  },
  hoursText: {
    ar: 'يومياً من 11:00 صباحاً حتى 2:00 صباحاً',
    en: 'Open Daily · 11:00 AM – 2:00 AM',
  },
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=29XW%2BPG+Mansoura+El-Sabahi+Restaurant',
  serviceOptions: [
    {
      id: 'dine_in',
      title: { ar: 'الجلوس داخل المكان', en: 'Dine-in Service' },
      desc: {
        ar: 'صالات عائلية مكيفة بشارع قناة السويس مع ضيافة مصرية أصيلة',
        en: 'Air-conditioned family dining halls on Suez Canal St. with full table service',
      },
    },
    {
      id: 'curbside',
      title: { ar: 'الإيصال إلى السيارة', en: 'Curbside Pickup' },
      desc: {
        ar: 'استلم طلبك ساخناً مباشرة إلى سيارتك أمام الفرع دون انتظار',
        en: 'Receive your freshly prepared order directly at your vehicle outside the branch',
      },
    },
    {
      id: 'delivery',
      title: { ar: 'التسليم بدون تلامس', en: 'Contactless Delivery' },
      desc: {
        ar: 'تغليف حراري محكم يحفظ حرارة الأسماك والمشويات حتى باب منزلك',
        en: 'Thermal sealed packaging preserving freshness right to your doorstep',
      },
    },
  ],
};

export const MENU_CATEGORIES: {
  key: MenuCategoryKey;
  label: { ar: string; en: string };
}[] = [
  { key: 'all', label: { ar: 'جميع التخصصات', en: 'All Specialties' } },
  { key: 'fresh_fish', label: { ar: 'الأسماك الطازجة', en: 'Fresh Fish' } },
  { key: 'shrimp_lobster', label: { ar: 'الجمبري والاستاكوزا', en: 'Shrimp & Lobster' } },
  { key: 'seafood_trays', label: { ar: 'صواني البحريات', en: 'Seafood Trays' } },
  { key: 'tagines_pasta', label: { ar: 'الطواجن والمكرونات', en: 'Tagines & Pasta' } },
  { key: 'oriental_grill', label: { ar: 'المشويات الشرقية', en: 'Oriental Grill' } },
  { key: 'soups_salads', label: { ar: 'الشوربات والمقبلات', en: 'Soups & Salads' } },
];

export const MENU_HIGHLIGHTS: MenuHighlightItem[] = [
  {
    id: 'fresh-fish-selection',
    indexNumber: '01',
    category: 'fresh_fish',
    title: {
      ar: 'الأسماك الطازجة بمختلف طرق الطهي',
      en: 'Daily Catch Fresh Fish Selection',
    },
    subtitle: {
      ar: 'سنجاري · زيتي وليمون · مشوي ردة · مقلي مقرمش',
      en: 'Singari Baked · Olive Oil & Lemon · Bran Grilled · Crispy Fried',
    },
    description: {
      ar: 'تشكيلة يومية طازجة من أسماك البحر الأبيض المتوسط والبردويل (قاروص، دنيس، بوري، لوت، وبلطي)، تُحضّر حسب اختيارك بخلطة الصباحي السنجاري أو بالزيت والليمون والكمون.',
      en: 'Daily wild-caught Mediterranean sea bass, sea bream, grey mullet, and Nile tilapia prepared to order in our signature Singari herb stuffing or roasted with olive oil and lemon.',
    },
    preparations: {
      ar: ['سنجاري بالخضار', 'زيت وليمون وكمون', 'مشوي بالردة', 'مقلي ذهبي'],
      en: ['Singari Baked', 'Oil & Lemon', 'Bran Grilled', 'Golden Fried'],
    },
    signatureDishes: [
      {
        name: { ar: 'قاروص بحري سنجاري على الفحم', en: 'Charcoal Singari Sea Bass' },
        price: 460,
        unit: { ar: 'ج.م / وجبة', en: 'EGP / Portion' },
      },
      {
        name: { ar: 'دنيس مشوي زيت وليمون', en: 'Olive Oil & Lemon Sea Bream' },
        price: 440,
        unit: { ar: 'ج.م / وجبة', en: 'EGP / Portion' },
      },
      {
        name: { ar: 'بوري مشوي ردة بالخلطة السرية', en: 'Bran-Grilled Mullet' },
        price: 310,
        unit: { ar: 'ج.م / وجبة', en: 'EGP / Portion' },
      },
    ],
    startingPrice: 310,
    priceUnit: { ar: 'ج.م', en: 'EGP' },
    image: IMAGES.singariFish,
    popularNote: { ar: 'الأكثر طلباً للعائلات', en: 'Top Family Favorite' },
  },
  {
    id: 'shrimp-lobster-crab',
    indexNumber: '02',
    category: 'shrimp_lobster',
    title: {
      ar: 'الجمبري الجامبو والاستاكوزا والكابوريا',
      en: 'Jumbo Prawns, Lobster & Sea Crab',
    },
    subtitle: {
      ar: 'جمبري بترفلاي · استاكوزا بالزبدة · شوارب وكابوريا مشوية',
      en: 'Butterfly Prawns · Garlic Butter Lobster · Grilled Female Crab',
    },
    description: {
      ar: 'جمبري جامبو سويسي وبحري مشوي على الجريل أو بترفلاي بصوص الزبدة والثوم والأعشاب، مع استاكوزا طازجة وكابوريا مبطخة غنية بالمذاق البحري الأصيل.',
      en: 'Suez and Mediterranean jumbo tiger prawns grilled butterfly-style in garlic herb butter, served alongside whole rock lobster and roe-rich grilled sea crab.',
    },
    preparations: {
      ar: ['بترفلاي بالزبدة والثوم', 'مشوي على الجريل', 'مقلي كرسبي', 'مسلوق بالخلطة'],
      en: ['Butterfly Garlic Butter', 'Charcoal Grilled', 'Crispy Fried', 'Spiced Broth'],
    },
    signatureDishes: [
      {
        name: { ar: 'جمبري جامبو بترفلاي بالزبدة والثوم', en: 'Jumbo Butterfly Prawns' },
        price: 580,
        unit: { ar: 'ج.م / طلب', en: 'EGP / Order' },
      },
      {
        name: { ar: 'استاكوزا مشوية بالموزاريلا والزبدة', en: 'Thermidor & Butter Lobster' },
        price: 890,
        unit: { ar: 'ج.م / طلب', en: 'EGP / Order' },
      },
      {
        name: { ar: 'كابوريا نتي مشوية بالخلطة', en: 'Charcoal Grilled Sea Crab' },
        price: 340,
        unit: { ar: 'ج.م / طلب', en: 'EGP / Order' },
      },
    ],
    startingPrice: 340,
    priceUnit: { ar: 'ج.م', en: 'EGP' },
    image: IMAGES.shrimpLobster,
    popularNote: { ar: 'تخصص الصباحي المميز', en: 'House Specialty' },
  },
  {
    id: 'mixed-seafood-trays',
    indexNumber: '03',
    category: 'seafood_trays',
    title: {
      ar: 'صواني المأكولات البحرية المشكلة',
      en: 'Royal Mixed Seafood Trays',
    },
    subtitle: {
      ar: 'صينية الصباحي الملكية · أرز صيادية · تشكيلة فواكه البحر',
      en: 'Royal Family Platter · Sayadieh Rice · Assorted Catch',
    },
    description: {
      ar: 'صواني عائلية متكاملة تجمع بين السمك السنجاري والفيليه المقلي والجمبري الجامبو والكاليماري والكابوريا وبلح البحر، تقدم مع أرز الصيادية والسلطات والعيش البلدي الساخن.',
      en: 'Generous sharing platters combining Singari fish, crispy fish fillet, jumbo shrimp, calamari, mussels, and crab, served over caramelized Sayadieh rice with fresh salads.',
    },
    preparations: {
      ar: ['صينية فردية ومزدوجة', 'صينية العائلة (4 أفراد)', 'صينية الصباحي الملكية (6 أفراد)'],
      en: ['Duo Tray (2 Pax)', 'Family Tray (4 Pax)', 'Royal Feast Tray (6 Pax)'],
    },
    signatureDishes: [
      {
        name: { ar: 'صينية الصباحي المشكلة (تكفي 3-4 أفراد)', en: 'El-Sabahi Family Seafood Tray' },
        price: 1250,
        unit: { ar: 'ج.م / صينية', en: 'EGP / Tray' },
      },
      {
        name: { ar: 'صينية الملكي سي فود (تكفي 5-6 أفراد)', en: 'Royal Grand Seafood Feast' },
        price: 1890,
        unit: { ar: 'ج.م / صينية', en: 'EGP / Tray' },
      },
      {
        name: { ar: 'وجبة فواكه البحر المشكلة الفردية', en: 'Individual Mixed Seafood Box' },
        price: 420,
        unit: { ar: 'ج.م / وجبة', en: 'EGP / Box' },
      },
    ],
    startingPrice: 420,
    priceUnit: { ar: 'ج.م', en: 'EGP' },
    image: IMAGES.hero,
    popularNote: { ar: 'مثالية للعزائم والجمعات', en: 'Ideal for Gatherings' },
  },
  {
    id: 'seafood-tagines-pasta',
    indexNumber: '04',
    category: 'tagines_pasta',
    title: {
      ar: 'الطواجن والمكرونات بالمأكولات البحرية والموزاريلا',
      en: 'Clay-Pot Seafood Tagines & Mozzarella Pasta',
    },
    subtitle: {
      ar: 'طاجن جمبري وسبيط · وايت صوص · ريد صوص · موزاريلا فرن',
      en: 'Shrimp & Calamari Tagine · Creamy White Sauce · Baked Mozzarella',
    },
    description: {
      ar: 'طواجن فخارية مخبوزة في الفرن بقطع الجمبري والسبيط والفيليه والكابوريا المخلية، مغطاة بطبقة غنية من صوص الكريمة والجبن الموزاريلا الذائب.',
      en: 'Oven-baked earthenware tagines and penne pasta loaded with peeled shrimp, calamari strips, and fish fillet in rich cream sauce under a golden crust of melted mozzarella.',
    },
    preparations: {
      ar: ['وايت صوص بالموزاريلا', 'طاجن أحمر بالخلطة', 'مكرونة بنا سي فود غراتان', 'أرز سي فود بالجبنة'],
      en: ['Creamy Mozzarella Gratin', 'Spiced Tomato Tagine', 'Seafood Penne Bake', 'Cheesy Seafood Rice'],
    },
    signatureDishes: [
      {
        name: { ar: 'طاجن سي فود مكس بالكريمة والموزاريلا', en: 'Mixed Seafood Mozzarella Tagine' },
        price: 330,
        unit: { ar: 'ج.م / طاجن', en: 'EGP / Tagine' },
      },
      {
        name: { ar: 'مكرونة فواكه البحر بالوايت صوص والجبن', en: 'Creamy Seafood Pasta Gratin' },
        price: 295,
        unit: { ar: 'ج.م / طلب', en: 'EGP / Order' },
      },
      {
        name: { ar: 'طاجن سبيط وجمبري بالصلصة المصرية', en: 'Calamari & Prawn Red Tagine' },
        price: 310,
        unit: { ar: 'ج.م / طاجن', en: 'EGP / Tagine' },
      },
    ],
    startingPrice: 295,
    priceUnit: { ar: 'ج.م', en: 'EGP' },
    image: IMAGES.seafoodTagine,
    popularNote: { ar: 'طعم غني ومخبوز طازجاً', en: 'Oven-Baked Fresh' },
  },
  {
    id: 'oriental-charcoal-grill',
    indexNumber: '05',
    category: 'oriental_grill',
    title: {
      ar: 'المشويات الشرقية والحمام المحشي على الفحم',
      en: 'Authentic Oriental Charcoal Grill & Stuffed Pigeon',
    },
    subtitle: {
      ar: 'كباب وكفتة ضاني · حمام محشي بالأرز أو الفريك · طرب وريش',
      en: 'Lamb Kebab & Kofta · Stuffed Hamam · Lamb Chops & Tarb',
    },
    description: {
      ar: 'إلى جانب إبداعنا البحري، يتميز الصباحي بمشوياته المصرية الأصيلة على الفحم الحي: كباب وكفتة بلدي، ريش ضاني، وحمام محشي محمر بخلطة الأرز بالكبد والقوانص.',
      en: 'Alongside our coastal catch, El-Sabahi is celebrated for live-charcoal Egyptian grills: tender lamb kebab, spiced kofta, lamb chops, and roasted stuffed pigeon (Hamam Mahshi).',
    },
    preparations: {
      ar: ['مشوي على الفحم الحي', 'حمام محشي أرز بالخلطة', 'حمام محشي فريك صعيدي', 'مشكل مشويات الصباحي'],
      en: ['Live Charcoal Grill', 'Spiced Rice Stuffed Pigeon', 'Freekeh Stuffed Pigeon', 'Mixed Grill Platter'],
    },
    signatureDishes: [
      {
        name: { ar: 'مشكل مشويات الصباحي (كباب وكفتة وريش)', en: 'El-Sabahi Mixed Charcoal Grill' },
        price: 490,
        unit: { ar: 'ج.م / وجبة', en: 'EGP / Platter' },
      },
      {
        name: { ar: 'جوز حمام محشي بالخلطة ومحمر بالزبدة البلدي', en: 'Pair of Roasted Stuffed Pigeons' },
        price: 380,
        unit: { ar: 'ج.م / جوز', en: 'EGP / Pair' },
      },
      {
        name: { ar: 'كفتة الحاتي البلدي على الفحم', en: 'Charcoal-Grilled Baladi Kofta' },
        price: 320,
        unit: { ar: 'ج.م / وجبة', en: 'EGP / Portion' },
      },
    ],
    startingPrice: 320,
    priceUnit: { ar: 'ج.م', en: 'EGP' },
    image: IMAGES.orientalGrill,
    popularNote: { ar: 'توليفة البحر والمشويات', en: 'Surf & Charcoal Turf' },
  },
  {
    id: 'soups-salads-appetizers',
    indexNumber: '06',
    category: 'soups_salads',
    title: {
      ar: 'شوربة السي فود والسلطات والمقبلات البحرية',
      en: 'Signature Seafood Soup, Cold Mezzes & Salads',
    },
    subtitle: {
      ar: 'شوربة سي فود بالكريمة · سلطة رنجة وكافيار · طحينة وبابا غنوج',
      en: 'Creamy Seafood Soup · Smoked Herring & Roe · Tahini & Baba Ghanoush',
    },
    description: {
      ar: 'بداية مثالية لوجبتك مع شوربة السي فود الكريمية الغنية بقطع الجمبري والكابوريا المخلية والسبيط، ومجموعة سلطات الصباحي الطازجة التي تُحضر يومياً.',
      en: 'Begin your meal with our velvety seafood chowder brimming with shrimp, crab meat, and calamari, paired with house-made tahini, roasted eggplant baba ghanoush, and fresh salads.',
    },
    preparations: {
      ar: ['شوربة بالكريمة الغنية', 'شوربة سي فود سادة دايت', 'بوكس سلطات مشكلة', 'مقبلات بحرية باردة'],
      en: ['Velvety Cream Broth', 'Clear Herb Broth', 'Assorted Mezze Box', 'Cold Seafood Appetizers'],
    },
    signatureDishes: [
      {
        name: { ar: 'شوربة سي فود الصباحي بالكريمة والمخلية', en: 'El-Sabahi Creamy Boneless Seafood Soup' },
        price: 165,
        unit: { ar: 'ج.م / بولة', en: 'EGP / Bowl' },
      },
      {
        name: { ar: 'سلطة جمبري وكاليماري بالخلطة', en: 'Marinated Prawn & Calamari Salad' },
        price: 145,
        unit: { ar: 'ج.م / طبق', en: 'EGP / Plate' },
      },
      {
        name: { ar: 'تشكيلة مقبلات الصباحي (طحينة، بابا غنوج، ثومية، مخلل)', en: 'House Mezze Trio & Pickles' },
        price: 85,
        unit: { ar: 'ج.م / سرفيس', en: 'EGP / Platter' },
      },
    ],
    startingPrice: 85,
    priceUnit: { ar: 'ج.م', en: 'EGP' },
    image: IMAGES.seafoodTagine,
    popularNote: { ar: 'بداية لا غنى عنها', en: 'Essential Starter' },
  },
];

const HOURS_TEMPLATE = [
  { hour24: 11, ar: '11 ص', en: '11a' },
  { hour24: 12, ar: '12 م', en: '12p' },
  { hour24: 13, ar: '1 م', en: '1p' },
  { hour24: 14, ar: '2 م', en: '2p' },
  { hour24: 15, ar: '3 م', en: '3p' },
  { hour24: 16, ar: '4 م', en: '4p' },
  { hour24: 17, ar: '5 م', en: '5p' },
  { hour24: 18, ar: '6 م', en: '6p' },
  { hour24: 19, ar: '7 م', en: '7p' },
  { hour24: 20, ar: '8 م', en: '8p' },
  { hour24: 21, ar: '9 م', en: '9p' },
  { hour24: 22, ar: '10 م', en: '10p' },
  { hour24: 23, ar: '11 م', en: '11p' },
  { hour24: 24, ar: '12 ص', en: '12a' },
  { hour24: 25, ar: '1 ص', en: '1a' },
];

function buildHours(occupancies: number[]) {
  return HOURS_TEMPLATE.map((slot, idx) => {
    const occ = occupancies[idx] ?? 40;
    let statusText = { ar: 'هادئ نسبياً · لا يوجد انتظار', en: 'Quiet · No wait time' };
    if (occ >= 80) {
      statusText = { ar: 'وقت ذروة · مزدحم غالباً', en: 'Peak hour · Usually busy' };
    } else if (occ >= 55) {
      statusText = { ar: 'نشاط متوسط · حركة معتدلة', en: 'Moderately active' };
    }
    return {
      hourLabel: { ar: slot.ar, en: slot.en },
      hour24: slot.hour24,
      occupancy: occ,
      statusText,
    };
  });
}

export const WEEKLY_BUSY_SCHEDULE: DayBusySchedule[] = [
  {
    id: 'sat',
    dayIndex: 6,
    label: { ar: 'السبت', en: 'Saturday' },
    peakSummary: { ar: 'الذروة من 4:00 م إلى 10:00 م', en: 'Peak: 4:00 PM – 10:00 PM' },
    avgWaitMinutes: { dineIn: 10, curbside: 8, delivery: 35 },
    hours: buildHours([22, 32, 48, 65, 78, 84, 82, 76, 85, 88, 79, 64, 48, 32, 18]),
  },
  {
    id: 'sun',
    dayIndex: 0,
    label: { ar: 'الأحد', en: 'Sunday' },
    peakSummary: { ar: 'الذروة من 3:00 م إلى 9:00 م', en: 'Peak: 3:00 PM – 9:00 PM' },
    avgWaitMinutes: { dineIn: 5, curbside: 6, delivery: 30 },
    hours: buildHours([18, 28, 42, 58, 70, 74, 68, 65, 75, 78, 68, 52, 38, 25, 14]),
  },
  {
    id: 'mon',
    dayIndex: 1,
    label: { ar: 'الإثنين', en: 'Monday' },
    peakSummary: { ar: 'الذروة من 3:00 م إلى 9:00 م', en: 'Peak: 3:00 PM – 9:00 PM' },
    avgWaitMinutes: { dineIn: 5, curbside: 5, delivery: 28 },
    hours: buildHours([16, 25, 38, 54, 66, 72, 65, 62, 72, 74, 64, 48, 35, 22, 12]),
  },
  {
    id: 'tue',
    dayIndex: 2,
    label: { ar: 'الثلاثاء', en: 'Tuesday' },
    peakSummary: { ar: 'الذروة من 4:00 م إلى 9:30 م', en: 'Peak: 4:00 PM – 9:30 PM' },
    avgWaitMinutes: { dineIn: 5, curbside: 6, delivery: 30 },
    hours: buildHours([18, 28, 40, 56, 68, 75, 72, 68, 76, 80, 70, 54, 40, 26, 15]),
  },
  {
    id: 'wed',
    dayIndex: 3,
    label: { ar: 'الأربعاء', en: 'Wednesday' },
    peakSummary: { ar: 'الذروة من 4:00 م إلى 10:30 م', en: 'Peak: 4:00 PM – 10:30 PM' },
    avgWaitMinutes: { dineIn: 10, curbside: 7, delivery: 32 },
    hours: buildHours([20, 30, 45, 62, 74, 80, 78, 74, 82, 86, 78, 62, 46, 30, 18]),
  },
  {
    id: 'thu',
    dayIndex: 4,
    label: { ar: 'الخميس', en: 'Thursday' },
    peakSummary: { ar: 'الذروة من 3:00 م إلى 11:30 م (نهاية الأسبوع)', en: 'Peak: 3:00 PM – 11:30 PM (Weekend)' },
    avgWaitMinutes: { dineIn: 15, curbside: 10, delivery: 40 },
    hours: buildHours([25, 38, 55, 74, 86, 92, 90, 88, 94, 96, 92, 82, 66, 48, 28]),
  },
  {
    id: 'fri',
    dayIndex: 5,
    label: { ar: 'الجمعة', en: 'Friday' },
    peakSummary: { ar: 'الذروة من 2:00 م بعد الصلاة حتى 11:00 م', en: 'Peak: 2:00 PM – 11:00 PM' },
    avgWaitMinutes: { dineIn: 18, curbside: 10, delivery: 42 },
    hours: buildHours([24, 42, 72, 90, 96, 95, 88, 86, 92, 95, 90, 78, 62, 44, 26]),
  },
];

export const GALLERY_CATEGORIES: {
  key: GalleryCategoryKey;
  label: { ar: string; en: string };
}[] = [
  { key: 'all', label: { ar: 'الكل', en: 'All Media' } },
  { key: 'latest', label: { ar: 'أحدث الصور', en: 'Latest' } },
  { key: 'food_drink', label: { ar: 'الأطعمة والمشروبات', en: 'Food & Drinks' } },
  { key: 'seafood', label: { ar: 'المأكولات البحرية', en: 'Seafood' } },
  { key: 'grill', label: { ar: 'الكباب والمشويات', en: 'Kebab & Grill' } },
  { key: 'atmosphere', label: { ar: 'الأجواء العامة', en: 'Atmosphere' } },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: {
      ar: 'مائدة الصباحي الملكية للمأكولات البحرية والمشويات',
      en: 'El-Sabahi Royal Seafood & Charcoal Feast',
    },
    caption: {
      ar: 'تشكيلة متكاملة من السمك السنجاري والجمبري الجامبو والاستاكوزا مع المشويات الشرقية في صالة قناة السويس',
      en: 'Full spread of Singari fish, jumbo prawns, lobster, and charcoal grill at our Suez Canal St. dining hall',
    },
    categories: ['latest', 'food_drink', 'seafood', 'atmosphere'],
    image: IMAGES.hero,
    date: { ar: 'منذ يومين', en: '2 days ago' },
    contributor: { ar: 'إدارة مطاعم الصباحي', en: 'El-Sabahi Official' },
    aspect: 'landscape',
  },
  {
    id: 'gal-2',
    title: {
      ar: 'سمك قاروص سنجاري بالخلطة المصرية الأصيلة',
      en: 'Authentic Egyptian Singari Baked Sea Bass',
    },
    caption: {
      ar: 'قاروص بحري طازج مفتوح سنجاري ومشوي بخلطة الطماطم والفلفل والكزبرة الخضراء والليمون المشوي',
      en: 'Fresh sea bass split Singari-style and baked with diced tomatoes, bell peppers, coriander, and charred lemon',
    },
    categories: ['latest', 'food_drink', 'seafood'],
    image: IMAGES.singariFish,
    date: { ar: 'هذا الأسبوع', en: 'This week' },
    contributor: { ar: 'أحمد العدل · مرشد محلي', en: 'Ahmed El-Adl · Local Guide' },
    aspect: 'square',
  },
  {
    id: 'gal-3',
    title: {
      ar: 'جمبري جامبو بترفلاي واستاكوزا وكابوريا مشوية',
      en: 'Charcoal-Grilled Jumbo Shrimp, Lobster & Crab',
    },
    caption: {
      ar: 'جمبري سويسي جامبو واستاكوزا بالزبدة والثوم مع كابوريا نتي مشوية على الجريل',
      en: 'Suez jumbo tiger prawns, garlic-butter rock lobster, and grilled sea crab platter',
    },
    categories: ['latest', 'food_drink', 'seafood'],
    image: IMAGES.shrimpLobster,
    date: { ar: 'منذ 5 أيام', en: '5 days ago' },
    contributor: { ar: 'د. مروان الشناوي · زائر', en: 'Dr. Marwan El-Shenawy · Visitor' },
    aspect: 'square',
  },
  {
    id: 'gal-4',
    title: {
      ar: 'طاجن فواكه البحر بالموزاريلا وشوربة السي فود الكريمية',
      en: 'Mozzarella Seafood Clay Tagine & Creamy Chowder',
    },
    caption: {
      ar: 'طاجن فخار ساخن بقطع الجمبري والسبيط والجبنة الموزاريلا الذائبة بجانب بولة شوربة الصباحي الشهيرة',
      en: 'Bubbling clay tagine with shrimp, calamari, and melted mozzarella alongside our signature seafood soup',
    },
    categories: ['food_drink', 'seafood', 'atmosphere'],
    image: IMAGES.seafoodTagine,
    date: { ar: 'الشهر الماضي', en: 'Last month' },
    contributor: { ar: 'سارة عبد الرحمن · مرشد محلي', en: 'Sara Abdelrahman · Local Guide' },
    aspect: 'square',
  },
  {
    id: 'gal-5',
    title: {
      ar: 'سرفيس المشويات الشرقية والحمام المحشي على الفحم',
      en: 'Oriental Charcoal Kebab, Kofta & Stuffed Pigeon Platter',
    },
    caption: {
      ar: 'كباب وكفتة ضاني على الفحم الحي مع حمام محشي بالأرز المبهّر ومقدم على البقدونس الطازج',
      en: 'Live-charcoal lamb kebab and kofta skewers with golden roasted stuffed pigeon over seasoned rice',
    },
    categories: ['latest', 'food_drink', 'grill', 'atmosphere'],
    image: IMAGES.orientalGrill,
    date: { ar: 'منذ أسبوع', en: '1 week ago' },
    contributor: { ar: 'محمود التهامي · مرشد محلي', en: 'Mahmoud El-Tohamy · Local Guide' },
    aspect: 'landscape',
  },
];

export const REVIEW_KEYWORDS: {
  key: ReviewKeywordKey;
  label: { ar: string; en: string };
  count: number;
}[] = [
  { key: 'all', label: { ar: 'كل المراجعات', en: 'All Reviews' }, count: 5296 },
  { key: 'quality', label: { ar: 'الجودة والطازجية', en: 'Freshness & Quality' }, count: 1840 },
  { key: 'place', label: { ar: 'المكان والأجواء', en: 'Place & Ambience' }, count: 1420 },
  { key: 'experience', label: { ar: 'التجربة والخدمة', en: 'Service & Experience' }, count: 1190 },
  { key: 'cleanliness', label: { ar: 'النظافة والترتيب', en: 'Cleanliness' }, count: 846 },
];

export const RATING_DISTRIBUTION = [
  { stars: 5, percentage: 68, count: 3601 },
  { stars: 4, percentage: 19, count: 1006 },
  { stars: 3, percentage: 7, count: 371 },
  { stars: 2, percentage: 3, count: 159 },
  { stars: 1, percentage: 3, count: 159 },
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: { ar: 'م. طارق الحسيني', en: 'Eng. Tarek El-Hosseiny' },
    badge: { ar: 'مرشد محلي · المستوى 7 · 142 مراجعة', en: 'Local Guide · Level 7 · 142 reviews' },
    segment: 'local',
    rating: 5,
    date: { ar: 'قبل 3 أيام', en: '3 days ago' },
    serviceType: { ar: 'الجلوس داخل المكان · عشاء عائلي', en: 'Dine-in · Family Dinner' },
    text: {
      ar: 'من أقدم وأعرق مطاعم الأسماك والمشويات في المنصورة بشارع قناة السويس. طلبنا قاروص سنجاري وجمبري بترفلاي وطاجن سي فود بالموزاريلا، التسوية ممتازة والسمك طازج جداً، والصالة العائلية في الدور العلوي نظيفة وهادئة والخدمة سريعة حتى في وقت الزحمة.',
      en: 'One of the most established seafood and grill landmarks on Suez Canal Street in Mansoura. We ordered Singari sea bass, butterfly jumbo shrimp, and mozzarella seafood tagine. Everything arrived piping hot, super fresh, and the upstairs family hall was spotless.',
    },
    orderedDishes: {
      ar: 'قاروص سنجاري · جمبري جامبو بترفلاي · شوربة سي فود بالكريمة',
      en: 'Singari Sea Bass · Butterfly Shrimp · Creamy Seafood Soup',
    },
    keywords: ['quality', 'place', 'cleanliness', 'experience'],
    helpfulCount: 38,
  },
  {
    id: 'rev-2',
    author: { ar: 'د. نهى عبد العزيز', en: 'Dr. Noha Abdelaziz' },
    badge: { ar: 'زائرة من القاهرة · 29 مراجعة', en: 'Visitor from Cairo · 29 reviews' },
    segment: 'visitor',
    rating: 5,
    date: { ar: 'قبل أسبوع', en: '1 week ago' },
    serviceType: { ar: 'الجلوس داخل المكان · غداء', en: 'Dine-in · Lunch' },
    text: {
      ar: 'كنا في زيارة لمدينة المنصورة ونصحنا الجميع بمطاعم الصباحي. الميزة الرائعة أن المكان يجمع بين المأكولات البحرية والمشويات الشرقية والحمام المحشي، فكل فرد في العائلة وجد طلبه المفضل بجودة عالية جداً وأسعار مناسبة مقارنة بالكميات.',
      en: 'Visiting Mansoura from Cairo and everyone recommended El-Sabahi. What sets it apart is having both fresh Mediterranean seafood and authentic charcoal grill/stuffed pigeon on the same menu—every family member was delighted with the generous portions.',
    },
    orderedDishes: {
      ar: 'صينية الصباحي المشكلة · حمام محشي بالخلطة · سلطة طحينة وبابا غنوج',
      en: 'El-Sabahi Mixed Tray · Stuffed Pigeon · House Mezzes',
    },
    keywords: ['experience', 'quality', 'place'],
    helpfulCount: 24,
  },
  {
    id: 'rev-3',
    author: { ar: 'كابتن كريم الجندي', en: 'Capt. Karim El-Gendy' },
    badge: { ar: 'مرشد محلي · المستوى 6 · 88 مراجعة', en: 'Local Guide · Level 6 · 88 reviews' },
    segment: 'local',
    rating: 5,
    date: { ar: 'قبل أسبوعين', en: '2 weeks ago' },
    serviceType: { ar: 'الإيصال إلى السيارة (Curbside)', en: 'Curbside Pickup' },
    text: {
      ar: 'جربت خدمة استلام الطلب في السيارة بشارع قناة السويس، اتصلت على 01288816288 قبل الوصول بـ 25 دقيقة وبمجرد وقوفي أمام المطعم نزل الكابتن بالطلب مغلف حرارياً بشكل ممتاز. شوربة السي فود المخلية عندهم لا يعلى عليها في المنصورة كلها.',
      en: 'Used their Curbside Pickup service on Suez Canal Street—called 01288816288 25 minutes ahead and the staff brought the thermally sealed bags right to my car window. Their boneless creamy seafood soup is unmatched in Mansoura.',
    },
    orderedDishes: {
      ar: 'شوربة سي فود مخلية · دنيس زيت وليمون · مكرونة فواكه البحر',
      en: 'Boneless Seafood Soup · Oil & Lemon Sea Bream · Seafood Pasta',
    },
    keywords: ['experience', 'cleanliness', 'quality'],
    helpfulCount: 19,
  },
  {
    id: 'rev-4',
    author: { ar: 'أ. وليد الشامي', en: 'Waleed El-Shamy' },
    badge: { ar: 'زائر من دمياط · 41 مراجعة', en: 'Regional Visitor · 41 reviews' },
    segment: 'visitor',
    rating: 4,
    date: { ar: 'قبل 3 أسابيع', en: '3 weeks ago' },
    serviceType: { ar: 'الجلوس داخل المكان · عشاء', en: 'Dine-in · Dinner' },
    text: {
      ar: 'المكان واسع ونظيف جداً وموقعه حيوي في شارع قناة السويس. يوم الخميس مساءً يكون مزدحماً قليلاً لكن تنظيم الطاولات سريع. الكباب والكفتة المشوية على الفحم مع صينية السي فود كانت تجربة رائعة وتستحق التكرار.',
      en: 'Spacious, clean venue in a prime spot on Suez Canal Street. Thursday nights get lively and busy, yet table turnover is well-organized. Combining charcoal lamb kofta with a mixed seafood tray was a fantastic experience.',
    },
    orderedDishes: {
      ar: 'مشكل مشويات الصباحي · كابوريا مشوية · أرز صيادية',
      en: 'Mixed Charcoal Grill · Grilled Sea Crab · Sayadieh Rice',
    },
    keywords: ['place', 'cleanliness', 'quality'],
    helpfulCount: 15,
  },
  {
    id: 'rev-5',
    author: { ar: 'مريم فؤاد', en: 'Mariam Fouad' },
    badge: { ar: 'مرشد محلي · المستوى 5 · 63 مراجعة', en: 'Local Guide · Level 5 · 63 reviews' },
    segment: 'local',
    rating: 5,
    date: { ar: 'قبل شهر', en: '1 month ago' },
    serviceType: { ar: 'التسليم بدون تلامس · دليفري', en: 'Contactless Delivery' },
    text: {
      ar: 'طلبت عبر المنيو الرقمي l.ead.me وخدمة التوصيل بدون تلامس وصلت في الموعد المحدد. التغليف في علب فويل وحرارية حافظ على قرمشة الجمبري وسخونة الطواجن وكأننا نأكل داخل المطعم بالضبط.',
      en: 'Ordered after browsing the digital menu at l.ead.me and selected contactless delivery. Everything arrived on time in insulated packaging that kept the fried shrimp crisp and the clay tagines bubbling hot.',
    },
    orderedDishes: {
      ar: 'طاجن سي فود بالموزاريلا · جمبري مقلي كرسبي · سلطات الصباحي',
      en: 'Mozzarella Seafood Tagine · Crispy Shrimp · House Salads',
    },
    keywords: ['cleanliness', 'experience', 'quality'],
    helpfulCount: 31,
  },
];
