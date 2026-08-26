import { contentApi } from '@/api/content.api'
import { contentMetaApi } from '@/api/content-meta.api'
import { API_FILE_MANAGER_READ } from '@/constants/api'
import { request } from '@/utils/request'
import { Content, ContentJson } from '../classes/content'

/**
 * Standard method for fetching Content alongside its Metas and resolving them into ContentJson.
 */
export async function readContentAsJsonByFilter(
  filter: { [key: string]: string },
  locale: string = 'en'
): Promise<ContentJson[]> {
  try {
    const filterString = Object.entries(filter)
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

    // Automatically resolve missing filemanager objects for attachments / images
    const GUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    const unresolvedFileIds = new Set<string>()
    contentItems.forEach((item) => {
      item.contentMetas?.forEach((meta: any) => {
        const val = meta.value
        if (val && typeof val === 'string' && GUID_REGEX.test(val.trim())) {
          if (!meta.filemanager) {
            unresolvedFileIds.add(val.trim())
          }
        }
        const valAr = meta.valueAr
        if (valAr && typeof valAr === 'string' && GUID_REGEX.test(valAr.trim())) {
          if (!meta.filemanagerAr) {
            unresolvedFileIds.add(valAr.trim())
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
          fileMap[f.id] = f
        })

        contentItems.forEach((item) => {
          item.contentMetas?.forEach((meta: any) => {
            if (meta.value && fileMap[meta.value.trim()]) {
              meta.filemanager = fileMap[meta.value.trim()]
            }
            if (meta.valueAr && fileMap[meta.valueAr.trim()]) {
              meta.filemanagerAr = fileMap[meta.valueAr.trim()]
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

/**
 * Load all dynamic content sections for a given Series.
 * Queries `referenceType: 'series_page'` first, falling back to `product_page` if needed.
 */
export async function loadSeriesDynamicContent(
  seriesId: string | number,
  locale: string = 'en'
): Promise<Record<string, ContentJson[]>> {
  try {
    // 1. Primary lookup: series_page
    let items = await readContentAsJsonByFilter(
      {
        referenceType: 'series_page',
        referenceId: String(seriesId)
      },
      locale
    )

    // 2. Fallback lookup: product_page (for backwards compatibility)
    if (!items || items.length === 0) {
      items = await readContentAsJsonByFilter(
        {
          referenceType: 'product_page',
          referenceId: String(seriesId)
        },
        locale
      )
    }

    const sectionsMap: Record<string, ContentJson[]> = {}
    items.forEach((item) => {
      if (!sectionsMap[item.section]) {
        sectionsMap[item.section] = []
      }
      sectionsMap[item.section].push(item)
    })

    return sectionsMap
  } catch (error) {
    console.error('Error loading series dynamic content:', error)
    return {}
  }
}

/**
 * Load all sections for a given product or series reference (alias for loadSeriesDynamicContent).
 */
export async function loadProductPageDynamicContent(
  referenceId: string | number,
  locale: string = 'en'
): Promise<Record<string, ContentJson[]>> {
  return loadSeriesDynamicContent(referenceId, locale)
}

