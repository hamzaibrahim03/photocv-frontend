// src/api/api.js
import apiClient from '@/api/axios';

export default {
  getAllClubGallery() {
    
    return apiClient.get('/club-gallery'); 
  },
};
