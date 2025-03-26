import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'

import styles from './SpindleStructure.module.scss'

const SpindleStructure = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				{translations.spindle_info.structure.title}
			</div>
			<ul className={styles.list}>
				<li className={styles['list__item']}>
					{translations.spindle_info.structure.sentense_1}
				</li>
				<li className={styles['list__item']}>
					{translations.spindle_info.structure.sentense_2}
				</li>
				<li className={styles['list__item']}>
					{translations.spindle_info.structure.sentense_3}
				</li>
				<li className={styles['list__item']}>
					{translations.spindle_info.structure.sentense_4}
				</li>
			</ul>
		</div>
	)
}

export default SpindleStructure
