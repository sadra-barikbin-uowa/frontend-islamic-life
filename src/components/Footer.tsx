import {
	Facebook,
	Twitter,
	Instagram,
	Youtube,
	Send,
	Mail,
	Phone,
	MapPin,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import ConferenceName from "./ConferenceName";
import ConferenceLogo from "./ConferenceLogo";

const socials = [
	{
		Icon: Facebook,
		url: "https://www.facebook.com/uowa.edu",
		label: "Facebook",
	},
	{ Icon: Twitter, url: "https://x.com/WarithALanbiya", label: "X" },
	{
		Icon: Instagram,
		url: "https://www.instagram.com/uowa.iq",
		label: "Instagram",
	},
	{
		Icon: Youtube,
		url: "https://www.youtube.com/channel/UCJuC2L8xYFBJUyDMu2-TMCw",
		label: "YouTube",
	},
	{ Icon: Send, url: "https://t.me/uowa_WarithAlanbiyaa", label: "Telegram" },
];

export default function Footer() {
	const { t } = useApp();

	const scrollTo = (id: string) =>
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

	return (
		<footer
			id="contact"
			className="bg-ink-950 px-5 pb-8 pt-16 text-paper lg:px-10"
		>
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-10 border-b border-paper/10 pb-12 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-14">
					<div>
						<div className="flex items-center gap-3">
							<ConferenceLogo className="h-12 w-12 shrink-0" />
							<span className="text-sm font-medium leading-tight">
								{t.meta.university}
								<span className="block text-xs text-ink-200">
									<ConferenceName greenClassName="text-green-400" />
								</span>
							</span>
						</div>
						<p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-200">
							{t.footer.text}
						</p>
					</div>

					<div>
						<p className="text-sm font-medium text-gold-400">
							{t.footer.linksTitle}
						</p>
						<ul className="mt-4 space-y-2.5">
							{t.nav.links
								.filter((link) => link.id !== "contact")
								.slice(0, 5)
								.map((link) => (
									<li key={link.id}>
										<button
											onClick={() => scrollTo(link.id)}
											className="text-sm text-ink-200 hover:text-paper"
										>
											{link.label}
										</button>
									</li>
								))}
						</ul>
					</div>

					<div>
						<p className="text-sm font-medium text-gold-400">
							{t.footer.contactTitle}
						</p>
						<div className="mt-4 space-y-3">
							<a
								href={`mailto:${t.contact.info.email}`}
								className="flex items-center gap-3 text-sm text-ink-200 transition-colors hover:text-paper"
							>
								<Mail size={15} className="shrink-0 text-gold-400" />
								<span>{t.contact.info.email}</span>
							</a>
							{t.contact.info.phone ? (
								<a
									href={`tel:${t.contact.info.phone}`}
									className="flex items-center gap-3 text-sm text-ink-200 transition-colors hover:text-paper"
								>
									<Phone size={15} className="shrink-0 text-gold-400" />
									<span>{t.contact.info.phone}</span>
								</a>
							) : null}
							<div className="flex items-start gap-3 text-sm leading-relaxed text-ink-200">
								<MapPin size={15} className="mt-1 shrink-0 text-gold-400" />
								<span>{t.contact.info.address}</span>
							</div>
						</div>
						<div className="mt-5 flex gap-3">
							{socials.map(({ Icon, url, label }) => (
								<a
									key={label}
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={label}
									className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-ink-200 transition-colors hover:border-gold-400 hover:text-gold-400"
								>
									<Icon size={15} />
								</a>
							))}
						</div>
					</div>
				</div>

				<p className="pt-6 text-center text-xs text-ink-200">
					© {new Date().getFullYear()} {t.meta.university} —{" "}
					<ConferenceName greenClassName="text-green-400" />. {t.footer.rights}
				</p>
			</div>
		</footer>
	);
}
