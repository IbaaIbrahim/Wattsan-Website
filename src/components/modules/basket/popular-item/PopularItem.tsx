'use client'

import Button from '@components/ui/button/Button'
import { TPopularItem } from '@my-types/basket'
import comparisonIcon from '@public/img/icons/comparison.svg'
import favoritesIcon from '@public/img/icons/favorites.svg'
import Image from 'next/image'
import { FC } from 'react'
import { useFavoritesStore } from '@store/favoritesStore'
import { useComparisonStore } from '@store/comparisonStore'
import { createBasket } from '@store/basket/actions'
import { authStore } from '@store/auth'
import { modalsStore } from '@store/modals'
import { MODALS } from '@components/ui/modal/Modal'
import clsx from 'clsx'

import styles from './PopularItem.module.scss'

const PopularItem: FC<{ item: TPopularItem }> = ({ item }) => {
	const refId = item.referenceId ? Number(item.referenceId) : parseInt(String(item.id).replace(/\D/g, ''), 10) || 1
	const itemtype = (item.itemtype as 1 | 2 | 3) || 2
	const authorized = authStore.use.authorized()

	const toggleFavorite = useFavoritesStore(state => state.toggleFavorite)
	const isFavorited = useFavoritesStore(state => state.isFavorite(refId, itemtype))

	const isCompared = useComparisonStore(state => state.isCompared(refId, itemtype))
	const toggleCompare = useComparisonStore(state => state.toggleCompare)

	const rawPrice = typeof item.price === 'string'
		? parseFloat(item.price.replace(/[^\d.]/g, ''))
		: item.price

	const handleAddToBasket = async () => {
		if (authorized) {
			await createBasket({
				referenceId: refId,
				itemtype,
				quantity: 1,
				itemData: {
					title: item.code || item.name,
					categoryName: item.name,
					price: isNaN(rawPrice) ? 1000 : rawPrice,
					image: item.image || '/img/catalog/cnc-routes.png'
				}
			})
		} else {
			modalsStore.set.open(MODALS.infoModal, {
				title: 'To add the product to your basket, you need to Log in or Sign up',
				accentButton: {
					text: 'Log in or Sign up',
					onClick: () => {
						modalsStore.set.open(MODALS.login, {
							initialScreen: 'LOGIN',
							closeOnEscape: false,
							onComplete: () => {
								createBasket({
									referenceId: refId,
									itemtype,
									quantity: 1,
									itemData: {
										title: item.code || item.name,
										categoryName: item.name,
										price: isNaN(rawPrice) ? 1000 : rawPrice,
										image: item.image || '/img/catalog/cnc-routes.png'
									}
								})
							},
							onError: () => {}
						})
					}
				},
				secondaryButton: {
					text: 'Cancel',
					onClick: () => modalsStore.set.close()
				}
			})
		}
	}

	const handleToggleFavorite = () => {
		toggleFavorite({
			id: `fav-${itemtype}-${refId}`,
			referenceId: refId,
			itemtype,
			name: item.code || item.name,
			categoryName: item.name,
			price: `$${isNaN(rawPrice) ? 1000 : rawPrice.toLocaleString()}`,
			image: item.image || '/img/catalog/cnc-routes.png',
			available: true
		})
	}

	const handleToggleCompare = () => {
		toggleCompare({
			id: `comp-${itemtype}-${refId}`,
			referenceId: refId,
			itemtype,
			name: item.code || item.name,
			categoryName: item.name,
			price: `$${isNaN(rawPrice) ? 1000 : rawPrice.toLocaleString()}`,
			image: item.image || '/img/catalog/cnc-routes.png',
			available: true
		})
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<Image
					src={item.image || '/img/catalog/cnc-routes.png'}
					fill={true}
					alt={item.name || ''}
				/>
				<div className={styles.actions}>
					<button
						className={clsx(styles.action, isCompared && styles.actionActive)}
						type='button'
						onClick={handleToggleCompare}
						aria-label={isCompared ? 'Remove from comparison' : 'Add to comparison'}
					>
						<Image
							src={comparisonIcon}
							alt=''
							style={{
								filter: isCompared
									? 'brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(5462%) hue-rotate(354deg) brightness(97%) contrast(116%)'
									: 'none'
							}}
						/>
					</button>
					<button
						className={clsx(styles.action, isFavorited && styles.actionActive)}
						type='button'
						onClick={handleToggleFavorite}
						aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
					>
						<Image
							src={favoritesIcon}
							alt=''
							style={{
								filter: isFavorited
									? 'brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(5462%) hue-rotate(354deg) brightness(97%) contrast(116%)'
									: 'none'
							}}
						/>
					</button>
				</div>
			</div>
			<div className={styles.name}>{item.name}</div>
			<div className={styles.code}>
				{item.code}
				{item.modification && <div className={styles.modification}>{item.modification}</div>}
			</div>
			<div className={styles.price}>${isNaN(rawPrice) ? item.price : rawPrice.toLocaleString()}</div>
			<Button
				className={styles.addToBasket}
				view='red'
				size='l'
				onClick={handleAddToBasket}
			>
				Add to basket
			</Button>
		</div>
	)
}

export default PopularItem
