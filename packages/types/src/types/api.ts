/**
 * Standard paginated API response from Karbon backend.
 */
export interface ApiList<T> {
  ok?: boolean
  data: T[]
  meta: {
    page: number
    per_page: number
    total: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}

/**
 * Standard API error response.
 */
export interface ApiError {
  ok: false
  status: number
  error?: string
  message: string
}

/**
 * Generic API result — either success with data, or error.
 */
export interface ApiResult {
  ok: boolean
  status?: number
  message?: string
  [key: string]: any
}

/**
 * Options for server-side API calls.
 */
export interface ApiCallOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: Record<string, any>
  token?: string | null
  headers?: Record<string, string>
  timeout?: number
}

/**
 * Pagination query params.
 */
export interface PaginationParams {
  page?: number
  per_page?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}
