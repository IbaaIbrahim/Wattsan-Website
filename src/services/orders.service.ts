import ordersMock from './mocks/orders/orders.json'
import { authorizedRequest } from '../utils/request'
import { API_GET_ORDERS } from '@constants/api'
import { getOrder } from '@store/basket/actions'

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

	async getOrderInfo(clientId: string, id: string) {
		const response = await getOrder({ clientId, id })

		return response
	}
}

export const ordersService = new OrdersService()
