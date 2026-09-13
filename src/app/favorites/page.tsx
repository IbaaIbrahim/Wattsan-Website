'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BlankContent from '@components/modules/common/blank-content/BlankContent'
import FavoriteItem from '@components/modules/favorites/favorite-item/FavoriteItem'
import Tags from '@components/ui/tags/Tags'
import emptyFavoritesImage from '@public/img/favorites/empty-favorites.svg'
import { useFavoritesStore, TFavoriteItem } from '@store/favoritesStore'
import { authStore } from '@store/auth'
import { modalsStore } from '@store/modals'
import { MODALS } from '@components/ui/modal/Modal'
import { createBasket } from '@store/basket/actions'
import { formatProductModelName, getAllProducts, getClientConfigurations, getSellableCharacteristics } from '@api/product'

interface ICustomWindow extends Window {
	dataLayer: any[]
}

declare let window: ICustomWindow

import styles from './page.module.scss'

const DEFAULT_POPULAR: TFavoriteItem[] = [
	{
		id: 'pop-1',
		referenceId: 1,
		itemtype: 2,
		name: 'Wattsan 0404 Mini',
		categoryName: 'Mini Series',
		price: '$3,250',
		image: '/img/grid-machines/M3.png',
		available: true
	},
	{
		id: 'pop-2',
		referenceId: 2,
		itemtype: 2,
		name: 'Wattsan 0609 Mini',
		categoryName: 'Mini Series',
		price: '$4,100',
		image: '/img/grid-machines/M3.png',
		available: true
	},
	{
		id: 'pop-3',
		referenceId: 3,
		itemtype: 2,
		name: 'Wattsan 1313 A1',
		categoryName: 'A1 Series',
		price: '$6,500',
		image: '/img/grid-machines/M3.png',
		available: true
	},
	{
		id: 'pop-4',
		referenceId: 4,
		itemtype: 2,
		name: 'Wattsan 1325 M1',
		categoryName: 'M1 Series',
		price: '$9,200',
		image: '/img/grid-machines/M3.png',
		available: true
	}
]

export default function FavoritesPage() {
	const router = useRouter()
	const authorized = authStore.use.authorized()
	const favorites = useFavoritesStore(state => state.items)
	const toggleFavorite = useFavoritesStore(state => state.toggleFavorite)
	const removeFavorite = useFavoritesStore(state => state.removeFavorite)
	const fetchFavorites = useFavoritesStore(state => state.fetchFavorites)

	const [selectedTag, setSelectedTag] = useState<string>('all')
	const [popularItems, setPopularItems] = useState<TFavoriteItem[]>(DEFAULT_POPULAR)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
		if (authorized) {
			fetchFavorites()
		}
		const fetchPopular = async () => {
			try {
				const [clientConfigs, prods, sellableChars] = await Promise.all([
					getClientConfigurations(),
					getAllProducts(),
					getSellableCharacteristics()
				])

				const popularList: TFavoriteItem[] = []

				// 1. Client Configurations (Type 1)
				if (clientConfigs && clientConfigs.length > 0) {
					const configItems = clientConfigs.map((c: any) => {
						const seriesName = c.series?.name || c.configurationName?.trim() || 'Configurator'
						const modelName = c.modelName ? `${c.modelName}` : ''
						const title = `${seriesName} ${modelName}`.trim()
						const imgUrl = c.fileManger?.url || c.fileManger?.thumbnail || '/img/grid-machines/M3.png'
						const priceVal = c.price && Number(c.price) > 0 ? c.price : 5000

						return {
							id: `pop-conf-${c.id}`,
							referenceId: Number(c.id),
							itemtype: 1 as const,
							available: true,
							image: imgUrl,
							categoryName: c.series?.name ? `${c.series.name} Series` : 'Configurator Build',
							name: title || 'Custom Configuration',
							price: `$${Number(priceVal).toLocaleString()}`
						}
					})
					popularList.push(...configItems)
				}

				// 2. Catalog Products (Type 2)
				if (prods && prods.length > 0) {
					const prodItems = prods
						.filter((p: any) => p.isActive !== false)
						.map((p: any) => {
							const priceVal = p.price && Number(p.price) > 0 ? p.price : (p.orderPrice || 5000)
							const imgUrl = p.attachments?.[0]?.fileManager?.url || '/img/grid-machines/M3.png'
							return {
								id: `pop-prod-${p.id}`,
								referenceId: Number(p.id),
								itemtype: 2 as const,
								available: p.isActive !== false,
								image: imgUrl,
								categoryName: p.series?.name || 'CNC Routers',
								name: p.name || 'Wattsan Equipment',
								price: `$${Number(priceVal).toLocaleString()}`
							}
						})
					popularList.push(...prodItems)
				}

				// 3. Sellable Characteristics (Type 3)
				if (sellableChars && sellableChars.length > 0) {
					const charItems = sellableChars
						.filter((c: any) => c.isActive !== false)
						.map((c: any) => {
							const charPrice = (c.price && Number(c.price) > 0) ? Number(c.price) : 2000
							const imgUrl = c.fileManager?.url || '/img/catalog/cnc-routes.png'
							return {
								id: `pop-char-${c.id}`,
								referenceId: Number(c.id),
								itemtype: 3 as const,
								available: c.isActive !== false,
								image: imgUrl,
								categoryName: 'Accessories for CNC Router Machines',
								name: c.name ? `${c.name} ${c.unit || ''}`.trim() : 'Accessory',
								price: `$${Number(charPrice).toLocaleString()}`,
								unit: c.unit
							}
						})
					popularList.push(...charItems)
				}

				if (popularList.length > 0) {
					setPopularItems(popularList)
				}
			} catch (e) {
				console.error('Failed to load popular items for favorites empty state', e)
			}
		}
		fetchPopular()
	}, [])

	// Extract unique categories for filter tabs
	const categoryTags = useMemo(() => {
		const baseCategories = [
			'Laser machines',
			'CNC Routers',
			'Laser markers',
			'Metal Cutters',
			'Laser welding',
			'Laser cleaning',
			'Laser pipe cutting',
			'Hydraulic press brakes',
			'Accessories'
		]

		const presentCategories = new Set<string>()
		favorites.forEach(item => {
			if (item.categoryName) {
				presentCategories.add(item.categoryName)
			}
		})

		const combined = Array.from(
			new Set([...Array.from(presentCategories), ...baseCategories])
		)

		return [
			{ id: 'all', content: 'All' },
			...combined.map((cat, index) => ({
				id: `cat-${index}-${cat}`,
				content: cat
			}))
		]
	}, [favorites])

	// Filter items by category
	const filteredFavorites = useMemo(() => {
		if (selectedTag === 'all') return favorites

		const activeTagObj = categoryTags.find(t => t.id === selectedTag)
		if (!activeTagObj) return favorites

		const targetCatName = activeTagObj.content as string
		return favorites.filter(item => {
			if (!item.categoryName) return false
			return (
				item.categoryName.toLowerCase().includes(targetCatName.toLowerCase()) ||
				targetCatName.toLowerCase().includes(item.categoryName.toLowerCase())
			)
		})
	}, [favorites, selectedTag, categoryTags])

	const handleLogin = (nextAction: () => void) => () => {
		modalsStore.set.open(MODALS.login, {
			initialScreen: 'LOGIN',
			closeOnEscape: false,
			onComplete: nextAction,
			onError: () => {}
		})
	}

	const addItemToBasket = async (item: TFavoriteItem) => {
		const rawPrice = typeof item.price === 'string'
			? parseFloat(item.price.replace(/[^\d.]/g, ''))
			: item.price

		await createBasket({
			referenceId: item.referenceId,
			itemtype: item.itemtype || 2,
			quantity: 1,
			itemData: {
				title: item.name,
				categoryName: item.categoryName || 'Equipment',
				price: isNaN(rawPrice) ? 1000 : rawPrice,
				image: item.image || '/img/catalog/cnc-routes.png'
			}
		})
	}

	const handleAddToBasket = (item: TFavoriteItem) => {
		if (authorized) {
			addItemToBasket(item)
		} else {
			modalsStore.set.open(MODALS.infoModal, {
				title: 'To add the product to your basket, you need to Log in or Sign up',
				accentButton: {
					text: 'Log in or Sign up',
					onClick: handleLogin(() => addItemToBasket(item))
				},
				secondaryButton: {
					text: 'Cancel',
					onClick: () => modalsStore.set.close()
				}
			})
		}
	}

	// Filter popular items to exclude those already in the user's favorites
	const availablePopularItems = useMemo(() => {
		return popularItems.filter(popItem => {
			const popRefId = Number(popItem.referenceId)
			const popItemtype = (popItem.itemtype || 2) as 1 | 2 | 3
			return !favorites.some(fav => {
				const favRefId = Number(fav.referenceId)
				const favItemtype = (fav.itemtype || 2) as 1 | 2 | 3
				return favRefId === popRefId && favItemtype === popItemtype
			})
		})
	}, [popularItems, favorites])

	// Avoid hydration mismatch by waiting for mount
	if (!isMounted) {
		return (
			<main className={styles.page}>
				<div className={styles.titleWrapper}>
					<h1 className={styles.title}>Favorites</h1>
				</div>
			</main>
		)
	}

	return (
		<main className={styles.page}>
			<div className={styles.titleWrapper}>
				<h1 className={styles.title}>Favorites</h1>
				{favorites.length > 0 && (
					<div className={styles.counterBadge}>
						<span>{favorites.length}</span>
					</div>
				)}
			</div>

			{favorites.length === 0 ? (
				<div className={styles.emptyContainer}>
					<BlankContent
						image={emptyFavoritesImage}
						title={
							<>
								Favorites list is empty <br /> at the moment
							</>
						}
						description={
							<>
								Visit the Home page and explore our catalog to <br /> select
								items and add them to your favorites.
							</>
						}
						action='Go to the Home page'
						onClick={() => router.push('/')}
					/>
				</div>
			) : (
				<>
					<div className={styles.tagsWrapper}>
						<Tags
							size='l'
							selected={[selectedTag]}
							items={categoryTags}
							onClick={id => setSelectedTag(id)}
						/>
					</div>
					<div className={styles.content}>
						{filteredFavorites.map(item => (
							<FavoriteItem
								key={`${item.itemtype}-${item.referenceId}-${item.id}`}
								item={item}
								onToggleFavorites={toggleFavorite}
								onAddToBasket={handleAddToBasket}
							/>
						))}
					</div>
				</>
			)}

			{availablePopularItems.length > 0 && (
				<div className={styles.popular}>
					<h2 className={styles.popularTitle}>Popular items</h2>
					<div className={styles.content}>
						{availablePopularItems.map(item => (
							<FavoriteItem
								key={`pop-${item.itemtype}-${item.referenceId}-${item.id}`}
								item={item}
								onToggleFavorites={toggleFavorite}
								onAddToBasket={handleAddToBasket}
							/>
						))}
					</div>
				</div>
			)}
		</main>
	)
}
