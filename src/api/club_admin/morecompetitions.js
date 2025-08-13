import apiClient from '@/api/axios';

export default {
  getAllMoreCompetitions() {
    return apiClient.get('/competition-extras'); 
  },
};
