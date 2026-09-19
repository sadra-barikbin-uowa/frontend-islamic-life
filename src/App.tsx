import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import ResearchSubmissionModal from "./components/ResearchSubmissionModal";
import AboutWebsiteModal from "./components/AboutWebsiteModal";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import SeventhConferencePage from "./pages/SeventhConferencePage";

export default function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1400);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (loading) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [loading]);

	return (
		<>
			<ScrollToTop />
			<Preloader show={loading} />
			<ResearchSubmissionModal />
			<AboutWebsiteModal />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/seventh-conference" element={<SeventhConferencePage />} />
				<Route path="*" element={<HomePage />} />
			</Routes>
		</>
	);
}
