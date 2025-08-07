'use client';

import ShowCard from '@components/modules/accessories/show-card/ShowCard';
import { PageLoader } from '@components/modules/page-loader';
import { Loader } from '@components/modules/page-loader/components/loader';
import Button from '@components/ui/button/Button';
import Checkbox, { Type } from '@components/ui/checkbox/Checkbox';
import { MODALS } from '@components/ui/modal/Modal';
import Tooltip from '@components/ui/tooltip/Tooltip';
import { Typography } from '@components/ui/typography/Typography';
import { AccessoryParts } from '@constants/accessoryParts';
import { API_CONFIGURATION_BY_SERIES, API_CONFIGURATION_BY_SERIES_AND_MODEL, API_GET_CONFIGURATION_IMAGES } from '@constants/api';
import { m1PartsToCoordinatesMap, sectionsToRealPartsMap } from '@constants/m1PartsCoordinates';
import { useLang } from '@hooks/useLang';
import { ILanguage } from '@my-types/languages';
import photoSrc from '@public/img/icons/photo.svg';
import rotateSrc from '@public/img/icons/rotate.svg';
import videoSrc from '@public/img/icons/video.svg';
import additionalOptionsImage from '@public/img/machine-details/m1/additions_machine.svg';
import defaultMachineImage from '@public/img/machine-details/m1/default-machine-webp.webp';
import motorImage from '@public/img/machine-details/m1/motor_machine.svg';
import spindleImage from '@public/img/machine-details/m1/spindle_machine.svg';
import systemControlImage from '@public/img/machine-details/m1/system_control_machine.svg';
import workAreaAndZAxisImage from '@public/img/machine-details/m1/wa_za_machine.svg';
import { configuratorStore } from '@store/configurator';
import { getConfigurationImages, getImagesFilterByValues, getImagesFilterByValuesWithStepCode } from '@store/configurator/actions';
import { machineConfigurationForm } from '@store/forms';
import { modalsStore } from '@store/modals';
import { requestsStore } from '@store/requests';
import clsx from 'clsx';
import _ from 'lodash';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';



import ActionsPanel from '../actions-panel/ActionsPanel';



import styles from './MachineView.module.scss';
import ImageWithLoader from '@components/modules/accessories/machine-view/ImageWithLoader'


const MACHINE_IMAGES = {
	default: defaultMachineImage,
	workArea: workAreaAndZAxisImage,
	spindle: spindleImage,
	motor: motorImage,
	controlSystem: systemControlImage,
	additionalOptions: additionalOptionsImage
}

const SECTION_LABELS = {
	workArea: 'Work area and Z axis',
	spindle: 'Spindle',
	motor: 'Motor',
	controlSystem: 'Control system',
	additionalOptions: 'Additional options'
}

const STEP_CODE_MAP = {
	mainPage: 0,
	workArea: 1,
	spindle: 2,
	motor: 3,
	controlSystem: 4
}

const REQUESTS = [
	API_GET_CONFIGURATION_IMAGES
]

const MachineView = ({ selectedSection, onSelect, setIsSummary }: {
	selectedSection?: any
	onSelect?: (part: AccessoryParts) => void,
	setIsSummary: any
} & any) => {

	const categoryInfo = configuratorStore.use.categoryInfoSelector()
	const machineInfo = configuratorStore.use.machineInfoSelector()
	const modelName = configuratorStore.use.modelNameSelector()
	const customName = configuratorStore.use.customName()
	const modelId = configuratorStore.use.modelIdSelector()
	const loading = requestsStore.use.multipleLoadingSelector(REQUESTS)
	const seriesId = configuratorStore.use.machineId()
	const seriesConfigurations = configuratorStore.use.seriesConfigurationsSelector(seriesId)
	const [loadingImages, setLoadingImages] = useState({})

	useEffect(() => {
		const images = _.map(_.get(seriesConfigurations, 'configuratorImages'), configuratorImage => configuratorImage.id)
		const obj = {}
		_.forEach(images, image => {
			obj[image] = true
		})
		setLoadingImages(obj)
	}, [modelId, seriesConfigurations])

	const values = machineConfigurationForm.use.valuesSelector()

	const { translations }: { translations: ILanguage } = useLang()

	const [hoveredSection, setHoveredSection] = useState<string | null>(null)

	const handleSectionHover = (section, hovered) => {
		setHoveredSection(hovered ? section : null)
	}

	const isSelectionShowCard = (section): boolean => {
		return ['additionalOptions', 'controlSystem'].includes(section)
	}

	const openRotateModal = () => {
		modalsStore.set.open(MODALS.rotate3d, {
			seriesId: machineInfo?.id,
			modelId: values.workAreaCharacteristics,
			autoChangeToolsId: values.autoChangeToolsRelations ?? null
		})
	}

	const openPhotosModal = () => {
		modalsStore.set.open(MODALS.mediaModal, {
			seriesId: machineInfo?.id,
			modelId: values.workAreaCharacteristics
		})
	}

	const openVideosModal = () => {
		modalsStore.set.open(MODALS.mediaModal, {
			isVideoModal: true,
			seriesId: machineInfo?.id,
			modelId: values.workAreaCharacteristics
		})
	}

	return (
		<article className={styles.wrapper}>
			{
				(loading || _.find(loadingImages, x => x)) && (
					<div style={{position: 'absolute', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', zIndex: 4}}>
						<Loader size={40} />
					</div>
				)
			}
			<div className={styles.header}>
				<div className={styles.title}>
					<span className={styles['title__name']}>{categoryInfo?.name}</span>
					<span className={styles['title__serie']}>
						{machineInfo?.name}{customName && (<span style={{fontWeight: 'lighter', fontSize: 13}}> ({customName})</span>)} {modelName}
					</span>
				</div>
			</div>
			<div className={styles.mainView}>
				<div className={styles['image-wrapper']}>
					<div style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						{/*<ImageWithLoader loadingImageState={{loadingImage, setLoadingImage}} onSelect={onSelect} values={values} selectedSection={selectedSection} seriesId={seriesId} />*/}
						<div style={{position: 'relative', height: '100%'}}>
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
												onLoad={() => {setLoadingImages(prevState => ({...prevState, [configuratorImage.id]: false}))}}
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
					</div>
				</div>
			</div>
			<div className={styles.actions}>
				<Button
					className={styles.actionsButton}
					leftAddon={
						<Image
							src={rotateSrc}
							alt=''
						/>
					}
					size='s'
					view='bordered'
					onClick={openRotateModal}
				>
					<div className={styles.hideMobile}>
						{translations.accessories.view_btns.rotate}
					</div>
					<div className={styles.hideTablet}>Rotate 3D</div>
				</Button>
				<Button
					className={styles.actionsButton}
					leftAddon={
						<Image
							src={photoSrc}
							alt=''
						/>
					}
					size='s'
					view='bordered'
					onClick={openPhotosModal}
				>
					<div className={styles.hideMobile}>
						{translations.accessories.view_btns.real_photo}
					</div>
					<div className={styles.hideTablet}>View photos</div>
				</Button>
				<Button
					className={styles.actionsButton}
					leftAddon={
						<Image
							src={videoSrc}
							alt=''
						/>
					}
					size='s'
					view='bordered'
					onClick={openVideosModal}
				>
					<div className={styles.hideMobile}>
						{translations.accessories.view_btns.video}
					</div>
					<div className={styles.hideTablet}>View videos</div>
				</Button>
			</div>
			<ActionsPanel setIsSummary={setIsSummary} />
		</article>
	)
}

export default MachineView
