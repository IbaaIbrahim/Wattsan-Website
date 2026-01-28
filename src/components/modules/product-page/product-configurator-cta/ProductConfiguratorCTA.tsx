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
	description = 'Check out our configurator to make the perfect machine for your production.',
	buttonText = 'Configurator',
	onConfiguratorClick,
	className
}) => {
	return (
		<div className={clsx(styles.cta, className)}>
			<Typography tag='h2' size='l' weight='semi-bold' className={styles.title}>
				{title}
			</Typography>
			<Typography tag='p' size='m' weight='regular' className={styles.description}>
				{description}
			</Typography>
			<Button
				view='bordered'
				size='l'
				onClick={onConfiguratorClick}
				className={styles.button}
				leftAddon={
					<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M2 2L10 6L18 2L18 10L10 14L2 10L2 2Z'
							stroke='currentColor'
							strokeWidth='1.5'
							fill='none'
						/>
						<path
							d='M2 2L10 6L10 14'
							stroke='currentColor'
							strokeWidth='1.5'
							fill='none'
						/>
						<path
							d='M18 2L10 6L10 14'
							stroke='currentColor'
							strokeWidth='1.5'
							fill='none'
						/>
						<path
							d='M2 10L10 14L18 10'
							stroke='currentColor'
							strokeWidth='1.5'
							fill='none'
						/>
					</svg>
				}
			>
				{buttonText}
			</Button>
		</div>
	)
}

export default ProductConfiguratorCTA
