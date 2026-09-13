'use client'

import Button from '@components/ui/button/Button'
import accessories from '@public/img/catalog/accessories.png'
import cncRoutes from '@public/img/catalog/cnc-routes.png'
import hydraulicPressBrakes from '@public/img/catalog/hydraulic-press-brakes.png'
import laserCleaning from '@public/img/catalog/laser-cleaning.png'
import laserMachines from '@public/img/catalog/laser-machines.png'
import laserMarkers from '@public/img/catalog/laser-markers.png'
import laserPipeCutting from '@public/img/catalog/laser-pipe-cutting.png'
import laserWelding from '@public/img/catalog/laser-welding.png'
import metalCutters from '@public/img/catalog/metall-cutters.png'
import promo from '@public/img/catalog/promo.png'
import rightArrowIcon from '@public/img/icons/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { formatProductModelName, getAllProducts, getCategories, getSellableCharacteristics, getSeries } from '@api/product'

import styles from './Catalog.module.scss'

const CATEGORY_IMAGES: Record<number, any> = {
	1: laserMachines,
	2: cncRoutes,
	3: laserMarkers,
	4: metalCutters,
	5: laserWelding,
	6: laserCleaning,
	7: laserPipeCutting,
	8: hydraulicPressBrakes
}

const DEFAULT_CATEGORIES = [
	{ id: 1, name: 'Laser machines' },
	{ id: 2, name: 'CNC Routers' },
	{ id: 3, name: 'Laser markers' },
	{ id: 4, name: 'Metal Cutters' },
	{ id: 5, name: 'Laser welding' },
	{ id: 6, name: 'Laser cleaning' },
	{ id: 7, name: 'Laser pipe cutting' },
	{ id: 8, name: 'Hydraulic press brakes' }
]

interface CatalogProps {
	onClose?: () => void
}

const Catalog: FC<CatalogProps> = ({ onClose }) => {
	const [selectedCategory, setSelectedCategory] = useState<number | string | null>(2)
	const [categories, setCategories] = useState<any[]>(DEFAULT_CATEGORIES)
	const [allSeries, setAllSeries] = useState<any[]>([])
	const [allProducts, setAllProducts] = useState<any[]>([])
	const [sellableCharacteristics, setSellableCharacteristics] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true)
			try {
				const [cats, seriesData, productsData, sellableChars] = await Promise.all([
					getCategories(),
					getSeries(),
					getAllProducts(),
					getSellableCharacteristics()
				])

				if (cats && cats.length > 0) {
					setCategories(cats)
				}
				if (seriesData && seriesData.length > 0) {
					setAllSeries(seriesData)
				}
				if (productsData && productsData.length > 0) {
					setAllProducts(productsData)
				}
				if (sellableChars && sellableChars.length > 0) {
					setSellableCharacteristics(sellableChars)
				}
			} catch (error) {
				console.error('Failed to load catalog data', error)
			} finally {
				setIsLoading(false)
			}
		}

		loadData()
	}, [])

	const isCategoryActive = selectedCategory !== null && selectedCategory !== 'accessories'
	const currentCategoryId = typeof selectedCategory === 'number' ? selectedCategory : parseInt(selectedCategory as string, 10)

	const activeSeries = allSeries.filter((s: any) => s.categoryId === currentCategoryId)

	return (
		<div className={clsx(styles.wrapper, selectedCategory !== null && styles.wrapperFull)}>
			<div
				className={clsx(
					styles.equipmentMenu,
					selectedCategory !== null && styles.equipmentMenuSelected
				)}
			>
				{categories.map((cat: any) => {
					const catId = cat.id
					const image = CATEGORY_IMAGES[catId] || cncRoutes
					const isActive = selectedCategory === catId

					return (
						<button
							key={catId}
							className={clsx(
								styles.equipmentButton,
								isActive && styles.equipmentButtonActive
							)}
							onClick={() => setSelectedCategory(catId)}
						>
							<div className={styles.equipmentButtonImage}>
								<Image
									src={image}
									alt={cat.name}
									fill={true}
								/>
							</div>
							{cat.name.trim()}
							<Image
								src={rightArrowIcon}
								alt=''
							/>
						</button>
					)
				})}

				<div className={styles.divider} />

				<button
					className={clsx(
						styles.equipmentButton,
						selectedCategory === 'accessories' && styles.equipmentButtonActive
					)}
					onClick={() => setSelectedCategory('accessories')}
				>
					<div className={styles.equipmentButtonImage}>
						<Image
							src={accessories}
							alt='Accessories'
							fill={true}
						/>
					</div>
					Accessories
					<Image
						src={rightArrowIcon}
						alt=''
					/>
				</button>
			</div>

			{selectedCategory !== null && (
				<>
					<div className={styles.content}>
						<div className={styles.contentTitle}>
							{selectedCategory === 'accessories' ? 'Accessories' : 'Series & Work Areas'}
						</div>

						{selectedCategory === 'accessories' ? (
							<div className={styles.productTags}>
								{sellableCharacteristics.length > 0 ? (
									sellableCharacteristics.map((char: any) => (
										<div
											key={char.id}
											className={styles.tag}
											title={char.name}
										>
											{char.name} {char.unit ? char.unit : ''}
										</div>
									))
								) : (
									<span className={styles.emptyState}>
										No sellable accessories available
									</span>
								)}
							</div>
						) : activeSeries.length > 0 ? (
							<div className={styles.seriesListContainer}>
								{activeSeries.map((series: any) => {
									const seriesProducts = allProducts.filter((p: any) => p.seriesId === series.id)

									return (
										<div key={series.id} className={styles.seriesGroup}>
											<div className={styles.seriesTitle}>
												{series.name} Series
											</div>
											<div className={styles.productTags}>
												{seriesProducts.length > 0 ? (
													seriesProducts.map((prod: any) => (
														<Link
															key={prod.id}
															href={`/product/${prod.id}`}
															className={styles.tag}
															onClick={onClose}
														>
															{formatProductModelName(prod.name)}
														</Link>
													))
												) : (
													<span className={styles.emptyState}>
														No models available
													</span>
												)}
											</div>
										</div>
									)
								})}
							</div>
						) : (
							<div className={styles.emptyState}>
								{isLoading ? 'Loading models...' : 'No series available in this category.'}
							</div>
						)}
					</div>

					<div className={styles.content}>
						<div className={styles.promo}>
							<div className={styles.promoImage}>
								<Image
									src={promo}
									alt=''
									fill={true}
								/>
							</div>
							<div className={styles.promoTitle}>
								5% off Laser cutter engraver machine for wood till January end
							</div>
							<Button
								size='l'
								view='red'
								block={true}
								href='/product/5'
								onClick={onClose}
							>
								View details
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Catalog
