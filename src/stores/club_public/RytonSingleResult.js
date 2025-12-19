import { defineStore } from 'pinia';
import api from '@/api/club_public/rytonsingleresult';

export const useRytonSingleCompResultStore = defineStore('sincompres', {
  state: () => ({
    sincompresData: {},
    loading: false,
    error: null
  }),

  actions: {
    async fetchRytonSingleCompResData(competitionresult_id) {
      this.loading = true;
      try {
        const response = await api.getAllRytonSingleCompResult(competitionresult_id); 
        this.sincompresData = response.data.data;
        console.log("Single competition data =>", this.sincompresData);
        this.error = null;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    }    
  }
});