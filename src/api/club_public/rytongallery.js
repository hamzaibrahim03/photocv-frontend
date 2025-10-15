import apiClient from '@/api/axios'

export const getAllRytonGalleries = () => {
  return apiClient.get('/club/public/galleries'); 
}

export default {
    getAllRytonGalleries,
}
