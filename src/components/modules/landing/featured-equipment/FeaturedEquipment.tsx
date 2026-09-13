'use client'

import Button from '@components/ui/button/Button'
import { authStore } from '@store/auth'
import { createBasket } from '@store/basket/actions'
import { modalsStore } from '@store/modals'
import { MODALS } from '@components/ui/modal/Modal'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useRef, useState } from 'react'

import styles from './FeaturedEquipment.module.scss'

export interface EquipmentItem {
	id: string | number
	code: string
	category: string
	status: 'in_stock' | 'pre_order'
	priceExclVat: string
	preOrderPrice: string
	oldPrice?: string
	rating: string
	warranty: string
	imgSrc: string
	isNew?: boolean
	discountBadge?: string
	productUrl: string
}

const NEW_ARRIVALS: EquipmentItem[] = [
	{
		id: '1',
		code: 'WATTSAN micro 0203',
		category: 'CO2 Laser Machine',
		status: 'in_stock',
		priceExclVat: '$2,380',
		preOrderPrice: '$2,580',
		rating: '4.9',
		warranty: 'Mandatory 1-year warranty',
		imgSrc: '/img/grid-machines/Mini.png',
		isNew: true,
		productUrl: '/product/1'
	},
	{
		id: '2',
		code: 'ZERDER MINI 2030',
		category: 'Compact CO2 Laser',
		status: 'in_stock',
		priceExclVat: '$2,380',
		preOrderPrice: '$2,580',
		rating: '4.9',
		warranty: 'Mandatory 1-year warranty',
		imgSrc: '/img/grid-machines/Mini-Cabine.png',
		isNew: false,
		productUrl: '/product/2'
	},
	{
		id: '3',
		code: 'ZERDER MINI 2030 TABLET',
		category: 'Benchtop Laser',
		status: 'pre_order',
		priceExclVat: '$2,580',
		preOrderPrice: '$2,880',
		rating: '4.9',
		warranty: 'Mandatory 1-year warranty',
		imgSrc: '/img/grid-machines/M1-S.png',
		isNew: true,
		productUrl: '/product/laser-co2'
	},
	{
		id: '4',
		code: 'WATTSAN 0503',
		category: 'Precision CO2 Laser',
		status: 'in_stock',
		priceExclVat: '$3,810',
		preOrderPrice: '$4,100',
		rating: '4.9',
		warranty: 'Mandatory 1-year warranty',
		imgSrc: '/img/grid-machines/icon-for-mini-equipment.png',
		isNew: false,
		productUrl: '/product/1'
	},
	{
		id: '5',
		code: 'WATTSAN 6040 ST',
		category: 'Medium Format Laser',
		status: 'in_stock',
		priceExclVat: '$5,000',
		preOrderPrice: '$5,400',
		rating: '4.9',
		warranty: 'Mandatory 1-year warranty',
		imgSrc: '/img/grid-machines/icon-for-m1-equipment.png',
		isNew: true,
		productUrl: '/product/2'
	},
	{
		id: '6',
		code: 'WATTSAN A1 1325',
		category: 'CNC Milling Router',
		status: 'pre_order',
		priceExclVat: '$9,500',
		preOrderPrice: '$10,200',
		rating: '5.0',
		warranty: 'Mandatory 2-year warranty',
		imgSrc: '/img/grid-machines/icon-for-a1-equipment.png',
		isNew: false,
		productUrl: '/product/cnc-router'
	}
]

export const FeaturedEquipment: FC = () => {
	const sliderRef = useRef<HTMLDivElement>(null)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(true)

	const checkScroll = () => {
		if (!sliderRef.current) return
		const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
		setCanScrollLeft(scrollLeft > 10)
		setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
	}

	const scroll = (direction: 'left' | 'right') => {
		if (!sliderRef.current) return
		const scrollAmount = 360
		sliderRef.current.scrollBy({
			left: direction === 'right' ? scrollAmount : -scrollAmount,
			behavior: 'smooth'
		})
		setTimeout(checkScroll, 300)
	}

	const handleAddToCart = async (e: React.MouseEvent, item: EquipmentItem) => {
		e.stopPropagation()
		e.preventDefault()
		const authorized = authStore.get.authorized()
		const refId = parseInt(String(item.id).replace(/\D/g, ''), 10) || 1
		const rawPrice = parseFloat(item.priceExclVat.replace(/[^\d.]/g, '')) || 2380

		if (authorized) {
			await createBasket({
				referenceId: refId,
				itemtype: 2,
				quantity: 1,
				itemData: {
					title: item.code,
					categoryName: item.category,
					price: rawPrice,
					image: item.imgSrc
				}
			})
			modalsStore.set.open(MODALS.infoModal, {
				title: `${item.code} added to basket`
			})
		} else {
			modalsStore.set.open(MODALS.login, {
				initialScreen: 'LOGIN',
				closeOnEscape: false,
				onComplete: () => {
					createBasket({
						referenceId: refId,
						itemtype: 2,
						quantity: 1,
						itemData: {
							title: item.code,
							categoryName: item.category,
							price: rawPrice,
							image: item.imgSrc
						}
					})
				}
			})
		}
	}

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2 className={styles.title}>New Equipment Arrivals</h2>
					<Button
						href='/configurator'
						view='bordered'
						size='m'
						className={styles.viewAllBtn}
					>
						View all equipment
					</Button>
				</div>

				<div className={styles.sliderWrapper}>
					{canScrollLeft && (
						<button
							className={`${styles.sliderArrow} ${styles.leftArrow}`}
							onClick={() => scroll('left')}
							aria-label='Scroll left'
						>
							<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
								<path
									d='M10 13L5 8L10 3'
									stroke='#3E1EB5'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					)}

					<div
						ref={sliderRef}
						className={styles.cardsTrack}
						onScroll={checkScroll}
					>
						{NEW_ARRIVALS.map(item => (
							<article key={item.id} className={styles.card}>
								{item.isNew && <span className={styles.newBadge}>NEW</span>}

								<div className={styles.imageBox}>
									<Image
										src={item.imgSrc}
										alt={item.code}
										width={260}
										height={200}
										className={styles.image}
									/>
								</div>

								<div className={styles.content}>
									<div className={styles.statusRow}>
										<span
											className={`${styles.statusPill} ${item.status === 'in_stock' ? styles.inStock : styles.preOrder}`}
										>
											<span className={styles.statusDot} />
											{item.status === 'in_stock' ? 'In stock' : 'Pre-order'}
										</span>
									</div>

									<h3 className={styles.modelCode}>
										<Link href={item.productUrl}>{item.code}</Link>
									</h3>

									<div className={styles.pricesGrid}>
										<div className={styles.priceCol}>
											<span className={styles.priceLabel}>Price excl. VAT</span>
											<span className={styles.priceVal}>{item.priceExclVat}</span>
										</div>
										<div className={styles.priceCol}>
											<span className={styles.priceLabel}>Pre-order price</span>
											<span className={styles.preOrderVal}>{item.preOrderPrice}</span>
										</div>
									</div>

									<div className={styles.actionsRow}>
										<Button
											href={item.productUrl}
											view='blue'
											size='m'
											className={styles.learnMoreBtn}
										>
											Learn more
										</Button>
										<button
											type='button'
											className={styles.cartBtn}
											onClick={e => handleAddToCart(e, item)}
											aria-label='Add to cart'
										>
											<svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
												<path
													d='M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z'
													stroke='#3E1EB5'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
												<path
													d='M3 6H21'
													stroke='#3E1EB5'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
												<path
													d='M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10'
													stroke='#3E1EB5'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
											</svg>
										</button>
									</div>

									<div className={styles.cardFooter}>
										<div className={styles.ratingBox}>
											<span className={styles.star}>★</span>
											<span>{item.rating}</span>
										</div>
										<div className={styles.warrantyBox}>
											<span className={styles.warrantyCheck}>✓</span>
											<span>{item.warranty}</span>
										</div>
									</div>
								</div>
							</article>
						))}
					</div>

					{canScrollRight && (
						<button
							className={`${styles.sliderArrow} ${styles.rightArrow}`}
							onClick={() => scroll('right')}
							aria-label='Scroll right'
						>
							<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
								<path
									d='M6 3L11 8L6 13'
									stroke='#3E1EB5'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					)}
				</div>
			</div>
		</section>
	)
}

export default FeaturedEquipment
