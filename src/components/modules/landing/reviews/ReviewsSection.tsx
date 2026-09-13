'use client'

import { FC } from 'react'

import styles from './ReviewsSection.module.scss'

const REVIEWS = [
	{
		id: '1',
		type: 'text',
		author: 'Alexander Morozov',
		company: 'ArtWood Workshop',
		date: 'May 14, 2024',
		rating: 5,
		text: 'We acquired the WATTSAN 6040 ST machine for laser cutting personalized wooden gifts. The precision is phenomenal, and edge burn is minimal. In our first 6 months, production volume tripled.'
	},
	{
		id: '2',
		type: 'text',
		author: 'Elena Rostova',
		company: 'Signage & Acrylic Studio',
		date: 'April 28, 2024',
		rating: 5,
		text: 'The support team helped us calibrate the optical path and setup the chiller in just an afternoon. The machine runs 12 hours a day without hiccups. Truly industrial reliability.'
	},
	{
		id: '3',
		type: 'video',
		author: 'Eugene Korenev',
		company: 'Industrial Metal Works',
		date: 'May 12, 2024',
		rating: 5,
		title: 'Video review: WATTSAN A1 1325 CNC in mass production',
		videoDuration: '3:45'
	}
]

export const ReviewsSection: FC = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.header}>
					<span className={styles.subtitle}>Verified Feedback</span>
					<h2 className={styles.title}>Clients and Video Reviews</h2>
				</div>

				<div className={styles.grid}>
					{REVIEWS.map(item => (
						<article key={item.id} className={styles.card}>
							{item.type === 'text' ? (
								<>
									<div className={styles.cardTop}>
										<div className={styles.authorInfo}>
											<div className={styles.avatarCircle}>
												{item.author[0]}
											</div>
											<div>
												<h3 className={styles.authorName}>{item.author}</h3>
												<span className={styles.companyName}>{item.company}</span>
											</div>
										</div>
										<div className={styles.ratingStars}>
											{'★'.repeat(item.rating)}
										</div>
									</div>
									<p className={styles.reviewText}>{item.text}</p>
									<span className={styles.reviewDate}>{item.date}</span>
								</>
							) : (
								<div className={styles.videoCard}>
									<div className={styles.videoThumbnail}>
										<div className={styles.playButton}>
											<span className={styles.playTriangle}>▶</span>
										</div>
										<span className={styles.durationBadge}>{item.videoDuration}</span>
									</div>
									<div className={styles.videoInfo}>
										<h3 className={styles.videoTitle}>{item.title}</h3>
										<div className={styles.videoMeta}>
											<span>{item.author}</span>
											<span>•</span>
											<span>{item.company}</span>
										</div>
									</div>
								</div>
							)}
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default ReviewsSection
