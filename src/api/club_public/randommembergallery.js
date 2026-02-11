import apiClient from '@/api/axios'

export const getAllRandomMember = () => {
  return apiClient.get('/club/public/random-member-galleries');
}

export default {
  getAllRandomMember
}
