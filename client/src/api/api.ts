import axios from "axios"
import { authResponse } from "../redux/models/reponse/authResponse"

export const API_URL = 'http://localhost:5000/api'

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if(error.respose.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<authResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken)
            return api.request(originalRequest);
        } catch (error) {
            console.log("User isn't authorized")
        }
    }
    throw error
})

export default api