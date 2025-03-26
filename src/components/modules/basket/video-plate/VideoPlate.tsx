'use client'

import Button from '@components/ui/button/Button'
import VideoPlayer from '@components/ui/video-player/VideoPlayer'
import playIcon from '@public/img/icons/play.svg'
import Image from 'next/image'
import { FC } from 'react'

import styles from './VideoPlate.module.scss'

const VideoPlate: FC<{ videoSrc: string; preview: string; title: string }> = ({
	videoSrc,
	preview,
	title
}) => {
	return (
		<div className={styles.plate}>
			<div className={styles.video}>
				<VideoPlayer
					videoSrc={videoSrc}
					posterSrc={preview}
				/>
			</div>
			<div className={styles.info}>
				<div className={styles.title}>{title}</div>
				<div className={styles.url}>{videoSrc}</div>
				<Button
					className={styles.action}
					href={videoSrc}
					size='l'
					view='black'
				>
					Explore our Youtube
					<Image
						src={playIcon}
						alt=''
					/>
				</Button>
			</div>
		</div>
	)
}

export default VideoPlate
