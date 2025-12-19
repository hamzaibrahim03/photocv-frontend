import apiClient from '@/api/axios'

export const getAllRytonSingleEvent = (id) => {
    console.log("eID", id)
    return apiClient.get(`/club/public/event/${id}`);
}

export default {
    getAllRytonSingleEvent
}
