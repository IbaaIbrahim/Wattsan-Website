import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import { configuratorStore } from '@store/configurator'
import { modalsStore } from '@store/modals'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { PAGES } from '../../../../../config/pages.url.config'

import styles from './AddToBasketModal.module.scss'

const AddToBasketModal = () => {
	const router = useRouter()

	const machineId = configuratorStore.use.machineId()
	const categoryInfo = configuratorStore.use.categoryInfoSelector()
	const machineInfo = configuratorStore.use.machineInfoSelector()
	const customName = configuratorStore.use.customName()

	const summary = configuratorStore.use.summarySelector(machineId)

	return (
		<div>
			<Typography
				tag='h2'
				className={styles.title}
			>
				Configuration successfully added to your basket
			</Typography>
			<Typography
				className={styles.subtitle}
				tag='p'
				size='m'
				weight='regular'
			>
				Now you can proceed to your basket to complete the purchase.
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
			</div>
			<div className={styles.actions}>
				<Button
					view='red'
					size='l'
					onClick={() => {
						router.push(PAGES.basket)
						modalsStore.set.close()
					}}
				>
					Go to basket
				</Button>
				<Button
					view='bordered'
					size='l'
					onClick={() => modalsStore.set.close()}
				>
					Close
				</Button>
			</div>
		</div>
	)
}

export default AddToBasketModal
