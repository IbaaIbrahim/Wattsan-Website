import * as ProductTypes from '@my-types/product';

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
        isWarning: item.isWarning
    }));
};

export const mapLiquidCoolingTypes = (data: any[]): ProductTypes.LiquidCoolingType[] => {
    return data.map(item => ({
        title: item.title,
        description: item.description
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
        image: item.image,
        quote: item.quote,
        author: {
            name: item.author.name,
            title: item.author.title,
            avatar: item.author.avatar
        }
    }));
};

export const mapProductionProcess = (data: any[]): ProductTypes.ProductionProcessStep[] => {
    return data.map(item => ({
        id: item.id,
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
        materialsProcessing: mapMaterialsProcessing(data.materialsProcessing || {}),
        twoLaserHeads: data.twoLaserHeads ? mapTwoLaserHeads(data.twoLaserHeads) : undefined,
        aspirationSystem: data.aspirationSystem ? {
            title: data.aspirationSystem.title || [],
            subtitle: data.aspirationSystem.subtitle || '',
            descriptions: data.aspirationSystem.descriptions || []
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
            deliveryNote: data.productInfo?.deliveryNote || ''
        },
        madeWithWattsan: {
            image: data.madeWithWattsan?.image || ''
        },
        serviceAndSupport: {
            image: data.serviceAndSupport?.image || '',
            cards: data.serviceAndSupport?.cards?.map(card => ({
                id: card.id,
                title: card.title,
                description: card.description,
                icon: card.icon // Pass icon identifier (string) through
            })) || []
        },
        packageList: data.packageList?.map(item => ({
            id: item.id,
            image: item.image,
            label: item.label
        })) || []
    };
};

/**
 * Merges dynamic CMS Content & ContentMeta rows into ProductPageData.
 * Falls back safely to default structured data for any section not configured in the CMS.
 */
export const mergeCmsDataIntoProductPageData = (
    baseData: ProductTypes.ProductPageData,
    cmsSectionsMap: Record<string, any[]>
): ProductTypes.ProductPageData => {
    if (!cmsSectionsMap || Object.keys(cmsSectionsMap).length === 0) {
        return baseData;
    }

    const merged = { ...baseData };

    // 1. Info Cards
    if (cmsSectionsMap.info_cards?.[0]) {
        const customInfoCards = cmsSectionsMap.info_cards[0].toProductInfoCards?.();
        if (customInfoCards && customInfoCards.length > 0) {
            merged.infoCards = customInfoCards;
        }
    }

    // 2. Facts Cards
    if (cmsSectionsMap.facts_cards && cmsSectionsMap.facts_cards.length > 0) {
        const customFacts = cmsSectionsMap.facts_cards
            .map((c) => c.toFactsCard?.())
            .filter(Boolean);
        if (customFacts.length > 0) {
            merged.factsCards = customFacts;
        }
    }

    // 3. Power of Machine (Features)
    if (cmsSectionsMap.power_of_machine?.[0]) {
        const customFeatures = cmsSectionsMap.power_of_machine[0].toMachineFeatures?.();
        if (customFeatures && customFeatures.length > 0) {
            merged.machineFeatures = customFeatures;
        }
    }

    // 4. Heart of Machinery
    if (cmsSectionsMap.heart_of_machinery?.[0]) {
        const customHeart = cmsSectionsMap.heart_of_machinery[0].toHeartOfTheMachinery?.();
        if (customHeart && customHeart.items && customHeart.items.length > 0) {
            // Keep tabs/content shape or enrich
            merged.heartOfTheMachinery = {
                ...merged.heartOfTheMachinery,
                title: customHeart.title || merged.heartOfTheMachinery?.title,
                subtitle: customHeart.subtitle || merged.heartOfTheMachinery?.subtitle
            };
        }
    }

    // 5. Safety Cabin
    if (cmsSectionsMap.safety_cabin?.[0]) {
        const customCabin = cmsSectionsMap.safety_cabin[0].toSafetyCabin?.();
        if (customCabin) {
            merged.safetyCabinData = customCabin;
            if (customCabin.features && customCabin.features.length > 0) {
                merged.safetyCabinFeatures = customCabin.features;
            }
        }
    }

    // 6. Rotary Device
    if (cmsSectionsMap.rotary_device?.[0]) {
        const customRotary = cmsSectionsMap.rotary_device[0].toRotaryDevice?.();
        if (customRotary) {
            merged.rotaryDeviceData = customRotary;
            if (customRotary.specs && customRotary.specs.length > 0) {
                merged.rotaryDeviceSpecs = customRotary.specs;
            }
        }
    }

    // 7. Separate Rotary Device
    if (cmsSectionsMap.separate_rotary_device?.[0]) {
        const customSeparateRotary = cmsSectionsMap.separate_rotary_device[0].toSeparateRotaryDevice?.();
        if (customSeparateRotary) {
            merged.separateRotaryDeviceData = customSeparateRotary;
        }
    }

    // 8. Multi Spindles
    if (cmsSectionsMap.multi_spindles?.[0]) {
        const customSpindles = cmsSectionsMap.multi_spindles[0].toMultiSpindles?.();
        if (customSpindles) {
            merged.multiSpindlesData = customSpindles;
            if (customSpindles.specs && customSpindles.specs.length > 0) {
                merged.multiSpindlesSpecs = customSpindles.specs;
            }
        }
    }

    // 9. Tool Switch
    if (cmsSectionsMap.automatic_tool_switch?.[0]) {
        const customToolSwitch = cmsSectionsMap.automatic_tool_switch[0].toToolSwitch?.();
        if (customToolSwitch) {
            merged.toolSwitchData = customToolSwitch;
            if (customToolSwitch.variants && customToolSwitch.variants.length > 0) {
                merged.toolSwitchVariants = customToolSwitch.variants;
            }
        }
    }

    // 10. Liquid Cooling
    if (cmsSectionsMap.liquid_cooling?.[0]) {
        const customCooling = cmsSectionsMap.liquid_cooling[0].toLiquidCooling?.();
        if (customCooling) {
            merged.liquidCoolingData = customCooling;
            if (customCooling.types && customCooling.types.length > 0) {
                merged.liquidCoolingTypes = customCooling.types;
            }
        }
    }

    // 11. Table Types
    if (cmsSectionsMap.table_types?.[0]) {
        const customTableTypes = cmsSectionsMap.table_types[0].toTableTypes?.();
        if (customTableTypes && customTableTypes.length > 0) {
            merged.tableTypes = customTableTypes;
        }
    }

    // 12. Production Process
    if (cmsSectionsMap.production_process && cmsSectionsMap.production_process.length > 0) {
        const customProcess = cmsSectionsMap.production_process
            .map((c) => c.toProductionStep?.())
            .filter(Boolean);
        if (customProcess.length > 0) {
            merged.productionProcess = customProcess;
        }
    }

    // 13. Service and Support
    if (cmsSectionsMap.service_and_support?.[0]) {
        const customService = cmsSectionsMap.service_and_support[0].toServiceAndSupport?.();
        if (customService) {
            merged.serviceAndSupport = {
                image: customService.image || merged.serviceAndSupport?.image || '',
                cards: customService.cards && customService.cards.length > 0 ? customService.cards : merged.serviceAndSupport?.cards || []
            };
        }
    }

    // 14. Package List
    if (cmsSectionsMap.package_list && cmsSectionsMap.package_list.length > 0) {
        const customPackageList = cmsSectionsMap.package_list
            .map((c) => c.toPackageListItem?.())
            .filter(Boolean);
        if (customPackageList.length > 0) {
            merged.packageList = customPackageList;
        }
    }

    // 15. FAQ
    if (cmsSectionsMap.faq && cmsSectionsMap.faq.length > 0) {
        const customFaq = cmsSectionsMap.faq
            .map((c) => c.toFAQItem?.())
            .filter(Boolean);
        if (customFaq.length > 0) {
            merged.faqData = customFaq;
        }
    }

    // 16. Reviews
    if (cmsSectionsMap.reviews && cmsSectionsMap.reviews.length > 0) {
        const customReviews = cmsSectionsMap.reviews
            .map((c) => {
                const item = c.toReviewItem?.();
                if (!item) return null;
                return {
                    id: String(item.id),
                    quote: item.content,
                    author: {
                        name: item.author,
                        avatar: item.avatar || '/product-cards/cnc-router/reviews/avatar.png'
                    }
                };
            })
            .filter(Boolean);
        if (customReviews.length > 0) {
            merged.reviews = customReviews as any;
        }
    }

    // 17. Product Info Extra (notes, shipment, delivery)
    if (cmsSectionsMap.product_info_extra?.[0]) {
        const meta = cmsSectionsMap.product_info_extra[0].contentMetasJson || {};
        merged.productInfo = {
            ...merged.productInfo,
            shipment: meta.shipment || merged.productInfo?.shipment,
            delivery: meta.delivery || merged.productInfo?.delivery,
            deliveryNote: meta.delivery_note || merged.productInfo?.deliveryNote,
            deliveryMethods: meta.delivery_methods
                ? String(meta.delivery_methods).split(',').map((s) => s.trim()).filter(Boolean)
                : merged.productInfo?.deliveryMethods
        };
    }

    return merged;
};

