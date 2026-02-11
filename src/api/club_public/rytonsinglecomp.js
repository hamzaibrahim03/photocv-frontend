import apiClient from '@/api/axios'

export const getAllRytonSingleComp = (id) => {
  console.log("cID", id)
  return apiClient.get(`/club/public/competition/${id}`);

}

export default {
  getAllRytonSingleComp
}
