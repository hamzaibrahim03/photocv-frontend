import apiClient from '@/api/axios'

export const getAllNotices = () => {
  return apiClient.get('/notices')
}

export const getNoticeById = (id) => {
  return apiClient.get(`/notices/${id}`)
}

export default {
  getAllNotices,
  getNoticeById,
}
