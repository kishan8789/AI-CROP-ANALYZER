import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Vercel ab isko automatically apne serverless backend par bhej dega 🚀
    headers: {
        'Content-Type': 'application/json'
    }
});

// Auto-attach JWT token for protected routes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export default api;