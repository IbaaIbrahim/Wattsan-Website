import Button from '@components/ui/button/Button'
import Image from 'next/image'
import { FC } from 'react'

import styles from './OrderRepeatModal.module.scss'

const OrderRepeatModal: FC<{
	items: { imgSrc: string; name: string; code: string; price: string }[]
	onRepeat: () => void
	onClose: () => void
}> = ({ items, onRepeat, onClose }) => {
	return (
		<div>
			<div className={styles.title}>Repeat order</div>
			<div className={styles.description}>
				The products from this order will be added to your cart, where you can
				edit the contents before proceeding to checkout.
			</div>
			<div className={styles.divider} />
			<div className={styles.info}>
				<div className={styles.counter}>{items.length}&nbsp;items</div>
				<div className={styles.totalPrice}>
					<span className={styles.totalPriceAddon}>Total&nbsp;</span>
				</div>
			</div>
			<div className={styles.actions}>
				<Button
					view='black'
					size='l'
					onClick={onRepeat}
				>
					Add to basket
				</Button>
				<Button
					view='bordered'
					size='l'
					onClick={onClose}
				>
					Cancel
				</Button>
			</div>
			<div className={styles.items}>
				{items.map(({ imgSrc, name, code, price }) => (
					<div
						className={styles.item}
						key={name}
					>
						<Image
							src={imgSrc}
							alt=''
							width={100}
							height={100}
						/>
						<div>
							<div className={styles.itemTitle}>{name}</div>
							<div className={styles.itemCode}>{code}</div>
							<div className={styles.itemPrice}>{price}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default OrderRepeatModal
