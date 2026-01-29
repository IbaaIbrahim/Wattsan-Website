'use client'

import { useState } from 'react'
import Breadcrumbs, { BreadcrumbItem } from '@components/modules/product-page/breadcrumbs/Breadcrumbs'
import ProductImageGallery from '@components/modules/product-page/product-image-gallery/ProductImageGallery'
import ProductParameters, { ProductParameter } from '@components/modules/product-page/product-parameters/ProductParameters'
import ProductInfo from '@components/modules/product-page/product-info/ProductInfo'
import ProductConfiguratorCTA from '@components/modules/product-page/product-configurator-cta/ProductConfiguratorCTA'
import ProductInfoCards, { ProductInfoCardData, MaterialColor } from '@components/modules/product-page/product-info-cards/ProductInfoCards'
import WattsanFactsSlider, { WattsanFactCardData } from '@components/modules/product-page/wattsan-facts-slider/WattsanFactsSlider'
import { useRouter } from 'next/navigation'

import styles from './page.module.scss'
import ProductDescription, { ProductFeature } from '@components/modules/product-page/product-description/ProductDescription'
import HeartOfTheMachinery from '@components/modules/product-page/heart-of-the-machinery/HeartOfTheMachinery'
import ProductSpecifications, { SpecificationCategory } from '@components/modules/product-page/product-specifications/ProductSpecifications'
import SeriesComparison, { ComparisonSeries } from '@components/modules/product-page/series-comparison/SeriesComparison'
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

// Sample product data - replace with actual data fetching
const BREADCRUMBS: BreadcrumbItem[] = [
	{ label: 'Home', href: '/' },
	{ label: 'CNC Routers', href: '/catalog' },
	{ label: 'M1 series' }
]

const INFO_CARDS: ProductInfoCardData[] = [
	{
		id: 'ideal-for',
		title: 'Ideal for',
		content: 'medium-sized production'
	},
	{
		id: 'economy',
		title: 'Economy',
		content: 'Up to 70% cheaper than ordering from third party'
	},
	{
		id: 'materials',
		title: 'Materials',
		materials: [
			{ color: '#D4C5B9', name: 'Beige' },
			{ color: '#8B6F47', name: 'Brown' },
			{ color: '#B8B8B8', name: 'Grey' },
			{ color: '#6B9BD1', name: 'Blue' },
			{ color: '#D4A5A5', name: 'Pink' },
			{ color: '#4A4A4A', name: 'Charcoal' }
		],
		onViewAllClick: () => console.log('View all materials clicked')
	},
	{
		id: 'expert-reviews',
		title: 'Expert Reviews',
		content: 80,
		onViewAllClick: () => console.log('View all reviews clicked')
	}
]

const FACTS_CARDS: WattsanFactCardData[] = [
	{
		id: 'ideal-for',
		subtitle: 'Ideal for',
		title: 'Make money 24/7 or work for your soul',
		type: 'image',
		imageUrl: '/img/catalog/cnc-routes.png'
	},
	{
		id: 'customization',
		subtitle: 'Strong customization',
		title: 'As a manufacturer we can assemble any machine for your application',
		type: 'image',
		imageUrl: '/img/catalog/cnc-routes.png'
	},
	{
		id: 'safety',
		subtitle: 'Safety',
		title: 'We provide certifications and warranty',
		type: 'solid',
		backgroundColor: '#DEEBFA',
		certifications: ['ISO', 'CE', 'ANSI', 'RoHS', 'and others']
	},
	{
		id: 'reputation',
		subtitle: 'Impeccable reputation',
		title: 'Wattsan equipment is on every continent and even Antarctica',
		type: 'solid',
		backgroundColor: '#335198'
	}
]

const MACHINE_FEATURES: ProductFeature[] = [
	{
		title: 'Frame',
		description: 'The durability of the machine is due to the frame configuration, metal wall thickness and heat treatment. We can therefore guarantee reliability and a long service life.'
	},
	{
		title: 'Guides and racks',
		description: 'We use rails and racks from renowned manufacturers to ensure precision and smoothness of movement for detailed work.'
	},
	{
		title: 'Gantry',
		description: 'Due to high loads during operation, the gantry is made of reinforced aluminium profile with increased wall thickness.'
	},
	{
		title: 'Axis Z',
		description: 'The z-axis module plays a huge role in the quality of the cut, so we pay special attention to its rigidity and reliability.'
	},
	{
		title: 'Motor',
		description: 'We use high-quality stepper motors or servo motors depending on the configuration to ensure speed and accuracy.'
	}
]

const SPEC_CATEGORIES: SpecificationCategory[] = [
	{
		id: 'general',
		label: 'General and dimensions',
		items: [
			{ label: 'Work area', value: '600x900', unit: 'mm' },
			{ label: 'Machine size (L*W*H)', value: '1380*1500*1890', unit: 'mm' },
			{ label: 'Packing size', value: '1530*1380*2020', unit: 'mm' },
			{ label: 'Weight', value: '400', unit: 'kg' },
			{ label: 'Spindle', value: '1,5 kW, water, ER11, One spindle' },
			{ label: 'Tool switch', value: 'Manual' },
			{ label: 'Motor', value: 'Stepper motor with feedback' },
			{ label: 'Control system', value: 'DSP A11' },
			{ label: 'Liquid cooling system', value: 'Not included' },
			{ label: 'Removable instrument sensor', value: 'Not included' },
			{ label: 'Built-in instrument sensor', value: 'Not included' },
			{ label: 'Lubrication system', value: 'Not included' },
			{ label: 'Aspiration', value: 'Not included' }
		]
	},
	{
		id: 'portal',
		label: 'Portal and spindle',
		items: [
			{ label: 'Gantry material', value: 'Aluminum profile' },
			{ label: 'Spindle power', value: '1.5', unit: 'kW' },
			{ label: 'Spindle cooling', value: 'Water' }
		]
	},
	{
		id: 'mechanics',
		label: 'Mechanics',
		items: [
			{ label: 'Guides', value: 'Square rail' },
			{ label: 'Transmission', value: 'Helical rack' }
		]
	},
	{
		id: 'control',
		label: 'Control system',
		items: [
			{ label: 'Controller', value: 'DSP A11' },
			{ label: 'Remote', value: 'Included' }
		]
	},
	{
		id: 'electrics',
		label: 'Electrics',
		items: [
			{ label: 'Voltage', value: '220', unit: 'V' },
			{ label: 'Phase', value: 'Single phase' }
		]
	}
]

const SERIES_COMPARISON_DATA: ComparisonSeries[] = [
	{
		id: 'm1',
		image: '/img/catalog/cnc-routes.png',
		title: 'M1 series',
		tagline: 'Real workhorse',
		price: '$19,000',
		specs: {
			workspace: '600x900 mm / 1300x1300 mm / 1300x2500 mm / 2000x3000mm',
			spindle: 'from 1,5 kW',
			motor: 'Stepper motor / Stepper motor with feedback',
			control: 'DSP A11 / Syntec',
			cooling: 'Optional',
			sensorRemovable: 'Optional',
			sensorBuiltIn: 'Optional',
			lubrication: 'Optional',
			aspiration: 'Optional'
		}
	},
	{
		id: 'm1-rd',
		image: '/img/catalog/cnc-routes.png',
		title: 'M1 RD series',
		tagline: 'Real workhorse',
		price: '$19,000',
		active: true,
		specs: {
			workspace: '600x900 mm / 1300x1300 mm / 1300x2500 mm / 2000x3000mm',
			spindle: 'from 1,5 kW',
			motor: 'Stepper motor / Stepper motor with feedback',
			control: 'DSP A11 / Syntec',
			cooling: 'Optional',
			sensorRemovable: 'Optional',
			sensorBuiltIn: 'Optional',
			lubrication: 'Optional',
			aspiration: 'Optional'
		}
	}
]

const ProductPage = ({ params }: { params: { productId: string } }) => {
	const router = useRouter()

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
				setParameters(prev => prev.map(p => p.id === 'workArea' ? { ...p, value } : p))
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
				setParameters(prev => prev.map(p => p.id === 'toolLift' ? { ...p, value } : p))
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
				setParameters(prev => prev.map(p => p.id === 'spindlePower' ? { ...p, value } : p))
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
				setParameters(prev => prev.map(p => p.id === 'spindleQuantity' ? { ...p, value } : p))
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
				setParameters(prev => prev.map(p => p.id === 'liquidCooling' ? { ...p, value } : p))
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
				setParameters(prev => prev.map(p => p.id === 'aspiration' ? { ...p, value } : p))
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
				setParameters(prev => prev.map(p => p.id === 'vacuumTable' ? { ...p, value } : p))
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
				setParameters(prev => prev.map(p => p.id === 'rotaryDevice' ? { ...p, value } : p))
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
				setParameters(prev => prev.map(p => p.id === 'automaticToolSwitch' ? { ...p, value } : p))
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
				setParameters(prev => prev.map(p => p.id === 'cabin' ? { ...p, value } : p))
			}
		}
	])

	const mainImage = '/img/catalog/cnc-routes.png'
	const thumbnails = [mainImage, mainImage, mainImage]

	const handleAddToBasket = () => {
		console.log('Add to basket', { productId: params.productId, parameters })
	}

	const handleConfiguratorClick = () => {
		router.push('/configurator')
	}

	const handleViewSpecifications = () => {
		console.log('View specifications clicked')
	}

	return (
		<div className={`${styles.productPage} ${styles.productPageNoMargin}`}>
			<div className={styles.container}>
				<Breadcrumbs items={BREADCRUMBS} className={styles.breadcrumbs} />

				<div className={styles.content}>
					<div className={styles.leftColumn}>
						<ProductImageGallery
							mainImage={mainImage}
							thumbnails={thumbnails}
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
							title='CNC Router Machine M1 series'
							rating={5.0}
							reviewCount={10}
							questionCount={21}
							currentPrice='$19,000'
							originalPrice='$19,000'
							discount='$1000'
							discountPercent='5%'
							availability='In stock'
							shipment='2 days'
							delivery='from 20 days'
							deliveryMethods={['EXW', 'CFR/CIF/CPT', 'FOB', 'DAP', 'DDP']}
							activeDeliveryMethod='EXW'
							onDeliveryMethodClick={(method) => console.log('Delivery method selected:', method)}
							deliveryNote='Please note that the delivery cost is paid separately and is not included in the total amount. After placing your order, a manager will contact you to confirm all delivery details.'
							onAddToBasket={handleAddToBasket}
							onViewSpecifications={handleViewSpecifications}
						/>
					</div>
				</div>

				<div className={styles.ctaSection}>
					<ProductConfiguratorCTA onConfiguratorClick={handleConfiguratorClick} />
				</div>

				<div className={styles.infoCardsSection}>
					<ProductInfoCards cards={INFO_CARDS} />
				</div>

				<div className={styles.factsSliderSection}>
					<WattsanFactsSlider cards={FACTS_CARDS} />
				</div>

				<div className={styles.powerSection}>
					<ProductDescription
						title={<span><span style={{ color: '#E31E24' }}>The power</span> of machine</span>}
						image='/img/catalog/cnc-routes.png' // Replace with actual machine image
						features={MACHINE_FEATURES}
					/>
				</div>

				<div className={styles.heartSection}>
					<HeartOfTheMachinery />
				</div>

				<div className={styles.specsSection}>
					<ProductSpecifications categories={SPEC_CATEGORIES} />
				</div>

				<div className={styles.comparisonSection}>
					<SeriesComparison seriesData={SERIES_COMPARISON_DATA} />
				</div>

				<div className={styles.reviewsSection}>
					<ProductReviews />
				</div>

				<div className={styles.madeWithSection}>
					<MadeWithWattsan />
				</div>


				<div className={styles.productionSection}>
					<ProductionProcess />
				</div>

				<div className={styles.serviceSection}>
					<ServiceAndSupport />
				</div>

				<div className={styles.reviewsAndQuestionsSection}>
					<ProductReviewsAndQuestions />
				</div>

				<div className={styles.packageListSection}>
					<PackageList />
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
					<InterestedProducts />
				</div>
			</div>
		</div>
	)
}

export default ProductPage
