import apiClient from '@/api/axios'

export const getAllRytonComps = () => {
  return apiClient.post('/club/public/competitions'); 
}

export const getRytonCompById = (id) => {
  return apiClient.post(`/club/public/competitions/${id}`); 
}

export default {
  getAllRytonComps,
  getRytonCompById,
}
