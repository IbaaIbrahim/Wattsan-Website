import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'

import CharacteristicOverview from '../../characteristic-overview/CharacteristicOverview'

import styles from './ComparisionModal.module.scss'

const ComparisionModal = ({ isCompareMode }: { isCompareMode: boolean }) => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div
			className={`${styles.modal} ${isCompareMode ? styles['modal--comparision'] : ''}`}
		>
			<div className={styles['modal__title']}>
				{isCompareMode
					? translations.summary.conf_tabs.compar_conf
					: translations.summary.conf_tabs.your_conf}
			</div>
			<div className={styles.content}>
				<CharacteristicOverview
					isComparision={isCompareMode}
					filterDifferenceEnabled={isCompareMode}
				/>
			</div>
		</div>
	)
}

export default ComparisionModal
