'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC, useCallback, useEffect, useState } from 'react'

import { loadHomeHeroSlider } from '@/services/content.service'
import styles from './HeroBanner.module.scss'

export interface SlideData {
	id: number | string
	title: string
	subtitle: string
	learnMoreHref: string
	desktopImage: string
	alt: string
}

const DEFAULT_SLIDES: SlideData[] = [
	{
		id: 0,
		title: 'Fiber Laser Metal Cutting Machines',
		subtitle:
			'Wattsan machines are designed with a special extruded aluminium gantry. It has high strength characteristics and low weight.',
		learnMoreHref: '/product/metal-cutters',
		desktopImage: '/img/banners/fiber-laser-1920.png',
		alt: 'Wattsan Fiber Laser Metal Cutting Machines'
	},
	{
		id: 1,
		title: 'The New Ultraviolet Laser Marking Machine',
		subtitle:
			'More than you need. UV marker with a wide range of applications.',
		learnMoreHref: '/product/laser-markers',
		desktopImage: '/img/banners/uv-marker-768.png',
		alt: 'Wattsan Ultraviolet Laser Marking Machine'
	},
	{
		id: 2,
		title: 'High-Precision CO2 Laser Machines',
		subtitle:
			'Wattsan CO2 laser machines for cutting and engraving acrylic, plywood, plastics, and leather.',
		learnMoreHref: '/product/laser-co2',
		desktopImage: '/img/banners/fiber-laser-1440.png',
		alt: 'Wattsan High-Precision CO2 Laser Machines'
	}
]

interface HeroBannerProps {
	initialSlides?: SlideData[]
}

export const HeroBanner: FC<HeroBannerProps> = ({ initialSlides }) => {
	const [slides, setSlides] = useState<SlideData[] | null>(() => {
		if (initialSlides && initialSlides.length > 0) return initialSlides
		return null
	})
	const [currentSlide, setCurrentSlide] = useState<number>(0)
	const [isPaused, setIsPaused] = useState<boolean>(false)

	useEffect(() => {
		let isMounted = true
		loadHomeHeroSlider()
			.then((items) => {
				if (!isMounted) return
				if (items && items.length > 0) {
					const dynamicSlides: SlideData[] = items
						.filter((item) => Boolean(item.image))
						.map((item, idx) => ({
							id: item.id || idx,
							title: item.title || 'Wattsan Equipment',
							subtitle: '',
							learnMoreHref: item.link || '/product/metal-cutters',
							desktopImage: item.image,
							alt: item.title || 'Wattsan Equipment'
						}))

					if (dynamicSlides.length > 0) {
						setSlides(dynamicSlides)
						setCurrentSlide(0)
						return
					}
				}
				// Fallback to default slides only if CMS has no configured slides
				setSlides(DEFAULT_SLIDES)
			})
			.catch((error) => {
				console.error('Error fetching home hero slider dynamic content:', error)
				if (isMounted) {
					setSlides(DEFAULT_SLIDES)
				}
			})

		return () => {
			isMounted = false
		}
	}, [])

	const nextSlide = useCallback(() => {
		setSlides((current) => {
			if (!current || current.length <= 1) return current
			setCurrentSlide((prev) => (prev + 1) % current.length)
			return current
		})
	}, [])

	const prevSlide = useCallback(() => {
		setSlides((current) => {
			if (!current || current.length <= 1) return current
			setCurrentSlide((prev) => (prev - 1 + current.length) % current.length)
			return current
		})
	}, [])

	useEffect(() => {
		if (isPaused || !slides || slides.length <= 1) return
		const timer = setInterval(() => {
			nextSlide()
		}, 6000)
		return () => clearInterval(timer)
	}, [isPaused, nextSlide, slides])

	// Render skeleton with switcher arrows already placed while loading
	if (!slides || slides.length === 0) {
		return (
			<section className={styles.heroSection} aria-label='Hero Equipment Showcase'>
				<button className={`${styles.arrowBtn} ${styles.prevArrow}`} disabled aria-label='Previous slide'>
					<svg width='18' height='18' viewBox='0 0 16 16' fill='none'>
						<path
							d='M10 13L5 8L10 3'
							stroke='#222222'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
				<button className={`${styles.arrowBtn} ${styles.nextArrow}`} disabled aria-label='Next slide'>
					<svg width='18' height='18' viewBox='0 0 16 16' fill='none'>
						<path
							d='M6 3L11 8L6 13'
							stroke='#222222'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
				<div className={styles.slideWrapper}>
					<div className={styles.skeletonContainer} />
				</div>
			</section>
		)
	}

	const slide = slides[currentSlide] || slides[0]

	return (
		<section
			className={styles.heroSection}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			aria-label='Hero Equipment Showcase'
		>
			{/* Left Arrow - always visible */}
			<button
				className={`${styles.arrowBtn} ${styles.prevArrow}`}
				onClick={prevSlide}
				aria-label='Previous slide'
			>
				<svg width='18' height='18' viewBox='0 0 16 16' fill='none'>
					<path
						d='M10 13L5 8L10 3'
						stroke='#222222'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			{/* Right Arrow - always visible */}
			<button
				className={`${styles.arrowBtn} ${styles.nextArrow}`}
				onClick={nextSlide}
				aria-label='Next slide'
			>
				<svg width='18' height='18' viewBox='0 0 16 16' fill='none'>
					<path
						d='M6 3L11 8L6 13'
						stroke='#222222'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			{/* Slide Content */}
			<div className={styles.slideWrapper}>
				<Link
					href={slide.learnMoreHref}
					className={styles.slideLink}
					aria-label={`${slide.title} - Learn more`}
				>
					<div className={styles.imageContainer}>
						<Image
							key={slide.id}
							src={slide.desktopImage}
							alt={slide.alt}
							fill
							priority
							className={styles.bannerImage}
							sizes='100vw'
							unoptimized={slide.desktopImage.startsWith('http')}
						/>
					</div>
				</Link>

				{/* Accessible Hotspot / Direct CTA link */}
				<Link
					href={slide.learnMoreHref}
					className={styles.learnMoreOverlay}
				>
					Learn more
				</Link>
			</div>

			{/* Dash Pagination Indicators */}
			<div className={styles.pagination}>
				<div className={styles.dashTrack}>
					{slides.map((_, idx) => (
						<button
							key={idx}
							className={`${styles.dash} ${currentSlide === idx ? styles.activeDash : ''}`}
							onClick={() => setCurrentSlide(idx)}
							aria-label={`Slide ${idx + 1} of ${slides.length}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default HeroBanner

