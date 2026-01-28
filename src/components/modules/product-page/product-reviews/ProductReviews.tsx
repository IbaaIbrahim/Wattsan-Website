'use client'

import { FC, useRef } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './ProductReviews.module.scss'
import arrowIcon from '@public/img/icons/arrow-left.svg'

export interface IReview {
	id: string
	image: string
	quote: string
	author: {
		name: string
		title: string
		avatar: string
	}
}

interface ProductReviewsProps {
	reviews?: IReview[]
	className?: string
}

const ProductReviews: FC<ProductReviewsProps> = ({ reviews = [], className }) => {
	const trackRef = useRef<HTMLDivElement>(null)

	const scroll = (direction: 'left' | 'right') => {
		if (trackRef.current) {
			// Scroll by approximate card width + gap
			const cardWidth = trackRef.current.children[0]?.clientWidth || 300
			const gap = 24
			const scrollAmount = cardWidth + gap

			trackRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth'
			})
		}
	}

	const defaultReviews: IReview[] = [
		{
			id: '1',
			image: '/product-cards/image 11651.png',
			quote: '"I\'m extremely happy with the device! Its powerful reinforced frame reduces wobbling which is perfect for engraving at high speeds. I\'ve been using it for acrylic glass and the results look really cool."',
			author: {
				name: 'Heinrich Schuur',
				title: 'Blogger',
				avatar: '/img/catalog/cnc-routes.png' // Keeping placeholder for avatar as no specific asset provided
			}
		},
		{
			id: '2',
			image: '/product-cards/image 11650.png',
			quote: '"The precision of this machine is unmatched in this price range. It fits perfectly in our workshop and the support team was super helpful during setup."',
			author: {
				name: 'David Miller',
				title: 'Workshop Owner',
				avatar: '/img/catalog/cnc-routes.png'
			}
		},
		{
			id: '3',
			image: '/product-cards/image 11649.png',
			quote: '"Fast, reliable, and easy to use. The control system is intuitive and we were able to start production on day one."',
			author: {
				name: 'Sarah Chen',
				title: 'Production Manager',
				avatar: '/img/catalog/cnc-routes.png'
			}
		}
	]

	const displayReviews = reviews.length > 0 ? reviews : defaultReviews

	return (
		<section className={clsx(styles.section, className)}>
			<div className={styles.header}>
				<h2 className={styles.title}>
					<span className={styles.redText}>Reviews</span> by clients and experts
				</h2>
				<div className={styles.controls}>
					<button
						className={clsx(styles.controlButton, styles.prevButton)}
						onClick={() => scroll('left')}
						aria-label="Previous review"
					>
						<Image src={arrowIcon} alt="Previous" width={24} height={24} />
					</button>
					<button
						className={clsx(styles.controlButton, styles.nextButton)}
						onClick={() => scroll('right')}
						aria-label="Next review"
					>
						<Image src={arrowIcon} alt="Next" width={24} height={24} />
					</button>
				</div>
			</div>

			<div className={styles.reviewsTrack} ref={trackRef}>
				{displayReviews.map((review) => (
					<div key={review.id} className={styles.reviewCard}>
						<div className={styles.imageWrapper}>
							<Image
								src={review.image}
								alt={`Review by ${review.author.name}`}
								width={540}
								height={360}
							/>
						</div>
						<div className={styles.reviewContent}>
							<p className={styles.quote}>
								{review.quote}
							</p>
							<div className={styles.author}>
								<div className={styles.avatar}>
									<Image
										src={review.author.avatar}
										alt={review.author.name}
										width={40}
										height={40}
									/>
								</div>
								<div className={styles.authorInfo}>
									<span className={styles.authorName}>{review.author.name}</span>
									<span className={styles.authorTitle}>{review.author.title}</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default ProductReviews
