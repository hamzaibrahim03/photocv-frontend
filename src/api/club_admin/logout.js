import apiClient from './axios';

export default {
  getLogOut() {
      alert("ok")
    return apiClient.get('/logout');
  },
};
