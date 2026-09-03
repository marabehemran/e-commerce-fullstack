/* eslint-disable no-await-in-loop */
const fs = require("fs");
const path = require("path");
require("colors");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const dbConnection = require("../../config/database");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");
const Brand = require("../../models/brandModel");
const Product = require("../../models/productModel");
const User = require("../../models/userModel");
const Cart = require("../../models/cartModel");
const Coupon = require("../../models/couponModel");
const Review = require("../../models/reviewModel");
const Order = require("../../models/orderModel");

// =====================================================
// LARGE, ARABIC, SEMANTICALLY-LINKED DEMO DATA
// - Categories/SubCategories/Products are logically related.
// - All generated image assets are local PNGs with transparent backgrounds.
// - Product images are large semantic illustrated cutouts, not random photos.
// =====================================================

const COUNTS = {
  products: 2500,
  users: 250,
  brands: 100,
  reviews: 3200,
  orders: 600,
  coupons: 50,
  cartsPercentOfUsers: 0.72,
  productImageVariantsPerSubCategory: 8,
  userImageVariants: 12,
};

const UPLOADS_DIR = path.join(__dirname, "../../uploads");

const TAXONOMY = [
  {
    name: "إلكترونيات",
    icon: "💻",
    subs: [
      [
        "حواسيب محمولة",
        "💻",
        ["حاسوب محمول", "لابتوب للأعمال", "لابتوب للألعاب", "حاسوب خفيف"],
      ],
      [
        "سماعات",
        "🎧",
        ["سماعة رأس", "سماعة لاسلكية", "سماعة ألعاب", "سماعة بلوتوث"],
      ],
      [
        "كاميرات",
        "📷",
        ["كاميرا رقمية", "كاميرا فورية", "كاميرا احترافية", "كاميرا صغيرة"],
      ],
      [
        "إكسسوارات إلكترونية",
        "🔌",
        ["شاحن سريع", "كابل شحن", "باور بانك", "محول كهربائي"],
      ],
    ],
  },
  {
    name: "هواتف وتابلت",
    icon: "📱",
    subs: [
      [
        "هواتف ذكية",
        "📱",
        ["هاتف ذكي", "هاتف بشريحتين", "هاتف للألعاب", "هاتف اقتصادي"],
      ],
      [
        "أجهزة لوحية",
        "📱",
        ["جهاز لوحي", "تابلت للدراسة", "تابلت للرسم", "تابلت ترفيهي"],
      ],
      [
        "أغطية هواتف",
        "📱",
        ["غطاء هاتف", "جراب حماية", "غطاء شفاف", "غطاء مقاوم للصدمات"],
      ],
      [
        "شواحن هواتف",
        "🔋",
        ["شاحن هاتف", "شاحن لاسلكي", "شاحن سيارة", "شاحن متنقل"],
      ],
    ],
  },
  {
    name: "أزياء رجالية",
    icon: "👕",
    subs: [
      [
        "قمصان رجالية",
        "👔",
        ["قميص رجالي", "قميص رسمي", "قميص قطني", "قميص كتان"],
      ],
      [
        "تيشيرتات رجالية",
        "👕",
        ["تيشيرت رجالي", "تيشيرت قطني", "تيشيرت رياضي", "تيشيرت يومي"],
      ],
      [
        "بناطيل رجالية",
        "👖",
        ["بنطال رجالي", "بنطال جينز", "بنطال قماش", "بنطال رياضي"],
      ],
      [
        "جاكيتات رجالية",
        "🧥",
        ["جاكيت رجالي", "جاكيت شتوي", "جاكيت جينز", "جاكيت خفيف"],
      ],
    ],
  },
  {
    name: "أزياء نسائية",
    icon: "👗",
    subs: [
      [
        "فساتين",
        "👗",
        ["فستان نسائي", "فستان سهرة", "فستان يومي", "فستان صيفي"],
      ],
      [
        "بلوزات نسائية",
        "👚",
        ["بلوزة نسائية", "بلوزة قطنية", "بلوزة أنيقة", "بلوزة يومية"],
      ],
      [
        "تنانير",
        "👗",
        ["تنورة نسائية", "تنورة طويلة", "تنورة كلاسيكية", "تنورة صيفية"],
      ],
      [
        "جاكيتات نسائية",
        "🧥",
        ["جاكيت نسائي", "جاكيت شتوي", "جاكيت خفيف", "جاكيت أنيق"],
      ],
    ],
  },
  {
    name: "أحذية",
    icon: "👟",
    subs: [
      [
        "أحذية رياضية",
        "👟",
        ["حذاء رياضي", "حذاء جري", "حذاء تدريب", "حذاء مشي"],
      ],
      [
        "أحذية رسمية",
        "👞",
        ["حذاء رسمي", "حذاء جلد", "حذاء كلاسيكي", "حذاء للمناسبات"],
      ],
      [
        "أحذية نسائية",
        "👠",
        ["حذاء نسائي", "حذاء بكعب", "حذاء أنيق", "حذاء يومي"],
      ],
      ["صنادل", "🩴", ["صندل صيفي", "صندل مريح", "شبشب منزلي", "صندل يومي"]],
    ],
  },
  {
    name: "حقائب وإكسسوارات",
    icon: "👜",
    subs: [
      [
        "حقائب يد",
        "👜",
        ["حقيبة يد", "حقيبة نسائية", "حقيبة جلد", "حقيبة صغيرة"],
      ],
      [
        "حقائب ظهر",
        "🎒",
        ["حقيبة ظهر", "حقيبة لابتوب", "حقيبة سفر", "حقيبة مدرسية"],
      ],
      [
        "محافظ",
        "👛",
        ["محفظة جلد", "محفظة بطاقات", "محفظة نسائية", "محفظة رجالية"],
      ],
      [
        "نظارات شمسية",
        "🕶️",
        ["نظارة شمسية", "نظارة كلاسيكية", "نظارة رياضية", "نظارة عصرية"],
      ],
    ],
  },
  {
    name: "ساعات ومجوهرات",
    icon: "⌚",
    subs: [
      [
        "ساعات رجالية",
        "⌚",
        ["ساعة رجالية", "ساعة رياضية", "ساعة كلاسيكية", "ساعة ذكية"],
      ],
      [
        "ساعات نسائية",
        "⌚",
        ["ساعة نسائية", "ساعة أنيقة", "ساعة صغيرة", "ساعة عصرية"],
      ],
      ["خواتم", "💍", ["خاتم فضي", "خاتم أنيق", "خاتم نسائي", "خاتم كلاسيكي"]],
      [
        "قلائد",
        "📿",
        ["قلادة فضية", "قلادة أنيقة", "سلسلة ناعمة", "قلادة يومية"],
      ],
    ],
  },
  {
    name: "مستحضرات تجميل",
    icon: "💄",
    subs: [
      [
        "أحمر شفاه",
        "💄",
        ["أحمر شفاه", "روج مطفي", "روج لامع", "أحمر شفاه مرطب"],
      ],
      ["مكياج عيون", "👁️", ["ماسكارا", "آيلاينر", "ظلال عيون", "قلم عيون"]],
      ["مكياج وجه", "🪞", ["كريم أساس", "بودرة وجه", "أحمر خدود", "كونسيلر"]],
      [
        "أدوات تجميل",
        "🖌️",
        ["فرشاة مكياج", "إسفنجة مكياج", "مرآة تجميل", "طقم فرش"],
      ],
    ],
  },
  {
    name: "العناية بالبشرة",
    icon: "🧴",
    subs: [
      [
        "منظفات البشرة",
        "🧴",
        ["غسول وجه", "منظف لطيف", "جل تنظيف", "ماء ميسيلار"],
      ],
      ["مرطبات", "🧴", ["كريم مرطب", "لوشن مرطب", "جل ترطيب", "مرطب يومي"]],
      [
        "واقي شمس",
        "☀️",
        ["واقي شمس", "كريم حماية", "واقي شمس للوجه", "واقي شمس خفيف"],
      ],
      [
        "سيرومات",
        "🧪",
        ["سيروم فيتامين", "سيروم ترطيب", "سيروم ليلي", "سيروم عناية"],
      ],
    ],
  },
  {
    name: "عطور",
    icon: "🌸",
    subs: [
      ["عطور رجالية", "🧴", ["عطر رجالي", "عطر خشبي", "عطر منعش", "عطر مسائي"]],
      ["عطور نسائية", "🌸", ["عطر نسائي", "عطر زهري", "عطر ناعم", "عطر فاخر"]],
      [
        "عطور للجنسين",
        "✨",
        ["عطر للجنسين", "عطر يومي", "عطر شرقي", "عطر منعش"],
      ],
      [
        "معطرات جسم",
        "🧴",
        ["معطر جسم", "بودي سبلاش", "رذاذ عطري", "معطر خفيف"],
      ],
    ],
  },
  {
    name: "أدوات منزلية",
    icon: "🏠",
    subs: [
      [
        "تنظيم المنزل",
        "🧺",
        ["سلة تخزين", "منظم أدراج", "صندوق تخزين", "منظم متعدد الاستخدام"],
      ],
      [
        "أدوات تنظيف",
        "🧹",
        ["ممسحة أرضيات", "فرشاة تنظيف", "مكنسة يدوية", "طقم تنظيف"],
      ],
      ["مفروشات", "🛏️", ["غطاء سرير", "بطانية", "مفرش سرير", "وسادة"]],
      [
        "ديكور منزلي",
        "🪴",
        ["مزهرية", "قطعة ديكور", "نبتة زينة", "إطار ديكور"],
      ],
    ],
  },
  {
    name: "مستلزمات المطبخ",
    icon: "🍳",
    subs: [
      ["أواني طبخ", "🍳", ["مقلاة", "قدر طبخ", "طقم أواني", "قدر عميق"]],
      [
        "أدوات مائدة",
        "🍴",
        ["طقم ملاعق", "طقم شوك", "أدوات تقديم", "طقم سفرة"],
      ],
      ["أكواب", "☕", ["كوب قهوة", "كوب زجاج", "مج حراري", "طقم أكواب"]],
      ["أدوات تحضير", "🔪", ["سكين مطبخ", "لوح تقطيع", "مبشرة", "خفاق يدوي"]],
    ],
  },
  {
    name: "أثاث",
    icon: "🛋️",
    subs: [
      ["كراسي", "🪑", ["كرسي مكتبي", "كرسي طعام", "كرسي مريح", "كرسي خشبي"]],
      [
        "طاولات",
        "🪑",
        ["طاولة قهوة", "طاولة طعام", "طاولة جانبية", "مكتب عملي"],
      ],
      ["كنب", "🛋️", ["كنبة مريحة", "كنبة عائلية", "أريكة صغيرة", "كنبة عصرية"]],
      [
        "خزائن",
        "🗄️",
        ["خزانة ملابس", "خزانة تخزين", "وحدة أدراج", "خزانة جانبية"],
      ],
    ],
  },
  {
    name: "ألعاب أطفال",
    icon: "🧸",
    subs: [
      [
        "ألعاب تعليمية",
        "🧩",
        ["لعبة تعليمية", "لعبة حروف", "لعبة أرقام", "لعبة ذكاء"],
      ],
      ["دمى", "🧸", ["دمية ناعمة", "دبدوب", "دمية أطفال", "لعبة قماش"]],
      [
        "سيارات ألعاب",
        "🚗",
        ["سيارة لعبة", "سيارة سباق", "شاحنة لعبة", "مركبة أطفال"],
      ],
      [
        "ألعاب تركيب",
        "🧱",
        ["مكعبات بناء", "لعبة تركيب", "مكعبات ملونة", "طقم بناء"],
      ],
    ],
  },
  {
    name: "مستلزمات أطفال",
    icon: "👶",
    subs: [
      [
        "ملابس أطفال",
        "👕",
        ["طقم أطفال", "تيشيرت أطفال", "بنطال أطفال", "ملابس مواليد"],
      ],
      [
        "رضاعات",
        "🍼",
        ["رضاعة أطفال", "رضاعة مضادة للمغص", "رضاعة صغيرة", "طقم رضاعة"],
      ],
      [
        "مستلزمات نوم",
        "🛏️",
        ["بطانية أطفال", "وسادة أطفال", "غطاء سرير أطفال", "مفرش مواليد"],
      ],
      [
        "عناية بالأطفال",
        "🧴",
        ["شامبو أطفال", "لوشن أطفال", "مناديل أطفال", "كريم أطفال"],
      ],
    ],
  },
  {
    name: "كتب وقرطاسية",
    icon: "📚",
    subs: [
      ["كتب", "📚", ["كتاب عربي", "رواية", "كتاب معرفي", "كتاب تطوير"]],
      ["دفاتر", "📒", ["دفتر ملاحظات", "دفتر جامعي", "دفتر رسم", "مفكرة"]],
      ["أقلام", "🖊️", ["قلم حبر", "قلم رصاص", "طقم أقلام", "قلم تحديد"]],
      [
        "مستلزمات مكتبية",
        "📎",
        ["دباسة", "مشابك ورق", "منظم مكتب", "حافظة أوراق"],
      ],
    ],
  },
  {
    name: "رياضة ولياقة",
    icon: "🏋️",
    subs: [
      [
        "معدات تمارين",
        "🏋️",
        ["دمبل", "حبل مقاومة", "حصيرة تمارين", "عدة تمارين"],
      ],
      ["كرة قدم", "⚽", ["كرة قدم", "قفازات حارس", "واقي ساق", "حقيبة رياضية"]],
      ["كرة سلة", "🏀", ["كرة سلة", "شبكة سلة", "حقيبة كرة", "إكسسوار تدريب"]],
      [
        "مستلزمات جري",
        "🏃",
        ["حزام جري", "قارورة رياضية", "ساعة جري", "حقيبة خصر"],
      ],
    ],
  },
  {
    name: "أجهزة كهربائية",
    icon: "🔌",
    subs: [
      [
        "مكانس كهربائية",
        "🧹",
        ["مكنسة كهربائية", "مكنسة يدوية", "مكنسة لاسلكية", "مكنسة صغيرة"],
      ],
      [
        "مكاوي",
        "♨️",
        ["مكواة بخار", "مكواة ملابس", "مكواة سفر", "مكواة صغيرة"],
      ],
      [
        "مراوح",
        "🌀",
        ["مروحة كهربائية", "مروحة مكتب", "مروحة عمودية", "مروحة صغيرة"],
      ],
      [
        "أجهزة مطبخ كهربائية",
        "🍞",
        ["خلاط كهربائي", "محمصة خبز", "غلاية كهربائية", "آلة قهوة"],
      ],
    ],
  },
  {
    name: "مستلزمات حيوانات أليفة",
    icon: "🐾",
    subs: [
      [
        "طعام قطط",
        "🐱",
        ["طعام قطط", "وجبة قطط", "مكافآت قطط", "طعام قطط جاف"],
      ],
      [
        "طعام كلاب",
        "🐶",
        ["طعام كلاب", "وجبة كلاب", "مكافآت كلاب", "طعام كلاب جاف"],
      ],
      [
        "ألعاب حيوانات",
        "🎾",
        ["كرة للحيوانات", "لعبة مضغ", "لعبة قطط", "لعبة تفاعلية"],
      ],
      [
        "أدوات عناية",
        "🐾",
        ["فرشاة حيوانات", "وعاء طعام", "مقص أظافر", "حزام حيوان"],
      ],
    ],
  },
  {
    name: "مواد غذائية",
    icon: "🛒",
    subs: [
      [
        "قهوة وشاي",
        "☕",
        ["قهوة عربية", "قهوة محمصة", "شاي أسود", "شاي أعشاب"],
      ],
      ["حلويات", "🍫", ["شوكولاتة", "بسكويت", "حلوى مشكلة", "ويفر"]],
      ["مكسرات", "🥜", ["لوز", "كاجو", "فستق", "مكسرات مشكلة"]],
      ["منتجات صحية", "🥗", ["شوفان", "حبوب كاملة", "وجبة صحية", "منتج عضوي"]],
    ],
  },
];

const BRAND_PREFIXES = ["أفق", "رواد", "قمة", "نبض", "لمسة"];
const BRAND_DOMAINS = [
  "التقنية",
  "الموبايل",
  "الرجل",
  "المرأة",
  "الأحذية",
  "الحقائب",
  "الساعات",
  "التجميل",
  "البشرة",
  "العطور",
  "المنزل",
  "المطبخ",
  "الأثاث",
  "الألعاب",
  "الأطفال",
  "الكتب",
  "الرياضة",
  "الحيوانات",
  "الغذاء",
  "الأجهزة",
];
const BRAND_NAMES = TAXONOMY.flatMap((_, categoryIndex) =>
  BRAND_PREFIXES.map((prefix) => `${prefix} ${BRAND_DOMAINS[categoryIndex]}`),
);

const COLORS = [
  { name: "أسود", value: "#000000" },
  { name: "أبيض", value: "#FFFFFF" },
  { name: "رمادي", value: "#808080" },
  { name: "أزرق", value: "#2563EB" },
  { name: "كحلي", value: "#1E3A8A" },
  { name: "أحمر", value: "#DC2626" },
  { name: "أخضر", value: "#16A34A" },
  { name: "بيج", value: "#D6C6A5" },
  { name: "بني", value: "#8B4513" },
  { name: "وردي", value: "#EC4899" },
  { name: "ذهبي", value: "#D4AF37" },
  { name: "فضي", value: "#C0C0C0" },
];
const QUALITIES = [
  "فاخر",
  "عصري",
  "كلاسيكي",
  "عملي",
  "أنيق",
  "متين",
  "مريح",
  "خفيف",
  "مميز",
  "احترافي",
  "يومي",
  "متطور",
];
const MATERIALS = [
  "عالي الجودة",
  "متين",
  "ناعم",
  "عملي",
  "مقاوم للاستخدام اليومي",
  "مصمم بعناية",
];

const FIRST_NAMES = [
  "محمد",
  "أحمد",
  "عمر",
  "يوسف",
  "خالد",
  "علي",
  "سامي",
  "رامي",
  "كريم",
  "حسام",
  "سارة",
  "مريم",
  "نور",
  "ليان",
  "ريم",
  "دانا",
  "هبة",
  "رزان",
  "آية",
  "لمى",
];
const LAST_NAMES = [
  "الأحمد",
  "الخطيب",
  "النجار",
  "صالح",
  "حمدان",
  "درويش",
  "عودة",
  "قاسم",
  "العلي",
  "المصري",
  "البرغوثي",
  "السعدي",
  "نصار",
  "جرار",
  "شريم",
];
const CITIES = [
  "جنين",
  "نابلس",
  "طولكرم",
  "قلقيلية",
  "رام الله",
  "البيرة",
  "الخليل",
  "بيت لحم",
  "أريحا",
  "القدس",
];
const STREETS = [
  "شارع الجامعة",
  "شارع فلسطين",
  "شارع القدس",
  "شارع الاستقلال",
  "شارع النصر",
  "شارع البلدية",
  "شارع المدارس",
  "شارع السوق",
];
const REVIEW_TITLES = [
  "ممتاز ويستحق الشراء",
  "جودة رائعة",
  "مطابق للوصف",
  "تجربة جيدة جدًا",
  "سعر مناسب",
  "أفضل من المتوقع",
  "جودة مقبولة",
  "منتج عملي",
  "أنصح به",
  "التغليف ممتاز",
  "أداء ممتاز",
  "جيد للاستخدام اليومي",
];

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[randInt(0, arr.length - 1)];
const pickMany = (arr, n) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, Math.min(n, arr.length));
const safeSlug = (prefix, index) =>
  `${prefix}-${String(index).padStart(4, "0")}`;

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

function verifyImageAssets() {
  const requiredDirs = ["categories", "products", "brands", "users"];
  for (const folder of requiredDirs) {
    const dir = path.join(UPLOADS_DIR, folder);
    if (!fs.existsSync(dir)) throw new Error(`مجلد الصور غير موجود: ${dir}`);
  }
  const productImages = fs
    .readdirSync(path.join(UPLOADS_DIR, "products"))
    .filter((f) => f.endsWith(".png"));
  if (productImages.length < 640)
    throw new Error(
      "صور المنتجات ناقصة. يجب أن يحتوي مجلد products على 640 صورة PNG على الأقل.",
    );
  console.log(
    `تم العثور على ${productImages.length} صورة منتج PNG شفافة.`.green,
  );
}

async function clearDatabase() {
  await Promise.all([
    Category.deleteMany(),
    SubCategory.deleteMany(),
    Brand.deleteMany(),
    Product.deleteMany(),
    User.deleteMany(),
    Cart.deleteMany(),
    Coupon.deleteMany(),
    Review.deleteMany(),
    Order.deleteMany(),
  ]);
}

function createDescription(title, subName, categoryName) {
  return `${title} من قسم ${subName} ضمن ${categoryName}. منتج ${pick(MATERIALS)} يجمع بين الجودة والتصميم المناسب للاستخدام اليومي. تم اختيار مواصفاته ليقدم قيمة جيدة وتجربة استخدام مريحة.`;
}

const insertData = async () => {
  try {
    verifyImageAssets();
    console.log("تنظيف الداتا القديمة...".yellow);
    await clearDatabase();

    console.log("إنشاء الكاتيجوريز...".cyan);
    const categories = await Category.insertMany(
      TAXONOMY.map((category, index) => ({
        name: category.name,
        slug: safeSlug("category", index + 1),
        image: `category-${index + 1}.png`,
      })),
    );

    console.log("إنشاء الساب كاتيجوريز المترابطة...".cyan);
    const subCategoriesData = [];
    const subMeta = [];
    TAXONOMY.forEach((categoryDef, categoryIndex) => {
      categoryDef.subs.forEach(([name, icon, productNames], subIndex) => {
        subCategoriesData.push({
          name,
          slug: safeSlug(`subcategory-${categoryIndex + 1}`, subIndex + 1),
          category: categories[categoryIndex]._id,
        });
        subMeta.push({ categoryIndex, subIndex, name, icon, productNames });
      });
    });
    const subCategories = await SubCategory.insertMany(subCategoriesData);

    const subRecords = subMeta.map((meta, index) => ({
      ...meta,
      doc: subCategories[index],
    }));
    const subsByCategory = {};
    subRecords.forEach((sub) => {
      const key = sub.categoryIndex;
      if (!subsByCategory[key]) subsByCategory[key] = [];
      subsByCategory[key].push(sub);
    });

    console.log("إنشاء البراندات...".cyan);
    const brands = await Brand.insertMany(
      BRAND_NAMES.slice(0, COUNTS.brands).map((name, index) => ({
        name,
        slug: safeSlug("brand", index + 1),
        image: `brand-${index + 1}.png`,
      })),
    );
    const brandsByCategory = Array.from(
      { length: TAXONOMY.length },
      (_, categoryIndex) =>
        brands.slice(
          categoryIndex * BRAND_PREFIXES.length,
          (categoryIndex + 1) * BRAND_PREFIXES.length,
        ),
    );

    console.log("إنشاء المنتجات العربية المترابطة...".cyan);
    const productsData = [];
    for (let i = 0; i < COUNTS.products; i += 1) {
      const categoryIndex = i % categories.length;
      const category = categories[categoryIndex];
      const categoryDef = TAXONOMY[categoryIndex];
      const availableSubs = subsByCategory[categoryIndex];
      const sub =
        availableSubs[Math.floor(i / categories.length) % availableSubs.length];
      const baseName = sub.productNames[i % sub.productNames.length];
      const quality = pick(QUALITIES);
      const title = `${baseName} ${quality} ${String(Math.floor(i / (categories.length * 4)) + 1).padStart(2, "0")}`;
      const price = randInt(25, 4500);
      const hasDiscount = Math.random() < 0.38;
      const discountRate = pick([0.1, 0.15, 0.2, 0.25]);
      const imageVariant = (i % COUNTS.productImageVariantsPerSubCategory) + 1;
      const imageFile = `product-c${categoryIndex + 1}-s${sub.subIndex + 1}-v${imageVariant}.png`;
      const alternateImages = [];
      for (let v = 1; v <= COUNTS.productImageVariantsPerSubCategory; v += 1) {
        if (v !== imageVariant)
          alternateImages.push(
            `product-c${categoryIndex + 1}-s${sub.subIndex + 1}-v${v}.png`,
          );
      }

      productsData.push({
        title,
        slug: safeSlug("product", i + 1),
        description: createDescription(title, sub.name, categoryDef.name),
        quantity: randInt(8, 350),
        sold: randInt(0, 220),
        price,
        priceAfterDiscount: hasDiscount
          ? Math.max(1, Math.round(price * (1 - discountRate)))
          : undefined,
        colors: pickMany(COLORS, randInt(1, 4)),
        imageCover: imageFile,
        images: pickMany(alternateImages, randInt(1, 3)),
        category: category._id,
        subCategories: [sub.doc._id],
        brand:
          brandsByCategory[categoryIndex][
            i % brandsByCategory[categoryIndex].length
          ]._id,
      });
    }
    const products = await Product.insertMany(productsData);

    console.log("إنشاء المستخدمين...".cyan);
    const hashedPassword = await bcrypt.hash("Test@1234", 12);
    const usersData = Array.from({ length: COUNTS.users }, (_, index) => {
      const name = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
      const addressCount = Math.random() < 0.65 ? randInt(1, 2) : 0;
      const addresses = Array.from(
        { length: addressCount },
        (__, addressIndex) => ({
          alias: addressIndex === 0 ? "المنزل" : "العمل",
          details: `${pick(STREETS)}، بناية ${randInt(1, 120)}`,
          phone: `05${randInt(90000000, 99999999)}`,
          city: pick(CITIES),
          postalCode: String(randInt(10000, 99999)),
        }),
      );
      return {
        name,
        slug: safeSlug("user", index + 1),
        email: `user${index + 1}@test.com`,
        phone: `05${randInt(90000000, 99999999)}`,
        profileImg: `user-${(index % COUNTS.userImageVariants) + 1}.png`,
        password: hashedPassword,
        role: index < 4 ? "manager" : "user",
        active: true,
        wishlist: pickMany(products, randInt(0, 8)).map(
          (product) => product._id,
        ),
        addresses,
      };
    });
    const users = await User.insertMany(usersData);

    await User.create({
      name: "مدير النظام",
      slug: "admin-system",
      email: "admin@test.com",
      phone: "0590000000",
      profileImg: "user-1.png",
      password: "Test@1234",
      role: "admin",
      active: true,
    });

    console.log("إنشاء السلات...".cyan);
    const cartUsers = pickMany(
      users,
      Math.floor(users.length * COUNTS.cartsPercentOfUsers),
    );
    const cartsData = cartUsers.map((user) => {
      const cartItems = pickMany(products, randInt(1, 6)).map((product) => ({
        product: product._id,
        quantity: randInt(1, 3),
        color: product.colors.length ? pick(product.colors).name : undefined,
        price: product.priceAfterDiscount || product.price,
      }));
      const totalCartPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      return { user: user._id, cartItems, totalCartPrice };
    });
    await Cart.insertMany(cartsData);

    console.log("إنشاء الكوبونات...".cyan);
    const couponPrefixes = [
      "أهلا",
      "خصم",
      "توفير",
      "صيف",
      "شتاء",
      "جامعة",
      "تسوق",
      "هدية",
      "عروض",
      "فرصة",
    ];
    const couponsData = Array.from({ length: COUNTS.coupons }, (_, index) => ({
      name: `${couponPrefixes[index % couponPrefixes.length]}-${String(index + 1).padStart(2, "0")}`,
      expire: new Date(Date.now() + randInt(30, 300) * 24 * 60 * 60 * 1000),
      discount: [5, 10, 15, 20, 25, 30, 35][index % 7],
    }));
    await Coupon.insertMany(couponsData);

    console.log("إنشاء المراجعات...".cyan);
    const usedReviewPairs = new Set();
    const reviewsData = [];
    while (reviewsData.length < COUNTS.reviews) {
      const user = pick(users);
      const product = pick(products);
      const key = `${user._id}-${product._id}`;
      if (usedReviewPairs.has(key)) continue;
      usedReviewPairs.add(key);
      reviewsData.push({
        title: pick(REVIEW_TITLES),
        ratings: pick([3, 4, 4, 4, 5, 5, 5, 2]),
        user: user._id,
        product: product._id,
      });
    }
    const reviews = await Review.insertMany(reviewsData);

    console.log("حساب تقييمات المنتجات...".cyan);
    const ratingAgg = await Review.aggregate([
      {
        $group: {
          _id: "$product",
          avgRatings: { $avg: "$ratings" },
          ratingsQuantity: { $sum: 1 },
        },
      },
    ]);
    if (ratingAgg.length) {
      await Product.bulkWrite(
        ratingAgg.map((row) => ({
          updateOne: {
            filter: { _id: row._id },
            update: {
              ratingsAverage: Number(row.avgRatings.toFixed(1)),
              ratingsQuantity: row.ratingsQuantity,
            },
          },
        })),
      );
    }

    console.log("إنشاء الطلبات...".cyan);
    const ordersData = Array.from({ length: COUNTS.orders }, () => {
      const orderProducts = pickMany(products, randInt(1, 5));
      const cartItems = orderProducts.map((product) => ({
        product: product._id,
        quantity: randInt(1, 3),
        color: product.colors.length ? pick(product.colors).name : undefined,
        price: product.priceAfterDiscount || product.price,
      }));
      const itemsPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const taxPrice = Math.round(itemsPrice * 0.05);
      const shippingPrice = itemsPrice > 500 ? 0 : randInt(10, 30);
      const isPaid = Math.random() < 0.72;
      const isDelivered = isPaid && Math.random() < 0.65;
      return {
        user: pick(users)._id,
        cartItems,
        taxPrice,
        shippingAddress: {
          details: `${pick(STREETS)}، بناية ${randInt(1, 120)}`,
          phone: `05${randInt(90000000, 99999999)}`,
          city: pick(CITIES),
          postalCode: String(randInt(10000, 99999)),
        },
        shippingPrice,
        totalOrderPrice: itemsPrice + taxPrice + shippingPrice,
        paymentMethodType: Math.random() < 0.55 ? "cash" : "card",
        isPaid,
        paidAt: isPaid
          ? new Date(Date.now() - randInt(1, 80) * 24 * 60 * 60 * 1000)
          : undefined,
        isDelivered,
        deliveredAt: isDelivered
          ? new Date(Date.now() - randInt(0, 35) * 24 * 60 * 60 * 1000)
          : undefined,
      };
    });
    await Order.insertMany(ordersData);

    console.log("============================================".green);
    console.log(`Categories:     ${categories.length}`.green);
    console.log(`SubCategories:  ${subCategories.length}`.green);
    console.log(`Brands:         ${brands.length}`.green);
    console.log(`Products:       ${products.length}`.green);
    console.log(`Users:          ${users.length + 1} (including admin)`.green);
    console.log(`Carts:          ${cartsData.length}`.green);
    console.log(`Coupons:        ${couponsData.length}`.green);
    console.log(`Reviews:        ${reviews.length}`.green);
    console.log(`Orders:         ${ordersData.length}`.green);
    console.log("============================================".green);
    console.log(
      "الصور المرفقة PNG شفافة وواقعية/شبه واقعية ومقسمة حسب نوع البيانات."
        .magenta,
    );
    console.log("Password: Test@1234".magenta);
    console.log("Admin: admin@test.com / Test@1234".magenta);
    console.log("Arabic demo data inserted successfully".green.inverse);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await clearDatabase();
    console.log("Demo data destroyed".red.inverse);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

dbConnection();

if (process.argv[2] === "-i") insertData();
else if (process.argv[2] === "-d") destroyData();
else {
  console.log("Usage:".yellow);
  console.log("  node utils/dummyData/arabicBigSeeder.js -i".yellow);
  console.log("  node utils/dummyData/arabicBigSeeder.js -d".yellow);
  process.exit(0);
}
