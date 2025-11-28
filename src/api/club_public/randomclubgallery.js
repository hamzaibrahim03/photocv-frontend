import apiClient from '@/api/axios'

export const getAllRandomClub = () => {
  return apiClient.get('/club/public/random-club-galleries'); 
}

export default {
    getAllRandomClub
}
