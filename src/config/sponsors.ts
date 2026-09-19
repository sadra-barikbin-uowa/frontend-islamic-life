import shrineLogo from '../../شعار العتبة.png'
import universityLogo from '../../شعار وارث.png'

/**
 * الجهات الداعمة (Sponsors) — تظهر في قسم "الجهات الداعمة" بالموقع.
 *
 * لإضافة شعار جديد:
 * 1) ضع ملف الصورة داخل: public/images/sponsors/
 *    (الأفضل PNG بخلفية شفافة، بحجم تقريبي 500×260)
 * 2) أضف عنصرًا جديدًا هنا واكتب اسم الملف في logo بهذا الشكل: '/images/sponsors/اسم-الملف.png'
 * 3) أضف url لموقع الجهة (اختياري) — إن تُرك فارغًا لن تكون الصورة قابلة للنقر.
 *
 * الشعاران أدناه يستخدمان صورًا مؤقتة (Placeholder) وضعتها في نفس المسار —
 * استبدل هذين الملفين بالشعارين الحقيقيين بنفس الاسمين وسيتحدث الموقع تلقائيًا.
 */
export interface Sponsor {
  nameAr: string
  nameEn: string
  url?: string
  logo?: string
}

export const sponsors: Sponsor[] = [
  {
    nameAr: 'العتبة الحسينية المقدسة',
    nameEn: 'Al-Hussainiya Holy Shrine',
    url: 'https://imamhussain.org/arabic',
    logo: shrineLogo,
  },
  {
    nameAr: 'جامعة وارث الأنبياء',
    nameEn: 'University of Warith Al-Anbiyaa',
    url: 'https://uowa-new.uowa.edu.iq/arabic',
    logo: universityLogo,
  },
  // أضف بقية الجهات الداعمة هنا بنفس الطريقة عند الحاجة مستقبلاً.
]
