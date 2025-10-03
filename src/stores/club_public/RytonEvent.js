// src/stores/HomeStore.js
import { defineStore } from 'pinia';
import api from '@/api/club_public/rytonevent'; // Corrected import

export const useRytonEventStore = defineStore('event', {
  state: () => ({
    eventData: {},
    loading: false,
    error: null
  }),

  actions: {
    async fetchRytonEventData(domain) {
      this.loading = true;
      try {
        const response = await api.getAllRytonEvents(domain); // pass domain here
        this.eventData = response.data;
        console.log("Event data =>", this.eventData);
        this.error = null;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    }    
  }
});
