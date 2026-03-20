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
import { Typography } from '@components/ui/typography/Typography'
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

import styles from './page.module.scss'

import { getProductPageData } from '@api/product'
import { ProductPageData, ProductParameter } from '@my-types/product'

const ProductPage = () => {
	const router = useRouter()

	const [productData, setProductData] = useState<ProductPageData | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getProductPageData('laser-tube-cutters')
				setProductData(data)
			} catch (error) {
				console.error('Failed to fetch product data', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const [parameters, setParameters] = useState<ProductParameter[]>([
		{
			id: 'laserPower',
			label: 'Laser power',
			type: 'select',
			value: '1.5',
			options: [{ value: '1.5', text: '1,5 kW' }],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) => (p.id === 'laserPower' ? { ...p, value: value as string } : p)),
				)
			},
		},
		{
			id: 'laserSource',
			label: 'Laser source',
			type: 'radio',
			value: 'Raycus',
			options: [
				{ value: 'Raycus', text: 'Raycus' },
				{ value: 'IPG', text: 'IPG' },
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) => (p.id === 'laserSource' ? { ...p, value: value as string } : p)),
				)
			},
		},
		{
			id: 'cuttingHead',
			label: 'Cutting head',
			type: 'radio',
			value: 'Raytools',
			options: [
				{ value: 'Raytools', text: 'Raytools' },
				{ value: 'BOCI', text: 'BOCI' },
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) => (p.id === 'cuttingHead' ? { ...p, value: value as string } : p)),
				)
			},
		},
		{
			id: 'safetyLightCurtain',
			label: 'Safety light curtain',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' },
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) =>
						p.id === 'safetyLightCurtain' ? { ...p, value: value as string } : p,
					),
				)
			},
		},
		{
			id: 'weldingSeamDetection',
			label: 'Welding seam detection',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' },
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) =>
						p.id === 'weldingSeamDetection' ? { ...p, value: value as string } : p,
					),
				)
			},
		},
		{
			id: 'bevelCutting',
			label: 'Bevel cutting',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' },
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) => (p.id === 'bevelCutting' ? { ...p, value: value as string } : p)),
				)
			},
		},
		{
			id: 'autoLoadingSystem',
			label: 'Auto loading system',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' },
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) =>
						p.id === 'autoLoadingSystem' ? { ...p, value: value as string } : p,
					),
				)
			},
		},
		{
			id: 'semiAutoLoadingSystem',
			label: 'Semi-auto loading system (HD-type)',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' },
			],
			onChange: (value) => {
				setParameters((prev) =>
					prev.map((p) =>
						p.id === 'semiAutoLoadingSystem' ? { ...p, value: value as string } : p,
					),
				)
			},
		},
	])

	if (isLoading || !productData) {
		return <div className={styles.loadingContainer}>Loading...</div>
	}

	const MOCK_PRODUCT_DATA = productData

	return (
		<div className={`${styles.productPage} ${styles.productPageNoMargin}`}>
			<div className={styles.container}>
				<Breadcrumbs items={MOCK_PRODUCT_DATA.breadcrumbs} className={styles.breadcrumbs} />

				<div className={styles.content}>
					<div className={styles.leftColumn}>
						<ProductImageGallery
							mainImage={MOCK_PRODUCT_DATA.gallery.mainImage}
							thumbnails={MOCK_PRODUCT_DATA.gallery.thumbnails}
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
							title={MOCK_PRODUCT_DATA.productInfo.title}
							rating={MOCK_PRODUCT_DATA.productInfo.rating}
							reviewCount={MOCK_PRODUCT_DATA.productInfo.reviewCount}
							questionCount={MOCK_PRODUCT_DATA.productInfo.questionCount}
							currentPrice={MOCK_PRODUCT_DATA.productInfo.currentPrice}
							originalPrice={MOCK_PRODUCT_DATA.productInfo.originalPrice}
							discount={MOCK_PRODUCT_DATA.productInfo.discount}
							discountPercent={MOCK_PRODUCT_DATA.productInfo.discountPercent}
							availability={MOCK_PRODUCT_DATA.productInfo.availability}
							shipment={MOCK_PRODUCT_DATA.productInfo.shipment}
							delivery={MOCK_PRODUCT_DATA.productInfo.delivery}
							deliveryMethods={MOCK_PRODUCT_DATA.productInfo.deliveryMethods}
							activeDeliveryMethod='EXW'
							onDeliveryMethodClick={(method) => console.log('Delivery method selected:', method)}
							deliveryNote={MOCK_PRODUCT_DATA.productInfo.deliveryNote}
							onAddToBasket={() => console.log('Add to basket', { parameters })}
							onViewSpecifications={() => console.log('View specifications clicked')}
						/>
					</div>
				</div>

				<div className={styles.ctaSection}>
					<ProductConfiguratorCTA onConfiguratorClick={() => router.push('/configurator')} />
				</div>

				<div className={styles.infoCardsSection}>
					<ProductInfoCards cards={MOCK_PRODUCT_DATA.infoCards} />
				</div>

				<div className={styles.factsSliderSection}>
					<WattsanFactsSlider
						titleHighlight='Wattsan laser tube cutters'
						cards={MOCK_PRODUCT_DATA.factsCards}
					/>
				</div>

				<div className={styles.powerSection}>
					<ProductDescription
						title={<span><span style={{ color: '#E31E24' }}>The power</span> of machine</span>}
						image={MOCK_PRODUCT_DATA.gallery.mainImage}
						features={MOCK_PRODUCT_DATA.machineFeatures}
					/>
				</div>

				<div className={styles.heartSection}>
					<HeartOfTheMachinery data={MOCK_PRODUCT_DATA.heartOfTheMachinery} />
				</div>

				<div className={styles.materialsSection}>
					<PlentyOfMaterials data={MOCK_PRODUCT_DATA.materialsProcessing} />
				</div>

				<div className={styles.specsSection}>
					<ProductSpecifications categories={MOCK_PRODUCT_DATA.specifications} />
				</div>

				<div className={styles.reviewsSection}>
					<ProductReviews reviews={MOCK_PRODUCT_DATA.reviews} />
				</div>

				<div className={styles.madeWithSection}>
					<MadeWithWattsan />
				</div>

				<div className={styles.productionSection}>
					<ProductionProcess steps={MOCK_PRODUCT_DATA.productionProcess} />
				</div>

				<div className={styles.serviceSection}>
					<ServiceAndSupport
						image={MOCK_PRODUCT_DATA.serviceAndSupport.image}
						cards={MOCK_PRODUCT_DATA.serviceAndSupport.cards}
					/>
				</div>

				<div className={styles.reviewsAndQuestionsSection}>
					<ProductReviewsAndQuestions />
				</div>

				<div className={styles.packageListSection}>
					<PackageList items={MOCK_PRODUCT_DATA.packageList} />
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
					<InterestedProducts products={MOCK_PRODUCT_DATA.interestedProducts} />
				</div>

				<div className={styles.blogSection}>
					<ProductBlog />
				</div>

				<div className={styles.safetyCabinSection}>
					<SafetyCabin
						title={<span><span style={{ color: '#E31E24' }}>Safety</span> cabin</span>}
						description={
							<Typography
								tag='p'
								size='s'
								weight='regular'
								style={{ marginBottom: '16px' }}
							>
								It will give an alarm if any intruder is detected when chucks are working at high speed,
								to prevent possible collision and protect both workers and the machine.
							</Typography>
						}
						features={MOCK_PRODUCT_DATA.safetyCabinFeatures}
						image='/product-cards/cnc-router/safety-cabin/sc-1.png'
					/>
				</div>

				<div className={styles.aspirationSection}>
					<AspirationSystem
						title={<span style={{ color: '#E31E24' }}>Welding seam detection</span>}
						subtitle='Nova and Heavy duty'
						description={
							<>
								<Typography tag='p' size='s' weight='regular' style={{ marginBottom: 16 }}>
									By recognizing and avoiding the weld seam, the system ensures that these problems are minimized:
								</Typography>
								<Typography
									tag='p'
									size='s'
									weight='regular'
									style={{ borderBottom: '1px solid #E5E5E5', paddingBottom: 12, marginBottom: 0 }}
								>
									Poor edge quality or rough surfaces;
								</Typography>
								<Typography
									tag='p'
									size='s'
									weight='regular'
									style={{ borderBottom: '1px solid #E5E5E5', paddingBottom: 12, marginBottom: 0 }}
								>
									Increased wear on machine nozzles and lenses;
								</Typography>
								<Typography
									tag='p'
									size='s'
									weight='regular'
									style={{ borderBottom: '1px solid #E5E5E5', paddingBottom: 12, marginBottom: 0 }}
								>
									Weak points in final products;
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									Difficulty during assembly or welding.
								</Typography>
							</>
						}
					/>
				</div>

				<div className={styles.aspirationSection}>
					<AspirationSystem
						title={<span style={{ color: '#E31E24' }}>Bevel cutting up to 45 degrees</span>}
						subtitle='Core Pro, Nova and Heavy duty'
						description={
							<>
								<Typography tag='p' size='s' weight='regular'>
									This function is indispensable for the subsequent welding of butt-to-butt pipes, beveled pipes, short pipes,
									products... Will increase the demand for products and processing efficiency.
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									With bevel cutting, you can create precise prep edges for welding and simplify further production stages.
								</Typography>
							</>
						}
					/>
				</div>

				<div className={styles.aspirationSection}>
					<AspirationSystem
						title={<span style={{ color: '#E31E24' }}>Auto loader</span>}
						subtitle='All models'
						description={
							<>
								<Typography tag='p' size='s' weight='regular'>
									<b>Processes small-diameter tubes with high speed</b>
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									When using an automatic unloading system, machines can process tubes with a maximum diameter of up to 80 mm,
									depending on the model. Maximum batch weight up to 1500 kg.
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									<b>Expandable unloading table</b>
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									The unloading table for this system is designed for tubes with a length of up to 2 meters. It can be enlarged to 3 or 4 meters on request.
								</Typography>
							</>
						}
					/>
				</div>

				<div className={styles.aspirationSection}>
					<AspirationSystem
						title={<span style={{ color: '#E31E24' }}>Semi-auto loader</span>}
						subtitle='Loading for all models'
						description={
							<>
								<Typography tag='p' size='s' weight='regular'>
									<b>Handles long and heavy tubes</b>
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									The maximum diameter of tubes for the unloading system is based on the model of laser tube cutting machine it’s installed on: weight can reach 1100 kg, and the max length is 12 meters.
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									<b>Flexible unloading for any shape</b>
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									The unloading system is suited to work with various forms of tubes with lengths up to 12 meters.
								</Typography>
							</>
						}
					/>
				</div>

				<div className={styles.aspirationSection}>
					<AspirationSystem
						title={<span style={{ color: '#E31E24' }}>HD loader</span>}
						subtitle='only for Heavy duty'
						description={
							<>
								<Typography tag='p' size='s' weight='regular'>
									Massive capacity for maximum output: tubes with weight up to 3 tonnes and length up to 12 meters can be easily uploaded using this system.
									The maximum diameter for it is 640 mm. It’s a part of the Heavy Duty model’s basic configuration.
								</Typography>

								<div style={{ display: 'flex', gap: 48, marginTop: 12 }}>
									<div style={{ flex: 1 }}>
										<div style={{ height: 1, background: '#E5E5E5', marginBottom: 12, width: 140 }} />
										<Typography tag='p' size='s' weight='semi-bold'>
											Up to 3 tonnes
										</Typography>
										<Typography tag='p' size='xs' weight='regular'>
											Tubes weight
										</Typography>
									</div>
									<div style={{ flex: 1 }}>
										<div style={{ height: 1, background: '#E5E5E5', marginBottom: 12, width: 140 }} />
										<Typography tag='p' size='s' weight='semi-bold'>
											Up to 12 m
										</Typography>
										<Typography tag='p' size='xs' weight='regular'>
											Tubes length
										</Typography>
									</div>
									<div style={{ flex: 1 }}>
										<div style={{ height: 1, background: '#E5E5E5', marginBottom: 12, width: 140 }} />
										<Typography tag='p' size='s' weight='semi-bold'>
											Up to 640 mm
										</Typography>
										<Typography tag='p' size='xs' weight='regular'>
											Max diameter
										</Typography>
									</div>
								</div>
							</>
						}
					/>
				</div>
			</div>
		</div>
	)
}

export default ProductPage

