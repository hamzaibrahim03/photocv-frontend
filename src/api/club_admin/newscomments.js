import apiClient from '@/api/axios';

export default {
  getAllNewsComments() {
    return apiClient.get('/club-news-extras'); // Adjust if endpoint differs
  },
};
