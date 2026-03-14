'use client'

import { useState, useEffect } from 'react'
import Breadcrumbs from '@components/modules/product-page/breadcrumbs/Breadcrumbs'
import ProductImageGallery from '@components/modules/product-page/product-image-gallery/ProductImageGallery'
import ProductParameters from '@components/modules/product-page/product-parameters/ProductParameters'
import ProductInfo from '@components/modules/product-page/product-info/ProductInfo'
import ProductConfiguratorCTA from '@components/modules/product-page/product-configurator-cta/ProductConfiguratorCTA'
import ProductInfoCards from '@components/modules/product-page/product-info-cards/ProductInfoCards'
import WattsanFactsSlider from '@components/modules/product-page/wattsan-facts-slider/WattsanFactsSlider'
import { useRouter } from 'next/navigation'
import { Typography } from '@components/ui/typography/Typography'

import styles from './page.module.scss'
import ProductDescription from '@components/modules/product-page/product-description/ProductDescription'
import HeartOfTheMachinery from '@components/modules/product-page/heart-of-the-machinery/HeartOfTheMachinery'
import ProductSpecifications from '@components/modules/product-page/product-specifications/ProductSpecifications'
import SeriesComparison from '@components/modules/product-page/series-comparison/SeriesComparison'
import ProductReviews from '@components/modules/product-page/product-reviews/ProductReviews'
import ProductReviewsAndQuestions from '@components/modules/product-page/product-reviews-and-questions/ProductReviewsAndQuestions'
import MadeWithWattsan from '@components/modules/product-page/made-with-wattsan/MadeWithWattsan'
import AspirationSystem from '@components/modules/product-page/aspiration-system/AspirationSystem'
import MachineAdvisor from '@components/modules/product-page/machine-advisor/MachineAdvisor'
import ProductionProcess from '@components/modules/product-page/production-process/ProductionProcess'
import ServiceAndSupport from '@components/modules/product-page/service-and-support/ServiceAndSupport'
import PackageList from '@components/modules/product-page/package-list/PackageList'
import AdditionalContent from '@components/modules/product-page/additional-content/AdditionalContent'
import FAQ from '@components/modules/product-page/faq/FAQ'
import InterestedProducts from '@components/modules/product-page/interested-products/InterestedProducts'
import ProductBlog from '@components/modules/product-page/product-blog/ProductBlog'
import PlentyOfMaterials from '@components/modules/product-page/plenty-of-materials/PlentyOfMaterials'

import { getProductPageData } from '@api/product'
import { ProductPageData, ProductParameter } from '@my-types/product'

const ProductPage = ({ params }: { params: { productId: string } }) => {
	const router = useRouter()
	const [productData, setProductData] = useState<ProductPageData | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const [parameters, setParameters] = useState<ProductParameter[]>([
		{
			id: 'workArea',
			label: 'Work area size',
			type: 'select',
			value: '1300x900',
			options: [
				{ value: '1300x900', text: '1300x900 mm' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'workArea' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'laserPower',
			label: 'Laser power',
			type: 'select',
			value: '1.5',
			options: [
				{ value: '1.5', text: '1,5 kW' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'laserPower' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'laserSource',
			label: 'Laser source',
			type: 'select',
			value: 'MaxPhotonics',
			options: [
				{ value: 'MaxPhotonics', text: 'MaxPhotonics' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'laserSource' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'cuttingHead',
			label: 'Cutting head',
			type: 'select',
			value: 'Raytools',
			options: [
				{ value: 'Raytools', text: 'Raytools' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'cuttingHead' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'tablechangeSystem',
			label: 'Tablechange system',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'tablechangeSystem' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'protectiveCabin',
			label: 'Protective cabin with air filtration',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'protectiveCabin' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'rotaryDevice',
			label: 'Rotary device',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'rotaryDevice' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'laserProtection',
			label: 'Laser protection',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'laserProtection' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'bevelLaserHead',
			label: 'Bevel laser head',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'bevelLaserHead' ? { ...p, value: value as string } : p))
			}
		}
	])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getProductPageData('metal-cutters')
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
		console.log('Add to basket', { productId: params.productId, parameters })
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
							hasVideo={true}
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
					<WattsanFactsSlider cards={productData.factsCards} />
				</div>

				<div className={styles.powerSection}>
					<ProductDescription
						title={<span><span style={{ color: '#E31E24' }}>The power</span> of machine</span>}
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

				{/* <div className={styles.comparisonSection}>
					<SeriesComparison seriesData={productData.seriesComparison} />
				</div> */}

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
											style={index < productData.aspirationSystem!.descriptions.length - 1 ? { marginBottom: '16px' } : undefined}
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
