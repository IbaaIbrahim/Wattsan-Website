import Button from '@components/ui/button/Button'
import FormSelect from '@components/ui/inputs/form-select/FormSelect'
import Tooltip from '@components/ui/tooltip/Tooltip'
import compareIcon from '@public/img/icons/compare-icon.svg'
import favoritesIcon from '@public/img/icons/favorites.svg'
import { TComparisonItem } from '@/types/comparison'
import { useFavoritesStore } from '@store/favoritesStore'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Card.module.scss'

export interface ICardOption {
	value: string | number
	text: string
	item: TComparisonItem
}

interface CardProps {
	className?: string
	item?: TComparisonItem | null
	slotIndex: number
	options: ICardOption[]
	onSelectOption: (item: TComparisonItem | null) => void
	onRemoveCompare: () => void
	onToggleFavorites?: (item: TComparisonItem) => void
	onAddToBasket?: (item: TComparisonItem) => void
}

const Card: FC<CardProps> = ({
	className,
	item,
	slotIndex,
	options,
	onSelectOption,
	onRemoveCompare,
	onToggleFavorites,
	onAddToBasket
}) => {
	const isFavorited = useFavoritesStore(state =>
		item ? state.isFavorite(item.referenceId, item.itemtype) : false
	)

	const rawPrice = typeof item?.price === 'string'
		? parseFloat(item.price.replace(/[^\d.]/g, ''))
		: Number(item?.price)
	const formattedPrice = isNaN(rawPrice) || rawPrice <= 0
		? (typeof item?.price === 'string' ? item.price : '$1,000')
		: `$${rawPrice.toLocaleString()}`

	const isProduct = item?.itemtype === 2
	const itemLink = isProduct ? `/product/${item.referenceId}` : undefined

	return (
		<div className={clsx(styles.card, className, !item && styles.emptyCard)}>
			<FormSelect
				bordered={true}
				placeholder='Select equipment'
				value={item ? String(item.referenceId) : undefined}
				options={options.map(opt => ({ value: String(opt.value), text: opt.text }))}
				onSelect={val => {
					const found = options.find(opt => String(opt.value) === String(val))
					onSelectOption(found ? found.item : null)
				}}
			/>

			{item ? (
				<>
					<div className={styles.image}>
						{itemLink ? (
							<Link href={itemLink} className={styles.imageLink}>
								<Image
									src={item.image || '/img/catalog/cnc-routes.png'}
									alt={item.name || 'Equipment'}
									fill={true}
									sizes='(max-width: 768px) 100vw, 280px'
								/>
							</Link>
						) : (
							<Image
								src={item.image || '/img/catalog/cnc-routes.png'}
								alt={item.name || 'Equipment'}
								fill={true}
								sizes='(max-width: 768px) 100vw, 280px'
							/>
						)}

						<div className={styles.toolltips}>
							<Tooltip
								placement='bottom'
								trigger='hover'
								content={
									<div className={styles.tooltip}>
										Remove from comparison
									</div>
								}
							>
								<button
									className={clsx(styles.action, styles.actionCompareActive)}
									onClick={onRemoveCompare}
									type='button'
									aria-label='Remove from comparison'
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
									className={clsx(styles.action, isFavorited && styles.actionFavActive)}
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

					<div className={styles.name}>{item.categoryName || item.code || 'Equipment'}</div>

					<div className={styles.code}>
						{itemLink ? (
							<Link href={itemLink} className={styles.titleLink}>
								<span title={item.name}>{item.name}</span>
							</Link>
						) : (
							<span title={item.name}>{item.name}</span>
						)}
						{item.status && <div className={styles.status}>&nbsp;{item.status}</div>}
					</div>

					<div className={styles.price}>{formattedPrice}</div>

					<div className={styles.buttonsGroup}>
						{itemLink ? (
							<Button
								block={true}
								size='l'
								view='blue'
								href={itemLink}
							>
								View item
							</Button>
						) : (
							<Button
								block={true}
								size='l'
								view='blue'
								onClick={() => onSelectOption(null)}
							>
								Clear slot
							</Button>
						)}

						<Button
							block={true}
							size='l'
							view='red'
							onClick={() => onAddToBasket?.(item)}
						>
							Add to basket
						</Button>
					</div>
				</>
			) : (
				<div className={styles.placeholderSlot}>
					<div className={styles.placeholderText}>Slot {slotIndex + 1} empty</div>
					<div className={styles.placeholderSubtext}>Select equipment above to compare</div>
				</div>
			)}
		</div>
	)
}

export default Card
