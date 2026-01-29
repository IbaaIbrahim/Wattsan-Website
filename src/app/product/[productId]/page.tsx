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
import { Typography } from '@components/ui/typography/Typography'


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
import ProductBlog from '@components/modules/product-page/product-blog/ProductBlog'
import SafetyCabin, { SafetyCabinFeature } from '@components/modules/product-page/safety-cabin/SafetyCabin'
import RotaryDevice, { RotaryDeviceSpec } from '@components/modules/product-page/rotary-device/RotaryDevice'
import SeparateRotaryDevice from '@components/modules/product-page/separate-rotary-device/SeparateRotaryDevice'
import LiquidCoolingSystem, { LiquidCoolingType } from '@components/modules/product-page/liquid-cooling-system/LiquidCoolingSystem'
import AutomaticToolSwitch, { ToolSwitchVariant } from '@components/modules/product-page/automatic-tool-switch/AutomaticToolSwitch'
import MultiSpindles, { MultiSpindlesSpec } from '@components/modules/product-page/multi-spindles/MultiSpindles'
import TableTypes, { TableTypeItem } from '@components/modules/product-page/table-types/TableTypes'
import AspirationSystem from '@components/modules/product-page/aspiration-system/AspirationSystem'


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

const SAFETY_CABIN_FEATURES: SafetyCabinFeature[] = [
	{
		title: 'Chips and dust',
		description: 'The durability of the machine is due to the frame configuration, metal wall thickness and heat treatment. We can therefore guarantee reliability and a long service life.'
	},
	{
		title: 'Coolant operation',
		description: 'We use rails and racks from renowned manufacturers. The assembly is carried out in pre-screened recesses and all assembly processes are robotized.'
	},
	{
		title: 'Noise',
		description: 'The reinforced Z-axis ball screw allows CNC milling machines to be equipped with reinforced spindles, making our machines much more flexible for all industries.'
	},
	{
		title: 'Human Factor',
		description: 'Used for high load applications. Converts stepper motor speed to power. Ideal for working with hardwoods and soft metals.'
	}
]

const ROTARY_DEVICE_SPECS: RotaryDeviceSpec[] = [
	{
		value: '2510 mm',
		label: 'max long of workpieces'
	},
	{
		value: '300 mm',
		label: 'max working diameter'
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

const MULTI_SPINDLES_SPECS: MultiSpindlesSpec[] = [
	{
		title: 'Spindles quantity',
		description: 'A machine can only have a certain number of spindles installed (up to 4 pcs). It is determined by the diameter of the spindles and the length of the X-axis.'
	},
	{
		title: 'X-axis length',
		description: 'This is an axis that runs parallel to the gantry. Its length determines the max amount of spindles. On Wattsan machines, the max quantity is four.'
	},
	{
		title: 'Spindle diameter',
		description: 'It can be 80, 100, or 125 mm.'
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

const TOOL_SWITCH_VARIANTS: ToolSwitchVariant[] = [
	{
		id: '4-6-tools',
		title: '4 and 6 tools',
		description: 'These two options are available for any M3 model. This is the lowest amount of tools, though it may be enough, if your production process is strictly defined.',
		thumbnail: '',
		footerLabel: 'All models supported'
	},
	{
		id: '8-tools',
		title: '8 tools',
		description: 'Eight tools is a medium number of instruments that is good for the majority of operations. It\'s a standard option for 1313 and 1325 Wattsan CNC machines.',
		thumbnail: '',
		footerLabel: 'All models supported'
	},
	{
		id: '10-tools',
		title: '10 tools',
		description: 'This is a basic configuration for the M3 1616 Wattsan machine.',
		thumbnail: '',
		footerLabel: 'Not available for smaller models.',
		isWarning: true
	},
	{
		id: '12-tools',
		title: '12 tools',
		description: 'This is the standard setup for large industrial Wattsan CNC machines such as 2030, 2040, and 2060. Due to the purposes, they must contain a large number of instruments to create complicated designs at rapid speeds.',
		thumbnail: '',
		footerLabel: 'Twelve tools cannot be installed on the 1313, 1325, and 1616 models.',
		isWarning: true
	}
]

const LIQUID_COOLING_TYPES: LiquidCoolingType[] = [
	{
		title: 'Oil-mist spray system',
		description: 'Here, the liquid is sprayed to the working area. The liquids themselves are more viscous and can sustain greater temperatures. This system can be installed on any Wattsan CNC machine.'
	},
	{
		title: 'Flood type',
		description: 'Here, a jet of pressured water is being delivered, and this system requires a modificated router bed. Water as coolant has a good price-quality ratio and is easily accessible.'
	}
]

const TABLE_TYPES_DATA: TableTypeItem[] = [
	{
		id: 't-slot',
		title: 'T-slot',
		description: 'T-slot tables are characterised by their secure clamping, modularity, precision and flexibility. They allow for easy and versatile workpiece clamping, making them suitable for a wide range of materials, including wood, plastic, aluminum, PVC, acrylic, double-color plate, etc.'
	},
	{
		id: 'vacuum',
		title: 'Vacuum',
		description: 'It has the characteristics of low cost, flexible method, cost-saving, and the price is lower than the price of the vacuum table. Vacuum tables provide uniform suction across large surfaces, making them ideal for large sheet materials. They are commonly used for cutting plywood, MDF, acrylic, and plastics.',
		advantagesTitle: 'Advantages of a vacuum table:',
		advantages: [
			<><b>Versatile clamping:</b> vacuum tables clamp the workpiece evenly across its entire surface;</>
		],
		list: [
			<><b>Less damage:</b> vacuum tables clamp the material more gently and minimise the risk of damage. This is particularly important when working with sensitive or finished materials;</>,
			<><b>Quick material change:</b> on a vacuum table, less time is spent adjusting the clamp. Therefore, material change is easier, which increases productivity.</>
		]
	},
	{
		id: 'bath',
		title: 'Bath',
		description: 'The pump operates on a 380-volt power supply, and depending on the number of pumps and table size, the total power can range from 5.5 kW to 7.5 kW. When using the Milling Bath you can machine various materials under water or other liquids.',
		list: [
			'Suitable for milling metal, PCB cuprexit, plexi glass and other material;',
			'Better result and slower dulling of the tool when milling in liquid (water, oil or other cooling liquid)'
		]
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
				{/* <div className={styles.infoCardsSection}>
					<ProductInfoCards cards={INFO_CARDS} />
				</div> */}
				{/* <div className={styles.factsSliderSection}>
					<WattsanFactsSlider cards={FACTS_CARDS} />
				</div> */}

				<div className={styles.powerSection}>
					<ProductDescription
						title={<span><span style={{ color: '#E31E24' }}>The power</span> of machine</span>}
						image='/img/catalog/cnc-routes.png' // Replace with actual machine image
						features={MACHINE_FEATURES}
					/>
				</div>

				{/* <div className={styles.heartSection}>
					<HeartOfTheMachinery />
				</div> */}

				{/* <div className={styles.specsSection}>
					<ProductSpecifications categories={SPEC_CATEGORIES} />
				</div> */}

				{/* <div className={styles.comparisonSection}>
					<SeriesComparison seriesData={SERIES_COMPARISON_DATA} />
				</div> */}

				{/* <div className={styles.reviewsSection}>
					<ProductReviews />
				</div> */}

				<div className={styles.madeWithSection}>
					<MadeWithWattsan />
				</div>


				{/* <div className={styles.productionSection}>
					<ProductionProcess />
				</div> */}

				{/* <div className={styles.serviceSection}>
					<ServiceAndSupport />
				</div> */}

				{/* <div className={styles.reviewsAndQuestionsSection}>
					<ProductReviewsAndQuestions />
				</div> */}

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

				<div className={styles.blogSection}>
					<ProductBlog />
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
						features={SAFETY_CABIN_FEATURES}
						image='/product-cards/safety-cabin/sc-1.png'
					/>
				</div> */}

				{/* <div className={styles.rotaryDeviceSection}>
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
						specs={ROTARY_DEVICE_SPECS}
						image='/product-cards/rd-rotary/rd-r-1.png'
					/>
				</div> */}

				{/* <div className={styles.separateRotaryDeviceSection}>
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
						image='/product-cards/rd-rotary/rd-r-1.png'
					/>
				</div> */}

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
						specs={MULTI_SPINDLES_SPECS}
						image="/product-cards/spindles/spindles-4.png"
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
						variants={TOOL_SWITCH_VARIANTS}
						image='/product-cards/automatic-tool-switch/image.png'
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
						types={LIQUID_COOLING_TYPES}
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
						items={TABLE_TYPES_DATA}
					/>
				</div>
			</div>
		</div>

	)
}

export default ProductPage
