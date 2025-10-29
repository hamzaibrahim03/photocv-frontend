import apiClient from '@/api/axios'

export const getAllRytonComps = () => {
  return apiClient.get('/club/public/competitions'); 
}

export default {
  getAllRytonComps
}
