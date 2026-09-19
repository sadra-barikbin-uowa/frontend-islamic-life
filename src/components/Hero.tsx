import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ConferenceName from "./ConferenceName";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * صور الـ Hero (الخلفية المتحركة أعلى الصفحة)
 * ضع صورك هنا: public/images/hero/hero-1.jpg / hero-2.jpg / hero-3.jpg
 * المقاس المقترح: 1920×1080 (landscape). عند استبدال الملفات بنفس الأسماء
 * سيعمل السلايدر تلقائيًا بدون أي تعديل على الكود.
 */
const heroImages = ["/الامام الحسين(ع).jpg", "/طلاب.jpg"];

const AUTOPLAY_MS = 5000;

export default function Hero() {
	const { t, lang, openSubmission } = useApp();
	const [index, setIndex] = useState(0);

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
			id="hero"
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

			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,31,0.55)_0%,rgba(10,15,31,0.75)_60%,rgba(10,15,31,0.96)_100%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,166,92,0.12),_transparent_60%)]" />

			<div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-40 lg:px-10 lg:pb-28">
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease }}
					className="mb-4"
				>
					<Link
						to="/seventh-conference"
						className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/15 px-4 py-1.5 text-xs font-semibold text-gold-300 backdrop-blur-sm transition-all hover:bg-gold-500/25 hover:border-gold-400"
					>
						<span className="flex h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
						<span>
							{lang === "ar"
								? "النسخة الحالية: مؤتمر الدولي السابع «الهوية الإسلامية والتحديات المعاصرة»"
								: "Current Edition: The 7th International Conference «Islamic Identity and Contemporary Challenges»"}
						</span>
						{lang === "ar" ? (
							<ChevronLeft size={14} />
						) : (
							<ChevronRight size={14} />
						)}
					</Link>
				</motion.div>

				<motion.p
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease, delay: 0.1 }}
					className="mb-5 max-w-xl text-sm font-medium text-gold-300"
				>
					{t.hero.eyebrow}
				</motion.p>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease, delay: 0.2 }}
					className="font-display max-w-4xl text-4xl leading-[1.15] text-paper sm:text-5xl lg:text-6xl"
				>
					<ConferenceName greenClassName="text-green-400" />
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease, delay: 0.35 }}
					className="mt-6 max-w-xl text-base leading-relaxed text-ink-100 sm:text-lg"
				>
					{t.hero.subtitle}
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease, delay: 0.5 }}
					className="mt-9 flex flex-wrap items-center gap-4"
				>
					<button
						onClick={openSubmission}
						className="group flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-400"
					>
						{t.hero.ctaPrimary}
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
						onClick={() => scrollTo("about")}
						className="rounded-full border border-paper/30 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-paper/60"
					>
						{t.hero.ctaSecondary}
					</button>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.7 }}
					className="mt-12 flex items-center gap-3 text-sm text-ink-200"
				>
					<span className="h-px w-10 bg-gold-400/60" />
					{t.hero.dateLine}
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
