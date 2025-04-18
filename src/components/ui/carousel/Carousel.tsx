import { CarouselItem } from '@my-types/carouselItem'
import arrowSrc from '@public/img/icons/arrow-left.svg'
import { utilsService } from '@services/utils.service'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import VideoPlayer from '../video-player/VideoPlayer'

import styles from './Carousel.module.scss'

type ItemsWithOrder = {
	content: CarouselItem
	order: number
	collapse: boolean
	expand: boolean
}

const Carousel = ({
	items,
	maxImageSize
}: {
	items: CarouselItem[]
	maxImageSize?: number
}) => {
	const [carouselItems, setCarouselItems] = useState<ItemsWithOrder[]>([])
	const [itemWidth, setItemWidth] = useState<number>(0)
	const viewZoneRef = useRef<HTMLDivElement | null>(null)

	let goNextTimeout: NodeJS.Timeout
	let goPrevTimeout: NodeJS.Timeout

	const animationTime: number = 200
	const paddingValue: number = 16

	const goNext = (): void => {
		clearTimeout(goNextTimeout)
		setCarouselItems(prevs => {
			let updatedItems = prevs.map((item, index) => {
				let newItem = { ...item, collapse: false }
				if (item.order === 1) {
					newItem.collapse = true
				}
				return newItem
			})
			return updatedItems
		})

		goNextTimeout = setTimeout(() => {
			setCarouselItems(prevs => {
				let reorderedItems = prevs.map(prev => {
					let reordered = { ...prev, collapse: false }
					reordered.order = prev.order - 1
					if (reordered.order < 1) {
						reordered.order = prevs.length
					}
					return reordered
				})
				return reorderedItems
			})
		}, animationTime - 50)
	}

	const goPrev = (): void => {
		clearTimeout(goPrevTimeout)
		setCarouselItems(prevs =>
			prevs.map(prev => {
				let reordered = { ...prev }
				reordered.order = prev.order + 1
				if (reordered.order > prevs.length) {
					reordered.order = 1
					reordered.expand = true
				}
				return reordered
			})
		)

		goPrevTimeout = setTimeout(() => {
			setCarouselItems(prevs => prevs.map(prev => ({ ...prev, expand: false })))
		}, animationTime)
	}

	const debauncedHandleNext = useCallback(
		utilsService.debounce(goNext, animationTime / 2),
		[]
	)
	const debauncedHandlePrev = useCallback(
		utilsService.debounce(goPrev, animationTime / 2),
		[]
	)

	const getTransformValue = (): string => {
		const centerIndex = Math.ceil(items.length / 2) - 1
		return `translateX(-${centerIndex * (itemWidth + paddingValue * 2) + paddingValue}px)`
	}

	useEffect(() => {
		if (items.length > 2) {
			setCarouselItems(
				[
					...items.slice(items.length - Math.ceil(items.length / 2)),
					...items.slice(0, -Math.ceil(items.length / 2))
				].map((item, index) => ({
					content: item,
					order: index + 1,
					collapse: false,
					expand: false
				}))
			)
		} else {
			setCarouselItems(
				[
					...items.slice(items.length - Math.ceil(items.length / 2)),
					...items.slice(0, -Math.ceil(items.length / 2))
				].map((item, index) => ({
					content: item,
					order: index + 1,
					collapse: false,
					expand: false
				}))
			)
		}
	}, [items])

	useEffect(() => {
		return () => {
			clearTimeout(goPrevTimeout)
			clearTimeout(goNextTimeout)
		}
	}, [])

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			if (viewZoneRef.current) {
				setItemWidth(viewZoneRef.current.offsetWidth)
			}
		})

		if (viewZoneRef.current) {
			resizeObserver.observe(viewZoneRef.current)
		}

		return () => {
			resizeObserver.disconnect()
		}
	}, [carouselItems])

	console.log('carouselItems', carouselItems)

	return (
		<div className={styles.carousel}>
			<style jsx>{`
				@keyframes expand {
					from {
						width: 0;
						padding: 0;
					}
					to {
						padding: 0 ${paddingValue}px;
						width: ${itemWidth}px;
					}
				}

				@keyframes collapse {
					from {
						width: ${itemWidth}px;
						padding: 0 ${paddingValue}px;
					}
					to {
						width: 0;
						padding: 0;
					}
				}
				.collapse {
					animation-duration: ${animationTime / 1000}s;
					animation-name: collapse;
					will-change: width, padding;
				}

				.expand {
					animation-duration: ${animationTime / 1000}s;
					animation-name: expand;
					will-change: width, padding;
				}
			`}</style>
			<div
				className={styles['carousel__view-zone']}
				style={maxImageSize ? { maxWidth: `${maxImageSize}px` } : {}}
				ref={viewZoneRef}
			>
				<div
					className={styles['carousel-items']}
					style={{
						transform: getTransformValue()
					}}
				>
					{items.length ? (
						carouselItems.map((item, index) => (
							<div
								key={index}
								className={`${styles['carousel-item']} 
									${item.collapse ? 'collapse' : ''}
									${item.expand ? 'expand' : ''}`}
								style={{ order: item.order, width: `${itemWidth}px` }}
							>
								{!item.content.isVideo ? (
									<Image
										className={styles['carousel-item__media']}
										src={item.content.url}
										alt={item.content.placeholder || 'carousel image'}
										width={920}
										height={600}
									/>
								) : (
									<div className={styles['carousel-item__media']}>
										<VideoPlayer
											videoSrc={item.content.url}
											posterSrc={item.content.videoPoster || ''}
										/>
									</div>
								)}
							</div>
						))
					) : (
						<span>No images or video was provided</span>
					)}
				</div>
			</div>
			{carouselItems.length > 1 && (
				<div className={styles['carousel__panel']}>
					<button
						className={styles['go-to-prev']}
						onClick={debauncedHandlePrev}
					>
						<Image
							className={styles['go-to-prev__img']}
							src={arrowSrc}
							alt='Go to prev'
						/>
					</button>
					<button
						className={styles['go-to-next']}
						onClick={debauncedHandleNext}
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
