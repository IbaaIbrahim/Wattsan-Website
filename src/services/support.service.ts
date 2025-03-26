import { TRequests } from '@my-types/support'

import supportMock from './mocks/support/support.json'

class SupportService {
	private BASE_URL = ''

	async getRequests(): Promise<TRequests> {
		const response = await Promise.resolve(supportMock)

		return response.requests
	}
}

export const supportService = new SupportService()
