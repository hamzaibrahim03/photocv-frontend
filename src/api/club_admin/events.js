import apiClient from '@/api/axios'

export const getAllEvents = () => {
  return apiClient.get('/events')
}

export const getEventById = (id) => {
  return apiClient.get(`/events/${id}`)
}

export default {
  getAllEvents,
  getEventById,
}
