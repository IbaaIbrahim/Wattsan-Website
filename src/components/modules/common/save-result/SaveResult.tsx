import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import { configuratorStore } from '@store/configurator'
import { modalsStore } from '@store/modals'
import Image from 'next/image'

import { PAGES } from '../../../../config/pages.url.config'

import styles from './SaveResult.module.scss'

const SaveResultModal = () => {
	const machineId = configuratorStore.use.machineId()
	const categoryInfo = configuratorStore.use.categoryInfoSelector()
	const machineInfo = configuratorStore.use.machineInfoSelector()
	const customName = configuratorStore.use.customName()

	const summary = configuratorStore.use.summarySelector(machineId)

	const handleAddToBasket = () => {}

	return (
		<div>
			<Typography
				className={styles.title}
				tag='h2'
			>
				Configuration successfully saved in your personal account
			</Typography>
			<Typography
				className={styles.subtitle}
				tag='p'
				size='m'
				weight='regular'
			>
				Now you can go to your personal account and manage your configuration.
			</Typography>
			<div className={styles.plate}>
				<div className={styles.content}>
					<Image
						src={machineInfo?.logo}
						width={100}
						height={100}
						alt=''
					/>
					<div className={styles.info}>
						<Typography
							className={styles.name}
							tag='p'
							size='m'
						>
							{categoryInfo?.name}
						</Typography>
						<Typography
							className={styles.code}
							tag='p'
							size='l'
						>
							{machineInfo?.name}&nbsp;
							<Typography
								tag='p'
								size='m'
								weight='regular'
								discolored={true}
							>
								{customName}
							</Typography>
						</Typography>
						<Typography
							tag='p'
							size='l'
							discolored={true}
						>
							${summary}
						</Typography>
					</div>
				</div>
				<Button
					className={styles.action}
					size='l'
					view='bordered'
					block={true}
					onClick={handleAddToBasket}
				>
					Add to basket
				</Button>
			</div>
			<div className={styles.actions}>
				<Button
					view='black'
					size='l'
					href={PAGES.configurator}
				>
					Start a new configuration
				</Button>
				<Button
					view='bordered'
					size='l'
					href={PAGES.configurations}
					onClick={modalsStore.set.close}
				>
					Go to my configurations
				</Button>
			</div>
		</div>
	)
}

export default SaveResultModal
