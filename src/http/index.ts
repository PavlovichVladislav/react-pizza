import axios from 'axios';
// import { AuthResponse } from '../@types/AuthResponse';

export const API_URL = 'http://localhost:5000/api';

const authApi = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

authApi.interceptors.request.use( (config) => {
    (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
})

// authApi.interceptors.response.use( (config) => {
//     return config;
// }, (async error => {
//     const originalResuest = error.config;
//     if (error.response.status === 401 && error.config && !error.config._isRetry ) {
//         originalResuest._isRetry = true;
//         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
//         localStorage.setItem('token', response.data.accessToken);
//         return authApi.request(originalResuest);
//     }
// }))

export default authApi;