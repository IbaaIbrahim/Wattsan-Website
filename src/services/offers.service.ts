import offersMock from './mocks/offers/offers.json'
import { authorizedRequest, request } from '../utils/request'
import { API_GET_BASKETS, API_GET_PERSONAL_OFFERS } from '@constants/api'

class OffersService {
	private BASE_URL = ''

	async getOffers() {
		const response = await request({
			url: API_GET_PERSONAL_OFFERS,
			method: 'GET'
		})
		// const response = await Promise.resolve(offersMock)

		return {
			// TODO Заглушка для демонстрации
			// promoCodes: [],
			promoCodes: response?.data,
			// TODO Заглушка для демонстрации
			// offers: []
			offers: []
		}
	}
}

export const offersService = new OffersService()
