import { AccessoryCodes } from '@constants/accessoryCodes'
import { AccessoryParts } from '@constants/accessoryParts'
import { SpindleToolSwitch } from '@constants/spindleToolSwitch'

export type OptionTitleCodes = {
	[key in AccessoryCodes]?: string
}

export interface IOverview {
	id: string
	defaultViewImg: string
	category: string
	machine: string
}

export interface ICharacteristic {
	id: number
	name: string
	unit: string
	charCategory: number
	order: number
	code: AccessoryCodes
	val: string
	isActive: boolean
	price: number
	categoryId: number
	category: string
	toolSwitch?: SpindleToolSwitch[]
	affectedCharacteristicsList?: ICharacteristic[]
}

export interface IAccessoryNode {
	id: number
	characteristicId: number
	staticCharacteristic: ICharacteristic
	isAvailable: boolean
	isDefault: boolean
	isExisted: boolean
}

export interface IAccessoriesItem {
	nodes: IAccessoryNode[]
	imgUrl: string
}

export type IAccessories = {
	[key in AccessoryCodes]?: IAccessoriesItem
}

export type AccessoriesStore = {
	configurationName: string
	allAccessories: IAccessories
	defaultCharacteristics: IAccessoryNode[]
	selectedCharacteristics: IAccessoryNode[]
	preselectedCharacteristics: IAccessoryNode[]
	selectedAccessoryCodes: AccessoryCodes[]
	setConfigurationName: (newName: string) => void
	selectCharacteristic: (
		code: AccessoryCodes,
		currentCharacteristic: IAccessoryNode
	) => void
	allSelectionsToPreselect: () => void
	preselectCharacteristics: (characteristics: IAccessoryNode[]) => void
	checkPreselected: () => void
	getSelectedIncompatible: (
		characteristic: IAccessoryNode
	) => IAccessoryNode | undefined
	getAccessoriesByCode: (code: AccessoryCodes) => IAccessoryNode[] | undefined
	getSelectedByCode: (code: AccessoryCodes) => IAccessoryNode | undefined
	getDefaultByCode: (code: AccessoryCodes) => IAccessoryNode | undefined
	resetCharacteristics: (codes: AccessoryCodes[]) => void
	resetAll: () => void
	resetAllSelected: () => void
	isSelectedCharacteristic: (characteristic: IAccessoryNode) => boolean
	setDefaults: (characteristics: IAccessoryNode[]) => void
	selectAccessories: (codes: AccessoryCodes[]) => void
	setAccessories: (accessory: IAccessories) => void
	getSelectedTotalPrice: () => number
}

export interface IAccessoryResponse {
	status: boolean
	machineImageUrl: string
	content: {
		workareacharacteristics: IAccessoryNode[]
		zaxischaracteristics: IAccessoryNode[]
		liquidCoolingSystemCharacteristics: IAccessoryNode[]
		removableInstrumentSensorCharacteristics: IAccessoryNode[]
		builtInInstrumentSensorCharacteristics: IAccessoryNode[]
		lubricationSystemCharacteristics: IAccessoryNode[]
		aspirationCharacteristics: IAccessoryNode[]
		vacuumTableCharacteristics: IAccessoryNode[]
		rotaryDeviceCharacteristics: IAccessoryNode[]
		cabineCharacteristics: IAccessoryNode[]
		motorCharacteristics: IAccessoryNode[]
		spindleQuantityCharacteristics: IAccessoryNode[]
		spindleAutoQuantityCharacteristics: IAccessoryNode[]
		spindlePowerCharacteristics: IAccessoryNode[]
		controlSystemCharacteristics: IAccessoryNode[]
	}
	configurationsImages: IAccessoryCombinationImage[]
}

export interface IAccessoryCombinationImage {
	id: number
	stepCode: string
	seriesId: number
	workAreaId: number
	zAxisId: number
	spindleId: number
	coolingSystemId: number
	lubricationSystemId: number
	aspirationId: number
	vaccumId: number
	rotaryDeviceId: number
	imgURL: string
}
