import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'

import styles from './SpindlePower.module.scss'

const SpindlePower = ({ customTitle }: { customTitle?: string }) => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				{customTitle ? customTitle : translations.spindle_info.power.title}
			</div>
			<div className={styles.description}>
				{translations.spindle_info.power.description}
			</div>
			<div className={styles.characteristics}>
				<div className={styles['characteristics__titles']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.power.first_column_title}
					</span>
					<span className={styles['second-column']}>
						{translations.spindle_info.power.second_column_title}
					</span>
				</div>
				<div className={styles['characteristics__values']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.power.work_type_1}
					</span>
					<span className={styles['second-column']}>
						{translations.spindle_info.power.work_type_1_val}
					</span>
				</div>
				<div className={styles['characteristics__values']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.power.work_type_2}
					</span>
					<span className={styles['second-column']}>
						{translations.spindle_info.power.work_type_2_val}
					</span>
				</div>
				<div className={styles['characteristics__values']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.power.work_type_3}
					</span>
					<span className={styles['second-column']}>
						{translations.spindle_info.power.work_type_3_val}
					</span>
				</div>
			</div>
		</div>
	)
}

export default SpindlePower
