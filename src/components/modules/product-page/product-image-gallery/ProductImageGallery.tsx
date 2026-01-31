'use client'

import { FC, useState } from 'react'
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

	return (
		<div className={styles.gallery}>
			<div className={styles.thumbnails}>
				{thumbnails.length > 0 && (
					<div
						className={clsx(styles.thumbnail, selectedImage === mainImage && styles.active)}
						onClick={() => setSelectedImage(mainImage)}
					>
					<Image
						src={mainImage}
						alt='Product thumbnail'
						fill
						sizes='80px'
						style={{ objectFit: 'cover' }}
					/>
					</div>
				)}
				{hasVideo && (
					<button className={styles.videoButton} onClick={onVideoClick}>
						<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M8 5V19L19 12L8 5Z'
								fill='currentColor'
							/>
						</svg>
					</button>
				)}
				{thumbnails.slice(0, 3).map((thumb, index) => (
					<div
						key={index}
						className={clsx(styles.thumbnail, selectedImage === thumb && styles.active)}
						onClick={() => setSelectedImage(thumb)}
					>
						<Image
							src={thumb}
							alt={`Product thumbnail ${index + 1}`}
							fill
							sizes='80px'
							style={{ objectFit: 'cover' }}
						/>
					</div>
				))}
			</div>
			<div className={styles.mainImageContainer}>
				{badge && (
					<div className={styles.badge}>
						<Typography tag='p' size='s' weight='semi-bold'>
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
						<button className={styles.control360} onClick={on360ViewClick}>
							<span className={styles.control360Text}>360</span>
							<div className={styles.control360Arrows}>
								<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
									<path d='M10 4L6 8L10 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
								</svg>
								<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
									<path d='M6 4L10 8L6 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
								</svg>
							</div>
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductImageGallery
