// src/api/api.js
import apiClient from '@/api/axios';

export default {
  getAllClubData(domain) {
    const protocol = process.env.VUE_APP_API_PROTOCOL;
    const suffix = process.env.VUE_APP_API_SUFFIX;
    const BASE_URL = `${protocol}://${domain}${suffix}`;

    console.log('Base URL:', BASE_URL);
    return apiClient.get(`${BASE_URL}/club-public-data`);
  },
};
