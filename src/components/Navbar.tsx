import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
	const { t, lang, setLang, theme, toggleTheme, openSubmission } = useApp();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [previousVersionsOpen, setPreviousVersionsOpen] = useState(false);
	const navbarRef = useRef<HTMLElement>(null);
	const location = useLocation();
	const navigate = useNavigate();
	const scrolledTextClass = theme === "dark" ? "text-white" : "text-black";

	const isSeventhPage = location.pathname.startsWith("/seventh-conference");
	const activeLinks = isSeventhPage
		? t.seventhConference.navLinks.filter(
				(link) => link.id !== "contact" && link.id !== "seventh-hero",
			)
		: t.nav.links.filter((link) => link.id !== "contact");

	const contactLink = isSeventhPage
		? t.seventhConference.navLinks.find((link) => link.id === "contact")
		: t.nav.links.find((link) => link.id === "contact");

	const supportsHover = () =>
		window.matchMedia("(hover: hover) and (pointer: fine)").matches;

	const togglePreviousVersionsOnTouch = () => {
		if (!supportsHover()) {
			setPreviousVersionsOpen((value) => !value);
		}
	};

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (!previousVersionsOpen) return;

		const closeOnOutsideClick = (event: PointerEvent) => {
			if (!navbarRef.current?.contains(event.target as Node)) {
				setPreviousVersionsOpen(false);
			}
		};

		document.addEventListener("pointerdown", closeOnOutsideClick);
		return () =>
			document.removeEventListener("pointerdown", closeOnOutsideClick);
	}, [previousVersionsOpen]);

	const scrollTo = (id: string) => {
		setOpen(false);
		const element = document.getElementById(id);
		if (element) {
			if (id === "faq") {
				window.requestAnimationFrame(() => {
					const navbarHeight =
						navbarRef.current?.getBoundingClientRect().height ?? 0;
					const targetTop =
						element.getBoundingClientRect().top +
						window.scrollY -
						navbarHeight -
						16;
					window.scrollTo({ top: targetTop, behavior: "smooth" });
				});
			} else {
				element.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		} else {
			if (isSeventhPage && id === "hero") {
				navigate("/");
			} else if (
				!isSeventhPage &&
				(id === "rules" || id === "committees" || id === "seventh-hero")
			) {
				navigate("/seventh-conference");
			}
		}
	};

	const handleBrandClick = () => {
		setOpen(false);
		if (isSeventhPage) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			scrollTo("hero");
		}
	};

	return (
		<header
			ref={navbarRef}
			className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
				scrolled
					? "bg-paper/80 dark:bg-ink-950/70 backdrop-blur-md shadow-soft border-b border-ink-900/5 dark:border-paper/5"
					: "bg-transparent"
			}`}
		>
			<div
				dir={t.dir}
				className="mx-auto flex w-full max-w-[90rem] items-center gap-4 px-3 py-3 sm:px-5 sm:py-4 lg:gap-6 lg:px-8 min-[1400px]:gap-7"
			>
				<button
					onClick={handleBrandClick}
					className="flex min-w-0 shrink-0 items-center gap-2.5 text-start sm:gap-3 min-[1400px]:w-[14rem]"
				>
					<span
						className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-display text-lg transition-colors sm:h-10 sm:w-10 ${
							scrolled
								? `border-gold-500 ${scrolledTextClass}`
								: "border-paper text-paper"
						}`}
					>
						W
					</span>
					<span
						className={`min-w-0 text-[11px] font-medium leading-tight transition-colors sm:text-[16px] ${scrolled ? scrolledTextClass : "text-paper"}`}
					>
						<span className="block whitespace-nowrap">
							{t.header.university}{" "}
							<small className="text-[0.7em] opacity-80">
								{t.header.honorific}
							</small>
						</span>
						<span className="mt-0.5 block whitespace-nowrap text-[0.86em] opacity-75">
							{t.header.college}
						</span>
						<span
							className={`mt-0.5 block whitespace-nowrap text-[0.92em] font-bold leading-[1.15] tracking-[0.01em] transition-colors ${
								scrolled
									? scrolledTextClass
									: isSeventhPage
										? "text-gold-400"
										: "text-paper"
							}`}
						>
							{isSeventhPage
								? lang === "ar"
									? "المؤتمر الدولي السابع"
									: "7th Int'l Conference"
								: t.header.conference}
						</span>
					</span>
				</button>

				<nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 min-[1400px]:flex min-[1400px]:gap-6">
					{activeLinks.map((link) => (
						<button
							key={link.id}
							onClick={() => scrollTo(link.id)}
							className={`whitespace-nowrap text-[16px] font-medium transition-colors hover:text-gold-500 ${
								scrolled ? scrolledTextClass : "text-paper"
							}`}
						>
							{link.label}
						</button>
					))}

					{contactLink && (
						<button
							onClick={() => scrollTo(contactLink.id)}
							className={`whitespace-nowrap text-[16px] font-medium transition-colors hover:text-gold-500 ${
								scrolled ? scrolledTextClass : "text-paper"
							}`}
						>
							{contactLink.label}
						</button>
					)}

					<div
						className="relative"
						onMouseEnter={() => {
							if (supportsHover()) setPreviousVersionsOpen(true);
						}}
						onMouseLeave={() => {
							if (supportsHover()) setPreviousVersionsOpen(false);
						}}
					>
						<button
							type="button"
							onClick={togglePreviousVersionsOnTouch}
							aria-expanded={previousVersionsOpen}
							className={`flex items-center gap-1.5 py-1.5 text-[16px] font-medium transition-colors hover:text-gold-500 ${
								scrolled ? scrolledTextClass : "text-paper"
							}`}
						>
							{t.nav.previousVersionsLabel}
							<ChevronDown
								size={14}
								className={`transition-transform ${previousVersionsOpen ? "rotate-180" : ""}`}
							/>
						</button>
						<AnimatePresence>
							{previousVersionsOpen && (
								<motion.div
									initial={{ opacity: 0, y: -6 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -6 }}
									transition={{ duration: 0.18 }}
									className="absolute end-0 top-full z-50 w-72 overflow-hidden rounded-lg border border-ink-900/10 bg-paper py-1 shadow-lg dark:border-paper/10 dark:bg-ink-950"
								>
									{t.nav.previousVersions.map((version) => (
										<button
											key={version}
											type="button"
											onClick={() => setPreviousVersionsOpen(false)}
											className={`block w-full px-4 py-2.5 text-start text-[14px] transition-colors ${
												scrolled
													? `${scrolledTextClass} hover:bg-black/5`
													: "text-ink-900 hover:bg-ink-900/5 dark:text-paper dark:hover:bg-paper/5"
											}`}
										>
											{version}
										</button>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</nav>

				<div
					className="flex shrink-0 items-center justify-end gap-2 min-[1400px]:gap-3"
					dir={lang === "ar" ? "rtl" : "ltr"}
				>
					<div className="hidden min-[1400px]:flex items-center gap-2">
						{lang === "ar" ? (
							<>
								{!isSeventhPage ? (
									<button
										type="button"
										onClick={() => {
											navigate("/seventh-conference");
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
										className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-all ${
											scrolled
												? theme === "dark"
													? "border-gold-500/50 bg-gold-500/15 text-white hover:bg-gold-500/25"
													: "border-gold-500/50 bg-gold-500/15 text-gold-600 hover:bg-gold-500/25"
												: "border-gold-400/60 bg-gold-500/20 text-gold-300 hover:bg-gold-500/30"
										}`}
									>
										<span>{"النسخة الحالية"}</span>
									</button>
								) : (
									<button
										type="button"
										onClick={() => {
											navigate("/");
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
										className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-all ${
											scrolled
												? `border-ink-900/15 ${scrolledTextClass} hover:bg-ink-900/5`
												: "border-paper/40 text-paper hover:bg-paper/10"
										}`}
									>
										<span>{t.seventhConference.backToPortal}</span>
									</button>
								)}

								<button
									onClick={() => setLang("en")}
									aria-label="toggle language"
									className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
										scrolled
											? `border-ink-900/15 ${scrolledTextClass}`
											: "border-paper/50 text-paper"
									}`}
								>
									{t.ui.langToggle}
								</button>
							</>
						) : (
							<>
								{!isSeventhPage ? (
									<button
										type="button"
										onClick={() => {
											navigate("/seventh-conference");
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
										className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-all ${
											scrolled
												? theme === "dark"
													? "border-gold-500/50 bg-gold-500/15 text-white hover:bg-gold-500/25"
													: "border-gold-500/50 bg-gold-500/15 text-gold-600 hover:bg-gold-500/25"
												: "border-gold-400/60 bg-gold-500/20 text-gold-300 hover:bg-gold-500/30"
										}`}
									>
										<span>Current Edition</span>
									</button>
								) : (
									<button
										type="button"
										onClick={() => {
											navigate("/");
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
										className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-all ${
											scrolled
												? `border-ink-900/15 ${scrolledTextClass} hover:bg-ink-900/5`
												: "border-paper/40 text-paper hover:bg-paper/10"
										}`}
									>
										<span>{t.seventhConference.backToPortal}</span>
									</button>
								)}

								<button
									onClick={() => setLang("ar")}
									aria-label="toggle language"
									className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
										scrolled
											? `border-ink-900/15 ${scrolledTextClass}`
											: "border-paper/50 text-paper"
									}`}
								>
									{t.ui.langToggle}
								</button>
							</>
						)}
					</div>

					<button
						onClick={toggleTheme}
						aria-label="toggle theme"
						className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
							scrolled
								? `border-ink-900/15 ${scrolledTextClass}`
								: "border-paper/50 text-paper"
						}`}
					>
						{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
					</button>
					<button
						onClick={openSubmission}
						className={`hidden min-w-[9.5rem] whitespace-nowrap rounded-full bg-gold-500 px-6 py-2 text-[16px] font-medium transition-colors hover:bg-gold-400 min-[1400px]:block ${theme === "dark" ? "text-white" : "text-ink-950"}`}
					>
						{t.nav.submit}
					</button>
					<button
						onClick={() => setOpen((v) => !v)}
						className={`flex h-9 w-9 items-center justify-center rounded-full border min-[1400px]:hidden ${
							scrolled
								? `border-ink-900/15 ${scrolledTextClass}`
								: "border-paper/50 text-paper"
						}`}
						aria-label="toggle menu"
					>
						{open ? <X size={18} /> : <Menu size={18} />}
					</button>
				</div>
			</div>

			{open && (
				<div className="border-t border-ink-900/10 bg-paper px-5 py-4 dark:border-paper/10 dark:bg-ink-950 min-[1400px]:hidden">
					<div className="flex flex-col gap-1">
						{activeLinks.map((link) => (
							<button
								key={link.id}
								onClick={() => scrollTo(link.id)}
								className={`rounded-md px-3 py-2.5 text-start text-[16px] font-medium transition-colors ${
									scrolled
										? `${scrolledTextClass} hover:bg-black/5`
										: "text-ink-900 hover:bg-ink-900/5 dark:text-paper dark:hover:bg-paper/5"
								}`}
							>
								{link.label}
							</button>
						))}

						{contactLink && (
							<button
								onClick={() => scrollTo(contactLink.id)}
								className={`flex items-center rounded-md px-3 py-2.5 text-start text-[16px] font-medium transition-colors ${
									scrolled
										? `${scrolledTextClass} hover:bg-black/5`
										: "text-ink-900 hover:bg-ink-900/5 dark:text-paper dark:hover:bg-paper/5"
								}`}
							>
								{contactLink.label}
							</button>
						)}

						<div className="mt-2 border-t border-ink-900/10 pt-2 dark:border-paper/10">
							<button
								type="button"
								onClick={togglePreviousVersionsOnTouch}
								aria-expanded={previousVersionsOpen}
								className={`flex w-full items-center rounded-md px-3 py-2.5 text-start text-[16px] font-medium transition-colors ${
									scrolled
										? `${scrolledTextClass} hover:bg-black/5`
										: "text-ink-900 hover:bg-ink-900/5 dark:text-paper dark:hover:bg-paper/5"
								}`}
							>
								{t.nav.previousVersionsLabel}
								<ChevronDown
									size={15}
									className={`ms-auto transition-transform ${previousVersionsOpen ? "rotate-180" : ""}`}
								/>
							</button>
							<AnimatePresence>
								{previousVersionsOpen && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										className="mt-1 overflow-hidden rounded-md border border-ink-900/10 dark:border-paper/10"
									>
										{t.nav.previousVersions.map((version) => (
											<button
												key={version}
												type="button"
												onClick={() => {
													setPreviousVersionsOpen(false);
													setOpen(false);
												}}
												className={`block w-full px-4 py-2 text-start text-[14px] transition-colors ${
													scrolled
														? `${scrolledTextClass} hover:bg-black/5`
														: "text-ink-900 hover:bg-ink-900/5 dark:text-paper dark:hover:bg-paper/5"
												}`}
											>
												{version}
											</button>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{!isSeventhPage ? (
							<button
								type="button"
								onClick={() => {
									setOpen(false);
									navigate("/seventh-conference");
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-start text-[16px] font-semibold transition-colors ${
									scrolled
										? `${scrolledTextClass} hover:bg-black/5`
										: "text-gold-600 hover:bg-gold-500/10 dark:text-gold-400"
								}`}
							>
								<span>
									{lang === "ar"
										? "النسخة الحالية (المؤتمر السابع)"
										: "Current Edition (7th Conf)"}
								</span>
							</button>
						) : (
							<button
								type="button"
								onClick={() => {
									setOpen(false);
									navigate("/");
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-[16px] font-semibold transition-colors ${
									scrolled
										? `${scrolledTextClass} hover:bg-black/5`
										: "text-ink-900 hover:bg-ink-900/5 dark:text-paper dark:hover:bg-paper/5"
								}`}
							>
								<span>{t.seventhConference.backToPortal}</span>
							</button>
						)}

						<div className="mt-2 flex items-center gap-2 px-3">
							<button
								onClick={() => setLang(lang === "ar" ? "en" : "ar")}
								className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[14px] font-medium transition-colors ${
									scrolled
										? `border-ink-900/15 ${scrolledTextClass}`
										: "border-ink-900/15 text-ink-900 dark:border-paper/20 dark:text-paper"
								}`}
							>
								{t.ui.langToggle}
							</button>
							<button
								onClick={() => {
									setOpen(false);
									openSubmission();
								}}
								className={`whitespace-nowrap rounded-full bg-gold-500 px-4 py-1.5 text-[14px] font-medium transition-colors ${
									scrolled ? scrolledTextClass : "text-ink-950"
								}`}
							>
								{t.nav.submit}
							</button>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
