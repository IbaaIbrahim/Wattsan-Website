'use client'

import Button from '@components/ui/button/Button'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

import styles from './CategoriesShowcase.module.scss'

interface CategoryCard {
	id: string
	tag: string
	title: string
	description: string
	price: string
	specs: string[]
	image: string
	link: string
}

const CATEGORIES: { id: string; label: string }[] = [
	{ id: 'all', label: 'All machines' },
	{ id: 'laser-co2', label: 'CO2 Lasers' },
	{ id: 'metal', label: 'Metal cutting' },
	{ id: 'router', label: 'CNC Routers' },
	{ id: 'markers', label: 'Fiber Markers' }
]

const CARDS: CategoryCard[] = [
	{
		id: 'laser-co2',
		tag: 'CO2 Lasers',
		title: 'WATTSAN Laser Cutting & Engraving',
		description: 'High-speed processing of plywood, acrylic, fabric, leather, and plastics with extreme precision.',
		price: 'From $4,200',
		specs: ['Work area: up to 2000×3000 mm', 'Laser power: up to 180W', 'Speed: up to 1000 mm/s'],
		image: '/img/grid-machines/icon-for-mini-equipment.png',
		link: '/product/laser-co2'
	},
	{
		id: 'metal',
		tag: 'Metal cutting',
		title: 'WATTSAN Fiber Laser Metal Cutters',
		description: 'Industrial fiber cutting machines for stainless steel, carbon steel, brass, and aluminum up to 25mm.',
		price: 'From $18,500',
		specs: ['Laser power: 1 kW - 12 kW', 'CypCut control system', 'Cast iron heavy frame'],
		image: '/img/grid-machines/icon-for-m1-equipment.png',
		link: '/configurator'
	},
	{
		id: 'router',
		tag: 'CNC Routers',
		title: 'WATTSAN Heavy-Duty CNC Milling',
		description: 'Precision 3D carving and nesting for wood, composite, non-ferrous metals, and MDF boards.',
		price: 'From $7,900',
		specs: ['Spindle power: 3.2 kW - 9.0 kW', 'Vacuum table & T-slots', 'DSP or NC-Studio control'],
		image: '/img/grid-machines/icon-for-a1-equipment.png',
		link: '/product/cnc-router'
	},
	{
		id: 'markers',
		tag: 'Fiber Markers',
		title: 'WATTSAN High-Precision Fiber Markers',
		description: 'Ultra-fast marking, engraving, and serial numbering on all metals, ceramics, and dark plastics.',
		price: 'From $3,400',
		specs: ['Marking speed: up to 7000 mm/s', 'Raycus / IPG / JPT sources', 'Rotary device ready'],
		image: '/img/grid-machines/icon-for-m1-rd-equipment.png',
		link: '/configurator'
	}
]

export const CategoriesShowcase: FC = () => {
	const [activeCategory, setActiveCategory] = useState<string>('all')

	const filteredCards =
		activeCategory === 'all'
			? CARDS
			: CARDS.filter(c => c.id === activeCategory)

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.header}>
					<span className={styles.subtitle}>Versatile catalogue</span>
					<h2 className={styles.title}>
						The Most Advanced and Versatile Machines
					</h2>
					<div className={styles.tabsWrapper}>
						{CATEGORIES.map(cat => (
							<button
								key={cat.id}
								className={`${styles.tabBtn} ${activeCategory === cat.id ? styles.activeTab : ''}`}
								onClick={() => setActiveCategory(cat.id)}
							>
								{cat.label}
							</button>
						))}
					</div>
				</div>

				<div className={styles.cardsGrid}>
					{filteredCards.map(card => (
						<article key={card.title} className={styles.card}>
							<div className={styles.cardHeader}>
								<span className={styles.cardTag}>{card.tag}</span>
								<span className={styles.cardPrice}>{card.price}</span>
							</div>
							<h3 className={styles.cardTitle}>{card.title}</h3>
							<p className={styles.cardDesc}>{card.description}</p>

							<div className={styles.imageBox}>
								<Image
									src={card.image}
									alt={card.title}
									width={340}
									height={240}
									className={styles.image}
								/>
							</div>

							<ul className={styles.specsList}>
								{card.specs.map((spec, i) => (
									<li key={i} className={styles.specItem}>
										<span className={styles.checkIcon}>✓</span>
										<span>{spec}</span>
									</li>
								))}
							</ul>

							<div className={styles.cardFooter}>
								<Button
									href={card.link}
									view='blue'
									size='m'
									className={styles.actionBtn}
								>
									Explore series
								</Button>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default CategoriesShowcase
