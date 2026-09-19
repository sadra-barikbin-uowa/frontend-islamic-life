import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";
import { sponsors } from "../config/sponsors";

export default function Sponsors() {
	const { t, lang } = useApp();

	return (
		<section className="border-y border-ink-900/10 px-5 py-20 dark:border-paper/10 lg:px-10">
			<div className="mx-auto max-w-5xl">
				<Reveal>
					<div className="text-center">
						<h2 className="font-display text-2xl text-ink-900 dark:text-paper sm:text-3xl">
							{t.sponsors.title}
						</h2>
						<p className="mt-2 text-sm text-slate-ink dark:text-ink-200">
							{t.sponsors.subtitle}
						</p>
					</div>
				</Reveal>

				<div className="mt-12 grid items-start gap-8 sm:grid-cols-2 lg:gap-10">
					{sponsors.map((sponsor, i) => {
						const sponsorName = lang === "ar" ? sponsor.nameAr : sponsor.nameEn;
						const card = sponsor.logo ? (
							<div className="flex h-40 items-center justify-center rounded-xl border border-ink-900/10 bg-paper p-6 shadow-[0_8px_30px_rgba(15,27,61,0.06)] transition-all hover:-translate-y-1 hover:border-gold-400/50 dark:border-paper/20 dark:bg-paper sm:p-8">
								<img
									src={sponsor.logo}
									alt={sponsorName}
									className="max-h-24 max-w-[78%] object-contain"
									loading="lazy"
								/>
							</div>
						) : (
							<div className="flex h-40 items-center justify-center rounded-xl border border-ink-900/10 px-4 text-center font-display text-lg text-ink-900 transition-colors hover:border-gold-400/50 dark:border-paper/10 dark:text-paper">
								{sponsorName}
							</div>
						);

						return (
							<Reveal key={sponsorName} delay={i * 100}>
								{sponsor.url ? (
									<a
										href={sponsor.url}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={sponsorName}
										className="block"
									>
										{card}
									</a>
								) : (
									card
								)}
								<p className="mt-3 text-center text-sm font-medium text-ink-900 dark:text-paper">
									{sponsorName}
								</p>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
