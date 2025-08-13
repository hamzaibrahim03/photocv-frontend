// src/api/users.js
import apiClient from './axios';

export default {
  getAllUsers() {
    return apiClient.get('/login');
  },
};
