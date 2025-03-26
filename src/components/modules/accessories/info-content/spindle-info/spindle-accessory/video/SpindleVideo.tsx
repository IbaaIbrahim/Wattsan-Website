import VideoPlayer from '@components/ui/video-player/VideoPlayer'
import { useLang } from '@hooks/useLang'
import { ILanguage } from '@my-types/languages'

import styles from './SpindleVideo.module.scss'

const SpindleVideo = () => {
	const { translations }: { translations: ILanguage } = useLang()

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				{translations.spindle_info.video.title}
			</div>
			<div className={styles['video-container']}>
				<VideoPlayer
					videoSrc={'/videos/sample.mp4'}
					posterSrc={'/img/spindle-info/video-poster/spindle-poster.svg'}
				/>
			</div>
			<span className={`info-container  ${styles['info-block']}`}>
				{translations.spindle_info.video.info}
			</span>
		</div>
	)
}

export default SpindleVideo
