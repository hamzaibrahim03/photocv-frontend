// src/api/api.js
import apiClient from '@/api/axios';

export default {
  getAllDashboardData() {
    
    return apiClient.get('/club/dashboard'); 
  },
};
