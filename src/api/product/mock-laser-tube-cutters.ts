import { ProductPageData } from '@my-types/product'

export const MOCK_LASER_TUBE_CUTTERS_DATA: ProductPageData = {
	breadcrumbs: [
		{ label: 'Home', href: '/' },
		{ label: 'Laser pipe cutting machines', href: '/catalog' },
		{ label: 'Laser tube cutters' },
	],
	gallery: {
		mainImage: '/product-cards/cnc-router/image 11680.png',
		thumbnails: [
			'/product-cards/cnc-router/image 11649.png',
			'/product-cards/cnc-router/image 11650.png',
			'/product-cards/cnc-router/image 11651.png',
		],
	},
	productInfo: {
		title: 'Core series',
		rating: 5.0,
		reviewCount: 10,
		questionCount: 21,
		currentPrice: '$19,000',
		originalPrice: '$19,000',
		discount: '$1000',
		discountPercent: '5%',
		availability: 'In stock',
		shipment: '2 days',
		delivery: 'from 20 days',
		deliveryMethods: ['EXW', 'CFR/CIF/CPT', 'FOB', 'DAP', 'DDP'],
		deliveryNote:
			'Please note that the delivery cost is paid separately and is not included in the total amount. After placing your order, a manager will contact you to confirm all delivery details.',
	},
	infoCards: [
		{
			id: 'ideal-for',
			title: 'Ideal for',
			content: 'medium-sized production',
		},
		{
			id: 'economy',
			title: 'Economy',
			content: 'Up to 70% cheaper than ordering from third party',
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
				{ color: '#4A4A4A', name: 'Charcoal' },
			],
		},
		{
			id: 'expert-reviews',
			title: 'Expert Reviews',
			content: 80,
		},
	],
	factsCards: [
		{
			id: 'ideal-for',
			subtitle: 'Ideal for',
			title: 'Make money 24/7 or work for your soul',
			type: 'solid',
			backgroundColor: '#282829',
		},
		{
			id: 'customization',
			subtitle: 'Strong customization',
			title: 'As a manufacturer we can assemble any machine for your application',
			type: 'solid',
			backgroundColor: '#282829',
		},
		{
			id: 'safety',
			subtitle: 'Safety',
			title: 'We provide certifications and warranty',
			type: 'solid',
			backgroundColor: '#DEEBFA',
			certifications: ['ISO', 'CE', 'ANSI', 'RoHS', 'and others'],
		},
		{
			id: 'reputation',
			subtitle: 'Impeccable reputation',
			title: 'Wattsan equipment is on every continent and even Antarctica',
			type: 'solid',
			backgroundColor: '#335198',
		},
	],
	machineFeatures: [
		{
			title: 'Front and back chucks',
			description:
				'Wattsan Core is equipped with an air chuck with a round hole, fixes the whole range of pipe shapes used, has high stability and wear resistance, which improves production efficiency.',
		},
		{
			title: 'Pneumatic roller support',
			description:
				'The support device maintains contact with the pipe surface as the pipe is fed and rotated. Supported by variable diameter wheels (up to 350 mm).',
		},
		{
			title: 'Servo Follow-up',
			description:
				'The auxiliary support is controlled by an independent servo motor to move up and down, helping prevent excessive deformation of long cut pipes.',
		},
	],
	// Used by <SafetyCabin />
	safetyCabinFeatures: [
		{
			title: 'Chips and dust',
			description:
				'The durability of the machine is due to the frame configuration, metal wall thickness and heat treatment.',
		},
		{
			title: 'Chips and dust',
			description:
				'The durability of the machine is due to the frame configuration, metal wall thickness and heat treatment.',
		},
		{
			title: 'Chips and dust',
			description:
				'The durability of the machine is due to the frame configuration, metal wall thickness and heat treatment.',
		},
	],
	rotaryDeviceSpecs: [],
	specifications: [
		{
			id: 'dimensions',
			label: 'Dimensions of the machine',
			items: [
				{ label: 'Work area', value: '600x900', unit: 'mm' },
				{ label: 'Positioning accuracy', value: '±0.01', unit: 'mm' },
				{ label: 'Max cutting speed', value: 'Up to 500 m/s', unit: '(material-dependent)' },
				{ label: 'Power supply', value: 'AC 220V / 50-60Hz' },
				{ label: 'Liquid cooling system', value: 'Not included' },
				{ label: 'Auto-focus', value: 'Not included' },
				{ label: 'Rotary device', value: 'Not included' },
			],
		},
	],
	seriesComparison: [],
	toolSwitchVariants: [],
	liquidCoolingTypes: [],
	tableTypes: [],
	multiSpindlesSpecs: [],
	reviews: [],
	productionProcess: [
		{
			id: '01',
			title: 'Development',
			description:
				'We build the core modules and delivery package, including laser sources, electrical components and cabling.',
			image: '/product-cards/cnc-router/production-process/image 10.png',
		},
		{
			id: '02',
			title: 'Robotic Accuracy',
			description:
				'Each component is checked for: assembly precision, compliance and quality of technical parameters.',
			image: '/product-cards/cnc-router/production-process/image 11.png',
		},
		{
			id: '03',
			title: 'Precision in Assembly',
			description:
				'Assembly is carried out in a specialized room. The process includes installation of all modules and the final system check.',
			image: '/product-cards/cnc-router/production-process/image 12.png',
		},
	],
	// Not used by this new page (ServiceAndSupport uses serviceAndSupport.cards)
	supportCards: [],
	interestedProducts: [
		{
			id: '1',
			image: '/img/catalog/cnc-routes.png',
			name: 'Accessories for CNC Router Machines',
			code: 'Spindle SDK GDZ120x103-4.5',
			modification: '',
			price: '$5000',
		},
		{
			id: '2',
			image: '/img/catalog/cnc-routes.png',
			name: 'Laser Cutting Engraving Machine',
			code: '6040 ST',
			modification: 'modified',
			price: '$5000',
		},
		{
			id: '3',
			image: '/img/catalog/cnc-routes.png',
			name: 'Accessories for CNC Router Machines',
			code: 'Spindle SDK GDZ120x103-4.5',
			modification: '',
			price: '$5000',
		},
		{
			id: '4',
			image: '/img/catalog/cnc-routes.png',
			name: 'Laser Cutting Engraving Machine',
			code: '6040 ST',
			modification: 'modified',
			price: '$5000',
		},
	],
	heartOfTheMachinery: {
		tabs: [
			{ id: 'laser-sources', label: 'Laser sources' },
			{ id: 'servomotors', label: 'Servomotors' },
			{ id: 'protect-cabin', label: 'Protect cabin' },
			{ id: 'siemens-electric', label: 'Siemens electric' },
			{ id: 'control-system', label: 'Control system' },
			{ id: 'electronics', label: 'Electrics' },
		],
		content: {
			'laser-sources': {
				id: 'laser-sources',
				title: 'Laser sources',
				description:
					'IPG, Raycus are the world’s leading manufacturers of laser transmitters that provide the best results, which is why we use them.',
				details: [
					{ value: 'Up to 6kW', label: 'Optional power supply for Core and Core Pro' },
					{ value: 'Up to 12kW', label: 'Optional power supply for Nova' },
					{ value: 'Up to 30kW', label: 'Optional power supply for Heavy duty' },
				],
				image: '/img/catalog/cnc-routes.png',
			},
			servomotors: {
				id: 'servomotors',
				title: 'Servomotors',
				description:
					'High-torque drive modules provide stable motion at high loads and improve repeatability and cutting quality.',
				details: [
					{ value: 'Stable', label: 'Motion with low backlash' },
					{ value: 'Precise', label: 'High dynamics for cutting' },
				],
				image: '/img/catalog/cnc-routes.png',
			},
			'protect-cabin': {
				id: 'protect-cabin',
				title: 'Protect cabin',
				description:
					'Protective enclosure options help keep the workspace clean and support safe operation for different production needs.',
				details: [
					{ value: 'All models', label: 'Enclosure-ready configuration' },
					{ value: 'More safety', label: 'Improved operator protection' },
				],
				image: '/img/catalog/cnc-routes.png',
			},
			'siemens-electric': {
				id: 'siemens-electric',
				title: 'Siemens electric',
				description:
					'Trusted components provide smooth performance and maintain stable electrical characteristics over time.',
				details: [
					{ value: 'Trusted', label: 'Industrial-grade reliability' },
					{ value: 'Stable', label: 'Consistent electrical performance' },
				],
				image: '/img/catalog/cnc-routes.png',
			},
			'control-system': {
				id: 'control-system',
				title: 'Control system',
				description:
					'Easy to learn and configure control system with wide compatibility and production workflows.',
				details: [
					{ value: 'Fast', label: 'Efficient parameter handling' },
					{ value: 'Flexible', label: 'Works with your tooling and tasks' },
				],
				image: '/img/catalog/cnc-routes.png',
			},
			electronics: {
				id: 'electronics',
				title: 'Electrics',
				description:
					'High-quality electrical units built for stable operation and predictable machine behavior.',
				details: [
					{ value: 'Reliable', label: 'Stable electrical systems' },
					{ value: 'Safe', label: 'Designed for consistent production' },
				],
				image: '/img/catalog/cnc-routes.png',
			},
		},
	},
	materialsProcessing: {
		title: [
			{ text: 'Plenty of materials ', color: '#e63c32' },
			{ text: 'available for processing' },
		],
		images: [
			'/img/catalog/cnc-routes.png',
			'/img/catalog/cnc-routes.png',
			'/img/catalog/cnc-routes.png',
			'/img/catalog/cnc-routes.png',
			'/img/catalog/cnc-routes.png',
		],
		materials: [
			{ id: 'titanium', name: 'Titanium', action: 'All treatments', icon: '/img/catalog/cnc-routes.png' },
			{ id: 'copper', name: 'Copper', action: 'All treatments', icon: '/img/catalog/cnc-routes.png' },
			{ id: 'aluminium', name: 'Aluminium', action: 'All treatments', icon: '/img/catalog/cnc-routes.png' },
			{ id: 'galvanized-steel', name: 'Galvanized steel', action: 'All treatments', icon: '/img/catalog/cnc-routes.png' },
			{ id: 'carbon-steel', name: 'Carbon steel', action: 'All treatments', icon: '/img/catalog/cnc-routes.png' },
			{ id: 'brass', name: 'Brass', action: 'All treatments', icon: '/img/catalog/cnc-routes.png' },
			{ id: 'stainless-steel', name: 'Stainless steel', action: 'All treatments', icon: '/img/catalog/cnc-routes.png' },
		],
	},
	madeWithWattsan: {
		image: '/product-cards/cnc-router/image 11680.png',
	},
	serviceAndSupport: {
		image: '/product-cards/cnc-router/service-and-support/image 11691.png',
		cards: [
			{
				id: 'warranty',
				title: 'Warranty and Returns',
				description:
					'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.',
				icon: 'warranty',
			},
			{
				id: 'history',
				title: 'History of the machine',
				description:
					'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.',
				icon: 'history',
			},
			{
				id: 'support',
				title: 'Offline and online support',
				description:
					'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.',
				icon: 'support',
			},
		],
	},
	packageList: [
		{ id: '1', image: '/product-cards/cnc-router/image 11649.png', label: 'FSCUT remote control - 1 pc' },
		{ id: '2', image: '/product-cards/cnc-router/image 11650.png', label: 'Keyboard and mouse - 1 pc' },
		{ id: '3', image: '/product-cards/cnc-router/image 11651.png', label: 'Machine passport - 1 pc' },
		{ id: '4', image: '/product-cards/cnc-router/image 11649.png', label: 'Software manual - 1 pc' },
		{ id: '5', image: '/product-cards/cnc-router/image 11650.png', label: 'Panel opening keys (set) - 1 pc' },
		{ id: '6', image: '/product-cards/cnc-router/image 11651.png', label: 'Exhaust fan - 1 pc' },
		{ id: '7', image: '/product-cards/cnc-router/image 11649.png', label: 'Corrugated pipe for exhaust system (D=150 mm) - 1 pc' },
		{ id: '8', image: '/product-cards/cnc-router/image 11650.png', label: 'Metal clamp for corrugated pipe (D=150 mm) - 2 pcs' },
		{ id: '9', image: '/product-cards/cnc-router/image 11651.png', label: 'Rollers for waste collection - 3 pcs' },
		{ id: '10', image: '/product-cards/cnc-router/image 11649.png', label: 'Coaxial cable for laser head - 1 pc' },
		{ id: '11', image: '/product-cards/cnc-router/image 11650.png', label: 'BCL-AMP signal amplifier - 1 pc' },
		{ id: '12', image: '/product-cards/cnc-router/image 11651.png', label: 'Gas hose 8x10 mm - 10 pcs' },
		{ id: '13', image: '/product-cards/cnc-router/image 11649.png', label: 'Water hose - 10m' },
		{ id: '14', image: '/product-cards/cnc-router/image 11650.png', label: 'Nozzles - 1 pc' },
		{ id: '15', image: '/product-cards/cnc-router/image 11651.png', label: 'Protective glass - 1 pc' },
		{ id: '16', image: '/product-cards/cnc-router/image 11649.png', label: 'Laser emitter - 1 pc' },
		{ id: '17', image: '/product-cards/cnc-router/image 11650.png', label: 'Laser head - 1 pc' },
		{ id: '18', image: '/product-cards/cnc-router/image 11651.png', label: 'Chiller - 1 pc' },
	],
}

