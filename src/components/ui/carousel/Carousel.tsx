import { CarouselItem } from '@my-types/carouselItem'
import arrowSrc from '@public/img/icons/arrow-left.svg'
import { utilsService } from '@services/utils.service'
import Image from 'next/image'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import VideoPlayer from '../video-player/VideoPlayer'

import styles from './Carousel.module.scss'

type ItemsWithOrder<T = CarouselItem> = {
	content: T
	order: number
	collapse: boolean
	expand: boolean
}

interface CarouselProps<T = CarouselItem> {
	items: T[]
	maxImageSize?: number
	renderItem?: (item: T, index: number) => ReactNode
	itemWidth?: number
	hideNavigation?: boolean
	enableSwipe?: boolean
	enableDrag?: boolean
	swipeThreshold?: number
}

const Carousel = <T extends CarouselItem | any = CarouselItem>({
	items,
	maxImageSize,
	renderItem,
	itemWidth: fixedItemWidth,
	hideNavigation = false,
	enableSwipe = true,
	enableDrag = true,
	swipeThreshold = 50
}: CarouselProps<T>) => {
	const [carouselItems, setCarouselItems] = useState<ItemsWithOrder<T>[]>([])
	const [itemWidth, setItemWidth] = useState<number>(fixedItemWidth || 0)
	const viewZoneRef = useRef<HTMLDivElement | null>(null)
	const itemsContainerRef = useRef<HTMLDivElement | null>(null)
	
	// Touch/Drag state
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [currentX, setCurrentX] = useState(0)
	const [dragOffset, setDragOffset] = useState(0)

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
		const baseTransform = centerIndex * (itemWidth + paddingValue * 2) + paddingValue
		return `translateX(${-baseTransform + dragOffset}px)`
	}

	// Touch/Drag handlers
	const handleStart = (clientX: number) => {
		if (!enableSwipe && !enableDrag) return
		setIsDragging(true)
		setStartX(clientX)
		setCurrentX(clientX)
		setDragOffset(0)
	}

	const handleMove = (clientX: number) => {
		if (!isDragging) return
		const diff = clientX - startX
		setCurrentX(clientX)
		setDragOffset(diff)
	}

	const handleEnd = () => {
		if (!isDragging) return
		const diff = currentX - startX
		
		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				goPrev()
			} else {
				goNext()
			}
		}
		
		setIsDragging(false)
		setDragOffset(0)
		setStartX(0)
		setCurrentX(0)
	}

	// Mouse handlers
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!enableDrag) return
		e.preventDefault()
		handleStart(e.clientX)
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !enableDrag) return
		handleMove(e.clientX)
	}

	const handleMouseUp = () => {
		if (!isDragging) return
		handleEnd()
	}

	// Touch handlers
	const handleTouchStart = (e: React.TouchEvent) => {
		if (!enableSwipe) return
		const touch = e.touches[0]
		handleStart(touch.clientX)
	}

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging || !enableSwipe) return
		const touch = e.touches[0]
		handleMove(touch.clientX)
	}

	const handleTouchEnd = () => {
		if (!isDragging) return
		handleEnd()
	}

	useEffect(() => {
		if (items.length > 2) {
			setCarouselItems(
				[
					...items.slice(items.length - Math.ceil(items.length / 2) + 1),
					...items.slice(0, -Math.ceil(items.length / 2) + 1)
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
					...items.slice(items.length - Math.ceil(items.length / 2) + 1),
					...items.slice(0, -Math.ceil(items.length / 2) + 1)
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
		if (fixedItemWidth) {
			setItemWidth(fixedItemWidth)
			return
		}

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
	}, [carouselItems, fixedItemWidth])

	// Global mouse event listeners for drag
	useEffect(() => {
		if (!isDragging || !enableDrag) return

		const handleGlobalMouseMove = (e: MouseEvent) => {
			if (!isDragging) return
			const diff = e.clientX - startX
			setCurrentX(e.clientX)
			setDragOffset(diff)
		}

		const handleGlobalMouseUp = () => {
			if (!isDragging) return
			const diff = currentX - startX
			
			if (Math.abs(diff) > swipeThreshold) {
				if (diff > 0) {
					goPrev()
				} else {
					goNext()
				}
			}
			
			setIsDragging(false)
			setDragOffset(0)
			setStartX(0)
			setCurrentX(0)
		}

		window.addEventListener('mousemove', handleGlobalMouseMove)
		window.addEventListener('mouseup', handleGlobalMouseUp)

		return () => {
			window.removeEventListener('mousemove', handleGlobalMouseMove)
			window.removeEventListener('mouseup', handleGlobalMouseUp)
		}
	}, [isDragging, enableDrag, startX, currentX, swipeThreshold])

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
				ref={viewZoneRef}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				style={{
					cursor: enableDrag && !hideNavigation ? (isDragging ? 'grabbing' : 'grab') : 'default',
					userSelect: 'none',
					...(maxImageSize ? { maxWidth: `${maxImageSize}px` } : {})
				}}
			>
				<div
					ref={itemsContainerRef}
					className={styles['carousel-items']}
					style={{
						transform: getTransformValue(),
						transition: isDragging ? 'none' : `transform ${animationTime}ms ease-out`
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
								{renderItem ? (
									renderItem(item.content, index)
								) : (
									<>
										{!(item.content as CarouselItem).isVideo ? (
											<Image
												className={styles['carousel-item__media']}
												src={(item.content as CarouselItem).url}
												alt={(item.content as CarouselItem).placeholder || 'carousel image'}
												width={920}
												height={600}
											/>
										) : (
											<div className={styles['carousel-item__media']}>
												<VideoPlayer
													videoSrc={(item.content as CarouselItem).url}
													posterSrc={(item.content as CarouselItem).videoPoster || ''}
												/>
											</div>
										)}
									</>
								)}
							</div>
						))
					) : (
						<span>No items were provided</span>
					)}
				</div>
			</div>
			{!hideNavigation && carouselItems.length > 1 && (
				<div className={styles['carousel__panel']}>
					<button
						className={styles['go-to-prev']}
						onClick={debauncedHandlePrev}
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
						onClick={debauncedHandleNext}
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
