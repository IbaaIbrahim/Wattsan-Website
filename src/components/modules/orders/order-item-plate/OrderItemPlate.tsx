import Button from '@components/ui/button/Button'
import { IOrder } from '@my-types/orders'
import Image from 'next/image'
import { FC } from 'react'

import styles from './OrderItemPlate.module.scss'

const OrderItemPlate: FC<{
	item: { imgSrc: string; name: string; code: string; price: string }
}> = ({ item }) => {
	return (
		<div className={styles.plate}>
			<div className={styles.content}>
				<Image
					src={item.imgSrc}
					width={100}
					height={100}
					alt=''
				/>
				<div className={styles.info}>
					<div className={styles.name}>{item.name}</div>
					<div className={styles.code}>{item.code}</div>
					<div className={styles.price}>{item.price}</div>
				</div>
			</div>
			<Button
				className={styles.action}
				size='l'
				view='bordered'
			>
				View item
			</Button>
		</div>
	)
}

export default OrderItemPlate
