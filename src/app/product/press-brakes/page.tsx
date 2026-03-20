'use client'

import { useEffect, useState } from 'react'
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
import PlentyOfMaterials from '@components/modules/product-page/plenty-of-materials/PlentyOfMaterials'
import ProductSpecifications from '@components/modules/product-page/product-specifications/ProductSpecifications'
import ProductReviews from '@components/modules/product-page/product-reviews/ProductReviews'
import MadeWithWattsan from '@components/modules/product-page/made-with-wattsan/MadeWithWattsan'
import ProductionProcess from '@components/modules/product-page/production-process/ProductionProcess'
import ServiceAndSupport from '@components/modules/product-page/service-and-support/ServiceAndSupport'
import ProductReviewsAndQuestions from '@components/modules/product-page/product-reviews-and-questions/ProductReviewsAndQuestions'
import PackageList from '@components/modules/product-page/package-list/PackageList'
import AdditionalContent from '@components/modules/product-page/additional-content/AdditionalContent'
import FAQ from '@components/modules/product-page/faq/FAQ'
import MachineAdvisor from '@components/modules/product-page/machine-advisor/MachineAdvisor'
import InterestedProducts from '@components/modules/product-page/interested-products/InterestedProducts'
import ProductBlog from '@components/modules/product-page/product-blog/ProductBlog'
import SafetyCabin from '@components/modules/product-page/safety-cabin/SafetyCabin'
import AspirationSystem from '@components/modules/product-page/aspiration-system/AspirationSystem'
import { Typography } from '@components/ui/typography/Typography'

import styles from './page.module.scss'

import { getProductPageData } from '@api/product'
import { ProductPageData, ProductParameter } from '@my-types/product'

const ProductPage = ({ params }: { params: { productId: string } }) => {
	const router = useRouter()

	const [productData, setProductData] = useState<ProductPageData | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const [parameters, setParameters] = useState<ProductParameter[]>([
		{
			id: 'bendingLength',
			label: 'Max bending length',
			type: 'select',
			value: '2500',
			options: [
				{ value: '2000', text: '2000 mm' },
				{ value: '2500', text: '2500 mm' },
				{ value: '3200', text: '3200 mm' }
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) => (p.id === 'bendingLength' ? { ...p, value: value as string } : p)),
				)
			}
		},
		{
			id: 'tonnage',
			label: 'Tonnage',
			type: 'select',
			value: '80',
			options: [
				{ value: '60', text: '60 t' },
				{ value: '80', text: '80 t' },
				{ value: '100', text: '100 t' }
			],
			onChange: (value) => {
				setParameters((prev) => prev.map((p) => (p.id === 'tonnage' ? { ...p, value: value as string } : p)))
			}
		},
		{
			id: 'controlSystem',
			label: 'Control system',
			type: 'select',
			value: 'DA-66',
			options: [
				{ value: 'DA-66', text: 'DA-66' },
				{ value: 'DA-82', text: 'DA-82' }
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) => (p.id === 'controlSystem' ? { ...p, value: value as string } : p)),
				)
			}
		},
		{
			id: 'backGaugeAutomation',
			label: 'Back gauge automation',
			type: 'radio',
			value: 'included',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' }
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) => (p.id === 'backGaugeAutomation' ? { ...p, value: value as string } : p)),
				)
			}
		},
		{
			id: 'safetyLightCurtain',
			label: 'Safety light curtain',
			type: 'radio',
			value: 'included',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' }
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) => (p.id === 'safetyLightCurtain' ? { ...p, value: value as string } : p)),
				)
			}
		}
	])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getProductPageData('press-brakes')
				setProductData(data)
			} catch (error) {
				console.error('Failed to fetch product data', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const handleAddToBasket = () => {
		console.log('Add to basket', { productId: params?.productId, parameters })
	}

	const handleConfiguratorClick = () => {
		router.push('/configurator')
	}

	const handleViewSpecifications = () => {
		console.log('View specifications clicked')
	}

	if (isLoading || !productData) {
		return <div className={styles.loadingContainer}>Loading...</div>
	}

	return (
		<div className={`${styles.productPage} ${styles.productPageNoMargin}`}>
			<div className={styles.container}>
				<Breadcrumbs items={productData.breadcrumbs} className={styles.breadcrumbs} />

				<div className={styles.content}>
					<div className={styles.leftColumn}>
						<ProductImageGallery
							mainImage={productData.gallery.mainImage}
							thumbnails={productData.gallery.thumbnails}
							hasVideo={false}
							has360View={true}
							badge='New'
							onVideoClick={() => console.log('Video clicked')}
							on360ViewClick={() => console.log('360 view clicked')}
						/>
					</div>

					<div className={styles.centerColumn}>
						<ProductParameters parameters={parameters} />
					</div>

					<div className={styles.rightColumn}>
						<ProductInfo
							title={productData.productInfo.title}
							rating={productData.productInfo.rating}
							reviewCount={productData.productInfo.reviewCount}
							questionCount={productData.productInfo.questionCount}
							currentPrice={productData.productInfo.currentPrice}
							originalPrice={productData.productInfo.originalPrice}
							discount={productData.productInfo.discount}
							discountPercent={productData.productInfo.discountPercent}
							availability={productData.productInfo.availability}
							shipment={productData.productInfo.shipment}
							delivery={productData.productInfo.delivery}
							deliveryMethods={productData.productInfo.deliveryMethods}
							activeDeliveryMethod='EXW'
							onDeliveryMethodClick={(method) => console.log('Delivery method selected:', method)}
							deliveryNote={productData.productInfo.deliveryNote}
							onAddToBasket={handleAddToBasket}
							onViewSpecifications={handleViewSpecifications}
						/>
					</div>
				</div>

				<div className={styles.ctaSection}>
					<ProductConfiguratorCTA onConfiguratorClick={handleConfiguratorClick} />
				</div>

				<div className={styles.infoCardsSection}>
					<ProductInfoCards cards={productData.infoCards} />
				</div>

				<div className={styles.factsSliderSection}>
					<WattsanFactsSlider titleHighlight='Wattsan press brakes' cards={productData.factsCards} />
				</div>

				<div className={styles.powerSection}>
					<ProductDescription
						title={<span><span style={{ color: '#E31E24' }}>The power</span> of bending</span>}
						image={productData.gallery.mainImage}
						features={productData.machineFeatures}
					/>
				</div>

				<div className={styles.heartSection}>
					<HeartOfTheMachinery data={productData.heartOfTheMachinery} />
				</div>

				<div className={styles.materialsSection}>
					<PlentyOfMaterials data={productData.materialsProcessing} />
				</div>

				<div className={styles.specsSection}>
					<ProductSpecifications categories={productData.specifications} />
				</div>

				<div className={styles.reviewsSection}>
					<ProductReviews reviews={productData.reviews} />
				</div>

				<div className={styles.madeWithSection}>
					<MadeWithWattsan />
				</div>

				<div className={styles.productionSection}>
					<ProductionProcess steps={productData.productionProcess} />
				</div>

				<div className={styles.serviceSection}>
					<ServiceAndSupport
						image={productData.serviceAndSupport.image}
						cards={productData.serviceAndSupport.cards}
					/>
				</div>

				<div className={styles.reviewsAndQuestionsSection}>
					<ProductReviewsAndQuestions />
				</div>

				<div className={styles.packageListSection}>
					<PackageList items={productData.packageList} />
				</div>

				<div className={styles.additionalContentSection}>
					<AdditionalContent />
				</div>

				<div className={styles.faqSection}>
					<FAQ />
				</div>

				<div className={styles.advisorSection}>
					<MachineAdvisor />
				</div>

				<div className={styles.interestedSection}>
					<InterestedProducts products={productData.interestedProducts} />
				</div>

				<div className={styles.blogSection}>
					<ProductBlog />
				</div>

				<div className={styles.safetyCabinSection}>
					<SafetyCabin
						title={<span><span style={{ color: '#E31E24' }}>Safety</span> cabin</span>}
						description={
							<Typography tag='p' size='s' weight='regular' style={{ marginBottom: '16px' }}>
								Operator protection is ensured by integrated guards and responsive safety systems.
								This helps prevent collisions and keeps the workspace compliant with safety standards.
							</Typography>
						}
						features={productData.safetyCabinFeatures}
						image='/product-cards/cnc-router/safety-cabin/sc-1.png'
					/>
				</div>

				{productData.aspirationSystem && (
					<div className={styles.aspirationSection}>
						<AspirationSystem
							title={
								<span>
									{productData.aspirationSystem.title.map((part, index) => (
										<span key={index} style={{ color: part.color || 'inherit' }}>
											{part.text}
										</span>
									))}
								</span>
							}
							subtitle={productData.aspirationSystem.subtitle}
							description={
								<>
									{productData.aspirationSystem.descriptions.map((desc, index) => (
										<Typography
											key={index}
											tag='p'
											size='s'
											weight='regular'
											style={
												index < productData.aspirationSystem!.descriptions.length - 1
													? { marginBottom: '16px' }
													: undefined
											}
										>
											{desc}
										</Typography>
									))}
								</>
							}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductPage

