import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { content, type Lang } from "../i18n/content";

type Theme = "light" | "dark";

interface AppContextValue {
	lang: Lang;
	setLang: (l: Lang) => void;
	theme: Theme;
	toggleTheme: () => void;
	submissionOpen: boolean;
	openSubmission: () => void;
	closeSubmission: () => void;
	aboutWebsiteOpen: boolean;
	openAboutWebsite: () => void;
	closeAboutWebsite: () => void;
	countdownOpen: boolean;
	openCountdown: () => void;
	closeCountdown: () => void;
	t: (typeof content)[Lang];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
	const [lang, setLang] = useState<Lang>(() => {
		const saved = localStorage.getItem("event-lang");
		return saved === "en" || saved === "ar" ? saved : "ar";
	});
	const [theme, setTheme] = useState<Theme>(() => {
		const saved = localStorage.getItem("event-theme");
		if (saved === "light" || saved === "dark") return saved;
		return window.matchMedia?.("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	});
	const [submissionOpen, setSubmissionOpen] = useState(false);
	const [aboutWebsiteOpen, setAboutWebsiteOpen] = useState(false);
	const [countdownOpen, setCountdownOpen] = useState(false);

	useEffect(() => {
		document.documentElement.lang = lang;
		document.body.dir = content[lang].dir;
		document.documentElement.dir = content[lang].dir;
		localStorage.setItem("event-lang", lang);
	}, [lang]);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("event-theme", theme);
	}, [theme]);

	const toggleTheme = () =>
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	const openSubmission = () => setSubmissionOpen(true);
	const closeSubmission = () => setSubmissionOpen(false);
	const openAboutWebsite = () => setAboutWebsiteOpen(true);
	const closeAboutWebsite = () => setAboutWebsiteOpen(false);
	const openCountdown = () => setCountdownOpen(true);
	const closeCountdown = () => setCountdownOpen(false);

	return (
		<AppContext.Provider
			value={{
				lang,
				setLang,
				theme,
				toggleTheme,
				submissionOpen,
				openSubmission,
				closeSubmission,
				aboutWebsiteOpen,
				openAboutWebsite,
				closeAboutWebsite,
				countdownOpen,
				openCountdown,
				closeCountdown,
				t: content[lang],
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useApp() {
	const ctx = useContext(AppContext);
	if (!ctx) throw new Error("useApp must be used within AppProvider");
	return ctx;
}
