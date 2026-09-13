'use client'

import Button from '@components/ui/button/Button'
import { FC } from 'react'

import styles from './KnowledgeBaseSection.module.scss'

const ARTICLES = [
	{
		id: '1',
		date: 'June 14, 2024',
		category: 'Laser Cutting Technologies',
		title: 'How a Laser Marker Works: Step-by-Step Technical Guide',
		desc: 'Learn about galvanometer scanners, fiber wavelengths, and choosing frequency settings for deep metal engraving.'
	},
	{
		id: '2',
		date: 'May 28, 2024',
		category: 'Setup & Calibration',
		title: 'Setting up a CO2 Laser Engraver: Optical Alignment from Scratch',
		desc: 'A complete practical walkthrough of mirror alignment, focal height adjustment, and test beam shooting for optimal cut depth.'
	}
]

const TOPICS = [
	'Laser Cutting Technologies',
	'CNC Milling & Tool Selection',
	'Optics, Lenses & Mirrors',
	'Chiller & Cooling Maintenance',
	'Fume Extraction & Air Assist',
	'Material Speed & Power Tables'
]

export const KnowledgeBaseSection: FC = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.layout}>
					<div className={styles.articlesCol}>
						<div className={styles.header}>
							<span className={styles.subtitle}>Engineering Library</span>
							<h2 className={styles.title}>Knowledge Base</h2>
						</div>

						<div className={styles.articlesList}>
							{ARTICLES.map(art => (
								<article key={art.id} className={styles.articleCard}>
									<div className={styles.cardHeader}>
										<span className={styles.category}>{art.category}</span>
										<span className={styles.date}>{art.date}</span>
									</div>
									<h3 className={styles.articleTitle}>{art.title}</h3>
									<p className={styles.articleDesc}>{art.desc}</p>
									<span className={styles.readMore}>Read article →</span>
								</article>
							))}
						</div>
					</div>

					<div className={styles.topicsCol}>
						<div className={styles.topicsCard}>
							<h3 className={styles.topicsTitle}>Article Categories</h3>
							<ul className={styles.topicsList}>
								{TOPICS.map((topic, i) => (
									<li key={i} className={styles.topicItem}>
										<span className={styles.topicBullet}>•</span>
										<span>{topic}</span>
									</li>
								))}
							</ul>

							<Button
								href='/support'
								view='bordered'
								size='m'
								className={styles.allArticlesBtn}
							>
								View all guides
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default KnowledgeBaseSection
