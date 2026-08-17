import { contentApi } from '@/api/content.api'
import { contentMetaApi } from '@/api/content-meta.api'
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

    const content = contentItems.map((item) => Content.fromDto(item))
    const jsonContent = content.map((item) => new ContentJson(item, locale))

    return jsonContent
  } catch (error) {
    console.error('Error reading dynamic content as JSON:', error)
    return []
  }
}

/**
 * Load all sections for a given product page reference.
 */
export async function loadProductPageDynamicContent(
  referenceId: string,
  locale: string = 'en'
): Promise<Record<string, ContentJson[]>> {
  try {
    const items = await readContentAsJsonByFilter(
      {
        referenceType: 'product_page',
        referenceId: String(referenceId)
      },
      locale
    )

    const sectionsMap: Record<string, ContentJson[]> = {}
    items.forEach((item) => {
      if (!sectionsMap[item.section]) {
        sectionsMap[item.section] = []
      }
      sectionsMap[item.section].push(item)
    })

    return sectionsMap
  } catch (error) {
    console.error('Error loading product page dynamic content:', error)
    return {}
  }
}
