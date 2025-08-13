// src/api/events.js
import apiClient from '@/api/axios';

export default {
  getAllPages() {
    return apiClient.get('/pages'); // Adjust if endpoint differs
  },
};
