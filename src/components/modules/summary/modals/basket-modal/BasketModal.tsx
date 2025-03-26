import { useLang } from '@hooks/useLang'
import { IOverview } from '@my-types/accessories'
import { ILanguage } from '@my-types/languages'
import Image from 'next/image'

import styles from './BasketModal.module.scss'

const BasketModal = ({ machineOverview }: { machineOverview: IOverview }) => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.modal}>
			<div className={styles['modal__title']}>
				{translations.summary_basket_modal.title}
			</div>
			<p className={styles['modal__description']}>
				{translations.summary_basket_modal.description}
			</p>
			<div className={styles['machine-card']}>
				<div className={styles.about}>
					<div className={styles['machine-card__img']}>
						<Image
							style={{ objectFit: 'cover' }}
							src={machineOverview.defaultViewImg}
							alt=''
							fill
							sizes='(max-width: 100px)'
							priority
						/>
					</div>
					<span className={styles['machine-card__overview']}>
						<span className={styles.category}>CNS Router Machine</span>
						<span className={styles.machine}>
							<span className={styles['machine-name']}>
								{machineOverview.machine}
							</span>
							<span className={styles['machine-modified']}>
								{translations.summary_basket_modal.modified}
							</span>
						</span>
						<span className={styles['price']}>$20 000</span>
					</span>
				</div>
			</div>
		</div>
	)
}

export default BasketModal
