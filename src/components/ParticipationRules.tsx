import { ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";

export default function ParticipationRules() {
	const { t } = useApp();

	return (
		<section
			id="rules"
			className="relative overflow-hidden bg-ink-900 px-5 py-24 text-paper lg:px-10 lg:py-32"
		>
			<div className="pattern-islamic absolute inset-0 opacity-[0.06]" />
			<div className="relative mx-auto max-w-5xl">
				<Reveal>
					<div className="max-w-2xl">
						<p className="mb-3 text-sm font-medium text-gold-400">
							{t.rules.title}
						</p>
						<h2 className="font-display text-3xl leading-tight sm:text-4xl">
							{t.rules.subtitle}
						</h2>
					</div>
				</Reveal>

				<div className="mt-12 grid gap-4 sm:grid-cols-2">
					{t.rules.items.map((rule, i) => (
						<Reveal key={rule} delay={i * 70}>
							<div className="flex h-full gap-4 rounded-lg border border-paper/10 bg-paper/[0.04] p-6">
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-400/40 font-display text-sm text-gold-400">
									{String(i + 1).padStart(2, "0")}
								</span>
								<p className="text-[26px] leading-relaxed text-ink-100">
									{rule}
								</p>
							</div>
						</Reveal>
					))}
				</div>

				<Reveal delay={t.rules.items.length * 70 + 80} className="mt-8">
					<div
						role="status"
						className="flex items-center gap-4 rounded-xl border-2 border-gold-400/70 bg-gold-500/15 px-6 py-5 text-base font-bold leading-relaxed text-gold-100 shadow-[0_10px_35px_rgba(201,166,92,0.14)] sm:px-7 sm:py-6 sm:text-lg"
					>
						<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-300/60 bg-gold-400/20">
							<ShieldCheck
								size={26}
								strokeWidth={2.2}
								className="text-gold-300"
							/>
						</span>
						<span>{t.cfp.deadline}</span>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
