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
	'autoChangeToolsRelations',
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
	'rotarySeparateCharacteristics'
]

export const SUBSECTIONS_TITLE = {
	workAreaCharacteristics: {name: 'Work area size', formKey: 'workAreaCharacteristics', code: 'WorkArea', complexRelationCode: 'workAreaId', order: 1},
	zAxisCharacteristics: {name: 'Tool lift height (Z axis)', formKey: 'zAxisCharacteristics', code: 'ZAxis', complexRelationCode: 'zAxisId', order: 2},
	toolswithchCharacteristics: {name: 'Tool switch', formKey: 'toolswithchCharacteristics', code: 'ToolSwitch', complexRelationCode: 'toolSwitchId', order: 3},
	spindleCharacteristics: {name: 'Spindle (power, cooling, collet)', formKey: 'spindleCharacteristics', code: 'Spindle', order: 4},
	spindleQuantityCharacteristics: {name: 'Spindle quantity', formKey: 'spindleQuantityCharacteristics', code: 'SpindleQuantity', order: 5},
	autoChangeToolsRelations: {name: 'Auto change tool', formKey: 'autoChangeToolsRelations', code: 'AutoChangeTools', complexRelationCode: 'autoChangeToolsId', order: 6},
	motorCharacteristics: {name: 'Motor', formKey: 'motorCharacteristics', code: 'Motor', order: 7},
	controlSystemCharacteristics: {name: 'Control System', formKey: 'controlSystemCharacteristics', code: 'ControlSystem', order: 8},
	liquidCoolingSystemCharacteristics: {name: 'Liquid cooling system', formKey: 'liquidCoolingSystemCharacteristics', code: 'LiquidCoolingSystem', order: 9},
	removableSensorCharacteristics: {name: 'Removable instrument sensor', formKey: 'removableSensorCharacteristics', code: 'RemovableSensor', order: 10},
	builtInSensorCharacteristics: {name: 'Built-in instrument sensor', formKey: 'builtInSensorCharacteristics', code: 'BuildInSensor', order: 11},
	lubricationSystemCharacteristics: {name: 'Lubrication system', formKey: 'lubricationSystemCharacteristics', code: 'LubricationSystem', order: 12},
	aspirationCharacteristics: {name: 'Removable instrument sensor', formKey: 'aspirationCharacteristics', code: 'Aspiration', order: 13},
	vaccumTableCharacteristics: {name: 'Vacuum table', formKey: 'vaccumTableCharacteristics', code: 'VaccumTable', order: 14},
	rotaryDeviceCharacteristics: {name: 'Rotary device', formKey: 'rotaryDeviceCharacteristics', code: 'RotaryDevice', complexRelationCode: 'rotaryDeviceId', order: 15},
	rotarySeparateCharacteristics: {name: 'Rotary separate', formKey: 'rotarySeparateCharacteristics', code: 'RotarySeparate', complexRelationCode: 'RotarySeparate', order: 16},
	cabineCharacteristics: {name: 'Cabine', formKey: 'cabineCharacteristics', code: 'Cabine', order: 17}
}