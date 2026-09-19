import { FileText } from "lucide-react";
import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";

export default function CallForPapers() {
	const { t, openSubmission } = useApp();

	return (
		<section id="cfp" className="flex h-full">
			<div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gold-500/30 bg-ink-900 px-6 py-8 text-paper shadow-[0_16px_45px_rgba(15,27,61,0.18)] dark:border-gold-400/25 sm:px-8 sm:py-10">
				<Reveal>
					<div className="relative flex flex-1 flex-col gap-7">
						<div className="absolute -end-16 -top-16 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />
						<div className="relative flex w-full flex-1 flex-col gap-7">
							<div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold-400/30 bg-gold-500/15 text-gold-400">
								<FileText size={24} />
							</div>
							<div>
								<h2 className="font-display text-3xl leading-tight sm:text-4xl">
									{t.cfp.title}
								</h2>
								<p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-200 sm:text-base">
									{t.cfp.text}
								</p>
								<p className="mt-3 text-sm font-medium text-gold-400">
									{t.cfp.deadline}
								</p>
							</div>
							<button
								type="button"
								onClick={openSubmission}
								className="mt-auto inline-flex w-full shrink-0 items-center justify-center rounded-full bg-gold-500 px-7 py-3 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-400 sm:w-fit"
							>
								{t.cfp.cta}
							</button>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
