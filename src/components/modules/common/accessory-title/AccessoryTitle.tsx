import { AccessoryCodes } from '@constants/accessoryCodes'
import { useLang } from '@hooks/useLang'
import { OptionTitleCodes } from '@my-types/accessories'
import { ILanguage } from '@my-types/languages'
import { useEffect, useState } from 'react'

const AccessoryTitle = ({ code }: { code: AccessoryCodes | undefined }) => {
	const { translations }: { translations: ILanguage } = useLang()

	let [titleCodes, setTitleCodes] = useState<OptionTitleCodes>()

	useEffect(() => {
		setTitleCodes({
			[AccessoryCodes.W_AREA]: translations.accessories.part_options.work_area,
			[AccessoryCodes.Z_AXIS]: translations.accessories.part_options.z_axis,
			[AccessoryCodes.SPINDLE_TOOL_SWITCH]:
				translations.accessories.part_options.spindle_tool_switch,
			[AccessoryCodes.SPINDLE_POWER]:
				translations.accessories.part_options.spindle_power,
			[AccessoryCodes.SPINDLE_AUTO_QUANT]:
				translations.accessories.part_options.spindle_auto_quant,
			[AccessoryCodes.SPINDLE_QUANT]:
				translations.accessories.part_options.spindle_quant,
			[AccessoryCodes.MOTOR]: translations.accessories.part_options.motor,
			[AccessoryCodes.CONTROL_SYS]:
				translations.accessories.part_options.control_sys,
			[AccessoryCodes.ADDITIONAL_LIQ_COOL_SYS]:
				translations.accessories.part_options.add_liq_cool_sys,
			[AccessoryCodes.ADDITIONAL_REMOV_INST_SENSOR]:
				translations.accessories.part_options.add_remov_inst_sens,
			[AccessoryCodes.ADDITIONAL_BUIL_INST_SENSOR]:
				translations.accessories.part_options.add_buil_in_inst_sens,
			[AccessoryCodes.ADDITIONAL_LUBRICATION_SYS]:
				translations.accessories.part_options.add_lubrication,
			[AccessoryCodes.ADDITIONAL_ASPIRATION]:
				translations.accessories.part_options.add_aspiration,
			[AccessoryCodes.ADDITIONAL_VACUUM_TABLE]:
				translations.accessories.part_options.add_vacuum,
			[AccessoryCodes.ADDITIONAL_ROTARY_DEVICE]:
				translations.accessories.part_options.add_rotary_device,
			[AccessoryCodes.ADDITIONAL_CABINE]:
				translations.accessories.part_options.add_cabine
		})
	}, [translations])

	return <>{(code && titleCodes && titleCodes[code]) || ''}</>
}

export default AccessoryTitle
