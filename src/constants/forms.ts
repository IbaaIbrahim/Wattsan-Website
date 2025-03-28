export enum FORMS {
	login = 'login',
	signUp = 'signUp',
	equipmentCategory = 'equipmentCategory',
	equipmentFilters = 'equipmentFilters',
	machineConfiguration = 'machineConfiguration',
	basicMachineConfiguration = 'basicMachineConfiguration',
	basket = 'basket'
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
		'rotarySeparateCharacteristics'
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
		'rotarySeparateCharacteristics'
	]
}
