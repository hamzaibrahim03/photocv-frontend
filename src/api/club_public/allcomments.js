import apiClient from '@/api/axios'

export default {
  getCommentsByPhoto(photoId) {
    return apiClient.get(`/photos/${photoId}/comments`)
  },

  postComment(photoId, body) {
    return apiClient.post(`/photos/${photoId}/comments`, {
      body
    })
  }
}
