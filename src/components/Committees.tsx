import { useState } from "react";
import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";

export default function Committees() {
	const { t } = useApp();
	const [active, setActive] = useState(0);
	const group = t.committees.groups[active];

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
