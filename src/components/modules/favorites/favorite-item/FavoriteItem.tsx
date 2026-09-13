'use client'

import Button from '@components/ui/button/Button'
import Tooltip from '@components/ui/tooltip/Tooltip'
import compareIcon from '@public/img/icons/compare-icon.svg'
import favoritesIcon from '@public/img/icons/favorites.svg'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useFavoritesStore, TFavoriteItem } from '@store/favoritesStore'
import { useComparisonStore } from '@store/comparisonStore'

import styles from './FavoriteItem.module.scss'

interface FavoriteItemProps {
	item: TFavoriteItem
	isCompare?: boolean
	onToggleFavorites?: (item: TFavoriteItem) => void
	onToggleCompare?: (id: string | number) => void
	onAddToBasket?: (item: TFavoriteItem) => void
}

const FavoriteItem: FC<FavoriteItemProps> = ({
	item,
	isCompare,
	onToggleFavorites,
	onToggleCompare,
	onAddToBasket
}) => {
	const isFavorited = useFavoritesStore(state =>
		state.isFavorite(item.referenceId, item.itemtype)
	)

	const isComparedInStore = useComparisonStore(state =>
		state.isCompared(item.referenceId, item.itemtype)
	)
	const toggleCompareInStore = useComparisonStore(state => state.toggleCompare)

	const isItemCompared = typeof isCompare === 'boolean' ? isCompare : isComparedInStore

	const isAvailable = item.available !== false
	const rawPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^\d.]/g, '')) : item.price
	const formattedPrice = isNaN(rawPrice) || rawPrice <= 0 ? (typeof item.price === 'string' ? item.price : '$1,000') : `$${rawPrice.toLocaleString()}`

	const isProduct = item.itemtype === 2
	const productLink = isProduct ? `/product/${item.referenceId}` : undefined

	const handleCompareClick = () => {
		if (onToggleCompare) {
			onToggleCompare(item.referenceId || item.id)
		} else {
			toggleCompareInStore({
				id: `comp-${item.referenceId}-${item.itemtype}`,
				referenceId: item.referenceId,
				itemtype: item.itemtype,
				name: item.name,
				categoryName: item.categoryName,
				price: item.price,
				image: item.image,
				available: item.available
			})
		}
	}

	return (
		<div className={clsx(styles.card, !isAvailable && styles.unavailable)}>
			<div className={styles.image}>
				{productLink ? (
					<Link href={productLink} className={styles.imageLink}>
						<Image
							src={item.image || '/img/catalog/cnc-routes.png'}
							fill={true}
							alt={item.name || 'Product'}
							sizes='(max-width: 768px) 100vw, 322px'
						/>
					</Link>
				) : (
					<Image
						src={item.image || '/img/catalog/cnc-routes.png'}
						fill={true}
						alt={item.name || 'Product'}
						sizes='(max-width: 768px) 100vw, 322px'
					/>
				)}
				<div className={styles.status}>
					<Tooltip
						placement='bottom'
						trigger='hover'
						content={
							<div className={styles.tooltip}>
								{isItemCompared ? 'Remove from comparison' : 'Add to comparison'}
							</div>
						}
					>
						<button
							className={clsx(styles.action, isItemCompared && styles.actionActive)}
							onClick={handleCompareClick}
							type='button'
							aria-label='Toggle comparison'
						>
							<Image
								src={compareIcon}
								alt=''
							/>
						</button>
					</Tooltip>
					<Tooltip
						placement='bottom'
						trigger='hover'
						content={
							<div className={styles.tooltip}>
								{isFavorited ? 'Remove from favorites' : 'Add to favorites'}
							</div>
						}
					>
						<button
							className={clsx(styles.action, isFavorited && styles.actionActive)}
							onClick={() => onToggleFavorites?.(item)}
							type='button'
							aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
						>
							<Image
								src={favoritesIcon}
								alt=''
							/>
						</button>
					</Tooltip>
				</div>
			</div>
			<div className={styles.name}>{item.categoryName || item.code || 'Product'}</div>
			<div className={styles.code}>
				{productLink ? (
					<Link href={productLink} className={styles.overflowLink}>
						<div className={styles.overflow} title={item.name}>{item.name}</div>
					</Link>
				) : (
					<div className={styles.overflow} title={item.name}>{item.name}</div>
				)}
			</div>
			<div className={styles.price}>{formattedPrice}</div>
			<Button
				className={styles.button}
				size='l'
				view={isAvailable ? 'red' : 'blue'}
				block={true}
				disabled={!isAvailable}
				onClick={() => onAddToBasket?.(item)}
			>
				{isAvailable ? 'Add to basket' : 'Out of stock'}
			</Button>
		</div>
	)
}

export default FavoriteItem
