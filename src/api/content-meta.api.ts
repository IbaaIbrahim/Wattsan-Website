import { API_URL } from '@/constants/api'
import { request } from '@/utils/request'
import type { ContentMetaDto } from '../classes/content-meta'
import type { DataSourceResult } from './content.api'

export const contentMetaApi = {
  /** Query ContentMeta rows using Telerik filter expression (e.g. `contentId~eq~'2'`). */
  async readByFilter(filter: string, options?: { page?: number; pageSize?: number }): Promise<DataSourceResult<ContentMetaDto>> {
    try {
      const response = await request({
        url: `${API_URL}/api/ContentMeta/Read`,
        method: 'GET',
        query: {
          filter,
          page: options?.page ?? 1,
          pageSize: options?.pageSize ?? 500
        },
        track: false
      })
      return response || { data: [], total: 0 }
    } catch (error) {
      console.error('Error fetching content meta by filter', error)
      return { data: [], total: 0 }
    }
  }
}
