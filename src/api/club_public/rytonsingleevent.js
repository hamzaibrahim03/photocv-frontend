import apiClient from '@/api/axios'

export const getAllRytonSingleEvent = (id) => {
    console.log("eID", id)
    // ID must be part of the URL
    return apiClient.get(`/club/public/event/${id}`);
}

export default {
    getAllRytonSingleEvent
}
