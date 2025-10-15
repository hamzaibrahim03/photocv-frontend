import apiClient from '@/api/axios'

export const getAllRytonEvents = () => {
  return apiClient.get('/club/public/event'); 
}

export default {
  getAllRytonEvents,
}
