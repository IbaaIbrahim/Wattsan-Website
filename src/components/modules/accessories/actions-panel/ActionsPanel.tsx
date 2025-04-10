'use client'

import Button from '@components/ui/button/Button'
import { MODALS } from '@components/ui/modal/Modal'
import Tooltip from '@components/ui/tooltip/Tooltip'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import invertSaveIcon from '@public/img/icons/invert-save.svg'
import returnIcon from '@public/img/icons/return.svg'
import saveSrc from '@public/img/icons/save.svg'
import { authStore } from '@store/auth'
import { configuratorStore } from '@store/configurator'
import {
	savePersonalConfiguration,
	updateCurrentFields
} from '@store/configurator/actions'
import { modalsStore } from '@store/modals'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import { CONFIGURATOR_PAGES } from '../../../../config/pages.url.config'

import styles from './ActionsPanel.module.scss'

const ActionsPanel = ({setIsSummary}) => {
	const machineId = configuratorStore.use.machineId()
	const categoryId = configuratorStore.use.categoryId()
	const configuratorId = configuratorStore.use.configuratorId()

	const { translations }: { translations: ILanguage } = useLang()

	const summary = configuratorStore.use.summarySelector(machineId)
	const authorized = authStore.use.authorized()

	const [showButtons, setShowButtons] = useState(false)

	const handleSave = () => {
		savePersonalConfiguration(machineId, categoryId, configuratorId)
	}

	const handleLogin = () => {
		modalsStore.set.open(MODALS.login, {
			initialScreen: 'LOGIN',
			closeOnEscape: false,
			onComplete: handleSave,
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
					onClick: handleLogin
				},
				secondaryButton: {
					text: 'Cancel',
					onClick: () => modalsStore.set.close()
				}
			})
		}
	}

	const handleReset = () => {
		modalsStore.set.open(MODALS.infoModal, {
			hint: 'Reset configuration',
			title: 'Are you sure you want to reset the current settings to default?',
			accentButton: {
				text: 'Confirm',
				onClick: () => {
					updateCurrentFields(machineId)
					modalsStore.set.close()
				}
			},
			secondaryButton: {
				text: 'Cancel',
				onClick: () => modalsStore.set.close()
			}
		})
	}

	return (
		<article className={styles.wrapper}>
			<div className={styles.left}>
				<div className={clsx(styles.leftSaveBtn, styles.hideMobile)}>
					<Button
						view='black'
						size='l'
						rightAddon={
							<Image
								src={saveSrc}
								alt=''
								className={styles['save-icon']}
							/>
						}
						onClick={handleMakeSave}
					>
						Save
					</Button>
				</div>
				<div className={clsx(styles.leftResetBtn, styles.hideMobile)}>
					<Button
						view='bordered'
						size='l'
						onClick={handleReset}
					>
						Reset
					</Button>
				</div>
				<div className={clsx(styles.hideTablet, styles.optionsButtonsWrapper)}>
					<Tooltip
						targetClassName={styles.optionsButton}
						placement='top-start'
						content={
							<div className={styles.optionsButtons}>
								<button>
									<div className={styles.optionsButtonsIcon}>
										<Image
											src={invertSaveIcon}
											alt=''
										/>
									</div>
									Save configuration
								</button>
								<button>
									<div className={styles.optionsButtonsIcon}>
										<Image
											src={returnIcon}
											alt=''
										/>
									</div>
									Reset configuration
								</button>
							</div>
						}
					>
						<Button
							className={styles.optionsButton}
							size='m'
							view='bordered'
							rightAddon={<div className={styles.optionsIcon} />}
							onClick={() => setShowButtons(!showButtons)}
						>
							Options
						</Button>
					</Tooltip>
				</div>
				<Button
					className={clsx(styles.onlyMobile)}
					size='m'
					view='red'
					href={`${CONFIGURATOR_PAGES.SUMMARY}?machineId=${machineId}&categoryId=${categoryId}`}
				>
					{translations.accessories.actions_bar.summary}
				</Button>
			</div>
			<div className={styles.right}>
				<div className={styles.rightSummaryInfo}>
					<span className={styles.total}>
						<span className={styles.totalLabel}>
							{translations.accessories.actions_bar.total}
						</span>
						<span className={styles.totalValue}>${summary}</span>
					</span>
					<span className={styles.power}>
						<span className={styles.powerLabel}>
							{translations.accessories.actions_bar.power}
						</span>
						<span className={styles.powerValue}>6500W (220 or 380V)</span>
					</span>
				</div>
				<Button
					className={clsx(styles.rightSummaryBtn, styles.hideMobile)}
					size='l'
					view='red'
					onClick={() => setIsSummary(true)}
					// href={`${CONFIGURATOR_PAGES.SUMMARY}?machineId=${machineId}&categoryId=${categoryId}`}
				>
					{translations.accessories.actions_bar.summary}
				</Button>
			</div>
		</article>
	)
}

export default ActionsPanel
