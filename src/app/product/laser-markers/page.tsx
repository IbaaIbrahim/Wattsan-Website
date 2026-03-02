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
import PlentyOfMaterials from '@components/modules/product-page/plenty-of-materials/PlentyOfMaterials'
import { getProductPageData } from '@api/product'
import { ProductPageData, ProductParameter, LaserTypesData, MopaComparisonData } from '@my-types/product'

import LaserTypes from '@components/modules/product-page/laser-types/LaserTypes'
import MopaQSwitchComparison from '@components/modules/product-page/mopa-qswitch-comparison/MopaQSwitchComparison'
import MopaQSwitchGrid from '@components/modules/product-page/mopa-qswitch-grid/MopaQSwitchGrid'


const ProductPage = ({ params }: { params: { productId: string } }) => {
	const router = useRouter()
	const [productData, setProductData] = useState<ProductPageData | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const [parameters, setParameters] = useState<ProductParameter[]>([
		{
			id: 'typeOfLaser',
			label: 'Type of laser',
			type: 'select',
			value: 'fiber',
			options: [
				{ value: 'fiber', text: 'Fiber (metals and reflections)' },
				{ value: 'uv', text: 'UV (all materials)' },
				{ value: 'co2', text: 'CO2 (Organic materials)' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'typeOfLaser' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'laserPower',
			label: 'Laser power',
			type: 'select',
			value: '20',
			options: [
				{ value: '20', text: '20W' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'laserPower' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'lensWorkArea',
			label: 'Lens work area',
			type: 'select',
			value: '100x100',
			options: [
				{ value: '100x100', text: '100x100 mm' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'lensWorkArea' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'workTableSize',
			label: 'Work table size',
			type: 'select',
			value: '600x600',
			options: [
				{ value: '600x600', text: '600x600 mm' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'workTableSize' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'autofocus',
			label: 'Autofocus',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included', price: '+$1200' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'autofocus' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'dynamicFocus',
			label: 'Dynamic focus',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included', price: '+$1200' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'dynamicFocus' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'rotaryDeviceCapability',
			label: 'Rotary device capability',
			type: 'radio',
			value: 'yes',
			options: [
				{ value: 'yes', text: 'Yes' },
				{ value: 'no', text: 'No' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'rotaryDeviceCapability' ? { ...p, value: value as string } : p))
			}
		},
		{
			id: 'integrationCapability',
			label: 'Integration capability',
			type: 'radio',
			value: 'notIncluded',
			options: [
				{ value: 'notIncluded', text: 'Not included' },
				{ value: 'included', text: 'Included' }
			],
			onChange: (value) => {
				setParameters(prev => prev.map(p => p.id === 'integrationCapability' ? { ...p, value: value as string } : p))
			}
		}
	])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getProductPageData('laser-markers') // Fetching Laser data!
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

	const laserTypesData: LaserTypesData = {
		title: 'Laser types',
		cards: [
			{
				id: 'fiber',
				title: 'Fiber',
				image: '/img/product/laser-markers/fiber.png',
				specs: [
					{ label: 'Wave length', value: '1,06 µm' },
					{ label: 'Materials', value: 'Metals, plastics, leather, ceramics' },
					{ label: 'Applications', value: 'Industrial marking, batch numbers, codes' },
					{ label: 'Quality', value: 'High precision, no consumables' },
					{ label: 'Cost', value: 'Low maintenance, long life (100,000h)' }
				]
			},
			{
				id: 'uv',
				title: 'UV',
				image: '/img/product/laser-markers/uv.png',
				specs: [
					{ label: 'Wave length', value: '0,355 µm' },
					{ label: 'Materials', value: 'All materials (glass, silicon, etc)' },
					{ label: 'Applications', value: 'Micro-marking, cold processing' },
					{ label: 'Quality', value: 'Extremely high detail, no heat effect' },
					{ label: 'Cost', value: 'High precision, specialized tasks' }
				]
			},
			{
				id: 'co2',
				title: 'CO2',
				image: '/img/product/laser-markers/co2.png',
				specs: [
					{ label: 'Wave length', value: '10,6 µm' },
					{ label: 'Materials', value: 'Woods, glass, acrylic, paper, leather' },
					{ label: 'Applications', value: 'Branding, personalization, crafts' },
					{ label: 'Quality', value: 'Versatile for organic materials' },
					{ label: 'Cost', value: 'Easy to maintain, affordable' }
				]
			}
		]
	}

	const mopaComparisonData: MopaComparisonData = {
		title: 'Comparison of MOPA and Q-SWITCH',
		description: 'MOPA lasers offer greater flexibility with adjustable pulse duration, allowing for color marking on stainless steel and high-quality marking on plastics without burning. Q-SWITCH lasers have fixed pulse width and are better suited for deep engraving on metals.',
		cards: [
			{
				title: 'MOPA',
				specs: [
					{ label: 'Flexibility', value: 'High (adjustable)' },
					{ label: 'Pulse width', value: '2-500 ns' },
					{ label: 'Quality on thin materials', value: 'Excellent' },
					{ label: 'Color control', value: 'Yes' },
					{ label: 'Plastic marking', value: 'High quality' },
					{ label: 'Application', value: 'Color marking, sensitive materials' },
					{ label: 'Cost', value: 'Higher' }
				]
			},
			{
				title: 'Q-SWITCH',
				specs: [
					{ label: 'Flexibility', value: 'Fixed' },
					{ label: 'Pulse width', value: '100-120 ns' },
					{ label: 'Quality on thin materials', value: 'Good for general tasks' },
					{ label: 'Color control', value: 'No' },
					{ label: 'Plastic marking', value: 'Risk of burning' },
					{ label: 'Application', value: 'Deep engraving, standard metal marking' },
					{ label: 'Cost', value: 'Lower' }
				]
			}
		],
		alert: {
			text: 'The choice between MOPA and Q-SWITCH depends on the required marking precision and the materials you plan to process.'
		}
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

				<div className={styles.laserTypesSection}>
					<LaserTypes
						title={<span><span style={{ color: '#E31E24' }}>Laser</span> types</span>}
						cards={laserTypesData.cards}
					/>
				</div>

				<div className={styles.mopaComparisonSection}>
					<MopaQSwitchComparison
						title={<span><span style={{ color: '#E31E24' }}>Comparison</span> of MOPA and Q-SWITCH</span>}
						description={mopaComparisonData.description}
						cards={mopaComparisonData.cards}
					/>
				</div>

				<div className={styles.mopaGridSection}>
					<MopaQSwitchGrid
						title={<span><span style={{ color: '#E31E24' }}>Comparison</span> of MOPA and Q-SWITCH (Grid View)</span>}
						description={mopaComparisonData.description}
						cards={mopaComparisonData.cards}
						alert={mopaComparisonData.alert}
					/>
				</div>

				{/* <div className={styles.safetyCabinSection}>
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

				<div className={styles.aspirationSection}>
					<AspirationSystem
						title={<span><span style={{ color: '#E31E24' }}>Aspiration</span> System</span>}
						subtitle="All models supported"
						description={
							<>
								<Typography tag='p' size='s' weight='regular' style={{ marginBottom: '16px' }}>
									Aspiration systems are designed to efficiently remove dust, chips, and debris created during machining. This improves air quality in the workspace, ensures a cleaner environment, and reduces the risk of tool wear and clogging. It also helps maintain precision and prolongs the machine's lifespan.
								</Typography>
								<Typography tag='p' size='s' weight='regular'>
									Airflow rate, filter capacity, and suction efficiency affect dust removal, tool longevity, and workspace cleanliness, ensuring optimal machine performance and safety.
								</Typography>
							</>
						}
					/>
				</div>

				<div className={styles.tableTypesSection}>
					<TableTypes
						title={<span><span style={{ color: '#E31E24' }}>Table types</span> for your tasks</span>}
						items={productData.tableTypes}
					/>
				</div> */}
			</div>
		</div>

	)
}

export default ProductPage
