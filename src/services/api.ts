import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1"
})

const PUBLIC_ENDPOINTS = ["/auth/register"]

api.interceptors.request.use((config) => {
    PUBLIC_ENDPOINTS.some((some) => config.url?.includes(some))
    return config;
})

export default api;