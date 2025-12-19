import apiClient from '@/api/axios'

export const getAllRytonCompResults = () => {
  return apiClient.get('/club/public/competition-results'); 
}

export default {
  getAllRytonCompResults
}
