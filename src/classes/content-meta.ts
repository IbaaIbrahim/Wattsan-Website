export type ContentMetaDto = {
  id: number | string
  contentId: number | string
  type: string
  keyName: string
  value: string | null
  value_AR?: string | null
  filemanager?: {
    url: string
  }
  filemanager_AR?: {
    url: string
  }
  displayOrder: number | string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export class ContentMeta {
  constructor(
    public readonly id: number,
    public readonly contentId: number,
    public readonly type: string,
    public readonly keyName: string,
    public readonly value: string | null,
    public readonly valueAr: string | null,
    public readonly filemanager: {
      url: string
    },
    public readonly filemanagerAr: {
      url: string
    },
    public readonly displayOrder: number,
    public readonly isActive: boolean,
    public readonly createdAt?: string,
    public readonly updatedAt?: string
  ) {}

  static fromDto(dto: ContentMetaDto): ContentMeta {
    return new ContentMeta(
      Number(dto.id),
      Number(dto.contentId),
      dto.type ?? '',
      dto.keyName ?? '',
      dto.value ?? null,
      dto.value_AR ?? null,
      dto.filemanager ?? { url: '' },
      dto.filemanager_AR ?? { url: '' },
      Number(dto.displayOrder),
      Boolean(dto.isActive),
      dto.createdAt,
      dto.updatedAt
    )
  }

  toPlain(): ContentMetaDto {
    return {
      id: this.id,
      contentId: this.contentId,
      type: this.type,
      keyName: this.keyName,
      value: this.value,
      value_AR: this.valueAr,
      filemanager: this.filemanager,
      filemanager_AR: this.filemanagerAr,
      displayOrder: this.displayOrder,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  getValue(locale?: string): string | null {
    return locale === 'ar' && this.valueAr ? this.valueAr : this.value
  }
}
