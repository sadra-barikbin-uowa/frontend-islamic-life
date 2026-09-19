import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import ConferenceName from "./ConferenceName";
import HighlightedConferenceText from "./HighlightedConferenceText";

export default function AboutWebsiteModal() {
	const { t, aboutWebsiteOpen, closeAboutWebsite } = useApp();

	useEffect(() => {
		if (!aboutWebsiteOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeAboutWebsite();
		};
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [aboutWebsiteOpen, closeAboutWebsite]);

	return (
		<AnimatePresence>
			{aboutWebsiteOpen && (
				<motion.div
					className="fixed inset-0 z-[75] flex items-center justify-center overflow-y-auto bg-ink-950/70 px-4 py-8 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) closeAboutWebsite();
					}}
				>
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-labelledby="about-website-modal-title"
						className="w-full max-w-lg overflow-hidden rounded-xl border border-gold-500/30 bg-paper shadow-2xl dark:bg-ink-950"
						initial={{ opacity: 0, y: 24, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 16, scale: 0.98 }}
						transition={{ duration: 0.25 }}
					>
						<div className="flex items-start justify-between border-b border-ink-900/10 px-6 py-5 dark:border-paper/10 sm:px-8">
							<div className="flex items-start gap-3">
								<div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
									<Info size={20} />
								</div>
								<div>
									<p className="text-xs font-medium text-gold-600 dark:text-gold-400">
										<ConferenceName greenClassName="text-green-500 dark:text-green-400" />
									</p>
									<h2
										id="about-website-modal-title"
										className="mt-1 font-display text-2xl text-ink-900 dark:text-paper"
									>
										{t.aboutWebsite.title}
									</h2>
								</div>
							</div>
							<button
								type="button"
								onClick={closeAboutWebsite}
								aria-label={t.aboutWebsite.close}
								className="flex h-9 w-9 items-center justify-center rounded-full text-slate-ink transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:text-ink-200 dark:hover:bg-paper/5 dark:hover:text-paper"
							>
								<X size={19} />
							</button>
						</div>

						<div className="space-y-5 px-6 py-7 text-base leading-relaxed text-slate-ink dark:text-ink-200 sm:px-8 sm:py-8">
							{t.aboutWebsite.paragraphs.map((paragraph) => (
								<p key={paragraph}>
									<HighlightedConferenceText text={paragraph} />
								</p>
							))}
							<div className="flex justify-end border-t border-ink-900/10 pt-5 dark:border-paper/10">
								<button
									type="button"
									onClick={closeAboutWebsite}
									className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-400"
								>
									{t.aboutWebsite.close}
								</button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
