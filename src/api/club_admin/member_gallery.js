import apiClient from '@/api/axios';

export default {
  getAllMemberGallery() {

    return apiClient.get('/members-galleries');
  },
};
