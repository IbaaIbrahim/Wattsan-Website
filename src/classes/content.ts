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

export function parseRichText(val?: string | null): string {
  if (!val) return ''
  const trimmed = String(val).trim()
  if (trimmed.startsWith('{') && trimmed.includes('"blocks"')) {
    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed.blocks)) {
        return parsed.blocks
          .map((b: any) => {
            const text = b.text || ''
            if (!text.trim()) return ''
            if (b.type === 'header-one') return `<h1>${text}</h1>`
            if (b.type === 'header-two') return `<h2>${text}</h2>`
            if (b.type === 'header-three') return `<h3>${text}</h3>`
            if (b.type === 'unordered-list-item') return `<li>${text}</li>`
            if (b.type === 'ordered-list-item') return `<li>${text}</li>`
            return `<p>${text}</p>`
          })
          .filter(Boolean)
          .join('')
      }
    } catch {
      // fallback
    }
  }
  return val
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
      const hasFileManager = Boolean(meta.filemanager?.url || meta.filemanagerAr?.url)
      const isMedia =
        hasFileManager ||
        ['image', 'file', 'video', 'attachments', 'attachment'].includes(meta.type) ||
        meta.keyName.includes('image') ||
        meta.keyName.includes('attachment')

      if (isMedia) {
        const fileUrl =
          locale === 'ar'
            ? meta.filemanagerAr?.url || meta.filemanager?.url
            : meta.filemanager?.url || meta.filemanagerAr?.url
        acc[meta.keyName] = fileUrl || meta.value || ''
      } else {
        const rawVal =
          locale === 'ar'
            ? meta.valueAr || meta.value
            : meta.value || meta.valueAr
        acc[meta.keyName] = parseRichText(rawVal)
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

  toHeartOfTheMachinery(): {
    spindleTitle?: string
    spindleDescription?: string
    spindleImage?: string
    worktableTitle?: string
    worktableDescription?: string
    worktableImage?: string
    controlSystemTitle?: string
    controlSystemDescription?: string
    controlSystemImage?: string
  } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    return {
      spindleTitle: meta.spindle_title || undefined,
      spindleDescription: meta.spindle_description || undefined,
      spindleImage: meta.spindle_image || undefined,
      worktableTitle: meta.worktable_title || undefined,
      worktableDescription: meta.worktable_description || undefined,
      worktableImage: meta.worktable_image || undefined,
      controlSystemTitle: meta.control_system_title || undefined,
      controlSystemDescription: meta.control_system_description || undefined,
      controlSystemImage: meta.control_system_image || undefined
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

  toTableTypeItem(): TableTypeItem | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    const rawAttachment = meta.attachment || meta.image || meta.media || undefined
    const isVideo = typeof rawAttachment === 'string' && (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(rawAttachment) || rawAttachment.includes('youtube') || rawAttachment.includes('vimeo'))
    return {
      id: String(this.id),
      title: meta.title || this.title || '',
      description: meta.content || '',
      attachment: rawAttachment,
      image: isVideo ? undefined : rawAttachment,
      videoUrl: isVideo ? rawAttachment : (meta.video_url || undefined)
    }
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

  toServiceAndSupport(): { image?: string; cards?: Array<{ id: string; logo?: string; icon?: string; title: string; description: string }> } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let cardsList: any[] = []
    try {
      cardsList = typeof meta.cards === 'string' ? JSON.parse(meta.cards) : (meta.cards || [])
    } catch {
      cardsList = []
    }

    return {
      image: meta.image || '',
      cards: cardsList.map((card: any, idx: number) => ({
        id: card.id || String(idx + 1),
        logo: card.logo || undefined,
        icon: card.icon || undefined,
        title: card.title || '',
        description: parseRichText(card.content || card.description || '')
      }))
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

  toReviewItem(): {
    id: string
    image: string
    quote: string
    author: {
      name: string
      title: string
      avatar: string
    }
  } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    return {
      id: String(this.id),
      image: meta.image || '/product-cards/cnc-router/image 11651.png',
      quote: meta.content || '',
      author: {
        name: meta.reviewed_by_name || this.title || 'Client',
        title: meta.reviewed_by_type || '',
        avatar: meta.reviewed_by_image || '/img/catalog/cnc-routes.png'
      }
    }
  }
}
