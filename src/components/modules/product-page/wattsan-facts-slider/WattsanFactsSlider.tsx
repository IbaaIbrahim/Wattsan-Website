'use client'

import { FC } from 'react'
import Image from 'next/image'
import EmblaCarousel from '@components/ui/embla-carousel/EmblaCarousel'
import styles from './WattsanFactsSlider.module.scss'

export interface WattsanFactCardData {
	id: string
	subtitle: string
	title: string
	type: 'image' | 'video' | 'background' | 'solid'
	backgroundColor?: string
	imageUrl?: string
	videoUrl?: string
	certifications?: string[]
}

interface WattsanFactsSliderProps {
	cards: WattsanFactCardData[]
	titleHighlight?: string
	className?: string
}

const isHexDark = (hex?: string) => {
	if (!hex || typeof hex !== 'string') return true
	const clean = hex.replace('#', '').trim()
	if (clean.length !== 6 && clean.length !== 3) return true
	const r = parseInt(clean.length === 3 ? clean[0] + clean[0] : clean.substring(0, 2), 16)
	const g = parseInt(clean.length === 3 ? clean[1] + clean[1] : clean.substring(2, 4), 16)
	const b = parseInt(clean.length === 3 ? clean[2] + clean[2] : clean.substring(4, 6), 16)
	if (isNaN(r) || isNaN(g) || isNaN(b)) return true
	const brightness = (r * 299 + g * 587 + b * 114) / 1000
	return brightness < 180
}

const WattsanFactsSlider: FC<WattsanFactsSliderProps> = ({
	cards,
	titleHighlight = 'Wattsan CNC routers',
	className
}) => {
	const renderCard = (card: WattsanFactCardData) => {
		const isReputation =
			card.id === 'reputation' ||
			card.subtitle?.toLowerCase().includes('reputation') ||
			card.title?.toLowerCase().includes('continent')
		const isSafety =
			card.id === 'safety' ||
			card.subtitle?.toLowerCase().includes('safety') ||
			card.title?.toLowerCase().includes('certifications')

		const isBackground = card.type === 'background' || card.type === 'solid'
		const defaultBg = isReputation ? '#335198' : isSafety ? '#deebfa' : '#f5f8fb'
		const bgColor = card.backgroundColor || defaultBg

		const isDark =
			card.type === 'image' ||
			card.type === 'video' ||
			(isBackground && isHexDark(bgColor))

		return (
			<div
				key={card.id}
				id={card.id}
				className={`${styles.card} ${
					card.type === 'image'
						? styles.cardImage
						: card.type === 'video'
							? styles.cardVideo
							: styles.cardSolid
				} ${isDark ? styles.cardDark : styles.cardLight}`}
				style={isBackground ? { backgroundColor: bgColor } : undefined}
			>
				{card.type === 'image' && card.imageUrl && (
					<div className={styles.imageContainer}>
						<Image
							src={card.imageUrl}
							alt={card.title}
							fill
							className={styles.image}
							style={{ objectFit: 'cover' }}
						/>
						<div className={styles.gradientOverlay} />
					</div>
				)}

				{card.type === 'video' && (card.videoUrl || card.imageUrl) && (
					<div className={styles.imageContainer}>
						<video
							src={card.videoUrl || card.imageUrl}
							autoPlay
							muted
							loop
							playsInline
							className={styles.video}
						/>
						<div className={styles.gradientOverlay} />
					</div>
				)}

				{isReputation && isBackground && (
					<div className={styles.worldMap}>
						<Image
							src="/img/world-map-dots.svg"
							alt="World map"
							width={442}
							height={246}
							className={styles.worldMapSvg}
							priority={false}
						/>
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
	}

	return (
		<section className={`${styles.section} ${className || ''}`}>
			<h2 className={styles.title}>
				A couple of facts about <span className={styles.titleHighlight}>{titleHighlight}</span>
			</h2>
			<div className={styles.carouselWrapper}>
				<EmblaCarousel
					slides={cards}
					renderItem={(card) => renderCard(card as WattsanFactCardData)}
					options={{ align: 'start', loop: true }}
					slideClassName={styles.carouselSlide}
					matchHeight={true}
				/>
			</div>
		</section>
	)
}

export default WattsanFactsSlider
