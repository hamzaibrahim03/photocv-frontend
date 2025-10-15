import apiClient from '@/api/axios'

export const getAllCompetitions = () => {
  return apiClient.get('/competitions')
}

export const getCompetitionById = (id) => {
  return apiClient.get(`/competitions/${id}`)
}

export default {
  getAllCompetitions,
  getCompetitionById,
}
