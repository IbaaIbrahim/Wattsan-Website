import { TGetConfigurations } from '@my-types/configurations'

import configurationsMock from './mocks/configurations/configurations.json'
import { authorizedRequest } from '../utils/request'
import { API_GET_REAL_ATTACHMENTS } from '@constants/api'

class ConfigurationsService {
	private BASE_URL = ''

	async getConfigurations(): Promise<TGetConfigurations> {
		const response = await Promise.resolve(configurationsMock)

		return {
			// TODO Заглушка для демонстрации
			// configurations: [],
			configurations: response.configurations,
			myTemplates: response.myTemplates,
			popularTemplates: response.popularTemplates,
			basicSpecification: response.basicSpecification
		}
	}

	async getRealPhotos(): Promise<any> {
		const response = await authorizedRequest({
			url: API_GET_REAL_ATTACHMENTS,
			method: 'GET',
			query: {
				attachmentType: 2
			}
		});

		return {
			data: response.data
		}
	}
}

export const configurationsService = new ConfigurationsService()
