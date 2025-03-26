import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'

import styles from './SpindleQuantity.module.scss'

const SpindleQuantity = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				{translations.spindle_info.quantity.title}
			</div>
			<div className={styles.description}>
				{translations.spindle_info.quantity.description}
			</div>
			<div className={styles.characteristics}>
				<div className={styles['characteristics__titles']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.quantity.first_column_title}
					</span>
					<span className={styles['second-column']}>
						{translations.spindle_info.quantity.second_column_title}
					</span>
				</div>
				<div className={styles['characteristics__values']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.quantity.pcs1}
					</span>
					<span className={styles['second-column']}>
						<span className={styles['quant-about']}>
							{translations.spindle_info.quantity.pcs1_val1}
						</span>
						<span className={styles['quant-about']}>
							{translations.spindle_info.quantity.pcs1_val2}
						</span>
					</span>
				</div>
				<div className={styles['characteristics__values']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.quantity.pcs2}
					</span>
					<span className={styles['second-column']}>
						<span className={styles['quant-about']}>
							{translations.spindle_info.quantity.pcs2_val1}
						</span>
						<span className={styles['quant-about']}>
							{translations.spindle_info.quantity.pcs2_val2}
						</span>
					</span>
				</div>
			</div>
		</div>
	)
}

export default SpindleQuantity
