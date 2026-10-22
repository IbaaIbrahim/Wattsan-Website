import * as ProductTypes from '@my-types/product';
import { formatMediaUrl } from '@/utils/helpers';
import { isSystemBlock, isMultiItemTemplate } from '@/constants/content-sections';
import type { ContentJson } from '@/classes/content';
import type { SeriesPageContent } from '@/services/content.service';

// Simulated raw API types (could be 'any' or defined loosely)
// For now, we assume the API returns roughly the correct shape, 
// and we sanitize/validate it here.

export const mapBreadcrumbs = (data: any[]): ProductTypes.BreadcrumbItem[] => {
    return data.map(item => ({
        label: item.label || '',
        href: item.href || undefined
    }));
};

export const mapInfoCards = (data: any[]): ProductTypes.ProductInfoCardData[] => {
    return data.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        materials: item.materials,
        // Methods like onViewAllClick would typically be attached in the UI component, 
        // not coming from the API. The API gives data.
    }));
};

export const mapFactsCards = (data: any[]): ProductTypes.WattsanFactCardData[] => {
    return data.map(item => ({
        id: item.id,
        subtitle: item.subtitle,
        title: item.title,
        type: item.type,
        imageUrl: item.imageUrl,
        videoUrl: item.videoUrl,
        backgroundColor: item.backgroundColor,
        certifications: item.certifications
    }));
};

export const mapMachineFeatures = (data: any[]): ProductTypes.ProductFeature[] => {
    return data.map(item => ({
        title: item.title,
        description: item.description
    }));
};

export const mapSafetyCabinFeatures = (data: any[]): ProductTypes.SafetyCabinFeature[] => {
    return data.map(item => ({
        title: item.title,
        description: item.description
    }));
};

export const mapRotaryDeviceSpecs = (data: any[]): ProductTypes.RotaryDeviceSpec[] => {
    return data.map(item => ({
        value: item.value,
        label: item.label
    }));
};

export const mapSpecifications = (data: any[]): ProductTypes.SpecificationCategory[] => {
    return data.map(item => ({
        id: item.id,
        label: item.label,
        items: item.items.map((subItem: any) => ({
            label: subItem.label,
            value: subItem.value,
            unit: subItem.unit
        }))
    }));
};

export const mapComparisonSeries = (data: any[]): ProductTypes.ComparisonSeries[] => {
    return data.map(item => ({
        id: item.id,
        image: item.image,
        title: item.title,
        tagline: item.tagline,
        price: item.price,
        active: item.active,
        specs: {
            workspace: item.specs.workspace,
            spindle: item.specs.spindle,
            motor: item.specs.motor,
            control: item.specs.control,
            cooling: item.specs.cooling,
            sensorRemovable: item.specs.sensorRemovable,
            sensorBuiltIn: item.specs.sensorBuiltIn,
            lubrication: item.specs.lubrication,
            aspiration: item.specs.aspiration
        }
    }));
};

export const mapToolSwitchVariants = (data: any[]): ProductTypes.ToolSwitchVariant[] => {
    return data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        thumbnail: item.thumbnail,
        footerLabel: item.footerLabel,
        warning: item.warning,
        video: item.video,
        videoUrl: item.videoUrl || item.video,
        isWarning: item.isWarning
    }));
};

export const mapLiquidCoolingTypes = (data: any[]): ProductTypes.LiquidCoolingType[] => {
    return data.map(item => ({
        title: item.title,
        description: item.description,
        videoUrl: item.videoUrl,
        media: item.media || item.videoUrl
    }));
};

export const mapTableTypes = (data: any[]): ProductTypes.TableTypeItem[] => {
    return data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        advantagesTitle: item.advantagesTitle,
        advantages: item.advantages,
        list: item.list
    }));
};

export const mapMultiSpindlesSpecs = (data: any[]): ProductTypes.MultiSpindlesSpec[] => {
    return data.map(item => ({
        title: item.title,
        description: item.description
    }));
};

export const mapReviews = (data: any[]): ProductTypes.Review[] => {
    return data.map(item => ({
        id: item.id,
        media: item.media || item.image || item.videoUrl,
        image: item.image,
        videoUrl: item.videoUrl,
        quote: item.quote,
        author: item.author ? {
            name: item.author.name,
            title: item.author.title,
            avatar: item.author.avatar
        } : undefined
    }));
};

export const mapProductionProcess = (data: any[]): ProductTypes.ProductionProcessStep[] => {
    return data.map(item => ({
        id: item.id,
        step_number: item.step_number || item.id,
        title: item.title,
        description: item.description,
        image: item.image
    }));
};

export const mapSupportCards = (data: any[]): ProductTypes.SupportCard[] => {
    return data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon // Note: This might need special handling if icons are dynamic strings from API vs imports
    }));
};

export const mapInterestedProducts = (data: any[]): ProductTypes.InterestedProduct[] => {
    return data.map(item => ({
        id: item.id,
        image: item.image,
        name: item.name,
        code: item.code,
        modification: item.modification,
        price: item.price
    }));
};

export const mapMaterialsProcessing = (data: any): ProductTypes.MaterialsProcessingData => {
    return {
        title: data?.title || [],
        images: data?.images || [],
        materials: data?.materials?.map((m: any) => ({
            id: m.id,
            name: m.name,
            action: m.action,
            icon: m.icon
        })) || []
    };
};

export const mapTwoLaserHeads = (data: any): ProductTypes.TwoLaserHeadsData => {
    return {
        title: data?.title || '',
        subtitle: data?.subtitle || '',
        description1: data?.description1 || '',
        description2: data?.description2 || '',
        image: data?.image || ''
    };
};

export const mapHeartOfTheMachinery = (data: any): ProductTypes.HeartOfTheMachineryData => {
    return {
        tabs: data.tabs.map((tab: any) => ({
            id: tab.id,
            label: tab.label
        })),
        content: Object.keys(data.content).reduce((acc: any, key: string) => {
            const item = data.content[key];
            acc[key] = {
                id: item.id,
                title: item.title,
                description: item.description,
                details: item.details.map((detail: any) => ({
                    label: detail.label,
                    value: detail.value
                })),
                image: item.image
            };
            return acc;
        }, {} as Record<string, ProductTypes.MachineTabContent>)
    };
};

export const mapProductPageData = (data: any): ProductTypes.ProductPageData => {
    const mappedMaterialsProcessing = mapMaterialsProcessing(data.materialsProcessing || data.materialsProcessingData || {});
    return {
        breadcrumbs: mapBreadcrumbs(data.breadcrumbs || []),
        infoCards: mapInfoCards(data.infoCards || []),
        factsCards: mapFactsCards(data.factsCards || []),
        machineFeatures: mapMachineFeatures(data.machineFeatures || []),
        safetyCabinFeatures: mapSafetyCabinFeatures(data.safetyCabinFeatures || []),
        rotaryDeviceSpecs: mapRotaryDeviceSpecs(data.rotaryDeviceSpecs || []),
        specifications: mapSpecifications(data.specifications || []),
        seriesComparison: mapComparisonSeries(data.seriesComparison || []),
        toolSwitchVariants: mapToolSwitchVariants(data.toolSwitchVariants || []),
        liquidCoolingTypes: mapLiquidCoolingTypes(data.liquidCoolingTypes || []),
        tableTypes: mapTableTypes(data.tableTypes || []),
        multiSpindlesSpecs: mapMultiSpindlesSpecs(data.multiSpindlesSpecs || []),
        reviews: mapReviews(data.reviews || []),
        productionProcess: mapProductionProcess(data.productionProcess || []),
        supportCards: mapSupportCards(data.supportCards || []),
        interestedProducts: mapInterestedProducts(data.interestedProducts || []),
        heartOfTheMachinery: mapHeartOfTheMachinery(data.heartOfTheMachinery || { tabs: [], content: {} }),
        materialsProcessing: mappedMaterialsProcessing,
        materialsProcessingData: mappedMaterialsProcessing,
        twoLaserHeads: data.twoLaserHeads ? mapTwoLaserHeads(data.twoLaserHeads) : undefined,
        aspirationSystem: data.aspirationSystem ? {
            title: data.aspirationSystem.title || [],
            subtitle: data.aspirationSystem.subtitle || '',
            descriptions: data.aspirationSystem.descriptions || [],
            videoUrl: data.aspirationSystem.videoUrl
        } : undefined,
        purifierWelderComparisonData: data.purifierWelderComparisonData ? {
            title: data.purifierWelderComparisonData.title || '',
            description: data.purifierWelderComparisonData.description || '',
            cards: data.purifierWelderComparisonData.cards?.map((card: any) => ({
                title: card.title,
                image: card.image,
                specs: card.specs
            })) || []
        } : undefined,
        stitchesComparisonData: data.stitchesComparisonData ? {
            title: data.stitchesComparisonData.title || '',
            cards: data.stitchesComparisonData.cards?.map((card: any) => ({
                title: card.title,
                image: card.image
            })) || []
        } : undefined,
        weldingComparisonData: data.weldingComparisonData ? {
            title: data.weldingComparisonData.title,
            features: data.weldingComparisonData.features || [],
            columns: data.weldingComparisonData.columns?.map((column: any) => ({
                title: column.title,
                checks: column.checks?.map((check: any) => ({
                    hasCheck: check.hasCheck ?? false,
                    icon: check.icon
                })) || []
            })) || []
        } : undefined,
        gallery: {
            mainImage: data.gallery?.mainImage || '',
            thumbnails: data.gallery?.thumbnails || []
        },
        productInfo: {
            title: data.productInfo?.title || '',
            rating: data.productInfo?.rating || 0,
            reviewCount: data.productInfo?.reviewCount || 0,
            questionCount: data.productInfo?.questionCount || 0,
            currentPrice: data.productInfo?.currentPrice || '',
            originalPrice: data.productInfo?.originalPrice || '',
            discount: data.productInfo?.discount || '',
            discountPercent: data.productInfo?.discountPercent || '',
            availability: data.productInfo?.availability || '',
            shipment: data.productInfo?.shipment || '',
            delivery: data.productInfo?.delivery || '',
            deliveryMethods: data.productInfo?.deliveryMethods || [],
            deliveryNote: data.productInfo?.deliveryNote || '',
            warranty: data.productInfo?.warranty || ''
        },
        madeWithWattsan: {
            image: data.madeWithWattsan?.image || '',
            slides: data.madeWithWattsan?.slides || undefined
        },
        serviceAndSupport: {
            image: data.serviceAndSupport?.image || '',
            cards: data.serviceAndSupport?.cards?.map((card: any) => ({
                id: card.id,
                title: card.title,
                description: card.description,
                icon: card.icon // Pass icon identifier (string) through
            })) || []
        },
        packageList: data.packageList?.map((item: any) => ({
            id: item.id,
            image: item.image,
            label: item.label
        })) || [],
        additionalContent: data.additionalContent || undefined,
        pageBlocks: []
    };
};

type BlockDataBuilder = (rows: ContentJson[]) => unknown;

const nonEmpty = <T,>(list: T[]): T[] | undefined => (list.length > 0 ? list : undefined);

const withMediaUrl = (url?: string) => (url ? formatMediaUrl(url) : undefined);

/**
 * Builds the component data for one block. Multi-item templates receive the
 * block's items; single templates receive the block row itself.
 * Returning undefined means the block has nothing to show.
 */
const BLOCK_DATA_BUILDERS: Record<string, BlockDataBuilder> = {
    facts_cards: (rows) => nonEmpty(rows
        .map((c) => c.toFactsCard())
        .filter(Boolean)
        .map((f) => ({ ...f, imageUrl: withMediaUrl(f.imageUrl), videoUrl: withMediaUrl(f.videoUrl) }))),

    power_of_machine: ([row]) => {
        const power = row?.toPowerOfMachine();
        if (!power?.features?.length) return undefined;
        return {
            ...power,
            image: withMediaUrl(power.image),
            features: power.features.map((f) => ({ ...f, image: withMediaUrl(f.image) }))
        };
    },

    heart_of_machinery: (rows) => {
        const tabs: ProductTypes.MachineTab[] = [];
        const content: Record<string, ProductTypes.MachineTabContent> = {};
        rows.forEach((c) => {
            const tab = c.toHeartOfMachineryTab();
            if (!tab) return;
            tabs.push({ id: tab.id, label: tab.label || tab.title });
            content[tab.id] = {
                id: tab.id,
                title: tab.title,
                description: tab.description,
                details: tab.details || [],
                image: tab.image
            };
        });
        return tabs.length > 0 ? { tabs, content } : undefined;
    },

    reviews: (rows) => nonEmpty(rows.map((c) => c.toReviewItem()).filter(Boolean)),

    made_with_wattsan: (rows) => {
        const slides = rows
            .map((c) => c.toMadeWithWattsanSlide())
            .filter((s) => s && s.image)
            .map((s) => ({ ...s, image: formatMediaUrl(s.image) }));
        return slides.length > 0 ? { image: slides[0].image, slides } : undefined;
    },

    production_process: (rows) => nonEmpty(rows.map((c) => c.toProductionStep()).filter(Boolean)),

    service_and_support: ([row]) => {
        const service = row?.toServiceAndSupport();
        if (!service?.cards?.length) return undefined;
        return { image: withMediaUrl(service.image) || '', cards: service.cards };
    },

    package_list: (rows) => nonEmpty(rows
        .map((c) => c.toPackageListItem())
        .filter(Boolean)
        .map((item) => ({ ...item, image: withMediaUrl(item.image) || '' }))),

    additional_content: (rows) => nonEmpty(rows.map((c) => c.toAdditionalContentItem()).filter(Boolean)),

    faq: (rows) => nonEmpty(rows.map((c) => c.toFAQItem()).filter(Boolean)),

    machine_advisor: ([row]) => row?.toMachineAdvisor(),

    product_blog: (rows) => nonEmpty(rows.map((c) => c.toProductBlogItem()).filter(Boolean)),

    safety_cabin: ([row]) => {
        const cabin = row?.toSafetyCabin();
        return cabin ? { ...cabin, image: withMediaUrl(cabin.image) } : undefined;
    },

    rotary_device: ([row]) => {
        const rotary = row?.toRotaryDevice();
        return rotary ? { ...rotary, image: withMediaUrl(rotary.image) } : undefined;
    },

    separate_rotary_device: ([row]) => {
        const rotary = row?.toSeparateRotaryDevice();
        return rotary ? { ...rotary, image: withMediaUrl(rotary.image) } : undefined;
    },

    multi_spindles: ([row]) => {
        const spindles = row?.toMultiSpindles();
        return spindles ? { ...spindles, image: withMediaUrl(spindles.image) } : undefined;
    },

    automatic_tool_switch: ([row]) => {
        const toolSwitch = row?.toToolSwitch();
        if (!toolSwitch) return undefined;
        return {
            ...toolSwitch,
            image: withMediaUrl(toolSwitch.image),
            variants: (toolSwitch.variants || []).map((v) => ({ ...v, thumbnail: withMediaUrl(v.thumbnail) }))
        };
    },

    liquid_cooling: ([row]) => row?.toLiquidCooling() || undefined,

    aspiration_system: ([row]) => row?.toAspiration() || undefined,

    table_types: (rows) => nonEmpty(rows.map((c) => c.toTableTypeItem()).filter(Boolean))
};

const buildMaterialsProcessing = (row?: ContentJson): ProductTypes.MaterialsProcessingData | undefined => {
    const materials = row?.toMaterialsProcessing();
    if (!materials || (materials.materials.length === 0 && materials.images.length === 0)) return undefined;
    return {
        title: [
            { text: 'Plenty of materials', color: '#E31E24' },
            { text: 'available for processing' }
        ],
        images: materials.images,
        materials: materials.materials
    };
};

// Info cards come from the info_cards setting; the Materials card is filled from the materials setting
const buildInfoCards = (
    row: ContentJson | undefined,
    materialsProcessing?: ProductTypes.MaterialsProcessingData
): ProductTypes.ProductInfoCardData[] => {
    const cards = row?.toProductInfoCards();
    if (!cards?.length) return [];

    const infoCards = cards.filter((card) => card.id !== 'materials');
    const materials = (materialsProcessing?.materials || []).map((mat) => ({
        name: mat.name,
        image: mat.icon || undefined
    }));
    if (materials.length > 0) {
        const materialsCard = { id: 'materials', title: 'Materials', materials };
        const economyIdx = infoCards.findIndex((card) => card.id === 'economy');
        infoCards.splice(economyIdx >= 0 ? economyIdx + 1 : infoCards.length, 0, materialsCard);
    }
    return infoCards;
};

const buildProductInfo = (
    base: ProductTypes.ProductPageData['productInfo'],
    row?: ContentJson
): ProductTypes.ProductPageData['productInfo'] => {
    const meta = row?.contentMetasJson || {};
    return {
        ...base,
        shipment: meta.shipment || '',
        delivery: meta.delivery || '',
        deliveryNote: meta.delivery_note || '',
        warranty: meta.warranty || base?.warranty,
        deliveryMethods: meta.delivery_methods
            ? String(meta.delivery_methods).split(',').map((s) => s.trim()).filter(Boolean)
            : []
    };
};

/**
 * Builds the CMS-driven parts of a series product page: the top-of-page
 * settings and the ordered list of page blocks. Blocks without content are
 * dropped; system blocks are kept and rendered from product data by the page.
 */
export const buildSeriesPageData = (
    baseData: ProductTypes.ProductPageData,
    content: SeriesPageContent
): ProductTypes.ProductPageData => {
    const materialsProcessing = buildMaterialsProcessing(content.settings.materials_processing);

    const pageBlocks: ProductTypes.ProductPageBlock[] = content.blocks
        .map(({ block, items }) => {
            const meta = block.contentMetasJson || {};
            const isSystem = isSystemBlock(block.section);
            return {
                id: isSystem ? block.section : String(block.id),
                section: block.section,
                title: meta.block_title || undefined,
                description: meta.block_description || undefined,
                data: isSystem
                    ? undefined
                    : BLOCK_DATA_BUILDERS[block.section]?.(isMultiItemTemplate(block.section) ? items : [block])
            };
        })
        .filter((block) => isSystemBlock(block.section) || block.data !== undefined);

    return {
        ...baseData,
        infoCards: buildInfoCards(content.settings.info_cards, materialsProcessing),
        materialsProcessing,
        materialsProcessingData: materialsProcessing,
        productInfo: buildProductInfo(baseData.productInfo, content.settings.product_info_extra),
        pageBlocks
    };
};
