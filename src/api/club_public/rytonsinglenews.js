import apiClient from '@/api/axios'

export const getAllRytonSingleNews = (id) => {
    console.log("neID", id)
  return apiClient.get(`/club/public/news/${id}`); 
 
}

export default {
    getAllRytonSingleNews
}
