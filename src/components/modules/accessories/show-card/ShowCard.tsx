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
import { configuratorStore } from '@store/configurator'
import _ from 'lodash'

const TEXTS = {
	controlSystem: 'Control System',
	liquidCoolingSystemCharacteristics: 'Liquid cooling system',
	removableSensorCharacteristics: 'Removable instrument sensor',
	builtInSensorCharacteristics: 'Built-in instrument sensor',
	lubricationSystemCharacteristics: 'Lubrication system',
	aspirationCharacteristics: 'Aspiration',
	vaccumTableCharacteristics: 'Vacuum table',
	rotaryDeviceCharacteristics: 'Rotary device',
	// cabineCharacteristics: 'Cabine'
}

const ADDITIONAL_OPTIONS_IMAGES = {
	liquidCoolingSystemCharacteristics: liquidSrc,
	aspirationCharacteristics: aspirationSrc,
	removableSensorCharacteristics: controlSysSrc,
	builtInSensorCharacteristics: controlSysSrc,
	vaccumTableCharacteristics: vacuumSrc,
	lubricationSystemCharacteristics: controlSysSrc,
	// cabineCharacteristics: controlSysSrc,
	rotaryDeviceCharacteristics: rotarySrc
}

const SECTIONS = {
	controlSystem: {controlSystemCharacteristics: controlSysSrc},
	additionalOptions: ADDITIONAL_OPTIONS_IMAGES
}


// const ADDITIONAL_OPTIONS = {
// 	liquidCoolingSystemCharacteristics: 'LiquidCoolingSystem',
// 	aspirationCharacteristics: "Aspiration",
// 	removableSensorCharacteristics: "RemovableSensor",
// 	builtInSensorCharacteristics: "BuildInSensor",
// 	vaccumTableCharacteristics: "VaccumTable",
// 	lubricationSystemCharacteristics: "LubricationSystem",
// 	// cabineCharacteristics: controlSysSrc,
// 	rotaryDeviceCharacteristics: "RotaryDevice"
// }

// const SECTIONS = {
// 	controlSystem: {controlSystemCharacteristics: 'ControlSystem'},
// 	additionalOptions: ADDITIONAL_OPTIONS
// }

const ShowCard = ({
					  className,
					  selectedSection
				  }: {
	className?: string
	selectedSection: any
}) => {
	const values = machineConfigurationForm.use.valuesSelector()
	const basicValues = basicMachineConfigurationForm.use.valuesSelector()
	const machineInfo = configuratorStore.use.machineInfoSelector()
	const seriesConfigurations = configuratorStore.use.seriesConfigurationsSelector(machineInfo.id)

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
					{Object.keys(images).map(code => {
						const seriesCharacteristics = _.flatMap(seriesConfigurations, x => x)
						const seriesCharacteristic = _.find(seriesCharacteristics, x => x.characteristicId === values[code])
						const imageSrc = seriesCharacteristic?.fileManger?.url
						return (
							<div
								key={code}
								className={styles['image-wrapper']}
							>
								<>
									<img
										className={styles['mini-image']}
										src={imageSrc}
										alt=''
									/>
									{/*<Image*/}
									{/*	className={styles['mini-image']}*/}
									{/*	src={images[code]}*/}
									{/*	alt=''*/}
									{/*/>*/}
									<span className={styles.label}>{TEXTS[code]}</span>

									{/*{isDefaultSelected(code) && (*/}
									{/*	<div className={styles['not-chosen-placeholder']}>*/}
									{/*	<span className={styles['not-chosen-placeholder__text']}>*/}
									{/*		Not chosen*/}
									{/*	</span>*/}
									{/*	</div>*/}
									{/*)}*/}
								</>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default ShowCard
