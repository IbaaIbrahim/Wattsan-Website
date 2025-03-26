import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import aspirationSrc from '@public/img/mini-parts/aspiration.svg'
import controlSysSrc from '@public/img/mini-parts/control-sys.svg'
import liquidSrc from '@public/img/mini-parts/liquid-cool.svg'
import rotarySrc from '@public/img/mini-parts/rotary.svg'
import vacuumSrc from '@public/img/mini-parts/vacuum.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { useMemo } from 'react'

import styles from './ShowCardMobile.module.scss'

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
	controlSystem: { controlSystem: controlSysSrc },
	additionalOptions: ADDITIONAL_OPTIONS_IMAGES
}

const ShowCard = ({
	selectedSection,
	valueInsteadLabel
}: {
	selectedSection: any
	valueInsteadLabel?: boolean
}) => {
	const { translations }: { translations: ILanguage } = useLang()

	const images = useMemo(() => {
		if (selectedSection === 'controlSystem') {
			return SECTIONS.controlSystem
		}

		return SECTIONS.additionalOptions
	}, [selectedSection])

	return (
		<div className={styles.card}>
			<div className={clsx(styles.content)}>
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

							{!valueInsteadLabel && (
								<div className={styles['not-chosen-placeholder']}>
									<span className={styles['not-chosen-placeholder__text']}>
										{translations.show_parts_card.not_chosen}
									</span>
								</div>
							)}
						</>
					</div>
				))}
			</div>
		</div>
	)
}

export default ShowCard
