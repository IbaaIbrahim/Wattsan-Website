'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Typography } from '@components/ui/typography/Typography'

interface ModelViewerProps {
	className?: string
	src: string
	alt: string
	autoRotate?: boolean
	cameraControls?: boolean
}

interface ModelViewerJSX {
	src: string
	poster?: string
	iosSrc?: string
	seamlessPoster?: boolean
	autoplay?: boolean
	environmentImage?: string
	exposure?: string
	interactionPromptThreshold?: string
	shadowIntensity?: string
	ar?: boolean
	arModes?: string
	autoRotate?: boolean
	cameraControls?: boolean
	cameraOrbit?: string
	alt?: string
	sx?: any
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'model-viewer': ModelViewerJSX &
				React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
		}
	}
}

const ModelViewer: React.FC<ModelViewerProps> = ({
	className,
	src,
	alt,
	autoRotate,
	cameraControls
}) => {
	const [loading, setLoading] = useState(true)
	const [renderError, setRenderError] = useState(false)
	const modelViewerRef = useRef<HTMLElement>(null)

	useEffect(() => {
		import('@google/model-viewer')
	}, [])

	useEffect(() => {
		const modelViewerElement = modelViewerRef.current
		if (modelViewerElement) {
			const handleLoad = () => {
				setLoading(false)
			}

			modelViewerElement.addEventListener('load', handleLoad)

			return () => {
				modelViewerElement.removeEventListener('load', handleLoad)
			}
		}
	}, [])

	useEffect(() => {
		const modelViewerElement = modelViewerRef.current;
		if (modelViewerElement) {
			const handleError = (error) => {
				setRenderError(true)
				setLoading(false)
				console.error('Model loading error:', error);
			};

			modelViewerElement.addEventListener('error', handleError);
			return () => {
				modelViewerElement.removeEventListener('error', handleError);
			};
		}
	}, []);

	if(renderError) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Typography tag='h2'>
					No Valid image
				</Typography>
			</div>
		)
	}

	return (
		<>
			{loading && (
				<div
					className='loader'
					style={{
						position: 'absolute',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '100%',
						zIndex: 10,
						background: '#ffffff'
					}}
				>
					<Image
						src='/img/gif/gear.gif'
						alt='loading'
						width={86}
						height={86}
					/>
				</div>
			)}
			<model-viewer
				ref={modelViewerRef}
				src={src}
				alt={alt}
				auto-rotate={autoRotate}
				camera-controls={cameraControls}
			style={{
			width: '100%',
			height: '100%'
		}}
				// @ts-ignore
				// crossOrigin="anonymous"
				//@ts-ignore
				className={className}
			/>
		</>
	)
}

export default ModelViewer
