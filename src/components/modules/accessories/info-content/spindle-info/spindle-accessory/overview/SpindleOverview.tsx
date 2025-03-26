import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import overviewSrc from '@public/img/spindle-info/overview.svg'
import Image from 'next/image'

import styles from './SpindleOverview.module.scss'

const SpindleOverview = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.overview}>
			<span className={styles['overview__title']}>
				{translations.spindle_info.overview.title}
			</span>
			<div className={`${styles['overview__content']} ${styles.content}`}>
				<p className={styles['content__description']}>
					{translations.spindle_info.overview.description}
				</p>
				<Image
					width={220}
					height={220}
					src={overviewSrc}
					alt='Spindle'
					className={styles['content__image']}
				/>
			</div>
		</div>
	)
}

export default SpindleOverview
