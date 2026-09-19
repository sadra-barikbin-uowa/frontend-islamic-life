import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import ConferenceName from "./ConferenceName";

const splitEase = [0.87, 0, 0.13, 1] as const;

export default function Preloader({ show }: { show: boolean }) {
	const { t } = useApp();

	return (
		<AnimatePresence>
			{show && (
				<div className="fixed inset-0 z-[100] bg-ink-950" aria-hidden={!show}>
					{/* الشعار في المنتصف — نجمة إسلامية ثمانية بدوران هادئ، تختفي قبل انفتاح الطبقتين */}
					<motion.div
						className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{
							opacity: 0,
							scale: 0.92,
							transition: { duration: 0.35, ease: "easeIn" },
						}}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
					>
						<div className="flex flex-col items-center gap-6">
							<div className="relative flex h-28 w-28 items-center justify-center">
								<motion.div
									className="absolute inset-0 rounded-[18px] border border-gold-400/80 bg-gold-400/5 shadow-[0_0_40px_rgba(245,188,92,0.18)]"
									initial={{ scale: 0.25, opacity: 0.2 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
								/>
								<motion.div
									className="absolute inset-[18px] rounded-[12px] border border-gold-400/60 bg-ink-950"
									initial={{ scale: 0.5, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{
										duration: 0.9,
										delay: 0.1,
										ease: [0.22, 1, 0.36, 1],
									}}
								/>
								<motion.div
									className="absolute inset-0 rounded-[18px]"
									initial={{ opacity: 0.4 }}
									animate={{ opacity: [0.3, 0.8, 0.45] }}
									transition={{
										duration: 1.8,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								>
									<div className="absolute inset-[10px] rounded-[12px] border border-gold-300/50" />
								</motion.div>
								<span className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-gold-400 bg-ink-950/90 text-2xl font-display text-gold-400 shadow-[0_0_18px_rgba(245,188,92,0.18)]">
									و
								</span>
							</div>
							<motion.div
								className="text-center"
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.35 }}
							>
								<p className="font-display text-sm tracking-wide text-paper">
									{t.meta.university}
								</p>
								<p className="mt-1 text-xs text-ink-200">
									<ConferenceName greenClassName="text-green-400" />
								</p>
								<div className="mx-auto mt-4 h-px w-24 overflow-hidden bg-paper/10">
									<motion.div
										className="h-full bg-gold-400"
										initial={{ x: "-100%" }}
										animate={{ x: "0%" }}
										transition={{
											duration: 1.1,
											ease: "easeInOut",
											delay: 0.2,
										}}
									/>
								</div>
							</motion.div>
						</div>
					</motion.div>

					<motion.div
						className="absolute inset-0 bg-ink-950"
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{
							opacity: 0,
							scale: 1.18,
							transition: { duration: 0.7, ease: splitEase, delay: 0.15 },
						}}
					/>
					<motion.div
						className="absolute inset-0 z-10"
						initial={{ opacity: 1 }}
						animate={{ opacity: 1 }}
						exit={{
							scale: 1.35,
							opacity: 0,
							transition: { duration: 0.8, ease: splitEase, delay: 0.15 },
						}}
					>
						<div className="pattern-islamic absolute inset-0 opacity-[0.06]" />
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
