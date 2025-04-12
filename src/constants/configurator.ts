export const ConfiguratorSubSections = {
	workArea: ['workAreaCharacteristics', 'zAxisCharacteristics'],
	spindle: [
		'toolswithchCharacteristics',
		'spindleCharacteristics',
		'spindleQuantityCharacteristics',
		'autoChangeToolsRelations'
	],
	motor: ['motorCharacteristics'],
	controlSystem: ['controlSystemCharacteristics'],
	additionalOptions: [
		'liquidCoolingSystemCharacteristics',
		'aspirationCharacteristics',
		'removableSensorCharacteristics',
		'builtInSensorCharacteristics',
		'vaccumTableCharacteristics',
		'lubricationSystemCharacteristics',
		'rotaryDeviceCharacteristics',
		'cabineCharacteristics'
	]
}

export const FlatConfiguratorSections = [
	'workAreaCharacteristics',
	'zAxisCharacteristics',
	'toolswithchCharacteristics',
	'spindleCharacteristics',
	'spindleQuantityCharacteristics',
	'motorCharacteristics',
	'controlSystemCharacteristics',
	'liquidCoolingSystemCharacteristics',
	'aspirationCharacteristics',
	'removableSensorCharacteristics',
	'builtInSensorCharacteristics',
	'vaccumTableCharacteristics',
	'lubricationSystemCharacteristics',
	'cabineCharacteristics',
	'rotaryDeviceCharacteristics',
	'rotarySeparateCharacteristics',
	'autoChangeToolsRelations'
]

export const SUBSECTIONS_TITLE = {
	workAreaCharacteristics: {name: 'Work area size', code: 'WorkArea', complexRelationCode: 'workAreaId', order: 1},
	zAxisCharacteristics: {name: 'Tool lift height (Z axis)', code: 'ZAxis', complexRelationCode: 'zAxisId', order: 2},
	toolswithchCharacteristics: {name: 'Tool switch', code: 'ToolSwitch', complexRelationCode: 'toolSwitchId', order: 3},
	spindleCharacteristics: {name: 'Spindle (power, cooling, collet)', code: 'Spindle', order: 4},
	spindleQuantityCharacteristics: {name: 'Spindle quantity', code: 'SpindleQuantity', order: 5},
	autoChangeToolsRelations: {name: 'Auto change tool', code: 'AutoChangeTools', complexRelationCode: 'autoChangeToolsId', order: 6},
	motorCharacteristics: {name: 'Motor', code: 'Motor', order: 7},
	controlSystemCharacteristics: {name: 'Control System', code: 'ControlSystem', order: 8},
	liquidCoolingSystemCharacteristics: {name: 'Liquid cooling system', code: 'LiquidCoolingSystem', order: 9},
	removableSensorCharacteristics: {name: 'Removable instrument sensor', code: 'RemovableSensor', order: 10},
	builtInSensorCharacteristics: {name: 'Built-in instrument sensor', code: 'BuildInSensor', order: 11},
	lubricationSystemCharacteristics: {name: 'Lubrication system', code: 'LubricationSystem', order: 12},
	aspirationCharacteristics: {name: 'Removable instrument sensor', code: 'Aspiration', order: 13},
	vaccumTableCharacteristics: {name: 'Vacuum table', code: 'VaccumTable', order: 14},
	rotaryDeviceCharacteristics: {name: 'Rotary device', code: 'RotaryDevice', complexRelationCode: 'rotaryDeviceId', order: 15},
	rotarySeparateCharacteristics: {name: 'Rotary separate', code: 'RotarySeparate', complexRelationCode: 'RotarySeparate', order: 16},
	cabineCharacteristics: {name: 'Cabine', code: 'Cabine', order: 17}
}