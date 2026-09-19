import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";

const COUNTDOWN_AUDIO = "/audio/" + encodeURIComponent("عد تنازلي.mp3");
const INTRO_AUDIO = "/audio/" + encodeURIComponent("من العراق.mp3");
const FINAL_MESSAGE_DURATION = 18000;

function stopAudio(audioRef: { current: HTMLAudioElement | null }) {
	const audio = audioRef.current;
	if (!audio) return;
	audio.pause();
	audio.currentTime = 0;
	audioRef.current = null;
}

const COUNTDOWN_WORDS = [
	"عشرة",
	"تسعة",
	"ثمانية",
	"سبعة",
	"ستة",
	"خمسة",
	"أربعة",
	"ثلاثة",
	"اثنان",
	"واحد",
];

type CountdownPhase = "counting" | "message";

const INTRO_LINES = [
	"مِنَ  العِرَاقِ  مَهْدِ  الحَضَارَاتِ،",
	"وَمِنْ  كَرْبَلَاءَ  مَهْدِ  العِزَّةِ  وَ الخُلُودِ،",
	"مِنْ  جِوَارِ  الحُسَيْنِ (عَلَيْهِ السَّلَامُ)،",
	"وَمِنْ  صَرْحِ  وَارِثِ  الأَنْبِيَاءِ",
	"يَبْدَأُ  اللِّقَاءُ",
	"وَيَبْدَأُ  مَعَهُ  فِكْرٌ  عُنْوَانُهُ:",
];

export default function CountdownModal() {
	const { countdownOpen, closeCountdown } = useApp();
	const [phase, setPhase] = useState<CountdownPhase>("counting");
	const [count, setCount] = useState(0);
	const countdownAudioRef = useRef<HTMLAudioElement | null>(null);
	const introAudioRef = useRef<HTMLAudioElement | null>(null);
	const countdownEndedHandlerRef = useRef<(() => void) | null>(null);
	const countdownAudioEndedRef = useRef(false);
	const countRef = useRef(0);
	const finalStartedRef = useRef(false);
	const startedForOpenRef = useRef(false);

	useEffect(() => {
		if (!countdownOpen) {
			startedForOpenRef.current = false;
			return;
		}

		if (startedForOpenRef.current) return;
		startedForOpenRef.current = true;
		startCountdown();
	}, [countdownOpen]);

	useEffect(() => {
		countRef.current = count;
	}, [count]);

	useEffect(() => {
		if (!countdownOpen || phase !== "counting") return;
		if (count === COUNTDOWN_WORDS.length - 1) return;

		const timer = window.setTimeout(() => {
			setCount((value) => value + 1);
		}, 1000);

		return () => window.clearTimeout(timer);
	}, [count, countdownOpen, phase]);

	useEffect(() => {
		if (!countdownOpen || phase !== "message") return;

		const timer = window.setTimeout(closeCountdown, FINAL_MESSAGE_DURATION);
		return () => window.clearTimeout(timer);
	}, [closeCountdown, countdownOpen, phase]);

	useEffect(() => {
		if (!countdownOpen || phase !== "counting") return;

		const countdownAudio = countdownAudioRef.current;
		if (!countdownAudio) return;

		const handleCountdownAudioEnded = () => {
			countdownAudioEndedRef.current = true;
			if (countRef.current !== COUNTDOWN_WORDS.length - 1) return;
			if (finalStartedRef.current) return;
			finalStartedRef.current = true;
			countdownAudio.pause();
			countdownAudio.currentTime = 0;
			countdownAudio.removeEventListener("ended", handleCountdownAudioEnded);
			countdownAudio.removeEventListener("error", handleCountdownAudioEnded);
			countdownAudioRef.current = null;

			const introAudio = new Audio(INTRO_AUDIO);
			introAudio.preload = "auto";
			introAudioRef.current = introAudio;
			introAudio.play().catch(() => undefined);
			setPhase("message");
		};

		countdownEndedHandlerRef.current = handleCountdownAudioEnded;
		countdownAudio.addEventListener("ended", handleCountdownAudioEnded);
		countdownAudio.addEventListener("error", handleCountdownAudioEnded);
		if (countdownAudioEndedRef.current) handleCountdownAudioEnded();

		return () => {
			countdownAudio.removeEventListener("ended", handleCountdownAudioEnded);
			countdownAudio.removeEventListener("error", handleCountdownAudioEnded);
			if (countdownEndedHandlerRef.current === handleCountdownAudioEnded) {
				countdownEndedHandlerRef.current = null;
			}
		};
	}, [countdownOpen, phase]);

	useEffect(() => {
		if (!countdownOpen) {
			stopAudio(countdownAudioRef);
			stopAudio(introAudioRef);
			return;
		}

		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [countdownOpen]);

	useEffect(() => {
		return () => {
			stopAudio(countdownAudioRef);
			stopAudio(introAudioRef);
		};
	}, []);

	const startCountdown = () => {
		stopAudio(countdownAudioRef);
		stopAudio(introAudioRef);
		finalStartedRef.current = false;

		const audio = new Audio(COUNTDOWN_AUDIO);
		audio.preload = "auto";
		countdownAudioRef.current = audio;
		audio.currentTime = 0;
		setCount(0);
		countRef.current = 0;
		countdownAudioEndedRef.current = false;
		setPhase("counting");
		audio.play().catch(() => undefined);
	};

	const handleClose = () => {
		stopAudio(countdownAudioRef);
		stopAudio(introAudioRef);
		closeCountdown();
	};

	useEffect(() => {
		const handleCountdownStart = () => {
			if (startedForOpenRef.current) return;
			startedForOpenRef.current = true;
			startCountdown();
		};

		window.addEventListener("countdown-start", handleCountdownStart);
		return () =>
			window.removeEventListener("countdown-start", handleCountdownStart);
	}, []);

	return (
		<AnimatePresence>
			{countdownOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-y-auto bg-ink-950/95 px-5 py-8 backdrop-blur-md"
					dir="rtl"
				>
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(99,102,241,0.24),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(201,166,92,0.12),transparent_28%)]" />
					<div className="pattern-islamic pointer-events-none absolute inset-0 opacity-[0.06]" />
					<div className="pointer-events-none absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl sm:h-96 sm:w-96" />

					<button
						type="button"
						onClick={handleClose}
						className="absolute end-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/80 transition-colors hover:border-gold-400 hover:text-gold-300"
						aria-label="إغلاق العد التنازلي"
					>
						<X size={16} />
						<span>إغلاق</span>
					</button>

					<div className="relative z-10 flex w-full max-w-2xl flex-col items-center justify-center text-center">
						<AnimatePresence mode="wait">
							{phase === "counting" && (
								<motion.div
									key={COUNTDOWN_WORDS[count]}
									initial={{ opacity: 0, scale: 0.72, filter: "blur(10px)" }}
									animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
									exit={{ opacity: 0, scale: 1.12, filter: "blur(8px)" }}
									transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
									className="relative flex h-[clamp(15rem,55vw,24rem)] w-[clamp(15rem,55vw,24rem)] items-center justify-center"
								>
									<motion.span
										aria-hidden="true"
										className="absolute inset-0 rounded-full border border-indigo-300/25"
										animate={{
											scale: [0.9, 1, 0.9],
											opacity: [0.35, 0.7, 0.35],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: "easeInOut",
										}}
									/>
									<motion.span
										aria-hidden="true"
										className="absolute inset-5 rounded-full border border-gold-400/20"
										animate={{ rotate: 360 }}
										transition={{
											duration: 12,
											repeat: Infinity,
											ease: "linear",
										}}
									/>
									<span className="relative z-10 font-display px-4 text-[clamp(4.5rem,18vw,11rem)] font-bold leading-none text-paper drop-shadow-[0_0_35px_rgba(129,140,248,0.35)]">
										{COUNTDOWN_WORDS[count]}
									</span>
								</motion.div>
							)}

							{phase === "message" && (
								<motion.div
									key="message"
									initial={{ opacity: 0, scale: 0.96 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
									className="relative flex max-w-4xl flex-col items-center px-3 text-center font-display text-xl font-bold leading-[1.9] text-paper/95 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:leading-[1.95]"
								>
									<div className="pointer-events-none absolute inset-x-1/4 top-1/3 h-40 rounded-full bg-emerald-500/10 blur-3xl" />
									<div className="relative">
										{INTRO_LINES.map((line, index) => (
											<motion.p
												key={line}
												initial={{ opacity: 0, y: 12 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{
													duration: 0.6,
													delay: 0.25 + index * 0.2,
												}}
												className="mb-2 sm:mb-3"
											>
												{line}
											</motion.p>
										))}
										<motion.p
											initial={{ opacity: 0, y: 18, scale: 0.94 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											transition={{
												duration: 1,
												delay: 1.55,
												ease: [0.16, 1, 0.3, 1],
											}}
											className="mt-3 text-2xl font-extrabold text-emerald-400 drop-shadow-[0_0_18px_rgba(52,211,153,0.45)] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
										>
											الإِسْلَامُ حَيَاةٌ
										</motion.p>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
