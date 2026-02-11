import apiClient from '@/api/axios';

export default {
  getAllPageComments() {
    return apiClient.get('/pages-extras');
  },
};
