import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";

export default function Objectives() {
	const { t } = useApp();

	return (
		<section id="objectives" className="bg-ink-900 px-5 py-24 text-paper lg:px-10 lg:py-32">
			<div className="mx-auto max-w-7xl">
				<Reveal>
					<div className="max-w-xl">
						<h2 className="font-display text-3xl sm:text-4xl">
							{t.objectives.title}
						</h2>
						<p className="mt-4 text-base leading-relaxed text-ink-200">
							{t.objectives.subtitle}
						</p>
					</div>
				</Reveal>

				<div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{t.objectives.items.map((item, i) => (
						<Reveal key={item.n} delay={i * 100}>
							<div className="border-t border-gold-400/40 pt-6">
								<span className="font-display text-3xl text-gold-400">
									{item.n}
								</span>
								<h3 className="mt-4 font-display text-[24px] leading-tight">
									{item.title}
								</h3>
								<p className="mt-3 text-[18px] leading-relaxed text-ink-200">
									{item.text}
								</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
