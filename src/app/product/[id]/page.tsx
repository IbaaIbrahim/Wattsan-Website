'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Breadcrumbs from '@components/modules/product-page/breadcrumbs/Breadcrumbs'
import ProductImageGallery from '@components/modules/product-page/product-image-gallery/ProductImageGallery'
import ProductParameters from '@components/modules/product-page/product-parameters/ProductParameters'
import ProductInfo from '@components/modules/product-page/product-info/ProductInfo'
import ProductConfiguratorCTA from '@components/modules/product-page/product-configurator-cta/ProductConfiguratorCTA'
import ProductInfoCards from '@components/modules/product-page/product-info-cards/ProductInfoCards'
import WattsanFactsSlider from '@components/modules/product-page/wattsan-facts-slider/WattsanFactsSlider'
import ProductDescription from '@components/modules/product-page/product-description/ProductDescription'
import HeartOfTheMachinery from '@components/modules/product-page/heart-of-the-machinery/HeartOfTheMachinery'
import SafetyCabin from '@components/modules/product-page/safety-cabin/SafetyCabin'
import RotaryDevice from '@components/modules/product-page/rotary-device/RotaryDevice'
import SeparateRotaryDevice from '@components/modules/product-page/separate-rotary-device/SeparateRotaryDevice'
import MultiSpindles from '@components/modules/product-page/multi-spindles/MultiSpindles'
import AutomaticToolSwitch from '@components/modules/product-page/automatic-tool-switch/AutomaticToolSwitch'
import LiquidCoolingSystem from '@components/modules/product-page/liquid-cooling-system/LiquidCoolingSystem'
import AspirationSystem from '@components/modules/product-page/aspiration-system/AspirationSystem'
import TableTypes from '@components/modules/product-page/table-types/TableTypes'
import PlentyOfMaterials from '@components/modules/product-page/plenty-of-materials/PlentyOfMaterials'
import ProductSpecifications from '@components/modules/product-page/product-specifications/ProductSpecifications'
import SeriesComparison from '@components/modules/product-page/series-comparison/SeriesComparison'
import ProductReviews from '@components/modules/product-page/product-reviews/ProductReviews'
import ProductReviewsAndQuestions from '@components/modules/product-page/product-reviews-and-questions/ProductReviewsAndQuestions'
import MadeWithWattsan from '@components/modules/product-page/made-with-wattsan/MadeWithWattsan'
import ProductionProcess from '@components/modules/product-page/production-process/ProductionProcess'
import ServiceAndSupport from '@components/modules/product-page/service-and-support/ServiceAndSupport'
import PackageList from '@components/modules/product-page/package-list/PackageList'
import AdditionalContent from '@components/modules/product-page/additional-content/AdditionalContent'
import FAQ from '@components/modules/product-page/faq/FAQ'
import MachineAdvisor from '@components/modules/product-page/machine-advisor/MachineAdvisor'
import InterestedProducts from '@components/modules/product-page/interested-products/InterestedProducts'
import ProductBlog from '@components/modules/product-page/product-blog/ProductBlog'
import VideoPlayer from '@components/ui/video-player/VideoPlayer'
import { Typography } from '@components/ui/typography/Typography'

import {
	getProductPageData,
	getProductById,
	getFullCharacteristics,
	getCharacteristicsEnums,
	getFileManagerItem,
	getSeries,
	getSeriesById,
	getProductsBySeriesId,
	getAllProducts,
	formatProductModelName
} from '@api/product'
import { formatMediaUrl } from '@/utils/helpers'
import { authStore } from '@store/auth'
import { modalsStore } from '@store/modals'
import { MODALS } from '@components/ui/modal/Modal'
import { createBasket } from '@store/basket/actions'
import { useFavoritesStore, TFavoriteItem } from '@store/favoritesStore'
import { ProductPageData, ProductParameter, ComparisonSeries } from '@my-types/product'

import styles from './page.module.scss'

const ProductPage = ({ params }: { params: { id: string } }) => {
	const router = useRouter()
	const authorized = authStore.use.authorized()
	const toggleFavorite = useFavoritesStore(state => state.toggleFavorite)
	const isProductFavorite = useFavoritesStore(state =>
		state.isFavorite(Number(params.id), 2)
	)

	const [product, setProduct] = useState<any>(null)
	const [series, setSeries] = useState<any>(null)
	const [seriesProducts, setSeriesProducts] = useState<any[]>([])
	const [categorySeriesList, setCategorySeriesList] = useState<any[]>([])
	const [allProductsList, setAllProductsList] = useState<any[]>([])
	const [categories, setCategories] = useState<any[]>([])
	const [codes, setCodes] = useState<any[]>([])
	const [fullCharacteristics, setFullCharacteristics] = useState<any[]>([])

	const [galleryImages, setGalleryImages] = useState<string[]>([])
	const [videoUrl, setVideoUrl] = useState<string>('')
	const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({})

	const [baseMockData, setBaseMockData] = useState<ProductPageData | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isVideoOpen, setIsVideoOpen] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				// 1. Fetch current product data
				const productData = await getProductById(params.id)
				if (!productData) {
					setIsLoading(false)
					return
				}
				setProduct(productData)

				// 2. Fetch series, sibling products, and category series + all products for SeriesComparison
				let currentSeriesData: any = null
				if (productData.seriesId) {
					const [seriesData, prodsInSeries] = await Promise.all([
						getSeriesById(productData.seriesId),
						getProductsBySeriesId(productData.seriesId)
					])
					currentSeriesData = seriesData
					if (seriesData) setSeries(seriesData)
					if (prodsInSeries) setSeriesProducts(prodsInSeries)
				}

				const [catSeries, allProds] = await Promise.all([
					getSeries(currentSeriesData?.categoryId),
					getAllProducts()
				])
				if (catSeries) setCategorySeriesList(catSeries)
				if (allProds) setAllProductsList(allProds)

				// 3. Fetch enums and characteristics
				const enums = await getCharacteristicsEnums()
				if (enums) {
					setCategories(enums.characteristicsCategories || [])
					setCodes(enums.characteristicsCodes || [])
				}

				const fullChars = await getFullCharacteristics()
				setFullCharacteristics(fullChars || [])

				// 4. Fetch dynamic CMS shared series data
				const targetSeriesId = productData.seriesId || params.id
				const mockData = await getProductPageData(targetSeriesId)
				setBaseMockData(mockData)

				// 5. Resolve attachments
				const imageList: string[] = []
				let foundVideoUrl = ''

				if (productData.attachments && productData.attachments.length > 0) {
					const sortedAttachments = [...productData.attachments].sort((a, b) => (a.order || 0) - (b.order || 0))

					await Promise.all(
						sortedAttachments.map(async (att: any) => {
							let url = ''
							if (att.fileManager && att.fileManager.url) {
								url = att.fileManager.url
							} else if (att.fileManagerId) {
								const fm = await getFileManagerItem(att.fileManagerId)
								if (fm) {
									url = fm.url || fm.thumbnail || ''
								}
							}

							if (url) {
								const formattedUrl = formatMediaUrl(url)
								if (att.type === 1) { // Video
									foundVideoUrl = formattedUrl
								} else { // Image
									imageList.push(formattedUrl)
								}
							}
						})
					)
				}

				setGalleryImages(imageList)
				setVideoUrl(foundVideoUrl)

				// 6. Initialize default selected options for parameters
				const initialSelections: Record<number, number> = {}
				if (productData.fullProductCharacteristics) {
					productData.fullProductCharacteristics.filter((x: any) => x.isActive).forEach((pc: any) => {
						const staticChar = fullChars.find((fc: any) => fc.id === pc.characteristicId)
						if (staticChar) {
							if (!initialSelections[staticChar.code]) {
								initialSelections[staticChar.code] = pc.characteristicId
							}
						}
					})
				}
				setSelectedOptions(initialSelections)

			} catch (error) {
				console.error('Failed to fetch dynamic product details', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [params.id])

	if (isLoading || !product || !baseMockData) {
		return <div className={styles.loadingContainer}>Loading Product...</div>
	}

	// 1. Enrich product characteristics with static details
	const enrichedCharacteristics = (product.fullProductCharacteristics || [])
		.filter((x: any) => x.isActive)
		.map((pc: any) => {
			const staticChar = fullCharacteristics.find((fc: any) => Number(fc.id) === Number(pc.characteristicId))
			if (!staticChar || !staticChar.name || staticChar.code === undefined || staticChar.code === null) return null
			return {
				...pc,
				name: staticChar.name,
				unit: staticChar.unit || '',
				charCategory: staticChar.charCategory ?? 0,
				code: staticChar.code,
				order: staticChar.order ?? 0,
			}
		})
		.filter(Boolean)

	// 2. Group characteristics by code for specifications table
	const WORK_AREA_CODES = [36, 38, 81, 82]

	const groupedByCode: Record<number, any[]> = {}
	enrichedCharacteristics.forEach((char: any) => {
		if (WORK_AREA_CODES.includes(char.code)) return

		if (!groupedByCode[char.code]) {
			groupedByCode[char.code] = []
		}
		groupedByCode[char.code].push(char)
	})

	// Build characteristic parameter inputs from product characteristics
	const dynamicCharacteristicsParameters: ProductParameter[] = Object.entries(groupedByCode)
		.map(([codeStr, optionsList]) => {
			const code = parseInt(codeStr, 10)
			const codeInfo = codes.find((x) => x.value === code)
			const label = codeInfo ? codeInfo.name.replace(/_/g, ' ') : `Parameter ${code}`

			const validOptions = optionsList.filter((opt) => opt.name && opt.name.trim() !== '')
			if (validOptions.length === 0) return null

			const selectedValue = selectedOptions[code] || validOptions[0]?.characteristicId
			const chosenOpt = validOptions.find((opt) => opt.characteristicId === selectedValue) || validOptions[0]

			return {
				id: codeStr,
				label,
				type: validOptions.length > 3 ? 'select' : 'radio',
				value: selectedValue,
				options: validOptions.map((opt) => {
					const priceDiff = (Number(opt.price) || 0) - (Number(chosenOpt?.price) || 0)
					let diffText: string | undefined = undefined
					if (priceDiff > 0) {
						diffText = `+$${priceDiff.toLocaleString()}`
					} else if (priceDiff < 0) {
						diffText = `-$${Math.abs(priceDiff).toLocaleString()}`
					}

					return {
						value: opt.characteristicId,
						text: `${opt.name} ${opt.unit || ''}`.trim(),
						price: diffText
					}
				}),
				onChange: (val) => {
					setSelectedOptions((prev) => ({
						...prev,
						[code]: typeof val === 'string' ? parseInt(val, 10) : (val as number)
					}))
				}
			}
		})
		.filter(Boolean) as ProductParameter[]

	// 3. Work Area (Model) parameter as the FIRST input in product attributes
	const currentProductId = Number(params.id) || product.id
	const formatWorkAreaText = (rawName: string) =>
		formatProductModelName(rawName).replace(/\*/g, 'x')

	const modelOptions = seriesProducts.length > 0
		? seriesProducts.map((p: any) => ({
			value: p.id,
			text: formatWorkAreaText(p.name)
		}))
		: [{
			value: currentProductId,
			text: formatWorkAreaText(product.name)
		}]

	const modelParameter: ProductParameter = {
		id: 'work-area-model',
		label: 'Work area size',
		type: 'select',
		value: currentProductId,
		options: modelOptions,
		onChange: (val) => {
			const targetId = typeof val === 'string' ? parseInt(val, 10) : val
			if (targetId && !isNaN(Number(targetId)) && targetId !== currentProductId) {
				router.push(`/product/${targetId}`)
			}
		}
	}

	const configuratorParameters: ProductParameter[] = [
		modelParameter,
		...dynamicCharacteristicsParameters
	]

	// Calculate total price as the sum of the selected characteristics prices
	const currentPriceValue = Object.entries(selectedOptions).reduce((sum, [codeStr, charId]) => {
		const code = parseInt(codeStr, 10)
		const activeChar =
			(groupedByCode[code] || []).find((c) => Number(c.characteristicId) === Number(charId)) ||
			enrichedCharacteristics.find(
				(c: any) => Number(c.code) === code && Number(c.characteristicId) === Number(charId)
			)
		return sum + (Number(activeChar?.price) || 0)
	}, 0)

	// Determine initial discount from catalog hint prices
	const initialDiscount = (product.oldPrice && product.oldPrice > product.price) ? (product.oldPrice - product.price) : 0
	const originalPriceValue = currentPriceValue + initialDiscount
	const discountValue = initialDiscount

	const formattedCurrentPrice = `$${currentPriceValue.toLocaleString()}`
	const formattedOriginalPrice = originalPriceValue > currentPriceValue ? `$${originalPriceValue.toLocaleString()}` : undefined
	const formattedDiscount = discountValue > 0 ? `$${discountValue.toLocaleString()}` : undefined
	const discountPercent = discountValue > 0 && originalPriceValue > 0 ? `-${Math.round((discountValue / originalPriceValue) * 100)}%` : undefined

	// 4. Build dynamic specifications categories list
	const allEnrichedForSpecs = (product.fullProductCharacteristics || [])
		.filter((x: any) => x.isActive)
		.map((pc: any) => {
			const staticChar = fullCharacteristics.find((fc: any) => Number(fc.id) === Number(pc.characteristicId))
			if (!staticChar || !staticChar.name || staticChar.code === undefined || staticChar.code === null) return null
			return {
				...pc,
				name: staticChar.name,
				unit: staticChar.unit || '',
				charCategory: staticChar.charCategory ?? 0,
				code: staticChar.code,
				order: staticChar.order ?? 0,
			}
		})
		.filter(Boolean)

	const activeCharacteristics = allEnrichedForSpecs.filter((char: any) => {
		const siblings = groupedByCode[char.code] || []
		if (siblings.length <= 1) return true
		return selectedOptions[char.code] === char.characteristicId
	})

	const specsByCategory: Record<number, any[]> = {}
	activeCharacteristics.forEach((char: any) => {
		if (!specsByCategory[char.charCategory]) {
			specsByCategory[char.charCategory] = []
		}
		specsByCategory[char.charCategory].push(char)
	})

	const dynamicSpecifications = Object.entries(specsByCategory).map(([catIdStr, itemsList]) => {
		const catId = parseInt(catIdStr, 10)
		const catInfo = categories.find((c) => c.value === catId)
		const label = catInfo ? catInfo.name.replace(/_/g, ' ') : 'General'

		return {
			id: label.toLowerCase().replace(/\s+/g, '-'),
			label,
			items: itemsList.map((item: any) => {
				const codeInfo = codes.find((c) => c.value === item.code)
				const rowLabel = codeInfo ? codeInfo.name.replace(/_/g, ' ') : item.name
				return {
					label: rowLabel,
					value: item.name,
					unit: item.unit || undefined
				}
			})
		}
	})

	// 4b. Build dynamic SeriesComparison from Products & Series APIs
	const dynamicSeriesComparison: ComparisonSeries[] = (() => {
		const activeSeriesInCategory = (categorySeriesList || []).filter((s: any) => s && s.isActive !== false)
		if (activeSeriesInCategory.length === 0 || allProductsList.length === 0) {
			return []
		}

		// Collect all distinct non-work-area characteristic codes across all products in these series
		const seriesProductsMap = new Map<number, any[]>()
		const allCodeValuesSet = new Set<number>()

		activeSeriesInCategory.forEach((s: any) => {
			const sProds = allProductsList.filter(
				(p: any) => Number(p.seriesId) === Number(s.id) && p.isActive !== false
			)
			seriesProductsMap.set(Number(s.id), sProds)
			sProds.forEach((p: any) => {
				;(p.fullProductCharacteristics || [])
					.filter((x: any) => x.isActive)
					.forEach((pc: any) => {
						const staticChar = fullCharacteristics.find(
							(fc: any) => Number(fc.id) === Number(pc.characteristicId)
						)
						if (staticChar && staticChar.code !== undefined && staticChar.code !== null && !WORK_AREA_CODES.includes(staticChar.code)) {
							allCodeValuesSet.add(Number(staticChar.code))
						}
					})
			})
		})

		const sortedCodes = Array.from(allCodeValuesSet)

		return activeSeriesInCategory
			.map((s: any, idx: number): ComparisonSeries | null => {
				const sProds = seriesProductsMap.get(Number(s.id)) || []
				if (sProds.length === 0) return null

				const workspaces = Array.from(
					new Set(
						sProds
							.map((p: any) => formatWorkAreaText(p.name))
							.filter(Boolean)
					)
				).join(' / ')

				// Group characteristic values by code across all products of this series
				const groupedValuesByCode = new Map<number, Set<string>>()
				const groupedValuesByLabelLower = new Map<string, Set<string>>()

				sProds.forEach((p: any) => {
					;(p.fullProductCharacteristics || [])
						.filter((x: any) => x.isActive)
						.forEach((pc: any) => {
							const staticChar = fullCharacteristics.find(
								(fc: any) => Number(fc.id) === Number(pc.characteristicId)
							)
							if (!staticChar || !staticChar.name) return
							const formattedVal = staticChar.unit
								? `${staticChar.name} ${staticChar.unit}`.trim()
								: String(staticChar.name).trim()
							if (!groupedValuesByCode.has(Number(staticChar.code))) {
								groupedValuesByCode.set(Number(staticChar.code), new Set())
							}
							groupedValuesByCode.get(Number(staticChar.code))!.add(formattedVal)

							const codeInfo = codes.find((c: any) => Number(c.value) === Number(staticChar.code))
							const codeLabel = (codeInfo ? codeInfo.name.replace(/_/g, ' ') : '').toLowerCase()
							if (codeLabel) {
								if (!groupedValuesByLabelLower.has(codeLabel)) {
									groupedValuesByLabelLower.set(codeLabel, new Set())
								}
								groupedValuesByLabelLower.get(codeLabel)!.add(formattedVal)
							}
						})
				})

				const findSpecByKeywords = (keywords: string[], fallback: string): string => {
					const matched: string[] = []
					groupedValuesByLabelLower.forEach((vals, labelLower) => {
						if (keywords.some((kw) => labelLower.includes(kw))) {
							vals.forEach((v) => {
								if (!matched.includes(v)) matched.push(v)
							})
						}
					})
					return matched.length > 0 ? matched.join(' / ') : fallback
				}

				const fallbackMock = baseMockData.seriesComparison?.[idx % Math.max(1, baseMockData.seriesComparison?.length || 1)]

				// Resolve image from series or first product attachment
				let seriesImage = fallbackMock?.image || '/product-cards/cnc-router/image 11649.png'
				if (s.image) {
					seriesImage = formatMediaUrl(s.image)
				} else {
					const firstProdWithImg = sProds.find((p: any) =>
						p.attachments?.some((a: any) => a.type !== 1 && a.fileManager?.url)
					)
					const attUrl = firstProdWithImg?.attachments?.find((a: any) => a.type !== 1 && a.fileManager?.url)?.fileManager?.url
					if (attUrl) {
						seriesImage = formatMediaUrl(attUrl)
					}
				}

				// Build dynamicSpecs list if characteristics exist on products
				const dynamicSpecsList: { label: string; value: string; highlight?: boolean }[] = []
				if (workspaces) {
					dynamicSpecsList.push({ label: 'Workspace', value: workspaces })
				}
				sortedCodes.forEach((codeVal) => {
					const vals = groupedValuesByCode.get(codeVal)
					if (!vals || vals.size === 0) return
					const codeInfo = codes.find((c: any) => Number(c.value) === Number(codeVal))
					const rowLabel = codeInfo ? codeInfo.name.replace(/_/g, ' ') : `Code ${codeVal}`
					const lower = rowLabel.toLowerCase()
					const isHighlight =
						lower.includes('cooling') ||
						lower.includes('sensor') ||
						lower.includes('lubricat') ||
						lower.includes('aspirat')
					dynamicSpecsList.push({
						label: rowLabel,
						value: Array.from(vals).join(' / '),
						highlight: isHighlight
					})
				})

				const sName = s.name || `Series ${s.id}`
				const formattedSeriesTitle = sName.toLowerCase().includes('series') ? sName : `${sName} series`

				// Calculate starting price for series from its products' default characteristics prices sum
				const productDefaultPrices = sProds
					.map((p: any) => {
						const seenCodes = new Set<number>()
						let prodSum = 0
						;(p.fullProductCharacteristics || [])
							.filter((x: any) => x.isActive)
							.forEach((pc: any) => {
								const staticChar = fullCharacteristics.find(
									(fc: any) => Number(fc.id) === Number(pc.characteristicId)
								)
								if (staticChar && staticChar.code !== undefined && !seenCodes.has(Number(staticChar.code))) {
									seenCodes.add(Number(staticChar.code))
									prodSum += Number(pc.price) || 0
								}
							})
						return prodSum
					})
					.filter((val: number) => val > 0)

				const computedSeriesPrice =
					productDefaultPrices.length > 0
						? Math.min(...productDefaultPrices)
						: Number(s.price) || Number(s.startPrice) || 0

				return {
					id: String(s.id),
					firstProductId: sProds[0]?.id,
					image: seriesImage,
					title: formattedSeriesTitle,
					tagline: s.description || fallbackMock?.tagline || 'Wattsan CNC Series',
					price: `$${computedSeriesPrice.toLocaleString()}`,
					active: Number(s.id) === Number(product.seriesId),
					specs: {
						workspace: workspaces || fallbackMock?.specs?.workspace || '600x900 mm / 1300x2500 mm',
						spindle: findSpecByKeywords(['spindle'], fallbackMock?.specs?.spindle || 'from 1,5 kW'),
						motor: findSpecByKeywords(['motor', 'drive'], fallbackMock?.specs?.motor || 'Stepper motor'),
						control: findSpecByKeywords(['control'], fallbackMock?.specs?.control || 'DSP A11 / Syntec'),
						cooling: findSpecByKeywords(['cooling'], fallbackMock?.specs?.cooling || 'Optional'),
						sensorRemovable: findSpecByKeywords(['removable', 'sensor'], fallbackMock?.specs?.sensorRemovable || 'Optional'),
						sensorBuiltIn: findSpecByKeywords(['built-in', 'built in'], fallbackMock?.specs?.sensorBuiltIn || 'Optional'),
						lubrication: findSpecByKeywords(['lubricat'], fallbackMock?.specs?.lubrication || 'Optional'),
						aspiration: findSpecByKeywords(['aspirat'], fallbackMock?.specs?.aspiration || 'Optional')
					},
					dynamicSpecs: dynamicSpecsList.length > 1 ? dynamicSpecsList : undefined
				}
			})
			.filter(Boolean) as ComparisonSeries[]
	})()

	// Resolve gallery inputs
	const defaultImage = '/img/catalog/cnc-routes.png'
	const galleryMain = galleryImages[0] || defaultImage
	const galleryThumbs = galleryImages

	// Formatted product title and breadcrumbs matching Figma 498:2211 & 498:2379
	const seriesDisplayName = series?.name || 'M1'
	const productModelDisplayName = formatWorkAreaText(product.name) || product.name
	const seriesTitle = seriesDisplayName.toLowerCase().includes('series')
		? seriesDisplayName
		: `${seriesDisplayName} series`
	const fullProductTitle = series?.name ? `${series.name} ${productModelDisplayName}` : productModelDisplayName

	const pageBreadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: series?.category?.name || 'CNC Routers', href: '/configurator' },
		{ label: seriesTitle }
	]

	const infoCardsWithActions = baseMockData.infoCards.map((card) => {
		if (card.id === 'materials') {
			return {
				...card,
				onViewAllClick: () => {
					document.getElementById('materials-section')?.scrollIntoView({ behavior: 'smooth' })
				}
			}
		}
		if (card.id === 'expert-reviews') {
			return {
				...card,
				onViewAllClick: () => {
					document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })
				}
			}
		}
		return card
	})

	const handleLogin = (nextAction: () => void) => () => {
		modalsStore.set.open(MODALS.login, {
			initialScreen: 'LOGIN',
			closeOnEscape: false,
			onComplete: nextAction,
			onError: () => {}
		})
	}

	const addProductToBasket = async () => {
		await createBasket({
			referenceId: Number(product.id),
			itemtype: 2,
			quantity: 1,
			itemData: {
				title: fullProductTitle,
				categoryName: series?.category?.name || seriesDisplayName,
				price: formattedCurrentPrice.replace('$', ''),
				image: galleryMain
			}
		})
	}

	const handleAddToBasket = () => {
		if (authorized) {
			addProductToBasket()
		} else {
			modalsStore.set.open(MODALS.infoModal, {
				title: 'To add the product to your basket, you need to Log in or Sign up',
				accentButton: {
					text: 'Log in or Sign up',
					onClick: handleLogin(addProductToBasket)
				},
				secondaryButton: {
					text: 'Cancel',
					onClick: () => modalsStore.set.close()
				}
			})
		}
	}

	const handleToggleFavorite = () => {
		if (!product) return
		const item: TFavoriteItem = {
			id: `prod-${product.id}`,
			referenceId: Number(product.id),
			itemtype: 2,
			name: fullProductTitle,
			code: productModelDisplayName,
			categoryName: series?.category?.name || seriesDisplayName,
			price: formattedCurrentPrice,
			oldPrice: formattedOriginalPrice,
			image: galleryMain,
			available: product.isActive !== false
		}
		toggleFavorite(item)
	}

	const handleConfiguratorClick = () => {
		router.push('/configurator')
	}

	const materialsProcessingData = baseMockData.materialsProcessingData || baseMockData.materialsProcessing

	return (
		<div className={`${styles.productPage} ${styles.productPageNoMargin}`}>
			<Breadcrumbs
				items={pageBreadcrumbs}
				isFavorite={isProductFavorite}
				onFavoriteClick={handleToggleFavorite}
				className={styles.breadcrumbs}
			/>

			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.leftColumn}>
						<ProductImageGallery
							mainImage={galleryMain}
							thumbnails={galleryThumbs}
							hasVideo={Boolean(videoUrl)}
							has360View={false}
							badge={product.isNew ? 'New' : undefined}
							onVideoClick={() => setIsVideoOpen(true)}
							on360ViewClick={() => { }}
						/>
					</div>

					<div className={styles.centerColumn}>
						<ProductParameters parameters={configuratorParameters} />
						<ProductConfiguratorCTA onConfiguratorClick={handleConfiguratorClick} />
					</div>

					<div className={styles.rightColumn}>
						<ProductInfo
							categoryTitle="CNC Router Machine"
							title={seriesTitle}
							rating={5.0}
							reviewCount={10}
							questionCount={21}
							currentPrice={formattedCurrentPrice}
							originalPrice={formattedOriginalPrice}
							discount={formattedDiscount}
							discountPercent={discountPercent}
							availability={product.isActive ? 'In stock' : 'Out of stock'}
							shipment={baseMockData.productInfo.shipment || '2 days'}
							delivery={baseMockData.productInfo.delivery || 'from 20 days'}
							warranty={baseMockData.productInfo.warranty}
							deliveryMethods={baseMockData.productInfo.deliveryMethods}
							activeDeliveryMethod="EXW"
							onDeliveryMethodClick={(method) => console.log('Delivery method selected:', method)}
							deliveryNote={baseMockData.productInfo.deliveryNote}
							isFavorite={isProductFavorite}
							onToggleFavorite={handleToggleFavorite}
							onAddToBasket={handleAddToBasket}
							onViewSpecifications={() => {
								const element = document.getElementById('specifications-table')
								if (element) {
									element.scrollIntoView({ behavior: 'smooth' })
								}
							}}
						/>
					</div>
				</div>

				{infoCardsWithActions && infoCardsWithActions.length > 0 && (
					<div className={styles.infoCardsSection}>
						<ProductInfoCards cards={infoCardsWithActions} />
					</div>
				)}

				{baseMockData.factsCards && baseMockData.factsCards.length > 0 && (
					<div className={styles.factsSliderSection}>
						<WattsanFactsSlider cards={baseMockData.factsCards} />
					</div>
				)}

				{((baseMockData.powerOfMachineData?.features && baseMockData.powerOfMachineData.features.length > 0) || (baseMockData.machineFeatures && baseMockData.machineFeatures.length > 0)) && (
					<div className={styles.powerSection}>
						<ProductDescription
							title={<><span style={{ color: '#E31E24' }}>The power</span> of machine</>}
							image={baseMockData.powerOfMachineData?.image || galleryMain}
							features={baseMockData.powerOfMachineData?.features || baseMockData.machineFeatures}
						/>
					</div>
				)}

				{baseMockData.heartOfTheMachinery && baseMockData.heartOfTheMachinery.tabs && baseMockData.heartOfTheMachinery.tabs.length > 0 && (
					<div className={styles.heartSection}>
						<HeartOfTheMachinery data={baseMockData.heartOfTheMachinery} />
					</div>
				)}

				{materialsProcessingData && ((materialsProcessingData.materials && materialsProcessingData.materials.length > 0) || (materialsProcessingData.images && materialsProcessingData.images.length > 0)) && (
					<div className={styles.materialsSection} id="materials-section">
						<PlentyOfMaterials data={materialsProcessingData} />
					</div>
				)}

				{(dynamicSpecifications.length > 0 || (baseMockData.specifications && baseMockData.specifications.length > 0)) && (
					<div className={styles.specsSection} id="specifications-table">
						<ProductSpecifications
							categories={dynamicSpecifications.length > 0 ? dynamicSpecifications : baseMockData.specifications}
							image={galleryMain}
						/>
					</div>
				)}

				{(dynamicSeriesComparison.length > 0 || (baseMockData.seriesComparison && baseMockData.seriesComparison.length > 0)) && (
					<div className={styles.comparisonSection}>
						<SeriesComparison seriesData={dynamicSeriesComparison.length > 0 ? dynamicSeriesComparison : baseMockData.seriesComparison} />
					</div>
				)}

				{baseMockData.reviews && baseMockData.reviews.length > 0 && (
					<div className={styles.reviewsSection} id="reviews-section">
						<ProductReviews reviews={baseMockData.reviews} />
					</div>
				)}

				{baseMockData.madeWithWattsan && (baseMockData.madeWithWattsan.slides?.length > 0 || baseMockData.madeWithWattsan.image) && (
					<div className={styles.madeWithSection}>
						<MadeWithWattsan
							image={baseMockData.madeWithWattsan?.image}
							slides={baseMockData.madeWithWattsan?.slides}
						/>
					</div>
				)}

				{baseMockData.productionProcess && baseMockData.productionProcess.length > 0 && (
					<div className={styles.productionSection}>
						<ProductionProcess steps={baseMockData.productionProcess} />
					</div>
				)}

				{baseMockData.serviceAndSupport && baseMockData.serviceAndSupport.cards && baseMockData.serviceAndSupport.cards.length > 0 && (
					<div className={styles.serviceSection}>
						<ServiceAndSupport
							image={baseMockData.serviceAndSupport.image}
							cards={baseMockData.serviceAndSupport.cards}
						/>
					</div>
				)}

				<div className={styles.reviewsAndQuestionsSection}>
					<ProductReviewsAndQuestions />
				</div>

				{baseMockData.packageList && baseMockData.packageList.length > 0 && (
					<div className={styles.packageListSection}>
						<PackageList items={baseMockData.packageList} />
					</div>
				)}

				{baseMockData.additionalContent && (
					<div className={styles.additionalContentSection}>
						<AdditionalContent items={baseMockData.additionalContent} />
					</div>
				)}

				{baseMockData.faqData && baseMockData.faqData.length > 0 && (
					<div className={styles.faqSection}>
						<FAQ items={baseMockData.faqData} />
					</div>
				)}

				<div className={styles.advisorSection}>
					<MachineAdvisor data={baseMockData.machineAdvisor} />
				</div>

				{baseMockData.interestedProducts && baseMockData.interestedProducts.length > 0 && (
					<div className={styles.interestedSection}>
						<InterestedProducts products={baseMockData.interestedProducts} />
					</div>
				)}

				<div className={styles.blogSection}>
					<ProductBlog articles={baseMockData.blogArticles} />
				</div>

				{baseMockData.safetyCabinData && (
					<div className={styles.safetyCabinSection}>
						<SafetyCabin
							title={
								baseMockData.safetyCabinData?.title || (
									<span><span style={{ color: '#E31E24' }}>Safety</span> cabin</span>
								)
							}
							description={baseMockData.safetyCabinData?.description}
							features={baseMockData.safetyCabinData?.features || baseMockData.safetyCabinFeatures}
							image={baseMockData.safetyCabinData?.image || '/product-cards/cnc-router/safety-cabin/sc-1.png'}
						/>
					</div>
				)}

				{baseMockData.rotaryDeviceData && (
					<div className={styles.rotaryDeviceSection}>
						<RotaryDevice
							subtitle={baseMockData.rotaryDeviceData?.subtitle || 'WATTSAN RD Rotary Device'}
							title={baseMockData.rotaryDeviceData?.title || 'Precision Multi-Sided Machining with Integrated Fourth Axis'}
							description={baseMockData.rotaryDeviceData?.description}
							specs={baseMockData.rotaryDeviceData?.specs || baseMockData.rotaryDeviceSpecs}
							image={baseMockData.rotaryDeviceData?.image || '/product-cards/cnc-router/rd-rotary/rd-r-1.png'}
						/>
					</div>
				)}

				{baseMockData.separateRotaryDeviceData && (
					<div className={styles.separateRotaryDeviceSection}>
						<SeparateRotaryDevice
							title={
								baseMockData.separateRotaryDeviceData?.title || (
									<span><span style={{ color: '#E31E24' }}>Separate</span> rotary device</span>
								)
							}
							description={baseMockData.separateRotaryDeviceData?.description}
							featuresTitle={baseMockData.separateRotaryDeviceData?.featuresTitle || 'Key Features'}
							features={baseMockData.separateRotaryDeviceData?.features || []}
							image={baseMockData.separateRotaryDeviceData?.image || '/product-cards/cnc-router/rd-rotary/separate-rotary-device.svg'}
						/>
					</div>
				)}

				{baseMockData.multiSpindlesData && (
					<div className={styles.multiSpindlesSection}>
						<MultiSpindles
							title={baseMockData.multiSpindlesData?.title || '4 spindles'}
							subtitle={baseMockData.multiSpindlesData?.subtitle || 'x4 productivity'}
							description1={baseMockData.multiSpindlesData?.description1}
							description2={baseMockData.multiSpindlesData?.description2}
							specs={baseMockData.multiSpindlesData?.specs || baseMockData.multiSpindlesSpecs}
							image={baseMockData.multiSpindlesData?.image || '/product-cards/cnc-router/spindles/spindles-4.png'}
						/>
					</div>
				)}

				{baseMockData.toolSwitchData && (
					<div className={styles.toolSwitchSection}>
						<AutomaticToolSwitch
							title={
								baseMockData.toolSwitchData?.title || (
									<span><span style={{ color: '#E31E24' }}>Automatic</span> tool switch</span>
								)
							}
							subtitle={baseMockData.toolSwitchData?.subtitle || 'Requires no intervention during operation'}
							description={baseMockData.toolSwitchData?.description}
							subHeading={baseMockData.toolSwitchData?.subHeading}
							subDescription={baseMockData.toolSwitchData?.subDescription}
							variants={baseMockData.toolSwitchData?.variants || baseMockData.toolSwitchVariants}
							image={baseMockData.toolSwitchData?.image || '/product-cards/cnc-router/automatic-tool-switch/image.png'}
						/>
					</div>
				)}

				{baseMockData.liquidCoolingData && (
					<div className={styles.liquidCoolingSection}>
						<LiquidCoolingSystem
							title={
								baseMockData.liquidCoolingData?.title || (
									<span><span style={{ color: '#E31E24' }}>Liquid</span> cooling system</span>
								)
							}
							subtitle={baseMockData.liquidCoolingData?.subtitle || 'All models supported'}
							description={baseMockData.liquidCoolingData?.description}
							types={baseMockData.liquidCoolingData?.types || baseMockData.liquidCoolingTypes}
						/>
					</div>
				)}

				{baseMockData.aspirationData && (
					<div className={styles.aspirationSection}>
						<AspirationSystem
							title={
								baseMockData.aspirationData?.title || (
									<span><span style={{ color: '#E31E24' }}>Aspiration</span> System</span>
								)
							}
							subtitle={baseMockData.aspirationData?.subtitle || 'All models supported'}
							description={baseMockData.aspirationData?.description}
							videoUrl={baseMockData.aspirationData?.videoUrl || baseMockData.aspirationSystem?.videoUrl}
						/>
					</div>
				)}

				{baseMockData.tableTypes && baseMockData.tableTypes.length > 0 && (
					<div className={styles.tableTypesSection}>
						<TableTypes
							title={<span><span style={{ color: '#E31E24' }}>Table types</span> for your tasks</span>}
							items={baseMockData.tableTypes}
						/>
					</div>
				)}
			</div>

			{/* Local Video Overlay Modal */}
			{isVideoOpen && videoUrl && (
				<div className={styles.videoOverlay} onClick={() => setIsVideoOpen(false)}>
					<div className={styles.videoModalWrapper} onClick={(e) => e.stopPropagation()}>
						<button className={styles.closeButton} onClick={() => setIsVideoOpen(false)}>
							&times;
						</button>
						<VideoPlayer videoSrc={videoUrl} />
					</div>
				</div>
			)}
		</div>
	)
}

export default ProductPage
