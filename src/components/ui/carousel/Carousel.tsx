import { CarouselItem } from '@my-types/carouselItem'
import arrowSrc from '@public/img/icons/arrow-left.svg'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import Image from 'next/image'
import { ReactNode, useCallback, useEffect, useState } from 'react'

import VideoPlayer from '../video-player/VideoPlayer'

import styles from './Carousel.module.scss'

interface CarouselProps<T = CarouselItem> {
	items: T[]
	maxImageSize?: number
	renderItem?: (item: T, index: number) => ReactNode
	itemWidth?: number
	hideNavigation?: boolean
	loop?: boolean
	autoplay?: boolean
	autoplayDelay?: number
	align?: 'start' | 'center' | 'end'
}

const Carousel = <T extends CarouselItem | any = CarouselItem>({
	items,
	maxImageSize,
	renderItem,
	itemWidth,
	hideNavigation = false,
	loop = true,
	autoplay = false,
	autoplayDelay = 4000,
	align = 'center'
}: CarouselProps<T>) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop,
			align,
			containScroll: 'trimSnaps',
			dragFree: true
		},
		[
			...(autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })] : []),
			WheelGesturesPlugin()
		]
	)

	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

	const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
	const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

	const onSelect = useCallback(() => {
		if (!emblaApi) return
		setPrevBtnEnabled(emblaApi.canScrollPrev())
		setNextBtnEnabled(emblaApi.canScrollNext())
	}, [emblaApi])

	useEffect(() => {
		if (!emblaApi) return
		onSelect()
		emblaApi.on('select', onSelect)
		emblaApi.on('reInit', onSelect)
	}, [emblaApi, onSelect])

	return (
		<div className={styles.carousel}>
			<div
				className={styles['carousel__view-zone']}
				ref={emblaRef}
				style={{
					...(maxImageSize ? { maxWidth: `${maxImageSize}px` } : {})
				}}
			>
				<div
					className={styles['carousel-items']}
					style={{
						// If itemWidth is provided, we can pass it via CSS variable or handle in SCSS
						// For Embla, the flex-basis of the item usually defines the width
					}}
				>
					{items.length ? (
						items.map((item, index) => (
							<div
								key={index}
								className={styles['carousel-item']}
								style={{
									flex: itemWidth ? `0 0 ${itemWidth}px` : '0 0 100%',
									minWidth: 0 // Crucial for Embla
								}}
							>
								{renderItem ? (
									renderItem(item, index)
								) : (
									<div className={styles['carousel-item__media-wrapper']}>
										{!(item as CarouselItem).isVideo ? (
											<Image
												className={styles['carousel-item__media']}
												src={(item as CarouselItem).url}
												alt={(item as CarouselItem).placeholder || 'carousel image'}
												width={920}
												height={600}
											/>
										) : (
											<div className={styles['carousel-item__media']}>
												<VideoPlayer
													videoSrc={(item as CarouselItem).url}
													posterSrc={(item as CarouselItem).videoPoster || ''}
												/>
											</div>
										)}
									</div>
								)}
							</div>
						))
					) : (
						<div className={styles['carousel-empty']}>No items were provided</div>
					)}
				</div>
			</div>

			{!hideNavigation && items.length > 1 && (
				<div className={styles['carousel__panel']}>
					<button
						className={styles['go-to-prev']}
						onClick={scrollPrev}
						disabled={!prevBtnEnabled && !loop}
						aria-label="Go to previous item"
						title="Go to previous item"
					>
						<Image
							className={styles['go-to-prev__img']}
							src={arrowSrc}
							alt='Go to prev'
						/>
					</button>
					<button
						className={styles['go-to-next']}
						onClick={scrollNext}
						disabled={!nextBtnEnabled && !loop}
						aria-label="Go to next item"
						title="Go to next item"
					>
						<Image
							className={styles['go-to-next__img']}
							src={arrowSrc}
							alt='Go to next'
						/>
					</button>
				</div>
			)}
		</div>
	)
}

export default Carousel
