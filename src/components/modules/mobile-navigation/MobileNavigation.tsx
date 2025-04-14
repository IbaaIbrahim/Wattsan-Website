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
			<Link
				href={PAGES.catalog}
				className={styles.button}
			>
				<Image
					className={styles.icon}
					src={menuIcon}
					alt=''
				/>
				Catalog
			</Link>
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
			<Link
				href={PAGES.account}
				className={styles.button}
			>
				<Image
					className={styles.icon}
					src={accountIcon}
					alt=''
				/>
				Account
			</Link>
		</nav>
	)
}

export default MobileNavigation
