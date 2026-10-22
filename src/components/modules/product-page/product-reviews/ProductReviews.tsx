'use client'

import { FC, ReactNode, useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { renderHighlightedTitle } from '@/utils/highlight-title'
import styles from './ProductReviews.module.scss'
import arrowIcon from '@public/img/icons/arrow-left.svg'

const VideoPlayer = dynamic(() => import('@components/ui/video-player/VideoPlayer'), {
	ssr: false
})

export interface IReview {
	id: string
	media?: string
	image?: string
	videoUrl?: string
	quote?: string
	author?: {
		name?: string
		title?: string
		avatar?: string
	}
}

interface ProductReviewsProps {
	reviews?: IReview[]
	/** Overrides the default heading; supports *highlighted* words */
	title?: ReactNode
	className?: string
}

const isVideoUrl = (url?: string): boolean => {
	if (!url || typeof url !== 'string') return false
	const clean = url.trim().toLowerCase()
	return (
		/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(clean) ||
		clean.includes('youtube.com') ||
		clean.includes('youtu.be') ||
		clean.includes('vimeo.com')
	)
}

const ProductReviews: FC<ProductReviewsProps> = ({ reviews, title, className }) => {
	// If no reviews or empty array, render nothing (no placeholders)
	if (!reviews || reviews.length === 0) {
		return null
	}

	return <ProductReviewsContent reviews={reviews} title={title} className={className} />
}

interface ContentProps {
	reviews: IReview[]
	title?: ReactNode
	className?: string
}

const ProductReviewsContent: FC<ContentProps> = ({ reviews, title, className }) => {
	const trackRef = useRef<HTMLDivElement>(null)
	const isInitialMount = useRef(true)
	const isAutoScrollingRef = useRef(false)
	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const initialIndex = reviews.length > 1 ? 1 : 0
	const [activeIndex, setActiveIndex] = useState<number>(initialIndex)
	const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null)

	// Close video modal on ESC key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setActiveVideoSrc(null)
			}
		}
		if (activeVideoSrc) {
			window.addEventListener('keydown', handleKeyDown)
			return () => window.removeEventListener('keydown', handleKeyDown)
		}
	}, [activeVideoSrc])

	const scrollToCard = useCallback((index: number, smooth: boolean = true) => {
		const track = trackRef.current
		if (!track) return
		const card = track.children[index] as HTMLElement
		if (!card) return

		isAutoScrollingRef.current = true

		const trackCenter = track.clientWidth / 2
		const cardCenter = card.offsetLeft + card.offsetWidth / 2
		const targetScrollLeft = cardCenter - trackCenter

		track.scrollTo({
			left: targetScrollLeft,
			behavior: smooth ? 'smooth' : 'auto'
		})

		if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
		scrollTimeoutRef.current = setTimeout(() => {
			isAutoScrollingRef.current = false
		}, smooth ? 450 : 50)
	}, [])

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false
			const timer = setTimeout(() => {
				scrollToCard(activeIndex, false)
			}, 60)
			return () => clearTimeout(timer)
		} else {
			scrollToCard(activeIndex, true)
		}
	}, [activeIndex, scrollToCard])

	useEffect(() => {
		const handleResize = () => {
			scrollToCard(activeIndex, false)
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [activeIndex, scrollToCard])

	const handleScroll = () => {
		if (isAutoScrollingRef.current || !trackRef.current) return
		if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

		scrollTimeoutRef.current = setTimeout(() => {
			const track = trackRef.current
			if (!track || isAutoScrollingRef.current) return

			const trackCenter = track.scrollLeft + track.clientWidth / 2
			let closestIndex = 0
			let minDiff = Infinity

			Array.from(track.children).forEach((child, idx) => {
				const el = child as HTMLElement
				const childCenter = el.offsetLeft + el.offsetWidth / 2
				const diff = Math.abs(trackCenter - childCenter)
				if (diff < minDiff) {
					minDiff = diff
					closestIndex = idx
				}
			})

			setActiveIndex(closestIndex)
		}, 100)
	}

	const handlePrev = () => {
		setActiveIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1))
	}

	const handleNext = () => {
		setActiveIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : 0))
	}

	return (
		<section className={clsx(styles.section, className)}>
			<div className={styles.header}>
				<h2 className={styles.title}>
					{renderHighlightedTitle(title, styles.redHighlight) || (
						<>
							<span className={styles.redHighlight}>Reviews</span> by clients and experts
						</>
					)}
				</h2>
				<div className={styles.controls}>
					<button
						type="button"
						className={clsx(styles.controlButton, styles.prevButton)}
						onClick={handlePrev}
						aria-label="Previous review"
					>
						<Image src={arrowIcon} alt="Previous" width={18} height={12} />
					</button>
					<button
						type="button"
						className={clsx(styles.controlButton, styles.nextButton)}
						onClick={handleNext}
						aria-label="Next review"
					>
						<Image src={arrowIcon} alt="Next" width={18} height={12} />
					</button>
				</div>
			</div>

			<div
				className={styles.reviewsTrack}
				ref={trackRef}
				onScroll={handleScroll}
				role="region"
				aria-label="Customer and expert reviews"
			>
				{reviews.map((review, index) => {
					const isActive = index === activeIndex
					const hasAuthor = Boolean(
						review.author &&
							(review.author.avatar?.trim() ||
								review.author.name?.trim() ||
								review.author.title?.trim())
					)

					const rawMedia = (review.media || review.image || review.videoUrl || '').trim()
					const hasVideoUrl = Boolean(review.videoUrl && review.videoUrl.trim() !== '')
					const isVideo = hasVideoUrl || isVideoUrl(rawMedia)
					const videoSrc = review.videoUrl?.trim() || (isVideo ? rawMedia : undefined)
					const imageSrc = !isVideo
						? (review.image?.trim() || (rawMedia && !isVideoUrl(rawMedia) ? rawMedia : undefined))
						: (review.image?.trim() && !isVideoUrl(review.image) ? review.image.trim() : undefined)
					const hasMedia = Boolean(imageSrc || videoSrc)

					return (
						<article
							key={review.id || index}
							className={clsx(
								styles.reviewCard,
								isActive && styles.activeCard
							)}
							onClick={() => {
								if (!isActive) {
									setActiveIndex(index)
								}
							}}
							aria-current={isActive ? 'true' : undefined}
						>
							{hasMedia && (
								<div
									className={styles.imageWrapper}
									onClick={(e) => {
										if (isVideo && videoSrc && isActive) {
											e.stopPropagation()
											setActiveVideoSrc(videoSrc)
										}
									}}
									style={{ cursor: isVideo && isActive ? 'pointer' : undefined }}
								>
									{imageSrc ? (
										<Image
											src={imageSrc}
											alt={review.author?.name ? `Review by ${review.author.name}` : 'Review'}
											width={800}
											height={450}
											priority={isActive || index === 0}
										/>
									) : isVideo && videoSrc ? (
										<video
											src={videoSrc}
											preload="metadata"
											muted
											playsInline
											className={styles.videoPreview}
										/>
									) : null}

									{isVideo && videoSrc && (
										<button
											type="button"
											className={styles.playButton}
											onClick={(e) => {
												e.stopPropagation()
												if (!isActive) {
													setActiveIndex(index)
												}
												setActiveVideoSrc(videoSrc)
											}}
											aria-label={
												review.author?.name
													? `Play video review by ${review.author.name}`
													: 'Play video review'
											}
										>
											<svg
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className={styles.playIcon}
												aria-hidden="true"
											>
												<path
													d="M7.4746 4.1494C7.7694 3.9673 8.1374 3.9505 8.4473 4.1055L19.4473 9.6055C19.786 9.7749 20 10.1212 20 10.5C20 10.8788 19.786 11.2251 19.4473 11.3945L8.4473 16.8945C8.1374 17.0495 7.7694 17.0327 7.4746 16.8506C7.1798 16.6684 7 16.3466 7 16V5C7 4.6534 7.1798 4.3316 7.4746 4.1494Z"
													fill="currentColor"
												/>
											</svg>
										</button>
									)}
								</div>
							)}

							{review.quote && review.quote.trim() !== '' && (
								<div
									className={styles.quote}
									dangerouslySetInnerHTML={{ __html: review.quote }}
								/>
							)}

							{hasAuthor && (
								<div className={styles.author}>
									{review.author?.avatar && review.author.avatar.trim() !== '' && (
										<div className={styles.avatar}>
											<Image
												src={review.author.avatar}
												alt={review.author?.name || 'Author avatar'}
												width={46}
												height={46}
											/>
										</div>
									)}
									{(review.author?.name?.trim() || review.author?.title?.trim()) && (
										<div className={styles.authorInfo}>
											{review.author?.name && review.author.name.trim() !== '' && (
												<span className={styles.authorName}>
													{review.author.name}
												</span>
											)}
											{review.author?.title && review.author.title.trim() !== '' && (
												<span className={styles.authorTitle}>
													{review.author.title}
												</span>
											)}
										</div>
									)}
								</div>
							)}
						</article>
					)
				})}
			</div>

			{/* Video Review Modal Overlay */}
			{activeVideoSrc && (
				<div
					className={styles.videoOverlay}
					onClick={() => setActiveVideoSrc(null)}
					role="dialog"
					aria-modal="true"
					aria-label="Video review player"
				>
					<div
						className={styles.videoModalWrapper}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							className={styles.closeButton}
							onClick={() => setActiveVideoSrc(null)}
							aria-label="Close video player"
						>
							&times;
						</button>
						<VideoPlayer videoSrc={activeVideoSrc} />
					</div>
				</div>
			)}
		</section>
	)
}

export default ProductReviews
