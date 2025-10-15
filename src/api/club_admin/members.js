import apiClient from '@/api/axios';

export default {
  getAllMembers() {
    
    return apiClient.get('/members'); 
  },
};
