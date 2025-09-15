// src/api/api.js
import apiClient from '@/api/axios';

export default {
  getAllRytonEvents() {
    
    return apiClient.get('/club/public/event'); 
  },
};
