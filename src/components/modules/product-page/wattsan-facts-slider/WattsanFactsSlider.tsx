'use client'

import { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import Carousel from '@components/ui/carousel/Carousel'
import styles from './WattsanFactsSlider.module.scss'

export interface WattsanFactCardData {
	id: string
	subtitle: string
	title: string
	type: 'image' | 'solid'
	backgroundColor?: string
	imageUrl?: string
	certifications?: string[]
}

interface WattsanFactsSliderProps {
	cards: WattsanFactCardData[]
	className?: string
}

const WattsanFactsSlider: FC<WattsanFactsSliderProps> = ({ cards, className }) => {
	const renderCard = (card: WattsanFactCardData) => (
		<div
			key={card.id}
			id={card.id}
			className={`${styles.card} ${card.type === 'image' ? styles.cardImage : styles.cardSolid}`}
			style={
				card.type === 'solid' && card.backgroundColor
					? { backgroundColor: card.backgroundColor }
					: undefined
			}
		>
			{card.type === 'image' && card.imageUrl && (
				<div className={styles.imageContainer}>
					<Image
						src={card.imageUrl}
						alt={card.title}
						fill
						className={styles.image}
						objectFit="cover"
					/>
					<div className={styles.gradientOverlay} />
				</div>
			)}
			{card.id === 'reputation' && card.type === 'solid' && (
				<div className={styles.worldMap}>
					{/* World map outline - pixelated style representation */}
					<svg
						width="464"
						height="246"
						viewBox="0 0 464 246"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={styles.worldMapSvg}
						preserveAspectRatio="xMidYMid meet"
					>
						{/* Simplified pixelated world map - multiple small lines to create map effect */}
						{/* This is a simplified representation - in production, use actual world map SVG */}
						<g opacity="0.5">
							{/* North America outline */}
							<path d="M 80 80 L 100 70 L 120 75 L 140 65 L 160 75 L 180 60" stroke="white" strokeWidth="1.5" fill="none" />
							<path d="M 80 100 L 100 90 L 120 95 L 140 85 L 160 95 L 180 80" stroke="white" strokeWidth="1.5" fill="none" />
							{/* Europe/Africa outline */}
							<path d="M 200 70 L 220 80 L 240 75 L 260 85 L 280 70 L 300 80" stroke="white" strokeWidth="1.5" fill="none" />
							<path d="M 200 90 L 220 100 L 240 95 L 260 105 L 280 90 L 300 100" stroke="white" strokeWidth="1.5" fill="none" />
							<path d="M 240 120 L 260 130 L 280 125 L 300 135 L 320 120" stroke="white" strokeWidth="1.5" fill="none" />
							{/* Asia outline */}
							<path d="M 320 70 L 340 80 L 360 75 L 380 85 L 400 70" stroke="white" strokeWidth="1.5" fill="none" />
							<path d="M 320 90 L 340 100 L 360 95 L 380 105 L 400 90" stroke="white" strokeWidth="1.5" fill="none" />
							<path d="M 340 120 L 360 130 L 380 125 L 400 135" stroke="white" strokeWidth="1.5" fill="none" />
							{/* South America outline */}
							<path d="M 120 140 L 140 150 L 160 145 L 180 155 L 200 140" stroke="white" strokeWidth="1.5" fill="none" />
							<path d="M 120 160 L 140 170 L 160 165 L 180 175 L 200 160" stroke="white" strokeWidth="1.5" fill="none" />
							{/* Australia outline */}
							<path d="M 340 150 L 360 160 L 380 155" stroke="white" strokeWidth="1.5" fill="none" />
							<path d="M 340 170 L 360 180 L 380 175" stroke="white" strokeWidth="1.5" fill="none" />
						</g>
					</svg>
				</div>
			)}
			<div className={styles.cardContent}>
				<p className={styles.subtitle}>{card.subtitle}</p>
				<h3 className={styles.cardTitle}>{card.title}</h3>
				{card.certifications && card.certifications.length > 0 && (
					<div className={styles.certifications}>
						{card.certifications.map((cert, index) => (
							<span key={index} className={styles.certificationTag}>
								{cert}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	)

	// Responsive item width
	const [itemWidth, setItemWidth] = useState<number | undefined>(442)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setItemWidth(undefined) // Let carousel take full width
			} else if (window.innerWidth < 1200) {
				setItemWidth(340) // Smaller cards for tablets
			} else {
				setItemWidth(442) // Default for desktop
			}
		}

		// Initial call
		handleResize()

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<section className={`${styles.section} ${className || ''}`}>
			<h2 className={styles.title}>
				A couple of facts about <span className={styles.titleHighlight}>Wattsan CNC routers</span>
			</h2>
			<div className={styles.carouselWrapper}>
				<Carousel
					items={cards}
					itemWidth={itemWidth}
					renderItem={(card) => renderCard(card as WattsanFactCardData)}
					hideNavigation={true}
					enableSwipe={true}
					enableDrag={true}
					swipeThreshold={50}
				/>
			</div>
		</section>
	)
}

export default WattsanFactsSlider
