'use client'

import { FC } from 'react'
import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './ProductInfo.module.scss'

interface ProductInfoProps {
	categoryTitle?: string
	title: string
	rating?: number
	reviewCount?: number
	questionCount?: number
	currentPrice: string
	originalPrice?: string
	discount?: string
	discountPercent?: string
	availability?: string
	shipment?: string
	delivery?: string
	warranty?: string
	deliveryMethods?: string[]
	activeDeliveryMethod?: string
	deliveryNote?: string
	isFavorite?: boolean
	onToggleFavorite?: () => void
	onAddToBasket?: () => void
	onViewSpecifications?: () => void
	onDeliveryMethodClick?: (method: string) => void
	className?: string
}

const ProductInfo: FC<ProductInfoProps> = ({
	categoryTitle = 'CNC Router Machine',
	title,
	rating = 5.0,
	reviewCount = 10,
	questionCount = 21,
	currentPrice,
	originalPrice,
	discount,
	discountPercent,
	availability = 'In stock',
	shipment = '2 days',
	delivery = 'from 20 days',
	warranty,
	deliveryMethods = [],
	activeDeliveryMethod,
	deliveryNote,
	onAddToBasket,
	onViewSpecifications,
	onDeliveryMethodClick,
	className
}) => {
	const formattedRating = typeof rating === 'number' ? rating.toFixed(1) : rating
	const formattedDiscountPercent = discountPercent
		? discountPercent.startsWith('-')
			? discountPercent
			: `-${discountPercent}`
		: undefined

	return (
		<div className={clsx(styles.productInfo, className)}>
			<div className={styles.headerBlock}>
				<div className={styles.titleGroup}>
					{categoryTitle && (
						<Typography tag='p' size='m' weight='regular' className={styles.categoryTitle}>
							{categoryTitle}
						</Typography>
					)}
					<p className={styles.title}>
						{title}
					</p>
				</div>

				<div className={styles.ratings}>
					<div className={styles.ratingGroup}>
						<div className={styles.ratingScore}>
							<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z'
									fill='#FFA99D'
								/>
							</svg>
							<Typography tag='p' size='m' weight='regular' className={styles.ratingValue}>
								{formattedRating}
							</Typography>
						</div>
						<Typography tag='p' size='m' weight='regular' className={styles.reviews}>
							{reviewCount} reviews
						</Typography>
					</div>

					<div className={styles.questionsGroup}>
						<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z'
								stroke='#B2B2B2'
								strokeWidth='1.33333'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M6.06 6C6.21673 5.55444 6.5261 5.17874 6.9333 4.93942C7.3405 4.70011 7.81926 4.61263 8.28478 4.69247C8.7503 4.77232 9.17254 5.01435 9.47671 5.37568C9.78089 5.73702 9.94737 6.19435 9.94667 6.66667C9.94667 8 7.94667 8.66667 7.94667 8.66667'
								stroke='#B2B2B2'
								strokeWidth='1.33333'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M8 11.3333H8.00667'
								stroke='#B2B2B2'
								strokeWidth='1.33333'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						<Typography tag='p' size='m' weight='regular' className={styles.questions}>
							{questionCount} questions
						</Typography>
					</div>
				</div>

				{onViewSpecifications && (
					<button className={styles.specificationsLink} onClick={onViewSpecifications} type='button'>
						<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M9.66663 14L9.39996 12.4C9.12218 12.3 8.85829 12.1722 8.60829 12.0167C8.35829 11.8611 8.13329 11.6778 7.93329 11.4667L6.39996 12.1L5.06663 9.79999L6.36663 8.79999C6.3444 8.66666 6.33329 8.53333 6.33329 8.39999C6.33329 8.26666 6.3444 8.13333 6.36663 7.99999L5.06663 6.99999L6.39996 4.69999L7.93329 5.33333C8.13329 5.12222 8.35829 4.93888 8.60829 4.78333C8.85829 4.62777 9.12218 4.49999 9.39996 4.39999L9.66663 2.79999H12.3333L12.6 4.39999C12.8777 4.49999 13.1416 4.62777 13.3916 4.78333C13.6416 4.93888 13.8666 5.12222 14.0666 5.33333L15.6 4.69999L16.9333 6.99999L15.6333 7.99999C15.6555 8.13333 15.6666 8.26666 15.6666 8.39999C15.6666 8.53333 15.6555 8.66666 15.6333 8.79999L16.9333 9.79999L15.6 12.1L14.0666 11.4667C13.8666 11.6778 13.6416 11.8611 13.3916 12.0167C13.1416 12.1722 12.8777 12.3 12.6 12.4L12.3333 14H9.66663ZM11 10.4C11.5555 10.4 12.0277 10.2055 12.4166 9.81666C12.8055 9.42777 13 8.95555 13 8.39999C13 7.84444 12.8055 7.37222 12.4166 6.98333C12.0277 6.59444 11.5555 6.39999 11 6.39999C10.4444 6.39999 9.97218 6.59444 9.58329 6.98333C9.1944 7.37222 8.99996 7.84444 8.99996 8.39999C8.99996 8.95555 9.1944 9.42777 9.58329 9.81666C9.97218 10.2055 10.4444 10.4 11 10.4ZM2.99996 6.66666L2.83329 5.59999C2.65551 5.53333 2.48885 5.44722 2.33329 5.34166C2.17774 5.23611 2.03329 5.11111 1.89996 4.96666L0.866626 5.39999L-4.05312e-05 3.86666L0.866626 3.19999C0.844404 3.11111 0.833293 3.02222 0.833293 2.93333C0.833293 2.84444 0.844404 2.75555 0.866626 2.66666L-4.05312e-05 1.99999L0.866626 0.46666L1.89996 0.899993C2.03329 0.755549 2.17774 0.630549 2.33329 0.524993C2.48885 0.419438 2.65551 0.333327 2.83329 0.26666L2.99996 -0.800007H4.79996L4.96663 0.26666C5.1444 0.333327 5.31107 0.419438 5.46663 0.524993C5.62218 0.630549 5.76663 0.755549 5.89996 0.899993L6.93329 0.46666L7.79996 1.99999L6.93329 2.66666C6.95551 2.75555 6.96663 2.84444 6.96663 2.93333C6.96663 3.02222 6.95551 3.11111 6.93329 3.19999L7.79996 3.86666L6.93329 5.39999L5.89996 4.96666C5.76663 5.11111 5.62218 5.23611 5.46663 5.34166C5.31107 5.44722 5.1444 5.53333 4.96663 5.59999L4.79996 6.66666H2.99996ZM3.89996 4.26666C4.26663 4.26666 4.58051 4.13611 4.84163 3.87499C5.10274 3.61388 5.23329 3.29999 5.23329 2.93333C5.23329 2.56666 5.10274 2.25277 4.84163 1.99166C4.58051 1.73055 4.26663 1.59999 3.89996 1.59999C3.53329 1.59999 3.2194 1.73055 2.95829 1.99166C2.69718 2.25277 2.56663 2.56666 2.56663 2.93333C2.56663 3.29999 2.69718 3.61388 2.95829 3.87499C3.2194 4.13611 3.53329 4.26666 3.89996 4.26666Z'
								fill='black'
							/>
						</svg>
						<Typography tag='p' size='m' weight='semi-bold' className={styles.specificationsText}>
							View all specifications
						</Typography>
					</button>
				)}
			</div>

			<div className={styles.pricing}>
				<div className={styles.priceRow}>
					<p className={styles.currentPrice}>
						{currentPrice}
					</p>
					{originalPrice && (
						<p className={styles.originalPrice}>
							{originalPrice}
						</p>
					)}
				</div>
				{(discount || formattedDiscountPercent) && (
					<div className={styles.discountRow}>
						<Typography tag='p' size='m' weight='regular' className={styles.discountLabel}>
							Discount
						</Typography>
						{discount && (
							<Typography tag='p' size='m' weight='semi-bold' className={styles.discountValue}>
								{discount}
							</Typography>
						)}
						{formattedDiscountPercent && (
							<div className={styles.discountBadge}>
								<span>{formattedDiscountPercent}</span>
							</div>
						)}
					</div>
				)}
			</div>

			<div className={styles.buttonRow}>
				<Button
					view='red'
					size='l'
					block
					className={styles.addToBasket}
					onClick={onAddToBasket}
				>
					Add to basket
				</Button>
			</div>

			<div className={styles.infoBottom}>
				<div className={styles.details}>
					<div className={styles.detailItem}>
						<Typography tag='p' size='m' weight='regular' className={styles.detailLabel}>
							Availability
						</Typography>
						<Typography tag='p' size='m' weight='regular' className={styles.detailValue}>
							{availability}
						</Typography>
					</div>
					<div className={styles.detailItem}>
						<Typography tag='p' size='m' weight='regular' className={styles.detailLabel}>
							Shipment
						</Typography>
						<Typography tag='p' size='m' weight='regular' className={styles.detailValue}>
							{shipment}
						</Typography>
					</div>
					<div className={styles.detailItem}>
						<Typography tag='p' size='m' weight='regular' className={styles.detailLabel}>
							Delivery
						</Typography>
						<Typography tag='p' size='m' weight='regular' className={styles.detailValue}>
							{delivery}
						</Typography>
					</div>
					{warranty && (
						<div className={styles.detailItem}>
							<Typography tag='p' size='m' weight='regular' className={styles.detailLabel}>
								Warranty
							</Typography>
							<Typography tag='p' size='m' weight='regular' className={styles.detailValue}>
								{warranty}
							</Typography>
						</div>
					)}
				</div>

				{(deliveryMethods.length > 0 || deliveryNote) && (
					<div className={styles.deliveryMethods}>
						{deliveryMethods.length > 0 && (
							<>
								<Typography tag='p' size='m' weight='regular' className={styles.deliveryMethodsTitle}>
									Available delivery methods
								</Typography>
								<div className={styles.deliveryMethodsList}>
									{deliveryMethods.map((method, index) => (
										<button
											key={index}
											type='button'
											className={clsx(
												styles.deliveryMethod,
												activeDeliveryMethod === method && styles.active
											)}
											onClick={() => onDeliveryMethodClick?.(method)}
										>
											{method}
										</button>
									))}
								</div>
							</>
						)}

						{deliveryNote && (
							<Typography tag='p' size='m' weight='regular' className={styles.deliveryNote}>
								{deliveryNote}
							</Typography>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductInfo

