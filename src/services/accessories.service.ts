import { AccessoryCodes } from '@constants/accessoryCodes'
import { AccessoryParts } from '@constants/accessoryParts'
import { m1PartsToCoordinatesMap } from '@constants/m1PartsCoordinates'
import { partsToCodesMap } from '@constants/partsToCodes'
import {
	IAccessories,
	IAccessoryNode,
	IAccessoryResponse,
	IOverview
} from '@my-types/accessories'
import { IMachineItem } from '@my-types/machines'
import { SpindleOptionInfo } from '@my-types/spindleInfo'
import { SupportCallback } from '@my-types/supportCallback'
import machineM1Src from '@public/img/machine-details/m1/default-machine-webp.webp'
import machineM3Src from '@public/img/machine-details/m3/wa_za_machine.svg'
import machineSummaryM1Src from '@public/img/summary/m1_summary.svg'

import { machineService } from './machine.service'
import spindle_power2_2 from './mocks/accessory-info-data/spindle-power-2.2.json'
import api_response_m1 from './mocks/m1/accessories_api_ent.json'
import api_response_m3 from './mocks/m3/accessories_api_ent.json'

const mockEntitiesMap = {
	'4': {
		api_response: api_response_m1 as any as IAccessoryResponse
	},
	'17': {
		api_response: api_response_m3 as any as IAccessoryResponse
	}
}

const mockOverviewsMap: { [key: string]: IOverview } = {
	'4': {
		id: '4',
		defaultViewImg: machineM1Src as any,
		category: 'CNS Router Machine',
		machine: 'M1 6090'
	},
	'17': {
		id: '17',
		defaultViewImg: machineM3Src,
		category: 'CNS Router Machine',
		machine: 'M3 1313'
	}
}

const mockSummaryOverviewsMap: { [key: string]: IOverview } = {
	'4': {
		id: '4',
		defaultViewImg: machineSummaryM1Src,
		category: 'CNS Router Machine',
		machine: 'M1 6090'
	},
	'17': {
		id: '17',
		defaultViewImg: machineSummaryM1Src,
		category: 'CNS Router Machine',
		machine: 'M3 1313'
	}
}

class AccessoriesService {
	private BASE_URL = ''

	async getAccessoriesBySeriesId(
		id: string
	): Promise<{ all: IAccessories; defaults: IAccessoryNode[] }> {
		let currentApiEnts = mockEntitiesMap[id as '14' | '17']

		let response = (await Promise.resolve(
			currentApiEnts.api_response
		)) as any as IAccessoryResponse

		return this.convertAccessories(response)
	}

	private convertAccessories(accessoriesData: IAccessoryResponse): {
		all: IAccessories
		defaults: IAccessoryNode[]
	} {
		const accessoriesContent: { [key: string]: IAccessoryNode[] } =
			accessoriesData.content

		let all: IAccessories = {}
		let defaults: IAccessoryNode[] = []
		Object.keys(accessoriesContent).forEach((sectionKey: string) => {
			const currentSection: IAccessoryNode[] = accessoriesContent[sectionKey]
			const currentCode: AccessoryCodes =
				currentSection[0].staticCharacteristic.code

			all[currentCode] = {
				nodes: currentSection,
				imgUrl: this.getMockImgByCode(currentCode) // TODO: when api will be adapted, change to dictionary of combinations
			}

			const currentDefault = currentSection.find(node => node.isDefault)

			if (currentDefault) {
				defaults.push(currentDefault)
			}
		})

		return { all, defaults }
	}

	private getMockImgByCode(currentCode: AccessoryCodes): string {
		if (partsToCodesMap.get(AccessoryParts.WA_ZA)?.includes(currentCode)) {
			return '/img/machine-details/m1/wa_za_machine.svg'
		}

		if (
			partsToCodesMap.get(AccessoryParts.ADD_OPTIONS)?.includes(currentCode)
		) {
			return '/img/machine-details/m1/additions_machine.svg'
		}

		if (
			partsToCodesMap.get(AccessoryParts.CONTROL_SYSTEMS)?.includes(currentCode)
		) {
			return '/img/machine-details/m1/system_control_machine.svg'
		}

		if (partsToCodesMap.get(AccessoryParts.MOTOR)?.includes(currentCode)) {
			return '/img/machine-details/m1/motor_machine.svg'
		}

		if (partsToCodesMap.get(AccessoryParts.SPINDLE)?.includes(currentCode)) {
			return '/img/machine-details/m1/spindle_machine.svg'
		}

		return ''
	}

	// TODO: possibly temporary solution
	getCoordinatesBySeries(siriesId: string) {
		switch (siriesId) {
			case '4':
				return m1PartsToCoordinatesMap
			default:
				return m1PartsToCoordinatesMap
		}
	}

	async accessoryRequest(seriesId: string, clientInfo: SupportCallback) {
		console.log(seriesId, clientInfo)
		const response = await Promise.resolve('success')
		return response
	}

	async getOverviewById(seriesId: string) {
		const response = await Promise.resolve(
			mockOverviewsMap[seriesId as '14' | '17']
		)
		return response
	}

	async getSummaryOverviewById(seriesId: string) {
		const response = await Promise.resolve(
			mockSummaryOverviewsMap[seriesId as '14' | '17']
		)
		return response
	}

	async getCompatibleMachine(characteristicId: string): Promise<IMachineItem> {
		const response = await machineService.getRandomMachine()
		return response
	}

	// TODO: most probably will need to send all selected values plus seriesID, currently just mocked
	async getRecommendation(
		characteristicId: string
	): Promise<{ machines?: IMachineItem[]; accessories?: IAccessoryNode[] }> {
		console.log(characteristicId)
		if (characteristicId === '117') {
			const accessories = (await Promise.resolve(api_response_m1)).content
				.workareaCharacteristics as any as IAccessoryNode[]
			return { accessories }
		}
		const machines = await machineService.getRecMachines()
		return { machines }
	}

	async getOptionInfo(
		code: AccessoryCodes,
		value: string
	): Promise<SpindleOptionInfo> {
		return await Promise.resolve(spindle_power2_2)
	}
}

export const accessoriesService = new AccessoriesService()
