// src/stores/HomeStore.js
import { defineStore } from 'pinia';
import api from '@/api/club_public/rytonevent';

export const useRytonEvents = defineStore('rytonevent', {
  state: () => ({
    rytonEvent: {},
    loading: false,
    error: null
  }),

  actions: {
    async fetchRytonEvents() {
      this.loading = true;
      try {
        const response = await api.getAllRytonEvents();
        this.rytonEvent = response.data;
        this.error = null;
      } catch (err) {
        console.error('Failed to load ryton events data:', err);
        this.error = err;
      } finally {
        this.loading = false;
      }
    }
  }
});
