'use client'

import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import styles from './Plate.module.scss'

type TProps = {
	hover?: boolean
	title: ReactNode
	subtitle?: ReactNode
	children?: ReactNode
	rightAddon?: ReactNode
	onClick?: () => void
}

const Plate: FC<TProps> = ({
	title,
	hover = true,
	subtitle = null,
	rightAddon = null,
	onClick,
	children
}) => {
	return (
		<div
			className={clsx(styles.plate, hover && styles.withHover)}
			onClick={onClick}
		>
			<div>
				<div className={clsx(styles.title, subtitle === null && styles.margin)}>
					{title}
				</div>
				{subtitle && <div className={styles.subtitle}>{subtitle}</div>}
				{children}
			</div>
			{rightAddon && rightAddon}
		</div>
	)
}

export default Plate
