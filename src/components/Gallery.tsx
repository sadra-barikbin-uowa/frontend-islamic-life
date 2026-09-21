import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import Reveal from "./Reveal";
import HighlightedConferenceText from "./HighlightedConferenceText";

/**
 * صور معرض الصور (Gallery) — هذه روابط مؤقتة (Placeholder) من Unsplash فقط لتجربة التصميم.
 *
 * لإضافة صوركم الحقيقية من فعاليات المؤتمر:
 * 1) ضعوا ملفات الصور داخل: public/images/gallery/  (مثال: gallery-1.jpg, gallery-2.jpg ...)
 * 2) استبدلوا كل رابط أدناه بالمسار المحلي، مثل: '/images/gallery/gallery-1.jpg'
 * 3) يمكن إضافة أو حذف عناصر من هذه القائمة بحرية — التصميم والعرض (Lightbox) سيعملان تلقائيًا
 *    مهما كان عدد الصور.
 */
const photos = [
	"الامام الحسين(ع).jpg",
	"طلاب.jpg",
	"جامعة وارث.jpg",
	"اجتماع2.jpg",
	"اجتماع دكاترة.jpg",
	"بناية العلى.jpg",

	// ⬅️ أضيفوا هنا أي صور إضافية بنفس الطريقة
];

export default function Gallery() {
	const { t } = useApp();
	const [active, setActive] = useState<number | null>(null);
	const [carouselIndex, setCarouselIndex] = useState(0);
	const [trackOffset, setTrackOffset] = useState(0);
	const [lastIndex, setLastIndex] = useState(photos.length - 1);
	const galleryRef = useRef<HTMLDivElement>(null);
	const firstPhotoRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const timer = window.setTimeout(() => {
			setCarouselIndex((index) => (index >= lastIndex ? 0 : index + 1));
		}, 5000);
		return () => window.clearTimeout(timer);
	}, [carouselIndex, lastIndex]);

	useEffect(() => {
		const updateGallery = () => {
			const gallery = galleryRef.current;
			const firstPhoto = firstPhotoRef.current;
			if (!gallery || !firstPhoto) return;

			const styles = window.getComputedStyle(gallery);
			const gap = Number.parseFloat(styles.columnGap) || 0;
			const step = firstPhoto.getBoundingClientRect().width + gap;
			const visiblePhotos = Math.max(
				1,
				Math.floor((gallery.clientWidth + gap) / step),
			);
			setTrackOffset(step);
			setLastIndex(Math.max(0, photos.length - visiblePhotos));
		};

		updateGallery();
		const observer = new ResizeObserver(updateGallery);
		if (galleryRef.current) observer.observe(galleryRef.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (carouselIndex > lastIndex) setCarouselIndex(lastIndex);
	}, [carouselIndex, lastIndex]);

	const showNext = () =>
		setCarouselIndex((index) => (index >= lastIndex ? 0 : index + 1));
	const showPrevious = () =>
		setCarouselIndex((index) => (index <= 0 ? lastIndex : index - 1));

	const next = () =>
		setActive((a) => (a === null ? null : (a + 1) % photos.length));
	const prev = () =>
		setActive((a) =>
			a === null ? null : (a - 1 + photos.length) % photos.length,
		);

	return (
		<section className="px-5 py-24 lg:px-10 lg:py-32">
			<div className="mx-auto max-w-7xl">
				<Reveal>
					<div className="max-w-xl">
						<h2 className="font-display text-3xl text-ink-900 dark:text-paper sm:text-4xl">
							{t.gallery.title}
						</h2>
						<p className="mt-3 text-base text-slate-ink dark:text-ink-200">
							<HighlightedConferenceText text={t.gallery.subtitle} />
						</p>
					</div>
				</Reveal>

				<div className="relative mt-12 px-1 sm:px-2" dir="ltr">
					<motion.div ref={galleryRef} className="overflow-hidden">
						<motion.div
							animate={{ x: -(carouselIndex * trackOffset) }}
							transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
							className="flex gap-4"
						>
							{photos.map((photo, index) => (
								<button
									key={photo}
									ref={index === 0 ? firstPhotoRef : undefined}
									onClick={() => setActive(index)}
									className="group block aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg shadow-sm sm:basis-[calc((100%-1rem)/2)] md:basis-[calc((100%-2rem)/3)] lg:basis-[calc((100%-3rem)/4)]"
								>
									<img
										src={photo}
										alt=""
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</button>
							))}
						</motion.div>
					</motion.div>
				</div>
				<div className="mt-5 flex items-center justify-center gap-3" dir="ltr">
					<button
						type="button"
						onClick={showPrevious}
						aria-label={t.gallery.previous}
						className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-slate-ink shadow-lg transition-all hover:scale-105 hover:bg-paper dark:bg-ink-900/90 dark:text-paper dark:hover:bg-ink-900 sm:h-12 sm:w-12"
					>
						<ChevronLeft size={22} strokeWidth={2.2} />
					</button>
					<button
						type="button"
						onClick={showNext}
						aria-label={t.gallery.next}
						className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-slate-ink shadow-lg transition-all hover:scale-105 hover:bg-paper dark:bg-ink-900/90 dark:text-paper dark:hover:bg-ink-900 sm:h-12 sm:w-12"
					>
						<ChevronRight size={22} strokeWidth={2.2} />
					</button>
				</div>
			</div>

			<AnimatePresence>
				{active !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/95 p-6"
						onClick={() => setActive(null)}
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setActive(null);
							}}
							className="absolute end-6 top-6 text-paper/80 hover:text-paper"
							aria-label={t.gallery.close}
						>
							<X size={26} />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								prev();
							}}
							className="absolute start-4 text-paper/70 hover:text-paper"
							aria-label={t.gallery.previous}
						>
							<ChevronLeft size={30} />
						</button>
						<motion.img
							key={active}
							initial={{ opacity: 0, scale: 0.96 }}
							animate={{ opacity: 1, scale: 1 }}
							src={photos[active]}
							alt=""
							onClick={(e) => e.stopPropagation()}
							className="max-h-[80vh] max-w-[85vw] rounded-lg object-contain"
						/>
						<button
							onClick={(e) => {
								e.stopPropagation();
								next();
							}}
							className="absolute end-4 text-paper/70 hover:text-paper"
							aria-label={t.gallery.next}
						>
							<ChevronRight size={30} />
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
