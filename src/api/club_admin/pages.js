import apiClient from '@/api/axios';

export default {
  getAllPages() {
    return apiClient.get('/pages');
  },
};
