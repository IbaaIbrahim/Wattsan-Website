import { contentApi } from '@/api/content.api'
import { contentMetaApi } from '@/api/content-meta.api'
import { API_FILE_MANAGER_READ } from '@/constants/api'
import { request } from '@/utils/request'
import {
  SERIES_PAGE_REFERENCE_TYPE,
  BLOCK_ITEM_REFERENCE_TYPE,
  SERIES_PAGE_SETTINGS,
  LEGACY_SETTING_ALIASES,
  BLOCK_TEMPLATES,
  SYSTEM_BLOCKS,
  isSystemBlock,
  isMultiItemTemplate,
  type SeriesPageSetting
} from '@/constants/content-sections'
import { Content, ContentJson } from '../classes/content'

/**
 * Standard method for fetching Content alongside its Metas and resolving them into ContentJson.
 * Accepts either `{ key: value }` equality clauses or a ready Telerik filter string.
 */
export async function readContentAsJsonByFilter(
  filter: { [key: string]: string } | string,
  locale: string = 'en'
): Promise<ContentJson[]> {
  try {
    const filterString = typeof filter === 'string'
      ? filter
      : Object.entries(filter)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${key}~eq~'${value}'`)
        .join('~and~')

    if (!filterString) {
      return []
    }

    const contentResult = await contentApi.readByFilters(filterString)
    const contentItems = contentResult.data || []

    if (contentItems.length === 0) {
      return []
    }

    // Check if any returned items lack contentMetas
    const missingMetasItems = contentItems.filter((item) => !item.contentMetas || item.contentMetas.length === 0)

    if (missingMetasItems.length > 0) {
      const ids = missingMetasItems.map((item) => item.id).filter(Boolean)

      if (ids.length > 0) {
        let metaFilter = ''
        if (ids.length === 1) {
          metaFilter = `contentId~eq~'${ids[0]}'`
        } else {
          metaFilter = `(${ids.map((id) => `contentId~eq~'${id}'`).join('~or~')})`
        }

        const metaResult = await contentMetaApi.readByFilter(metaFilter, { page: 1, pageSize: 500 })
        const allFetchedMetas = metaResult.data ?? []

        missingMetasItems.forEach((item) => {
          item.contentMetas = allFetchedMetas.filter(
            (m) => String(m.contentId) === String(item.id)
          )
        })
      }
    }

    // Automatically resolve missing filemanager objects for attachments / images (including inside JSON repeatable fields)
    const GUID_EXACT_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    const GUID_GLOBAL_REGEX = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g
    const unresolvedFileIds = new Set<string>()
    contentItems.forEach((item) => {
      item.contentMetas?.forEach((meta: any) => {
        const val = meta.value
        if (val && typeof val === 'string') {
          const trimmed = val.trim()
          if (GUID_EXACT_REGEX.test(trimmed)) {
            if (!meta.filemanager) {
              unresolvedFileIds.add(trimmed)
            }
          } else if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
            const matches = trimmed.match(GUID_GLOBAL_REGEX)
            if (matches) {
              matches.forEach((guid) => unresolvedFileIds.add(guid))
            }
          }
        }
        const valAr = meta.valueAr
        if (valAr && typeof valAr === 'string') {
          const trimmedAr = valAr.trim()
          if (GUID_EXACT_REGEX.test(trimmedAr)) {
            if (!meta.filemanagerAr) {
              unresolvedFileIds.add(trimmedAr)
            }
          } else if (trimmedAr.startsWith('[') || trimmedAr.startsWith('{')) {
            const matchesAr = trimmedAr.match(GUID_GLOBAL_REGEX)
            if (matchesAr) {
              matchesAr.forEach((guid) => unresolvedFileIds.add(guid))
            }
          }
        }
      })
    })

    if (unresolvedFileIds.size > 0) {
      try {
        const idsArray = Array.from(unresolvedFileIds)
        const filterStr =
          idsArray.length === 1
            ? `id~eq~'${idsArray[0]}'`
            : `(${idsArray.map((id) => `id~eq~'${id}'`).join('~or~')})`

        const fileResult = await request({
          url: API_FILE_MANAGER_READ,
          method: 'GET',
          query: { filter: filterStr, pageSize: 100 }
        })

        const files = fileResult?.data || []
        const fileMap: Record<string, any> = {}
        files.forEach((f: any) => {
          if (f?.id) {
            fileMap[String(f.id).toLowerCase()] = f
            fileMap[String(f.id)] = f
          }
        })

        contentItems.forEach((item) => {
          item.contentMetas?.forEach((meta: any) => {
            if (meta.value && typeof meta.value === 'string') {
              const trimmed = meta.value.trim()
              if (fileMap[trimmed] || fileMap[trimmed.toLowerCase()]) {
                meta.filemanager = fileMap[trimmed] || fileMap[trimmed.toLowerCase()]
              } else if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
                meta.value = meta.value.replace(GUID_GLOBAL_REGEX, (match: string) => {
                  const found = fileMap[match] || fileMap[match.toLowerCase()]
                  return found?.url || match
                })
              }
            }
            if (meta.valueAr && typeof meta.valueAr === 'string') {
              const trimmedAr = meta.valueAr.trim()
              if (fileMap[trimmedAr] || fileMap[trimmedAr.toLowerCase()]) {
                meta.filemanagerAr = fileMap[trimmedAr] || fileMap[trimmedAr.toLowerCase()]
              } else if (trimmedAr.startsWith('[') || trimmedAr.startsWith('{')) {
                meta.valueAr = meta.valueAr.replace(GUID_GLOBAL_REGEX, (match: string) => {
                  const found = fileMap[match] || fileMap[match.toLowerCase()]
                  return found?.url || match
                })
              }
            }
          })
        })
      } catch (err) {
        console.error('Error resolving filemanager items for content metas:', err)
      }
    }

    const content = contentItems.map((item) => Content.fromDto(item))
    const jsonContent = content.map((item) => new ContentJson(item, locale))

    return jsonContent
  } catch (error) {
    console.error('Error reading dynamic content as JSON:', error)
    return []
  }
}

export type SeriesPageBlockContent = {
  /** The block row; holds the template's fields (or just the heading for multi-item templates) */
  block: ContentJson
  /** Child rows of a multi-item template, active and in display order */
  items: ContentJson[]
}

export type SeriesPageContent = {
  settings: Partial<Record<SeriesPageSetting, ContentJson>>
  /** Active blocks in page order, including system blocks */
  blocks: SeriesPageBlockContent[]
}

const byDisplayOrder = (a: ContentJson, b: ContentJson) =>
  (Number(a.displayOrder) || 0) - (Number(b.displayOrder) || 0) || a.id - b.id

/**
 * Load a series page: its page settings and its ordered blocks with their items.
 * System blocks the series never placed are appended in their default order.
 */
export async function loadSeriesPageContent(
  seriesId: string | number,
  locale: string = 'en'
): Promise<SeriesPageContent> {
  const content: SeriesPageContent = { settings: {}, blocks: [] }
  const placedSections = new Set<string>()
  try {
    const rows = await readContentAsJsonByFilter(
      { referenceType: SERIES_PAGE_REFERENCE_TYPE, referenceId: String(seriesId) },
      locale
    )

    rows.forEach((row) => {
      const setting = (SERIES_PAGE_SETTINGS as readonly string[]).includes(row.section)
        ? (row.section as SeriesPageSetting)
        : LEGACY_SETTING_ALIASES[row.section]
      if (setting && row.isActive !== false && !content.settings[setting]) {
        content.settings[setting] = row
      }
    })

    const blockRows = rows.filter((row) => BLOCK_TEMPLATES[row.section] || isSystemBlock(row.section)).sort(byDisplayOrder)
    blockRows.forEach((row) => placedSections.add(row.section))

    const multiBlockIds = blockRows.filter((row) => isMultiItemTemplate(row.section)).map((row) => row.id)
    const items = multiBlockIds.length > 0
      ? await readContentAsJsonByFilter(
        `referenceType~eq~'${BLOCK_ITEM_REFERENCE_TYPE}'~and~(${multiBlockIds.map((id) => `referenceId~eq~'${id}'`).join('~or~')})`,
        locale
      )
      : []

    content.blocks = blockRows
      .filter((row) => row.isActive !== false)
      .map((block) => ({
        block,
        items: items
          .filter((item) => String(item.referenceId) === String(block.id) && item.isActive !== false)
          .sort(byDisplayOrder)
      }))
  } catch (error) {
    console.error('Error loading series page content:', error)
  }

  SYSTEM_BLOCKS.forEach((section) => {
    if (!placedSections.has(section)) {
      content.blocks.push({
        block: new ContentJson(
          new Content(0, String(seriesId), SERIES_PAGE_REFERENCE_TYPE, section, null, content.blocks.length + 1, true),
          locale
        ),
        items: []
      })
    }
  })
  return content
}

/**
 * Load hero slider dynamic content for the home page.
 */
export async function loadHomeHeroSlider(locale: string = 'en') {
  try {
    const contents = await readContentAsJsonByFilter(
      {
        referenceType: 'home',
        referenceId: '0',
        section: 'hero_slider'
      },
      locale
    )

    return contents
      .filter((item) => item.isActive !== false)
      .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0))
      .map((item) => item.toHeroSliderItem())
  } catch (error) {
    console.error('Error loading home hero slider dynamic content:', error)
    return []
  }
}

