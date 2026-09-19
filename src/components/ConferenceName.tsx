import { useApp } from "../context/AppContext";

type ConferenceNameProps = {
	className?: string;
	greenClassName?: string;
};

export default function ConferenceName({
	className = "",
	greenClassName = "text-green-400",
}: ConferenceNameProps) {
	const { lang, t } = useApp();

	if (lang === "ar") {
		return (
			<span className={className}>
				<span>مؤتمر </span>
				<span className={greenClassName}>الإسلام حياة</span>
			</span>
		);
	}

	return (
		<span className={`${className} ${greenClassName}`}>{t.meta.confShort}</span>
	);
}
