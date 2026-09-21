import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "../components/Navbar";
import SeventhHero from "../components/SeventhHero";
import ConferenceInfo from "../components/ConferenceInfo";
import SeventhAbout from "../components/SeventhAbout";
import Objectives from "../components/Objectives";
import ParticipationRules from "../components/ParticipationRules";
import Committees from "../components/Committees";
import CallForPapers from "../components/CallForPapers";
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";
import Sponsors from "../components/Sponsors";
import VenueSection from "../components/Venue";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";

export default function SeventhConferencePage() {
	const { t, lang } = useApp();
	const [showTop, setShowTop] = useState(false);

	useEffect(() => {
		const originalTitle = document.title;
		document.title =
			lang === "ar"
				? "مؤتمر الدولي السابع — عنوان استقى وجوده من سبل خدمة الدين والإنسان والوطن | جامعة وارث الأنبياء"
				: "The 7th International Conference — A Title Inspired by Serving Faith, Humanity, and the Nation | Warith Al-Anbiyaa University";

		return () => {
			document.title = originalTitle;
		};
	}, [lang]);

	useEffect(() => {
		const onScroll = () => setShowTop(window.scrollY > 800);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<>
			<Navbar />
			<main>
				<SeventhHero />
				<ConferenceInfo />
				<SeventhAbout />
				<Objectives variant="seventh" />
				<ParticipationRules />
				<Committees />
				<div className="mx-auto grid w-full max-w-7xl items-stretch gap-6 px-5 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
					<FAQ />
					<CallForPapers />
				</div>
				<Gallery />
				<Sponsors />
				<VenueSection />
			</main>
			<Footer />

			{showTop && (
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					aria-label={t.ui.backToTop}
					className="fixed bottom-6 end-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-lg transition-transform hover:-translate-y-0.5"
				>
					<ArrowUp size={18} />
				</button>
			)}
		</>
	);
}
