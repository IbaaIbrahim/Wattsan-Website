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
import MachineAdvisor from '@components/modules/product-page/machine-advisor/MachineAdvisor'
import ProductionProcess from '@components/modules/product-page/production-process/ProductionProcess'
import ServiceAndSupport from '@components/modules/product-page/service-and-support/ServiceAndSupport'
import PackageList from '@components/modules/product-page/package-list/PackageList'
import AdditionalContent from '@components/modules/product-page/additional-content/AdditionalContent'
import FAQ from '@components/modules/product-page/faq/FAQ'
import InterestedProducts from '@components/modules/product-page/interested-products/InterestedProducts'
import ProductBlog from '@components/modules/product-page/product-blog/ProductBlog'
import SafetyCabin from '@components/modules/product-page/safety-cabin/SafetyCabin'
import RotaryDevice from '@components/modules/product-page/rotary-device/RotaryDevice'
import SeparateRotaryDevice from '@components/modules/product-page/separate-rotary-device/SeparateRotaryDevice'
import LiquidCoolingSystem from '@components/modules/product-page/liquid-cooling-system/LiquidCoolingSystem'
import AutomaticToolSwitch from '@components/modules/product-page/automatic-tool-switch/AutomaticToolSwitch'
import MultiSpindles from '@components/modules/product-page/multi-spindles/MultiSpindles'
import TableTypes from '@components/modules/product-page/table-types/TableTypes'
import AspirationSystem from '@components/modules/product-page/aspiration-system/AspirationSystem'

import { getProductPageData } from '@api/product'
import { ProductPageData, ProductParameter } from '@my-types/product'
import PlentyOfMaterials from '@components/modules/product-page/plenty-of-materials/PlentyOfMaterials'
import TwoLaserHeads from '@components/modules/product-page/two-laser-heads/TwoLaserHeads'


const ProductPage = ({ params }: { params: { productId: string } }) => {
	const router = useRouter()
	const [productData, setProductData] = useState<ProductPageData | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const [parameters, setParameters] = useState<ProductParameter[]>([
		{
			id: 'workArea',
			label: 'Work area size',
			type: 'select',
			value: '600x900',
			options: [
				{ value: '600x900', text: '600x900 mm' },
				{ value: '800x1200', text: '800x1200 mm' },
				{ value: '1000x1500', text: '1000x1500 mm' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'workArea' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'toolLift',
			label: 'Tool lift height (Z axis)',
			type: 'select',
			value: '200',
			options: [
				{ value: '200', text: '200 mm' },
				{ value: '250', text: '250 mm' },
				{ value: '300', text: '300 mm' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'toolLift' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'spindlePower',
			label: 'Spindle power',
			type: 'select',
			value: '3.5',
			options: [
				{ value: '3.5', text: '3,5 kW, water 15025' },
				{ value: '5.5', text: '5,5 kW, water 15025' },
				{ value: '7.5', text: '7,5 kW, water 15025' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'spindlePower' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'spindleQuantity',
			label: 'Spindle quantity',
			type: 'select',
			value: '1',
			options: [
				{ value: '1', text: '1 pcs' },
				{ value: '2', text: '2 pcs' },
				{ value: '3', text: '3 pcs' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'spindleQuantity' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'liquidCooling',
			label: 'Liquid cooling system',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'automatic', text: 'Automatic irrigation', price: '+$1200' },
				{ value: 'oilMist', text: 'Oil mist', price: '+$1500' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'liquidCooling' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'aspiration',
			label: 'Aspiration',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: '220v', text: '220V', price: '+$1200' },
				{ value: '380v', text: '380V', price: '+$1500' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'aspiration' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'vacuumTable',
			label: 'Vacuum table',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included', price: '+$1200' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'vacuumTable' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'rotaryDevice',
			label: 'Rotary device',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'separate', text: 'Separate', price: '+$1200' },
				{ value: 'integrated', text: 'Integrated', price: '+$2500' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'rotaryDevice' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'automaticToolSwitch',
			label: 'Automatic tool switch',
			type: 'radio',
			value: 'no',
			options: [
				{ value: 'no', text: 'No' },
				{ value: 'yes', text: 'Yes', price: '+$2500' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'automaticToolSwitch' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'cabin',
			label: 'Cabin (Only for mini series)',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included', price: '+$2500' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'cabin' ? { ...p, value: value as string } : p))
			}
		}
	])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getProductPageData('laser-co2') // Fetching Laser data!
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

				<div className={styles.specsSection}>
					<ProductSpecifications categories={productData.specifications} />
				</div>

				<div className={styles.comparisonSection}>
					<SeriesComparison seriesData={productData.seriesComparison} />
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
					<FAQ items={productData.faqData} />
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
							<>
								<Typography tag='p' size='s' weight='regular' style={{ marginBottom: '16px' }}>
									The cabin is a robust protective enclosure that ensures a safe working environment. Its design maintains optimal conditions for machining, enhancing precision, boosting productivity, and supporting compliance with safety standards. This option is suitable for 0404 mini and 0609 mini CNC router machines.
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									The cabin's design minimizes exposure to dust, noise, and debris, shielding both operators and equipment. Also, it provides effective sealing to enhance operator safety and reduce noise levels.
								</Typography>
							</>
						}
						features={productData.safetyCabinFeatures}
						image='/product-cards/cnc-router/safety-cabin/sc-1.png'
					/>
				</div>

				<div className={styles.rotaryDeviceSection}>
					<RotaryDevice
						subtitle="WATTSAN RD Rotary Device"
						title="Precision Multi-Sided Machining with Integrated Fourth Axis"
						description={
							<>
								<Typography tag='p' size='s' weight='regular' style={{ marginBottom: '16px' }}>
									The WATTSAN RD rotary device is an integrated fourth axis for CNC routers that enables automatic rotation of workpieces during milling. This allows multi-sided machining without manual repositioning, saving time and improving accuracy. It supports workpieces up to 2510 mm long, making it ideal for cylindrical and complex shaped parts.
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									Controlled via CNC, it synchronizes rotation with other axes for precise, repeatable operations. This feature boosts productivity and expands capabilities, perfect for furniture manufacturers and decorative element producers needing efficient multi-face processing.
								</Typography>
							</>
						}
						specs={productData.rotaryDeviceSpecs}
						image='/product-cards/cnc-router/rd-rotary/rd-r-1.png'
					/>
				</div>

				<div className={styles.separateRotaryDeviceSection}>
					<SeparateRotaryDevice
						title={<span><span style={{ color: '#E31E24' }}>Separate</span> rotary device</span>}
						description={
							<>
								<Typography tag='p' size='s' weight='regular' style={{ marginBottom: '16px' }}>
									Expand the capabilities of your Wattsan CNC router with a standalone rotary device designed for precise 4-axis machining of cylindrical and complex parts. This add-on is ideal for woodworking, engraving, and 3D shaping tasks that require rotation along the A-axis.
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									Up to 4 rotary devices can be installed on the M1 S model.
								</Typography>
							</>
						}
						featuresTitle="Key Features"
						features={[
							<>Available with processing lengths <b>from 600 to 3000 mm</b></>,
							<>Maximum Z-axis height is <b>up to 300 mm</b></>,
							<>Compatible exclusively with the <b>DSP A18 controller</b></>,
							<>Robust construction for <b>high-precision rotation and stability</b></>
						]}
						image='/product-cards/cnc-router/rd-rotary/rd-r-1.png'
					/>
				</div>

				<div className={styles.multiSpindlesSection}>
					<MultiSpindles
						title="4 spindles"
						subtitle="x4 productivity"
						description1={
							<>
								Wattsan milling machines with <b>4 synchronized spindles</b> increase productivity by 4 times while maintaining high accuracy and repeatability. This saves changeover time, reduces personnel and equipment costs, and optimizes shop floor space utilization.
							</>
						}
						description2={
							<>
								Wattsan provides equipment matching clients manufacturing needs, due to which a CNC router machine can have a singular spindle or multiple. This parameter defines speed and production volume. For example, with several spindles, you can simultaneously make 4 balusters.
							</>
						}
						specs={productData.multiSpindlesSpecs}
						image="/product-cards/cnc-router/spindles/spindles-4.png"
					/>
				</div>

				<div className={styles.toolSwitchSection}>
					<AutomaticToolSwitch
						title={<span><span style={{ color: '#E31E24' }}>Automatic</span> tool switch</span>}
						subtitle="Requires no intervention during operation"
						description={
							<>
								<Typography tag='p' size='s' weight='regular' style={{ marginBottom: '16px' }}>
									The Wattsan M1 6090 features a 2.2 kW spindle as standard. The machine is designed with a safety margin to accommodate higher power.
								</Typography>
								<Typography tag='p' size='s' weight='regular' style={{ marginBottom: '16px' }}>
									The automatic tool change system is available only for M3 models, and it speeds up the production 4-5 times and may come with a variety of instruments. This system provides precise and solid installation of the end mills.
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									The amount of available tools defines the variability and complexity of layouts that may be processed in one go without human interference. Otherwise, the workflow has to be stopped to change the tools in the system.
								</Typography>
							</>
						}
						subHeading="Accelerates work up to x8 times"
						subDescription={
							<Typography tag='p' size='s' weight='regular'>
								The Wattsan M1 6090 features a 2.2 kW spindle as standard. The machine is designed with a safety margin to accommodate higher power.
							</Typography>
						}
						variants={productData.toolSwitchVariants}
						image='/product-cards/cnc-router/automatic-tool-switch/image.png'
					/>
				</div>

				<div className={styles.liquidCoolingSection}>
					<LiquidCoolingSystem
						title={<span><span style={{ color: '#E31E24' }}>Liquid</span> cooling system</span>}
						subtitle="All models supported"
						description={
							<>
								<Typography tag='p' size='s' weight='regular' style={{ marginBottom: '16px' }}>
									While milling some materials, especially metals, a lot of heat is being formed. This can damage the instrument, the workpiece itself, or the CNC router. And that's why the cutting fluid system exists—to prevent that from happening. With it, you can process aluminum, copper, brass, acrylic, etc.
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									The cutting fluid system minimizes the friction between the milling bit and the material. This increases the machining quality and slows down the wear-out process of the instrument 10 times. Additionally, the system removes chips from the working area and eliminates the possibility of corrosion appearance.
								</Typography>
							</>
						}
						types={productData.liquidCoolingTypes}
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

				<div className={styles.tableTypesSection}>
					<TableTypes
						title={<span><span style={{ color: '#E31E24' }}>Table types</span> for your tasks</span>}
						items={productData.tableTypes}
					/>
				</div>

				<div className={styles.materialsSection}>
					<PlentyOfMaterials data={productData.materialsProcessing} />
				</div>

				{productData.twoLaserHeads && (
					<div className={styles.twoLaserHeadsSection}>
						<TwoLaserHeads
							{...productData.twoLaserHeads}
						/>
					</div>
				)}
			</div>
		</div>

	)
}

export default ProductPage
