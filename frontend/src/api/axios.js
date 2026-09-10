import axios from 'axios';

// Reads from frontend/.env (Vite requires the VITE_ prefix).
// Falls back to localhost:5000 for local development so you don't have to
// edit source code every time you switch between local/staging/prod.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    // Render free-tier instances cold-start slowly; give them time to wake up.
    timeout: 30000
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
