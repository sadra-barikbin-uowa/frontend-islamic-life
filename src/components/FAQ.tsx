import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";
import Accordion from "./Accordion";

export default function FAQ() {
	const { t } = useApp();

	return (
		<section id="faq" className="flex h-full">
			<div className="flex h-full w-full flex-col rounded-2xl border border-gold-500/25 bg-paper p-6 shadow-[0_16px_45px_rgba(15,27,61,0.1)] dark:border-gold-400/20 dark:bg-ink-950 sm:p-8">
				<Reveal>
					<h2 className="font-display text-3xl text-ink-900 dark:text-paper sm:text-4xl">
						{t.faq.title}
					</h2>
					<p className="mt-3 text-sm leading-relaxed text-slate-ink dark:text-ink-200">
						{t.faq.subtitle}
					</p>
				</Reveal>
				<Reveal delay={100} className="mt-8 flex-1">
					<Accordion items={t.faq.items} />
				</Reveal>
			</div>
		</section>
	);
}
