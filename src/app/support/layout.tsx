'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import styles from './layout.module.scss'

export default function Layout({ children }: { children: ReactNode }) {
	const pathname = usePathname()

	return (
		<div className={styles.layout}>
			<header className={styles.header}>
				<div className={styles.title}>Support</div>
				<div className={styles.tabs}>
					<Link
						className={clsx(
							styles.link,
							pathname === '/support' && styles.linkActive
						)}
						href='/support'
					>
						About
					</Link>
					<Link
						className={clsx(
							styles.link,
							pathname === '/support/training' && styles.linkActive
						)}
						href='/support/training'
					>
						Training, drivers, and files
					</Link>
					<Link
						className={clsx(
							styles.link,
							pathname === '/support/faq' && styles.linkActive
						)}
						href='/support/faq'
					>
						FAQ
					</Link>
				</div>
			</header>
			{children}
		</div>
	)
}
