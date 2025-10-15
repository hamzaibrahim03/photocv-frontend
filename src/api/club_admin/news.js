import apiClient from '@/api/axios';

export default {
  getAllNews() {
    return apiClient.get('/club-news'); 
  },
};
