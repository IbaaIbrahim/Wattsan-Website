import Button from '@components/ui/button/Button'
import { IOrder, IOrderInfo } from '@my-types/orders'
import Image from 'next/image'
import { FC } from 'react'

import styles from './OrderItemPlate.module.scss'
import { getStatus } from '@constants/order-status'

const OrderItemPlate: FC<{
	item: IOrderInfo
}> = ({ item }) => {
	const status = getStatus(item)
	return (
		<div className={styles.plate}>
			<div className={styles.content}>
				<Image
					src={item?.referenceObject?.fileManger?.url}
					width={100}
					height={100}
					alt=''
				/>
				<div className={styles.info}>
					{/*<div className={styles.name}>{item.name}</div>*/}
					{/*<div className={styles.code}>{item.code}</div>*/}
					<div className={styles.price}>${item.quantity * item.price}</div>
					<div style={{
						backgroundColor: status.color,
						color: 'white',
						padding: '2px 5px',
						borderRadius: 10,
						fontSize: 12
					}}>
						{status.label}
					</div>
				</div>
			</div>
			{/*<Button*/}
			{/*	className={styles.action}*/}
			{/*	size='l'*/}
			{/*	view='bordered'*/}
			{/*>*/}
			{/*	View item*/}
			{/*</Button>*/}
		</div>
	)
}

export default OrderItemPlate
