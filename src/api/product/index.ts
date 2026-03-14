import { ProductPageData } from '../../types/product';
import * as mappers from './mappers';

// Raw Mock Data simulating API response
export const MOCK_CNC_ROUTER_DATA = {
    breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'CNC Routers', href: '/catalog' },
        { label: 'M1 series' }
    ],
    infoCards: [
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
            ]
        },
        {
            id: 'expert-reviews',
            title: 'Expert Reviews',
            content: 80
        }
    ],
    factsCards: [
        {
            id: 'ideal-for',
            subtitle: 'Ideal for',
            title: 'Make money 24/7 or work for your soul',
            type: 'image',
            imageUrl: '/product-cards/cnc-router/facts/facts1.png'
        },
        {
            id: 'customization',
            subtitle: 'Strong customization',
            title: 'As a manufacturer we can assemble any machine for your application',
            type: 'image',
            imageUrl: '/product-cards/cnc-router/facts/facts2.png'
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
    ],
    machineFeatures: [
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
    ],
    safetyCabinFeatures: [
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
    ],
    rotaryDeviceSpecs: [
        {
            value: '2510 mm',
            label: 'max long of workpieces'
        },
        {
            value: '300 mm',
            label: 'max working diameter'
        }
    ],
    specifications: [
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
    ],
    seriesComparison: [
        {
            id: 'm1',
            image: '/product-cards/cnc-router/image 11649.png',
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
            image: '/product-cards/cnc-router/image 11650.png',
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
            id: 'm3',
            image: '/product-cards/cnc-router/image 11651.png',
            title: 'M3 series',
            tagline: 'Industrial Power',
            price: '$25,000',
            specs: {
                workspace: '1300x2500 mm / 2000x3000mm / 2000x4000mm',
                spindle: 'from 3,5 kW',
                motor: 'Servo motor',
                control: 'Syntec / Weihong',
                cooling: 'Included',
                sensorRemovable: 'Included',
                sensorBuiltIn: 'Included',
                lubrication: 'Automatic',
                aspiration: 'Optional'
            }
        },
        {
            id: 'a1',
            image: '/product-cards/cnc-router/image 11680.png',
            title: 'A1 series',
            tagline: 'Absolute Precision',
            price: '$32,000',
            specs: {
                workspace: '1300x2500 mm / 2000x3000mm',
                spindle: 'from 5,5 kW',
                motor: 'Hybrid Servo',
                control: 'DSP A18',
                cooling: 'Included',
                sensorRemovable: 'Included',
                sensorBuiltIn: 'Included',
                lubrication: 'Automatic',
                aspiration: 'Included'
            }
        }
    ],
    toolSwitchVariants: [
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
    ],
    liquidCoolingTypes: [
        {
            title: 'Oil-mist spray system',
            description: 'Here, the liquid is sprayed to the working area. The liquids themselves are more viscous and can sustain greater temperatures. This system can be installed on any Wattsan CNC machine.'
        },
        {
            title: 'Flood type',
            description: 'Here, a jet of pressured water is being delivered, and this system requires a modificated router bed. Water as coolant has a good price-quality ratio and is easily accessible.'
        }
    ],
    tableTypes: [
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
                '<b>Versatile clamping:</b> vacuum tables clamp the workpiece evenly across its entire surface;'
            ],
            list: [
                '<b>Less damage:</b> vacuum tables clamp the material more gently and minimise the risk of damage. This is particularly important when working with sensitive or finished materials;',
                '<b>Quick material change:</b> on a vacuum table, less time is spent adjusting the clamp. Therefore, material change is easier, which increases productivity.'
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
    ],
    multiSpindlesSpecs: [
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
    ],
    reviews: [
        {
            id: '1',
            image: '/product-cards/cnc-router/image 11651.png',
            quote: '"I\'m extremely happy with the device! Its powerful reinforced frame reduces wobbling which is perfect for engraving at high speeds. I\'ve been using it for acrylic glass and the results look really cool."',
            author: {
                name: 'Heinrich Schuur',
                title: 'Blogger',
                avatar: '/img/catalog/cnc-routes.png'
            }
        },
        {
            id: '2',
            image: '/product-cards/cnc-router/image 11650.png',
            quote: '"The precision of this machine is unmatched in this price range. It fits perfectly in our workshop and the support team was super helpful during setup."',
            author: {
                name: 'David Miller',
                title: 'Workshop Owner',
                avatar: '/img/catalog/cnc-routes.png'
            }
        },
        {
            id: '3',
            image: '/product-cards/cnc-router/image 11649.png',
            quote: '"Fast, reliable, and easy to use. The control system is intuitive and we were able to start production on day one."',
            author: {
                name: 'Sarah Chen',
                title: 'Production Manager',
                avatar: '/img/catalog/cnc-routes.png'
            }
        }
    ],
    productionProcess: [
        {
            id: '01',
            title: 'Development',
            description: 'The process begins with the creation of new equipment models based on feedback from customers, dealers, and engineers. Each model undergoes multiple tests before entering production. We use components from global leaders like Mitsubishi, HIWIN, and Raytools, ensuring quality and easy replacement availability worldwide.',
            image: '/product-cards/cnc-router/production-process/image 10.png'
        },
        {
            id: '02',
            title: 'Robotic Accuracy',
            description: 'Parts are cut using bandsaws and metal cutters, with special attention given to the machine bed. Beds are welded onto stacker trays to ensure perfect flatness and long-term stability, unlike competitors who often rely on manual drilling.',
            image: '/product-cards/cnc-router/production-process/image 11.png'
        },
        {
            id: '03',
            title: 'Precision in Each Detail',
            description: 'Specialized milling machines create connection points for guides and racks, ensuring portals move precisely and accurately along their guides. This results in superior cut quality and accuracy compared to standard methods.',
            image: '/product-cards/cnc-router/production-process/image 12.png'
        }
    ],
    supportCards: [
        {
            id: 'warranty',
            title: 'Warranty and Returns',
            description: 'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.',
            icon: '/img/icons/config.svg' // Using simple paths, components will need to handle if they expect imports. Assuming we can adjust component to take string paths.
        },
        {
            id: 'history',
            title: 'History of the machine',
            description: 'We keep a detailed history of every machine we manufacture. This allows us to quickly identify parts and configurations for future service needs or upgrades.',
            icon: '/img/icons/favorites.svg'
        },
        {
            id: 'support',
            title: 'Offline and Online Support',
            description: 'Our expert team is available to assist you with any questions or issues. Whether you need remote troubleshooting or on-site assistance, we are here to help.',
            icon: '/img/icons/account.svg'
        },
        {
            id: 'training',
            title: 'Training',
            description: 'Comprehensive training programs to ensure your team can operate the machine efficiently and safely from day one.',
            icon: '/img/icons/account.svg'
        }
    ],
    interestedProducts: [
        {
            id: '1',
            image: '/product-cards/cnc-router/image 11649.png',
            name: 'Accessories for CNC Router Machines',
            code: 'Spindle SDK GDZ120x103-4.5',
            modification: '',
            price: '5000'
        },
        {
            id: '2',
            image: '/product-cards/cnc-router/image 11650.png',
            name: 'Laser Cutting Engraving Machine',
            code: '6040 ST',
            modification: 'modified',
            price: '5000'
        },
        {
            id: '3',
            image: '/product-cards/cnc-router/image 11651.png',
            name: 'Accessories for CNC Router Machines',
            code: 'Spindle SDK GDZ120x103-4.5',
            modification: '',
            price: '5000'
        },
        {
            id: '4',
            image: '/product-cards/cnc-router/image 11680.png',
            name: 'Laser Cutting Engraving Machine',
            code: '6040 ST',
            modification: 'modified',
            price: '5000'
        }
    ],
    heartOfTheMachinery: {
        tabs: [
            { id: 'spindle', label: 'Spindle' },
            { id: 'worktable', label: 'Worktable' },
            { id: 'controlSystem', label: 'Control system' }
        ],
        content: {
            spindle: {
                id: 'spindle',
                title: 'Powerful spindle with upgrade option',
                description: 'The durability of the machine is due to the frame configuration, metal wall thickness and heat treatment. We can therefore guarantee reliability and a long service life.',
                details: [
                    { label: 'Power', value: 'from 2,2 kW' },
                    { label: 'Z axis travel', value: '300 mm' }
                ],
                image: '/product-cards/cnc-router/spindles/spindles-4.png'
            },
            worktable: {
                id: 'worktable',
                title: 'Reliable Worktable',
                description: 'Vacuum table with T-slots allows you to fix the material both with clamps and vacuum.',
                details: [
                    { label: 'Type', value: 'Vacuum + T-slots' },
                    { label: 'Zones', value: '4-6 zones' }
                ],
                image: '/product-cards/cnc-router/image 11651.png'
            },
            controlSystem: {
                id: 'controlSystem',
                title: 'Advanced Control System',
                description: 'Easy to learn and operate control system with wide compatibility.',
                details: [
                    { label: 'System', value: 'DSP A11' },
                    { label: 'Compatibility', value: 'Win/Mac/Linux' }
                ],
                image: '/product-cards/cnc-router/image 11650.png'
            }
        }
    },
    materialsProcessing: {
        title: [
            { text: 'Plenty of materials ', color: '#e63c32' },
            { text: 'available for processing' }
        ],
        images: [
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png'
        ],
        materials: [
            { id: 'plywood', name: 'Plywood', action: 'Cutting and engraving', icon: '/image 11643' },
            { id: 'mdf', name: 'MDF', action: 'Cutting and engraving', icon: '/image 11681' },
            { id: 'wood', name: 'Wood', action: 'Cutting and engraving', icon: '/image 11644' },
            { id: 'plexyglass', name: 'Plexyglass', action: 'Cutting and engraving', icon: '/image 11682' },
            { id: 'acrylic', name: 'Acrylic', action: 'Cutting and engraving', icon: '/image 11683' },
            { id: 'abs', name: 'ABS', action: 'Cutting and engraving', icon: '/image 11684' },
            { id: 'foamboard', name: 'Foamboard', action: 'Cutting and engraving', icon: '/image 11685' },
            { id: 'leather', name: 'Leather', action: 'Cutting and engraving', icon: '/image 11686' },
            { id: 'fabric', name: 'Fabric', action: 'Cutting and engraving', icon: '/image 11687' },
            { id: 'stone-ceramics', name: 'Stone and ceramics', action: 'Engraving', icon: '/image 11688' },
            { id: 'laser-rubber', name: 'Laser rubber', action: 'Engraving', icon: '/image 11704' },
            { id: 'glass', name: 'Glass', action: 'Engraving', icon: '/image 11690' }
        ]
    },
    aspirationSystem: {
        title: [
            { text: 'Aspiration ', color: '#e63c32' },
            { text: 'System' }
        ],
        subtitle: 'All models supported',
        descriptions: [
            'Aspiration systems are designed to efficiently remove dust, chips, and debris created during machining. This improves air quality in the workspace, ensures a cleaner environment, and reduces the risk of tool wear and clogging. It also helps maintain precision and prolongs the machine\'s lifespan.',
            'Airflow rate, filter capacity, and suction efficiency affect dust removal, tool longevity, and workspace cleanliness, ensuring optimal machine performance and safety.'
        ]
    },
    gallery: {
        mainImage: '/img/catalog/cnc-routes.png',
        thumbnails: [
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png'
        ]
    },
    productInfo: {
        title: 'CNC Router Machine M1 series',
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
        deliveryNote: 'Please note that the delivery cost is paid separately and is not included in the total amount. After placing your order, a manager will contact you to confirm all delivery details.'
    },
    madeWithWattsan: {
        image: '/product-cards/cnc-router/image 11680.png'
    },
    serviceAndSupport: {
        image: '/product-cards/cnc-router/service-and-support/image 11691.png',
        cards: [
            {
                id: 'warranty',
                title: 'Warranty and Returns',
                description: 'A robust warranty on all products, providing assurance of quality and durability. If breakages are detected or the product is not of the correct quality, we will refund your money.',
                icon: 'warranty'
            },
            {
                id: 'history',
                title: 'History of the machine',
                description: 'We keep a detailed history of every machine we manufacture. This allows us to quickly identify parts and configurations for future service needs or upgrades.',
                icon: 'history'
            },
            {
                id: 'support',
                title: 'Offline and Online Support',
                description: 'Our expert team is available to assist you with any questions or issues. Whether you need remote troubleshooting or on-site assistance, we are here to help.',
                icon: 'support'
            },
            {
                id: 'training',
                title: 'Training',
                description: 'Comprehensive training programs to ensure your team can operate the machine efficiently and safely from day one.',
                icon: 'training'
            }
        ]
    },
    packageList: [
        { id: '2', image: '/img/catalog/cnc-routes.png', label: 'Package list - 2' },
        { id: '3', image: '/img/catalog/cnc-routes.png', label: 'Package list - 3' },
        { id: '4', image: '/img/catalog/cnc-routes.png', label: 'Package list - 4' },
        { id: '5', image: '/img/catalog/cnc-routes.png', label: 'Package list - 5' },
        { id: '6', image: '/img/catalog/cnc-routes.png', label: 'Package list - 6' },
        { id: '7', image: '/img/catalog/cnc-routes.png', label: 'Package list - 7' },
        { id: '8', image: '/img/catalog/cnc-routes.png', label: 'Package list - 8' },
        { id: '8-2', image: '/img/catalog/cnc-routes.png', label: 'Package list - 8' },
        { id: '9', image: '/img/catalog/cnc-routes.png', label: 'Package list - 9' },
        { id: '10', image: '/img/catalog/cnc-routes.png', label: 'Package list - 10' },
        { id: '11', image: '/img/catalog/cnc-routes.png', label: 'Package list - 11' },
        { id: '12', image: '/img/catalog/cnc-routes.png', label: 'Package list - 12' },
        { id: '13', image: '/img/catalog/cnc-routes.png', label: 'Package list - 13' }
    ]
};

const MOCK_LASER_CO2_DATA = {
    ...MOCK_CNC_ROUTER_DATA,
    productInfo: {
        ...MOCK_CNC_ROUTER_DATA.productInfo,
        title: 'CO2 Laser Machine L1 series'
    },
    breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'CO2 Lasers', href: '/catalog' },
        { label: 'L1 series' }
    ]
};

const MOCK_LASER_MARKERS_DATA = {
    ...MOCK_CNC_ROUTER_DATA,
    productInfo: {
        ...MOCK_CNC_ROUTER_DATA.productInfo,
        title: 'Laser Markers TT series'
    },
    breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Laser Markers', href: '/catalog' },
        { label: 'TT series' }
    ],
    machineFeatures: [
        {
            title: 'Laser source',
            description: 'There are three types: fiber, ultraviolet, and RF laser sources. Fiber is for metals, ultraviolet is for any product, and CO2 is for processing organic materials.'
        },
        {
            title: 'Cooling system',
            description: 'There are water-cooled and air-cooled types. Water-cooled types are only available with UV sources, while air-cooled types are installed on markers with FL and CO2 sources. Desktop models have the source built in, making them more compact.'
        },
        {
            title: 'Column',
            description: 'A device with a trapezoidal screw inside, designed to adjust the height of the scanner. Mainly manual type. Motorized version available as an option.'
        }
    ],
    heartOfTheMachinery: {
        tabs: [
            { id: 'scanner', label: 'Scanner' },
            { id: 'controlSystem', label: 'Control system' },
            { id: 'fThetaLens', label: 'F-theta lens' },
            { id: 'electrics', label: 'Electrics' }
        ],
        content: {
            scanner: {
                id: 'scanner',
                title: 'Scanner',
                description: 'A device that directs a laser beam onto the surface to be treated. Inside, there are two motors with mirrors adjusted to the required power and wavelength. There are also two red laser pointers that help to precisely adjust the focal length.',
                details: [],
                image: '/product-cards/cnc-router/image 11651.png'
            },
            controlSystem: {
                id: 'controlSystem',
                title: 'Control system',
                description: 'Advanced control system designed for precise laser marking operations.',
                details: [],
                image: '/product-cards/cnc-router/image 11651.png'
            },
            fThetaLens: {
                id: 'fThetaLens',
                title: 'F-theta lens',
                description: 'Specialized lens optimized for flat field focal points required in laser marking.',
                details: [],
                image: '/product-cards/cnc-router/image 11651.png'
            },
            electrics: {
                id: 'electrics',
                title: 'Electrics',
                description: 'Reliable electrical components ensuring stable operation of the laser marking machine.',
                details: [],
                image: '/product-cards/cnc-router/image 11651.png'
            }
        }
    },
    materialsProcessing: {
        title: [
            { text: 'Plenty of materials ', color: '#e63c32' },
            { text: 'available for processing' }
        ],
        images: [
            '/img/catalog/cnc-routes.png', // Placeholder or generated later
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png'
        ],
        materials: [
            { id: 'abs', name: 'ABS', action: 'Marking', icon: '/image 11684' },
            { id: 'polycarbonate', name: 'Polycarbonate', action: 'Marking', icon: '/image 11681' },
            { id: 'rubber', name: 'Rubber', action: 'Marking', icon: '/image 11704' },
            { id: 'aluminum', name: 'Aluminum', action: 'Marking', icon: '/image 11643' },
            { id: 'gold', name: 'Gold', action: 'Marking', icon: '/image 11644' },
            { id: 'copper', name: 'Copper', action: 'Marking', icon: '/image 11682' },
            { id: 'platinum', name: 'Platinum', action: 'Marking', icon: '/image 11683' },
            { id: 'silver', name: 'Silver', action: 'Marking', icon: '/image 11685' },
            { id: 'titanium', name: 'Titanium', action: 'Marking', icon: '/image 11686' },
            { id: 'brass', name: 'Brass', action: 'Marking', icon: '/image 11687' },
            { id: 'stainless-steel', name: 'Stainless steel', action: 'Marking', icon: '/image 11688' },
            { id: 'ceramics', name: 'Ceramics', action: 'Marking', icon: '/image 11690' }
        ]
    },
    twoLaserHeads: {
        title: 'Two laser heads',
        subtitle: 'Only DUOS series models supported',
        description1: 'Parallel operation of two laser heads significantly increases production speed',
        description2: 'Laser heads can divide the work area and process two workpieces at once, or use one head for large workpieces',
        image: '/img/catalog/cnc-routes.png' // Placeholder for the two heads graphic
    }
};

const MOCK_METAL_CUTTERS_DATA = {
    ...MOCK_CNC_ROUTER_DATA,
    productInfo: {
        ...MOCK_CNC_ROUTER_DATA.productInfo,
        title: 'Laser Metal Cutters A series'
    },
    breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Laser Metal Cutters', href: '/catalog' },
        { label: 'A series' }
    ],
    machineFeatures: [
        {
            title: 'Workspace',
            description: 'Depending on the description of the "ideal for" block for metal cutters (needs clarification).'
        },
        {
            title: 'Frame',
            description: 'The frame is made from sheet metal with a thickness of 6-8 mm, ensuring no deformation or misalignment even at speeds of 80 m/min and acceleration up to 1G. Reinforced ribs add extra strength, minimizing vibrations at high speeds and accelerations.'
        },
        {
            title: 'Aluminum Support',
            description: "Constructed from the last generation of aircraft aluminum, the machine's portals offer rigidity, lightness, and resistance to corrosion and oxidation. This ensures stability under heavy loads and prevents deformation, guaranteeing long-term, trouble-free operation."
        },
        {
            title: 'HIWIN guides',
            description: "Wattsan laser metal cutting machines have Hiwin guides, 25 mm. This is a worldwide-known brand with a proven track record. These guides have high precision, reliability, and low friction."
        },
        {
            title: 'Yaskawa motor',
            description: "Wattsan employs Yaskawa motors, known globally for their power and reliability. These motors offer double the safety margin with a lightweight design, supporting up to 1,5G acceleration and minimal vibration. They ensure accuracy to within millimeters even at 40 km/h and are easy to maintain and replace."
        }
    ],
    heartOfTheMachinery: {
        tabs: [
            { id: 'laserHead', label: 'Laser head' },
            { id: 'laserSources', label: 'Laser sources' },
            { id: 'intelligentControlSystem', label: 'Intelligent Control System' },
            { id: 'secureMachine', label: 'Secure the machine from wear' },
            { id: 'electrics', label: 'Electrics' }
        ],
        content: {
            laserHead: {
                id: 'laserHead',
                title: 'Laser head',
                description: "The power range of laser sources used in metal cutting machines is from 1.5 kW to 100 kW. IPG, Raycus, Max Photonics, Reci are the world's leading manufacturers of laser transmitters that provide the best results, which is why we use them.",
                details: [],
                image: '/product-cards/cnc-router/spindles/spindles-4.png'
            },
            laserSources: {
                id: 'laserSources',
                title: 'Laser sources',
                description: 'High-quality laser sources ensure precision and cutting power for thick metals.',
                details: [],
                image: '/product-cards/cnc-router/image 11651.png'
            },
            intelligentControlSystem: {
                id: 'intelligentControlSystem',
                title: 'Intelligent Control System',
                description: 'Advanced intelligent control system capable of fully automating the cutting process.',
                details: [],
                image: '/product-cards/cnc-router/image 11650.png'
            },
            secureMachine: {
                id: 'secureMachine',
                title: 'Secure the machine from wear',
                description: 'Built-in security systems to extend the machine lifetime and secure from wearing out quickly.',
                details: [],
                image: '/product-cards/cnc-router/image 11651.png'
            },
            electrics: {
                id: 'electrics',
                title: 'Electrics',
                description: 'Reliable electrical components ensuring stable operation.',
                details: [],
                image: '/product-cards/cnc-router/image 11650.png'
            }
        }
    },
    materialsProcessing: {
        title: [
            { text: 'Plenty of materials ', color: '#e63c32' },
            { text: 'available for processing' }
        ],
        images: [
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png'
        ],
        materials: [
            { id: 'titanium', name: 'Titanium', action: 'Cutting', icon: '/image 11684' },
            { id: 'brass', name: 'Brass', action: 'Cutting', icon: '/image 11681' },
            { id: 'copper', name: 'Copper', action: 'Cutting', icon: '/image 11704' },
            { id: 'aluminum', name: 'Aluminium', action: 'Cutting', icon: '/image 11643' },
            { id: 'galvanized-steel', name: 'Galvanized steel', action: 'Cutting', icon: '/image 11644' },
            { id: 'stainless-steel', name: 'Stainless steel', action: 'Cutting', icon: '/image 11682' },
            { id: 'carbon-steel', name: 'Carbon steel', action: 'Cutting', icon: '/image 11683' }
        ]
    }
};

const MOCK_CLEANING_MACHINES_DATA = {
    ...MOCK_CNC_ROUTER_DATA,
    productInfo: {
        ...MOCK_CNC_ROUTER_DATA.productInfo,
        title: 'Cleaning machines A series'
    },
    breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Cleaning machines', href: '/catalog' },
        { label: 'A series' }
    ],
    machineFeatures: [
        {
            title: 'Fiber cable',
            description: 'Connecting gun to source'
        },
        {
            title: 'Cooling system',
            description: 'Water or air. Reliable, with a water circuit located below the laser source to eliminate the risk of damage in the event of a leak.'
        },
        {
            title: 'Control panel',
            description: 'Providing control over all operating parameters.'
        }
    ],
    heartOfTheMachinery: {
        tabs: [
            { id: 'laserGun', label: 'Laser gun' },
            { id: 'laserSources', label: 'Laser sources' },
            { id: 'controlSystem', label: 'Control System' },
            { id: 'electrics', label: 'Electrics' }
        ],
        content: {
            laserGun: {
                id: 'laserGun',
                title: 'Laser gun Ralfar',
                description: 'One of the most convenient and lightweight in its class. Provides precise, stable and safe control of the welding process.',
                details: [],
                image: '/product-cards/cnc-router/spindles/spindles-4.png'
            },
            laserSources: {
                id: 'laserSources',
                title: 'Laser sources',
                description: 'High-quality laser sources ensure precision and power.',
                details: [],
                image: '/product-cards/cnc-router/image 11651.png'
            },
            controlSystem: {
                id: 'controlSystem',
                title: 'Control System',
                description: 'Advanced intelligent control system capable of fully automating the process.',
                details: [],
                image: '/product-cards/cnc-router/image 11650.png'
            },
            electrics: {
                id: 'electrics',
                title: 'Electrics',
                description: 'Reliable electrical components ensuring stable operation.',
                details: [],
                image: '/product-cards/cnc-router/image 11650.png'
            }
        }
    },
    materialsProcessing: {
        title: [
            { text: 'Types of contaminants ', color: '#e63c32' },
            { text: 'to be treated' }
        ],
        images: [
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png',
            '/img/catalog/cnc-routes.png'
        ],
        materials: [
            { id: 'dye', name: 'Dye', action: 'All treatments', icon: '/image 11684' },
            { id: 'soot', name: 'Soot', action: 'All treatments', icon: '/image 11681' },
            { id: 'rust', name: 'Rust', action: 'All treatments', icon: '/image 11704' },
            { id: 'rubber', name: 'Rubber', action: 'All treatments', icon: '/image 11643' },
            { id: 'oxidized-rusty-metal', name: 'Oxidized rusty metal', action: 'All treatments', icon: '/image 11644' },
            { id: 'oxide-coating', name: 'Oxide coating', action: 'All treatments', icon: '/image 11682' },
            { id: 'oil-paint', name: 'Oil paint', action: 'All treatments', icon: '/image 11683' },
            { id: 'electroplating', name: 'Electroplating', action: 'All treatments', icon: '/image 11682' }
        ]
    },
    seriesComparison: [
        {
            id: 'pa',
            image: '/product-cards/cnc-router/image 11649.png',
            title: 'PA series',
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
            id: 'cw',
            image: '/product-cards/cnc-router/image 11650.png',
            title: 'CW series',
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
            id: 'cw-pro',
            image: '/product-cards/cnc-router/image 11651.png',
            title: 'CW PRO series',
            tagline: 'Real workhorse',
            price: '$19,000',
            active: true,
            specs: {
                workspace: '300x400 mm / 600x900 mm',
                spindle: 'from 1,5 kW',
                motor: 'Stepper motor',
                control: 'RichAuto / DSP A11',
                cooling: 'Optional',
                sensorRemovable: '—',
                sensorBuiltIn: '—',
                lubrication: 'Optional',
                aspiration: 'Optional'
            }
        },
        {
            id: 'pw-pro',
            image: '/product-cards/cnc-router/image 11680.png',
            title: 'PW PRO series',
            tagline: 'Real workhorse',
            price: '$19,000',
            specs: {
                workspace: '300x400 mm / 600x900 mm',
                spindle: 'from 1,5 kW',
                motor: 'Stepper motor',
                control: 'RichAuto / DSP A11',
                cooling: 'Optional',
                sensorRemovable: '—',
                sensorBuiltIn: '—',
                lubrication: 'Optional',
                aspiration: 'Optional'
            }
        }
    ],
    purifierWelderComparisonData: {
        title: 'Comparison of purifier and welder with purification',
        description: 'При выборе волоконного лазерного маркиратора важно понимать различия между двумя основными типами источников — MOPA и Q-Switched. Оба используются для маркировки и гравировки, но отличаются по возможностям, точности и сферам применения.',
        cards: [
            {
                title: 'Cleaner',
                image: '/img/catalog/cnc-routes.png',
                specs: [
                    { label: 'Purpose', value: 'Specialized for laser cleaning (removal of rust, paint, scale)' },
                    { label: 'Type of laser', value: 'Often used is a pulsed laser (for delicate and precise cleaning)' },
                    { label: 'Cleaning quality', value: 'Cleans quickly and neatly without damaging the base material' },
                    { label: 'Depth and precision of processing', value: 'Adjustable to the type of pollution: frequency, power, pattern are adjustable' },
                    { label: 'Ease of use', value: 'Automatic presets, simple interface, quick setup' },
                    { label: 'The feasibility of choice', value: 'Ideal for production where stable and high-quality cleaning is important' }
                ]
            },
            {
                title: 'Welding',
                image: '/img/catalog/cnc-routes.png',
                specs: [
                    { label: 'Purpose', value: 'Multifunctional: welding, soldering, cleaning, cutting, seam cutting' },
                    { label: 'Type of laser', value: 'Continuous Wave (CW) only, less gentle when cleaning, higher risk of overheating' },
                    { label: 'Cleaning quality', value: 'In cleaning mode, it may leave marks, especially on thin surfaces.' },
                    { label: 'Depth and precision of processing', value: 'Limited customization options for cleaning mode' },
                    { label: 'Ease of use', value: 'Switching between functions requires reconfiguration and changing attachments' },
                    { label: 'The feasibility of choice', value: 'Good as a general purpose solution for minor repairs and welding with occasional cleaning' }
                ]
            }
        ]
    },
    stitchesComparisonData: {
        title: 'Comparison of stitches',
        cards: [
            { title: 'Linear', image: '/img/catalog/cnc-routes.png' },
            { title: 'Complex stitches Ꝏ, ◯, ⨝, ◎, △, ◯◯◯', image: '/img/catalog/cnc-routes.png' }
        ]
    }
};

export const getProductPageData = async (productId: string): Promise<ProductPageData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Return mock data based on ID
    if (productId === 'laser-co2') {
        return mappers.mapProductPageData(MOCK_LASER_CO2_DATA);
    }

    if (productId === 'laser-markers') {
        return mappers.mapProductPageData(MOCK_LASER_MARKERS_DATA);
    }

    if (productId === 'metal-cutters') {
        return mappers.mapProductPageData(MOCK_METAL_CUTTERS_DATA);
    }

    if (productId === 'cleaning-machines') {
        return mappers.mapProductPageData(MOCK_CLEANING_MACHINES_DATA);
    }

    // Default to CNC
    return mappers.mapProductPageData(MOCK_CNC_ROUTER_DATA);
};
