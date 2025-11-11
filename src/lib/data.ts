import { PlaceHolderImages } from './placeholder-images';

export type LocalizedString = Record<string, string>;

export interface Investment {
  id: number;
  title: LocalizedString;
  category: LocalizedString;
  image: string;
  invested: number;
  goal: number;
  investors: number;
  return: string;
  minInvest: string;
  daysLeft: number;
  sharia: boolean;
  shariaComplianceReport?: LocalizedString;
};

export interface ShariaBoardMember {
    id: string;
    name: LocalizedString;
    role: LocalizedString;
    image: string;
    imageHint: string;
    expertise: LocalizedString[];
    bio: LocalizedString;
}

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl ?? '';

export const shariaBoard: ShariaBoardMember[] = [
    {
      id: "dr-ahmed-al-qaradawi",
      name: { en: "Dr. Ahmed Al-Qaradawi", ar: "د. أحمد القرضاوي" },
      role: { en: "Chief Sharia Officer", ar: "كبير المسؤولين الشرعيين" },
      image: getImage("sharia-board-1"),
      imageHint: "man portrait",
      expertise: [
          {en: "Fiqh al-Muamalat", ar: "فقه المعاملات"},
          {en: "Islamic Economics", ar: "الاقتصاد الإسلامي"},
          {en: "Sukuk Structuring", ar: "هيكلة الصكوك"},
      ],
      bio: {
          en: "Dr. Ahmed Al-Qaradawi is a leading authority in Islamic finance, with over 25 years of experience. He holds a Ph.D. in Islamic Law from Al-Azhar University and has published numerous papers on contemporary financial issues from an Islamic perspective. He ensures that all investments on the Tharwa Capital platform adhere strictly to Sharia principles, providing peace of mind for our investors.",
          ar: "الدكتور أحمد القرضاوي هو مرجعية رائدة في التمويل الإسلامي، بخبرة تزيد عن 25 عامًا. حاصل على درجة الدكتوراه في الشريعة الإسلامية من جامعة الأزهر ونشر العديد من الأبحاث حول القضايا المالية المعاصرة من منظور إسلامي. يضمن أن جميع الاستثمارات على منصة ثروة كابيتال تلتزم بصرامة بمبادئ الشريعة، مما يوفر راحة البال لمستثمرينا."
      }
    },
    {
        id: "sheikh-mohammed-al-thani",
        name: { en: "Sheikh Mohammed Al-Thani", ar: "الشيخ محمد آل ثاني" },
        role: { en: "Islamic Finance Expert", ar: "خبير التمويل الإسلامي" },
        image: getImage("sharia-board-2"),
        imageHint: "man portrait",
        expertise: [
            {en: "Takaful", ar: "التكافل"},
            {en: "Islamic Capital Markets", ar: "أسواق رأس المال الإسلامية"},
        ],
        bio: {
            en: "Sheikh Mohammed Al-Thani is a renowned expert in Islamic capital markets and Takaful (Islamic insurance). His practical experience in structuring and auditing Islamic financial products makes him an invaluable asset to our board. He is dedicated to fostering innovation in finance that is both ethical and compliant.",
            ar: "الشيخ محمد آل ثاني خبير مرموق في أسواق رأس المال الإسلامية والتكافل (التأمين الإسلامي). خبرته العملية في هيكلة ومراجعة المنتجات المالية الإسلامية تجعله رصيدًا لا يقدر بثمن لمجلسنا. وهو مكرس لتعزيز الابتكار في التمويل الأخلاقي والمتوافق مع الشريعة."
        }
      },
      {
        id: "dr-fatima-al-dosari",
        name: { en: "Dr. Fatima Al-Dosari", ar: "د. فاطمة الدوسري" },
        role: { en: "Sharia Compliance Specialist", ar: "أخصائية الامتثال الشرعي" },
        image: getImage("sharia-board-3"),
        imageHint: "woman portrait",
        expertise: [
            {en: "Halal Startups", ar: "الشركات الناشئة الحلال"},
            {en: "Socially Responsible Investing", ar: "الاستثمار المسؤول اجتماعيا"},
        ],
        bio: {
            en: "Dr. Fatima Al-Dosari specializes in the intersection of Islamic finance and modern entrepreneurship. She focuses on ensuring that startups and small businesses seeking funding are not only financially viable but also operate on a foundation of Islamic ethics. Her work helps empower a new generation of Muslim entrepreneurs.",
            ar: "تتخصص الدكتورة فاطمة الدوسري في تقاطع التمويل الإسلامي وريادة الأعمال الحديثة. تركز على ضمان أن الشركات الناشئة والشركات الصغيرة التي تسعى للحصول على تمويل ليست فقط قابلة للحياة من الناحية المالية ولكنها تعمل أيضًا على أساس الأخلاق الإسلامية. يساعد عملها في تمكين جيل جديد من رواد الأعمال المسلمين."
        }
      },
];


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
