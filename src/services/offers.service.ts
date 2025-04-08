import offersMock from './mocks/offers/offers.json'
import { authorizedRequest } from '../utils/request'
import { API_GET_PERSONAL_OFFERS } from '@constants/api'

class OffersService {
	private BASE_URL = ''

	async getOffers() {
		const response = await authorizedRequest({
			url: API_GET_PERSONAL_OFFERS,
			method: 'GET',
			query: {  }
		});
		// const response = await Promise.resolve(offersMock)

		return {
			// TODO Заглушка для демонстрации
			// promoCodes: [],
			promoCodes: response.data,
			// TODO Заглушка для демонстрации
			// offers: []
			offers: []
		}
	}
}

export const offersService = new OffersService()
