import apiClient from '@/api/axios'

export const getAllRytonClub = () => {
  return apiClient.get('/club/public/about-us'); 
}

export default {
    getAllRytonClub
}
