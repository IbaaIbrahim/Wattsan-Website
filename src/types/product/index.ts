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
