import {
	TBasketItems,
	TCheckoutInfo,
	TOrderInfo,
	TPopularItems
} from '@my-types/basket'

import basketMock from './mocks/basket/basket.json'
import checkoutMock from './mocks/basket/checkout.json'
import orderInfoMock from './mocks/basket/order-info.json'

class BasketService {
	private BASE_URL = ''

	async getBasket(): Promise<{
		basketItems: TBasketItems
		popularItems: TPopularItems
	}> {
		const response = await Promise.resolve(basketMock)

		return {
			// TODO Заглушка
			// basketItems: [],
			basketItems: response.items,
			popularItems: response.popularItems
		}
		// return response.items
	}

	async getCheckout(): Promise<TCheckoutInfo> {
		return await Promise.resolve(checkoutMock)
	}

	async getOrderInfo(id: string): Promise<TOrderInfo> {
		return await Promise.resolve(orderInfoMock)
	}
}

export const basketService = new BasketService()
