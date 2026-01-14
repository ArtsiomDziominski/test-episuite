import axios from 'axios'
import type { ApiResponse } from '@/types/api'

const API_BASE_URL = 'https://episuite.dev/EpiWebSuite/api/submit'

export async function fetchEpiSuiteData(cas: string): Promise<ApiResponse> {
  try {
    const response = await axios.get<ApiResponse>(API_BASE_URL, {
      params: { cas },
      timeout: 30000
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout exceeded')
      }
      if (error.response) {
        throw new Error(`Server error: ${error.response.status}`)
      }
      if (error.request) {
        throw new Error('No response from server')
      }
    }
    throw new Error('An error occurred while loading data')
  }
}
