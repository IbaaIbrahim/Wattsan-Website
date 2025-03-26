import ordersMock from './mocks/orders/orders.json'
import { authorizedRequest } from '../utils/request'
import { API_GET_USER_ORDERS } from '@constants/api'
import { authStore } from '@store/auth'

class OrdersService {
	private BASE_URL = ''

	async getOrders() {
		// const response = await Promise.resolve(ordersMock.orders)
		const response = await authorizedRequest({
			url: API_GET_USER_ORDERS,
			method: 'GET',
			// query: '?filter=clientId~eq~%2746438c59-63c6-47af-2cd3-08da1c725dd8%27'
		})

		return response
	}

	async getOrderInfo(id: string) {
		const response = await Promise.resolve(ordersMock.ordersInfo[id])

		return response
	}
}

export const ordersService = new OrdersService()
