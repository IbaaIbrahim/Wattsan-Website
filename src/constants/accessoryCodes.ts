export enum AccessoryCodes {
	W_AREA = 'WorkArea',
	Z_AXIS = 'ZAxis',
	SPINDLE_QUANT = 'SpindleQuantity',
	MOTOR = 'Motor',
	CONTROL_SYS = 'ControlSystem',
	SPINDLE_TOOL_SWITCH = 'SpindleToolSwitch',
	SPINDLE_POWER = 'SpindlePower',
	SPINDLE_AUTO_QUANT = 'SpindleAutoQuantity',
	ADDITIONAL_LIQ_COOL_SYS = 'LiquidCoolingSystem',
	ADDITIONAL_REMOV_INST_SENSOR = 'RemovableInstrumentSensor',
	ADDITIONAL_BUIL_INST_SENSOR = 'BuiltInInstrumentSensor',
	ADDITIONAL_LUBRICATION_SYS = 'LubricationSystem',
	ADDITIONAL_ASPIRATION = 'Aspiration',
	ADDITIONAL_VACUUM_TABLE = 'VacuumTable',
	ADDITIONAL_ROTARY_DEVICE = 'RotaryDevice',
	ADDITIONAL_CABINE = 'Cabine'
}

export const SpindleCodes: AccessoryCodes[] = [
	AccessoryCodes.SPINDLE_QUANT,
	AccessoryCodes.SPINDLE_POWER,
	AccessoryCodes.SPINDLE_AUTO_QUANT
]

export const WaCodes: AccessoryCodes[] = [
	AccessoryCodes.W_AREA,
	AccessoryCodes.Z_AXIS
]

export const MotorCodes: AccessoryCodes[] = [AccessoryCodes.MOTOR]

export const ControlSysCodes: AccessoryCodes[] = [AccessoryCodes.CONTROL_SYS]

export const AdditionalCodes: AccessoryCodes[] = [
	AccessoryCodes.ADDITIONAL_ASPIRATION,
	AccessoryCodes.ADDITIONAL_BUIL_INST_SENSOR,
	AccessoryCodes.ADDITIONAL_CABINE,
	AccessoryCodes.ADDITIONAL_LIQ_COOL_SYS,
	AccessoryCodes.ADDITIONAL_LUBRICATION_SYS,
	AccessoryCodes.ADDITIONAL_REMOV_INST_SENSOR,
	AccessoryCodes.ADDITIONAL_ROTARY_DEVICE,
	AccessoryCodes.ADDITIONAL_VACUUM_TABLE
]
