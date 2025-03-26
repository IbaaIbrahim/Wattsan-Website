import { TGetConfigurations } from '@my-types/configurations'

import configurationsMock from './mocks/configurations/configurations.json'

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
}

export const configurationsService = new ConfigurationsService()
