import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Laravel's default port
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor to add the Bearer token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration or unauthorized access
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token might be invalid or expired
            localStorage.removeItem('auth_token');
            // Optional: Redirect to login or refresh token
        }
        return Promise.reject(error);
    }
);

export default api;
