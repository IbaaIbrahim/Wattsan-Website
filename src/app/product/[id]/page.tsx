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
	getFileManagerItem 
} from '@api/product'
import { ProductPageData, ProductParameter } from '@my-types/product'

import styles from './page.module.scss'

const ProductPage = ({ params }: { params: { id: string } }) => {
	const router = useRouter()
	const [product, setProduct] = useState<any>(null)
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
			try {
				// Fetch API data
				const productData = await getProductById(params.id)
				if (!productData) {
					setIsLoading(false)
					return
				}
				setProduct(productData)

				const enums = await getCharacteristicsEnums()
				if (enums) {
					setCategories(enums.characteristicsCategories || [])
					setCodes(enums.characteristicsCodes || [])
				}

				const fullChars = await getFullCharacteristics()
				setFullCharacteristics(fullChars || [])

				// Fetch layout base mock data
				const mockData = await getProductPageData('cnc-router')
				setBaseMockData(mockData)

				// Resolve attachments
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

				// Initialize default selected options for parameters
				// Map current product characteristics to get code enums
				const initialSelections: Record<number, number> = {}
				if (productData.fullProductCharacteristics) {
					productData.fullProductCharacteristics.forEach((pc: any) => {
						const staticChar = fullChars.find((fc: any) => fc.id === pc.characteristicId)
						if (staticChar) {
							// If code group hasn't been set yet, or we prefer checking order/price
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
	const enrichedCharacteristics = (product.fullProductCharacteristics || []).map((pc: any) => {
		const staticChar = fullCharacteristics.find((fc: any) => fc.id === pc.characteristicId)
		return {
			...pc,
			name: staticChar?.name || '',
			unit: staticChar?.unit || '',
			charCategory: staticChar?.charCategory ?? 0,
			code: staticChar?.code ?? 0,
			order: staticChar?.order ?? 0,
		}
	})

	// 2. Group characteristics by code to form parameters
	const groupedByCode: Record<number, any[]> = {}
	enrichedCharacteristics.forEach((char: any) => {
		if (!groupedByCode[char.code]) {
			groupedByCode[char.code] = []
		}
		groupedByCode[char.code].push(char)
	})

	// Build ProductParameters list
	const dynamicParameters: ProductParameter[] = Object.entries(groupedByCode).map(([codeStr, optionsList]) => {
		const code = parseInt(codeStr, 10)
		const codeInfo = codes.find((x) => x.value === code)
		const label = codeInfo ? codeInfo.name.replace(/_/g, ' ') : `Parameter ${code}`

		const selectedValue = selectedOptions[code] || (optionsList[0]?.characteristicId)
		const chosenOpt = optionsList.find((opt) => opt.characteristicId === selectedValue)

		return {
			id: codeStr,
			label,
			type: optionsList.length > 3 ? 'select' : 'radio',
			value: selectedValue,
			options: optionsList.map((opt) => {
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

	// Calculate total price based on selected characteristics sum
	const currentPriceValue = Object.entries(selectedOptions).reduce((sum, [codeStr, charId]) => {
		const code = parseInt(codeStr, 10)
		const activeChar = (groupedByCode[code] || []).find((c) => c.characteristicId === charId)
		return sum + (activeChar?.price || 0)
	}, 0)

	// Determine initial discount from catalog hint prices
	const initialDiscount = (product.oldPrice && product.oldPrice > product.price) ? (product.oldPrice - product.price) : 0
	const originalPriceValue = currentPriceValue + initialDiscount
	const discountValue = initialDiscount

	const formattedCurrentPrice = `$${currentPriceValue.toLocaleString()}`
	const formattedOriginalPrice = originalPriceValue > currentPriceValue ? `$${originalPriceValue.toLocaleString()}` : formattedCurrentPrice
	const formattedDiscount = discountValue > 0 ? `$${discountValue.toLocaleString()}` : undefined
	const discountPercent = discountValue > 0 ? `${Math.round((discountValue / originalPriceValue) * 100)}%` : undefined


	// 3. Build dynamic specifications categories list
	// Filter characteristics to include only selected ones (or single options)
	const activeCharacteristics = enrichedCharacteristics.filter((char: any) => {
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

	// Breadcrumbs mapping
	const pageBreadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Products', href: '/catalog' },
		{ label: product.series?.name || 'Series' },
		{ label: product.name }
	]

	const handleAddToBasket = () => {
		console.log('Add to basket', { productId: product.id, selectedOptions, totalPrice: currentPriceValue })
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
							on360ViewClick={() => {}}
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
							title={product.name}
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

				<div className={styles.heartSection}>
					<HeartOfTheMachinery data={baseMockData.heartOfTheMachinery} />
				</div>

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
					<FAQ />
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
