import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";
import ConferenceName from "./ConferenceName";
import HighlightedConferenceText from "./HighlightedConferenceText";

export default function About() {
	const { t } = useApp();
	const blocks = [t.about.vision, t.about.mission, t.about.goals];

	return (
		<section id="about" className="px-5 py-24 lg:px-10 lg:py-32">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
					<div className="lg:col-span-5">
						<Reveal>
							<p className="mb-3 text-sm font-medium text-gold-600 dark:text-gold-400">
								<ConferenceName greenClassName="text-green-500 dark:text-green-400" />
							</p>
							<h2 className="font-display text-3xl leading-tight text-ink-900 dark:text-paper sm:text-4xl">
								{t.about.title}
							</h2>
							<div className="rule mt-6 w-24 text-ink-900 dark:text-paper" />
							<p className="mt-6 max-w-md text-base leading-relaxed text-slate-ink dark:text-ink-200">
								<HighlightedConferenceText text={t.about.lead} />
							</p>
						</Reveal>

						<Reveal delay={100} className="mt-10">
							<p className="text-xs font-medium uppercase tracking-wide text-gold-600 dark:text-gold-400">
								{t.about.partnersTitle}
							</p>
							<div className="mt-4 overflow-hidden rounded-lg border border-gold-400/30">
								{t.about.cooperation.items.map((partner, i) => (
									<div
										key={partner}
										className={`px-4 py-3 text-sm text-ink-900 dark:text-paper ${i > 0 ? "border-t border-gold-400/20" : ""}`}
									>
										{partner}
									</div>
								))}
							</div>
						</Reveal>
					</div>

					<div className="lg:col-span-7">
						<div className="grid gap-px overflow-hidden rounded-lg border border-ink-900/10 bg-ink-900/10 dark:border-paper/10 dark:bg-paper/10 sm:grid-cols-3">
							{blocks.map((b, i) => (
								<Reveal key={b.title} delay={i * 100}>
									<div className="h-full bg-paper p-7 dark:bg-ink-950">
										<span className="font-display text-2xl text-gold-500">
											{String(i + 1).padStart(2, "0")}
										</span>
										<h3 className="mt-4 font-display text-lg text-ink-900 dark:text-paper">
											{b.title}
										</h3>
										<p className="mt-3 text-sm leading-relaxed text-slate-ink dark:text-ink-200">
											{b.text}
										</p>
									</div>
								</Reveal>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
