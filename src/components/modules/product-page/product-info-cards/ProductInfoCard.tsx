'use client'

import { FC } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import Link from 'next/link'

import styles from './ProductInfoCard.module.scss'

export interface MaterialColor {
	color: string
	name?: string
}

interface ProductInfoCardProps {
	title: string
	content?: string | number
	materials?: MaterialColor[]
	viewAllLink?: string
	onViewAllClick?: () => void
	className?: string
}

const ProductInfoCard: FC<ProductInfoCardProps> = ({
	title,
	content,
	materials = [],
	viewAllLink,
	onViewAllClick,
	className
}) => {
	return (
		<div className={clsx(styles.card, className)}>
			<Typography tag='p' size='s' weight='regular' className={styles.title}>
				{title}
			</Typography>

			{content !== undefined && (
				<Typography tag='p' size='l' weight='semi-bold' className={styles.content}>
					{typeof content === 'number' ? content.toString() : content}
				</Typography>
			)}

			{materials.length > 0 && (
				<div className={styles.materials}>
					<div className={styles.materialsList}>
						{materials.map((material, index) => (
							<div
								key={index}
								className={styles.materialCircle}
								style={{ backgroundColor: material.color }}
								title={material.name}
							/>
						))}
					</div>
					{(viewAllLink || onViewAllClick) && (
						viewAllLink ? (
							<Link href={viewAllLink} className={styles.viewAllLink}>
								<Typography tag='p' size='s' weight='regular'>
									View all
								</Typography>
							</Link>
						) : (
							<button
								className={styles.viewAllLink}
								onClick={onViewAllClick}
								type='button'
							>
								<Typography tag='p' size='s' weight='regular'>
									View all
								</Typography>
							</button>
						)
					)}
				</div>
			)}

			{content === undefined && materials.length === 0 && viewAllLink && (
				<Link href={viewAllLink} className={styles.viewAllLink}>
					<Typography tag='p' size='s' weight='regular'>
						View all
					</Typography>
				</Link>
			)}
		</div>
	)
}

export default ProductInfoCard
