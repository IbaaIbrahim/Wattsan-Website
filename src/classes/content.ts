import { ContentMeta, ContentMetaDto } from './content-meta'
import type {
  ProductInfoCardData,
  WattsanFactCardData,
  ProductFeature,
  SafetyCabinFeature,
  RotaryDeviceSpec,
  TableTypeItem,
  ProductionProcessStep,
  SupportCard,
  PackageItem,
  Review,
  HeartOfTheMachineryData,
  ToolSwitchVariant,
  LiquidCoolingType
} from '../types/product'

export type ContentDto = {
  id: number | string
  referenceId: number | string
  referenceType: string
  section: string
  title?: string | null
  displayOrder: number | string
  isActive: boolean
  contentMetas?: ContentMetaDto[]
  createdAt?: string
  updatedAt?: string
}

export class Content {
  constructor(
    public readonly id: number,
    public readonly referenceId: string | number,
    public readonly referenceType: string,
    public readonly section: string,
    public readonly title: string | null,
    public readonly displayOrder: number,
    public readonly isActive: boolean,
    public readonly contentMetas?: ContentMeta[],
    public readonly createdAt?: string,
    public readonly updatedAt?: string
  ) {}

  static fromDto(dto: ContentDto): Content {
    return new Content(
      Number(dto.id),
      dto.referenceId ?? '0',
      dto.referenceType ?? '',
      dto.section ?? '',
      dto.title ?? null,
      Number(dto.displayOrder),
      Boolean(dto.isActive),
      dto.contentMetas?.map((meta) => ContentMeta.fromDto(meta)),
      dto.createdAt,
      dto.updatedAt
    )
  }

  toPlain(): ContentDto {
    return {
      id: this.id,
      referenceId: this.referenceId,
      referenceType: this.referenceType,
      section: this.section,
      title: this.title,
      displayOrder: this.displayOrder,
      isActive: this.isActive,
      contentMetas: this.contentMetas?.map((meta) => meta.toPlain()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

export type ContentMetaJson = {
  [key: string]: any
}

export class ContentJson extends Content {
  contentMetasJson?: ContentMetaJson

  constructor(content: Content, locale: string = 'en') {
    super(
      content.id,
      content.referenceId,
      content.referenceType,
      content.section,
      content.title,
      content.displayOrder,
      content.isActive,
      content.contentMetas,
      content.createdAt,
      content.updatedAt
    )

    this.contentMetasJson = content.contentMetas?.reduce((acc, meta) => {
      if (meta.type === 'image' || meta.type === 'file' || meta.type === 'video') {
        const fileUrl =
          locale === 'ar'
            ? meta.filemanagerAr?.url || meta.filemanager?.url
            : meta.filemanager?.url || meta.filemanagerAr?.url
        acc[meta.keyName] = fileUrl || meta.value || ''
      } else {
        const val =
          locale === 'ar'
            ? meta.valueAr || meta.value
            : meta.value || meta.valueAr
        acc[meta.keyName] = val
      }
      acc[`${meta.keyName}--id`] = String(meta.id)
      return acc
    }, {} as ContentMetaJson)
  }

  toProductInfoCards(): ProductInfoCardData[] | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    const cards: ProductInfoCardData[] = []

    if (meta.ideal_for) {
      cards.push({
        id: 'ideal-for',
        title: 'Ideal for',
        content: meta.ideal_for
      })
    }
    if (meta.economy) {
      cards.push({
        id: 'economy',
        title: 'Economy',
        content: meta.economy
      })
    }
    if (meta.materials) {
      let materialsList: any[] = []
      try {
        materialsList = typeof meta.materials === 'string' ? JSON.parse(meta.materials) : meta.materials
      } catch {
        materialsList = []
      }
      cards.push({
        id: 'materials',
        title: 'Materials',
        materials: materialsList
      })
    }
    if (meta.expert_reviews) {
      cards.push({
        id: 'expert-reviews',
        title: 'Expert Reviews',
        content: Number(meta.expert_reviews) || meta.expert_reviews
      })
    }

    return cards.length > 0 ? cards : null
  }

  toFactsCard(): WattsanFactCardData | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let certificationsList: string[] | undefined = undefined
    if (meta.certifications) {
      certificationsList = String(meta.certifications)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    }

    return {
      id: String(this.id),
      subtitle: meta.subtitle || '',
      title: meta.title || this.title || '',
      type: meta.type === 'solid' ? 'solid' : 'image',
      imageUrl: meta.image || undefined,
      backgroundColor: meta.bg_color || undefined,
      certifications: certificationsList
    }
  }

  toMachineFeatures(): ProductFeature[] | null {
    if (!this.contentMetasJson) return null
    const raw = this.contentMetasJson.features
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => ({
          title: item.title || '',
          description: item.description || ''
        }))
      }
    } catch {
      // ignore
    }
    return null
  }

  toHeartOfTheMachinery(): { title?: string; subtitle?: string; items?: any[] } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let itemsList: any[] = []
    try {
      itemsList = typeof meta.items === 'string' ? JSON.parse(meta.items) : (meta.items || [])
    } catch {
      itemsList = []
    }

    return {
      title: meta.title || this.title || undefined,
      subtitle: meta.subtitle || undefined,
      items: itemsList
    }
  }

  toSafetyCabin(): { title?: string; description?: string; features?: SafetyCabinFeature[]; image?: string } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let featuresList: SafetyCabinFeature[] = []
    try {
      featuresList = typeof meta.features === 'string' ? JSON.parse(meta.features) : (meta.features || [])
    } catch {
      featuresList = []
    }

    return {
      title: meta.title || this.title || undefined,
      description: meta.description || undefined,
      features: featuresList.length > 0 ? featuresList : undefined,
      image: meta.image || undefined
    }
  }

  toRotaryDevice(): { title?: string; subtitle?: string; description?: string; specs?: RotaryDeviceSpec[]; image?: string } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let specsList: RotaryDeviceSpec[] = []
    try {
      specsList = typeof meta.specs === 'string' ? JSON.parse(meta.specs) : (meta.specs || [])
    } catch {
      specsList = []
    }

    return {
      title: meta.title || this.title || undefined,
      subtitle: meta.subtitle || undefined,
      description: meta.description || undefined,
      specs: specsList.length > 0 ? specsList : undefined,
      image: meta.image || undefined
    }
  }

  toSeparateRotaryDevice(): { title?: string; description?: string; featuresTitle?: string; features?: string[]; image?: string } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let featuresList: string[] = []
    try {
      const parsed = typeof meta.features === 'string' ? JSON.parse(meta.features) : (meta.features || [])
      featuresList = parsed.map((item: any) => (typeof item === 'string' ? item : item.text || item.title || ''))
    } catch {
      featuresList = []
    }

    return {
      title: meta.title || this.title || undefined,
      description: meta.description || undefined,
      featuresTitle: meta.features_title || undefined,
      features: featuresList.length > 0 ? featuresList : undefined,
      image: meta.image || undefined
    }
  }

  toMultiSpindles(): { title?: string; subtitle?: string; description1?: string; description2?: string; specs?: any[]; image?: string } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let specsList: any[] = []
    try {
      specsList = typeof meta.specs === 'string' ? JSON.parse(meta.specs) : (meta.specs || [])
    } catch {
      specsList = []
    }

    return {
      title: meta.title || this.title || undefined,
      subtitle: meta.subtitle || undefined,
      description1: meta.description1 || undefined,
      description2: meta.description2 || undefined,
      specs: specsList.length > 0 ? specsList : undefined,
      image: meta.image || undefined
    }
  }

  toToolSwitch(): { title?: string; subtitle?: string; description?: string; subHeading?: string; subDescription?: string; variants?: ToolSwitchVariant[]; image?: string } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let variantsList: ToolSwitchVariant[] = []
    try {
      variantsList = typeof meta.variants === 'string' ? JSON.parse(meta.variants) : (meta.variants || [])
    } catch {
      variantsList = []
    }

    return {
      title: meta.title || this.title || undefined,
      subtitle: meta.subtitle || undefined,
      description: meta.description || undefined,
      subHeading: meta.sub_heading || undefined,
      subDescription: meta.sub_description || undefined,
      variants: variantsList.length > 0 ? variantsList : undefined,
      image: meta.image || undefined
    }
  }

  toLiquidCooling(): { title?: string; subtitle?: string; description?: string; types?: LiquidCoolingType[] } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let typesList: LiquidCoolingType[] = []
    try {
      typesList = typeof meta.types === 'string' ? JSON.parse(meta.types) : (meta.types || [])
    } catch {
      typesList = []
    }

    return {
      title: meta.title || this.title || undefined,
      subtitle: meta.subtitle || undefined,
      description: meta.description || undefined,
      types: typesList.length > 0 ? typesList : undefined
    }
  }

  toAspiration(): { title?: string; subtitle?: string; description?: string } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    return {
      title: meta.title || this.title || undefined,
      subtitle: meta.subtitle || undefined,
      description: meta.description || undefined
    }
  }

  toTableTypes(): TableTypeItem[] | null {
    if (!this.contentMetasJson) return null
    const raw = this.contentMetasJson.items
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
      if (Array.isArray(parsed)) {
        return parsed.map((item: any, idx: number) => ({
          id: String(idx + 1),
          title: item.title || '',
          description: item.description || '',
          advantages: item.advantages || undefined,
          list: item.list || undefined
        }))
      }
    } catch {
      // ignore
    }
    return null
  }

  toProductionStep(): ProductionProcessStep | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    return {
      id: String(this.id),
      title: meta.title || this.title || '',
      description: meta.description || '',
      image: meta.image || ''
    }
  }

  toServiceAndSupport(): { image?: string; cards?: SupportCard[] } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let cardsList: SupportCard[] = []
    try {
      cardsList = typeof meta.cards === 'string' ? JSON.parse(meta.cards) : (meta.cards || [])
    } catch {
      cardsList = []
    }

    return {
      image: meta.image || '',
      cards: cardsList
    }
  }

  toPackageListItem(): PackageItem | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    return {
      id: String(this.id),
      image: meta.image || '/img/catalog/cnc-routes.png',
      label: meta.label || this.title || ''
    }
  }

  toFAQItem(): { id: string; question: string; answer: string } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    return {
      id: String(this.id),
      question: meta.question || this.title || '',
      answer: meta.answer || ''
    }
  }

  toReviewItem(): { id: string; content: string; author: string; avatar?: string } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    return {
      id: String(this.id),
      author: meta.author || this.title || 'Anonymous',
      content: meta.content || '',
      avatar: meta.avatar || undefined
    }
  }
}
