import Quantity from '@components/modules/basket/quantity/Quantity';
import { TBasketItem } from '@my-types/basket';
import basketIcon from '@public/img/icons/basket.svg';
import bookmarkIcon from '@public/img/icons/bookmark.svg';
import checkEmptyIcon from '@public/img/icons/check-empty.svg';
import checkIcon from '@public/img/icons/check.svg';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import { useFavoritesStore, TFavoriteItem } from '@store/favoritesStore';
import { basketStore } from '@store/basket';

import styles from './ItemPlate.module.scss';

const ItemPlate: FC<{
	className?: string
	id?: number
	selected?: boolean
	quantity?: number
	image?: string
	name?: string
	code?: string
	status?: string
	limit?: number
	price?: number
	onSelect: (id: number, selected: boolean) => void
	onChangeQuantity: (id: number, quantity: number) => void
	basketItem?: TBasketItem
}> = ({
	className,
	id,
	selected,
	image,
	name,
	code,
	status,
	quantity = 1,
	price = 0,
	limit,
	onSelect,
	onChangeQuantity,
	basketItem
}) => {
	const isFavorite = useFavoritesStore(state =>
		state.isFavorite(basketItem?.referenceId ?? id ?? 0, (basketItem?.itemtype as 1 | 2 | 3) ?? 2)
	)
	const toggleFavorite = useFavoritesStore(state => state.toggleFavorite)

	const handleToggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		const itemToFav: TFavoriteItem = {
			id: String(basketItem?.referenceId || id),
			referenceId: Number(basketItem?.referenceId || id || 0),
			itemtype: (basketItem?.itemtype as 1 | 2 | 3) || 2,
			name: name || '',
			code: code || '',
			price: price || 0,
			image: image || '/img/catalog/cnc-routes.png',
			available: true
		}
		toggleFavorite(itemToFav)
	}

	const handleDelete = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (id) {
			basketStore.set.deletePosition(id)
		}
	}

	return (
		<div
			className={clsx(
				styles.wrapper,
				selected && styles.selected,
				className && className
			)}
		>
			<label className={styles.info}>
				<input
					type='checkbox'
					className={styles.hidden}
					onChange={() => id !== undefined && onSelect(id, !selected)}
				/>
				<div className={styles.checkbox}>
					<Image
						src={selected ? checkIcon : checkEmptyIcon}
						alt=''
					/>
				</div>
				<div className={styles.image}>
					<Image
						src={basketItem?.referenceObject?.fileManger?.url || (basketItem?.referenceObject as any)?.image || image || '/img/catalog/cnc-routes.png'}
						alt=''
						fill={true}
					/>
				</div>
				<div className={styles.content}>
					<div className={styles.name}>{name}</div>
					<div className={styles.code}>{code}</div>
					<div className={styles.status}>{status}</div>
				</div>
			</label>
			<div className={styles.bottomRow}>
				<div className={styles.calculation}>
					<Quantity
						quantity={quantity}
						limit={limit}
						disabled={!selected}
						onChange={value => id !== undefined && onChangeQuantity(id, value)}
					/>
				</div>
				<div className={styles.total}>
					<div className={styles.price}>${(quantity * price).toLocaleString()}</div>
					<div className={styles.actions}>
						<button
							className={clsx(styles.action, isFavorite && styles.activeFavorite)}
							onClick={handleToggleFavorite}
							title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
							type='button'
						>
							<Image
								src={bookmarkIcon}
								alt=''
							/>
						</button>
						<button
							className={styles.action}
							onClick={handleDelete}
							title='Delete from cart'
							type='button'
						>
							<Image
								src={basketIcon}
								alt=''
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ItemPlate
