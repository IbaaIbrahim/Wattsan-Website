import Carousel from '@components/ui/carousel/Carousel'
import { useLang } from '@hooks/useLang'
import { CarouselItem } from '@my-types/carouselItem'
import { ILanguage } from '@my-types/languages'

import styles from './MediaModal.module.scss'

const MediaModal = ({
	items,
	isVideoModal
}: {
	items: CarouselItem[]
	isVideoModal?: boolean
}) => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.view}>
			<div>
				<div className={styles['modal__title']}>
					{isVideoModal
						? translations.view_videos_title
						: translations.view_photos_title}
				</div>
				<div className={styles['category']}>CNC Router Machine</div>
				<div className={styles['machine-name']}>M1 6090 modified</div>
			</div>
			<div className={styles['modal__content']}>
				<Carousel
					items={items}
					maxImageSize={725}
				/>
			</div>
		</div>
	)
}

export default MediaModal
