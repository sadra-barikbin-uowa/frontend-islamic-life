export interface RecognitionAward {
	id: string;
	titleAr: string;
	titleEn: string;
	organizationAr: string;
	organizationEn: string;
	year: string;
	categoryAr: string;
	categoryEn: string;
	descriptionAr: string;
	descriptionEn: string;
	image: string;
}

const sampleDescriptionAr = "بيانات تجريبية قابلة للاستبدال بوصف التكريم الفعلي.";
const sampleDescriptionEn = "Sample content to replace with the actual recognition details.";

export const awards: RecognitionAward[] = [
	{
		id: "institutional-excellence",
		titleAr: "جائزة التميز المؤسسي",
		titleEn: "Institutional Excellence Award",
		organizationAr: "اسم الجهة المانحة",
		organizationEn: "Awarding organization",
		year: "2025",
		categoryAr: "التميز",
		categoryEn: "Excellence",
		descriptionAr: sampleDescriptionAr,
		descriptionEn: sampleDescriptionEn,
		image: "",
	},
	{
		id: "research-innovation",
		titleAr: "جائزة الابتكار البحثي",
		titleEn: "Research Innovation Award",
		organizationAr: "اسم الجهة المانحة",
		organizationEn: "Awarding organization",
		year: "2025",
		categoryAr: "البحث والابتكار",
		categoryEn: "Research & Innovation",
		descriptionAr: sampleDescriptionAr,
		descriptionEn: sampleDescriptionEn,
		image: "",
	},
	{
		id: "community-impact",
		titleAr: "تكريم خدمة المجتمع",
		titleEn: "Community Impact Recognition",
		organizationAr: "اسم الجهة المانحة",
		organizationEn: "Awarding organization",
		year: "2024",
		categoryAr: "خدمة المجتمع",
		categoryEn: "Community Impact",
		descriptionAr: sampleDescriptionAr,
		descriptionEn: sampleDescriptionEn,
		image: "",
	},
	{
		id: "digital-transformation",
		titleAr: "جائزة التحول الرقمي",
		titleEn: "Digital Transformation Award",
		organizationAr: "اسم الجهة المانحة",
		organizationEn: "Awarding organization",
		year: "2024",
		categoryAr: "التحول الرقمي",
		categoryEn: "Digital Transformation",
		descriptionAr: sampleDescriptionAr,
		descriptionEn: sampleDescriptionEn,
		image: "",
	},
	{
		id: "integrity-governance",
		titleAr: "درع النزاهة والحوكمة",
		titleEn: "Integrity & Governance Recognition",
		organizationAr: "اسم الجهة المانحة",
		organizationEn: "Awarding organization",
		year: "2023",
		categoryAr: "النزاهة والحوكمة",
		categoryEn: "Integrity & Governance",
		descriptionAr: sampleDescriptionAr,
		descriptionEn: sampleDescriptionEn,
		image: "",
	},
	{
		id: "sustainable-development",
		titleAr: "جائزة التنمية المستدامة",
		titleEn: "Sustainable Development Award",
		organizationAr: "اسم الجهة المانحة",
		organizationEn: "Awarding organization",
		year: "2023",
		categoryAr: "التنمية المستدامة",
		categoryEn: "Sustainable Development",
		descriptionAr: sampleDescriptionAr,
		descriptionEn: sampleDescriptionEn,
		image: "",
	},
];