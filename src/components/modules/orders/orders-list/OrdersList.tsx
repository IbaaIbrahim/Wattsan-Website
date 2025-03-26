import OrderPlate from '@components/modules/orders/order-plate/OrderPlate'
import { IOrders } from '@my-types/orders'
import { FC } from 'react'

import styles from './OrdersList.module.scss'

const OrdersList: FC<{
	orders: IOrders
}> = ({ orders }) => {
	return (
		<div className={styles.wrapper}>
			{orders.map(order => (
				<OrderPlate
					order={order}
					key={order.id}
				/>
			))}
		</div>
	)
}

export default OrdersList
