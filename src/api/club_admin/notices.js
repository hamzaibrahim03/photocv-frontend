// src/api/notices.js
import apiClient from '@/api/axios'

export const getAllNotices = () => {
  return apiClient.get('/notices')
}

export const getNoticeById = (id) => {
  return apiClient.get(`/notices/${id}`)
}

// Optional: default export if you want to import everything as an object
export default {
  getAllNotices,
  getNoticeById,
}
