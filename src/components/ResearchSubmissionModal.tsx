import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import ConferenceName from "./ConferenceName";

const submissionEmail = "cois@uowa.edu.iq";

export default function ResearchSubmissionModal() {
	const { t, lang, submissionOpen, closeSubmission } = useApp();
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!submissionOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeSubmission();
		};
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [closeSubmission, submissionOpen]);

	const close = () => {
		setCopied(false);
		closeSubmission();
	};

	const copyEmail = async () => {
		let copiedSuccessfully = false;

		if (window.isSecureContext && navigator.clipboard?.writeText) {
			try {
				await navigator.clipboard.writeText(submissionEmail);
				copiedSuccessfully = true;
			} catch {
				// Use the legacy fallback below when the Clipboard API rejects the request.
			}
		}

		if (!copiedSuccessfully) {
			const textarea = document.createElement("textarea");
			textarea.value = submissionEmail;
			textarea.setAttribute("readonly", "");
			textarea.style.position = "fixed";
			textarea.style.opacity = "0";
			document.body.appendChild(textarea);
			textarea.select();

			try {
				copiedSuccessfully = document.execCommand("copy");
			} catch {
				copiedSuccessfully = false;
			} finally {
				document.body.removeChild(textarea);
			}
		}

		if (copiedSuccessfully) {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2500);
		}
	};

	return (
		<AnimatePresence>
			{submissionOpen && (
				<motion.div
					dir={t.dir}
					className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ink-950/70 px-4 py-8 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) close();
					}}
				>
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-labelledby="research-modal-title"
						className="w-full max-w-lg overflow-hidden rounded-xl border border-gold-500/30 bg-paper shadow-2xl dark:bg-ink-950"
						initial={{ opacity: 0, y: 24, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 16, scale: 0.98 }}
						transition={{ duration: 0.25 }}
					>
						<div className="flex items-start justify-between border-b border-ink-900/10 px-6 py-5 dark:border-paper/10 sm:px-8">
							<div>
								<p className="text-xs font-medium text-gold-600 dark:text-gold-400">
									<ConferenceName greenClassName="text-green-500 dark:text-green-400" />
								</p>
								<h2
									id="research-modal-title"
									className="mt-1 font-display text-2xl text-ink-900 dark:text-paper"
								>
									{t.submission.title}
								</h2>
							</div>
							<button
								type="button"
								onClick={close}
								disabled={status === "sending"}
								aria-label={t.submission.close}
								className="flex h-9 w-9 items-center justify-center rounded-full text-slate-ink transition-colors hover:bg-ink-900/5 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40 dark:text-ink-200 dark:hover:bg-paper/5 dark:hover:text-paper"
							>
								<X size={19} />
							</button>
						</div>

						<div className="space-y-5 px-6 py-8 text-center sm:px-8 sm:py-10">
							<p className="text-[22px] font-bold leading-relaxed text-slate-ink dark:text-ink-200">
								{lang === "ar"
									? "يرجى إرسال بحثكم عبر البريد الإلكتروني التالي"
									: "Please send your research paper to the following email address"}
							</p>
							<div className="rounded-lg border border-gold-500/30 bg-gold-500/5 px-4 py-4">
								<p className="break-all text-lg font-medium text-ink-900 dark:text-paper">
									{submissionEmail}
								</p>
							</div>
							<button
								type="button"
								onClick={copyEmail}
								className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-400"
							>
								{copied ? <Check size={16} /> : <Copy size={16} />}
								{copied
									? lang === "ar"
										? "تم نسخ البريد الإلكتروني بنجاح"
										: "Email copied successfully"
									: lang === "ar"
										? "نسخ البريد الإلكتروني"
										: "Copy email address"}
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
