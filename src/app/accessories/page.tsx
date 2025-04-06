'use client'

import MachineView from '@components/modules/accessories/machine-view/MachineView'
import { Params } from '@components/modules/accessories/params/Params'
import ShowCardMobile from '@components/modules/accessories/show-card/ShowCardMobile'
import BottomSheet from '@components/modules/bottom-sheet/BottomSheet'
import { PageLoader } from '@components/modules/page-loader'
import Checkbox, { Type } from '@components/ui/checkbox/Checkbox'
import {
	API_CONFIGURATION_BY_SERIES,
	API_CONFIGURATION_BY_SERIES_AND_MODEL,
	API_GET_CONFIGURATION_IMAGES
} from '@constants/api'
import { ConfiguratorSubSections } from '@constants/configurator'
import { useConfigurator } from '@hooks/use-configurator'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import arrowSrc from '@public/img/icons/arrow-left.svg'
import { configuratorStore } from '@store/configurator'
import { getConfigurationImages, getInitialSeriesConfiguration } from '@store/configurator/actions'
import { machineConfigurationForm } from '@store/forms'
import { requestsStore } from '@store/requests'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { CONFIGURATOR_PAGES } from '../../config/pages.url.config'

import styles from './page.module.scss'

const ConfiguratorSections = {
	workArea: 'workArea',
	spindle: 'spindle',
	motor: 'motor',
	controlSystem: 'controlSystem',
	additionalOptions: 'additionalOptions'
}

const SECTION_LABELS = {
	[ConfiguratorSections.workArea]: 'Work area and Z axis',
	[ConfiguratorSections.spindle]: 'Spindle',
	[ConfiguratorSections.motor]: 'Motor',
	[ConfiguratorSections.controlSystem]: 'Control system',
	[ConfiguratorSections.additionalOptions]: 'Additional options'
}

const REQUESTS = [
	'getStartParametersByCategory',
	'getStartParameters',
	// API_GET_CONFIGURATION_IMAGES,
	API_CONFIGURATION_BY_SERIES,
	// API_CONFIGURATION_BY_SERIES_AND_MODEL
]

const MachineId = () => {
	const loading = requestsStore.use.multipleLoadingSelector(REQUESTS)
	const notInitialized = requestsStore.use.multipleIdleSelector(REQUESTS)

	useConfigurator()

	const machineId = configuratorStore.use.machineId()

	const [section, setSection] = useState('')

	const handleChangeSection = value => {
		setSection(section === value ? '' : value)
		// TODO Проверить корректность
		setOpenedBottomSheet(true)
	}

	const values = machineConfigurationForm.use.valuesSelector()

	// useEffect(() => {
	// 	getInitialSeriesConfiguration(machineId)
	// }, [])

	const { translations }: { translations: ILanguage } = useLang()

	const [openedBottomSheet, setOpenedBottomSheet] = useState<boolean>(false)

	return (
		<div className={styles.page}>
			<PageLoader visible={loading || notInitialized} />
			<article className={styles['wrapper']}>
				<Link
					className={styles['back-link']}
					href={`${CONFIGURATOR_PAGES.HOME}`}
				>
					<Image
						src={arrowSrc}
						alt='back'
						className={styles['back-link__icon']}
					/>
					<span className={styles['back-link__lablel']}>
						{translations.accessories.parts.back_nav}
					</span>
				</Link>
				<div className={clsx(styles['accessories'], styles.hideTablet)}>
					<span className={styles['accessories__title']}>
						{translations.accessories.parts.title}
					</span>
					<section className={styles['accessories__items']}>
						{Object.keys(ConfiguratorSections).map(sectionName => (
							<div
								key={sectionName}
								className={styles['toggler-wrapper']}
							>
								<Checkbox
									onSelect={() => handleChangeSection(sectionName)}
									label={SECTION_LABELS[sectionName]}
									type={Type.ACCESSORIE}
									// TODO Добавить подсветку при выборе
									highlighted={false}
									selected={section === sectionName}
								/>
							</div>
						))}
					</section>
				</div>
			</article>
			<Params
				visible={section !== ''}
				className={styles.partOptionsBar}
				title={SECTION_LABELS[section]}
				machineId={machineId}
				sections={ConfiguratorSubSections?.[section] ?? []}
				onUnavailableClick={() => {}}
			/>
			<MachineView
				selectedSection={section}
				onSelect={handleChangeSection}
			/>
			<BottomSheet
				opened={openedBottomSheet}
				className={styles.mobileSettings}
				title='Choose accessories'
				onHide={() => setOpenedBottomSheet(false)}
			>
				<div className={styles.bottomSheetContent}>
					<div className={clsx(styles['accessories'])}>
						<section className={styles['accessories__items']}>
							{Object.keys(ConfiguratorSections).map(sectionName => (
								<div
									key={sectionName}
									className={styles['toggler-wrapper']}
								>
									<Checkbox
										onSelect={() => handleChangeSection(sectionName)}
										label={SECTION_LABELS[sectionName]}
										type={Type.ACCESSORIE}
										// TODO Добавить подсветку при выборе
										highlighted={false}
										selected={section === sectionName}
									/>
									{section === sectionName && (
										<Params
											visible={section !== ''}
											className={styles.showMobile}
											title={SECTION_LABELS[section]}
											machineId={machineId}
											miniatures={
												section === sectionName &&
												section === 'additionalOptions' && (
													<ShowCardMobile
														selectedSection={
															ConfiguratorSections.additionalOptions
														}
														valueInsteadLabel={true}
													/>
												)
											}
											sections={ConfiguratorSubSections?.[section] ?? []}
										/>
									)}
								</div>
							))}
						</section>
					</div>
					<Params
						visible={section !== ''}
						className={styles.hideMobile}
						title={SECTION_LABELS[section]}
						machineId={machineId}
						sections={ConfiguratorSubSections?.[section] ?? []}
					/>
				</div>
			</BottomSheet>
		</div>
	)
}

export default MachineId
