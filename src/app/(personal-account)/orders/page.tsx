import AllOrders from '@components/modules/orders/all-orders/AllOrders'
import { ordersService } from '@services/orders.service'
import { useEffect, useState } from 'react'

const OrdersPage = () => {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		ordersService.getOrders().then(data => setOrders(data))
	}, [])

	return (
		<>
			<AllOrders orders={orders} />
		</>
	)
}

export default OrdersPage
