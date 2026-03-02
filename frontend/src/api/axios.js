import axios from 'axios';

const api = axios.create({
    // 🔥 Aapka Render Backend URL yahan set kar diya hai
    baseURL: 'https://ai-crop-analyzer.onrender.com/api', 
    headers: {
        'Content-Type': 'application/json'
    },
    // Timeout add kiya hai taaki agar Render "Sleep" mode mein ho toh wait kare
    timeout: 30000 
});

// Auto-attach JWT token (Login session maintain karne ke liye)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Aapke backend middleware ke mutabiq 'x-auth-token' ya 'Authorization'
            config.headers['x-auth-token'] = token; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (Errors handle karne ke liye)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;