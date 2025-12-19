import apiClient from '@/api/axios'

export const getAllRytonFilters = () => {
  return apiClient.get('/club/public/catalog/all-grouped'); 
}

export default {
  getAllRytonFilters
}
