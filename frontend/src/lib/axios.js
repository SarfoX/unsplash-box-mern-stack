import axois from 'axios';

export const axiosInstance = axois.create(
    {
        baseURL: 'http://localhost:5001/api',
        withCredentials: true,
    }
);