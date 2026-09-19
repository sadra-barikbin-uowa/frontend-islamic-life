import { Calendar, MapPin, GraduationCap, Award } from "lucide-react";
import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";

const icons = [Calendar, MapPin, GraduationCap, Award];

export default function ConferenceInfo() {
	const { t } = useApp();

	return (
		<section id="info" className="relative z-10 -mt-16 px-5 lg:px-10">
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
					{t.info.map((item, i) => {
						const Icon = icons[i];
						return (
							<Reveal key={item.label} delay={i * 80}>
								<div className="flex h-full flex-col gap-3 rounded-lg border border-ink-900/10 bg-paper p-5 shadow-[0_8px_30px_rgba(15,27,61,0.08)] dark:border-paper/10 dark:bg-ink-800">
									<Icon size={20} className="text-gold-500" />
									<div>
										<p className="text-xs text-slate-ink dark:text-ink-200">
											{item.label}
										</p>
										<p className="mt-1 whitespace-pre-line font-display text-base text-ink-900 dark:text-paper sm:text-lg">
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
