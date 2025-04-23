"use client"

import OrderView from '@components/modules/orders/order-view/OrderView'
import { IOrder, IOrderInfo } from '@my-types/orders'
import { ordersService } from '@services/orders.service'
import { useEffect, useState } from 'react'
import { authStore } from '@store/auth'
import { PageLoader } from '@components/modules/page-loader'

const OrderPage = ({ orderId }) => {
	const [order, setOrder] = useState<IOrder>(null)
	const clientId = authStore.useStore((state) => state.clientId)
	const getData = async () => {
		const orderData: IOrder = await ordersService.getOrderInfo(clientId, orderId)
		setOrder(orderData)
	}

	useEffect(() => {
		if(clientId) {
			getData()
		}
	}, [clientId])

	if(!order) {
		return (
			<PageLoader visible={true} />
		)
	}

	return (
		<>
			<OrderView order={order} />
		</>
	)
}

export default OrderPage
