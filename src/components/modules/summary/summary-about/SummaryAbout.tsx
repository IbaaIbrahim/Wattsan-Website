'use client'

import ShareLinks from '@components/modules/common/share-links/ShareLinks'
import { CompareSwitcher } from '@components/modules/summary/compare-switcher/CompareSwitcher'
import { ConfigurationInfo } from '@components/modules/summary/configuration-info/ConfigurationInfo'
import Button from '@components/ui/button/Button'
import { MODALS } from '@components/ui/modal/Modal'
import { Typography } from '@components/ui/typography/Typography'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import bookmarkIcon from '@public/img/icons/bookmark.svg'
import downloadIcon from '@public/img/icons/download.svg'
import editIcon from '@public/img/icons/edit.svg'
import twoCirclesIcon from '@public/img/icons/two-circles.svg'
import { authStore } from '@store/auth'
import { createBasket } from '@store/basket/actions'
import { configuratorStore } from '@store/configurator'
import { savePersonalConfiguration } from '@store/configurator/actions'
import {
	basicMachineConfigurationForm,
	machineConfigurationForm
} from '@store/forms'
import { modalsStore } from '@store/modals'
import Image from 'next/image'
import { useState } from 'react'

import { countKeysDiff } from '../../../../utils/helpers'

import styles from './SummaryAbout.module.scss'

const SummaryAbout = () => {
	const machineId = configuratorStore.use.machineId()
	const categoryId = configuratorStore.use.categoryId()
	const configuratorId = configuratorStore.use.configuratorId()
	const summary = configuratorStore.use.summarySelector(machineId)
	const machineName = configuratorStore.use.configurationNameSelector()
	const customConfiguration = configuratorStore.use.isCustomConfiguration()
	const customName = configuratorStore.use.customName()
	const categoryInfo = configuratorStore.use.categoryInfoSelector()

	const basicConfiguration = basicMachineConfigurationForm.use.valuesSelector()
	const yourConfiguration = machineConfigurationForm.use.valuesSelector()

	const power = configuratorStore.use.powerSelector(machineId)
	const voltage = configuratorStore.use.voltageSelector(machineId)

	const differentCounter = countKeysDiff(basicConfiguration, yourConfiguration)

	const { translations }: { translations: ILanguage } = useLang()

	const [compare, setCompare] = useState<boolean>(true)

	const openRenamingModal = () => {
		modalsStore.set.open(MODALS.configNameModal, {})
	}

	const handleAddToBasket = async () => {
		await savePersonalConfiguration(machineId, categoryId)
		await createBasket()
	}

	const openBasketModal = () => {
		if (authorized) {
			handleAddToBasket()
		} else {
			modalsStore.set.open(MODALS.infoModal, {
				title: 'To save the configuration, you need to Log in or Sign up',
				accentButton: {
					text: 'Log in or Sign up',
					onClick: handleLogin(handleAddToBasket)
				},
				secondaryButton: {
					text: 'Cancel',
					onClick: () => modalsStore.set.close()
				}
			})
		}
	}

	const authorized = authStore.use.authorized()

	const handleSave = async () => {
		savePersonalConfiguration(machineId, categoryId, configuratorId)
	}

	const handleLogin = nextAction => () => {
		modalsStore.set.open(MODALS.login, {
			initialScreen: 'LOGIN',
			closeOnEscape: false,
			onComplete: nextAction,
			onError: () => {}
		})
	}

	const handleMakeSave = () => {
		if (authorized) {
			handleSave()
		} else {
			modalsStore.set.open(MODALS.infoModal, {
				title: 'To save the configuration, you need to Log in or Sign up',
				accentButton: {
					text: 'Log in or Sign up',
					onClick: handleLogin(handleSave)
				},
				secondaryButton: {
					text: 'Cancel',
					onClick: () => modalsStore.set.close()
				}
			})
		}
	}

	if (!machineId) return null

	return (
		<article className={styles.wrapper}>
			<section className={styles['main-data']}>
				<Typography tag='h1'>{translations.summary.title}</Typography>
				<div className={styles['main-data__overview']}>
					<div className={styles['overview-top']}>
						<Typography
							tag='p'
							size='l'
							discolored={true}
						>
							{categoryInfo.name}
						</Typography>
						{/*<div className={styles['overview-top__icons']}>*/}
						{/*	<Image*/}
						{/*		className={`${styles['overview-icon']} ${styles['compare-icon']}`}*/}
						{/*		src={twoCirclesIcon}*/}
						{/*		alt=''*/}
						{/*	/>*/}
						{/*	<Image*/}
						{/*		className={styles['overview-icon']}*/}
						{/*		src={bookmarkIcon}*/}
						{/*		alt=''*/}
						{/*	/>*/}
						{/*</div>*/}
					</div>
					<div className={styles['overview-bottom']}>
						<Typography
							tag='p'
							size='xl'
						>
							{machineName}
						</Typography>
						<button
							className={styles['overview-bottom--is-modified']}
							onClick={openRenamingModal}
						>
							<span className={styles['modified-text']}>{customName}</span>
							<Image
								className={styles['modified-icon']}
								src={editIcon}
								alt=''
							/>
						</button>
					</div>
				</div>
				<CompareSwitcher
					compare={compare}
					onToggle={setCompare}
					counter={differentCounter}
				/>
				<ConfigurationInfo
					differentCounter={differentCounter}
					compare={compare}
					basicConfiguration={basicConfiguration}
					yourConfiguration={yourConfiguration}
				/>
				<div className={styles['main-data__configs']}>
					{/*<CharacteristicOverview*/}
					{/*	isComparision={isCompareTabActive}*/}
					{/*	showedCount={overviewParamsCount}*/}
					{/*/>*/}
				</div>
				{/*<span*/}
				{/*	className={`${styles['hidden-params']} ${isCompareTabActive ? styles['hidden-params--compare-active'] : ''}`}*/}
				{/*>*/}
				{/*	{isCompareTabActive*/}
				{/*		? selectedCharacteristics.length - overviewParamsCount > 0*/}
				{/*			? `+${selectedCharacteristics.length - overviewParamsCount} changes`*/}
				{/*			: ''*/}
				{/*		: `+${getConfParamsCount() - overviewParamsCount} parameters`}*/}
				{/*</span>*/}
				{/*<div className={styles['main-data__pdf-and-links']}>*/}
				{/*	<Button*/}
				{/*		size='s'*/}
				{/*		view='bordered'*/}
				{/*		leftAddon={*/}
				{/*			<Image*/}
				{/*				className={styles['pdf-button__icon']}*/}
				{/*				src={downloadIcon}*/}
				{/*				alt=''*/}
				{/*			/>*/}
				{/*		}*/}
				{/*	>*/}
				{/*		{translations.summary.buttons.pdf_download}*/}
				{/*	</Button>*/}
				{/*	<ShareLinks />*/}
				{/*</div>*/}
			</section>

			<div className={styles['results-and-btns']}>
				<div className={styles['summary-info']}>
					<span className={styles.total}>
						<span className={styles['total__label']}>
							{translations.accessories.actions_bar.total}
						</span>
						<span className={styles['total__value']}>${summary}</span>
					</span>
					<span className={styles.power}>
						<span className={styles['power__label']}>
							{translations.accessories.actions_bar.power}
						</span>
						<span className={styles.powerValue}>{power}W ({voltage})</span>
					</span>
				</div>
				<div className={styles['main-btns']}>
					<Button
						view='black'
						size='l'
						onClick={handleMakeSave}
					>
						Save conf
					</Button>
					<Button
						view='red'
						size='l'
						onClick={openBasketModal}
					>
						Add to basket
					</Button>
				</div>
			</div>
		</article>
	)
}

export default SummaryAbout
