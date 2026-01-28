'use client'

import { FC, useState } from 'react'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './ProductSpecifications.module.scss'

export interface SpecificationItem {
	label: string
	value: string | number
	unit?: string
}

export interface SpecificationCategory {
	id: string
	label: string
	items: SpecificationItem[]
}

interface ProductSpecificationsProps {
	categories: SpecificationCategory[]
	className?: string
}

const ProductSpecifications: FC<ProductSpecificationsProps> = ({
	categories,
	className
}) => {
	const [activeTabId, setActiveTabId] = useState(categories[0]?.id)

	const activeCategory = categories.find(c => c.id === activeTabId) || categories[0]

	return (
		<div className={clsx(styles.container, className)}>
			<Typography tag='h2' size='xxl' weight='bold' className={styles.sectionTitle}>
				<span className={styles.redText}>Tech</span> specs
			</Typography>

			<div className={styles.contentWrapper}>
				<div className={styles.tabs}>
					{categories.map((category) => (
						<button
							key={category.id}
							className={clsx(styles.tab, activeTabId === category.id && styles.activeTab)}
							onClick={() => setActiveTabId(category.id)}
						>
							<Typography tag='span' size='s' weight='semi-bold'>
								{category.label}
							</Typography>
						</button>
					))}
				</div>

				<div className={styles.specsCard}>
					<div className={styles.specificationsList}>
						{activeCategory?.items.map((item, index) => (
							<div key={index} className={styles.specItem}>
								<Typography tag='span' size='m' weight='regular' className={styles.specLabel}>
									{item.label}
								</Typography>
								<div className={styles.specDots} />
								<Typography tag='span' size='m' weight='bold' className={styles.specValue}>
									{item.value}
									{item.unit && <span className={styles.specUnit}> {item.unit}</span>}
								</Typography>
							</div>
						))}
					</div>
					<div className={styles.specsVisual}>
						{/* Placeholder for technical drawing or visualization */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductSpecifications
