import a1Image from '@public/img/grid-machines/icon-for-a1-equipment.png'
import m1Image from '@public/img/grid-machines/icon-for-m1-equipment.png'
import miniCabineImage from '@public/img/grid-machines/icon-for-mini-cabin-equipment.png'
import miniImage from '@public/img/grid-machines/icon-for-mini-equipment.png'
import m1RDImage from '@public/img/grid-machines/icon-for-m1-rd-equipment.png'
import m3Image from '@public/img/grid-machines/icon-for-m3-equipment.png'
import {
	TSeriesConfiguration,
	TSeriesConfigurations,
	TStartParameters
} from '@store/configurator/types'
import { equipmentFiltersForm, machineConfigurationForm } from '@store/forms'
import { createStore } from 'zustand-x'

export type TConfiguratorCategory = {
	id: number
	isActive: boolean
	name: string
	order: number
	summary: string
}

export type TConfiguratorStartParameters = {
	[key: string]: TStartParameters
}

export type TUseConfiguratorStore = {
	customName: string
	configuratorId: any
	categoryId: any
	machineId: any
	initializePage: null | 'configurator' | 'accessories' | 'summary'
	isCustomConfiguration: boolean
	categories: TConfiguratorCategory[]
	startParameters: TConfiguratorStartParameters
	seriesConfigurations: TSeriesConfigurations
	images: {
		[key: string]: string
	}
	workAreaAffected: any[]
	savedReferenceId: number
}

const IMAGES_PLACEHOLDER = {
	M1: m1Image,
	A1: a1Image,
	Mini: miniImage,
	'Mini Cabine': miniCabineImage,
	'M1 RD': m1RDImage,
	'M3': m3Image,
	"M1 S2 X": {
		src: "https://api.wattsancnc.com/Attachments/20251226074923076.webp"
	},
	"M2": {
		src: "https://api.wattsancnc.com/Attachments/20251226074616337.webp"
	}
}

export const configuratorStore = createStore(
	'configurator'
)<TUseConfiguratorStore>({
	customName: '',
	configuratorId: null,
	categoryId: null,
	machineId: null,
	initializePage: null,
	isCustomConfiguration: false,
	categories: [],
	startParameters: {},
	seriesConfigurations: {},
	images: {},
	workAreaAffected: [],
	savedReferenceId: null
})
	.extendActions((set, get) => ({
		setStartParameters: (category, parameters) => {
			const modified = {
				...parameters,
				series: parameters.series.map(series => {
					console.log(series);

					return {
						...series,
						logo: IMAGES_PLACEHOLDER[series.name] ?? null
					}
				})
			}
			set.startParameters({
				...get.startParameters(),
				[category]: modified
			})
		},
		setSeriesConfigurations: (seriesId, configurations) =>
			set.seriesConfigurations({
				...get.seriesConfigurations(),
				[seriesId]: configurations
			}),
		setImages: (key, images) => {
			set.images({
				...get.images(),
				[key]: images
			})
		}
	}))
	.extendSelectors((set, get) => ({
		startParametersSelector: () => get.startParameters(),
		staticCharacteristicSelector: categoryId =>
			get.startParameters()?.[categoryId]?.staticCharacteristic ?? [],
		seriesSelector: categoryId => {
			const { workAreaFilter } =
				equipmentFiltersForm.use.valuesSelector() as any

			return (
				get
					.startParameters()
					?.[categoryId]?.series?.map(machine => ({
						...machine,
						seriesCharacteristics: machine?.seriesCharacteristics?.map(
							characteristic => ({
								...characteristic,
								code: characteristic?.staticCharacteristic?.code,
								name: `${characteristic.staticCharacteristic.name}${characteristic.staticCharacteristic.unit}`
							})
						)
					}))
					?.filter(
						({ seriesCharacteristics }) =>
							seriesCharacteristics?.some(
								characteristic =>
									workAreaFilter?.includes(
										characteristic?.staticCharacteristic?.id
									) || workAreaFilter?.includes('all')
							) || seriesCharacteristics.length === 0
					) ?? []
			)
		},
		seriesConfigurationsSelector: (seriesId): (TSeriesConfiguration | null) => get.seriesConfigurations()?.[seriesId],
		summarySelector: machineId => {
			const params = get.seriesConfigurations()?.[machineId] ?? {}
			const values = machineConfigurationForm.get.valuesSelector()

			const summary = Object.entries(values)
				.map(([fieldName, fieldValue]) => {
					return (
						params?.[fieldName]?.find(
							({ characteristicId }) => characteristicId === fieldValue
						)?.staticCharacteristic?.price ?? 0
					)
				})
				.reduce((acc, price) => acc + price, 0)

			const formatter = new Intl.NumberFormat('en-US')

			return formatter.format(summary)
		},
		powerSelector: machineId => {
			const params = get.seriesConfigurations()?.[machineId] ?? {}
			const values = machineConfigurationForm.get.valuesSelector()

			const summary = Object.entries(values)
				.map(([fieldName, fieldValue]) => {
					return (
						params?.[fieldName]?.find(
							({ characteristicId }) => characteristicId === fieldValue
						)?.staticCharacteristic?.power ?? 0
					)
				})
				.reduce((acc, power) => acc + parseInt(power), 0)

			return summary
		},
		voltageSelector: machineId => {
			const params = get.seriesConfigurations()?.[machineId] ?? {}
			const values = machineConfigurationForm.get.valuesSelector()

			const summary = Object.entries(values)
				.map(([fieldName, fieldValue]) => {
					return (
						params?.[fieldName]?.find(
							({ characteristicId }) => characteristicId === fieldValue
						)?.staticCharacteristic?.voltage ?? ''
					)
				})
				.reduce((acc, voltage) => (!voltage || parseInt(voltage) <= 0) ? `${acc}` : `${acc} or ${voltage}v`, '')

			return summary.replace(' or ', '')
		},
		categoryInfoSelector: () => {
			const categoryId = get.categoryId()
			const categories = get.categories()

			return categories?.find(({ id }) => id == categoryId) ?? null
		},
		machineInfoSelector: () => {
			const machineId = get.machineId()
			const categoryId = get.categoryId()
			const startParameters = get.startParameters()

			return (
				startParameters?.[categoryId]?.series?.find(
					({ id }) => id == machineId
				) ?? null
			)
		},
		modelNameSelector: () => {
			const machineId = get.machineId()
			const seriesConfigurations = get.seriesConfigurations()?.[machineId]
			const values = machineConfigurationForm.get.valuesSelector()

			const model = seriesConfigurations?.workAreaCharacteristics?.find(
				({ characteristicId }) =>
					characteristicId === values?.workAreaCharacteristics
			)

			return model?.modelName ?? ''
		},
		modelIdSelector: () => {
			const machineId = get.machineId()
			const seriesConfigurations = get.seriesConfigurations()?.[machineId]
			const values = machineConfigurationForm.get.valuesSelector()

			const model = seriesConfigurations?.workAreaCharacteristics?.find(
				({ characteristicId }) =>
					characteristicId === values?.workAreaCharacteristics
			)

			return model?.modelId ?? ''
		},
		configurationNameSelector: () => {
			const machineId = get.machineId()
			const categoryId = get.categoryId()
			const startParameters = get.startParameters()

			const machineName = (
				startParameters?.[categoryId]?.series?.find(
					({ id }) => id == machineId
				) ?? null
			)?.name

			return machineName
		},
		workAreaAffectedSelector: () => {
			const machineId = get.machineId()
			const params = (get.seriesConfigurations()?.[machineId] ?? {}) as any

			const values = machineConfigurationForm.get.valuesSelector()

			const workAreaId = values?.workAreaCharacteristics

			return params?.workAreaCharacteristics?.find(
				({ staticCharacteristic }) => staticCharacteristic?.id === workAreaId
			)?.staticCharacteristic?.affectedCharacteristicsList
		}
	}))
