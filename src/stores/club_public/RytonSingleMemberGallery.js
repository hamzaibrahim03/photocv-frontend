import { defineStore } from 'pinia';
import api from '@/api/club_public/rytonsinglemembergallery';

export const useRytonSingleMemGalStore = defineStore('singleMemberGallery', {
  state: () => ({
    sinmemgalData: null,
    galleryImages: [],
    galleryName: '',
    loading: false,
    error: null
  }),

  actions: {
    async fetchRytonSingleMemGalData(galleryId) {
      this.loading = true;
      try {
        const response = await api.getAllRytonMemberSingleGalleries(galleryId);
        console.log("Single Member Gallery data =>", response.data);

        const gallery = response.data?.data?.memberGalleries?.original?.data?.galleries
                     || response.data?.data?.galleries
                     || response.data?.galleries
                     || null;
console.log(gallery)
        this.sinmemgalData = gallery[0];
        this.galleryName = gallery[0]?.gallery_name || 'Unnamed Gallery';
        this.galleryImages = gallery[0]?.photos || [];
console.log(this.galleryImages)
      } catch (err) {
        console.error("Error fetching single gallery:", err);
        this.error = err;
      } finally {
        this.loading = false;
      }
    }
  }
});
