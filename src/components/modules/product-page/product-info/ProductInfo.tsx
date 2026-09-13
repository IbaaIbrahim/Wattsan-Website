'use client'

import { FC } from 'react'
import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import Image from 'next/image'
import clsx from 'clsx'
import favoritesIcon from '@public/img/icons/favorites.svg'

import styles from './ProductInfo.module.scss'

interface ProductInfoProps {
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
	deliveryMethods = [],
	activeDeliveryMethod,
	deliveryNote,
	isFavorite = false,
	onToggleFavorite,
	onAddToBasket,
	onViewSpecifications,
	onDeliveryMethodClick,
	className
}) => {
	return (
		<div className={clsx(styles.productInfo, className)}>
			<Typography tag='h1' size='xl' weight='semi-bold' className={styles.title}>
				{title}
			</Typography>

			<div className={styles.ratings}>
				<div className={styles.rating}>
					<span className={styles.ratingValue}>{rating}</span>
					<div className={styles.stars}>
						{[...Array(5)].map((_, i) => (
							<svg
								key={i}
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill={i < Math.floor(rating) ? '#FFD700' : '#E0E0E0'}
							>
								<path d='M8 0L10.163 5.528L16 6.112L12 10.056L12.944 16L8 13.056L3.056 16L4 10.056L0 6.112L5.837 5.528L8 0Z' />
							</svg>
						))}
					</div>
				</div>
				<Typography tag='p' size='s' weight='regular' className={styles.reviews}>
					{reviewCount} reviews
				</Typography>
				<Typography tag='p' size='s' weight='regular' className={styles.questions}>
					{questionCount} questions
				</Typography>
			</div>

			{onViewSpecifications && (
				<button className={styles.specificationsLink} onClick={onViewSpecifications}>
					<Typography tag='p' size='s' weight='regular'>
						View all specifications
					</Typography>
				</button>
			)}

			<div className={styles.pricing}>
				<div className={styles.priceRow}>
					<Typography tag='p' size='xl' weight='semi-bold' className={styles.currentPrice}>
						{currentPrice}
					</Typography>
					{discountPercent && (
						<div className={styles.discountBadge}>
							<Typography tag='p' size='s' weight='semi-bold'>
								{discountPercent}
							</Typography>
						</div>
					)}
				</div>
				{originalPrice && originalPrice !== currentPrice && (
					<Typography tag='p' size='m' weight='regular' className={styles.originalPrice}>
						{originalPrice}
					</Typography>
				)}
				{discount && (
					<Typography tag='p' size='m' weight='regular' className={styles.discount}>
						{discount}
					</Typography>
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
				{onToggleFavorite && (
					<button
						className={styles.favoriteButton}
						onClick={onToggleFavorite}
						type='button'
						title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
						aria-label='Toggle favorite'
					>
						<Image
							src={favoritesIcon}
							alt=''
							className={isFavorite ? styles.activeFavoriteIcon : styles.favoriteIcon}
						/>
					</button>
				)}
			</div>

			<div className={styles.details}>
				<div className={styles.detailItem}>
					<Typography tag='p' size='s' weight='regular' className={styles.detailLabel}>
						Availability:
					</Typography>
					<Typography tag='p' size='s' weight='semi-bold'>
						{availability}
					</Typography>
				</div>
				<div className={styles.detailItem}>
					<Typography tag='p' size='s' weight='regular' className={styles.detailLabel}>
						Shipment:
					</Typography>
					<Typography tag='p' size='s' weight='semi-bold'>
						{shipment}
					</Typography>
				</div>
				<div className={styles.detailItem}>
					<Typography tag='p' size='s' weight='regular' className={styles.detailLabel}>
						Delivery:
					</Typography>
					<Typography tag='p' size='s' weight='semi-bold'>
						{delivery}
					</Typography>
				</div>
			</div>

			{deliveryMethods.length > 0 && (
				<div className={styles.deliveryMethods}>
					<Typography tag='p' size='s' weight='regular' className={styles.deliveryMethodsTitle}>
						Available delivery methods:
					</Typography>
					<div className={styles.deliveryMethodsList}>
						{deliveryMethods.map((method, index) => (
							<button
								key={index}
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
				</div>
			)}

			{deliveryNote && (
				<div className={styles.deliveryNote}>
					<Typography tag='p' size='s' weight='regular'>
						{deliveryNote}
					</Typography>
				</div>
			)}
		</div>
	)
}

export default ProductInfo
