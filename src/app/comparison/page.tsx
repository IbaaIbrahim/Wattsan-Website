'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import clsx from 'clsx'

import Card, { ICardOption } from '@components/modules/comparison/card/Card'
import FavoriteItem from '@components/modules/favorites/favorite-item/FavoriteItem'
import BlankContent from '@components/modules/common/blank-content/BlankContent'
import FormCheckbox from '@components/ui/inputs/form-checkbox/FormCheckbox'
import Tags from '@components/ui/tags/Tags'
import emptyComparisonImage from '@public/img/favorites/empty-favorites.svg'
import trashIcon from '@public/img/icons/basket.svg'

import { useComparisonStore, normalizeCategoryKey, getItemKey } from '@store/comparisonStore'
import { useFavoritesStore, TFavoriteItem } from '@store/favoritesStore'
import { authStore } from '@store/auth'
import { modalsStore } from '@store/modals'
import { MODALS } from '@components/ui/modal/Modal'
import { createBasket } from '@store/basket/actions'
import {
	getAllProducts,
	getClientConfigurations,
	getSellableCharacteristics,
	getFullCharacteristics,
	getCharacteristicsEnums
} from '@api/product'
import { TComparisonItem, TComparisonTab } from '@/types/comparison'

import styles from './page.module.scss'

const EQUIPMENT_CATEGORIES = [
	{ id: 'cnc-routers', content: 'CNC Routers', keywords: ['router', 'cnc', 'm1', 'm3', 'a1', 'mini', '0404', '0609', '1313', '1325', '1616', '2030', '2040'] },
	{ id: 'laser-machines', content: 'Laser machines', keywords: ['laser machine', 'cutting machine', 'engraving', 'wood', 'co2', '6090'] },
	{ id: 'laser-markers', content: 'Laser markers', keywords: ['marker', 'marking', 'mopa', 'fl tt', 'fl st', 'fiber marker'] },
	{ id: 'metal-cutters', content: 'Metal Cutters', keywords: ['metal', 'cutter', 'fiber laser', 'sheet'] },
	{ id: 'laser-welding', content: 'Laser welding', keywords: ['weld', 'welding'] },
	{ id: 'laser-cleaning', content: 'Laser cleaning', keywords: ['clean', 'cleaning'] },
	{ id: 'laser-pipe-cutting', content: 'Laser pipe cutting', keywords: ['pipe'] },
	{ id: 'hydraulic-press-brakes', content: 'Hydraulic press brakes', keywords: ['press', 'hydraulic', 'brake'] }
]

const ACCESSORY_CATEGORIES = [
	{ id: 'accessories', content: 'Accessories for CNC Router Machines', keywords: ['accessory', 'accessories', 'tool', 'spindle', 'chiller', 'sensor'] }
]

const PRIORITY_SPEC_ORDER = [
	'Working Area',
	'Spindle Power',
	'Laser Power',
	'Travel Speed',
	'Control System',
	'Machine Dimensions',
	'Weight',
	'Table Type',
	'Spindle Speed',
	'Positioning Accuracy',
	'Positioning Resolution',
	'Tool Lifting Height',
	'Bed Type',
	'Application',
	'Warranty',
	'Power Supply',
	'Power Electrics',
	'Supported File Formats',
	'Working Temperature',
	'Number Of Axes',
	'Motor Driver',
	'Spindle Cooling',
	'Collet Chuck',
	'Movement Mechanism',
	'Lubrication System',
	'Linear Guide System',
	'Guide Size',
	'Gantry Material'
]

const formatSpecLabel = (rawName: string): string => {
	if (!rawName) return 'Specification'
	return rawName
		.replace(/([A-Z])/g, ' $1')
		.replace(/_/g, ' ')
		.trim()
}

export default function ComparisonPage() {
	const router = useRouter()
	const authorized = authStore.use.authorized()

	const activeTab = useComparisonStore(state => state.activeTab)
	const selectedCategory = useComparisonStore(state => state.selectedCategory)
	const slotsByCategory = useComparisonStore(state => state.slotsByCategory)
	const showDifferencesOnly = useComparisonStore(state => state.showDifferencesOnly)

	const setActiveTab = useComparisonStore(state => state.setActiveTab)
	const setSelectedCategory = useComparisonStore(state => state.setSelectedCategory)
	const setShowDifferencesOnly = useComparisonStore(state => state.setShowDifferencesOnly)
	const setSlotItem = useComparisonStore(state => state.setSlotItem)
	const removeFromCompare = useComparisonStore(state => state.removeFromCompare)
	const clearCategory = useComparisonStore(state => state.clearCategory)
	const toggleCompare = useComparisonStore(state => state.toggleCompare)
	const isCompared = useComparisonStore(state => state.isCompared)

	const toggleFavorite = useFavoritesStore(state => state.toggleFavorite)
	const fetchFavorites = useFavoritesStore(state => state.fetchFavorites)

	const [isMounted, setIsMounted] = useState(false)
	const [allCatalogProducts, setAllCatalogProducts] = useState<any[]>([])
	const [allSellableChars, setAllSellableChars] = useState<any[]>([])
	const [allClientConfigs, setAllClientConfigs] = useState<any[]>([])
	const [fullCharacteristicsList, setFullCharacteristicsList] = useState<any[]>([])
	const [characteristicsCodesList, setCharacteristicsCodesList] = useState<any[]>([])

	useEffect(() => {
		setIsMounted(true)
		if (authorized) {
			fetchFavorites()
		}

		const loadAllData = async () => {
			try {
				const [prods, configs, chars, fullChars, enums] = await Promise.all([
					getAllProducts(),
					getClientConfigurations(),
					getSellableCharacteristics(),
					getFullCharacteristics(),
					getCharacteristicsEnums()
				])
				setAllCatalogProducts(prods || [])
				setAllClientConfigs(configs || [])
				setAllSellableChars(chars || [])
				setFullCharacteristicsList(fullChars || [])
				setCharacteristicsCodesList(enums?.characteristicsCodes || [])
			} catch (e) {
				console.error('Failed to load catalog data for comparison', e)
			}
		}

		loadAllData()
	}, [authorized])

	// Lookup maps for rapid characteristics resolution
	const fullCharsMap = useMemo(() => {
		const map = new Map<number, any>()
		for (const fc of fullCharacteristicsList) {
			map.set(Number(fc.id), fc)
		}
		return map
	}, [fullCharacteristicsList])

	const enumCodesMap = useMemo(() => {
		const map = new Map<number, string>()
		for (const c of characteristicsCodesList) {
			map.set(Number(c.value), c.name)
		}
		return map
	}, [characteristicsCodesList])

	// Helper to extract full, rich specs dictionary for any item
	const extractSpecsForItem = useCallback((item: TComparisonItem | any): Record<string, string | number> => {
		if (!item) return {}
		const specsDict: Record<string, string | number> = {}

		const itype = item.itemtype || 2
		const refId = Number(item.referenceId)

		if (itype === 2) {
			// Find live catalog product
			const p = allCatalogProducts.find(prod => Number(prod.id) === refId) || item.rawItem
			if (p && Array.isArray(p.fullProductCharacteristics)) {
				for (const fpc of p.fullProductCharacteristics) {
					if (fpc && fpc.isActive !== false) {
						const fc = fullCharsMap.get(Number(fpc.characteristicId))
						if (fc) {
							const rawCodeName = enumCodesMap.get(Number(fc.code)) || `Characteristic_${fc.code}`
							const label = formatSpecLabel(rawCodeName)
							const val = fc.unit ? `${fc.name} ${fc.unit}`.trim() : fc.name
							specsDict[label] = val
						}
					}
				}
			}

			// Fallback additions if not already present
			if (!specsDict['Working Area'] && p?.workArea) specsDict['Working Area'] = p.workArea
			if (!specsDict['Dimensions'] && p?.dimensions) specsDict['Dimensions'] = p.dimensions
			if (!specsDict['Weight'] && p?.weight) specsDict['Weight'] = p.weight
		} else if (itype === 1) {
			// Find client config
			const c = allClientConfigs.find(conf => Number(conf.id) === refId) || item.rawItem
			if (c) {
				if (c.workAreaChar?.name) specsDict['Working Area'] = c.workAreaChar.name
				if (c.spindleChar?.name) specsDict['Spindle Power'] = c.spindleChar.name
				if (c.controlSystemChar?.name) specsDict['Control System'] = c.controlSystemChar.name
				if (c.motorChar?.name) specsDict['Motor Driver'] = c.motorChar.name
				if (c.liquidCoolingSystemChar?.name) specsDict['Spindle Cooling'] = c.liquidCoolingSystemChar.name
				if (c.tableTypeChar?.name) specsDict['Table Type'] = c.tableTypeChar.name
				if (c.modelName) specsDict['Model'] = c.modelName
			}
		} else if (itype === 3) {
			// Direct accessory / characteristic
			const fc = fullCharsMap.get(refId) || allSellableChars.find((sc: any) => Number(sc.id) === refId)
			if (fc) {
				const rawCodeName = enumCodesMap.get(Number(fc.code)) || 'Accessory'
				specsDict['Type'] = formatSpecLabel(rawCodeName)
				specsDict['Option'] = fc.unit ? `${fc.name} ${fc.unit}`.trim() : fc.name
				if (fc.price && Number(fc.price) > 0) {
					specsDict['Price'] = `$${Number(fc.price).toLocaleString()}`
				}
			}
		}

		// Fallback to item.specs if empty
		if (Object.keys(specsDict).length === 0 && item.specs) {
			return item.specs
		}

		return specsDict
	}, [allCatalogProducts, allClientConfigs, allSellableChars, fullCharsMap, enumCodesMap])

	// Current active slots enriched dynamically with live specs
	const currentSlots = useMemo(() => {
		const rawSlots = slotsByCategory[selectedCategory] || [null, null, null, null]
		return rawSlots.map(slotItem => {
			if (!slotItem) return null
			const liveSpecs = extractSpecsForItem(slotItem)
			return {
				...slotItem,
				specs: liveSpecs
			}
		})
	}, [slotsByCategory, selectedCategory, extractSpecsForItem])

	const comparedItemsInCat = useMemo(() => {
		return currentSlots.filter(Boolean) as TComparisonItem[]
	}, [currentSlots])

	const totalCount = useMemo(() => {
		let count = 0
		const seen = new Set<string>()
		for (const cat of Object.keys(slotsByCategory)) {
			for (const s of slotsByCategory[cat] || []) {
				if (s) {
					const k = getItemKey(s.referenceId, s.itemtype)
					if (!seen.has(k)) {
						seen.add(k)
						count++
					}
				}
			}
		}
		return count
	}, [slotsByCategory])

	const equipmentCount = useMemo(() => {
		let count = 0
		const seen = new Set<string>()
		for (const cat of Object.keys(slotsByCategory)) {
			if (cat !== 'accessories' && !cat.includes('accessor')) {
				for (const s of slotsByCategory[cat] || []) {
					if (s) {
						const k = getItemKey(s.referenceId, s.itemtype)
						if (!seen.has(k)) {
							seen.add(k)
							count++
						}
					}
				}
			}
		}
		return count
	}, [slotsByCategory])

	const accessoriesCount = useMemo(() => {
		let count = 0
		const seen = new Set<string>()
		for (const cat of Object.keys(slotsByCategory)) {
			if (cat === 'accessories' || cat.includes('accessor')) {
				for (const s of slotsByCategory[cat] || []) {
					if (s) {
						const k = getItemKey(s.referenceId, s.itemtype)
						if (!seen.has(k)) {
							seen.add(k)
							count++
						}
					}
				}
			}
		}
		return count
	}, [slotsByCategory])

	// Options available for the select dropdown in the current category
	const categoryOptions = useMemo<ICardOption[]>(() => {
		const isAcc = activeTab === 'accessories' || selectedCategory === 'accessories'

		if (isAcc) {
			return allSellableChars.map((c: any) => {
				const charPrice = (c.price && Number(c.price) > 0) ? Number(c.price) : 2000
				const title = c.name ? `${c.name} ${c.unit || ''}`.trim() : 'Accessory'
				const rawCodeName = enumCodesMap.get(Number(c.code)) || 'Accessory'

				const item: TComparisonItem = {
					id: `char-${c.id}`,
					referenceId: Number(c.id),
					itemtype: 3,
					name: title,
					code: title,
					categoryName: 'Accessories for CNC Router Machines',
					categoryId: 'accessories',
					categoryTab: 'accessories',
					price: `$${charPrice.toLocaleString()}`,
					image: c.fileManager?.url || '/img/catalog/cnc-routes.png',
					available: c.isActive !== false,
					specs: {
						'Type': formatSpecLabel(rawCodeName),
						'Option': title,
						'Category': 'CNC Router Accessories',
						'Price': `$${charPrice.toLocaleString()}`
					}
				}
				return {
					value: c.id,
					text: title,
					item
				}
			})
		}

		// Filter products for this equipment category
		const activeCatObj = EQUIPMENT_CATEGORIES.find(c => c.id === selectedCategory)
		const keywords = activeCatObj?.keywords || []

		const matchedProducts = allCatalogProducts.filter((p: any) => {
			if (p.isActive === false) return false
			const sName = (p.series?.name || '').toLowerCase()
			const pName = (p.name || '').toLowerCase()
			if (keywords.length === 0) return true
			return keywords.some(kw => sName.includes(kw) || pName.includes(kw))
		})

		const optionsList: ICardOption[] = []

		for (const p of matchedProducts) {
			const priceVal = p.price && Number(p.price) > 0 ? p.price : (p.orderPrice || 5000)
			const imgUrl = p.attachments?.[0]?.fileManager?.url || '/img/grid-machines/M3.png'
			const sName = p.series?.name || 'CNC Routers'

			const compItem: TComparisonItem = {
				id: `prod-${p.id}`,
				referenceId: Number(p.id),
				itemtype: 2,
				name: p.name || 'Wattsan Equipment',
				code: p.name,
				categoryName: sName,
				categoryId: selectedCategory,
				categoryTab: 'equipment',
				price: `$${Number(priceVal).toLocaleString()}`,
				image: imgUrl,
				available: p.isActive !== false,
				specs: extractSpecsForItem({ referenceId: p.id, itemtype: 2, rawItem: p }),
				rawItem: p
			}

			optionsList.push({
				value: p.id,
				text: p.name || `Model ${p.id}`,
				item: compItem
			})
		}

		// Also include matched client configs
		const matchedConfigs = allClientConfigs.filter((c: any) => {
			const sName = (c.series?.name || c.configurationName || '').toLowerCase()
			return keywords.some(kw => sName.includes(kw))
		})

		for (const c of matchedConfigs) {
			const sName = c.series?.name || c.configurationName?.trim() || 'Configurator'
			const title = `${sName} ${c.modelName || ''}`.trim()
			const imgUrl = c.fileManger?.url || '/img/grid-machines/M3.png'
			const priceVal = c.price && Number(c.price) > 0 ? c.price : 5000

			const compItem: TComparisonItem = {
				id: `conf-${c.id}`,
				referenceId: Number(c.id),
				itemtype: 1,
				name: title,
				code: title,
				categoryName: sName,
				categoryId: selectedCategory,
				categoryTab: 'equipment',
				price: `$${Number(priceVal).toLocaleString()}`,
				image: imgUrl,
				available: true,
				specs: extractSpecsForItem({ referenceId: c.id, itemtype: 1, rawItem: c }),
				rawItem: c
			}

			optionsList.push({
				value: `conf-${c.id}`,
				text: `${title} (Custom Config)`,
				item: compItem
			})
		}

		return optionsList
	}, [activeTab, selectedCategory, allCatalogProducts, allClientConfigs, allSellableChars, enumCodesMap, extractSpecsForItem])

	// Dynamic Category Tags
	const currentTags = useMemo(() => {
		const categoryList = activeTab === 'equipment' ? EQUIPMENT_CATEGORIES : ACCESSORY_CATEGORIES
		return categoryList.map(cat => {
			const catSlots = slotsByCategory[cat.id] || []
			const count = catSlots.filter(Boolean).length
			return {
				id: cat.id,
				content: count > 0 ? `${cat.content} (${count})` : cat.content
			}
		})
	}, [activeTab, slotsByCategory])

	// All unique parameter rows across currently compared items, sorted by logical importance
	const parameterRows = useMemo(() => {
		if (comparedItemsInCat.length === 0) return []

		const specKeysSet = new Set<string>()
		for (const item of comparedItemsInCat) {
			if (item.specs) {
				for (const key of Object.keys(item.specs)) {
					specKeysSet.add(key)
				}
			}
		}

		const allFoundKeys = Array.from(specKeysSet)
		if (allFoundKeys.length === 0) {
			return ['Working Area', 'Spindle Power', 'Control System', 'Machine Dimensions', 'Weight']
		}

		// Sort keys: Priority order first, followed alphabetically by other dynamic keys
		const sortedKeys: string[] = []
		for (const pKey of PRIORITY_SPEC_ORDER) {
			if (specKeysSet.has(pKey)) {
				sortedKeys.push(pKey)
				specKeysSet.delete(pKey)
			}
		}

		const remainingKeys = Array.from(specKeysSet).sort((a, b) => a.localeCompare(b))
		const combinedKeys = [...sortedKeys, ...remainingKeys]

		if (!showDifferencesOnly || comparedItemsInCat.length < 2) {
			return combinedKeys
		}

		// Filter to only rows where values differ among compared items
		return combinedKeys.filter(paramKey => {
			const values = comparedItemsInCat.map(item => String(item.specs?.[paramKey] || '-').trim().toLowerCase())
			const firstVal = values[0]
			return values.some(v => v !== firstVal)
		})
	}, [comparedItemsInCat, showDifferencesOnly])

	// Popular items recommendations when empty
	const popularRecommendations = useMemo<TFavoriteItem[]>(() => {
		const list: TFavoriteItem[] = []

		if (allCatalogProducts.length > 0) {
			const prods = allCatalogProducts
				.filter(p => p.isActive !== false)
				.map(p => {
					const priceVal = p.price && Number(p.price) > 0 ? p.price : (p.orderPrice || 5000)
					return {
						id: `pop-p-${p.id}`,
						referenceId: Number(p.id),
						itemtype: 2 as const,
						name: p.name || 'Wattsan Equipment',
						categoryName: p.series?.name || 'CNC Routers',
						price: `$${Number(priceVal).toLocaleString()}`,
						image: p.attachments?.[0]?.fileManager?.url || '/img/grid-machines/M3.png',
						available: p.isActive !== false
					}
				})
			list.push(...prods)
		}

		if (allSellableChars.length > 0) {
			const chars = allSellableChars
				.filter(c => c.isActive !== false)
				.map(c => {
					const priceVal = c.price && Number(c.price) > 0 ? c.price : 2000
					return {
						id: `pop-c-${c.id}`,
						referenceId: Number(c.id),
						itemtype: 3 as const,
						name: c.name ? `${c.name} ${c.unit || ''}`.trim() : 'Accessory',
						categoryName: 'Accessories for CNC Router Machines',
						price: `$${Number(priceVal).toLocaleString()}`,
						image: c.fileManager?.url || '/img/catalog/cnc-routes.png',
						available: c.isActive !== false,
						unit: c.unit
					}
				})
			list.push(...chars)
		}

		return list.filter(item => !isCompared(item.referenceId, item.itemtype))
	}, [allCatalogProducts, allSellableChars, isCompared])

	const handleLogin = (nextAction: () => void) => () => {
		modalsStore.set.open(MODALS.login, {
			initialScreen: 'LOGIN',
			closeOnEscape: false,
			onComplete: nextAction,
			onError: () => {}
		})
	}

	const addItemToBasket = async (item: TComparisonItem | TFavoriteItem) => {
		const rawPrice = typeof item.price === 'string'
			? parseFloat(item.price.replace(/[^\d.]/g, ''))
			: item.price

		await createBasket({
			referenceId: item.referenceId,
			itemtype: item.itemtype || 2,
			quantity: 1,
			itemData: {
				title: item.name,
				categoryName: item.categoryName || 'Equipment',
				price: isNaN(rawPrice) ? 1000 : rawPrice,
				image: item.image || '/img/catalog/cnc-routes.png'
			}
		})
	}

	const handleAddToBasket = (item: TComparisonItem | TFavoriteItem) => {
		if (authorized) {
			addItemToBasket(item)
		} else {
			modalsStore.set.open(MODALS.infoModal, {
				title: 'To add the product to your basket, you need to Log in or Sign up',
				accentButton: {
					text: 'Log in or Sign up',
					onClick: handleLogin(() => addItemToBasket(item))
				},
				secondaryButton: {
					text: 'Cancel',
					onClick: () => modalsStore.set.close()
				}
			})
		}
	}

	const handleToggleFavoriteFromComp = (item: TComparisonItem) => {
		toggleFavorite({
			id: `fav-${item.referenceId}-${item.itemtype}`,
			referenceId: item.referenceId,
			itemtype: item.itemtype,
			name: item.name,
			categoryName: item.categoryName,
			price: item.price,
			image: item.image,
			available: item.available
		})
	}

	const handleToggleCompareFromPop = (item: TFavoriteItem) => {
		toggleCompare({
			id: `comp-${item.referenceId}-${item.itemtype}`,
			referenceId: item.referenceId,
			itemtype: item.itemtype,
			name: item.name,
			categoryName: item.categoryName,
			price: item.price,
			image: item.image,
			available: item.available,
			specs: extractSpecsForItem(item)
		})
	}

	if (!isMounted) {
		return (
			<div className={styles.page}>
				<div className={styles.title}>Comparison</div>
			</div>
		)
	}

	const compareAvailable = comparedItemsInCat.length >= 2
	const isCategoryEmpty = comparedItemsInCat.length === 0

	return (
		<div className={styles.page}>
			<div className={styles.titleWrapper}>
				<h1 className={styles.title}>Comparison</h1>
				{totalCount > 0 && (
					<div className={styles.counterBadge}>
						<span>{totalCount}</span>
					</div>
				)}
			</div>

			<div className={styles.pageSelect}>
				<button
					type='button'
					className={clsx(
						styles.pageSelectButton,
						activeTab === 'equipment' && styles.pageSelectButtonSelected
					)}
					onClick={() => setActiveTab('equipment')}
				>
					Equipment {equipmentCount > 0 && `(${equipmentCount})`}
				</button>
				<button
					type='button'
					className={clsx(
						styles.pageSelectButton,
						activeTab === 'accessories' && styles.pageSelectButtonSelected
					)}
					onClick={() => setActiveTab('accessories')}
				>
					Accessories {accessoriesCount > 0 && `(${accessoriesCount})`}
				</button>
			</div>

			<div className={styles.tagsWrapper}>
				<Tags
					size='l'
					selected={[selectedCategory]}
					onClick={id => setSelectedCategory(id)}
					items={currentTags}
				/>
			</div>

			{isCategoryEmpty ? (
				<div className={styles.emptyContainer}>
					<BlankContent
						image={emptyComparisonImage}
						title={
							<>
								Comparison list is empty <br /> at the moment
							</>
						}
						description={
							<>
								Visit the Home page and explore our catalog to <br /> select
								items and add them to comparison.
							</>
						}
						action='Go to the Home page'
						onClick={() => router.push('/')}
					/>

					{popularRecommendations.length > 0 && (
						<div className={styles.popular}>
							<h2 className={styles.popularTitle}>Popular items</h2>
							<div className={styles.popularGrid}>
								{popularRecommendations.map(item => (
									<FavoriteItem
										key={`pop-${item.itemtype}-${item.referenceId}-${item.id}`}
										item={item}
										isCompare={false}
										onToggleCompare={() => handleToggleCompareFromPop(item)}
										onToggleFavorites={toggleFavorite}
										onAddToBasket={handleAddToBasket}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			) : (
				<>
					<div className={styles.cards}>
						<div className={styles.hideTablet} />
						{currentSlots.map((item, slotIndex) => (
							<Card
								className={styles.card}
								key={slotIndex}
								slotIndex={slotIndex}
								item={item}
								options={categoryOptions}
								onSelectOption={newItem => setSlotItem(selectedCategory, slotIndex, newItem)}
								onRemoveCompare={() => item && removeFromCompare(item.referenceId, item.itemtype)}
								onToggleFavorites={handleToggleFavoriteFromComp}
								onAddToBasket={handleAddToBasket}
							/>
						))}
					</div>

					<div className={styles.actions}>
						<div className={styles.actionsContent}>
							<FormCheckbox
								selected={showDifferencesOnly}
								disabled={!compareAvailable}
								label='Show only differences'
								onChange={val => setShowDifferencesOnly(Boolean(val))}
							/>
							<button
								type='button'
								disabled={comparedItemsInCat.length === 0}
								className={clsx(
									styles.actionsButton,
									comparedItemsInCat.length === 0 && styles.actionsButtonDisabled
								)}
								onClick={() => clearCategory(selectedCategory)}
							>
								<Image
									src={trashIcon}
									alt=''
								/>
								Delete all products from the category
							</button>
						</div>
						<div className={styles.actionsDivider} />
					</div>

					<div className={styles.table}>
						{parameterRows.map(parameterName => (
							<div
								className={styles.row}
								key={parameterName}
							>
								<div className={styles.parameterName}>{parameterName}</div>
								<div className={styles.values}>
									{currentSlots.map((item, index) => (
										<div
											className={styles.parameter}
											key={index}
										>
											{item ? (item.specs?.[parameterName] || '-') : '-'}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	)
}
