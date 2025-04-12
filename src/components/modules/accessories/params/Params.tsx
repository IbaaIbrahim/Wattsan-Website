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
import { SUBSECTIONS_TITLE } from '@constants/configurator'

export const PARAM_NAME_BY_CODE = {
	SpindleQuantity: 'spindleQuantityCharacteristics',
	RotarySeparate: 'rotarySeparateCharacteristics',
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

	const complexRelationsWithInfo = useMemo(() => {
		const allParams = _.filter(_.flatMap(params, x => x), x => x.staticCharacteristic)
		return _.map(params.characteristicComplex, complexRelation => {
			// const
			return {
				...complexRelation,
				relatedItemInfo: _.find(allParams, x => x.characteristicId === complexRelation.relatedId)
			}
		})
	}, [params])

	const enrichedSections = useMemo(() => {
		return sections.reduce((acc, name) => {
			return {
				...acc,
				[name]: params?.[name]
			}
		}, {})
	}, [sections, params])

	const handleChange = (name, characteristicId) => {
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
			const affectedGroups = _.groupBy(complexRelationsWithInfo, x => x?.relatedItemInfo?.staticCharacteristic?.code)
			const sections = _.map(SUBSECTIONS_TITLE, (x, formKey) => ({...x, formKey}))

			// Iterate all sections to check if all next selected items are available
			_.forEach(sections, (section) => {

				// Choose only next sections
				// if(section.order > SUBSECTIONS_TITLE[name].order) {
				if(section.order > 15) {

					// If Already there is a value check it else Init new one
					if(values[section.formKey]) {

						// Get next section value from form
						const checkSelectedFormItem = params?.[section.formKey]?.find(
							param => param?.characteristicId === values[section.formKey]
						)

						// Check if not available
						if(!checkIsAvailable(checkSelectedFormItem?.isAvailable, checkSelectedFormItem?.staticCharacteristic, {...values, [name]: characteristicId})) {

							// Find the first available item for unavailable checked form value from relations node
							const firstAvailableItemForSameSection = _.find(affectedGroups[SUBSECTIONS_TITLE[section.formKey].code], affectedItem => {

								// Get previous sections keys to find the available item (item affected by the previous item of it)
								const lessSectionsFormKeys = _.filter(sections, x => x.order <= SUBSECTIONS_TITLE[name].order && _.get(x, 'complexRelationCode'))
								// const commonKeys = _.intersection(_.keys(obj1), _.keys(obj2));

								// Get the differences between current relation item node and the form values to get the item that valid with form values (Item that achieves the correct relation with form values)
								const differences = lessSectionsFormKeys.filter(lessSectionForm => {

									// if less section equals to the mainly changed section then the value should be the new one
									const comparedValueFromForm = name === _.get(lessSectionForm, 'formKey') ? characteristicId : values[_.get(lessSectionForm, 'formKey')]
									return !(_.isEqual(affectedItem[_.get(lessSectionForm, 'complexRelationCode')], comparedValueFromForm) || affectedItem[_.get(lessSectionForm, 'complexRelationCode')] === null || affectedItem[_.get(lessSectionForm, 'complexRelationCode')] === undefined)
								});

								// If no differences then the item achieves the relation
								return _.size(differences) === 0;
							})
							machineConfigurationForm.set.change(section.formKey, firstAvailableItemForSameSection?.relatedId ?? null)
						}
					} else if (affectedGroups[_.get(section, 'complexRelationCode')]) {
						// Find the first available item for unavailable checked form value from relations node
						const firstAvailableItemForSameSection = _.find(affectedGroups[SUBSECTIONS_TITLE[section.formKey].code], affectedItem => {

							// Get previous sections keys to find the available item (item affected by the previous item of it)
							const lessSectionsFormKeys = _.filter(sections, x => x.order <= SUBSECTIONS_TITLE[name].order && _.get(x, 'complexRelationCode'))
							// const commonKeys = _.intersection(_.keys(obj1), _.keys(obj2));

							// Get the differences between current relation item node and the form values to get the item that valid with form values (Item that achieves the correct relation with form values)
							const differences = lessSectionsFormKeys.filter(lessSectionForm => {

								// if less section equals to the mainly changed section then the value should be the new one
								const comparedValueFromForm = name === _.get(lessSectionForm, 'formKey') ? characteristicId : values[_.get(lessSectionForm, 'formKey')]
								return !(_.isEqual(affectedItem[_.get(lessSectionForm, 'complexRelationCode')], comparedValueFromForm) || affectedItem[_.get(lessSectionForm, 'complexRelationCode')] === null || affectedItem[_.get(lessSectionForm, 'complexRelationCode')] === undefined)
							});

							// If no differences then the item achieves the relation
							return _.size(differences) === 0;
						})
						machineConfigurationForm.set.change(section.formKey, firstAvailableItemForSameSection?.relatedId ?? null)
					}
				}
			})

			machineConfigurationForm.set.change(name, characteristicId)
			configuratorStore.set.isCustomConfiguration(true)

			if (name === 'workAreaCharacteristics') {
				getSeriesConfiguration(machineId, true)
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

	const checkIsAvailable = (
		isAvailable,
		staticCharacteristic,
		formValues = values
	) => {
		const groupedRelationsBySections = _.groupBy(complexRelationsWithInfo, x => x?.relatedItemInfo?.staticCharacteristic?.code)
		if(_.indexOf(_.keys(groupedRelationsBySections), staticCharacteristic.code) < 0) {
			return isAvailable
		}
		return _.find(complexRelationsWithInfo, complexRelation => {
			let cond = staticCharacteristic.id == complexRelation.relatedId
			if (!_.isNull(complexRelation.workAreaId)) {
				cond = cond && (complexRelation.workAreaId === formValues.workAreaCharacteristics)
			}
			if (!_.isNull(complexRelation.zAxisId)) {
				cond = cond && (complexRelation.zAxisId === formValues.zAxisCharacteristics)
			}
			if (!_.isNull(complexRelation.toolSwitchId)) {
				cond = cond && (complexRelation.toolSwitchId === formValues.toolswithchCharacteristics)
			}
			if (!_.isNull(complexRelation.autoChangeToolsId)) {
				cond = cond && (complexRelation.autoChangeToolsId === formValues.autoChangeToolsRelations)
			}
			if (!_.isNull(complexRelation.rotaryDeviceId)) {
				cond = cond && (complexRelation.rotaryDeviceId === formValues.rotaryDeviceCharacteristics)
			}
			if (!_.isNull(complexRelation.rotarySeparateId)) {
				cond = cond && (complexRelation.rotarySeparateId === formValues.rotarySeparateCharacteristics)
			}
			if(!_.find(complexRelationsWithInfo, x => x?.relatedId === staticCharacteristic?.id)) {
				cond = false
			}
			return cond
		})
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
										 }) => {
											return {
												text: `${staticCharacteristic?.name} ${staticCharacteristic?.unit ?? ''}`,
												additional: (sectionName === 'rotaryDeviceCharacteristics' && staticCharacteristic?.name === 'Separate' && values[sectionName] === characteristicId) && (
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
																	value: char.characteristicId,
																	isAvailable: checkIsAvailable(
																		char.isAvailable,
																		char.staticCharacteristic
																	)
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
												isAvailable: checkIsAvailable(
													isAvailable,
													staticCharacteristic
												)
											}
										}
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
