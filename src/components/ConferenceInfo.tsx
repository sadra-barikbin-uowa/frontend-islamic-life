import { Calendar, MapPin, GraduationCap, Award } from "lucide-react";
import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";

const icons = [Calendar, MapPin, GraduationCap, Award];

export default function ConferenceInfo() {
	const { t } = useApp();

	return (
		<section id="info" className="relative z-10 -mt-16 px-5 lg:px-10">
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
					{t.info.map((item, i) => {
						const Icon = icons[i];
						return (
							<Reveal key={item.label} delay={i * 80}>
								<div className="flex min-h-[11rem] h-full flex-col gap-4 rounded-lg border-2 border-gold-500/35 bg-paper p-5 shadow-[0_8px_30px_rgba(15,27,61,0.08)] dark:border-gold-400/30 dark:bg-ink-800 sm:p-6">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-500 dark:border-gold-400/30 dark:bg-gold-500/10">
										<Icon size={28} strokeWidth={1.8} />
									</div>
									<div>
										<p className="text-base font-semibold leading-tight text-ink-700 dark:text-ink-100 sm:text-lg">
											{item.label}
										</p>
										<p className="mt-2 whitespace-pre-line font-display text-lg leading-snug text-ink-900 dark:text-paper sm:text-xl">
											{item.value}
										</p>
									</div>
								</div>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
