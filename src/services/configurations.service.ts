import { TGetConfigurations } from '@my-types/configurations'

import configurationsMock from './mocks/configurations/configurations.json'
import { authorizedRequest, request } from '../utils/request'
import {
	API_GET_CONFIGURATIONS, API_GET_CONFIGURATIONS_WITH_DETAILS,
	API_GET_CONFIGURATOR_CHARACTERISTIC_CODE_CONTENT,
	API_GET_ORDERS,
	API_GET_REAL_ATTACHMENTS
} from '@constants/api'

class ConfigurationsService {
	private BASE_URL = ''

	async getConfigurations(clientId): Promise<TGetConfigurations> {
		const response = await request({
			url: API_GET_CONFIGURATIONS_WITH_DETAILS,
			method: 'GET',
			query: { filter: `clientId~eq~'${clientId}'` }
		});

		return {
			// TODO Заглушка для демонстрации
			// configurations: [],
			configurations: response.data,
			myTemplates: response.myTemplates ?? [],
			popularTemplates: response.popularTemplates ?? [],
			basicSpecification: response.basicSpecification ?? {}
		}
	}

	async get3dModel(seriesId,modelId, autoChangeToolsId ): Promise<any> {
		const response = await request({
			url: API_GET_REAL_ATTACHMENTS,
			method: 'GET',
			query: { filter: `seriesId~eq~'${seriesId}'~and~modelId~eq~'${modelId}'~and~autoChangeToolsId~eq~'${autoChangeToolsId}'~and~attachmentType~eq~'1'` }
		});

		return {
			data: response.data.length > 0 ? response.data[0] : {},
		}
	}

	async getRealPhotos(seriesId,modelId ): Promise<any> {
		const response = await request({
			url: API_GET_REAL_ATTACHMENTS,
			method: 'GET',
			query: { filter: `seriesId~eq~'${seriesId}'~and~modelId~eq~'${modelId}'~and~attachmentType~eq~'2'` }
		});

		// const images = response.data.length < 2 ? [...response.data, ...response.data, ...response.data] : response.data
		const images = response.data.length > 0 ?  response.data : []

		return {
			data: images.map(x => ({
				url: x?.fileManger?.url,
				isVideo: false,
				placeholder: x?.fileManger?.url
			}))
		}
	}

	async getRealVideos(seriesId,modelId ): Promise<any> {
		const response = await request({
			url: API_GET_REAL_ATTACHMENTS,
			method: 'GET',
			query: { filter: `seriesId~eq~'${seriesId}'~and~modelId~eq~'${modelId}'~and~attachmentType~eq~'3'` }
		});

		// const videos = response.data.length < 2 ? [...response.data, ...response.data, ...response.data] : response.data
		const videos = response.data.length > 0 ?  response.data : []

		return {
			data: videos.map(x => ({
				url: x?.fileManger?.url,
				isVideo: true,
				placeholder: x?.fileManger?.url,
				videoPoster: x?.fileManger?.thumbnail
			}))
		}
	}

	async getCharacteristicCodeContent(characteristicCode ): Promise<any> {
		const response = await request({
			url: API_GET_CONFIGURATOR_CHARACTERISTIC_CODE_CONTENT,
			method: 'GET',
			query: { filter: `characteristicCode~eq~'${characteristicCode}'` }
		});

		let data = {}

		if(response?.data?.length > 0) {
			data = response.data[0]
		}

		return {data}
	}
}

export const configurationsService = new ConfigurationsService()
