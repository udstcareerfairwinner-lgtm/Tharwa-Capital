import { PlaceHolderImages } from './placeholder-images';

export type Investment = {
  id: number;
  title: Record<string, string>;
  category: Record<string, string>;
  image: string;
  invested: number;
  goal: number;
  investors: number;
  return: string;
  minInvest: string;
  daysLeft: number;
  sharia: boolean;
  shariaComplianceReport?: Record<string, string>;
};

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl ?? '';
const getImageHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint ?? '';


export const investments: Investment[] = [
  {
    id: 1,
    title: { en: 'Green Oasis Apartments', ar: 'شقق الواحة الخضراء' },
    category: { en: 'Real Estate', ar: 'العقارات' },
    image: getImage('green-oasis-apartments'),
    invested: 450000,
    goal: 750000,
    investors: 127,
    return: '12%',
    minInvest: '500 QAR',
    daysLeft: 45,
    sharia: true,
    shariaComplianceReport: {
      en: "The Green Oasis Apartments project has been reviewed by our Sharia board. The investment structure is based on a Musharakah (partnership) model. The land is fully owned and the construction contracts are compliant. The source of funds is clean. The rental income model is permissible. No involvement in prohibited activities such as gambling, alcohol, or interest-based lending. The project is certified as 100% Sharia-compliant.",
      ar: "تمت مراجعة مشروع شقق الواحة الخضراء من قبل هيئتنا الشرعية. يعتمد هيكل الاستثمار على نموذج المشاركة. الأرض مملوكة بالكامل وعقود البناء متوافقة. مصدر الأموال نظيف. نموذج إيرادات الإيجار جائز. لا يوجد تورط في أنشطة محظورة مثل القمار أو الكحول أو الإقراض الربوي. المشروع حاصل على شهادة توافق مع الشريعة الإسلامية بنسبة 100%.",
    },
  },
  {
    id: 2,
    title: { en: 'Solar Farm Initiative', ar: 'مبادرة مزرعة الطاقة الشمسية' },
    category: { en: 'Renewable Energy', ar: 'الطاقة المتجددة' },
    image: getImage('solar-farm'),
    invested: 280000,
    goal: 500000,
    investors: 89,
    return: '10%',
    minInvest: '300 QAR',
    daysLeft: 30,
    sharia: true,
  },
  {
    id: 3,
    title: { en: 'Artisan Coffee Roastery', ar: 'محمصة القهوة الحرفية' },
    category: { en: 'Small Business', ar: 'الأعمال الصغيرة' },
    image: getImage('artisan-coffee'),
    invested: 150000,
    goal: 200000,
    investors: 65,
    return: '15%',
    minInvest: '200 QAR',
    daysLeft: 20,
    sharia: true,
    shariaComplianceReport: {
        en: "The Artisan Coffee Roastery is a partnership investment. The business deals only in halal products (coffee, pastries). The financing structure avoids interest (Riba). Supply chain contracts have been vetted. Some concerns were raised about the marketing materials which have since been rectified to align with modest Islamic values. The investment is now approved.",
        ar: "محمصة القهوة الحرفية هي استثمار قائم على الشراكة. تتعامل الشركة في المنتجات الحلال فقط (القهوة والمعجنات). هيكل التمويل يتجنب الربا. تم فحص عقود سلسلة التوريد. أثيرت بعض المخاوف بشأن المواد التسويقية والتي تم تصحيحها منذ ذلك الحين لتتماشى مع القيم الإسلامية المحتشمة. تمت الموافقة على الاستثمار الآن.",
      },
  },
  {
    id: 4,
    title: { en: 'Qatar Premium Dates Farm', ar: 'مزرعة تمور قطر الفاخرة' },
    category: { en: 'Agriculture', ar: 'الزراعة' },
    image: getImage('qatar-dates-farm'),
    invested: 600000,
    goal: 900000,
    investors: 210,
    return: '9%',
    minInvest: '1000 QAR',
    daysLeft: 60,
    sharia: true,
  },
  {
    id: 5,
    title: { en: 'Doha Fintech Startup', ar: 'شركة تكنولوجيا مالية ناشئة في الدوحة' },
    category: { en: 'Technology', ar: 'التكنولوجيا' },
    image: getImage('doha-fintech-startup'),
    invested: 120000,
    goal: 400000,
    investors: 45,
    return: '25%',
    minInvest: '500 QAR',
    daysLeft: 55,
    sharia: false,
    shariaComplianceReport: {
        en: "This investment opportunity in a fintech startup is currently under review. The initial assessment shows that while the company's core product is permissible, it has taken on a conventional interest-bearing loan for its seed funding. This makes the current capital structure non-compliant. We are in discussion with the founders to explore Sharia-compliant financing alternatives. Until then, this investment is not approved.",
        ar: "فرصة الاستثمار هذه في شركة تكنولوجيا مالية ناشئة قيد المراجعة حاليًا. يوضح التقييم الأولي أنه في حين أن المنتج الأساسي للشركة جائز، إلا أنها حصلت على قرض تقليدي بفائدة لتمويلها الأولي. هذا يجعل الهيكل الرأسمالي الحالي غير متوافق. نحن نناقش مع المؤسسين لاستكشاف بدائل تمويل متوافقة مع الشريعة. حتى ذلك الحين، لم تتم الموافقة على هذا الاستثمار.",
    }
  },
];
