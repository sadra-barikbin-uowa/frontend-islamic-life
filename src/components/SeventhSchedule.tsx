import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";

export default function SeventhSchedule() {
	const { t } = useApp();
	const { schedule } = t.seventhConference;

	return (
		<section className="bg-transparent px-5 py-16 lg:px-10 lg:py-20">
			<div className="mx-auto max-w-7xl">
				<Reveal>
					<h2 className="font-display text-2xl text-ink-900 dark:text-paper sm:text-3xl">
						{schedule.title}
					</h2>
				</Reveal>
				<ol className="mt-8 grid gap-5 md:grid-cols-3">
					{schedule.items.map((item, index) => (
						<Reveal key={item.label} delay={index * 80}>
							<li className="h-full min-h-36 rounded-lg border-2 border-gold-500/55 border-s-4 bg-white px-5 py-5 shadow-[0_10px_28px_rgba(15,27,61,0.12)] sm:px-6 dark:border-gold-400/50 dark:bg-ink-800">
								<p className="text-sm font-semibold text-gold-600 dark:text-gold-400">
									{item.label}
								</p>
								<time
									dir="ltr"
									className="mt-3 block text-start font-display text-xl leading-relaxed text-ink-900 dark:text-paper sm:text-2xl"
								>
									{item.date}
								</time>
							</li>
						</Reveal>
					))}
				</ol>
			</div>
		</section>
	);
}
