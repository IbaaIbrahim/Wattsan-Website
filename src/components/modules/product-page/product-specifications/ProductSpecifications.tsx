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
	const [activeTabId, setActiveTabId] = useState(categories?.[0]?.id)

	const activeCategory = categories?.find(c => c.id === activeTabId) || categories?.[0]
	const currentActiveId = activeCategory?.id

	return (
		<div className={clsx(styles.container, className)}>
			<Typography tag='h2' size='xxl' weight='bold' className={styles.sectionTitle}>
				<span className={styles.redHighlight}>Tech</span> specs
			</Typography>

			<div className={styles.contentWrapper}>
				<div className={styles.tabs} role='tablist'>
					{categories?.map((category) => (
						<button
							key={category.id}
							type='button'
							role='tab'
							aria-selected={currentActiveId === category.id}
							className={clsx(styles.tab, currentActiveId === category.id && styles.activeTab)}
							onClick={() => setActiveTabId(category.id)}
						>
							<span className={styles.tabText}>
								{category.label}
							</span>
						</button>
					))}
				</div>

				<div className={styles.specsCard}>
					<div className={styles.specificationsList}>
						{activeCategory?.items?.map((item, index) => (
							<div key={index} className={styles.specItem}>
								<span className={styles.specLabel}>
									{item.label}
								</span>
								<span className={styles.specValue}>
									{item.value}
									{item.unit && <span className={styles.specUnit}> {item.unit}</span>}
								</span>
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
