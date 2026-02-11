import apiClient from '@/api/axios'

export const getAllRytonMemberSingleGalleries = (galleryId) => {
  return apiClient.get(`/club/public/member/${galleryId}/galleries`);
}

export default {
  getAllRytonMemberSingleGalleries
}
