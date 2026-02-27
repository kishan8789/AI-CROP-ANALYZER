import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Deployment ke baad isko Render URL se replace karna
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