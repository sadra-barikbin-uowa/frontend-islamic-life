import { useApp } from "../context/AppContext";
import ConferenceName from "./ConferenceName";

type HighlightedConferenceTextProps = {
	text: string;
	className?: string;
};

export default function HighlightedConferenceText({
	text,
	className = "",
}: HighlightedConferenceTextProps) {
	const { lang } = useApp();
	const phrase =
		lang === "ar" ? "مؤتمر الإسلام حياة" : "Islamic Life Conference";
	const parts = text.split(phrase);

	return (
		<span className={className}>
			{parts.map((part, index) => (
				<span key={`${part}-${index}`}>
					{part}
					{index < parts.length - 1 && (
						<ConferenceName greenClassName="text-green-500 dark:text-green-400" />
					)}
				</span>
			))}
		</span>
	);
}
