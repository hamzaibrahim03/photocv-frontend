// src/api/events.js
import apiClient from '@/api/axios';

export default {
  getAllNews() {
    return apiClient.get('/club-news'); // Adjust if endpoint differs
  },
};
