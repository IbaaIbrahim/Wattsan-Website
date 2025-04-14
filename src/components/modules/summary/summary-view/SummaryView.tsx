'use client'

import Button from '@components/ui/button/Button'
import { MODALS } from '@components/ui/modal/Modal'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import arrowSrc from '@public/img/icons/arrow-left.svg'
import photoSrc from '@public/img/icons/photo.svg'
import rotateSrc from '@public/img/icons/rotate.svg'
import videoSrc from '@public/img/icons/video.svg'
import machineSummaryM1Src from '@public/img/summary/m1_summary.svg'
import { configuratorStore } from '@store/configurator'
import { modalsStore } from '@store/modals'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { CONFIGURATOR_PAGES } from '../../../../config/pages.url.config'

import styles from './SummaryView.module.scss'
import { machineConfigurationForm } from '@store/forms'
import _ from 'lodash'

const SummaryView: ({ setIsSummary }: { setIsSummary: any }) => (null | JSX.Element) = ({setIsSummary = () => {}}) => {
	const machineId = configuratorStore.use.machineId()
	const categoryId = configuratorStore.use.categoryId()
	const seriesConfigurationsSelector = configuratorStore.get.seriesConfigurationsSelector(machineId)
	const image = _.find(seriesConfigurationsSelector?.configuratorImages, x => x.seriesId == machineId && x.stepCode == 1)

	const values = machineConfigurationForm.use.valuesSelector()

	const { translations }: { translations: ILanguage } = useLang()

	const openRotateModal = () => {
		modalsStore.set.open(MODALS.rotate3d, {
			seriesId: machineId,
			modelId: values.workAreaCharacteristics,
			autoChangeToolsId: values.autoChangeToolsRelations ?? null
		})
	}

	const openPhotosModal = () => {
		modalsStore.set.open(MODALS.mediaModal, {
			seriesId: machineId,
			modelId: values.workAreaCharacteristics
		})
	}

	const openVideosModal = () => {
		modalsStore.set.open(MODALS.mediaModal, {
			isVideoModal: true,
			seriesId: machineId,
			modelId: values.workAreaCharacteristics
		})
	}

	if (!machineId) return null

	return (
		<article className={styles.wrapper}>
			<Link
				className={styles['back-link']}
				// href={`${CONFIGURATOR_PAGES.ACCESSORIES}?machineId=${machineId}&categoryId=${categoryId}`}
				onClick={(e) => {
					e.preventDefault()
					e.stopPropagation()
					setIsSummary(false)
				}}
				href={'#'}
			>
				<Image
					src={arrowSrc}
					alt='back'
					className={styles['back-link__icon']}
				/>
				<span className={styles['back-link__lablel']}>
					{translations.summary.view.back_nav}
				</span>
			</Link>
			<div className={styles['main-view']}>
				<div style={{
					position: 'absolute',
					height: '100%',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<img
						// className={styles['main-view__image']}
						src={image?.fileManger?.url}
						alt=''
						// fill={true}
						style={{height: '100%'}}
					/>
				</div>
			</div>
			<div className={styles.actions}>
				<Button
					block={true}
					view='bordered'
					leftAddon={
						<Image
							src={rotateSrc}
							alt=''
							className={clsx(styles['btn-icon'], styles.hideMobile)}
						/>
					}
					addonsHideMobile={true}
					onClick={openRotateModal}
				>
					<div className={styles.showMobile}>Rotate 3D</div>
					<div className={styles.hideMobile}>
						{translations.accessories.view_btns.rotate}
					</div>
				</Button>
				<Button
					block={true}
					view='bordered'
					leftAddon={
						<Image
							src={photoSrc}
							alt=''
							className={clsx(styles['btn-icon'], styles.hideMobile)}
						/>
					}
					addonsHideMobile={true}
					onClick={openPhotosModal}
				>
					<div className={styles.showMobile}>View photo</div>
					<div className={styles.hideMobile}>
						{translations.accessories.view_btns.real_photo}
					</div>
				</Button>
				<Button
					block={true}
					view='bordered'
					leftAddon={
						<Image
							src={videoSrc}
							alt=''
							className={clsx(styles['btn-icon'], styles.hideMobile)}
						/>
					}
					addonsHideMobile={true}
					onClick={openVideosModal}
				>
					<div className={styles.showMobile}>View video</div>
					<div className={styles.hideMobile}>
						{translations.accessories.view_btns.video}
					</div>
				</Button>
			</div>
		</article>
	)
}

export default SummaryView
