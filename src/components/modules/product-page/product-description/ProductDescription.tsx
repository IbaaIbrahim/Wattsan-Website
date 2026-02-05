'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './ProductDescription.module.scss'

import { ProductFeature } from '@my-types/product'

interface ProductDescriptionProps {
	title: ReactNode
	image: string
	features: ProductFeature[]
	className?: string
}

const ProductDescription: FC<ProductDescriptionProps> = ({
	title,
	image,
	features,
	className
}) => {
	return (
		<div className={clsx(styles.container, className)}>
			<Typography tag='h2' size='xxl' weight='bold' className={styles.sectionTitle}>
				{title}
			</Typography>

			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={image}
						alt="Machine overview"
						width={600}
						height={600}
						className={styles.image}
					/>
				</div>

				<div className={styles.features}>
					{features.map((feature, index) => (
						<div key={index} className={styles.featureItem}>
							<div className={styles.featureTitle}>
								<Typography tag='h4' size='m' weight='bold'>
									{feature.title}
								</Typography>
							</div>
							<Typography tag='p' size='s' weight='regular' className={styles.featureDescription}>
								{feature.description}
							</Typography>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProductDescription
