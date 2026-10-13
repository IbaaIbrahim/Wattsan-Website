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

