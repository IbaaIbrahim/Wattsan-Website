import {
	AccessoryCodes,
	AdditionalCodes,
	ControlSysCodes,
	MotorCodes,
	SpindleCodes,
	WaCodes
} from '@constants/accessoryCodes'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import { SpindleOptionInfo } from '@my-types/spindleInfo'
import { accessoriesService } from '@services/accessories.service'
import React, { useEffect, useState } from 'react'

import SpindleInfo from '../../info-content/spindle-info/spindle-accessory/SpindleInfo'
import SpindlePowerOption from '../../info-content/spindle-info/spindle-power-option/SpindlePowerOption'

import styles from './AccessoryInfoModal.module.scss'

const AccessoryInfoModal = ({
	code,
	value
}: {
	code: AccessoryCodes
	value?: string
}) => {
	const { translations }: { translations: ILanguage } = useLang()
	const [currentContent, setCurrentContent] = useState<React.ReactNode>()

	useEffect(() => {
		if (isOptionInfo()) {
			setOptionContentByCodeValue(code, value || '')
			return
		}

		if (SpindleCodes.includes(code)) {
			setCurrentContent(<SpindleInfo />)
			return
		}

		if (WaCodes.includes(code)) {
			setCurrentContent(<>Work area and z_axis content</>)
			return
		}

		if (MotorCodes.includes(code)) {
			setCurrentContent(<>Motor content</>)
			return
		}

		if (ControlSysCodes.includes(code)) {
			setCurrentContent(<>Control system</>)
			return
		}

		if (AdditionalCodes.includes(code)) {
			setCurrentContent(<>Additional options content</>)
		}
	}, [code, value])

	const isOptionInfo = (): boolean => {
		return !!value
	}

	const setOptionContentByCodeValue = async (
		code: AccessoryCodes,
		value: string
	): Promise<void> => {
		const content: SpindleOptionInfo = await accessoriesService.getOptionInfo(
			code,
			value
		)
		switch (code) {
			case AccessoryCodes.SPINDLE_POWER:
				setCurrentContent(
					<SpindlePowerOption
						content={content}
						value={value}
					/>
				)
				return
			default:
				setCurrentContent(<></>)
				return
		}
	}

	return (
		<div
			className={styles.modal}
			style={(!!value && { height: '61vh' }) || {}}
		>
			<div className={styles['modal__title']}>
				{!value
					? translations.accessory_info_modal.title_accessory
					: translations.accessory_info_modal.title_option}
			</div>
			<div className={styles['modal__description']}>{currentContent}</div>
		</div>
	)
}

export default AccessoryInfoModal
