import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { useApp } from "../context/AppContext";

const ease = [0.16, 1, 0.3, 1] as const;
const heroImages = [
	"/الامام الحسين(ع).jpg",
	"/معرض4.jpg",
	"/معرض3.jpg",
	"/معرض2.jpg",
];
const AUTOPLAY_MS = 5000;

export default function SeventhHero() {
	const { t, lang, openSubmission } = useApp();
	const [index, setIndex] = useState(0);
	const content = t.seventhConference;

	useEffect(() => {
		const id = setInterval(() => {
			setIndex((i) => (i + 1) % heroImages.length);
		}, AUTOPLAY_MS);
		return () => clearInterval(id);
	}, []);

	const scrollTo = (id: string) =>
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

	return (
		<section
			id="seventh-hero"
			className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-950"
		>
			<AnimatePresence mode="sync">
				<motion.div
					key={index}
					className="absolute inset-0 bg-cover bg-center"
					initial={{ opacity: 0, scale: 1.06 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1.2, ease }}
					style={{ backgroundImage: `url('${heroImages[index]}')` }}
				/>
			</AnimatePresence>

			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,31,0.6)_0%,rgba(10,15,31,0.8)_55%,rgba(10,15,31,0.98)_100%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,166,92,0.18),_transparent_65%)]" />

			<div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-36 lg:px-10 lg:pb-28">
				{/* Edition badge */}
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease }}
					className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold text-gold-300 backdrop-blur-sm"
				>
					<span className="flex h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
					<span>{content.editionBadge}</span>
				</motion.div>

				<motion.p
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease, delay: 0.1 }}
					className="mb-3 max-w-2xl text-sm font-medium text-paper/85 sm:text-base"
				>
					{content.eyebrow}
				</motion.p>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease, delay: 0.2 }}
					className="font-display max-w-5xl text-3xl leading-[1.2] text-paper sm:text-5xl lg:text-6xl"
				>
					<span className="block text-paper">{content.editionTitle}</span>
					<span className="mt-2 block bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200 bg-clip-text text-transparent">
						«{content.themeTitle}»
					</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease, delay: 0.35 }}
					className="mt-6 max-w-2xl text-base leading-relaxed text-ink-100 sm:text-lg"
				>
					{content.subtitle}
				</motion.p>

				{/* Action buttons */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease, delay: 0.5 }}
					className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
				>
					<button
						onClick={openSubmission}
						className="group flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-medium text-ink-950 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
					>
						<Send size={16} />
						<span>{content.ctaPrimary}</span>
						{lang === "ar" ? (
							<ChevronLeft
								size={16}
								className="transition-transform group-hover:-translate-x-0.5"
							/>
						) : (
							<ChevronRight
								size={16}
								className="transition-transform group-hover:translate-x-0.5"
							/>
						)}
					</button>

					<button
						onClick={() => scrollTo("rules")}
						className="flex items-center gap-2 rounded-full border border-paper/30 bg-paper/5 px-5 py-3 text-sm font-medium text-paper backdrop-blur-sm transition-colors hover:border-gold-400/60 hover:bg-paper/10"
					>
						<span>{content.ctaRules}</span>
					</button>

					<button
						onClick={() => scrollTo("committees")}
						className="flex items-center gap-2 rounded-full border border-paper/30 bg-paper/5 px-5 py-3 text-sm font-medium text-paper backdrop-blur-sm transition-colors hover:border-gold-400/60 hover:bg-paper/10"
					>
						<span>{content.ctaCommittees}</span>
					</button>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.7 }}
					className="mt-12 flex items-center gap-3 text-sm text-ink-200"
				>
					<span className="h-px w-10 bg-gold-400/60" />
					<span>{content.dateLine}</span>
				</motion.div>
			</div>

			<button
				onClick={() => scrollTo("info")}
				aria-label="scroll down"
				className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-paper/70 transition-colors hover:text-gold-300"
			>
				<motion.span
					animate={{ y: [0, 6, 0] }}
					transition={{ duration: 1.8, repeat: Infinity }}
					className="block"
				>
					<ArrowDown size={20} />
				</motion.span>
			</button>
		</section>
	);
}
