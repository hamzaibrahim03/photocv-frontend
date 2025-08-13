import apiClient from '@/api/axios'

export default {
  getAllComments() {
    return apiClient.get('/comments')
  },
  postComment(commentData) {
    return apiClient.post('/comments', commentData) 
  }
}
