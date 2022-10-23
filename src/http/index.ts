import axios, { AxiosRequestConfig } from 'axios';

export const API_URL = 'http://localhost:5000/api';

const authApi = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

authApi.interceptors.request.use( (config: AxiosRequestConfig) => {
    (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
})

export default authApi;