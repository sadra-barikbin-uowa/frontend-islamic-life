import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
	ArrowUpRight,
	Award as AwardIcon,
	CalendarDays,
	X,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { awards, type RecognitionAward } from "../config/awards";

const awardYears = ["2025", "2024", "2023"];

export default function AwardsSection() {
	const { t, lang } = useApp();
	const [yearFilter, setYearFilter] = useState("all");
	const [selectedAward, setSelectedAward] = useState<RecognitionAward | null>(
		null,
	);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLElement | null>(null);
	const prefersReducedMotion = useReducedMotion() ?? false;
	const copy = t.awards;

	const filteredAwards =
		yearFilter === "all"
			? awards
			: awards.filter((award) => award.year === yearFilter);

	const awardName = (award: RecognitionAward) =>
		lang === "ar" ? award.titleAr : award.titleEn;
	const organizationName = (award: RecognitionAward) =>
		lang === "ar" ? award.organizationAr : award.organizationEn;
	const categoryName = (award: RecognitionAward) =>
		lang === "ar" ? award.categoryAr : award.categoryEn;
	const description = (award: RecognitionAward) =>
		lang === "ar" ? award.descriptionAr : award.descriptionEn;

	useEffect(() => {
		if (!selectedAward) return;

		const previousOverflow = document.body.style.overflow;
		const previousFocus = document.activeElement;
		document.body.style.overflow = "hidden";
		closeButtonRef.current?.focus();

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setSelectedAward(null);
				return;
			}

			if (event.key !== "Tab" || !dialogRef.current) return;
			const focusable = Array.from(
				dialogRef.current.querySelectorAll<HTMLElement>(
					"button:not([disabled]), a[href]",
				),
			);
			if (focusable.length === 0) {
				event.preventDefault();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", onKeyDown);
			if (previousFocus instanceof HTMLElement) previousFocus.focus();
		};
	}, [selectedAward]);

	const openAward = (
		award: RecognitionAward,
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		triggerRef.current = event.currentTarget;
		setSelectedAward(award);
	};

	const closeAward = () => setSelectedAward(null);

	return (
		<section
			id="awards"
			dir={t.dir}
			className="border-y border-ink-900/10 px-5 py-20 dark:border-paper/10 lg:px-10"
		>
			<div className="mx-auto max-w-7xl">
				<div className="text-center">
					<h2 className="font-display text-2xl text-ink-900 dark:text-paper sm:text-3xl">
						{copy.title}
					</h2>
					<p className="mt-2 text-sm text-slate-ink dark:text-ink-200 sm:text-base">
						{copy.subtitle}
					</p>
					<p className="mx-auto mt-4 w-fit rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-700 dark:text-gold-300">
						{copy.sampleData}
					</p>
				</div>

				<div
					className="mt-8 flex flex-wrap justify-center gap-2"
					role="group"
					aria-label={copy.filterLabel}
				>
					{["all", ...awardYears].map((year) => {
						const selected = yearFilter === year;
						return (
							<button
								key={year}
								type="button"
								aria-pressed={selected}
								onClick={() => setYearFilter(year)}
								className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none ${
									selected
										? "border-gold-500 bg-gold-500 text-ink-950"
										: "border-ink-900/15 text-ink-800 hover:border-gold-500/60 dark:border-paper/20 dark:text-paper"
								}`}
							>
								{year === "all" ? copy.allYears : year}
							</button>
						);
					})}
				</div>

				<p className="sr-only" aria-live="polite" aria-atomic="true">
					{filteredAwards.length}
				</p>

				<motion.div
					layout
					className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
				>
					<AnimatePresence initial={false} mode="popLayout">
						{filteredAwards.map((award, index) => (
							<motion.article
								key={award.id}
								layout={!prefersReducedMotion}
								initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
								transition={{
									duration: prefersReducedMotion ? 0 : 0.24,
									delay: prefersReducedMotion ? 0 : index * 0.04,
								}}
								className="group flex h-full flex-col rounded-lg border border-ink-900/10 bg-paper p-5 shadow-[0_8px_30px_rgba(15,27,61,0.05)] transition-all hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-[0_14px_34px_rgba(15,27,61,0.1)] motion-reduce:transform-none motion-reduce:transition-none dark:border-paper/10 dark:bg-ink-950 sm:p-6"
							>
								<div className="flex items-start justify-between gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-600 dark:text-gold-400">
										<AwardIcon
											size={24}
											aria-hidden="true"
											className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none"
										/>
									</div>
									<span className="rounded-full border border-gold-500/25 px-2.5 py-1 text-xs font-semibold text-gold-700 dark:text-gold-300">
										{copy.sampleBadge}
									</span>
								</div>

								{award.image && (
									<img
										src={award.image}
										alt={awardName(award)}
										className="mt-5 h-32 w-full rounded-md object-contain"
										loading="lazy"
									/>
								)}

								<h3 className="mt-5 font-display text-xl leading-snug text-ink-900 dark:text-paper">
									{awardName(award)}
								</h3>
								<p className="mt-2 text-sm text-slate-ink dark:text-ink-200">
									{organizationName(award)}
								</p>
								<p className="mt-3 text-sm leading-relaxed text-slate-ink dark:text-ink-200">
									{description(award)}
								</p>

								<div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink-900/10 pt-4 dark:border-paper/10">
									<span className="inline-flex items-center gap-2 text-sm font-medium text-ink-800 dark:text-ink-100">
										<CalendarDays size={16} aria-hidden="true" />
										{award.year}
									</span>
									<span className="text-sm text-slate-ink dark:text-ink-200">
										{categoryName(award)}
									</span>
								</div>

								<button
									type="button"
									onClick={(event) => openAward(award, event)}
									aria-label={`${copy.viewDetails}: ${awardName(award)}`}
									className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-gold-500/35 px-4 py-2 text-sm font-semibold text-gold-700 transition-colors hover:border-gold-500 hover:bg-gold-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:text-gold-300 motion-reduce:transition-none"
								>
									{copy.viewDetails}
									<ArrowUpRight size={16} aria-hidden="true" />
								</button>
							</motion.article>
						))}
					</AnimatePresence>
				</motion.div>
			</div>

			{typeof document !== "undefined" &&
				createPortal(
					<AnimatePresence>
						{selectedAward && (
							<motion.div
								className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ink-950/70 px-4 py-8 backdrop-blur-sm"
								initial={prefersReducedMotion ? false : { opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={prefersReducedMotion ? undefined : { opacity: 0 }}
								onMouseDown={(event) => {
									if (event.target === event.currentTarget) closeAward();
								}}
							>
								<motion.div
									ref={dialogRef}
									dir={t.dir}
									role="dialog"
									aria-modal="true"
									aria-labelledby="award-dialog-title"
									aria-describedby="award-dialog-description"
									tabIndex={-1}
									className="w-full max-w-lg overflow-hidden rounded-xl border border-gold-500/30 bg-paper shadow-2xl outline-none dark:bg-ink-950"
									initial={
										prefersReducedMotion
											? false
											: { opacity: 0, y: 20, scale: 0.98 }
									}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={
										prefersReducedMotion
											? undefined
											: { opacity: 0, y: 12, scale: 0.98 }
									}
									transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
								>
									<div className="flex items-start justify-between gap-4 border-b border-ink-900/10 px-6 py-5 dark:border-paper/10 sm:px-8">
										<div className="flex items-start gap-3">
											<div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
												<AwardIcon size={20} aria-hidden="true" />
											</div>
											<div>
												<p className="text-xs font-semibold text-gold-700 dark:text-gold-300">
													{copy.sampleBadge}
												</p>
												<h2
													id="award-dialog-title"
													className="mt-1 font-display text-2xl text-ink-900 dark:text-paper"
												>
													{awardName(selectedAward)}
												</h2>
											</div>
										</div>
										<button
											ref={closeButtonRef}
											type="button"
											onClick={closeAward}
											aria-label={copy.close}
											className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-ink transition-colors hover:bg-ink-900/5 hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 dark:text-ink-200 dark:hover:bg-paper/5 dark:hover:text-paper motion-reduce:transition-none"
										>
											<X size={19} aria-hidden="true" />
										</button>
									</div>
									<div className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">
										{selectedAward.image && (
											<img
												src={selectedAward.image}
												alt={awardName(selectedAward)}
												className="max-h-52 w-full rounded-lg object-contain"
											/>
										)}
										<dl className="grid gap-4 sm:grid-cols-2">
											<div>
												<dt className="text-xs font-medium text-slate-ink dark:text-ink-200">
													{copy.organizationLabel}
												</dt>
												<dd className="mt-1 font-semibold text-ink-900 dark:text-paper">
													{organizationName(selectedAward)}
												</dd>
											</div>
											<div>
												<dt className="text-xs font-medium text-slate-ink dark:text-ink-200">
													{copy.yearLabel}
												</dt>
												<dd className="mt-1 font-semibold text-ink-900 dark:text-paper">
													{selectedAward.year}
												</dd>
											</div>
											<div className="sm:col-span-2">
												<dt className="text-xs font-medium text-slate-ink dark:text-ink-200">
													{copy.categoryLabel}
												</dt>
												<dd className="mt-1 font-semibold text-ink-900 dark:text-paper">
													{categoryName(selectedAward)}
												</dd>
											</div>
										</dl>
										<p
											id="award-dialog-description"
											className="text-base leading-relaxed text-slate-ink dark:text-ink-200"
										>
											{description(selectedAward)}
										</p>
									</div>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</section>
	);
}
