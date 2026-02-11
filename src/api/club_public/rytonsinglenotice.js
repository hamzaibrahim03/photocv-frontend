import apiClient from '@/api/axios'

export const getAllRytonSingleNotice = (id) => {
  console.log("nID", id)
  return apiClient.get(`/club/public/notice/${id}`);

}

export default {
  getAllRytonSingleNotice
}
