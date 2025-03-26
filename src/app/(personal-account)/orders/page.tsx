import AllOrders from '@components/modules/orders/all-orders/AllOrders'
import { IOrders } from '@my-types/orders'
import { ordersService } from '@services/orders.service'
import { authStore } from '@store/auth'

const OrdersPage = async () => {
	const orders: IOrders = await ordersService.getOrders()

	return (
		<>
			{/*<AllOrders orders={orders} />*/}
		</>
	)
}

export default OrdersPage
