import Quantity from '@components/modules/basket/quantity/Quantity'
import basketIcon from '@public/img/icons/basket.svg'
import bookmarkIcon from '@public/img/icons/bookmark.svg'
import checkEmptyIcon from '@public/img/icons/check-empty.svg'
import checkIcon from '@public/img/icons/check.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'

import styles from './ItemPlate.module.scss'

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
}> = ({
	className,
	id,
	selected,
	image,
	name,
	code,
	status,
	quantity,
	price,
	limit,
	onSelect,
	onChangeQuantity
}) => {
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
					onChange={() => onSelect(id, !selected)}
				/>
				<div className={styles.checkbox}>
					<Image
						src={selected ? checkIcon : checkEmptyIcon}
						alt=''
					/>
				</div>
				<div className={styles.image}>
					<Image
						src={image}
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
			<div className={styles.calculation}>
				<Quantity
					quantity={quantity}
					limit={limit}
					disabled={!selected}
					onChange={value => onChangeQuantity(id, value)}
				/>
			</div>
			<div className={styles.total}>
				<div className={styles.price}>${quantity * price}</div>
				<div className={styles.actions}>
					<button
						className={styles.action}
						disabled={true}
					>
						<Image
							src={bookmarkIcon}
							alt=''
						/>
					</button>
					<button
						className={styles.action}
						disabled={true}
					>
						<Image
							src={basketIcon}
							alt=''
						/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default ItemPlate
