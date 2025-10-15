import apiClient from '@/api/axios'

export const getAllRytonSingleNews = (id) => {
    console.log("ID", id)
  return apiClient.post(`/club/public/news/`,  { news_id: id }); 
 
}

export default {
    getAllRytonSingleNews
}
