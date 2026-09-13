'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import basket from '@public/img/icons/basket.svg'
import comparison from '@public/img/icons/comparison.svg'
import favorites from '@public/img/icons/favorites.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useFavoritesStore } from '@store/favoritesStore'
import { useComparisonStore } from '@store/comparisonStore'
import { basketStore } from '@store/basket'
import { authStore } from '@store/auth'

import { PAGES } from '../../../../config/pages.url.config'

import styles from './Navigation.module.scss'
import CanCall from '@components/modules/auth/can-call'

const Navigation = () => {
	const { translations }: { translations: ILanguage } = useLang()
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

	return (
		<div className={styles.wrapper}>
			<Link
				href={PAGES.comparison}
				className={styles.link}
			>
				<div className={styles.iconWrapper}>
					<div className={styles.icon}>
						<Image
							src={comparison}
							alt=''
						/>
					</div>
					{comparisonCount > 0 && (
						<span className={styles.badge}>{comparisonCount}</span>
					)}
				</div>
				<div className={styles.text}>
					{(translations?.header?.navigation as any)?.comparison || 'Comparison'}
				</div>
			</Link>
			<Link
				href={PAGES.favorites}
				className={styles.link}
			>
				<div className={styles.iconWrapper}>
					<div className={styles.icon}>
						<Image
							src={favorites}
							alt=''
						/>
					</div>
					{favoritesCount > 0 && (
						<span className={styles.badge}>{favoritesCount}</span>
					)}
				</div>
				<div className={styles.text}>
					{translations.header.navigation.favorites}
				</div>
			</Link>
			<CanCall>
				<Link
					href={PAGES.basket}
					className={styles.link}
				>
					<div className={styles.iconWrapper}>
						<div className={styles.icon}>
							<Image
								src={basket}
								alt=''
							/>
						</div>
						{basketCount > 0 && (
							<span className={styles.badge}>{basketCount}</span>
						)}
					</div>
					<div className={styles.text}>
						{translations.header.navigation.basket}
					</div>
				</Link>
			</CanCall>
		</div>
	)
}

export default Navigation
