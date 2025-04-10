'use client';

import { MODALS } from '@components/ui/modal/Modal';
import {
	API_CONFIGURATION_BY_SERIES,
	API_CONFIGURATION_BY_SERIES_AND_MODEL,
	API_GET_CONFIGURATION_IMAGES,
	API_GET_CONFIGURATIONS, API_GET_CONFIGURATIONS_WITH_DETAILS,
	API_SAVE_CONFIGURATION,
	API_START_PARAMETERS, API_UPDATE_CONFIGURATION
} from '@constants/api'
import { FORMS_FIELDS, mapConfiguratorWithForm } from '@constants/forms'
import { authStore } from '@store/auth';
import { configuratorStore } from '@store/configurator/index';
import { basicMachineConfigurationForm, machineConfigurationForm } from '@store/forms';
import { modalsStore } from '@store/modals';
import { requestsStore } from '@store/requests';

import _ from 'lodash';

import { authorizedRequest } from '../../utils/request';
import { IConfiguration } from '@my-types/configurations'


export const getStartParameters = async ({
	init = false,
	categoryId
}: {
	init?: boolean
	categoryId?: any
}) => {
	let response
	try {
		const track = categoryId
			? 'getStartParametersByCategory'
			: 'getStartParameters'

		// if (init && configuratorStore.get.categories()?.length !== 0) return
		// if (configuratorStore.get.startParameters()?.[categoryId]) return

		if (requestsStore.get.loadingSelector(track)) return

		response = await authorizedRequest({
			url: API_START_PARAMETERS,
			method: 'GET',
			query: { categoryId },
			track
		})

		if (init) {
			configuratorStore.set.categories(response?.content?.category as any)
			configuratorStore.set.categoryId(response?.content?.category?.[1].id)
		} else {
			configuratorStore.set.setStartParameters(categoryId, response?.content)
		}
		return response
	} catch (error) {
		console.error(error)
	} finally {
		return response
	}
}

export const updateBasicFields = (seriesId, outerParams = null) => {
	const params =
		outerParams !== null
			? outerParams
			: configuratorStore.get.seriesConfigurationsSelector(seriesId)

	const fields = FORMS_FIELDS.basicMachineConfiguration.reduce((acc, name) => {
		return {
			...acc,
			[name]: {
				value: params?.[name]?.find(({ isDefault }) => isDefault)
					?.characteristicId
			}
		}
	}, {})

	basicMachineConfigurationForm.set.multiple(fields)
}

export const updateCurrentFields = (seriesId, outerParams = null) => {
	const params =
		outerParams !== null
			? outerParams
			: configuratorStore.get.seriesConfigurationsSelector(seriesId)

	const fields = FORMS_FIELDS.machineConfiguration.reduce((acc, name) => {
		return {
			...acc,
			[name]: {
				value: (
					params?.[name]?.find(({ isDefault }) => isDefault) ??
					params?.[name]?.[0]
				)?.characteristicId
			}
		}
	}, {})

	machineConfigurationForm.set.multiple(fields)
}

export const getInitialSeriesConfiguration = async machineId => {
	try {
		const response = await authorizedRequest({
			url: API_CONFIGURATION_BY_SERIES,
			method: 'GET',
			query: {
				seriesId: machineId
			}
		})

		// configuratorStore.set.setSeriesConfigurations(machineId, response?.content)

		updateCurrentFields(machineId, response?.content)
		updateBasicFields(machineId, response?.content)

		await getSeriesConfiguration(machineId)

		return
	} catch (error) {
		console.error(error)

		return
	}
}

export const getSeriesConfiguration = async (
	machineId: any,
	changeWorkArea = false
) => {
	try {
		if (
			configuratorStore.get
				.seriesConfigurations(machineId)
				.hasOwnProperty(machineId) &&
			!changeWorkArea
		) {
			updateCurrentFields(machineId)
			updateBasicFields(machineId)

			return
		}

		const response = await authorizedRequest({
			url: API_CONFIGURATION_BY_SERIES_AND_MODEL,
			method: 'GET',
			query: {
				seriesId: machineId,
				workAreaId:
					machineConfigurationForm.get.valuesSelector()?.workAreaCharacteristics
			}
		})

		configuratorStore.set.setSeriesConfigurations(machineId, response?.content)

		updateCurrentFields(machineId)
		updateBasicFields(machineId)

		return
	} catch (error) {
		console.error(error)
		return
	}
}

export const getSeriesConfigurationForConfigurator = async (
	machineId: any,
	workAreaId,
	configuratorId
) => {
	try {
		const response = await authorizedRequest({
			url: API_CONFIGURATION_BY_SERIES_AND_MODEL,
			method: 'GET',
			query: {
				seriesId: machineId,
				workAreaId
			}
		})

		configuratorStore.set.setSeriesConfigurations(machineId, response?.content)

		if(!configuratorId) {
			updateCurrentFields(machineId)
		}
		updateBasicFields(machineId)

		return
	} catch (error) {
		console.error(error)
		return
	}
}

export const getPersonalConfiguration = async () => {
	try {
		const clientId = authStore.get.clientId()

		// modalsStore.set.open(MODALS.saveResultModal, {})
		// const response = await authorizedRequest({
		// 	url: API_GET_CONFIGURATIONS,
		// 	method: 'GET',
		// 	query: { filter: `clientId~eq~'${clientId}'` }
		// })
	} catch (error) {
		console.error(error)
	}
}

export const getConfiguratorById = async (configuratorId) => {
	try {
		const clientId = authStore.get.clientId()
		const response = await authorizedRequest({
			url: API_GET_CONFIGURATIONS_WITH_DETAILS,
			method: 'GET',
			query: { filter: `id~eq~'${configuratorId}'~and~clientId~eq~'${clientId}'` },
			track: 'GetConfiguratorById'
		})
		if(_.size(response.data) > 0){
			const configurator: IConfiguration = response.data[0]
			const fields = mapConfiguratorWithForm(configurator)
			machineConfigurationForm.set.multiple(fields)
			return configurator
		}
		return {}
	} catch (error) {
		console.error(error)
	}
}

export const savePersonalConfiguration = async (machineId, categoryId, configuratorId = null) => {
	try {
		const clientId = authStore.get.clientId()
		const {
			aspirationCharacteristics,
			builtInSensorCharacteristics,
			cabineCharacteristics,
			controlSystemCharacteristics,
			liquidCoolingSystemCharacteristics,
			lubricationSystemCharacteristics,
			motorCharacteristics,
			removableSensorCharacteristics,
			rotaryDeviceCharacteristics,
			spindleCharacteristics,
			spindleQuantityCharacteristics,
			toolswithchCharacteristics,
			vaccumTableCharacteristics,
			workAreaCharacteristics,
			zAxisCharacteristics,
			autoChangeToolsRelations,
			configurationName
		} = machineConfigurationForm.get.valuesSelector()
		const configurationNameSelector = configuratorStore.get.configurationNameSelector()
		const customName = configuratorStore.get.customName()
		const price = configuratorStore.get.summarySelector(machineId)

		const data = {
			configurationName: `${configurationNameSelector} ${customName}`,
			clientId,
			seriesId: +machineId,
			workArea: workAreaCharacteristics,
			zAxis: zAxisCharacteristics,
			toolSwitch: toolswithchCharacteristics,
			spindle: spindleCharacteristics,
			spindleQuantity: spindleQuantityCharacteristics,
			motor: motorCharacteristics,
			controlSystem: controlSystemCharacteristics,
			liquidCoolingSystem: liquidCoolingSystemCharacteristics,
			removableSensor: removableSensorCharacteristics,
			buildInSensor: builtInSensorCharacteristics,
			lubrucationSystem: lubricationSystemCharacteristics,
			aspiration: aspirationCharacteristics,
			vaccumTable: vaccumTableCharacteristics,
			rotaryDevice: rotaryDeviceCharacteristics,
			cabine: cabineCharacteristics,
			autoChangeTool: autoChangeToolsRelations,
			rotarySeparate: 66,
			status: 1,
			price: price.replace(/\D/g, '')
		}

		let response = null

		if(configuratorId) {
			response = await authorizedRequest({
				url: API_UPDATE_CONFIGURATION,
				method: 'PUT',
				data: {
					...data,
					id: configuratorId
				}
			})
		} else {
			response = await authorizedRequest({
				url: API_SAVE_CONFIGURATION,
				method: 'POST',
				data
			})
		}

		const referenceId = response?.data?.[0]?.id

		configuratorStore.set.savedReferenceId(referenceId)
		configuratorStore.set.configuratorId(response?.data?.[0]?.id)

		modalsStore.set.open(MODALS.saveResultModal, {
			machineId,
			categoryId
		})

		return
	} catch (error) {
		console.error(error)

		return
	}
}

const STEP_CODE_MAP = {
	mainPage: 1,
	workArea: 2,
	spindle: 3,
	motor: 4,
	controlSystem: 5
}

export const getImagesFilterByValues = ({ section, modelId, spindleQuantityId, motorId, seriesId }) => {
	let stepCode = STEP_CODE_MAP?.[section] ?? 1

	if (stepCode === null && section !== '') return

	let additionalFilter = ''

	if (stepCode === 2) {
		additionalFilter += `~and~spindleQuantityId~eq~null~and~motorId~eq~null`
	}

	if (stepCode === 3) {
		additionalFilter += `~and~spindleQuantityId~eq~'${spindleQuantityId}'~and~motorId~eq~null`
	}

	if (stepCode === 4) {
		additionalFilter += `~and~spindleQuantityId~eq~'${spindleQuantityId}'~and~motorId~eq~'${motorId}'`
	}

	return `seriesId~eq~'${seriesId}'~and~workAreaId~eq~'${modelId}'~and~stepCode~eq~'${stepCode > 0 ? stepCode : 1}'${additionalFilter}`
}

export const getConfigurationImages = async ({ section, modelId, spindleQuantityId, motorId, seriesId }) => {
	try {

		const filter = getImagesFilterByValues({section, modelId, spindleQuantityId, motorId, seriesId})

		if (configuratorStore.get.images()?.[filter] !== undefined || !modelId || !seriesId) return

		const response = await authorizedRequest({
			url: API_GET_CONFIGURATION_IMAGES,
			method: 'GET',
			query: {
				filter
			}
		})

		configuratorStore.set.setImages(filter, response?.data)

		return response
	} catch (error) {
		console.error(error)
		return
	}
}
