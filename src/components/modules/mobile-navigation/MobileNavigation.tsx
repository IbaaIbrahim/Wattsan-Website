'use client'

import accountIcon from '@public/img/icons/account.svg'
import basketIcon from '@public/img/icons/basket.svg'
import comparisonIcon from '@public/img/icons/comparison.svg'
import favoritesIcon from '@public/img/icons/favorites.svg'
import menuIcon from '@public/img/icons/menu.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import { PAGES } from '../../../config/pages.url.config'

import { uiStore } from '@store/uiStore'
import styles from './MobileNavigation.module.scss'

const MobileNavigation: FC<{}> = () => {
	const pathname = usePathname()

	if (
		pathname === '/configurator' ||
		pathname.includes('accessories') ||
		pathname.includes('summary')
	)
		return null

	return (
		<nav className={styles.wrapper}>
			<button
				className={styles.button}
				onClick={() => uiStore.set.isCatalogSidebarOpen(true)}
			>
				<Image
					className={styles.icon}
					src={menuIcon}
					alt=''
				/>
				Catalog
			</button>
			{/*<Link*/}
			{/*	href={PAGES.comparison}*/}
			{/*	className={styles.button}*/}
			{/*>*/}
			{/*	<Image*/}
			{/*		className={styles.icon}*/}
			{/*		src={comparisonIcon}*/}
			{/*		alt=''*/}
			{/*	/>*/}
			{/*	Comparison*/}
			{/*</Link>*/}
			{/*<Link*/}
			{/*	href={PAGES.favorites}*/}
			{/*	className={styles.button}*/}
			{/*>*/}
			{/*	<Image*/}
			{/*		className={styles.icon}*/}
			{/*		src={favoritesIcon}*/}
			{/*		alt=''*/}
			{/*	/>*/}
			{/*	Favorites*/}
			{/*</Link>*/}
			<Link
				href={PAGES.basket}
				className={styles.button}
			>
				<Image
					className={styles.icon}
					src={basketIcon}
					alt=''
				/>
				Basket
			</Link>
			<button
				className={styles.button}
				onClick={() => uiStore.set.isMenuSidebarOpen(true)}
			>
				<Image
					className={styles.icon}
					src={accountIcon}
					alt=''
				/>
				Account
			</button>
		</nav>
	)
}

export default MobileNavigation
