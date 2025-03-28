import ordersMock from './mocks/orders/orders.json'

class OrdersService {
	private BASE_URL = ''

	async getOrders() {
		const response = await Promise.resolve(ordersMock.orders)

		return response
	}

	async getOrderInfo(id: string) {
		const response = await Promise.resolve(ordersMock.ordersInfo[id])

		return response
	}
}

export const ordersService = new OrdersService()
