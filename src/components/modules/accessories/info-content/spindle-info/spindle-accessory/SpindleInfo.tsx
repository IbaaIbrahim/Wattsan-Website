import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import Image from 'next/image'

import styles from './SpindleInfo.module.scss'
import SpindleCooling from './cooling/SpindleCooling'
import SpindleOverview from './overview/SpindleOverview'
import SpindlePlateType from './plate-type/SpindlePlateType'
import SpindlePower from './power/SpindlePower'
import SpindleQuantity from './quantity/SpindleQuantity'
import SpindleSlider from './slider/SpindleSlider'
import SpindleStructure from './structure/SpindleStructure'
import SpindleVideo from './video/SpindleVideo'

const SpindleInfo = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<>
			<div className={styles.section}>
				<SpindleOverview />
			</div>
			<div className={`${styles.section} ${styles.slider}`}>
				<SpindleSlider />
			</div>
			<div className={styles.section}>
				<SpindlePower />
			</div>
			<div className={styles.section}>
				<SpindleQuantity />
			</div>
			<div className={styles.section}>
				<SpindlePlateType />
			</div>
			<div className={styles.section}>
				<SpindleStructure />
			</div>
			<div className={styles.section}>
				<SpindleVideo />
			</div>
			<div className={styles.section}>
				<SpindleCooling />
			</div>

			<div className={`${styles.section} ${styles['spindle-images']}`}>
				<div className={styles['spindle-images__item']}>
					<Image
						className={styles['spindle-img']}
						src='/img/spindle-info/spindle-one-side.svg'
						alt='Spindle'
						width={520}
						height={300}
					/>
					<span className={styles.label}>
						{translations.spindle_info.imgs_label}
					</span>
				</div>
				<div className={styles['spindle-images__item']}>
					<Image
						className={styles['spindle-img']}
						src='/img/spindle-info/spindle-other-side.svg'
						alt='Spindle'
						width={520}
						height={300}
					/>
					<span className={styles.label}>
						{translations.spindle_info.imgs_label}
					</span>
				</div>
			</div>
			<div className={`info-container  ${styles.info}`}>
				{translations.spindle_info.info_block}
			</div>
		</>
	)
}

export default SpindleInfo
