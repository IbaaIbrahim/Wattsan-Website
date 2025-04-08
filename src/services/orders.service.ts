import ordersMock from './mocks/orders/orders.json'
import { authorizedRequest } from '../utils/request'
import { API_GET_ORDERS } from '@constants/api'

class OrdersService {
	private BASE_URL = ''

	async getOrders(clientId) {
		const response = await authorizedRequest({
			url: API_GET_ORDERS,
			method: 'GET',
			query: { filter: `clientId~eq~'${clientId}'` }
		});

		return response.data
	}

	async getOrderInfo(id: string) {
		const response = await Promise.resolve(ordersMock.ordersInfo[id])

		return response
	}
}

export const ordersService = new OrdersService()
