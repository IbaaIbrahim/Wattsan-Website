'use client'

import { useEffect, useState } from 'react'
import AllOrders from '@components/modules/orders/all-orders/AllOrders'
import { ordersService } from '@services/orders.service'
import { authStore } from '@store/auth'
// @ts-ignore
import { useStore } from 'zustand-x'
import { Loader } from '@components/modules/page-loader/components/loader'

const OrdersPage = () => {
	const [orders, setOrders] = useState([])
	const clientId = authStore.useStore((state) => state.clientId)
	const [loadingApi, setLoadingApi] = useState(true)

	useEffect(() => {
		if(clientId){
			ordersService.getOrders(clientId).then(data => {
				setOrders(data)
				setLoadingApi(false)
			})
		}
	}, [clientId])

	if (loadingApi) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Loader size={40} />
			</div>
		)
	}

	return (
		<>
			<AllOrders orders={orders} />
		</>
	)
}

export default OrdersPage
