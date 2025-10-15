import apiClient from '@/api/axios'

export const getAllRytonSingleEvent = (id) => {
    console.log("ID", id)
  return apiClient.post(`/club/public/event/`,  { event_id: id }); 
 
}

export default {
    getAllRytonSingleEvent
}
