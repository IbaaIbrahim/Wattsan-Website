import aspirationSrc from '@public/img/mini-parts/aspiration.svg'
import controlSysSrc from '@public/img/mini-parts/control-sys.svg'
import liquidSrc from '@public/img/mini-parts/liquid-cool.svg'
import rotarySrc from '@public/img/mini-parts/rotary.svg'
import vacuumSrc from '@public/img/mini-parts/vacuum.svg'
import {
	basicMachineConfigurationForm,
	machineConfigurationForm
} from '@store/forms'
import clsx from 'clsx'
import Image from 'next/image'
import {useMemo} from 'react'

import styles from './ShowCard.module.scss'

const TEXTS = {
	controlSystem: 'Control System',
	liquidCoolingSystemCharacteristics: 'Liquid cooling system',
	removableSensorCharacteristics: 'Removable instrument sensor',
	builtInSensorCharacteristics: 'Built-in instrument sensor',
	lubricationSystemCharacteristics: 'Lubrication system',
	aspirationCharacteristics: 'Aspiration',
	vaccumTableCharacteristics: 'Vacuum table',
	rotaryDeviceCharacteristics: 'Rotary device',
	cabineCharacteristics: 'Cabine'
}

const ADDITIONAL_OPTIONS_IMAGES = {
	liquidCoolingSystemCharacteristics: liquidSrc,
	aspirationCharacteristics: aspirationSrc,
	removableSensorCharacteristics: controlSysSrc,
	builtInSensorCharacteristics: controlSysSrc,
	vaccumTableCharacteristics: vacuumSrc,
	lubricationSystemCharacteristics: controlSysSrc,
	cabineCharacteristics: controlSysSrc,
	rotaryDeviceCharacteristics: rotarySrc
}

const SECTIONS = {
	controlSystem: {controlSystem: controlSysSrc},
	additionalOptions: ADDITIONAL_OPTIONS_IMAGES
}

const ShowCard = ({
					  className,
					  selectedSection,
					  valueInsteadLabel
				  }: {
	className?: string
	selectedSection: any
	valueInsteadLabel?: boolean
}) => {
	const values = machineConfigurationForm.use.valuesSelector()
	const basicValues = basicMachineConfigurationForm.use.valuesSelector()

	const images = useMemo(() => {
		if (selectedSection === 'controlSystem') {
			return SECTIONS.controlSystem
		}

		return SECTIONS.additionalOptions
	}, [selectedSection])

	const isDefaultSelected = code => {
		if (selectedSection === 'controlSystem') return false

		const value = values?.[code]
		const basicValue = basicValues?.[code]

		return value === basicValue
	}

	return (
		<div className={clsx(styles.card, className)}>
			<div
				className={clsx(
					styles.content,
					Object.keys(images).length > 6 && styles.contentWithProgress,
					Object.keys(images).length > 1 && styles.contentMoreOne
				)}
			>
				<div className={styles.contentInner}>
					{Object.keys(images).map(code => (
						<div
							key={code}
							className={styles['image-wrapper']}
						>
							<>
								<Image
									className={styles['mini-image']}
									src={images[code]}
									alt=''
								/>
								<span className={styles.label}>{TEXTS[code]}</span>

								{isDefaultSelected(code) && (
									<div className={styles['not-chosen-placeholder']}>
										<span className={styles['not-chosen-placeholder__text']}>
											Not chosen
										</span>
									</div>
								)}
							</>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ShowCard
