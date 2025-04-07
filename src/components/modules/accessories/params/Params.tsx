'use client'

import { FormRadioAccessories } from '@components/ui/inputs/form-radio/accessories-variant/FormRadioAccessories'
import { MODALS } from '@components/ui/modal/Modal'
import infoSrc from '@public/img/icons/info.svg'
import { configuratorStore } from '@store/configurator'
import {
	getSeriesConfiguration,
	savePersonalConfiguration
} from '@store/configurator/actions'
import { machineConfigurationForm } from '@store/forms'
import { modalsStore } from '@store/modals'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import _ from 'lodash'

import { CONFIGURATOR_PAGES } from '../../../../config/pages.url.config'

import styles from './Params.module.scss'

export const SUBSECTIONS_TITLE = {
	workAreaCharacteristics: {name: 'Work area size', code: 'WorkArea'},
	zAxisCharacteristics: {name: 'Tool lift height (Z axis)', code: 'ZAxis'},
	toolswithchCharacteristics: {name: 'Tool switch', code: 'ToolSwitch'},
	spindleCharacteristics: {name: 'Spindle (power, cooling, collet)', code: 'Spindle'},
	spindleQuantityCharacteristics: {name: 'Spindle quantity', code: 'SpindleQuantity'},
	motorCharacteristics: {name: 'Motor', code: 'Motor'},
	controlSystemCharacteristics: {name: 'Control System', code: 'ControlSystem'},
	liquidCoolingSystemCharacteristics: {name: 'Liquid cooling system', code: 'LiquidCoolingSystem'},
	removableSensorCharacteristics: {name: 'Removable instrument sensor', code: 'RemovableSensor'},
	builtInSensorCharacteristics: {name: 'Built-in instrument sensor', code: 'BuildInSensor'},
	lubricationSystemCharacteristics: {name: 'Lubrication system', code: 'LubricationSystem'},
	aspirationCharacteristics: {name: 'Removable instrument sensor', code: 'Aspiration'},
	vaccumTableCharacteristics: {name: 'Vacuum table', code: 'VaccumTable'},
	rotaryDeviceCharacteristics: {name: 'Rotary device', code: 'RotaryDevice'},
	rotarySeparateCharacteristics: {name: 'Rotary separate', code: 'RotarySeparate'},
	cabineCharacteristics: {name: 'Cabine', code: 'Cabine'},
	autoChangeToolsRelations: {name: 'Auto change tool', code: 'AutoChangeTools'},
}

export const PARAM_NAME_BY_CODE = {
	RotarySeparate: 'rotarySeparateCharacteristics',
	SpindleQuantity: 'spindleQuantityCharacteristics'
}

export const Params = ({
	visible,
	className,
	title,
	machineId,
	sections,
	miniatures
}: any) => {
	const router = useRouter()

	const values = machineConfigurationForm.use.valuesSelector()

	const params = configuratorStore.use.seriesConfigurationsSelector(
		machineId
	) as any
	const categoryInfo = configuratorStore.use.categoryInfoSelector()
	const categoryId = configuratorStore.use.categoryId()
	const machineInfo = configuratorStore.use.machineInfoSelector()

	const enrichedSections = useMemo(() => {
		return sections.reduce((acc, name) => {
			return {
				...acc,
				[name]: params?.[name]
			}
		}, {})
	}, [sections, params])

	const handleChange = async (name, characteristicId) => {
		const isAvailable = params?.[name]?.find(
			param => param?.characteristicId === characteristicId
		)?.isAvailable

		if (!isAvailable) {
			const characteristic = params?.[name]?.find(
				characteristic => characteristic.characteristicId === characteristicId
			)?.staticCharacteristic

			if (characteristic?.code === 'WorkArea') {
				const suggestion = params?.configurationSuggestionsSeries?.find(
					({ relatedId }) => relatedId === characteristicId
				)

				modalsStore.set.open(MODALS.recommendationModal, {
					machineName: `${categoryInfo?.name} ${machineInfo?.name}`,
					paramName: `${_.get(SUBSECTIONS_TITLE, `${name}.name`)} ${characteristic?.name} ${characteristic?.unit}`,
					suggestions: [
						{
							suggestionDetails: suggestion.suggestionDetails,
							suggestionId: suggestion.suggestionId
						}
					],
					actionButtonText: 'Start a new configuration',
					onAction: seriesId => {
						modalsStore.set.open(MODALS.infoModal, {
							title: 'Save the current configuration?',
							description:
								'You can start a new configuration and save the current configuration in your personal account to revisit later.',
							accentButton: {
								text: 'Save',
								onClick: () => {
									savePersonalConfiguration(machineId, categoryId).then(() => {
										modalsStore.set.open(MODALS.saveResultModal, {
											machineId,
											categoryId
										})
									})
								}
							},
							secondaryButton: {
								text: 'Discard',
								onClick: () => {
									router.push(
										`${CONFIGURATOR_PAGES.ACCESSORIES}?machineId=${seriesId}&categoryId=${categoryId}`
									)
									getSeriesConfiguration(seriesId)
									modalsStore.set.close()
								}
							}
						})
					},
					hint: '',
					styles: {
						display: 'block'
					}
				})
			}

			if (characteristic?.code !== 'WorkArea') {
				const suggestions =
					params?.configurationSuggestionsCharacteristics?.filter(
						({ relatedId, code }) =>
							relatedId === characteristicId && characteristic?.code === code
					)

				if (suggestions.length === 0) {
					modalsStore.set.open(MODALS.requestModal, {
						machineName: `${categoryInfo?.name} ${machineInfo?.name}`,
						paramName: `${_.get(SUBSECTIONS_TITLE, `${name}.name`)} ${characteristic?.name} ${characteristic?.unit ?? ''}`,
						hint: '',
						styles: {
							display: 'block'
						}
					})
				} else {
					modalsStore.set.open(MODALS.recommendationModal, {
						machineName: `${categoryInfo?.name} ${machineInfo?.name}`,
						paramName: `${_.get(SUBSECTIONS_TITLE, `${name}.name`)} ${characteristic?.name} ${characteristic?.unit ?? ''}`,
						suggestions,
						hint: '',
						actionButtonText: 'Confirm',
						onAction: selectedParam => {
							console.log(selectedParam)
						},
						styles: {
							display: 'block'
						}
					})
				}
			}
		} else {
			const affected =
				params?.[name]?.find(({ id }) => id === characteristicId)
					?.staticCharacteristic?.affectedCharacteristicsList ?? null

			if (Array.isArray(affected)) {
				affected.forEach(({ code, id }) => {
					const name = PARAM_NAME_BY_CODE?.[code] ?? null

					if (!!name) {
						machineConfigurationForm.set.change(name, id)
					}
				})
			}

			machineConfigurationForm.set.change(name, characteristicId)
			configuratorStore.set.isCustomConfiguration(true)

			if (name === 'workAreaCharacteristics') {
				await getSeriesConfiguration(machineId, true)
			}
		}
	}

	const handleSectionInfo = section => () => {
		modalsStore.set.open(MODALS.characteristicCodeInfoModal, {
			characteristicCode: _.get(SUBSECTIONS_TITLE, `${section}.code`),
		})
	}

	const handleParamInfo = param => () => {}

	const calculatedPrice = (sectionName, staticCharacteristic) => {
		const currentPrice = staticCharacteristic?.price
		const selectedPrice = enrichedSections[sectionName]?.find(
			params => params?.characteristicId === values?.[sectionName]
		)?.staticCharacteristic?.price
		const priceDiff = currentPrice - selectedPrice

		if (priceDiff === 0) return `$${currentPrice}`

		if (priceDiff < 0) {
			return `-$${priceDiff * -1}`
		} else {
			return `+$${priceDiff}`
		}
	}

	const additionalPrice = (sectionName, staticCharacteristic) => {
		const currentPrice = staticCharacteristic?.price
		const selectedPrice = params?.[sectionName]?.find(
			params => params?.characteristicId === values?.[sectionName]
		)?.staticCharacteristic?.price
		const priceDiff = currentPrice - selectedPrice

		if (priceDiff === 0) return `$${currentPrice}`

		if (priceDiff < 0) {
			return `-$${priceDiff * -1}`
		} else {
			return `+$${priceDiff}`
		}
	}

	const affected = configuratorStore.use.workAreaAffectedSelector()

	const availableByAffected = (
		defaultAvailable,
		sectionName,
		staticCharacteristic
	) => {
		const code = staticCharacteristic?.code
		const affectedList = affected?.filter(params => params.code === code)

		if (affectedList.length === 0) return defaultAvailable

		const affectedIds = new Set(affectedList.map(item => item.id))

		return affectedIds.has(staticCharacteristic.id)
	}

	// while (true){
	// 	console.log('true')
	// }
	return (
		<article
			className={clsx(
				className,
				styles['part-options-wrapper'],
				visible && styles['part-options-wrapper--shown']
			)}
		>
			<div className={styles.content}>
				<span className={styles.title}>{title}</span>
				{miniatures && miniatures}
				<div className={styles.options}>
					{sections?.map(sectionName => {
						if(enrichedSections?.[sectionName] && _.size(_.filter(enrichedSections?.[sectionName], x => x.isAvailable)) <= 0) {
							return null
						}
						return (
							<div
								key={sectionName}
								className={styles['options__block']}
							>
							<span className={styles.subtitle}>
								<span className={styles['subtitle__text']}>
									{_.get(SUBSECTIONS_TITLE, `${sectionName}.name`)}
								</span>
								{/*TODO Добавить в ответ апи*/}
								<div
									className={styles['info-image']}
									onClick={handleSectionInfo(sectionName)}
								>
									<Image
										src={infoSrc}
										alt=''
									/>
								</div>
							</span>
								<FormRadioAccessories
									value={values[sectionName]}
									options={_.orderBy(enrichedSections?.[sectionName], x => !x.isAvailable)?.map(
										({
											 isAvailable,
											 characteristicId,
											 staticCharacteristic
										 }) => ({
											text: `${staticCharacteristic?.name} ${staticCharacteristic?.unit ?? ''}`,
											additional: sectionName === 'rotaryDeviceCharacteristics' &&
												staticCharacteristic?.name === 'Separate' &&
												values[sectionName] === characteristicId && (
													<FormRadioAccessories
														withAdditional={true}
														value={values['rotarySeparateCharacteristics']}
														options={params?.rotarySeparateCharacteristics?.map(
															char => {
																return {
																	text: `${char?.staticCharacteristic?.name} ${char?.staticCharacteristic?.unit ?? ''}`,
																	price: additionalPrice(
																		'rotarySeparateCharacteristics',
																		char.staticCharacteristic
																	),
																	value: char.id,
																	isAvailable: char.isAvailable
																}
															}
														)}
														onChange={selected =>
															handleChange(
																'rotarySeparateCharacteristics',
																selected
															)
														}
													/>
												),
											price: calculatedPrice(sectionName, staticCharacteristic),
											value: characteristicId,
											isAvailable: availableByAffected(
												isAvailable,
												sectionName,
												staticCharacteristic
											)
										})
									)}
									onChange={selected => handleChange(sectionName, selected)}
								/>
							</div>
						)
					})}
				</div>
			</div>
		</article>
	)
}
