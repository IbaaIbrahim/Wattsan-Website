'use client'

import Button from '@components/ui/button/Button'
import { MODALS } from '@components/ui/modal/Modal'
import { modalsStore } from '@store/modals'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

import styles from './HeroBanner.module.scss'

interface SlideData {
	id: number
	tag: string
	titleLine1: string
	titleHighlight1: string
	titleHighlight2: string
	subtitle: string
	buttonText: string
	statBadge: string
	statLabel: string
	machineName: string
	machineType: string
	workArea: string
	laserPower: string
	imageSrc: string
}

const SLIDES: SlideData[] = [
	{
		id: 0,
		tag: 'Demonstrating equipment operation',
		titleLine1: 'Demonstration of machines',
		titleHighlight1: 'ONLINE',
		titleHighlight2: 'OFFLINE',
		subtitle: 'In more than 50 partner cities or via live interactive video demonstration',
		buttonText: 'Book a demonstration',
		statBadge: '50+',
		statLabel: 'cities worldwide',
		machineName: 'WATTSAN 1610 Conveyor',
		machineType: 'Large-Format CO2 Laser',
		workArea: '1600 × 1000 mm',
		laserPower: '100W – 150W Reci',
		imageSrc: '/img/grid-machines/icon-for-mini-equipment.png'
	},
	{
		id: 1,
		tag: 'Industrial precision & reliability',
		titleLine1: 'High-precision cutting & engraving',
		titleHighlight1: 'WATTSAN',
		titleHighlight2: 'SERIES',
		subtitle: 'Industrial machines for acrylic, plywood, plastics, leather, and metal alloys',
		buttonText: 'Explore CO2 Lasers',
		statBadge: '0.01mm',
		statLabel: 'repeat accuracy',
		machineName: 'WATTSAN 6040 ST',
		machineType: 'Universal CO2 Laser',
		workArea: '600 × 400 mm',
		laserPower: '80W – 100W',
		imageSrc: '/img/grid-machines/icon-for-m1-equipment.png'
	},
	{
		id: 2,
		tag: 'Mass production & 3D nesting',
		titleLine1: 'Heavy-duty CNC milling & routing',
		titleHighlight1: 'ACCURACY',
		titleHighlight2: 'SPEED',
		subtitle: 'Equipped with heavy cast beds, vacuum clamping, and high-frequency spindles',
		buttonText: 'Open Configurator',
		statBadge: '2 Years',
		statLabel: 'comprehensive warranty',
		machineName: 'WATTSAN A1 1325',
		machineType: 'Industrial CNC Router',
		workArea: '1300 × 2500 mm',
		laserPower: '3.2 kW – 9.0 kW',
		imageSrc: '/img/grid-machines/icon-for-a1-equipment.png'
	}
]

export const HeroBanner: FC = () => {
	const [currentSlide, setCurrentSlide] = useState<number>(0)
	const [isPaused, setIsPaused] = useState<boolean>(false)

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % SLIDES.length)
	}

	const prevSlide = () => {
		setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length)
	}

	useEffect(() => {
		if (isPaused) return
		const timer = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % SLIDES.length)
		}, 6000)
		return () => clearInterval(timer)
	}, [isPaused])

	const handleAction = () => {
		if (currentSlide === 0) {
			modalsStore.set.open(MODALS.requestCallback, {
				title: 'Book a Machine Demonstration',
				subtitle: 'Choose between showroom visit or online video demonstration with our CNC experts.'
			})
		} else if (currentSlide === 1) {
			window.location.href = '/product/laser-co2'
		} else {
			window.location.href = '/configurator'
		}
	}

	const slide = SLIDES[currentSlide]

	return (
		<section
			className={styles.heroSection}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			{/* Left Arrow */}
			<button
				className={`${styles.arrowBtn} ${styles.prevArrow}`}
				onClick={prevSlide}
				aria-label='Previous slide'
			>
				<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
					<path
						d='M10 13L5 8L10 3'
						stroke='#3E1EB5'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			{/* Right Arrow */}
			<button
				className={`${styles.arrowBtn} ${styles.nextArrow}`}
				onClick={nextSlide}
				aria-label='Next slide'
			>
				<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
					<path
						d='M6 3L11 8L6 13'
						stroke='#3E1EB5'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			<div className={styles.container}>
				<div className={styles.contentCol}>
					<div className={styles.badge}>
						<span className={styles.badgeDot} />
						{slide.tag}
					</div>

					<h1 className={styles.title}>
						{slide.titleLine1}{' '}
						<span className={styles.highlight}>{slide.titleHighlight1}</span>{' '}
						<span className={styles.highlight}>{slide.titleHighlight2}</span>
					</h1>

					<p className={styles.description}>{slide.subtitle}</p>

					<div className={styles.actions}>
						<Button
							view='blue'
							size='l'
							className={styles.ctaBtn}
							onClick={handleAction}
						>
							{slide.buttonText}
						</Button>
						<Button
							view='bordered'
							size='l'
							className={styles.configBtn}
							href='/configurator'
						>
							Open Configurator
						</Button>
					</div>

					<div className={styles.statsRow}>
						<div className={styles.statItem}>
							<div className={styles.statNumber}>{slide.statBadge}</div>
							<div className={styles.statLabel}>{slide.statLabel}</div>
						</div>
						<div className={styles.statDivider} />
						<div className={styles.statItem}>
							<div className={styles.statNumber}>24/7</div>
							<div className={styles.statLabel}>Engineer support</div>
						</div>
						<div className={styles.statDivider} />
						<div className={styles.statItem}>
							<div className={styles.statNumber}>100%</div>
							<div className={styles.statLabel}>Pre-shipment calibration</div>
						</div>
					</div>
				</div>

				<div className={styles.imageCol}>
					<div className={styles.machineCard}>
						<div className={styles.cityBadge}>
							<span className={styles.cityBadgeNumber}>{slide.statBadge}</span>
							<span className={styles.cityBadgeText}>{slide.statLabel}</span>
						</div>

						<div className={styles.floatingBadgeTop}>
							<span>{slide.machineName}</span>
							<span className={styles.accentBadge}>{slide.machineType}</span>
						</div>

						<div className={styles.imageWrapper}>
							<Image
								key={slide.id}
								src={slide.imageSrc}
								alt={slide.machineName}
								width={520}
								height={360}
								priority
								className={styles.machineImage}
							/>
						</div>

						<div className={styles.floatingBadgeBottom}>
							<div className={styles.specItem}>
								<span className={styles.specKey}>Work area:</span>
								<span className={styles.specVal}>{slide.workArea}</span>
							</div>
							<div className={styles.specItem}>
								<span className={styles.specKey}>Power rating:</span>
								<span className={styles.specVal}>{slide.laserPower}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Pagination Dots */}
			<div className={styles.pagination}>
				<div className={styles.paginationPill}>
					{SLIDES.map((_, idx) => (
						<button
							key={idx}
							className={`${styles.dot} ${currentSlide === idx ? styles.activeDot : ''}`}
							onClick={() => setCurrentSlide(idx)}
							aria-label={`Go to slide ${idx + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default HeroBanner
