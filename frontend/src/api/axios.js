import axios from 'axios';

// Auto-switch between Localhost and Cloud URL
// (Uses Render URL if VITE_API_URL is not set)
const api = axios.create({
    baseURL: 'https://bitbybit-p3ym.onrender.com/api/',
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    }
});

// Add the token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    
    // FIX: Only attach token from storage if the request 
    // doesn't already have an Authorization header.
    // This prevents overwriting the fresh token during login.
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `JWT ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;