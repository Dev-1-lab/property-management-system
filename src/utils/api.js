import axios from 'axios';
import { API_BASE_URL } from './constants';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized - refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refreshToken,
                });

                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed - logout user
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// API methods
export const authAPI = {
    login: (credentials) => api.post('/api/user/auth/login', credentials),
    logout: () => api.post('/auth/logout'),
    refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
    getCurrentUser: () => api.get('/auth/me'),
};

export const itemsAPI = {
    getAll: (params) => api.get('/items', { params }),
    getById: (id) => api.get(`/items/${id}`),
    create: (data) => api.post('/items', data),
    update: (id, data) => api.put(`/items/${id}`, data),
    delete: (id) => api.delete(`/items/${id}`),
    uploadDocument: (id, file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post(`/items/${id}/documents`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateStatus: (id, status) => api.patch(`/items/${id}/status`, { status }),
    export: (params) => api.get('/items/export', { params, responseType: 'blob' }),
};

export const usersAPI = {
    getAll: (params) => api.get('/users', { params }),
    getById: (id) => api.get(`/users/${id}`),
    create: (data) => api.post('/users', data),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
    updateStatus: (id, status) => api.patch(`/users/${id}/status`, { status }),
};

export const notificationsAPI = {
    getAll: (params) => api.get('/notifications', { params }),
    markAsRead: (id) => api.patch(`/notifications/${id}/read`),
    markAllAsRead: () => api.patch('/notifications/read-all'),
};

export const storageAPI = {
    confirm: (id, data) => api.post(`/items/${id}/confirm`, data),
    getLocations: () => api.get('/storage/locations'),
};

export const expertiseAPI = {
    create: (itemId, data) => api.post(`/items/${itemId}/expertise`, data),
    update: (itemId, expertiseId, data) =>
        api.put(`/items/${itemId}/expertise/${expertiseId}`, data),
    getByItemId: (itemId) => api.get(`/items/${itemId}/expertise`),
};

export const decisionAPI = {
    create: (itemId, data) => api.post(`/items/${itemId}/decision`, data),
    update: (itemId, decisionId, data) =>
        api.put(`/items/${itemId}/decision/${decisionId}`, data),
    getByItemId: (itemId) => api.get(`/items/${itemId}/decision`),
};

export const statisticsAPI = {
    getDashboard: () => api.get('/statistics/dashboard'),
    getByPeriod: (startDate, endDate) =>
        api.get('/statistics/period', { params: { startDate, endDate } }),
};

export default api;