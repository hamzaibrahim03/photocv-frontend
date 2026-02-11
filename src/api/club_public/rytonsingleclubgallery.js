import apiClient from '@/api/axios'

export const getAllRytonClubSingleGalleries = (galleryId) => {
  console.log(galleryId)
  return apiClient.get(`/club/public/gallery/${galleryId}`);
}

export default {
  getAllRytonClubSingleGalleries
}
