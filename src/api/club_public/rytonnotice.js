import apiClient from '@/api/axios'

export const getAllRytonNotice = () => {
  return apiClient.get('/club/public/notices'); 
}
export default {
  getAllRytonNotice
}
