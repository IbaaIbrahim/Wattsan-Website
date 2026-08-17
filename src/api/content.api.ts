import { API_URL } from '@/constants/api'
import { request } from '@/utils/request'
import type { ContentDto } from '../classes/content'

export interface DataSourceResult<T> {
  data: T[]
  total: number
  aggregateResults?: any
  errors?: any
}

export const contentApi = {
  /** Query Content rows using Telerik filter expression (e.g. `referenceType~eq~'product_page'`). */
  async readByFilters(filters: string, options?: { page?: number; pageSize?: number }): Promise<DataSourceResult<ContentDto>> {
    try {
      const response = await request({
        url: `${API_URL}/api/Content/Read`,
        method: 'GET',
        query: {
          filter: filters,
          page: options?.page ?? 1,
          pageSize: options?.pageSize ?? 500
        },
        track: false
      })
      return response || { data: [], total: 0 }
    } catch (error) {
      console.error('Error fetching content by filters', error)
      return { data: [], total: 0 }
    }
  }
}
