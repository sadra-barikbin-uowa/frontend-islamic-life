import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";
import communicationsLogo from "../../logo/هيئة الإعلام والاتصالات.png";
import cabinetAdvisorsLogo from "../../logo/لوكو_هيئة_المستشارين_في_مجلس_الوزراء.-removebg-preview.png";
import unescoLogo from "../../logo/لوكو يونسكو.png";
import integrityCommissionLogo from "../../logo/لوكو هيئة النزاهة.png";
import graduateStudiesLogo from "../../logo/لوكو معهد الدراسات العليا.png";
import parliamentaryDevelopmentLogo from "../../logo/لوكو معهد التطوير النيابي.png";
import diwanLogo from "../../logo/لوكو ديوان.png";
import sunniEndowmentLogo from "../../logo/لوكو ديوان الوقف السني.png";
import iraqiMediaLogo from "../../logo/لوكو الاعلام العراقي.png";
import religiousEndowmentsLogo from "../../logo/ديوان أوقاف الديانات.png";

const supportingOrganizations = [
	{
		nameAr: "هيئة الإعلام والاتصالات",
		nameEn: "Communications and Media Commission",
		logo: communicationsLogo,
	},
	{
		nameAr: "هيئة المستشارين في مجلس الوزراء",
		nameEn: "Council of Ministers Advisory Commission",
		logo: cabinetAdvisorsLogo,
	},
	{
		nameAr: "منظمة الأمم المتحدة للتربية والعلم والثقافة (اليونسكو)",
		nameEn:
			"United Nations Educational, Scientific and Cultural Organization (UNESCO)",
		logo: unescoLogo,
	},
	{
		nameAr: "هيئة النزاهة الاتحادية",
		nameEn: "Federal Commission of Integrity",
		logo: integrityCommissionLogo,
	},
	{
		nameAr: "معهد العلمين للدراسات العليا",
		nameEn: "Al-Alamein Institute for Graduate Studies",
		logo: graduateStudiesLogo,
	},
	{
		nameAr: "معهد التطوير النيابي",
		nameEn: "Parliamentary Development Institute",
		logo: parliamentaryDevelopmentLogo,
	},
	{
		nameAr: "ديوان الوقف الشيعي",
		nameEn: "Shiite Endowment Diwan",
		logo: diwanLogo,
	},
	{
		nameAr: "ديوان الوقف السني",
		nameEn: "Sunni Endowment Diwan",
		logo: sunniEndowmentLogo,
	},
	{
		nameAr: "شبكة الإعلام العراقي",
		nameEn: "Iraqi Media Network",
		logo: iraqiMediaLogo,
	},
	{
		nameAr: "ديوان أوقاف الديانات",
		nameEn: "Diwan of Religious Endowments",
		logo: religiousEndowmentsLogo,
	},
];

export default function SeventhSponsors() {
	const { lang } = useApp();

	return (
		<section className="border-y border-ink-900/10 px-5 py-20 dark:border-paper/10 lg:px-10">
			<div className="mx-auto max-w-7xl">
				<Reveal>
					<h2 className="text-center font-display text-2xl text-ink-900 dark:text-paper sm:text-3xl">
						{lang === "ar" ? "الجهات الساندة" : "Supporting Organizations"}
					</h2>
				</Reveal>

				<div className="mt-10 grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 lg:gap-x-8">
					{supportingOrganizations.map((organization, index) => {
						const name =
							lang === "ar" ? organization.nameAr : organization.nameEn;

						return (
							<Reveal key={organization.nameAr} delay={index * 60}>
								<figure className="text-center">
									<div className="flex h-36 items-center justify-center rounded-md border border-ink-900/10 bg-white p-4 transition-colors hover:border-gold-400/60 dark:border-paper/15">
										<img
											src={organization.logo}
											alt={name}
											loading="lazy"
											className="max-h-full max-w-full object-contain"
										/>
									</div>
									<figcaption className="mx-auto mt-3 max-w-48 text-sm font-medium leading-relaxed text-ink-900 dark:text-paper">
										{name}
									</figcaption>
								</figure>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
