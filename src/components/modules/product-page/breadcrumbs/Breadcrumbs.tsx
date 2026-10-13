'use client'

import { Typography } from '@components/ui/typography/Typography'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Breadcrumbs.module.scss'

export interface BreadcrumbItem {
	label: string
	href?: string
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[]
	className?: string
	isFavorite?: boolean
	onFavoriteClick?: () => void
	onCompareClick?: () => void
	showActions?: boolean
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
	items,
	className,
	isFavorite = false,
	onFavoriteClick,
	onCompareClick,
	showActions = true
}) => {
	return (
		<div className={clsx(styles.breadcrumbsBar, className)}>
			<div className={styles.inner}>
				<nav className={styles.breadcrumbs}>
					{items.map((item, index) => {
						const isLast = index === items.length - 1
						return (
							<span key={index} className={styles.item}>
								{item.href && !isLast ? (
									<Link href={item.href} className={clsx(styles.link, styles.inactive)}>
										<Typography tag='p' size='s' weight='semi-bold'>
											{item.label}
										</Typography>
									</Link>
								) : (
									<span className={clsx(!isLast ? styles.inactive : styles.active)}>
										<Typography tag='p' size='s' weight='semi-bold'>
											{item.label}
										</Typography>
									</span>
								)}
								{!isLast && (
									<span className={styles.separator}>
										<Typography tag='p' size='s' weight='semi-bold'>
											—
										</Typography>
									</span>
								)}
							</span>
						)
					})}
				</nav>

				{showActions && (
					<div className={styles.actions}>
						<button
							type='button'
							className={styles.actionBtn}
							onClick={onCompareClick}
							aria-label='Compare product'
							title='Compare'
						>
							<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M9 5.01857C5.60771 5.47932 3 8.39592 3 11.9163C3 15.4368 5.60771 18.3534 9 18.8141M9 5.01857C9.32828 4.97398 9.66151 4.95099 10 4.95099C10.9794 4.95099 11.9117 5.15165 12.7576 5.51387M9 5.01857C9.32828 4.99628 9.66151 4.99628 10 5.01857M9 18.8141C9.32828 18.8587 9.66151 18.8817 10 18.8817C10.9032 18.8817 11.7662 18.7107 12.5582 18.3995M9 18.8141C9.32828 18.8364 9.66151 18.8364 10 18.8141M15 5.05226C18.2392 5.6502 20.7259 8.48105 20.7259 11.9163C20.7259 15.3517 18.2392 18.1825 15 18.7804M15 5.05226C14.6114 4.98047 14.2108 4.94308 13.8016 4.94308C13.4465 4.94308 13.0978 4.97125 12.7576 5.02546M15 5.05226C14.2349 5.19363 13.4814 5.34961 12.7576 5.51387M15 18.7804C14.5908 18.856 14.1687 18.8955 13.7375 18.8955C13.3347 18.8955 12.9399 18.861 12.5582 18.7948M15 18.7804C14.1706 18.6272 13.3508 18.5029 12.5582 18.3995M12.7576 5.51387C15.2498 6.58111 17 9.04681 17 11.9163C17 14.8442 15.178 17.3484 12.5582 18.3995'
									stroke='black'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
						<button
							type='button'
							className={styles.actionBtn}
							onClick={onFavoriteClick}
							aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
							title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
						>
							<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M5.625 3.375C5.625 2.75368 6.12868 2.25 6.75 2.25H17.25C17.8713 2.25 18.375 2.75368 18.375 3.375V21L12 16.3636L5.625 21V3.375Z'
									fill={isFavorite ? '#E63C32' : 'none'}
									stroke={isFavorite ? '#E63C32' : 'black'}
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Breadcrumbs

