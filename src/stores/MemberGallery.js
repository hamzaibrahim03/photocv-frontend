import { ref } from 'vue'
import apiClient from '@/api/axios'

export function useMemberGallery() {
  const member_gallery = ref([])
  const loading = ref(false)
  const error = ref(null)
  const memberCount = ref(0)
  const eventDay = ref(0)
  const eventCount = ref(0)

  const fetchMemberGallery = async () => {
    loading.value = true
    error.value = null
  
    try {
      const res = await apiClient.get('/members-galleries')
      const galleryList = res?.data?.data || []
      member_gallery.value = galleryList
      memberCount.value = galleryList.length
      console.log(galleryList)
    } catch (err) {
      error.value = err.message || 'Failed to load galleries'
    } finally {
      loading.value = false
    }
  }
  

  return {
    member_gallery,
    loading,
    error,
    fetchMemberGallery,
    memberCount,
    eventCount,
    eventDay
  }
}
