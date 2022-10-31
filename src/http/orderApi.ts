import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

const orderApi = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export default orderApi;