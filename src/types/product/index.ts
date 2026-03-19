import { ReactNode } from 'react'

export interface BreadcrumbItem {
    label: string
    href?: string
}

export interface MaterialColor {
    color: string
    name: string
}

export interface ProductInfoCardData {
    id: string
    title: string
    content?: string | number
    materials?: MaterialColor[]
    onViewAllClick?: () => void
}

export interface WattsanFactCardData {
    id: string
    subtitle: string
    title: string
    type: 'image' | 'solid'
    imageUrl?: string
    backgroundColor?: string
    certifications?: string[]
}

export interface ProductFeature {
    title: string
    description: string
}

export interface SafetyCabinFeature {
    title: string
    description: string
}

export interface RotaryDeviceSpec {
    value: string
    label: string
}

export interface SpecificationItem {
    label: string
    value: string
    unit?: string
}

export interface SpecificationCategory {
    id: string
    label: string
    items: SpecificationItem[]
}

export interface ComparisonSpecs {
    workspace: string
    spindle: string
    motor: string
    control: string
    cooling: string
    sensorRemovable: string
    sensorBuiltIn: string
    lubrication: string
    aspiration: string
}

export interface ComparisonSeries {
    id: string
    image: string
    title: string
    tagline: string
    price: string
    active?: boolean
    specs: ComparisonSpecs
}

export interface ToolSwitchVariant {
    id: string
    title: string
    description: string
    thumbnail: string
    footerLabel: string
    isWarning?: boolean
}

export interface LiquidCoolingType {
    title: string
    description: string
}

export interface TableTypeItem {
    id: string
    title: string
    description: string
    advantagesTitle?: string
    advantages?: string[]
    list?: string[]
}

export interface MultiSpindlesSpec {
    title: string
    description: string
}

export interface ProductParameterOption {
    value: string | number
    text: string
    price?: string
}

export interface ProductParameter {
    id: string
    label: string
    type: 'select' | 'radio'
    value: string | number
    options: ProductParameterOption[]
    onChange?: (value: string | number) => void
}

export interface ReviewAuthor {
    name: string
    title: string
    avatar: string
}

export interface Review {
    id: string
    image: string
    quote: string
    author: ReviewAuthor
}

export interface ProductionProcessStep {
    id: string
    title: string
    description: string
    image: string
}

export interface SupportCard {
    id: string
    title: string
    description: string
    icon: any // specific type depends on SVG import
}

export interface InterestedProduct {
    id: string
    image: string
    name: string
    code: string
    modification: string
    price: string
}

export interface DetailItem {
    label: string
    value: string
}

export interface MachineTabContent {
    id: string
    title: string
    description: string
    details: DetailItem[]
    image: string
}

export interface HeartOfTheMachineryData {
    tabs: { id: string; label: string }[]
    content: Record<string, MachineTabContent>
}

// Materials Processing Data
export interface TitlePart {
    text: string
    color?: string
}

export interface MaterialItem {
    id: string
    name: string
    action: string
    icon: string
}

export interface MaterialsProcessingData {
    title: TitlePart[]
    images: string[]
    materials: MaterialItem[]
}

// Two Laser Heads Data
export interface TwoLaserHeadsData {
    title: string
    subtitle: string
    description1: string
    description2: string
    image: string
}

// Laser Types Data
export interface LaserTypeCard {
    id: string
    title: string
    image: string
    specs: {
        label: string
        value: string
    }[]
}

export interface LaserTypesData {
    title?: string
    cards: LaserTypeCard[]
}

// MOPA Comparison Data
export interface MopaComparisonCard {
    title: string
    image?: string
    specs: {
        label: string
        value: string
    }[]
}

export interface MopaComparisonData {
    title?: string
    description?: string
    cards: MopaComparisonCard[]
    alert?: {
        text: string
        icon?: string
    }
}

// Aspiration System Data
export interface AspirationSystemData {
    title: TitlePart[]
    subtitle: string
    descriptions: string[]
}

// Purifier/Welder Comparison Data
export interface PurifierWelderCard {
    title: string
    image?: string
    specs: {
        label: string
        value: string
    }[]
}

export interface PurifierWelderComparisonData {
    title: string
    description: string
    cards: PurifierWelderCard[]
}

// Stitches Comparison Data
export interface StitchesComparisonCard {
    title: string
    image?: string
}

export interface StitchesComparisonData {
    title: string
    cards: StitchesComparisonCard[]
}

// Welding Comparison Data
export interface WeldingComparisonCheck {
    hasCheck: boolean
    icon?: string
}

export interface WeldingComparisonColumn {
    title: string
    checks: WeldingComparisonCheck[]
}

export interface WeldingComparisonData {
    title?: string
    features: string[]
    columns: WeldingComparisonColumn[]
}

// Aggregated Page Data Interface
export interface ProductPageData {
    breadcrumbs: BreadcrumbItem[]
    infoCards: ProductInfoCardData[]
    factsCards: WattsanFactCardData[]
    machineFeatures: ProductFeature[]
    safetyCabinFeatures: SafetyCabinFeature[]
    rotaryDeviceSpecs: RotaryDeviceSpec[]
    specifications: SpecificationCategory[]
    seriesComparison: ComparisonSeries[]
    toolSwitchVariants: ToolSwitchVariant[]
    liquidCoolingTypes: LiquidCoolingType[]
    tableTypes: TableTypeItem[]
    multiSpindlesSpecs: MultiSpindlesSpec[]
    reviews: Review[]
    productionProcess: ProductionProcessStep[]
    supportCards: SupportCard[]
    interestedProducts: InterestedProduct[]
    heartOfTheMachinery: HeartOfTheMachineryData
    materialsProcessing: MaterialsProcessingData
    twoLaserHeads?: TwoLaserHeadsData
    laserTypesData?: LaserTypesData
    mopaComparisonData?: MopaComparisonData
    aspirationSystem?: AspirationSystemData
    purifierWelderComparisonData?: PurifierWelderComparisonData
    stitchesComparisonData?: StitchesComparisonData
    weldingComparisonData?: WeldingComparisonData
    gallery: {
        mainImage: string
        thumbnails: string[]
    }
    productInfo: {
        title: string
        rating: number
        reviewCount: number
        questionCount: number
        currentPrice: string
        originalPrice: string
        discount: string
        discountPercent: string
        availability: string
        shipment: string
        delivery: string
        deliveryMethods: string[]
        deliveryNote: string
    }
    madeWithWattsan: {
        image: string
    }
    serviceAndSupport: {
        image: string
        cards: SupportCard[]
    }
    packageList: PackageItem[]
}

export interface PackageItem {
    id: string
    image: string
    label: string
}
