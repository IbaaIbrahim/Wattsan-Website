import Button from '@components/ui/button/Button'
import { Typography } from '@components/ui/typography/Typography'
import { configuratorStore } from '@store/configurator'
import { modalsStore } from '@store/modals'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { PAGES } from '../../../../../config/pages.url.config'

import styles from './AddToBasketModal.module.scss'

interface IAddToBasketModalProps {
	itemData?: {
		title?: string
		categoryName?: string
		price?: number | string
		image?: string | any
	}
}

const AddToBasketModal = ({ itemData }: IAddToBasketModalProps) => {
	const router = useRouter()

	const machineId = configuratorStore.use.machineId()
	const categoryInfo = configuratorStore.use.categoryInfoSelector()
	const machineInfo = configuratorStore.use.machineInfoSelector()
	const customName = configuratorStore.use.customName()

	const summary = configuratorStore.use.summarySelector(machineId)

	const isProduct = !!itemData
	const title = isProduct ? 'Item successfully added to your basket' : 'Configuration successfully added to your basket'
	const categoryName = isProduct ? (itemData?.categoryName || '') : (categoryInfo?.name || '')
	const itemName = isProduct ? (itemData?.title || '') : (machineInfo?.name || '')
	const itemPrice = isProduct ? itemData?.price : summary
	const itemImage = isProduct ? (itemData?.image || '/img/catalog/cnc-routes.png') : machineInfo?.logo

	return (
		<div>
			<Typography
				tag='h2'
				className={styles.title}
			>
				{title}
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
					{itemImage && (
						<div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
							{typeof itemImage === 'string' ? (
								<img
									src={itemImage}
									width={100}
									height={100}
									alt=''
									style={{ objectFit: 'contain', width: '100%', height: '100%' }}
								/>
							) : (
								<Image
									src={itemImage}
									width={100}
									height={100}
									alt=''
									style={{ objectFit: 'contain' }}
								/>
							)}
						</div>
					)}
					<div className={styles.info}>
						{categoryName && (
							<Typography
								className={styles.name}
								tag='p'
								size='m'
							>
								{categoryName}
							</Typography>
						)}
						<Typography
							className={styles.code}
							tag='p'
							size='l'
						>
							{itemName}&nbsp;
							{!isProduct && customName && (
								<Typography
									tag='p'
									size='m'
									weight='regular'
									discolored={true}
								>
									{customName}
								</Typography>
							)}
						</Typography>
						<Typography
							tag='p'
							size='l'
							discolored={true}
						>
							${itemPrice}
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
