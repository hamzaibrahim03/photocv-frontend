import apiClient from '@/api/axios';

export default {
  getAllNoticeComments() {
    return apiClient.get('/notices-extras');
  },
};
