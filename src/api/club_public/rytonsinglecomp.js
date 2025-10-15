import apiClient from '@/api/axios'

export const getAllRytonSingleComp = (id) => {
    console.log("ID", id)
  return apiClient.post(`/club/public/competition/`,  { competition_id: id }); 
 
}

export default {
    getAllRytonSingleComp
}
