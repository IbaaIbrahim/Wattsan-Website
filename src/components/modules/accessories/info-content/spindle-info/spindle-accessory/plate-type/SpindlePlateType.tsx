import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'

import styles from './SpindlePlateType.module.scss'

const SpindlePlateType = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				{translations.spindle_info.plate_type.title}
			</div>
			<div className={styles.description}>
				{translations.spindle_info.plate_type.description}
			</div>
			<div className={styles.characteristics}>
				<div className={styles['characteristics__titles']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.plate_type.first_column_title}
					</span>
					<span className={styles['second-column']}>
						{translations.spindle_info.plate_type.second_column_title}
					</span>
				</div>
				<div className={styles['characteristics__values']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.plate_type.plate_type_1}
					</span>
					<span className={styles['second-column']}>
						{translations.spindle_info.plate_type.plate_type_1_val}
					</span>
				</div>
				<div className={styles['characteristics__values']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.plate_type.plate_type_2}
					</span>
					<span className={styles['second-column']}>
						{translations.spindle_info.plate_type.plate_type_2_val}
					</span>
				</div>
				<div className={styles['characteristics__values']}>
					<span className={styles['first-column']}>
						{translations.spindle_info.plate_type.plate_type_3}
					</span>
					<span className={styles['second-column']}>
						{translations.spindle_info.plate_type.plate_type_3_val}
					</span>
				</div>
			</div>
		</div>
	)
}

export default SpindlePlateType
