'use client'

import { FC } from 'react'
import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'

import styles from './ProductConfiguratorCTA.module.scss'

interface ProductConfiguratorCTAProps {
	title?: string
	description?: string
	buttonText?: string
	onConfiguratorClick?: () => void
	className?: string
}

const ProductConfiguratorCTA: FC<ProductConfiguratorCTAProps> = ({
	title = 'Need more customization?',
	description = 'Check out our configurator to make the perfect machine for your production',
	buttonText = 'Configurator',
	onConfiguratorClick,
	className
}) => {
	return (
		<div className={clsx(styles.cta, className)}>
			<div className={styles.textGroup}>
				<p className={styles.title}>
					{title}
				</p>
				<Typography tag='p' size='m' weight='regular' className={styles.description}>
					{description}
				</Typography>
			</div>
			<Button
				view='bordered'
				size='l'
				onClick={onConfiguratorClick}
				className={styles.button}
				leftAddon={
					<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path d='M3 6L12 2L21 6L12 10L3 6Z' fill='black' />
						<path d='M2 18V8L11 12V22L2 18Z' fill='black' />
						<path d='M22 8V18L13 22V12L22 8Z' fill='black' />
					</svg>
				}
			>
				{buttonText}
			</Button>
		</div>
	)
}

export default ProductConfiguratorCTA
