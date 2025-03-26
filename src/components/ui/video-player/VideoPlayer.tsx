'use client'

import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'

import styles from './VideoPlayer.module.scss'

const VideoPlayer = ({
	videoSrc,
	posterSrc
}: {
	videoSrc: string
	posterSrc?: string
}) => {
	const [playing, setPlaying] = useState(false)
	const [played, setPlayed] = useState(0)
	const videoPlayerRef = useRef(null)

	const handlePlayPause = () => {
		setPlaying(!playing)
	}

	const handleStart = () => {
		setPlaying(true)
	}

	const handlePause = () => {
		setPlaying(false)
	}

	const handleProgress = (state: OnProgressProps) => {
		setPlayed(state.played)
	}

	return (
		<div className={styles.container}>
			<ReactPlayer
				ref={videoPlayerRef}
				className={styles.player}
				url={videoSrc}
				playing={playing}
				controls={true}
				width='100%'
				height='100%'
				onPlay={handleStart}
				onPause={handlePause}
				onProgress={handleProgress}
			/>
			{!playing && posterSrc && played === 0 && (
				<img
					src={posterSrc}
					alt='Video Poster'
					className={styles.poster}
					onClick={handlePlayPause}
				/>
			)}
			{!playing && (
				<button
					onClick={handlePlayPause}
					className={styles['play-control']}
				></button>
			)}
		</div>
	)
}

export default VideoPlayer
