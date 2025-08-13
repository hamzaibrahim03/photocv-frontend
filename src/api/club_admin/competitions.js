import apiClient from '@/api/axios'

export const getAllCompetitions = () => {
  return apiClient.get('/competitions')
}

export const getCompetitionById = (id) => {
  return apiClient.get(`/competitions/${id}`)
}

// Optional: default export if you want to import everything as an object
export default {
  getAllCompetitions,
  getCompetitionById,
}
