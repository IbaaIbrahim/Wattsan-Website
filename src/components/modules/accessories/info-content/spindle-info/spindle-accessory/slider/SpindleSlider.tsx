import Carousel from '@components/ui/carousel/Carousel'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'

import styles from './SpindleSlider.module.scss'

const SpindleSlider = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.slider}>
			<Carousel
				items={[
					'/img/spindle-info/slider/spindle.png',
					'/img/spindle-info/slider/example.png',
					'/img/spindle-info/slider/example.png',
					'/img/spindle-info/slider/spindle.png',
					'/img/spindle-info/slider/spindle.png'
				].map(i => ({
					url: i,
					isVideo: false,
					placeholder: i + ''
				}))}
			/>
			<span className={styles['slider__description']}>
				{translations.spindle_info.slider.description}
			</span>
		</div>
	)
}

export default SpindleSlider
