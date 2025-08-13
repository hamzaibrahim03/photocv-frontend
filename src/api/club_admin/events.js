import apiClient from '@/api/axios'

export const getAllEvents = () => {
  return apiClient.get('/events')
}

export const getEventById = (id) => {
  return apiClient.get(`/events/${id}`)
}

// Optional: default export if you want to import everything as an object
export default {
  getAllEvents,
  getEventById,
}
