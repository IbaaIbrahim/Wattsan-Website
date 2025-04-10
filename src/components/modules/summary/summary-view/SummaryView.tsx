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

const SummaryView: ({ setIsSummary }: { setIsSummary: any }) => (null | JSX.Element) = ({setIsSummary = () => {}}) => {
	const machineId = configuratorStore.use.machineId()
	const categoryId = configuratorStore.use.categoryId()

	const { translations }: { translations: ILanguage } = useLang()

	const openRotateModal = () => {
		modalsStore.set.open(MODALS.rotate3d)
	}

	const openPhotosModal = () => {
		modalsStore.set.open(MODALS.mediaModal, {
			isVideoModal: false,
			items: [
				{
					url: '/img/spindle-info/slider/spindle.png',
					isVideo: false,
					placeholder: '/img/spindle-info/slider/spindle.png'
				},
				{
					url: '/img/spindle-info/slider/spindle.png',
					isVideo: false,
					placeholder: '/img/spindle-info/slider/spindle.png'
				},
				{
					url: '/img/spindle-info/slider/spindle.png',
					isVideo: false,
					placeholder: '/img/spindle-info/slider/spindle.png'
				},
				{
					url: '/img/spindle-info/slider/spindle.png',
					isVideo: false,
					placeholder: '/img/spindle-info/slider/spindle.png'
				},
				{
					url: '/img/spindle-info/slider/spindle.png',
					isVideo: false,
					placeholder: '/img/spindle-info/slider/spindle.png'
				}
			]
		})
	}

	const openVideosModal = () => {
		modalsStore.set.open(MODALS.mediaModal, {
			isVideoModal: true,
			items: [
				{
					url: '/videos/sample.mp4',
					isVideo: true,
					placeholder: '/videos/sample.mp4',
					videoPoster: '/img/spindle-info/video-poster/spindle-poster.svg'
				},
				{
					url: '/videos/sample.mp4',
					isVideo: true,
					placeholder: '/videos/sample.mp4',
					videoPoster: '/img/spindle-info/video-poster/spindle-poster.svg'
				},
				{
					url: '/videos/sample.mp4',
					isVideo: true,
					placeholder: '/videos/sample.mp4',
					videoPoster: '/img/spindle-info/video-poster/spindle-poster.svg'
				},
				{
					url: '/videos/sample.mp4',
					isVideo: true,
					placeholder: '/videos/sample.mp4',
					videoPoster: '/img/spindle-info/video-poster/spindle-poster.svg'
				},
				{
					url: '/videos/sample.mp4',
					isVideo: true,
					placeholder: '/videos/sample.mp4',
					videoPoster: '/img/spindle-info/video-poster/spindle-poster.svg'
				}
			]
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
				<Image
					className={styles['main-view__image']}
					src={machineSummaryM1Src}
					alt=''
					width='100'
					height='100'
				/>
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
