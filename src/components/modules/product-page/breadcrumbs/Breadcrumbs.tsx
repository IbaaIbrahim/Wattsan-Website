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
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className }) => {
	return (
		<nav className={clsx(styles.breadcrumbs, className)}>
			{items.map((item, index) => (
				<span key={index} className={styles.item}>
					{item.href && index < items.length - 1 ? (
						<Link href={item.href} className={styles.link}>
							<Typography tag='p' size='s' weight='regular'>
								{item.label}
							</Typography>
						</Link>
					) : (
						<Typography tag='p' size='s' weight='regular'>
							{item.label}
						</Typography>
					)}
					{index < items.length - 1 && (
						<span className={styles.separator}>
							<Typography tag='p' size='s' weight='regular'>
								-
							</Typography>
						</span>
					)}
				</span>
			))}
		</nav>
	)
}

export default Breadcrumbs
