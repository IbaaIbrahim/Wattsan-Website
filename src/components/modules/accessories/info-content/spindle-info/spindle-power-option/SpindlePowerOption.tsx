import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'
import { SpindleOptionInfo } from '@my-types/spindleInfo'

import SpindlePower from '../spindle-accessory/power/SpindlePower'

import styles from './SpindlePowerOption.module.scss'

const SpindlePowerOption = ({
	content,
	value
}: {
	content: SpindleOptionInfo
	value: string
}) => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<>
			<div className={`${styles.main} ${styles.section}`}>
				<span className={styles.title}>
					{translations.accessories.parts.spindle + ' ' + value}
				</span>
				<div className={styles.description}>{content.description}</div>
				<div className={styles['pros-cons']}>
					<div className={styles['pros-cons__titles']}>
						<span className={styles['first-column']}>
							{translations.advantages}
						</span>
						<span className={styles['second-column']}>
							{translations.disadvantages}
						</span>
					</div>
					{(content.pros.length > content.cons.length
						? content.pros
						: content.cons
					).map((_, index) => (
						<div
							key={index}
							className={styles['pros-cons__values']}
						>
							<span className={styles['first-column']}>
								{content.pros[index] || ''}
							</span>
							<span className={styles['second-column']}>
								{content.cons[index] || ''}
							</span>
						</div>
					))}
				</div>
			</div>
			<div className={styles.section}>
				<SpindlePower customTitle={translations.spindle_power_option.title} />
			</div>
			<button className={`button-outline ${styles['more-btn']}`}>
				{translations.spindle_power_option.more_btn}
			</button>
		</>
	)
}

export default SpindlePowerOption
