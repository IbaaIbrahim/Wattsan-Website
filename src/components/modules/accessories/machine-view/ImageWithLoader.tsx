import React, { useState } from 'react';
import styles from '@components/modules/accessories/machine-view/MachineView.module.scss'
import _ from 'lodash'
import { getImagesFilterByValues, getImagesFilterByValuesWithStepCode } from '@store/configurator/actions'
import { m1PartsToCoordinatesMap, sectionsToRealPartsMap } from '@constants/m1PartsCoordinates'
import Tooltip from '@components/ui/tooltip/Tooltip'
import ShowCard from '@components/modules/accessories/show-card/ShowCard'
import { Typography } from '@components/ui/typography/Typography'
import Checkbox, { Type } from '@components/ui/checkbox/Checkbox'
import clsx from 'clsx'
import { configuratorStore } from '@store/configurator'

const SECTION_LABELS = {
	workArea: 'Work area and Z axis',
	spindle: 'Spindle',
	motor: 'Motor',
	controlSystem: 'Control system',
	additionalOptions: 'Additional options'
}

const ImageWithLoader = ({ seriesId, onSelect, selectedSection, values, loadingImageState }) => {
	const {loadingImage, setLoadingImage} = loadingImageState

	const [hoveredSection, setHoveredSection] = useState<string | null>(null)

	const handleSectionHover = (section, hovered) => {
		setHoveredSection(hovered ? section : null)
	}

	const isSelectionShowCard = (section): boolean => {
		return ['additionalOptions', 'controlSystem'].includes(section)
	}
	const seriesConfigurations = configuratorStore.use.seriesConfigurationsSelector(seriesId)
	const modelId = configuratorStore.use.modelIdSelector()

	return (
		<div style={{ position: 'relative', height: '100%' }}>
			{loadingImage && (
				<div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						background: '#f0f0f0',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 1,
					}}
				>
					<span>Loading...</span> {/* You can replace this with a spinner */}
				</div>
			)}
			{
				_.map(
					_.get(seriesConfigurations, 'configuratorImages'),
					(configuratorImage, index) => {
						const currentFilter = getImagesFilterByValues({
							section: hoveredSection ?? selectedSection ?? 'mainPage',
							motorId: values?.motorCharacteristics,
							spindleQuantityId: values?.spindleQuantityCharacteristics,
							toolQuantityId: values?.autoChangeToolsRelations,
							modelId,
							seriesId
						})
						// @ts-ignore
						const configuratorImageFilter = getImagesFilterByValuesWithStepCode({...configuratorImage, modelId: configuratorImage.workAreaId })
						return (
							<img
								key={index}
								className={styles['main-view__image']}
								style={{
									display: currentFilter === configuratorImageFilter ? 'block' : 'none',
									height: '100%',
								}}
								// src={`https://api.wattsancnc.com/${_.get(configuratorImage, 'fileManger.url')}`}
								src={`${_.get(configuratorImage, 'fileManger.url')}`}
								// fill={true}
								alt=""
								// priority
							/>
						)
					})
			}
			{
				Object.keys(m1PartsToCoordinatesMap).map(section => {
						const currentImage = _.find(_.get(seriesConfigurations, 'configuratorImages'), configuratorImage => {
							const currentFilter = getImagesFilterByValues({
								section: hoveredSection ?? selectedSection ?? 'mainPage',
								motorId: values?.motorCharacteristics,
								spindleQuantityId: values?.spindleQuantityCharacteristics,
								toolQuantityId: values?.autoChangeToolsRelations,
								modelId,
								seriesId
							})
							// @ts-ignore
							const configuratorImageFilter = getImagesFilterByValuesWithStepCode({...configuratorImage, modelId: configuratorImage.workAreaId })
							return currentFilter === configuratorImageFilter

						})
						let top = m1PartsToCoordinatesMap[section].y
						let left = m1PartsToCoordinatesMap[section].x
						if(currentImage && currentImage.mainPage_X && currentImage.mainPage_Y) {
							top = _.get(currentImage, `${sectionsToRealPartsMap[section]}_Y`)
							left = _.get(currentImage, `${sectionsToRealPartsMap[section]}_X`)
						}
						return isSelectionShowCard(section) ? (
							<Tooltip
								key={section}
								opened={section === selectedSection}
								placement='bottom'
								offset={[0, 10]}
								trigger={false}
								targetClassName={styles.checkboxWrapper}
								targetStyle={{
									top: top + '%',
									left: left + '%'
								}}
								content={
									<ShowCard
										selectedSection={section}
									/>
								}
							>
								<Tooltip
									trigger='hover'
									placement='top'
									content={
										<Typography
											className={styles.accessoriesHint}
											tag='p'
											size='s'
										>
											{SECTION_LABELS[section]}
										</Typography>
									}
								>
									<div
										className={styles.checkbox}
										style={{
											display: 'block'
										}}
									>
										<Checkbox
											onSelect={() => onSelect(section)}
											type={Type.ACCESSORIE}
											// TODO Добавить подсветку
											highlighted={false}
											selected={section === selectedSection}
										/>
									</div>
								</Tooltip>
							</Tooltip>
						) : (
							<div
								key={section}
								className={clsx(styles.checkbox, styles.checkboxWrapper)}
								style={{
									display: 'block',
									left: left + '%',
									top: top + '%',
								}}
							>
								<Tooltip
									key={section}
									trigger='hover'
									placement='top'
									content={
										<Typography
											className={styles.accessoriesHint}
											tag='p'
											size='s'
										>
											{SECTION_LABELS[section]}
										</Typography>
									}
								>
									<Checkbox
										type={Type.ACCESSORIE}
										highlighted={false}
										selected={section === selectedSection}
										onHover={hovered => handleSectionHover(section, hovered)}
										onSelect={() => onSelect(section)}
									/>
								</Tooltip>
							</div>
						)
					}
				)}
		</div>
	);
};

export default ImageWithLoader;
