'use client'

import React, { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { OnProgressProps } from 'react-player/base'
import styles from './VideoPlayer.module.scss'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export const getYouTubeEmbedUrl = (url?: string): string | null => {
	if (!url || typeof url !== 'string') return null
	const trimmed = url.trim()
	const match = trimmed.match(
		/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
	)
	if (match && match[1]) {
		return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`
	}
	return null
}

export const getVimeoEmbedUrl = (url?: string): string | null => {
	if (!url || typeof url !== 'string') return null
	const match = url.trim().match(/(?:vimeo\.com\/)(\d+)/i)
	if (match && match[1]) {
		return `https://player.vimeo.com/video/${match[1]}?autoplay=1`
	}
	return null
}

interface VideoPlayerProps {
	videoSrc: string
	posterSrc?: string
	autoPlay?: boolean
	controls?: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
	videoSrc,
	posterSrc,
	autoPlay = true,
	controls = true
}) => {
	const [playing, setPlaying] = useState(autoPlay)
	const [played, setPlayed] = useState(0)
	const [isMounted, setIsMounted] = useState(false)
	const videoPlayerRef = useRef(null)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const ytEmbed = getYouTubeEmbedUrl(videoSrc)
	const vimeoEmbed = getVimeoEmbedUrl(videoSrc)

	// If it's a YouTube video, use standard embed for guaranteed playback, controls and autoplay
	if (ytEmbed) {
		return (
			<div className={styles.container}>
				<iframe
					src={ytEmbed}
					title="YouTube video player"
					className={styles.iframePlayer}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				/>
			</div>
		)
	}

	// If it's a Vimeo video, use Vimeo player iframe
	if (vimeoEmbed) {
		return (
			<div className={styles.container}>
				<iframe
					src={vimeoEmbed}
					title="Vimeo video player"
					className={styles.iframePlayer}
					allow="autoplay; fullscreen; picture-in-picture"
					allowFullScreen
				/>
			</div>
		)
	}

	// For direct video files (.mp4, .webm, etc.) before client mount
	if (!isMounted) {
		return (
			<div className={styles.container}>
				{posterSrc && (
					<img
						src={posterSrc}
						alt="Video Poster"
						className={styles.poster}
					/>
				)}
			</div>
		)
	}

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
				controls={controls}
				width="100%"
				height="100%"
				onPlay={handleStart}
				onPause={handlePause}
				onProgress={handleProgress}
			/>
			{!playing && posterSrc && played === 0 && (
				<img
					src={posterSrc}
					alt="Video Poster"
					className={styles.poster}
					onClick={handlePlayPause}
				/>
			)}
			{!playing && (
				<button
					type="button"
					aria-label="Play video"
					onClick={handlePlayPause}
					className={styles['play-control']}
				/>
			)}
		</div>
	)
}

export default VideoPlayer
