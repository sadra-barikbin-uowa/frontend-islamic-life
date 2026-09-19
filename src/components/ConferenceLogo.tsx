import conferenceLogo from "../../لوكو المؤتمر.png";

type ConferenceLogoProps = {
	className?: string;
};

export default function ConferenceLogo({
	className = "",
}: ConferenceLogoProps) {
	return (
		<img
			src={conferenceLogo}
			alt="شعار مؤتمر الإسلام حياة"
			className={`object-contain ${className}`}
		/>
	);
}
