'use client'

import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import { formatMediaUrl } from '@/utils/helpers'

import styles from './ProductDescription.module.scss'

import { ProductFeature } from '@my-types/product'

interface ProductDescriptionProps {
	title: ReactNode
	subtitle?: ReactNode
	image?: string
	features?: ProductFeature[]
	className?: string
}

const renderTitle = (titleNode: ReactNode) => {
	if (typeof titleNode !== 'string') return titleNode
	if (titleNode.includes('<span')) {
		return <span dangerouslySetInnerHTML={{ __html: titleNode }} />
	}
	const match = titleNode.match(/^(the power)(.*)$/i)
	if (match) {
		return (
			<>
				<span className={styles.redHighlight}>{match[1]}</span>
				{match[2]}
			</>
		)
	}
	return titleNode
}

const ProductDescription: FC<ProductDescriptionProps> = ({
	title,
	subtitle,
	image,
	features = [],
	className
}) => {
	const imageSrc = formatMediaUrl(image)

	return (
		<div className={clsx(styles.container, className)}>
			<div className={styles.content}>
				{imageSrc ? (
					<div className={styles.imageWrapper}>
						<Image
							src={imageSrc}
							alt="Machine overview"
							width={650}
							height={650}
							priority
							className={styles.image}
						/>
					</div>
				) : (
					<div className={styles.imageWrapper} />
				)}

				<div className={styles.rightColumn}>
					<div className={styles.header}>
						{subtitle && (
							<Typography tag='span' size='s' weight='bold' className={styles.subtitle}>
								{subtitle}
							</Typography>
						)}
						<Typography tag='h2' size='xxl' weight='bold' className={styles.sectionTitle}>
							{renderTitle(title)}
						</Typography>
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
		</div>
	)
}

export default ProductDescription
