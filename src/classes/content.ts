import { ContentMeta, ContentMetaDto } from './content-meta'
import { formatMediaUrl } from '../utils/helpers'
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
        acc[meta.keyName] = formatMediaUrl(fileUrl || meta.value) || ''
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

    const rawType = (meta.type || '').toLowerCase().trim()
    let type: 'image' | 'video' | 'background' = 'image'
    if (rawType === 'video') {
      type = 'video'
    } else if (rawType === 'background' || rawType === 'solid' || rawType === 'backgound') {
      type = 'background'
    } else {
      type = 'image'
    }

    return {
      id: String(this.id),
      subtitle: meta.subtitle || '',
      title: meta.title || this.title || '',
      type,
      imageUrl: meta.image || undefined,
      videoUrl: meta.video || meta.video_url || (type === 'video' ? meta.image : undefined),
      backgroundColor: type === 'background' ? (meta.bg_color || undefined) : undefined,
      certifications: certificationsList
    }
  }

  toPowerOfMachine(): {
    image?: string
    features?: ProductFeature[]
  } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    let featuresList: ProductFeature[] | undefined = undefined

    if (meta.features) {
      try {
        const parsed = typeof meta.features === 'string' ? JSON.parse(meta.features) : meta.features
        if (Array.isArray(parsed)) {
          featuresList = parsed.map((item: any) => ({
            title: item.title || '',
            description: item.description || '',
            image: item.image || undefined
          }))
        }
      } catch {
        // ignore
      }
    }

    return {
      image: meta.image || undefined,
      features: featuresList
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

  toHeartOfMachineryTab(): {
    id: string
    label: string
    title: string
    description: string
    details: { label: string; value: string }[]
    image: string
  } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    if (!meta.tab_label && !meta.title && !meta.description && !meta.image) {
      return null
    }

    let detailsList: { label: string; value: string }[] = []
    if (meta.details) {
      try {
        const parsed = typeof meta.details === 'string' ? JSON.parse(meta.details) : meta.details
        if (Array.isArray(parsed)) {
          detailsList = parsed.map((d: any) => ({
            label: d.label || '',
            value: d.value || ''
          }))
        }
      } catch {
        detailsList = []
      }
    }

    const tabId = `tab-${this.id}`
    return {
      id: tabId,
      label: meta.tab_label || meta.title || this.title || 'Component',
      title: meta.title || meta.tab_label || this.title || '',
      description: meta.description || '',
      details: detailsList,
      image: meta.image ? formatMediaUrl(meta.image) : ''
    }
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
    if (
      !meta.spindle_title &&
      !meta.spindle_description &&
      !meta.worktable_title &&
      !meta.control_system_title
    ) {
      return null
    }
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

  toMaterialsProcessing(): {
    images: string[]
    materials: { id: string; name: string; action: string; icon: string }[]
  } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    const images = [
      meta.image_1,
      meta.image_2,
      meta.image_3,
      meta.image_4,
      meta.image_5
    ].filter((img): img is string => Boolean(img && String(img).trim())).map((img) => formatMediaUrl(img))

    let materialsList: { id: string; name: string; action: string; icon: string }[] = []
    if (meta.materials) {
      try {
        const parsed = typeof meta.materials === 'string' ? JSON.parse(meta.materials) : meta.materials
        if (Array.isArray(parsed)) {
          materialsList = parsed.map((m: any, idx: number) => ({
            id: m.id || `mat-${idx + 1}`,
            name: m.name || '',
            action: m.action || '',
            icon: formatMediaUrl(m.icon) || ''
          }))
        }
      } catch {
        materialsList = []
      }
    }

    if (images.length === 0 && materialsList.length === 0) return null
    return {
      images,
      materials: materialsList
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
      featuresList = parsed.map((item: any) => (typeof item === 'string' ? item : item.text || item.feature || item.title || ''))
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
    const extraSpecs = [
      meta.extra_title1 || meta.extra_details1
        ? { title: meta.extra_title1 || '', description: meta.extra_details1 || '' }
        : null,
      meta.extra_title2 || meta.extra_details2
        ? { title: meta.extra_title2 || '', description: meta.extra_details2 || '' }
        : null,
      meta.extra_title3 || meta.extra_details3
        ? { title: meta.extra_title3 || '', description: meta.extra_details3 || '' }
        : null
    ].filter(Boolean)

    let specsList: any[] = extraSpecs
    if (specsList.length === 0 && meta.specs) {
      try {
        const parsed = typeof meta.specs === 'string' ? JSON.parse(meta.specs) : (meta.specs || [])
        if (Array.isArray(parsed)) {
          specsList = parsed.map((s: any) => ({
            title: s.title || s.label || '',
            description: s.description || s.value || ''
          }))
        }
      } catch {
        specsList = []
      }
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
      const parsed = typeof meta.variants === 'string' ? JSON.parse(meta.variants) : (meta.variants || [])
      if (Array.isArray(parsed)) {
        variantsList = parsed.map((v: any, idx: number) => ({
          id: v.id || String(idx + 1),
          title: v.title || '',
          description: v.description || '',
          thumbnail: formatMediaUrl(v.thumbnail) || '',
          footerLabel: v.warning || v.footerLabel || '',
          warning: v.warning || undefined,
          video: formatMediaUrl(v.video || v.videoUrl) || undefined,
          videoUrl: formatMediaUrl(v.video || v.videoUrl) || undefined,
          isWarning: Boolean(v.warning || v.isWarning)
        }))
      }
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
      const parsed = typeof meta.types === 'string' ? JSON.parse(meta.types) : (meta.types || [])
      if (Array.isArray(parsed)) {
        typesList = parsed.map((t: any) => ({
          title: t.title || '',
          description: t.description || '',
          videoUrl: formatMediaUrl(t.videoUrl || t.video) || undefined,
          media: formatMediaUrl(t.videoUrl || t.video || t.media) || undefined
        }))
      }
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

  toAspiration(): { title?: string; subtitle?: string; description?: string; videoUrl?: string } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    return {
      title: meta.title || this.title || undefined,
      subtitle: meta.subtitle || undefined,
      description: meta.description || undefined,
      videoUrl: meta.videoUrl || undefined
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

  toMadeWithWattsanSlide(): { id: string; image: string; author?: string; tag?: string } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    if (!meta.image && !meta.author && !meta.tag) return null
    return {
      id: String(this.id),
      image: meta.image || '/product-cards/cnc-router/image 11680.png',
      author: meta.author || '',
      tag: meta.tag || ''
    }
  }

  toProductionStep(): ProductionProcessStep | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    return {
      id: String(this.id),
      step_number: meta.step_number !== undefined && meta.step_number !== null ? String(meta.step_number) : '',
      title: meta.title || this.title || '',
      description: meta.description || '',
      image: meta.image || '/product-cards/cnc-router/production-process/image 10.png'
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
        logo: formatMediaUrl(card.logo) || undefined,
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

  toAdditionalContentItem(): {
    id: string
    type: 'video' | 'pdf' | 'image'
    title: string
    subtitle: string
    link: string
  } | null {
    if (!this.contentMetasJson) return null
    const meta = this.contentMetasJson
    const rawType = String(meta.type || '').trim().toLowerCase()
    const attachmentUrl = String(meta.attachment || '').trim()
    const linkUrl = String(meta.link || '').trim()

    const isVideoExt = (url: string) => /\.(mp4|webm|ogg|mov|m4v|avi|mkv)(\?.*)?$/i.test(url)
    const isImageExt = (url: string) => /\.(jpg|jpeg|png|webp|gif|svg|bmp|avif)(\?.*)?$/i.test(url)
    const isDocExt = (url: string) => /\.(pdf|doc|docx|xls|xlsx|txt|zip|rar)(\?.*)?$/i.test(url)

    let resolvedType: 'video' | 'pdf' | 'image' | null = null
    let resolvedLink = ''

    if (rawType === 'video') {
      if (!attachmentUrl || !isVideoExt(attachmentUrl)) return null
      resolvedType = 'video'
      resolvedLink = attachmentUrl
    } else if (rawType === 'image') {
      if (!attachmentUrl || !isImageExt(attachmentUrl)) return null
      resolvedType = 'image'
      resolvedLink = attachmentUrl
    } else if (rawType === 'pdf') {
      if (!attachmentUrl || !isDocExt(attachmentUrl)) return null
      resolvedType = 'pdf'
      resolvedLink = attachmentUrl
    } else if (rawType === 'external_video') {
      if (!linkUrl) return null
      resolvedType = 'video'
      resolvedLink = linkUrl
    } else if (rawType === 'external_image') {
      if (!linkUrl) return null
      resolvedType = 'image'
      resolvedLink = linkUrl
    } else if (rawType === 'external_pdf') {
      if (!linkUrl) return null
      resolvedType = 'pdf'
      resolvedLink = linkUrl
    } else {
      return null
    }

    return {
      id: String(this.id),
      type: resolvedType,
      title: meta.title || this.title || '',
      subtitle: meta.subtitle || '',
      link: resolvedLink
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

  toHeroSliderItem(): {
    id: number
    title: string
    image: string
    link: string
    displayOrder: number
  } {
    const meta = this.contentMetasJson || {}
    return {
      id: this.id,
      title: this.title || '',
      image: meta.image || '',
      link: meta.link || '',
      displayOrder: Number(this.displayOrder) || 1
    }
  }
}
