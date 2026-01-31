'use client'

import { FC, useState, useEffect } from 'react'
import Image from 'next/image'
// import Carousel from '@components/ui/carousel/Carousel'
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
					<svg
						width="464"
						height="246"
						viewBox="0 0 464 246"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={styles.worldMapSvg}
						preserveAspectRatio="xMidYMid meet"
					>
						<g opacity="0.3" stroke="white" strokeWidth="1" fill="none">
							<circle cx="100" cy="80" r="2" fill="white" />
							<circle cx="150" cy="120" r="2" fill="white" />
							<circle cx="220" cy="70" r="2" fill="white" />
							<circle cx="260" cy="140" r="2" fill="white" />
							<circle cx="350" cy="90" r="2" fill="white" />
							<circle cx="380" cy="160" r="2" fill="white" />
							<path d="M 80 80 Q 150 50 200 80 T 350 90" strokeDasharray="4 4" />
							<path d="M 120 140 Q 200 110 280 140 T 380 160" strokeDasharray="4 4" />
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
				setItemWidth(280) // Set a mobile width
			} else if (window.innerWidth < 1200) {
				setItemWidth(320)
			} else {
				setItemWidth(400)
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
				{/* <Carousel
					items={cards}
					itemWidth={itemWidth}
					renderItem={(card) => renderCard(card as WattsanFactCardData)}
					align="start"
					loop={true}
					hideNavigation={false}
				/> */}
			</div>
		</section>
	)
}

export default WattsanFactsSlider
