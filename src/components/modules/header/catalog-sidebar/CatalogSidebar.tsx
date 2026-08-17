'use client'

import Button from '@components/ui/button/Button'
import FormAutocomplete from '@components/ui/inputs/form-autocomplete/FormAutocomplete'
import Logo from '@components/ui/logo/Logo'
import accessories from '@public/img/catalog/accessories.png'
import cncRoutes from '@public/img/catalog/cnc-routes.png'
import hydraulicPressBrakes from '@public/img/catalog/hydraulic-press-brakes.png'
import laserCleaning from '@public/img/catalog/laser-cleaning.png'
import laserMachines from '@public/img/catalog/laser-machines.png'
import laserMarkers from '@public/img/catalog/laser-markers.png'
import laserPipeCutting from '@public/img/catalog/laser-pipe-cutting.png'
import laserWelding from '@public/img/catalog/laser-welding.png'
import metalCutters from '@public/img/catalog/metall-cutters.png'
import leftArrowIcon from '@public/img/icons/arrow-left.svg'
import closeIcon from '@public/img/icons/close.svg'
import config from '@public/img/icons/config.svg'
import rightArrowIcon from '@public/img/icons/right-arrow.svg'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { formatProductModelName, getAllProducts, getCategories, getSeries } from '@api/product'

import { PAGES } from '../../../../config/pages.url.config'

import styles from './CatalogSidebar.module.scss'

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

const CatalogSidebar: FC<{
	open: boolean
	onToggle: (open: boolean) => void
}> = ({ open, onToggle }) => {
	const [selectedCategory, setSelectedCategory] = useState<number | string | null>(null)
	const [categories, setCategories] = useState<any[]>(DEFAULT_CATEGORIES)
	const [allSeries, setAllSeries] = useState<any[]>([])
	const [allProducts, setAllProducts] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true)
			try {
				const [cats, seriesData, productsData] = await Promise.all([
					getCategories(),
					getSeries(),
					getAllProducts()
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
			} catch (error) {
				console.error('Failed to load catalog data', error)
			} finally {
				setIsLoading(false)
			}
		}

		if (open) {
			loadData()
		}
	}, [open])

	const handleOverlayClick = () => {
		onToggle(false)
		setSelectedCategory(null)
	}

	const currentCategoryId = typeof selectedCategory === 'number' ? selectedCategory : parseInt(selectedCategory as string, 10)
	const activeSeries = allSeries.filter((s: any) => s.categoryId === currentCategoryId)
	const activeCategoryObj = categories.find((c: any) => c.id === currentCategoryId)

	return (
		<div className={clsx(open && styles.open)}>
			<div
				className={styles.overlay}
				onClick={handleOverlayClick}
			/>
			<div className={styles.sidebar}>
				<div className={styles.header}>
					<Logo size='m' />
					<Button
						className={styles.closeButton}
						leftAddon={
							<Image
								src={closeIcon}
								alt=''
							/>
						}
						size='s'
						view='default'
						onClick={handleOverlayClick}
					>
						Catalog
					</Button>
				</div>

				<div
					className={clsx(
						styles.mobileSidebarContent,
						selectedCategory !== null && styles.mobileSidebarContentShow
					)}
				>
					<Button
						className={styles.backButton}
						size='m'
						view='default'
						leftAddon={
							<Image
								src={leftArrowIcon}
								alt=''
							/>
						}
						onClick={() => setSelectedCategory(null)}
					>
						{selectedCategory === 'accessories' ? 'Accessories' : activeCategoryObj?.name?.trim() || 'Back'}
					</Button>

					<div className={styles.contentTitle}>
						{selectedCategory === 'accessories' ? 'Accessories' : 'Series & Work areas'}
					</div>

					{selectedCategory === 'accessories' ? (
						<div className={styles.productTags}>
							<Link
								href='/accessories'
								className={styles.tag}
								onClick={handleOverlayClick}
							>
								All Accessories
							</Link>
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
														onClick={handleOverlayClick}
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
							{isLoading ? 'Loading models...' : 'No models found for this category.'}
						</div>
					)}
				</div>

				<div
					className={clsx(
						styles.sidebarContent,
						selectedCategory !== null && styles.sidebarContentHide
					)}
				>
					<div className={styles.form}>
						<FormAutocomplete
							name='catalogSearch'
							value=''
							placeholder='Search items'
							size='m'
						/>
						<Button
							size='s'
							block={true}
							view='bordered'
							href={PAGES.configurator}
							leftAddon={
								<div className={styles.configuratorButtonIcon}>
									<Image
										src={config}
										alt=''
									/>
								</div>
							}
							onClick={handleOverlayClick}
						>
							Configurator
						</Button>
					</div>

					<div className={styles.content}>
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
							<div className={styles.hideMobile}>
								<div className={styles.contentTitle}>
									{selectedCategory === 'accessories' ? 'Accessories' : 'Series & Work Areas'}
								</div>

								{selectedCategory === 'accessories' ? (
									<div className={styles.productTags}>
										<Link
											href='/accessories'
											className={styles.tag}
											onClick={handleOverlayClick}
										>
											All Accessories
										</Link>
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
																	onClick={handleOverlayClick}
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
										{isLoading ? 'Loading models...' : 'No models available.'}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CatalogSidebar
