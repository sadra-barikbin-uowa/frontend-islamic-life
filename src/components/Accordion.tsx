import { useState } from "react";
import { Plus } from "lucide-react";

export default function Accordion({
	items,
}: {
	items: readonly { q: string; a: string }[];
}) {
	const [open, setOpen] = useState<number | null>(0);

	return (
		<div className="space-y-3">
			{items.map((item, i) => {
				const isOpen = open === i;
				return (
					<div
						key={item.q}
						className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
							isOpen
								? "border-gold-500/45 bg-gold-500/[0.06] dark:border-gold-400/35 dark:bg-gold-500/[0.08]"
								: "border-ink-900/10 bg-paper/70 hover:border-gold-500/30 hover:bg-gold-500/[0.04] dark:border-paper/10 dark:bg-ink-900/40 dark:hover:border-gold-400/25 dark:hover:bg-gold-500/[0.05]"
						}`}
					>
						<button
							onClick={() => setOpen(isOpen ? null : i)}
							aria-expanded={isOpen}
							className="flex w-full items-center justify-between gap-4 px-4 py-4 text-start transition-colors sm:px-5 sm:py-5"
						>
							<span className="font-display text-base font-medium leading-relaxed text-ink-900 dark:text-paper sm:text-lg">
								{item.q}
							</span>
							<Plus
								size={18}
								className={`shrink-0 text-gold-500 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
							/>
						</button>
						<div className={`accordion-panel ${isOpen ? "open" : ""}`}>
							<div className="px-4 sm:px-5">
								<p className="max-w-2xl border-t border-gold-500/15 pb-5 pt-1 text-sm leading-relaxed text-slate-ink dark:border-gold-400/15 dark:text-ink-200">
									{item.a}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
