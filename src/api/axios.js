// src/api/axios.js
import axios from 'axios'
import { useUserStore } from '@/stores/UserStore'
import router from "@/routes/navigation"

// Get subdomain (e.g., "johnphotocv" from "johnphotocv.staging.cameraclub.website")
const getSubdomain = () => {
  const hostParts = window.location.hostname.split('.')
  return hostParts[0] || 'default'
}

// Construct base URL from .env + subdomain
const BASE_URL = `${process.env.VUE_APP_API_PROTOCOL}://${getSubdomain()}${process.env.VUE_APP_API_SUFFIX}`

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
})

// ✅ Attach token before every request
apiClient.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    router.push('/')
  }

  return config
}, error => {
  return Promise.reject(error)
})

export default apiClient
