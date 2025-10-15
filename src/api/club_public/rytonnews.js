import apiClient from '@/api/axios'

export const getAllRytonNews = () => {
  return apiClient.get('/club/public/news'); 
}

export const getRytonNewById = (id) => {
  return apiClient.get(`/club/public/news/${id}`); 
}

export default {
  getAllRytonNews,
  getRytonNewById,
}
