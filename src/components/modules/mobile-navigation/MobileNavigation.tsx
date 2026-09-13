'use client'

import { useEffect, useState, FC } from 'react'
import accountIcon from '@public/img/icons/account.svg'
import basketIcon from '@public/img/icons/basket.svg'
import comparisonIcon from '@public/img/icons/comparison.svg'
import favoritesIcon from '@public/img/icons/favorites.svg'
import menuIcon from '@public/img/icons/menu.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFavoritesStore } from '@store/favoritesStore'
import { useComparisonStore } from '@store/comparisonStore'
import { basketStore } from '@store/basket'
import { authStore } from '@store/auth'

import { PAGES } from '../../../config/pages.url.config'

import { uiStore } from '@store/uiStore'
import styles from './MobileNavigation.module.scss'

const MobileNavigation: FC<{}> = () => {
	const pathname = usePathname()
	const favoriteItems = useFavoritesStore(state => state.items)
	const fetchFavorites = useFavoritesStore(state => state.fetchFavorites)
	const totalComparisonCount = useComparisonStore(state => state.getTotalCount())
	const basketPositions = basketStore.use.positions()
	const authorized = authStore.use.authorized()
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
		if (authorized) {
			fetchFavorites()
		}
	}, [authorized])

	const favoritesCount = isMounted ? favoriteItems.length : 0
	const comparisonCount = isMounted ? totalComparisonCount : 0
	const basketCount = isMounted ? basketPositions.length : 0

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
				type='button'
			>
				<Image
					className={styles.icon}
					src={menuIcon}
					alt=''
				/>
				Catalog
			</button>
			<Link
				href={PAGES.comparison}
				className={styles.button}
			>
				<div className={styles.iconWrapper}>
					<Image
						className={styles.icon}
						src={comparisonIcon}
						alt=''
					/>
					{comparisonCount > 0 && (
						<span className={styles.badge}>{comparisonCount}</span>
					)}
				</div>
				Comparison
			</Link>
			<Link
				href={PAGES.favorites}
				className={styles.button}
			>
				<div className={styles.iconWrapper}>
					<Image
						className={styles.icon}
						src={favoritesIcon}
						alt=''
					/>
					{favoritesCount > 0 && (
						<span className={styles.badge}>{favoritesCount}</span>
					)}
				</div>
				Favorites
			</Link>
			<Link
				href={PAGES.basket}
				className={styles.button}
			>
				<div className={styles.iconWrapper}>
					<Image
						className={styles.icon}
						src={basketIcon}
						alt=''
					/>
					{basketCount > 0 && (
						<span className={styles.badge}>{basketCount}</span>
					)}
				</div>
				Basket
			</Link>
			<button
				className={styles.button}
				onClick={() => uiStore.set.isMenuSidebarOpen(true)}
				type='button'
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
