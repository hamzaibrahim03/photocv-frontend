import apiClient from '@/api/axios'

export const getAllRytonNotification = () => {
  return apiClient.get('/club/public/notifications')
}

export const markAllNotificationsRead = () => {
  return apiClient.patch('/club/public/notifications/read-all')
}

export const markSingleNotificationRead = (id) => {
  return apiClient.patch(`/club/public/notifications/${id}/read`)
}

export default {
  getAllRytonNotification,
  markAllNotificationsRead,
  markSingleNotificationRead
}
