import { AccessoryCodes } from './accessoryCodes'
import { AccessoryParts } from './accessoryParts'

export const partsToCodesMap = new Map<AccessoryParts, AccessoryCodes[]>([
	[AccessoryParts.WA_ZA, [AccessoryCodes.W_AREA, AccessoryCodes.Z_AXIS]],
	[
		AccessoryParts.SPINDLE,
		[
			AccessoryCodes.SPINDLE_TOOL_SWITCH,
			AccessoryCodes.SPINDLE_POWER,
			AccessoryCodes.SPINDLE_AUTO_QUANT,
			AccessoryCodes.SPINDLE_QUANT
		]
	],
	[AccessoryParts.MOTOR, [AccessoryCodes.MOTOR]],
	[AccessoryParts.CONTROL_SYSTEMS, [AccessoryCodes.CONTROL_SYS]],
	[
		AccessoryParts.ADD_OPTIONS,
		[
			AccessoryCodes.ADDITIONAL_LIQ_COOL_SYS,
			AccessoryCodes.ADDITIONAL_REMOV_INST_SENSOR,
			AccessoryCodes.ADDITIONAL_BUIL_INST_SENSOR,
			AccessoryCodes.ADDITIONAL_LUBRICATION_SYS,
			AccessoryCodes.ADDITIONAL_ASPIRATION,
			AccessoryCodes.ADDITIONAL_VACUUM_TABLE,
			AccessoryCodes.ADDITIONAL_ROTARY_DEVICE,
			AccessoryCodes.ADDITIONAL_CABINE
		]
	]
])
