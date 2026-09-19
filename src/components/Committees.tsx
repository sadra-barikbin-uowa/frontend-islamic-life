import { useState } from "react";
import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";

const scientificCommitteeMembers = [
	{
		name: "أ.د. نور مهدي الساعدي",
		org: "جامعة وارث الأنبياء (ع)",
		role: "رئيساً",
	},
	{
		name: "أ.د. فردوس هاشم احمد",
		org: "جامعة وارث الأنبياء (ع)",
		role: "عضواً",
	},
	{ name: "أ.د. حليم عباس عبيد", org: "جامعة بغداد", role: "عضواً" },
	{ name: "أ.د. رياض عبد الرحيم", org: "جامعة البصرة", role: "عضواً" },
	{ name: "أ.د. محمد هادي شهاب", org: "جامعة تكريت", role: "عضواً" },
	{ name: "أ.د. علي شكر داود", org: "الجامعة العراقية", role: "عضواً" },
	{ name: "أ.د. كامران اورحمان مجيد", org: "جامعة السليمانية", role: "عضواً" },
	{ name: "أ.د. حيدر حسن ديوان", org: "جامعة الكوفة", role: "عضواً" },
	{ name: "أ.د. حيدر محمد الشلاه", org: "جامعة بابل", role: "عضواً" },
	{ name: "أ.د. خالد عليوي العرداوي", org: "جامعة كربلاء", role: "عضواً" },
	{ name: "أ.د. اياد كامل إبراهيم", org: "جامعة زاخو", role: "عضواً" },
	{ name: "أ.د. بركاوي جليب دارم", org: "جامعة واسط", role: "عضواً" },
	{ name: "أ.د. احمد صبيح محسن", org: "جامعة العميد", role: "عضواً" },
	{
		name: "أ.م.د. مهند عبد الحسن جلاب",
		org: "بيت الحكمة العراقي",
		role: "عضواً",
	},
	{
		name: "أ.م.د. محمد عبد الهادي شاكر",
		org: "جامعة الزهراء (ع)",
		role: "عضواً",
	},
	{ name: "أ.م.د. حسن كامل محمد", org: "وارث الأنبياء (ع)", role: "عضواً" },
	{ name: "أ.م.د. نجلاء مهدي محسن", org: "معهد العلمين", role: "عضواً" },
	{ name: "أ.م.د. علي شمخي جبر", org: "معهد العلمين", role: "عضواً" },
	{
		name: "أ.م.د. محمد مرزوك موزان العلي",
		org: "جامعة المصطفى قم",
		role: "عضواً",
	},
	{
		name: "أ.م.د. فلاح سبتي جمعة",
		org: "جامعة ال البيت العالمية قم",
		role: "عضواً",
	},
	{
		name: "أ.م.د. احمد يحى هادي",
		org: "كلية الامام الكاظم (ع) الجامعة",
		role: "عضواً",
	},
	{
		name: "أ.م.د. حيدر عبد الرضا عبد علي",
		org: "كلية الطف الجامعة",
		role: "عضواً",
	},
	{
		name: "أ.م.د. حيدر محمد عبد الله",
		org: "مركز كربلاء للبحوث والدراسات",
		role: "عضواً",
	},
	{ name: "أ.م.د. احمد علي عبود", org: "جامعة الكفيل", role: "عضواً" },
	{
		name: "م.د. عبد الستار جبار الجابري",
		org: "جامعة وارث الأنبياء (ع)",
		role: "عضواً",
	},
];

export default function Committees() {
	const { t } = useApp();
	const [active, setActive] = useState(0);
	const group =
		active === 0
			? { ...t.committees.groups[0], members: scientificCommitteeMembers }
			: t.committees.groups[active];

	return (
		<section id="committees" className="px-5 py-24 lg:px-10 lg:py-32">
			<div className="mx-auto max-w-7xl">
				<Reveal>
					<div className="max-w-xl">
						<p className="mb-3 text-sm font-medium text-gold-600 dark:text-gold-400">
							{t.committees.title}
						</p>
						<h2 className="font-display text-3xl text-ink-900 dark:text-paper sm:text-4xl">
							{t.committees.subtitle}
						</h2>
					</div>
				</Reveal>

				<div className="mt-10 flex flex-wrap gap-2">
					{t.committees.groups.map((g, i) => (
						<button
							key={g.title}
							onClick={() => setActive(i)}
							className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
								active === i
									? "border-gold-500 bg-gold-500 text-ink-950"
									: "border-ink-900/15 text-ink-900 hover:border-gold-400 dark:border-paper/20 dark:text-paper"
							}`}
						>
							{g.title}
						</button>
					))}
				</div>

				<div
					key={active}
					className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
				>
					{group.members.map((m, i) => (
						<Reveal key={m.name} delay={(i % 9) * 45}>
							<div className="flex h-full flex-col gap-2 rounded-lg border border-ink-900/10 p-5 dark:border-paper/10">
								<div className="flex items-start justify-between gap-3">
									<h3 className="font-display text-base leading-snug text-ink-900 dark:text-paper">
										{m.name}
									</h3>
									<span
										className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
											m.role.toLowerCase().includes("رئيس") ||
											m.role.toLowerCase().includes("chair")
												? "bg-gold-500 text-ink-950"
												: "bg-ink-900/5 text-slate-ink dark:bg-paper/10 dark:text-ink-200"
										}`}
									>
										{m.role}
									</span>
								</div>
								<p className="text-xs leading-relaxed text-slate-ink dark:text-ink-200">
									{m.org}
								</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
