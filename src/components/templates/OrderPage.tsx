import OrderView from '@components/modules/orders/order-view/OrderView'
import { IOrder, IOrderInfo } from '@my-types/orders'
import { ordersService } from '@services/orders.service'

const OrderPage = async ({ orderId }) => {
	const order: IOrder = await ordersService.getOrderInfo(orderId)

	return (
		<>
			<OrderView order={order} />
		</>
	)
}

export default OrderPage
