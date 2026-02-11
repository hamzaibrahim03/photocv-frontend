import apiClient from '@/api/axios'

export const getAllRytonSingleCompResult = (id) => {
  console.log("crID", id)
  return apiClient.get(`/club/public/competition-results/${id}`);

}

export default {
  getAllRytonSingleCompResult
}
