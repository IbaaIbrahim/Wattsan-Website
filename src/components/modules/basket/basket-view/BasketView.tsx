'use client'

import EmptyBasket from '@components/modules/basket/empty-basket/EmptyBasket'
import OrderInfo from '@components/modules/basket/order-info/OrderInfo'
import { basketStore } from '@store/basket'
import { FC } from 'react'

import styles from './BasketView.module.scss'

const BasketView: FC = () => {
	const positions = basketStore.use.positions()

	return (
		<>
			<div className={styles.title}>Basket</div>
			{positions.length === 0 ? <EmptyBasket /> : <OrderInfo />}
		</>
	)
}

export default BasketView
