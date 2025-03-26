import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'

import styles from './SpindleCooling.module.scss'

const SpindleCooling = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				{translations.spindle_info.cooling.title}
			</div>
			<div className={styles['cooling-overview']}>
				{translations.spindle_info.cooling.overview}
			</div>
			<div className={styles['air-cooling']}>
				<span className={styles['air-cooling__title']}>
					{translations.spindle_info.cooling.air.title}
				</span>
				<span className={styles['air-cooling__description']}>
					{translations.spindle_info.cooling.air.description}
				</span>
			</div>
			<div className={styles['water-cooling']}>
				<span className={styles['water-cooling__title']}>
					{translations.spindle_info.cooling.water.title}
				</span>
				<span className={styles['water-cooling__description']}>
					{translations.spindle_info.cooling.water.description}
				</span>
			</div>
		</div>
	)
}

export default SpindleCooling
