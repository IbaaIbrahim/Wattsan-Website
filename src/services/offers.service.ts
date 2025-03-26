import offersMock from './mocks/offers/offers.json'

class OffersService {
	private BASE_URL = ''

	async getOffers() {
		const response = await Promise.resolve(offersMock)

		return {
			// TODO Заглушка для демонстрации
			// promoCodes: [],
			promoCodes: response.promoCodes,
			// TODO Заглушка для демонстрации
			// offers: []
			offers: response.offers
		}
	}
}

export const offersService = new OffersService()
