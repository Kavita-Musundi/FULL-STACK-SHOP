import axios from 'axios';

const API = 'http://localhost:8080/api/products';

// Get auth token from localStorage
const getAuth = () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
        return { Authorization: `Basic ${auth}` };
    }
    return {};
};

// Create axios instance
const api = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth header to every request
api.interceptors.request.use((config) => {
    const authHeader = getAuth();
    config.headers = { ...config.headers, ...authHeader };
    return config;
});

export const getProducts = () => api.get();
export const getProduct = (id) => api.get(`/${id}`);
export const createProduct = (data) => api.post('/', data);
export const updateProduct = (id, data) => api.put(`/${id}`, data);
export const deleteProduct = (id) => api.delete(`/${id}`);
export const searchProducts = (name) => api.get(`/search?name=${name}`);