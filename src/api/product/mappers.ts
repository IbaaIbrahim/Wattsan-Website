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
        additionalContent: data.additionalContent || undefined
    };
};

const getActiveSorted = (items?: any[]): any[] => {
    if (!Array.isArray(items)) return [];
    return items
        .filter((c) => c && c.isActive !== false)
        .sort((a, b) => (Number(a.displayOrder) || 0) - (Number(b.displayOrder) || 0));
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
    const infoCardsRows = getActiveSorted(cmsSectionsMap.info_cards);
    if (infoCardsRows[0]) {
        const customInfoCards = infoCardsRows[0].toProductInfoCards?.();
        if (customInfoCards && customInfoCards.length > 0) {
            merged.infoCards = customInfoCards;
        }
    }

    // 2. Facts Cards
    const factsCardsRows = getActiveSorted(cmsSectionsMap.facts_cards);
    if (factsCardsRows.length > 0) {
        const customFacts = factsCardsRows
            .map((c) => c.toFactsCard?.())
            .filter(Boolean);
        if (customFacts.length > 0) {
            merged.factsCards = customFacts;
        }
    }

    // 3. Power of Machine (Features)
    const powerRows = getActiveSorted(cmsSectionsMap.power_of_machine);
    if (powerRows[0]) {
        const customPower = powerRows[0].toPowerOfMachine?.();
        if (customPower) {
            merged.powerOfMachineData = customPower;
            if (customPower.features && customPower.features.length > 0) {
                merged.machineFeatures = customPower.features;
            }
        }
    }

    // 4. Heart of Machinery (Multi-item tabs, with legacy single-item fallback)
    const heartRows = getActiveSorted(cmsSectionsMap.heart_of_machinery);
    if (heartRows.length > 0) {
        const firstMeta = heartRows[0]?.contentMetasJson || {};
        const hasNewTabFormat = heartRows.some((c) => {
            const m = c?.contentMetasJson || {};
            return Boolean(m.tab_label || m.title || m.details);
        });

        if (hasNewTabFormat) {
            const tabs: ProductTypes.MachineTab[] = [];
            const content: Record<string, ProductTypes.MachineTabContent> = {};
            heartRows.forEach((c) => {
                const tabItem = c.toHeartOfMachineryTab?.();
                if (tabItem) {
                    tabs.push({ id: tabItem.id, label: tabItem.tab_label });
                    content[tabItem.id] = {
                        id: tabItem.id,
                        title: tabItem.title,
                        description: tabItem.description,
                        details: tabItem.details || [],
                        image: tabItem.image
                    };
                }
            });
            if (tabs.length > 0) {
                merged.heartOfTheMachinery = { tabs, content };
            }
        } else if (firstMeta.spindle_title || firstMeta.worktable_title || firstMeta.control_system_title) {
            const customHeart = heartRows[0].toHeartOfTheMachinery?.();
            if (customHeart) {
                const currentContent = merged.heartOfTheMachinery?.content || {};
                merged.heartOfTheMachinery = {
                    tabs: [
                        { id: 'spindle', label: 'Spindle' },
                        { id: 'worktable', label: 'Worktable' },
                        { id: 'controlSystem', label: 'Control system' }
                    ],
                    content: {
                        spindle: {
                            id: 'spindle',
                            title: customHeart.spindleTitle || currentContent.spindle?.title || 'Powerful spindle with upgrade option',
                            description: customHeart.spindleDescription || currentContent.spindle?.description || '',
                            details: currentContent.spindle?.details || [
                                { label: 'POWER', value: 'from 2,2 kW' },
                                { label: 'Z AXIS TRAVEL', value: '300 mm' }
                            ],
                            image: customHeart.spindleImage || currentContent.spindle?.image || '/product-cards/cnc-router/spindles/spindles-4.png'
                        },
                        worktable: {
                            id: 'worktable',
                            title: customHeart.worktableTitle || currentContent.worktable?.title || 'Reliable Worktable',
                            description: customHeart.worktableDescription || currentContent.worktable?.description || '',
                            details: currentContent.worktable?.details || [
                                { label: 'TYPE', value: 'Vacuum + T-slots' },
                                { label: 'ZONES', value: '4-6 zones' }
                            ],
                            image: customHeart.worktableImage || currentContent.worktable?.image || '/product-cards/cnc-router/image 11651.png'
                        },
                        controlSystem: {
                            id: 'controlSystem',
                            title: customHeart.controlSystemTitle || currentContent.controlSystem?.title || 'Advanced Control System',
                            description: customHeart.controlSystemDescription || currentContent.controlSystem?.description || '',
                            details: currentContent.controlSystem?.details || [
                                { label: 'SYSTEM', value: 'DSP A11' },
                                { label: 'COMPATIBILITY', value: 'Win/Mac/Linux' }
                            ],
                            image: customHeart.controlSystemImage || currentContent.controlSystem?.image || '/product-cards/cnc-router/image 11650.png'
                        }
                    }
                };
            }
        }
    }

    // 5. Materials Processing (Plenty of Materials)
    const materialsRows = getActiveSorted(cmsSectionsMap.materials_processing);
    if (materialsRows[0]) {
        const customMaterials = materialsRows[0].toMaterialsProcessing?.();
        if (customMaterials) {
            const existingMp = merged.materialsProcessingData || merged.materialsProcessing;
            const nextMp: ProductTypes.MaterialsProcessingData = {
                title: existingMp?.title?.length
                    ? existingMp.title
                    : [{ text: 'Plenty of materials', color: '#E31E24' }, { text: 'for processing' }],
                images: customMaterials.images && customMaterials.images.length > 0
                    ? customMaterials.images
                    : (existingMp?.images || []),
                materials: customMaterials.materials && customMaterials.materials.length > 0
                    ? customMaterials.materials
                    : (existingMp?.materials || [])
            };
            merged.materialsProcessing = nextMp;
            merged.materialsProcessingData = nextMp;
        }
    }

    // 6. Safety Cabin
    const safetyCabinRows = getActiveSorted(cmsSectionsMap.safety_cabin);
    if (safetyCabinRows[0]) {
        const customCabin = safetyCabinRows[0].toSafetyCabin?.();
        if (customCabin) {
            merged.safetyCabinData = customCabin;
            if (customCabin.features && customCabin.features.length > 0) {
                merged.safetyCabinFeatures = customCabin.features;
            }
        }
    }

    // 7. Rotary Device
    const rotaryRows = getActiveSorted(cmsSectionsMap.rotary_device);
    if (rotaryRows[0]) {
        const customRotary = rotaryRows[0].toRotaryDevice?.();
        if (customRotary) {
            merged.rotaryDeviceData = customRotary;
            if (customRotary.specs && customRotary.specs.length > 0) {
                merged.rotaryDeviceSpecs = customRotary.specs;
            }
        }
    }

    // 8. Separate Rotary Device
    const separateRotaryRows = getActiveSorted(cmsSectionsMap.separate_rotary_device);
    if (separateRotaryRows[0]) {
        const customSeparateRotary = separateRotaryRows[0].toSeparateRotaryDevice?.();
        if (customSeparateRotary) {
            merged.separateRotaryDeviceData = customSeparateRotary;
        }
    }

    // 9. Multi Spindles
    const multiSpindlesRows = getActiveSorted(cmsSectionsMap.multi_spindles);
    if (multiSpindlesRows[0]) {
        const customSpindles = multiSpindlesRows[0].toMultiSpindles?.();
        if (customSpindles) {
            merged.multiSpindlesData = customSpindles;
            if (customSpindles.specs && customSpindles.specs.length > 0) {
                merged.multiSpindlesSpecs = customSpindles.specs;
            }
        }
    }

    // 10. Tool Switch
    const toolSwitchRows = getActiveSorted(cmsSectionsMap.automatic_tool_switch);
    if (toolSwitchRows[0]) {
        const customToolSwitch = toolSwitchRows[0].toToolSwitch?.();
        if (customToolSwitch) {
            merged.toolSwitchData = customToolSwitch;
            if (customToolSwitch.variants && customToolSwitch.variants.length > 0) {
                merged.toolSwitchVariants = customToolSwitch.variants;
            }
        }
    }

    // 11. Liquid Cooling
    const liquidCoolingRows = getActiveSorted(cmsSectionsMap.liquid_cooling);
    if (liquidCoolingRows[0]) {
        const customCooling = liquidCoolingRows[0].toLiquidCooling?.();
        if (customCooling) {
            merged.liquidCoolingData = customCooling;
            if (customCooling.types && customCooling.types.length > 0) {
                merged.liquidCoolingTypes = customCooling.types;
            }
        }
    }

    // 12. Aspiration System
    const aspirationRows = getActiveSorted(cmsSectionsMap.aspiration_system);
    if (aspirationRows[0]) {
        const customAspiration = aspirationRows[0].toAspiration?.();
        if (customAspiration) {
            merged.aspirationData = customAspiration;
        }
    }

    // 13. Table Types
    const tableTypesRows = getActiveSorted(cmsSectionsMap.table_types);
    if (tableTypesRows.length > 0) {
        const customTableTypes = tableTypesRows
            .map((c) => c.toTableTypeItem?.())
            .filter(Boolean);
        if (customTableTypes.length > 0) {
            merged.tableTypes = customTableTypes as any;
        }
    }

    // 14. Made with Wattsan
    const madeWithWattsanRows = getActiveSorted(cmsSectionsMap.made_with_wattsan);
    if (madeWithWattsanRows.length > 0) {
        const customSlides = madeWithWattsanRows
            .map((c) => c.toMadeWithWattsanSlide?.())
            .filter((s) => s && s.image);
        if (customSlides.length > 0) {
            merged.madeWithWattsan = {
                image: customSlides[0].image,
                slides: customSlides
            };
        }
    }

    // 15. Production Process
    const productionProcessRows = getActiveSorted(cmsSectionsMap.production_process);
    if (productionProcessRows.length > 0) {
        const customProcess = productionProcessRows
            .map((c) => c.toProductionStep?.())
            .filter(Boolean);
        if (customProcess.length > 0) {
            merged.productionProcess = customProcess;
        }
    }

    // 16. Service and Support
    const serviceRows = getActiveSorted(cmsSectionsMap.service_and_support);
    if (serviceRows[0]) {
        const customService = serviceRows[0].toServiceAndSupport?.();
        if (customService) {
            merged.serviceAndSupport = {
                image: customService.image || merged.serviceAndSupport?.image || '',
                cards: customService.cards && customService.cards.length > 0
                    ? (customService.cards as any)
                    : (merged.serviceAndSupport?.cards || [])
            };
        }
    }

    // 17. Package List
    const packageListRows = getActiveSorted(cmsSectionsMap.package_list);
    if (packageListRows.length > 0) {
        const customPackageList = packageListRows
            .map((c) => c.toPackageListItem?.())
            .filter(Boolean);
        if (customPackageList.length > 0) {
            merged.packageList = customPackageList;
        }
    }

    // 18. Additional Content
    const additionalContentRows = getActiveSorted(cmsSectionsMap.additional_content);
    if (additionalContentRows.length > 0) {
        const customAdditional = additionalContentRows
            .map((c) => c.toAdditionalContentItem?.())
            .filter(Boolean);
        if (customAdditional.length > 0) {
            merged.additionalContent = customAdditional;
        }
    }

    // 19. FAQ
    const faqRows = getActiveSorted(cmsSectionsMap.faq);
    if (faqRows.length > 0) {
        const customFaq = faqRows
            .map((c) => c.toFAQItem?.())
            .filter(Boolean);
        if (customFaq.length > 0) {
            merged.faqData = customFaq;
        }
    }

    // 20. Reviews
    const reviewRows = getActiveSorted(cmsSectionsMap.reviews);
    if (reviewRows.length > 0) {
        const customReviews = reviewRows
            .map((c) => c.toReviewItem?.())
            .filter(Boolean);
        if (customReviews.length > 0) {
            merged.reviews = customReviews as any;
        }
    }

    // 21. Product Info Extra (notes, shipment, delivery, warranty)
    const productInfoExtraRows = getActiveSorted(cmsSectionsMap.product_info_extra);
    if (productInfoExtraRows[0]) {
        const meta = productInfoExtraRows[0].contentMetasJson || {};
        merged.productInfo = {
            ...merged.productInfo,
            shipment: meta.shipment || merged.productInfo?.shipment,
            delivery: meta.delivery || merged.productInfo?.delivery,
            deliveryNote: meta.delivery_note || merged.productInfo?.deliveryNote,
            warranty: meta.warranty || merged.productInfo?.warranty,
            deliveryMethods: meta.delivery_methods
                ? String(meta.delivery_methods).split(',').map((s) => s.trim()).filter(Boolean)
                : merged.productInfo?.deliveryMethods
        };
    }

    return merged;
};


