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
import TableTypes from '@components/modules/product-page/table-types/TableTypes'
import ProductSpecifications from '@components/modules/product-page/product-specifications/ProductSpecifications'
import SeriesComparison from '@components/modules/product-page/series-comparison/SeriesComparison'
import ProductReviews from '@components/modules/product-page/product-reviews/ProductReviews'
import MadeWithWattsan from '@components/modules/product-page/made-with-wattsan/MadeWithWattsan'
import ProductionProcess from '@components/modules/product-page/production-process/ProductionProcess'
import ServiceAndSupport from '@components/modules/product-page/service-and-support/ServiceAndSupport'
import PackageList from '@components/modules/product-page/package-list/PackageList'
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
	getSeriesById,
	getProductsBySeriesId,
	formatProductModelName
} from '@api/product'
import { authStore } from '@store/auth'
import { modalsStore } from '@store/modals'
import { MODALS } from '@components/ui/modal/Modal'
import { createBasket } from '@store/basket/actions'
import { ProductPageData, ProductParameter } from '@my-types/product'

import styles from './page.module.scss'

const ProductPage = ({ params }: { params: { id: string } }) => {
	const router = useRouter()
	const authorized = authStore.use.authorized()
	const [product, setProduct] = useState<any>(null)
	const [series, setSeries] = useState<any>(null)
	const [seriesProducts, setSeriesProducts] = useState<any[]>([])
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

				// 2. Fetch series and sibling products for this series
				if (productData.seriesId) {
					const [seriesData, prodsInSeries] = await Promise.all([
						getSeriesById(productData.seriesId),
						getProductsBySeriesId(productData.seriesId)
					])
					if (seriesData) setSeries(seriesData)
					if (prodsInSeries) setSeriesProducts(prodsInSeries)
				}

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
								if (att.type === 1) { // Video
									foundVideoUrl = url
								} else { // Image
									imageList.push(url)
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

	// 2. Group characteristics by code to form parameters
	// Exclude work area codes (38: Machine_working_area, 81: Work_area, 82: Working_area) from standard characteristics
	// because the primary Work Area (Model) select handles switching products
	const WORK_AREA_CODES = [36, 38, 81, 82]

	const groupedByCode: Record<number, any[]> = {}
	enrichedCharacteristics.forEach((char: any) => {
		if (WORK_AREA_CODES.includes(char.code)) return

		if (!groupedByCode[char.code]) {
			groupedByCode[char.code] = []
		}
		groupedByCode[char.code].push(char)
	})

	// Build characteristic parameter inputs
	const dynamicCharacteristicsParameters: ProductParameter[] = Object.entries(groupedByCode)
		.map(([codeStr, optionsList]) => {
			const code = parseInt(codeStr, 10)
			const codeInfo = codes.find((x) => x.value === code)
			const label = codeInfo ? codeInfo.name.replace(/_/g, ' ') : `Parameter ${code}`

			const validOptions = optionsList.filter((opt) => opt.name && opt.name.trim() !== '')
			if (validOptions.length === 0) return null

			const selectedValue = selectedOptions[code] || (validOptions[0]?.characteristicId)
			const chosenOpt = validOptions.find((opt) => opt.characteristicId === selectedValue) || validOptions[0]

			return {
				id: codeStr,
				label,
				type: validOptions.length > 3 ? 'select' : 'radio',
				value: selectedValue,
				options: validOptions.map((opt) => {
					const priceDiff = opt.price - (chosenOpt?.price || 0)
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
	const modelOptions = seriesProducts.length > 0
		? seriesProducts.map((p: any) => ({
			value: p.id,
			text: formatProductModelName(p.name)
		}))
		: [{
			value: currentProductId,
			text: formatProductModelName(product.name)
		}]

	const modelParameter: ProductParameter = {
		id: 'work-area-model',
		label: 'Work area (model)',
		type: 'select',
		value: currentProductId,
		options: modelOptions,
		onChange: (val) => {
			const targetId = typeof val === 'string' ? parseInt(val, 10) : val
			if (targetId && targetId !== currentProductId) {
				router.push(`/product/${targetId}`)
			}
		}
	}

	const dynamicParameters: ProductParameter[] = [
		modelParameter,
		...dynamicCharacteristicsParameters
	]

	// Calculate total price based on base product/series price + selected characteristics sum
	const rawBasePrice = (product?.price && Number(product.price) > 0)
		? Number(product.price)
		: (product?.orderPrice && Number(product.orderPrice) > 0)
			? Number(product.orderPrice)
			: (series?.startPrice && Number(series.startPrice) > 0)
				? Number(series.startPrice)
				: (baseMockData?.productInfo?.currentPrice ? parseInt(baseMockData.productInfo.currentPrice.replace(/\D/g, ''), 10) : 1000)

	const optionsPriceSum = Object.entries(selectedOptions).reduce((sum, [codeStr, charId]) => {
		const code = parseInt(codeStr, 10)
		const activeChar = (groupedByCode[code] || []).find((c) => c.characteristicId === charId)
		return sum + (activeChar?.price || 0)
	}, 0)

	const currentPriceValue = rawBasePrice + optionsPriceSum

	// Determine initial discount from catalog hint prices
	const initialDiscount = (product.oldPrice && product.oldPrice > product.price)
		? (product.oldPrice - product.price)
		: (baseMockData?.productInfo?.discount ? parseInt(baseMockData.productInfo.discount.replace(/\D/g, ''), 10) : 1000)

	const originalPriceValue = currentPriceValue + initialDiscount
	const discountValue = initialDiscount

	const formattedCurrentPrice = `$${currentPriceValue.toLocaleString()}`
	const formattedOriginalPrice = originalPriceValue > currentPriceValue ? `$${originalPriceValue.toLocaleString()}` : formattedCurrentPrice
	const formattedDiscount = discountValue > 0 ? `$${discountValue.toLocaleString()}` : undefined
	const discountPercent = discountValue > 0 ? `${Math.round((discountValue / originalPriceValue) * 100)}%` : undefined

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

	// Resolve gallery inputs
	const defaultImage = '/img/catalog/cnc-routes.png'
	const galleryMain = galleryImages[0] || defaultImage
	const galleryThumbs = galleryImages.length > 0 ? galleryImages : [defaultImage]

	// Formatted product title and breadcrumbs
	const seriesDisplayName = series?.name || 'CNC Routers'
	const productModelDisplayName = formatProductModelName(product.name) || product.name
	const fullProductTitle = series?.name ? `${series.name} ${productModelDisplayName}` : productModelDisplayName

	const pageBreadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: series?.category?.name || 'CNC Routers', href: '/configurator' },
		{ label: `${seriesDisplayName} Series` },
		{ label: productModelDisplayName }
	]

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

	const handleConfiguratorClick = () => {
		router.push('/configurator')
	}

	return (
		<div className={`${styles.productPage} ${styles.productPageNoMargin}`}>
			<div className={styles.container}>
				<Breadcrumbs items={pageBreadcrumbs} className={styles.breadcrumbs} />

				<div className={styles.content}>
					<div className={styles.leftColumn}>
						<ProductImageGallery
							mainImage={galleryMain}
							thumbnails={galleryThumbs}
							hasVideo={!!videoUrl}
							has360View={false}
							badge={product.rating ? `Rating: ${product.rating}` : 'New'}
							onVideoClick={() => setIsVideoOpen(true)}
							on360ViewClick={() => { }}
						/>
					</div>

					<div className={styles.centerColumn}>
						{dynamicParameters.length > 0 ? (
							<ProductParameters parameters={dynamicParameters} />
						) : (
							<div className={styles.noParams} style={{ padding: '24px', background: '#f9f9f9', borderRadius: '8px' }}>
								<Typography tag="p" size="s" weight="regular">
									No configuration choices available for this product.
								</Typography>
							</div>
						)}
					</div>

					<div className={styles.rightColumn}>
						<ProductInfo
							title={fullProductTitle}
							rating={parseFloat(product.rating) || 5.0}
							reviewCount={12}
							questionCount={4}
							currentPrice={formattedCurrentPrice}
							originalPrice={formattedOriginalPrice}
							discount={formattedDiscount}
							discountPercent={discountPercent}
							availability={product.isActive ? 'In stock' : 'Out of stock'}
							shipment="2 days"
							delivery="from 20 days"
							deliveryMethods={baseMockData.productInfo.deliveryMethods}
							activeDeliveryMethod="EXW"
							onDeliveryMethodClick={(method) => console.log('Delivery method selected:', method)}
							deliveryNote={baseMockData.productInfo.deliveryNote}
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

				<div className={styles.ctaSection}>
					<ProductConfiguratorCTA onConfiguratorClick={handleConfiguratorClick} />
				</div>
				<div className={styles.infoCardsSection}>
					<ProductInfoCards cards={baseMockData.infoCards} />
				</div>
				<div className={styles.factsSliderSection}>
					<WattsanFactsSlider cards={baseMockData.factsCards} />
				</div>

				<div className={styles.powerSection}>
					<ProductDescription
						title={<span><span style={{ color: '#E31E24' }}>The power</span> of machine</span>}
						image={galleryMain}
						features={baseMockData.machineFeatures}
					/>
				</div>

				{baseMockData.heartOfTheMachinery && (
					<div className={styles.heartSection}>
						<HeartOfTheMachinery data={baseMockData.heartOfTheMachinery} />
					</div>
				)}

				{baseMockData.safetyCabinData && (
					<div className={styles.safetyCabinSection}>
						<SafetyCabin
							title={baseMockData.safetyCabinData.title || 'Safety Cabin'}
							description={baseMockData.safetyCabinData.description || ''}
							features={baseMockData.safetyCabinData.features || []}
							image={baseMockData.safetyCabinData.image || ''}
						/>
					</div>
				)}

				{baseMockData.rotaryDeviceData && (
					<div className={styles.rotaryDeviceSection}>
						<RotaryDevice
							subtitle={baseMockData.rotaryDeviceData.subtitle}
							title={baseMockData.rotaryDeviceData.title || 'Rotary Device'}
							description={baseMockData.rotaryDeviceData.description || ''}
							specs={baseMockData.rotaryDeviceData.specs || []}
							image={baseMockData.rotaryDeviceData.image || ''}
						/>
					</div>
				)}

				{baseMockData.separateRotaryDeviceData && (
					<div className={styles.separateRotarySection}>
						<SeparateRotaryDevice
							title={baseMockData.separateRotaryDeviceData.title || 'Separate Rotary Device'}
							description={baseMockData.separateRotaryDeviceData.description || ''}
							featuresTitle={baseMockData.separateRotaryDeviceData.featuresTitle}
							features={baseMockData.separateRotaryDeviceData.features || []}
							image={baseMockData.separateRotaryDeviceData.image || ''}
						/>
					</div>
				)}

				{baseMockData.multiSpindlesData && (
					<div className={styles.multiSpindlesSection}>
						<MultiSpindles
							title={baseMockData.multiSpindlesData.title || 'Multi Spindles'}
							subtitle={baseMockData.multiSpindlesData.subtitle || ''}
							description1={baseMockData.multiSpindlesData.description1 || ''}
							description2={baseMockData.multiSpindlesData.description2 || ''}
							specs={baseMockData.multiSpindlesData.specs || []}
							image={baseMockData.multiSpindlesData.image}
						/>
					</div>
				)}

				{baseMockData.toolSwitchData && (
					<div className={styles.toolSwitchSection}>
						<AutomaticToolSwitch
							title={baseMockData.toolSwitchData.title || 'Automatic Tool Switch'}
							subtitle={baseMockData.toolSwitchData.subtitle}
							description={baseMockData.toolSwitchData.description}
							image={baseMockData.toolSwitchData.image}
							subHeading={baseMockData.toolSwitchData.subHeading}
							subDescription={baseMockData.toolSwitchData.subDescription}
							variants={baseMockData.toolSwitchData.variants || []}
						/>
					</div>
				)}

				{baseMockData.liquidCoolingData && (
					<div className={styles.liquidCoolingSection}>
						<LiquidCoolingSystem
							title={baseMockData.liquidCoolingData.title || 'Liquid Cooling System'}
							subtitle={baseMockData.liquidCoolingData.subtitle || ''}
							description={baseMockData.liquidCoolingData.description || ''}
							types={baseMockData.liquidCoolingData.types || []}
						/>
					</div>
				)}

				{baseMockData.tableTypes && baseMockData.tableTypes.length > 0 && (
					<div className={styles.tableTypesSection}>
						<TableTypes
							title="Table Types"
							items={baseMockData.tableTypes}
						/>
					</div>
				)}

				<div className={styles.specsSection} id="specifications-table">
					<ProductSpecifications categories={dynamicSpecifications.length > 0 ? dynamicSpecifications : baseMockData.specifications} />
				</div>

				<div className={styles.comparisonSection}>
					<SeriesComparison seriesData={baseMockData.seriesComparison} />
				</div>

				<div className={styles.reviewsSection}>
					<ProductReviews reviews={baseMockData.reviews} />
				</div>

				<div className={styles.madeWithSection}>
					<MadeWithWattsan />
				</div>

				<div className={styles.productionSection}>
					<ProductionProcess steps={baseMockData.productionProcess} />
				</div>

				<div className={styles.serviceSection}>
					<ServiceAndSupport
						image={baseMockData.serviceAndSupport.image}
						cards={baseMockData.serviceAndSupport.cards}
					/>
				</div>

				<div className={styles.packageListSection}>
					<PackageList items={baseMockData.packageList} />
				</div>

				<div className={styles.faqSection}>
					<FAQ items={baseMockData.faqData} />
				</div>

				<div className={styles.advisorSection}>
					<MachineAdvisor />
				</div>

				<div className={styles.interestedSection}>
					<InterestedProducts products={baseMockData.interestedProducts} />
				</div>

				<div className={styles.blogSection}>
					<ProductBlog />
				</div>
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
