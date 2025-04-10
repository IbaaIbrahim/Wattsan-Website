import { IConfiguration } from '@my-types/configurations'
import _ from 'lodash'

export enum FORMS {
	login = 'login',
	signUp = 'signUp',
	equipmentCategory = 'equipmentCategory',
	equipmentFilters = 'equipmentFilters',
	machineConfiguration = 'machineConfiguration',
	basicMachineConfiguration = 'basicMachineConfiguration',
	basket = 'basket'
}

const mappedKeys = {
	'workAreaCharacteristics': 'workArea',
	'zAxisCharacteristics': 'zAxis',
	'toolswithchCharacteristics': 'toolSwitch',
	'spindleCharacteristics': 'spindle',
	'spindleQuantityCharacteristics': 'spindleQuantity',
	'motorCharacteristics': 'motor',
	'controlSystemCharacteristics': 'controlSystem',
	'liquidCoolingSystemCharacteristics': 'liquidCoolingSystem',
	'removableSensorCharacteristics': 'removableSensor',
	'builtInSensorCharacteristics': 'buildInSensor',
	'lubricationSystemCharacteristics': 'lubrucationSystem',
	'aspirationCharacteristics': 'aspiration',
	'vaccumTableCharacteristics': 'vaccumTable',
	'rotaryDeviceCharacteristics': 'rotaryDevice',
	'cabineCharacteristics': 'cabine',
	'rotarySeparateCharacteristics': 'rotarySeparate',
	'autoChangeToolsRelations': 'autoChangeTools',
	'configurationName': 'configurationName'
}

export const mapConfiguratorWithForm = (configurator: IConfiguration) => {
	const mappedData = {}
	_.forEach(FORMS_FIELDS.machineConfiguration, (key) => {
		const mappedItem = []
		mappedData[key] = {value: configurator[mappedKeys[key]]}
	})
	return mappedData
}

export const FORMS_FIELDS = {
	machineConfiguration: [
		'workAreaCharacteristics',
		'zAxisCharacteristics',
		'toolswithchCharacteristics',
		'spindleCharacteristics',
		'spindleQuantityCharacteristics',
		'motorCharacteristics',
		'controlSystemCharacteristics',
		'liquidCoolingSystemCharacteristics',
		'removableSensorCharacteristics',
		'builtInSensorCharacteristics',
		'lubricationSystemCharacteristics',
		'aspirationCharacteristics',
		'vaccumTableCharacteristics',
		'rotaryDeviceCharacteristics',
		'cabineCharacteristics',
		'rotarySeparateCharacteristics',
		'autoChangeToolsRelations',
		'configurationName'
	],
	basicMachineConfiguration: [
		'workAreaCharacteristics',
		'zAxisCharacteristics',
		'toolswithchCharacteristics',
		'spindleCharacteristics',
		'spindleQuantityCharacteristics',
		'motorCharacteristics',
		'controlSystemCharacteristics',
		'liquidCoolingSystemCharacteristics',
		'removableSensorCharacteristics',
		'builtInSensorCharacteristics',
		'lubricationSystemCharacteristics',
		'aspirationCharacteristics',
		'vaccumTableCharacteristics',
		'rotaryDeviceCharacteristics',
		'cabineCharacteristics',
		'rotarySeparateCharacteristics',
		'autoChangeToolsRelations',
		'configurationName'
	]
}
