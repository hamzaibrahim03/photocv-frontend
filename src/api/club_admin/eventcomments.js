import apiClient from '@/api/axios';

export default {
  getAllEventComments() {
    return apiClient.get('/event-extras'); 
  },
};
