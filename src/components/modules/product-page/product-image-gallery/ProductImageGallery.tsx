'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Typography } from '@components/ui/typography/Typography'

import styles from './ProductImageGallery.module.scss'

interface ProductImageGalleryProps {
	mainImage: string
	thumbnails?: string[]
	hasVideo?: boolean
	has360View?: boolean
	badge?: string
	onVideoClick?: () => void
	on360ViewClick?: () => void
}

const ProductImageGallery: FC<ProductImageGalleryProps> = ({
	mainImage,
	thumbnails = [],
	hasVideo = false,
	has360View = false,
	badge,
	onVideoClick,
	on360ViewClick
}) => {
	const [selectedImage, setSelectedImage] = useState(mainImage)
	const [selectedIndex, setSelectedIndex] = useState(0)

	useEffect(() => {
		setSelectedImage(mainImage)
		setSelectedIndex(0)
	}, [mainImage])

	const validThumbnails = (thumbnails && thumbnails.length > 0)
		? thumbnails
		: (mainImage ? [mainImage] : [])

	const firstThumb = validThumbnails[0]
	const remainingThumbs = validThumbnails.slice(1, 4)

	return (
		<div className={styles.gallery}>
			<div className={styles.thumbnails}>
				{firstThumb && (
					<div
						className={clsx(styles.thumbnail, selectedIndex === 0 && styles.active)}
						onClick={() => {
							setSelectedImage(firstThumb)
							setSelectedIndex(0)
						}}
					>
						<Image
							src={firstThumb}
							alt='Product thumbnail 1'
							fill
							sizes='70px'
							style={{ objectFit: 'contain' }}
						/>
					</div>
				)}
				{hasVideo && (
					<button className={styles.videoButton} onClick={onVideoClick} type='button' aria-label='Play video'>
						<svg width='70' height='70' viewBox='0 0 70 70' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path d='M24 50V23L50 35.913L24 50Z' fill='black' />
						</svg>
					</button>
				)}
				{remainingThumbs.map((thumb, index) => {
					const thumbIdx = index + 1
					return (
						<div
							key={thumbIdx}
							className={clsx(styles.thumbnail, selectedIndex === thumbIdx && styles.active)}
							onClick={() => {
								setSelectedImage(thumb)
								setSelectedIndex(thumbIdx)
							}}
						>
							<Image
								src={thumb}
								alt={`Product thumbnail ${thumbIdx + 1}`}
								fill
								sizes='70px'
								style={{ objectFit: 'contain' }}
							/>
						</div>
					)
				})}
			</div>
			<div className={styles.mainImageContainer}>
				{badge && (
					<div className={styles.badge}>
						<Typography tag='p' size='s' weight='regular'>
							{badge}
						</Typography>
					</div>
				)}
				<div className={styles.mainImage}>
					<Image
						src={selectedImage}
						alt='Product main image'
						fill
						sizes='(max-width: 968px) 100vw, (max-width: 1200px) 50vw, 33vw'
						style={{ objectFit: 'contain' }}
					/>
				</div>
				{has360View && (
					<div className={styles.controls360}>
						<button className={styles.control360} onClick={on360ViewClick} type='button' aria-label='360 view'>
							<svg width='144' height='30' viewBox='0 0 144 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path d='M20.3086 11.5323C22.1888 12.6813 23.059 14.6413 25.1247 15.5333C27.8013 16.6891 30.0408 17.7119 32.9786 18.0525C37.5194 18.579 42.4181 18.8675 46.9822 18.8675' stroke='black' strokeWidth='3' strokeLinecap='round' />
								<path d='M18.9749 12.1991C20.4457 12.8528 21.8974 17.8875 22.3091 19.5343' stroke='black' strokeWidth='3' strokeLinecap='round' />
								<path d='M20.3086 11.5323C23.2902 11.5323 26.1297 10.8654 28.9775 10.8654' stroke='black' strokeWidth='3' strokeLinecap='round' />
								<path d='M105.664 17.5338C112.399 17.7209 119.672 18.863 125.002 13.5328' stroke='black' strokeWidth='3' strokeLinecap='round' />
								<path d='M118.334 12.1991H125.002' stroke='black' strokeWidth='3' strokeLinecap='round' />
								<path d='M125.002 15.5333C125.002 18.1548 125.141 20.6596 123.669 22.8686' stroke='black' strokeWidth='3' strokeLinecap='round' />
								<text x='75.5' y='20' textAnchor='middle' fill='black' fontFamily='Roboto, sans-serif' fontSize='15' fontWeight='600'>360</text>
							</svg>
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductImageGallery

